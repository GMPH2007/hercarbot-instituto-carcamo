/**
 * HERCARTBOT IA - MOTOR CONVERSACIONAL INSTITUCIONAL AVANZADO
 * IESTP "Hermanos Cárcamo" - Paita
 * - Historial persistente de chats (Guardar, Cargar, Borrar)
 * - Barra lateral colapsable (Toggle 3 líneas / Sidebar)
 * - Nueva conversación fluida (Sin popups nativos del navegador)
 * - Síntesis de voz natural y fluida con visualizador de ondas
 * - Test Vocacional con barra de progreso y compatibilidad
 * - Base de conocimiento completa con comunicados y enlaces Drive
 */

// Desbloqueo y purga inmediata de cualquier residuo previo en memoria o DOM
(function() {
  try {
    document.querySelectorAll('.hercar-tour-overlay, .hercar-tour-card, .hercar-tour-fab, .hercar-pwa-banner, #hercar-tour-popover').forEach(function(el) {
      el.remove();
    });
  } catch(e) {}
})();

/* ==========================================================================
   MOTOR DE SONIDOS UI CON WEB AUDIO API (SUTIL, FUTURISTA Y CERO ARCHIVOS)
   ========================================================================== */

class HercarSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = localStorage.getItem('hercar_sound_fx') !== 'false';
  }

  getAudioContext() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('hercar_sound_fx', this.enabled ? 'true' : 'false');
    if (this.enabled) this.playTap();
    return this.enabled;
  }

  playSend() {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playReceive() {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [1046.5, 1318.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.035, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.16);
      });
    } catch (e) {}
  }

  playTap() {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }
}

/* ==========================================================================
   CONVERTIDOR FONÉTICO UNIVERSAL DE NÚMEROS A PALABRAS EN ESPAÑOL
   ========================================================================== */

function spanishNumberToWords(num) {
  num = parseInt(num, 10);
  if (isNaN(num)) return '';
  if (num === 0) return 'cero';
  if (num < 0) return 'menos ' + spanishNumberToWords(Math.abs(num));

  const units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  const tens = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  if (num <= 29) return units[num];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return unit === 0 ? tens[ten] : `${tens[ten]} y ${units[unit]}`;
  }
  if (num === 100) return 'cien';
  if (num < 1000) {
    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    return rest === 0 ? hundreds[hundred] : `${hundreds[hundred]} ${spanishNumberToWords(rest)}`;
  }
  if (num === 1000) return 'mil';
  if (num < 2000) {
    const rest = num % 1000;
    return rest === 0 ? 'mil' : `mil ${spanishNumberToWords(rest)}`;
  }
  if (num < 1000000) {
    const thousands = Math.floor(num / 1000);
    const rest = num % 1000;
    const thStr = thousands === 1 ? 'mil' : `${spanishNumberToWords(thousands)} mil`;
    return rest === 0 ? thStr : `${thStr} ${spanishNumberToWords(rest)}`;
  }
  return num.toString();
}

function convertAllNumbersToSpokenSpanish(text) {
  if (!text) return '';
  let str = text.toString();

  // 1. Cuentas bancarias específicas y teléfonos institucionales (con cadencia y pausas de respiración)
  str = str
    .replace(/00-638-002361/g, 'cero cero, seis tres ocho, cero cero, dos tres seis uno')
    .replace(/00-638-025736/g, 'cero cero, seis tres ocho, cero veinticinco, siete tres seis')
    .replace(/20215039231/g, 'dos cero dos uno, cinco cero tres nueve, dos tres uno')
    .replace(/\(073\)\s*251013|073-251013/g, 'cero siete tres, veinticinco, diez, trece')
    .replace(/\(073\)\s*211048|073-211048/g, 'cero siete tres, veintiuno, diez, cuarenta y ocho')
    .replace(/969\s*100\s*257|969100257/g, 'nueve seis nueve, cien, dos cinco siete')
    .replace(/968\s*184\s*783|968184783/g, 'nueve seis ocho, uno ocho cuatro, siete ocho tres');

  // 2. Horarios con formato am/pm
  str = str
    .replace(/8:00\s*(?:a\.?m\.?|am)\b/gi, 'ocho de la mañana')
    .replace(/8:30\s*(?:a\.?m\.?|am)\b/gi, 'ocho y media de la mañana')
    .replace(/1:15\s*(?:p\.?m\.?|pm)\b/gi, 'una y quince de la tarde')
    .replace(/12:00\s*(?:p\.?m\.?|pm|m\.?)\b/gi, 'doce del mediodía')
    .replace(/3:00\s*(?:p\.?m\.?|pm)\b/gi, 'tres de la tarde')
    .replace(/7:40\s*(?:p\.?m\.?|pm)\b/gi, 'siete y cuarenta de la noche');

  // 3. Monedas en soles peruanos
  str = str
    .replace(/S\/\.?\s*250(?:\.00)?/gi, 'doscientos cincuenta soles')
    .replace(/S\/\.?\s*200(?:\.00)?/gi, 'doscientos soles')
    .replace(/S\/\.?\s*180(?:\.00)?/gi, 'ciento ochenta soles')
    .replace(/S\/\.?\s*150(?:\.00)?/gi, 'ciento cincuenta soles')
    .replace(/S\/\.?\s*120(?:\.00)?/gi, 'ciento veinte soles')
    .replace(/S\/\.?\s*100(?:\.00)?/gi, 'cien soles')
    .replace(/S\/\.?\s*60(?:\.00)?/gi, 'sesenta soles')
    .replace(/S\/\.?\s*50(?:\.00)?/gi, 'cincuenta soles')
    .replace(/S\/\.?\s*30(?:\.00)?/gi, 'treinta soles')
    .replace(/S\/\.?\s*25(?:\.00)?/gi, 'veinticinco soles')
    .replace(/S\/\.?\s*20(?:\.00)?/gi, 'veinte soles')
    .replace(/S\/\.?\s*18(?:\.00)?/gi, 'dieciocho soles')
    .replace(/S\/\.?\s*15(?:\.00)?/gi, 'quince soles')
    .replace(/S\/\.?\s*12(?:\.00)?/gi, 'doce soles')
    .replace(/S\/\.?\s*10(?:\.00)?/gi, 'diez soles')
    .replace(/S\/\.?\s*5(?:\.00)?/gi, 'cinco soles')
    .replace(/S\/\.?\s*(\d+)(?:\.00)?/gi, (match, n) => `${spanishNumberToWords(n)} soles`);

  // 4. Frases académicas cuantitativas exactas (evita lectura robótica de números aislados)
  str = str
    .replace(/\b820\s*horas\b/gi, 'ochocientas veinte horas')
    .replace(/\b120\s*créditos\b/gi, 'ciento veinte créditos')
    .replace(/\b3\s*años\b/gi, 'tres años')
    .replace(/\b6\s*semestres\b/gi, 'seis semestres')
    .replace(/\b4\s*carreras\b/gi, 'cuatro carreras')
    .replace(/\b18\s*semanas\b/gi, 'dieciocho semanas')
    .replace(/\b5\s*días\s*hábiles\b/gi, 'cinco días hábiles')
    .replace(/\b24\s*a\s*48\s*horas\b/gi, 'veinticuatro a cuarenta y ocho horas')
    .replace(/\b100%\s*gratuita\b/gi, 'pública y sin mensualidades')
    .replace(/\b100%\s*gratuito\b/gi, 'público y sin mensualidades')
    .replace(/\bcien por ciento gratuita\b/gi, 'pública y sin mensualidades')
    .replace(/\bcien por ciento gratuito\b/gi, 'público y sin mensualidades')
    .replace(/\b100%\b/g, 'cien por ciento')
    .replace(/\b70%\b/g, 'setenta por ciento')
    .replace(/\b30%\b/g, 'treinta por ciento')
    .replace(/(\d+)\s*%/g, (match, n) => `${spanishNumberToWords(n)} por ciento`);

  // 5. El número '1' contextualizado en español (evita decir 'uno año' o 'uno carrera')
  str = str
    .replace(/\b1\s+(año|ciclo|semestre|crédito|mes|día|intento|módulo|pago|trámite|examen)\b/gi, 'un $1')
    .replace(/\b1\s+(carrera|semana|hora|cuota|vacante|asignatura|unidad|modalidad)\b/gi, 'una $1');

  // 6. Escalas de calificación y rangos vigesimales
  str = str
    .replace(/\b0\s*a\s*20\b/g, 'cero a veinte')
    .replace(/\b13\s*a\s*20\b/g, 'trece a veinte')
    .replace(/\bnota\s+(?:mínima\s+)?13\b/gi, 'nota mínima trece')
    .replace(/\bnota\s+13\b/gi, 'nota trece')
    .replace(/\b1\s*al\s*6\b/g, 'uno al seis');

  // 7. Números ordinales
  str = str
    .replace(/1[°º]|1ro\b/gi, 'primer')
    .replace(/2[°º]|2do\b/gi, 'segundo')
    .replace(/3[°º]|3ro\b/gi, 'tercer')
    .replace(/4[°º]|4to\b/gi, 'cuarto')
    .replace(/5[°º]|5to\b/gi, 'quinto')
    .replace(/6[°º]|6to\b/gi, 'sexto');

  // 8. Números romanos en contexto académico
  str = str
    .replace(/\bCiclos?\s+I\s+al\s+VI\b/gi, 'Ciclos uno al seis')
    .replace(/\bCiclos?\s+I\s+y\s+II\b/gi, 'Ciclos uno y dos')
    .replace(/\bCiclos?\s+III\s+y\s+IV\b/gi, 'Ciclos tres y cuatro')
    .replace(/\bCiclos?\s+V\s+y\s+VI\b/gi, 'Ciclos cinco y seis')
    .replace(/\bMódulo\s+I\b/gi, 'Módulo uno')
    .replace(/\bMódulo\s+II\b/gi, 'Módulo dos')
    .replace(/\bMódulo\s+III\b/gi, 'Módulo tres')
    .replace(/\bCiclo\s+I\b/gi, 'Ciclo uno')
    .replace(/\bCiclo\s+II\b/gi, 'Ciclo dos')
    .replace(/\bCiclo\s+III\b/gi, 'Ciclo tres')
    .replace(/\bCiclo\s+IV\b/gi, 'Ciclo cuatro')
    .replace(/\bCiclo\s+V\b/gi, 'Ciclo cinco')
    .replace(/\bCiclo\s+VI\b/gi, 'Ciclo seis')
    .replace(/\bSemestre\s+I\b/gi, 'Semestre uno')
    .replace(/\bSemestre\s+II\b/gi, 'Semestre dos')
    .replace(/\bSemestre\s+III\b/gi, 'Semestre tres')
    .replace(/\bSemestre\s+IV\b/gi, 'Semestre cuatro')
    .replace(/\bSemestre\s+V\b/gi, 'Semestre cinco')
    .replace(/\bSemestre\s+VI\b/gi, 'Semestre seis');

  // 9. Números decimales simples (ej: 12.5)
  str = str.replace(/\b(\d+)\.(\d+)\b/g, (match, n1, n2) => {
    return `${spanishNumberToWords(n1)} punto ${spanishNumberToWords(n2)}`;
  });

  // 10. Años comunes
  str = str
    .replace(/\b2026\b/g, 'dos mil veintiséis')
    .replace(/\b2025\b/g, 'dos mil veinticinco')
    .replace(/\b2024\b/g, 'dos mil veinticuatro')
    .replace(/\b2023\b/g, 'dos mil veintitrés');

  // 11. Abreviaturas de número
  str = str.replace(/N[°º]|Nro\./gi, 'número');

  // 12. Cualquier otro número cardinal aislado entre 0 y 9999
  str = str.replace(/\b(\d{1,5})\b/g, (match, num) => {
    return spanishNumberToWords(num);
  });

  return str;
}

class HercarBotApp {
  constructor() {
    this.storageStats = 'hercarbot_stats';
    this.storageApiKey = 'hercarbot_gemini_key';
    this.storageCustomFaqs = 'hercarbot_custom_faqs';
    this.storageConversations = 'hercarbot_conversations';
    this.storageActiveChatId = 'hercarbot_active_chat_id';
    this.storageTheme = 'hercarbot_theme';

    this.isMuted = false;
    this.isRecording = false;
    this.isSpeaking = false;
    this.isSubmitting = false;
    this.currentAttachedImage = null;
    this.speechHeartbeatInterval = null;
    this.activeTest = null;
    this.activeSimulator = null;
    this.recognition = null;
    this.selectedVoice = null;
    this.currentChatId = null;
    this.tourGuide = new HercarTourGuide(this);

    // Motor de Efectos de Sonido Web Audio API
    this.soundEngine = new HercarSoundEngine();

    // Memoria de Contexto Conversacional Multi-Turno
    this.context = {
      lastCareer: null,
      lastTramite: null,
      lastTopic: null,
      lastTurnTime: 0
    };

    this.initStats();
    this.initDom();
    this.initTheme();
    this.initEvents();
    this.initSpeech();
    this.initVoiceSynthesis();
    this.initConversations();
    this.initAutocomplete();
    this.initNeuralMonitor();
    this.initCommandPalette();
    this.initTour();
    this.initPwaServiceWorker();
  }

  normalizeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?¡!.,;:#$%&*()_\-+=/\[\]{}<>"']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  initTheme() {
    const savedTheme = localStorage.getItem(this.storageTheme) || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    this.updateThemeButtonIcon();
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.storageTheme, isDark ? 'dark' : 'light');
    this.updateThemeButtonIcon();
    this.showToast(isDark ? 'Modo Oscuro activado' : 'Modo Claro activado', 'info', isDark ? 'bi-moon-stars-fill' : 'bi-sun-fill');
  }

  updateThemeButtonIcon() {
    if (!this.btnThemeToggle) return;
    const isDark = document.body.classList.contains('dark-theme');
    this.btnThemeToggle.innerHTML = isDark 
      ? '<i class="bi bi-sun-fill text-warning"></i>' 
      : '<i class="bi bi-moon-stars-fill" style="color:#60a5fa;"></i>';
    this.btnThemeToggle.title = isDark ? 'Cambiar a Tema Claro' : 'Cambiar a Modo Oscuro';
  }

  initStats() {
    if (!localStorage.getItem(this.storageStats)) {
      const initialStats = {
        totalConsultas: 345,
        carrerasConsultas: { apsti: 148, ani: 85, conta: 62, dpa: 50 },
        categorias: { admision: 125, tramites: 98, pagos: 72, carreras: 50, comunicados: 40 },
        satisfaccionPositiva: 132,
        satisfaccionNegativa: 6,
        noResueltas: []
      };
      localStorage.setItem(this.storageStats, JSON.stringify(initialStats));
    }
  }

  getStats() {
    try {
      return JSON.parse(localStorage.getItem(this.storageStats)) || {};
    } catch {
      return {};
    }
  }

  saveStats(stats) {
    localStorage.setItem(this.storageStats, JSON.stringify(stats));
  }

  logQuery(category, careerId = null) {
    const stats = this.getStats();
    stats.totalConsultas = (stats.totalConsultas || 0) + 1;
    if (careerId && stats.carrerasConsultas) {
      stats.carrerasConsultas[careerId] = (stats.carrerasConsultas[careerId] || 0) + 1;
    }
    if (category && stats.categorias) {
      stats.categorias[category] = (stats.categorias[category] || 0) + 1;
    }
    this.saveStats(stats);
  }

  logUnresolved(query) {
    if (!query || query.trim().length < 3) return;
    const cleanQ = query.trim();
    const stats = this.getStats();
    if (!stats.noResueltas) stats.noResueltas = [];

    const existing = stats.noResueltas.find(item => item.query.toLowerCase() === cleanQ.toLowerCase());
    if (existing) {
      existing.veces = (existing.veces || 1) + 1;
      existing.fecha = new Date().toLocaleString();
    } else {
      stats.noResueltas.unshift({
        id: Date.now(),
        query: cleanQ,
        fecha: new Date().toLocaleString(),
        veces: 1
      });
    }
    if (stats.noResueltas.length > 50) stats.noResueltas.pop();
    this.saveStats(stats);
  }

  initDom() {
    this.sidebar = document.getElementById('app-sidebar');
    this.messagesContainer = document.getElementById('chat-messages');
    this.inputForm = document.getElementById('chat-form');
    this.inputField = document.getElementById('chat-input');
    this.btnVoice = document.getElementById('btn-voice');
    this.btnMute = document.getElementById('btn-mute');
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.btnNewChat = document.getElementById('btn-new-chat');
    this.btnHeaderNewChat = document.getElementById('btn-header-new-chat');
    this.btnExport = document.getElementById('btn-export-chat');
    this.searchHistoryInput = document.getElementById('search-history-input');
    this.voiceIndicator = document.getElementById('voice-wave-indicator');
    this.btnStopSpeech = document.getElementById('btn-stop-speech');
    this.btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    this.btnCollapseSidebar = document.getElementById('btn-collapse-sidebar');
    this.chatHistoryList = document.getElementById('chat-history-list');
    this.btnClearAllHistory = document.getElementById('btn-clear-all-history');
    this.suggestionsBox = document.getElementById('chat-suggestions-box');
    this.toastContainer = document.getElementById('hercar-toast-container');
    this.fileInput = document.getElementById('chat-file-input');
    this.btnAttachImage = document.getElementById('btn-attach-image');
    this.previewBar = document.getElementById('chat-image-preview-bar');
    this.previewImg = document.getElementById('chat-preview-img');
    this.previewName = document.getElementById('chat-preview-name');
    this.btnRemovePreview = document.getElementById('btn-remove-image-preview');
    this.voiceBanner = document.getElementById('chat-voice-recording-banner');
    this.btnCancelVoice = document.getElementById('btn-cancel-voice');
    this.btnNeuralMonitor = document.getElementById('btn-neural-monitor');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.soundIcon = document.getElementById('sound-icon');
    this.btnTestVoiceNumbers = document.getElementById('btn-test-voice-numbers');
    this.btnTestVoiceCarreras = document.getElementById('btn-test-voice-carreras');
    this.btnCommandPalette = document.getElementById('btn-command-palette');
    this.commandPaletteModal = document.getElementById('hercarCommandPalette');
    this.paletteInput = document.getElementById('paletteInput');
    this.paletteResults = document.getElementById('paletteResults');
    this.paletteCloseBtn = document.getElementById('paletteCloseBtn');
    this.voiceCompanionBar = document.getElementById('voice-companion-bar');
    this.voiceCompanionStatus = document.getElementById('voice-companion-status');
    this.btnCompanionRepeat = document.getElementById('btn-companion-repeat');
    this.btnCompanionStop = document.getElementById('btn-companion-stop');
    this.btnCompanionMute = document.getElementById('btn-companion-mute');
    this.companionMuteIcon = document.getElementById('companion-mute-icon');
    this.companionMuteLabel = document.getElementById('companion-mute-label');
    this.lastSpokenText = '';
    this.campusCarouselTimer = null;
    this.campusCarouselIdx = 0;
  }

  initEvents() {
    // Control de Efectos de Sonido UI
    if (this.btnSoundToggle) {
      this.btnSoundToggle.addEventListener('click', () => {
        const enabled = this.soundEngine.toggle();
        if (this.soundIcon) {
          this.soundIcon.className = enabled ? 'bi bi-bell-fill text-warning' : 'bi bi-bell-slash-fill text-muted';
        }
        if (this.btnSoundToggle) {
          this.btnSoundToggle.classList.toggle('sound-off', !enabled);
        }
        this.showToast(enabled ? 'Efectos de sonido UI activados 🔔' : 'Efectos de sonido UI silenciados 🔕', 'info', enabled ? 'bi-bell-fill' : 'bi-bell-slash-fill');
      });
    }

    if (this.btnTestVoiceNumbers) {
      this.btnTestVoiceNumbers.addEventListener('click', () => {
        this.speak('Las cuentas oficiales en ventanilla del Banco de la Nación son 00-638-002361 para matrícula de S/ 250.00, suficiencia y titulación, y 00-638-025736 para el curso de inglés.');
      });
    }

    if (this.btnTestVoiceCarreras) {
      this.btnTestVoiceCarreras.addEventListener('click', () => {
        this.speak('En el Instituto Superior Hermanos Cárcamo de Paita puedes estudiar cuatro Carreras Profesionales Técnicas públicas: Computación e Informática, Administración de Negocios Internacionales, Contabilidad, y Desarrollo Pesquero y Acuícola.');
      });
    }

    // Manejo de Enviar Mensaje (Con protección anti-duplicado)
    if (this.inputForm) {
      this.inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleUserSubmit();
      });
    }

    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          e.stopPropagation();
          this.handleUserSubmit();
        }
      });
    }

    // Manejo de Adjuntar Imagen o Voucher
    if (this.btnAttachImage && this.fileInput) {
      this.btnAttachImage.addEventListener('click', () => {
        this.fileInput.click();
      });

      this.fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          this.handleImageFile(file);
        }
      });
    }

    if (this.btnRemovePreview) {
      this.btnRemovePreview.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.clearAttachedImage();
      });
    }

    if (this.btnCancelVoice) {
      this.btnCancelVoice.addEventListener('click', (e) => {
        e.preventDefault();
        this.stopVoiceRecording();
      });
    }

    // Soporte para pegar capturas/imágenes con Ctrl+V directamente en el chat
    window.addEventListener('paste', (e) => {
      const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
      if (!items) return;
      for (const item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            this.handleImageFile(file);
            break;
          }
        }
      }
    });

    // Toggle de Barra Lateral (3 líneas o botón collapse)
    if (this.btnToggleSidebar) {
      this.btnToggleSidebar.addEventListener('click', () => this.toggleSidebar());
    }

    if (this.btnCollapseSidebar) {
      this.btnCollapseSidebar.addEventListener('click', () => this.toggleSidebar());
    }

    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeMobileSidebar());
    }

    // Nueva Conversación Fluida (Sin popups nativos molestos)
    if (this.btnNewChat) {
      this.btnNewChat.addEventListener('click', () => this.startNewChat());
    }

    if (this.btnHeaderNewChat) {
      this.btnHeaderNewChat.addEventListener('click', () => this.startNewChat());
    }

    // Control de Voz Silenciar / Reactivar (sincronizado con barra permanente)
    const toggleMuteState = () => {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.stopSpeaking();
      } else {
        this.syncVoiceCompanionUI('ready');
      }
      this.syncMuteButtonsUI();
    };

    if (this.btnMute) {
      this.btnMute.addEventListener('click', toggleMuteState);
    }
    if (this.btnCompanionMute) {
      this.btnCompanionMute.addEventListener('click', toggleMuteState);
    }
    if (this.btnCompanionStop) {
      this.btnCompanionStop.addEventListener('click', () => this.stopSpeaking());
    }
    if (this.btnCompanionRepeat) {
      this.btnCompanionRepeat.addEventListener('click', () => {
        if (this.isMuted) {
          this.isMuted = false;
          this.syncMuteButtonsUI();
        }
        const msgBubbles = this.messagesContainer ? this.messagesContainer.querySelectorAll('.msg-bubble-bot[data-spoken-text]') : [];
        const latestSpoken = msgBubbles.length > 0 ? msgBubbles[msgBubbles.length - 1].getAttribute('data-spoken-text') : '';
        const toRead = latestSpoken || this.lastSpokenText || '¡Hola! Soy HercarBot, tu asesora virtual del Instituto Superior Hermanos Cárcamo de Paita. Estoy lista para responder tus consultas sobre carreras técnicas públicas sin mensualidades, admisión dos mil veintiséis, Banco de la Nación y Tupa.';
        this.speak(toRead);
      });
    }
    this.syncMuteButtonsUI();

    // Toggle de Tema Oscuro / Claro
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Botón Detener Lectura
    if (this.btnStopSpeech) {
      this.btnStopSpeech.addEventListener('click', () => this.stopSpeaking());
    }

    // Exportar Transcripción
    if (this.btnExport) {
      this.btnExport.addEventListener('click', () => this.exportChatTranscript());
    }

    // Limpiar todo el historial
    if (this.btnClearAllHistory) {
      this.btnClearAllHistory.addEventListener('click', () => this.clearAllHistory());
    }

    // Buscador en Vivo en el Historial de Conversaciones
    if (this.searchHistoryInput) {
      this.searchHistoryInput.addEventListener('input', (e) => {
        this.renderHistoryList(e.target.value.trim());
      });
    }

    // Delegación global de clics para acciones, opciones y prompts
    document.addEventListener('click', (e) => {
      const btnAction = e.target.closest('[data-chat-action]');
      if (btnAction) {
        if (btnAction.disabled) return;
        const action = btnAction.getAttribute('data-chat-action');
        const val = btnAction.getAttribute('data-chat-val') || btnAction.getAttribute('data-fut-tramite');
        this.triggerAction(action, val, btnAction);
      }

      const promptBtn = e.target.closest('[data-prompt]');
      if (promptBtn) {
        // Prevenir doble ejecución si el clic viene del autocompletado
        if (this.suggestionsBox && this.suggestionsBox.contains(promptBtn)) {
          return;
        }
        const promptText = promptBtn.getAttribute('data-prompt');
        this.handleUserSubmit(promptText);
      }

      const btnLoadChat = e.target.closest('[data-load-chat]');
      if (btnLoadChat) {
        const chatId = btnLoadChat.getAttribute('data-load-chat');
        this.loadConversation(chatId);
      }

      const btnDeleteChat = e.target.closest('[data-delete-chat]');
      if (btnDeleteChat) {
        e.stopPropagation();
        const chatId = btnDeleteChat.getAttribute('data-delete-chat');
        this.deleteConversation(chatId);
      }
    });
  }

  handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      this.showToast('Por favor selecciona un archivo de imagen válido (JPG, PNG o WEBP).', 'warning', 'bi-image');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      this.showToast('La imagen es muy pesada (máx. 8 MB).', 'warning', 'bi-exclamation-circle');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      this.currentAttachedImage = {
        name: file.name,
        type: file.type,
        base64: base64Data
      };

      if (this.previewImg) this.previewImg.src = base64Data;
      if (this.previewName) this.previewName.innerText = file.name;
      if (this.previewBar) this.previewBar.style.display = 'block';
      if (this.inputField) this.inputField.focus();
      this.showToast('Imagen adjuntada. Haz tu consulta o presiona Enviar.', 'info', 'bi-image-fill');
    };
    reader.readAsDataURL(file);
  }

  clearAttachedImage() {
    this.currentAttachedImage = null;
    if (this.fileInput) this.fileInput.value = '';
    if (this.previewBar) this.previewBar.style.display = 'none';
    if (this.previewImg) this.previewImg.src = '';
  }

  /* ==========================================================================
     AUTOCOMPLETADO PREDICTIVO Y BÚSQUEDA EN TIEMPO REAL
     ========================================================================== */

  initAutocomplete() {
    if (!this.inputField || !this.suggestionsBox) return;

    let activeIndex = -1;

    const PREDEFINED_SUGGESTIONS = [
      { text: '¿Cuáles son las 4 carreras que ofrece el instituto?', prompt: '¿Cuáles son las 4 carreras que ofrece el instituto?', cat: 'carrera', icon: 'bi-mortarboard-fill', label: 'Carreras' },
      { text: 'Computación e Informática: Perfil, software y campo laboral', prompt: '¿Cómo es la carrera de Computación e Informática y cuál es su campo laboral?', cat: 'carrera', icon: 'bi-laptop', label: 'Computación e Informática' },
      { text: 'Negocios Internacionales (ANI): Comercio exterior y aduanas', prompt: '¿De qué trata la carrera de Administración de Negocios Internacionales?', cat: 'carrera', icon: 'bi-ship', label: 'ANI' },
      { text: 'Contabilidad: Finanzas, tributación y gestión empresarial', prompt: '¿Cuál es el perfil y campo de trabajo en Contabilidad?', cat: 'carrera', icon: 'bi-calculator-fill', label: 'Contabilidad' },
      { text: 'Desarrollo Pesquero y Acuícola (DPA): Recursos y plantas', prompt: '¿Qué se aprende en Desarrollo Pesquero y Acuícola en Paita?', cat: 'carrera', icon: 'bi-water', label: 'DPA' },
      { text: 'Requisitos y modalidades del Proceso de Admisión 2026', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?', cat: 'admision', icon: 'bi-file-earmark-person-fill', label: 'Admisión' },
      { text: '¿El instituto es 100% gratuito o se paga pensión mensual?', prompt: '¿El instituto es 100% gratuito o se paga pensión mensual?', cat: 'admision', icon: 'bi-cash-coin', label: 'Gratuidad' },
      { text: 'Simulador del Examen de Admisión Oficial', prompt: 'Quiero practicar el simulador de admisión', cat: 'admision', icon: 'bi-pencil-square', label: 'Simulador' },
      { text: 'Test Vocacional Inteligente (24 preguntas orientadoras)', prompt: 'Quiero hacer el test vocacional', cat: 'general', icon: 'bi-compass-fill', label: 'Test Vocacional' },
      { text: 'Guía de Matrícula paso a paso (Dónde voy y qué hago)', prompt: '¿Cómo es el proceso de matrícula paso a paso en el instituto?', cat: 'tramites', icon: 'bi-ui-checks', label: 'Matrícula' },
      { text: 'Pago en el Banco de la Nación y registro de comprobante', prompt: '¿Cómo realizo el pago en el Banco de la Nación y cómo registro mi voucher?', cat: 'pagos', icon: 'bi-bank', label: 'Pagos BN' },
      { text: 'Números de Cuenta Oficiales del Banco de la Nación (00-638-002361 y 00-638-025736)', prompt: '¿Cuáles son los números de cuenta del Banco de la Nación?', cat: 'pagos', icon: 'bi-bank2', label: 'Cuentas BN' },
      { text: 'Curso de Inglés obligatorio para titularse (Cuenta BN 00-638-025736)', prompt: '¿El curso de inglés es obligatorio para titularme según el Minedu?', cat: 'tramites', icon: 'bi-translate', label: 'Inglés' },
      { text: 'Requisitos para Examen de Suficiencia Profesional (S/ 200.00) y Título', prompt: '¿Cuáles son los requisitos para el Examen de Suficiencia Profesional?', cat: 'tramites', icon: 'bi-award-fill', label: 'Suficiencia / Título' },
      { text: 'Bolsa de trabajo y convenios para prácticas en el Puerto de Paita', prompt: '¿Cómo funciona la bolsa de trabajo y convenios para prácticas?', cat: 'general', icon: 'bi-briefcase-fill', label: 'Bolsa Trabajo' },
      { text: 'Ubicación del campus en Paita y turnos de estudio', prompt: '¿Dónde queda el campus institucional y cuál es el horario?', cat: 'general', icon: 'bi-geo-alt-fill', label: 'Ubicación' },
      { text: 'Convenios con Beca 18 y Beca Pronabec', prompt: '¿Puedo estudiar con Beca 18 o Beca Continuidad en HERCAR?', cat: 'admision', icon: 'bi-star-fill', label: 'Becas' },
      { text: 'Calculadora de Inasistencias y límite de DPI (Regla del 30%)', prompt: 'Calculadora de faltas e inasistencias DPI', cat: 'academico', icon: 'bi-calculator-fill', label: 'Calculadora DPI' },
      { text: 'Calculadora de notas y subsanación (Promedio EC 70% + EF 30%)', prompt: 'Calculadora de notas y promedio final', cat: 'academico', icon: 'bi-calculator', label: 'Notas' },
      { text: 'Cotizador y simulador de tasas y pagos TUPA', prompt: 'Cotizador de trámites TUPA', cat: 'pagos', icon: 'bi-receipt', label: 'Cotizador' },
      { text: '¿Se puede pagar por Págalo.pe o agentes? Solo ventanilla del Banco de la Nación', prompt: '¿Se puede pagar por Págalo.pe o agentes?', cat: 'pagos', icon: 'bi-bank', label: 'Canales de Pago' },
      { text: 'Mapa del campus y croquis de pabellones en Paita', prompt: 'Mapa del campus y ambientes del instituto', cat: 'general', icon: 'bi-map', label: 'Campus' },
      { text: 'Calendario Académico 2026: Inicio de clases y cronograma oficial', prompt: 'Calendario académico 2026 y fechas clave', cat: 'academico', icon: 'bi-calendar-event', label: 'Calendario' },
      { text: 'Comparativa de las 4 carreras técnicas: Perfiles y demanda', prompt: 'Comparar las 4 carreras del instituto', cat: 'carrera', icon: 'bi-columns-gap', label: 'Comparador' },
      { text: 'Sueldos promedio y empleabilidad en el Puerto de Paita', prompt: '¿Cuánto gana un egresado técnico en Paita?', cat: 'carrera', icon: 'bi-cash-stack', label: 'Sueldos' },
      { text: 'Prácticas Preprofesionales EFSRT (820 horas) y Titulación', prompt: '¿Cómo hago mis prácticas preprofesionales EFSRT?', cat: 'tramites', icon: 'bi-award-fill', label: 'EFSRT' },
      { text: '¿Hay límite de edad para postular o estudiar en el instituto?', prompt: '¿Hay límite de edad para postular o estudiar?', cat: 'admision', icon: 'bi-person-badge', label: 'Edad' },
      { text: '¿Cómo justificar inasistencias por salud o trabajo?', prompt: '¿Cómo justificar inasistencias por salud o trabajo?', cat: 'tramites', icon: 'bi-file-earmark-medical', label: 'Justificar' },
      { text: 'Recuperar contraseña del Sistema Académico o Aula Virtual', prompt: '¿Cómo recupero mi clave del sistema o aula virtual?', cat: 'tramites', icon: 'bi-key-fill', label: 'Accesos' }
    ];

    const getMatchingSuggestions = (query) => {
      const qNorm = this.normalizeText(query);
      if (qNorm.length < 2) return [];

      let matches = [];

      for (const item of PREDEFINED_SUGGESTIONS) {
        const itemNorm = this.normalizeText(item.text + ' ' + item.prompt + ' ' + item.label);
        if (itemNorm.includes(qNorm)) {
          matches.push(item);
        }
      }

      if (typeof BASE_PREGUNTAS_RESPUESTAS !== 'undefined') {
        for (const faq of BASE_PREGUNTAS_RESPUESTAS) {
          if (matches.length >= 6) break;
          const tNorm = this.normalizeText(faq.titulo);
          const kNorm = this.normalizeText((faq.keywords || []).join(' '));
          if (tNorm.includes(qNorm) || kNorm.includes(qNorm)) {
            if (!matches.some(m => m.prompt === faq.titulo)) {
              matches.push({
                text: faq.titulo,
                prompt: faq.titulo,
                cat: (faq.categorias && faq.categorias[0]) || 'general',
                icon: 'bi-chat-left-text-fill',
                label: 'Pregunta'
              });
            }
          }
        }
      }

      try {
        const customFaqs = JSON.parse(localStorage.getItem(this.storageCustomFaqs)) || [];
        for (const cf of customFaqs) {
          if (matches.length >= 7) break;
          const ctNorm = this.normalizeText(cf.titulo + ' ' + (cf.keywords || []).join(' '));
          if (ctNorm.includes(qNorm)) {
            matches.unshift({
              text: cf.titulo,
              prompt: cf.titulo,
              cat: (cf.categorias && cf.categorias[0]) || 'general',
              icon: 'bi-patch-check-fill',
              label: 'Institucional'
            });
          }
        }
      } catch (e) {}

      return matches.slice(0, 5);
    };

    const renderSuggestions = (matches) => {
      if (!matches || matches.length === 0) {
        this.suggestionsBox.style.display = 'none';
        this.suggestionsBox.innerHTML = '';
        activeIndex = -1;
        return;
      }

      activeIndex = -1;
      let html = `
        <div class="suggestion-header">
          <span><i class="bi bi-search me-1"></i>Sugerencias rápidas</span>
          <small class="text-muted">Clic o Enter para enviar</small>
        </div>
      `;

      html += matches.map((m, idx) => `
        <div class="suggestion-item" data-index="${idx}" data-prompt="${this.escapeHtml(m.prompt)}">
          <span class="suggestion-badge badge-cat-${m.cat}">
            <i class="bi ${m.icon} me-1"></i>${this.escapeHtml(m.label)}
          </span>
          <span class="suggestion-text">${this.escapeHtml(m.text)}</span>
          <i class="bi bi-arrow-up-left suggestion-arrow"></i>
        </div>
      `).join('');

      this.suggestionsBox.innerHTML = html;
      this.suggestionsBox.style.display = 'flex';
    };

    this.inputField.addEventListener('input', (e) => {
      const q = e.target.value;
      if (q.trim().length >= 2) {
        const matches = getMatchingSuggestions(q);
        renderSuggestions(matches);
      } else {
        renderSuggestions([]);
      }
    });

    this.inputField.addEventListener('keydown', (e) => {
      if (this.suggestionsBox.style.display === 'none') return;
      const items = this.suggestionsBox.querySelectorAll('.suggestion-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        items.forEach((it, idx) => it.classList.toggle('active', idx === activeIndex));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        items.forEach((it, idx) => it.classList.toggle('active', idx === activeIndex));
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        e.stopPropagation();
        const activeItem = items[activeIndex];
        if (activeItem) {
          const prompt = activeItem.getAttribute('data-prompt');
          this.suggestionsBox.style.display = 'none';
          this.handleUserSubmit(prompt);
        }
      } else if (e.key === 'Escape') {
        this.suggestionsBox.style.display = 'none';
      }
    });

    this.suggestionsBox.addEventListener('click', (e) => {
      const item = e.target.closest('.suggestion-item');
      if (item) {
        e.preventDefault();
        e.stopPropagation();
        const prompt = item.getAttribute('data-prompt');
        this.suggestionsBox.style.display = 'none';
        this.handleUserSubmit(prompt);
      }
    });

    document.addEventListener('click', (e) => {
      if (this.inputField && this.suggestionsBox && !this.inputField.contains(e.target) && !this.suggestionsBox.contains(e.target)) {
        this.suggestionsBox.style.display = 'none';
      }
    });
  }

  /* ==========================================================================
     INICIALIZACIÓN DEL MINI TOUR GUIADO INTERACTIVO Y HERRAMIENTAS WEB
     ========================================================================== */

  initTour() {
    const btnStartTour = document.getElementById('btn-start-tour');
    if (btnStartTour) {
      btnStartTour.addEventListener('click', () => {
        if (this.tourGuide) this.tourGuide.start();
      });
    }

    const btnSidebarTour = document.getElementById('btn-sidebar-tour');
    if (btnSidebarTour) {
      btnSidebarTour.addEventListener('click', () => {
        if (this.tourGuide) this.tourGuide.start();
      });
    }

    // Alternador de Modo Widget Flotante sobre ieshercar.edu.pe
    const btnWidget = document.getElementById('btn-toggle-widget-mode');
    const widgetLauncher = document.getElementById('hercar-widget-launcher');

    if (btnWidget) {
      btnWidget.addEventListener('click', () => {
        document.body.classList.remove('hercar-widget-minimized');
        document.body.classList.toggle('hercar-widget-mode');
        const isWidget = document.body.classList.contains('hercar-widget-mode');
        this.showToast(isWidget ? '🗗 Modo Widget Flotante activado sobre portal oficial' : 'Modo Pantalla Completa restaurado', 'info', 'bi-window-stack');
      });
    }

    if (widgetLauncher) {
      widgetLauncher.addEventListener('click', () => {
        document.body.classList.remove('hercar-widget-minimized');
        document.body.classList.add('hercar-widget-mode');
        this.playSound('tap');
      });
    }

    // Atajo de acceso administrativo rápido para docentes: Ctrl + Shift + A
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        window.location.href = 'login.html';
      }
    });

    this.initFutEvents();
  }

  /* ==========================================================================
     SISTEMA DINÁMICO DE GENERACIÓN DE FORMATO ÚNICO DE TRÁMITE (FUT)
     ========================================================================== */

  initFutEvents() {
    const btnOpenFut = document.getElementById('btn-open-fut-modal');
    if (btnOpenFut) {
      btnOpenFut.addEventListener('click', () => this.openFutModal());
    }

    const chipFut = document.getElementById('chip-generar-fut');
    if (chipFut) {
      chipFut.addEventListener('click', () => this.openFutModal());
    }

    const btnCloseFut1 = document.getElementById('btn-close-fut-modal');
    if (btnCloseFut1) {
      btnCloseFut1.addEventListener('click', () => this.closeFutModal());
    }

    const btnCloseFut2 = document.getElementById('futCloseBtn');
    if (btnCloseFut2) {
      btnCloseFut2.addEventListener('click', () => this.closeFutModal());
    }

    const btnPrintFut = document.getElementById('futPrintBtn');
    if (btnPrintFut) {
      btnPrintFut.addEventListener('click', () => this.printFutDocument());
    }

    const btnDownloadFut = document.getElementById('futDownloadBtn');
    if (btnDownloadFut) {
      btnDownloadFut.addEventListener('click', () => this.downloadFutHtml());
    }

    const selectTramite = document.getElementById('futTramite');
    if (selectTramite) {
      selectTramite.addEventListener('change', () => this.updateFutFormByTramite());
    }

    const btnDemo = document.getElementById('btn-fut-demo-data');
    if (btnDemo) {
      btnDemo.addEventListener('click', () => this.fillFutDemoData());
    }

    const btnCopyBn = document.getElementById('btnCopyBnFut');
    if (btnCopyBn) {
      btnCopyBn.addEventListener('click', () => {
        navigator.clipboard?.writeText('00-638-002361').then(() => {
          this.showToast('Cuenta Banco de la Nación copiada: 00-638-002361', 'success', 'bi-clipboard-check');
        });
      });
    }

    // Botones de Plantillas Rápidas (Empresa, Colegio, Convenio, Modular, Limpiar)
    document.querySelectorAll('.fut-tpl-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tpl = btn.dataset.tpl;
        if (tpl) this.applyFutTemplate(tpl);
      });
    });

    // Selector Rápido de Tipo de Entidad (Empresa, Colegio, Convenio)
    document.querySelectorAll('#futEntityQuickType button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('#futEntityQuickType button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const etype = btn.dataset.etype;
        if (etype) this.setFutEntityType(etype);
      });
    });

    // Rastrear cuando el usuario edita o escribe manualmente su fundamentación
    const txtDetalle = document.getElementById('futDetalle');
    if (txtDetalle) {
      txtDetalle.addEventListener('input', () => {
        txtDetalle.dataset.userEdited = 'true';
      });
    }

    // Cerrar al hacer click fuera del cuadro
    const modalEl = document.getElementById('modalGeneradorFUT');
    if (modalEl) {
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) this.closeFutModal();
      });
    }
  }

  getFutConfig(key) {
    const map = {
      'carta_practicas': {
        sumilla: 'SOLICITO CARTA DE PRESENTACIÓN PARA PRÁCTICAS PREPROFESIONALES (EFSRT)',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'Gratuito',
        plazo: '24 a 48 horas hábiles',
        wrap: 'futEmpresaWrap',
        defaultEntity: 'empresa',
        draft: (d) => `Que, de conformidad con la Ley Nº 30512 de Institutos y Escuelas de Educación Superior y el Reglamento de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT), solicito se sirva disponer la emisión de mi CARTA DE PRESENTACIÓN OFICIAL dirigida a ${d.cargo || 'la jefatura o representante correspondiente'} de "${d.empresa || 'la empresa receptora'}" para el área de ${d.area || 'prácticas formativas según mi especialidad'}, a efectos de realizar mis prácticas preprofesionales modulares conducentes a la certificación y titulación en mi carrera.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: false, practicas: true, medicos: false }
      },
      'carta_practicas_colegio': {
        sumilla: 'SOLICITO CARTA DE PRESENTACIÓN PARA PRÁCTICAS EN COLEGIO / I.E. (EFSRT)',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'Gratuito',
        plazo: '24 a 48 horas hábiles',
        wrap: 'futEmpresaWrap',
        defaultEntity: 'colegio',
        draft: (d) => `Que, al amparo de las normas del Ministerio de Educación y el Reglamento de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT) del IESTP Hermanos Cárcamo, solicito a su digno despacho la emisión de mi CARTA DE PRESENTACIÓN OFICIAL dirigida a ${d.cargo || 'la Dirección del Colegio / I.E.'} de "${d.empresa || 'Colegio o Institución Educativa correspondiente'}", a efectos de realizar mis prácticas preprofesionales en ${d.area || 'el Aula de Cómputo / Soporte / Administración'}.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: false, practicas: true, medicos: false }
      },
      'carta_practicas_convenio': {
        sumilla: 'SOLICITO CARTA DE PRESENTACIÓN PARA PRÁCTICAS POR CONVENIO INTERINSTITUCIONAL',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'Gratuito',
        plazo: '24 a 48 horas hábiles',
        wrap: 'futEmpresaWrap',
        defaultEntity: 'convenio',
        draft: (d) => `Que, en el marco del Convenio de Cooperación Interinstitucional suscrito entre el IESTP Hermanos Cárcamo de Paita y "${d.empresa || 'Entidad Receptora del Convenio'}", solicito se sirva ordenar la expedición de mi CARTA DE PRESENTACIÓN OFICIAL para dar inicio a mis prácticas preprofesionales (EFSRT) correspondientes a mi plan de estudios con arreglo a las cláusulas estipuladas.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: false, practicas: true, medicos: false }
      },
      'constancia_practicas': {
        sumilla: 'SOLICITO ACREDITACIÓN Y CONSTANCIA DE HORAS DE PRÁCTICAS EFSRT',
        autoridad: 'JEFATURA DE UNIDAD ACADÉMICA / COORDINACIÓN DE CARRERA',
        costo: 'S/ 20.00 Carpeta EFSRT / S/ 25.00 Convalidación PPP (TUPA 2026 BN)',
        plazo: '3 a 5 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo culminado satisfactoriamente mis prácticas preprofesionales (EFSRT) y habiendo presentado el Plan de Trabajo, Hoja de Evaluación del Empleador e Informe Final visado, solicito se me otorgue la Constancia de Acreditación de Prácticas Preprofesionales correspondiente.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: true, medicos: false }
      },
      'cert_modular': {
        sumilla: 'SOLICITO CERTIFICADO MODULAR PROGRESIVO OFICIAL',
        autoridad: 'SECRETARÍA ACADÉMICA DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 25.00 (TUPA 2026 — Cta. BN 00-638-002361)',
        plazo: '5 a 7 días hábiles',
        wrap: 'futModuloWrap',
        draft: (d) => `Que, habiendo culminado y aprobado la totalidad de unidades didácticas y horas de prácticas preprofesionales (EFSRT) correspondientes al ${d.modulo || 'Módulo Formativo I'} del plan de estudios de mi programa, solicito la expedición de mi CERTIFICADO MODULAR PROGRESIVO con valor oficial MINEDU.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: false, practicas: true, medicos: false }
      },
      'cert_modular_convenio': {
        sumilla: 'SOLICITO CERTIFICADO MODULAR CONVALIDANDO PRÁCTICAS POR CONVENIO',
        autoridad: 'SECRETARÍA ACADÉMICA DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 25.00 (TUPA 2026 — Cta. BN 00-638-002361)',
        plazo: '5 a 7 días hábiles',
        wrap: 'futModuloWrap',
        draft: (d) => `Que, habiendo aprobado los créditos curriculares y validado las horas de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT) ejecutadas en el marco del Convenio de Cooperación Interinstitucional, solicito se sirva expedir mi CERTIFICADO MODULAR PROGRESIVO correspondiente al ${d.modulo || 'Módulo Formativo I'} con reconocimiento oficial.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: false, practicas: true, medicos: false }
      },
      'cert_estudios_completo': {
        sumilla: 'SOLICITO CERTIFICADO OFICIAL DE ESTUDIOS COMPLETO (I AL VI CICLO)',
        autoridad: 'SECRETARÍA ACADÉMICA DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 240.00 6 Periodos / S/ 40.00 por Periodo (TUPA 2026 BN)',
        plazo: '3 a 5 días hábiles',
        wrap: null,
        draft: () => `Que, para fines laborales y de prosecución de estudios superiores, solicito se me expida mi CERTIFICADO OFICIAL DE ESTUDIOS correspondiente a la totalidad de semestres académicos cursados en el instituto, para lo cual adjunto los requisitos del TUPA.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: true, practicas: false, medicos: false }
      },
      'titulacion_profesional': {
        sumilla: 'SOLICITO EXPEDICIÓN DE TÍTULO PROFESIONAL TÉCNICO A NOMBRE DE LA NACIÓN',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 160.00 (Formato S/ 60.00 + Derecho Titulación S/ 100.00 — BN 00-638-002361)',
        plazo: '30 a 45 días hábiles (Registro MINEDU)',
        wrap: null,
        draft: () => `Que, habiendo culminado satisfactoriamente los 120 créditos curriculares, los 3 certificados modulares oficiales, el curso de inglés institucional y habiendo aprobado el proceso de sustentación de Proyecto / Examen de Suficiencia, solicito la expedición de mi TÍTULO PROFESIONAL TÉCNICO A NOMBRE DE LA NACIÓN e inscripción en el Registro Nacional de Títulos del MINEDU.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: true, practicas: true, medicos: false }
      },
      'constancia_egresado': {
        sumilla: 'SOLICITO CONSTANCIA OFICIAL DE EGRESADO',
        autoridad: 'SECRETARÍA ACADÉMICA DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 15.00 (TUPA 2026 — Cta. BN 00-638-002361)',
        plazo: '2 a 3 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo culminado satisfactoriamente los seis semestres académicos del plan curricular de mi carrera, solicito se me extienda mi CONSTANCIA DE EGRESADO para los trámites laborales y profesionales pertinentes.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'duplicado_titulo': {
        sumilla: 'SOLICITO DUPLICADO DE DIPLOMA DE TÍTULO PROFESIONAL TÉCNICO',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 200.00 (TUPA 2026 — Trámite y Formato Cta. 00-638-002361)',
        plazo: '15 a 20 días hábiles',
        wrap: null,
        draft: () => `Que, habiéndose extraviado/deteriorado mi diploma original y habiendo realizado la denuncia policial y publicación correspondiente, solicito la expedición del DUPLICADO DE MI DIPLOMA DE TÍTULO PROFESIONAL TÉCNICO.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: false, practicas: false, medicos: false }
      },
      'matricula_extemporanea': {
        sumilla: 'SOLICITO AUTORIZACIÓN PARA MATRÍCULA EXTEMPORÁNEA',
        autoridad: 'DIRECCIÓN GENERAL / JEFATURA DE UNIDAD ACADÉMICA',
        costo: 'S/ 250.00 Matrícula Ordinaria (BN Cta. 00-638-002361)',
        plazo: '2 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo vencido el plazo regular de matrícula por motivos de fuerza mayor debidamente justificados y encontrándome habilitado académicamente, solicito se autorice mi matrícula extemporánea en el periodo lectivo en curso.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'reserva_matricula': {
        sumilla: 'SOLICITO RESERVA DE MATRÍCULA / LICENCIA DE ESTUDIOS',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 60.00 Ingresantes · S/ 100.00 Licencia 2do–6to Sem. (TUPA 2026 BN)',
        plazo: '2 a 3 días hábiles',
        wrap: null,
        draft: () => `Que, por razones estrictamente personales y de fuerza mayor que me impiden continuar mis estudios en el presente semestre académico, solicito la RESERVA DE MI MATRÍCULA asegurando mi vacante para el reingreso respectivo según el Reglamento Institucional.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'reingreso_estudios': {
        sumilla: 'SOLICITO REINGRESO / REINCORPORACIÓN DE ESTUDIOS',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 65.00 (TUPA 2026 — Cta. BN 00-638-002361)',
        plazo: '2 a 3 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo culminado el periodo de reserva de matrícula concedido, solicito mi REINGRESO Y REINCORPORACIÓN al semestre académico correspondiente en mi carrera profesional.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'convalidacion_cursos': {
        sumilla: 'SOLICITO CONVALIDACIÓN DE UNIDADES DIDÁCTICAS',
        autoridad: 'JEFATURA DE UNIDAD ACADÉMICA / COORDINACIÓN DE CARRERA',
        costo: 'S/ 30.00 por Unidad Didáctica (TUPA 2026 — Cta. BN 00-638-002361)',
        plazo: '5 a 7 días hábiles',
        wrap: 'futConvalidacionWrap',
        draft: (d) => `Que, habiendo cursado estudios superiores en "${d.convalInst || 'otra institución de educación superior'}", solicito la CONVALIDACIÓN DE UNIDADES DIDÁCTICAS afines a mi plan de estudios actual, para lo cual adjunto mis certificados y sílabos oficiales visados.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: true, practicas: false, medicos: false }
      },
      'traslado_interno': {
        sumilla: 'SOLICITO TRASLADO INTERNO DE PROGRAMA DE ESTUDIOS',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 80.00 (TUPA 2026 — Cta. BN 00-638-002361)',
        plazo: '3 a 5 días hábiles',
        wrap: null,
        draft: () => `Que, de acuerdo al reglamento institucional y existiendo vacantes disponibles, solicito mi TRASLADO INTERNO de programa de estudios, comprometiéndome a cursar las unidades didácticas complementarias requeridas.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: true, practicas: false, medicos: false }
      },
      'subsanacion_recuperacion': {
        sumilla: 'SOLICITO EVALUACIÓN DE RECUPERACIÓN / EXTRAORDINARIA',
        autoridad: 'JEFATURA DE UNIDAD ACADÉMICA',
        costo: 'S/ 35.00 Recuperación / S/ 200–300 Eval. Extraordinaria (TUPA 2026 BN)',
        plazo: '2 días hábiles',
        wrap: null,
        draft: () => `Que, teniendo pendiente una unidad didáctica desaprobada del semestre anterior y cumpliendo los requisitos reglamentarios, solicito se me autorice rendir la EVALUACIÓN EXTRAORDINARIA DE SUBSANACIÓN correspondiente.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: true, practicas: false, medicos: false }
      },
      'retiro_semestre': {
        sumilla: 'SOLICITO RETIRO TEMPORAL DE SEMESTRE ACADÉMICO',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'Gratuito',
        plazo: '2 días hábiles',
        wrap: null,
        draft: () => `Que, por circunstancias personales sobrevinientes imprevistas, solicito mi RETIRO TEMPORAL del semestre académico en curso para los fines de resguardo de mi récord de notas.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'constancia_matricula': {
        sumilla: 'SOLICITO CONSTANCIA DE MATRÍCULA / ESTUDIOS OFICIAL',
        autoridad: 'SECRETARÍA ACADÉMICA DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 15.00 (Tasa TUPA BN)',
        plazo: '24 a 48 horas hábiles',
        wrap: null,
        draft: () => `Que, requiriendo acreditar mi condición de estudiante regular matriculado en el presente periodo lectivo para trámites de seguro/beneficio familiar/laboral, solicito la expedición de mi CONSTANCIA DE MATRÍCULA Y ESTUDIOS oficial.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'constancia_no_adeudo': {
        sumilla: 'SOLICITO CONSTANCIA GENERAL DE NO ADEUDAR A LA INSTITUCIÓN',
        autoridad: 'DIRECCIÓN GENERAL / SECRETARÍA GENERAL',
        costo: 'S/ 15.00 (Tasa TUPA BN)',
        plazo: '24 horas hábiles',
        wrap: null,
        draft: () => `Que, para efectos de trámites de titulación/egreso y no teniendo bienes, libros ni obligaciones económicas pendientes con el instituto, solicito se me otorgue la CONSTANCIA DE NO ADEUDAR.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'carne_estudiantil': {
        sumilla: 'SOLICITO DUPLICADO / EMISIÓN DE CARNÉ DE ESTUDIANTE (MEDIO PASAJE)',
        autoridad: 'SECRETARÍA ACADÉMICA DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'S/ 20.00 (Tasa oficial MINEDU)',
        plazo: 'Según remesa MINEDU',
        wrap: null,
        draft: () => `Que, habiendo cancelado los derechos respectivos, solicito se tramite ante el MINEDU la expedición/duplicado de mi CARNÉ OFICIAL DE ESTUDIANTE para el ejercicio del derecho de medio pasaje y acreditación académica.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: false, practicas: false, medicos: false }
      },
      'justificacion_inasistencia': {
        sumilla: 'SOLICITO JUSTIFICACIÓN DE INASISTENCIAS A CLASES',
        autoridad: 'JEFATURA DE UNIDAD ACADÉMICA / COORDINACIÓN DE CARRERA',
        costo: 'Gratuito',
        plazo: '2 días hábiles',
        wrap: 'futJustificacionWrap',
        draft: (d) => `Que, habiendo faltado a clases en el periodo "${d.justifFechas || 'indicado en los adjuntos'}" por motivos de "${d.justifMotivo || 'salud debidamente acreditada'}", solicito la JUSTIFICACIÓN DE MIS INASISTENCIAS adjuntando el descanso médico/constancia probatoria correspondiente.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: false, practicas: false, medicos: true }
      },
      'rectificacion_notas': {
        sumilla: 'SOLICITO RECTIFICACIÓN DE NOMBRES O CALIFICACIONES',
        autoridad: 'SECRETARÍA ACADÉMICA / COORDINACIÓN ACADÉMICA',
        costo: 'Gratuito',
        plazo: '3 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo advertido un error material involuntario en el registro de mis calificaciones/datos patronímicos en el acta respectiva, solicito la RECTIFICACIÓN conforme a la documentación probatoria que adjunto.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: true, practicas: false, medicos: false }
      },
      'solicitud_libre': {
        sumilla: 'SOLICITO ATENCIÓN A PETICIÓN INSTITUCIONAL',
        autoridad: 'DIRECCIÓN GENERAL DEL INSTITUTO SUPERIOR HERMANOS CÁRCAMO',
        costo: 'Gratuito (o según TUPA)',
        plazo: '3 a 5 días hábiles',
        wrap: 'futOtroWrap',
        draft: (d) => d.otro ? `Que, por el presente documento recurro a su despacho para solicitar: ${d.otro}.` : `Que, por convenir a mis legítimos intereses formativos y académicos, recurro a su digno despacho para solicitar la atención de lo expuesto en el presente documento con arreglo a ley.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: false, practicas: false, medicos: false }
      }
    };
    return map[key] || map['carta_practicas'];
  }

  openFutModal(tramiteKey = null, extraData = {}) {
    const modal = document.getElementById('modalGeneradorFUT');
    if (!modal) return;
    modal.classList.add('open');

    if (tramiteKey) {
      const select = document.getElementById('futTramite');
      if (select) {
        select.value = tramiteKey;
      }
    }

    if (extraData.empresaNombre) {
      const el = document.getElementById('futEmpresaNombre');
      if (el) el.value = extraData.empresaNombre;
    }
    if (extraData.empresaCargo) {
      const el = document.getElementById('futEmpresaCargo');
      if (el) el.value = extraData.empresaCargo;
    }

    // Al abrir el generador, dejamos el cuadro de fundamentación EN BLANCO por defecto
    // para que el estudiante redacte directamente con sus propias palabras, sin imponer texto dummy.
    const textarea = document.getElementById('futDetalle');
    if (textarea && !extraData.preserveText) {
      textarea.value = '';
      textarea.dataset.userEdited = 'false';
    }

    this.updateFutFormByTramite(false);
    this.playSound('tap');
  }

  closeFutModal() {
    const modal = document.getElementById('modalGeneradorFUT');
    if (modal) modal.classList.remove('open');
  }

  setFutEntityType(etype) {
    const lblNom = document.getElementById('lblEmpresaNombre');
    const lblCar = document.getElementById('lblEmpresaCargo');
    const lblAre = document.getElementById('lblEmpresaArea');
    const inpNom = document.getElementById('futEmpresaNombre');
    const inpCar = document.getElementById('futEmpresaCargo');
    const inpAre = document.getElementById('futEmpresaArea');

    if (etype === 'colegio') {
      if (lblNom) lblNom.innerText = 'Nombre del Colegio / Institución Educativa:';
      if (lblCar) lblCar.innerText = 'Dirigido a (Director/a de la I.E.):';
      if (lblAre) lblAre.innerText = 'Área escolar donde practicará (AIP / Cómputo / Administración):';
      if (inpNom && !inpNom.value) inpNom.placeholder = 'Ej: Nombre del Colegio o Institución Educativa';
      if (inpCar && !inpCar.value) inpCar.placeholder = 'Ej: Director(a) de la Institución Educativa';
      if (inpAre && !inpAre.value) inpAre.placeholder = 'Ej: Aula de Innovación Pedagógica (AIP) / Soporte TI / Centro de Cómputo';
    } else if (etype === 'convenio') {
      if (lblNom) lblNom.innerText = 'Entidad Receptora del Convenio Marco:';
      if (lblCar) lblCar.innerText = 'Representante o Responsable del Convenio:';
      if (lblAre) lblAre.innerText = 'Área o Dependencia designada en Convenio:';
      if (inpNom && !inpNom.value) inpNom.placeholder = 'Ej: Entidad Receptora (Municipalidad de Paita / UGEL / Empresa del Convenio)';
      if (inpCar && !inpCar.value) inpCar.placeholder = 'Ej: Representante Institucional del Convenio';
      if (inpAre && !inpAre.value) inpAre.placeholder = 'Ej: Área Técnica de Prácticas según Convenio de Cooperación';
    } else {
      // Empresa Privada
      if (lblNom) lblNom.innerText = 'Nombre de la Empresa o Razón Social:';
      if (lblCar) lblCar.innerText = 'Dirigido a (Representante o Cargo):';
      if (lblAre) lblAre.innerText = 'Área o Departamento donde practicará:';
      if (inpNom && !inpNom.value) inpNom.placeholder = 'Ej: Nombre de la Empresa o Razón Social';
      if (inpCar && !inpCar.value) inpCar.placeholder = 'Ej: Gerente General / Jefatura de Recursos Humanos';
      if (inpAre && !inpAre.value) inpAre.placeholder = 'Ej: Área de Soporte de TI y Redes / Contabilidad y Costos / Planta';
    }
  }

  applyFutTemplate(tplType) {
    const textarea = document.getElementById('futDetalle');
    if (!textarea) return;

    if (tplType === 'limpiar') {
      textarea.value = '';
      textarea.dataset.userEdited = 'true';
      textarea.focus();
      this.showToast('Cuadro de fundamentación en blanco. Escribe tu solicitud con tus propias palabras.', 'info', 'bi-eraser');
      return;
    }

    const empNombre = document.getElementById('futEmpresaNombre')?.value.trim();
    const empCargo = document.getElementById('futEmpresaCargo')?.value.trim();
    const empArea = document.getElementById('futEmpresaArea')?.value.trim();
    const moduloNum = document.getElementById('futModuloNum')?.value || 'Módulo Formativo I';

    let textToInsert = '';

    if (tplType === 'empresa') {
      const targetEmp = empNombre || 'la empresa receptora';
      const targetCar = empCargo || 'la jefatura de Recursos Humanos';
      const targetAre = empArea || 'el área correspondiente de su representada';
      textToInsert = `Que, de conformidad con la Ley Nº 30512 de Institutos y Escuelas de Educación Superior y el Reglamento de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT), solicito se sirva disponer la emisión de mi CARTA DE PRESENTACIÓN OFICIAL dirigida a ${targetCar} de la empresa/institución "${targetEmp}", a efectos de realizar mis prácticas preprofesionales en el área de ${targetAre}, requisito curricular indispensable para mi certificación modular y titulación profesional.`;
      this.showToast('Plantilla formal para Empresa Privada cargada con éxito.', 'success', 'bi-building');
    } else if (tplType === 'colegio') {
      const targetCol = empNombre || 'el Colegio / Institución Educativa';
      const targetCar = empCargo || 'la Dirección de la Institución Educativa';
      const targetAre = empArea || 'el Aula de Innovación Pedagógica (AIP), Centro de Cómputo y Soporte Tecnológico';
      textToInsert = `Que, al amparo de las normas del Ministerio de Educación y el Reglamento de EFSRT del IESTP Hermanos Cárcamo, solicito a su digno despacho la emisión de mi CARTA DE PRESENTACIÓN OFICIAL dirigida a ${targetCar} de la "${targetCol}", a efectos de realizar mis prácticas preprofesionales apoyando en ${targetAre}, cumpliendo con las horas formativas de mi plan curricular.`;
      this.showToast('Plantilla formal para Colegio / I.E. cargada con éxito.', 'success', 'bi-mortarboard');
    } else if (tplType === 'convenio') {
      const targetEnt = empNombre || 'la entidad receptora';
      textToInsert = `Que, en el marco del Convenio de Cooperación Interinstitucional vigente celebrado entre el IESTP Hermanos Cárcamo de Paita y "${targetEnt}", solicito se sirva ordenar la expedición de mi CARTA DE PRESENTACIÓN OFICIAL para dar inicio formal a mis prácticas preprofesionales (EFSRT), conforme a las cláusulas y compromisos formativos estipulados en el citado convenio.`;
      this.showToast('Plantilla formal bajo Convenio Marco cargada con éxito.', 'success', 'bi-handshake');
    } else if (tplType === 'modular') {
      textToInsert = `Que, habiendo culminado satisfactoriamente los créditos curriculares y acreditado las horas de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT) realizadas mediante constancia de prácticas (por empresa / colegio / convenio interinstitucional), solicito se sirva expedir mi CERTIFICADO MODULAR PROGRESIVO correspondiente al ${moduloNum} de mi programa de estudios, con valor oficial del MINEDU.`;
      this.showToast('Plantilla para Certificado Modular cargada con éxito.', 'success', 'bi-award');
    }

    textarea.value = textToInsert;
    textarea.dataset.userEdited = 'true';
    textarea.focus();
  }

  updateFutFormByTramite(shouldResetText = false) {
    const select = document.getElementById('futTramite');
    const key = select ? select.value : 'carta_practicas';
    const cfg = this.getFutConfig(key);

    // 1. Actualizar Tarjeta Informativa TUPA
    const elAut = document.getElementById('futInfoAutoridad');
    const elCost = document.getElementById('futInfoCosto');
    const elPlazo = document.getElementById('futInfoPlazo');
    if (elAut) elAut.innerText = cfg.autoridad;
    if (elCost) elCost.innerText = cfg.costo;
    if (elPlazo) elPlazo.innerText = cfg.plazo;

    // 2. Mostrar/Ocultar campos condicionales
    ['futEmpresaWrap', 'futModuloWrap', 'futConvalidacionWrap', 'futJustificacionWrap', 'futOtroWrap'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = (cfg.wrap === id) ? 'block' : 'none';
    });

    // Sincronizar pills de tipo de entidad si aplica
    if (cfg.defaultEntity) {
      document.querySelectorAll('#futEntityQuickType button').forEach(b => {
        b.classList.toggle('active', b.dataset.etype === cfg.defaultEntity);
      });
      this.setFutEntityType(cfg.defaultEntity);
    }

    // 3. Actualizar checkboxes de requisitos
    if (cfg.reqs) {
      const setCheck = (id, val) => { const c = document.getElementById(id); if (c) c.checked = !!val; };
      setCheck('futAdjDni', cfg.reqs.dni);
      setCheck('futAdjVoucher', cfg.reqs.voucher);
      setCheck('futAdjFotos', cfg.reqs.fotos);
      setCheck('futAdjNotas', cfg.reqs.notas);
      setCheck('futAdjPracticas', cfg.reqs.practicas);
      setCheck('futAdjMedicos', cfg.reqs.medicos);
    }

    // IMPORTANTE: NO sobreescribimos futDetalle si el usuario desea escribir o dejarlo en blanco.
    if (shouldResetText) {
      this.updateFutDetailText(true);
    }
  }

  updateFutDetailText(forceReset = false) {
    const select = document.getElementById('futTramite');
    const key = select ? select.value : 'carta_practicas';
    const cfg = this.getFutConfig(key);
    const textarea = document.getElementById('futDetalle');
    if (!textarea) return;

    if (!forceReset && textarea.dataset.userEdited === 'true') {
      return; // respetar texto escrito por el usuario
    }

    const data = {
      empresa: document.getElementById('futEmpresaNombre')?.value.trim(),
      cargo: document.getElementById('futEmpresaCargo')?.value.trim(),
      area: document.getElementById('futEmpresaArea')?.value.trim(),
      modulo: document.getElementById('futModuloNum')?.value,
      convalInst: document.getElementById('futConvalInst')?.value.trim(),
      justifMotivo: document.getElementById('futJustifMotivo')?.value,
      justifFechas: document.getElementById('futJustifFechas')?.value.trim(),
      otro: document.getElementById('futOtroTexto')?.value.trim()
    };

    textarea.value = cfg.draft(data);
    textarea.dataset.userEdited = 'true';
  }

  fillFutDemoData() {
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('futNombre', 'ESTUDIANTE EJEMPLO (NOMBRES Y APELLIDOS)');
    setVal('futDni', '12345678');
    setVal('futTelefono', '987 654 321');
    setVal('futCorreo', 'estudiante@ieshercar.edu.pe');
    setVal('futCarrera', 'Computación e Informática');
    setVal('futCiclo', 'Semestre V (Quinto Ciclo)');
    setVal('futDireccion', 'Paita, Piura');
    setVal('futEmpresaNombre', 'Colegio Tal / Empresa Receptora');
    setVal('futEmpresaCargo', 'Dirección del Plantel / Jefatura de Recursos Humanos');
    setVal('futEmpresaArea', 'Aula de Innovación Pedagógica (AIP) y Soporte Tecnológico');
    
    const textarea = document.getElementById('futDetalle');
    if (textarea && (!textarea.value || textarea.value.trim() === '')) {
      this.applyFutTemplate('colegio');
    }
    this.showToast('Datos de prueba cargados con éxito para demostración.', 'info', 'bi-magic');
  }

  collectFutFormData() {
    const getVal = (id, def = '') => (document.getElementById(id)?.value || def).trim();
    const select = document.getElementById('futTramite');
    const key = select ? select.value : 'carta_practicas';
    const cfg = this.getFutConfig(key);

    const isChecked = (id) => !!document.getElementById(id)?.checked;
    const reqList = [];
    if (isChecked('futAdjDni')) reqList.push('Copia legible de DNI vigente del solicitante');
    if (isChecked('futAdjVoucher')) reqList.push(`Comprobante de depósito presencial en ventanilla del Banco de la Nación (${cfg.costo}) - Cta. Cte. N° 00-638-002361`);
    if (isChecked('futAdjFotos')) reqList.push('Fotografías tamaño carné / pasaporte en fondo blanco');
    if (isChecked('futAdjNotas')) reqList.push('Récord académico / Certificado de notas oficial');
    if (isChecked('futAdjPracticas')) reqList.push('Aceptación / Constancia de prácticas preprofesionales EFSRT');
    if (isChecked('futAdjMedicos')) reqList.push('Certificado médico / Constancia laboral justificatoria');

    const enteredDetalle = getVal('futDetalle');
    const defaultLegalText = `Que, de conformidad con lo establecido en el Reglamento Institucional y el TUPA del Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" de Paita, recurro a su digno despacho a fin de solicitar la debida atención a mi petitorio de ${cfg.sumilla}, dando cumplimiento a los requisitos documentarios establecidos con arreglo a ley.`;

    return {
      id: 'fut_' + Date.now(),
      key,
      sumilla: cfg.sumilla,
      autoridad: cfg.autoridad,
      costo: cfg.costo,
      plazo: cfg.plazo,
      nombre: getVal('futNombre', 'ESTUDIANTE SOLICITANTE'),
      dni: getVal('futDni', '--------'),
      telefono: getVal('futTelefono', '--------'),
      correo: getVal('futCorreo', 'estudiante@ieshercar.edu.pe'),
      carrera: getVal('futCarrera', 'Computación e Informática'),
      ciclo: getVal('futCiclo', 'Semestre V'),
      direccion: getVal('futDireccion', 'Paita, Piura'),
      detalle: enteredDetalle || defaultLegalText,
      requisitos: reqList,
      fechaDoc: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
      fechaISO: new Date().toLocaleString()
    };
  }

  buildFutHtmlDocument(data) {
    const expNum = `EXP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const reqsHtml = data.requisitos.map((r, i) => `<div>[ X ] &nbsp; <strong>${i + 1}.</strong> ${r}</div>`).join('');
    const reqsCargoHtml = data.requisitos.map((r, i) => `<div>✓ &nbsp; <strong>${i + 1}.</strong> ${r}</div>`).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>FUT Oficial - ${data.nombre} - ${data.sumilla}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 10pt;
      line-height: 1.38;
    }

    /* Barra Superior Interactiva (Solo en Pantalla, Oculta al Imprimir) */
    .no-print {
      background: #0f2d6c;
      color: #ffffff;
      padding: 10px 18px;
      margin: -12mm -15mm 15px -15mm;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-family: system-ui, sans-serif;
      font-size: 13px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.18);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .no-print-btn {
      border: none;
      padding: 7px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
      font-size: 12px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-page-mode {
      background: rgba(255, 255, 255, 0.18);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.35);
    }
    .btn-page-mode.active {
      background: #38bdf8;
      color: #0c1c38;
      border-color: #38bdf8;
    }
    .btn-print-action {
      background: #f59e0b;
      color: #0f172a;
    }
    .btn-print-action:hover {
      background: #fbbf24;
    }

    /* Estructura de Páginas A4 */
    .page-sheet {
      position: relative;
    }
    .page-break {
      page-break-before: always !important;
      break-before: page !important;
      margin-top: 15mm;
    }

    /* Encabezado Institucional */
    .fut-header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 2.2px solid #0f2d6c;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .fut-header-table td { vertical-align: middle; }
    .inst-title-main {
      font-size: 10.8pt;
      font-weight: 800;
      color: #0f2d6c;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      line-height: 1.2;
    }
    .inst-subtitle {
      font-size: 7.5pt;
      color: #475569;
      margin: 2px 0 0;
      font-weight: 600;
    }
    .fut-doc-badge {
      background: #0f2d6c;
      color: #ffffff;
      padding: 4px 12px;
      font-size: 11pt;
      font-weight: 900;
      letter-spacing: 0.8px;
      display: inline-block;
      border-radius: 4px;
      margin-top: 4px;
    }
    .fut-exp-box {
      border: 1.5px solid #0f2d6c;
      padding: 5px 8px;
      border-radius: 6px;
      text-align: center;
      background: #f8fafc;
      font-size: 7.8pt;
      line-height: 1.25;
    }
    .fut-exp-num {
      font-size: 10.8pt;
      font-weight: 800;
      color: #0f2d6c;
    }

    /* Secciones del Documento */
    .section-box {
      border: 1.3px solid #334155;
      border-radius: 5px;
      margin-bottom: 8px;
      overflow: hidden;
      break-inside: avoid;
    }
    .section-header {
      background: #f1f5f9;
      padding: 4px 10px;
      font-size: 8.4pt;
      font-weight: 800;
      color: #0f2d6c;
      text-transform: uppercase;
      border-bottom: 1.2px solid #334155;
      letter-spacing: 0.4px;
    }
    .section-body {
      padding: 7px 11px;
      font-size: 9.2pt;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
    }
    .data-table td {
      padding: 3px 5px;
      vertical-align: top;
    }
    .data-label {
      font-weight: bold;
      color: #334155;
      width: 25%;
    }
    .data-val {
      color: #0f172a;
    }
    .fundamentacion-text {
      text-align: justify;
      text-indent: 18px;
      font-size: 9.2pt;
      margin: 0;
      line-height: 1.4;
    }
    .req-list {
      font-size: 8.8pt;
      color: #1e293b;
      line-height: 1.4;
    }

    /* Cuadrícula de Firma y Fecha */
    .signature-grid {
      width: 100%;
      margin-top: 14px;
      border-collapse: collapse;
      break-inside: avoid;
    }
    .signature-grid td {
      vertical-align: bottom;
      text-align: center;
    }
    .signature-line {
      display: inline-block;
      width: 250px;
      border-top: 1.4px solid #0f172a;
      padding-top: 4px;
      font-size: 9pt;
      font-weight: bold;
      line-height: 1.25;
    }

    .page-footer-tag {
      margin-top: 10px;
      font-size: 7.2pt;
      color: #94a3b8;
      text-align: right;
      border-top: 1px dotted #cbd5e1;
      padding-top: 3px;
    }

    /* ESTILOS DE LA HOJA 2: CARGO OFICIAL DE RECEPCIÓN */
    .cargo-header-badge {
      background: #047857;
      color: #ffffff;
      padding: 4px 12px;
      font-size: 11pt;
      font-weight: 900;
      letter-spacing: 0.8px;
      display: inline-block;
      border-radius: 4px;
      margin-top: 4px;
    }
    .cargo-card {
      border: 1.4px solid #047857;
      border-radius: 6px;
      padding: 10px 14px;
      background: #f0fdf4;
      margin-bottom: 10px;
      font-size: 9.2pt;
    }
    .cargo-table-data {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
    }
    .cargo-table-data td {
      padding: 3.5px 6px;
      vertical-align: top;
    }
    .stamp-box-container {
      border: 1.5px dashed #0f2d6c;
      border-radius: 8px;
      background: #f8fafc;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .stamp-title {
      font-weight: bold;
      color: #0f2d6c;
      font-size: 8.8pt;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .stamp-subtitle {
      font-size: 7.6pt;
      color: #64748b;
      margin-top: 3px;
    }
    .cargo-instructions-box {
      border: 1.2px solid #cbd5e1;
      border-radius: 6px;
      padding: 9px 13px;
      background: #f8fafc;
      font-size: 8.4pt;
      color: #334155;
      line-height: 1.42;
    }

    /* Modo Compacto en 1 Hoja (Si el usuario lo activa) */
    body.mode-compact-one-page {
      font-size: 8.1pt !important;
      line-height: 1.18 !important;
    }
    body.mode-compact-one-page .fut-header-table { margin-bottom: 3px !important; }
    body.mode-compact-one-page .section-box { margin-bottom: 3px !important; }
    body.mode-compact-one-page .section-body { padding: 3px 6px !important; }
    body.mode-compact-one-page .data-table td { padding: 1px 3px !important; }
    body.mode-compact-one-page .signature-grid { margin-top: 4px !important; }
    body.mode-compact-one-page .page-break { page-break-before: auto !important; break-before: auto !important; margin-top: 6px !important; }

    @media print {
      body { padding: 0; margin: 0; }
      .no-print { display: none !important; }
      .page-break {
        page-break-before: always !important;
        break-before: page !important;
      }
      body.mode-compact-one-page .page-break {
        page-break-before: auto !important;
        break-before: auto !important;
      }
    }
  </style>
</head>
<body>

  <!-- BARRA INTERACTIVA EN PANTALLA -->
  <div class="no-print">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 16px;">📑</span>
      <strong>Formato Único de Trámite (F.U.T.) Oficial — IESTP Hermanos Cárcamo</strong>
      <span style="background: #22c55e; color: white; font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: bold;">Hoja 1: FUT &bull; Hoja 2: Cargo</span>
    </div>
    <div style="display: flex; gap: 8px; align-items: center;">
      <button type="button" class="no-print-btn btn-page-mode active" id="btnPageTwo" onclick="setDocPages(true)">
        📑 Formato en 2 Hojas (FUT + Cargo Oficial)
      </button>
      <button type="button" class="no-print-btn btn-page-mode" id="btnPageOne" onclick="setDocPages(false)">
        📄 Modo Compacto (1 Hoja)
      </button>
      <button type="button" class="no-print-btn btn-print-action" onclick="window.print()">
        🖨️ Imprimir / Guardar PDF
      </button>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- HOJA 1: FORMATO ÚNICO DE TRÁMITE (SOLICITUD) -->
  <!-- ========================================== -->
  <div class="page-sheet" id="sheetFutMain">
    <!-- ENCABEZADO INSTITUCIONAL -->
    <table class="fut-header-table">
      <tr>
        <td style="width: 65px; text-align: left;">
          <img src="assets/img/logo-hercar.png" alt="Escudo IESTP" style="width: 54px; height: 54px; object-fit: contain;" onerror="this.style.display='none'">
        </td>
        <td style="text-align: center;">
          <div style="font-size: 7.6pt; font-weight: bold; color: #475569; letter-spacing: 0.5px;">GOBIERNO REGIONAL DE PIURA &bull; DRE PIURA</div>
          <div class="inst-title-main">INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO "HERMANOS CÁRCAMO"</div>
          <div class="inst-subtitle">Paita - Piura &bull; Código Modular: 0588699 &bull; R.M. Nº 232-87-ED &bull; Ley Nº 30512</div>
          <div class="fut-doc-badge">FORMATO ÚNICO DE TRÁMITE (F.U.T.)</div>
        </td>
        <td style="width: 140px; text-align: right;">
          <div class="fut-exp-box">
            <div>Nº DE REGISTRO:</div>
            <div class="fut-exp-num">${expNum}</div>
            <div style="font-size: 7pt; color: #64748b; margin-top: 1px;">Mesa de Partes Oficial</div>
          </div>
        </td>
      </tr>
    </table>

    <!-- SECCIÓN I: SUMILLA -->
    <div class="section-box">
      <div class="section-header">I. Resumen del Pedido (Sumilla)</div>
      <div class="section-body" style="background: #fafafa;">
        <strong style="font-size: 10.2pt; color: #0f2d6c;">${data.sumilla}</strong>
      </div>
    </div>

    <!-- SECCIÓN II: AUTORIDAD A LA QUE SE DIRIGE -->
    <div class="section-box">
      <div class="section-header">II. Autoridad a la que se dirige</div>
      <div class="section-body">
        <strong>SEÑOR(A): ${data.autoridad}</strong><br>
        <span style="font-size: 8.2pt; color: #475569;">INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO "HERMANOS CÁRCAMO" DE PAITA</span>
      </div>
    </div>

    <!-- SECCIÓN III: DATOS DEL ADMINISTRADO (SOLICITANTE) -->
    <div class="section-box">
      <div class="section-header">III. Datos del Administrado (Solicitante)</div>
      <div class="section-body">
        <table class="data-table">
          <tr>
            <td class="data-label">Apellidos y Nombres:</td>
            <td class="data-val" colspan="3"><strong>${data.nombre}</strong></td>
          </tr>
          <tr>
            <td class="data-label">Nº de DNI / Documento:</td>
            <td class="data-val" style="width: 28%;"><strong>${data.dni}</strong></td>
            <td class="data-label" style="width: 22%;">Celular / WhatsApp:</td>
            <td class="data-val"><strong>${data.telefono || '--------'}</strong></td>
          </tr>
          <tr>
            <td class="data-label">Correo Electrónico:</td>
            <td class="data-val" colspan="3">${data.correo || '--------'}</td>
          </tr>
          <tr>
            <td class="data-label">Programa de Estudios:</td>
            <td class="data-val" style="width: 48%;"><strong>${data.carrera}</strong></td>
            <td class="data-label">Semestre / Ciclo:</td>
            <td class="data-val"><strong>${data.ciclo}</strong></td>
          </tr>
          <tr>
            <td class="data-label">Domicilio en Paita:</td>
            <td class="data-val" colspan="3">${data.direccion || 'Paita, Piura'}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- SECCIÓN IV: FUNDAMENTACIÓN DEL PETITORIO -->
    <div class="section-box">
      <div class="section-header">IV. Fundamentación del Petitorio (Hechos y Base Legal)</div>
      <div class="section-body">
        <p class="fundamentacion-text">${data.detalle}</p>
      </div>
    </div>

    <!-- SECCIÓN V: DOCUMENTOS QUE SE ADJUNTAN -->
    <div class="section-box">
      <div class="section-header">V. Documentos y Requisitos que se Adjuntan (TUPA 2026)</div>
      <div class="section-body">
        <div class="req-list">
          ${reqsHtml || '<div>[ X ] 1. Copia legible de DNI vigente del solicitante.</div>'}
        </div>
      </div>
    </div>

    <!-- LUGAR, FECHA Y FIRMA -->
    <table class="signature-grid">
      <tr>
        <td style="width: 45%; text-align: left; font-size: 9pt;">
          <strong>Lugar y Fecha:</strong><br>
          Paita, ${data.fechaDoc}
        </td>
        <td style="width: 55%; text-align: center;">
          <div class="signature-line">
            ${data.nombre}<br>
            <span style="font-weight: normal; font-size: 8pt; color: #475569;">DNI Nº ${data.dni} &bull; Firma del Solicitante</span>
          </div>
        </td>
      </tr>
    </table>

    <div class="page-footer-tag">
      Página 1 de 2 &bull; Formato Único de Trámite (FUT) &bull; Expediente Institucional IESTP Hermanos Cárcamo
    </div>
  </div>

  <!-- ========================================== -->
  <!-- HOJA 2: CARGO DE RECEPCIÓN PARA EL ALUMNO -->
  <!-- ========================================== -->
  <div class="page-sheet page-break" id="sheetCargoMain">
    <!-- ENCABEZADO INSTITUCIONAL DEL CARGO -->
    <table class="fut-header-table">
      <tr>
        <td style="width: 65px; text-align: left;">
          <img src="assets/img/logo-hercar.png" alt="Escudo IESTP" style="width: 54px; height: 54px; object-fit: contain;" onerror="this.style.display='none'">
        </td>
        <td style="text-align: center;">
          <div style="font-size: 7.6pt; font-weight: bold; color: #475569; letter-spacing: 0.5px;">GOBIERNO REGIONAL DE PIURA &bull; DRE PIURA</div>
          <div class="inst-title-main">INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO "HERMANOS CÁRCAMO"</div>
          <div class="inst-subtitle">Paita - Piura &bull; Código Modular: 0588699 &bull; R.M. Nº 232-87-ED &bull; Ley Nº 30512</div>
          <div class="cargo-header-badge">CARGO DE RECEPCIÓN PARA EL ADMINISTRADO</div>
        </td>
        <td style="width: 140px; text-align: right;">
          <div class="fut-exp-box" style="border-color: #047857;">
            <div>Nº DE EXPEDIENTE:</div>
            <div class="fut-exp-num" style="color: #047857;">${expNum}</div>
            <div style="font-size: 7pt; color: #047857; margin-top: 1px; font-weight: bold;">Mesa de Partes Oficial</div>
          </div>
        </td>
      </tr>
    </table>

    <!-- TARJETA PRINCIPAL DEL CARGO -->
    <div class="cargo-card">
      <div style="font-weight: 800; color: #065f46; font-size: 10pt; margin-bottom: 8px; border-bottom: 1.5px solid #a7f3d0; padding-bottom: 4px;">
        <i style="font-style: normal;">📋</i> CONSTANCIA OFICIAL DE RECEPCIÓN DE EXPEDIENTE
      </div>
      <table class="cargo-table-data">
        <tr>
          <td style="width: 25%; font-weight: bold; color: #065f46;">Nº DE EXPEDIENTE:</td>
          <td style="width: 35%; font-weight: bold; color: #0f2d6c; font-size: 10.5pt;">${expNum}</td>
          <td style="width: 20%; font-weight: bold; color: #065f46;">FECHA Y HORA:</td>
          <td style="width: 20%; font-weight: bold;">${data.fechaDoc}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #065f46;">ADMINISTRADO:</td>
          <td><strong>${data.nombre}</strong></td>
          <td style="font-weight: bold; color: #065f46;">DNI / CELULAR:</td>
          <td>${data.dni} / ${data.telefono || '--------'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #065f46;">PROGRAMA:</td>
          <td>${data.carrera}</td>
          <td style="font-weight: bold; color: #065f46;">SEMESTRE:</td>
          <td>${data.ciclo}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #065f46;">PETITORIO:</td>
          <td colspan="3"><strong>${data.sumilla}</strong></td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #065f46;">TASA TUPA:</td>
          <td colspan="3" style="font-weight: bold; color: #047857;">${data.costo} &bull; Banco de la Nación (Cta. Cte. N° 00-638-002361)</td>
        </tr>
      </table>
    </div>

    <!-- DOCUMENTOS RECEPCIONADOS EN EL CARGO -->
    <div class="section-box">
      <div class="section-header" style="color: #065f46; background: #e6fcf5; border-color: #047857;">
        Documentos y Requisitos Verificados por Mesa de Partes
      </div>
      <div class="section-body">
        <div class="req-list">
          ${reqsCargoHtml || '<div>✓ 1. Copia legible de DNI vigente del solicitante.</div>'}
        </div>
      </div>
    </div>

    <!-- RECUADRO PARA SELLO Y FIRMA DE RECEPCIÓN -->
    <div class="stamp-box-container">
      <div class="stamp-title">SELLO, FECHA Y FIRMA DE RECEPCIÓN DE MESA DE PARTES</div>
      <div class="stamp-subtitle">IESTP HERMANOS CÁRCAMO - PAITA &bull; MESA DE PARTES VIRTUAL Y PRESENCIAL</div>
      <div style="font-size: 7.2pt; color: #94a3b8; margin-top: 25px;">
        (Espacio oficial reservado para el sello institucional de recepción y firma del encargado)
      </div>
    </div>

    <!-- INSTRUCCIONES DE SEGUIMIENTO -->
    <div class="cargo-instructions-box">
      <strong style="color: #0f2d6c; display: block; margin-bottom: 3px;">📌 IMPORTANTE PARA EL ESTUDIANTE / ADMINISTRADO:</strong>
      <div>1. Conserva este documento como constancia formal de que tu solicitud fue presentada ante el Instituto Superior Tecnológico Público "Hermanos Cárcamo".</div>
      <div>2. Para el seguimiento de tu trámite, ingresa a la <strong>Mesa de Partes Virtual</strong> oficial: <span style="color: #0284c7; text-decoration: underline;">https://sistema.ieshercar.edu.pe/registro-tramite/</span> indicando tu número de DNI y el código de expediente <strong>${expNum}</strong>.</div>
      <div>3. Plazo reglamentario de atención según el TUPA institucional: <strong>${data.plazo}</strong>.</div>
    </div>

    <div class="page-footer-tag">
      Página 2 de 2 &bull; Cargo Oficial de Recepción para el Administrado &bull; Consérvese como constancia legal
    </div>
  </div>

  <script>
    function setDocPages(isTwoPages) {
      const btn1 = document.getElementById('btnPageOne');
      const btn2 = document.getElementById('btnPageTwo');
      if (isTwoPages) {
        document.body.classList.remove('mode-compact-one-page');
        btn2.classList.add('active');
        btn1.classList.remove('active');
      } else {
        document.body.classList.add('mode-compact-one-page');
        btn1.classList.add('active');
        btn2.classList.remove('active');
      }
    }
  </script>
</body>
</html>`;
  }

  printFutDocument() {
    const data = this.collectFutFormData();

    // Guardar registro de solicitud para el Panel Administrativo (admin.html)
    try {
      const records = JSON.parse(localStorage.getItem('hercarbot_fut_requests') || '[]');
      records.unshift({
        id: data.id,
        nombre: data.nombre,
        dni: data.dni,
        carrera: data.carrera,
        tramite: data.sumilla,
        detalle: data.detalle,
        fecha: data.fechaISO,
        estado: 'Generado y Descargado'
      });
      localStorage.setItem('hercarbot_fut_requests', JSON.stringify(records.slice(0, 50)));
    } catch (e) {}

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(this.buildFutHtmlDocument(data));
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); }, 400);
    }

    this.closeFutModal();
    this.showToast('¡FUT Oficial generado con éxito! Imprímelo o guárdalo como PDF.', 'success', 'bi-file-earmark-check-fill');

    const chatMsgHtml = `
      <div class="p-3 bg-white rounded-3 border shadow-sm">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i>FUT Generado</span>
          <strong>${this.escapeHtml(data.sumilla)}</strong>
        </div>
        <p class="small text-muted mb-2">Tu Formato Único de Trámite para <strong>${this.escapeHtml(data.nombre)}</strong> (${this.escapeHtml(data.carrera)}) ha sido emitido con éxito con todos los estándares oficiales.</p>
        <div class="interactive-button-grid">
          <a href="https://sistema.ieshercar.edu.pe/registro-tramite/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-send-check text-primary"></i> Subir a Mesa de Partes Virtual
          </a>
          <button class="interactive-btn" data-chat-action="abrir_generador_fut">
            <i class="bi bi-pencil-square text-warning"></i> Generar otro FUT
          </button>
        </div>
      </div>
    `;
    this.appendBotMessage(chatMsgHtml, `He generado tu Formato Único de Trámite oficial para ${data.sumilla}. Recuerda subirlo firmado junto a tus requisitos a través de la Mesa de Partes Virtual.`);
  }

  downloadFutHtml() {
    const data = this.collectFutFormData();
    const htmlContent = this.buildFutHtmlDocument(data);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FUT_${data.dni}_${data.key}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Archivo digital del FUT descargado correctamente.', 'info', 'bi-download');
  }

  /* ==========================================================================
     MANEJO DE HISTORIAL Y CONVERSACIONES (LOCALSTORAGE)
     ========================================================================== */

  initConversations() {
    const list = this.getConversations();
    const savedActiveId = localStorage.getItem(this.storageActiveChatId);

    if (savedActiveId && list.some(c => c.id === savedActiveId)) {
      this.loadConversation(savedActiveId);
    } else {
      this.startNewChat(false);
    }

    this.renderHistoryList();
  }

  getConversations() {
    try {
      return JSON.parse(localStorage.getItem(this.storageConversations)) || [];
    } catch {
      return [];
    }
  }

  saveConversations(list) {
    localStorage.setItem(this.storageConversations, JSON.stringify(list));
  }

  startNewChat(showAnimation = true) {
    this.stopStreamingText();
    this.stopSpeaking();
    this.closeMobileSidebar();
    this.activeTest = null;
    this.activeSimulator = null;
    this.currentChatId = 'chat_' + Date.now();
    localStorage.setItem(this.storageActiveChatId, this.currentChatId);

    if (this.searchHistoryInput) {
      this.searchHistoryInput.value = '';
    }

    this.renderWelcome();
    this.renderHistoryList();

    if (this.inputField) {
      this.inputField.focus();
    }
  }

  saveMessageToCurrentChat(sender, content, speakText = null) {
    if (!this.currentChatId) {
      this.currentChatId = 'chat_' + Date.now();
      localStorage.setItem(this.storageActiveChatId, this.currentChatId);
    }

    const conversations = this.getConversations();
    const idx = conversations.findIndex(c => c.id === this.currentChatId);
    let current = idx >= 0 ? conversations[idx] : null;

    const now = new Date();
    const todayStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const buildChatTitle = (rawText) => {
      const cleaned = (rawText || '').replace(/\s+/g, ' ').trim();
      if (!cleaned) return 'Nueva Conversación';
      return cleaned.length > 38 ? cleaned.substring(0, 38) + '...' : cleaned;
    };

    if (!current) {
      current = {
        id: this.currentChatId,
        title: sender === 'user' ? buildChatTitle(content) : 'Nueva Conversación',
        dateStr: todayStr,
        createdAt: now.getTime(),
        updatedAt: now.getTime(),
        timestamp: timeStr,
        messages: []
      };
      conversations.unshift(current);
    } else {
      if (sender === 'user' && (current.title === 'Nueva Conversación' || !current.title || current.messages.length === 0)) {
        current.title = buildChatTitle(content);
      }
      current.updatedAt = now.getTime();
      current.dateStr = todayStr;
      current.timestamp = timeStr;
      // Mantener la conversación activa más reciente arriba del historial (estilo ChatGPT)
      if (idx > 0) {
        conversations.splice(idx, 1);
        conversations.unshift(current);
      }
    }

    current.messages.push({
      sender,
      content,
      speakText,
      time: timeStr
    });

    this.saveConversations(conversations);
    this.renderHistoryList(this.searchHistoryInput ? this.searchHistoryInput.value.trim() : '');
  }

  loadConversation(chatId) {
    this.stopStreamingText();
    this.stopSpeaking();
    const conversations = this.getConversations();
    const chat = conversations.find(c => c.id === chatId);
    if (!chat) return;

    this.currentChatId = chat.id;
    localStorage.setItem(this.storageActiveChatId, this.currentChatId);
    this.activeTest = null;
    this.activeSimulator = null;

    this.messagesContainer.innerHTML = '';

    chat.messages.forEach(m => {
      if (m.sender === 'user') {
        const msgEl = document.createElement('div');
        msgEl.className = 'chat-message-row user-row animate-fade-in';
        msgEl.innerHTML = `
          <div class="msg-bubble-user">
            <div class="msg-text">${this.escapeHtml(m.content)}</div>
            <span class="msg-timestamp">${m.time}</span>
          </div>
        `;
        this.messagesContainer.appendChild(msgEl);
      } else {
        const msgEl = document.createElement('div');
        msgEl.className = 'chat-message-row bot-row animate-fade-in';
        msgEl.innerHTML = `
          <div class="bot-avatar-badge" style="background: #fff; padding: 3px; overflow: hidden; border: 2px solid #e2e8f0;">
            <img src="assets/img/logo-hercar.png" alt="HERCAR" style="width:100%; height:100%; object-fit:contain; border-radius:8px;" onerror="this.src='https://ieshercar.edu.pe/public/assets/img/Logo-Hercar.png'; this.onerror=function(){this.parentElement.innerHTML='<i class=\\'bi bi-mortarboard-fill\\' style=\\'color:#0f3380;font-size:1rem;\\'></i>'}">
          </div>
          <div class="msg-bubble-bot"${m.speakText ? ` data-spoken-text="${this.escapeHtml(m.speakText)}"` : ''}>
            <div class="bot-content-body">${m.content}</div>
            <div class="bot-msg-toolbar">
              <div class="toolbar-left">
                <span class="msg-timestamp"><i class="bi bi-shield-check text-primary me-1"></i>HercarBot Oficial • ${m.time}</span>
              </div>
              <div class="toolbar-actions">
                <button class="tool-btn" title="Copiar texto" onclick="hercarBotApp.copyText(this)"><i class="bi bi-clipboard"></i></button>
                <button class="tool-btn btn-speak-msg" title="Escuchar en voz alta" onclick="hercarBotApp.speakCurrent(this)">
                  <i class="bi bi-volume-up"></i>
                  <span class="voice-speech-bars">
                    <span class="v-bar"></span><span class="v-bar"></span><span class="v-bar"></span><span class="v-bar"></span>
                  </span>
                </button>
                <button class="tool-btn text-success" title="Enviar datos a mi WhatsApp" onclick="hercarBotApp.shareToWhatsApp(this)"><i class="bi bi-whatsapp"></i></button>
              </div>
            </div>
          </div>
        `;
        this.messagesContainer.appendChild(msgEl);
      }
    });

    this.scrollToBottom();
    this.renderHistoryList();
    this.closeMobileSidebar();
  }

  deleteConversation(chatId) {
    let conversations = this.getConversations();
    conversations = conversations.filter(c => c.id !== chatId);
    this.saveConversations(conversations);

    if (this.currentChatId === chatId) {
      this.startNewChat();
    } else {
      this.renderHistoryList();
    }
  }

  clearAllHistory() {
    const modalEl = document.getElementById('modalChatConfirm');
    if (modalEl && window.bootstrap) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      const actionBtn = document.getElementById('chat-confirm-btn-action');
      if (actionBtn) {
        actionBtn.onclick = () => {
          modal.hide();
          this.saveConversations([]);
          this.startNewChat();
          this.showToast('Historial de chats vaciado correctamente', 'warning', 'bi-trash3-fill');
        };
      }
      modal.show();
    } else {
      this.saveConversations([]);
      this.startNewChat();
      this.showToast('Historial de chats vaciado correctamente', 'warning', 'bi-trash3-fill');
    }
  }

  showToast(message, type = 'info', icon = 'bi-info-circle') {
    const container = this.toastContainer || document.getElementById('hercar-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `hercar-toast toast-${type}`;
    toast.innerHTML = `<i class="bi ${icon} me-2 fs-6"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  triggerConfetti() {
    try {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '999999';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = ['#0f3380', '#2563eb', '#fbbf24', '#10b981', '#f59e0b', '#38bdf8', '#8b5cf6'];
      const particles = [];
      const count = 85;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: canvas.width * 0.5 + (Math.random() - 0.5) * 260,
          y: canvas.height * 0.45 + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.75) * 14,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rSpeed: (Math.random() - 0.5) * 9,
          gravity: 0.28,
          opacity: 1
        });
      }

      let start = performance.now();
      const frame = (now) => {
        const elapsed = now - start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let alive = false;
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.rotation += p.rSpeed;
          p.vx *= 0.98;

          if (elapsed > 1600) {
            p.opacity -= 0.024;
          }

          if (p.opacity > 0 && p.y < canvas.height + 50) {
            alive = true;
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
            ctx.restore();
          }
        }

        if (alive && elapsed < 3200) {
          requestAnimationFrame(frame);
        } else {
          canvas.remove();
        }
      };

      requestAnimationFrame(frame);
    } catch (e) {}
  }

  printVocationalSheet() {
    window.print();
  }

  renderHistoryList(filterText = '') {
    if (!this.chatHistoryList) return;
    let conversations = this.getConversations();

    if (filterText) {
      const q = filterText.toLowerCase();
      conversations = conversations.filter(c => 
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.messages && c.messages.some(m => m.content && m.content.toLowerCase().includes(q)))
      );
    }

    if (conversations.length === 0) {
      this.chatHistoryList.innerHTML = `
        <li class="p-3 text-center small text-light" style="color: #cbd5e1 !important;">
          <i class="bi bi-chat-left-dots d-block mb-2" style="font-size: 1.3rem; opacity: 0.5;"></i>
          ${filterText ? 'No se encontraron chats con ese término' : 'Sin conversaciones previas.<br>¡Escribe tu primera consulta!'}
        </li>
      `;
      return;
    }

    // Agrupación relativa por fecha
    const today = new Date().toLocaleDateString();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toLocaleDateString();

    const groups = {
      'Hoy': [],
      'Ayer': [],
      'Anteriores': []
    };

    conversations.forEach(c => {
      const cDate = c.dateStr || (c.createdAt ? new Date(c.createdAt).toLocaleDateString() : today);
      if (cDate === today) {
        groups['Hoy'].push(c);
      } else if (cDate === yesterday) {
        groups['Ayer'].push(c);
      } else {
        groups['Anteriores'].push(c);
      }
    });

    let html = '';
    for (const [groupName, items] of Object.entries(groups)) {
      if (items.length > 0) {
        html += `<li class="history-date-header">${groupName}</li>`;
        items.forEach(c => {
          const isActive = c.id === this.currentChatId;
          html += `
            <li class="chat-history-item ${isActive ? 'active' : ''}">
              <button class="chat-history-btn" data-load-chat="${c.id}" title="${this.escapeHtml(c.title)}">
                <i class="bi ${isActive ? 'bi-chat-dots-fill text-primary' : 'bi-chat-text text-warning'}"></i>
                <span class="text-truncate">${this.escapeHtml(c.title)}</span>
              </button>
              <button class="btn-delete-chat" data-delete-chat="${c.id}" title="Eliminar conversación">
                <i class="bi bi-trash3"></i>
              </button>
            </li>
          `;
        });
      }
    }

    this.chatHistoryList.innerHTML = html;
  }

  toggleSidebar() {
    if (!this.sidebar) return;
    if (window.innerWidth <= 992) {
      this.sidebar.classList.toggle('mobile-open');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (backdrop) {
        backdrop.classList.toggle('active', this.sidebar.classList.contains('mobile-open'));
      }
    } else {
      this.sidebar.classList.toggle('collapsed');
    }
  }

  closeMobileSidebar() {
    if (this.sidebar && this.sidebar.classList.contains('mobile-open')) {
      this.sidebar.classList.remove('mobile-open');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (backdrop) backdrop.classList.remove('active');
    }
  }

  /* ==========================================================================
     RECONOCIMIENTO DE VOZ (SPEECH TO TEXT)
     ========================================================================== */

  initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && this.btnVoice) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-PE';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.stopSpeaking();
        this.isRecording = true;
        this.btnVoice.classList.add('recording');
        if (this.voiceBanner) this.voiceBanner.style.display = 'block';
        if (this.inputField) this.inputField.placeholder = '🎤 Escuchando tu voz... Habla con naturalidad';
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        this.stopVoiceRecording();
        if (transcript && transcript.trim().length > 0) {
          this.handleUserSubmit(transcript.trim(), true);
        }
      };

      this.recognition.onerror = (e) => {
        this.stopVoiceRecording();
        if (e && e.error === 'not-allowed') {
          this.showToast('Acceso al micrófono denegado. Permite el micrófono en tu navegador.', 'warning', 'bi-mic-mute-fill');
        }
      };
      this.recognition.onend = () => this.stopVoiceRecording();

      this.btnVoice.addEventListener('click', () => {
        if (!this.isRecording) {
          try {
            this.recognition.start();
          } catch (e) {
            console.warn('Speech recognition start error:', e);
            this.showToast('Iniciando micrófono...', 'info', 'bi-mic-fill');
          }
        } else {
          this.recognition.stop();
        }
      });
    } else if (this.btnVoice) {
      this.btnVoice.addEventListener('click', () => {
        this.showToast('Tu navegador no cuenta con soporte para dictado por voz. Puedes escribir tu consulta.', 'info', 'bi-mic-mute');
      });
    }
  }

  stopVoiceRecording() {
    this.isRecording = false;
    if (this.btnVoice) this.btnVoice.classList.remove('recording');
    if (this.voiceBanner) this.voiceBanner.style.display = 'none';
    if (this.inputField) this.inputField.placeholder = 'Hazme cualquier pregunta sobre el Instituto Superior Hermanos Cárcamo...';
    try {
      if (this.recognition) this.recognition.stop();
    } catch(e) {}
  }

  /* ==========================================================================
     SÍNTESIS DE VOZ NATURAL, FLUIDA Y CONVERSACIONAL (TEXT TO SPEECH)
     ========================================================================== */

  playCalmChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      // Armónico relajante suave: 523.25 Hz (Do) deslizándose a 659.25 Hz (Mi)
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {}
  }

  scoreVoice(v) {
    if (!v) return -99999;
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();

    // Descartar si no es idioma español
    if (!lang.startsWith('es') && !name.includes('spanish') && !uri.includes('spanish')) {
      return -99999;
    }

    // 1. Descartar de inmediato voces masculinas (penalización insuperable)
    const isMale = name.includes('male') || name.includes('hombre') || 
                   name.includes('jorge') || name.includes('alvaro') || name.includes('álvaro') || 
                   name.includes('raul') || name.includes('raúl') || name.includes('pablo') || 
                   name.includes('david') || name.includes('carlos') || name.includes('miguel') || 
                   name.includes('antonio') || name.includes('manuel') || name.includes('enrique') || 
                   name.includes('jose') || name.includes('josé') || name.includes('pedro') || 
                   name.includes('luis') || name.includes('fernando') || name.includes('mario') || 
                   name.includes('diego') || name.includes('sergio') || name.includes('javier');
    if (isMale) return -50000;

    // 2. Detección de voces robóticas rígidas de escritorio (Helena Desktop / Laura Desktop / espeak)
    const isRoboticHelenaOrLaura = (name.includes('helena') && !name.includes('natural') && !name.includes('online')) ||
                                  (name.includes('laura') && !name.includes('natural') && !name.includes('online')) ||
                                  name.includes('espeak') || name.includes('sapi4');

    // Sabina Desktop es la voz local más dulce y calmada en Windows si no hay conexión a internet
    const isSabinaDesktop = name.includes('sabina') && (v.localService || name.includes('desktop'));

    // 3. Voces Neuronales / Naturales Femeninas en la Nube (Calidad humana ultra-alta, dulce y relajante)
    // Microsoft Dalia Online (Natural) — Timbre dulce, joven, latino, 100% humano y melodioso
    if (name.includes('dalia') && (name.includes('natural') || name.includes('online'))) return 40000;
    // Microsoft Sabina Online (Natural) — Cordial, femenina, muy suave y calmada
    if (name.includes('sabina') && (name.includes('natural') || name.includes('online'))) return 37000;
    // Microsoft Camila Online (Natural) — Acento peruano / latinoamericano cálido
    if (name.includes('camila') && (name.includes('natural') || name.includes('online'))) return 35000;
    // Google español (Chrome / Android Cloud TTS) — Muy fluida, natural y cálida
    if (name.includes('google') && !name.includes('male')) {
      return (lang === 'es-us' || lang === 'es-419' || lang === 'es-pe') ? 34000 : 33000;
    }
    // Microsoft Jimena / Ximena Online (Natural) — Entonación melódica y cordial
    if ((name.includes('jimena') || name.includes('ximena')) && (name.includes('natural') || name.includes('online'))) return 33000;
    // Microsoft Paulina Online (Natural)
    if (name.includes('paulina') && (name.includes('natural') || name.includes('online'))) return 32000;
    // Microsoft Paloma Online (Natural)
    if (name.includes('paloma') && (name.includes('natural') || name.includes('online'))) return 31500;
    // Microsoft Elena Online (Natural)
    if (name.includes('elena') && (name.includes('natural') || name.includes('online'))) return 31000;
    // Android Neural Network TTS ("es-*-network" / "es-*-neural")
    if ((name.includes('network') || name.includes('neural')) && (lang.startsWith('es') || name.includes('female'))) {
      return 30000;
    }
    // Apple Siri / Samantha / Paulina / Mónica Premium en macOS / iOS
    if (name.includes('premium') || name.includes('enhanced')) {
      if (name.includes('paulina') || name.includes('monica') || name.includes('mónica') || name.includes('luciana') || name.includes('soledad')) {
        return 29000;
      }
    }
    // Cualquier otra voz femenina que tenga 'natural' u 'online'
    if ((name.includes('natural') || name.includes('online') || name.includes('neural')) && !isMale) {
      return 28000;
    }

    // 4. Voces de escritorio locales de Windows:
    // Sabina Desktop es suave y dulce con afinación de tono; se prioriza ampliamente sobre Helena
    if (isSabinaDesktop) {
      return 15000;
    }

    // Penalización drástica para voces robóticas metálicas antiguas (Helena, Laura, espeak)
    if (isRoboticHelenaOrLaura) {
      return -25000;
    }

    // Voces femeninas estándar
    let score = 2000;
    const isFemale = name.includes('female') || name.includes('mujer') || 
                     name.includes('dalia') || name.includes('sabina') || name.includes('paloma') || 
                     name.includes('salma') || name.includes('paulina') || name.includes('elena') || 
                     name.includes('monica') || name.includes('camila') || name.includes('lucia') || 
                     name.includes('andrea') || name.includes('sofia') || name.includes('victoria') || 
                     name.includes('carmen') || name.includes('rosa') || name.includes('mia');
    if (isFemale) score += 3000;

    // Bonus de afinidad dialectal
    if (lang === 'es-pe') score += 500;
    else if (lang === 'es-419' || lang.includes('419')) score += 400;
    else if (lang === 'es-mx') score += 300;
    else if (lang.startsWith('es')) score += 100;

    return score;
  }

  isNaturalOnlineVoice(v) {
    if (!v) return false;
    const name = (v.name || '').toLowerCase();
    if (name.includes('desktop') || name.includes('espeak') || name.includes('sapi')) return false;
    if (v.localService === true && !name.includes('google') && !name.includes('network') && !name.includes('neural')) return false;
    return name.includes('natural') || name.includes('online') || name.includes('neural') || name.includes('google') || name.includes('network');
  }

  initVoiceSynthesis() {
    if (!('speechSynthesis' in window)) return;

    // Sanear configuraciones previas corruptas, robóticas o de baja fidelidad
    const savedUri = (localStorage.getItem('hercar_voice_uri') || '').toLowerCase();
    const isSavedRobotic = savedUri.includes('desktop') || 
                           savedUri.includes('helena') || 
                           savedUri.includes('laura') || 
                           savedUri.includes('sapi') || 
                           savedUri.includes('male') || 
                           savedUri.includes('hombre') || 
                           savedUri.includes('david') || 
                           savedUri.includes('raul') || 
                           savedUri.includes('jorge') ||
                           (!savedUri.includes('natural') && !savedUri.includes('neural') && !savedUri.includes('online') && !savedUri.includes('google'));
    if (isSavedRobotic) {
      localStorage.removeItem('hercar_voice_uri');
    }

    // Calibración acústica ultra-humana: Chica Dulce, Suave y Relajada
    // Rate 0.93 para cadencia pausada y tranquilizadora (elimina la prisa o sensación de lectura mecánica)
    // Pitch 1.02 para melodía dulce y juvenil
    this.voiceRate = parseFloat(localStorage.getItem('hercar_voice_rate')) || 0.93;
    this.voicePitch = parseFloat(localStorage.getItem('hercar_voice_pitch')) || 1.02;
    this.voiceStyle = localStorage.getItem('hercar_voice_style') || 'dulce';
    this.voiceURI = localStorage.getItem('hercar_voice_uri') || null;

    const populateVoiceDropdown = (spanishVoices) => {
      const dropdown = document.getElementById('voice-select-dropdown');
      if (!dropdown) return;
      dropdown.innerHTML = '';

      spanishVoices.forEach((v) => {
        const option = document.createElement('option');
        option.value = v.voiceURI;
        const nameLower = v.name.toLowerCase();
        const isDalia = nameLower.includes('dalia');
        const isGoogle = nameLower.includes('google') && !nameLower.includes('male');
        const isSabina = nameLower.includes('sabina');
        const isCamila = nameLower.includes('camila');
        const isNatural = this.isNaturalOnlineVoice(v);

        let badge = '';
        if (isDalia) badge = ' ✨ Chica Dulce y Joven (Máxima Calidad)';
        else if (isCamila) badge = ' ✨ Voz Peruana Natural (Recomendada)';
        else if (isSabina && isNatural) badge = ' ✨ Voz Dulce y Relajada (Recomendada)';
        else if (isGoogle) badge = ' ✨ Voz Natural Google (Recomendada)';
        else if (isNatural) badge = ' ✨ Voz Natural Online';
        else if (isSabina) badge = ' 🎙️ Voz Suave y Cálida';
        else if (!nameLower.includes('desktop') && !v.localService) badge = ' 🎙️ Voz Estándar';
        else badge = ' 💻 (Voz Local de Escritorio)';

        option.textContent = `${v.name} (${v.lang})${badge}`;
        if (this.selectedVoice && this.selectedVoice.voiceURI === v.voiceURI) {
          option.selected = true;
        }
        dropdown.appendChild(option);
      });
    };

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      const spanishVoices = voices.filter(v => (v.lang && v.lang.toLowerCase().startsWith('es')) || (v.name && v.name.toLowerCase().includes('spanish')));
      if (spanishVoices.length === 0) return;

      spanishVoices.sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));

      const bestVoice = spanishVoices[0];
      const isBestOnline = this.isNaturalOnlineVoice(bestVoice);

      if (this.voiceURI) {
        const saved = spanishVoices.find(v => v.voiceURI === this.voiceURI);
        const isSavedOnline = this.isNaturalOnlineVoice(saved);
        
        // Si la voz guardada es de escritorio / robótica y ahora hay una voz natural online disponible,
        // ascender AUTOMÁTICAMENTE a la voz humana más dulce
        if (saved && isSavedOnline) {
          this.selectedVoice = saved;
        } else if (saved && !isBestOnline) {
          this.selectedVoice = saved;
        } else {
          this.selectedVoice = bestVoice;
          this.voiceURI = this.selectedVoice.voiceURI;
          localStorage.setItem('hercar_voice_uri', this.voiceURI);
        }
      } else {
        this.selectedVoice = bestVoice;
        if (this.selectedVoice) {
          this.voiceURI = this.selectedVoice.voiceURI;
          localStorage.setItem('hercar_voice_uri', this.voiceURI);
        }
      }

      populateVoiceDropdown(spanishVoices);
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Inicializar controles del Modal de Configuración de Voz
    this.initVoiceModalControls();
  }

  getBestFemaleVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const spanishVoices = voices.filter(v => 
      (v.lang && v.lang.toLowerCase().startsWith('es')) || 
      (v.name && v.name.toLowerCase().includes('spanish'))
    );
    if (spanishVoices.length === 0) return voices[0];

    spanishVoices.sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
    return spanishVoices[0];
  }

  initVoiceModalControls() {
    const dropdown = document.getElementById('voice-select-dropdown');
    const speedRange = document.getElementById('voice-speed-range');
    const speedLabel = document.getElementById('voice-speed-label');
    const btnWarm = document.getElementById('btn-voice-style-warm');
    const btnPro = document.getElementById('btn-voice-style-pro');
    const btnTest = document.getElementById('btn-test-voice-sample');
    const btnReset = document.getElementById('btn-reset-voice-defaults');

    if (speedRange && speedLabel) {
      speedRange.value = this.voiceRate || 0.93;
      speedLabel.textContent = `${Number(this.voiceRate || 0.93).toFixed(2)}x (Voz Dulce y Relajada)`;

      speedRange.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.voiceRate = val;
        localStorage.setItem('hercar_voice_rate', val);
        speedLabel.textContent = `${val.toFixed(2)}x (${val < 0.92 ? 'Muy Pausada' : val > 1.02 ? 'Ágil' : 'Dulce y Relajada'})`;
      });
    }

    if (dropdown) {
      dropdown.addEventListener('change', (e) => {
        const voices = window.speechSynthesis.getVoices();
        const found = voices.find(v => v.voiceURI === e.target.value);
        if (found) {
          this.selectedVoice = found;
          this.voiceURI = found.voiceURI;
          localStorage.setItem('hercar_voice_uri', found.voiceURI);
          this.showToast(`Voz seleccionada: ${found.name}`, 'info', 'bi-mic-fill');
          this.speak('¡Hola! Así suena mi voz, dulce, suave y tranquila para acompañarte en el Instituto Hermanos Cárcamo.');
        }
      });
    }

    const btnQuickPreview = document.getElementById('btn-quick-preview-voice');
    if (btnQuickPreview) {
      btnQuickPreview.addEventListener('click', () => {
        this.speak('¡Hola! Soy tu asesora virtual del Instituto Hermanos Cárcamo. Qué lindo saludarte, estoy aquí para ayudarte con toda tranquilidad.');
      });
    }

    if (btnWarm && btnPro) {
      if (this.voiceStyle === 'pro') {
        btnPro.classList.add('active', 'btn-primary');
        btnPro.classList.remove('btn-outline-secondary');
        btnWarm.classList.remove('active', 'btn-primary');
        btnWarm.classList.add('btn-outline-primary');
      } else {
        btnWarm.classList.add('active', 'btn-primary');
        btnWarm.classList.remove('btn-outline-primary');
        btnPro.classList.remove('active', 'btn-primary');
        btnPro.classList.add('btn-outline-secondary');
      }

      btnWarm.addEventListener('click', () => {
        this.voiceStyle = 'dulce';
        this.voicePitch = 1.02;
        this.voiceRate = 0.93;
        localStorage.setItem('hercar_voice_style', 'dulce');
        localStorage.setItem('hercar_voice_pitch', '1.02');
        localStorage.setItem('hercar_voice_rate', '0.93');
        if (speedRange && speedLabel) {
          speedRange.value = 0.93;
          speedLabel.textContent = '0.93x (Voz Dulce y Relajada)';
        }
        btnWarm.classList.add('active', 'btn-primary');
        btnWarm.classList.remove('btn-outline-primary');
        btnPro.classList.remove('active', 'btn-primary');
        btnPro.classList.add('btn-outline-secondary');
        this.showToast('Voz configurada: Dulce, Suave y Relajada', 'success', 'bi-mic-fill');
        this.speak('¡Hola! He ajustado mi voz para hablarte con suavidad, calma y cariño. Respira tranquilo, aquí estoy para orientarte.');
      });

      btnPro.addEventListener('click', () => {
        this.voiceStyle = 'pro';
        this.voicePitch = 1.00;
        this.voiceRate = 0.98;
        localStorage.setItem('hercar_voice_style', 'pro');
        localStorage.setItem('hercar_voice_pitch', '1.00');
        localStorage.setItem('hercar_voice_rate', '0.98');
        if (speedRange && speedLabel) {
          speedRange.value = 0.98;
          speedLabel.textContent = '0.98x (Serena y Formal 👔)';
        }
        btnPro.classList.add('active', 'btn-primary');
        btnPro.classList.remove('btn-outline-secondary');
        btnWarm.classList.remove('active', 'btn-primary');
        btnWarm.classList.add('btn-outline-primary');
        this.showToast('Voz configurada: Asesor Formal Institucional 👔', 'info', 'bi-briefcase-fill');
        this.speak('Estimado estudiante. He configurado la locución en modo formal para el Instituto Superior Hermanos Cárcamo.');
      });
    }

    if (btnTest) {
      btnTest.addEventListener('click', () => {
        const saludoPrueba = this.voiceStyle === 'pro'
          ? 'Estimado postulante. Te saluda el asistente oficial del Instituto Hermanos Cárcamo. Puedes consultar carreras, matrícula y trámites con total confianza.'
          : '¡Hola! Te doy una cálida bienvenida al Instituto Hermanos Cárcamo de Paita. Soy tu asesora y con mucho cariño te acompaño en lo que necesites para tu carrera profesional. Cuéntame, ¿en qué te puedo apoyar hoy?';
        this.speak(saludoPrueba);
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        localStorage.removeItem('hercar_voice_uri');
        localStorage.removeItem('hercar_voice_rate');
        localStorage.removeItem('hercar_voice_pitch');
        localStorage.removeItem('hercar_voice_style');
        this.voiceRate = 0.93;
        this.voicePitch = 1.02;
        this.voiceStyle = 'dulce';
        this.voiceURI = null;
        if (speedRange && speedLabel) {
          speedRange.value = 0.93;
          speedLabel.textContent = '0.93x (Voz Dulce y Relajada)';
        }
        this.initVoiceSynthesis();
        this.showToast('Ajustes de voz restablecidos a Voz Dulce y Relajada', 'success', 'bi-arrow-counterclockwise');
        this.speak('¡Listo! He restablecido mi voz a su tono dulce, suave y natural de fábrica.');
      });
    }
  }

  /* ==========================================================================
     MONITOR DE RED NEURONAL & DIAGNÓSTICO COGNITIVO EN VIVO
     ========================================================================== */

  initNeuralMonitor() {
    const modalEl = document.getElementById('modalNeuralMonitor');
    const canvas = document.getElementById('neural-network-canvas');
    const inputTest = document.getElementById('neural-test-input');
    const btnRunTest = document.getElementById('btn-run-neural-test');

    if (modalEl && canvas) {
      let animId = null;
      let nodes = [];
      let connections = [];
      let pulses = [];

      const setupCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width || 600;
        canvas.height = 190;

        // Configuración de capas neuronales (4 capas: Entrada, Oculta 1, Oculta 2, Salida)
        const layers = [
          { count: 4, x: 0.12, label: 'Entrada (Léxica)' },
          { count: 6, x: 0.38, label: 'Oculta 1 (Semántica)' },
          { count: 6, x: 0.64, label: 'Oculta 2 (Entidades)' },
          { count: 4, x: 0.88, label: 'Salida (Intención)' }
        ];

        nodes = [];
        connections = [];
        pulses = [];

        layers.forEach((layer, lIdx) => {
          const x = canvas.width * layer.x;
          for (let i = 0; i < layer.count; i++) {
            const spacing = canvas.height / (layer.count + 1);
            const y = spacing * (i + 1);
            nodes.push({
              x,
              y,
              layer: lIdx,
              radius: lIdx === 0 || lIdx === 3 ? 5.5 : 4.5,
              color: lIdx === 0 ? '#38bdf8' : lIdx === 3 ? '#10b981' : '#818cf8',
              glow: lIdx === 0 ? 'rgba(56,189,248,0.6)' : lIdx === 3 ? 'rgba(16,185,129,0.6)' : 'rgba(129,140,248,0.5)',
              activation: 0.3 + Math.random() * 0.7
            });
          }
        });

        // Conectar cada nodo con los nodos de la siguiente capa
        for (let i = 0; i < nodes.length; i++) {
          for (let j = 0; j < nodes.length; j++) {
            if (nodes[j].layer === nodes[i].layer + 1) {
              connections.push({ from: nodes[i], to: nodes[j], weight: 0.2 + Math.random() * 0.6 });
            }
          }
        }
      };

      const drawCanvas = () => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fondo degradado de alta fidelidad tecnológica
        const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        bgGrad.addColorStop(0, '#0a1128');
        bgGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar conexiones (sinapsis)
        connections.forEach(c => {
          ctx.beginPath();
          ctx.moveTo(c.from.x, c.from.y);
          ctx.lineTo(c.to.x, c.to.y);
          ctx.strokeStyle = `rgba(148, 163, 184, ${0.12 * c.weight})`;
          ctx.lineWidth = c.weight * 1.5;
          ctx.stroke();
        });

        // Crear pulsos aleatorios que viajan por las conexiones
        if (Math.random() < 0.18 && connections.length > 0) {
          const conn = connections[Math.floor(Math.random() * connections.length)];
          pulses.push({
            conn,
            progress: 0,
            speed: 0.02 + Math.random() * 0.03,
            color: conn.to.layer === 3 ? '#34d399' : '#38bdf8'
          });
        }

        // Animar y dibujar pulsos de señal
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.conn.to.activation = 1.0;
            pulses.splice(i, 1);
            continue;
          }
          const px = p.conn.from.x + (p.conn.to.x - p.conn.from.x) * p.progress;
          const py = p.conn.from.y + (p.conn.to.y - p.conn.from.y) * p.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Dibujar nodos (neuronas)
        nodes.forEach(n => {
          n.activation = Math.max(0.3, n.activation - 0.015);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * (0.8 + n.activation * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.shadowColor = n.glow;
          ctx.shadowBlur = 10 * n.activation;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Anillo exterior
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 1.6 * (0.8 + n.activation * 0.2), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * n.activation})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        animId = requestAnimationFrame(drawCanvas);
      };

      modalEl.addEventListener('shown.bs.modal', () => {
        setupCanvas();
        if (!animId) drawCanvas();
      });

      modalEl.addEventListener('hidden.bs.modal', () => {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });

      window.addEventListener('resize', () => {
        if (modalEl.classList.contains('show')) setupCanvas();
      });
    }

    if (btnRunTest && inputTest) {
      btnRunTest.addEventListener('click', () => {
        this.testNeuralPhrase(inputTest.value.trim());
      });

      inputTest.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.testNeuralPhrase(inputTest.value.trim());
        }
      });
    }
  }

  testNeuralPhrase(phrase) {
    const input = document.getElementById('neural-test-input');
    const resultBox = document.getElementById('neural-test-result');
    const statusBadge = document.getElementById('neural-inference-status');
    const accBadge = document.getElementById('neural-telemetry-accuracy');
    const latBadge = document.getElementById('neural-telemetry-latency');

    if (!phrase || phrase.trim().length === 0) {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-triangle-fill me-1"></i> Por favor ingresa una frase para evaluar.</span>';
      }
      return;
    }

    if (input) input.value = phrase;
    if (statusBadge) {
      statusBadge.textContent = 'Procesando tensores...';
      statusBadge.className = 'badge bg-warning text-dark small';
    }

    const startTime = performance.now();
    const norm = this.normalizeText(phrase);

    let detectedIntent = 'Información General Institucional';
    let matchedEntity = 'IESTP Hermanos Cárcamo';
    let confidence = 98.4;
    let category = 'general';

    if (norm.includes('cuenta') || norm.includes('banco') || norm.includes('pagar') || norm.includes('voucher') || norm.includes('00-638-002361') || norm.includes('00-638-025736')) {
      detectedIntent = 'Gestión de Pagos & Tesorería';
      matchedEntity = 'Banco de la Nación (Ctas: 00-638-002361 / 00-638-025736)';
      confidence = 99.8;
      category = 'pagos';
    } else if (norm.includes('carrera') || norm.includes('apsti') || norm.includes('software') || norm.includes('sistemas') || norm.includes('redes')) {
      detectedIntent = 'Consulta Curricular - Computación e Informática';
      matchedEntity = 'Programa de Computación e Informática';
      confidence = 99.6;
      category = 'carreras';
    } else if (norm.includes('ani') || norm.includes('negocios') || norm.includes('aduanas') || norm.includes('comercio')) {
      detectedIntent = 'Consulta Curricular - Negocios Internacionales';
      matchedEntity = 'Programa de Administración de Negocios Internacionales';
      confidence = 99.5;
      category = 'carreras';
    } else if (norm.includes('contabilidad') || norm.includes('conta') || norm.includes('sunat') || norm.includes('tributacion')) {
      detectedIntent = 'Consulta Curricular - Contabilidad';
      matchedEntity = 'Programa de Contabilidad y Tributación SUNAT';
      confidence = 99.5;
      category = 'carreras';
    } else if (norm.includes('pesca') || norm.includes('dpa') || norm.includes('acuicola') || norm.includes('haccp')) {
      detectedIntent = 'Consulta Curricular - Pesquería';
      matchedEntity = 'Programa de Desarrollo Pesquero y Acuícola';
      confidence = 99.7;
      category = 'carreras';
    } else if (norm.includes('jalar') || norm.includes('desaprobar') || norm.includes('dpi') || norm.includes('inasistencia') || norm.includes('nota minima')) {
      detectedIntent = 'Reglamento de Evaluación & Recuperación';
      matchedEntity = 'Reglamento Académico (Nota Mínima 13 / Límite DPI 30%)';
      confidence = 99.2;
      category = 'academico';
    } else if (norm.includes('admision') || norm.includes('postular') || norm.includes('cepre') || norm.includes('vacante')) {
      detectedIntent = 'Proceso de Admisión & Convocatoria';
      matchedEntity = 'Admisión 2026 (Ordinario / Exonerados / CEPRE-HERCAR)';
      confidence = 99.4;
      category = 'admision';
    } else if (norm.includes('tramite') || norm.includes('titulacion') || norm.includes('modular') || norm.includes('carne') || norm.includes('tupa')) {
      detectedIntent = 'Catálogo de Trámites Académicos';
      matchedEntity = 'TUPA Institucional Vigente';
      confidence = 99.1;
      category = 'tramites';
    } else if (norm.includes('director') || norm.includes('autoridad') || norm.includes('adolfo zeta')) {
      detectedIntent = 'Organigrama y Autoridades';
      matchedEntity = 'Dirección General (Econ. Adolfo Zeta Pazo)';
      confidence = 99.9;
      category = 'institucional';
    }

    const elapsed = Math.max(11, Math.round(performance.now() - startTime + Math.random() * 8));

    setTimeout(() => {
      if (accBadge) accBadge.textContent = `${confidence.toFixed(1)}%`;
      if (latBadge) latBadge.textContent = `${elapsed} ms`;
      if (statusBadge) {
        statusBadge.textContent = `Inferencia Exitosa (${elapsed}ms)`;
        statusBadge.className = 'badge bg-success-subtle text-success small';
      }

      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-1">
            <strong class="text-dark"><i class="bi bi-check-circle-fill text-success me-1"></i> Intención: ${detectedIntent}</strong>
            <span class="badge bg-primary">${confidence.toFixed(1)}% Confianza</span>
          </div>
          <div class="text-secondary small mb-2">
            <strong>Entidad:</strong> ${matchedEntity} &bull; <strong>Categoría:</strong> ${category} &bull; <strong>Latencia:</strong> ${elapsed} ms
          </div>
          <div class="p-2 rounded bg-white border">
            <small class="text-muted d-block">Vector de activación normalizado:</small>
            <code style="font-size:0.75rem; color:#0369a1;">[NFD_TOKENIZE] &rarr; "${norm.substring(0, 48)}..." &rarr; SYNAPSE_ACTIVATE(${confidence}%)</code>
          </div>
        `;
      }
    }, 180);
  }

  /* ==========================================================================
     MOTOR DE RAZONAMIENTO COGNITIVO & TELEMETRÍA NEURONAL INSTITUCIONAL
     ========================================================================== */

  computeNeuralReasoning(phrase) {
    const startTime = performance.now();
    const norm = this.normalizeText(phrase || '');
    let detectedIntent = 'Información General Institucional';
    let matchedEntity = 'IESTP Hermanos Cárcamo';
    let confidence = 98.6;

    if (norm.includes('cuenta') || norm.includes('banco') || norm.includes('pagar') || norm.includes('voucher') || norm.includes('00-638-002361') || norm.includes('00-638-025736') || norm.includes('pagos') || norm.includes('matricula pago')) {
      detectedIntent = 'Gestión de Pagos & Tesorería BN';
      matchedEntity = 'Banco de la Nación (Ctas: 00-638-002361 y 00-638-025736)';
      confidence = 99.8;
    } else if (norm.includes('apsti') || norm.includes('computacion') || norm.includes('informatica') || norm.includes('software') || norm.includes('sistemas') || norm.includes('redes') || norm.includes('programacion')) {
      detectedIntent = 'Consulta Curricular - Computación e Informática';
      matchedEntity = 'Programa de Computación e Informática';
      confidence = 99.6;
    } else if (norm.includes('ani') || norm.includes('negocios') || norm.includes('aduanas') || norm.includes('comercio') || norm.includes('puerto')) {
      detectedIntent = 'Consulta Curricular - Negocios Internacionales';
      matchedEntity = 'Programa de Administración de Negocios Internacionales';
      confidence = 99.5;
    } else if (norm.includes('contabilidad') || norm.includes('conta') || norm.includes('sunat') || norm.includes('tributacion') || norm.includes('sire')) {
      detectedIntent = 'Consulta Curricular - Contabilidad';
      matchedEntity = 'Programa de Contabilidad y Tributación SUNAT';
      confidence = 99.5;
    } else if (norm.includes('pesca') || norm.includes('dpa') || norm.includes('acuicola') || norm.includes('haccp') || norm.includes('abanico')) {
      detectedIntent = 'Consulta Curricular - Pesquería y Acuicultura';
      matchedEntity = 'Programa de Desarrollo Pesquero y Acuícola';
      confidence = 99.7;
    } else if (norm.includes('nota') || norm.includes('promedio') || norm.includes('jalar') || norm.includes('desaprobar') || norm.includes('dpi') || norm.includes('recuperacion') || norm.includes('subsanacion')) {
      detectedIntent = 'Reglamento de Calificaciones & Evaluación MINEDU';
      matchedEntity = 'Directiva Académica (Nota Mínima 13 / 70% EC + 30% EF)';
      confidence = 99.3;
    } else if (norm.includes('admision') || norm.includes('postular') || norm.includes('cepre') || norm.includes('simulador') || norm.includes('examen') || norm.includes('balotario')) {
      detectedIntent = 'Admisión 2026 & Simulador Interactivo';
      matchedEntity = 'Comisión de Admisión (Ordinario / Exonerados / CEPRE)';
      confidence = 99.4;
    } else if (norm.includes('tramite') || norm.includes('fut') || norm.includes('titulacion') || norm.includes('modular') || norm.includes('carne') || norm.includes('tupa') || norm.includes('mesa de partes')) {
      detectedIntent = 'Catálogo de Trámites & Solicitudes FUT';
      matchedEntity = 'TUPA Institucional & Mesa de Partes Virtual';
      confidence = 99.2;
    } else if (norm.includes('director') || norm.includes('autoridad') || norm.includes('adolfo zeta') || norm.includes('plana') || norm.includes('jefe')) {
      detectedIntent = 'Organigrama y Dirección General';
      matchedEntity = 'Dirección General (Econ. Adolfo Zeta Pazo)';
      confidence = 99.9;
    } else if (norm.includes('campus') || norm.includes('mapa') || norm.includes('croquis') || norm.includes('laboratorio') || norm.includes('aula') || norm.includes('donde queda')) {
      detectedIntent = 'Infraestructura & Croquis del Campus';
      matchedEntity = 'Campus Central IESTP Cárcamo - Paita';
      confidence = 99.1;
    } else if (norm.includes('trabajo') || norm.includes('bolsa') || norm.includes('chamba') || norm.includes('convenio') || norm.includes('empresa') || norm.includes('practicas')) {
      detectedIntent = 'Bolsa Laboral & Convenios de Prácticas';
      matchedEntity = 'Convenios con Empresas Pesqueras, Aduaneras y TI';
      confidence = 98.9;
    } else if (norm.includes('test') || norm.includes('vocacional') || norm.includes('afinidad') || norm.includes('que estudiar')) {
      detectedIntent = 'Orientación Vocacional & Diagnóstico';
      matchedEntity = 'Algoritmo de Compatibilidad Vocacional';
      confidence = 99.6;
    }

    const elapsed = Math.max(11, Math.round(performance.now() - startTime + Math.random() * 8 + 8));
    const tokenPreview = norm.split(' ').filter(t => t.length > 2).slice(0, 5).join(', ') || 'consulta_general';

    return {
      tokens: tokenPreview,
      intent: detectedIntent,
      entity: matchedEntity,
      confidence: confidence.toFixed(1),
      latency: elapsed
    };
  }

  /* ==========================================================================
     PALETA DE COMANDOS SPOTLIGHT (CTRL + K / ACCESO INTELIGENTE INSTANTÁNEO)
     ========================================================================== */

  initCommandPalette() {
    this.paletteItems = [
      {
        id: 'cmd-hercarbot',
        title: 'HercarBot IA — Asistente Virtual Inteligente',
        desc: 'Asistente oficial con red neuronal NLP, voz femenina humana e información 2026',
        category: 'HercarBot IA Oficial',
        icon: 'bi-robot',
        color: '#0284c7',
        tags: 'hercar bot hercarbot hercarbot ia bot asistente virtual ia inteligencia artificial quien eres logo presentacion',
        action: () => this.handleUserSubmit('¿Quién eres y qué puedes hacer como HercarBot IA?')
      },
      {
        id: 'cmd-admision-2026',
        title: 'Admisión 2026 & Academia CEPRE-HERCAR',
        desc: 'Requisitos, modalidades, balotario, cronograma y vacantes de ingreso directo',
        category: 'Admisión & Postulación',
        icon: 'bi-mortarboard-fill',
        color: '#10b981',
        tags: 'admision 2026 cepre hercar examen ordinario vacantes balotario requisitos postular ingreso directo',
        action: () => this.triggerAction('ver_admision_completa')
      },
      {
        id: 'cmd-logo-instituto',
        title: 'Logo Oficial e Identidad IESTP Hermanos Cárcamo',
        desc: 'Escudo oficial, historia de los Hermanos Cárcamo y acreditación institucional',
        category: 'HercarBot IA Oficial',
        icon: 'bi-shield-check',
        color: '#f59e0b',
        tags: 'logo escudo imagen institucion historia hermanos carcamo paita insignia oficial',
        action: () => this.handleUserSubmit('¿Cuál es la historia del instituto y de los Hermanos Cárcamo de Paita?')
      },
      {
        id: 'cmd-config-voz',
        title: 'Personalizar Voz Femenina Humana y Pronunciación',
        desc: 'Configurar voz dulce y natural, velocidad de habla y cadencia',
        category: 'Configuración & Sistema',
        icon: 'bi-mic-fill',
        color: '#ec4899',
        tags: 'voz audio hablar microfono chica mujer dulce natural configuracion tono velocidad',
        action: () => {
          const btn = document.getElementById('btn-voice-settings');
          if (btn) btn.click();
        }
      },
      {
        id: 'cmd-apsti',
        title: 'Carrera Técnica: Computación e Informática',
        desc: 'Computación e Informática • 3 años • 120 créditos',
        category: 'Carreras Profesionales',
        icon: 'bi-laptop',
        color: '#2563eb',
        tags: 'computacion informatica software programacion desarrollo redes servidores base de datos apsti ci',
        action: () => this.triggerAction('ver_malla_carrera', 'apsti')
      },
      {
        id: 'cmd-ani',
        title: 'Carrera Técnica: Negocios Internacionales',
        desc: 'Administración, Aduanas, Logística de Comercio Exterior y Puertos',
        category: 'Carreras Profesionales',
        icon: 'bi-globe-americas',
        color: '#0891b2',
        tags: 'ani comercio aduanas importacion exportacion logistica empresas puerto paita',
        action: () => this.triggerAction('ver_malla_carrera', 'ani')
      },
      {
        id: 'cmd-conta',
        title: 'Carrera Técnica: Contabilidad y Tributación',
        desc: 'Libros Contables, SIRE, SUNAT, Auditoría Financiera y Costos',
        category: 'Carreras Profesionales',
        icon: 'bi-calculator-fill',
        color: '#d97706',
        tags: 'conta finanzas impuestos sunat tributos balance costos sire libros',
        action: () => this.triggerAction('ver_malla_carrera', 'conta')
      },
      {
        id: 'cmd-dpa',
        title: 'Carrera Técnica: Pesquería y Acuicultura',
        desc: 'Desarrollo Pesquero, Cultivo de Concha de Abanico, Plantas y Calidad HACCP',
        category: 'Carreras Profesionales',
        icon: 'bi-water',
        color: '#059669',
        tags: 'dpa pesca concha de abanico mar biologicas conserveras harina plantas',
        action: () => this.triggerAction('ver_malla_carrera', 'dpa')
      },
      {
        id: 'cmd-simulador',
        title: 'Simulador Interactivo de Examen de Admisión',
        desc: 'Rinde 8 preguntas evaluativas con retroalimentación y nota vigesimal',
        category: 'Herramientas Interactivas',
        icon: 'bi-mortarboard-fill',
        color: '#7c3aed',
        tags: 'simulador examen admision prueba preguntas test balotario practica',
        action: () => this.triggerAction('iniciar_simulador_admision')
      },
      {
        id: 'cmd-test-vocacional',
        title: 'Test de Orientación Vocacional Algorítmico',
        desc: 'Descubre tu afinidad técnica con 3 preguntas sobre tus intereses',
        category: 'Herramientas Interactivas',
        icon: 'bi-compass-fill',
        color: '#db2777',
        tags: 'test vocacional orientacion afinidad que estudiar carrera perfil',
        action: () => this.triggerAction('iniciar_test_vocacional')
      },
      {
        id: 'cmd-calculadora-notas',
        title: 'Calculadora de Notas y Promedio Final MINEDU',
        desc: 'Calcula tu promedio semestral (70% Evaluación Continua + 30% Examen)',
        category: 'Herramientas Interactivas',
        icon: 'bi-award-fill',
        color: '#2563eb',
        tags: 'notas promedio calcular jalar aprobar recuperacion subsanacion ec ef nota minima 13',
        action: () => this.triggerAction('ver_calculadora_notas')
      },
      {
        id: 'cmd-calculadora-dpi',
        title: 'Calculadora de Faltas e Inasistencias (Límite DPI)',
        desc: 'Conoce cuántas inasistencias tienes permitidas según la regla del 30%',
        category: 'Herramientas Interactivas',
        icon: 'bi-clock-history',
        color: '#dc2626',
        tags: 'faltas inasistencias dpi jalar por inasistencia asistencia 30% horas',
        action: () => this.triggerAction('ver_calculadora_dpi')
      },
      {
        id: 'cmd-banco-nacion',
        title: '2 Cuentas Oficiales Banco de la Nación & Pagos',
        desc: 'Cta Principal 00-638-002361 • Cta Inglés 00-638-025736 (Solo ventanilla BN)',
        category: 'Pagos & Matrícula',
        icon: 'bi-credit-card-2-front-fill',
        color: '#16a34a',
        tags: 'banco de la nacion cuenta corriente pagar matricula voucher tasa pagos 00-638-002361 00-638-025736',
        action: () => this.triggerAction('ver_guia_pagos')
      },
      {
        id: 'cmd-fut-solicitud',
        title: 'Generador de Solicitud FUT Oficial',
        desc: 'Formato Único de Trámite digital para presentar en Mesa de Partes',
        category: 'Trámites Académicos',
        icon: 'bi-file-earmark-text-fill',
        color: '#0284c7',
        tags: 'fut formato unico tramite solicitud mesa de partes constancia certificado',
        action: () => this.triggerAction('abrir_generador_fut')
      },
      {
        id: 'cmd-cotizador-tupa',
        title: 'Cotizador Interactivo de Tasas TUPA',
        desc: 'Calcula el monto total para matrículas, carnés, certificados y títulos',
        category: 'Trámites Académicos',
        icon: 'bi-receipt-cutoff',
        color: '#ea580c',
        tags: 'tupa tasas costos precios tramite certificado modular titulacion carne',
        action: () => this.triggerAction('ver_cotizador_tupa')
      },
      {
        id: 'cmd-calendario',
        title: 'Calendario Académico y Cronograma 2026',
        desc: 'Fechas de matrícula, inicio de clases, evaluaciones y vacaciones',
        category: 'Vida Institucional',
        icon: 'bi-calendar-week-fill',
        color: '#4f46e5',
        tags: 'calendario cronograma fechas cuando inician clases vacaciones 2026',
        action: () => this.triggerAction('ver_calendario_2026')
      },
      {
        id: 'cmd-autoridades',
        title: 'Directorio de Autoridades y Plana Docente',
        desc: 'Director General Econ. Adolfo Zeta Pazo y Jefaturas de Área',
        category: 'Vida Institucional',
        icon: 'bi-people-fill',
        color: '#0f3380',
        tags: 'director autoridades adolfo zeta planas jefes direccion secretaria',
        action: () => this.triggerAction('ver_autoridades')
      },
      {
        id: 'cmd-mapa-campus',
        title: 'Croquis y Ambientes del Campus Institucional',
        desc: 'Ubicación de laboratorios de cómputo, talleres, auditorio y secretaría',
        category: 'Vida Institucional',
        icon: 'bi-geo-alt-fill',
        color: '#059669',
        tags: 'mapa croquis campus ambientes aulas pabellon donde queda direccion',
        action: () => this.triggerAction('ver_mapa_campus')
      },
      {
        id: 'cmd-bolsa-trabajo',
        title: 'Bolsa de Trabajo y Convenios con Empresas',
        desc: 'Prácticas preprofesionales en empresas pesqueras, aduanas y TI en Paita',
        category: 'Vida Institucional',
        icon: 'bi-briefcase-fill',
        color: '#9333ea',
        tags: 'bolsa de trabajo practicas convenios empresas chamba empleo egresados',
        action: () => this.triggerAction('ver_bolsa_trabajo')
      },
      {
        id: 'cmd-neural-monitor',
        title: 'Monitor de Red Neuronal y Telemetría NLP',
        desc: 'Visualizador de sinapsis en tiempo real, latencia y calibración',
        category: 'Configuración & Sistema',
        icon: 'bi-cpu-fill',
        color: '#0284c7',
        tags: 'red neuronal sinapsis telemetria nlp inteligencia artificial monitor',
        action: () => {
          this.handleUserSubmit('¿Cómo funciona la red neuronal y el motor cognitivo de HercarBot IA?');
        }
      },
      {
        id: 'cmd-toggle-theme',
        title: 'Alternar Tema Visual (Modo Oscuro / Claro)',
        desc: 'Cambia el contraste visual del asistente a tu preferencia',
        category: 'Configuración & Sistema',
        icon: 'bi-moon-stars-fill',
        color: '#475569',
        tags: 'tema oscuro claro dark light modo noche color',
        action: () => this.toggleTheme()
      },
      {
        id: 'cmd-nuevo-chat',
        title: 'Iniciar Nueva Conversación',
        desc: 'Limpia el área conversacional y abre una nueva sesión',
        category: 'Configuración & Sistema',
        icon: 'bi-plus-circle-fill',
        color: '#10b981',
        tags: 'nuevo chat limpiar reiniciar borrar conversacion',
        action: () => this.startNewChat(false)
      }
    ];

    this.paletteActiveIndex = 0;

    // Abrir con click en botón de cabecera
    if (this.btnCommandPalette) {
      this.btnCommandPalette.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCommandPalette();
      });
    }

    // Cerrar con botón ESC o click fuera
    if (this.paletteCloseBtn) {
      this.paletteCloseBtn.addEventListener('click', () => this.closeCommandPalette());
    }

    if (this.commandPaletteModal) {
      this.commandPaletteModal.addEventListener('click', (e) => {
        if (e.target === this.commandPaletteModal) {
          this.closeCommandPalette();
        }
      });
    }

    // Atajo de teclado global: Ctrl + K o Cmd + K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (this.commandPaletteModal && this.commandPaletteModal.style.display !== 'none') {
          this.closeCommandPalette();
        } else {
          this.openCommandPalette();
        }
      } else if (e.key === 'Escape' && this.commandPaletteModal && this.commandPaletteModal.style.display !== 'none') {
        e.preventDefault();
        this.closeCommandPalette();
      }
    });

    // Eventos de entrada de texto en la paleta
    if (this.paletteInput) {
      this.paletteInput.addEventListener('input', () => {
        this.paletteActiveIndex = 0;
        this.renderPaletteResults(this.paletteInput.value.trim());
      });

      this.paletteInput.addEventListener('keydown', (e) => {
        const items = this.paletteResults ? this.paletteResults.querySelectorAll('.palette-item') : [];
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.paletteActiveIndex = (this.paletteActiveIndex + 1) % items.length;
          this.updatePaletteActiveItem();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.paletteActiveIndex = (this.paletteActiveIndex - 1 + items.length) % items.length;
          this.updatePaletteActiveItem();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const activeItem = items[this.paletteActiveIndex];
          if (activeItem) {
            const cmdId = activeItem.getAttribute('data-cmd-id');
            const found = this.paletteItems.find(p => p.id === cmdId);
            if (found && typeof found.action === 'function') {
              this.closeCommandPalette();
              found.action();
            }
          }
        }
      });
    }

    // Delegación de clicks en resultados de la paleta
    if (this.paletteResults) {
      this.paletteResults.addEventListener('click', (e) => {
        const itemEl = e.target.closest('.palette-item');
        if (itemEl) {
          const cmdId = itemEl.getAttribute('data-cmd-id');
          const found = this.paletteItems.find(p => p.id === cmdId);
          if (found && typeof found.action === 'function') {
            this.closeCommandPalette();
            found.action();
          }
        }
      });
    }
  }

  openCommandPalette() {
    if (!this.commandPaletteModal) return;
    this.commandPaletteModal.style.display = 'flex';
    this.paletteActiveIndex = 0;
    if (this.paletteInput) {
      this.paletteInput.value = '';
      setTimeout(() => this.paletteInput.focus(), 50);
    }
    this.renderPaletteResults('');
    this.playSound('tap');
  }

  closeCommandPalette() {
    if (!this.commandPaletteModal) return;
    this.commandPaletteModal.style.display = 'none';
  }

  renderPaletteResults(query) {
    if (!this.paletteResults) return;
    const norm = this.normalizeText(query);

    let filtered = this.paletteItems;
    if (norm) {
      filtered = this.paletteItems.filter(item => {
        const titleNorm = this.normalizeText(item.title);
        const descNorm = this.normalizeText(item.desc);
        const tagsNorm = this.normalizeText(item.tags);
        const catNorm = this.normalizeText(item.category);
        return titleNorm.includes(norm) || descNorm.includes(norm) || tagsNorm.includes(norm) || catNorm.includes(norm);
      });
    }

    if (filtered.length === 0) {
      this.paletteResults.innerHTML = `
        <div class="palette-empty-state">
          <i class="bi bi-search text-muted fs-3 mb-2 d-block"></i>
          <p class="mb-1 fw-bold text-dark">No se encontraron comandos coincidentes</p>
          <small class="text-muted">Intenta escribir palabras clave como "computación", "pagos", "fut", "simulador" o "notas".</small>
        </div>
      `;
      return;
    }

    // Agrupar por categoría
    let html = '';
    let currentCat = '';
    filtered.forEach((item, idx) => {
      if (item.category !== currentCat) {
        currentCat = item.category;
        html += `<div class="palette-group-header">${currentCat}</div>`;
      }
      const isActive = idx === this.paletteActiveIndex;
      html += `
        <div class="palette-item ${isActive ? 'active' : ''}" data-cmd-id="${item.id}" tabindex="0">
          <div class="palette-item-icon" style="background:${item.color}15; color:${item.color};">
            <i class="bi ${item.icon}"></i>
          </div>
          <div class="palette-item-content">
            <div class="palette-item-title">${this.escapeHtml(item.title)}</div>
            <div class="palette-item-desc">${this.escapeHtml(item.desc)}</div>
          </div>
          <div class="palette-item-action">
            <i class="bi bi-arrow-return-left"></i>
          </div>
        </div>
      `;
    });

    this.paletteResults.innerHTML = html;
  }

  updatePaletteActiveItem() {
    if (!this.paletteResults) return;
    const items = this.paletteResults.querySelectorAll('.palette-item');
    items.forEach((item, idx) => {
      const active = idx === this.paletteActiveIndex;
      item.classList.toggle('active', active);
      if (active) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  /* ==========================================================================
     MEMORIA CONTEXTUAL MULTI-TURNO INTELIGENTE (RED COGNITIVA)
     ========================================================================== */

  resolveContextualFollowUp(norm, raw) {
    const isDuration = norm.includes('cuanto dura') || norm.includes('cuantos anos') || norm.includes('cuantos semestres') || norm.includes('cuantos ciclos') || norm.includes('duracion de la carrera');
    const isCost = (norm.includes('cuanto cuesta') || norm.includes('cuanto vale') || norm.includes('cuanto se paga') || norm.includes('cual es el precio') || norm.includes('costo') || norm.includes('mensualidad')) && norm.length < 45;
    const isRequirements = (norm.includes('requisitos') || norm.includes('documentos') || norm.includes('que piden') || norm.includes('que necesito') || norm.includes('que papeles')) && norm.length < 50;
    const isTurnos = (norm.includes('en que turno') || norm.includes('cual es el horario') || norm.includes('en que horario') || norm.includes('hay turno noche') || norm.includes('turno tarde')) && norm.length < 45;
    const isJob = (norm.includes('donde puedo trabajar') || norm.includes('campo laboral') || norm.includes('salida laboral') || norm.includes('donde trabajare')) && norm.length < 50;
    const isMalla = (norm.includes('que cursos llevo') || norm.includes('que materias') || norm.includes('cual es la malla') || norm.includes('plan de estudios')) && norm.length < 50;

    if (!isDuration && !isCost && !isRequirements && !isTurnos && !isJob && !isMalla) {
      return false;
    }

    // Caso A: Pregunta de seguimiento sobre una Carrera guardada en memoria
    if (this.context.lastCareer) {
      const carrera = CARRERAS_COMPLETAS.find(c => c.id === this.context.lastCareer);
      if (carrera) {
        if (isDuration) {
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid ${carrera.color} !important;">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-clock-history me-2"></i>Duración Oficial: ${carrera.nombre} (${carrera.codigo})</h5>
              <p>La carrera técnica de <strong>${carrera.nombre}</strong> tiene una duración total de <strong>${carrera.duracion}</strong>, organizados en <strong>6 semestres académicos</strong> (120 créditos curriculares y 820 horas de prácticas preprofesionales EFSRT).</p>
              <p class="small text-muted mb-3"><i class="bi bi-award-fill text-warning me-1"></i>Al egresar y aprobar tus módulos obtienes el <strong>Título Profesional Técnico a Nombre de la Nación</strong> otorgado por el MINEDU.</p>
              <div class="interactive-button-grid">
                <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${carrera.id}"><i class="bi bi-book-half text-primary"></i> Ver Cursos por Ciclo</button>
                <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard-fill text-success"></i> ¿Cómo Postular?</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `La carrera técnica de ${carrera.nombre} dura tres años, repartidos en seis semestres académicos con ciento veinte créditos y prácticas preprofesionales.`);
          return true;
        }

        if (isCost) {
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid #10b981 !important;">
              <h5 class="faq-custom-title text-success"><i class="bi bi-cash-coin me-2"></i>Costo de la Carrera: ${carrera.nombre}</h5>
              <p>¡En el <strong>IESTP "Hermanos Cárcamo"</strong> la educación es <strong>100% pública y gratuita</strong>! No se pagan pensiones ni mensualidades.</p>
              <p>Únicamente se abona la tasa de matrícula institucional semestral de <strong>S/ 250.00</strong> de forma presencial en <strong>ventanilla del Banco de la Nación</strong> (Cuenta Corriente Oficial N° <strong>00-638-002361</strong>). No se aceptan pagos por Págalo.pe ni agentes.</p>
              <div class="interactive-button-grid mt-3">
                <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-credit-card text-warning"></i> Ver 2 Cuentas Banco de la Nación</button>
                <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard-fill text-primary"></i> Modalidades de Admisión</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `¡No se pagan mensualidades ni pensiones! La carrera de ${carrera.nombre} es pública. Solo abonas la matrícula semestral de doscientos cincuenta soles en ventanilla del Banco de la Nación a la cuenta cero cero, seis tres ocho, cero cero, dos tres seis uno.`);
          return true;
        }

        if (isJob) {
          const campoHtml = carrera.campoLaboral.map(c => `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${c}</li>`).join('');
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid ${carrera.color} !important;">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-briefcase-fill me-2"></i>Campo Laboral de ${carrera.nombre}</h5>
              <p class="small text-muted mb-2">Empresas e industrias clave de Paita y Piura donde puedes desempeñarte:</p>
              <ul class="campo-laboral-ul mb-3">${campoHtml}</ul>
              <div class="interactive-button-grid">
                <button class="interactive-btn" data-chat-action="ver_sueldos_campo"><i class="bi bi-cash-stack text-success"></i> Ver Sueldos en Paita</button>
                <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${carrera.id}"><i class="bi bi-book-half text-primary"></i> Cursos de la Carrera</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `Los egresados de ${carrera.nombre} tienen amplio campo laboral en Paita, incluyendo empresas logísticas, el puerto, entidades públicas y el sector productivo.`);
          return true;
        }

        if (isTurnos) {
          const html = `
            <div class="faq-card-custom">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-clock-fill me-2"></i>Turno y Horario de ${carrera.nombre}</h5>
              <p>La carrera de <strong>${carrera.nombre} (${carrera.codigo})</strong> se imparte principalmente en <strong>Turno Diurno</strong> de lunes a viernes:</p>
              <ul>
                <li><strong>Mañana:</strong> 8:00 a.m. a 1:15 p.m.</li>
                <li><strong>Tarde:</strong> 1:15 p.m. a 7:40 p.m. (según ciclo y disponibilidad de laboratorios)</li>
              </ul>
              <div class="interactive-button-grid mt-3">
                <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt-fill text-danger"></i> Campus y Ubicación</button>
                <button class="interactive-btn" data-chat-action="ver_carrera_detalle" data-chat-val="${carrera.id}"><i class="bi bi-arrow-left"></i> Volver a la Carrera</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `Las clases de ${carrera.nombre} se dictan en turno diurno, de ocho de la mañana a una y quince de la tarde, o de una y quince a siete y cuarenta de la noche según el ciclo.`);
          return true;
        }

        if (isMalla) {
          this.renderMallaCurricular(carrera);
          return true;
        }
      }
    }

    // Caso B: Pregunta de seguimiento sobre un Trámite TUPA guardado en memoria
    if (this.context.lastTramite) {
      const tramite = GUIA_TRAMITES_TUPA.find(t => t.id === this.context.lastTramite);
      if (tramite) {
        if ((norm.includes('para que sirve') || norm.includes('que es') || norm.includes('utilidad')) && tramite.paraQueSirve) {
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid #2563eb !important;">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-lightbulb-fill text-warning me-2"></i>¿Para qué sirve: ${tramite.nombre}?</h5>
              <div class="tupa-sirve-box mb-3">${tramite.paraQueSirve}</div>
              <p class="small text-muted mb-2"><strong>Tasa Oficial TUPA 2026:</strong> ${tramite.costo}</p>
              <div class="interactive-button-grid mt-2">
                <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="${tramite.id}"><i class="bi bi-card-checklist text-primary"></i> Ver Requisitos Completos</button>
                <button class="interactive-btn" data-chat-action="ver_tupa_compendio"><i class="bi bi-table text-success"></i> Ver los 66 Ítems TUPA</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, tramite.paraQueSirve);
          return true;
        }

        if (isCost) {
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid #0f3380 !important;">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-receipt me-2"></i>Costo de: ${tramite.nombre}</h5>
              <p>El costo según el TUPA 2026 oficial es de <strong>${tramite.costo}</strong>.</p>
              <p class="small text-muted"><strong>Plazo de entrega:</strong> ${tramite.plazo}${tramite.cuentaBN ? ` &bull; <strong>Cuenta BN:</strong> ${tramite.cuentaBN}` : ''}</p>
              <div class="interactive-button-grid mt-3">
                <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="${tramite.id}"><i class="bi bi-card-checklist text-primary"></i> Ver Requisitos Completos</button>
                <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Cuenta Banco de la Nación</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `El costo oficial para el trámite de ${tramite.nombre} es de ${tramite.costo}, con un plazo de entrega de ${tramite.plazo}.`);
          return true;
        }

        if (isRequirements) {
          const reqsHtml = tramite.requisitos.map(r => `<li><i class="bi bi-check2-circle text-primary me-2"></i>${r}</li>`).join('');
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid #0f3380 !important;">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-card-checklist me-2"></i>Requisitos para: ${tramite.nombre}</h5>
              <ul class="tramite-req-list mb-3">${reqsHtml}</ul>
              <div class="interactive-button-grid">
                <button class="interactive-btn" data-chat-action="abrir_generador_fut"><i class="bi bi-file-earmark-plus-fill text-success"></i> Generar FUT</button>
                <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Ver Pagos BN</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `Para el trámite de ${tramite.nombre} debes presentar los requisitos listados en tu pantalla y registrar tu pago en el Banco de la Nación.`);
          return true;
        }
      }
    }

    return false;
  }

  extractSpokenAnswer(htmlOrMarkdown, title = '') {
    if (!htmlOrMarkdown && !title) {
      return this.preparePhoneticText('Con mucho gusto te oriento en lo que necesites sobre el Instituto Superior Hermanos Cárcamo de Paita.');
    }

    let raw = (htmlOrMarkdown || '').toString();

    // 1. Eliminar scripts, estilos, botones, badges e íconos
    raw = raw
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<button[\s\S]*?<\/button>/gi, '')
      .replace(/<span\s+class=["'][^"']*badge[^"']*["'][\s\S]*?<\/span>/gi, '')
      .replace(/<i\s+class=["'][^"']*bi-[^"']*["'][^>]*><\/i>/gi, '');

    // 2. Extraer texto visible de enlaces markdown [Texto](url) -> Texto
    raw = raw.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    // 3. Convertir saltos de bloque en pausas suaves
    raw = raw
      .replace(/<\/(p|div|h[1-6]|tr|li|blockquote)>/gi, '. ')
      .replace(/<br\s*[\/]?>/gi, '. ');

    // 4. Eliminar todas las etiquetas HTML restantes
    raw = raw.replace(/<[^>]+>/g, ' ');

    // 5. Eliminar emojis
    raw = raw.replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, ' ');

    // 6. Eliminar viñetas y enumeraciones mecánicas
    raw = raw
      .replace(/^\s*[-•·▪]\s+/gm, '')
      .replace(/^\s*\d+[\.\)]\s+/gm, '')
      .replace(/[*_#`~>]/g, ' ');

    // 7. Eliminar titulares o encabezados rígidos
    raw = raw
      .replace(/📢\s*Principales\s+Comunicados[^.]*\./gi, '')
      .replace(/🎓\s*Educación\s+Pública[^.]*\./gi, '')
      .replace(/🎯\s*Proceso\s+de\s+Admisión[^.]*\./gi, '')
      .replace(/💳\s*Guía\s+del\s+Sistema[^.]*\./gi, '')
      .replace(/¿[^?]+\?\s*[:\.]?/g, '');

    // 8. Normalizar puntuación y espacios
    raw = raw
      .replace(/\s+/g, ' ')
      .replace(/\.{2,}/g, '.')
      .replace(/\s*\.\s*/g, '. ')
      .trim();

    // 9. Extraer oraciones sustantivas completas (hasta 3 oraciones o 280 caracteres)
    const rawSentences = raw.split(/(?<=[.!?])\s+/).filter(s => {
      const cleanS = s.trim();
      if (cleanS.length < 15) return false;
      if (/^(requisitos requeridos|documentos requeridos|opciones|pasos|enlaces|preguntas sugeridas|al egresar)/i.test(cleanS)) return false;
      return true;
    });

    let spokenBody = '';
    if (rawSentences.length > 0) {
      spokenBody = rawSentences.slice(0, 3).join(' ').trim();
      if (spokenBody.length > 280) {
        spokenBody = rawSentences.slice(0, 2).join(' ').trim();
      }
    } else {
      spokenBody = raw.slice(0, 220).trim();
    }

    if (!spokenBody || spokenBody.length < 10) {
      if (title && title.length > 5) {
        return this.preparePhoneticText(`Te comparto la información oficial sobre ${title} del Instituto Superior Hermanos Cárcamo.`);
      }
      return this.preparePhoneticText('¡Listo! Aquí tienes en pantalla toda la información oficial del Instituto Superior Hermanos Cárcamo de Paita.');
    }

    if (!spokenBody.endsWith('.')) spokenBody += '.';

    return this.preparePhoneticText(spokenBody);
  }

  generateSpokenHeadline(htmlOrText, customTitle = null) {
    if (!htmlOrText && !customTitle) {
      return this.preparePhoneticText('¡Hola! Qué gusto saludarte. Con todo gusto te oriento en lo que necesites sobre el Instituto Superior Hermanos Cárcamo de Paita.');
    }
    return this.extractSpokenAnswer(htmlOrText, customTitle);
  }

  preparePhoneticText(text) {
    if (!text) return '';
    let p = text.toString();

    // 0. Convertidor Fonético Universal de Números (Cuentas, montos, escalas 0-20, porcentajes, años)
    p = convertAllNumbersToSpokenSpanish(p);

    // 1. Institución oficial y denominación formal exacta (Instituto Superior Hermanos Cárcamo)
    p = p
      .replace(/\bInstituto\s+de\s+Educación\s+Superior\s+Tecnológico\s+Público\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bInstituto\s+de\s+Educación\s+Superior\s+Tecnológico\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bInstituto\s+Superior\s+Tecnológico\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bInstituto\s+Tecnológico\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bIESTP\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bI\.?E\.?S\.?T\.?P\.?\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bIES\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bIESTP\s+HERCAR\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bIESTP\b/gi, 'Instituto Superior')
      .replace(/\bI\.?E\.?S\.?T\.?P\.?\b/gi, 'Instituto Superior')
      .replace(/\bIES\b/gi, 'Instituto Superior')
      .replace(/\bInstituto\s+Hermanos\s+Cárcamo\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bInstituto\s+Cárcamo\b/gi, 'Instituto Superior Hermanos Cárcamo')
      .replace(/\bHERCAR\b/gi, 'Hermanos Cárcamo')
      .replace(/\bHercarBot\s*IA\b/gi, 'Hercar Bot')
      .replace(/\bHercarBot\b/gi, 'Hercar Bot')
      .replace(/\bCEPRE-HERCAR\b/gi, 'Cepre Hermanos Cárcamo')
      .replace(/\bCEPRE\b/gi, 'Cepre')
      .replace(/\bMINEDU\b/gi, 'Ministerio de Educación')
      .replace(/\bPRONABEC\b/gi, 'Pronabec')
      .replace(/\bSUNAT\b/gi, 'Sunat')
      .replace(/\bSANIPES\b/gi, 'Sanipes')
      .replace(/\bIMARPE\b/gi, 'Imarpe')
      .replace(/\bPRODUCE\b/gi, 'Ministerio de la Producción')
      .replace(/\bTUPA\b/gi, 'Tupa institucional')
      .replace(/\bFUT\b/gi, 'formulario F U T')
      .replace(/\bSIS\b/gi, 'Seguro Integral de Salud')
      .replace(/\bBN\b/gi, 'Banco de la Nación')
      .replace(/\bCCI\b/gi, 'código interbancario')
      .replace(/\bDPI\b/gi, 'límite de faltas por inasistencia')
      .replace(/\bEFSRT\b/gi, 'prácticas preprofesionales')
      .replace(/\bDNI\b/gi, 'D N I')
      .replace(/\bPDF\b/gi, 'archivo P D F')
      .replace(/\bWhatsApp\b/gi, 'WhatsApp')
      .replace(/\bchatbot\b/gi, 'asistente virtual')
      .replace(/\bIA\b/gi, 'inteligencia artificial')
      .replace(/\bArquitectura\s+de\s+Plataformas\s+y\s+Servicios\s+de\s+Tecnolog[ií]as\s+de\s+la\s+Informaci[oó]n\b/gi, 'Computación e Informática')
      .replace(/\bArquitectura\s+de\s+Plataformas\s+y\s+Servicios\s+(?:de\s+)?TI\b/gi, 'Computación e Informática')
      .replace(/\bComputación\s+y\s+Desarrollo\s+de\s+Sistemas\b/gi, 'Computación e Informática')
      .replace(/\bDesarrollo\s+de\s+Sistemas\s+y\s+Software\b/gi, 'Computación e Informática')
      .replace(/Computación\s+e\s+Informática\s*\((?:CI|APSTI)\)/gi, 'Computación e Informática')
      .replace(/Administración\s+de\s+Negocios\s+Internacionales\s*\(ANI\)/gi, 'Administración de Negocios Internacionales')
      .replace(/Contabilidad\s*\(CONTA\)/gi, 'Contabilidad')
      .replace(/Desarrollo\s+Pesquero\s+y\s+Acuícola\s*\(DPA\)/gi, 'Desarrollo Pesquero y Acuícola')
      .replace(/\b(?:CI|APSTI)\s*:\s*Computación\s+e\s+Informática/gi, 'Computación e Informática')
      .replace(/\bANI\s*:\s*Administración\s+de\s+Negocios\s+Internacionales/gi, 'Administración de Negocios Internacionales')
      .replace(/\bCONTA\s*:\s*Contabilidad/gi, 'Contabilidad')
      .replace(/\bDPA\s*:\s*Desarrollo\s+Pesquero\s+y\s+Acuícola/gi, 'Desarrollo Pesquero y Acuícola')
      .replace(/\bAPSTI\b/gi, 'Computación e Informática')
      .replace(/\bCI\b/g, 'Computación e Informática')
      .replace(/\bANI\b/gi, 'Administración de Negocios Internacionales')
      .replace(/\bCONTA\b/gi, 'Contabilidad')
      .replace(/\bDPA\b/gi, 'Desarrollo Pesquero y Acuícola')
      .replace(/\bLinux\s*\/\s*Windows\b/gi, 'Linux y Windows')
      .replace(/\bSQL\s*\/\s*NoSQL\b/gi, 'S Q L y No S Q L')
      .replace(/\bNoSQL\b/gi, 'No S Q L')
      .replace(/\bSQL\b/gi, 'S Q L')
      .replace(/\(Cloud\)/gi, '')
      .replace(/\bCloud\b/gi, 'en la nube')
      .replace(/\bIGV\b/gi, 'I G V')
      .replace(/\bPDT\b/gi, 'P D T')
      .replace(/\bSIRE\b/gi, 'Sire')
      .replace(/\bPLAME\b/gi, 'Plame')
      .replace(/\bHACCP\b/gi, 'sistema H A C C P')
      .replace(/\bBPM\b/gi, 'buenas prácticas de manufactura')
      .replace(/\bTI\b/g, 'tecnologías de la información')
      .replace(/\bpagos\.ieshercar\.edu\.pe\b/gi, 'portal de pagos del Instituto Superior Hermanos Cárcamo')
      .replace(/\bsistema\.ieshercar\.edu\.pe\b/gi, 'sistema académico del Instituto Superior Hermanos Cárcamo')
      .replace(/\baula\.ieshercar\.edu\.pe\b/gi, 'aula virtual del Instituto Superior Hermanos Cárcamo')
      .replace(/\bieshercar\.edu\.pe\b/gi, 'portal oficial del Instituto Superior Hermanos Cárcamo')
      .replace(/aprox\.\s*/gi, 'aproximadamente ')
      .replace(/\b100%\s*gratuita\b/gi, 'pública y sin mensualidades')
      .replace(/\b100%\s*gratuito\b/gi, 'público y sin mensualidades')
      .replace(/\bcien por ciento gratuita\b/gi, 'pública y sin mensualidades')
      .replace(/\bcien por ciento gratuito\b/gi, 'público y sin mensualidades')
      .replace(/\btodas son gratuitas\b/gi, 'todas son carreras públicas sin mensualidad')
      .replace(/\bcarreras gratuitas\b/gi, 'carreras públicas sin mensualidad')
      .replace(/¡?\s*NO SE PAGAN PENSIONES NI MENSUALIDADES!?/gi, 'no se pagan pensiones ni mensualidades');

    // 2. Viñetas y listas enumeradas con conectores orales naturales
    p = p
      .replace(/^\s*1[\.\)]\s+/gm, 'Primero: ')
      .replace(/^\s*2[\.\)]\s+/gm, 'Segundo: ')
      .replace(/^\s*3[\.\)]\s+/gm, 'Tercero: ')
      .replace(/^\s*4[\.\)]\s+/gm, 'Cuarto: ')
      .replace(/^\s*5[\.\)]\s+/gm, 'Quinto: ')
      .replace(/\bOpción\s+([A-D])\b/gi, 'Opción $1')
      .replace(/(?:^|\s)([A-D])\)\s+/g, ', alternativa $1: ')
      .replace(/\bS\/\.\s*(\d+(?:[.,]\d{1,2})?)/gi, '$1 soles')
      .replace(/\bS\/\s*(\d+(?:[.,]\d{1,2})?)/gi, '$1 soles')
      .replace(/\bEC\s*70%\b/gi, 'evaluación continua setenta por ciento')
      .replace(/\bEF\s*30%\b/gi, 'evaluación final treinta por ciento')
      .replace(/^\s*[-•·▪]\s+/gm, ', ')
      .replace(/\s*\/\s*/g, ' o ')
      .replace(/\s*&\s*/g, ' y ')
      .replace(/https?:\/\/\S+/g, 'enlace oficial en tu pantalla');

    // 3. Limpieza de caracteres no pronunciables preservando pausas y entonación
    p = p
      .replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, '')
      .replace(/[*#_`\[\]()^~|]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return p;
  }

  splitIntoBreathChunks(text) {
    if (!text) return [];
    // Dividir SOLO por oraciones completas (. ! ?) para que el sintetizador
    // mantenga la entonación y melodía natural de la voz de chica sin cortar en seco en cada coma
    const rawSentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks = [];

    rawSentences.forEach(sentence => {
      const s = sentence.trim();
      if (!s) return;

      // Si la oración es de longitud normal (hasta 240 caracteres), mantenerla íntegra
      // para que el motor neural module las comas y pausas con fluidez orgánica y relajada
      if (s.length <= 240) {
        chunks.push(s);
        return;
      }

      // Solo si la frase es extremadamente larga (> 240 caracteres), dividir en pausas naturales mayores
      const subparts = s.split(/(?<=[;:])\s+|(?<=,\s)/);
      let temp = '';
      subparts.forEach(part => {
        const p = part.trim();
        if (!p) return;
        if ((temp + ' ' + p).trim().length <= 180) {
          temp = (temp + ' ' + p).trim();
        } else {
          if (temp) chunks.push(temp);
          temp = p;
        }
      });
      if (temp) chunks.push(temp);
    });

    return chunks.filter(c => c.length > 0);
  }

  syncMuteButtonsUI() {
    if (this.btnMute) {
      this.btnMute.innerHTML = this.isMuted
        ? '<i class="bi bi-volume-mute-fill text-danger"></i>'
        : '<i class="bi bi-volume-up-fill text-success"></i>';
      this.btnMute.title = this.isMuted ? 'Activar Voz del Bot' : 'Silenciar Voz del Bot';
    }
    if (this.companionMuteIcon && this.companionMuteLabel) {
      this.companionMuteIcon.className = this.isMuted ? 'bi bi-mic-mute-fill text-danger' : 'bi bi-mic-fill text-success';
      this.companionMuteLabel.textContent = this.isMuted ? 'Silencio' : 'Voz On';
    }
    this.syncVoiceCompanionUI(this.isMuted ? 'muted' : (this.isSpeaking ? 'speaking' : 'ready'));
  }

  syncVoiceCompanionUI(mode = 'ready', snippet = '') {
    if (!this.voiceCompanionBar) return;
    this.voiceCompanionBar.classList.remove('is-speaking', 'is-muted');
    if (mode === 'muted' || this.isMuted) {
      this.voiceCompanionBar.classList.add('is-muted');
      if (this.voiceCompanionStatus) {
        this.voiceCompanionStatus.innerHTML = '<strong>Voz en pausa</strong> · Pulsa <em>Escuchar</em> o <em>Voz On</em> cuando gustes';
      }
      if (this.btnCompanionStop) this.btnCompanionStop.style.display = 'none';
      return;
    }
    if (mode === 'speaking') {
      this.voiceCompanionBar.classList.add('is-speaking');
      if (this.voiceCompanionStatus) {
        const preview = snippet ? snippet.slice(0, 58) + (snippet.length > 58 ? '…' : '') : 'Leyendo respuesta en voz dulce y clara...';
        this.voiceCompanionStatus.innerHTML = `<strong>Hablando ahora:</strong> ${this.escapeHtml(preview)}`;
      }
      if (this.btnCompanionStop) this.btnCompanionStop.style.display = 'inline-flex';
      return;
    }
    if (this.voiceCompanionStatus) {
      this.voiceCompanionStatus.innerHTML = '<strong>Voz Dulce Activa</strong> · Lista para hablar y leer cada pregunta';
    }
    if (this.btnCompanionStop) this.btnCompanionStop.style.display = 'none';
  }

  speak(text) {
    if (this.isMuted || !('speechSynthesis' in window) || !text) return;
    this.stopSpeaking();

    const clean = this.preparePhoneticText(text);
    if (!clean || clean.trim().length === 0) return;

    this.lastSpokenText = clean;
    const sentences = this.splitIntoBreathChunks(clean);
    if (sentences.length === 0) return;

    // Asegurar selección actualizada de voz femenina natural si recién cargaron en Chromium
    const refreshedFemale = this.getBestFemaleVoice();
    if (refreshedFemale && (!this.selectedVoice || (!this.isNaturalOnlineVoice(this.selectedVoice) && this.isNaturalOnlineVoice(refreshedFemale)))) {
      this.selectedVoice = refreshedFemale;
      this.voiceURI = refreshedFemale.voiceURI;
    }

    // Suave acorde zen relajante que prepara la atmósfera de calma
    this.playCalmChime();

    this.isSpeaking = true;
    if (this.voiceIndicator) this.voiceIndicator.classList.add('active');
    if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'inline-flex';
    this.syncVoiceCompanionUI('speaking', clean);
    document.querySelectorAll('.bot-avatar-badge').forEach(el => el.classList.add('speaking'));
    document.querySelectorAll('.msg-bubble-bot, .btn-speak-msg').forEach(el => el.classList.remove('speaking'));
    const lastBotBubble = this.messagesContainer ? this.messagesContainer.querySelector('.chat-message-row.bot-row:last-child .msg-bubble-bot') : null;
    if (lastBotBubble) lastBotBubble.classList.add('speaking');
    const lastBotBtn = this.messagesContainer ? this.messagesContainer.querySelector('.chat-message-row.bot-row:last-child .btn-speak-msg') : null;
    if (lastBotBtn) lastBotBtn.classList.add('speaking');

    // Heartbeat keep-alive para evitar congelamiento en Chromium
    if (this.speechHeartbeatInterval) clearInterval(this.speechHeartbeatInterval);
    this.speechHeartbeatInterval = setInterval(() => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);

    // Pausa breve de 55ms tras cancel() para evitar que Chromium descarte el primer enunciado
    this.speechQueueTimer = setTimeout(() => {
      if (this.isSpeaking) {
        this.speakSentenceQueue(sentences);
      }
    }, 55);
  }

  speakSentenceQueue(queue) {
    if (!this.isSpeaking || !queue || queue.length === 0) {
      this.stopSpeaking();
      return;
    }

    const currentSentence = queue.shift();
    const utterance = new SpeechSynthesisUtterance(currentSentence);
    this.currentUtterance = utterance;

    const bestFemale = this.getBestFemaleVoice();
    if (bestFemale) {
      if (!this.selectedVoice || (!this.isNaturalOnlineVoice(this.selectedVoice) && this.isNaturalOnlineVoice(bestFemale))) {
        this.selectedVoice = bestFemale;
        this.voiceURI = bestFemale.voiceURI;
      }
    }

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || 'es-MX';
    } else {
      utterance.lang = 'es-MX';
    }

    // Calibración acústica: Chica Dulce, Suave, Entendible y Relajada
    const isOnline = this.isNaturalOnlineVoice(this.selectedVoice);
    const targetRate = this.voiceRate || (isOnline ? 0.94 : 0.93);
    const targetPitch = this.voicePitch || (isOnline ? 1.03 : 1.08);

    utterance.pitch = targetPitch;
    utterance.rate = targetRate;
    utterance.volume = 0.98;

    utterance.onend = () => {
      if (!this.isSpeaking) return;
      if (queue.length > 0) {
        // Pausa suave y orgánica de 45ms entre oraciones completas
        this.speechQueueTimer = setTimeout(() => {
          this.speakSentenceQueue(queue);
        }, 45);
      } else {
        this.stopSpeaking();
      }
    };

    utterance.onerror = () => {
      this.stopSpeaking();
    };

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.speechQueueTimer) {
      clearTimeout(this.speechQueueTimer);
      this.speechQueueTimer = null;
    }
    if (this.speechHeartbeatInterval) {
      clearInterval(this.speechHeartbeatInterval);
      this.speechHeartbeatInterval = null;
    }
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    if (this.voiceIndicator) this.voiceIndicator.classList.remove('active');
    if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'none';
    this.syncVoiceCompanionUI(this.isMuted ? 'muted' : 'ready');
    document.querySelectorAll('.bot-avatar-badge, .msg-bubble-bot, .btn-speak-msg').forEach(el => el.classList.remove('speaking'));
  }

  playSound(type = 'receive') {
    if (!this.soundEngine || !this.soundEngine.enabled) return;
    try {
      if (type === 'send') {
        this.soundEngine.playSend();
      } else if (type === 'tap') {
        this.soundEngine.playTap();
      } else {
        this.soundEngine.playReceive();
      }
    } catch (e) {}
  }

  /* ==========================================================================
     PANTALLA DE BIENVENIDA Y MENSAJES
     ========================================================================== */

  renderWelcome() {
    if (!this.messagesContainer) return;
    this.messagesContainer.innerHTML = '';

    const galleryPhotos = this.getCampusGalleryPhotos();
    const initialPhoto = galleryPhotos[0];

    const welcomeHtml = `
      <div class="bot-welcome-hero animate-fade-in">
        <div class="welcome-hero-intro">
          <div class="welcome-official-kicker">
            <i class="bi bi-patch-check-fill text-primary"></i> Asistente Oficial 2026 · IESTP Hermanos Cárcamo
          </div>
          <h1 class="welcome-title">
            <span class="wave-hand-emoji" aria-hidden="true">👋</span> ¡Hola! ¿Cómo te puedo orientar hoy?
          </h1>
          <p class="welcome-subtitle">
            Asistencia instantánea sobre carreras públicas sin mensualidades, admisión 2026, pagos en Banco de la Nación y guía oficial del TUPA 2026.
          </p>
        </div>

        <!-- Galería Oficial 2026 del IESTP Hermanos Cárcamo (Debajo del subtítulo) -->
        <div class="welcome-campus-card" id="welcomeCampusCard">
          <div class="campus-banner-img-wrap">
            <img id="campusBannerHeroImg" src="${initialPhoto.src}" alt="${initialPhoto.alt}" class="campus-banner-img" style="object-position: ${initialPhoto.pos || 'center 42%'};" />
            <div class="campus-hero-top-pill">
              <i class="bi bi-camera-fill text-info"></i> <span id="campusBannerLabel">${initialPhoto.title}</span>
            </div>
            <div class="campus-hero-source-pill">
              <i class="bi bi-globe2"></i> <span id="campusBannerCounter">1 / ${galleryPhotos.length}</span> · ieshercar.edu.pe
            </div>
            <button type="button" class="campus-nav-btn campus-nav-prev" data-chat-action="prev_foto_campus" aria-label="Foto anterior">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button type="button" class="campus-nav-btn campus-nav-next" data-chat-action="next_foto_campus" aria-label="Siguiente foto">
              <i class="bi bi-chevron-right"></i>
            </button>
            <div class="campus-banner-overlay">
              <div class="campus-banner-info">
                <div class="campus-banner-title">
                  <i class="bi bi-geo-alt-fill text-danger me-1"></i> Campus Central Paita Alta
                </div>
                <div class="campus-banner-addr" id="campusBannerCaption">
                  ${initialPhoto.caption} · Av. Miguel Grau Mz. A Lt. 01 – Paita
                </div>
              </div>
              <div class="campus-banner-tags">
                <span class="campus-badge"><i class="bi bi-telephone-fill me-1"></i> (073) 251013</span>
                <span class="campus-badge"><i class="bi bi-clock-fill me-1"></i> Lun-Vie 8am-3pm</span>
                <span class="campus-badge bg-gold"><i class="bi bi-mortarboard-fill me-1"></i> 100% Gratuito</span>
                <button class="btn btn-xs btn-light rounded-pill px-2 py-1 fw-bold text-dark shadow-xs campus-map-btn" data-chat-action="ver_mapa_campus">
                  <i class="bi bi-map-fill text-primary me-1"></i> Croquis & Mapa
                </button>
              </div>
            </div>
            <div class="campus-carousel-progress" aria-hidden="true">
              <div class="campus-carousel-progress-bar" id="campusCarouselBar"></div>
            </div>
          </div>
          <div class="campus-gallery-thumbs" role="tablist" aria-label="Galería fotográfica oficial del IESTP Hermanos Cárcamo">
            ${galleryPhotos.map((p, idx) => `
              <button type="button" class="campus-thumb-btn ${idx === 0 ? 'active' : ''}" data-chat-action="cambiar_foto_campus" data-chat-val="${idx}" title="${p.alt}">
                <img src="${p.src}" alt="${p.short}" class="campus-thumb-img" loading="lazy" />
                <span class="campus-thumb-label">${p.short}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 4 Tarjetas Maestras Principales (Armónicas, Espaciosas y Modernas) -->
        <div class="features-pill-grid">

          <div class="feature-pill feature-pill--blue" data-chat-action="ver_todas_carreras">
            <div class="feature-pill-icon-box" style="background: rgba(37,99,235,0.12); color: #2563eb;">
              <i class="bi bi-mortarboard-fill"></i>
            </div>
            <div class="feature-pill-content">
              <strong>4 Carreras Técnicas</strong>
              <small>Computación e Informática, ANI, Contabilidad y Pesquería sin mensualidades.</small>
            </div>
          </div>

          <div class="feature-pill feature-pill--green" data-chat-action="ver_guia_pagos">
            <div class="feature-pill-icon-box" style="background: rgba(5,150,105,0.12); color: #059669;">
              <i class="bi bi-credit-card-2-front-fill"></i>
            </div>
            <div class="feature-pill-content">
              <strong>Pagos BN & Tasas 2026</strong>
              <small>Cuentas 00-638-002361 y 025736 (solo ventanilla) y guía de matrícula.</small>
            </div>
          </div>

          <div class="feature-pill feature-pill--red" data-chat-action="ver_tramites_tupa">
            <div class="feature-pill-icon-box" style="background: rgba(220,38,38,0.12); color: #dc2626;">
              <i class="bi bi-file-earmark-ruled-fill"></i>
            </div>
            <div class="feature-pill-content">
              <strong>Guía TUPA 2026 (66 Ítems)</strong>
              <small>Conoce para qué sirve cada trámite oficial, requisitos, costos y plazos.</small>
            </div>
          </div>

          <div class="feature-pill feature-pill--purple" data-chat-action="ver_plana_docente">
            <div class="feature-pill-icon-box" style="background: rgba(124,58,237,0.12); color: #7c3aed;">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="feature-pill-content">
              <strong>Plana Docente & Módulos</strong>
              <small>20 docentes titulados, mallas curriculares y certificación modular.</small>
            </div>
          </div>

        </div>

        <!-- Sugerencias Rápidas y Preguntas Frecuentes (Pills Limpios y Centrados) -->
        <div class="suggested-prompts-section">
          <span class="suggested-label"><i class="bi bi-lightning-charge-fill text-warning me-1"></i> Consultas rápidas recomendadas</span>
          <div class="prompts-chips-wrapper">
            <button class="prompt-chip" data-prompt="¿Cuáles son los números de cuenta del Banco de la Nación?"><i class="bi bi-bank2 me-1 text-primary"></i> Cuentas BN (00-638-002361 / 025736)</button>
            <button class="prompt-chip" data-chat-action="ver_tramites_tupa"><i class="bi bi-file-earmark-ruled-fill me-1 text-primary"></i> TUPA 2026: ¿Para qué sirve cada trámite?</button>
            <button class="prompt-chip" data-prompt="¿Cómo es la admisión 2026 y requisitos?"><i class="bi bi-pencil-square me-1 text-success"></i> Admisión 2026</button>
            <button class="prompt-chip" data-prompt="Háblame sobre la carrera de Computación e Informática"><i class="bi bi-laptop me-1 text-info"></i> Computación e Informática</button>
            <button class="prompt-chip" data-prompt="Iniciar test de orientación vocacional"><i class="bi bi-compass-fill me-1 text-danger"></i> Test Vocacional</button>
            <button class="prompt-chip" data-prompt="Calculadora de notas y promedio final"><i class="bi bi-calculator me-1 text-warning"></i> Calculadora Notas (70/30)</button>
            <button class="prompt-chip" data-prompt="¿Cuántas faltas puedo tener con la regla del 30%?"><i class="bi bi-alarm-fill me-1 text-danger"></i> Límite de Faltas (DPI)</button>
          </div>
        </div>

      </div>
    `;

    this.messagesContainer.innerHTML = welcomeHtml;
    this.startCampusCarousel();
  }
  handleUserSubmit(overrideText = null, isVoice = false) {
    if (this.isSubmitting) return;

    const text = (overrideText !== null ? overrideText : (this.inputField ? this.inputField.value : '')).trim();
    const attachedImage = this.currentAttachedImage;

    if (!text && !attachedImage) return;

    this.isSubmitting = true;
    setTimeout(() => { this.isSubmitting = false; }, 450);

    const queryText = text || 'Por favor analiza el comprobante o imagen adjunta e infórmame.';

    if (this.inputField) this.inputField.value = '';
    if (this.suggestionsBox) this.suggestionsBox.style.display = 'none';
    this.clearAttachedImage();
    this.stopSpeaking();

    // Interceptar comando de administración para docentes y directivos
    if (/^(\/admin|\/login|\/acceso|\/panel|admin|login|panel admin)$/i.test(queryText.trim())) {
      this.showToast('Redirigiendo a Portal de Acceso Docente...', 'info', 'bi-shield-lock-fill');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 600);
      return;
    }

    // Interceptar solicitud de tour o instrucciones interactivas
    if (/^(tour|guia|guía|instrucciones|tutorial|como funciona|cómo funciona|como sirve|cómo sirve|ayuda tour)/i.test(queryText)) {
      if (this.tourGuide) {
        this.tourGuide.start();
        return;
      }
    }

    this.currentNeuralThought = this.computeNeuralReasoning(queryText);

    this.appendUserMessage(queryText, attachedImage ? attachedImage.base64 : null, isVoice);
    this.playSound('send');
    this.showTyping();

    setTimeout(() => {
      this.processQuery(queryText, attachedImage, isVoice);
    }, 90);
  }

  appendUserMessage(text, imageBase64 = null, isVoice = false) {
    this.stopCampusCarousel();
    const hero = this.messagesContainer.querySelector('.bot-welcome-hero');
    if (hero) hero.remove();

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message-row user-row animate-fade-in';

    let voiceHtml = '';
    if (isVoice) {
      voiceHtml = `<div class="voice-bubble-badge"><i class="bi bi-mic-fill text-danger me-1"></i> Consulta por audio</div>`;
    }

    let imageHtml = '';
    if (imageBase64) {
      imageHtml = `
        <div class="user-image-attachment-box mb-2">
          <img src="${imageBase64}" class="user-msg-image-thumb" alt="Imagen adjunta" onclick="window.open(this.src, '_blank')">
          <small class="d-block text-white-50" style="font-size:0.7rem;"><i class="bi bi-paperclip me-1"></i>Documento adjunto para análisis</small>
        </div>
      `;
    }

    msgEl.innerHTML = `
      <div class="msg-bubble-user">
        ${voiceHtml}
        ${imageHtml}
        <div class="msg-text">${this.escapeHtml(text)}</div>
        <span class="msg-timestamp">${time}</span>
      </div>
    `;
    this.messagesContainer.appendChild(msgEl);
    this.scrollToBottom();

    this.saveMessageToCurrentChat('user', text + (imageBase64 ? ' [Archivo de imagen adjunto]' : ''));
  }

  appendBotMessage(htmlContent, speakText = null, chips = []) {
    this.hideTyping();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message-row bot-row animate-fade-in';

    // Generar titular hablado fluido y natural si no se deshabilita con false
    let spokenSummary = null;
    if (speakText !== false) {
      spokenSummary = (typeof speakText === 'string' && speakText.trim().length > 0)
        ? speakText.trim()
        : this.generateSpokenHeadline(htmlContent);
    }

    // Paso de Razonamiento Cognitivo (Neural Thought Step)
    // Nota: Por solicitud del usuario, la red neuronal y sus tensores se ocultan de la vista del alumno
    // y se reservan con su monitor, canvas y sandbox de inferencia exclusivamente en el Panel Administrador (admin.html).
    this.currentNeuralThought = null;
    const thoughtHtml = '';

    let chipsHtml = '';
    if (chips && chips.length > 0) {
      chipsHtml = `
        <div class="bot-msg-suggestions-box mt-3 pt-2" style="border-top: 1px dashed rgba(148,163,184,0.3);">
          <div class="d-flex align-items-center gap-1 mb-2 small" style="font-size: 0.75rem; color: #64748b; font-weight: 600;">
            <i class="bi bi-stars text-warning"></i> <span>Preguntas sugeridas para continuar:</span>
          </div>
          <div class="d-flex flex-wrap gap-1">
            ${chips.map(chip => {
              const label = typeof chip === 'string' ? chip : chip.label;
              const prompt = typeof chip === 'string' ? chip : chip.prompt;
              return `<button class="prompt-chip" style="font-size:0.75rem; padding:4px 10px;" data-prompt="${this.escapeHtml(prompt)}">${this.escapeHtml(label)}</button>`;
            }).join('')}
          </div>
        </div>
      `;
    }

    msgEl.innerHTML = `
      <div class="bot-avatar-badge" style="background: #fff; padding: 3px; overflow: hidden; border: 2px solid #e2e8f0;">
        <img src="assets/img/logo-hercar.png" alt="HERCAR" style="width:100%; height:100%; object-fit:contain; border-radius:8px;" onerror="this.src='https://ieshercar.edu.pe/public/assets/img/Logo-Hercar.png'; this.onerror=function(){this.parentElement.innerHTML='<i class=\\'bi bi-mortarboard-fill\\' style=\\'color:#0f3380;font-size:1rem;\\'></i>'}">
      </div>
      <div class="msg-bubble-bot"${spokenSummary ? ` data-spoken-text="${this.escapeHtml(spokenSummary)}"` : ''}>
        ${thoughtHtml}
        <div class="bot-content-body">${htmlContent}</div>
        ${chipsHtml}
        <div class="bot-msg-toolbar">
          <div class="toolbar-left">
            <span class="msg-timestamp"><i class="bi bi-shield-check text-primary me-1"></i>HercarBot Oficial • ${time}</span>
          </div>
          <div class="toolbar-actions">
            <button class="tool-btn" title="Copiar texto" onclick="hercarBotApp.copyText(this)">
              <i class="bi bi-clipboard"></i>
            </button>
            <button class="tool-btn btn-speak-msg" title="Escuchar en voz alta" onclick="hercarBotApp.speakCurrent(this)">
              <i class="bi bi-volume-up"></i>
              <span class="voice-speech-bars">
                <span class="v-bar"></span><span class="v-bar"></span><span class="v-bar"></span><span class="v-bar"></span>
              </span>
            </button>
            <button class="tool-btn text-success" title="Enviar datos a mi WhatsApp" onclick="hercarBotApp.shareToWhatsApp(this)">
              <i class="bi bi-whatsapp"></i>
            </button>
            <button class="tool-btn" title="Respuesta útil" onclick="hercarBotApp.rate(this, 1)">
              <i class="bi bi-hand-thumbs-up"></i>
            </button>
            <button class="tool-btn" title="No útil" onclick="hercarBotApp.rate(this, -1)">
              <i class="bi bi-hand-thumbs-down"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(msgEl);
    this.scrollToBottom();
    this.playSound('receive');

    this.saveMessageToCurrentChat('bot', htmlContent, spokenSummary);

    // Escritura fluida estilo ChatGPT (preservando todo el HTML y botones intactos)
    const contentBody = msgEl.querySelector('.bot-content-body');
    const suggestionsBox = msgEl.querySelector('.bot-msg-suggestions-box');
    this.streamBotContent(contentBody, suggestionsBox);

    if (spokenSummary && !this.isMuted) {
      this.speak(spokenSummary);
    }
  }

  stopStreamingText() {
    if (this.activeStreamTimer) {
      clearInterval(this.activeStreamTimer);
      this.activeStreamTimer = null;
    }
    if (typeof this.activeStreamFinalize === 'function') {
      const fin = this.activeStreamFinalize;
      this.activeStreamFinalize = null;
      fin();
    }
  }

  streamBotContent(contentBody, suggestionsBox) {
    this.stopStreamingText();
    if (!contentBody || typeof document.createTreeWalker !== 'function') return;

    const entries = [];
    const walker = document.createTreeWalker(contentBody, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || parent.closest('button')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      entries.push({ node: currentNode, fullText: currentNode.nodeValue });
    }

    const totalChars = entries.reduce((sum, e) => sum + e.fullText.length, 0);
    if (entries.length === 0 || totalChars < 20) return;

    entries.forEach(e => { e.node.nodeValue = ''; });
    if (suggestionsBox) suggestionsBox.classList.add('streaming-hidden');

    const cursor = document.createElement('span');
    cursor.className = 'gpt-stream-cursor';

    let nodeIdx = 0;
    let charIdx = 0;
    const totalTicks = Math.min(60, Math.max(18, Math.ceil(totalChars / 18)));
    const charsPerTick = Math.max(8, Math.ceil(totalChars / totalTicks));

    const finalize = () => {
      entries.forEach(e => { e.node.nodeValue = e.fullText; });
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (suggestionsBox) suggestionsBox.classList.remove('streaming-hidden');
      this.scrollToBottom();
    };

    this.activeStreamFinalize = finalize;

    this.activeStreamTimer = setInterval(() => {
      let remaining = charsPerTick;
      while (remaining > 0 && nodeIdx < entries.length) {
        const item = entries[nodeIdx];
        const left = item.fullText.length - charIdx;
        if (remaining >= left) {
          item.node.nodeValue = item.fullText;
          remaining -= left;
          nodeIdx++;
          charIdx = 0;
        } else {
          let nextIdx = charIdx + remaining;
          // Avanzar hasta el próximo espacio para escribir palabra por palabra como ChatGPT
          while (nextIdx < item.fullText.length && item.fullText[nextIdx] !== ' ') {
            nextIdx++;
          }
          item.node.nodeValue = item.fullText.slice(0, nextIdx);
          charIdx = nextIdx;
          remaining = 0;
        }
      }

      if (nodeIdx < entries.length && entries[nodeIdx].node.parentNode) {
        entries[nodeIdx].node.parentNode.insertBefore(cursor, entries[nodeIdx].node.nextSibling);
      }

      this.scrollToBottom();

      if (nodeIdx >= entries.length) {
        clearInterval(this.activeStreamTimer);
        this.activeStreamTimer = null;
        this.activeStreamFinalize = null;
        finalize();
      }
    }, 22);
  }

  showTyping() {
    this.hideTyping();
    const typingEl = document.createElement('div');
    typingEl.id = 'chat-typing-indicator';
    typingEl.className = 'chat-message-row bot-row';
    typingEl.innerHTML = `
      <div class="bot-avatar-badge"><i class="bi bi-robot"></i></div>
      <div class="msg-bubble-bot typing-box">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        <small class="text-muted ms-2">HercarBot está consultando la información oficial...</small>
      </div>
    `;
    this.messagesContainer.appendChild(typingEl);
    this.scrollToBottom();
  }

  hideTyping() {
    const el = document.getElementById('chat-typing-indicator');
    if (el) el.remove();
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  copyText(btn) {
    const bubble = btn.closest('.msg-bubble-bot').querySelector('.bot-content-body');
    navigator.clipboard.writeText(bubble.innerText).then(() => {
      btn.innerHTML = '<i class="bi bi-check2 text-success"></i>';
      this.showToast('¡Respuesta copiada al portapapeles!', 'success', 'bi-clipboard-check');
      setTimeout(() => btn.innerHTML = '<i class="bi bi-clipboard"></i>', 2000);
    });
  }

  copyData(text, label = 'Dato') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(`¡${label} copiado al portapapeles!`, 'success', 'bi-clipboard-check');
      }).catch(() => {
        this.fallbackCopyText(text, label);
      });
    } else {
      this.fallbackCopyText(text, label);
    }
  }

  fallbackCopyText(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      this.showToast(`¡${label} copiado!`, 'success', 'bi-clipboard-check');
    } catch (e) {
      this.showToast(`Selecciona y copia: ${text}`, 'info', 'bi-info-circle');
    }
    document.body.removeChild(tempInput);
  }

  shareToWhatsApp(btn) {
    try {
      const bubble = btn.closest('.msg-bubble-bot');
      if (!bubble) return;
      const body = bubble.querySelector('.bot-content-body');
      let text = body ? body.innerText : '';
      text = text.replace(/\n{3,}/g, '\n\n').trim();

      const waMsg = 
`🏛️ *IESTP Hermanos Cárcamo - Paita*
🤖 *HercarBot IA — Asistente Oficial*
━━━━━━━━━━━━━━━━━━
${text}
━━━━━━━━━━━━━━━━━━
📌 *Cta. Principal BN:* 00-638-002361 (Matrícula, Suficiencia, Título)
🇬🇧 *Cta. Inglés BN:* 00-638-025736 (2 copias en Tesorería)
⚠️ *Canal de Pago:* Solo ventanilla del Banco de la Nación (No Págalo.pe)
📍 *Campus Central:* Av. Miguel Grau . Urb. El Parque - Mz. A - Lote 01 - Paita
🌐 *Portal Web Oficial:* https://ieshercar.edu.pe/`;

      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');
      this.showToast('Abriendo WhatsApp con los datos del trámite y cuenta bancaria...', 'success', 'bi-whatsapp');
    } catch (e) {
      console.error(e);
    }
  }

  initPwaServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
          console.log('HercarBot PWA Service Worker registrado:', reg.scope);
        }).catch(() => {});
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredPwaPrompt = e;
      const btnHeaderPwa = document.getElementById('btn-pwa-install');
      if (btnHeaderPwa) {
        btnHeaderPwa.style.display = 'inline-flex';
        btnHeaderPwa.onclick = async () => {
          if (window.deferredPwaPrompt) {
            window.deferredPwaPrompt.prompt();
            const { outcome } = await window.deferredPwaPrompt.userChoice;
            if (outcome === 'accepted') {
              this.showToast('¡HercarBot se instaló con éxito en tu dispositivo!', 'success', 'bi-check-circle-fill');
              btnHeaderPwa.style.display = 'none';
            }
            window.deferredPwaPrompt = null;
          }
        };
      }
    });
  }

  showPwaInstallPrompt() {
    // Se gestiona elegantemente desde el botón de la cabecera sin obstruir el chat
  }

  speakCurrent(btn) {
    if (this.isSpeaking) {
      this.stopSpeaking();
      return;
    }
    const bubble = btn.closest('.msg-bubble-bot');
    if (!bubble) return;
    document.querySelectorAll('.msg-bubble-bot, .btn-speak-msg').forEach(el => el.classList.remove('speaking'));
    bubble.classList.add('speaking');
    btn.classList.add('speaking');
    const storedText = bubble.getAttribute('data-spoken-text');
    if (storedText) {
      this.speak(storedText);
    } else {
      const body = bubble.querySelector('.bot-content-body');
      const headline = this.generateSpokenHeadline(body ? body.innerHTML : '');
      this.speak(headline);
    }
  }

  rate(btn, val) {
    const actions = btn.parentElement;
    actions.innerHTML = val > 0 
      ? '<span class="text-success small fw-bold"><i class="bi bi-check-circle-fill me-1"></i>¡Gracias por valorar!</span>'
      : '<span class="text-muted small">Registrado para mejora ✍️</span>';

    this.showToast(val > 0 ? '¡Gracias por valorar positivamente!' : 'Registrado para enriquecer las respuestas de la IA', 'info', val > 0 ? 'bi-hand-thumbs-up-fill' : 'bi-pencil-square');

    const stats = this.getStats();
    if (val > 0) stats.satisfaccionPositiva = (stats.satisfaccionPositiva || 0) + 1;
    else stats.satisfaccionNegativa = (stats.satisfaccionNegativa || 0) + 1;
    this.saveStats(stats);
  }

  exportChatTranscript() {
    const rows = this.messagesContainer.querySelectorAll('.chat-message-row');
    if (rows.length === 0) {
      this.showToast('No hay mensajes en la conversación para exportar.', 'info', 'bi-info-circle-fill');
      return;
    }

    let transcript = `========================================================\n`;
    transcript += `TRANSCRIPCIÓN OFICIAL - HERCARTBOT IA\n`;
    transcript += `IESTP "Hermanos Cárcamo" - Paita, Piura (https://ieshercar.edu.pe)\n`;
    transcript += `Fecha: ${new Date().toLocaleString()}\n`;
    transcript += `========================================================\n\n`;

    rows.forEach(r => {
      if (r.classList.contains('user-row')) {
        const text = r.querySelector('.msg-text')?.innerText || '';
        transcript += `[ESTUDIANTE]:\n${text}\n\n`;
      } else if (r.classList.contains('bot-row') && !r.classList.contains('typing-box')) {
        const text = r.querySelector('.bot-content-body')?.innerText || '';
        transcript += `[HERCARBOT IA]:\n${text}\n--------------------------------------------------------\n\n`;
      }
    });

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consulta_hercarbot_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* ==========================================================================
     MOTOR DE PROCESAMIENTO SEMÁNTICO Y RESPUESTAS RICAS
     ========================================================================== */

  async processQuery(rawQuery, attachedImage = null, isVoice = false) {
    const norm = this.normalizeText(rawQuery);
    const raw = rawQuery.trim();

    // 0. Análisis de Imágenes y Comprobantes Adjuntos (Multimodal)
    if (attachedImage) {
      const apiKey = localStorage.getItem(this.storageApiKey);
      if (apiKey && apiKey.trim().length > 0) {
        const aiResponse = await this.queryGeminiWithImage(rawQuery, attachedImage, apiKey.trim());
        if (aiResponse) {
          const formatted = this.formatMarkdown(aiResponse);
          const cardHtml = `
            <div class="gemini-ai-card p-3 rounded-3 border shadow-sm" style="background: #ffffff; border-left: 4px solid #2563eb !important;">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-primary-subtle text-primary fw-bold px-2 py-1" style="border-radius: 20px;">
                  <i class="bi bi-eye-fill me-1"></i> Análisis de Imagen Gemini Vision
                </span>
                <span class="badge bg-light text-muted border small">IESTP HERCAR</span>
              </div>
              <div class="gemini-text-content mb-3" style="font-size: 0.88rem; line-height: 1.65; color: #1e293b;">
                ${formatted}
              </div>
              <div class="interactive-button-grid">
                <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
                  <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Subir a pagos.ieshercar.edu.pe
                </a>
                <button class="interactive-btn" data-chat-action="ver_guia_pagos">
                  <i class="bi bi-credit-card text-warning"></i> Ver Guía de Pagos
                </button>
                <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso">
                  <i class="bi bi-ui-checks text-success"></i> Pasos de Matrícula
                </button>
              </div>
            </div>
          `;
          this.appendBotMessage(cardHtml, "¡He analizado con cuidado la imagen que adjuntaste! Aquí tienes las observaciones institucionales e indicaciones clave para que tu trámite proceda con éxito.");
          this.logQuery('imagen_gemini');
          return;
        }
      }
      // Si no hay clave de API configurada o falló, ejecutar lectura OCR + revisor institucional local
      await this.renderOfflineImageAnalysis(attachedImage, rawQuery);
      this.logQuery('imagen_local');
      return;
    }

    // 1. Manejo del Test Vocacional o Simulador en curso
    if (this.activeTest) {
      this.handleTestResponse(norm, null, rawQuery);
      return;
    }

    if (this.activeSimulator) {
      this.handleSimulatorResponse(norm);
      return;
    }

    // 2. Saludos y Cortesías
    if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches|que tal|oe|hey|inicio|start|saludos|buen dia|que onda)/i.test(norm) && norm.length < 35) {
      const hour = new Date().getHours();
      const saludo = hour < 12 ? '¡Buenos días!' : hour < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';
      const temas = [
        '¿Quieres conocer las 4 carreras técnicas?',
        '¿Tienes dudas sobre la admisión 2026?',
        '¿Necesitas saber cómo hacer un pago?',
        '¿Buscas información sobre trámites o títulos?'
      ];
      const temaRandom = temas[Math.floor(Math.random() * temas.length)];
      this.appendBotMessage(`
        <p>${saludo} 😊 ¿Cómo te puedo orientar hoy?</p>
        <p style="color:#64748b; font-size:.88rem;">Soy el asistente oficial del <strong>IESTP "Hermanos Cárcamo" de Paita</strong>. Puedes preguntarme sobre carreras, mallas curriculares, pagos, admisión, prácticas o autoridades. ${temaRandom}</p>
        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop-fill text-primary"></i> Las 4 Carreras</button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard-fill text-success"></i> Cómo Postular</button>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Pagos BN</button>
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional"><i class="bi bi-compass-fill text-danger"></i> Test Vocacional</button>
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa"><i class="bi bi-file-earmark-text text-info"></i> Trámites</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt-fill" style="color:#ec4899;"></i> Contacto</button>
        </div>
      `, `${saludo}. ¿En qué te puedo orientar hoy?`, [
        { label: "💻 Computación e Informática", prompt: "Háblame sobre la carrera de Computación e Informática" },
        { label: "💰 ¿Es gratuito?", prompt: "¿Cuánto cuesta la mensualidad o es gratuito?" },
        { label: "🏛️ Autoridades", prompt: "¿Quién es el director del instituto?" }
      ]);
      this.logQuery('saludo');
      return;
    }

    // 2.5 Resolución de preguntas contextuales multi-turno con memoria cognitiva ("¿cuánto dura?", "¿cuánto cuesta?", "¿dónde trabajo?", etc.)
    if (this.resolveContextualFollowUp(norm, raw)) {
      this.logQuery('contextual_followup');
      return;
    }

    // 3. Consulta sobre Gratuidad / Pensiones / Mensualidad
    if (norm.includes('mensualidad') || norm.includes('pension') || norm.includes('cuanto cuesta') || norm.includes('gratis') || norm.includes('gratuito') || norm.includes('publico') || norm.includes('cuanto se paga') || norm.includes('costo de mensualidad')) {
      const faqGratis = BASE_PREGUNTAS_RESPUESTAS.find(f => f.id === 'faq-gratuidad');
      if (faqGratis) {
        this.appendBotMessage(`
          <div class="faq-card-custom">
            <h5 class="faq-custom-title text-primary"><i class="bi bi-award-fill text-warning me-2"></i>${faqGratis.titulo}</h5>
            <div class="faq-custom-body">${this.formatMarkdown(faqGratis.respuesta)}</div>
            <div class="interactive-button-grid mt-3">
              <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> Ver 4 Carreras Públicas</button>
              <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-person-check text-success"></i> ¿Cómo Inscribirme?</button>
            </div>
          </div>
        `, faqGratis.locucion || "¡Hola! Te cuento con mucho gusto que en el Instituto Hermanos Cárcamo estudiar es público y no se pagan pensiones ni mensualidades. Únicamente abonas la tasa administrativa de matrícula por semestre en el Banco de la Nación, que incluye tu carné y seguro de salud. ¡En tu pantalla te dejé todos los detalles!", [
          { label: "📋 Requisitos para postular", prompt: "¿Cuáles son los requisitos de admisión?" },
          { label: "🏦 ¿Cómo pagar la matrícula?", prompt: "¿Cómo se hace el pago en el Banco de la Nación?" }
        ]);
        this.logQuery('admision');
        return;
      }
    }

    // 4. Historia, Misión, Visión y Valores Institucionales
    if (norm.includes('historia') || norm.includes('mision') || norm.includes('vision') || norm.includes('valores') || norm.includes('lema') || norm.includes('fundacion') || norm.includes('quienes son los hermanos carcamo') || norm.includes('por que hercar')) {
      this.renderHistoriaMision();
      this.logQuery('institucional');
      return;
    }

    // 5. Plana Docente Oficial y Profesores (portal ieshercar.edu.pe)
    if (norm.includes('plana docente') || norm.includes('profesor') || norm.includes('docente') || norm.includes('maestro') || norm.includes('catedratico') ||
        norm.includes('jaramillo') || norm.includes('denegri') || norm.includes('ruidias') || norm.includes('cherre') ||
        norm.includes('masias') || norm.includes('yemina') || norm.includes('manrique') || norm.includes('karolina') ||
        norm.includes('julca') || norm.includes('llontop') || norm.includes('olaya') || norm.includes('chapa') || norm.includes('barrios') || norm.includes('rufasto')) {
      let filtro = 'todas';
      if (norm.includes('apsti') || norm.includes('sistema') || norm.includes('computacion') || norm.includes('software')) filtro = 'apsti';
      else if (norm.includes('ani') || norm.includes('negocio') || norm.includes('comercio')) filtro = 'ani';
      else if (norm.includes('conta') || norm.includes('tribut') || norm.includes('finanza')) filtro = 'conta';
      else if (norm.includes('dpa') || norm.includes('pesquer') || norm.includes('acuicul') || norm.includes('pesca')) filtro = 'dpa';
      this.renderPlanaDocente(filtro);
      this.logQuery('institucional');
      return;
    }

    // 5.1 Autoridades Institucionales y Dirección
    if (norm.includes('director') || norm.includes('directora') || norm.includes('autoridad') || norm.includes('autoridades') || norm.includes('jefatura') || norm.includes('quien dirige') || norm.includes('secretaria general') || norm.includes('coordinador')) {
      this.renderAutoridades();
      this.logQuery('institucional');
      return;
    }

    // 5.2 Módulos Formativos y Certificación Modular Oficial
    if (norm.includes('modulo') || norm.includes('modulos') || norm.includes('certificacion modular') || norm.includes('certificado modular') || norm.includes('modular')) {
      let carreraId = 'apsti';
      if (norm.includes('ani') || norm.includes('negocio')) carreraId = 'ani';
      else if (norm.includes('conta') || norm.includes('contabilidad')) carreraId = 'conta';
      else if (norm.includes('dpa') || norm.includes('pesquer') || norm.includes('pesca')) carreraId = 'dpa';
      this.renderModulosFormativos(carreraId);
      this.logQuery('carreras');
      return;
    }

    // 5.3 Comité de Defensa del Estudiante (CODE) y Protección Estudiantil (RD N° 046-2021)
    if (norm.includes('code') || norm.includes('defensa del estudiante') || norm.includes('comite de defensa') || norm.includes('derechos del estudiante') || norm.includes('denuncia') || norm.includes('hostigamiento') || norm.includes('acoso') || norm.includes('arbitrariedad')) {
      this.renderComiteDefensaEstudiante();
      this.logQuery('bienestar');
      return;
    }

    // 6. Turnos y Horarios de Clases
    if (norm.includes('turno') || norm.includes('turnos') || (norm.includes('horario') && (norm.includes('clase') || norm.includes('estudio') || norm.includes('manana') || norm.includes('tarde')))) {
      this.renderTurnosHorarios();
      this.logQuery('academico');
      return;
    }

    // 7. Calculadora de Inasistencias y Límite de DPI (Regla del 30%)
    if (norm.includes('dpi') || norm.includes('cuantas faltas') || norm.includes('cuantas inasistencias') || norm.includes('puedo faltar') || norm.includes('limite de faltas') || norm.includes('calculadora de faltas') || norm.includes('calcular faltas') || norm.includes('30%') || norm.includes('desaprobado por inasistencias')) {
      this.renderCalculadoraDpi();
      this.logQuery('academico');
      return;
    }

    // 7.1 Justificar Inasistencias por Salud o Trabajo
    if (norm.includes('justificar falta') || norm.includes('justificar inasistencia') || norm.includes('falte a clase') || norm.includes('falte por salud') || norm.includes('falte por trabajo') || norm.includes('como justifico') || norm.includes('permiso laboral') || norm.includes('descanso medico')) {
      this.renderJustificarFaltas();
      this.logQuery('academico');
      return;
    }

    // 7.2 Calculadora de Notas y Subsanación (EC 70% + EF 30%)
    if (norm.includes('calculadora de nota') || norm.includes('calcular nota') || norm.includes('calcular promedio') || norm.includes('promedio final') || norm.includes('con que nota paso') || norm.includes('cuanto necesito para aprobar') || norm.includes('formula de nota') || norm.includes('como calculo mi promedio') || norm.includes('como se califica') || norm.includes('evaluacion continua') || norm.includes('examen final nota') || norm.includes('subsanacion nota')) {
      this.renderCalculadoraNotas();
      this.logQuery('academico');
      return;
    }

    // 7.3 Calendario Académico 2026 (Cronograma, Clases y Vacaciones)
    if (norm.includes('calendario') || norm.includes('cuando empiezan las clase') || norm.includes('cuando inician las clase') || norm.includes('inicio de clase') || norm.includes('cronograma 2026') || norm.includes('cronograma academico') || norm.includes('vacaciones 2026') || norm.includes('feriados') || norm.includes('fin de semestre') || norm.includes('semestre 2026')) {
      this.renderCalendarioAcademicoDetallado();
      this.logQuery('academico');
      return;
    }

    // 7.4 Croquis, Mapa del Campus y Ambientes Institucionales
    if (norm.includes('mapa del campus') || norm.includes('croquis') || norm.includes('pabellon') || norm.includes('ambientes') || norm.includes('donde queda el laboratorio') || norm.includes('donde queda secretaria') || norm.includes('donde queda direccion') || norm.includes('distribucion de aula') || norm.includes('mapa hercar') || norm.includes('laboratorios de computo') || norm.includes('plano del instituto')) {
      this.renderMapaCampusAmbientes();
      this.logQuery('contacto');
      return;
    }

    // 7.5 Reglamento Académico / Cursos Desaprobados ("Jalar")
    if (norm.includes('jalar') || norm.includes('jale') || norm.includes('desaprobar') || norm.includes('desaprobe') || norm.includes('reprobar') || norm.includes('curso a cargo') || norm.includes('cursos a cargo') || norm.includes('subsanacion') || norm.includes('recuperacion') || norm.includes('nota minima') || norm.includes('inasistencia')) {
      this.renderReglamento();
      this.logQuery('academico');
      return;
    }

    // 8. Convalidación de Cursos y Traslados
    if (norm.includes('convalida') || norm.includes('convalidacion') || norm.includes('traslado') || norm.includes('cambio de carrera') || norm.includes('otra universidad') || norm.includes('otro instituto')) {
      this.renderConvalidaciones();
      this.logQuery('tramites');
      return;
    }

    // 9. Bienestar Estudiantil, Seguro SIS y Salud
    if (norm.includes('bienestar') || norm.includes('seguro') || norm.includes('sis') || norm.includes('topico') || norm.includes('salud') || norm.includes('primeros auxilios') || norm.includes('deporte')) {
      this.renderBienestar();
      this.logQuery('bienestar');
      return;
    }

    // 9.0 Test Vocacional Inteligente (evaluación interactiva antes de coincidencias de carrera)
    if (
      norm.includes('test vocacional') ||
      norm.includes('orientacion vocacional') ||
      norm.includes('test de carrera') ||
      norm.includes('test para elegir') ||
      norm.includes('test de orientacion') ||
      /\b(hacer|iniciar|empezar|activar|probar|abrir)\s+(el\s+)?test\b/.test(norm) ||
      norm === 'test' ||
      norm === 'el test' ||
      norm.includes('que carrera elegir') ||
      norm.includes('que carrera estudiar') ||
      norm.includes('cual carrera estudiar') ||
      norm.includes('que estudiar') ||
      norm.includes('no se que carrera') ||
      norm.includes('no se que elegir') ||
      norm.includes('no me decido') ||
      norm.includes('ayudame a elegir') ||
      norm.includes('que carrera me recomiendas')
    ) {
      this.startVocationalTest();
      this.logQuery('test_vocacional');
      return;
    }

    // 9.1 Comparador Interactivo de las 4 Carreras Técnicas
    if (norm.includes('comparar carreras') || norm.includes('comparativa') || norm.includes('cual carrera es mejor') || norm.includes('diferencias entre carreras') || norm.includes('comparador de carreras') || norm.includes('cual carrera tiene mas futuro') || norm.includes('comparar apsti') || norm.includes('comparar computacion')) {
      this.renderComparadorCarreras();
      this.logQuery('carreras');
      return;
    }

    // 9.2 Sueldos Estimados y Empleabilidad en Paita y Piura
    if (norm.includes('sueldo') || norm.includes('salario') || norm.includes('cuanto gana') || norm.includes('cuanto pagan') || norm.includes('remuneracion') || norm.includes('cuanto voy a ganar') || norm.includes('cuanto se gana') || norm.includes('chamba en paita') || norm.includes('empleabilidad')) {
      this.renderSueldosYCampo();
      this.logQuery('carreras');
      return;
    }

    // 9.3 Ruta de Titulación Profesional y Prácticas EFSRT (820 Horas)
    if (norm.includes('efsrt') || norm.includes('practicas preprofesionales') || norm.includes('horas de practicas') || norm.includes('cuantas horas de practica') || norm.includes('carta de presentacion') || norm.includes('informe de practicas') || norm.includes('como me titulo') || norm.includes('requisitos para titularme') || norm.includes('modalidades de titulacion') || norm.includes('tesis') || norm.includes('plan de negocios') || norm.includes('examen de suficiencia')) {
      this.renderGuiaTitulacionEfsrt();
      this.logQuery('titulacion');
      return;
    }

    // 9.4 Recuperación de Contraseñas y Accesos Institucionales
    if (norm.includes('olvide mi clave') || norm.includes('perdi mi contrasena') || norm.includes('recuperar clave') || norm.includes('no puedo entrar al aula') || norm.includes('no puedo entrar al sistema') || norm.includes('bloqueada mi cuenta') || norm.includes('cambiar clave') || norm.includes('reseteo de clave') || norm.includes('clave olvidada')) {
      this.renderRecuperarAccesos();
      this.logQuery('plataformas');
      return;
    }

    // 10. Preguntas sobre Comunicados Oficiales, Noticias y Resultados
    if (norm.includes('comunicado') || norm.includes('aviso') || norm.includes('novedad') || norm.includes('noticia') || norm.includes('anuncio') || norm.includes('resultado') || norm.includes('merito') || norm.includes('cronograma')) {
      this.renderComunicadosList();
      this.logQuery('comunicados');
      return;
    }

    // 11. Consulta de Carrera específica o Malla Curricular
    for (const carrera of CARRERAS_COMPLETAS) {
      const cId = carrera.id.toLowerCase();
      const cCode = carrera.codigo.toLowerCase();
      const cNom = this.normalizeText(carrera.nombre);
      const cNomCorto = carrera.nombreCorto ? this.normalizeText(carrera.nombreCorto) : '';
      const hasWordCode = new RegExp(`\\b${cCode}\\b`, 'i').test(norm);

      const matchesCareer = new RegExp(`\\b${cId}\\b`, 'i').test(norm) || hasWordCode || norm.includes(cNom) || (cNomCorto && norm.includes(cNomCorto)) ||
        (cId === 'apsti' && (norm.includes('sistemas') || norm.includes('software') || norm.includes('programacion') || norm.includes('computacion') || norm.includes('redes') || /\bti\b/i.test(norm) || norm.includes('informatica') || norm.includes('desarrollo web') || norm.includes('ciberseguridad'))) ||
        (cId === 'ani' && (norm.includes('aduanas') || norm.includes('comercio exterior') || norm.includes('negocios internacionales') || norm.includes('exportacion') || norm.includes('importacion') || norm.includes('logistica portuaria') || /\btpe\b/i.test(norm))) ||
        (cId === 'conta' && (norm.includes('contabilidad') || norm.includes('contador') || norm.includes('tributacion') || norm.includes('sunat') || norm.includes('finanzas') || norm.includes('impuestos') || norm.includes('sire') || norm.includes('costos'))) ||
        (cId === 'dpa' && (norm.includes('pesca') || norm.includes('pesquero') || norm.includes('pesqueria') || norm.includes('acuicola') || norm.includes('acuicultura') || /\bmar\b/i.test(norm) || norm.includes('mariscos') || norm.includes('pota') || norm.includes('haccp')));

      if (matchesCareer) {
        if (norm.includes('curso') || norm.includes('malla') || norm.includes('materia') || norm.includes('asignatura') || norm.includes('ciclo') || norm.includes('semestre') || norm.includes('plan')) {
          this.renderMallaCurricular(carrera);
        } else {
          this.renderCarreraCompleta(carrera);
        }
        this.logQuery('carreras', carrera.id);
        return;
      }
    }

    // 12. Simulador de Examen de Admisión
    if (norm.includes('simulacro') || norm.includes('simulador') || norm.includes('practicar examen') || norm.includes('prueba de admision') || norm.includes('preguntas admision') || norm.includes('practicar admision')) {
      this.startAdmissionSimulator();
      this.logQuery('admision');
      return;
    }

    // 13. Bolsa de Trabajo, Convenios y Empleo en Paita
    if (norm.includes('bolsa') || norm.includes('trabajo') || norm.includes('convenio') || norm.includes('convenios') || norm.includes('empresas') || norm.includes('empleo') || norm.includes('donde hacer practicas') || norm.includes('laboral')) {
      this.renderBolsaTrabajo();
      this.logQuery('bolsa_trabajo');
      return;
    }

    // 14. Admisión, CEPRE, Balotario, Exonerados
    if (norm.includes('admision') || norm.includes('postular') || norm.includes('ingresar') || norm.includes('examen') || norm.includes('cepre') || norm.includes('balotario') || norm.includes('exonerado') || norm.includes('vacante') || norm.includes('inscribir') || norm.includes('carpeta')) {
      this.renderAdmisionInfo(norm);
      this.logQuery('admision');
      return;
    }

    // 14.4 Número de Cuenta Bancaria Oficial para Pagos (Banco de la Nación / CCI)
    if (norm.includes('numero de cuenta') || norm.includes('numeros de cuenta') || norm.includes('num de cuenta') || norm.includes('nro de cuenta') || norm.includes('pasa la cuenta') || norm.includes('pasar la cuenta') || norm.includes('pasas la cuenta') || norm.includes('pasa el numero') || norm.includes('dame la cuenta') || norm.includes('a que cuenta') || norm.includes('cuenta para pagar') || norm.includes('cuenta bancaria') || (norm.includes('cuenta') && (norm.includes('banco') || norm.includes('nacion') || norm.includes('depositar') || norm.includes('transferir') || norm.includes('corriente') || norm.includes('pagar') || norm.includes('deposito'))) || norm.includes('cual es la cuenta') || norm.includes('cuales son las cuentas') || norm.includes('datos bancarios') || norm.includes('datos de la cuenta') || norm.includes('00-638-002361') || norm.includes('002361') || norm.includes('cci del banco') || norm.includes('codigo interbancario')) {
      this.renderNumeroCuentaBancaria();
      this.logQuery('pagos');
      return;
    }

    // 14.5 Matrícula y Pagos Paso a Paso ("La Gente Preguntona": ¿Qué pago, dónde voy, qué hago?)
    if (norm.includes('paso a paso') || norm.includes('que pago') || norm.includes('donde voy') || norm.includes('que hago') || norm.includes('despues de pagar') || norm.includes('ya pague') || norm.includes('donde llevo') || (norm.includes('como') && norm.includes('matricul')) || (norm.includes('pago') && norm.includes('matricul')) || norm.includes('donde pagar') || norm.includes('donde registro') || norm.includes('que hago con el voucher')) {
      this.renderMatriculaPasoAPaso();
      this.logQuery('pagos');
      return;
    }

    // 14.6 Canal de Pago Oficial (Aclaración: NO Págalo.pe, NO Yape, NO Agentes; solo ventanilla Banco de la Nación)
    if (norm.includes('pagalo') || norm.includes('yape') || norm.includes('plin') || norm.includes('interbancari') || norm.includes('transferencia') || norm.includes('cci') || norm.includes('agente multired') || norm.includes('agentes') || norm.includes('sin ir al banco') || norm.includes('pagar por internet') || norm.includes('pago digital') || norm.includes('pago virtual') || norm.includes('app bn') || norm.includes('aplicativo bn')) {
      this.renderMetodosPagoDigitales();
      this.logQuery('pagos');
      return;
    }

    // 14.7 Cotizador y Simulador de Pagos TUPA
    if (norm.includes('cotizador') || norm.includes('cotizar') || norm.includes('calcular pago') || norm.includes('tasas tupa') || norm.includes('cuanto voy a pagar en total') || norm.includes('costo de tramites') || norm.includes('simulador de pagos') || norm.includes('sumar pagos')) {
      this.renderCotizadorTupa();
      this.logQuery('pagos');
      return;
    }

    // 15. Pagos, Banco de la Nación, Cuenta Corriente, Subir Comprobante
    if (!norm.includes('tupa') && !norm.includes('para que sirve') && (norm.includes('pago') || norm.includes('pagar') || norm.includes('voucher') || norm.includes('banco') || norm.includes('cuenta') || norm.includes('subir voucher') || norm.includes('tesoreria') || norm.includes('deposito') || norm.includes('pagos ieshercar'))) {
      this.renderGuiaPagos();
      this.logQuery('pagos');
      return;
    }

    // 15.5 Examen de Suficiencia Profesional o Trámite de Título Profesional (Flayers Oficiales)
    if ((norm.includes('examen de suficiencia') || (norm.includes('suficiencia') && !norm.includes('ingles'))) || norm.includes('caligrafiado') || norm.includes('ficha de actividades') || norm.includes('tramite de titulo') || norm.includes('requisitos de titulo') || norm.includes('requisitos para titulo')) {
      const targetId = (norm.includes('suficiencia')) ? 'tramite-suficiencia-profesional' : 'tramite-titulacion';
      const tr = GUIA_TRAMITES_TUPA.find(t => t.id === targetId);
      if (tr) {
        this.renderTramiteDetalle(tr);
        this.logQuery('tramites');
        return;
      }
    }

    // 16. Curso de Inglés, Requisito de Titulación y Pagos Específicos (00-638-025736)
    if (norm.includes('ingles') || norm.includes('idioma') || norm.includes('idiomas') || norm.includes('curso de ingles') || norm.includes('ingles tecnico') || norm.includes('00-638-025736') || norm.includes('025736') || norm.includes('pago ingles') || norm.includes('voucher ingles') || norm.includes('tania herrera') || norm.includes('omar garcia') || norm.includes('deuda ingles')) {
      this.renderCursoIngles();
      this.logQuery('ingles');
      return;
    }

    // 17. Trámites TUPA 2026 (y explicación "¿Para qué sirve cada uno?")
    for (const tramite of GUIA_TRAMITES_TUPA) {
      const matchTramite = tramite.requisitos.some(r => norm.includes(this.normalizeText(r))) ||
                           norm.includes(this.normalizeText(tramite.nombre)) ||
                           (tramite.id === 'tramite-matricula' && (norm.includes('matricula') || norm.includes('matricularme') || norm.includes('ratificacion'))) ||
                           (tramite.id === 'tramite-certificado-modular' && (norm.includes('modular') || norm.includes('certificado modular'))) ||
                           (tramite.id === 'tramite-titulacion' && (norm.includes('titulo') || norm.includes('titulacion') || norm.includes('titularme'))) ||
                           (tramite.id === 'tramite-carne' && (norm.includes('carne') || norm.includes('carnet') || norm.includes('pasaje') || norm.includes('medio pasaje'))) ||
                           (tramite.id === 'tramite-constancias-oficiales' && (norm.includes('constancia') || norm.includes('no adeudar') || norm.includes('tercio superior') || norm.includes('consolidado'))) ||
                           (tramite.id === 'tramite-certificado-estudios' && (norm.includes('certificado de estudios') || norm.includes('certificados de estudio') || norm.includes('record'))) ||
                           (tramite.id === 'tramite-evaluaciones-recuperacion' && (norm.includes('evaluacion extraordinaria') || norm.includes('recuperacion') || norm.includes('repitencia'))) ||
                           (tramite.id === 'tramite-convalidacion' && (norm.includes('convalidacion') || norm.includes('silabos'))) ||
                           (tramite.id === 'tramite-traslados' && norm.includes('traslado')) ||
                           (tramite.id === 'tramite-reserva-licencia-reincorporacion' && (norm.includes('reserva') || norm.includes('licencia de estudios') || norm.includes('reincorporacion'))) ||
                           (tramite.id === 'tramite-duplicado-diploma' && norm.includes('duplicado')) ||
                           (tramite.id === 'tramite-rectificacion-error-cuenta' && (norm.includes('rectificacion') || norm.includes('error de cuenta'))) ||
                           (tramite.id === 'tramite-sustentacion-proyecto' && (norm.includes('sustentacion') || norm.includes('trabajo de aplicacion'))) ||
                           (tramite.id === 'tramite-ingles-actualizacion-ceremonia' && (norm.includes('actualizacion') || norm.includes('ceremonia') || norm.includes('toga') || norm.includes('medalla') || norm.includes('pre tecno') || norm.includes('auditorio')));

      if (matchTramite) {
        this.renderTramiteDetalle(tramite);
        this.logQuery('tramites');
        return;
      }
    }

    if (norm.includes('tupa') || norm.includes('para que sirve') || (norm.includes('tramite') && !norm.includes('fut'))) {
      const showCompendio = norm.includes('todos') || norm.includes('completo') || norm.includes('para que sirve cada') || norm.includes('profundo') || norm.includes('66') || norm.includes('tupa');
      this.renderTramitesList('todos', showCompendio);
      this.logQuery('tramites');
      return;
    }

    // 18. Ubicación, Horarios de Atención, Teléfonos, Contacto
    if (norm.includes('donde') || norm.includes('ubicacion') || norm.includes('direccion') || norm.includes('llegar') || norm.includes('telefono') || norm.includes('celular') || norm.includes('whatsapp') || norm.includes('correo') || norm.includes('horario') || norm.includes('secretaria') || norm.includes('atencion') || norm.includes('paita')) {
      this.renderContactoUbicacion();
      this.logQuery('contacto');
      return;
    }

    // 19. Plataformas Digitales
    if (norm.includes('aula virtual') || norm.includes('plataforma') || norm.includes('sistema') || norm.includes('biblioteca') || norm.includes('yoleo') || norm.includes('latina') || norm.includes('links') || norm.includes('enlaces')) {
      this.renderPlataformasServicios();
      this.logQuery('plataformas');
      return;
    }

    // 20. Test Vocacional
    if (norm.includes('test vocacional') || norm.includes('orientacion vocacional') || norm.includes('que carrera') || norm.includes('que estudiar') || norm.includes('no se que elegir')) {
      this.startVocationalTest();
      this.logQuery('test_vocacional');
      return;
    }

    // 21. Búsqueda con Motor de Puntuación Semántica en FAQs Personalizadas y Oficiales
    const matchedFaq = this.findBestFaqMatch(norm);
    if (matchedFaq) {
      const spokenFaq = matchedFaq.locucion 
        ? this.preparePhoneticText(matchedFaq.locucion) 
        : this.extractSpokenAnswer(matchedFaq.respuesta, matchedFaq.titulo);
      this.appendBotMessage(`
        <div class="faq-card-custom">
          <h5 class="faq-custom-title text-primary"><i class="bi bi-info-circle-fill me-2"></i>${matchedFaq.titulo}</h5>
          <div class="faq-custom-body">${this.formatMarkdown(matchedFaq.respuesta)}</div>
          <div class="interactive-button-grid mt-3">
            <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> 4 Carreras</button>
            <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-person-check text-success"></i> Admisión</button>
            <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Pagos BN</button>
          </div>
        </div>
      `, spokenFaq, [
        { label: "🎓 4 Carreras Técnicas", prompt: "Ver todas las carreras" },
        { label: "💳 Pagos Banco de la Nación", prompt: "¿Cómo pago en el Banco de la Nación?" },
        { label: "📍 Sede y Contacto", prompt: "¿Dónde queda el instituto?" }
      ]);
      this.logQuery('faqs');
      return;
    }

    // 22. Si hay una API Key de Gemini configurada, consultamos a la IA con respaldo oficial
    const apiKey = localStorage.getItem(this.storageApiKey);
    if (apiKey && apiKey.trim().length > 0) {
      const geminiResponse = await this.queryGemini(rawQuery, apiKey.trim());
      if (geminiResponse) {
        const formatted = this.formatMarkdown(geminiResponse);
        const cardHtml = `
          <div class="gemini-ai-card p-3 rounded-3 border shadow-sm" style="background: #ffffff; border-left: 4px solid #2563eb !important;">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary-subtle text-primary fw-bold px-2 py-1" style="border-radius: 20px;">
                <i class="bi bi-stars me-1"></i> Respuesta Inteligente Gemini AI
              </span>
              <span class="badge bg-light text-muted border small">IESTP HERCAR</span>
            </div>
            <div class="gemini-text-content mb-3" style="font-size: 0.88rem; line-height: 1.65; color: #1e293b;">
              ${formatted}
            </div>
            <div class="interactive-button-grid">
              <button class="interactive-btn" data-chat-action="ver_todas_carreras">
                <i class="bi bi-mortarboard text-primary"></i> Ver 4 Carreras
              </button>
              <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso">
                <i class="bi bi-credit-card text-warning"></i> Matrícula y Pagos
              </button>
              <button class="interactive-btn" data-chat-action="iniciar_test_vocacional">
                <i class="bi bi-compass text-danger"></i> Test Vocacional
              </button>
            </div>
          </div>
        `;
        const geminiSpoken = this.extractSpokenAnswer(geminiResponse);
        this.appendBotMessage(cardHtml, geminiSpoken);
        this.logQuery('gemini_ai');
        return;
      }
    }

    // 23. Fallback guiado con sugerencias contextuales
    this.logUnresolved(rawQuery);
    this.renderFallback(rawQuery);
  }

  findBestFaqMatch(normQuery) {
    const customFaqs = JSON.parse(localStorage.getItem(this.storageCustomFaqs) || '[]');
    const allFaqs = [...customFaqs, ...(typeof BASE_PREGUNTAS_RESPUESTAS !== 'undefined' ? BASE_PREGUNTAS_RESPUESTAS : [])];
    const queryWords = normQuery.split(' ').filter(w => w.length > 2 && !['para', 'como', 'donde', 'cual', 'cuales', 'estos', 'esta', 'sobre', 'tener', 'hacer', 'con'].includes(w));

    let bestFaq = null;
    let highestScore = 0;

    for (const faq of allFaqs) {
      let score = 0;
      const faqTitleNorm = this.normalizeText(faq.titulo);

      if (faqTitleNorm.includes(normQuery) || normQuery.includes(faqTitleNorm)) {
        score += 60;
      }

      for (const kw of (faq.keywords || [])) {
        const kwNorm = this.normalizeText(kw);
        if (normQuery.includes(kwNorm)) {
          score += 40;
        } else {
          for (const qw of queryWords) {
            if (kwNorm.includes(qw)) score += 15;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestFaq = faq;
      }
    }

    return highestScore >= 30 ? bestFaq : null;
  }

  async queryGemini(prompt, apiKey) {
    if (!apiKey) return null;
    const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
    const preferredModel = localStorage.getItem('hercarbot_gemini_model') || 'gemini-2.0-flash';
    const models = [
      preferredModel,
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-flash-8b',
      'gemini-2.5-flash',
      'gemini-pro'
    ].filter((v, i, a) => v && v !== 'auto' && a.indexOf(v) === i);

    const systemPrompt = `
      Eres HercarBot IA, el asistente virtual oficial del Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" de Paita (Piura, Perú), fundado en 1987 (R.M. N.° 232-87-ED, más de 38 años de trayectoria institucional).
      
      DATOS INSTITUCIONALES OFICIALES:
      - Director General: Econ. Adolfo Zeta Pazo
      - Jefe Unidad Académica: Lic. Juan García Reto
      - Jefe Unidad Administrativa: CPC Edson Maza
      - Ubicación: Av. Miguel Grau – Urb. El Parque Mz. A Lt. 01, Paita Alta, Piura.
      - Horario de Atención: Lunes a Viernes de 8:00 a.m. a 3:00 p.m.
      - 4 Carreras Profesionales Técnicas 100% Gratuitas (3 años / 6 semestres / 120 créditos):
        1. Computación e Informática
        2. ANI: Administración de Negocios Internacionales (logística portuaria de Paita)
        3. Contabilidad: Tributación SUNAT, finanzas y costos empresariales
        4. DPA: Desarrollo Pesquero y Acuícola (plantas de congelado Tierra Colorada, conchas de abanico, SANIPES)
      - Portales Oficiales:
        * Pagos y Vouchers: https://pagos.ieshercar.edu.pe/
        * Sistema Académico / Matrícula: https://sistema.ieshercar.edu.pe/acceso
        * Aula Virtual: https://aula.ieshercar.edu.pe/
        * Trámites y Mesa de Partes: https://ieshercar.edu.pe/registro-tramite/
      - Matrícula y Pagos (SOLO en ventanilla del Banco de la Nación, NO se paga en Págalo.pe ni agentes):
        * Cuenta Corriente Principal BN N.° 00-638-002361 (Matrícula Semestral S/ 250.00, Examen de Suficiencia Profesional S/ 200.00, Formato/Caligrafiado Título S/ 60.00, Derecho Título S/ 100.00, Ficha Actividades Sist. Tradicional <=2008 S/ 12.00). Registrar voucher en https://pagos.ieshercar.edu.pe/ para boleta electrónica y presentar en Tesorería (en matrícula: voucher original + 3 copias de boleta en Tesorería y 1 copia sellada a Secretaría Académica).
        * Cuenta Corriente Inglés BN N.° 00-638-025736 (Curso de Inglés: sacar 2 copias al voucher y entregarlos en Tesorería).
      - Requisito de Inglés: Para obtener el Título Profesional Técnico a Nombre de la Nación, es obligatorio acreditar el nivel Básico A2 de inglés (Ley N.° 30512 del MINEDU).
      
      INSTRUCCIONES DE RESPUESTA:
      - Responde siempre en español, de forma amable, precisa, organizada y empática.
      - Si la pregunta es sobre el instituto, brinda datos oficiales específicos.
      - Usa párrafos claros, títulos y viñetas cuando sea conveniente.
    `;

    for (const model of models) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout para máxima fluidez

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nConsulta del estudiante: ${prompt}` }] }]
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            return text.trim();
          }
        }
      } catch (e) {
        // Continuar al siguiente modelo o salir limpio
      }
    }
    return null;
  }

  async queryGeminiWithImage(prompt, attachedImage, apiKey) {
    if (!apiKey || !attachedImage || !attachedImage.base64) return null;
    const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
    const preferredModel = localStorage.getItem('hercarbot_gemini_model') || 'gemini-2.0-flash';
    const models = [
      preferredModel,
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-2.5-flash'
    ].filter((v, i, a) => v && v !== 'auto' && a.indexOf(v) === i);

    const base64Clean = attachedImage.base64.replace(/^data:image\/[a-zA-Z0-9.+]+;base64,/, '');
    const mime = attachedImage.type || 'image/jpeg';

    const systemPrompt = `
      Eres HercarBot IA, el asistente inteligente oficial del Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" de Paita (Piura, Perú).
      El estudiante te ha compartido una imagen (voucher, captura, afiche TUPA, requisitos, horario, DNI, certificado o foto de pregunta) y posiblemente escribió una consulta acompañándola.
      TU MISIÓN:
      1. LEE con atención TODO el texto visible dentro de la imagen y RESPONDE DIRECTAMENTE la consulta del estudiante usando las normas oficiales 2026 del IESTP Hermanos Cárcamo.
      2. Si la imagen es un comprobante de pago o voucher del Banco de la Nación:
         - Verifica a qué cuenta corresponde: Cta. Cte. 00-638-002361 (Matrícula S/ 250, Admisión, Examen de Suficiencia, Certificados, Título y trámites TUPA) o Cta. Cte. 00-638-025736 (Curso de Inglés de Titulación, donde debe sacar 2 copias al voucher para Tesorería).
         - Advierte si detectas una cuenta antigua desactivada (serie 00-631-...) o si menciona Págalo.pe (NO se aceptan pagos por Págalo.pe ni agentes, solo ventanilla del Banco de la Nación).
         - Recuerda los pasos: registrar en https://pagos.ieshercar.edu.pe/ (generar boleta electrónica) y presentar 3 copias (o 2 copias en Inglés) en Tesorería.
      3. Si la imagen trata sobre TUPA 2026, Examen de Suficiencia Profesional, Titulación, Certificados Modulares, Admisión o alguna de las 4 carreras (Computación e Informática - ex APSTI, Administración de Negocios Internacionales, Contabilidad, Desarrollo Pesquero y Acuícola):
         - Explica claramente los requisitos visibles, costos exactos, cuenta BN correspondiente, para qué sirve el trámite y dónde presentarlo (Mesa de Partes o Coordinación Académica).
      4. Responde siempre en español claro y bien estructurado, destacando datos extraídos y próximos pasos concretos.
    `;

    for (const model of models) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 9000);

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${systemPrompt}\n\nPregunta o indicación del alumno:\n${prompt}` },
                  {
                    inlineData: {
                      mimeType: mime,
                      data: base64Clean
                    }
                  }
                ]
              }
            ]
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            return text.trim();
          }
        }
      } catch (e) {
        // Continuar al siguiente modelo
      }
    }
    return null;
  }

  loadTesseractLib() {
    if (typeof window === 'undefined') return Promise.resolve(null);
    if (window.Tesseract && typeof window.Tesseract.recognize === 'function') {
      return Promise.resolve(window.Tesseract);
    }
    if (this._tesseractPromise) return this._tesseractPromise;
    this._tesseractPromise = new Promise((resolve) => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
        script.async = true;
        const timer = setTimeout(() => resolve(null), 10000);
        script.onload = () => {
          clearTimeout(timer);
          resolve(window.Tesseract || null);
        };
        script.onerror = () => {
          clearTimeout(timer);
          resolve(null);
        };
        document.head.appendChild(script);
      } catch (e) {
        resolve(null);
      }
    });
    return this._tesseractPromise;
  }

  async extractTextFromImage(imageDataUrl) {
    if (!imageDataUrl) return '';
    try {
      const typingLabel = document.querySelector('#chat-typing-indicator small');
      if (typingLabel) {
        typingLabel.textContent = 'Leyendo texto e información de tu imagen (OCR)...';
      }
      const Tesseract = await this.loadTesseractLib();
      if (!Tesseract || typeof Tesseract.recognize !== 'function') return '';

      const ocrPromise = Tesseract.recognize(imageDataUrl, 'spa').then((res) => {
        return res && res.data && typeof res.data.text === 'string'
          ? res.data.text.replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
          : '';
      });
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(''), 14000));
      return await Promise.race([ocrPromise, timeoutPromise]);
    } catch (e) {
      return '';
    }
  }

  analyzeOfflineImageContext(ocrText = '', rawQuery = '', fileName = '') {
    const cleanOcr = (ocrText || '').trim();
    const defaultImgPrompt = 'Por favor analiza el comprobante o imagen adjunta e infórmame.';
    const rawTrimmed = (rawQuery || '').trim();
    const cleanQuery = rawTrimmed === defaultImgPrompt ? '' : rawTrimmed;
    const normQuery = this.normalizeText(cleanQuery);
    const normOcr = this.normalizeText(cleanOcr);
    const normAll = this.normalizeText(`${cleanQuery} ${cleanOcr} ${fileName || ''}`);

    const compactDigits = (cleanOcr + ' ' + cleanQuery).replace(/[\s.\-]/g, '');
    const hasMainAccount = compactDigits.includes('00638002361');
    const hasInglesAccount = compactDigits.includes('00638025736');
    const legacyPrefix = '00631' + '012948';
    const hasOldAccount = compactDigits.includes(legacyPrefix) || /\b00-631-\d{6}\b/.test(cleanOcr + ' ' + cleanQuery);
    const mentionsPagalo = normAll.includes('pagalo');

    const amounts = [];
    const amountRegex = /(?:s\/\.?|soles?)\s*(\d{1,4}(?:[.,]\d{1,2})?)/gi;
    let m;
    while ((m = amountRegex.exec(cleanOcr + ' ' + cleanQuery)) !== null) {
      const val = `S/ ${m[1]}`;
      if (!amounts.includes(val)) amounts.push(val);
      if (amounts.length >= 4) break;
    }

    // Buscar trámite TUPA coincidente en GUIA_TRAMITES_TUPA
    let matchedTramite = null;
    let bestTramiteScore = 0;
    const stopWords = new Set(['para', 'como', 'sobre', 'tupa', 'item', 'items', 'tramite', 'tramites', 'oficial', 'curso', 'pago', 'pagos']);
    if (typeof GUIA_TRAMITES_TUPA !== 'undefined' && Array.isArray(GUIA_TRAMITES_TUPA)) {
      for (const t of GUIA_TRAMITES_TUPA) {
        let score = 0;
        const rawName = (t.nombre || '').replace(/\([^)]*\)/g, ' ');
        const tCoreName = this.normalizeText(rawName).trim();
        if (tCoreName && normAll.includes(tCoreName)) score += 16;
        if (tCoreName && normQuery && normQuery.includes(tCoreName)) score += 8;

        const nameTokens = tCoreName.split(/\s+/).filter(w => w.length >= 4 && !stopWords.has(w));
        for (const tok of nameTokens) {
          if (normAll.includes(tok)) score += 4;
          if (normQuery && normQuery.includes(tok)) score += 3;
        }
        const idTokens = this.normalizeText((t.id || '').replace(/tramite-/g, '').replace(/-/g, ' ')).split(/\s+/).filter(w => w.length >= 4 && !stopWords.has(w));
        for (const tok of idTokens) {
          if (normAll.includes(tok)) score += 3;
        }
        if (score > bestTramiteScore) {
          bestTramiteScore = score;
          matchedTramite = t;
        }
      }
      if (bestTramiteScore < 6) matchedTramite = null;
    }

    // Buscar en compendio completo de 66 ítems TUPA si no hubo match fuerte en GUIA_TRAMITES_TUPA
    let matchedCompendioItem = null;
    if (!matchedTramite && typeof TUPA_COMPENDIO_OFICIAL_2026 !== 'undefined' && Array.isArray(TUPA_COMPENDIO_OFICIAL_2026.items)) {
      let bestCompScore = 0;
      for (const item of TUPA_COMPENDIO_OFICIAL_2026.items) {
        const words = this.normalizeText(item.concepto || '').split(/\s+/).filter(w => w.length >= 4 && !stopWords.has(w));
        let hits = 0;
        for (const w of words) {
          if (normAll.includes(w)) hits++;
        }
        if (hits >= 2 && hits > bestCompScore) {
          bestCompScore = hits;
          matchedCompendioItem = item;
        }
      }
    }

    // Buscar FAQ por consulta del usuario o por texto OCR leído
    let matchedFaq = null;
    if (normQuery.length >= 3) {
      matchedFaq = this.findBestFaqMatch(normQuery);
    }
    if (!matchedFaq && normOcr.length >= 8) {
      matchedFaq = this.findBestFaqMatch(normOcr);
    }

    // Buscar Carrera
    let matchedCarrera = null;
    if (typeof CARRERAS_COMPLETAS !== 'undefined' && Array.isArray(CARRERAS_COMPLETAS)) {
      matchedCarrera = CARRERAS_COMPLETAS.find((c) => {
        const cNom = this.normalizeText(c.nombre);
        const cCorto = this.normalizeText(c.nombreCorto || '');
        const cId = this.normalizeText(c.id || '');
        const extraCi = (c.id === 'apsti') && (normAll.includes('computacion e informatica') || normAll.includes('apsti') || normAll.includes('arquitectura de plataformas'));
        return extraCi || normAll.includes(cNom) || (cCorto.length >= 3 && normAll.includes(cCorto)) || (cId.length >= 3 && new RegExp(`\\b${cId}\\b`).test(normAll));
      }) || null;
    }

    const isIngles = hasInglesAccount || normAll.includes('ingles') || normAll.includes('idioma');
    const isVoucher = hasMainAccount || hasInglesAccount || hasOldAccount ||
      /\b(voucher|comprobante|banco de la nacion|operacion|secuencia|recibo|deposito|abono|pagos\.ieshercar)\b/.test(normAll);
    const isAdmision = /\b(admision|postul|inscripcion|prospecto|examen de ingreso|ordinario|exonerado)\b/.test(normAll);

    return {
      cleanOcr,
      cleanQuery,
      hasMainAccount,
      hasInglesAccount,
      hasOldAccount,
      mentionsPagalo,
      amounts,
      matchedTramite,
      matchedCompendioItem,
      matchedFaq,
      matchedCarrera,
      isIngles,
      isVoucher,
      isAdmision
    };
  }

  buildInstitutionalImageReply(attachedImage, rawQuery = '', ocrText = '') {
    const fileName = attachedImage?.name || 'imagen-adjunta';
    const ctx = this.analyzeOfflineImageContext(ocrText, rawQuery, fileName);
    const previewImg = attachedImage?.base64
      ? `<img src="${attachedImage.base64}" alt="${this.escapeHtml(fileName)}" class="ocr-thumb-preview" />`
      : '';

    const userQuestionBlock = ctx.cleanQuery
      ? `<div class="ocr-query-pill mb-2"><i class="bi bi-chat-left-text-fill text-primary me-1"></i> <strong>Tu consulta:</strong> ${this.escapeHtml(ctx.cleanQuery)}</div>`
      : '';

    const ocrExcerpt = ctx.cleanOcr.length > 340
      ? ctx.cleanOcr.slice(0, 340) + '...'
      : ctx.cleanOcr;

    const ocrStatusHtml = ctx.cleanOcr
      ? `<div class="ocr-text-box mb-3">
           <div class="ocr-text-header"><i class="bi bi-eye-fill text-success me-1"></i> Texto detectado en tu imagen</div>
           <div class="ocr-text-body">${this.escapeHtml(ocrExcerpt)}</div>
         </div>`
      : `<div class="ocr-text-box ocr-text-muted mb-3">
           <div class="ocr-text-header"><i class="bi bi-image text-info me-1"></i> Imagen recibida sin texto impreso legible</div>
           <div class="ocr-text-body">No se detectaron caracteres nítidos en la imagen (o la foto no contiene texto). ${ctx.cleanQuery ? 'Respondo según tu pregunta escrita.' : 'Si deseas, escribe tu pregunta junto a la imagen para darte una respuesta exacta.'}</div>
         </div>`;

    const alertsHtml = [];
    if (ctx.hasOldAccount) {
      alertsHtml.push(`<div class="alert alert-danger py-2 px-3 small mb-2"><i class="bi bi-exclamation-octagon-fill me-1"></i> <strong>¡Cuidado!</strong> Se detectó una cuenta bancaria antigua desactivada (serie <code>00-631-...</code>). Los depósitos vigentes son únicamente en <strong>00-638-002361</strong> (General) o <strong>00-638-025736</strong> (Inglés).</div>`);
    }
    if (ctx.mentionsPagalo) {
      alertsHtml.push(`<div class="alert alert-warning py-2 px-3 small mb-2"><i class="bi bi-exclamation-triangle-fill me-1"></i> <strong>Aviso oficial:</strong> NO se realizan pagos por <strong>Págalo.pe</strong> ni agentes. Todo abono es únicamente por ventanilla del <strong>Banco de la Nación</strong>.</div>`);
    }

    let diagnosisHtml = '';
    let spokenText = '';
    let actionButtonsHtml = '';

    if (ctx.matchedTramite) {
      const t = ctx.matchedTramite;
      const reqList = (t.requisitos || []).map(r => `<li>${this.escapeHtml(r)}</li>`).join('');
      const cuentaBN = ctx.isIngles || this.normalizeText(t.nombre).includes('ingles')
        ? '00-638-025736 (Curso de Inglés · 2 copias del voucher en Tesorería)'
        : '00-638-002361 (Cuenta Principal Banco de la Nación · ventanilla)';
      diagnosisHtml = `
        <div class="ocr-diagnosis-box p-3 rounded-3 border mb-3">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
            <span class="badge bg-primary"><i class="bi bi-journal-check me-1"></i> Trámite TUPA Identificado</span>
            <span class="badge bg-success-subtle text-success fw-bold">${this.escapeHtml(t.costo || 'Ver TUPA')}</span>
          </div>
          <h5 class="fw-bold text-primary mb-2">${this.escapeHtml(t.nombre)}</h5>
          <p class="small mb-2"><strong><i class="bi bi-lightbulb-fill text-warning me-1"></i> ¿Para qué sirve?:</strong> ${this.escapeHtml(t.paraQueSirve || t.descripcion || '')}</p>
          <p class="small mb-2"><strong><i class="bi bi-bank me-1 text-primary"></i> Cuenta Banco de la Nación:</strong> ${cuentaBN}</p>
          <p class="small mb-1"><strong><i class="bi bi-list-check me-1 text-success"></i> Requisitos oficiales (${this.escapeHtml(t.plazo || 'Trámite regular')}):</strong></p>
          <ul class="small ps-3 mb-0">${reqList}</ul>
        </div>`;
      spokenText = `He leído tu imagen sobre ${t.nombre}. ${t.paraQueSirve || ''} El costo oficial es ${t.costo || 'según TUPA'} en ventanilla del Banco de la Nación.`;
      actionButtonsHtml = `
        <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="${this.escapeHtml(t.id)}"><i class="bi bi-card-checklist text-primary"></i> Ver Ficha Completa</button>
        <button class="interactive-btn" data-chat-action="abrir_generador_fut" data-chat-val="${this.escapeHtml(t.id)}"><i class="bi bi-file-earmark-pdf-fill text-danger"></i> Generar FUT PDF</button>
        <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Cuentas BN</button>`;
    } else if (ctx.matchedCompendioItem) {
      const it = ctx.matchedCompendioItem;
      const cuentaBN = it.cuenta || (this.normalizeText(it.concepto).includes('ingles') ? '00-638-025736' : '00-638-002361');
      const costoFmt = typeof it.costo === 'number' ? `S/ ${it.costo.toFixed(2)}` : String(it.costo || 'Ver TUPA');
      diagnosisHtml = `
        <div class="ocr-diagnosis-box p-3 rounded-3 border mb-3">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
            <span class="badge bg-info text-dark"><i class="bi bi-file-earmark-text-fill me-1"></i> Ítem TUPA 2026 #${this.escapeHtml(String(it.item || it.num || ''))}</span>
            <span class="badge bg-success-subtle text-success fw-bold">${this.escapeHtml(costoFmt)}</span>
          </div>
          <h5 class="fw-bold text-primary mb-2">${this.escapeHtml(it.concepto)}</h5>
          <p class="small mb-2"><strong>¿Para qué sirve?:</strong> ${this.escapeHtml(it.paraQueSirve || 'Tasa oficial regulada en el TUPA 2026 del IESTP Hermanos Cárcamo.')}</p>
          <p class="small mb-0"><strong>Pago autorizado:</strong> Solo ventanilla del Banco de la Nación en la cuenta <strong>${this.escapeHtml(cuentaBN)}</strong> (no usar Págalo.pe ni agentes). Luego registrar boleta en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" rel="noopener">pagos.ieshercar.edu.pe</a>.</p>
        </div>`;
      spokenText = `Identifiqué en tu imagen el trámite TUPA ${it.concepto}, con tasa de ${costoFmt}. ${it.paraQueSirve || ''}`;
      actionButtonsHtml = `
        <button class="interactive-btn" data-chat-action="ver_tupa_compendio"><i class="bi bi-table text-primary"></i> Ver 66 Ítems TUPA</button>
        <button class="interactive-btn" data-chat-action="abrir_generador_fut" data-chat-val="solicitud_libre"><i class="bi bi-file-earmark-pdf-fill text-danger"></i> Generar FUT PDF</button>`;
    } else if (ctx.isIngles && !ctx.matchedFaq) {
      diagnosisHtml = `
        <div class="ocr-diagnosis-box p-3 rounded-3 border mb-3">
          <span class="badge bg-success mb-2"><i class="bi bi-translate me-1"></i> Pago Curso de Inglés (Titulación)</span>
          <h5 class="fw-bold text-primary mb-2">Indicaciones Oficiales · Curso de Inglés</h5>
          <ul class="small ps-3 mb-0">
            <li>El pago se realiza únicamente en ventanilla del <strong>Banco de la Nación</strong> en la cuenta <strong>N.º 00-638-025736</strong>.</li>
            <li><strong>No se aceptan pagos por Págalo.pe ni agentes.</strong></li>
            <li>Debes sacar <strong>2 copias a tu voucher</strong> y entregarlas físicamente en <strong>Tesorería</strong> del instituto.</li>
          </ul>
        </div>`;
      spokenText = "Para el curso de inglés, el pago es en ventanilla del Banco de la Nación a la cuenta cero cero, seis tres ocho, cero veinticinco, siete tres seis, y debes entregar dos copias de tu voucher en Tesorería.";
      actionButtonsHtml = `
        <button class="interactive-btn" data-chat-action="ver_curso_ingles"><i class="bi bi-translate text-primary"></i> Detalle Curso de Inglés</button>
        <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Guía de Pagos</button>`;
    } else if (ctx.matchedFaq) {
      diagnosisHtml = `
        <div class="ocr-diagnosis-box p-3 rounded-3 border mb-3">
          <span class="badge bg-primary mb-2"><i class="bi bi-patch-question-fill me-1"></i> Respuesta Oficial IESTP Cárcamo</span>
          <h5 class="fw-bold text-primary mb-2">${this.escapeHtml(ctx.matchedFaq.titulo)}</h5>
          <div class="small faq-custom-body">${this.formatMarkdown(ctx.matchedFaq.respuesta)}</div>
        </div>`;
      spokenText = ctx.matchedFaq.locucion
        ? this.preparePhoneticText(ctx.matchedFaq.locucion)
        : this.extractSpokenAnswer(ctx.matchedFaq.respuesta, ctx.matchedFaq.titulo);
      actionButtonsHtml = `
        <button class="interactive-btn" data-chat-action="ver_tramites_tupa"><i class="bi bi-file-earmark-text text-primary"></i> Guía TUPA 2026</button>
        <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Cuentas BN</button>`;
    } else if (ctx.matchedCarrera) {
      const c = ctx.matchedCarrera;
      diagnosisHtml = `
        <div class="ocr-diagnosis-box p-3 rounded-3 border mb-3">
          <span class="badge bg-primary mb-2"><i class="bi bi-mortarboard-fill me-1"></i> Carrera Profesional Técnica (3 años)</span>
          <h5 class="fw-bold text-primary mb-1">${this.escapeHtml(c.nombre)}</h5>
          <p class="small mb-2">${this.escapeHtml(c.resumen || c.descripcion || '')}</p>
          <p class="small mb-0"><strong>Educación pública:</strong> Sin mensualidades. Título a Nombre de la Nación con certificación modular progresiva.</p>
        </div>`;
      spokenText = `Tu consulta corresponde a la carrera técnica de ${c.nombre}, de tres años de duración y educación pública sin mensualidades.`;
      actionButtonsHtml = `
        <button class="interactive-btn" data-chat-action="ver_carrera_detalle" data-chat-val="${this.escapeHtml(c.id)}"><i class="bi bi-mortarboard text-primary"></i> Ver Perfil Completo</button>
        <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${this.escapeHtml(c.id)}"><i class="bi bi-book-half text-success"></i> Ver Malla Curricular</button>`;
    } else if (ctx.isAdmision) {
      diagnosisHtml = `
        <div class="ocr-diagnosis-box p-3 rounded-3 border mb-3">
          <span class="badge bg-success mb-2"><i class="bi bi-mortarboard-fill me-1"></i> Admisión 2026</span>
          <p class="small mb-0">En el IESTP Hermanos Cárcamo no pagas mensualidades durante los 3 años. El derecho de inscripción al examen de admisión se abona en ventanilla del Banco de la Nación en la cuenta <strong>00-638-002361</strong> (luego registrarlo en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" rel="noopener">pagos.ieshercar.edu.pe</a>).</p>
        </div>`;
      spokenText = "Sobre Admisión dos mil veintiséis: solo pagas la inscripción al examen en ventanilla del Banco de la Nación a la cuenta cero cero, seis tres ocho, cero cero, dos tres seis uno, sin mensualidades durante tus tres años de estudio.";
      actionButtonsHtml = `
        <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard text-success"></i> Ver Requisitos Admisión</button>
        <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop text-primary"></i> 4 Carreras Técnicas</button>`;
    } else if (ctx.isVoucher || ctx.hasMainAccount) {
      const detectedAmounts = ctx.amounts.length ? `<br>• Monto leído: <strong>${this.escapeHtml(ctx.amounts.join(', '))}</strong>` : '';
      diagnosisHtml = `
        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-primary d-block mb-1"><i class="bi bi-bank me-1"></i> 1. Cuentas Oficiales BN</strong>
              <span>Banco de la Nación (Solo ventanilla):<br>• Principal: <strong>00-638-002361</strong><br>• Inglés: <strong>00-638-025736</strong>${detectedAmounts}</span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-danger d-block mb-1"><i class="bi bi-cloud-arrow-up-fill me-1"></i> 2. Registro Obligatorio</strong>
              <span>Registra tu voucher en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a> y entrega <strong>3 copias</strong> en Tesorería (<strong>2 copias</strong> si es Inglés).</span>
            </div>
          </div>
        </div>`;
      spokenText = "He revisado tu comprobante adjunto. Recuerda que los pagos válidos son solo en ventanilla del Banco de la Nación en las cuentas cero cero, seis tres ocho, cero cero, dos tres seis uno o cero veinticinco, siete tres seis para inglés, y debes registrarlo en el portal de pagos.";
      actionButtonsHtml = `
        <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none"><i class="bi bi-box-arrow-up-right text-primary"></i> Portal pagos.ieshercar.edu.pe</a>
        <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Guía de Pagos BN</button>`;
    } else {
      diagnosisHtml = `
        <div class="ocr-diagnosis-box p-3 rounded-3 border mb-3">
          <h6 class="fw-bold text-primary mb-1"><i class="bi bi-robot me-1"></i> ¿Qué deseas consultar sobre esta imagen?</h6>
          <p class="small mb-0">Para analizar fotografías complejas con visión artificial avanzada además del lector OCR local, puedes escribir tu pregunta específica junto a la imagen (por ejemplo: <em>"¿Cuánto cuesta este trámite?"</em>, <em>"¿En qué cuenta pago?"</em> o <em>"Requisitos para matrícula"</em>), o configurar una API Key de Gemini en <i class="bi bi-gear"></i>.</p>
        </div>`;
      spokenText = "Recibí tu imagen. Escribe tu pregunta específica junto a la foto sobre trámites, cuentas del Banco de la Nación, admisión o carreras del instituto para darte la respuesta exacta.";
      actionButtonsHtml = `
        <button class="interactive-btn" data-chat-action="ver_tramites_tupa"><i class="bi bi-file-earmark-text text-primary"></i> Guía TUPA 2026</button>
        <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Cuentas BN</button>
        <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-success"></i> 4 Carreras</button>
        <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-person-check text-info"></i> Admisión 2026</button>`;
    }

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #2563eb;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
          <span class="badge bg-primary text-white px-3 py-1"><i class="bi bi-file-earmark-check-fill me-1"></i>Lector Inteligente de Imágenes y Consultas</span>
          <span class="badge bg-light text-dark border">IESTP HERCAR</span>
        </div>
        <div class="ocr-preview-wrap mb-3">
          ${previewImg}
          <div class="ocr-preview-meta">
            <h5 class="fw-bold mb-1 text-dark">Análisis de Imagen Adjunta</h5>
            <div class="small text-muted mb-1">Archivo: <strong>${this.escapeHtml(fileName)}</strong></div>
            ${userQuestionBlock}
          </div>
        </div>
        ${ocrStatusHtml}
        ${alertsHtml.join('')}
        ${diagnosisHtml}
        <div class="interactive-button-grid">
          ${actionButtonsHtml}
        </div>
      </div>
    `;
    return { html, spokenText };
  }

  async renderOfflineImageAnalysis(attachedImage, rawQuery) {
    const ocrText = await this.extractTextFromImage(attachedImage && attachedImage.base64 ? attachedImage.base64 : '');
    const result = this.buildInstitutionalImageReply(attachedImage, rawQuery, ocrText);
    this.appendBotMessage(result.html, result.spokenText);
  }

  /* ==========================================================================
     VISTAS INTERACTIVAS RICAS
     ========================================================================== */

  renderMatriculaPasoAPaso() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0f3380;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-card-checklist me-1"></i>Guía Oficial</span>
          <span class="badge bg-light text-dark border">Periodo 2026</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Paso a Paso de Matrícula y Pagos en el IESTP Hermanos Cárcamo</h4>
        <p class="small text-muted mb-3">La respuesta completa a: <em>¿Qué pago, cuánto es, a dónde voy y qué hago con el voucher?</em></p>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-primary fw-bold">
            <span class="badge bg-primary rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">1</span>
            <span>¿QUÉ SE PAGA Y CUÁNTO ES?</span>
          </div>
          <p class="mb-1 text-dark"><strong>¡Educación Pública sin Mensualidades!</strong> En el IESTP Hermanos Cárcamo no se pagan pensiones de enseñanza ni mensualidades.</p>
          <p class="mb-0 text-muted">El derecho de <strong>Matrícula Semestral es de S/. 250.00</strong> (alumnos regulares).</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-warning fw-bold" style="color:#d97706 !important;">
            <span class="badge bg-warning text-dark rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">2</span>
            <span>¿DÓNDE PAGO? (SOLO VENTANILLA DEL BANCO DE LA NACIÓN)</span>
          </div>
          <p class="mb-1"><strong>Cuenta Corriente Principal (Matrícula y Trámites):</strong> <code class="fs-6 px-2 py-1 bg-white border rounded">00-638-002361</code></p>
          <p class="mb-1"><strong>Cuenta Específica Curso de Inglés:</strong> <code class="fs-6 px-2 py-1 bg-white border rounded">00-638-025736</code> <small class="text-muted">(sacar 2 copias al voucher para Tesorería)</small></p>
          <p class="mb-0 text-danger fw-semibold"><i class="bi bi-exclamation-octagon-fill me-1"></i> ¡Importante! No se realizan pagos en Págalo.pe ni en agentes. Acércate presencialmente a ventanilla del Banco de la Nación dando el DNI y nombres completos del estudiante (incluso si paga otra persona).</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-danger fw-bold">
            <span class="badge bg-danger rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">3</span>
            <span>¿QUÉ HAGO INMEDIATAMENTE DESPUÉS DE PAGAR?</span>
          </div>
          <p class="mb-0 text-muted">Conserva el voucher original en físico y registra los datos en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a> para generar tu <strong>boleta electrónica</strong>.</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-success fw-bold">
            <span class="badge bg-success rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">4</span>
            <span>¿A DÓNDE VOY? (TESORERÍA Y SECRETARÍA ACADÉMICA)</span>
          </div>
          <ul class="mb-0 ps-3 text-muted">
            <li><strong>Tesorería (Av. Miguel Grau . Urb. El Parque - Mz. A - Lote 01 - Paita, Lun-Vie 8:00 a.m. - 3:00 p.m.):</strong> Presenta el voucher original y <strong>3 copias de la boleta electrónica</strong> para que las sellen.</li>
            <li><strong>Secretaría Académica:</strong> Entrega <strong>1 copia sellada y firmada</strong> para validar formalmente tu matrícula.</li>
          </ul>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-info fw-bold">
            <span class="badge bg-info text-dark rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">5</span>
            <span>¿CÓMO SÉ QUE YA ESTOY MATRICULADO?</span>
          </div>
          <p class="mb-0 text-muted">Con la copia sellada y registrada en Secretaría Académica, se emite tu <strong>Ficha de Matrícula Oficial</strong> y se habilitan tus accesos al <a href="https://sistema.ieshercar.edu.pe/acceso" target="_blank">Sistema Académico</a> y <a href="https://aula.ieshercar.edu.pe/" target="_blank">Aula Virtual</a>.</p>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn" style="text-decoration:none;"><i class="bi bi-box-arrow-up-right text-warning"></i> Ir a pagos.ieshercar.edu.pe</a>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles"><i class="bi bi-translate text-primary"></i> Curso de Inglés (00-638-025736)</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt text-danger"></i> Dónde queda el Instituto</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! Con gusto te explico el proceso oficial de matrícula: realizas el pago de doscientos cincuenta soles en ventanilla del Banco de la Nación a la cuenta cero cero, seis tres ocho, cero cero, dos tres seis uno, recuerda que no se paga en Págalo punto pe ni en agentes. Luego generas tu boleta electrónica en pagos punto i e s hercar punto edu punto pe, llevas tres copias a Tesorería y entregas una copia sellada en Secretaría Académica.", [
      { label: "🧾 ¿Qué hago con el voucher?", prompt: "¿Qué hago después de pagar en el Banco de la Nación?" },
      { label: "🌐 Curso de Inglés", prompt: "¿Cómo es el curso de inglés para titularme?" },
      { label: "📍 Ubicación y Horarios", prompt: "¿Dónde queda el instituto y cuál es el horario?" }
    ]);
  }

  renderAutoridades() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0e2d6c;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-shield-check me-1"></i>Plana Directiva</span>
          <span class="badge bg-light text-dark border">Paita, Piura</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Autoridades Institucionales — IESTP Hermanos Cárcamo</h4>
        <p class="small text-muted mb-3">Equipo directivo, académico y de coordinación responsable de la formación profesional tecnológica:</p>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-person-badge-fill me-1"></i> Dirección General</h6>
              <p class="mb-0 text-muted">Gestión integral, representación legal y liderazgo institucional del IESTP ante el MINEDU y DREP Piura.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-mortarboard-fill me-1"></i> Unidad Académica</h6>
              <p class="mb-0 text-muted">Planificación académica, supervisión curricular, horarios, prácticas EFSRT y convalidaciones.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-warning mb-1"><i class="bi bi-card-text me-1"></i> Secretaría General</h6>
              <p class="mb-0 text-muted">Matrículas oficiales, emisión de certificados modulares, actas de notas y trámite de titulación.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-info mb-1"><i class="bi bi-bank2 me-1"></i> Tesorería y Caja</h6>
              <p class="mb-0 text-muted">Recepción y validación de depósitos del Banco de la Nación en pagos.ieshercar.edu.pe.</p>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-diagram-3-fill text-primary me-1"></i> Coordinaciones de Carrera:</h6>
          <div class="d-flex flex-wrap gap-2 mt-2">
            <span class="badge bg-primary-subtle text-primary p-2"><i class="bi bi-laptop me-1"></i> Coord. Computación e Informática</span>
            <span class="badge bg-success-subtle text-success p-2"><i class="bi bi-globe me-1"></i> Coord. Negocios (ANI)</span>
            <span class="badge bg-purple-subtle text-purple p-2" style="background:#f3e8ff; color:#7e22ce;"><i class="bi bi-calculator me-1"></i> Coord. Contabilidad</span>
            <span class="badge bg-info-subtle text-info p-2"><i class="bi bi-water me-1"></i> Coord. Pesquería (DPA)</span>
          </div>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_plana_docente"><i class="bi bi-people-fill text-success"></i> Plana Docente (20 Profesores)</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Horarios de Atención</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> 4 Carreras Técnicas</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! Qué gusto saludarte. Con todo cariño te cuento que nuestra institución está dirigida por la Dirección General junto a la Unidad Académica y Secretaría General. Fue creada por Resolución Ministerial doscientos treinta y dos y revalidada con Resolución quinientos veintiocho. En tu pantalla puedes conocer a todo nuestro equipo directivo con calma.", [
      { label: "👨‍🏫 Plana Docente Completa", prompt: "¿Quiénes son los profesores del instituto?" },
      { label: "📍 Horarios y Ubicación", prompt: "¿Dónde queda el instituto y cuál es el horario de atención?" },
      { label: "💻 Computación e Informática", prompt: "¿Qué cursos se llevan en Computación e Informática?" }
    ]);
  }

  renderPlanaDocente(filtroCarrera = null) {
    const docentes = (typeof PLANA_DOCENTE_OFICIAL !== 'undefined' ? PLANA_DOCENTE_OFICIAL : []);
    const carreras = [
      { id: 'todas', label: 'Todas las Carreras' },
      { id: 'apsti', label: '💻 Computación e Informática' },
      { id: 'ani', label: '🌐 Negocios (ANI)' },
      { id: 'conta', label: '📊 Contabilidad' },
      { id: 'dpa', label: '🐟 Pesquería (DPA)' }
    ];

    const currentFilter = (filtroCarrera && filtroCarrera !== 'todas') ? filtroCarrera.toLowerCase() : 'todas';
    const listaFiltrada = currentFilter === 'todas'
      ? docentes
      : docentes.filter(d => d.carreraId.toLowerCase() === currentFilter);

    const filterBtns = carreras.map(c => {
      const activeClass = (c.id === currentFilter) ? 'btn-primary active' : 'btn-outline-primary';
      return `<button class="btn btn-sm ${activeClass} rounded-pill px-3 py-1" data-chat-action="ver_plana_docente" data-chat-val="${c.id}" style="font-size:0.75rem;">${c.label}</button>`;
    }).join(' ');

    const cardsHtml = listaFiltrada.map(d => `
      <div class="col-12 col-md-6">
        <div class="p-3 bg-white rounded-3 border shadow-sm h-100 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-start mb-1">
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-0" style="font-size:0.68rem;">${d.carrera}</span>
              ${d.cvPublicado ? '<span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-0" style="font-size:0.66rem;"><i class="bi bi-file-earmark-pdf me-1"></i>CV Publicado</span>' : ''}
            </div>
            <h6 class="fw-bold text-dark mb-1" style="font-size:0.92rem;"><i class="bi bi-person-fill text-primary me-1"></i>${d.nombre}</h6>
            <p class="text-muted small mb-2" style="font-size:0.78rem; line-height:1.4;">${d.perfil}</p>
          </div>
          <div class="pt-2 border-top d-flex justify-content-between align-items-center">
            <small class="text-muted" style="font-size:0.7rem;"><i class="bi bi-mortarboard me-1"></i>Docente Titular IESTP</small>
            <a href="https://ieshercar.edu.pe/Nosotros/Estructura_Organizativa/Plana-Docente/" target="_blank" class="small text-primary text-decoration-none fw-semibold" style="font-size:0.72rem;">Ver en portal ↗</a>
          </div>
        </div>
      </div>
    `).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0e2d6c;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-people-fill me-1"></i>Plana Docente Oficial</span>
          <span class="badge bg-light text-dark border">20 Docentes · 4 Carreras</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Plana Docente Oficial — IESTP Hermanos Cárcamo</h4>
        <p class="small text-muted mb-3">Docentes altamente capacitados y titulados publicados en el portal oficial <strong>ieshercar.edu.pe</strong>:</p>

        <div class="d-flex flex-wrap gap-1 mb-3">
          ${filterBtns}
        </div>

        <div class="row g-2 mb-3">
          ${cardsHtml}
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-shield-check text-success fs-5"></i>
            <div>
              <strong>Calidad Educativa Garantizada:</strong> Nuestros docentes cuentan con grado profesional, experiencia demostrada en el sector productivo de Paita y formación pedagógica continua según los lineamientos del MINEDU.
            </div>
          </div>
        </div>

        <div class="interactive-button-grid">
          <a href="https://ieshercar.edu.pe/Nosotros/Estructura_Organizativa/Plana-Docente/" target="_blank" class="interactive-btn text-decoration-none"><i class="bi bi-box-arrow-up-right text-primary"></i> Ver en ieshercar.edu.pe</a>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-success"></i> 4 Carreras Técnicas</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt text-danger"></i> Contacto y Horarios</button>
        </div>
      </div>
    `;

    const locucionTexto = "¡Hola! Con mucho cariño te cuento que el Instituto Hermanos Cárcamo cuenta con una plana docente oficial de veinte docentes titulados y especializados. En tu pantalla puedes ver a todos los profesores y filtrar por carrera con toda tranquilidad.";

    this.appendBotMessage(html, locucionTexto, [
      { label: "💻 Docentes Computación", prompt: "¿Quiénes son los profesores de Computación e Informática?" },
      { label: "🌐 Docentes Negocios", prompt: "¿Quiénes son los profesores de Negocios Internacionales?" },
      { label: "📊 Docentes Contabilidad", prompt: "¿Quiénes son los profesores de Contabilidad?" },
      { label: "🐟 Docentes Pesquería", prompt: "¿Quiénes son los profesores de Desarrollo Pesquero?" }
    ]);
  }

  renderModulosFormativos(carreraId = null) {
    const dataCarreras = (typeof CARRERAS_COMPLETAS !== 'undefined' ? CARRERAS_COMPLETAS : []);
    const carrera = dataCarreras.find(c => c.id === carreraId) || dataCarreras[0];

    const modulosHtml = carrera.modulos.map((m, idx) => `
      <div class="p-3 bg-white rounded-3 border mb-2 shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="badge bg-primary-subtle text-primary fw-bold" style="font-size:0.75rem;">Módulo ${idx + 1}</span>
          <span class="badge bg-success-subtle text-success small"><i class="bi bi-award-fill me-1"></i>Certificación Progresiva</span>
        </div>
        <h6 class="fw-bold text-dark mb-1">${m.modulo}</h6>
        <p class="small text-muted mb-2"><i class="bi bi-check-circle-fill text-success me-1"></i>${m.certificacion}</p>
        <div class="small text-muted">
          ${m.semestres.map(s => `<div><strong>${s.ciclo}:</strong> ${s.cursos.slice(0, 4).join(', ')}...</div>`).join('')}
        </div>
      </div>
    `).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0284c7;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-info text-dark px-3 py-1"><i class="bi bi-layers-fill me-1"></i>Formación Modular</span>
          <span class="badge bg-light text-dark border">${carrera.codigo}</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Módulos Formativos y Certificación Progresiva</h4>
        <p class="small text-muted mb-3">En el IESTP Hermanos Cárcamo obtienes un <strong>Certificado Modular Oficial</strong> al culminar cada año de estudios para que puedas trabajar antes de graduarte:</p>

        <div class="d-flex flex-wrap gap-1 mb-3">
          ${dataCarreras.map(c => `
            <button class="btn btn-sm ${c.id === carrera.id ? 'btn-primary active' : 'btn-outline-primary'} rounded-pill px-3 py-1" data-chat-action="ver_modulos_carrera" data-chat-val="${c.id}" style="font-size:0.75rem;">
              ${c.codigo}
            </button>
          `).join(' ')}
        </div>

        ${modulosHtml}

        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${carrera.id}"><i class="bi bi-diagram-3 text-primary"></i> Malla Curricular Completa</button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard-fill text-success"></i> Cómo Postular</button>
        </div>
      </div>
    `;

    const locucionTexto = `¡Hola! Con mucho gusto te cuento que en el Instituto Hermanos Cárcamo la carrera de ${carrera.nombre} se divide en tres módulos formativos con certificación progresiva anual. En tu pantalla te comparto los módulos y certificados que obtendrás.`;

    this.appendBotMessage(html, locucionTexto, [
      { label: `💻 Módulos Computación`, prompt: "Ver módulos de Computación e Informática" },
      { label: `🌐 Módulos Negocios`, prompt: "Ver módulos de Negocios Internacionales" },
      { label: `📊 Módulos Contabilidad`, prompt: "Ver módulos de Contabilidad" },
      { label: `🐟 Módulos Pesquería`, prompt: "Ver módulos de Desarrollo Pesquero" }
    ]);
  }

  renderComiteDefensaEstudiante() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #10b981;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-success px-3 py-1"><i class="bi bi-shield-heart me-1"></i>Protección & Bienestar</span>
          <span class="badge bg-light text-dark border">RD N° 046-2021</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Comité de Defensa del Estudiante (CODE)</h4>
        <p class="small text-muted mb-3">Órgano institucional oficial para garantizar un entorno seguro, inclusivo, respetuoso y libre de hostigamiento:</p>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-check-circle-fill me-1"></i> Garantías al Estudiante</h6>
              <p class="mb-0 text-muted">Acompañamiento integral, confidencialidad absoluta, respeto irrestricto y no discriminación por ninguna índole.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-file-earmark-text me-1"></i> Canal de Quejas y Denuncias</h6>
              <p class="mb-0 text-muted">Recepción formal del Formulario de Queja o Denuncia y resolución con apego a las normas del MINEDU.</p>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-geo-alt-fill text-danger me-1"></i> Atención y Contacto del CODE:</h6>
          <p class="mb-1 text-muted">Oficina de Bienestar y Empleabilidad · Campus Av. Grau Mz. A Lt. 001 - Urb. El Parque, Paita.</p>
          <p class="mb-0 text-muted"><strong>Correo institucional:</strong> <a href="mailto:ieshercar@ieshercar.edu.pe">ieshercar@ieshercar.edu.pe</a> · Teléfono: (073) 251013</p>
        </div>

        <div class="interactive-button-grid">
          <a href="https://ieshercar.edu.pe/Informacion_Academica/Bienestar_Empleabilidad/" target="_blank" class="interactive-btn text-decoration-none"><i class="bi bi-box-arrow-up-right text-success"></i> Ver en portal oficial</a>
          <button class="interactive-btn" data-chat-action="ver_bienestar"><i class="bi bi-heart-pulse text-danger"></i> Tópico & Seguro SIS</button>
          <button class="interactive-btn" data-chat-action="abrir_generador_fut"><i class="bi bi-file-earmark-plus text-primary"></i> Trámite FUT</button>
        </div>
      </div>
    `;

    const locucionTexto = "¡Hola! Con mucho gusto te informo que en el Instituto Hermanos Cárcamo contamos con el Comité de Defensa del Estudiante, respaldado por resolución directoral cero cuarenta y seis. Está para cuidarte, apoyarte y brindarte un espacio seguro en tus estudios. En tu pantalla tienes todos los detalles.";

    this.appendBotMessage(html, locucionTexto, [
      { label: "🏥 Seguro SIS Gratuito", prompt: "¿Cómo me afilio al seguro SIS en el instituto?" },
      { label: "📜 Trámites y FUT", prompt: "¿Cómo presento una solicitud con el FUT?" }
    ]);
  }

  renderHistoriaMision() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #f59e0b;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-warning text-dark px-3 py-1"><i class="bi bi-award-fill me-1"></i>Identidad Institucional</span>
          <span class="badge bg-light text-dark border">Paita</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">IESTP "Hermanos Cárcamo" de Paita</h4>
        <p class="small text-muted mb-3"><em>"Formando Profesionales y Construyendo Oportunidades"</em></p>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-primary mb-1"><i class="bi bi-flag-fill me-1"></i> Origen del Nombre:</h6>
          <p class="mb-0">El instituto rinde homenaje a los ilustres hermanos marinos y próceres paiteños de la familia Cárcamo, símbolos de valor patriótico, tradición heroica y vocación marítima de la provincia de Paita.</p>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border small h-100">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-bullseye me-1"></i> Misión</h6>
              <p class="mb-0 text-muted">Formar profesionales técnicos líderes, éticos e innovadores, preparados para impulsar el desarrollo pesquero, portuario, contable y tecnológico de Paita y el Perú.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border small h-100">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-eye-fill me-1"></i> Visión</h6>
              <p class="mb-0 text-muted">Ser la institución de educación superior tecnológica pública líder del norte peruano, acreditada por su calidad educativa y alta tasa de inserción laboral.</p>
            </div>
          </div>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-gem text-warning me-1"></i> Valores Institucionales:</h6>
          <span class="badge bg-white text-dark border me-1">Honestidad</span>
          <span class="badge bg-white text-dark border me-1">Respeto</span>
          <span class="badge bg-white text-dark border me-1">Responsabilidad Social</span>
          <span class="badge bg-white text-dark border me-1">Trabajo en Equipo</span>
          <span class="badge bg-white text-dark border">Compromiso Ambiental</span>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop text-primary"></i> 4 Carreras Técnicas</button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard-fill text-success"></i> Admisión 2026</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! Con más de treinta y ocho años formando profesionales técnicos en Paita, el Instituto Hermanos Cárcamo tiene como misión brindar educación pública de calidad y alta empleabilidad. ¡En tu pantalla te comparto nuestra historia!", [
      { label: "🏛️ Autoridades", prompt: "¿Quiénes son las autoridades del instituto?" },
      { label: "💻 Computación e Informática", prompt: "¿Qué se aprende en Computación e Informática?" }
    ]);
  }

  renderTurnosHorarios() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #10b981;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-success px-3 py-1"><i class="bi bi-clock-fill me-1"></i>Horarios Académicos</span>
          <span class="badge bg-light text-dark border">Periodo 2026</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Turnos y Horarios de Clases</h4>
        <p class="small text-muted mb-3">Distribución horaria oficial para las 4 carreras técnicas:</p>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-sun-fill text-warning me-1"></i> Turno Diurno (Mañana)</h6>
              <p class="mb-1"><strong>Horario:</strong> 8:00 a.m. a 1:15 p.m.</p>
              <p class="mb-0 text-muted">Lunes a Viernes para estudiantes regulares de Computación e Informática, Administración de Negocios Internacionales, Contabilidad y Desarrollo Pesquero y Acuícola.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-cloud-sun-fill text-info me-1"></i> Talleres y Laboratorios</h6>
              <p class="mb-1"><strong>Horario:</strong> Según programación modular</p>
              <p class="mb-0 text-muted">Prácticas en centros de cómputo, laboratorio de redes Cisco y plantas piloto pesqueras.</p>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <strong><i class="bi bi-info-circle-fill text-primary me-1"></i> Modalidad:</strong> Clases 100% presenciales con acompañamiento digital mediante el <a href="https://aula.ieshercar.edu.pe/" target="_blank">Aula Virtual Institucional</a>.
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Horarios de Secretaría y Caja</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop text-primary"></i> Ver Carreras</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! Nuestras clases se imparten en el turno mañana, de lunes a viernes, desde las ocho de la mañana hasta la una y quince de la tarde. En tu pantalla puedes ver los horarios detallados.", [
      { label: "📍 ¿Dónde queda?", prompt: "¿Dónde queda el instituto?" },
      { label: "💰 ¿Cuánto cuesta?", prompt: "¿Es 100% gratuito?" }
    ]);
  }

  renderReglamento() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #ef4444;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-danger px-3 py-1"><i class="bi bi-journal-check me-1"></i>Reglamento MINEDU</span>
          <span class="badge bg-light text-dark border">Evaluación y Calificaciones</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Reglamento Académico: Desaprobación y Calificaciones</h4>
        <p class="small text-muted mb-3">Normas oficiales vigentes para la aprobación y promoción semestral:</p>

        <div class="alert alert-light border small mb-3">
          <strong><i class="bi bi-check-circle-fill text-success me-1"></i> Nota Mínima Aprobatoria:</strong> <span class="badge bg-success fs-7">13 (Trece)</span> en escala vigesimal (0 a 20). Toda fracción de 0.5 o más se redondea a favor del alumno.
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-danger mb-1"><i class="bi bi-exclamation-triangle-fill text-danger me-1"></i> ¿Qué pasa si desapruebo cursos?</h6>
          <ul class="mb-0 ps-3">
            <li><strong>Hasta 2 cursos a cargo:</strong> Puedes ratificar matrícula y avanzar al siguiente semestre académico llevando los cursos pendientes.</li>
            <li><strong>3 o más cursos desaprobados:</strong> No puedes avanzar de ciclo. Deberás repetir únicamente las unidades didácticas desaprobadas en el siguiente semestre.</li>
            <li><strong>Semana de Recuperación:</strong> Si tu promedio está entre 10 y 12, tienes derecho a una evaluación de subsanación antes del cierre de actas.</li>
          </ul>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <strong><i class="bi bi-clock-history text-warning me-1"></i> Límite de Inasistencias:</strong> El 30% de inasistencias injustificadas inhabilita automáticamente al estudiante en la unidad didáctica (DPI).
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="tramite-matricula"><i class="bi bi-file-earmark-text text-primary"></i> Trámite de Matrícula</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-headset text-success"></i> Consultar a Secretaría</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! La escala de notas es vigesimal y apruebas con trece. Si tienes entre diez y doce accedes al examen de recuperación antes de cerrar el semestre. ¡En tu pantalla tienes el reglamento completo!", [
      { label: "📝 Matrícula regular", prompt: "¿Cómo se hace la matrícula?" },
      { label: "💳 Pagos Banco de la Nación", prompt: "¿Cómo pago en el Banco de la Nación?" }
    ]);
  }

  renderConvalidaciones() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #8b5cf6;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-purple text-white px-3 py-1" style="background:#8b5cf6;"><i class="bi bi-arrow-left-right me-1"></i>Traslados y Convalidación</span>
          <span class="badge bg-light text-dark border">Mesa de Partes</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Convalidación de Cursos y Traslados</h4>
        <p class="small text-muted mb-3">Requisitos para alumnos provenientes de otras instituciones o que soliciten cambio de programa:</p>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-primary mb-1"><i class="bi bi-file-earmark-arrow-up-fill me-1"></i> Traslado Externo (De otra Universidad o Instituto):</h6>
          <ol class="mb-0 ps-3">
            <li>Certificado oficial de estudios visado por la DRE / UGEL o universidad de origen.</li>
            <li>Sílabos oficiales visados de los cursos a convalidar (mínimo 75% de coincidencia de contenidos).</li>
            <li>FUT dirigido al Director General solicitando convalidación.</li>
            <li>Voucher de pago por derecho de convalidación registrado en pagos.ieshercar.edu.pe.</li>
          </ol>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <h6 class="fw-bold text-success mb-1"><i class="bi bi-shuffle me-1"></i> Traslado Interno:</h6>
          <p class="mb-0 text-muted">Permite cambiarte entre las carreras del IESTP Hermanos Cárcamo (ej. de Contabilidad a Computación e Informática). Se solicita antes del inicio del ciclo académico y está sujeto a vacantes disponibles.</p>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> ¿Cómo Pagar la Tasa?</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Horarios de Mesa de Partes</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! Si vienes de otra universidad o instituto técnico, puedes convalidar tus cursos aprobados presentando tu certificado oficial de estudios en secretaría. ¡En tu pantalla tienes los requisitos!", [
      { label: "📜 Trámites y TUPA", prompt: "¿Cuáles son los trámites académicos?" },
      { label: "💳 Pagos BN", prompt: "¿Cómo registrar mi voucher?" }
    ]);
  }

  renderBienestar() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #06b6d4;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-info text-dark px-3 py-1"><i class="bi bi-heart-pulse-fill me-1"></i>Bienestar y Salud</span>
          <span class="badge bg-light text-dark border">Servicios al Alumno</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Bienestar Estudiantil, Seguro SIS y Salud</h4>
        <p class="small text-muted mb-3">Beneficios asistenciales, médicos y recreativos para toda la comunidad de estudiantes:</p>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-shield-plus me-1"></i> Seguro SIS Gratuito</h6>
              <p class="mb-0 text-muted">Todos los alumnos matriculados tienen derecho a afiliación y atención médica integral gratuita a través del Seguro Integral de Salud (SIS).</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-danger mb-1"><i class="bi bi-hospital me-1"></i> Tópico de Primeros Auxilios</h6>
              <p class="mb-0 text-muted">Atención inmediata para emergencias y malestares dentro del campus institucional durante el turno de clases.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-trophy-fill me-1"></i> Deportes y Cultura</h6>
              <p class="mb-0 text-muted">Olimpiadas intercarreras, equipos de fútbol, vóley y elenco de danzas para aniversarios de Paita.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-warning mb-1"><i class="bi bi-award-fill me-1"></i> Becas Pronabec</h6>
              <p class="mb-0 text-muted">Orientación para postulaciones a Beca 18, Beca Continuidad y Beca Permanencia del Estado.</p>
            </div>
          </div>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Sede Paita</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop text-primary"></i> Carreras Técnicas</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! En bienestar estudiantil cuentas con afiliación gratuita al SIS, tópico médico de primeros auxilios, tutoría psicopedagógica y actividades deportivas. ¡Revisa todos los beneficios en tu pantalla!", [
      { label: "🌟 Becas PRONABEC", prompt: "¿Qué becas hay disponibles?" },
      { label: "🚌 Carné de medio pasaje", prompt: "¿Cómo tramitar el carné de medio pasaje?" }
    ]);
  }

  /* ==========================================================================
     NUEVOS MÉTODOS INSTITUCIONALES AVANZADOS (INVESTIGACIÓN Y UTILIDADES)
     ========================================================================== */

  /**
   * Calculadora interactiva de inasistencias y límite de DPI (30% de faltas)
   */
  renderCalculadoraDpi(horasSemanales = 4) {
    const hrs = parseInt(horasSemanales, 10) || 4;
    const semanas = 18; // Semestre lectivo oficial MINEDU
    const totalHoras = hrs * semanas;
    const limiteHoras = Math.floor(totalHoras * 0.30);
    const sesionesPermitidas = Math.floor(limiteHoras / hrs);

    const opcionesHoras = [2, 3, 4, 5, 6, 8];
    const botonesHoras = opcionesHoras.map(h => `
      <button class="interactive-btn ${h === hrs ? 'active' : ''}" 
              data-chat-action="calcular_dpi_horas" 
              data-chat-val="${h}"
              style="${h === hrs ? 'background: #0f3380 !important; color: #ffffff !important; border-color: #0f3380 !important;' : ''}">
        <i class="bi bi-clock${h === hrs ? '-fill' : ''}"></i> ${h} hrs/sem
      </button>
    `).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #ef4444;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-danger px-3 py-1"><i class="bi bi-calculator me-1"></i>Calculadora Académica</span>
          <span class="badge bg-light text-dark border">Regla del 30% MINEDU</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Calculadora de Faltas y Límite de DPI (Desaprobación)</h4>
        <p class="small text-muted mb-3">Calcula cuántas faltas puedes tener en tu unidad didáctica antes de quedar inhabilitado por inasistencias:</p>

        <!-- Selector de horas semanales -->
        <div class="p-3 bg-light rounded-3 border mb-3">
          <label class="form-label small fw-bold text-dark mb-2">
            <i class="bi bi-sliders me-1 text-primary"></i> Selecciona cuántas horas tiene tu curso por semana:
          </label>
          <div class="interactive-button-grid" style="grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));">
            ${botonesHoras}
          </div>
        </div>

        <!-- Resultado del cálculo -->
        <div class="p-3 rounded-3 border mb-3" style="background: #fff5f5; border-color: #fecaca !important;">
          <div class="d-flex align-items-center gap-3 mb-2">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0;">
              <i class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div>
              <h6 class="fw-bold text-danger mb-0">Para un curso de ${hrs} horas semanales:</h6>
              <small class="text-muted">Total en 18 semanas de semestre: <strong>${totalHoras} horas académicas</strong></small>
            </div>
          </div>
          <hr style="margin: 8px 0; opacity: 0.15;">
          <div class="row g-2 text-center mt-1">
            <div class="col-6">
              <div class="p-2 bg-white rounded border">
                <span class="d-block small text-muted">Límite 30% en horas:</span>
                <span class="fs-5 fw-bold text-danger">${limiteHoras} hrs</span>
              </div>
            </div>
            <div class="col-6">
              <div class="p-2 bg-white rounded border">
                <span class="d-block small text-muted">Máx. clases a faltar:</span>
                <span class="fs-5 fw-bold text-danger">${sesionesPermitidas} clases</span>
              </div>
            </div>
          </div>
          <p class="small text-danger fw-semibold mt-2 mb-0">
            ⚠️ Si acumulas <strong>${limiteHoras + 1} horas</strong> de inasistencias injustificadas, el sistema te califica automáticamente con <strong>DPI (Desaprobado por Inasistencias)</strong> y no podrás rendir evaluación final.
          </p>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <h6 class="fw-bold text-primary mb-1"><i class="bi bi-shield-check me-1"></i> ¿Cómo evitar el DPI?</h6>
          <p class="mb-0 text-muted">
            Si tuviste que faltar por motivos de salud o trabajo, presenta tu justificación con certificado médico o laboral en Secretaría dentro de los <strong>5 días hábiles</strong> siguientes a la falta.
          </p>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_justificar_faltas">
            <i class="bi bi-file-earmark-medical-fill text-success"></i> ¿Cómo Justificar Faltas?
          </button>
          <button class="interactive-btn" data-chat-action="ver_reglamento">
            <i class="bi bi-journal-text text-primary"></i> Reglamento de Notas
          </button>
          <button class="interactive-btn" data-chat-action="ver_turnos_horarios">
            <i class="bi bi-clock-history text-warning"></i> Horarios de Clases
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, `Para un curso de ${hrs} horas semanales, el límite máximo permitido es de ${limiteHoras} horas de inasistencias antes de quedar inhabilitado por DPI.`, [
      { label: "📝 ¿Cómo justificar faltas?", prompt: "¿Cómo justifico una inasistencia médica o laboral?" },
      { label: "📊 Reglamento de notas", prompt: "¿Qué pasa si jalo un curso?" }
    ]);
  }

  /**
   * Comparador interactivo de las 4 Carreras Profesionales Técnicas
   */
  renderComparadorCarreras() {
    const carreras = (typeof DATOS_COMPARATIVOS_CARRERAS !== 'undefined')
      ? DATOS_COMPARATIVOS_CARRERAS
      : [];

    const cardsHtml = carreras.map(c => `
      <div class="col-md-6 mb-3">
        <div class="p-3 rounded-3 border h-100 shadow-sm" style="background: #ffffff; border-top: 4px solid ${c.color} !important;">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <div class="d-flex align-items-center gap-2">
              <span class="badge" style="background: ${c.color}; color: #ffffff; font-size: 0.82rem; padding: 5px 9px;">${c.codigo}</span>
              <h6 class="fw-bold text-dark mb-0" style="font-size: 0.88rem;">${c.nombre}</h6>
            </div>
          </div>
          <p class="small text-muted mb-2" style="line-height: 1.45;">${c.perfilClave}</p>
          
          <div class="p-2 rounded border mb-2 small" style="background: ${c.colorBg};">
            <strong style="color: ${c.color};"><i class="bi bi-cash-stack me-1"></i> Ingreso estimado:</strong>
            <span class="d-block text-dark fw-bold mt-1">${c.sueldoPromedio}</span>
          </div>

          <div class="small mb-2">
            <strong class="text-secondary"><i class="bi bi-building me-1"></i> Campo en Paita:</strong>
            <p class="text-muted mb-1" style="font-size: 0.76rem;">${c.campoLaboralPaita}</p>
          </div>

          <div class="small mb-3">
            <strong class="text-secondary"><i class="bi bi-mortarboard me-1"></i> Convalidación universitaria:</strong>
            <p class="text-muted mb-0" style="font-size: 0.76rem;">${c.convalidacionUniversitaria}</p>
          </div>

          <button class="btn btn-sm w-100 rounded-pill fw-bold text-white" 
                  style="background: ${c.color}; font-size: 0.78rem;" 
                  data-chat-action="ver_carrera_detalle" 
                  data-chat-val="${c.id}">
            <i class="bi bi-search me-1"></i> Ver Malla y Detalle de ${c.codigo}
          </button>
        </div>
      </div>
    `).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0f3380;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-columns-gap me-1"></i>Comparador Institucional</span>
          <span class="badge bg-light text-dark border">Educación 100% Gratuita</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Comparativa de las 4 Carreras Profesionales Técnicas</h4>
        <p class="small text-muted mb-3">
          Compara perfil, salarios promedio en Paita, demanda laboral y convalidación universitaria para tomar la mejor decisión:
        </p>

        <div class="row g-2 mb-3">
          ${cardsHtml}
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-patch-check-fill text-success me-1"></i> Aspectos Comunes a Todas las Carreras:</h6>
          <ul class="mb-0 ps-3 text-muted">
            <li><strong>Duración:</strong> 3 años académicos (6 semestres / 120 créditos).</li>
            <li><strong>Costo:</strong> Cero mensualidades (Instituto Público dependiente del MINEDU).</li>
            <li><strong>Certificación Modular:</strong> Recibes un diploma oficial por cada año culminado.</li>
            <li><strong>Título:</strong> A Nombre de la Nación con valor legal para trabajar en el sector público o privado.</li>
          </ul>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional">
            <i class="bi bi-compass-fill text-danger"></i> ¿Dudas? Haz el Test Vocacional
          </button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa">
            <i class="bi bi-person-plus-fill text-success"></i> Requisitos de Postulación
          </button>
          <button class="interactive-btn" data-chat-action="ver_bolsa_trabajo">
            <i class="bi bi-briefcase-fill text-warning"></i> Convenios Laborales en Paita
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Aquí tienes la comparativa completa de las 4 carreras técnicas del instituto con perfiles, salarios y campo laboral en Paita.", [
      { label: "🧠 Test Vocacional", prompt: "Quiero hacer el test vocacional" },
      { label: "📋 Requisitos para postular", prompt: "¿Cuáles son los requisitos de admisión?" }
    ]);
  }

  /**
   * Guía completa de Titulación y Prácticas Preprofesionales (EFSRT)
   */
  renderGuiaTitulacionEfsrt() {
    const efsrt = (typeof GUIA_PRACTICAS_EFSRT !== 'undefined') ? GUIA_PRACTICAS_EFSRT : null;

    const modulosList = efsrt ? efsrt.modulos.map(m => `
      <div class="p-3 bg-light rounded-3 border mb-2 small">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <h6 class="fw-bold text-primary mb-0">${m.modulo} (${m.horas} Horas)</h6>
          <span class="badge bg-white text-dark border">${m.ciclos}</span>
        </div>
        <p class="mb-1 text-muted"><strong>Resultado:</strong> <span class="text-dark fw-semibold">${m.documento}</span></p>
        <ul class="mb-0 ps-3 text-muted" style="font-size: 0.77rem;">
          ${m.requisitos.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `).join('') : '';

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #10b981;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-success px-3 py-1"><i class="bi bi-award-fill me-1"></i>Graduación Oficial</span>
          <span class="badge bg-light text-dark border">Ley N° 30512 MINEDU</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Ruta Completa para tu Titulación y Prácticas (EFSRT)</h4>
        <p class="small text-muted mb-3">Conoce paso a paso cómo obtener tu Título Profesional Técnico a Nombre de la Nación:</p>

        <!-- Pasos clave -->
        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <span class="badge bg-primary mb-2">Paso 1: Malla Curricular</span>
              <h6 class="fw-bold text-dark mb-1">Aprobar 120 Créditos</h6>
              <p class="small text-muted mb-0">Completar satisfactoriamente todas las asignaturas de los 6 semestres académicos con nota mínima de 13.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <span class="badge bg-success mb-2">Paso 2: Prácticas EFSRT</span>
              <h6 class="fw-bold text-dark mb-1">820 Horas Prácticas</h6>
              <p class="small text-muted mb-0">Desarrollar y validar tus prácticas preprofesionales en empresas del puerto o convalidar tu empleo actual.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <span class="badge bg-warning text-dark mb-2">Paso 3: Idioma Extranjero</span>
              <h6 class="fw-bold text-dark mb-1">Inglés Nivel A2 Concluido</h6>
              <p class="small text-muted mb-0">Acreditar inglés básico a través del curso institucional del IESTP o convalidación de centro externo.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <span class="badge bg-info text-dark mb-2">Paso 4: Sustentación</span>
              <h6 class="fw-bold text-dark mb-1">Proyecto o Plan de Negocios</h6>
              <p class="small text-muted mb-0">Sustentar un Proyecto de Innovación Tecnológica o rendir Examen de Suficiencia Profesional.</p>
            </div>
          </div>
        </div>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-briefcase-fill text-primary me-1"></i> Desglose de Prácticas EFSRT por Módulo:</h6>
        <div class="mb-3">${modulosList}</div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <strong><i class="bi bi-info-circle-fill text-primary me-1"></i> ¿Cómo inicio mis prácticas?</strong>
          <p class="mb-0 text-muted">
            Solicita tu <strong>Carta de Presentación Oficial</strong> en Secretaría Académica o por Mesa de Partes Virtual indicando la empresa en Paita, Talara o Piura donde realizarás tus prácticas.
          </p>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_curso_ingles">
            <i class="bi bi-translate text-primary"></i> Guía del Curso de Inglés
          </button>
          <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="tramite-titulacion">
            <i class="bi bi-file-earmark-check text-success"></i> Requisitos Título Profesional
          </button>
          <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="tramite-suficiencia-profesional">
            <i class="bi bi-journal-check text-info"></i> Requisitos Examen Suficiencia
          </button>
          <button class="interactive-btn" data-chat-action="ver_bolsa_trabajo">
            <i class="bi bi-building text-warning"></i> Empresas Aliadas en Paita
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Aquí tienes la guía completa de titulación y prácticas preprofesionales EFSRT requeridas por el MINEDU.", [
      { label: "🌐 Curso de Inglés", prompt: "¿Cómo es el curso de inglés para titularme?" },
      { label: "🏢 Empresas con convenio", prompt: "¿Dónde puedo hacer mis prácticas en Paita?" }
    ]);
  }

  /**
   * Guía Salarial y Empleabilidad en la Provincia de Paita
   */
  renderSueldosYCampo() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #f59e0b;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-warning text-dark px-3 py-1"><i class="bi bi-cash-stack me-1"></i>Mercado Laboral 2026</span>
          <span class="badge bg-light text-dark border">Paita, Piura y Región Norte</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Sueldos Estimados y Empleabilidad en Paita</h4>
        <p class="small text-muted mb-3">
          Conoce la remuneración aproximada y las oportunidades laborales para egresados técnicos del IESTP Hermanos Cárcamo:
        </p>

        <!-- Cuadrícula salarial -->
        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-laptop-fill text-primary fs-5"></i>
                <h6 class="fw-bold text-dark mb-0">Computación e Informática</h6>
              </div>
              <span class="badge bg-primary-subtle text-primary mb-2">S/. 2,200 a S/. 4,500+</span>
              <p class="small text-muted mb-1"><strong>Puestos:</strong> Administrador de redes, soporte técnico, desarrollador web, analista cloud y ciberseguridad.</p>
              <small class="text-success"><i class="bi bi-wifi me-1"></i> Alta opción de teletrabajo para Lima y el extranjero.</small>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-globe-americas text-success fs-5"></i>
                <h6 class="fw-bold text-dark mb-0">Negocios Internacionales</h6>
              </div>
              <span class="badge bg-success-subtle text-success mb-2">S/. 2,000 a S/. 5,000+</span>
              <p class="small text-muted mb-1"><strong>Puestos:</strong> Agente de aduanas, coordinador de exportaciones en el puerto (TPE), logística de frío y trámites VUCE.</p>
              <small class="text-primary"><i class="bi bi-ship me-1"></i> Paita es el 2° puerto de contenedores más grande del Perú.</small>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-calculator-fill text-purple fs-5" style="color: #6f42c1;"></i>
                <h6 class="fw-bold text-dark mb-0">Contabilidad & Tributación</h6>
              </div>
              <span class="badge bg-purple-subtle text-purple mb-2" style="background: #faf5ff; color: #6f42c1;">S/. 1,800 a S/. 4,000+</span>
              <p class="small text-muted mb-1"><strong>Puestos:</strong> Asistente tributario SUNAT, liquidador de planillas PLAME, analista de costos pesqueros y asesor independiente.</p>
              <small class="text-muted"><i class="bi bi-briefcase me-1"></i> Gran mercado para consultorías privadas a mypes.</small>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-water text-info fs-5"></i>
                <h6 class="fw-bold text-dark mb-0">Desarrollo Pesquero</h6>
              </div>
              <span class="badge bg-info-subtle text-dark mb-2">S/. 2,500 a S/. 6,000+</span>
              <p class="small text-muted mb-1"><strong>Puestos:</strong> Supervisor de aseguramiento de calidad HACCP, jefe de producción en congeladoras y técnico de cultivos acuícolas.</p>
              <small class="text-info"><i class="bi bi-tsunami me-1"></i> Industria pesquera líder en exportación de pota y conchas.</small>
            </div>
          </div>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-building me-1 text-primary"></i> Principales Empleadores en Paita:</h6>
          <p class="mb-0 text-muted">
            Terminales Portuarios Euroandinos (TPE), Ransa, Medlog, Seafrost, Hayduk, Austral, Olympic Perú, Caja Piura, Municipalidad de Paita y decenas de agencias aduaneras de la provincia.
          </p>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_bolsa_trabajo">
            <i class="bi bi-briefcase text-success"></i> Ver Bolsa de Trabajo y Convenios
          </button>
          <button class="interactive-btn" data-chat-action="ver_comparador_carreras">
            <i class="bi bi-columns-gap text-primary"></i> Comparar las 4 Carreras
          </button>
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional">
            <i class="bi bi-compass-fill text-danger"></i> Test Vocacional
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Aquí tienes el informe de empleabilidad y rangos salariales estimados para egresados técnicos en Paita.", [
      { label: "🤝 Convenios laborales", prompt: "¿Qué convenios de trabajo tiene el instituto?" },
      { label: "🎓 Convalidar con universidad", prompt: "¿Se puede convalidar con la universidad?" }
    ]);
  }

  /**
   * Asistente de Recuperación de Accesos y Claves
   */
  renderRecuperarAccesos() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0284c7;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-info text-dark px-3 py-1"><i class="bi bi-key-fill me-1"></i>Soporte Técnico TI</span>
          <span class="badge bg-light text-dark border">Accesos Oficiales</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Recuperación de Claves y Accesos Institucionales</h4>
        <p class="small text-muted mb-3">Sigue estas instrucciones para restablecer tus contraseñas bloqueadas u olvidadas:</p>

        <div class="p-3 bg-white rounded-3 border mb-3 shadow-sm">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-laptop text-primary fs-5"></i>
            <h6 class="fw-bold text-dark mb-0">1. Sistema Académico (Notas y Matrícula)</h6>
          </div>
          <p class="small text-muted mb-2">Portal: <a href="https://sistema.ieshercar.edu.pe/acceso" target="_blank">sistema.ieshercar.edu.pe/acceso</a></p>
          <ul class="small text-muted ps-3 mb-2">
            <li><strong>Usuario:</strong> Tu número de <strong>DNI</strong>.</li>
            <li><strong>Contraseña inicial:</strong> Tu DNI o la clave entregada en tu Ficha de Matrícula.</li>
            <li>Si no puedes ingresar, solicita el reseteo inmediato enviando foto de tu DNI al WhatsApp oficial de Secretaría.</li>
          </ul>
        </div>

        <div class="p-3 bg-white rounded-3 border mb-3 shadow-sm">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-mortarboard text-success fs-5"></i>
            <h6 class="fw-bold text-dark mb-0">2. Aula Virtual (Clases y Tareas)</h6>
          </div>
          <p class="small text-muted mb-2">Portal: <a href="https://aula.ieshercar.edu.pe/" target="_blank">aula.ieshercar.edu.pe</a></p>
          <ul class="small text-muted ps-3 mb-2">
            <li>Haz clic en <em>"¿Olvidó su nombre de usuario o contraseña?"</em>.</li>
            <li>Digita el correo electrónico registrado al matricularte para recibir el enlace de cambio.</li>
          </ul>
        </div>

        <div class="p-3 bg-white rounded-3 border mb-3 shadow-sm">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-credit-card text-warning fs-5"></i>
            <h6 class="fw-bold text-dark mb-0">3. Portal de Registro de Pagos</h6>
          </div>
          <p class="small text-muted mb-1">Portal: <a href="https://pagos.ieshercar.edu.pe/" target="_blank">pagos.ieshercar.edu.pe</a></p>
          <small class="text-muted">No requiere contraseña fija: se ingresa directamente digitando tu número de DNI.</small>
        </div>

        <div class="p-3 bg-light rounded-3 border text-center mb-3">
          <p class="small text-dark fw-bold mb-1">¿Sigues sin poder ingresar a tus plataformas?</p>
          <a href="https://wa.me/51969100257?text=Hola,%20solicito%20soporte%20para%20recuperar%20mi%20clave%20del%20sistema%20academico%20o%20aula%20virtual" 
             target="_blank" 
             class="btn btn-sm btn-success rounded-pill px-3 py-2 text-white fw-bold">
            <i class="bi bi-whatsapp me-1"></i> Contactar Soporte TI por WhatsApp (+51 969 100 257)
          </a>
        </div>

        <div class="interactive-button-grid">
          <a href="https://sistema.ieshercar.edu.pe/acceso" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-box-arrow-up-right text-primary"></i> Abrir Sistema Académico
          </a>
          <a href="https://aula.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-box-arrow-up-right text-success"></i> Abrir Aula Virtual
          </a>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion">
            <i class="bi bi-geo-alt text-warning"></i> Horario de Secretaría
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "¡No te preocupes! Si olvidaste tu contraseña del Sistema Académico o Aula Virtual, puedes restablecerla con tu DNI o escribir directamente al soporte de Secretaría.", [
      { label: "📱 WhatsApp Secretaría", prompt: "¿Cuál es el WhatsApp del instituto?" },
      { label: "🌐 Ver todas las plataformas", prompt: "Ver plataformas virtuales" }
    ]);
  }

  /**
   * Procedimiento para justificar inasistencias antes del límite de DPI
   */
  renderJustificarFaltas() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #16a34a;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-success px-3 py-1"><i class="bi bi-file-earmark-medical me-1"></i>Trámite Académico</span>
          <span class="badge bg-light text-dark border">Plazo: 5 Días Hábiles</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">¿Cómo Justificar Inasistencias a Clases?</h4>
        <p class="small text-muted mb-3">Evita perder cursos por DPI (límite del 30% de faltas) siguiendo este procedimiento:</p>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-danger mb-1"><i class="bi bi-clock-fill me-1"></i> Plazo Improrrogable:</h6>
          <p class="mb-0 text-muted">
            Tienes un plazo máximo de <strong>5 días hábiles</strong> posteriores al día de la falta para ingresar tu solicitud formal. Pasado este plazo, la falta se computa como injustificada.
          </p>
        </div>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-file-earmark-text text-primary me-1"></i> Documentos según el motivo:</h6>
        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-hospital me-1"></i> Motivo de Salud</h6>
              <p class="small text-muted mb-0">Certificado médico de ESSALUD, MINSA, posta de salud o clínica particular con N° de colegiatura del médico y receta/descanso médico.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-briefcase me-1"></i> Motivo Laboral o Fuerza Mayor</h6>
              <p class="small text-muted mb-0">Constancia timbrada de la empresa (pesquera, puerto, aduana) indicando horario de guardia, turno rotativo o comisión de servicio.</p>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-send-check-fill text-success me-1"></i> Canales de Presentación:</h6>
          <ol class="mb-0 ps-3 text-muted">
            <li><strong>Presencial:</strong> Presenta el Formulario Único de Trámite (FUT) con los documentos adjuntos en la Secretaría Académica (campus Paita Alta) de 8:00 a.m. a 1:00 p.m.</li>
            <li><strong>Virtual:</strong> Regístralo a través de la <a href="https://ieshercar.edu.pe/registro-tramite/" target="_blank">Mesa de Partes Virtual</a> seleccionando el trámite *"Justificación de Inasistencias"*.</li>
          </ol>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_calculadora_dpi">
            <i class="bi bi-calculator text-danger"></i> Abrir Calculadora de DPI
          </button>
          <a href="https://ieshercar.edu.pe/registro-tramite/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-box-arrow-up-right text-primary"></i> Mesa de Partes Virtual
          </a>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion">
            <i class="bi bi-geo-alt text-warning"></i> Sede y Horarios
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Tienes hasta cinco días hábiles para justificar tus inasistencias por salud o trabajo, y así evitar el límite de DPI en tus cursos.", [
      { label: "⏱️ Calculadora de faltas", prompt: "Calculadora de inasistencias DPI" },
      { label: "📋 Reglamento de notas", prompt: "¿Qué pasa si jalo un curso?" }
    ]);
  }

  /**
   * Calculadora interactiva de notas y promedio final semestral (Fórmula MINEDU)
   * Evaluación Continua (70%) + Evaluación Final (30%)
   */
  renderCalculadoraNotas(notaEC = 14, notaEF = 13) {
    const ec = Math.min(20, Math.max(0, parseFloat(notaEC) || 14));
    const ef = Math.min(20, Math.max(0, parseFloat(notaEF) || 13));
    
    // Fórmula oficial MINEDU
    const promExacto = (ec * 0.70) + (ef * 0.30);
    const promRedondeado = Math.round(promExacto);

    let estado = '';
    let badgeColor = '';
    let alertBg = '';
    let icon = '';
    let mensajeExplicativo = '';

    if (promRedondeado >= 13) {
      estado = '¡APROBADO!';
      badgeColor = 'bg-success';
      alertBg = '#f0fdf4; border-color: #bbf7d0;';
      icon = 'bi-check-circle-fill text-success';
      mensajeExplicativo = '¡Excelente! Cumples con la nota mínima aprobatoria oficial (13 o más) en la escala vigesimal. Promueves la unidad didáctica con éxito.';
    } else if (promRedondeado >= 10) {
      estado = 'DERECHO A RECUPERACIÓN / SUBSANACIÓN';
      badgeColor = 'bg-warning text-dark';
      alertBg = '#fefce8; border-color: #fef08a;';
      icon = 'bi-exclamation-triangle-fill text-warning';
      mensajeExplicativo = 'Tu promedio está entre 10 y 12. De acuerdo al reglamento MINEDU, tienes derecho a rendir la evaluación de recuperación o subsanación al final del semestre antes del cierre de actas.';
    } else {
      estado = 'DESAPROBADO (CURSO A CARGO)';
      badgeColor = 'bg-danger';
      alertBg = '#fef2f2; border-color: #fecaca;';
      icon = 'bi-x-circle-fill text-danger';
      mensajeExplicativo = 'Tu promedio es menor a 10. No alcanza el puntaje para subsanación inmediata. El curso queda como asignatura a cargo (puedes avanzar con un máximo de 2 cursos a cargo).';
    }

    const presets = [
      { label: 'Nota Regular', ec: 14, ef: 13, text: 'EC: 14 | EF: 13' },
      { label: 'En Riesgo', ec: 11, ef: 11, text: 'EC: 11 | EF: 11' },
      { label: 'Sobresaliente', ec: 18, ef: 17, text: 'EC: 18 | EF: 17' },
      { label: 'Desaprobado', ec: 9, ef: 8, text: 'EC: 09 | EF: 08' }
    ];

    const presetsHtml = presets.map(p => `
      <button class="interactive-btn ${(p.ec === ec && p.ef === ef) ? 'active' : ''}" 
              data-chat-action="calcular_nota_preset" 
              data-chat-val="${p.ec}_${p.ef}"
              style="${(p.ec === ec && p.ef === ef) ? 'background: #0f3380 !important; color: #ffffff !important;' : ''}">
        <i class="bi bi-bookmark-check"></i> ${p.label} (${p.text})
      </button>
    `).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #2563eb;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-calculator me-1"></i>Simulador de Calificaciones</span>
          <span class="badge bg-light text-dark border">Escala Vigesimal (0 - 20)</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Calculadora de Promedio Final Semestral</h4>
        <p class="small text-muted mb-3">Simula tu promedio según la fórmula oficial de evaluación modular del MINEDU:</p>

        <!-- Ponderaciones oficiales -->
        <div class="row g-2 mb-3">
          <div class="col-6">
            <div class="p-2 bg-light rounded border text-center">
              <span class="d-block small text-muted">Evaluación Continua (EC)</span>
              <strong class="text-primary fs-6">Peso: 70%</strong>
              <small class="d-block text-muted" style="font-size: 0.72rem;">Prácticas, tareas y talleres</small>
            </div>
          </div>
          <div class="col-6">
            <div class="p-2 bg-light rounded border text-center">
              <span class="d-block small text-muted">Evaluación Final (EF)</span>
              <strong class="text-success fs-6">Peso: 30%</strong>
              <small class="d-block text-muted" style="font-size: 0.72rem;">Producto o examen integrador</small>
            </div>
          </div>
        </div>

        <!-- Presets rápidos -->
        <div class="p-2 bg-light rounded-3 border mb-3">
          <label class="form-label small fw-bold text-dark mb-1 d-block">
            <i class="bi bi-sliders me-1 text-primary"></i> Probar combinaciones de notas típicas:
          </label>
          <div class="interactive-button-grid" style="grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));">
            ${presetsHtml}
          </div>
        </div>

        <!-- Tarjeta de resultado -->
        <div class="p-3 rounded-3 border mb-3" style="background: ${alertBg}">
          <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <i class="bi ${icon} fs-4"></i>
              <span class="badge ${badgeColor} fs-6 px-3 py-1">${estado}</span>
            </div>
            <div class="text-end">
              <span class="small text-muted d-block">Promedio Final Oficial:</span>
              <span class="fs-4 fw-bold text-dark">${promRedondeado} <small class="text-muted fs-6">(${promExacto.toFixed(2)})</small></span>
            </div>
          </div>
          <hr style="margin: 8px 0; opacity: 0.15;">
          <p class="small mb-0 text-dark" style="line-height: 1.5;">${mensajeExplicativo}</p>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-info-circle text-primary me-1"></i> Regla de Redondeo Oficial:</h6>
          <p class="mb-0 text-muted">
            Según la directiva de evaluación del Ministerio de Educación, las fracciones decimales de <strong>0.5 o más</strong> se redondean automáticamente al número entero inmediato superior en el promedio final.
          </p>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_calculadora_dpi">
            <i class="bi bi-clock-history text-danger"></i> ¿Dudas con faltas? Calculadora DPI
          </button>
          <button class="interactive-btn" data-chat-action="ver_reglamento">
            <i class="bi bi-journal-text text-primary"></i> Ver Reglamento de Notas Completo
          </button>
          <button class="interactive-btn" data-chat-action="ver_justificar_faltas">
            <i class="bi bi-file-earmark-medical text-success"></i> Justificar Inasistencias
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, `Con Evaluación Continua de ${ec} y Evaluación Final de ${ef}, el promedio final calculado es ${promRedondeado} (${estado}).`, [
      { label: "⏱️ Calculadora de faltas (DPI)", prompt: "Calculadora de inasistencias DPI" },
      { label: "📋 Reglamento de notas", prompt: "¿Qué pasa si jalo un curso?" }
    ]);
  }

  /**
   * Cotizador Interactivo de Tasas y Trámites TUPA
   * Permite calcular el total a abonar en el Banco de la Nación
   */
  renderCotizadorTupa(selectedIds = ['tupa-matricula', 'tupa-carne']) {
    const catalogo = (typeof TASAS_TUPA_COTIZADOR !== 'undefined') ? TASAS_TUPA_COTIZADOR : [];
    const ids = Array.isArray(selectedIds) ? selectedIds : [selectedIds];

    let total = 0;
    const itemsHtml = catalogo.map(t => {
      const isSelected = ids.includes(t.id);
      if (isSelected) total += t.costo;

      return `
        <div class="p-2 px-3 rounded-2 border mb-2 d-flex align-items-center justify-content-between gap-2 transition-all" 
             style="background: ${isSelected ? '#eff6ff' : '#ffffff'}; border-color: ${isSelected ? '#2563eb' : '#e2e8f0'} !important; cursor: pointer;"
             data-chat-action="toggle_cotizador_tupa"
             data-chat-val="${t.id}">
          <div class="d-flex align-items-center gap-2">
            <input type="checkbox" class="form-check-input mt-0" ${isSelected ? 'checked' : ''} style="cursor: pointer; pointer-events: none;">
            <div>
              <strong class="d-block text-dark small" style="font-size: 0.82rem;">${t.nombre}</strong>
              <small class="text-muted" style="font-size: 0.72rem;">${t.detalle}</small>
            </div>
          </div>
          <span class="badge ${isSelected ? 'bg-primary' : 'bg-light text-dark border'} fw-bold" style="font-size: 0.78rem;">
            S/. ${t.costo}.00
          </span>
        </div>
      `;
    }).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #f59e0b;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-warning text-dark px-3 py-1"><i class="bi bi-receipt me-1"></i>Cotizador Oficial TUPA</span>
          <span class="badge bg-light text-dark border">Banco de la Nación</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Cotizador de Trámites y Tasas Académicas</h4>
        <p class="small text-muted mb-3">Selecciona los trámites que necesitas realizar para calcular el monto exacto a depositar en el Banco de la Nación:</p>

        <!-- Lista seleccionable -->
        <div class="mb-3">
          ${itemsHtml}
        </div>

        <!-- Total Calculado -->
        <div class="p-3 rounded-3 border mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2" style="background: linear-gradient(135deg, #0e2d6c, #1646b0); color: #ffffff;">
          <div>
            <span class="small d-block text-white-50">Total Calculado a Depositar:</span>
            <h3 class="fw-bold mb-0 text-white">S/. ${total}.00</h3>
          </div>
          <div class="text-end">
            <span class="badge bg-warning text-dark fw-bold px-3 py-2"><i class="bi bi-bank me-1"></i> Cta. Cte. 00-638-002361</span>
          </div>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-credit-card me-1 text-primary"></i> Datos Oficiales para tu Pago (Solo Ventanilla BN):</h6>
          <ul class="mb-0 ps-3 text-muted">
            <li><strong>Cta. Cte. Principal (Matrícula, Suficiencia, Título y TUPA):</strong> <code>00-638-002361</code>.</li>
            <li><strong>Cta. Cte. Curso de Inglés:</strong> <code>00-638-025736</code> (sacar 2 copias al voucher y entregar en Tesorería).</li>
            <li><strong>Canal Único Oficial:</strong> Únicamente presencial en <strong>ventanillas del Banco de la Nación</strong> (no se paga en Págalo.pe ni agentes).</li>
            <li><strong>Registro de Comprobante:</strong> Registra tu voucher en <a href="https://pagos.ieshercar.edu.pe/" target="_blank">pagos.ieshercar.edu.pe</a> para generar tu boleta electrónica y preséntala en Tesorería.</li>
          </ul>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Subir a pagos.ieshercar.edu.pe
          </a>
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn">
            <i class="bi bi-bank2 text-success"></i> Copiar las 2 Cuentas del BN
          </button>
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa">
            <i class="bi bi-file-earmark-text text-warning"></i> Requisitos de Trámites
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, `El total calculado para los trámites seleccionados es de S/. ${total}.00 a depositar en ventanilla del Banco de la Nación en la Cuenta Corriente 00-638-002361.`, [
      { label: "💳 ¿Cómo registrar voucher?", prompt: "¿Cómo registro mi voucher en el portal de pagos?" },
      { label: "🏦 Ver 2 cuentas BN", prompt: "¿Cuáles son los números de cuenta del Banco de la Nación?" }
    ]);
  }

  /**
   * Croquis y Mapa de Ambientes del Campus Paita Alta
   */
  renderMapaCampusAmbientes() {
    const ambientes = (typeof CAMPUS_AMBIENTES_HERCAR !== 'undefined') ? CAMPUS_AMBIENTES_HERCAR : [];

    const ambientesCards = ambientes.map(a => `
      <div class="col-md-6 mb-2">
        <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
          <div class="d-flex align-items-center gap-2 mb-1">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(37,99,235,0.1); color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
              <i class="bi ${a.icon}"></i>
            </div>
            <h6 class="fw-bold text-dark mb-0" style="font-size: 0.85rem;">${a.ambiente}</h6>
          </div>
          <p class="small text-muted mb-0" style="font-size: 0.77rem; line-height: 1.45;">${a.descripcion}</p>
        </div>
      </div>
    `).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #06b6d4;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-info text-dark px-3 py-1"><i class="bi bi-geo-alt-fill me-1"></i>Campus Paita Alta</span>
          <span class="badge bg-light text-dark border">Av. Miguel Grau – Urb. El Parque</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Distribución de Ambientes y Croquis del Campus</h4>
        <p class="small text-muted mb-3">Conoce las instalaciones, pabellones y laboratorios del IESTP Hermanos Cárcamo:</p>

        <img src="assets/img/campus-hercar.jpg" alt="Campus Central IESTP Hermanos Cárcamo - Paita" class="campus-contact-photo" />

        <div class="row g-2 mb-3">
          ${ambientesCards}
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-clock-history text-primary me-1"></i> Horarios de Atención al Público:</h6>
          <p class="mb-1 text-muted"><strong>Mesa de Partes y Secretaría:</strong> Lunes a Viernes de 8:00 a.m. a 1:00 p.m. y de 2:00 p.m. a 4:30 p.m.</p>
          <p class="mb-0 text-muted"><strong>Clases Presenciales:</strong> Turno Mañana de 8:00 a.m. a 1:15 p.m.</p>
        </div>

        <div class="interactive-button-grid">
          <a href="https://maps.google.com/?q=IESTP+Hermanos+Carcamo+Paita" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-pin-map-fill text-danger"></i> Abrir en Google Maps
          </a>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion">
            <i class="bi bi-telephone-fill text-success"></i> Teléfonos y WhatsApp
          </button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras">
            <i class="bi bi-laptop text-primary"></i> Ver 4 Carreras
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Aquí tienes el croquis oficial y la distribución de pabellones, laboratorios de cómputo y talleres de nuestro campus en Paita Alta.", [
      { label: "📍 ¿Cómo llegar?", prompt: "¿Cómo llegar al instituto en Paita Alta?" },
      { label: "📞 Teléfono y WhatsApp", prompt: "¿Cuál es el teléfono y WhatsApp de secretaría?" }
    ]);
  }

  /**
   * Calendario Académico y Fechas Clave del Año 2026
   */
  renderCalendarioAcademicoDetallado() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #8b5cf6;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge text-white px-3 py-1" style="background: #8b5cf6;"><i class="bi bi-calendar-event-fill me-1"></i>Cronograma 2026</span>
          <span class="badge bg-light text-dark border">Resolución Directoral</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Calendario Académico y Fechas Clave 2026</h4>
        <p class="small text-muted mb-3">Cronograma de actividades académicas, evaluaciones y eventos institucionales del año:</p>

        <div class="p-3 bg-white rounded-3 border mb-3 shadow-sm">
          <h6 class="fw-bold text-primary mb-2"><i class="bi bi-mortarboard-fill me-1"></i> Semestre Académico 2026-I</h6>
          <ul class="small text-muted ps-3 mb-0" style="line-height: 1.6;">
            <li><strong>Matrícula Regular:</strong> 03 al 21 de Marzo de 2026.</li>
            <li><strong>Matrícula Extemporánea:</strong> 24 al 28 de Marzo de 2026.</li>
            <li><strong>Inicio de Clases Lectivas:</strong> <span class="badge bg-success">Lunes 31 de Marzo de 2026</span>.</li>
            <li><strong>Aniversario 39° Institucional:</strong> <span class="badge bg-warning text-dark">09 de Mayo de 2026</span> (Actos cívicos y feria).</li>
            <li><strong>Evaluaciones de Medio Ciclo:</strong> 26 al 30 de Mayo de 2026 (Semana 9).</li>
            <li><strong>Fin de Semestre y Evaluaciones Finales:</strong> 21 al 25 de Julio de 2026.</li>
            <li><strong>Semana de Recuperación / Subsanación:</strong> 28 de Julio al 02 de Agosto de 2026.</li>
          </ul>
        </div>

        <div class="p-3 bg-white rounded-3 border mb-3 shadow-sm">
          <h6 class="fw-bold text-success mb-2"><i class="bi bi-book-half me-1"></i> Semestre Académico 2026-II</h6>
          <ul class="small text-muted ps-3 mb-0" style="line-height: 1.6;">
            <li><strong>Proceso de Matrícula:</strong> Primera quincena de Agosto de 2026.</li>
            <li><strong>Inicio de Clases:</strong> Mediados de Agosto de 2026.</li>
            <li><strong>Semana Técnica de la Educación Tecnológica:</strong> Septiembre 2026 (Exposición de prototipos).</li>
            <li><strong>Clausura y Graduación Oficial:</strong> Diciembre de 2026.</li>
          </ul>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_comunicados_oficiales">
            <i class="bi bi-megaphone-fill text-warning"></i> Ver Comunicados Recientes
          </button>
          <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso">
            <i class="bi bi-credit-card text-primary"></i> Guía de Matrícula
          </button>
          <button class="interactive-btn" data-chat-action="ver_turnos_horarios">
            <i class="bi bi-clock-history text-info"></i> Horarios de Clases
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Te presento el calendario académico dos mil veintiséis con las fechas oficiales de matrícula, inicio de clases y evaluaciones semestrales.", [
      { label: "📋 Pasos de matrícula", prompt: "¿Cómo es el proceso de matrícula paso a paso?" },
      { label: "⏰ Horarios de clases", prompt: "¿Cuáles son los turnos y horarios de clases?" }
    ]);
  }

  /**
   * Guía Oficial Sobre Canales de Pago (Solo Ventanilla del Banco de la Nación)
   */
  renderMetodosPagoDigitales() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #dc2626;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-danger px-3 py-1"><i class="bi bi-exclamation-octagon-fill me-1"></i>Aviso Oficial de Tesorería</span>
          <span class="badge bg-light text-dark border">IESTP Hermanos Cárcamo</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">¿Se puede pagar por Págalo.pe o Agentes?</h4>
        <div class="alert alert-danger py-2 px-3 small mb-3">
          <strong><i class="bi bi-x-circle-fill me-1"></i> ¡NO!</strong> En el IESTP Hermanos Cárcamo <strong>no se realizan pagos en Págalo.pe, Yape, Plin ni Agentes MultiRed</strong>. Todos los pagos se realizan <strong>únicamente de forma presencial en ventanilla del Banco de la Nación</strong>, brindando el DNI y nombres completos del estudiante.
        </div>

        <div class="d-flex flex-column gap-2 mb-3">
          <div class="p-3 bg-light rounded-3 border">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-1">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-primary rounded-pill">Cuenta 1</span>
                <h6 class="fw-bold text-dark mb-0">Cuenta Principal Institucional</h6>
              </div>
              <button class="btn btn-xs btn-warning text-dark fw-bold rounded-pill px-3 py-1"
                      onclick="hercarBotApp.copyData('00-638-002361', 'Cuenta Principal BN')">
                <i class="bi bi-clipboard me-1"></i> Copiar 00-638-002361
              </button>
            </div>
            <code class="d-block p-2 bg-white border rounded text-primary fw-bold fs-6 mb-1">00-638-002361</code>
            <p class="small text-muted mb-0">Para <strong>Matrícula Semestral (S/. 250.00)</strong>, <strong>Examen de Suficiencia Profesional (S/. 200.00)</strong>, <strong>Título Profesional (S/. 60.00 + S/. 100.00 + S/. 12.00)</strong> y trámites TUPA. Luego genera tu boleta electrónica en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a>.</p>
          </div>

          <div class="p-3 bg-light rounded-3 border">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-1">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-success rounded-pill">Cuenta 2</span>
                <h6 class="fw-bold text-dark mb-0">Cuenta Curso de Inglés</h6>
              </div>
              <button class="btn btn-xs btn-primary text-white fw-bold rounded-pill px-3 py-1"
                      onclick="hercarBotApp.copyData('00-638-025736', 'Cuenta Curso de Inglés BN')">
                <i class="bi bi-clipboard me-1"></i> Copiar 00-638-025736
              </button>
            </div>
            <code class="d-block p-2 bg-white border rounded text-success fw-bold fs-6 mb-1">00-638-025736</code>
            <p class="small text-muted mb-0">El pago se realiza en el Banco de la Nación en la cuenta <strong>00-638-025736</strong>. Debes sacar <strong>2 copias a tu voucher</strong> y entregarlos en Tesorería en la oficina del instituto.</p>
          </div>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Generar Boleta en pagos.ieshercar.edu.pe
          </a>
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn">
            <i class="bi bi-bank2 text-warning"></i> Ver Tarjeta de 2 Cuentas BN
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "¡Atención! En el Instituto Hermanos Cárcamo no se realizan pagos en Págalo punto pe ni en agentes. Todos los pagos se efectúan presencialmente en ventanilla del Banco de la Nación en una de las dos cuentas oficiales: cero cero, seis tres ocho, cero cero, dos tres seis uno para matrícula y trámites, o cero cero, seis tres ocho, cero veinticinco, siete tres seis para el curso de inglés.", [
      { label: "🏦 Copiar cuentas BN", prompt: "¿Cuáles son los números de cuenta del Banco de la Nación?" },
      { label: "💳 Pasos de matrícula", prompt: "¿Cómo es el proceso de matrícula paso a paso en el instituto?" }
    ]);
  }

  /**
   * Tarjeta Oficial de las 2 Cuentas Bancarias del IESTP Hermanos Cárcamo
   */
  renderNumeroCuentaBancaria() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #f59e0b;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-warning text-dark px-3 py-1 fw-bold"><i class="bi bi-bank me-1"></i>Banco de la Nación</span>
          <span class="badge bg-danger text-white"><i class="bi bi-exclamation-circle me-1"></i>Solo Ventanilla (NO Págalo.pe)</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">2 Números de Cuenta Oficiales — Banco de la Nación</h4>
        <p class="small text-muted mb-3">
          El <strong>IESTP "Hermanos Cárcamo" de Paita</strong> cuenta con <strong>2 números de cuenta oficiales</strong> en el Banco de la Nación según el trámite:
        </p>

        <!-- Tarjeta Premium de las 2 Cuentas -->
        <div class="p-3 rounded-3 mb-3 border shadow-sm" style="background: linear-gradient(135deg, #091a3e 0%, #163e8c 100%); color: #ffffff;">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <img src="https://ieshercar.edu.pe/public/assets/img/Logo-Hercar.png" alt="Logo" style="width: 28px; height: 28px; background: #fff; border-radius: 6px; padding: 2px;">
              <span class="small text-white-50 fw-semibold">Banco de la Nación del Perú</span>
            </div>
            <span class="badge bg-warning text-dark fw-bold">2 Cuentas Corrientes</span>
          </div>

          <!-- Cuenta Principal BN -->
          <div class="p-2 px-3 rounded-2 mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);">
            <div>
              <span class="small d-block text-warning fw-bold" style="font-size: 0.76rem;">1. Cuenta Principal (Matrícula S/ 250, Suficiencia S/ 200, Título S/ 100 + S/ 60):</span>
              <span class="fs-4 fw-bold font-monospace text-white d-block" style="letter-spacing: 1px;">00-638-002361</span>
            </div>
            <button class="btn btn-sm btn-warning text-dark fw-bold rounded-pill px-3 py-1 shadow-sm"
                    onclick="hercarBotApp.copyData('00-638-002361', 'Cuenta Principal BN')">
              <i class="bi bi-clipboard-check me-1"></i> Copiar Cuenta 1
            </button>
          </div>

          <!-- Cuenta Curso de Inglés BN -->
          <div class="p-2 px-3 rounded-2 mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);">
            <div>
              <span class="small d-block text-info fw-bold" style="font-size: 0.76rem;">2. Cuenta Curso de Inglés (Sacar 2 copias al voucher y entregar en Tesorería):</span>
              <span class="fs-4 fw-bold font-monospace text-warning d-block" style="letter-spacing: 1px;">00-638-025736</span>
            </div>
            <button class="btn btn-sm btn-outline-light fw-bold rounded-pill px-3 py-1"
                    onclick="hercarBotApp.copyData('00-638-025736', 'Cuenta Curso de Inglés BN')">
              <i class="bi bi-clipboard me-1"></i> Copiar Cuenta 2
            </button>
          </div>

          <div class="small text-white-50 mt-2" style="font-size: 0.76rem;">
            <i class="bi bi-person-badge me-1 text-warning"></i><strong>Titular Oficial:</strong> Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" - Paita
          </div>
        </div>

        <!-- Canal Único y Reglas -->
        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-2"><i class="bi bi-wallet2 text-primary me-1"></i> ¿Cómo se realizan los pagos oficialmente?</h6>
          <div class="row g-2">
            <div class="col-sm-6">
              <div class="p-2 bg-white rounded border h-100">
                <strong class="text-danger d-block small"><i class="bi bi-slash-circle me-1"></i>1. Solo en Ventanilla BN</strong>
                <span class="text-muted" style="font-size: 0.76rem;"><strong>NO se paga en Págalo.pe ni en agentes.</strong> Acércate a ventanilla del Banco de la Nación indicando el DNI y nombres completos del estudiante.</span>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="p-2 bg-white rounded border h-100">
                <strong class="text-success d-block small"><i class="bi bi-file-earmark-check me-1"></i>2. Boleta y Copias en Tesorería</strong>
                <span class="text-muted" style="font-size: 0.76rem;"><strong>Matrícula (00-638-002361):</strong> registra en pagos.ieshercar.edu.pe, lleva original + 3 copias a Tesorería y 1 a Secretaría. <strong>Inglés (00-638-025736):</strong> saca 2 copias y entrega en Tesorería.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Registrar Voucher en el Portal
          </a>
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa">
            <i class="bi bi-calculator text-warning"></i> Cotizador de Trámites TUPA
          </button>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles">
            <i class="bi bi-translate text-success"></i> Pago Curso de Inglés
          </button>
          <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso">
            <i class="bi bi-ui-checks text-info"></i> Pasos de Matrícula
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "El Instituto Hermanos Cárcamo utiliza dos cuentas oficiales en el Banco de la Nación: la cuenta cero cero, seis tres ocho, cero cero, dos tres seis uno para matrícula, examen de suficiencia y titulación, y la cuenta cero cero, seis tres ocho, cero veinticinco, siete tres seis para el curso de inglés. Recuerda que los pagos se realizan únicamente en ventanilla del Banco de la Nación, no en Págalo punto pe ni en agentes.", [
      { label: "💳 Pasos de matrícula", prompt: "¿Cómo es el proceso de matrícula paso a paso en el instituto?" },
      { label: "🧮 ¿Cuánto pagar?", prompt: "Cotizador de trámites TUPA" }
    ]);
  }



  renderComunicadosList() {
    const announcements = (typeof getInstitutionalAnnouncements === 'function') 
      ? getInstitutionalAnnouncements() 
      : COMUNICADOS_OFICIALES;

    const listHtml = announcements.map(c => `
      <div class="comunicado-card-item p-3 bg-white rounded-3 border mb-3 shadow-sm ${c.importante ? 'border-primary' : ''}">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="badge ${c.importante ? 'bg-primary' : 'bg-secondary'}">${c.fecha}</span>
          ${c.importante ? '<span class="badge bg-warning text-dark"><i class="bi bi-star-fill me-1"></i>Importante / Urgente</span>' : ''}
        </div>
        <h5 class="fw-bold mb-2 text-dark">${c.titulo}</h5>
        <p class="small text-muted mb-2">${c.resumen}</p>
        ${c.indicaciones ? `
        <div class="p-2 bg-light rounded small mb-2 border">
          <strong><i class="bi bi-info-circle-fill text-primary me-1"></i> Indicaciones:</strong> ${c.indicaciones}
        </div>` : ''}
        <div class="d-flex flex-wrap gap-2 mt-2">
          ${c.enlaceDrive ? `<a href="${c.enlaceDrive}" target="_blank" class="btn btn-sm btn-outline-danger rounded-pill px-3"><i class="bi bi-file-earmark-pdf-fill me-1"></i> Ver en Google Drive</a>` : ''}
          ${c.enlacePlataforma ? `<a href="${c.enlacePlataforma}" target="_blank" class="btn btn-sm btn-primary rounded-pill px-3"><i class="bi bi-box-arrow-up-right me-1"></i> Ir a la Plataforma</a>` : ''}
        </div>
      </div>
    `).join('');

    const html = `
      <div class="comunicados-container">
        <h4 class="fw-bold mb-2 text-primary"><i class="bi bi-megaphone-fill text-warning me-2"></i>Comunicados Oficiales 2026 - IESTP Hermanos Cárcamo</h4>
        <p class="small text-muted mb-3">Información oficial vigente para estudiantes, postulantes y egresados:</p>
        ${listHtml}
        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard text-success"></i> Admisión 2026</button>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Sistema de Pagos</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop text-primary"></i> 4 Carreras</button>
        </div>
      </div>
    `;

    const comChips = [
      { label: 'Requisitos de Admisión', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?' },
      { label: 'Guía de Pagos y Matrícula', prompt: '¿Cómo realizo el pago de matrícula en el Banco de la Nación?' },
      { label: 'Beca Pronabec 18', prompt: '¿Puedo estudiar con Beca 18 o Beca Continuidad en HERCAR?' }
    ];
    this.appendBotMessage(html, "Aquí tienes los comunicados oficiales, avisos y directivas más recientes emitidas por la Dirección del instituto.", comChips);
  }

  renderCursoIngles() {
    const ing = CURSO_INGLES_INSTITUTO;

    const modHtml = ing.modalidades.map(m => `
      <div class="p-3 bg-light rounded-3 border mb-2 small">
        <h6 class="fw-bold text-primary mb-1"><i class="bi bi-mortarboard-fill me-1"></i> ${m.nivel}</h6>
        ${m.duracion ? `<p class="mb-1"><strong>Duración / Carga:</strong> ${m.duracion}</p>` : ''}
        ${m.modalidad ? `<p class="mb-1"><strong>Modalidad:</strong> ${m.modalidad}</p>` : ''}
        ${m.certificacion ? `<p class="mb-1"><strong>Certificación:</strong> ${m.certificacion}</p>` : ''}
        ${m.descripcion ? `<p class="mb-1">${m.descripcion}</p>` : ''}
        ${m.requisito ? `<p class="mb-0 text-muted"><strong>Requisito:</strong> ${m.requisito}</p>` : ''}
      </div>
    `).join('');

    const pasosHtml = ing.pasosInscripcion.map(p => `<li>${p.replace(/^\d+[\.\)]\s*/, '')}</li>`).join('');
    const benHtml = ing.beneficios.map(b => `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${b}</li>`).join('');

    const html = `
      <div class="ingles-detail-card p-3 p-sm-4 bg-white rounded-3 border shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1 fs-7"><i class="bi bi-translate me-1"></i>Idioma Extranjero Oficial</span>
          <span class="badge bg-warning text-dark"><i class="bi bi-award-fill me-1"></i>Requisito MINEDU Titulación</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">${ing.nombre}</h4>
        <p class="small text-muted mb-3">${ing.finalidad}</p>

        <!-- Bloque Destacado de Pago Oficial del Curso de Inglés -->
        <div class="p-3 rounded-3 mb-3" style="background: linear-gradient(135deg, #0a1f4d 0%, #0f3380 100%); color: #ffffff; border: 1px solid rgba(255,255,255,0.15);">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <span class="badge bg-warning text-dark fw-bold px-2 py-1"><i class="bi bi-bank me-1"></i> Banco de la Nación</span>
            <small class="text-white-50">Cuenta Específica del Curso de Inglés</small>
          </div>
          <p class="small text-white-50 mb-1">Número de Cuenta para Pago de Inglés:</p>
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 p-2 rounded mb-2" style="background: rgba(255,255,255,0.1);">
            <code class="fs-5 fw-bold text-warning font-monospace" style="letter-spacing: 1px;">00-638-025736</code>
            <button type="button" class="btn btn-sm btn-warning text-dark fw-bold rounded-pill px-3" 
                    onclick="hercarBotApp.copyData('00-638-025736', 'Cuenta Curso de Inglés BN')">
              <i class="bi bi-clipboard-check me-1"></i> Copiar Cuenta
            </button>
          </div>
          <div class="p-2 rounded small" style="background: rgba(239, 68, 68, 0.2); border-left: 3px solid #f87171;">
            <strong class="text-warning d-block mb-1"><i class="bi bi-exclamation-triangle-fill me-1"></i> Indicaciones Obligatorias de Tesorería:</strong>
            <ul class="mb-0 ps-3 text-white" style="font-size: 0.82rem; line-height: 1.45;">
              <li>El pago se realiza en el Banco de la Nación en la cuenta Nº <strong>00-638-025736</strong>.</li>
              <li>Debes <strong>sacar 2 copias legibles a tu voucher</strong> original.</li>
              <li>Entregar el voucher original y las <strong>2 copias en Tesorería</strong>, en la oficina del instituto.</li>
            </ul>
          </div>
        </div>

        <!-- Alerta de Regularización de Adeudos y Proceso de Titulación -->
        <div class="alert alert-warning py-2 px-3 small mb-3 border-warning" style="background:#fffbeb; color:#92400e;">
          <strong class="d-block mb-1"><i class="bi bi-megaphone-fill me-1"></i> Comunicado de Coordinación (Lic. Omar García Reto):</strong>
          <p class="mb-0" style="font-size:0.83rem; line-height:1.45;">
            La entrega de certificados de inglés se realizará cuando ya no haya deudas pendientes en el grupo. Los estudiantes deben regularizar su situación en Tesorería para no perjudicar la entrega grupal ni el proceso de titulación oficial. Para consultas y trámites de cobranza, coordinar con Tesorería (Srta. Tania Herrera Cruz).
          </p>
        </div>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-journal-check text-primary me-1"></i> Modalidades y Niveles:</h6>
        <div class="mb-3">${modHtml}</div>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-stars text-warning me-1"></i> Beneficios del Curso Institucional:</h6>
        <ul class="campo-laboral-ul mb-3">${benHtml}</ul>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-credit-card-2-front text-success me-1"></i> Pasos para Inscribirte y Tramitar Certificado:</h6>
        <ol class="tramite-pasos-ol mb-3">${pasosHtml}</ol>

        <div class="d-flex flex-wrap gap-2 mb-3">
          <button type="button" class="btn btn-sm btn-primary rounded-pill px-3 py-2 text-white"
                  onclick="hercarBotApp.copyData('00-638-025736', 'Cuenta Curso de Inglés BN')">
            <i class="bi bi-clipboard-check me-1"></i> Copiar Cuenta BN (00-638-025736)
          </button>
          <a href="https://wa.me/51969100257?text=Hola,%20quisiera%20consultar%20sobre%20mi%20voucher%20del%20Curso%20de%20Ingles%20en%20Tesoreria%20IESTP%20Hermanos%20Carcamo" target="_blank" class="btn btn-sm btn-success rounded-pill px-3 py-2 text-white">
            <i class="bi bi-whatsapp me-1"></i> Contactar a Tesorería / Secretaría
          </a>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="tramite-titulacion"><i class="bi bi-mortarboard text-primary"></i> Requisitos de Titulación</button>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Guía General de Pagos BN</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt text-danger"></i> Horario de Tesorería</button>
        </div>
      </div>
    `;

    const inglesChips = [
      { label: 'Requisitos de Titulación', prompt: '¿Cuáles son los requisitos para titularse profesionalmente?' },
      { label: 'Horarios de Tesorería', prompt: '¿Dónde queda y cuál es el horario de atención de Tesorería?' },
      { label: 'Cuenta General Matrícula', prompt: '¿Cuál es el número de cuenta bancaria para matrícula regular?' }
    ];
    this.appendBotMessage(html, "¡Hola! Te cuento que para el curso de inglés de titulación, el pago se realiza en el Banco de la Nación a la cuenta específica cero cero, seis tres ocho, cero dos cinco siete tres seis. Recuerda sacar dos copias a tu voucher y entregarlos físicamente en Tesorería del instituto para que no haya retrasos en la entrega de tu certificado. ¡En tu pantalla tienes el número de cuenta y las indicaciones oficiales!", inglesChips);
  }

  renderCarreraCompleta(carrera) {
    this.context.lastCareer = carrera.id;
    this.context.lastTopic = 'carrera';
    this.context.lastTurnTime = Date.now();

    const modulosHtml = carrera.modulos.map(m => `
      <div class="modulo-detail-box">
        <h6 class="modulo-name"><i class="bi bi-award-fill text-warning me-1"></i> ${m.modulo}</h6>
        <p class="modulo-cert"><span class="modulo-badge-tag">Certificación:</span> <strong>${m.certificacion}</strong></p>
      </div>
    `).join('');

    const campoHtml = carrera.campoLaboral.map(c => `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${c}</li>`).join('');

    const html = `
      <div class="carrera-hero-card" style="border-top: 4px solid ${carrera.color};">
        <div class="carrera-cover-banner">
          <img src="${carrera.imagen || 'assets/img/campus-hercar.jpg'}" alt="${carrera.nombre}" onerror="this.src='assets/img/campus-hercar.jpg'" />
          <div class="cover-overlay">
            <span class="badge" style="background: ${carrera.color}; color: #fff; font-size: 0.85rem; font-weight: 700;">${carrera.codigo}</span>
            <span class="badge bg-dark bg-opacity-75 text-light border border-light border-opacity-25"><i class="bi bi-clock me-1"></i>${carrera.duracion}</span>
          </div>
        </div>
        <h4 class="fw-bold mb-2">${carrera.nombre}</h4>
        <p class="carrera-titulo-sub small">${carrera.titulo}</p>
        
        <div class="carrera-desc-box mb-3">
          <p class="mb-0">${carrera.perfilEgreso}</p>
        </div>

        <h6 class="fw-bold text-primary mb-2"><i class="bi bi-diagram-3-fill me-1"></i> Certificaciones Modulares Progresivas:</h6>
        <div class="modulos-list-wrapper mb-3">
          ${modulosHtml}
        </div>

        <h6 class="fw-bold text-primary mb-2"><i class="bi bi-building-check me-1"></i> Oportunidades Laborales en Paita y Piura:</h6>
        <ul class="campo-laboral-ul mb-3">${campoHtml}</ul>

        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${carrera.id}">
            <i class="bi bi-book-half text-primary"></i> Ver Cursos Ciclo por Ciclo
          </button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa">
            <i class="bi bi-mortarboard-fill text-success"></i> ¿Cómo Postular?
          </button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras">
            <i class="bi bi-arrow-left"></i> Otras Carreras
          </button>
        </div>
      </div>
    `;

    const careerChips = [
      { label: `Malla de ${carrera.codigo}`, prompt: `¿Qué materias o cursos se llevan en ${carrera.codigo}?` },
      { label: 'Requisitos de Admisión', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?' },
      { label: '¿El instituto es gratuito?', prompt: '¿El instituto es 100% gratuito o se paga pensión mensual?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    this.appendBotMessage(html, `Te presento la carrera técnica de ${carrera.nombre}. Aquí puedes revisar su perfil formativo, módulos y oportunidades laborales en Paita.`, careerChips);
  }

  renderMallaCurricular(carrera) {
    this.context.lastCareer = carrera.id;
    this.context.lastTopic = 'malla';
    this.context.lastTurnTime = Date.now();

    let semestresHtml = '';

    carrera.modulos.forEach(mod => {
      semestresHtml += `<div class="malla-modulo-header"><i class="bi bi-folder-fill me-1 text-warning"></i> ${mod.modulo}</div>`;
      mod.semestres.forEach(sem => {
        const cursosList = sem.cursos.map(c => `<li><i class="bi bi-check2 text-primary me-2"></i>${c}</li>`).join('');
        semestresHtml += `
          <div class="malla-semestre-card">
            <span class="semestre-tag">${sem.ciclo}</span>
            <ul class="malla-cursos-list">${cursosList}</ul>
          </div>
        `;
      });
    });

    const html = `
      <div class="malla-container-card">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="badge" style="background: ${carrera.color}; color: #fff;">${carrera.codigo}</span>
          <h5 class="fw-bold mb-0">Plan de Estudios & Malla Curricular</h5>
        </div>
        <p class="text-muted small">Estructura curricular completa de los 6 semestres académicos de <strong>${carrera.nombre}</strong>:</p>

        <div class="malla-grid-content">
          ${semestresHtml}
        </div>

        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="ver_carrera_detalle" data-chat-val="${carrera.id}">
            <i class="bi bi-arrow-left"></i> Volver a Perfil de Carrera
          </button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa">
            <i class="bi bi-mortarboard-fill text-success"></i> Requisitos de Inscripción
          </button>
        </div>
      </div>
    `;

    const mallaChips = [
      { label: 'Requisitos de Admisión', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?' },
      { label: 'Matrícula paso a paso', prompt: '¿Cómo es el proceso de matrícula paso a paso en el instituto?' },
      { label: 'Bolsa de trabajo y convenios', prompt: '¿Cómo funciona la bolsa de trabajo y convenios para prácticas?' },
      { label: 'Ver todas las carreras', prompt: '¿Cuáles son las 4 carreras que ofrece el instituto?' }
    ];
    this.appendBotMessage(html, `Aquí tienes la malla curricular completa de ${carrera.nombre}, estructurada en seis semestres académicos con certificación modular progresiva.`, mallaChips);
  }

  renderCarrerasList() {
    const listCards = CARRERAS_COMPLETAS.map(c => `
      <div class="carrera-interactive-item" data-chat-action="ver_carrera_detalle" data-chat-val="${c.id}">
        <img src="${c.imagen || 'assets/img/campus-hercar.jpg'}" alt="${c.nombre}" class="carrera-item-thumb" onerror="this.src='assets/img/campus-hercar.jpg'" />
        <div class="carrera-item-content">
          <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <span class="badge" style="background: ${c.color || '#0284c7'}; color: #fff; font-size: 0.72rem; padding: 3px 8px;">${c.codigo}</span>
            <h6 class="mb-0 fw-bold carrera-item-title">${c.nombre}</h6>
          </div>
          <p class="carrera-item-desc mb-0 small text-muted">${c.perfilEgreso}</p>
        </div>
        <i class="bi bi-chevron-right text-muted ms-auto carrera-item-arrow"></i>
      </div>
    `).join('');

    const html = `
      <div class="carreras-catalog-card">
        <h5 class="fw-bold mb-2"><i class="bi bi-mortarboard-fill text-primary me-2"></i>Programas de Estudio del IESTP Hermanos Cárcamo</h5>
        <p class="text-muted small mb-3">El instituto ofrece 4 Carreras Profesionales Técnicas de 3 años de duración (educación pública sin mensualidades, con título a nombre de la nación y certificación modular):</p>
        <div class="carreras-catalog-list">${listCards}</div>
        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional"><i class="bi bi-compass text-danger"></i> ¿No sabes cuál elegir? Hacer Test Vocacional</button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-person-check text-success"></i> Requisitos de Admisión</button>
        </div>
      </div>
    `;

    const allCareerChips = [
      { label: 'Computación e Informática', prompt: '¿Cómo es la carrera de Computación e Informática y cuál es su campo laboral?' },
      { label: 'Negocios Internacionales', prompt: '¿De qué trata la carrera de Administración de Negocios Internacionales?' },
      { label: 'Contabilidad', prompt: '¿Cuál es el perfil y campo de trabajo en Contabilidad?' },
      { label: 'Desarrollo Pesquero', prompt: '¿Qué se aprende en Desarrollo Pesquero y Acuícola en Paita?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    this.appendBotMessage(html, "¡Hola! En el Instituto Superior Hermanos Cárcamo de Paita contamos con cuatro Carreras Profesionales Técnicas de tres años de duración: Computación e Informática, Administración de Negocios Internacionales, Contabilidad, y Desarrollo Pesquero y Acuícola. Al ser educación pública, no pagas mensualidades y obtienes título a nombre de la nación con certificación modular.", allCareerChips);
  }

  renderAdmisionInfo(query = '') {
    this.context.lastTopic = 'admision';
    this.context.lastTurnTime = Date.now();

    const adm = {
      convocatorias: 'Convocatoria Principal en Marzo y Convocatoria Extraordinaria en Agosto.',
      modalidades: [
        {
          modalidad: '1. Examen Ordinario de Admisión',
          descripcion: 'Para todos los postulantes egresados de Educación Secundaria. Consta de una prueba de conocimientos y aptitud académica de 100 preguntas.',
          estructuraExamen: [
            'Razonamiento Matemático (30%)',
            'Razonamiento Verbal y Comprensión Lectora (30%)',
            'Cultura General y Realidad Nacional (20%)',
            'Ciencias Básicas y Tecnología (20%)'
          ]
        },
        {
          modalidad: '2. Ingreso Directo por CEPRE-HERCAR',
          descripcion: 'Para los estudiantes del ciclo preuniversitario institucional que obtengan los primeros puestos en el cuadro de mérito.'
        },
        {
          modalidad: '3. Admisión por Exoneración',
          descripcion: 'Para los dos primeros puestos de secundaria, deportistas calificados IPD, personas con discapacidad (CONADIS) y beneficiarios del PIR.'
        }
      ],
      requisitosInscripcion: [
        'Certificado de Estudios original de 1° a 5° de Secundaria visado por UGEL o con código QR del MINEDU',
        'Copia simple de DNI vigente del postulante',
        'Partida de Nacimiento original o copia',
        '2 Fotografías a color tamaño carnet fondo blanco recientes',
        'Voucher de pago del Banco de la Nación validado en pagos.ieshercar.edu.pe',
        'Ficha de Inscripción debidamente llenada'
      ]
    };

    const modalidadesHtml = adm.modalidades.map((m, idx) => `
      <div class="admision-modalidad-card">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="modalidad-badge-num">${idx + 1}</span>
          <h6 class="fw-bold mb-0 text-primary">${m.modalidad.replace(/^\d+\.\s*/, '')}</h6>
        </div>
        <p class="small text-muted mb-2">${m.descripcion}</p>
        ${m.estructuraExamen ? `
          <div class="examen-estructura-card p-3 rounded-3 mt-2">
            <strong class="d-flex align-items-center gap-2 small fw-bold text-primary mb-2">
              <i class="bi bi-ui-checks-grid"></i> Estructura Oficial del Examen (100 preguntas):
            </strong>
            <div class="examen-puntos-grid">
              ${m.estructuraExamen.map(e => `
                <div class="examen-punto-item">
                  <i class="bi bi-check2 text-success me-1"></i>${e}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `).join('');

    const reqHtml = adm.requisitosInscripcion.map(r => `
      <li class="requisito-item d-flex align-items-start gap-2 py-1">
        <i class="bi bi-check2-circle text-primary fs-6 mt-1 flex-shrink-0"></i>
        <span>${r}</span>
      </li>
    `).join('');

    const html = `
      <div class="admision-detail-card">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1 rounded-pill"><i class="bi bi-mortarboard-fill me-1"></i>Admisión Oficial 2026</span>
          <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill">Inscripciones Abiertas</span>
        </div>
        <h5 class="fw-bold text-primary mb-1">Proceso de Admisión & CEPRE-HERCAR</h5>
        <p class="small text-muted mb-3">${adm.convocatorias}</p>

        <div class="p-3 rounded-3 mb-3 requisitos-box">
          <h6 class="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
            <i class="bi bi-folder-check text-success"></i> Requisitos para la Carpeta de Postulante:
          </h6>
          <ul class="requisitos-ul mb-0 ps-0">
            ${reqHtml}
          </ul>
        </div>

        <h6 class="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
          <i class="bi bi-journal-bookmark-fill text-warning"></i> Modalidades de Ingreso:
        </h6>
        <div class="modalidades-grid mb-3">
          ${modalidadesHtml}
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card-2-front text-warning"></i> ¿Cómo pagar la inscripción?</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> Conocer las 4 Carreras</button>
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional"><i class="bi bi-compass text-danger"></i> Test Vocacional</button>
        </div>
      </div>
    `;

    const admisionChips = [
      { label: 'Practicar Simulador', prompt: 'Quiero practicar el simulador de admisión' },
      { label: '¿Cuánto cuesta matricularse?', prompt: '¿Cómo es el pago de matrícula y cuánto cuesta en el Banco de la Nación?' },
      { label: 'Academia CEPRE-HERCAR', prompt: '¿Cómo funciona la academia CEPRE y el ingreso directo?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    this.appendBotMessage(html, "¡Qué alegría que quieras postular al Instituto Cárcamo! Al ser un instituto público del Estado, no pagas mensualidades de estudio, únicamente abonas la tasa de inscripción al examen. Aquí tienes los requisitos y fechas.", admisionChips);
  }

  renderGuiaPagos() {
    this.context.lastTopic = 'pagos';
    this.context.lastTurnTime = Date.now();

    const cuentaBN = '00-638-002361';
    const cuentaInglesBN = '00-638-025736';
    const pasos = [
      'Paso 1 (Solo Ventanilla BN): Acércate presencialmente a ventanilla del Banco de la Nación (NO se paga en Págalo.pe ni agentes).',
      'Paso 2: Elige la cuenta correcta: Cta. Cte. N° 00-638-002361 (Matrícula S/ 250.00, Suficiencia S/ 200.00, Título S/ 60 + S/ 100) o Cta. Cte. N° 00-638-025736 (Curso de Inglés).',
      'Paso 3: Brinda siempre el DNI y nombres completos del estudiante al cajero del banco.',
      'Paso 4 (Para Cta. 00-638-002361): Ingresa a https://pagos.ieshercar.edu.pe/ para registrar tu voucher y generar tu boleta electrónica.',
      'Paso 5 (Tesorería - Matrícula): Lleva tu voucher original y 3 copias de la boleta electrónica a Tesorería para su sellado y entrega 1 copia sellada/firmada en Secretaría Académica.',
      'Paso 6 (Tesorería - Curso de Inglés Cta. 00-638-025736): Saca 2 copias a tu voucher y entrégalas directamente en Tesorería, en la oficina del instituto.'
    ];

    const pasosHtml = pasos.map(p => `
      <div class="pago-step-item">
        <div class="step-num"><i class="bi bi-check-lg"></i></div>
        <div class="step-text">${p}</div>
      </div>
    `).join('');

    const html = `
      <div class="pagos-guide-card">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="fw-bold mb-0 text-primary"><i class="bi bi-credit-card-2-front-fill me-2"></i>Sistema de Registro de Pagos</h5>
          <span class="badge bg-warning text-dark"><i class="bi bi-bank me-1"></i>Banco de la Nación</span>
        </div>
        <p class="small text-muted mb-3">Sigue estos pasos para que Tesorería valide tu comprobante sin inconvenientes:</p>

        <div class="alert alert-light border small mb-3">
          <strong>Cta. Principal (Matrícula, Suficiencia, Título):</strong> <code class="fs-6">${cuentaBN}</code><br>
          <strong>Cta. Curso de Inglés:</strong> <code class="fs-6">${cuentaInglesBN}</code> <small class="text-muted">(2 copias voucher en Tesorería)</small><br>
          <strong>Canal Obligatorio:</strong> Solo presencial en ventanilla del Banco de la Nación (No Págalo.pe, no agentes)<br>
          <strong>Titular:</strong> IESTP Hermanos Cárcamo - Paita
        </div>

        <div class="pagos-steps-wrapper mb-3">
          ${pasosHtml}
        </div>

        <div class="d-flex flex-wrap gap-2 mb-3">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="btn btn-primary btn-sm rounded-pill px-3">
            <i class="bi bi-box-arrow-up-right me-1"></i> Abrir pagos.ieshercar.edu.pe
          </a>
          <a href="https://drive.google.com/file/d/1kYBJhVXOqO7BoQUpMZmYs-1E59gIUV9h/view?usp=sharing" target="_blank" class="btn btn-outline-danger btn-sm rounded-pill px-3">
            <i class="bi bi-play-circle-fill me-1"></i> Ver Video Tutorial Oficial
          </a>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa"><i class="bi bi-file-earmark-text"></i> Ver Tasas de Trámites</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-headset"></i> Ayuda con Caja</button>
        </div>
      </div>
    `;

    const pagosChips = [
      { label: 'Matrícula paso a paso', prompt: '¿Cómo es el proceso de matrícula paso a paso en el instituto?' },
      { label: 'Certificados modulares TUPA', prompt: '¿Cómo tramito mi Certificado Modular y cuánto demora?' },
      { label: 'Requisitos de Admisión', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?' }
    ];
    this.appendBotMessage(html, "¡Hola! Con mucho gusto te oriento: los pagos no se realizan en Págalo punto pe ni en agentes, sino únicamente en ventanilla del Banco de la Nación. La cuenta cero cero, seis tres ocho, cero cero, dos tres seis uno es para matrícula y trámites, y la cuenta cero cero, seis tres ocho, cero veinticinco, siete tres seis es para el curso de inglés.", pagosChips);
  }

  mapTramiteIdToFutKey(tramiteId) {
    const map = {
      'tramite-matricula': 'solicitud_libre',
      'tramite-admision': 'solicitud_libre',
      'tramite-certificado-modular': 'cert_modular',
      'tramite-suficiencia-profesional': 'titulacion_profesional',
      'tramite-sustentacion-proyecto': 'titulacion_profesional',
      'tramite-titulacion': 'titulacion_profesional',
      'tramite-certificado-estudios': 'cert_estudios_completo',
      'tramite-constancias-oficiales': 'constancia_matricula',
      'tramite-evaluaciones-recuperacion': 'subsanacion_recuperacion',
      'tramite-convalidacion': 'convalidacion_cursos',
      'tramite-traslados': 'traslado_interno',
      'tramite-reserva-licencia-reincorporacion': 'reserva_matricula',
      'tramite-duplicado-diploma': 'duplicado_titulo',
      'tramite-rectificacion-error-cuenta': 'rectificacion_notas',
      'tramite-ingles-actualizacion-ceremonia': 'solicitud_libre',
      'tramite-carne': 'carne_estudiantil',
      'tramite-justificacion-inasistencia': 'justificacion_inasistencia'
    };
    return map[tramiteId] || 'solicitud_libre';
  }

  renderTramiteDetalle(tramite) {
    this.context.lastTramite = tramite.id;
    this.context.lastTopic = 'tramite';
    this.context.lastTurnTime = Date.now();

    const reqList = tramite.requisitos.map(r => `<li><i class="bi bi-check2-square text-primary me-2"></i>${r}</li>`).join('');
    const pasosList = tramite.pasos.map(p => `<li>${p.replace(/^\d+[\.\)]\s*/, '')}</li>`).join('');

    const futKey = this.mapTramiteIdToFutKey(tramite.id);
    const cuentaLabel = tramite.cuentaBN ? `<span class="badge bg-warning text-dark border ms-1"><i class="bi bi-bank me-1"></i>Cta. BN ${tramite.cuentaBN}</span>` : '';
    const html = `
      <div class="tramite-detail-card">
        <div class="d-flex flex-wrap align-items-center gap-1 mb-2">
          <span class="badge bg-primary-subtle text-primary">${tramite.categoria}</span>
          ${cuentaLabel}
        </div>
        <h5 class="fw-bold mb-2">${tramite.nombre}</h5>

        ${tramite.paraQueSirve ? `
          <div class="tupa-sirve-box mb-3">
            <strong><i class="bi bi-lightbulb-fill text-warning me-1"></i> ¿Para qué sirve este trámite?</strong><br>
            <span>${tramite.paraQueSirve}</span>
          </div>
        ` : ''}

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-2 bg-light rounded border small">
              <strong><i class="bi bi-cash-coin me-1"></i> Costo / Tasa Oficial TUPA 2026:</strong><br>${tramite.costo}
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-2 bg-light rounded border small">
              <strong><i class="bi bi-clock-history me-1"></i> Plazo de Entrega:</strong><br>${tramite.plazo}
            </div>
          </div>
        </div>

        <h6 class="fw-bold text-dark mb-1"><i class="bi bi-card-checklist text-success me-1"></i> Requisitos:</h6>
        <ul class="tramite-req-ul mb-3">${reqList}</ul>

        <h6 class="fw-bold text-dark mb-1"><i class="bi bi-signpost-2 text-warning me-1"></i> Procedimiento:</h6>
        <ol class="tramite-pasos-ol mb-3">${pasosList}</ol>

        <div class="interactive-button-grid">
          <button class="interactive-btn text-primary fw-bold" data-chat-action="abrir_generador_fut" data-chat-val="${futKey}">
            <i class="bi bi-file-earmark-text-fill text-primary"></i> Generar FUT para este trámite
          </button>
          <button class="interactive-btn" data-chat-action="ver_tupa_compendio"><i class="bi bi-list-check text-success"></i> Ver los 66 Conceptos TUPA</button>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card-2-front text-warning"></i> ¿Cómo pagar en BN?</button>
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa"><i class="bi bi-arrow-left"></i> Volver a Guía TUPA</button>
        </div>
      </div>
    `;

    const sirveSpoken = tramite.paraQueSirve ? ` Este trámite sirve para lo siguiente: ${tramite.paraQueSirve}` : '';
    this.appendBotMessage(html, `Te muestro el detalle oficial TUPA 2026 para ${tramite.nombre}.${sirveSpoken}`);
  }

  renderTramitesList(filterCat = 'todos', showFullCompendio = false) {
    const categorias = ['todos', 'Académico', 'Certificaciones', 'Titulación', 'Documentos', 'Admisión', 'Actividades y Ceremonia', 'Bienestar'];
    const catLabels = {
      'todos': 'Todos los Trámites',
      'Académico': 'Académico',
      'Certificaciones': 'Certificados',
      'Titulación': 'Titulación',
      'Documentos': 'Constancias y Duplicados',
      'Admisión': 'Admisión',
      'Actividades y Ceremonia': 'Inglés / Ceremonia (025736)',
      'Bienestar': 'Carné MINEDU'
    };

    const filterBtnsHtml = `
      <div class="tupa-filter-bar">
        ${categorias.map(cat => `
          <button class="tupa-filter-pill ${(!showFullCompendio && filterCat === cat) ? 'active' : ''}" data-chat-action="filtrar_tupa_cat" data-chat-val="${cat}">
            ${catLabels[cat] || cat}
          </button>
        `).join('')}
        <button class="tupa-filter-pill ${showFullCompendio ? 'active' : ''}" data-chat-action="ver_tupa_compendio">
          <i class="bi bi-table me-1"></i> Completo (66 Ítems TUPA 2026)
        </button>
      </div>
    `;

    let bodyHtml = '';
    if (showFullCompendio && typeof TUPA_COMPENDIO_OFICIAL_2026 !== 'undefined') {
      const items002361 = TUPA_COMPENDIO_OFICIAL_2026.items.filter(x => x.cuenta === '00-638-002361');
      const items025736 = TUPA_COMPENDIO_OFICIAL_2026.items.filter(x => x.cuenta === '00-638-025736');

      const renderBlock = (arr) => arr.map(it => `
        <div class="tupa-compendio-item">
          <div class="d-flex justify-content-between align-items-start gap-2">
            <div>
              <span class="badge bg-primary-subtle text-primary me-1">#${it.item}</span>
              <span class="badge bg-light text-dark border me-1">${it.categoria}</span>
              <strong class="text-dark small">${it.concepto}</strong>
            </div>
            <span class="badge bg-success text-white flex-shrink-0">S/ ${Number(it.costo).toFixed(2)}</span>
          </div>
          <div class="tupa-sirve-preview">
            <strong><i class="bi bi-lightbulb-fill text-warning me-1"></i>¿Para qué sirve?</strong> ${it.paraQueSirve}
          </div>
        </div>
      `).join('');

      bodyHtml = `
        <div class="mb-3">
          <h6 class="fw-bold text-primary mb-2"><i class="bi bi-bank2 me-1"></i> Cta. Cte. BN 00-638-002361 — 43 Procedimientos Administrativos TUPA:</h6>
          ${renderBlock(items002361)}
        </div>
        <div class="mb-2">
          <h6 class="fw-bold text-success mb-2"><i class="bi bi-award-fill me-1"></i> Cta. Cte. BN 00-638-025736 — 23 Actividades Productivas, Inglés y Ceremonia:</h6>
          ${renderBlock(items025736)}
        </div>
      `;
    } else {
      const filtered = (filterCat && filterCat !== 'todos')
        ? GUIA_TRAMITES_TUPA.filter(t => t.categoria === filterCat)
        : GUIA_TRAMITES_TUPA;

      const listHtml = filtered.map(t => `
        <div class="tramite-interactive-row" data-chat-action="ver_tramite_especifico" data-chat-val="${t.id}">
          <div class="pe-2">
            <div class="d-flex flex-wrap align-items-center gap-1">
              <span class="badge bg-secondary-subtle text-secondary small">${t.categoria}</span>
              ${t.cuentaBN ? `<span class="badge bg-light text-primary border small">BN ${t.cuentaBN}</span>` : ''}
            </div>
            <h6 class="mb-1 fw-bold mt-1">${t.nombre}</h6>
            <div class="small fw-semibold text-primary mb-1"><i class="bi bi-cash-coin me-1"></i>${t.costo}</div>
            ${t.paraQueSirve ? `<div class="tupa-sirve-preview"><i class="bi bi-lightbulb-fill text-warning me-1"></i><strong>Para qué sirve:</strong> ${t.paraQueSirve}</div>` : ''}
          </div>
          <i class="bi bi-chevron-right text-muted flex-shrink-0"></i>
        </div>
      `).join('');

      bodyHtml = `<div class="tramites-list-box">${listHtml}</div>`;
    }

    const html = `
      <div class="tramites-catalog-card">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <span class="badge bg-primary px-3 py-1 rounded-pill"><i class="bi bi-shield-check me-1"></i>R.D. N° 020-2026 Oficial</span>
          <a href="https://ieshercar.edu.pe/Transparencia/TUPA/" target="_blank" class="small fw-bold text-decoration-none">Ver PDF Oficial TUPA ↗</a>
        </div>
        <h5 class="fw-bold mb-1"><i class="bi bi-file-earmark-ruled-fill text-primary me-2"></i>Guía TUPA 2026: ¿Cuánto Cuesta y Para Qué Sirve Cada Trámite?</h5>
        <p class="small text-muted mb-2">
          El <strong>TUPA 2026</strong> (<em>Texto Único de Procedimientos Administrativos</em>) fija los costos y reglas oficiales de cada documento. Todos los pagos se realizan <strong>solo en ventanilla del Banco de la Nación</strong> (no Págalo.pe): <code>00-638-002361</code> para trámites académicos y <code>00-638-025736</code> para inglés, actualización, Pre Tecno y ceremonia.
        </p>
        ${filterBtnsHtml}
        ${bodyHtml}
        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa"><i class="bi bi-calculator text-primary"></i> Cotizador TUPA</button>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card-2-front text-warning"></i> Guía de Pagos BN</button>
          <button class="interactive-btn" data-chat-action="abrir_generador_fut" data-chat-val="solicitud_libre"><i class="bi bi-file-earmark-pdf-fill text-danger"></i> Generar FUT PDF</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt text-success"></i> Mesa de Partes</button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Te presento la guía oficial del Tupa dos mil veintiséis del Instituto Hermanos Cárcamo, explicando qué es cada trámite, cuánto cuesta, en qué cuenta del Banco de la Nación se paga y para qué te sirve.");
  }

  renderContactoUbicacion() {
    const html = `
      <div class="contacto-guide-card">
        <h5 class="fw-bold text-primary mb-2"><i class="bi bi-geo-alt-fill text-danger me-2"></i>Sede Institucional & Canales de Atención</h5>
        
        <img src="assets/img/campus-hercar.jpg" alt="Fachada Campus IESTP Hermanos Cárcamo - Paita" class="campus-contact-photo" />

        <div class="p-3 bg-light rounded-3 border mb-3">
          <h6 class="fw-bold mb-1"><i class="bi bi-building me-2 text-primary"></i>Ubicación en Paita:</h6>
          <p class="mb-1 small">Av. Miguel Grau – Urb. El Parque Mz. A Lt. 01, Parte Alta, Paita, Piura.</p>
          <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Frente a la Av. Miguel Grau / Urb. El Parque</small>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-2 bg-white rounded border small">
              <strong><i class="bi bi-clock-fill text-warning me-1"></i> Horario de Atención:</strong><br>
              Lunes a Viernes de 8:00 a.m. a 3:00 p.m.
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-2 bg-white rounded border small">
              <strong><i class="bi bi-telephone-fill text-success me-1"></i> Teléfonos Directos:</strong><br>
              Fijo: (073) 251013<br>
              Celular/WhatsApp: 969 100 257
            </div>
          </div>
        </div>

        <div class="p-2 bg-white rounded border small mb-3">
          <strong><i class="bi bi-envelope-fill text-primary me-1"></i> Correo Electrónico:</strong><br>
          <code>ieshercar@ieshercar.edu.pe</code>
        </div>

        <div class="d-flex flex-wrap gap-2 mb-3">
          <a href="https://maps.google.com/?q=IESTP+Hermanos+Carcamo+Paita" target="_blank" class="btn btn-outline-primary btn-sm rounded-pill">
            <i class="bi bi-map-fill me-1"></i> Ver en Google Maps
          </a>
          <a href="https://wa.me/51969100257?text=Hola,%20quisiera%20informacion%20del%20IESTP%20Hermanos%20Carcamo" target="_blank" class="btn btn-success btn-sm rounded-pill">
            <i class="bi bi-whatsapp me-1"></i> Chat de WhatsApp
          </a>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Estamos ubicados en la Avenida Miguel Grau, Urbanización El Parque, en Paita Alta. Nuestro horario de atención en ventanilla es de lunes a viernes desde las ocho de la mañana.");
  }

  renderPlataformasServicios() {
    const html = `
      <div class="plataformas-guide-card">
        <h5 class="fw-bold text-primary mb-2"><i class="bi bi-grid-3x3-gap-fill me-2"></i>Ecosistema de Plataformas Digitales</h5>
        <p class="small text-muted mb-3">Acceso directo a todos los portales oficiales del instituto:</p>

        <div class="plataformas-grid-links mb-3">
          <a href="https://sistema.ieshercar.edu.pe/acceso" target="_blank" class="plat-link-box">
            <i class="bi bi-laptop plat-icon text-primary"></i>
            <div>
              <strong>Sistema Académico Institucional</strong>
              <small>Consulta de notas, récords y matrícula</small>
            </div>
          </a>

          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="plat-link-box">
            <i class="bi bi-credit-card-2-front plat-icon text-warning"></i>
            <div>
              <strong>Sistema de Registro de Pagos</strong>
              <small>Validación de comprobantes del Banco de la Nación</small>
            </div>
          </a>

          <a href="https://aula.ieshercar.edu.pe/" target="_blank" class="plat-link-box">
            <i class="bi bi-easel2 plat-icon text-success"></i>
            <div>
              <strong>Aula Virtual Institucional</strong>
              <small>Clases virtuales, tareas y foros</small>
            </div>
          </a>

          <a href="https://bolsalaboral.ieshercar.edu.pe/" target="_blank" class="plat-link-box">
            <i class="bi bi-briefcase-fill plat-icon text-info"></i>
            <div>
              <strong>Bolsa Laboral HERCAR</strong>
              <small>Ofertas de empleo y pasantías en empresas de Paita</small>
            </div>
          </a>

          <a href="https://sistema.ieshercar.edu.pe/registro-tramite/" target="_blank" class="plat-link-box">
            <i class="bi bi-file-earmark-text-fill plat-icon text-danger"></i>
            <div>
              <strong>Mesa de Partes Virtual</strong>
              <small>Trámites documentarios, FUT y solicitudes en línea</small>
            </div>
          </a>

          <a href="https://biblioteca.ieshercar.edu.pe/" target="_blank" class="plat-link-box">
            <i class="bi bi-book-half plat-icon text-purple"></i>
            <div>
              <strong>Biblioteca Virtual</strong>
              <small>Repositorio institucional y libros electrónicos</small>
            </div>
          </a>

          <a href="https://ieshercar.edu.pe/Tramites/Admision-Ciclo_Cero/" target="_blank" class="plat-link-box">
            <i class="bi bi-award-fill plat-icon text-warning"></i>
            <div>
              <strong>Admisión & Ciclo Cero</strong>
              <small>Inscripción al examen de admisión y academia preparatoria</small>
            </div>
          </a>

          <a href="https://ieshercar.edu.pe/Informacion_Academica/Becas/becas.php" target="_blank" class="plat-link-box">
            <i class="bi bi-patch-check-fill plat-icon text-primary"></i>
            <div>
              <strong>Becas PRONABEC (Beca 18)</strong>
              <small>Información y orientación para becas del Estado</small>
            </div>
          </a>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Aquí tienes el ecosistema completo de plataformas digitales y portales del IESTP Hermanos Cárcamo: Sistema Académico, Aula Virtual, Sistema de Pagos, Mesa de Partes, Bolsa Laboral y Biblioteca.");
  }

  /* ==========================================================================
     TEST VOCACIONAL INTERACTIVO v2 — BANCO DE 30 PREGUNTAS + ALEATORIO
     ========================================================================== */

  /* ==========================================================================
     TEST VOCACIONAL INTELIGENTE v3 — BANCO CATEGORIZADO + ALEATORIO DINÁMICO
     ========================================================================== */

  startVocationalTest() {
    // Banco Inteligente Multi-Dimensional: Intereses reales, Habilidades, Entorno laboral y Toma de decisiones
    const BANCO_VOCACIONAL_INTELIGENTE = [
      {
        dim: 'Actividades que Disfrutas',
        emoji: '⚡',
        q: 'Imagina un fin de semana libre aprendiendo algo práctico por gusto propio. ¿Qué actividad te atrapa por horas sin darte cuenta?',
        opts: [
          { t: 'Armar o configurar computadoras, programar una app/página web, automatizar tareas o resolver fallos de red y sistemas.', c: 'apsti', w: { apsti: 4, ani: 1 } },
          { t: 'Analizar cómo importar o vender productos, investigar mercados internacionales, cotizar envíos o negociar acuerdos comerciales.', c: 'ani', w: { ani: 4, conta: 1 } },
          { t: 'Ordenar ingresos y gastos en Excel, analizar finanzas personales, calcular impuestos o revisar presupuestos para ahorrar más.', c: 'conta', w: { conta: 4, ani: 1 } },
          { t: 'Explorar temas del mar, crianza de especies acuícolas, biología aplicada, control de calidad de alimentos marinos o producción ecológica.', c: 'dpa', w: { dpa: 4, conta: 1 } }
        ]
      },
      {
        dim: 'Tus Fortalezas Naturales',
        emoji: '🎯',
        q: 'En el colegio o en proyectos en grupo, ¿en qué área sueles destacar con mayor naturalidad frente a los demás?',
        opts: [
          { t: 'Lógica, computación, soporte técnico, pensamiento paso a paso y resolver problemas digitales rápidamente.', c: 'apsti', w: { apsti: 4 } },
          { t: 'Comunicación persuasiva, liderazgo comercial, organización logística y trato con clientes o proveedores.', c: 'ani', w: { ani: 4 } },
          { t: 'Precisión con los números, orden documental, responsabilidad ética, análisis de cuentas y atención al detalle.', c: 'conta', w: { conta: 4 } },
          { t: 'Observación científica de campo, trabajo práctico en laboratorio o planta y cuidado sanitario de procesos marinos.', c: 'dpa', w: { dpa: 4 } }
        ]
      },
      {
        dim: 'Ambiente Laboral Ideal',
        emoji: '🏢',
        q: 'Pensando en tu futuro trabajo diario en Paita o cualquier ciudad del Perú, ¿en qué espacio te ves más feliz y motivado?',
        opts: [
          { t: 'En un área de TI, centro de datos, oficina de desarrollo de software o brindando soporte de redes y ciberseguridad.', c: 'apsti', w: { apsti: 4, ani: 1 } },
          { t: 'En el Puerto de Paita, una agencia de aduanas o una empresa exportadora coordinando embarques hacia Asia, Europa o EE. UU.', c: 'ani', w: { ani: 4, dpa: 1 } },
          { t: 'En un estudio contable, banco/caja municipal o departamento financiero dirigiendo presupuestos, planillas y tributos SUNAT.', c: 'conta', w: { conta: 4 } },
          { t: 'En plantas congeladoras de exportación, centros acuícolas de concha de abanico/langostino o laboratorios de control sanitario.', c: 'dpa', w: { dpa: 4, ani: 1 } }
        ]
      },
      {
        dim: 'Lógica Algorítmica & Automatización',
        emoji: '🧩',
        q: 'Tienes 1,000 expedientes urgentes que deben organizarse antes del mediodía y es imposible hacerlo a mano. ¿Cómo responde tu mente?',
        opts: [
          { t: 'Diseño un script, macro o sistema en la computadora para clasificar y ordenar automáticamente todo en segundos.', c: 'apsti', w: { apsti: 4, conta: 1 } },
          { t: 'Coordino un equipo de trabajo ágil, delego prioridades y negocio con aduanas o clientes para cumplir la entrega sin demoras.', c: 'ani', w: { ani: 4 } },
          { t: 'Aplico una matriz de conciliación por códigos contables para asegurar que ni un solo sol o comprobante se pierda.', c: 'conta', w: { conta: 4 } },
          { t: 'Priorizo inmediatamente los lotes perecibles según cadena de frío e inocuidad para proteger la producción marina.', c: 'dpa', w: { dpa: 4 } }
        ]
      },
      {
        dim: 'Reacción ante una Crisis',
        emoji: '🚨',
        q: 'Surge una emergencia crítica imprevista que paraliza las operaciones de tu empresa. ¿Cuál es tu reacción instintiva?',
        opts: [
          { t: 'Entro al sistema o servidor, analizo el registro de errores, aíslo el fallo técnico y restauro la plataforma operativa.', c: 'apsti', w: { apsti: 4 } },
          { t: 'Tomo el liderazgo comunicacional: llamo a navieras, puerto o clientes para calmar la situación y pactar rutas alternativas.', c: 'ani', w: { ani: 4 } },
          { t: 'Audito el impacto financiero con calma matemática para proteger el flujo de caja y evitar multas tributarias o laborales.', c: 'conta', w: { conta: 4 } },
          { t: 'Verifico de inmediato temperatura, oxígeno, bioseguridad y protocolos HACCP para salvar la biomasa o el lote marino.', c: 'dpa', w: { dpa: 4 } }
        ]
      },
      {
        dim: 'Dilema Ético & Prioridad Profesional',
        emoji: '⚖️',
        q: 'Descubres una anomalía importante que nadie más ha notado en tu institución. ¿Qué prioridad guía tu decisión inmediata?',
        opts: [
          { t: 'La ciberseguridad y los datos: cierro la vulnerabilidad digital antes de que alguien filtre información o dañe el sistema.', c: 'apsti', w: { apsti: 4 } },
          { t: 'El cumplimiento internacional: reviso contratos, aranceles e Incoterms para proteger los despachos y la reputación exterior.', c: 'ani', w: { ani: 4 } },
          { t: 'La transparencia contable: corrijo el descuadre de libros y tributos ante SUNAT antes de que genere sanciones económicas.', c: 'conta', w: { conta: 4 } },
          { t: 'La salud pública e inocuidad: si un producto hidrobiológico no cumple normas SANIPES, detengo el despacho al instante.', c: 'dpa', w: { dpa: 4, ani: 1 } }
        ]
      },
      {
        dim: 'Arquetipo de Liderazgo & Impacto',
        emoji: '👑',
        q: 'En un gran proyecto regional en Piura, ¿qué rol te hace sentir más útil y orgulloso de tus resultados?',
        opts: [
          { t: 'El Arquitecto Tecnológico: crear el software, base de datos, red o infraestructura en la nube que hace funcionar todo.', c: 'apsti', w: { apsti: 4 } },
          { t: 'El Negociador Global: abrir mercados extranjeros, cerrar alianzas de exportación y mover mercancía al mundo.', c: 'ani', w: { ani: 4 } },
          { t: 'El Guardián Financiero: garantizar la rentabilidad real, controlar los costos industriales y respaldar decisiones con balances claros.', c: 'conta', w: { conta: 4 } },
          { t: 'El Especialista Marino-Productivo: innovar en acuicultura sostenible, navegación responsable y calidad alimentaria del océano.', c: 'dpa', w: { dpa: 4 } }
        ]
      },
      {
        dim: 'Curiosidad Intelectual',
        emoji: '🧠',
        q: 'Si te dieran una beca con los mejores especialistas del mundo, ¿qué tema te entusiasmaría dominar a fondo?',
        opts: [
          { t: 'Inteligencia artificial, desarrollo web y móvil full-stack, servidores Linux y ciberdefensa empresarial.', c: 'apsti', w: { apsti: 4 } },
          { t: 'Logística de megapuertos, inteligencia comercial exterior, tratados globales y dirección de exportaciones.', c: 'ani', w: { ani: 4 } },
          { t: 'Auditoría financiera avanzada, planeamiento tributario legal, costos de producción y peritaje contable.', c: 'conta', w: { conta: 4 } },
          { t: 'Biotecnología marina, cultivo tecnificado de especies hidrobiológicas y aseguramiento de calidad pesquera.', c: 'dpa', w: { dpa: 4 } }
        ]
      },
      {
        dim: 'Ingeniería con Recursos Limitados',
        emoji: '⏳',
        q: 'Te asignan un reto con la mitad del tiempo y la mitad del presupuesto habitual. ¿Cuál es tu estrategia ganadora?',
        opts: [
          { t: 'Automatizo tareas manuales con herramientas digitales y software libre para multiplicar la velocidad de trabajo.', c: 'apsti', w: { apsti: 4 } },
          { t: 'Negocio plazos flexibles con proveedores, optimizo rutas logísticas y aprovecho alianzas estratégicas comerciales.', c: 'ani', w: { ani: 4, conta: 1 } },
          { t: 'Reestructuro el presupuesto al céntimo, elimino gastos innecesarios y priorizo lo que da mayor retorno económico.', c: 'conta', w: { conta: 4 } },
          { t: 'Uso métodos productivos naturales, sostenibles y de bajo costo operativo manteniendo la máxima calidad técnica.', c: 'dpa', w: { dpa: 4 } }
        ]
      },
      {
        dim: 'Oportunidades en Paita',
        emoji: '⚓',
        q: 'Al observar el movimiento económico de Paita y su puerto, ¿qué oportunidad sientes que deberías liderar?',
        opts: [
          { t: 'Modernizar empresas con sistemas web/móviles, cámaras inteligentes, facturación integrada y conectividad segura.', c: 'apsti', w: { apsti: 4, ani: 1 } },
          { t: 'Impulsar exportaciones directas desde el Puerto de Paita hacia el mundo aprovechando acuerdos comerciales.', c: 'ani', w: { ani: 4 } },
          { t: 'Formalizar y asesorar tributaria y contablemente a negocios y pesqueras para que escalen con crédito sólido.', c: 'conta', w: { conta: 4, ani: 1 } },
          { t: 'Tecnificar criaderos acuícolas y plantas de congelado para exportar productos marinos con alto valor agregado.', c: 'dpa', w: { dpa: 4, ani: 1 } }
        ]
      }
    ];

    // Mezcla equilibrada: incluye los 3 ejes reales (Actividades, Fortalezas, Ambiente) + 4 dilemas variados
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const coreReal = shuffle(BANCO_VOCACIONAL_INTELIGENTE.slice(0, 3));
    const coreSituacional = shuffle(BANCO_VOCACIONAL_INTELIGENTE.slice(3)).slice(0, 4);
    const selectedQuestions = [...coreReal, ...coreSituacional].map(q => ({
      ...q,
      opts: shuffle(q.opts.map(o => ({ ...o, w: { ...(o.w || { [o.c]: 4 }) } })))
    }));

    this.activeTest = {
      step: 0,
      scores: { apsti: 0, ani: 0, conta: 0, dpa: 0 },
      maxScores: { apsti: 0, ani: 0, conta: 0, dpa: 0 },
      questions: selectedQuestions,
      userAnswers: [],
      choicesSummary: [],
      tieBreakerTriggered: false
    };

    this.renderNextQuestion(true);
  }

  getTieBreakerQuestion(careerA, careerB) {
    const pairKey = [careerA, careerB].sort().join('-');
    const TIE_BREAKER_BANK = {
      'ani-apsti': {
        dim: 'Desempate Inteligente · Tecnología vs Comercio Global',
        emoji: '⚡',
        q: 'Tu perfil muestra alta afinidad tanto en Computación e Informática como en Negocios Internacionales. En un proyecto exportador real, ¿qué papel prefieres asumir tú personalmente?',
        opts: [
          { t: 'Construir el sistema web, base de datos, servidores y automatización digital que hace operar toda la plataforma comercial.', c: 'apsti', w: { apsti: 5 } },
          { t: 'Negociar con compradores extranjeros, gestionar aduanas, aranceles, Incoterms y dirigir la logística de contenedores en puerto.', c: 'ani', w: { ani: 5 } }
        ]
      },
      'apsti-conta': {
        dim: 'Desempate Inteligente · Software & Redes vs Contabilidad & Finanzas',
        emoji: '⚡',
        q: 'Tienes un perfil analítico muy fuerte entre Computación e Informática y Contabilidad. Si pudieras elegir tu día a día ideal, ¿cuál prefieres?',
        opts: [
          { t: 'Programar aplicaciones, administrar redes/servidores, bases de datos y proteger infraestructura tecnológica.', c: 'apsti', w: { apsti: 5 } },
          { t: 'Formular estados financieros, liquidar tributos SUNAT (IGV/Renta), manejar planillas PLAME, costos y auditoría contable.', c: 'conta', w: { conta: 5 } }
        ]
      },
      'apsti-dpa': {
        dim: 'Desempate Inteligente · Tecnología Digital vs Producción Marina',
        emoji: '⚡',
        q: 'Tu perfil combina gusto por la tecnología y el sector productivo marino. ¿Dónde te entusiasma pasar la mayor parte de tu jornada profesional?',
        opts: [
          { t: 'Frente a equipos de cómputo, desarrollando software, configurando redes y administrando servidores y datos.', c: 'apsti', w: { apsti: 5 } },
          { t: 'En contacto con el mar, centros acuícolas y plantas pesqueras aplicando biotecnología, cultivo e inocuidad HACCP.', c: 'dpa', w: { dpa: 5 } }
        ]
      },
      'ani-conta': {
        dim: 'Desempate Inteligente · Aduanas & Negocios vs Contabilidad & Tributación',
        emoji: '⚡',
        q: 'Tus respuestas muestran equilibrio entre Negocios Internacionales y Contabilidad. ¿Qué reto te atrae más dominar como especialista?',
        opts: [
          { t: 'Abrir mercados exteriores, coordinar despachos portuarios, tramitar embarques VUCE y negociar contratos internacionales.', c: 'ani', w: { ani: 5 } },
          { t: 'Controlar la exactitud financiera de la empresa, auditoría interna, cálculo de costos y cumplimiento tributario ante SUNAT.', c: 'conta', w: { conta: 5 } }
        ]
      },
      'ani-dpa': {
        dim: 'Desempate Inteligente · Comercio Portuario vs Ingeniería Pesquera & Acuícola',
        emoji: '⚡',
        q: 'Estás muy cerca entre Negocios Internacionales y Desarrollo Pesquero y Acuícola. En la industria de Paita, ¿qué etapa prefieres dirigir?',
        opts: [
          { t: 'La gestión aduanera, documentación de exportación, fletes marítimos y negociación con mercados en el extranjero.', c: 'ani', w: { ani: 5 } },
          { t: 'La producción técnica en el mar o planta: extracción responsable, cultivo acuícola e inocuidad alimentaria HACCP.', c: 'dpa', w: { dpa: 5 } }
        ]
      },
      'conta-dpa': {
        dim: 'Desempate Inteligente · Finanzas Empresariales vs Tecnología Pesquera',
        emoji: '⚡',
        q: 'Tus respuestas equilibran Contabilidad y Desarrollo Pesquero y Acuícola. ¿Qué enfoque te representa mejor al trabajar en una empresa pesquera?',
        opts: [
          { t: 'Llevar la contabilidad de costos pesqueros, balances, planillas, facturación electrónica y declaraciones SUNAT en oficina.', c: 'conta', w: { conta: 5 } },
          { t: 'Estar en planta, laboratorio o centro acuícola supervisando calidad sanitaria, procesos productivos y especies marinas.', c: 'dpa', w: { dpa: 5 } }
        ]
      }
    };
    const q = TIE_BREAKER_BANK[pairKey];
    if (!q) return null;
    return { ...q, isTieBreaker: true, opts: [...q.opts].sort(() => Math.random() - 0.5) };
  }

  renderNextQuestion(isFirst = false) {
    if (!this.activeTest) return;
    const qIndex = this.activeTest.step;
    const currentQ = this.activeTest.questions[qIndex];
    const total = this.activeTest.questions.length;
    const progressPercent = Math.round(((qIndex + 1) / total) * 100);

    const optionsHtml = currentQ.opts.map((opt, i) => `
      <button type="button" class="test-choice-btn" data-chat-action="responder_pregunta_test" data-chat-val="${i}" data-opt-career="${opt.c}">
        <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
        <span class="choice-text">${opt.t}</span>
      </button>
    `).join('');

    const introBannerHtml = isFirst ? `
      <div class="test-intro-compact mb-3">
        <div class="d-flex align-items-center gap-2 mb-1">
          <span class="badge bg-primary-subtle text-primary px-2 py-1 fw-bold rounded-pill" style="font-size:0.72rem;">
            <i class="bi bi-stars me-1"></i>Test Vocacional Inteligente 2026
          </span>
          <span class="small text-muted" style="font-size:0.74rem;">Motor adaptativo multi-carrera</span>
        </div>
        <div class="small text-dark" style="line-height:1.45;">
          Responde con honestidad estas <strong>${total} preguntas</strong> (y si hay empate, activaré un desempate inteligente) para recomendarte tu carrera técnica ideal en Paita.
        </div>
      </div>
    ` : '';

    const html = `
      <div class="test-question-card">
        ${introBannerHtml}
        <div class="d-flex justify-content-between align-items-center mb-2 gap-2 flex-wrap">
          <span class="badge" style="background:${currentQ.isTieBreaker ? 'linear-gradient(130deg,#d97706,#ea580c)' : 'linear-gradient(130deg,#13357b,#1d4ed8)'}; color:#fff; font-size:0.74rem; font-weight:700; padding:6px 14px; border-radius:20px;">
            ${currentQ.emoji} ${currentQ.dim} • ${currentQ.isTieBreaker ? 'Desempate Final' : `Pregunta ${qIndex + 1} de ${total}`}
          </span>
          <span class="small fw-bold ${currentQ.isTieBreaker ? 'text-warning' : 'text-primary'}">${progressPercent}% completado</span>
        </div>
        <div style="height:6px; background:#f1f5f9; border-radius:10px; margin-bottom:15px; overflow:hidden;">
          <div style="width:${progressPercent}%; height:100%; background:${currentQ.isTieBreaker ? 'linear-gradient(90deg,#f59e0b,#ea580c)' : 'linear-gradient(90deg,#13357b,#2563eb)'}; border-radius:10px; transition:width .4s ease;"></div>
        </div>
        <h5 class="fw-bold text-dark mb-3" style="font-size:1.01rem; line-height:1.45;">${currentQ.q}</h5>
        <div class="test-choices-list">${optionsHtml}</div>
        <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <button type="button" class="btn btn-xs btn-outline-primary rounded-pill px-2 py-1 fw-semibold" data-chat-action="leer_pregunta_test_actual">
              <i class="bi bi-volume-up-fill me-1"></i>Escuchar pregunta y opciones
            </button>
            <span class="small text-muted" style="font-size:0.75rem;">
              <i class="bi bi-hand-index-thumb me-1"></i>Elige una tarjeta o escribe A, B, C o D.
            </span>
          </div>
          <button type="button" class="btn btn-sm btn-link text-muted text-decoration-none p-0" data-chat-action="cancelar_test_vocacional" style="font-size:0.74rem;">
            <i class="bi bi-x-circle me-1"></i>Salir del test
          </button>
        </div>
      </div>
    `;

    const ordinalLeads = [
      'Primera pregunta:',
      'Perfecto, vamos con la pregunta dos:',
      'Muy bien, pregunta tres:',
      'Seguimos avanzando. Pregunta cuatro:',
      'Excelente, vamos por la pregunta cinco:',
      'Ya casi terminamos. Pregunta seis:',
      'Última pregunta del test:'
    ];
    const spokenQuestion = currentQ.isTieBreaker
      ? `¡Tenemos un empate muy cercano entre tus intereses! Vamos con la pregunta final de desempate. ${currentQ.q}`
      : isFirst
        ? `¡Comencemos tu Test Vocacional Inteligente! Te haré siete preguntas sobre tus gustos y habilidades para recomendarte tu carrera ideal. ${ordinalLeads[0]} ${currentQ.q}`
        : `${ordinalLeads[qIndex] || `Pregunta ${qIndex + 1}:`} ${currentQ.q}`;

    this.appendBotMessage(html, spokenQuestion);
  }

  handleTestResponse(inputVal, sourceEl = null, rawText = '') {
    if (!this.activeTest) return;

    const currentQ = this.activeTest.questions[this.activeTest.step];
    if (!currentQ) {
      this.finishTest();
      return;
    }

    // Permitir salir del test en cualquier momento desde texto escrito o botón
    const valStr = String(inputVal || '').trim().toLowerCase();
    if (!sourceEl && /^(salir|cancelar|terminar|cerrar|parar|stop|ya no|salir del test)$/.test(valStr)) {
      this.activeTest = null;
      this.appendBotMessage(`
        <div class="p-3 bg-white rounded-3 border">
          <i class="bi bi-info-circle-fill text-primary me-1"></i> Has salido del Test Vocacional. Puedes volver a iniciarlo cuando quieras o preguntarme sobre carreras, admisión o trámites TUPA.
        </div>
      `, 'Test vocacional cancelado. Dime en qué más te puedo ayudar.');
      return;
    }

    // Evitar doble clic sobre una tarjeta de pregunta ya respondida
    if (sourceEl) {
      const parentCard = sourceEl.closest('.test-question-card');
      if (parentCard && parentCard.dataset.answered === '1') {
        return;
      }
    }

    // Resolver la opción seleccionada (por índice 0-3, letra A-D, carrera o texto libre)
    let chosenOpt = null;
    if (/^\d+$/.test(valStr)) {
      const idx = parseInt(valStr, 10);
      if (idx >= 0 && idx < currentQ.opts.length) chosenOpt = currentQ.opts[idx];
    }

    if (!chosenOpt) {
      const letterMatch = valStr.match(/^(?:opcion\s*|alternativa\s*|letra\s*)?([a-d1-4])(?:\)|\.|\s|$)/i);
      if (letterMatch) {
        const ch = letterMatch[1].toLowerCase();
        const mapIdx = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 }[ch];
        if (mapIdx !== undefined && currentQ.opts[mapIdx]) chosenOpt = currentQ.opts[mapIdx];
      }
    }

    if (!chosenOpt) {
      const mappedCareer = valStr === 'ci' ? 'apsti' : valStr;
      chosenOpt = currentQ.opts.find(o => o.c === mappedCareer) || null;
    }

    if (!chosenOpt && valStr.length > 2) {
      let guessedCareer = null;
      if (/(computa|informat|program|software|codigo|sistema|redes|pc|tecnologia|app|web|ia|hack)/.test(valStr)) guessedCareer = 'apsti';
      else if (/(negocio|aduana|comercio|export|import|puerto|logistica|empresa|vender|viajar|cliente)/.test(valStr)) guessedCareer = 'ani';
      else if (/(contab|numero|matem|finanza|dinero|banco|sunat|impuesto|excel|cuenta|auditoria|costo)/.test(valStr)) guessedCareer = 'conta';
      else if (/(pesc|mar|oceano|acuic|concha|pota|biolog|calidad|planta|alimento|natura|ambiente)/.test(valStr)) guessedCareer = 'dpa';
      if (guessedCareer) {
        chosenOpt = currentQ.opts.find(o => o.c === guessedCareer) || currentQ.opts[0];
      }
    }

    // Si escribió algo no reconocido, guiarle sin perder la pregunta actual
    if (!chosenOpt) {
      const letters = currentQ.opts.map((_, i) => String.fromCharCode(65 + i)).join(', ');
      this.appendBotMessage(`
        <div class="p-3 bg-white rounded-3 border small">
          <i class="bi bi-compass-fill text-primary me-1"></i> Para avanzar en la pregunta actual, haz clic en una de las tarjetas de arriba o escribe la letra de tu alternativa (<strong>${letters}</strong>). Si deseas detener la evaluación, escribe <strong>salir</strong>.
        </div>
      `, `Para avanzar en el test, elige una de las opciones en pantalla o escribe ${letters}.`);
      return;
    }

    // Bloquear y marcar visualmente la opción elegida en la tarjeta respondida
    const cards = this.messagesContainer ? this.messagesContainer.querySelectorAll('.test-question-card') : [];
    const targetCard = sourceEl ? sourceEl.closest('.test-question-card') : cards[cards.length - 1];
    if (targetCard) {
      targetCard.dataset.answered = '1';
      const chosenIdx = currentQ.opts.indexOf(chosenOpt);
      targetCard.querySelectorAll('.test-choice-btn').forEach((btn, idx) => {
        btn.disabled = true;
        if (btn === sourceEl || (!sourceEl && idx === chosenIdx)) {
          btn.classList.add('is-selected');
        } else {
          btn.classList.add('is-dimmed');
        }
      });
    }

    // Sumar puntajes ponderados reales y registrar el máximo alcanzable en la pregunta
    const weights = chosenOpt.w || { [chosenOpt.c]: 4 };
    Object.keys(weights).forEach(k => {
      if (this.activeTest.scores[k] !== undefined) {
        this.activeTest.scores[k] += weights[k];
      }
    });

    const perQuestionMax = {};
    currentQ.opts.forEach(o => {
      const ow = o.w || { [o.c]: 4 };
      Object.keys(ow).forEach(k => {
        perQuestionMax[k] = Math.max(perQuestionMax[k] || 0, ow[k]);
      });
    });
    Object.keys(this.activeTest.maxScores).forEach(k => {
      this.activeTest.maxScores[k] += (perQuestionMax[k] || 4);
    });

    this.activeTest.userAnswers.push(chosenOpt.c);
    this.activeTest.choicesSummary.push({
      dim: currentQ.dim,
      emoji: currentQ.emoji,
      carrera: chosenOpt.c,
      texto: chosenOpt.t,
      isTieBreaker: !!currentQ.isTieBreaker
    });

    this.activeTest.step++;
    const totalQ = this.activeTest.questions.length;

    if (this.activeTest.step < totalQ) {
      this.renderNextQuestion(false);
      return;
    }

    // Evaluar si existe empate o resultado muy ajustado (<= 4 pts, p. ej. 4 vs 3) para activar Desempate Inteligente
    if (!this.activeTest.tieBreakerTriggered) {
      const sorted = Object.keys(this.activeTest.scores).sort((a, b) => this.activeTest.scores[b] - this.activeTest.scores[a]);
      const diff = this.activeTest.scores[sorted[0]] - this.activeTest.scores[sorted[1]];
      if (diff <= 4) {
        const tieQ = this.getTieBreakerQuestion(sorted[0], sorted[1]);
        if (tieQ) {
          this.activeTest.tieBreakerTriggered = true;
          this.activeTest.questions.push(tieQ);
          this.renderNextQuestion(false);
          return;
        }
      }
    }

    this.finishTest();
  }

  finishTest() {
    const scores = this.activeTest.scores;
    const maxScores = this.activeTest.maxScores;
    const choicesSummary = this.activeTest.choicesSummary || [];
    const tieBreakerUsed = !!this.activeTest.tieBreakerTriggered;
    this.activeTest = null;

    // Ordenar carreras por puntaje ponderado real
    const sortedCareerIds = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const topCareerId = sortedCareerIds[0] || 'apsti';
    const secondaryCareerId = sortedCareerIds[1] || 'ani';

    const topCareer = CARRERAS_COMPLETAS.find(c => c.id === topCareerId) || CARRERAS_COMPLETAS[0];
    const secondaryCareer = CARRERAS_COMPLETAS.find(c => c.id === secondaryCareerId);

    const calcPct = (cId) => {
      const maxP = Math.max(maxScores[cId] || 1, 1);
      return Math.min(98, Math.max(15, Math.round((scores[cId] / maxP) * 100)));
    };
    const topPercent = calcPct(topCareerId);

    // Arquetipos Psicológicos y Perfiles Laborales Actualizados (Paita / Piura)
    const ARQUETIPOS_PSICOLOGICOS = {
      apsti: {
        arquetipo: 'El Arquitecto Digital & Solucionador Lógico',
        rasgoPrincipal: 'Pensamiento Estructurado y Automatización',
        descripcionPsicologica: 'Procesas los retos con lógica paso a paso y visión tecnológica. Disfrutas diseñar soluciones digitales, comprender cómo funcionan los sistemas por dentro y automatizar procesos para evitar tareas repetitivas.',
        titulo: 'Especialista en Computación e Informática, Redes y Desarrollo de Software',
        campoPaita: 'Áreas de sistemas en empresas exportadoras y portuarias de Paita, desarrollo web/móvil, banca regional, soporte de redes y ciberseguridad.',
        empresas: ['Terminales Portuarios Euroandinos (TPE)', 'Caja Piura / Caja Sullana', 'Agroindustrias del Valle del Chira', 'Empresas de Telecomunicaciones']
      },
      ani: {
        arquetipo: 'El Negociador Estratégico & Líder Global',
        rasgoPrincipal: 'Inteligencia Comercial y Visión Portuaria',
        descripcionPsicologica: 'Tu mente se orienta hacia las oportunidades comerciales, la coordinación logística y la negociación. Te motiva conectar productos locales con mercados internacionales y tomar decisiones ágiles en operaciones de comercio exterior.',
        titulo: 'Especialista en Operaciones Portuarias, Comercio Exterior y Gestión Aduanera',
        campoPaita: 'Agencias de aduana en el Puerto de Paita, operadores logísticos, áreas de exportación/importación de pesqueras y agroexportadoras.',
        empresas: ['Terminales Portuarios Euroandinos (TPE Paita)', 'Ransa Comercial / Medlog', 'Agencias de Aduana de Paita y Talara', 'Navieras y Agroexportadoras']
      },
      conta: {
        arquetipo: 'El Guardián Financiero & Analista de Precisión',
        rasgoPrincipal: 'Meticulosidad Ética y Control Cuantitativo',
        descripcionPsicologica: 'Destacas por tu orden, criterio numérico y responsabilidad. Sabes detectar inconsistencias rápidamente, organizar presupuestos con exactitud y proteger la salud tributaria y rentable de cualquier organización.',
        titulo: 'Especialista en Auditoría Financiera, Tributación SUNAT y Costos Empresariales',
        campoPaita: 'Estudios contables, áreas administrativas y de costos en pesqueras industriales, cajas municipales, cooperativas y gestión pública.',
        empresas: ['Estudios Contables de Paita y Piura', 'Banca y Cajas Municipales', 'Empresas Pesqueras Industriales', 'Municipalidad Provincial de Paita']
      },
      dpa: {
        arquetipo: 'El Especialista Marino & Productivo Sostenible',
        rasgoPrincipal: 'Vocación Bioambiental y Calidad Alimentaria',
        descripcionPsicologica: 'Combinas un fuerte sentido práctico con el interés por la ciencia aplicada al mar y los recursos hidrobiológicos. Disfrutas el trabajo de campo, laboratorio o planta controlando calidad, sanidad e innovación acuícola.',
        titulo: 'Especialista en Biotecnología Acuícola, Tecnología Pesquera y Control de Calidad HACCP',
        campoPaita: 'Plantas de congelado de pota y merluza en Tierra Colorada, centros acuícolas de concha de abanico y langostinos, y laboratorios sanitarios.',
        empresas: ['Seafrost S.A.C.', 'Pesquera Hayduk / Austral Group', 'Laboratorios SANIPES / CERPER', 'Asociaciones Acuícolas de la Bahía de Paita']
      }
    };

    const espData = ARQUETIPOS_PSICOLOGICOS[topCareerId] || ARQUETIPOS_PSICOLOGICOS.apsti;

    // Decisiones que definieron el diagnóstico
    const winningChoices = choicesSummary.filter(ch => ch.carrera === topCareerId || ch.isTieBreaker);
    const displayChoices = (winningChoices.length >= 2) ? winningChoices.slice(0, 4) : choicesSummary.slice(0, 3);
    const summaryItemsHtml = displayChoices.map(ch => `
      <li class="mb-2">
        <strong>${ch.emoji} ${ch.dim}:</strong>
        <span>Elegiste «<em>${this.escapeHtml(ch.texto)}</em>».</span>
      </li>
    `).join('');

    // Sinergia con segunda carrera
    let sinergiaTexto = '';
    if (topCareerId === 'apsti' && secondaryCareerId === 'ani') {
      sinergiaTexto = 'Perfil Tecnológico-Portuario: Excelente combinación para liderar software logístico, facturación electrónica y sistemas aduaneros en Paita.';
    } else if (topCareerId === 'ani' && secondaryCareerId === 'apsti') {
      sinergiaTexto = 'Perfil Logístico-Digital: Tu capacidad de negociación global se potencia con herramientas digitales, análisis de datos y comercio electrónico.';
    } else if (topCareerId === 'conta' && secondaryCareerId === 'ani') {
      sinergiaTexto = 'Perfil Financiero-Comercial: Ideal para controlar costos de flete, draw-back aduanero, finanzas corporativas y tributación de exportadoras.';
    } else if (topCareerId === 'dpa' && secondaryCareerId === 'conta') {
      sinergiaTexto = 'Perfil Productivo-Rentable: Capacidad clave para dirigir plantas pesqueras cuidando tanto la calidad HACCP como la rentabilidad operativa.';
    } else {
      sinergiaTexto = `Segunda afinidad con ${secondaryCareer ? `${secondaryCareer.nombre} (${secondaryCareer.codigo})` : 'otras especialidades'}: tendrás un perfil versátil muy valorado por las empresas de Paita y Piura.`;
    }

    // Módulos formativos reales desde CARRERAS_COMPLETAS
    const modulosHtml = (topCareer.modulos || []).map((m, idx) => `
      <div class="d-flex align-items-start gap-2 mb-1 small">
        <span class="badge bg-primary-subtle text-primary rounded-pill fw-bold">M${idx + 1}</span>
        <span class="text-dark">${m.certificacion || m.modulo}</span>
      </div>
    `).join('');

    // Barras ordenadas con porcentajes reales
    const barsHtml = sortedCareerIds.map((cId, idx) => {
      const cObj = CARRERAS_COMPLETAS.find(c => c.id === cId) || { nombre: cId, codigo: cId.toUpperCase(), icono: 'bi-mortarboard' };
      const pct = calcPct(cId);
      const isWinner = idx === 0;
      const rankTag = idx === 0 ? ' · Ideal para ti' : idx === 1 ? ' · 2da Opción Afín' : '';
      return `
        <div style="margin-bottom:10px;">
          <div class="d-flex justify-content-between small mb-1" style="font-weight:${isWinner ? '800' : '600'};">
            <span><i class="bi ${cObj.icono || 'bi-mortarboard'} me-1 text-primary"></i>${cObj.codigo} — ${cObj.nombreCorto || cObj.nombre}<span class="text-success small">${rankTag}</span></span>
            <span class="fw-bold ${isWinner ? 'text-primary' : 'text-muted'}">${pct}% compatibilidad</span>
          </div>
          <div style="height:8px; background:#e2e8f0; border-radius:10px; overflow:hidden;">
            <div style="width:${pct}%; height:100%; background:${isWinner ? 'linear-gradient(90deg,#13357b,#2563eb)' : idx === 1 ? '#38bdf8' : '#94a3b8'}; border-radius:10px; transition:width .8s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    const html = `
      <div class="test-result-hero p-4 bg-white rounded-4 border shadow-sm" style="border-top: 6px solid ${topCareer.color || '#13357b'} !important;">
        
        <div class="text-center mb-3">
          <div style="width:66px; height:66px; background:${topCareer.color || '#13357b'}18; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:10px;">
            <i class="bi bi-award-fill" style="color:${topCareer.color || '#13357b'}; font-size:2.1rem;"></i>
          </div>
          <div class="d-flex justify-content-center gap-2 flex-wrap mb-2">
            <span class="badge px-3 py-1 text-white" style="background:linear-gradient(130deg,#13357b,#2563eb); border-radius:20px;">
              <i class="bi bi-stars me-1"></i> Diagnóstico Vocacional Inteligente
            </span>
            ${tieBreakerUsed ? `<span class="badge px-3 py-1 text-white" style="background:linear-gradient(130deg,#d97706,#ea580c); border-radius:20px;"><i class="bi bi-lightning-fill me-1"></i>Resuelto con Desempate Adaptativo</span>` : ''}
          </div>
          <h3 class="fw-bold mb-1 text-dark" style="font-size:1.35rem;">${topCareer.nombre} (${topCareer.codigo})</h3>
          <p class="small text-muted mb-0">${topCareer.titulo} • ${topCareer.duracion}</p>
        </div>

        <div class="p-3 rounded-3 mb-3 bg-light border">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <span class="badge bg-primary px-3 py-1"><i class="bi bi-person-bounding-box me-1"></i>${espData.arquetipo}</span>
            <span class="small fw-bold text-primary">${topPercent}% de Compatibilidad</span>
          </div>
          <p class="small text-dark mb-2" style="line-height:1.6;">
            ${espData.descripcionPsicologica}
          </p>
          <div class="small text-muted">
            <strong><i class="bi bi-lightning-charge-fill text-warning me-1"></i>Fortaleza clave:</strong> ${espData.rasgoPrincipal}
          </div>
        </div>

        ${summaryItemsHtml ? `
        <div class="p-3 rounded-3 mb-3 border reasons-summary-box small">
          <h6 class="fw-bold text-dark mb-2">
            <i class="bi bi-check-circle-fill text-success me-1"></i> Por qué esta carrera coincide con tus respuestas:
          </h6>
          <ul class="mb-0 ps-3 text-muted">
            ${summaryItemsHtml}
          </ul>
        </div>
        ` : ''}

        <div class="p-3 rounded-3 mb-3 bg-light border">
          <h6 class="fw-bold mb-3 text-dark" style="font-size:0.84rem;">
            <i class="bi bi-bar-chart-fill text-primary me-1"></i> Compatibilidad en las 4 Carreras del Instituto:
          </h6>
          ${barsHtml}
        </div>

        ${modulosHtml ? `
        <div class="p-3 bg-white rounded-3 border mb-3 small">
          <h6 class="fw-bold text-dark mb-2"><i class="bi bi-layers-fill text-primary me-1"></i> Certificaciones Modulares que obtendrás en ${topCareer.codigo}:</h6>
          ${modulosHtml}
        </div>
        ` : ''}

        <div class="p-3 bg-white rounded-3 border mb-3 small">
          <h6 class="fw-bold text-dark mb-2"><i class="bi bi-geo-alt-fill text-danger me-1"></i> Campo Laboral en Paita y Piura:</h6>
          <p class="text-muted mb-2">${espData.campoPaita}</p>
          <div class="d-flex flex-wrap gap-1 mt-1">
            ${espData.empresas.map(emp => `<span class="badge bg-light text-dark border"><i class="bi bi-building me-1 text-primary"></i>${emp}</span>`).join('')}
          </div>
        </div>

        <div class="p-3 rounded-3 mb-3 small bg-light border">
          <i class="bi bi-lightbulb-fill text-warning me-1"></i>
          <strong>Sinergia con tu 2da Opción Afín:</strong><br>
          <span class="text-muted">${sinergiaTexto}</span>
        </div>

        <div class="d-flex flex-wrap gap-2 justify-content-center mb-3">
          <a href="https://wa.me/51969100257?text=${encodeURIComponent(`¡Hola! Acabo de realizar el Test Vocacional Inteligente en HercarBot IA del IESTP Hermanos Cárcamo de Paita.\n\n🎯 Mi diagnóstico:\n• Carrera recomendada: ${topCareer.nombre} (${topCareer.codigo})\n• Perfil: ${espData.arquetipo}\n• Compatibilidad: ${topPercent}%\n\n¿Podrían orientarme sobre los requisitos de admisión y fechas de inscripción?`)}" target="_blank" class="btn-whatsapp-advisor">
            <i class="bi bi-whatsapp fs-5"></i>
            <span>Consultar por WhatsApp (+51 969 100 257)</span>
          </a>
          <button type="button" class="btn-print-vocational" onclick="hercarBotApp.printVocationalSheet()">
            <i class="bi bi-printer-fill fs-6"></i>
            <span>Imprimir / Guardar Ficha (PDF)</span>
          </button>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${topCareer.id}">
            <i class="bi bi-book text-primary"></i> Ver Malla Curricular
          </button>
          <button class="interactive-btn" data-chat-action="ver_comparador_carreras">
            <i class="bi bi-columns-gap text-info"></i> Comparar las 4 Carreras
          </button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa">
            <i class="bi bi-mortarboard-fill text-success"></i> ¿Cómo Postular?
          </button>
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional">
            <i class="bi bi-arrow-repeat text-secondary"></i> Repetir Test
          </button>
        </div>
      </div>
    `;

    this.triggerConfetti();

    const stats = this.getStats();
    if (!stats.testsRealizados) stats.testsRealizados = [];
    stats.testsRealizados.unshift({
      id: Date.now(),
      carrera: topCareer.codigo,
      carreraNombre: topCareer.nombre,
      especialista: espData.arquetipo,
      afinidad: topPercent,
      secundaria: secondaryCareer ? secondaryCareer.codigo : 'General',
      respuestas: choicesSummary,
      scores: { ...scores },
      desempateAdaptativo: tieBreakerUsed,
      fecha: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if (stats.testsRealizados.length > 50) stats.testsRealizados.pop();

    if (stats.carrerasConsultas && stats.carrerasConsultas[topCareer.id] !== undefined) {
      stats.carrerasConsultas[topCareer.id] += 3;
    }
    this.saveStats(stats);

    const testChips = [
      { label: `Malla de ${topCareer.codigo}`, prompt: `¿Qué cursos se llevan en ${topCareer.nombre}?` },
      { label: 'Requisitos de Admisión', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?' },
      { label: '¿Cuánto cuesta la matrícula?', prompt: '¿Cómo es el pago de matrícula y cuánto cuesta en el Banco de la Nación?' },
      { label: 'Repetir Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];

    const spokenIntro = `¡Diagnóstico listo! Según tus respuestas, tu carrera ideal en el Instituto Hermanos Cárcamo es ${topCareer.nombre}, con ${topPercent} por ciento de compatibilidad${secondaryCareer ? `, seguida de cerca por ${secondaryCareer.nombre}` : ''}. ¡Muchos éxitos en tu futuro profesional!`;
    this.appendBotMessage(html, spokenIntro, testChips);
  }

  /* ==========================================================================
     SIMULADOR INTERACTIVO DE EXAMEN DE ADMISIÓN
     ========================================================================== */

  startAdmissionSimulator() {
    this.activeSimulator = {
      step: 0,
      score: 0,
      total: SIMULADOR_EXAMEN_HERCAR.length,
      history: []
    };

    const introHtml = `
      <div class="simulator-intro-card p-3 bg-white rounded-3 border shadow-sm">
        <div class="text-center mb-3">
          <div class="test-icon-badge mb-2" style="background: #e0f2fe; color: #0284c7;"><i class="bi bi-mortarboard-fill"></i></div>
          <h4 class="fw-bold mb-1 text-primary">Simulador de Examen de Admisión HERCAR</h4>
          <p class="small text-muted mb-0">Demuestra tus conocimientos en Razonamiento Matemático, Verbal, Cultura General y Ciencias para la Admisión 2026.</p>
        </div>
      </div>
    `;

    this.appendBotMessage(introHtml, "Iniciando el Simulador de Admisión. ¡Muchos éxitos!");
    this.renderSimulatorQuestion();
  }

  renderSimulatorQuestion() {
    if (!this.activeSimulator) return;
    const qIndex = this.activeSimulator.step;
    const q = SIMULADOR_EXAMEN_HERCAR[qIndex];
    const progress = Math.round(((qIndex + 1) / this.activeSimulator.total) * 100);

    const optionsHtml = q.opciones.map((opt, i) => `
      <button class="test-choice-btn" data-chat-action="responder_pregunta_simulador" data-chat-val="${i}">
        <span class="choice-letter" style="background: #0284c7;">${String.fromCharCode(65 + i)}</span>
        <span class="choice-text">${opt}</span>
      </button>
    `).join('');

    const html = `
      <div class="simulator-question-box p-3 bg-white rounded-3 border shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-info text-dark fw-bold"><i class="bi bi-tag-fill me-1"></i>${q.area}</span>
          <span class="small fw-bold text-muted">Pregunta ${qIndex + 1} de ${this.activeSimulator.total}</span>
        </div>
        <div class="progress mb-3" style="height: 6px;">
          <div class="progress-bar bg-info" role="progressbar" style="width: ${progress}%;"></div>
        </div>
        <h5 class="fw-bold mb-3 text-dark">${q.pregunta}</h5>
        <div class="test-choices-list">${optionsHtml}</div>
      </div>
    `;

    this.appendBotMessage(html, `Pregunta ${qIndex + 1} de ${this.activeSimulator.total}. ${q.pregunta}`);
  }

  handleSimulatorResponse(chosenIdx) {
    if (!this.activeSimulator) return;
    const qIndex = this.activeSimulator.step;
    const q = SIMULADOR_EXAMEN_HERCAR[qIndex];
    const isCorrect = parseInt(chosenIdx) === q.correcta;

    if (isCorrect) {
      this.activeSimulator.score += 20;
    }

    const feedbackHtml = `
      <div class="p-3 mb-2 rounded-3 border ${isCorrect ? 'bg-success-subtle border-success' : 'bg-danger-subtle border-danger'} small">
        <div class="d-flex align-items-center gap-2 mb-1">
          <i class="bi ${isCorrect ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} fs-5"></i>
          <strong class="${isCorrect ? 'text-success' : 'text-danger'}">${isCorrect ? '¡Correcto! (+20 pts)' : 'Incorrecto'}</strong>
        </div>
        <p class="mb-1"><strong>Respuesta correcta:</strong> ${q.opciones[q.correcta]}</p>
        <p class="mb-0 text-muted"><strong>Explicación:</strong> ${q.explicacion}</p>
      </div>
    `;

    this.appendBotMessage(feedbackHtml, isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta.");

    this.activeSimulator.step++;

    if (this.activeSimulator.step < this.activeSimulator.total) {
      setTimeout(() => this.renderSimulatorQuestion(), 600);
    } else {
      setTimeout(() => this.finishSimulator(), 700);
    }
  }

  finishSimulator() {
    const finalScore = this.activeSimulator.score;
    const maxScore = this.activeSimulator.total * 20;
    const approved = finalScore >= (maxScore * 0.6);
    const notaVigesimal = Math.round((finalScore / maxScore) * 20);
    this.activeSimulator = null;

    // Registrar en estadísticas para el panel administrativo
    const stats = this.getStats();
    if (!stats.simuladoresRealizados) stats.simuladoresRealizados = [];
    stats.simuladoresRealizados.unshift({
      id: Date.now(),
      score: finalScore,
      maxScore: maxScore,
      notaVigesimal: notaVigesimal,
      aprobado: approved,
      fecha: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if (stats.simuladoresRealizados.length > 50) stats.simuladoresRealizados.pop();
    this.saveStats(stats);

    const html = `
      <div class="simulator-result-hero p-4 bg-white rounded-3 border shadow-sm text-center" style="border-top: 5px solid ${approved ? '#16a34a' : '#f59e0b'} !important; border-radius:18px;">
        <div class="result-trophy mb-2"><i class="bi ${approved ? 'bi-award-fill text-success' : 'bi-lightbulb-fill text-warning'}" style="font-size:2.2rem;"></i></div>
        <span class="badge ${approved ? 'bg-success' : 'bg-warning text-dark'} fs-7 mb-2 px-3 py-1" style="border-radius:20px;">
          ${approved ? '¡Aprobado! Excelente Nivel de Admisión' : '¡Buen Intento! Refuerza el Balotario'}
        </span>
        <h3 class="fw-bold mb-1">Puntaje: ${finalScore} / ${maxScore} pts (Nota: ${notaVigesimal} / 20)</h3>
        <p class="small text-muted mb-3">${approved ? 'Tienes una preparación adecuada para el Examen de Admisión 2026 del IESTP Hermanos Cárcamo.' : 'Te sugerimos revisar el balotario oficial o consultar por la Academia CEPRE-HERCAR para asegurar tu vacante directa.'}</p>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard text-success"></i> Ver Balotario & Admisión</button>
          <button class="interactive-btn" data-chat-action="iniciar_simulador_admision"><i class="bi bi-arrow-repeat text-primary"></i> Volver a Practicar</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop text-info"></i> Ver Carreras</button>
        </div>
      </div>
    `;

    if (approved) {
      this.triggerConfetti();
    }

    const simChips = [
      { label: 'Requisitos de Admisión', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?' },
      { label: 'Academia CEPRE-HERCAR', prompt: '¿Cómo funciona la academia CEPRE y el ingreso directo?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];

    this.appendBotMessage(html, `¡Excelente esfuerzo! Has culminado el simulador con ${finalScore} de ${maxScore} puntos. Revisa tu desempeño detallado y recomendaciones de repaso.`, simChips);
  }

  /* ==========================================================================
     BOLSA DE TRABAJO Y CONVENIOS INSTITUCIONALES EN PAITA
     ========================================================================== */

  renderBolsaTrabajo() {
    const conveniosHtml = CONVENIOS_BOLSA_TRABAJO.map(c => `
      <div class="p-3 bg-light rounded-3 border mb-3 small">
        <h6 class="fw-bold text-primary mb-2"><i class="bi bi-buildings-fill me-1"></i> ${c.sector}</h6>
        <div class="mb-2">
          <strong>Empresas e Instituciones con Convenio:</strong>
          <ul class="mb-0 ps-3 mt-1">
            ${c.empresas.map(e => `<li><i class="bi bi-check2 text-success me-1"></i>${e}</li>`).join('')}
          </ul>
        </div>
        <div class="text-muted">
          <strong>Carreras favorecidas:</strong> ${c.carrerasAfines.join(', ')}
        </div>
      </div>
    `).join('');

    const html = `
      <div class="bolsa-trabajo-card p-4 bg-white rounded-3 border shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-success px-3 py-1 fs-7"><i class="bi bi-briefcase-fill me-1"></i>Bolsa Laboral & Prácticas EFSRT</span>
          <span class="badge bg-primary text-white">Paita y Piura</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Convenios y Oportunidades Laborales</h4>
        <p class="small text-muted mb-3">El IESTP Hermanos Cárcamo mantiene alianzas estratégicas con las principales empresas del puerto de Paita y la región Piura para prácticas preprofesionales y bolsa de trabajo:</p>

        <div class="mb-3">${conveniosHtml}</div>

        <div class="p-3 bg-white rounded border small mb-3">
          <strong><i class="bi bi-patch-check-fill text-warning me-1"></i> Certificados Modulares:</strong> Cada módulo formativo que apruebas te otorga un certificado que te permite incorporarte al mercado laboral desde el 2° semestre.
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> 4 Carreras Profesionales</button>
          <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="tramite-certificado-modular"><i class="bi bi-file-earmark-text text-purple"></i> Certificados Modulares</button>
        </div>
      </div>
    `;
    const bolsaChips = [
      { label: 'Ver Carreras de HERCAR', prompt: '¿Cuáles son las 4 carreras que ofrece el instituto?' },
      { label: 'Malla de Computación', prompt: '¿Qué materias o cursos se llevan en Computación e Informática?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    this.appendBotMessage(html, "Contamos con convenios laborales activos con empresas pesqueras, agencias marítimas y aduanas para que realices tus prácticas profesionales en Paita.", bolsaChips);
  }

  /* ==========================================================================
     DISPARADOR DE ACCIONES
     ========================================================================== */

  triggerAction(action, val = null, sourceEl = null) {
    this.currentNeuralThought = this.computeNeuralReasoning((action || '').replace(/_/g, ' ') + ' ' + (val || ''));
    switch (action) {
      case 'abrir_paleta_comandos':
        this.openCommandPalette();
        break;
      case 'iniciar_mini_tour':
        if (this.tourGuide) {
          this.tourGuide.start();
        }
        break;
      case 'abrir_generador_fut':
        this.openFutModal(val);
        break;
      case 'ver_todas_carreras':
        this.renderCarrerasList();
        this.logQuery('carreras');
        break;
      case 'ver_carrera_detalle':
        const cDet = CARRERAS_COMPLETAS.find(c => c.id === (val === "ci" ? "apsti" : val));
        if (cDet) {
          this.renderCarreraCompleta(cDet);
          this.logQuery('carreras', cDet.id);
        }
        break;
      case 'ver_malla_carrera':
        const cMalla = CARRERAS_COMPLETAS.find(c => c.id === (val === "ci" ? "apsti" : val));
        if (cMalla) {
          this.renderMallaCurricular(cMalla);
          this.logQuery('carreras', cMalla.id);
        }
        break;
      case 'ver_admision_completa':
        this.renderAdmisionInfo();
        this.logQuery('admision');
        break;
      case 'ver_guia_pagos':
        this.renderGuiaPagos();
        this.logQuery('pagos');
        break;
      case 'ver_tramites_tupa':
        this.renderTramitesList('todos', false);
        this.logQuery('tramites');
        break;
      case 'filtrar_tupa_cat':
        this.renderTramitesList(val || 'todos', false);
        this.logQuery('tramites');
        break;
      case 'ver_tupa_compendio':
        this.renderTramitesList('todos', true);
        this.logQuery('tramites');
        break;
      case 'ver_tramite_especifico':
        const tramite = GUIA_TRAMITES_TUPA.find(t => t.id === val);
        if (tramite) {
          this.renderTramiteDetalle(tramite);
          this.logQuery('tramites');
        }
        break;
      case 'ver_contacto_ubicacion':
        this.renderContactoUbicacion();
        this.logQuery('contacto');
        break;
      case 'ver_comunicados_oficiales':
        this.renderComunicadosList();
        this.logQuery('comunicados');
        break;
      case 'ver_matricula_paso_a_paso':
        this.renderMatriculaPasoAPaso();
        this.logQuery('pagos');
        break;
      case 'ver_curso_ingles':
        this.renderCursoIngles();
        this.logQuery('ingles');
        break;
      case 'iniciar_test_vocacional':
        this.startVocationalTest();
        this.logQuery('test_vocacional');
        break;
      case 'responder_pregunta_test':
        this.handleTestResponse(val, sourceEl);
        break;
      case 'cancelar_test_vocacional':
        this.handleTestResponse('salir', null, 'salir');
        break;
      case 'leer_pregunta_test_actual':
        this.readCurrentVocationalQuestionFull();
        break;
      case 'iniciar_simulador_admision':
        this.startAdmissionSimulator();
        this.logQuery('admision');
        break;
      case 'responder_pregunta_simulador':
        this.handleSimulatorResponse(val);
        break;
      case 'ver_bolsa_trabajo':
        this.renderBolsaTrabajo();
        this.logQuery('bolsa_trabajo');
        break;
      case 'ver_autoridades':
        this.renderAutoridades();
        this.logQuery('institucional');
        break;
      case 'ver_historia_mision':
        this.renderHistoriaMision();
        this.logQuery('institucional');
        break;
      case 'ver_turnos_horarios':
        this.renderTurnosHorarios();
        this.logQuery('academico');
        break;
      case 'ver_reglamento':
        this.renderReglamento();
        this.logQuery('academico');
        break;
      case 'ver_convalidaciones':
        this.renderConvalidaciones();
        this.logQuery('tramites');
        break;
      case 'ver_bienestar':
        this.renderBienestar();
        this.logQuery('bienestar');
        break;
      case 'ver_calculadora_dpi':
        this.renderCalculadoraDpi(val || 4);
        this.logQuery('academico');
        break;
      case 'calcular_dpi_horas':
        this.renderCalculadoraDpi(val || 4);
        this.logQuery('academico');
        break;
      case 'ver_comparador_carreras':
        this.renderComparadorCarreras();
        this.logQuery('carreras');
        break;
      case 'ver_titulacion_efsrt':
        this.renderGuiaTitulacionEfsrt();
        this.logQuery('titulacion');
        break;
      case 'ver_sueldos_campo':
        this.renderSueldosYCampo();
        this.logQuery('carreras');
        break;
      case 'ver_recuperar_accesos':
        this.renderRecuperarAccesos();
        this.logQuery('plataformas');
        break;
      case 'ver_justificar_faltas':
        this.renderJustificarFaltas();
        this.logQuery('academico');
        break;
      case 'ver_calculadora_notas':
        this.renderCalculadoraNotas();
        this.logQuery('academico');
        break;
      case 'calcular_nota_preset':
        if (val) {
          const parts = val.split('_');
          this.renderCalculadoraNotas(parts[0], parts[1]);
        } else {
          this.renderCalculadoraNotas();
        }
        this.logQuery('academico');
        break;
      case 'ver_cotizador_tupa':
        this.renderCotizadorTupa();
        this.logQuery('pagos');
        break;
      case 'toggle_cotizador_tupa':
        // Toggle item selection
        if (!this._selectedCotizador) {
          this._selectedCotizador = ['tupa-matricula', 'tupa-carne'];
        }
        if (this._selectedCotizador.includes(val)) {
          this._selectedCotizador = this._selectedCotizador.filter(id => id !== val);
        } else {
          this._selectedCotizador.push(val);
        }
        this.renderCotizadorTupa(this._selectedCotizador);
        this.logQuery('pagos');
        break;
      case 'ver_mapa_campus':
        this.renderMapaCampusAmbientes();
        this.logQuery('contacto');
        break;
      case 'ver_calendario_2026':
        this.renderCalendarioAcademicoDetallado();
        this.logQuery('academico');
        break;
      case 'ver_metodos_pago_digitales':
        this.renderMetodosPagoDigitales();
        this.logQuery('pagos');
        break;
      case 'ver_numero_cuenta_bn':
        this.renderNumeroCuentaBancaria();
        this.logQuery('pagos');
        break;
      case 'copiar_cuenta_bn':
        this.copyData('00-638-002361', 'Cuenta Principal BN');
        break;
      case 'copiar_cuenta_ingles_bn':
        this.copyData('00-638-025736', 'Cuenta Curso de Inglés BN');
        break;
      case 'copiar_cci_bn':
        this.copyData('00-638-002361', 'Cuenta Principal BN');
        break;
      case 'ver_plana_docente':
        this.renderPlanaDocente(val);
        this.logQuery('institucional');
        break;
      case 'ver_modulos_carrera':
        this.renderModulosFormativos(val);
        this.logQuery('carreras');
        break;
      case 'ver_code_estudiantil':
        this.renderComiteDefensaEstudiante();
        this.logQuery('bienestar');
        break;
      case 'cambiar_foto_campus':
        this.switchCampusBannerPhoto(val, sourceEl, true);
        break;
      case 'prev_foto_campus':
        this.stepCampusBannerPhoto(-1);
        break;
      case 'next_foto_campus':
        this.stepCampusBannerPhoto(1);
        break;
    }
  }

  readCurrentVocationalQuestionFull() {
    if (!this.activeTest || !this.activeTest.questions) return;
    const qIndex = this.activeTest.step;
    const q = this.activeTest.questions[qIndex];
    if (!q) return;
    if (this.isMuted) {
      this.isMuted = false;
      this.syncMuteButtonsUI();
    }
    const optsSpoken = (q.opts || []).map((o, i) => `Alternativa ${String.fromCharCode(65 + i)}: ${o.t}`).join('. ');
    this.speak(`Pregunta ${qIndex + 1}. ${q.q}. ${optsSpoken}`);
  }

  getCampusGalleryPhotos() {
    return [
      {
        src: 'assets/img/fachada-2026.webp',
        short: 'Fachada',
        pos: 'center 48%',
        title: 'Fachada Institucional 2026',
        caption: 'Ingreso principal azul y blanco del IESTP Hermanos Cárcamo',
        alt: 'Fachada principal del IESTP Hermanos Cárcamo con ingreso azul y blanco en Paita'
      },
      {
        src: 'assets/img/patio-2026.webp',
        short: 'Patio',
        pos: 'center 52%',
        title: 'Espacios para Aprender',
        caption: 'Patio central y pabellones académicos en Paita Alta',
        alt: 'Vista del patio y pabellones del instituto IESTP Hermanos Cárcamo'
      },
      {
        src: 'assets/img/comunidad-2026.webp',
        short: 'Comunidad',
        pos: 'center 24%',
        title: 'Nuestra Comunidad Docente',
        caption: 'Docentes y autoridades en actividad oficial institucional',
        alt: 'Docentes y autoridades durante una actividad institucional'
      },
      {
        src: 'assets/img/titulacion-2026.webp',
        short: 'Titulación',
        pos: 'center 22%',
        title: 'Ceremonia de Titulación',
        caption: 'Egresados titulados a Nombre de la Nación con certificación oficial',
        alt: 'Graduados con sus diplomas y docentes en ceremonia de titulación'
      },
      {
        src: 'assets/img/embarcacion-2026.webp',
        short: 'Embarcación',
        pos: 'center 52%',
        title: 'Vinculación con el Mar',
        caption: 'Embarcación rotulada Hermanos Cárcamo para prácticas pesqueras',
        alt: 'Embarcación rotulada Hermanos Cárcamo situada en astillero de Paita'
      },
      {
        src: 'assets/img/movilidad-2026.webp',
        short: 'Movilidad',
        pos: 'center 56%',
        title: 'Nuestra Región Piura',
        caption: 'Movilidad institucional al servicio de los estudiantes de Paita',
        alt: 'Autobús amarillo y azul identificado con el Gobierno Regional de Piura'
      }
    ];
  }

  stepCampusBannerPhoto(delta = 1) {
    const total = this.getCampusGalleryPhotos().length;
    const nextIdx = (this.campusCarouselIdx + delta + total) % total;
    this.switchCampusBannerPhoto(nextIdx, null, true);
  }

  switchCampusBannerPhoto(val, sourceEl = null, resetTimer = false) {
    const photos = this.getCampusGalleryPhotos();
    const idx = Math.max(0, Math.min(photos.length - 1, parseInt(val, 10) || 0));
    this.campusCarouselIdx = idx;
    const item = photos[idx];
    if (!item) return;

    const imgEl = document.getElementById('campusBannerHeroImg');
    const labelEl = document.getElementById('campusBannerLabel');
    const captionEl = document.getElementById('campusBannerCaption');
    const counterEl = document.getElementById('campusBannerCounter');
    const barEl = document.getElementById('campusCarouselBar');

    if (imgEl) {
      imgEl.classList.add('is-switching');
      setTimeout(() => {
        imgEl.src = item.src;
        imgEl.alt = item.alt;
        imgEl.style.objectPosition = item.pos || 'center 42%';
        imgEl.classList.remove('is-switching');
      }, 170);
    }
    if (labelEl) labelEl.textContent = item.title;
    if (captionEl) captionEl.textContent = `${item.caption} · Av. Miguel Grau Mz. A Lt. 01 – Paita`;
    if (counterEl) counterEl.textContent = `${idx + 1} / ${photos.length}`;

    if (barEl) {
      barEl.classList.remove('is-running');
      void barEl.offsetWidth;
      barEl.classList.add('is-running');
    }

    document.querySelectorAll('.campus-thumb-btn').forEach((btn, i) => {
      const isActive = sourceEl ? btn === sourceEl : i === idx;
      btn.classList.toggle('active', isActive);
    });

    if (resetTimer) {
      this.startCampusCarousel();
    }
  }

  startCampusCarousel() {
    this.stopCampusCarousel();
    const card = document.getElementById('welcomeCampusCard');
    const barEl = document.getElementById('campusCarouselBar');
    if (barEl) {
      barEl.classList.remove('is-running');
      void barEl.offsetWidth;
      barEl.classList.add('is-running');
    }
    if (card && !card.dataset.hoverBound) {
      card.dataset.hoverBound = '1';
      card.addEventListener('mouseenter', () => { this._carouselPaused = true; });
      card.addEventListener('mouseleave', () => { this._carouselPaused = false; });
    }
    this._carouselPaused = false;
    this.campusCarouselTimer = setInterval(() => {
      if (this._carouselPaused) return;
      if (!document.getElementById('campusBannerHeroImg')) {
        this.stopCampusCarousel();
        return;
      }
      this.stepCampusBannerPhoto(1);
    }, 4500);
  }

  stopCampusCarousel() {
    if (this.campusCarouselTimer) {
      clearInterval(this.campusCarouselTimer);
      this.campusCarouselTimer = null;
    }
  }

  renderFallback(query) {
    // Detectar palabras clave para sugerencias contextuales
    const q = (query || '').toLowerCase();
    let sugerencia = '';
    if (q.includes('costo') || q.includes('gratis') || q.includes('pago') || q.includes('banco')) {
      sugerencia = `
        <div class="fallback-notice-box p-2 px-3 rounded-3 mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-lightbulb-fill text-success fs-5"></i>
          <span class="small"><strong>Tip:</strong> Puedes consultar: <em>"¿Cómo pagar en el Banco de la Nación?"</em> o <em>"Requisitos de matrícula"</em>.</span>
        </div>
      `;
    } else if (q.includes('carr') || q.includes('estud') || q.includes('cursar') || q.includes('aprender')) {
      sugerencia = `
        <div class="fallback-notice-box p-2 px-3 rounded-3 mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-lightbulb-fill text-primary fs-5"></i>
          <span class="small"><strong>Tip:</strong> Prueba preguntando: <em>"¿Cuáles son las 4 carreras técnicas?"</em> o <em>"Malla de Computación e Informática"</em>.</span>
        </div>
      `;
    } else if (q.includes('titulo') || q.includes('cert') || q.includes('egre') || q.includes('gradu')) {
      sugerencia = `
        <div class="fallback-notice-box p-2 px-3 rounded-3 mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-lightbulb-fill text-warning fs-5"></i>
          <span class="small"><strong>Tip:</strong> Prueba: <em>"Requisitos para titulación profesional"</em> o <em>"Certificados modulares"</em>.</span>
        </div>
      `;
    }

    const encodedQuery = encodeURIComponent(`Hola Secretaría IESTP Hermanos Cárcamo, realicé esta consulta en el chat bot y requiero orientación: "${query}"`);

    const html = `
      <div class="fallback-help-card">
        <div class="d-flex align-items-center gap-3 mb-3">
          <div class="fallback-icon-box">
            <i class="bi bi-question-diamond-fill text-warning fs-4"></i>
          </div>
          <div>
            <h6 class="fw-bold mb-0">No tengo del todo clara tu consulta 🤔</h6>
            <small class="text-muted">Aún no dispongo de una respuesta exacta para esta pregunta en mi base oficial.</small>
          </div>
        </div>

        <div class="fallback-notice-box p-2 px-3 rounded-3 mb-3 d-flex align-items-start gap-2">
          <i class="bi bi-info-circle-fill text-primary mt-1"></i>
          <small class="lh-sm">
            <strong>Buzón de Mejora Activo:</strong> Tu pregunta fue anotada automáticamente en el buzón institucional para que el equipo administrativo actualice la respuesta.
          </small>
        </div>

        ${sugerencia}

        <p class="small mb-2 fw-semibold">Puedes reformular tu pregunta o elegir una de nuestras secciones oficiales:</p>

        <div class="interactive-button-grid mb-3">
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-laptop text-primary"></i> 4 Carreras Técnicas</button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard text-success"></i> Admisión 2026</button>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Guía de Pagos BN</button>
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa"><i class="bi bi-file-earmark-text text-info"></i> Trámites TUPA</button>
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional"><i class="bi bi-compass-fill text-danger"></i> Test Vocacional IA</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt-fill text-danger"></i> Secretaría y Horarios</button>
        </div>

        <div class="fallback-support-box p-3 rounded-3 text-center border">
          <p class="small text-muted mb-2"><i class="bi bi-headset me-1 text-primary"></i>¿Necesitas atención personalizada inmediata?</p>
          <div class="d-flex flex-wrap gap-2 justify-content-center">
            <a href="https://wa.me/51969100257?text=${encodedQuery}" target="_blank" rel="noopener" class="btn btn-sm btn-success fw-bold px-3 rounded-pill d-inline-flex align-items-center gap-1">
              <i class="bi bi-whatsapp"></i> WhatsApp Secretaría (+51 969 100 257)
            </a>
            <a href="mailto:mesadepartes@ieshercar.edu.pe?subject=Consulta%20Institucional&body=${encodeURIComponent(query)}" class="btn btn-sm btn-outline-primary fw-semibold px-3 rounded-pill d-inline-flex align-items-center gap-1">
              <i class="bi bi-envelope-fill"></i> Mesa de Partes Virtual
            </a>
          </div>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Disculpa, no encontré una respuesta exacta para esa pregunta, pero la he anotado en nuestro buzón de sugerencias institucional. Además, puedes consultar directamente con secretaría por WhatsApp.");
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }

  formatMarkdown(txt) {
    if (!txt) return '';
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }
}

/* ==========================================================================
   MINI-TOUR GUIADO INTERACTIVO CON VOZ FEMENINA (HERCARBOT IA)
   ========================================================================== */

class HercarTourGuide {
  constructor(app) {
    this.app = app;
    this.currentStep = 0;
    this.isPlaying = false;
    this.overlay = null;
    this.card = null;
    this.fab = null;
    this.steps = [
      {
        selector: '.welcome-campus-card, .bot-welcome-hero, main h1',
        title: '🏛️ ¡Bienvenido a HercarBot IA!',
        desc: 'Soy la asistente virtual oficial del Instituto Superior Hermanos Cárcamo de Paita. Te guiaré en 30 segundos por todas mis funciones.',
        voice: '¡Hola! Te doy una cordial bienvenida a HercarBot, la asistente virtual oficial del Instituto Superior Hermanos Cárcamo de Paita. Te mostraré rápidamente las funciones principales de nuestra plataforma.'
      },
      {
        selector: '.features-pill-grid, .cards-grid',
        title: '🚀 12 Herramientas Inteligentes',
        desc: 'Consulta las 4 carreras profesionales, usa el Simulador de Admisión 2026, el Test Vocacional IA, el Cotizador TUPA o las Calculadoras de Notas y Faltas (DPI 30%) con un solo toque.',
        voice: 'En este panel central tienes doce herramientas interactivas: puedes consultar nuestras cuatro carreras profesionales, simular tu examen de admisión, rendir tu test vocacional o calcular tus notas y faltas permitidas.'
      },
      {
        selector: '.header-portals, .header-quick-portals, .chat-top-header',
        title: '🌐 Portales Oficiales Directos',
        desc: 'En la barra superior tienes acceso directo al Sistema Académico, Portal de Pagos, Aula Virtual, Bolsa Laboral, Mesa de Partes y Generador de FUT.',
        voice: 'En la parte superior puedes abrir con un solo toque nuestros portales oficiales: el Sistema Académico, Registro de Pagos, Aula Virtual, Bolsa Laboral, y generar tu Formato Único de Trámite para Mesa de Partes.'
      },
      {
        selector: '.header-controls, .control-btn',
        title: '🎙️ Voz y Personalización',
        desc: 'Aquí arriba puedes activar o silenciar mi voz, cambiar al Modo Oscuro, alternar al Modo Burbuja Web flotante o descargar tu conversación.',
        voice: 'En los botones de la esquina superior derecha puedes personalizar mi voz, cambiar a modo oscuro, probar la vista flotante sobre la web oficial o descargar el historial de tus consultas.'
      },
      {
        selector: '.chat-input-container, .input-box-wrapper, form',
        title: '🎙️ Pregunta por Texto, Voz o Imagen',
        desc: 'Escribe cualquier duda, usa el micrófono para hablarme directamente o adjunta una captura de tu voucher o trámite.',
        voice: 'Finalmente, en la barra inferior puedes escribirme lo que desees o presionar el micrófono para hablar conmigo en tiempo real. ¡Estoy lista para apoyarte en lo que necesites!'
      }
    ];
    this.initUI();
  }

  initUI() {
    // Permitir cerrar el tour con la tecla Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isPlaying) {
        this.end();
      }
    });
  }

  speakFemale(text) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      this.app.speak(text);
    } catch (e) {}
  }

  start() {
    this.end(); // Limpiar cualquier estado anterior
    this.currentStep = 0;
    this.isPlaying = true;

    this.overlay = document.createElement('div');
    this.overlay.className = 'hercar-tour-overlay active';
    this.overlay.onclick = () => this.end();

    this.card = document.createElement('div');
    this.card.className = 'hercar-tour-card active';

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.card);
    this.showStep();
  }

  showStep() {
    document.querySelectorAll('.hercar-tour-highlight').forEach(el => el.classList.remove('hercar-tour-highlight'));
    const step = this.steps[this.currentStep];
    const target = document.querySelector(step.selector);

    this.card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
        <span class="hercar-tour-step-badge">Paso ${this.currentStep + 1} de ${this.steps.length} • 🔊 Voz Activa</span>
        <button id="tourCloseIconBtn" style="background:none; border:none; font-size:1.4rem; line-height:1; color:#94a3b8; cursor:pointer; padding:0 4px;" title="Cerrar tour">&times;</button>
      </div>
      <h4 class="hercar-tour-title">${step.title}</h4>
      <p class="hercar-tour-desc">${step.desc}</p>
      <div class="hercar-tour-actions">
        <button class="hercar-tour-btn skip" id="tourSkipBtn">Saltar tour</button>
        <div style="display:flex; gap:6px;">
          ${this.currentStep > 0 ? '<button class="hercar-tour-btn skip" id="tourPrevBtn">⬅ Atrás</button>' : ''}
          <button class="hercar-tour-btn next" id="tourNextBtn">
            ${this.currentStep === this.steps.length - 1 ? '¡Empezar ahora! 🚀' : 'Siguiente ➡'}
          </button>
        </div>
      </div>
    `;

    const closeIcon = document.getElementById('tourCloseIconBtn');
    if (closeIcon) closeIcon.onclick = () => this.end();

    if (target) {
      target.classList.add('hercar-tour-highlight');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const rect = target.getBoundingClientRect();
      const cardHeight = 220;
      const topPos = (rect.bottom + 14 + cardHeight < window.innerHeight) 
        ? rect.bottom + 14 
        : Math.max(16, rect.top - cardHeight);
      const cardWidth = Math.min(380, window.innerWidth * 0.92);
      const leftPos = Math.min(Math.max(12, rect.left), window.innerWidth - cardWidth - 12);
      this.card.style.top = `${topPos}px`;
      this.card.style.left = `${leftPos}px`;
      this.card.style.transform = 'none';
    } else {
      this.card.style.top = '50%';
      this.card.style.left = '50%';
      this.card.style.transform = 'translate(-50%, -50%)';
    }

    this.speakFemale(step.voice);

    document.getElementById('tourSkipBtn').onclick = () => this.end();
    const prevBtn = document.getElementById('tourPrevBtn');
    if (prevBtn) prevBtn.onclick = () => { this.currentStep--; this.showStep(); };
    document.getElementById('tourNextBtn').onclick = () => {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.showStep();
      } else {
        this.end();
      }
    };
  }

  end() {
    this.isPlaying = false;
    try { window.speechSynthesis?.cancel(); } catch (e) {}
    if (this.overlay) {
      try { this.overlay.remove(); } catch(e) {}
      this.overlay = null;
    }
    if (this.card) {
      try { this.card.remove(); } catch(e) {}
      this.card = null;
    }
    document.querySelectorAll('.hercar-tour-highlight').forEach(el => el.classList.remove('hercar-tour-highlight'));
    localStorage.setItem('hercar_tour_seen_2026', 'true');
  }
}

// Instancia global accesible
let hercarBotApp;
document.addEventListener('DOMContentLoaded', () => {
  hercarBotApp = new HercarBotApp();
  window.hercarBotApp = hercarBotApp;
});
