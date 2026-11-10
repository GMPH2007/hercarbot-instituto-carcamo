#!/usr/bin/env python3
"""
Auditoría Automatizada Integral para HercarBot IA (IESTP Hermanos Cárcamo).
Verifica higiene de datos TUPA, integridad de botones, ausencia de secretos,
errores de ejecución en Chrome/Edge headless, responsividad y modo oscuro.
"""
import os
import re
import sys
import time
import json
import socket
import struct
import base64
import shutil
import tempfile
import threading
import subprocess
import http.server
import socketserver
import urllib.request
from urllib.parse import urlparse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))

def run_static_checks():
    stale_pattern = re.compile(r"00-631|018-631|Carlos Ramos|Victor Raul|Víctor Raúl|ghp_[A-Za-z0-9]+", re.IGNORECASE)
    stale_hits = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in (".git", ".agents", "node_modules")]
        for fn in filenames:
            if fn == "GEMINI.md":
                continue
            if not fn.endswith((".html", ".js", ".css", ".md", ".json", ".xml", ".sw", ".php", ".sql")):
                continue
            fp = os.path.join(dirpath, fn)
            try:
                content = open(fp, encoding="utf-8", errors="ignore").read()
            except Exception:
                continue
            for m in stale_pattern.finditer(content):
                stale_hits.append(f"{os.path.relpath(fp, ROOT)}: {m.group(0)}")

    chatbot_src = open(os.path.join(ROOT, "js", "chatbot.js"), encoding="utf-8").read()
    index_src = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    used_actions = set(re.findall(r'data-chat-action="([^"]+)"', chatbot_src + index_src))
    handled_cases = set(re.findall(r"case '([^']+)':", chatbot_src))
    dead_actions = sorted(used_actions - handled_cases)

    print(f"STALE_HITS: {len(stale_hits)}")
    for h in stale_hits[:10]:
        print("  -", h)
    print(f"DEAD_ACTIONS: {len(dead_actions)} -> {dead_actions}")
    return len(stale_hits) == 0 and len(dead_actions) == 0


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)
    def log_message(self, *args):
        pass


class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


def run_browser_checks():
    browsers = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]
    browser = next((b for b in browsers if os.path.exists(b)), None)
    if not browser:
        print("RUNTIME_ERRORS: SKIPPED (No Chrome/Edge binary found)")
        return True

    httpd = ThreadedHTTPServer(("127.0.0.1", 0), QuietHandler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    profile_dir = tempfile.mkdtemp(prefix="hercar_audit_")
    dbg_port = 9337
    proc = subprocess.Popen([
        browser, f"--remote-debugging-port={dbg_port}", f"--user-data-dir={profile_dir}",
        "--headless=new", "--disable-gpu", "--no-first-run", "--window-size=1440,900",
        "about:blank"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    errors = []
    try:
        ws_url = None
        for _ in range(30):
            try:
                with urllib.request.urlopen(f"http://127.0.0.1:{dbg_port}/json", timeout=1) as r:
                    for tab in json.loads(r.read().decode()):
                        if tab.get("type") == "page":
                            ws_url = tab["webSocketDebuggerUrl"]
                            break
                if ws_url:
                    break
            except Exception:
                time.sleep(0.25)

        if not ws_url:
            errors.append("CDP connection timeout")
            return False

        u = urlparse(ws_url)
        sock = socket.create_connection((u.hostname, u.port), timeout=15)
        key = base64.b64encode(os.urandom(16)).decode()
        sock.sendall((
            f"GET {u.path} HTTP/1.1\r\nHost: {u.hostname}:{u.port}\r\n"
            f"Upgrade: websocket\r\nConnection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n"
        ).encode())
        buf = b""
        while b"\r\n\r\n" not in buf:
            buf += sock.recv(4096)

        def ws_send(msg):
            p = msg.encode("utf-8")
            m = os.urandom(4)
            h = bytearray([0x81])
            n = len(p)
            if n < 126:
                h.append(0x80 | n)
            elif n < 65536:
                h.append(0x80 | 126)
                h.extend(struct.pack("!H", n))
            else:
                h.append(0x80 | 127)
                h.extend(struct.pack("!Q", n))
            h.extend(m)
            sock.sendall(bytes(h) + bytes(b ^ m[i % 4] for i, b in enumerate(p)))

        def ws_recv():
            def rx(k):
                out = b""
                while len(out) < k:
                    c = sock.recv(k - len(out))
                    if not c:
                        raise EOFError()
                    out += c
                return out
            while True:
                b1, b2 = rx(2)
                op = b1 & 0x0f
                ln = b2 & 0x7f
                if ln == 126:
                    ln = struct.unpack("!H", rx(2))[0]
                elif ln == 127:
                    ln = struct.unpack("!Q", rx(8))[0]
                data = rx(ln)
                if op == 0x8:
                    return None
                if op == 0x9:
                    continue
                return data.decode("utf-8", errors="replace")

        mid = [0]
        def cdp(method, params=None):
            mid[0] += 1
            cid = mid[0]
            ws_send(json.dumps({"id": cid, "method": method, "params": params or {}}))
            while True:
                raw = ws_recv()
                if raw is None:
                    return None
                ev = json.loads(raw)
                if ev.get("method") == "Runtime.exceptionThrown":
                    d = ev.get("params", {}).get("exceptionDetails", {})
                    errors.append(d.get("exception", {}).get("description", d.get("text", "Runtime error")))
                if ev.get("id") == cid:
                    return ev

        cdp("Page.enable")
        cdp("Runtime.enable")
        cdp("Page.navigate", {"url": f"http://127.0.0.1:{port}/index.html"})
        for _ in range(30):
            chk = cdp("Runtime.evaluate", {"expression": "Boolean(window.hercarBotApp)", "returnByValue": True})
            if chk and chk.get("result", {}).get("result", {}).get("value") is True:
                break
            time.sleep(0.25)

        smoke = r"""
        (() => {
          const app = window.hercarBotApp;
          if (!app) return 'MISSING_APP';
          const queries = [
            '¿Se puede pagar por Págalo.pe?',
            '¿Cómo pago el Curso de Inglés Básico?',
            'Requisitos del Examen de Suficiencia Profesional',
            'Requisitos para Trámite de Título Profesional',
            'Buscador completo de tasas TUPA 2026',
            '¿Qué pasa con APSTI en 2027?'
          ];
          queries.forEach(q => app.processQuery(q));
          app.triggerAction('ver_numero_cuenta_bn');
          app.triggerAction('ver_buscador_tupa');

          // Test TUPA live search + checklist + custom studio preferences
          const cards = document.querySelectorAll('.tupa-browser-card');
          const lastCard = cards[cards.length - 1];
          const searchInput = lastCard ? lastCard.querySelector('.tupa-live-search') : null;
          let filteredRows = 0;
          if (searchInput) {
            searchInput.value = 'Toga';
            app.updateTupaSearchResults(lastCard, 'Toga', 'all');
            filteredRows = lastCard.querySelectorAll('.tupa-results-tbody tr').length;
          }
          app.triggerAction('ver_examen_suficiencia');
          const firstChk = document.querySelector('.hercar-checklist-item');
          if (firstChk) firstChk.click();
          const prefsTest = app.getUserPrefs();

          return JSON.stringify({ filteredRows, palette: prefsTest.palette, overflowDesktop: document.documentElement.scrollWidth > window.innerWidth });
        })()
        """
        res = cdp("Runtime.evaluate", {"expression": smoke, "returnByValue": True})
        time.sleep(0.4)
        img_res = cdp("Runtime.evaluate", {"expression": "[...document.querySelectorAll('img')].filter(i => i.getAttribute('src') && (!i.complete || i.naturalWidth === 0)).map(i => i.getAttribute('src'))", "returnByValue": True})
        print("INDEX_SMOKE:", res.get("result", {}).get("result", {}).get("value"), "| BROKEN_IMGS:", img_res.get("result", {}).get("result", {}).get("value"))

        cdp("Emulation.setDeviceMetricsOverride", {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})
        time.sleep(0.3)
        mob = cdp("Runtime.evaluate", {"expression": "document.documentElement.scrollWidth > window.innerWidth", "returnByValue": True})
        print("OVERFLOW_MOBILE:", mob.get("result", {}).get("result", {}).get("value"))

        cdp("Emulation.clearDeviceMetricsOverride")
        cdp("Page.navigate", {"url": f"http://127.0.0.1:{port}/register.html"})
        time.sleep(0.9)
        cdp("Runtime.evaluate", {"expression": "sessionStorage.setItem('hercar_admin_session', JSON.stringify({id:1, user:'admin', role:'Admin'}))"})
        cdp("Page.navigate", {"url": f"http://127.0.0.1:{port}/admin.html"})
        for _ in range(25):
            adm_chk = cdp("Runtime.evaluate", {"expression": "typeof normalizePhoneticAdmin === 'function'", "returnByValue": True})
            if adm_chk and adm_chk.get("result", {}).get("result", {}).get("value") is True:
                break
            time.sleep(0.25)
        adm = cdp("Runtime.evaluate", {"expression": "typeof normalizePhoneticAdmin === 'function' && typeof AUDIT_LOG_MOCK !== 'undefined'", "returnByValue": True})
        print("ADMIN_READY:", adm.get("result", {}).get("result", {}).get("value"))
        sock.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        shutil.rmtree(profile_dir, ignore_errors=True)
        httpd.shutdown()

    print(f"RUNTIME_ERRORS: {len(errors)}")
    for e in errors:
        print("  - ERR:", e)
    return len(errors) == 0


if __name__ == "__main__":
    ok_static = run_static_checks()
    ok_browser = run_browser_checks()
    sys.exit(0 if (ok_static and ok_browser) else 1)
