---
name: hercarbot-audit
description: >-
  Ejecuta la auditoría integral automatizada de HercarBot IA: detecta cuentas
  obsoletas, botones sin manejador en triggerAction, fugas de secretos, errores
  JS en Chrome/Edge headless, contraste en modo oscuro y responsividad móvil.
---

# Auditoría Integral de HercarBot IA

Utiliza esta skill después de modificar cualquier archivo HTML, CSS o JS del proyecto antes de publicar en GitHub Pages.

## Pasos de Verificación
1. Ejecuta el script de auditoría integral:
   ```powershell
   python .agents/skills/hercarbot-audit/scripts/verify_hercarbot.py
   ```
2. Confirma que la salida muestre:
   - `STALE_HITS: 0` (sin cuentas `00-631`, CCI `018-631` ni tokens PAT filtrados)
   - `DEAD_ACTIONS: 0` (todos los botones `data-chat-action` existen en `triggerAction`)
   - `RUNTIME_ERRORS: 0` en `index.html`, `admin.html` y `register.html`
   - `OVERFLOW_MOBILE: False` y contraste válido en modo claro/oscuro.
3. Si falla alguna aserción, corrige el archivo señalado antes de publicar.
