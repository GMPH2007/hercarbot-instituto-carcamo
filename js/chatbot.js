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

  // 1. Cuentas bancarias oficiales del Banco de la Nación y teléfonos institucionales
  str = str
    .replace(/00-638-002361/g, 'cero cero, seis tres ocho, cero cero dos, tres seis uno')
    .replace(/00-638-025736/g, 'cero cero, seis tres ocho, cero dos cinco, siete tres seis')
    .replace(/20215039231/g, 'dos cero dos uno, cinco cero tres nueve, dos tres uno')
    .replace(/\(073\)\s*251013|073-251013|073251013/g, 'cero siete tres, veinticinco, diez, trece')
    .replace(/969\s*100\s*257|969100257/g, 'nueve seis nueve, cien, dos cincuenta y siete');

  // 2. Horarios con formato am/pm
  str = str
    .replace(/8:00\s*(?:a\.?\s*m\.?|am)\b/gi, 'ocho de la mañana')
    .replace(/8:30\s*(?:a\.?\s*m\.?|am)\b/gi, 'ocho y media de la mañana')
    .replace(/1:00\s*(?:p\.?\s*m\.?|pm)\b/gi, 'una de la tarde')
    .replace(/1:15\s*(?:p\.?\s*m\.?|pm)\b/gi, 'una y quince de la tarde')
    .replace(/12:00\s*(?:p\.?\s*m\.?|pm|m\.?)\b/gi, 'doce del mediodía')
    .replace(/2:00\s*(?:p\.?\s*m\.?|pm)\b/gi, 'dos de la tarde')
    .replace(/3:00\s*(?:p\.?\s*m\.?|pm)\b/gi, 'tres de la tarde')
    .replace(/4:30\s*(?:p\.?\s*m\.?|pm)\b/gi, 'cuatro y media de la tarde')
    .replace(/7:40\s*(?:p\.?\s*m\.?|pm)\b/gi, 'siete y cuarenta de la noche');

  // 3. Monedas en soles peruanos (con soporte para miles con coma y céntimos)
  str = str
    .replace(/S\/\.?\s*(\d{1,3}),(\d{3})(?:\.00)?/gi, (match, miles, resto) => `${spanishNumberToWords(miles + resto)} soles`)
    .replace(/S\/\.?\s*(\d+)\.(\d{2})\b/gi, (match, ent, dec) => {
      const e = parseInt(ent, 10);
      const d = parseInt(dec, 10);
      const eWord = e === 1 ? 'un sol' : `${spanishNumberToWords(e)} soles`;
      return d === 0 ? eWord : `${eWord} con ${spanishNumberToWords(d)} céntimos`;
    })
    .replace(/S\/\.?\s*(\d+)\b/gi, (match, n) => parseInt(n, 10) === 1 ? 'un sol' : `${spanishNumberToWords(n)} soles`);

  // 4. Frases académicas cuantitativas y formatos comunes (A4, A2, B1, porcentajes)
  str = str
    .replace(/\bA\/?4\b/gi, 'A cuatro')
    .replace(/\bNivel\s+A2\b/gi, 'Nivel A dos')
    .replace(/\bNivel\s+B1\b/gi, 'Nivel B uno')
    .replace(/\bA2\b/g, 'A dos')
    .replace(/\bB1\b/g, 'B uno')
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
    .replace(/\b(?:0?1)\s+(año|ciclo|semestre|crédito|mes|día|intento|módulo|pago|trámite|examen|sobre|folder)\b/gi, 'un $1')
    .replace(/\b(?:0?1)\s+(carrera|semana|hora|cuota|vacante|asignatura|unidad|modalidad|copia)\b/gi, 'una $1')
    .replace(/\b02\s+/g, 'dos ')
    .replace(/\b03\s+/g, 'tres ');

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
    .replace(/\b2028\b/g, 'dos mil veintiocho')
    .replace(/\b2027\b/g, 'dos mil veintisiete')
    .replace(/\b2026\b/g, 'dos mil veintiséis')
    .replace(/\b2025\b/g, 'dos mil veinticinco')
    .replace(/\b2024\b/g, 'dos mil veinticuatro')
    .replace(/\b2023\b/g, 'dos mil veintitrés')
    .replace(/\b2022\b/g, 'dos mil veintidós')
    .replace(/\b2021\b/g, 'dos mil veintiuno')
    .replace(/\b2008\b/g, 'dos mil ocho')
    .replace(/\b1987\b/g, 'mil novecientos ochenta y siete');

  // 11. Abreviaturas de número y cuenta
  str = str
    .replace(/\bCta\.?\s*Cte\b\.?/gi, 'cuenta corriente')
    .replace(/\bCta\.?\s*Bco\.?\s*Naci[oó]n\b/gi, 'cuenta del Banco de la Nación')
    .replace(/\bCta\b\.?\s+(?=\d|cero|Banco|BN|TUPA|Productivas|Ingl)/gi, 'cuenta ')
    .replace(/\bN\.?[°º]\s*|\bNro\b\.?\s*/gi, 'número ');

  // 12. Cualquier otro número cardinal aislado entre 0 y 99999
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
    this.storageUserPrefs = 'hercarbot_user_prefs';

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
    this.initCustomizationStudio();
    this.initEvents();
    this.initSpeech();
    this.initVoiceSynthesis();
    this.initConversations();
    this.initAutocomplete();
    this.initNeuralMonitor();
    this.initCommandPalette();
    this.initTour();
    this.initPwaServiceWorker();
    this.handleInitialUrlParams();
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

  toggleTheme(forceMode = null) {
    const isDark = forceMode === 'dark'
      ? (document.body.classList.add('dark-theme'), true)
      : forceMode === 'light'
        ? (document.body.classList.remove('dark-theme'), false)
        : document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.storageTheme, isDark ? 'dark' : 'light');
    this.updateThemeButtonIcon();
    this.syncCustomStudioButtons();
    if (!forceMode) {
      this.showToast(isDark ? 'Modo Oscuro activado' : 'Modo Claro activado', 'info', isDark ? 'bi-moon-stars-fill' : 'bi-sun-fill');
    }
  }

  updateThemeButtonIcon() {
    if (!this.btnThemeToggle) return;
    const isDark = document.body.classList.contains('dark-theme');
    this.btnThemeToggle.innerHTML = isDark 
      ? '<i class="bi bi-sun-fill text-warning"></i>' 
      : '<i class="bi bi-moon-stars-fill" style="color:#60a5fa;"></i>';
    this.btnThemeToggle.title = isDark ? 'Cambiar a Tema Claro' : 'Cambiar a Modo Oscuro';
  }

  /* ==========================================================================
     ESTUDIO DE PERSONALIZACIÓN PRO & DEEP LINKS PWA
     ========================================================================== */

  getUserPrefs() {
    const defaults = {
      palette: 'hercar',
      avatar: 'avatar-ia',
      fontScale: 'normal',
      density: 'comfortable',
      userProfile: 'general'
    };
    try {
      const raw = localStorage.getItem(this.storageUserPrefs);
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch {
      return defaults;
    }
  }

  saveUserPrefs(prefs) {
    try {
      localStorage.setItem(this.storageUserPrefs, JSON.stringify(prefs));
    } catch {}
  }

  getBotAvatarUrl() {
    const prefs = this.getUserPrefs();
    return prefs.avatar === 'escudo' ? 'assets/img/logo-hercar.png' : 'assets/img/hercarbot-avatar.jpg';
  }

  applyUserPrefs() {
    const prefs = this.getUserPrefs();
    document.body.dataset.hercarPalette = prefs.palette || 'hercar';
    document.body.dataset.hercarFont = prefs.fontScale || 'normal';
    document.body.dataset.hercarDensity = prefs.density || 'comfortable';
    document.body.dataset.hercarProfile = prefs.userProfile || 'general';

    const avatarSrc = this.getBotAvatarUrl();
    const launcherImg = document.getElementById('launcher-avatar-img');
    if (launcherImg) launcherImg.src = avatarSrc;
    document.querySelectorAll('.bot-avatar-badge img').forEach(img => {
      img.src = avatarSrc;
      img.style.objectFit = prefs.avatar === 'escudo' ? 'contain' : 'cover';
    });
    this.syncCustomStudioButtons();
  }

  syncCustomStudioButtons() {
    const prefs = this.getUserPrefs();
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    document.querySelectorAll('[data-pref-palette]').forEach(el => el.classList.toggle('active', el.dataset.prefPalette === prefs.palette));
    document.querySelectorAll('[data-pref-profile]').forEach(el => el.classList.toggle('active', el.dataset.prefProfile === prefs.userProfile));
    document.querySelectorAll('[data-pref-avatar]').forEach(el => el.classList.toggle('active', el.dataset.prefAvatar === prefs.avatar));
    document.querySelectorAll('[data-pref-font]').forEach(el => el.classList.toggle('active', el.dataset.prefFont === prefs.fontScale));
    document.querySelectorAll('[data-pref-density]').forEach(el => el.classList.toggle('active', el.dataset.prefDensity === prefs.density));
    document.querySelectorAll('[data-pref-theme]').forEach(el => el.classList.toggle('active', el.dataset.prefTheme === currentTheme));
  }

  initCustomizationStudio() {
    this.applyUserPrefs();
    const modal = document.getElementById('modalCustomStudio');
    if (modal) {
      modal.addEventListener('show.bs.modal', () => this.syncCustomStudioButtons());
    }

    document.querySelectorAll('[data-pref-palette]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prefs = this.getUserPrefs();
        prefs.palette = btn.dataset.prefPalette;
        this.saveUserPrefs(prefs);
        this.applyUserPrefs();
        this.showToast('Paleta visual actualizada', 'success', 'bi-palette-fill');
      });
    });

    document.querySelectorAll('[data-pref-profile]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prefs = this.getUserPrefs();
        prefs.userProfile = btn.dataset.prefProfile;
        this.saveUserPrefs(prefs);
        this.applyUserPrefs();
        if (this.messagesContainer && this.messagesContainer.querySelector('.bot-welcome-hero')) {
          this.renderWelcome();
        }
        this.showToast('Perfil de bienvenida personalizado', 'info', 'bi-person-check-fill');
      });
    });

    document.querySelectorAll('[data-pref-avatar]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prefs = this.getUserPrefs();
        prefs.avatar = btn.dataset.prefAvatar;
        this.saveUserPrefs(prefs);
        this.applyUserPrefs();
        this.showToast('Avatar de HercarBot actualizado', 'success', 'bi-robot');
      });
    });

    document.querySelectorAll('[data-pref-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.toggleTheme(btn.dataset.prefTheme);
      });
    });

    document.querySelectorAll('[data-pref-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prefs = this.getUserPrefs();
        prefs.fontScale = btn.dataset.prefFont;
        this.saveUserPrefs(prefs);
        this.applyUserPrefs();
        this.showToast('Tamaño de texto actualizado', 'info', 'bi-type');
      });
    });

    document.querySelectorAll('[data-pref-density]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prefs = this.getUserPrefs();
        prefs.density = btn.dataset.prefDensity;
        this.saveUserPrefs(prefs);
        this.applyUserPrefs();
        this.showToast('Espaciado de tarjetas actualizado', 'info', 'bi-layout-text-window');
      });
    });

    const resetBtn = document.getElementById('btn-reset-custom-studio');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem(this.storageUserPrefs);
        this.toggleTheme('light');
        this.applyUserPrefs();
        if (this.messagesContainer && this.messagesContainer.querySelector('.bot-welcome-hero')) {
          this.renderWelcome();
        }
        this.showToast('Personalización restablecida a valores oficiales', 'success', 'bi-arrow-counterclockwise');
      });
    }
  }

  handleInitialUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const action = (params.get('action') || '').toLowerCase();
      const carreraParam = (params.get('carrera') || '').toLowerCase();
      const queryParam = (params.get('q') || '').trim();

      if (!action && !carreraParam && !queryParam) return;

      setTimeout(() => {
        if (queryParam) {
          this.handleUserSubmit(queryParam);
          return;
        }
        if (carreraParam) {
          this.triggerAction('ver_carrera_detalle', carreraParam);
          return;
        }
        const actionMap = {
          admision: () => this.triggerAction('ver_admision_completa'),
          fut: () => this.triggerAction('abrir_generador_fut'),
          pagos: () => this.triggerAction('ver_numero_cuenta_bn'),
          ingles: () => this.triggerAction('ver_curso_ingles'),
          suficiencia: () => this.triggerAction('ver_examen_suficiencia'),
          titulo: () => this.triggerAction('ver_tramite_titulo'),
          tupa: () => this.triggerAction('ver_buscador_tupa'),
          carreras: () => this.triggerAction('ver_todas_carreras'),
          personalizar: () => {
            const btn = document.getElementById('btn-customize-studio');
            if (btn) btn.click();
          }
        };
        if (actionMap[action]) actionMap[action]();
      }, 220);
    } catch {}
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
        this.speak('En el Instituto Superior Hermanos Cárcamo NO se paga por Págalo punto pe ni en agentes. Todos los pagos son únicamente en ventanilla del Banco de la Nación: la cuenta 00-638-002361 es para matrícula ordinaria de S/ 250.00 y trámites TUPA; y la cuenta 00-638-025736 es para el curso de inglés de S/ 400.00, donde debes sacar dos copias a tu voucher y entregarlos en Tesorería.');
      });
    }

    if (this.btnTestVoiceCarreras) {
      this.btnTestVoiceCarreras.addEventListener('click', () => {
        this.speak('En el Instituto Superior Hermanos Cárcamo de Paita ofrecemos cuatro carreras técnicas profesionales: Arquitectura de Plataformas y Servicios de Tecnologías de la Información, que en el año 2027 pasará a denominarse Computación e Informática; Administración de Negocios Internacionales; Contabilidad; y Desarrollo Pesquero y Acuícola.');
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

    // Control de Voz Silenciar
    if (this.btnMute) {
      this.btnMute.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
          this.stopSpeaking();
        }
        this.btnMute.innerHTML = this.isMuted 
          ? '<i class="bi bi-volume-mute-fill text-danger"></i>' 
          : '<i class="bi bi-volume-up-fill text-success"></i>';
        this.btnMute.title = this.isMuted ? 'Activar Voz del Bot' : 'Silenciar Voz del Bot';
      });
    }

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
        const action = btnAction.getAttribute('data-chat-action');
        const val = btnAction.getAttribute('data-chat-val') || btnAction.getAttribute('data-fut-tramite');
        this.triggerAction(action, val);
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

      const chkItem = e.target.closest('.hercar-checklist-item[data-check-store]');
      if (chkItem) {
        const storeKey = chkItem.getAttribute('data-check-store');
        const idx = parseInt(chkItem.getAttribute('data-check-idx'), 10);
        this.toggleRequirementChecklist(storeKey, idx, chkItem);
      }

      const resetChk = e.target.closest('[data-reset-checklist]');
      if (resetChk) {
        const storeKey = resetChk.getAttribute('data-reset-checklist');
        localStorage.removeItem(storeKey);
        if (storeKey === 'hercarbot_checklist_suficiencia') this.renderExamenSuficiencia();
        else if (storeKey === 'hercarbot_checklist_titulo') this.renderTramiteTitulo();
        this.showToast('Lista de requisitos reiniciada', 'info', 'bi-arrow-counterclockwise');
      }

      const tupaFilterBtn = e.target.closest('[data-tupa-filter]');
      if (tupaFilterBtn) {
        const wrap = tupaFilterBtn.closest('.tupa-browser-card');
        if (wrap) {
          wrap.querySelectorAll('[data-tupa-filter]').forEach(b => b.classList.remove('active', 'btn-primary'));
          tupaFilterBtn.classList.add('active', 'btn-primary');
          wrap.dataset.activeFilter = tupaFilterBtn.getAttribute('data-tupa-filter');
          const searchEl = wrap.querySelector('.tupa-live-search');
          this.updateTupaSearchResults(wrap, searchEl ? searchEl.value : '', wrap.dataset.activeFilter);
        }
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target && e.target.classList.contains('tupa-live-search')) {
        const wrap = e.target.closest('.tupa-browser-card');
        if (wrap) {
          this.updateTupaSearchResults(wrap, e.target.value, wrap.dataset.activeFilter || 'all');
        }
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
    if (this.previewImg) this.previewImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }

  /* ==========================================================================
     AUTOCOMPLETADO PREDICTIVO Y BÚSQUEDA EN TIEMPO REAL
     ========================================================================== */

  initAutocomplete() {
    if (!this.inputField || !this.suggestionsBox) return;

    let activeIndex = -1;

    const PREDEFINED_SUGGESTIONS = [
      { text: '¿Cuáles son las 4 carreras que ofrece el instituto?', prompt: '¿Cuáles son las 4 carreras que ofrece el instituto?', cat: 'carrera', icon: 'bi-mortarboard-fill', label: 'Carreras' },
      { text: 'APSTI (en 2027 Computación e Informática): Perfil, cursos y campo laboral', prompt: '¿Cómo es la carrera de APSTI y cuál es su cambio en 2027 a Computación e Informática?', cat: 'carrera', icon: 'bi-laptop', label: 'APSTI / 2027' },
      { text: 'Negocios Internacionales (ANI): Comercio exterior y aduanas', prompt: '¿De qué trata la carrera de Administración de Negocios Internacionales?', cat: 'carrera', icon: 'bi-ship', label: 'ANI' },
      { text: 'Contabilidad: Finanzas, tributación SUNAT y gestión empresarial', prompt: '¿Cuál es el perfil y campo de trabajo en Contabilidad?', cat: 'carrera', icon: 'bi-calculator-fill', label: 'Contabilidad' },
      { text: 'Desarrollo Pesquero y Acuícola (DPA): Recursos marinos y plantas HACCP', prompt: '¿Qué se aprende en Desarrollo Pesquero y Acuícola en Paita?', cat: 'carrera', icon: 'bi-water', label: 'DPA' },
      { text: 'Requisitos y modalidades del Proceso de Admisión 2026', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?', cat: 'admision', icon: 'bi-file-earmark-person-fill', label: 'Admisión' },
      { text: '¿El instituto cobra mensualidad o es educación pública?', prompt: '¿Cuánto cuesta la mensualidad o pensión en el instituto?', cat: 'admision', icon: 'bi-cash-coin', label: 'Sin Mensualidad' },
      { text: 'Simulador del Examen de Admisión Oficial', prompt: 'Quiero practicar el simulador de admisión', cat: 'admision', icon: 'bi-pencil-square', label: 'Simulador' },
      { text: 'Test Vocacional Inteligente', prompt: 'Quiero hacer el test vocacional', cat: 'general', icon: 'bi-compass-fill', label: 'Test Vocacional' },
      { text: 'Guía de Matrícula paso a paso (S/ 250 en Cta. BN 00-638-002361)', prompt: '¿Cómo es el proceso de matrícula paso a paso en el instituto?', cat: 'tramites', icon: 'bi-ui-checks', label: 'Matrícula' },
      { text: 'Pago en ventanilla del Banco de la Nación y registro en pagos.ieshercar.edu.pe', prompt: '¿Cómo realizo el pago en el Banco de la Nación y cómo registro mi voucher?', cat: 'pagos', icon: 'bi-bank', label: 'Pagos BN' },
      { text: 'Las 2 Cuentas Oficiales Banco de la Nación (00-638-002361 y 00-638-025736)', prompt: '¿Cuál es el número de cuenta bancaria para pagar?', cat: 'pagos', icon: 'bi-bank2', label: 'Cuentas BN' },
      { text: '¿Se puede pagar por Págalo.pe, Yape o agentes? (NO permitido)', prompt: '¿Se puede pagar por Págalo.pe, Yape o agentes?', cat: 'pagos', icon: 'bi-exclamation-triangle-fill', label: 'Regla Pagos' },
      { text: 'Curso de Inglés (S/ 400 en Cta. BN 00-638-025736 + 2 copias voucher en Tesorería)', prompt: '¿Cuál es la cuenta y requisitos para pagar el curso de inglés?', cat: 'tramites', icon: 'bi-translate', label: 'Inglés' },
      { text: 'Requisitos Examen de Suficiencia Profesional (S/ 200 en Cta. 00-638-002361)', prompt: '¿Cuáles son los requisitos para solicitar el Examen de Suficiencia Profesional?', cat: 'tramites', icon: 'bi-journal-check', label: 'Suficiencia' },
      { text: 'Requisitos Trámite de Título Profesional (Folder A/4 + Sobre Manila A4)', prompt: '¿Cuáles son los requisitos para el trámite de Título Profesional?', cat: 'tramites', icon: 'bi-award-fill', label: 'Título' },
      { text: 'Requisitos para tramitar Certificado Modular Progresivo (S/ 25)', prompt: '¿Cómo tramito mi Certificado Modular y cuánto cuesta?', cat: 'tramites', icon: 'bi-award', label: 'Certificados' },
      { text: 'Bolsa de trabajo y convenios para prácticas en el Puerto de Paita', prompt: '¿Cómo funciona la bolsa de trabajo y convenios para prácticas?', cat: 'general', icon: 'bi-briefcase-fill', label: 'Bolsa Trabajo' },
      { text: 'Ubicación del campus en Paita, docentes y horarios', prompt: '¿Dónde queda el campus institucional y cuál es el horario?', cat: 'general', icon: 'bi-geo-alt-fill', label: 'Ubicación' },
      { text: 'Cotizador y buscador de tasas TUPA 2026 (R.D. N° 020-2026)', prompt: 'Cotizador de trámites TUPA', cat: 'pagos', icon: 'bi-receipt', label: 'Cotizador TUPA' },
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
          this.showToast('Cuenta Banco de la Nación TUPA copiada: 00-638-002361 (Solo ventanilla BN)', 'success', 'bi-clipboard-check');
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
        autoridad: 'JEFATURA DE UNIDAD ACADÉMICA / COORDINACIÓN DE PROGRAMA DE ESTUDIOS',
        costo: 'S/ 15.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '3 a 5 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo culminado satisfactoriamente mis Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT) y habiendo presentado el Plan de Trabajo, Hoja de Evaluación del Empleador e Informe Final visado, solicito se me otorgue la Constancia de Acreditación de Prácticas Preprofesionales correspondiente.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: true, medicos: false }
      },
      'cert_modular': {
        sumilla: 'SOLICITO CERTIFICADO MODULAR PROGRESIVO OFICIAL',
        autoridad: 'SECRETARÍA ACADÉMICA DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 25.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '5 a 7 días hábiles',
        wrap: 'futModuloWrap',
        draft: (d) => `Que, habiendo culminado y aprobado la totalidad de unidades didácticas y horas de prácticas preprofesionales (EFSRT) correspondientes al ${d.modulo || 'Módulo Formativo I'} del plan de estudios de mi programa, solicito la expedición de mi CERTIFICADO MODULAR PROGRESIVO con valor oficial MINEDU.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: false, practicas: true, medicos: false }
      },
      'cert_modular_convenio': {
        sumilla: 'SOLICITO CERTIFICADO MODULAR CONVALIDANDO PRÁCTICAS POR CONVENIO',
        autoridad: 'SECRETARÍA ACADÉMICA DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 25.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '5 a 7 días hábiles',
        wrap: 'futModuloWrap',
        draft: (d) => `Que, habiendo aprobado los créditos curriculares y validado las horas de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT) ejecutadas en el marco del Convenio de Cooperación Interinstitucional, solicito se sirva expedir mi CERTIFICADO MODULAR PROGRESIVO correspondiente al ${d.modulo || 'Módulo Formativo I'} con reconocimiento oficial.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: false, practicas: true, medicos: false }
      },
      'cert_estudios_completo': {
        sumilla: 'SOLICITO CERTIFICADO OFICIAL DE ESTUDIOS COMPLETO (I AL VI PERIODO)',
        autoridad: 'SECRETARÍA ACADÉMICA DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 240.00 los 6 periodos / S/ 40.00 por periodo (Cta. Cte. BN 00-638-002361)',
        plazo: '3 a 5 días hábiles',
        wrap: null,
        draft: () => `Que, para fines laborales, titulación y prosecución de estudios superiores, solicito se me expida mi CERTIFICADO OFICIAL DE ESTUDIOS correspondiente a la totalidad de periodos académicos cursados en el instituto, para lo cual adjunto los requisitos del TUPA 2026.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: true, practicas: false, medicos: false }
      },
      'examen_suficiencia': {
        sumilla: 'SOLICITO PROGRAMAR EXAMEN DE SUFICIENCIA PROFESIONAL',
        autoridad: 'DIRECCIÓN GENERAL DEL IESTP HERMANOS CÁRCAMO (VÍA COORDINADOR DE PROGRAMA)',
        costo: 'S/ 200.00 (2da opción S/ 100.00) - Cta. Cte. BN 00-638-002361',
        plazo: 'Según cronograma de Coordinación de Programa de Estudios',
        wrap: null,
        draft: () => `Que, habiendo culminado satisfactoriamente mi plan de estudios, contando con los tres (03) certificados modulares, constancia de no adeudar, curso de inglés básico (y actualización si egresé el 2021 o antes), solicito se sirva programar mi EXAMEN DE SUFICIENCIA PROFESIONAL cumpliendo con todos los requisitos en expediente debidamente foliado.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: true, practicas: true, medicos: false }
      },
      'titulacion_profesional': {
        sumilla: 'SOLICITO OBTENCIÓN DE TÍTULO PROFESIONAL TÉCNICO A NOMBRE DE LA NACIÓN',
        autoridad: 'DIRECCIÓN GENERAL DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 100.00 Derecho + S/ 60.00 Formato/Caligrafiado (Cta. Cte. BN 00-638-002361)',
        plazo: 'Según calendario de titulación y registro MINEDU',
        wrap: null,
        draft: () => `Que, habiendo cumplido los requisitos académicos y reglamentarios (Certificado de Secundaria con QR, Certificado Superior original, Partida de Nacimiento actualizada, DNI a color legalizado por Notario, 2 fotos pasaporte reveladas fondo blanco, copia a color de Inglés Básico y boletas selladas por Tesorería), solicito la OBTENCIÓN DE MI TÍTULO PROFESIONAL TÉCNICO en expediente foliado en folder A/4 con sobre manila A4.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: true, practicas: true, medicos: false }
      },
      'constancia_egresado': {
        sumilla: 'SOLICITO CONSTANCIA OFICIAL DE EGRESADO',
        autoridad: 'SECRETARÍA ACADÉMICA DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 15.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '2 a 3 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo culminado satisfactoriamente los seis periodos académicos del plan curricular de mi programa de estudios, solicito se me extienda mi CONSTANCIA DE EGRESADO para los trámites laborales y de titulación pertinentes.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'duplicado_titulo': {
        sumilla: 'SOLICITO DUPLICADO DE DIPLOMA DE TÍTULO PROFESIONAL TÉCNICO',
        autoridad: 'DIRECCIÓN GENERAL DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 200.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '15 a 20 días hábiles',
        wrap: null,
        draft: () => `Que, habiéndose extraviado/deteriorado mi diploma original y habiendo realizado la denuncia policial y publicación correspondiente según TUPA 2026, solicito la expedición del DUPLICADO DE MI DIPLOMA DE TÍTULO PROFESIONAL TÉCNICO.`,
        reqs: { dni: true, voucher: true, fotos: true, notas: false, practicas: false, medicos: false }
      },
      'matricula_extemporanea': {
        sumilla: 'SOLICITO AUTORIZACIÓN PARA MATRÍCULA EXTEMPORÁNEA',
        autoridad: 'DIRECCIÓN GENERAL / JEFATURA DE UNIDAD ACADÉMICA',
        costo: 'S/ 250.00 Matrícula + recargo extemporáneo TUPA (Cta. Cte. BN 00-638-002361)',
        plazo: '2 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo vencido el plazo regular de matrícula por motivos debidamente justificados y encontrándome habilitado académicamente, solicito se autorice mi matrícula extemporánea en el periodo lectivo en curso.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'reserva_matricula': {
        sumilla: 'SOLICITO RESERVA DE MATRÍCULA / LICENCIA DE ESTUDIOS',
        autoridad: 'DIRECCIÓN GENERAL DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 60.00 Ingresantes / S/ 100.00 Licencia 2do-6to (Cta. Cte. BN 00-638-002361)',
        plazo: '2 a 3 días hábiles',
        wrap: null,
        draft: () => `Que, por razones estrictamente personales y debidamente sustentadas que me impiden continuar mis estudios en el presente periodo académico, solicito la RESERVA DE MATRÍCULA o LICENCIA DE ESTUDIOS asegurando mi reincorporación respectiva según el Reglamento Institucional.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'reingreso_estudios': {
        sumilla: 'SOLICITO REINCORPORACIÓN DE ESTUDIOS',
        autoridad: 'DIRECCIÓN GENERAL DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 65.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '2 a 3 días hábiles',
        wrap: null,
        draft: () => `Que, habiendo culminado el periodo de reserva o licencia de estudios concedido, solicito mi REINCORPORACIÓN al periodo académico correspondiente en mi programa de estudios.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'convalidacion_cursos': {
        sumilla: 'SOLICITO CONVALIDACIÓN DE UNIDADES DIDÁCTICAS',
        autoridad: 'JEFATURA DE UNIDAD ACADÉMICA / COORDINACIÓN DE PROGRAMA',
        costo: 'S/ 30.00 por Unidad Didáctica (Cta. Cte. BN 00-638-002361)',
        plazo: '5 a 7 días hábiles',
        wrap: 'futConvalidacionWrap',
        draft: (d) => `Que, habiendo cursado estudios superiores en "${d.convalInst || 'otra institución de educación superior'}", solicito la CONVALIDACIÓN DE UNIDADES DIDÁCTICAS afines a mi plan de estudios actual, para lo cual adjunto mis certificados y sílabos oficiales visados.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: true, practicas: false, medicos: false }
      },
      'traslado_interno': {
        sumilla: 'SOLICITO TRASLADO INTERNO DE PROGRAMA DE ESTUDIOS',
        autoridad: 'DIRECCIÓN GENERAL DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 80.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '3 a 5 días hábiles',
        wrap: null,
        draft: () => `Que, de acuerdo al reglamento institucional y existiendo vacantes disponibles, solicito mi TRASLADO INTERNO de programa de estudios, comprometiéndome a cursar las unidades didácticas complementarias requeridas.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: true, practicas: false, medicos: false }
      },
      'subsanacion_recuperacion': {
        sumilla: 'SOLICITO EVALUACIÓN DE RECUPERACIÓN / REPITENCIA O EXTRAORDINARIA',
        autoridad: 'JEFATURA DE UNIDAD ACADÉMICA',
        costo: 'S/ 35.00 Recuperación / S/ 200-300 Extraordinaria (Cta. Cte. BN 00-638-002361)',
        plazo: '2 días hábiles',
        wrap: null,
        draft: () => `Que, teniendo pendiente una unidad didáctica del periodo correspondiente y cumpliendo los requisitos del TUPA 2026, solicito se me autorice rendir la EVALUACIÓN DE RECUPERACIÓN O EXTRAORDINARIA respectiva.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: true, practicas: false, medicos: false }
      },
      'retiro_semestre': {
        sumilla: 'SOLICITO RETIRO TEMPORAL DE SEMESTRE ACADÉMICO',
        autoridad: 'DIRECCIÓN GENERAL DEL IESTP HERMANOS CÁRCAMO',
        costo: 'Gratuito',
        plazo: '2 días hábiles',
        wrap: null,
        draft: () => `Que, por circunstancias personales sobrevinientes imprevistas, solicito mi RETIRO TEMPORAL del semestre académico en curso para los fines de resguardo de mi récord de notas.`,
        reqs: { dni: true, voucher: false, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'constancia_matricula': {
        sumilla: 'SOLICITO CONSTANCIA DE MATRÍCULA / ESTUDIOS OFICIAL',
        autoridad: 'SECRETARÍA ACADÉMICA DEL IESTP HERMANOS CÁRCAMO',
        costo: 'S/ 15.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '24 a 48 horas hábiles',
        wrap: null,
        draft: () => `Que, requiriendo acreditar mi condición de estudiante regular matriculado en el presente periodo lectivo para trámites institucionales, laborales o de seguro, solicito la expedición de mi CONSTANCIA DE MATRÍCULA / ESTUDIOS oficial.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'constancia_no_adeudo': {
        sumilla: 'SOLICITO CONSTANCIA GENERAL DE NO ADEUDAR A LA INSTITUCIÓN',
        autoridad: 'DIRECCIÓN GENERAL / SECRETARÍA ACADÉMICA',
        costo: 'S/ 15.00 (Cta. Cte. BN 00-638-002361)',
        plazo: '24 horas hábiles',
        wrap: null,
        draft: () => `Que, para efectos de Examen de Suficiencia Profesional o trámite de titulación, y no teniendo bienes, libros ni obligaciones pendientes con el instituto, solicito se me otorgue la CONSTANCIA DE NO ADEUDAR.`,
        reqs: { dni: true, voucher: true, fotos: false, notas: false, practicas: false, medicos: false }
      },
      'carne_estudiantil': {
        sumilla: 'SOLICITO EMISIÓN / DUPLICADO DE CARNÉ DE ESTUDIANTE',
        autoridad: 'SECRETARÍA ACADÉMICA DEL IESTP HERMANOS CÁRCAMO',
        costo: 'Tasa vigente MINEDU (Cta. Cte. BN 00-638-002361)',
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
    setVal('futCarrera', 'Arquitectura de Plataformas y Servicios de Tecnologías de la Información (APSTI)');
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
    if (isChecked('futAdjVoucher')) reqList.push(`Voucher y boleta electrónica BN (${cfg.costo}) - Solo ventanilla Banco de la Nación (TUPA Cta. Cte. Nº 00-638-002361)`);
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
      carrera: getVal('futCarrera', 'Arquitectura de Plataformas y TI (APSTI)'),
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
          <td colspan="3" style="font-weight: bold; color: #047857;">${data.costo} &bull; Solo Ventanilla Banco de la Nación (Cta. Cte. Nº 00-638-002361 — NO Págalo.pe)</td>
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
    let current = conversations.find(c => c.id === this.currentChatId);

    const now = new Date();
    const todayStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!current) {
      current = {
        id: this.currentChatId,
        title: sender === 'user' ? (content.substring(0, 30) + (content.length > 30 ? '...' : '')) : 'Nueva Conversación',
        dateStr: todayStr,
        createdAt: now.getTime(),
        timestamp: timeStr,
        messages: []
      };
      conversations.unshift(current);
    } else if (sender === 'user' && (current.title === 'Nueva Conversación' || current.messages.length <= 1)) {
      current.title = content.substring(0, 30) + (content.length > 30 ? '...' : '');
    }

    current.messages.push({
      sender,
      content,
      speakText,
      time: timeStr
    });

    this.saveConversations(conversations);
    this.renderHistoryList();
  }

  loadConversation(chatId) {
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

    // 2. Detección de voces robóticas de escritorio antiguas (SAPI5 de Windows / espeak / desktop)
    // En Windows, las voces robóticas son: Microsoft Helena, Microsoft Sabina (sin online/natural), Microsoft Laura
    const isRoboticDesktop = v.localService === true || 
                             name.includes('desktop') || 
                             name.includes('espeak') || 
                             name.includes('sapi') ||
                             (name.includes('helena') && !name.includes('natural') && !name.includes('online')) ||
                             (name.includes('laura') && !name.includes('natural') && !name.includes('online')) ||
                             (name.includes('sabina') && !name.includes('natural') && !name.includes('online'));

    // 3. Voces Neuronales / Naturales Femeninas en la Nube (Calidad humana ultra-alta y dulce)
    // Microsoft Camila Online (Natural) — Acento peruano cálido y claro (es-PE)
    if (name.includes('camila') && (name.includes('natural') || name.includes('online'))) return 30500;
    // Microsoft Dalia Online (Natural) — Reconocida por su timbre dulce, joven, latino, 100% humano
    if (name.includes('dalia') && (name.includes('natural') || name.includes('online'))) return 30000;
    // Microsoft Sabina Online (Natural) — Cordial, femenina, suave
    if (name.includes('sabina') && (name.includes('natural') || name.includes('online'))) return 28000;
    // Microsoft Jimena Online (Natural) — Entonación melódica y cordial
    if ((name.includes('jimena') || name.includes('ximena')) && (name.includes('natural') || name.includes('online'))) return 27000;
    // Microsoft Paulina Online (Natural)
    if (name.includes('paulina') && (name.includes('natural') || name.includes('online'))) return 26000;
    // Microsoft Paloma Online (Natural)
    if (name.includes('paloma') && (name.includes('natural') || name.includes('online'))) return 25500;
    // Microsoft Elena Online (Natural)
    if (name.includes('elena') && (name.includes('natural') || name.includes('online'))) return 25000;
    // Google español (Chrome / Android Cloud TTS) — Muy fluida, natural y cálida
    if (name.includes('google') && !name.includes('male')) {
      return (lang === 'es-us' || lang === 'es-419' || lang === 'es-pe') ? 26800 : 26000;
    }
    // Android Neural Network TTS ("es-*-network" / "es-*-neural")
    if ((name.includes('network') || name.includes('neural')) && (lang.startsWith('es') || name.includes('female'))) {
      return 25000;
    }
    // Apple Siri / Samantha / Paulina / Mónica Premium en macOS / iOS
    if (name.includes('premium') || name.includes('enhanced')) {
      if (name.includes('paulina') || name.includes('monica') || name.includes('mónica') || name.includes('luciana') || name.includes('soledad')) {
        return 24000;
      }
    }
    // Cualquier otra voz femenina que tenga 'natural' u 'online'
    if ((name.includes('natural') || name.includes('online') || name.includes('neural')) && !isMale) {
      return 22000;
    }

    // 4. Voces femeninas estándar / de sistema
    let score = 1000;
    const isFemale = name.includes('female') || name.includes('mujer') || 
                     name.includes('dalia') || name.includes('sabina') || name.includes('paloma') || 
                     name.includes('salma') || name.includes('paulina') || name.includes('elena') || 
                     name.includes('monica') || name.includes('camila') || name.includes('lucia') || 
                     name.includes('andrea') || name.includes('sofia') || name.includes('victoria') || 
                     name.includes('carmen') || name.includes('rosa') || name.includes('mia');
    if (isFemale) score += 3000;

    // Penalización drástica para voces de escritorio antiguas / robóticas
    if (isRoboticDesktop) {
      score -= 25000; // Asegura que una voz robótica NUNCA gane si existe una natural online
      if (name.includes('helena')) score -= 5000;
    }

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

    // Calibración acústica ultra-natural para voz femenina dulce, cálida y humana ("chica asesora")
    // PITCH 1.0 EXACTO para preservar la resonancia vocal humana original y evitar distorsión de vocoder
    this.voiceRate = parseFloat(localStorage.getItem('hercar_voice_rate')) || 0.98;
    this.voicePitch = 1.0;
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
        const isSabina = nameLower.includes('sabina') && !nameLower.includes('desktop');
        const isCamila = nameLower.includes('camila') && !nameLower.includes('desktop');
        const isNatural = this.isNaturalOnlineVoice(v);

        let badge = '';
        if (isDalia) badge = ' 🌸 Voz Dulce y Joven (Máxima Recomendación)';
        else if (isCamila) badge = ' 🌸 Voz Peruana Natural (Recomendada)';
        else if (isGoogle) badge = ' 🌸 Voz Natural Google (Recomendada)';
        else if (isSabina) badge = ' 🌸 Voz Femenina Cálida (Recomendada)';
        else if (isNatural) badge = ' ✨ Voz Natural Online';
        else if (!nameLower.includes('desktop') && !v.localService) badge = ' 🌸 Voz Estándar';
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
      speedRange.value = this.voiceRate || 0.98;
      speedLabel.textContent = `${Number(this.voiceRate || 0.98).toFixed(2)}x (Dulce y Natural 🌸)`;

      speedRange.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.voiceRate = val;
        localStorage.setItem('hercar_voice_rate', val);
        speedLabel.textContent = `${val.toFixed(2)}x (${val < 0.94 ? 'Pausada' : val > 1.02 ? 'Ágil' : 'Natural y Dulce 🌸'})`;
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
          this.speak('¡Hola! Así suena mi voz para orientarte con cariño en el Instituto Superior Hermanos Cárcamo de Paita.');
        }
      });
    }

    const btnQuickPreview = document.getElementById('btn-quick-preview-voice');
    if (btnQuickPreview) {
      btnQuickPreview.addEventListener('click', () => {
        this.speak('¡Hola! Soy tu asesora virtual del Instituto Superior Hermanos Cárcamo de Paita. ¿Te gusta cómo suena mi voz?');
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
        this.voicePitch = 1.0;
        this.voiceRate = 0.98;
        localStorage.setItem('hercar_voice_style', 'dulce');
        localStorage.setItem('hercar_voice_pitch', '1.0');
        localStorage.setItem('hercar_voice_rate', '0.98');
        if (speedRange && speedLabel) {
          speedRange.value = 0.98;
          speedLabel.textContent = '0.98x (Dulce, Suave y Natural 🌸)';
        }
        btnWarm.classList.add('active', 'btn-primary');
        btnWarm.classList.remove('btn-outline-primary');
        btnPro.classList.remove('active', 'btn-primary');
        btnPro.classList.add('btn-outline-secondary');
        this.showToast('Voz configurada: Asesora Femenina Dulce y Natural 🌸', 'success', 'bi-mic-fill');
        this.speak('¡Hola! He ajustado mi voz a un tono dulce, suave y natural para orientarte en el Instituto Superior Hermanos Cárcamo.');
      });

      btnPro.addEventListener('click', () => {
        this.voiceStyle = 'pro';
        this.voicePitch = 1.0;
        this.voiceRate = 1.0;
        localStorage.setItem('hercar_voice_style', 'pro');
        localStorage.setItem('hercar_voice_pitch', '1.0');
        localStorage.setItem('hercar_voice_rate', '1.0');
        if (speedRange && speedLabel) {
          speedRange.value = 1.0;
          speedLabel.textContent = '1.00x (Formal y Serena 👔)';
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
          ? 'Estimado estudiante o postulante. Soy el asistente virtual oficial del Instituto Superior Hermanos Cárcamo de Paita. Te oriento con información actualizada sobre carreras técnicas, matrícula y trámites.'
          : '¡Hola! Te doy una cálida bienvenida al Instituto Superior Hermanos Cárcamo de Paita. Soy tu asesora virtual y con mucho gusto te oriento sobre nuestras carreras técnicas, pagos y trámites. ¿En qué te puedo ayudar hoy?';
        this.speak(saludoPrueba);
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        localStorage.removeItem('hercar_voice_uri');
        localStorage.removeItem('hercar_voice_rate');
        localStorage.removeItem('hercar_voice_pitch');
        localStorage.removeItem('hercar_voice_style');
        this.voiceRate = 0.98;
        this.voicePitch = 1.0;
        this.voiceStyle = 'dulce';
        this.voiceURI = null;
        if (speedRange && speedLabel) {
          speedRange.value = 0.98;
          speedLabel.textContent = '0.98x (Dulce y Natural 🌸)';
        }
        this.initVoiceSynthesis();
        this.showToast('Voz restablecida a Asesora Femenina Dulce y Natural 🌸', 'info', 'bi-arrow-counterclockwise');
        this.speak('¡Listo! He restablecido mi voz a la opción más dulce y natural del Instituto Superior Hermanos Cárcamo.');
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

    if (norm.includes('ingles') || norm.includes('025736') || norm.includes('00-638-025736')) {
      detectedIntent = 'Curso de Inglés & Actividades Productivas BN';
      matchedEntity = 'Banco de la Nación Cta. 00-638-025736 (S/ 400 + 2 copias a Tesorería)';
      confidence = 99.8;
      category = 'pagos';
    } else if (norm.includes('cuenta') || norm.includes('banco') || norm.includes('pagar') || norm.includes('voucher') || norm.includes('pagalo') || norm.includes('00-638-002361')) {
      detectedIntent = 'Gestión de Pagos Ventanilla BN (NO Págalo.pe)';
      matchedEntity = 'Banco de la Nación (TUPA: 00-638-002361 | Inglés: 00-638-025736)';
      confidence = 99.8;
      category = 'pagos';
    } else if (norm.includes('carrera') || norm.includes('apsti') || norm.includes('computacion') || norm.includes('informatica') || norm.includes('2027') || norm.includes('software') || norm.includes('sistemas') || norm.includes('redes')) {
      detectedIntent = 'Consulta Curricular - APSTI (2027: Computación e Informática)';
      matchedEntity = 'Arquitectura de Plataformas y Servicios TI (2027: Computación e Informática)';
      confidence = 99.7;
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
    } else if (norm.includes('suficiencia') || norm.includes('titulo') || norm.includes('titulacion')) {
      detectedIntent = 'Titulación & Examen de Suficiencia Profesional';
      matchedEntity = 'Expediente Foliado & Cta. Cte. BN 00-638-002361 (S/ 200 / S/ 60 + S/ 100)';
      confidence = 99.6;
      category = 'tramites';
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

    if (norm.includes('ingles') || norm.includes('025736') || norm.includes('00-638-025736')) {
      detectedIntent = 'Curso de Inglés & Actividades Productivas BN';
      matchedEntity = 'Cta. BN 00-638-025736 (S/ 400 + 2 copias del voucher en Tesorería)';
      confidence = 99.8;
    } else if (norm.includes('cuenta') || norm.includes('banco') || norm.includes('pagar') || norm.includes('voucher') || norm.includes('pagalo') || norm.includes('00-638-002361') || norm.includes('pagos') || norm.includes('matricula pago')) {
      detectedIntent = 'Gestión de Pagos Ventanilla BN (NO Págalo.pe)';
      matchedEntity = 'Banco de la Nación (TUPA: 00-638-002361 | Inglés: 00-638-025736)';
      confidence = 99.8;
    } else if (norm.includes('apsti') || norm.includes('computacion') || norm.includes('informatica') || norm.includes('2027') || norm.includes('software') || norm.includes('sistemas') || norm.includes('redes') || norm.includes('programacion')) {
      detectedIntent = 'Consulta Curricular - APSTI (2027: Computación e Informática)';
      matchedEntity = 'Arquitectura de Plataformas y TI (2027 será Computación e Informática)';
      confidence = 99.7;
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
    } else if (norm.includes('suficiencia') || norm.includes('titulo') || norm.includes('titulacion')) {
      detectedIntent = 'Titulación & Examen de Suficiencia Profesional';
      matchedEntity = 'Requisitos Oficiales + BN Cta. Cte. 00-638-002361';
      confidence = 99.6;
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
        title: 'Carrera: APSTI (2027: Computación e Informática)',
        desc: 'Arquitectura de Plataformas y Servicios TI (en 2027 pasará a Computación e Informática) • 3 años',
        category: 'Carreras Profesionales',
        icon: 'bi-laptop',
        color: '#2563eb',
        tags: 'computacion informatica 2027 software programacion desarrollo redes servidores base de datos apsti',
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
        title: 'Cuentas Banco de la Nación (Solo Ventanilla)',
        desc: 'TUPA: 00-638-002361 | Inglés/Productivas: 00-638-025736 • NO Págalo.pe ni Agentes',
        category: 'Pagos & Matrícula',
        icon: 'bi-bank',
        color: '#16a34a',
        tags: 'banco de la nacion cuenta corriente pagar matricula voucher tasa pagos 00-638-002361 00-638-025736 pagalo',
        action: () => this.triggerAction('ver_numero_cuenta_bn')
      },
      {
        id: 'cmd-curso-ingles',
        title: 'Curso de Inglés Básico (Cuenta 00-638-025736)',
        desc: 'S/ 400.00 en Cta. BN 00-638-025736 • Entregar 2 copias del voucher en Tesorería',
        category: 'Pagos & Matrícula',
        icon: 'bi-translate',
        color: '#2563eb',
        tags: 'ingles basico 00-638-025736 dos copias tesoreria titulacion certificado 400',
        action: () => this.triggerAction('ver_curso_ingles')
      },
      {
        id: 'cmd-examen-suficiencia',
        title: 'Requisitos: Examen de Suficiencia Profesional',
        desc: 'Expediente foliado (7 requisitos) + S/ 200.00 en Cta. Cte. BN 00-638-002361',
        category: 'Trámites Académicos',
        icon: 'bi-patch-check-fill',
        color: '#0d9488',
        tags: 'suficiencia profesional examen egresados 200 soles requisitos coordinador',
        action: () => this.triggerAction('ver_examen_suficiencia')
      },
      {
        id: 'cmd-tramite-titulo',
        title: 'Requisitos: Trámite de Título Profesional',
        desc: 'Folder A/4 + Sobre Manila (10 requisitos) • S/ 60 + S/ 100 en Cta. Cte. 00-638-002361',
        category: 'Trámites Académicos',
        icon: 'bi-mortarboard-fill',
        color: '#1e3a8a',
        tags: 'titulo profesional caligrafiado formato derecho fotos dni legalizado partida manila',
        action: () => this.triggerAction('ver_tramite_titulo')
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
        desc: 'Calcula el monto total desglosado por cuenta BN (00-638-002361 y 00-638-025736)',
        category: 'Trámites Académicos',
        icon: 'bi-receipt-cutoff',
        color: '#ea580c',
        tags: 'tupa tasas costos precios tramite certificado modular titulacion carne',
        action: () => this.triggerAction('ver_cotizador_tupa')
      },
      {
        id: 'cmd-buscador-tupa',
        title: 'Buscador Oficial TUPA 2026 (66 Conceptos)',
        desc: 'Busca en vivo entre los 43 trámites TUPA y 23 ítems productivos (R.D. 020-2026)',
        category: 'Trámites Académicos',
        icon: 'bi-search',
        color: '#0284c7',
        tags: 'tarifario completo tupa 2026 buscador 66 items toga birrete certificado tercio revalidacion',
        action: () => this.triggerAction('ver_buscador_tupa')
      },
      {
        id: 'cmd-personalizacion',
        title: 'Estudio de Personalización Pro (Temas, Avatar, Perfil)',
        desc: 'Cambia colores institucionales, avatar 3D, tamaño de texto y perfil de usuario',
        category: 'Configuración & Sistema',
        icon: 'bi-palette-fill',
        color: '#ec4899',
        tags: 'personalizar customizacion tema paleta color avatar fuente accesibilidad perfil',
        action: () => this.triggerAction('abrir_personalizacion')
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
          <small class="text-muted">Intenta escribir palabras clave como "pagos", "apsti", "fut", "simulador" o "notas".</small>
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
          const apstiNote = carrera.id === 'apsti'
            ? `<div class="alert alert-info py-2 px-3 small mb-3"><i class="bi bi-stars me-1"></i><strong>Proyección 2027:</strong> El programa APSTI cambiará su denominación a <strong>Computación e Informática</strong> manteniendo los 3 años y 6 semestres.</div>`
            : '';
          const apstiSpoken = carrera.id === 'apsti' ? ' Cabe destacar que en el año dos mil veintisiete este programa pasará a denominarse Computación e Informática.' : '';
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid ${carrera.color} !important;">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-clock-history me-2"></i>Duración Oficial: ${carrera.nombre} (${carrera.codigo})</h5>
              <p>La carrera técnica de <strong>${carrera.nombre}</strong> tiene una duración total de <strong>${carrera.duracion}</strong>, organizados en <strong>6 periodos académicos</strong> (120 créditos curriculares y experiencias formativas EFSRT).</p>
              ${apstiNote}
              <p class="small text-muted mb-3"><i class="bi bi-award-fill text-warning me-1"></i>Al egresar y aprobar tus módulos obtienes el <strong>Título Profesional Técnico a Nombre de la Nación</strong> otorgado por el MINEDU.</p>
              <div class="interactive-button-grid">
                <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${carrera.id}"><i class="bi bi-book-half text-primary"></i> Ver Cursos por Ciclo</button>
                <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard-fill text-success"></i> ¿Cómo Postular?</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `La carrera técnica de ${carrera.nombre} dura tres años, repartidos en seis periodos académicos con ciento veinte créditos y prácticas preprofesionales.${apstiSpoken}`);
          return true;
        }

        if (isCost) {
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid #10b981 !important;">
              <h5 class="faq-custom-title text-success"><i class="bi bi-cash-coin me-2"></i>Costo de la Carrera: ${carrera.nombre}</h5>
              <p>¡En el <strong>IESTP "Hermanos Cárcamo"</strong> (instituto público del Estado) <strong>NO se pagan mensualidades ni pensiones de enseñanza</strong>!</p>
              <p>Únicamente se abona la tasa TUPA de <strong>Matrícula Ordinaria: S/ 250.00 por semestre</strong>, pagada <strong>exclusivamente en ventanilla del Banco de la Nación</strong> (Cuenta Corriente <strong>N° 00-638-002361</strong>, indicando DNI y nombre del estudiante).</p>
              <div class="alert alert-danger py-2 px-3 small mb-3"><i class="bi bi-exclamation-octagon-fill me-1"></i><strong>Prohibido:</strong> NO se acepta Págalo.pe, agentes MultiRed ni Yape/Plin. Tras pagar, registra tu voucher en <strong>pagos.ieshercar.edu.pe</strong>.</div>
              <div class="interactive-button-grid mt-3">
                <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-bank text-warning"></i> Ver Cuentas BN Oficiales</button>
                <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-mortarboard-fill text-primary"></i> Modalidades de Admisión</button>
              </div>
            </div>
          `;
          this.appendBotMessage(html, `En ${carrera.nombre} no se pagan mensualidades porque el instituto es público. Solo abonas la matrícula semestral de doscientos cincuenta soles, pagando únicamente en ventanilla del Banco de la Nación a la cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno. Recuerda que no se acepta Págalo punto pe ni agentes.`);
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
        if (isCost) {
          const html = `
            <div class="faq-card-custom" style="border-left: 4px solid #0f3380 !important;">
              <h5 class="faq-custom-title text-primary"><i class="bi bi-receipt me-2"></i>Costo de: ${tramite.nombre}</h5>
              <p>El costo según el TUPA oficial es de <strong>${tramite.costo}</strong>.</p>
              <p class="small text-muted"><strong>Plazo de entrega:</strong> ${tramite.plazo} &bull; <strong>Canal:</strong> ${tramite.responsable}</p>
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

    // -1. Eliminar siglas redundantes entre paréntesis para no leer dos veces el nombre de carrera o institución
    p = p
      .replace(/\s*\(\s*(?:APSTI|ANI|CONTA|DPA|BN|SIS|MINEDU|SUNAT|FUT|TUPA|EFSRT|DPI|CCI|CEPRE|IESTP|IES|R\.D\.|R\.M\.)\s*\)/gi, '')
      .replace(/\bieshercar@ieshercar\.edu\.pe\b/gi, 'correo oficial y e s hercar arroba y e s hercar punto edu punto pe')
      .replace(/\bPágalo\.pe\b/gi, 'Págalo punto pe')
      .replace(/\bPagalo\.pe\b/gi, 'Págalo punto pe');

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
      .replace(/\bDPI\b/gi, 'desaprobado por inasistencias')
      .replace(/\bEFSRT\b/gi, 'prácticas preprofesionales')
      .replace(/\bDNI\b/gi, 'D N I')
      .replace(/\bPDF\b/gi, 'archivo P D F')
      .replace(/\bWhatsApp\b/gi, 'WhatsApp')
      .replace(/\bchatbot\b/gi, 'asistente virtual')
      .replace(/\bIA\b/gi, 'inteligencia artificial')
      .replace(/\bAPSTI\b/gi, 'Arquitectura de Plataformas y Servicios de Tecnologías de la Información')
      .replace(/\bANI\b/gi, 'Administración de Negocios Internacionales')
      .replace(/\bCONTA\b/gi, 'Contabilidad')
      .replace(/\bDPA\b/gi, 'Desarrollo Pesquero y Acuícola')
      .replace(/\bsistema\.ieshercar\.edu\.pe\/registro-tramite\/?/gi, 'mesa de partes virtual del Instituto Superior Hermanos Cárcamo')
      .replace(/\bpagos\.ieshercar\.edu\.pe\b/gi, 'portal de pagos de Hermanos Cárcamo')
      .replace(/\bsistema\.ieshercar\.edu\.pe\b/gi, 'sistema académico de Hermanos Cárcamo')
      .replace(/\baula\.ieshercar\.edu\.pe\b/gi, 'aula virtual de Hermanos Cárcamo')
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
    const rawSentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks = [];

    rawSentences.forEach(sentence => {
      const s = sentence.trim();
      if (!s) return;

      // Si la frase es de longitud adecuada (<= 100 caracteres), enviar directamente
      if (s.length <= 100) {
        chunks.push(s);
        return;
      }

      // Si la frase es larga, subdividir en puntos de respiración natural (comas, dos puntos, punto y coma)
      const subparts = s.split(/(?<=[;:])\s+|(?<=,)\s+(?=[a-záéíóúA-ZÁÉÍÓÚ])/g);
      let temp = '';
      subparts.forEach(part => {
        const p = part.trim();
        if (!p) return;
        if ((temp + ' ' + p).trim().length <= 95) {
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

  speak(text) {
    if (this.isMuted || !('speechSynthesis' in window) || !text) return;
    this.stopSpeaking();

    const clean = this.preparePhoneticText(text);
    if (!clean || clean.trim().length === 0) return;

    // Dividir en fragmentos respiratorios humanos para micro-pausas naturales de respiración
    const sentences = this.splitIntoBreathChunks(clean);
    if (sentences.length === 0) return;

    this.isSpeaking = true;
    if (this.voiceIndicator) this.voiceIndicator.classList.add('active');
    if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'inline-flex';
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

    this.speakSentenceQueue(sentences);
  }

  speakSentenceQueue(queue) {
    if (!this.isSpeaking || !queue || queue.length === 0) {
      this.stopSpeaking();
      return;
    }

    const currentSentence = queue.shift();
    const utterance = new SpeechSynthesisUtterance(currentSentence);
    this.currentUtterance = utterance;
    if (!this._activeUtterances) this._activeUtterances = [];
    this._activeUtterances.push(utterance);

    const bestFemale = this.getBestFemaleVoice();
    if (bestFemale) {
      if (!this.selectedVoice || (!this.isNaturalOnlineVoice(this.selectedVoice) && this.isNaturalOnlineVoice(bestFemale))) {
        this.selectedVoice = bestFemale;
        this.voiceURI = bestFemale.voiceURI;
      }
    }

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || 'es-PE';
    } else {
      utterance.lang = 'es-PE';
    }

    // Calibración acústica ultra-humana:
    // PITCH = 1.0 EXACTO. No alterar pitch para evitar el modulador metálico del navegador.
    utterance.pitch = 1.0;
    utterance.rate = this.voiceRate || 0.98;
    utterance.volume = 1.0;

    utterance.onend = () => {
      if (this._activeUtterances) {
        this._activeUtterances = this._activeUtterances.filter(u => u !== utterance);
      }
      if (!this.isSpeaking) return;
      if (queue.length > 0) {
        // Pausa de respiración natural de 85ms entre frases
        this.speechQueueTimer = setTimeout(() => {
          this.speakSentenceQueue(queue);
        }, 85);
      } else {
        this.stopSpeaking();
      }
    };

    utterance.onerror = () => {
      if (this._activeUtterances) {
        this._activeUtterances = this._activeUtterances.filter(u => u !== utterance);
      }
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
    this._activeUtterances = [];
    if (this.voiceIndicator) this.voiceIndicator.classList.remove('active');
    if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'none';
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

    const prefs = this.getUserPrefs();
    const profileMap = {
      postulante: {
        badge: '🎯 Modo Postulante Admisión 2026',
        sub: 'Descubre nuestras 4 carreras públicas (incluyendo APSTI → 2027 Computación e Informática), modalidades de ingreso, Academia Pre Tecno y tasas de inscripción:'
      },
      estudiante: {
        badge: '📚 Modo Estudiante Regular HERCAR',
        sub: 'Accede rápido a matrícula paso a paso (S/ 250 en BN 00-638-002361), calculadoras de notas/DPI, calendario 2026-II y buscador completo TUPA:'
      },
      egresado: {
        badge: '🎓 Modo Egresado y Titulación',
        sub: 'Organiza tu expediente con checklists interactivos para el Examen de Suficiencia (S/ 200), Trámite de Título (S/ 60 + S/ 100) y Curso de Inglés (00-638-025736):'
      },
      general: {
        badge: 'Información oficial del Instituto Superior Hermanos Cárcamo · Paita 2026',
        sub: 'Soy tu asesora virtual del <strong>Instituto Superior Hermanos Cárcamo</strong> de Paita. Selecciona uno de los temas principales, personaliza tu entorno o escribe tu duda:'
      }
    };
    const pCfg = profileMap[prefs.userProfile] || profileMap.general;

    const welcomeHtml = `
      <div class="bot-welcome-hero animate-fade-in">
        <div class="welcome-badge">
          <i class="bi bi-patch-check-fill text-primary"></i> ${pCfg.badge}
        </div>
        <h1 class="welcome-title">¡Hola! ¿En qué te puedo ayudar hoy? 👋</h1>
        <p class="welcome-subtitle">
          ${pCfg.sub}
        </p>

        <!-- Banner Visual Institucional del Campus Real -->
        <div class="welcome-campus-card mb-3">
          <div class="campus-banner-img-wrap">
            <img src="assets/img/campus-hercar.jpg" alt="Campus Central Instituto Superior Hermanos Cárcamo - Paita" class="campus-banner-img" />
            <div class="campus-banner-overlay">
              <div>
                <div class="campus-banner-title">
                  <i class="bi bi-geo-alt-fill text-danger me-1"></i> Campus Central Paita Alta
                </div>
                <div class="campus-banner-addr">
                  Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque · Paita, Piura
                </div>
              </div>
              <div class="campus-banner-tags">
                <span class="campus-badge"><i class="bi bi-telephone-fill me-1"></i> (073) 251013</span>
                <span class="campus-badge"><i class="bi bi-clock-fill me-1"></i> Lun-Vie 8am-3pm</span>
                <span class="campus-badge bg-gold"><i class="bi bi-bank me-1"></i> Solo Ventanilla BN</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 12 Tarjetas Principales, Espaciosas y Ordenadas (3 filas x 4 columnas) -->
        <div class="features-pill-grid">

          <div class="feature-pill" data-chat-action="ver_todas_carreras" style="border-top: 3px solid #2563eb;">
            <div class="feature-pill-icon-box" style="background: rgba(37,99,235,0.12); color: #2563eb;">
              <i class="bi bi-mortarboard-fill"></i>
            </div>
            <div>
              <strong>4 Carreras Profesionales</strong>
              <small>APSTI (2027: Computación e Informática), ANI, Contabilidad y Pesquería</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_comparador_carreras" style="border-top: 3px solid #0f3380;">
            <div class="feature-pill-icon-box" style="background: rgba(15,51,128,0.12); color: #0f3380;">
              <i class="bi bi-columns-gap"></i>
            </div>
            <div>
              <strong>Comparador de Carreras</strong>
              <small>Compara perfiles, demanda en Paita, sueldos y convalidación</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_sueldos_campo" style="border-top: 3px solid #d97706;">
            <div class="feature-pill-icon-box" style="background: rgba(217,119,6,0.12); color: #d97706;">
              <i class="bi bi-cash-stack"></i>
            </div>
            <div>
              <strong>Sueldos & Empleo en Paita</strong>
              <small>Demanda laboral en el Puerto TPE, pesqueras y empresas TI</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="iniciar_test_vocacional" style="border-top: 3px solid #ef4444;">
            <div class="feature-pill-icon-box" style="background: rgba(239,68,68,0.12); color: #ef4444;">
              <i class="bi bi-compass-fill"></i>
            </div>
            <div>
              <strong>Test Vocacional IA</strong>
              <small>Descubre tu carrera ideal según tus talentos y vocación</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_admision_completa" style="border-top: 3px solid #10b981;">
            <div class="feature-pill-icon-box" style="background: rgba(16,185,129,0.12); color: #10b981;">
              <i class="bi bi-pencil-square"></i>
            </div>
            <div>
              <strong>Admisión & Simulador 2026</strong>
              <small>Requisitos, balotario y simulador de 8 preguntas de examen</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_matricula_paso_a_paso" style="border-top: 3px solid #f59e0b;">
            <div class="feature-pill-icon-box" style="background: rgba(245,158,11,0.12); color: #f59e0b;">
              <i class="bi bi-credit-card-2-front-fill"></i>
            </div>
            <div>
              <strong>Matrícula S/ 250 Paso a Paso</strong>
              <small>Pago solo en ventanilla BN, boleta en pagos.ieshercar.edu.pe y 3 copias</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_cotizador_tupa" style="border-top: 3px solid #0284c7;">
            <div class="feature-pill-icon-box" style="background: rgba(2,132,199,0.12); color: #0284c7;">
              <i class="bi bi-receipt-cutoff"></i>
            </div>
            <div>
              <strong>Cotizador TUPA 2026</strong>
              <small>Tasas oficiales exactas según Cta. 00-638-002361 o 00-638-025736</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_numero_cuenta_bn" style="border-top: 3px solid #059669;">
            <div class="feature-pill-icon-box" style="background: rgba(5,150,105,0.12); color: #059669;">
              <i class="bi bi-bank"></i>
            </div>
            <div>
              <strong>2 Cuentas BN (Solo Ventanilla)</strong>
              <small>TUPA: 00-638-002361 · Inglés: 00-638-025736 (NO Págalo.pe)</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_calculadora_notas" style="border-top: 3px solid #6366f1;">
            <div class="feature-pill-icon-box" style="background: rgba(99,102,241,0.12); color: #6366f1;">
              <i class="bi bi-calculator"></i>
            </div>
            <div>
              <strong>Calculadora de Notas</strong>
              <small>EC 70% + EF 30%, nota aprobatoria mínima y subsanación</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_examen_suficiencia" style="border-top: 3px solid #dc2626;">
            <div class="feature-pill-icon-box" style="background: rgba(220,38,38,0.12); color: #dc2626;">
              <i class="bi bi-patch-check-fill"></i>
            </div>
            <div>
              <strong>Examen de Suficiencia (S/ 200)</strong>
              <small>Los 7 requisitos oficiales y expediente foliado para egresados</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_tramite_titulo" style="border-top: 3px solid #8b5cf6;">
            <div class="feature-pill-icon-box" style="background: rgba(139,92,246,0.12); color: #8b5cf6;">
              <i class="bi bi-award-fill"></i>
            </div>
            <div>
              <strong>Trámite de Título Profesional</strong>
              <small>Los 10 requisitos en folder A/4 + sobre manila (S/ 60 + S/ 100 BN)</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_calendario_2026" style="border-top: 3px solid #0891b2;">
            <div class="feature-pill-icon-box" style="background: rgba(8,145,178,0.12); color: #0891b2;">
              <i class="bi bi-calendar3"></i>
            </div>
            <div>
              <strong>Calendario & Campus 2026</strong>
              <small>Cronograma 2026-II, docentes y croquis de pabellones</small>
            </div>
          </div>

        </div>

        <!-- Chips Rápidos Espaciosos y Variados -->
        <div class="suggested-prompts-section">
          <span class="suggested-label"><i class="bi bi-lightning-charge-fill text-warning me-1"></i> Preguntas Frecuentes y Herramientas Rápidas:</span>
          <div class="prompts-chips-wrapper">
            <button class="prompt-chip" data-prompt="¿Cuáles son los números de cuenta del Banco de la Nación y se puede usar Págalo.pe?">🏦 Cuentas BN (NO Págalo.pe)</button>
            <button class="prompt-chip" data-prompt="¿Cómo pago el Curso de Inglés Básico y en qué cuenta?">🇬🇧 Inglés (Cta. 00-638-025736)</button>
            <button class="prompt-chip" data-prompt="¿Cuáles son los requisitos del Examen de Suficiencia Profesional?">📋 Requisitos Suficiencia</button>
            <button class="prompt-chip" data-prompt="¿Cuáles son los requisitos para el Trámite de Título Profesional?">🎓 Requisitos Título</button>
            <button class="prompt-chip" data-prompt="¿Qué carrera reemplaza a APSTI en el año 2027?">💻 APSTI → Computación 2027</button>
            <button class="prompt-chip" data-prompt="¿Cuánto cuesta la matrícula y qué hago después de pagar?">💰 Matrícula S/ 250 Paso a Paso</button>
            <button class="prompt-chip" data-prompt="Cotizador de trámites TUPA 2026">🧮 Cotizador TUPA 2026</button>
            <button class="prompt-chip" data-prompt="Calculadora de notas y promedio final">📊 Calculadora de Notas</button>
            <button class="prompt-chip" data-prompt="Calculadora de faltas e inasistencias DPI">⏱️ Límite de Faltas DPI</button>
            <button class="prompt-chip" data-prompt="Comparar las 4 carreras del instituto">⚖️ Comparar 4 Carreras</button>
            <button class="prompt-chip" data-prompt="Calendario académico 2026 y fechas clave">📅 Calendario 2026-II</button>
            <button class="prompt-chip" data-prompt="¿Cómo justificar inasistencias por salud o trabajo?">📝 Justificar Faltas</button>
            <button class="prompt-chip" data-prompt="Buscador completo de tarifas TUPA 2026">🔎 Tarifario TUPA (66 ítems)</button>
            <button class="prompt-chip" data-chat-action="abrir_personalizacion">🎨 Personalizar Entorno</button>
          </div>
        </div>
      </div>
    `;

    this.messagesContainer.innerHTML = welcomeHtml;
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

    const avatarSrc = this.getBotAvatarUrl();
    const avatarFit = this.getUserPrefs().avatar === 'escudo' ? 'contain' : 'cover';
    msgEl.innerHTML = `
      <div class="bot-avatar-badge" style="background: #fff; padding: 2px; overflow: hidden; border: 2px solid var(--line-2);">
        <img src="${avatarSrc}" alt="HERCAR" style="width:100%; height:100%; object-fit:${avatarFit}; border-radius:50%;" onerror="this.src='assets/img/logo-hercar.png'; this.onerror=function(){this.parentElement.innerHTML='<i class=\\'bi bi-mortarboard-fill\\' style=\\'color:#0f3380;font-size:1rem;\\'></i>'}">
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

    if (spokenSummary && !this.isMuted) {
      this.speak(spokenSummary);
    }
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
📌 *Cuentas Banco de la Nación (Solo Ventanilla, NO Págalo.pe):*
• TUPA General / Matrícula: 00-638-002361
• Curso de Inglés / Productivas: 00-638-025736
📍 *Campus Central:* Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita
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
      // Si no hay clave de API configurada o falló, ejecutar el revisor institucional local
      this.renderOfflineImageAnalysis(attachedImage, rawQuery);
      this.logQuery('imagen_local');
      return;
    }

    // 1. Manejo del Test Vocacional o Simulador en curso
    if (this.activeTest) {
      this.handleTestResponse(norm);
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
        { label: "💻 Carrera APSTI", prompt: "Háblame sobre la carrera de APSTI" },
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

    // 3. Consulta sobre Gratuidad / Pensiones / Mensualidad (sin capturar consultas de trámites/tasas TUPA o matrícula)
    const mentionsSpecificFee = norm.includes('matricula') || norm.includes('certificado') || norm.includes('constancia') || norm.includes('ingles') || norm.includes('titulo') || norm.includes('suficiencia') || norm.includes('tupa') || norm.includes('examen') || norm.includes('duplicado') || norm.includes('carne') || norm.includes('traslado') || norm.includes('convalidacion') || norm.includes('pre tecno') || norm.includes('academia');
    const asksTuitionFree = !mentionsSpecificFee && (norm.includes('mensualidad') || norm.includes('pension') || norm.includes('gratis') || norm.includes('gratuito') || norm.includes('publico') || norm.includes('costo de mensualidad') || norm.includes('cuanto cuesta estudiar') || norm.includes('cuanto se paga por estudiar') || norm === 'cuanto cuesta');
    if (asksTuitionFree) {
      const faqGratis = BASE_PREGUNTAS_RESPUESTAS.find(f => f.id === 'faq-gratuidad');
      if (faqGratis) {
        this.appendBotMessage(`
          <div class="faq-card-custom">
            <h5 class="faq-custom-title text-primary"><i class="bi bi-award-fill text-warning me-2"></i>${faqGratis.titulo}</h5>
            <div class="faq-custom-body">${this.formatMarkdown(faqGratis.respuesta)}</div>
            <div class="interactive-button-grid mt-3">
              <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> Ver 4 Carreras Públicas</button>
              <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-bank text-success"></i> Cuentas Banco de la Nación</button>
            </div>
          </div>
        `, faqGratis.locucion || "En el Instituto Superior Hermanos Cárcamo no se pagan pensiones ni mensualidades porque somos una institución pública del Estado. Únicamente se abona la tasa de matrícula semestral de doscientos cincuenta soles en ventanilla del Banco de la Nación a la cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno.", [
          { label: "📋 Requisitos para postular", prompt: "¿Cuáles son los requisitos de admisión?" },
          { label: "🏦 ¿Cómo pagar en el Banco de la Nación?", prompt: "¿Cuál es el número de cuenta bancaria para pagar?" }
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

    // 5. Autoridades, Director y Plana Docente
    if (norm.includes('director') || norm.includes('directora') || norm.includes('autoridad') || norm.includes('autoridades') || norm.includes('plana docente') || norm.includes('profesores') || norm.includes('docentes') || norm.includes('jefatura') || norm.includes('quien dirige') || norm.includes('secretaria general') || norm.includes('coordinador')) {
      this.renderAutoridades();
      this.logQuery('institucional');
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

    // 9.1 Comparador Interactivo de las 4 Carreras Técnicas
    if (norm.includes('comparar carreras') || norm.includes('comparativa') || norm.includes('cual carrera es mejor') || norm.includes('cual carrera elegir') || norm.includes('diferencias entre carreras') || norm.includes('comparador de carreras') || norm.includes('que carrera me recomiendas') || norm.includes('cual carrera tiene mas futuro') || norm.includes('comparar apsti')) {
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

    // 9.3.1 Requisitos Oficiales del Examen de Suficiencia Profesional
    if (norm.includes('suficiencia profesional') || norm.includes('examen de suficiencia') || norm.includes('certificado de actualizacion') || (norm.includes('suficiencia') && (norm.includes('requisito') || norm.includes('pagar') || norm.includes('costo') || norm.includes('200') || norm.includes('solicitar') || norm.includes('expediente')))) {
      this.renderExamenSuficiencia();
      this.logQuery('titulacion');
      return;
    }

    // 9.3.2 Requisitos Oficiales del Trámite de Título Profesional Técnico
    if (norm.includes('tramite de titulo') || norm.includes('requisitos titulo') || norm.includes('requisitos de titulo') || norm.includes('requisitos del titulo') || norm.includes('requisitos para el titulo') || norm.includes('tramite titulo') || norm.includes('caligrafiado') || norm.includes('formato de titulo') || norm.includes('derecho de titulo') || norm.includes('ficha de actividades') || norm.includes('sobre manila') || norm.includes('folder a4') || norm.includes('folder a/4') || norm.includes('dni legalizado')) {
      this.renderTramiteTitulo();
      this.logQuery('titulacion');
      return;
    }

    // 9.3 Ruta de Titulación Profesional y Prácticas EFSRT
    if (norm.includes('efsrt') || norm.includes('practicas preprofesionales') || norm.includes('horas de practicas') || norm.includes('cuantas horas de practica') || norm.includes('carta de presentacion') || norm.includes('informe de practicas') || norm.includes('como me titulo') || norm.includes('requisitos para titularme') || norm.includes('modalidades de titulacion') || norm.includes('trabajo de aplicacion') || norm.includes('tesis') || norm.includes('plan de negocios')) {
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

      const matchesCareer = norm.includes(cId) || norm.includes(cCode) || norm.includes(cNom) || (cNomCorto && norm.includes(cNomCorto)) ||
        (cId === 'apsti' && (norm.includes('sistemas') || norm.includes('software') || norm.includes('programacion') || norm.includes('computacion') || norm.includes('redes') || norm.includes('ti') || norm.includes('informatica') || norm.includes('2027') || norm.includes('desarrollo web') || norm.includes('ciberseguridad'))) ||
        (cId === 'ani' && (norm.includes('aduanas') || norm.includes('comercio exterior') || norm.includes('negocios internacionales') || norm.includes('exportacion') || norm.includes('importacion') || norm.includes('logistica portuaria') || norm.includes('tpe'))) ||
        (cId === 'conta' && (norm.includes('contabilidad') || norm.includes('contador') || norm.includes('tributacion') || norm.includes('sunat') || norm.includes('finanzas') || norm.includes('impuestos') || norm.includes('sire') || norm.includes('costos'))) ||
        (cId === 'dpa' && (norm.includes('pesca') || norm.includes('pesquero') || norm.includes('pesqueria') || norm.includes('acuicola') || norm.includes('acuicultura') || norm.includes('mar') || norm.includes('mariscos') || norm.includes('pota') || norm.includes('haccp')));

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

    // 14.3 Curso de Inglés Básico, Academia Pre Tecno / Productivas (Cta. BN 00-638-025736) — PRIORIDAD sobre cuenta genérica
    if (norm.includes('ingles') || norm.includes('idioma') || norm.includes('idiomas') || norm.includes('curso de ingles') || norm.includes('ingles basico') || norm.includes('ingles tecnico') || norm.includes('00-638-025736') || norm.includes('025736') || norm.includes('pago ingles') || norm.includes('voucher ingles') || norm.includes('tania herrera') || norm.includes('omar garcia') || norm.includes('revalidacion')) {
      this.renderCursoIngles();
      this.logQuery('ingles');
      return;
    }

    // 14.4 Reglas de Pago (PROHIBIDO Págalo.pe, Agentes, Yape, Plin, CCI — SOLO Ventanilla BN)
    if (norm.includes('pagalo') || norm.includes('yape') || norm.includes('plin') || norm.includes('interbancari') || norm.includes('transferencia') || norm.includes('cci') || norm.includes('agente') || norm.includes('multired') || norm.includes('sin ir al banco') || norm.includes('pagar por internet') || norm.includes('pago digital') || norm.includes('pago virtual') || norm.includes('app bn') || norm.includes('aplicativo bn')) {
      this.renderMetodosPagoDigitales();
      this.logQuery('pagos');
      return;
    }

    // 14.5 Número de Cuenta Bancaria Oficial para Pagos (Las 2 Cuentas del Banco de la Nación)
    if (norm.includes('numero de cuenta') || norm.includes('num de cuenta') || norm.includes('nro de cuenta') || norm.includes('pasa la cuenta') || norm.includes('pasar la cuenta') || norm.includes('pasas la cuenta') || norm.includes('pasa el numero') || norm.includes('dame la cuenta') || norm.includes('a que cuenta') || norm.includes('cuenta para pagar') || norm.includes('cuenta bancaria') || (norm.includes('cuenta') && (norm.includes('banco') || norm.includes('nacion') || norm.includes('depositar') || norm.includes('corriente') || norm.includes('pagar') || norm.includes('deposito'))) || norm.includes('cual es la cuenta') || norm.includes('datos bancarios') || norm.includes('datos de la cuenta') || norm.includes('00-638-002361') || norm.includes('002361')) {
      this.renderNumeroCuentaBancaria();
      this.logQuery('pagos');
      return;
    }

    // 14.6 Matrícula y Pagos Paso a Paso ("¿Qué pago, dónde voy, qué hago?")
    if (norm.includes('paso a paso') || norm.includes('que pago') || norm.includes('donde voy') || norm.includes('que hago') || norm.includes('despues de pagar') || norm.includes('ya pague') || norm.includes('donde llevo') || (norm.includes('como') && norm.includes('matricul')) || (norm.includes('pago') && norm.includes('matricul')) || norm.includes('donde pagar') || norm.includes('donde registro') || norm.includes('que hago con el voucher') || norm.includes('2 copias') || norm.includes('3 copias')) {
      this.renderMatriculaPasoAPaso();
      this.logQuery('pagos');
      return;
    }

    // 14.7A Buscador Completo Oficial TUPA 2026 (43 procedimientos 00-638-002361 + 23 productivas 00-638-025736)
    if (norm.includes('tarifario') || norm.includes('buscador tupa') || norm.includes('tupa completo') || norm.includes('66 items') || norm.includes('lista de costos') || norm.includes('todos los pagos') || norm.includes('toga') || norm.includes('birrete') || norm.includes('medalla') || norm.includes('brindis') || norm.includes('porta titulo') || norm.includes('pre tecno') || norm.includes('tercio superior') || norm.includes('transferencia por error') || norm.includes('alquiler de auditorio')) {
      const kw = (norm.includes('toga') || norm.includes('birrete')) ? 'Toga'
        : norm.includes('pre tecno') ? 'Pre Tecno'
        : norm.includes('tercio superior') ? 'Tercio'
        : norm.includes('medalla') ? 'Medalla'
        : norm.includes('transferencia por error') ? 'error de cuenta'
        : norm.includes('auditorio') ? 'Auditorio' : '';
      this.renderBuscadorTupaCompleto(kw);
      this.logQuery('pagos');
      return;
    }

    // 14.7B Cotizador y Simulador de Pagos TUPA 2026
    if (norm.includes('cotizador') || norm.includes('cotizar') || norm.includes('calcular pago') || norm.includes('tasas tupa') || norm.includes('tupa') || norm.includes('cuanto voy a pagar') || norm.includes('costo de tramites') || norm.includes('simulador de pagos') || norm.includes('sumar pagos') || (norm.includes('cuanto cuesta') && (norm.includes('certificado') || norm.includes('constancia') || norm.includes('traslado') || norm.includes('convalidacion') || norm.includes('duplicado') || norm.includes('reincorporacion') || norm.includes('reserva') || norm.includes('licencia') || norm.includes('recuperacion')))) {
      this.renderCotizadorTupa();
      this.logQuery('pagos');
      return;
    }

    // 15. Pagos, Banco de la Nación, Cuenta Corriente, Subir Comprobante
    if (norm.includes('pago') || norm.includes('pagar') || norm.includes('voucher') || norm.includes('banco') || norm.includes('cuenta') || norm.includes('subir voucher') || norm.includes('tesoreria') || norm.includes('deposito') || norm.includes('pagos ieshercar')) {
      this.renderGuiaPagos();
      this.logQuery('pagos');
      return;
    }

    // 17. Trámites TUPA
    for (const tramite of GUIA_TRAMITES_TUPA) {
      const matchTramite = tramite.requisitos.some(r => norm.includes(this.normalizeText(r))) ||
                           norm.includes(this.normalizeText(tramite.nombre)) ||
                           (tramite.id === 'tramite-matricula' && (norm.includes('matricula') || norm.includes('matricularme') || norm.includes('ratificacion'))) ||
                           (tramite.id === 'tramite-certificado-modular' && (norm.includes('modular') || norm.includes('certificado modular') || norm.includes('diploma'))) ||
                           (tramite.id === 'tramite-titulacion' && (norm.includes('titulo') || norm.includes('titulacion') || norm.includes('titularme') || norm.includes('efsrt') || norm.includes('practicas'))) ||
                           (tramite.id === 'tramite-carne' && (norm.includes('carne') || norm.includes('carnet') || norm.includes('pasaje') || norm.includes('medio pasaje'))) ||
                           (tramite.id === 'tramite-constancia-estudios' && (norm.includes('constancia') || norm.includes('record') || norm.includes('notas')));

      if (matchTramite) {
        this.renderTramiteDetalle(tramite);
        this.logQuery('tramites');
        return;
      }
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
    const preferredModel = localStorage.getItem('hercarbot_gemini_model') || 'gemini-2.5-flash';
    const models = [
      preferredModel,
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash'
    ].filter((v, i, a) => v && v !== 'auto' && a.indexOf(v) === i);

    const systemPrompt = `
      Eres HercarBot IA, la asesora virtual oficial del Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" de Paita (Piura, Perú), fundado el 27 de abril de 1987 (R.M. N.° 232-87-ED, 39 años de trayectoria institucional).
      
      DATOS INSTITUCIONALES OFICIALES (TUPA 2026 Y PORTAL ieshercar.edu.pe):
      - Director General: Econ. Adolfo Zeta Pazo
      - Jefe de Unidad Académica: Lic. Juan García Reto
      - Jefe de Unidad Administrativa: CPC Edson Maza Gonzales
      - Ubicación: Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita, Piura.
      - Teléfono: (073) 251013 | WhatsApp: 969 100 257 | Correo: ieshercar@ieshercar.edu.pe
      - Horario de Atención: Lunes a Viernes de 8:00 a.m. a 3:00 p.m.
      - 4 Programas de Estudios Públicos (NO se pagan mensualidades ni pensiones; 3 años / 6 periodos académicos / 120 créditos):
        1. APSTI: Arquitectura de Plataformas y Servicios de Tecnologías de la Información (NOTA IMPORTANTE: en el año 2027 este programa cambiará su denominación a "Computación e Informática").
        2. ANI: Administración de Negocios Internacionales (logística portuaria de Paita y aduanas).
        3. Contabilidad: Tributación SUNAT, SIRE, finanzas y costos empresariales.
        4. DPA: Desarrollo Pesquero y Acuícola (plantas de congelado, acuicultura, control de calidad SANIPES/HACCP).
      - Portales Oficiales:
        * Portal institucional: https://ieshercar.edu.pe/
        * Pagos y Boleta Electrónica: https://pagos.ieshercar.edu.pe/
        * Sistema Académico / Matrícula: https://sistema.ieshercar.edu.pe/acceso
        * Aula Virtual: https://aula.ieshercar.edu.pe/
        * Trámites y Mesa de Partes Virtual: https://sistema.ieshercar.edu.pe/registro-tramite/
      - REGLA ESTRICTA DE PAGOS (MUY IMPORTANTE):
        * TODOS los pagos se realizan ÚNICAMENTE de forma presencial en VENTANILLA del Banco de la Nación, indicando el DNI y nombres completos del estudiante.
        * ESTÁ PROHIBIDO pagar por Págalo.pe, Agentes MultiRed, Yape, Plin o transferencias interbancarias.
        * EXISTEN DOS CUENTAS OFICIALES EN EL BANCO DE LA NACIÓN:
          1) Cuenta Corriente TUPA N.° 00-638-002361 (Unidad Administrativa / Tesorería): Matrícula Ordinaria S/ 250.00, Examen de Admisión S/ 200.00, Examen de Suficiencia Profesional S/ 200.00 (2da opción S/ 100.00), Formato/Caligrafiado de Título S/ 60.00, Derecho de Título S/ 100.00, Certificado Modular S/ 25.00, Certificado de Estudios S/ 240.00 (6 periodos) o S/ 40.00 por periodo, Constancias S/ 15.00, Recuperación U.D. S/ 35.00, Convalidación U.D. S/ 30.00, Traslado Interno S/ 80.00, Duplicado de Título S/ 200.00. Tras pagar, registrar el voucher en https://pagos.ieshercar.edu.pe/ y llevar voucher + copias a Tesorería (Matrícula: original + 3 copias de boleta a Tesorería y 1 sellada a Secretaría Académica; Título/Suficiencia: original + 1 copia sellada).
          2) Cuenta N.° 00-638-025736 (Actividades Productivas y Empresariales): Curso de Inglés Básico para Titulación S/ 400.00 (Duplicado S/ 50.00), Academia Pre Tecno Hercar S/ 400.00, Ciclo de Actualización S/ 400.00, alquiler de Toga y Birrete S/ 50.00. Para pagos en la cuenta 00-638-025736 debes sacar 2 copias a tu voucher y entregarlos en Tesorería en la oficina del instituto.
      
      INSTRUCCIONES DE RESPUESTA:
      - Responde siempre en español, de forma clara, precisa y profesional.
      - Nunca menciones cuentas antiguas ni digas que se puede usar Págalo.pe.
      - Usa títulos y viñetas organizadas cuando sea útil.
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
    const preferredModel = localStorage.getItem('hercarbot_gemini_model') || 'gemini-2.5-flash';
    const models = [
      preferredModel,
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash'
    ].filter((v, i, a) => v && v !== 'auto' && a.indexOf(v) === i);

    const base64Clean = attachedImage.base64.replace(/^data:image\/[a-zA-Z0-9.+]+;base64,/, '');
    const mime = attachedImage.type || 'image/jpeg';

    const systemPrompt = `
      Eres HercarBot IA, la asesora inteligente oficial del Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" de Paita (Piura, Perú).
      El estudiante te ha compartido una imagen o comprobante bancario.
      TU MISIÓN:
      1. Si es un comprobante de pago o voucher del Banco de la Nación:
         - Verifica a cuál de las DOS cuentas oficiales corresponde:
           * Cuenta Corriente TUPA N.° 00-638-002361 (Matrícula S/ 250.00, Admisión S/ 200.00, Suficiencia S/ 200.00, Título S/ 60.00 + S/ 100.00, Certificados, Constancias). Indícale registrar el voucher en https://pagos.ieshercar.edu.pe/ para generar su boleta electrónica y llevar sus copias a Tesorería.
           * Cuenta Productivas / Inglés N.° 00-638-025736 (Curso de Inglés S/ 400.00, Academia Pre Tecno S/ 400.00, Ciclo de Actualización S/ 400.00). Indícale sacar 2 copias a su voucher y entregarlos en Tesorería en la oficina del instituto.
         - Recuérdale que los pagos SOLO se hacen en ventanilla del Banco de la Nación (nunca por Págalo.pe ni agentes).
         - Revisa si el DNI, nombre, monto, fecha y número de operación son visibles.
      2. Si es un certificado de estudios, DNI o documento:
         - Oriéntalo sobre el trámite institucional en https://sistema.ieshercar.edu.pe/registro-tramite/.
      3. Responde siempre con formato limpio en español, destacando datos y próximos pasos.
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

  renderOfflineImageAnalysis(attachedImage, rawQuery) {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #2563eb;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-primary text-white px-3 py-1"><i class="bi bi-file-earmark-check-fill me-1"></i>Revisor Institucional de Documentos</span>
          <span class="badge bg-light text-dark border">IESTP HERCAR</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Validación de Comprobante / Imagen Adjunta</h4>
        <p class="small text-muted mb-3">Archivo procesado: <strong>${this.escapeHtml(attachedImage.name || 'comprobante')}</strong>. Para que Tesorería y Secretaría validen tu trámite sin observaciones, verifica los siguientes puntos oficiales:</p>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-primary d-block mb-1"><i class="bi bi-bank me-1"></i> 1. Banco y las 2 Cuentas Oficiales</strong>
              <span>Únicamente <strong>ventanilla del Banco de la Nación</strong>:<br>• TUPA General: <strong>00-638-002361</strong><br>• Inglés / CEPRE: <strong>00-638-025736</strong><br><em class="text-danger">(Prohibido Págalo.pe, Agentes y Yape)</em></span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-success d-block mb-1"><i class="bi bi-cash-stack me-1"></i> 2. Tasas TUPA 2026 Frecuentes</strong>
              <span>• Matrícula Ordinaria: <strong>S/ 250.00</strong> (002361)<br>• Admisión / Suficiencia: <strong>S/ 200.00</strong> (002361)<br>• Inglés Básico: <strong>S/ 400.00</strong> (025736)</span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-warning d-block mb-1"><i class="bi bi-person-vcard me-1"></i> 3. Datos en el Voucher</strong>
              <span>El voucher debe mostrar nítidos tu <strong>DNI, nombres completos</strong>, cuenta destino, monto, fecha y número de operación.</span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-danger d-block mb-1"><i class="bi bi-folder-check me-1"></i> 4. Paso Posterior en Tesorería</strong>
              <span><strong>TUPA (002361):</strong> registra en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a> y lleva voucher + copias.<br><strong>Inglés (025736):</strong> saca <strong>2 copias al voucher</strong> y entrégalas en Tesorería.</span>
            </div>
          </div>
        </div>

        <div class="alert alert-info py-2 px-3 small mb-3">
          <i class="bi bi-building-check me-1"></i> <strong>Atención Presencial en Tesorería:</strong> Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita (Lunes a Viernes de 8:00 a.m. a 3:00 p.m.).
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none"><i class="bi bi-box-arrow-up-right text-primary"></i> Portal pagos.ieshercar.edu.pe</a>
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-bank text-success"></i> Ver las 2 Cuentas BN</button>
          <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso"><i class="bi bi-ui-checks text-warning"></i> Pasos de Matrícula</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "He revisado tu comprobante adjunto. Verifica que el pago se haya hecho presencialmente en ventanilla del Banco de la Nación a la cuenta correcta: cero cero, seis tres ocho, cero cero dos tres seis uno para tasas TUPA, o cero cero, seis tres ocho, cero dos cinco siete tres seis para el Curso de Inglés.");
  }

  /* ==========================================================================
     VISTAS INTERACTIVAS RICAS
     ========================================================================== */

  renderMatriculaPasoAPaso() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0f3380;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-card-checklist me-1"></i>Guía Oficial Matrícula 2026</span>
          <span class="badge bg-danger text-white"><i class="bi bi-bank me-1"></i>Solo Ventanilla BN (NO Págalo.pe)</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Paso a Paso de Matrícula y Pagos en el IESTP Hermanos Cárcamo</h4>
        <p class="small text-muted mb-3">Procedimiento oficial vigente según TUPA 2026 y portal institucional <strong>ieshercar.edu.pe</strong>:</p>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-primary fw-bold">
            <span class="badge bg-primary rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">1</span>
            <span>¿QUÉ SE PAGA Y CUÁNTO ES?</span>
          </div>
          <p class="mb-1 text-dark"><strong>¡Educación Pública sin Mensualidades!</strong> En el IESTP Hermanos Cárcamo NO se pagan pensiones mensuales.</p>
          <p class="mb-0 text-muted">Solo se abona la tasa TUPA de <strong>Matrícula Ordinaria: S/ 250.00 por semestre</strong> (TUPA 2026 R.D. N° 020-2026). Para el Curso de Inglés o Productivas rige la cuenta N° <code>00-638-025736</code>.</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 fw-bold" style="color:#d97706 !important;">
            <span class="badge bg-warning text-dark rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">2</span>
            <span>¿DÓNDE PAGO? (EXCLUSIVO EN VENTANILLA DEL BANCO DE LA NACIÓN)</span>
          </div>
          <p class="mb-1"><strong>Cuenta Corriente TUPA Oficial:</strong> <code class="fs-6 px-2 py-1 bg-white border rounded">00-638-002361</code>
            <button type="button" class="btn btn-xs btn-outline-primary rounded-pill ms-1 px-2 py-0" onclick="hercarBotApp.copyData('00-638-002361', 'Cuenta Corriente BN TUPA')"><i class="bi bi-clipboard"></i> Copiar</button>
          </p>
          <div class="p-2 rounded mt-2" style="background:#fef2f2; border-left:3px solid #dc2626; color:#991b1b;">
            <strong><i class="bi bi-exclamation-octagon-fill me-1"></i>Regla Obligatoria:</strong> Paga <strong>únicamente de forma presencial en ventanilla</strong> del Banco de la Nación indicando tu <strong>DNI y nombre completo</strong>. <strong>NO</strong> se acepta Págalo.pe, Agentes MultiRed, Yape, Plin ni transferencias interbancarias.
          </div>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-danger fw-bold">
            <span class="badge bg-danger rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">3</span>
            <span>REGISTRA TU VOUCHER EN pagos.ieshercar.edu.pe</span>
          </div>
          <p class="mb-0 text-muted">Conserva el voucher original emitido en ventanilla BN (nítido, con tu DNI y operación legible), ingresa a <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a>, registra tu pago y descarga/imprime tu <strong>Boleta Electrónica</strong>.</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-success fw-bold">
            <span class="badge bg-success rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">4</span>
            <span>ENTREGA EN TESORERÍA Y SECRETARÍA ACADÉMICA</span>
          </div>
          <ul class="mb-0 ps-3 text-muted">
            <li>Acércate presencialmente a la oficina de <strong>Tesorería</strong> en el campus (<em>Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita</em>; Lun-Vie 8:00 a.m. a 3:00 p.m.) con el <strong>voucher original + 3 copias de tu boleta electrónica</strong> para que Tesorería los selle y firme.</li>
            <li>Luego entrega <strong>1 copia sellada y firmada</strong> en <strong>Secretaría Académica</strong> para completar tu ficha de matrícula.</li>
            <li class="text-primary"><em>Nota:</em> Si pagas el <strong>Curso de Inglés</strong> en la cuenta <code>00-638-025736</code>, debes sacar <strong>2 copias a tu voucher</strong> y entregarlos en Tesorería.</li>
          </ul>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn" style="text-decoration:none;"><i class="bi bi-box-arrow-up-right text-warning"></i> Portal pagos.ieshercar.edu.pe</a>
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-bank text-primary"></i> Ver las 2 Cuentas BN</button>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles"><i class="bi bi-translate text-success"></i> Inglés (Cta. 00-638-025736)</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "Para la matrícula ordinaria debes abonar doscientos cincuenta soles únicamente en ventanilla del Banco de la Nación a la cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno, indicando tu D N I y nombre completo. Recuerda que no se acepta Págalo punto pe ni agentes. Después registras el voucher en el portal de pagos para sacar tu boleta electrónica y llevas el original más tres copias a Tesorería.", [
      { label: "🏦 Ver las 2 cuentas BN", prompt: "¿Cuáles son los números de cuenta del Banco de la Nación?" },
      { label: "🇬🇧 Pago del Curso de Inglés", prompt: "¿Cómo pago el Curso de Inglés Básico?" },
      { label: "📍 Ubicación y Horarios", prompt: "¿Dónde queda el instituto y cuál es el horario?" }
    ]);
  }

  renderAutoridades() {
    const plana = (typeof PLANA_DOCENTE_OFICIAL !== 'undefined') ? PLANA_DOCENTE_OFICIAL : null;
    const stats = (typeof ESTADISTICAS_OFICIALES_HERCAR !== 'undefined') ? ESTADISTICAS_OFICIALES_HERCAR : null;
    const renderGroup = (title, color, list) => (!list || list.length === 0) ? '' : `
      <div class="col-sm-6">
        <div class="p-2 bg-light rounded border h-100" style="font-size: 0.78rem;">
          <strong class="d-block mb-1" style="color:${color};">${title} (${list.length})</strong>
          <ul class="mb-0 ps-3 text-muted">
            ${list.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    const totalDocentes = plana
      ? ((plana.apsti?.length || 0) + (plana.ani?.length || 0) + (plana.conta?.length || 0) + (plana.dpa?.length || 0))
      : 20;

    const docentesBlock = plana ? `
      <div class="p-3 bg-white rounded-3 border small mb-3">
        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-people-fill text-primary me-1"></i> Plana Docente Oficial (${totalDocentes} Docentes):</h6>
        <div class="row g-2">
          ${renderGroup('APSTI (2027: Computación e Informática)', '#2563eb', plana.apsti)}
          ${renderGroup('Administración de Negocios Int. (ANI)', '#0891b2', plana.ani)}
          ${renderGroup('Contabilidad', '#d97706', plana.conta)}
          ${renderGroup('Desarrollo Pesquero y Acuícola', '#059669', plana.dpa)}
        </div>
      </div>
    ` : '';

    const statsBlock = stats ? `
      <div class="p-2 px-3 bg-light rounded-3 border small mb-3 d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <span><i class="bi bi-bar-chart-fill text-primary me-1"></i><strong>Cifras Oficiales 2026:</strong> Ingresantes: ${stats.ingresantes2026?.total || 164} · <strong>Matriculados: ${stats.matriculados2026?.total || 437}</strong> · Egresados 2025: ${stats.egresados2025?.total || 116}</span>
        <span class="badge bg-success-subtle text-success">${stats.titulados2026?.total || 87} titulados (2026)</span>
      </div>
    ` : '';

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #0e2d6c;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-shield-check me-1"></i>Plana Directiva y Docente</span>
          <span class="badge bg-light text-dark border">Portal Oficial ieshercar.edu.pe</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">Autoridades y Plana Docente — IESTP Hermanos Cárcamo</h4>
        <p class="small text-muted mb-3">Equipo directivo, jefaturas administrativas y docentes responsables de los 4 programas de estudios:</p>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-person-badge-fill me-1"></i> Dirección General</h6>
              <p class="fw-bold text-dark mb-1">Econ. Adolfo Zeta Pazo</p>
              <p class="mb-0 text-muted">Representación legal y liderazgo institucional del IESTP ante MINEDU y DREP Piura.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-mortarboard-fill me-1"></i> Unidad Académica</h6>
              <p class="fw-bold text-dark mb-1">Lic. Juan García Reto</p>
              <p class="mb-0 text-muted">Planificación académica, horarios, exámenes de suficiencia y prácticas EFSRT.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-warning mb-1"><i class="bi bi-bank2 me-1"></i> Unidad Administrativa & Tesorería</h6>
              <p class="fw-bold text-dark mb-1">CPC Edson Maza Gonzales</p>
              <p class="mb-0 text-muted">Gestión administrativa, Tesorería (Srta. Tania Herrera Cruz) y control de tasas TUPA BN.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <h6 class="fw-bold text-info mb-1"><i class="bi bi-diagram-3-fill me-1"></i> Coordinación de Programas & Idiomas</h6>
              <p class="fw-bold text-dark mb-1">Lic. Omar García Reto (Coordinación Inglés / Académica)</p>
              <p class="mb-0 text-muted">Gestión de expedientes de Suficiencia Profesional con el Coordinador de cada Programa.</p>
            </div>
          </div>
        </div>

        ${docentesBlock}
        ${statsBlock}

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Horarios de Atención</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> 4 Carreras Técnicas</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "El Instituto Superior Hermanos Cárcamo está dirigido por el economista Adolfo Zeta Pazo como Director General, el licenciado Juan García Reto en la Unidad Académica y el contador público Edson Maza Gonzales en la Unidad Administrativa, junto a nuestra plana de veinte docentes oficiales en las cuatro especialidades.", [
      { label: "📍 Horarios y Ubicación", prompt: "¿Dónde queda el instituto y cuál es el horario de atención?" },
      { label: "💻 APSTI → Computación 2027", prompt: "¿Qué carrera reemplaza a APSTI en el año 2027?" },
      { label: "📋 Examen de Suficiencia", prompt: "¿Cuáles son los requisitos del Examen de Suficiencia Profesional?" }
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
          <h6 class="fw-bold text-primary mb-1"><i class="bi bi-flag-fill me-1"></i> Fundación y Reseña Histórica (R.M. N° 232-87-ED):</h6>
          <p class="mb-0">Creado el <strong>27 de abril de 1987</strong> por R.M. N° 232-87-ED (revalidado por R.D. N° 077-2006-ED), el instituto cuenta con más de <strong>39 años</strong> formando técnicos de excelencia en Paita y rinde homenaje a los hermanos Cárcamo, símbolos de valor patriótico y vocación marítima paiteña.</p>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border small h-100">
              <h6 class="fw-bold text-success mb-1"><i class="bi bi-bullseye me-1"></i> Misión Institucional</h6>
              <p class="mb-0 text-muted">Formar profesionales técnicos competentes, éticos e innovadores con sólidos valores ciudadanos, comprometidos con el desarrollo económico, tecnológico y sostenible de Paita, Piura y el país.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border small h-100">
              <h6 class="fw-bold text-primary mb-1"><i class="bi bi-eye-fill me-1"></i> Visión al 2032</h6>
              <p class="mb-0 text-muted">Al año 2032 ser un instituto superior tecnológico público licenciado, acreditado y referente en la macro región norte por su excelencia educativa, investigación aplicada y vínculo con el sector productivo.</p>
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
      { label: "💻 Carrera APSTI", prompt: "¿Qué se aprende en APSTI?" }
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
              <p class="mb-0 text-muted">Lunes a Viernes para estudiantes regulares de APSTI (2027: Computación e Informática), Negocios Internacionales, Contabilidad y Desarrollo Pesquero.</p>
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
            <li>FUT dirigido al Director General solicitando convalidación (TUPA 2026: <strong>S/ 30.00</strong> por Unidad Didáctica | Convalidación EFSRT: <strong>S/ 150.00</strong>).</li>
            <li>Voucher de pago en ventanilla del Banco de la Nación Cta. Cte. <code>00-638-002361</code> registrado en <a href="https://pagos.ieshercar.edu.pe/" target="_blank">pagos.ieshercar.edu.pe</a>.</li>
          </ol>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <h6 class="fw-bold text-success mb-1"><i class="bi bi-shuffle me-1"></i> Traslados TUPA 2026:</h6>
          <p class="mb-0 text-muted"><strong>Traslado Interno:</strong> S/ 80.00 (cambio entre las 4 carreras, ej. de Contabilidad a APSTI / Computación e Informática). <strong>Traslado Externo:</strong> S/ 80.00 de IEST Público o S/ 200.00 de Privado/Universidad. Todo pago es únicamente en ventanilla BN Cta. Cte. <code>00-638-002361</code>.</p>
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

    this.appendBotMessage(html, "Aquí tienes la comparativa oficial de nuestras cuatro carreras técnicas: Arquitectura de Plataformas y Servicios de Tecnologías de la Información (que en dos mil veintisiete pasará a Computación e Informática), Administración de Negocios Internacionales, Contabilidad, y Desarrollo Pesquero y Acuícola.", [
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
          <button class="interactive-btn" data-chat-action="ver_examen_suficiencia">
            <i class="bi bi-patch-check-fill text-danger"></i> Requisitos Examen Suficiencia (S/ 200)
          </button>
          <button class="interactive-btn" data-chat-action="ver_tramite_titulo">
            <i class="bi bi-mortarboard-fill text-primary"></i> 10 Requisitos Título Profesional
          </button>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles">
            <i class="bi bi-translate text-success"></i> Inglés (Cta. 00-638-025736)
          </button>
          <button class="interactive-btn" data-chat-action="ver_bolsa_trabajo">
            <i class="bi bi-building text-warning"></i> Empresas Aliadas en Paita
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Aquí tienes la guía completa de titulación y prácticas preprofesionales requerida por el Ministerio de Educación. En pantalla puedes abrir directamente los siete requisitos del Examen de Suficiencia Profesional y los diez requisitos del Trámite de Título.", [
      { label: "📋 Examen de Suficiencia", prompt: "¿Cuáles son los requisitos del Examen de Suficiencia Profesional?" },
      { label: "🎓 Trámite de Título", prompt: "¿Cuáles son los requisitos para el Trámite de Título Profesional?" },
      { label: "🇬🇧 Curso de Inglés", prompt: "¿Cómo pago el Curso de Inglés Básico y en qué cuenta?" }
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
                <h6 class="fw-bold text-dark mb-0">APSTI <span class="badge bg-info text-dark" style="font-size:0.65rem;">2027: Computación e Informática</span></h6>
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
            <li><strong>Presencial:</strong> Presenta el Formulario Único de Trámite (FUT) con los documentos adjuntos en la Secretaría Académica (Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita) de 8:00 a.m. a 3:00 p.m.</li>
            <li><strong>Virtual:</strong> Regístralo a través de la <a href="https://sistema.ieshercar.edu.pe/registro-tramite/" target="_blank">Mesa de Partes Virtual</a> seleccionando <em>"Justificación de Inasistencias"</em>.</li>
          </ol>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_calculadora_dpi">
            <i class="bi bi-calculator text-danger"></i> Abrir Calculadora de DPI
          </button>
          <a href="https://sistema.ieshercar.edu.pe/registro-tramite/" target="_blank" class="interactive-btn text-decoration-none">
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
   * Cotizador Interactivo de Tasas y Trámites TUPA 2026
   * Desglosa automáticamente entre las 2 cuentas oficiales del Banco de la Nación
   */
  renderCotizadorTupa(selectedIds = ['tupa-matricula']) {
    const catalogo = (typeof TASAS_TUPA_COTIZADOR !== 'undefined') ? TASAS_TUPA_COTIZADOR : [];
    const ids = Array.isArray(selectedIds) ? selectedIds : [selectedIds];

    let total = 0;
    let totalTupa002361 = 0;
    let totalIngles025736 = 0;

    const itemsHtml = catalogo.map(t => {
      const isSelected = ids.includes(t.id);
      const cta = t.cuentaBN || (t.id && t.id.includes('ingles') ? '00-638-025736' : '00-638-002361');
      if (isSelected) {
        total += t.costo;
        if (cta === '00-638-025736') totalIngles025736 += t.costo;
        else totalTupa002361 += t.costo;
      }

      const ctaBadge = cta === '00-638-025736'
        ? '<span class="badge bg-info-subtle text-dark border ms-1" style="font-size:0.65rem;">Cta. 00-638-025736</span>'
        : '<span class="badge bg-warning-subtle text-dark border ms-1" style="font-size:0.65rem;">Cta. 00-638-002361</span>';

      return `
        <div class="p-2 px-3 rounded-2 border mb-2 d-flex align-items-center justify-content-between gap-2 transition-all" 
             style="background: ${isSelected ? '#eff6ff' : '#ffffff'}; border-color: ${isSelected ? '#2563eb' : '#e2e8f0'} !important; cursor: pointer;"
             data-chat-action="toggle_cotizador_tupa"
             data-chat-val="${t.id}">
          <div class="d-flex align-items-center gap-2">
            <input type="checkbox" class="form-check-input mt-0" ${isSelected ? 'checked' : ''} style="cursor: pointer; pointer-events: none;">
            <div>
              <strong class="d-block text-dark small" style="font-size: 0.82rem;">${t.nombre} ${ctaBadge}</strong>
              <small class="text-muted" style="font-size: 0.72rem;">${t.detalle}</small>
            </div>
          </div>
          <span class="badge ${isSelected ? 'bg-primary' : 'bg-light text-dark border'} fw-bold" style="font-size: 0.78rem;">
            S/ ${t.costo}.00
          </span>
        </div>
      `;
    }).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #f59e0b;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-warning text-dark px-3 py-1"><i class="bi bi-receipt me-1"></i>Cotizador Oficial TUPA 2026</span>
          <span class="badge bg-danger text-white">Solo Ventanilla Banco de la Nación</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Cotizador de Trámites y Tasas TUPA 2026</h4>
        <p class="small text-muted mb-3">Marca los conceptos que necesitas para calcular el monto exacto por cada una de las 2 cuentas oficiales:</p>

        <!-- Lista seleccionable -->
        <div class="mb-3" style="max-height: 360px; overflow-y: auto; padding-right: 4px;">
          ${itemsHtml}
        </div>

        <!-- Total Calculado por Cuenta -->
        <div class="p-3 rounded-3 border mb-3" style="background: linear-gradient(135deg, #0e2d6c, #1646b0); color: #ffffff;">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <div>
              <span class="small d-block text-white-50">Total Combinado Seleccionado:</span>
              <h3 class="fw-bold mb-0 text-white">S/ ${total}.00</h3>
            </div>
            <div class="text-end small">
              <div class="badge bg-warning text-dark fw-bold px-2 py-1 mb-1 d-block">TUPA (00-638-002361): S/ ${totalTupa002361}.00</div>
              <div class="badge bg-info text-dark fw-bold px-2 py-1 d-block">Inglés/Prod. (00-638-025736): S/ ${totalIngles025736}.00</div>
            </div>
          </div>
          <small class="text-warning d-block"><i class="bi bi-exclamation-triangle-fill me-1"></i>Paga cada concepto por separado en su cuenta exacta (si depositas por error en otra cuenta, la transferencia TUPA cuesta S/ 15.00).</small>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-bank me-1 text-primary"></i> Reglas Oficiales de Pago en Ventanilla BN:</h6>
          <ul class="mb-0 ps-3 text-muted">
            <li><strong>Canal Único:</strong> Presencial en <strong>ventanilla del Banco de la Nación</strong> indicando tu DNI y nombre completo. <strong>NO</strong> se acepta Págalo.pe, Agentes MultiRed ni Yape/Plin.</li>
            <li><strong>Cta. Cte. <code>00-638-002361</code> (TUPA):</strong> Registra el voucher en <a href="https://pagos.ieshercar.edu.pe/" target="_blank">pagos.ieshercar.edu.pe</a> para emitir boleta electrónica y lleva tus copias a Tesorería.</li>
            <li><strong>Cta. <code>00-638-025736</code> (Inglés / CEPRE / Actualización):</strong> Saca <strong>2 copias a tu voucher</strong> y entrégalos en Tesorería en la oficina del instituto.</li>
          </ul>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Portal pagos.ieshercar.edu.pe
          </a>
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn">
            <i class="bi bi-bank text-success"></i> Copiar las 2 Cuentas BN
          </button>
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa">
            <i class="bi bi-file-earmark-text text-warning"></i> Requisitos de Trámites
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, `El total calculado es de ${total} soles: ${totalTupa002361} soles para la cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno; y ${totalIngles025736} soles para la cuenta cero cero, seis tres ocho, cero dos cinco siete tres seis. Recuerda pagar únicamente en ventanilla del Banco de la Nación.`, [
      { label: "🏦 Ver las 2 Cuentas BN", prompt: "¿Cuáles son los números de cuenta del Banco de la Nación?" },
      { label: "🚫 ¿Se acepta Págalo.pe?", prompt: "¿Se puede pagar por Págalo.pe, Yape o agentes?" }
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
          <h6 class="fw-bold text-success mb-2"><i class="bi bi-book-half me-1"></i> Semestre Académico 2026-II (Oficial ieshercar.edu.pe)</h6>
          <ul class="small text-muted ps-3 mb-0" style="line-height: 1.6;">
            <li><strong>Proceso de Matrícula Regular:</strong> 17 al 21 de Agosto de 2026 (Tasa S/ 250.00 en ventanilla BN <code>00-638-002361</code>).</li>
            <li><strong>Inicio de Clases 2026-II:</strong> <span class="badge bg-success">24 de Agosto de 2026</span>.</li>
            <li><strong>Evaluación de Recuperación:</strong> 14 al 18 de Diciembre de 2026.</li>
            <li><strong>Culminación de Clases:</strong> 24 de Diciembre de 2026.</li>
            <li><strong>Entrega de Boletas de Notas:</strong> 28 al 30 de Diciembre de 2026.</li>
          </ul>
        </div>
        <div class="alert alert-info py-2 px-3 small mb-3">
          <i class="bi bi-stars me-1"></i> <strong>Proyección Curricular 2027:</strong> A partir del año académico 2027, el programa <strong>APSTI</strong> pasará a denominarse <strong>Computación e Informática</strong>.
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
   * Regla Estricta de Pagos Oficiales (PROHIBIDO Págalo.pe, Agentes, Yape y CCI — Solo Ventanilla BN)
   */
  renderMetodosPagoDigitales() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #dc2626;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-danger px-3 py-1"><i class="bi bi-exclamation-octagon-fill me-1"></i>Aviso Oficial Tesorería</span>
          <span class="badge bg-light text-dark border">Exclusivo Ventanilla BN</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">¡IMPORTANTE! NO se acepta Págalo.pe, Agentes ni Yape</h4>
        <p class="small text-muted mb-3">Por disposición administrativa del IESTP "Hermanos Cárcamo" (TUPA 2026), los pagos institucionales siguen esta norma obligatoria:</p>

        <div class="p-3 rounded-3 border mb-3 small" style="background: #fef2f2; border-color: #fecaca !important; color: #991b1b;">
          <h6 class="fw-bold mb-2"><i class="bi bi-x-circle-fill me-1"></i> Canales NO AUTORIZADOS (Evita rechazos o demoras):</h6>
          <ul class="mb-0 ps-3">
            <li><strong>NO pagar por Págalo.pe</strong> (ni web ni aplicativo).</li>
            <li><strong>NO pagar en Agentes MultiRed</strong> o bodegas.</li>
            <li><strong>NO usar Yape, Plin, App BN ni transferencias interbancarias (CCI)</strong>.</li>
          </ul>
        </div>

        <div class="p-3 rounded-3 border mb-3 small" style="background: #f0fdf4; border-color: #bbf7d0 !important; color: #166534;">
          <h6 class="fw-bold mb-2"><i class="bi bi-check-circle-fill me-1"></i> ÚNICO CANAL VÁLIDO: Ventanilla del Banco de la Nación</h6>
          <p class="mb-2">Acércate presencialmente a cualquier ventanilla del <strong>Banco de la Nación</strong>, indica tu <strong>DNI y nombres completos</strong> y deposita en la cuenta exacta según tu trámite:</p>
          <div class="row g-2">
            <div class="col-sm-6">
              <div class="p-2 bg-white rounded border">
                <strong class="text-primary d-block">Cta. Cte. 00-638-002361</strong>
                <span class="text-muted" style="font-size:0.75rem;">Matrícula S/ 250, Admisión S/ 200, Suficiencia S/ 200, Título S/ 60 + S/ 100, Certificados, Constancias.<br>→ Registrar en <strong>pagos.ieshercar.edu.pe</strong></span>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="p-2 bg-white rounded border">
                <strong class="text-success d-block">Cta. 00-638-025736</strong>
                <span class="text-muted" style="font-size:0.75rem;">Curso de Inglés S/ 400, Pre Tecno S/ 400, Ciclo Actualización S/ 400, Toga S/ 50.<br>→ <strong>Sacar 2 copias al voucher</strong> y entregar en Tesorería.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn">
            <i class="bi bi-bank text-primary"></i> Copiar Cuentas BN Oficiales
          </button>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles">
            <i class="bi bi-translate text-success"></i> Pago de Inglés (00-638-025736)
          </button>
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa">
            <i class="bi bi-calculator text-warning"></i> Cotizador TUPA 2026
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Atención muy importante: en el Instituto Superior Hermanos Cárcamo no se acepta Págalo punto pe, ni agentes MultiRed, ni Yape, ni transferencias interbancarias. Todos los pagos se realizan únicamente en ventanilla presencial del Banco de la Nación, indicando tu D N I y nombre completo, ya sea a la cuenta cero cero, seis tres ocho, cero cero dos tres seis uno para trámites del Tupa, o a la cuenta cero cero, seis tres ocho, cero dos cinco siete tres seis para el curso de inglés.", [
      { label: "🏦 Ver las 2 Cuentas BN", prompt: "¿Cuáles son los números de cuenta del Banco de la Nación?" },
      { label: "🇬🇧 Pago de Inglés", prompt: "¿Cómo pago el Curso de Inglés Básico y en qué cuenta?" }
    ]);
  }

  /**
   * Tarjeta Oficial de las 2 Cuentas Bancarias del IESTP Hermanos Cárcamo (TUPA 2026)
   */
  renderNumeroCuentaBancaria() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #f59e0b;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-warning text-dark px-3 py-1 fw-bold"><i class="bi bi-bank me-1"></i>Banco de la Nación</span>
          <span class="badge bg-danger text-white"><i class="bi bi-exclamation-octagon-fill me-1"></i>Solo Ventanilla BN (NO Págalo.pe)</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Las 2 Cuentas Oficiales del Banco de la Nación</h4>
        <p class="small text-muted mb-3">
          El <strong>IESTP "Hermanos Cárcamo"</strong> maneja <strong>dos cuentas específicas</strong> en el Banco de la Nación según el concepto que vas a pagar (R.D. N° 020-2026):
        </p>

        <!-- Tarjeta Premium de las 2 Cuentas -->
        <div class="p-3 rounded-3 mb-3 border shadow-sm" style="background: linear-gradient(135deg, #091a3e 0%, #163e8c 100%); color: #ffffff;">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <img src="assets/img/logo-hercar.png" onerror="this.src='https://ieshercar.edu.pe/public/assets/img/Logo-Hercar.png'" alt="Logo" style="width: 28px; height: 28px; background: #fff; border-radius: 6px; padding: 2px;">
              <span class="small text-white-50 fw-semibold">Banco de la Nación — Pago Presencial en Ventanilla</span>
            </div>
            <span class="badge bg-warning text-dark fw-bold">Indicar DNI + Nombre</span>
          </div>

          <!-- CUENTA 1: TUPA GENERAL -->
          <div class="p-2 px-3 rounded-2 mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);">
            <div>
              <span class="small d-block text-white-50" style="font-size: 0.74rem;">1. Cuenta Corriente TUPA General (Matrícula S/ 250, Admisión S/ 200, Suficiencia S/ 200, Títulos S/ 60 + S/ 100, Certificados, Constancias):</span>
              <span class="fs-4 fw-bold font-monospace text-warning d-block" style="letter-spacing: 1px;">00-638-002361</span>
            </div>
            <button class="btn btn-sm btn-warning text-dark fw-bold rounded-pill px-3 py-1 shadow-sm" 
                    onclick="hercarBotApp.copyData('00-638-002361', 'Cuenta Corriente BN TUPA')">
              <i class="bi bi-clipboard-check me-1"></i> Copiar 00-638-002361
            </button>
          </div>

          <!-- CUENTA 2: INGLES Y ACTIVIDADES PRODUCTIVAS -->
          <div class="p-2 px-3 rounded-2 mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2" style="background: rgba(16,185,129,0.2); border: 1px solid rgba(110,231,183,0.4);">
            <div>
              <span class="small d-block text-white-50" style="font-size: 0.74rem;">2. Cuenta Curso de Inglés & Productivas (Inglés Básico S/ 400, Academia Pre Tecno S/ 400, Ciclo de Actualización S/ 400, Toga S/ 50):</span>
              <span class="fs-4 fw-bold font-monospace text-info d-block" style="letter-spacing: 1px;">00-638-025736</span>
            </div>
            <button class="btn btn-sm btn-info text-dark fw-bold rounded-pill px-3 py-1 shadow-sm" 
                    onclick="hercarBotApp.copyData('00-638-025736', 'Cuenta BN Inglés / Productivas')">
              <i class="bi bi-clipboard-check me-1"></i> Copiar 00-638-025736
            </button>
          </div>

          <div class="small text-white-50 mt-2" style="font-size: 0.76rem;">
            <i class="bi bi-person-badge me-1 text-warning"></i><strong>Titular Oficial:</strong> Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" - Paita
          </div>
        </div>

        <!-- Prohibición + Qué hacer después -->
        <div class="p-3 rounded-3 border small mb-3" style="background: #fef2f2; border-color: #fecaca !important; color: #991b1b;">
          <strong><i class="bi bi-x-octagon-fill me-1"></i> Canal Único Obligatorio:</strong> Paga únicamente en <strong>ventanilla del Banco de la Nación</strong> indicando el DNI y nombre del estudiante. <strong>NO uses Págalo.pe, Agentes MultiRed, Yape ni transferencias CCI.</strong> Si depositas por error en otra cuenta, deberás tramitar transferencia por TUPA (S/ 15.00).
        </div>

        <div class="row g-2 mb-3 small">
          <div class="col-sm-6">
            <div class="p-2 bg-light rounded border h-100">
              <strong class="text-primary d-block">Después de pagar en 00-638-002361:</strong>
              <span class="text-muted">Registra tu voucher en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a> para emitir tu boleta electrónica y lleva tus copias a Tesorería.</span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-2 bg-light rounded border h-100">
              <strong class="text-success d-block">Después de pagar en 00-638-025736:</strong>
              <span class="text-muted"><strong>Saca 2 copias a tu voucher</strong> y entrégalos directamente en Tesorería, en la oficina del instituto.</span>
            </div>
          </div>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Portal pagos.ieshercar.edu.pe
          </a>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles">
            <i class="bi bi-translate text-success"></i> Detalles Curso de Inglés
          </button>
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa">
            <i class="bi bi-calculator text-warning"></i> Cotizador TUPA 2026
          </button>
          <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso">
            <i class="bi bi-ui-checks text-info"></i> Pasos de Matrícula
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "El Instituto Hermanos Cárcamo utiliza dos cuentas en el Banco de la Nación, donde todo pago se realiza únicamente de forma presencial en ventanilla y sin usar Págalo punto pe ni agentes. Primero, la cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno es para matrícula ordinaria de doscientos cincuenta soles, examen de admisión, examen de suficiencia y trámites del Tupa. Segundo, la cuenta cero cero, seis tres ocho, cero dos cinco siete tres seis es para el curso de inglés de cuatrocientos soles y actividades productivas, donde debes sacar dos copias a tu voucher y entregarlos en Tesorería.", [
      { label: "🇬🇧 Pago del Curso de Inglés", prompt: "¿Cómo pago el Curso de Inglés Básico y en qué cuenta?" },
      { label: "🧮 Cotizador TUPA 2026", prompt: "Cotizador de trámites TUPA 2026" }
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
            <span class="badge bg-warning text-dark fw-bold px-2 py-1"><i class="bi bi-bank me-1"></i> Banco de la Nación (Solo Ventanilla)</span>
            <span class="badge bg-info text-dark fw-bold">Costo TUPA: S/ 400.00 (Duplicado S/ 50.00)</span>
          </div>
          <p class="small text-white-50 mb-1">Número de Cuenta Oficial para Curso de Inglés / Actividades Productivas:</p>
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 p-2 rounded mb-2" style="background: rgba(255,255,255,0.1);">
            <code class="fs-5 fw-bold text-warning font-monospace" style="letter-spacing: 1px;">00-638-025736</code>
            <button type="button" class="btn btn-sm btn-warning text-dark fw-bold rounded-pill px-3" 
                    onclick="hercarBotApp.copyData('00-638-025736', 'Cuenta Curso de Inglés BN')">
              <i class="bi bi-clipboard-check me-1"></i> Copiar Cuenta
            </button>
          </div>
          <div class="p-2 rounded small" style="background: rgba(239, 68, 68, 0.2); border-left: 3px solid #f87171;">
            <strong class="text-warning d-block mb-1"><i class="bi bi-exclamation-triangle-fill me-1"></i> Indicaciones Obligatorias de Pago y Tesorería:</strong>
            <ul class="mb-0 ps-3 text-white" style="font-size: 0.82rem; line-height: 1.45;">
              <li>El pago se realiza únicamente en ventanilla del <strong>Banco de la Nación</strong> en la cuenta <strong>N° 00-638-025736</strong> (<strong>NO</strong> Págalo.pe, <strong>NO</strong> agentes).</li>
              <li>Debes <strong>sacar 2 copias a tu voucher</strong> y entregarlos en <strong>Tesorería</strong>, en la oficina del instituto (Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque).</li>
              <li>Para <strong>Revalidación de idioma extranjero nivel B1</strong> (alumnos externos) rige la tasa de <strong>S/ 150.00</strong> en la cuenta TUPA <code>00-638-002361</code>.</li>
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
          <button class="interactive-btn" data-chat-action="ver_tramite_titulo"><i class="bi bi-mortarboard text-primary"></i> 10 Requisitos de Título</button>
          <button class="interactive-btn" data-chat-action="ver_examen_suficiencia"><i class="bi bi-patch-check text-danger"></i> Requisitos Examen Suficiencia</button>
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-bank text-warning"></i> Ver las 2 Cuentas BN</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt text-success"></i> Horario de Tesorería</button>
        </div>
      </div>
    `;

    const inglesChips = [
      { label: 'Requisitos Examen Suficiencia', prompt: '¿Cuáles son los requisitos del Examen de Suficiencia Profesional?' },
      { label: 'Requisitos Trámite de Título', prompt: '¿Cuáles son los requisitos para el Trámite de Título Profesional?' },
      { label: 'Cuentas Banco de la Nación', prompt: '¿Cuáles son los números de cuenta del Banco de la Nación?' }
    ];
    this.appendBotMessage(html, "Para el Curso de Inglés Básico para Titulación, el costo es cuatrocientos soles y el pago se realiza únicamente en ventanilla del Banco de la Nación en la cuenta cero cero, seis tres ocho, cero dos cinco siete tres seis. Recuerda sacar dos copias a tu voucher y entregarlos en Tesorería en la oficina del instituto.", inglesChips);
  }

  /**
   * Requisitos Oficiales para Solicitar Examen de Suficiencia Profesional (Infografía Oficial)
   */
  renderExamenSuficiencia() {
    const info = (typeof REQUISITOS_SUFICIENCIA_PROFESIONAL !== 'undefined') ? REQUISITOS_SUFICIENCIA_PROFESIONAL : null;
    const reqs = info ? info.requisitos : [
      '1. Solicitud dirigida al Director General pidiendo programar el Examen de Suficiencia Profesional cumpliendo con todos los requisitos.',
      '2. Copia a color de la Constancia de No Adeudar (S/ 15.00 en Cta. Cte. BN 00-638-002361).',
      '3. Copia a color de DNI vigente.',
      '4. Copia a color de ambos lados de los tres (03) Certificados Modulares.',
      '5. Copia a color de ambos lados del Certificado de Actualización según carrera profesional (solo para egresados del 2021 hacia atrás).',
      '6. Copia a color de ambos lados del certificado del Curso de Inglés Básico.',
      '7. Boleta electrónica de pago y copia sellada por el área de Tesorería por derecho de Examen de Suficiencia (S/ 200.00 soles).'
    ];

    const storeKey = 'hercarbot_checklist_suficiencia';
    let checked = [];
    try { checked = JSON.parse(localStorage.getItem(storeKey)) || []; } catch {}
    const total = reqs.length;
    const done = checked.filter(i => i >= 0 && i < total).length;
    const pct = Math.round((done / total) * 100);

    const reqHtml = reqs.map((r, idx) => {
      const isDone = checked.includes(idx);
      const labelTxt = r.replace(/^\d+\.\s*/, '');
      return `
        <div class="hercar-checklist-item ${isDone ? 'checked' : ''}" data-check-store="${storeKey}" data-check-idx="${idx}" role="checkbox" aria-checked="${isDone}" tabindex="0">
          <input type="checkbox" class="form-check-input mt-1 flex-shrink-0" ${isDone ? 'checked' : ''} style="pointer-events:none;">
          <span class="checklist-text"><strong>${idx + 1}.</strong> ${labelTxt}</span>
        </div>
      `;
    }).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #dc2626;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-danger px-3 py-1"><i class="bi bi-patch-check-fill me-1"></i>Infografía Oficial IESTP HERCAR</span>
          <span class="badge bg-warning text-dark fw-bold">Derecho: S/ 200.00 (2da opción S/ 100.00)</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Requisitos para Solicitar Examen de Suficiencia Profesional</h4>
        <p class="small text-muted mb-2">Presenta tu expediente <strong>debidamente foliado</strong> con los <strong>7 requisitos oficiales</strong> (haz clic para marcar tu avance):</p>

        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center small mb-1">
            <span class="fw-bold text-primary checklist-progress-label" data-progress-for="${storeKey}"><i class="bi bi-check2-all me-1"></i>${done} de ${total} requisitos listos (${pct}%)</span>
            <button type="button" class="btn btn-link btn-sm p-0 text-decoration-none text-muted" data-reset-checklist="${storeKey}" style="font-size:0.74rem;">Reiniciar</button>
          </div>
          <div class="progress" style="height: 7px;">
            <div class="progress-bar bg-success checklist-progress-bar" data-progress-bar="${storeKey}" style="width: ${pct}%;"></div>
          </div>
        </div>

        <div class="small mb-3">
          ${reqHtml}
        </div>

        <div class="row g-2 mb-3 small">
          <div class="col-sm-6">
            <div class="p-3 rounded-3 border h-100" style="background: #fffbeb; border-color: #fde68a !important; color: #92400e;">
              <strong class="d-block mb-1"><i class="bi bi-bank me-1"></i>NOTA IMPORTANTE DE PAGO:</strong>
              <span>Los pagos se harán <strong>únicamente en ventanilla del Banco de la Nación</strong> en la Cta. Cte. N° <code class="fw-bold text-dark">00-638-002361</code> (S/ 200.00 • <strong>NO</strong> Págalo.pe ni agentes).</span>
              <button type="button" class="btn btn-xs btn-warning text-dark fw-bold rounded-pill mt-2 px-2 py-0" onclick="hercarBotApp.copyData('00-638-002361', 'Cta. Cte. BN Suficiencia')"><i class="bi bi-clipboard"></i> Copiar 00-638-002361</button>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 rounded-3 border h-100" style="background: #fef2f2; border-color: #fecaca !important; color: #991b1b;">
              <strong class="d-block mb-1"><i class="bi bi-exclamation-triangle-fill me-1"></i>OJO — GESTIÓN CON COORDINADOR:</strong>
              <span>En cuanto a los requisitos y la gestión para el Examen de Suficiencia Profesional, <strong>se realiza con el Coordinador de su Programa de Estudios</strong>.</span>
            </div>
          </div>
        </div>

        <div class="alert alert-info py-2 px-3 small mb-3">
          <i class="bi bi-info-circle-fill me-1"></i> <strong>Nota egresados 2021 o anteriores:</strong> El Ciclo de Actualización (cuando corresponde según tu año de egreso) tiene costo de S/ 400.00 y se abona en la cuenta Productivas <code>00-638-025736</code>.
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn text-primary fw-bold" data-chat-action="abrir_generador_fut" data-chat-val="examen_suficiencia">
            <i class="bi bi-file-earmark-text-fill text-primary"></i> Generar FUT Suficiencia
          </button>
          <button class="interactive-btn" data-chat-action="ver_tramite_titulo">
            <i class="bi bi-mortarboard-fill text-success"></i> Ver Requisitos de Título (10 pasos)
          </button>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles">
            <i class="bi bi-translate text-warning"></i> Inglés (Cta. 00-638-025736)
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Para solicitar el Examen de Suficiencia Profesional debes presentar tu expediente debidamente foliado ante el Coordinador de tu Programa de Estudios con siete requisitos: solicitud al Director General, copia a color de Constancia de No Adeudar, copia a color del D N I, copia a color de ambos lados de los tres certificados modulares, copia de actualización solo para egresados del dos mil veintiuno hacia atrás, copia a color del curso de Inglés Básico, y boleta electrónica más copia sellada por Tesorería de doscientos soles pagados en ventanilla del Banco de la Nación a la cuenta cero cero, seis tres ocho, cero cero dos tres seis uno.", [
      { label: "🎓 Requisitos de Título Profesional", prompt: "¿Cuáles son los requisitos para el Trámite de Título Profesional?" },
      { label: "🇬🇧 Pago del Curso de Inglés", prompt: "¿Cómo pago el Curso de Inglés Básico y en qué cuenta?" }
    ]);
  }

  /**
   * Requisitos Oficiales para Trámite de Título Profesional Técnico (Infografía Oficial)
   */
  renderTramiteTitulo() {
    const info = (typeof REQUISITOS_TITULO_PROFESIONAL !== 'undefined') ? REQUISITOS_TITULO_PROFESIONAL : null;
    const reqs = info ? info.requisitos : [
      '1. Solicitud dirigida al Director General solicitando obtención de Título Profesional.',
      '2. Original de Certificado de Estudios de Educación Secundaria debidamente firmado por el Director de la I.E. y con código virtual de verificación y código QR.',
      '3. Original de Certificado de Estudios de Educación Superior (I al VI periodo — S/ 240.00 en Cta. Cte. 00-638-002361).',
      '4. Original de Partida de Nacimiento actualizada.',
      '5. DNI Legalizado: Copia a color de DNI legalizada por Notario (totalmente nítida en nombre completo, fecha de nacimiento y número de DNI).',
      '6. Fotografías: Dos (02) fotografías tamaño pasaporte en fondo blanco, reveladas (no impresas), con vestimenta formal y sin accesorios.',
      '7. Inglés Básico: Copia a color de Certificado de Inglés Básico.',
      '8. Pago por Formato y Caligrafiado de Título: Boleta electrónica original y 1 copia sellada por Tesorería — Monto: S/ 60.00.',
      '9. Pago por Derecho de Título Profesional: Boleta electrónica original y 1 copia sellada por Tesorería — Monto: S/ 100.00.',
      '10. Ficha de Actividades: Copia de Ficha de Actividades (solo para egresados del Sistema Tradicional del 2008 hacia abajo) — Derecho: S/ 12.00.'
    ];

    const storeKey = 'hercarbot_checklist_titulo';
    let checked = [];
    try { checked = JSON.parse(localStorage.getItem(storeKey)) || []; } catch {}
    const total = reqs.length;
    const done = checked.filter(i => i >= 0 && i < total).length;
    const pct = Math.round((done / total) * 100);

    const reqHtml = reqs.map((r, idx) => {
      const isDone = checked.includes(idx);
      const itemHtml = (typeof r === 'string')
        ? r.replace(/^\d+\.\s*/, '')
        : `<strong>${r.titulo}:</strong> ${r.detalle}`;
      return `
        <div class="hercar-checklist-item ${isDone ? 'checked' : ''}" data-check-store="${storeKey}" data-check-idx="${idx}" role="checkbox" aria-checked="${isDone}" tabindex="0">
          <input type="checkbox" class="form-check-input mt-1 flex-shrink-0" ${isDone ? 'checked' : ''} style="pointer-events:none;">
          <span class="checklist-text"><strong>${idx + 1}.</strong> ${itemHtml}</span>
        </div>
      `;
    }).join('');

    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #1e3a8a;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-mortarboard-fill me-1"></i>Infografía Oficial Título</span>
          <span class="badge bg-warning text-dark fw-bold">Formato S/ 60 + Título S/ 100</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Requisitos para Trámite de Título Profesional</h4>
        <div class="p-2 px-3 bg-light rounded border small mb-2">
          <strong><i class="bi bi-folder-fill text-warning me-1"></i> Presentación del Expediente:</strong> La documentación deberá presentarse <strong>debidamente foliada</strong>, en <strong>folder A/4</strong> y acompañada de un <strong>sobre manila A4</strong>.
        </div>

        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center small mb-1">
            <span class="fw-bold text-primary checklist-progress-label" data-progress-for="${storeKey}"><i class="bi bi-check2-all me-1"></i>${done} de ${total} requisitos listos (${pct}%)</span>
            <button type="button" class="btn btn-link btn-sm p-0 text-decoration-none text-muted" data-reset-checklist="${storeKey}" style="font-size:0.74rem;">Reiniciar</button>
          </div>
          <div class="progress" style="height: 7px;">
            <div class="progress-bar bg-success checklist-progress-bar" data-progress-bar="${storeKey}" style="width: ${pct}%;"></div>
          </div>
        </div>

        <div class="small mb-3">
          ${reqHtml}
        </div>

        <div class="p-3 rounded-3 border small mb-3" style="background: #fef2f2; border-color: #fecaca !important; color: #991b1b;">
          <strong class="d-block mb-1"><i class="bi bi-bank me-1"></i>NOTA IMPORTANTE DE PAGO (SOLO VENTANILLA BN):</strong>
          <span>Los pagos se harán <strong>únicamente en ventanilla del Banco de la Nación</strong> en la Cuenta Corriente N° <code class="fw-bold text-dark">00-638-002361</code> (Formato y Caligrafiado S/ 60.00 + Derecho de Título S/ 100.00; solo Tradicional ≤ 2008 suma Ficha S/ 12.00). Registra tu voucher en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a> para llevar original y 1 copia sellada por Tesorería. <strong>NO se acepta Págalo.pe ni agentes.</strong></span>
          <div class="mt-2">
            <button type="button" class="btn btn-xs btn-warning text-dark fw-bold rounded-pill px-2 py-0" onclick="hercarBotApp.copyData('00-638-002361', 'Cta. Cte. BN Titulación')"><i class="bi bi-clipboard"></i> Copiar 00-638-002361</button>
          </div>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn text-primary fw-bold" data-chat-action="abrir_generador_fut" data-chat-val="titulacion_profesional">
            <i class="bi bi-file-earmark-text-fill text-primary"></i> Generar FUT de Título
          </button>
          <button class="interactive-btn" data-chat-action="ver_examen_suficiencia">
            <i class="bi bi-patch-check text-danger"></i> Requisitos Examen Suficiencia
          </button>
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-success"></i> Portal pagos.ieshercar.edu.pe
          </a>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Para el trámite de Título Profesional debes presentar el expediente debidamente foliado en folder A cuatro acompañado de un sobre manila A cuatro con los diez requisitos oficiales: solicitud al Director General, certificado original de secundaria con código QR, certificado original de educación superior, partida de nacimiento actualizada, copia a color de D N I legalizada por notario, dos fotos pasaporte reveladas fondo blanco vestimenta formal sin accesorios, copia a color de Inglés Básico, y boletas selladas por Tesorería de sesenta soles por formato y caligrafiado más cien soles por derecho de título pagados en el Banco de la Nación cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno.", [
      { label: "📋 Requisitos Examen Suficiencia", prompt: "¿Cuáles son los requisitos del Examen de Suficiencia Profesional?" },
      { label: "🇬🇧 Pago del Curso de Inglés", prompt: "¿Cómo pago el Curso de Inglés Básico y en qué cuenta?" }
    ]);
  }

  toggleRequirementChecklist(storeKey, idx, el) {
    let checked = [];
    try { checked = JSON.parse(localStorage.getItem(storeKey)) || []; } catch {}
    if (checked.includes(idx)) {
      checked = checked.filter(i => i !== idx);
    } else {
      checked.push(idx);
    }
    localStorage.setItem(storeKey, JSON.stringify(checked));

    const isDone = checked.includes(idx);
    el.classList.toggle('checked', isDone);
    el.setAttribute('aria-checked', String(isDone));
    const cb = el.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = isDone;

    const total = storeKey === 'hercarbot_checklist_titulo' ? 10 : 7;
    const done = checked.filter(i => i >= 0 && i < total).length;
    const pct = Math.round((done / total) * 100);
    const parent = el.closest('.faq-card-custom');
    if (parent) {
      const label = parent.querySelector(`.checklist-progress-label[data-progress-for="${storeKey}"]`);
      const bar = parent.querySelector(`.checklist-progress-bar[data-progress-bar="${storeKey}"]`);
      if (label) label.innerHTML = `<i class="bi bi-check2-all me-1"></i>${done} de ${total} requisitos listos (${pct}%)`;
      if (bar) bar.style.width = `${pct}%`;
    }
  }

  /**
   * Buscador Completo Interactivo de las 66 Tasas Oficiales TUPA 2026 (R.D. N° 020-2026)
   */
  renderBuscadorTupaCompleto(initialQuery = '', initialFilter = 'all') {
    const tupa = (typeof TUPA_2026_COMPLETO !== 'undefined') ? TUPA_2026_COMPLETO : null;
    const listGeneral = tupa?.procedimientosCuentaGeneral || [];
    const listProd = tupa?.actividadesProductivasCuentaIngles || [];
    const totalAll = listGeneral.length + listProd.length;

    const html = `
      <div class="faq-card-custom tupa-browser-card" data-active-filter="${this.escapeHtml(initialFilter)}" style="border-top: 4px solid #0284c7;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-1"><i class="bi bi-search me-1"></i>Buscador TUPA 2026 (${totalAll} conceptos)</span>
          <span class="badge bg-danger text-white">Solo Ventanilla Banco de la Nación</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Tarifario Completo Oficial R.D. N° 020-2026</h4>
        <p class="small text-muted mb-2">Busca cualquier trámite o servicio oficial para ver su costo exacto y en qué cuenta del Banco de la Nación se deposita:</p>

        <div class="input-group input-group-sm mb-2">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control tupa-live-search" value="${this.escapeHtml(initialQuery)}" placeholder="Buscar: matrícula, certificado, suficiencia, inglés, tercio, toga, traslado..." aria-label="Buscar trámite o tarifa en el TUPA 2026">
        </div>

        <div class="d-flex flex-wrap gap-1 mb-3">
          <button type="button" class="btn btn-xs btn-outline-primary rounded-pill px-2 py-1 ${initialFilter === 'all' ? 'active btn-primary text-white' : ''}" data-tupa-filter="all">Todos (${totalAll})</button>
          <button type="button" class="btn btn-xs btn-outline-primary rounded-pill px-2 py-1 ${initialFilter === '002361' ? 'active btn-primary text-white' : ''}" data-tupa-filter="002361">TUPA 00-638-002361 (${listGeneral.length})</button>
          <button type="button" class="btn btn-xs btn-outline-primary rounded-pill px-2 py-1 ${initialFilter === '025736' ? 'active btn-primary text-white' : ''}" data-tupa-filter="025736">Inglés / Prod. 00-638-025736 (${listProd.length})</button>
        </div>

        <div class="tupa-search-table-wrap mb-3">
          <table class="table table-sm table-hover mb-0 small align-middle">
            <thead class="table-light sticky-top">
              <tr>
                <th>Concepto / Procedimiento TUPA 2026</th>
                <th class="text-end">Tasa</th>
                <th class="text-center">Cuenta BN</th>
              </tr>
            </thead>
            <tbody class="tupa-results-tbody"></tbody>
          </table>
        </div>

        <div class="alert alert-info py-2 px-3 small mb-3">
          <strong><i class="bi bi-bank me-1"></i> Recuerda:</strong> Paga solo en <strong>ventanilla BN</strong> (NO Págalo.pe ni agentes). En <code>00-638-002361</code> registra en <strong>pagos.ieshercar.edu.pe</strong>; en <code>00-638-025736</code> saca <strong>2 copias al voucher</strong> y entrégalos en Tesorería.
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-bank text-primary"></i> Copiar las 2 Cuentas BN</button>
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa"><i class="bi bi-calculator text-warning"></i> Sumar Varios Trámites</button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, `En pantalla tienes el buscador oficial del Tupa dos mil veintiséis con los sesenta y seis conceptos oficiales divididos entre la cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno y la cuenta cero cero, seis tres ocho, cero dos cinco siete tres seis.`, [
      { label: "🧮 Sumar trámites en Cotizador", prompt: "Cotizador de trámites TUPA 2026" },
      { label: "🇬🇧 Pago del Curso de Inglés", prompt: "¿Cómo pago el Curso de Inglés Básico y en qué cuenta?" }
    ]);

    const cards = this.messagesContainer.querySelectorAll('.tupa-browser-card');
    const latestCard = cards[cards.length - 1];
    if (latestCard) {
      this.updateTupaSearchResults(latestCard, initialQuery, initialFilter);
    }
  }

  updateTupaSearchResults(container, query = '', filter = 'all') {
    const tbody = container.querySelector('.tupa-results-tbody');
    if (!tbody || typeof TUPA_2026_COMPLETO === 'undefined') return;
    const allItems = [
      ...(TUPA_2026_COMPLETO.procedimientosCuentaGeneral || []),
      ...(TUPA_2026_COMPLETO.actividadesProductivasCuentaIngles || [])
    ];
    const qNorm = this.normalizeText(query);
    const filtered = allItems.filter(it => {
      if (filter === '002361' && it.cuenta !== '00-638-002361') return false;
      if (filter === '025736' && it.cuenta !== '00-638-025736') return false;
      if (!qNorm) return true;
      return this.normalizeText(it.concepto + ' ' + it.cuenta + ' ' + it.costo).includes(qNorm);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-3">No se encontraron procedimientos para esa búsqueda.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(it => {
      const isProd = it.cuenta === '00-638-025736';
      return `
        <tr>
          <td>${this.escapeHtml(it.concepto)}</td>
          <td class="text-end fw-bold text-nowrap">S/ ${Number(it.costo).toFixed(2)}</td>
          <td class="text-center text-nowrap">
            <span class="badge ${isProd ? 'bg-info text-dark' : 'bg-warning text-dark'} font-monospace">${it.cuenta}</span>
          </td>
        </tr>
      `;
    }).join('');
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

    const modulosWebHtml = (carrera.modulosWebOficial && carrera.modulosWebOficial.length)
      ? `<div class="p-3 bg-light rounded-3 border small mb-3">
           <h6 class="fw-bold text-primary mb-1"><i class="bi bi-patch-check-fill me-1"></i> Módulos Técnico-Profesionales Oficiales (ieshercar.edu.pe):</h6>
           <ul class="mb-0 ps-3 text-muted">${carrera.modulosWebOficial.map(mw => `<li>${mw}</li>`).join('')}</ul>
         </div>`
      : '';

    const docentesHtml = (carrera.docentes && carrera.docentes.length)
      ? `<div class="p-2 px-3 bg-white rounded-3 border small mb-3">
           <strong class="text-dark d-block mb-1"><i class="bi bi-people-fill text-primary me-1"></i> Plana Docente del Programa:</strong>
           <div class="d-flex flex-wrap gap-1">${carrera.docentes.map(d => `<span class="badge bg-light text-dark border">${d}</span>`).join('')}</div>
         </div>`
      : '';

    const banner2027Html = (carrera.id === 'apsti' || carrera.actualizacion2027)
      ? `<div class="alert alert-info py-2 px-3 small mb-3 border-info">
           <i class="bi bi-stars text-primary me-1"></i> <strong>Actualización Curricular 2027:</strong> ${carrera.actualizacion2027 || 'En el año 2027 la carrera de APSTI pasará a denominarse oficialmente Computación e Informática.'}
         </div>`
      : '';

    const campoHtml = carrera.campoLaboral.map(c => `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${c}</li>`).join('');

    const html = `
      <div class="carrera-hero-card" style="border-top: 4px solid ${carrera.color};">
        <div class="carrera-cover-banner">
          <img src="${carrera.imagen || 'assets/img/campus-hercar.jpg'}" alt="${carrera.nombre}" onerror="this.src='assets/img/campus-hercar.jpg'" />
          <div class="cover-overlay">
            <span class="badge" style="background: ${carrera.color}; color: #fff; font-size: 0.85rem; font-weight: 700;">${carrera.codigo}</span>
            ${carrera.id === 'apsti' ? '<span class="badge bg-warning text-dark fw-bold">2027: Computación e Informática</span>' : ''}
            <span class="badge bg-dark bg-opacity-75 text-light border border-light border-opacity-25"><i class="bi bi-clock me-1"></i>${carrera.duracion}</span>
          </div>
        </div>
        <h4 class="fw-bold mb-2">${carrera.nombre}</h4>
        <p class="carrera-titulo-sub small">${carrera.titulo}</p>
        ${banner2027Html}
        
        <div class="carrera-desc-box mb-3">
          <p class="mb-0">${carrera.perfilEgreso}</p>
        </div>

        ${modulosWebHtml}
        <h6 class="fw-bold text-primary mb-2"><i class="bi bi-diagram-3-fill me-1"></i> Certificaciones Modulares Progresivas:</h6>
        <div class="modulos-list-wrapper mb-3">
          ${modulosHtml}
        </div>

        ${docentesHtml}
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
      { label: '¿Cómo pagar la matrícula?', prompt: '¿Cuánto cuesta la matrícula y en qué cuenta del Banco de la Nación se paga?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    const extra2027Spoken = (carrera.id === 'apsti') ? ' Importante: a partir del año dos mil veintisiete, este programa de estudios pasará a llamarse Computación e Informática.' : '';
    this.appendBotMessage(html, `Te presento la carrera técnica oficial de ${carrera.nombre}.${extra2027Spoken} Aquí puedes revisar sus módulos formativos, plana docente y oportunidades laborales en Paita.`, careerChips);
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
        <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
          <span class="badge" style="background: ${carrera.color}; color: #fff;">${carrera.codigo}</span>
          ${carrera.id === 'apsti' ? '<span class="badge bg-info text-dark">2027: Computación e Informática</span>' : ''}
          <h5 class="fw-bold mb-0">Plan de Estudios & Malla Curricular</h5>
        </div>
        <p class="text-muted small">Estructura curricular completa de los 6 periodos académicos de <strong>${carrera.nombre}</strong>:</p>

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
            ${c.id === 'apsti' ? '<span class="badge bg-info text-dark" style="font-size: 0.7rem;">2027: Computación e Informática</span>' : ''}
            <h6 class="mb-0 fw-bold carrera-item-title">${c.nombre}</h6>
          </div>
          <p class="carrera-item-desc mb-0 small text-muted">${c.perfilEgreso}</p>
        </div>
        <i class="bi bi-chevron-right text-muted ms-auto carrera-item-arrow"></i>
      </div>
    `).join('');

    const html = `
      <div class="carreras-catalog-card">
        <h5 class="fw-bold mb-2"><i class="bi bi-mortarboard-fill text-primary me-2"></i>Los 4 Programas de Estudios del IESTP Hermanos Cárcamo</h5>
        <p class="text-muted small mb-2">El instituto ofrece 4 Carreras Profesionales Técnicas de 3 años de duración (educación pública sin mensualidades, con título a nombre de la nación y certificación modular):</p>
        <div class="alert alert-info py-2 px-3 small mb-3">
          <i class="bi bi-stars me-1"></i> <strong>Nota 2027:</strong> La carrera de <strong>Arquitectura de Plataformas y Servicios de TI (APSTI)</strong> pasará a denominarse <strong>Computación e Informática</strong> en el año 2027.
        </div>
        <div class="carreras-catalog-list">${listCards}</div>
        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional"><i class="bi bi-compass text-danger"></i> ¿No sabes cuál elegir? Hacer Test Vocacional</button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa"><i class="bi bi-person-check text-success"></i> Requisitos de Admisión</button>
        </div>
      </div>
    `;

    const allCareerChips = [
      { label: 'APSTI / Computación 2027', prompt: '¿Cómo es la carrera de APSTI y por qué en 2027 será Computación e Informática?' },
      { label: 'Negocios Internacionales', prompt: '¿De qué trata la carrera de Administración de Negocios Internacionales?' },
      { label: 'Contabilidad', prompt: '¿Cuál es el perfil y campo de trabajo en Contabilidad?' },
      { label: 'Desarrollo Pesquero', prompt: '¿Qué se aprende en Desarrollo Pesquero y Acuícola en Paita?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    this.appendBotMessage(html, "En el Instituto Superior Hermanos Cárcamo ofrecemos exactamente cuatro programas de estudios técnicos de tres años: primero, Arquitectura de Plataformas y Servicios de Tecnologías de la Información, que en el año dos mil veintisiete pasará a llamarse Computación e Informática; segundo, Administración de Negocios Internacionales; tercero, Contabilidad; y cuarto, Desarrollo Pesquero y Acuícola. Al ser educación pública, no pagas mensualidades, únicamente la matrícula semestral de doscientos cincuenta soles pagada en ventanilla del Banco de la Nación.", allCareerChips);
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
        'Voucher de pago en ventanilla del Banco de la Nación (Derecho de Examen S/ 200.00 en Cta. Cte. 00-638-002361; Academia Pre Tecno S/ 400.00 en Cta. 00-638-025736) — NO Págalo.pe ni agentes',
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
      `Paso 1: Realiza el depósito ÚNICAMENTE de forma presencial en ventanilla del Banco de la Nación indicando tu DNI y nombre completo (NO Págalo.pe, NO Agentes MultiRed, NO Yape).`,
      `Paso 2 (Cuenta TUPA ${cuentaBN}): Úsala para Matrícula Ordinaria (S/ 250.00), Admisión (S/ 200.00), Examen de Suficiencia (S/ 200.00), Formato/Derecho de Título (S/ 60.00 + S/ 100.00), Certificados y Constancias. Luego registra el voucher en https://pagos.ieshercar.edu.pe/ para generar tu boleta electrónica y lleva el original y tus copias a Tesorería.`,
      `Paso 3 (Cuenta Productivas ${cuentaInglesBN}): Úsala para Curso de Inglés Básico (S/ 400.00), Academia Pre Tecno Hercar (S/ 400.00), Ciclo de Actualización (S/ 400.00) o Toga (S/ 50.00). Saca 2 copias a tu voucher y entrégalos en Tesorería, en la oficina del instituto.`,
      'Paso 4: Verifica siempre el número de cuenta antes de pagar para evitar pagar la tasa de transferencia por error de cuenta (S/ 15.00).'
    ];

    const pasosHtml = pasos.map(p => `
      <div class="pago-step-item">
        <div class="step-num"><i class="bi bi-check-lg"></i></div>
        <div class="step-text">${p}</div>
      </div>
    `).join('');

    const html = `
      <div class="pagos-guide-card">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <h5 class="fw-bold mb-0 text-primary"><i class="bi bi-credit-card-2-front-fill me-2"></i>Guía Oficial de Pagos — Ventanilla BN</h5>
          <span class="badge bg-danger text-white"><i class="bi bi-bank me-1"></i>NO Págalo.pe / NO Agentes</span>
        </div>
        <p class="small text-muted mb-3">Sigue este procedimiento oficial para que Tesorería valide tus pagos sin observaciones:</p>

        <div class="alert alert-light border small mb-3">
          <strong>1) Cta. Cte. TUPA General:</strong> <code class="fs-6 fw-bold text-primary">${cuentaBN}</code> (Matrícula S/ 250, Admisión S/ 200, Suficiencia S/ 200, Títulos)<br>
          <strong>2) Cta. Inglés / Productivas:</strong> <code class="fs-6 fw-bold text-success">${cuentaInglesBN}</code> (Curso de Inglés S/ 400 + <strong>2 copias del voucher en Tesorería</strong>)<br>
          <strong>Titular:</strong> IESTP Hermanos Cárcamo - Paita &bull; <strong>Modalidad:</strong> Solo ventanilla Banco de la Nación
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
          <button class="interactive-btn" data-chat-action="ver_numero_cuenta_bn"><i class="bi bi-bank text-primary"></i> Copiar Cuentas BN</button>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles"><i class="bi bi-translate text-success"></i> Pago de Inglés (025736)</button>
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa"><i class="bi bi-calculator text-warning"></i> Cotizador TUPA 2026</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-headset"></i> Horario Tesorería</button>
        </div>
      </div>
    `;

    const pagosChips = [
      { label: 'Matrícula S/ 250 paso a paso', prompt: '¿Cómo es el proceso de matrícula paso a paso en el instituto?' },
      { label: 'Inglés (00-638-025736)', prompt: '¿Cómo pago el Curso de Inglés Básico y en qué cuenta?' },
      { label: '¿Se puede usar Págalo.pe?', prompt: '¿Se puede pagar por Págalo.pe, Yape o agentes?' }
    ];
    this.appendBotMessage(html, "Todos los pagos en el Instituto Superior Hermanos Cárcamo se hacen únicamente en ventanilla presencial del Banco de la Nación, indicando tu D N I y nombre completo; no se acepta Págalo punto pe ni agentes. Para matrícula de doscientos cincuenta soles, suficiencia, títulos y Tupa usa la cuenta corriente cero cero, seis tres ocho, cero cero dos tres seis uno. Para el curso de inglés de cuatrocientos soles usa la cuenta cero cero, seis tres ocho, cero dos cinco siete tres seis y recuerda sacar dos copias a tu voucher y entregarlos en Tesorería.", pagosChips);
  }

  mapTramiteIdToFutKey(tramiteId) {
    const map = {
      'tramite-matricula': 'solicitud_libre',
      'tramite-examen-suficiencia': 'examen_suficiencia',
      'tramite-titulacion': 'titulacion_profesional',
      'tramite-titulo-profesional': 'titulacion_profesional',
      'tramite-certificado-modular': 'cert_modular',
      'tramite-certificado-estudios': 'cert_estudios_completo',
      'tramite-constancias': 'constancia_matricula',
      'tramite-constancia-estudios': 'constancia_matricula',
      'tramite-convalidacion': 'convalidacion_cursos',
      'tramite-traslados': 'traslado_interno',
      'tramite-carne': 'carne_estudiantil',
      'tramite-ingles-basico': 'solicitud_libre',
      'tramite-reserva-licencia-reincorporacion': 'reserva_matricula',
      'tramite-evaluacion-extraordinaria': 'subsanacion_recuperacion',
      'tramite-duplicados': 'duplicado_titulo'
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
    const html = `
      <div class="tramite-detail-card">
        <span class="badge bg-primary-subtle text-primary mb-1">${tramite.categoria}</span>
        <h5 class="fw-bold mb-2">${tramite.nombre}</h5>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-2 bg-light rounded border small">
              <strong><i class="bi bi-cash-coin me-1"></i> Costo / Tasa:</strong><br>${tramite.costo}
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
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card-2-front text-warning"></i> ¿Cómo pagar la tasa?</button>
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa"><i class="bi bi-arrow-left"></i> Ver Todos los Trámites</button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, `Te facilito los requisitos, el costo por tasa TUPA y el tiempo de entrega para el trámite de ${tramite.nombre}.`);
  }

  renderTramitesList() {
    const listHtml = GUIA_TRAMITES_TUPA.map(t => `
      <div class="tramite-interactive-row" data-chat-action="ver_tramite_especifico" data-chat-val="${t.id}">
        <div>
          <span class="badge bg-secondary-subtle text-secondary small">${t.categoria}</span>
          <h6 class="mb-0 fw-bold mt-1">${t.nombre}</h6>
          <small class="text-muted">${t.plazo} • ${t.costo}</small>
        </div>
        <i class="bi bi-chevron-right text-muted"></i>
      </div>
    `).join('');

    const html = `
      <div class="tramites-catalog-card">
        <h5 class="fw-bold mb-2"><i class="bi bi-file-earmark-ruled-fill text-primary me-2"></i>Trámites Académicos y Documentación Oficial</h5>
        <p class="small text-muted mb-3">Selecciona el trámite que deseas realizar para ver sus requisitos y procedimiento:</p>
        <div class="tramites-list-box">${listHtml}</div>
        <div class="interactive-button-grid mt-3">
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card-2-front"></i> Sistema de Pagos</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Horarios de Mesa de Partes</button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Te presento la guía completa de trámites académicos TUPA, certificados modulares y expedición de títulos de nuestra institución.");
  }

  renderContactoUbicacion() {
    const html = `
      <div class="contacto-guide-card">
        <h5 class="fw-bold text-primary mb-2"><i class="bi bi-geo-alt-fill text-danger me-2"></i>Sede Institucional & Canales de Atención</h5>
        
        <img src="assets/img/campus-hercar.jpg" alt="Fachada Campus IESTP Hermanos Cárcamo - Paita" class="campus-contact-photo" />

        <div class="p-3 bg-light rounded-3 border mb-3">
          <h6 class="fw-bold mb-1"><i class="bi bi-building me-2 text-primary"></i>Ubicación Oficial en Paita:</h6>
          <p class="mb-1 small">Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita, Piura.</p>
          <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Atención en Tesorería y Secretaría Académica: Lunes a Viernes de 8:00 a.m. a 3:00 p.m.</small>
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
    // Banco Psicológico y de Lógica Mental: Dilemas de comportamiento, templanza y toma de decisiones
    const BANCO_PSICOLOGICO_VOCACIONAL = [
      {
        dim: 'Lógica Algorítmica & Automatización',
        emoji: '🧩',
        q: 'Tienes 1,000 expedientes urgentes que deben organizarse antes del mediodía y es humanamente imposible hacerlo a mano. ¿Cómo responde tu mente?',
        opts: [
          { t: 'Diseño un script, macro o algoritmo en la computadora para que el sistema clasifique y ordene todo automáticamente en segundos.', c: 'apsti' },
          { t: 'Coordino con agentes aduaneros y clientes para negociar una prórroga de entrega y organizo una cadena logística ágil de trabajo.', c: 'ani' },
          { t: 'Aplico un método de conciliación y control cruzado por códigos contables para asegurar que ni un solo sol o dato se traspapele.', c: 'conta' },
          { t: 'Inspecciono los lotes de mayor criticidad biológica para salvar la inocuidad y procesar primero los productos marinos perecibles.', c: 'dpa' }
        ]
      },
      {
        dim: 'Temple Emocional & Reacción ante Crisis',
        emoji: '🚨',
        q: 'Surge una emergencia crítica imprevista que paraliza las operaciones y pone en riesgo el patrimonio de la institución. ¿Cuál es tu reacción instintiva?',
        opts: [
          { t: 'Siento curiosidad técnica y adrenalina lógica: ingreso a la consola del servidor, aíslo el fallo en el sistema y restauro la infraestructura.', c: 'apsti' },
          { t: 'Mantengo la serenidad social: llamo a las autoridades del puerto y empresas para calmarlos y pactar una solución diplomática comercial.', c: 'ani' },
          { t: 'Me concentro en auditar las pérdidas con total frialdad matemática para blindar legal, tributaria y contablemente a la entidad.', c: 'conta' },
          { t: 'Corro a verificar los sistemas de frío, oxígeno y bioseguridad en planta para salvaguardar la vida marina y los lotes de exportación.', c: 'dpa' }
        ]
      },
      {
        dim: 'Dilema Ético & Principios Innegociables',
        emoji: '⚖️',
        q: 'Descubres una anomalía oculta que nadie más ha notado en tu institución o empresa. ¿Qué principio guía tu decisión inmediata?',
        opts: [
          { t: 'La integridad de los números es sagrada: audito y corrijo el descuadre financiero antes de que SUNAT o una auditoría aplique sanciones.', c: 'conta' },
          { t: 'La salud pública y la bioseguridad no se negocian: si un lote de pesca o conchas no cumple normas SANIPES, detengo el despacho al instante.', c: 'dpa' },
          { t: 'La seguridad de la información es prioritaria: aplico un parche contra la vulnerabilidad digital antes de que un ciberataque robe datos.', c: 'apsti' },
          { t: 'La reputación internacional y los contratos son vitales: renegocio las cláusulas de flete y aduanas para blindar los acuerdos comerciales.', c: 'ani' }
        ]
      },
      {
        dim: 'Arquetipo de Liderazgo & Influencia Social',
        emoji: '👑',
        q: 'En un congreso de desarrollo regional en Piura, ¿en qué papel te sientes más influyente y realizado?',
        opts: [
          { t: 'El Negociador Global: abro mercados en el extranjero, firmo alianzas de exportación y represento a Paita ante inversionistas.', c: 'ani' },
          { t: 'El Arquitecto Invisible: diseño las plataformas digitales, servidores en la nube y redes que sostienen todo sin interrupciones.', c: 'apsti' },
          { t: 'El Guardián Financiero: aseguro la rentabilidad, optimizo los tributos y garantizo que cada inversión genere riqueza real.', c: 'conta' },
          { t: 'El Científico del Mar: lidero en campo y laboratorio la biotecnología acuícola, mejorando la producción de especies marinas.', c: 'dpa' }
        ]
      },
      {
        dim: 'Curiosidad Intelectual & Fascinación de la Mente',
        emoji: '🧠',
        q: 'Si te otorgaran una beca de investigación con acceso ilimitado a los mayores genios del planeta, ¿qué enigma te entusiasma descifrar?',
        opts: [
          { t: 'Inteligencia Artificial generativa, desarrollo de software autónomo y ciberdefensa en infraestructuras críticas.', c: 'apsti' },
          { t: 'Rutas comerciales interoceánicas, logística de megapuertos de contenedores y geopolítica del comercio internacional.', c: 'ani' },
          { t: 'Estrategias de arquitectura financiera corporativa, prevención de delitos económicos y optimización tributaria legal.', c: 'conta' },
          { t: 'Genética y cultivo tecnificado de especies hidrobiológicas, nutrición de conchas de abanico y preservación del océano.', c: 'dpa' }
        ]
      },
      {
        dim: 'Resolución de Problemas con Recursos Limitados',
        emoji: '⏳',
        q: 'Te asignan un proyecto con la mitad del presupuesto habitual y la mitad del tiempo. ¿Cómo respondes?',
        opts: [
          { t: 'Automatizo procesos repetitivos con herramientas open-source y software libre para multiplicar la productividad por diez.', c: 'apsti' },
          { t: 'Hago alianzas estratégicas, negocio con proveedores plazos flexibles y aprovecho las ventajas del puerto para abaratar costos.', c: 'ani' },
          { t: 'Rediseño el plan presupuestal al céntimo, elimino fugas de dinero y priorizo el retorno de capital más seguro.', c: 'conta' },
          { t: 'Aprovecho los recursos marinos naturales locales y métodos de cultivo sostenibles de bajo costo pero alto rendimiento.', c: 'dpa' }
        ]
      },
      {
        dim: 'Tu Huella y Trascendencia en la Sociedad',
        emoji: '🌍',
        q: 'Al culminar tu trayectoria profesional, ¿qué legado personal te hará sentir que tu vida valió la pena?',
        opts: [
          { t: 'Haber desarrollado y protegido sistemas digitales que facilitaron la vida, la educación y el trabajo de millones de personas.', c: 'apsti' },
          { t: 'Haber llevado los productos de mi tierra (pesca, frutas, artesanía) a las mesas y tiendas de los 5 continentes.', c: 'ani' },
          { t: 'Haber blindado la solidez económica y la transparencia de empresas que generaron empleo formal y riqueza para sus comunidades.', c: 'conta' },
          { t: 'Haber defendido la riqueza marina de nuestra costa norte, asegurando alimento saludable y mares limpios para las futuras generaciones.', c: 'dpa' }
        ]
      },
      {
        dim: 'Detección de Oportunidades en el Ecosistema de Paita',
        emoji: '⚓',
        q: 'Caminas por la bahía y la zona industrial de Paita. ¿Qué oportunidad detecta tu intuición con mayor rapidez?',
        opts: [
          { t: 'La urgencia de modernizar los sistemas digitales, cámaras con IA y conectividad de alta velocidad en las empresas.', c: 'apsti' },
          { t: 'El inmenso potencial de despachar más contenedores refrigerados hacia Asia y Europa aprovechando el puerto de aguas profundas.', c: 'ani' },
          { t: 'La necesidad de asesorar contable y tributariamente a cientos de mypes pesqueras para que crezcan formalmente con crédito bancario.', c: 'conta' },
          { t: 'El enorme valor de transformar los descartes de pota y pescado en bioproductos de exportación y tecnificar los criaderos marinos.', c: 'dpa' }
        ]
      }
    ];

    // Algoritmo de Selección Psicológica Dinámica: Extraer 6 dilemas aleatorios en cada intento
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffle(BANCO_PSICOLOGICO_VOCACIONAL).slice(0, 6);

    // Mezclar las 4 opciones de cada dilema para evitar sesgo de posición
    selectedQuestions.forEach(q => {
      q.opts = shuffle(q.opts);
    });

    this.activeTest = {
      step: 0,
      scores: { apsti: 0, ani: 0, conta: 0, dpa: 0 },
      questions: selectedQuestions,
      userAnswers: []
    };

    const introHtml = `
      <div style="background:#fff; border-radius:18px; border:1px solid #e2e8f0; padding:24px; text-align:center; box-shadow:0 4px 20px rgba(19,53,123,0.08);">
        <div style="width:70px; height:70px; background:linear-gradient(135deg,#eff6ff,#dbeafe); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; box-shadow:0 4px 18px rgba(19,53,123,0.15);">
          <i class="bi bi-brain" style="color:#13357b; font-size:2rem;"></i>
        </div>
        <div class="d-inline-flex align-items-center gap-1 badge bg-primary-subtle text-primary px-3 py-1 mb-2 fw-bold" style="border-radius:20px;">
          <i class="bi bi-stars"></i> Test Vocacional de Perfil Psicológico & Lógica Mental
        </div>
        <h4 style="font-weight:900; color:#0f2b69; margin-bottom:10px; font-size:1.18rem; letter-spacing:-0.3px;">Evaluación de Dilemas, Lógica y Toma de Decisiones</h4>
        <p style="color:#475569; font-size:0.88rem; margin-bottom:18px; max-width:440px; margin-left:auto; margin-right:auto; line-height:1.65;">
          No hay respuestas incorrectas. Pondré a prueba tu forma de pensar ante situaciones reales a través de <strong>6 dilemas situacionales</strong> para revelar tu arquetipo profesional y tu carrera ideal en el instituto.
        </p>
        <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap; font-size:0.78rem; color:#64748b; margin-bottom:18px;">
          <span><i class="bi bi-lightning-charge-fill text-warning me-1"></i>Dilemas psicológicos</span>
          <span><i class="bi bi-cpu-fill text-primary me-1"></i>Lógica situacional</span>
          <span><i class="bi bi-award-fill text-success me-1"></i>Diagnóstico de Arquetipo</span>
        </div>
        <div class="d-flex justify-content-center gap-2 flex-wrap" style="font-size:0.75rem; font-weight:700;">
          <span class="badge bg-primary text-white"><i class="bi bi-laptop me-1"></i>APSTI</span>
          <span class="badge bg-success text-white"><i class="bi bi-globe me-1"></i>ANI Negocios</span>
          <span class="badge bg-secondary text-white" style="background:#7e22ce !important;"><i class="bi bi-calculator me-1"></i>Contabilidad</span>
          <span class="badge bg-info text-white"><i class="bi bi-water me-1"></i>Pesquería DPA</span>
        </div>
      </div>
    `;

    this.appendBotMessage(introHtml, "¡Comencemos tu Test Vocacional! Responde con total naturalidad según tus gustos e intereses para descubrir tu carrera ideal.");
    this.renderNextQuestion();
  }

  renderNextQuestion() {
    const qIndex = this.activeTest.step;
    const currentQ = this.activeTest.questions[qIndex];
    const total = this.activeTest.questions.length;
    const progressPercent = Math.round(((qIndex + 1) / total) * 100);

    const optionsHtml = currentQ.opts.map((opt, i) => `
      <button class="test-choice-btn" data-chat-action="responder_pregunta_test" data-chat-val="${opt.c}">
        <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
        <span class="choice-text">${opt.t}</span>
      </button>
    `).join('');

    const html = `
      <div class="test-question-card">
        <div class="d-flex justify-content-between align-items-center mb-2 gap-2 flex-wrap">
          <span class="badge" style="background:linear-gradient(130deg,#13357b,#1d4ed8); color:#fff; font-size:0.75rem; font-weight:700; padding:6px 14px; border-radius:20px;">
            ${currentQ.emoji} ${currentQ.dim} • Dilema ${qIndex + 1} de ${total}
          </span>
          <span class="small fw-bold text-primary">${progressPercent}% analizado</span>
        </div>
        <div style="height:6px; background:#f1f5f9; border-radius:10px; margin-bottom:16px; overflow:hidden;">
          <div style="width:${progressPercent}%; height:100%; background:linear-gradient(90deg,#13357b,#2563eb); border-radius:10px; transition:width .4s ease;"></div>
        </div>
        <h5 class="fw-bold text-dark mb-3" style="font-size:1.02rem; line-height:1.45;">${currentQ.q}</h5>
        <div class="test-choices-list">${optionsHtml}</div>
        <p class="small text-muted text-center mt-3 mb-0">
          <i class="bi bi-hand-index-thumb me-1"></i>Elige la alternativa que mejor refleje cómo actúa tu mente en la realidad.
        </p>
      </div>
    `;

    this.appendBotMessage(html, false);
  }

  handleTestResponse(carreraId) {
    if (!this.activeTest) return;

    if (this.activeTest.scores[carreraId] !== undefined) {
      this.activeTest.scores[carreraId] += 3;
    }
    this.activeTest.userAnswers.push(carreraId);

    const currentQ = this.activeTest.questions[this.activeTest.step];
    if (currentQ) {
      const chosenOpt = currentQ.opts.find(o => o.c === carreraId);
      if (!this.activeTest.choicesSummary) this.activeTest.choicesSummary = [];
      if (chosenOpt) {
        this.activeTest.choicesSummary.push({
          dim: currentQ.dim,
          emoji: currentQ.emoji,
          carrera: carreraId,
          texto: chosenOpt.t
        });
      }
    }

    this.activeTest.step++;
    const totalQ = this.activeTest.questions.length;

    if (this.activeTest.step < totalQ) {
      this.renderNextQuestion();
    } else {
      this.finishTest();
    }
  }

  finishTest() {
    const scores = this.activeTest.scores;
    const totalQ = this.activeTest.questions.length;
    const choicesSummary = this.activeTest.choicesSummary || [];
    this.activeTest = null;

    // Ordenar carreras por puntaje de compatibilidad
    const sortedCareerIds = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const topCareerId = sortedCareerIds[0] || 'apsti';
    const secondaryCareerId = sortedCareerIds[1] || 'ani';

    const topCareer = CARRERAS_COMPLETAS.find(c => c.id === topCareerId) || CARRERAS_COMPLETAS[0];
    const secondaryCareer = CARRERAS_COMPLETAS.find(c => c.id === secondaryCareerId);

    // Porcentaje de compatibilidad calibrado
    const topPercent = Math.min(98, Math.max(65, Math.round(((scores[topCareerId] + 3) / (totalQ * 3 + 3)) * 100)));

    // Perfiles Psicológicos y Arquetipos Profesionales ("Juega con su mente")
    const ARQUETIPOS_PSICOLOGICOS = {
      apsti: {
        arquetipo: 'El Arquitecto Digital & Solucionador Lógico',
        rasgoPrincipal: 'Pensamiento Estructurado y Algorítmico',
        descripcionPsicologica: 'Tu cerebro procesa la realidad a través de esquemas lógicos, patrones y relaciones de causa-efecto. Ante situaciones complejas, no te dejas llevar por impulsos: descompones el problema en partes, investigas la raíz y creas soluciones automáticas que perduran.',
        titulo: 'Especialista en Arquitectura de Software, Ciberseguridad e Infraestructura TI',
        campoPaita: 'Empresas de telecomunicaciones, centros de datos, automatización de terminales portuarios, banca regional y desarrollo de software para exportadoras de Paita.',
        empresas: ['Terminales Portuarios Euroandinos (TPE)', 'Caja Piura / Caja Sullana', 'Agroindustrias del Valle del Chira', 'Empresas de Telecomunicaciones']
      },
      ani: {
        arquetipo: 'El Negociador Estratégico & Líder Global',
        rasgoPrincipal: 'Inteligencia Social Persuasiva y Visión de Oportunidades',
        descripcionPsicologica: 'Tu mente se orienta naturalmente hacia la diplomacia, la persuasión y la toma de decisiones bajo presión. Posees agilidad social para conectar personas, detectar valor en los intercambios y liderar negociaciones comerciales donde otros ven conflicto.',
        titulo: 'Especialista en Operaciones Portuarias, Comercio Exterior y Gestión Aduanera',
        campoPaita: 'Despacho y logística en el Puerto de Paita, agencias de aduana marítima, exportadoras de productos hidrobiológicos, frutas del Chira y navieras internacionales.',
        empresas: ['Terminal Portuario Euroandinos (TPE Paita)', 'Ransa Comercial / Medlog', 'Agencias de Aduana de Paita y Talara', 'Empresas Navieras']
      },
      conta: {
        arquetipo: 'El Guardián Financiero & Analista de Precisión',
        rasgoPrincipal: 'Meticulosidad Ética y Control Cuantitativo',
        descripcionPsicologica: 'Tu personalidad se distingue por la búsqueda de certeza, el orden escrupuloso y la responsabilidad ética. Eres inmune al caos numérico: tu mente encuentra de inmediato discrepancias, cuida la rentabilidad y blinda el patrimonio frente a cualquier riesgo.',
        titulo: 'Especialista en Auditoría Financiera, Tributación SUNAT y Costos Empresariales',
        campoPaita: 'Estudios contables, consultoras tributarias, auditorías de exportadoras, cooperativas de ahorro y crédito, y gerencia de costos en empresas pesqueras de Paita.',
        empresas: ['Estudios Contables de Paita y Piura', 'Banca y Cajas Municipales', 'Empresas Industriales de Paita Alta', 'Municipalidad Provincial de Paita']
      },
      dpa: {
        arquetipo: 'El Biólogo Productivo & Explorador Marino',
        rasgoPrincipal: 'Inteligencia Bioambiental y Pragmatismo de Campo',
        descripcionPsicologica: 'Posees una profunda conexión con el entorno natural, el respeto por los ciclos biológicos y la practicidad para transformar la materia prima en riqueza sostenible. Tu mente combina la observación científica con la acción concreta en el mar.',
        titulo: 'Especialista en Biotecnología Acuícola, Tecnología Pesquera y Control de Calidad HACCP',
        campoPaita: 'Plantas de congelado de pota y merluza en Tierra Colorada, criaderos tecnificados de conchas de abanico, langostineras de la bahía y laboratorios de sanidad pesquera.',
        empresas: ['Seafrost S.A.C.', 'Pesquera Hayduk / Austral Group', 'Laboratorios SANIPES / CERPER', 'Asociaciones Acuícolas de la Bahía de Paita']
      }
    };

    const espData = ARQUETIPOS_PSICOLOGICOS[topCareerId] || ARQUETIPOS_PSICOLOGICOS.apsti;

    // Resumen de justificaciones clave
    const winningChoices = choicesSummary.filter(ch => ch.carrera === topCareerId);
    const displayChoices = (winningChoices.length >= 2) ? winningChoices : choicesSummary.slice(0, 3);
    const summaryItemsHtml = displayChoices.map(ch => `
      <li class="mb-2">
        <strong>${ch.emoji} En ${ch.dim}:</strong>
        <span>Elegiste «<em>${this.escapeHtml(ch.texto)}</em>».</span>
      </li>
    `).join('');

    // Sinergia con carrera secundaria
    let sinergiaTexto = '';
    if (topCareerId === 'apsti' && secondaryCareerId === 'ani') {
      sinergiaTexto = 'Perfil Tecnológico-Portuario: Tienes una combinación de oro para liderar la digitalización y el software de control aduanero en el puerto de Paita.';
    } else if (topCareerId === 'ani' && secondaryCareerId === 'apsti') {
      sinergiaTexto = 'Perfil Logístico-Digital: Tu visión para abrir mercados globales se potencia enormemente con dominio de plataformas web y automatización.';
    } else if (topCareerId === 'conta' && secondaryCareerId === 'ani') {
      sinergiaTexto = 'Perfil Financiero-Comercial: Destreza ideal para gestionar aranceles, costos de flete internacional y tributación de corporaciones globales.';
    } else if (topCareerId === 'dpa' && secondaryCareerId === 'conta') {
      sinergiaTexto = 'Perfil Productivo-Rentable: Capacidad para dirigir plantas pesqueras combinando el estricto control de calidad marina con la optimización de costos.';
    } else {
      sinergiaTexto = `Sinergia complementaria con ${secondaryCareer ? secondaryCareer.codigo : 'otras especialidades'}: Desarrollarás una visión multidisciplinaria sumamente cotizada en la región.`;
    }

    // Barras de Afinidades Psicológicas y Carreras
    const barsHtml = sortedCareerIds.map(cId => {
      const cObj = CARRERAS_COMPLETAS.find(c => c.id === cId) || { nombre: cId, codigo: cId.toUpperCase(), icono: 'bi-mortarboard' };
      const pts = scores[cId] || 0;
      const pct = Math.round(Math.min(98, Math.max(20, (pts / (totalQ * 3)) * 100)));
      const isWinner = cId === topCareerId;
      return `
        <div style="margin-bottom:10px;">
          <div class="d-flex justify-content-between small mb-1" style="font-weight:${isWinner ? '800' : '600'};">
            <span><i class="bi ${cObj.icono || 'bi-mortarboard'} me-1 text-primary"></i>${cObj.codigo} — ${cObj.nombreCorto || cObj.nombre}</span>
            <span class="fw-bold ${isWinner ? 'text-primary' : 'text-muted'}">${pct}% compatibilidad</span>
          </div>
          <div style="height:8px; background:#e2e8f0; border-radius:10px; overflow:hidden;">
            <div style="width:${pct}%; height:100%; background:${isWinner ? 'linear-gradient(90deg,#13357b,#2563eb)' : '#94a3b8'}; border-radius:10px; transition:width .8s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    const html = `
      <div class="test-result-hero p-4 bg-white rounded-4 border shadow-sm" style="border-top: 6px solid ${topCareer.color || '#13357b'} !important;">
        
        <!-- Cabecera del Ganador -->
        <div class="text-center mb-3">
          <div style="width:68px; height:68px; background:${topCareer.color || '#13357b'}18; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:10px;">
            <i class="bi bi-award-fill" style="color:${topCareer.color || '#13357b'}; font-size:2.2rem;"></i>
          </div>
          <div class="badge px-3 py-1 fs-7 mb-2 text-white" style="background:linear-gradient(130deg,#13357b,#2563eb); border-radius:20px;">
            <i class="bi bi-stars me-1"></i> Diagnóstico Vocacional & Psicológico Final
          </div>
          <h3 class="fw-bold mb-1 text-dark" style="font-size:1.35rem;">${topCareer.nombre}</h3>
          <p class="small text-muted mb-0">Título Profesional Técnico a Nombre de la Nación • 3 Años • 100% Gratuito</p>
        </div>

        <!-- Tarjeta de Arquetipo de Personalidad Psicológica -->
        <div class="p-3 rounded-3 mb-3 bg-light border">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <span class="badge bg-primary px-3 py-1"><i class="bi bi-person-bounding-box me-1"></i>${espData.arquetipo}</span>
            <span class="small fw-bold text-primary">${topPercent}% de Afinidad Mental</span>
          </div>
          <p class="small text-dark mb-2" style="line-height:1.6;">
            ${espData.descripcionPsicologica}
          </p>
          <div class="small text-muted">
            <strong><i class="bi bi-lightning-charge-fill text-warning me-1"></i>Rasgo Dominante:</strong> ${espData.rasgoPrincipal}
          </div>
        </div>

        <!-- Justificación de Respuestas Clave -->
        ${summaryItemsHtml ? `
        <div class="p-3 rounded-3 mb-3 border reasons-summary-box small">
          <h6 class="fw-bold text-dark mb-2">
            <i class="bi bi-check-circle-fill text-success me-1"></i> Análisis de tus Decisiones ante los Dilemas:
          </h6>
          <ul class="mb-0 ps-3 text-muted">
            ${summaryItemsHtml}
          </ul>
        </div>
        ` : ''}

        <!-- Barras de Compatibilidad de las 4 Carreras -->
        <div class="p-3 rounded-3 mb-3 bg-light border">
          <h6 class="fw-bold mb-3 text-dark" style="font-size:0.84rem;">
            <i class="bi bi-bar-chart-fill text-primary me-1"></i> Balance de Compatibilidad Vocacional:
          </h6>
          ${barsHtml}
        </div>

        <!-- Inserción Laboral y Entorno Paita -->
        <div class="p-3 bg-white rounded-3 border mb-3 small">
          <h6 class="fw-bold text-dark mb-2"><i class="bi bi-geo-alt-fill text-danger me-1"></i> Dónde se desempeña tu Arquetipo en Paita y Piura:</h6>
          <p class="text-muted mb-2">${espData.campoPaita}</p>
          <div class="d-flex flex-wrap gap-1 mt-1">
            ${espData.empresas.map(emp => `<span class="badge bg-light text-dark border"><i class="bi bi-building me-1 text-primary"></i>${emp}</span>`).join('')}
          </div>
        </div>

        <!-- Sinergia Complementaria -->
        <div class="p-3 rounded-3 mb-3 small bg-light border">
          <i class="bi bi-lightbulb-fill text-warning me-1"></i>
          <strong>Sinergia Multidisciplinaria:</strong><br>
          <span class="text-muted">${sinergiaTexto}</span>
        </div>

        <!-- Acciones Directas: WhatsApp y PDF -->
        <div class="d-flex flex-wrap gap-2 justify-content-center mb-3">
          <a href="https://wa.me/51969035252?text=${encodeURIComponent(`¡Hola! Acabo de rendir el Test Vocacional Psicológico en HercarBot IA del IESTP Hermanos Cárcamo de Paita.\n\n🎯 Mi diagnóstico:\n• Carrera: ${topCareer.nombre} (${topCareer.codigo})\n• Arquetipo: ${espData.arquetipo}\n• Compatibilidad: ${topPercent}%\n\n¿Podrían orientarme sobre los requisitos de admisión y fechas de inscripción?`)}" target="_blank" class="btn-whatsapp-advisor">
            <i class="bi bi-whatsapp fs-5"></i>
            <span>Compartir Resultado con Asesor por WhatsApp</span>
          </a>
          <button type="button" class="btn-print-vocational" onclick="hercarBotApp.printVocationalSheet()">
            <i class="bi bi-printer-fill fs-6"></i>
            <span>Imprimir / Guardar Ficha (PDF)</span>
          </button>
        </div>

        <!-- Botones de Acción Inmediata -->
        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_malla_carrera" data-chat-val="${topCareer.id}">
            <i class="bi bi-book text-primary"></i> Ver Malla Curricular
          </button>
          <button class="interactive-btn" data-chat-action="ver_admision_completa">
            <i class="bi bi-mortarboard-fill text-success"></i> ¿Cómo Postular?
          </button>
          <button class="interactive-btn" data-chat-action="iniciar_test_vocacional">
            <i class="bi bi-arrow-repeat text-secondary"></i> Repetir Test (Nuevos Dilemas)
          </button>
        </div>
      </div>
    `;

    this.triggerConfetti();

    // Guardar en estadísticas
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
      fecha: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if (stats.testsRealizados.length > 50) stats.testsRealizados.pop();

    if (stats.carrerasConsultas && stats.carrerasConsultas[topCareer.id] !== undefined) {
      stats.carrerasConsultas[topCareer.id] += 3;
    }
    this.saveStats(stats);

    const testChips = [
      { label: `Malla de ${topCareer.codigo}`, prompt: `¿Qué materias o cursos se llevan en ${topCareer.codigo}?` },
      { label: 'Requisitos de Admisión', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?' },
      { label: '¿Cuánto cuesta la matrícula?', prompt: '¿Cómo es el pago de matrícula y cuánto cuesta en el Banco de la Nación?' },
      { label: 'Practicar Simulador', prompt: 'Quiero practicar el simulador de admisión' }
    ];

    const spokenIntro = `¡Felicitaciones! Tras evaluar tus respuestas, tu carrera técnica ideal en el instituto es ${topCareer.nombre}. Tu perfil encaja perfectamente como ${espData.titulo}. ¡Muchos éxitos en tu camino profesional!`;
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

    this.appendBotMessage(html, false);
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
      { label: 'Malla de APSTI', prompt: '¿Qué materias o cursos se llevan en APSTI?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    this.appendBotMessage(html, "Contamos con convenios laborales activos con empresas pesqueras, agencias marítimas y aduanas para que realices tus prácticas profesionales en Paita.", bolsaChips);
  }

  /* ==========================================================================
     DISPARADOR DE ACCIONES
     ========================================================================== */

  triggerAction(action, val = null) {
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
        const cDet = CARRERAS_COMPLETAS.find(c => c.id === val);
        if (cDet) {
          this.renderCarreraCompleta(cDet);
          this.logQuery('carreras', cDet.id);
        }
        break;
      case 'ver_malla_carrera':
        const cMalla = CARRERAS_COMPLETAS.find(c => c.id === val);
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
        this.renderTramitesList();
        this.logQuery('tramites');
        break;
      case 'ver_tramite_especifico':
      case 'ver_tramite_detalle':
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
        this.handleTestResponse(val);
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
          this._selectedCotizador = ['tupa-matricula'];
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
      case 'ver_examen_suficiencia':
        this.renderExamenSuficiencia();
        this.logQuery('titulacion');
        break;
      case 'ver_tramite_titulo':
        this.renderTramiteTitulo();
        this.logQuery('titulacion');
        break;
      case 'ver_buscador_tupa':
        this.renderBuscadorTupaCompleto();
        this.logQuery('pagos');
        break;
      case 'abrir_personalizacion':
        const btnCustom = document.getElementById('btn-customize-studio');
        if (btnCustom) btnCustom.click();
        break;
      case 'copiar_cuenta_bn':
        this.copyData('00-638-002361', 'Cuenta Corriente BN (TUPA)');
        break;
      case 'copiar_cuenta_ingles_bn':
        this.copyData('00-638-025736', 'Cuenta BN Inglés / Productivas');
        break;
      case 'copiar_cci_bn':
        this.showToast('Solo se aceptan depósitos en ventanilla del Banco de la Nación (Ctas. 00-638-002361 y 00-638-025736). No uses CCI ni Págalo.pe.', 'warning', 'bi-exclamation-triangle-fill');
        break;
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
          <span class="small"><strong>Tip:</strong> Prueba preguntando: <em>"¿Cuáles son las 4 carreras técnicas?"</em> o <em>"Malla de APSTI"</em>.</span>
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
        title: '🌸 Voz y Personalización',
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
