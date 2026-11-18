const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

const kbCode = fs.readFileSync('js/knowledge-base.js', 'utf8');
const chatbotCode = fs.readFileSync('js/chatbot.js', 'utf8');
const cssCode = fs.readFileSync('css/style.css', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const swCode = fs.readFileSync('sw.js', 'utf8');

// 1. Verify greeting & removal of avatar wrap + pink flowers
assert(!chatbotCode.includes('welcome-hero-avatar-wrap'), 'welcome-hero-avatar-wrap should be removed from welcome hero');
assert(chatbotCode.includes('👋') && chatbotCode.includes('wave-hand-emoji'), 'Welcome greeting should include animated waving hand 👋');
assert(!chatbotCode.includes('🌸'), 'No distracting 🌸 emoji should remain in chatbot.js');
assert(!indexHtml.includes('🌸'), 'No distracting 🌸 emoji should remain in index.html');

// 2. Verify Service Worker cache bump & no-store fetch + portada assets & top campus hero
assert(swCode.includes("hercarbot-pwa-v2026-v24"), 'sw.js cache version should be bumped to v24');
assert(swCode.includes("cache: 'no-store'"), 'sw.js fetch should bypass HTTP disk cache via cache: no-store');
assert(indexHtml.includes("hercarbot-pwa-v2026-v24"), 'index.html inline cache cleaner should match v24');
assert(indexHtml.includes("?v=20261118c"), 'index.html assets should be cache-busted with ?v=20261118c');
assert(indexHtml.includes('id="voice-companion-bar"'), 'Voice companion bar element preserved in DOM');
assert(indexHtml.includes('style="display: none !important;"'), 'Voice companion bar must be hidden in index.html per user request');
assert(chatbotCode.includes('startCampusCarousel()') && chatbotCode.includes('stepCampusBannerPhoto('), 'Auto-rotating campus carousel methods must exist');
assert(cssCode.includes('.suggested-prompts-section') && cssCode.includes('background: transparent') && cssCode.includes('text-align: center'), 'css/style.css should render minimalist centered .suggested-prompts-section');
assert(
  chatbotCode.indexOf('class="welcome-hero-intro"') !== -1 &&
  chatbotCode.indexOf('class="welcome-campus-card"') !== -1 &&
  chatbotCode.indexOf('class="welcome-subtitle"') < chatbotCode.indexOf('class="welcome-campus-card"'),
  'Welcome hero intro and subtitle must appear at the top, with welcome-campus-card right underneath'
);
assert(chatbotCode.includes('feature-pill--blue') && cssCode.includes('.feature-pill.feature-pill--blue'), 'Feature pill cards must apply top accent classes cleanly');

// 3. Verify CSS header layout coordination rules
assert(cssCode.includes('.header-quick-portals') && cssCode.includes('flex: 1 1 0%;'), 'Header quick portals should use flexible shrinking container');
assert(cssCode.includes('#btn-stop-speech') && cssCode.includes('white-space: nowrap !important;'), '#btn-stop-speech should never wrap text onto two lines');
assert(cssCode.includes('.gpt-stream-cursor'), 'ChatGPT-style streaming cursor CSS should exist');
assert(cssCode.includes('.tupa-sirve-box'), 'TUPA "Para qué sirve" box styling should exist');

// 4. Evaluate knowledge-base.js cleanly in VM context
const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(
  kbCode + '\n;this.__EXPORTS = { GUIA_TRAMITES_TUPA, TASAS_TUPA_COTIZADOR, TUPA_COMPENDIO_OFICIAL_2026, BASE_PREGUNTAS_RESPUESTAS };',
  sandbox
);
const { GUIA_TRAMITES_TUPA, TASAS_TUPA_COTIZADOR, TUPA_COMPENDIO_OFICIAL_2026 } = sandbox.__EXPORTS;

assert(Array.isArray(GUIA_TRAMITES_TUPA) && GUIA_TRAMITES_TUPA.length >= 16, 'GUIA_TRAMITES_TUPA should contain all major official TUPA categories');
for (const t of GUIA_TRAMITES_TUPA) {
  assert(t.paraQueSirve && t.paraQueSirve.trim().length > 20, `Trámite "${t.id}" must explain paraQueSirve cleanly`);
  assert(t.costo && t.requisitos && t.pasos, `Trámite "${t.id}" must include costo, requisitos, pasos`);
}

assert(TUPA_COMPENDIO_OFICIAL_2026 && Array.isArray(TUPA_COMPENDIO_OFICIAL_2026.items), 'TUPA_COMPENDIO_OFICIAL_2026.items must exist');
assert.strictEqual(TUPA_COMPENDIO_OFICIAL_2026.items.length, 66, 'TUPA 2026 compendio must include all 43 + 23 = 66 official concepts');
const count002361 = TUPA_COMPENDIO_OFICIAL_2026.items.filter(x => x.cuenta === '00-638-002361').length;
const count025736 = TUPA_COMPENDIO_OFICIAL_2026.items.filter(x => x.cuenta === '00-638-025736').length;
assert.strictEqual(count002361, 43, 'Account 00-638-002361 must have exactly 43 official TUPA items');
assert.strictEqual(count025736, 23, 'Account 00-638-025736 must have exactly 23 official TUPA items');

for (const item of TUPA_COMPENDIO_OFICIAL_2026.items) {
  assert(item.paraQueSirve && item.paraQueSirve.trim().length > 15, `Item #${item.item} (${item.concepto}) must explain paraQueSirve`);
  assert(typeof item.costo === 'number' && item.costo > 0, `Item #${item.item} must have positive numeric cost`);
}

// Verify key TUPA 2026 rates synced across cotizador & compendio
const findItem = (conceptPart) => TUPA_COMPENDIO_OFICIAL_2026.items.find(x => x.concepto.includes(conceptPart));
assert.strictEqual(findItem('Certificado de Estudios (incluye los seis').costo, 240);
assert.strictEqual(findItem('Certificado Modular').costo, 25);
assert.strictEqual(findItem('Matrícula Ordinaria').costo, 250);
assert.strictEqual(findItem('Examen de Suficiencia Profesional').costo, 200);
assert.strictEqual(findItem('Formato de Título Profesional').costo, 60);
assert.strictEqual(findItem('Derecho de Titulación').costo, 100);
assert.strictEqual(findItem('Curso de Inglés Básico').costo, 400);
assert.strictEqual(findItem('Curso de Inglés Básico').cuenta, '00-638-025736');

// 5. Verify ChatGPT streaming + chat history auto-save + FUT key mapping in chatbot.js
assert(chatbotCode.includes('streamBotContent(') && chatbotCode.includes('stopStreamingText('), 'chatbot.js must implement smooth ChatGPT-style streaming');
assert(chatbotCode.includes('mapTramiteIdToFutKey('), 'chatbot.js must define mapTramiteIdToFutKey');
assert(chatbotCode.includes('buildChatTitle') && chatbotCode.includes('updatedAt'), 'chatbot.js must auto-title and reorder recent saved chats');

// 6. Verify Intelligent Vocational Test (word-boundary CI/TI fix, adaptive tie-breaker, WhatsApp 51969100257)
assert(!chatbotCode.includes('51969035252'), 'Must not contain wrong WhatsApp number 51969035252');
assert(chatbotCode.includes('51969100257'), 'Must use official WhatsApp 51969100257');
assert(chatbotCode.includes('getTieBreakerQuestion('), 'Must implement adaptive tie-breaker question engine');
assert(chatbotCode.includes('cancelar_test_vocacional'), 'Must support exiting vocational test cleanly');
assert(chatbotCode.includes("new RegExp(`\\\\b${cCode}\\\\b`, 'i').test(norm)"), 'Career code lookup must use word boundaries so "ci" does not hijack "vocacional"');
assert(cssCode.includes('.test-choice-btn.is-selected'), 'CSS must highlight and lock chosen vocational option');

// Simulate full Vocational Test + Adaptive Tie-Breaker execution in headless mock
const fakeChatbot = {};
const methodsBlockMatch = chatbotCode.match(/  startVocationalTest\(\) \{[\s\S]*?  \/\*\s*==========================================================================\s*SIMULADOR/);
assert(methodsBlockMatch, 'Should extract Vocational Test methods from chatbot.js');
const testClassCtx = {
  CARRERAS_COMPLETAS: sandbox.__EXPORTS.CARRERAS_COMPLETAS || (() => {
    const cCtx = { console };
    vm.runInNewContext(kbCode + '\n;this.__C = CARRERAS_COMPLETAS;', cCtx);
    return cCtx.__C;
  })(),
  Math,
  Date,
  Object,
  Array,
  String,
  encodeURIComponent,
  botMessages: [],
  createAppMock() {
    const ctxApp = {
      activeTest: null,
      messagesContainer: null,
      escapeHtml: (s) => String(s),
      triggerConfetti: () => {},
      getStats: () => ({ carrerasConsultas: {} }),
      saveStats: () => {},
      appendBotMessage: (html, spoken, chips) => {
        testClassCtx.botMessages.push({ html, spoken, chips });
      }
    };
    return ctxApp;
  }
};
vm.createContext(testClassCtx);
vm.runInContext(`
  class MockBot {
    constructor() {
      this.activeTest = null;
      this.messagesContainer = null;
      this.savedStats = null;
      this.rendered = [];
    }
    escapeHtml(s) { return String(s); }
    triggerConfetti() {}
    getStats() { return { carrerasConsultas: { apsti: 0, ani: 0, conta: 0, dpa: 0 } }; }
    saveStats(st) { this.savedStats = st; }
    appendBotMessage(html, spoken, chips) { this.rendered.push({ html, spoken, chips }); }
    ${methodsBlockMatch[0].replace(/\s*\/\*\s*==========================================================================\s*SIMULADOR$/, '')}
  }
  this.__MockBot = MockBot;
`, testClassCtx);

const botInst = new testClassCtx.__MockBot();
botInst.startVocationalTest();
assert(botInst.activeTest && botInst.activeTest.questions.length === 7, 'Vocational test should start with 7 balanced multi-dimensional questions');
assert.strictEqual(botInst.rendered.length, 1, 'Intro + Q1 should render in 1 clean message without stream conflict');

// Intentionally alternate between apsti (4x) and ani (3x) to trigger the Adaptive Tie-Breaker!
const plan = ['apsti', 'ani', 'apsti', 'ani', 'apsti', 'ani', 'apsti'];
for (let stepIdx = 0; stepIdx < 7; stepIdx++) {
  const q = botInst.activeTest.questions[botInst.activeTest.step];
  const optIdx = q.opts.findIndex(o => o.c === plan[stepIdx]);
  assert(optIdx >= 0, `Question ${stepIdx + 1} should have option for ${plan[stepIdx]}`);
  // Test letter input on step 0, index input on remaining steps
  const valInput = stepIdx === 0 ? String.fromCharCode(65 + optIdx) : String(optIdx);
  botInst.handleTestResponse(valInput);
}
assert(botInst.activeTest && botInst.activeTest.tieBreakerTriggered === true, 'Close score should automatically trigger Adaptive Tie-Breaker round');
assert.strictEqual(botInst.activeTest.questions.length, 8, 'Tie-breaker should dynamically add 8th clarifying question');
botInst.handleTestResponse('ani');
assert.strictEqual(botInst.activeTest, null, 'Completing tie-breaker should finish test and clear activeTest');
const finalOutput = botInst.rendered[botInst.rendered.length - 1];
assert(finalOutput.html.includes('Desempate Adaptativo'), 'Final result card must badge adaptive tie-breaker resolution');
assert(finalOutput.html.includes('wa.me/51969100257'), 'Final result card must include official WhatsApp 51969100257');
assert(finalOutput.spoken && finalOutput.spoken.includes('compatibilidad'), 'Final spoken summary must announce result naturally');
// Verify every single question (1..7 + tie-breaker) spoke the question aloud!
for (let rIdx = 0; rIdx < 8; rIdx++) {
  assert(
    typeof botInst.rendered[rIdx].spoken === 'string' && botInst.rendered[rIdx].spoken.length > 25,
    `Vocational test step ${rIdx + 1} must speak the question aloud with sweet female voice`
  );
}

// Also verify cancelling via typed "salir"
botInst.startVocationalTest();
botInst.handleTestResponse('salir');
assert.strictEqual(botInst.activeTest, null, 'Typing "salir" must cleanly exit active vocational test');

// Official 2026 Gallery photos from ieshercar.edu.pe
const officialPhotos = [
  'assets/img/fachada-2026.webp',
  'assets/img/patio-2026.webp',
  'assets/img/comunidad-2026.webp',
  'assets/img/titulacion-2026.webp',
  'assets/img/embarcacion-2026.webp',
  'assets/img/movilidad-2026.webp'
];
for (const photoPath of officialPhotos) {
  assert(fs.existsSync(photoPath), `Official photo missing on disk: ${photoPath}`);
  assert(chatbotCode.includes(photoPath), `chatbot.js must reference ${photoPath}`);
  assert(swCode.includes(photoPath), `sw.js must cache ${photoPath}`);
}

// Offline Image + OCR + Question Reader tests (VM checks against real extracted methods)
function extractMethod(src, name) {
  const re = new RegExp(`\\n  (${name}\\s*\\([^{]*\\)\\s*\\{)`);
  const m = src.match(re);
  if (!m) throw new Error(`Method not found: ${name}`);
  const start = src.indexOf(m[1], m.index);
  const endIdx = src.indexOf('\n  }', start);
  if (endIdx === -1) throw new Error(`Unclosed method: ${name}`);
  return src.slice(start, endIdx + 4);
}

const imgSandbox = {
  console,
  customFaqs: [],
  convertAllNumbersToSpokenSpanish: (s) => s,
  localStorage: { getItem: () => null },
  document: {
    createElement: () => {
      let val = '';
      return {
        set textContent(v) { val = String(v); },
        get innerHTML() {
          return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
      };
    }
  }
};
vm.createContext(imgSandbox);
vm.runInContext(kbCode, imgSandbox);
const methodsCode = [
  'normalizeText',
  'findBestFaqMatch',
  'extractSpokenAnswer',
  'preparePhoneticText',
  'analyzeOfflineImageContext',
  'buildInstitutionalImageReply',
  'escapeHtml',
  'formatMarkdown'
].map(n => extractMethod(chatbotCode, n)).join('\n');

vm.runInContext(`
  class __MockImgBot {
    constructor() { this.customFaqs = []; }
    ${methodsCode}
  }
  this.__imgBot = new __MockImgBot();
`, imgSandbox);

const bot = imgSandbox.__imgBot;
assert(typeof bot.analyzeOfflineImageContext === 'function', 'analyzeOfflineImageContext must exist on HercarBot');
assert(typeof bot.buildInstitutionalImageReply === 'function', 'buildInstitutionalImageReply must exist on HercarBot');

// Case 1: Image OCR reads Examen de Suficiencia flyer (like user screenshot)
const suficienciaCtx = bot.analyzeOfflineImageContext(
  'REQUISITOS PARA SOLICITAR EXAMEN DE SUFICIENCIA PROFESIONAL S/ 200 SOLES CTA CTE 00-638-002361 BANCO DE LA NACION',
  '¿Cuánto cuesta este examen y para qué sirve?',
  'suficiencia.jpg'
);
assert(suficienciaCtx.hasMainAccount === true, 'OCR should detect main BN account 00-638-002361');
assert(suficienciaCtx.matchedTramite && suficienciaCtx.matchedTramite.id.includes('suficiencia'), 'OCR should match Suficiencia TUPA procedure');

const suficienciaReply = bot.buildInstitutionalImageReply(
  { name: 'suficiencia.jpg', base64: 'data:image/jpeg;base64,AA==' },
  '¿Para qué sirve este trámite?',
  'REQUISITOS PARA SOLICITAR EXAMEN DE SUFICIENCIA PROFESIONAL S/ 200 SOLES'
);
assert(suficienciaReply.html.includes('Texto detectado en tu imagen'), 'Image reply should show detected OCR text box');
assert(suficienciaReply.html.includes('00-638-002361'), 'Image reply should highlight BN account 00-638-002361');

// Case 2: Image has no OCR text, user typed question about Computación e Informática
const ciReply = bot.buildInstitutionalImageReply(
  { name: 'foto.png', base64: 'data:image/png;base64,AA==' },
  '¿Qué carrera es Computación e Informática y cuánto dura?',
  ''
);
assert(ciReply.html.includes('Computación e Informática'), 'Image + typed question should answer about Computación e Informática even without OCR text');

// Case 3: Image contains deprecated account or Págalo.pe -> must warn explicitly
const warnReply = bot.buildInstitutionalImageReply(
  { name: 'voucher.jpg', base64: 'data:image/jpeg;base64,AA==' },
  '',
  'Deposito realizado en Pagalo.pe cuenta 00-631-012948'
);
assert(warnReply.html.includes('00-631-') && warnReply.html.includes('Págalo.pe'), 'Image reader must warn on old account series and Pagalo.pe');

console.log('ALL UI, CHAT HISTORY, STREAMING, HEADER, VOCATIONAL TEST, GALLERY & OCR IMAGE ASSERTIONS PASSED!');
