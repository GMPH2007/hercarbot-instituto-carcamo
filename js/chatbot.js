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

    this.initStats();
    this.initDom();
    this.initTheme();
    this.initEvents();
    this.initSpeech();
    this.initVoiceSynthesis();
    this.initConversations();
    this.initAutocomplete();
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
  }

  initEvents() {
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
        const val = btnAction.getAttribute('data-chat-val');
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
      { text: 'APSTI: Perfil, cursos de software y campo laboral', prompt: '¿Cómo es la carrera de APSTI y cuál es su campo laboral?', cat: 'carrera', icon: 'bi-laptop', label: 'APSTI' },
      { text: 'Negocios Internacionales (ANI): Comercio exterior y aduanas', prompt: '¿De qué trata la carrera de Administración de Negocios Internacionales?', cat: 'carrera', icon: 'bi-ship', label: 'ANI' },
      { text: 'Contabilidad: Finanzas, tributación y gestión empresarial', prompt: '¿Cuál es el perfil y campo de trabajo en Contabilidad?', cat: 'carrera', icon: 'bi-calculator-fill', label: 'Contabilidad' },
      { text: 'Desarrollo Pesquero y Acuícola (DPA): Recursos y plantas', prompt: '¿Qué se aprende en Desarrollo Pesquero y Acuícola en Paita?', cat: 'carrera', icon: 'bi-water', label: 'DPA' },
      { text: 'Requisitos y modalidades del Proceso de Admisión 2026', prompt: '¿Cuáles son los requisitos para postular en la admisión 2026?', cat: 'admision', icon: 'bi-file-earmark-person-fill', label: 'Admisión' },
      { text: '¿El instituto es 100% gratuito o se paga pensión mensual?', prompt: '¿El instituto es 100% gratuito o se paga pensión mensual?', cat: 'admision', icon: 'bi-cash-coin', label: 'Gratuidad' },
      { text: 'Simulador del Examen de Admisión Oficial', prompt: 'Quiero practicar el simulador de admisión', cat: 'admision', icon: 'bi-pencil-square', label: 'Simulador' },
      { text: 'Test Vocacional Inteligente (24 preguntas orientadoras)', prompt: 'Quiero hacer el test vocacional', cat: 'general', icon: 'bi-compass-fill', label: 'Test Vocacional' },
      { text: 'Guía de Matrícula paso a paso (Dónde voy y qué hago)', prompt: '¿Cómo es el proceso de matrícula paso a paso en el instituto?', cat: 'tramites', icon: 'bi-ui-checks', label: 'Matrícula' },
      { text: 'Pago en el Banco de la Nación y registro de comprobante', prompt: '¿Cómo realizo el pago en el Banco de la Nación y cómo registro mi voucher?', cat: 'pagos', icon: 'bi-bank', label: 'Pagos BN' },
      { text: 'Número de Cuenta Bancaria Oficial del Banco de la Nación (00-631-012948)', prompt: '¿Cuál es el número de cuenta bancaria para pagar?', cat: 'pagos', icon: 'bi-bank2', label: 'Cuenta BN' },
      { text: 'Curso de Inglés obligatorio para titularse (MINEDU Nivel A2)', prompt: '¿El curso de inglés es obligatorio para titularme según el Minedu?', cat: 'tramites', icon: 'bi-translate', label: 'Inglés' },
      { text: 'Requisitos para tramitar Certificado Modular Progresivo', prompt: '¿Cómo tramito mi Certificado Modular y cuánto demora?', cat: 'tramites', icon: 'bi-award-fill', label: 'Certificados' },
      { text: 'Bolsa de trabajo y convenios para prácticas en el Puerto de Paita', prompt: '¿Cómo funciona la bolsa de trabajo y convenios para prácticas?', cat: 'general', icon: 'bi-briefcase-fill', label: 'Bolsa Trabajo' },
      { text: 'Ubicación del campus en Paita y turnos de estudio', prompt: '¿Dónde queda el campus institucional y cuál es el horario?', cat: 'general', icon: 'bi-geo-alt-fill', label: 'Ubicación' },
      { text: 'Convenios con Beca 18 y Beca Pronabec', prompt: '¿Puedo estudiar con Beca 18 o Beca Continuidad en HERCAR?', cat: 'admision', icon: 'bi-star-fill', label: 'Becas' },
      { text: 'Calculadora de Inasistencias y límite de DPI (Regla del 30%)', prompt: 'Calculadora de faltas e inasistencias DPI', cat: 'academico', icon: 'bi-calculator-fill', label: 'Calculadora DPI' },
      { text: 'Calculadora de notas y subsanación (Promedio EC 70% + EF 30%)', prompt: 'Calculadora de notas y promedio final', cat: 'academico', icon: 'bi-calculator', label: 'Notas' },
      { text: 'Cotizador y simulador de tasas y pagos TUPA', prompt: 'Cotizador de trámites TUPA', cat: 'pagos', icon: 'bi-receipt', label: 'Cotizador' },
      { text: 'Métodos de pago digitales: Págalo.pe, App BN, Yape y transferencias CCI', prompt: '¿Cómo pagar por Págalo.pe o transferencia bancaria?', cat: 'pagos', icon: 'bi-phone', label: 'Pagos Digitales' },
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
    if (btnWidget) {
      btnWidget.addEventListener('click', () => {
        document.body.classList.toggle('hercar-widget-mode');
        const isWidget = document.body.classList.contains('hercar-widget-mode');
        this.showToast(isWidget ? '🗗 Modo Burbuja activado (Vista sobre portal ieshercar.edu.pe)' : 'Modo Pantalla Completa restaurado', 'info', 'bi-window-stack');
      });
    }

    // Modal de Generación de FUT Oficial
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
  }

  openFutModal() {
    const modal = document.getElementById('modalGeneradorFUT');
    if (modal) modal.classList.add('open');
  }

  closeFutModal() {
    const modal = document.getElementById('modalGeneradorFUT');
    if (modal) modal.classList.remove('open');
  }

  printFutDocument() {
    const nombre = (document.getElementById('futNombre')?.value || 'ESTUDIANTE HERCAR').trim();
    const dni = (document.getElementById('futDni')?.value || '--------').trim();
    const carrera = document.getElementById('futCarrera')?.value || 'APSTI';
    const tramite = document.getElementById('futTramite')?.value || 'SOLICITUD INSTITUCIONAL';
    const detalle = (document.getElementById('futDetalle')?.value || 'Por corresponder de acuerdo al Reglamento Institucional y TUPA vigente del IESTP Hermanos Cárcamo de Paita.').trim();
    const fecha = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });

    // Guardar registro de solicitud para el Panel Administrativo (admin.html)
    try {
      const records = JSON.parse(localStorage.getItem('hercarbot_fut_requests') || '[]');
      records.unshift({
        id: 'fut_' + Date.now(),
        nombre,
        dni,
        carrera,
        tramite,
        detalle,
        fecha: new Date().toLocaleString(),
        estado: 'Generado y Descargado'
      });
      localStorage.setItem('hercarbot_fut_requests', JSON.stringify(records.slice(0, 50)));
    } catch (e) {}

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>FUT Oficial - ${nombre}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 40px; color: #111; line-height: 1.5; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 24px; }
            .inst-name { font-size: 14px; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase; }
            .fut-title { font-size: 18px; font-weight: bold; margin: 6px 0; color: #0f172a; }
            .box { border: 1px solid #334155; padding: 12px 14px; margin-bottom: 14px; border-radius: 6px; }
            .label { font-weight: bold; font-size: 11px; color: #475569; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px; }
            .val { font-size: 13.5px; margin: 0; }
            .firma-box { margin-top: 60px; text-align: center; }
            .firma-line { display: inline-block; width: 280px; border-top: 1px solid #000; padding-top: 6px; font-weight: bold; }
            .footer-note { margin-top: 40px; padding-top: 12px; border-top: 1px dashed #94a3b8; font-size: 10.5px; color: #64748b; text-align: center; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <p class="inst-name">Ministerio de Educación &bull; DRE Piura</p>
            <p class="inst-name" style="font-size: 15px; color: #0f2d6c;">IESTP "HERMANOS CÁRCAMO" DE PAITA</p>
            <div class="fut-title">FORMATO ÚNICO DE TRÁMITE (FUT)</div>
            <small style="color: #64748b;">Mesa de Partes Virtual &bull; Resolución Ministerial N° 232-87-ED</small>
          </div>

          <div class="box">
            <div class="label">I. Resumen del Pedido (Sumilla):</div>
            <p class="val"><strong>${tramite}</strong></p>
          </div>

          <div class="box">
            <div class="label">II. Dependencia o Autoridad a quien se dirige:</div>
            <p class="val"><strong>DIRECCIÓN GENERAL DEL IESTP "HERMANOS CÁRCAMO" DE PAITA</strong></p>
          </div>

          <div class="box">
            <div class="label">III. Datos del Solicitante:</div>
            <p class="val">
              <strong>Apellidos y Nombres:</strong> ${nombre}<br>
              <strong>DNI / Celular de Contacto:</strong> ${dni}<br>
              <strong>Programa de Estudios (Carrera):</strong> ${carrera}
            </p>
          </div>

          <div class="box">
            <div class="label">IV. Fundamentación del Pedido:</div>
            <p class="val">${detalle}</p>
          </div>

          <p style="margin-top: 25px; font-size: 13px;">Paita, ${fecha}</p>

          <div class="firma-box">
            <div class="firma-line">
              ${nombre}<br>
              <span style="font-size: 11px; font-weight: normal; color: #475569;">DNI N° ${dni} &bull; Solicitante</span>
            </div>
          </div>

          <div class="footer-note">
            Documento generado digitalmente por el Asistente Virtual <strong>HercarBot IA</strong>.<br>
            Adjunta este documento firmado junto a tu comprobante de tasa del Banco de la Nación en: 
            <strong>https://sistema.ieshercar.edu.pe/registro-tramite/</strong>
          </div>
        </body>
        </html>
      `);
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); }, 350);
    }

    this.closeFutModal();
    this.showToast('¡FUT generado con éxito! Puedes imprimirlo o guardarlo como PDF.', 'success', 'bi-file-earmark-check-fill');

    const chatMsgHtml = `
      <div class="p-3 bg-white rounded-3 border shadow-sm">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i>FUT Generado</span>
          <strong>${tramite}</strong>
        </div>
        <p class="small text-muted mb-2">Tu Formato Único de Trámite para <strong>${nombre}</strong> (${carrera}) ha sido emitido con éxito.</p>
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
    this.appendBotMessage(chatMsgHtml, `He generado tu Formato Único de Trámite para ${tramite}. Recuerda subirlo firmado a través de la Mesa de Partes Virtual.`);
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
                <button class="tool-btn" title="Escuchar en voz alta" onclick="hercarBotApp.speakCurrent(this)"><i class="bi bi-volume-up"></i></button>
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
        <li class="p-3 text-center text-white-50 small">
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
    if (this.inputField) this.inputField.placeholder = 'Hazme cualquier pregunta sobre el IESTP Hermanos Cárcamo...';
    try {
      if (this.recognition) this.recognition.stop();
    } catch(e) {}
  }

  /* ==========================================================================
     SÍNTESIS DE VOZ NATURAL, FLUIDA Y CONVERSACIONAL (TEXT TO SPEECH)
     ========================================================================== */

  initVoiceSynthesis() {
    if (!('speechSynthesis' in window)) return;

    // Sanear configuraciones previas corruptas o valores descalibrados
    const oldPitch = parseFloat(localStorage.getItem('hercar_voice_pitch'));
    const oldRate = parseFloat(localStorage.getItem('hercar_voice_rate'));
    if (oldPitch && (oldPitch > 1.05 || oldPitch < 0.95)) {
      localStorage.removeItem('hercar_voice_pitch');
    }
    if (oldRate && (oldRate < 0.95 || oldRate > 1.10)) {
      localStorage.removeItem('hercar_voice_rate');
    }

    // Configuración estándar humana y natural (Pitch 1.0 y Rate 1.0)
    this.voiceRate = parseFloat(localStorage.getItem('hercar_voice_rate')) || 1.0;
    this.voicePitch = parseFloat(localStorage.getItem('hercar_voice_pitch')) || 1.0;
    this.voiceStyle = localStorage.getItem('hercar_voice_style') || 'calida';
    this.voiceURI = localStorage.getItem('hercar_voice_uri') || null;

    const scoreVoice = (v) => {
      if (!v.lang || (!v.lang.toLowerCase().startsWith('es') && !v.name.toLowerCase().includes('spanish'))) return -100;
      let score = 10;
      const name = (v.name || '').toLowerCase();
      const lang = (v.lang || '').toLowerCase();

      // Detección exhaustiva de voces naturales y femeninas de alta fidelidad
      const isFemale = name.includes('female') || name.includes('mujer') || 
                       name.includes('paloma') || name.includes('dalia') || name.includes('salma') || 
                       name.includes('sabina') || name.includes('paulina') || name.includes('elena') || 
                       name.includes('helena') || name.includes('monica') || name.includes('mónica') || 
                       name.includes('camila') || name.includes('sofia') || name.includes('sofía') || 
                       name.includes('andrea') || name.includes('laura') || name.includes('lucia') || 
                       name.includes('lucía') || name.includes('victoria') || name.includes('elvira') || 
                       name.includes('rosa') || name.includes('marta') || name.includes('marina') || 
                       name.includes('carmen') || name.includes('francisca') || name.includes('penelope') || 
                       name.includes('penélope') || name.includes('zira') || name.includes('conchita') || 
                       name.includes('esperanza') || name.includes('valeria') || name.includes('mia') ||
                       (name.includes('google') && !name.includes('male') && !name.includes('hombre'));

      // Detección de voces masculinas para despriorizarlas si se busca asistente femenina
      const isMale = name.includes('male') || name.includes('hombre') || 
                     name.includes('jorge') || name.includes('alvaro') || name.includes('álvaro') || 
                     name.includes('raul') || name.includes('raúl') || name.includes('pablo') || 
                     name.includes('david') || name.includes('carlos') || name.includes('miguel') || 
                     name.includes('antonio') || name.includes('manuel') || name.includes('enrique') || 
                     name.includes('jose') || name.includes('josé') || name.includes('pedro') || 
                     name.includes('luis') || name.includes('fernando') || name.includes('mario') || 
                     name.includes('diego') || name.includes('sergio') || name.includes('javier');

      if (isFemale) score += 200;
      if (isMale) score -= 150;

      // Máxima prioridad: Voces Neuronales / Naturales de Microsoft Edge / Azure / Windows 11
      if (name.includes('natural') || name.includes('neural') || name.includes('online (natural)')) score += 190;
      else if (name.includes('online')) score += 90;

      // Alta prioridad: Voces fluidas y suaves de Google Chrome / Android
      if (name.includes('google')) score += 140;

      // Voces femeninas reconocidas por su dicción limpia
      if (name.includes('sabina') || name.includes('paloma') || name.includes('dalia') || name.includes('salma')) score += 100;
      if (name.includes('paulina') || name.includes('elena') || name.includes('helena') || name.includes('mónica') || name.includes('monica')) score += 80;
      if (name.includes('laura') || name.includes('camila') || name.includes('lucia') || name.includes('lucía') || name.includes('sofia')) score += 60;

      // Preferencia regional: Perú / Latinoamérica / Neutro
      if (lang === 'es-pe') score += 50;
      else if (lang === 'es-419' || lang.includes('419')) score += 45;
      else if (lang === 'es-mx') score += 35;
      else if (lang === 'es-us') score += 30;
      else if (lang === 'es-co' || lang === 'es-cl' || lang === 'es-ar') score += 20;
      else if (lang.startsWith('es')) score += 15;

      // Penalizar voces robóticas de escritorio antiguas
      if (name.includes('desktop')) score -= 40;

      return score;
    };

    const populateVoiceDropdown = (spanishVoices) => {
      const dropdown = document.getElementById('voice-select-dropdown');
      if (!dropdown) return;
      dropdown.innerHTML = '';

      spanishVoices.forEach((v) => {
        const option = document.createElement('option');
        option.value = v.voiceURI;
        const nameLower = v.name.toLowerCase();
        const isNatural = nameLower.includes('natural') || nameLower.includes('neural') || nameLower.includes('google');
        const isFemale = nameLower.includes('female') || nameLower.includes('mujer') || 
                         nameLower.includes('paloma') || nameLower.includes('dalia') || nameLower.includes('salma') || 
                         nameLower.includes('sabina') || nameLower.includes('paulina') || nameLower.includes('elena') || 
                         nameLower.includes('helena') || nameLower.includes('monica') || nameLower.includes('camila') || 
                         nameLower.includes('sofia') || nameLower.includes('andrea') || nameLower.includes('laura') || 
                         nameLower.includes('victoria') || nameLower.includes('lucia') || nameLower.includes('elvira') || 
                         (nameLower.includes('google') && !nameLower.includes('male'));

        let badge = '';
        if (isNatural && isFemale) badge = ' 🌸 Voz Femenina Natural (Recomendada)';
        else if (isFemale) badge = ' 🌸 Voz Femenina';
        else if (isNatural) badge = ' ✨ Voz Natural';

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

      spanishVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a));

      if (this.voiceURI) {
        const saved = spanishVoices.find(v => v.voiceURI === this.voiceURI);
        if (saved) {
          this.selectedVoice = saved;
        } else {
          this.selectedVoice = spanishVoices[0];
          this.voiceURI = this.selectedVoice.voiceURI;
          localStorage.setItem('hercar_voice_uri', this.voiceURI);
        }
      } else {
        this.selectedVoice = spanishVoices[0];
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

  initVoiceModalControls() {
    const dropdown = document.getElementById('voice-select-dropdown');
    const speedRange = document.getElementById('voice-speed-range');
    const speedLabel = document.getElementById('voice-speed-label');
    const btnWarm = document.getElementById('btn-voice-style-warm');
    const btnPro = document.getElementById('btn-voice-style-pro');
    const btnTest = document.getElementById('btn-test-voice-sample');
    const btnReset = document.getElementById('btn-reset-voice-defaults');

    if (speedRange && speedLabel) {
      speedRange.value = this.voiceRate || 1.0;
      speedLabel.textContent = `${Number(this.voiceRate).toFixed(2)}x (Natural y Fluida)`;

      speedRange.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.voiceRate = val;
        localStorage.setItem('hercar_voice_rate', val);
        speedLabel.textContent = `${val.toFixed(2)}x (${val < 0.95 ? 'Pausada' : val > 1.05 ? 'Ágil' : 'Natural'})`;
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
        }
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
        this.voiceStyle = 'calida';
        this.voicePitch = 1.0;
        this.voiceRate = 1.0;
        localStorage.setItem('hercar_voice_style', 'calida');
        localStorage.setItem('hercar_voice_pitch', 1.0);
        localStorage.setItem('hercar_voice_rate', 1.0);
        if (speedRange && speedLabel) {
          speedRange.value = 1.0;
          speedLabel.textContent = '1.00x (Natural y Fluida 🌸)';
        }
        btnWarm.classList.add('active', 'btn-primary');
        btnWarm.classList.remove('btn-outline-primary');
        btnPro.classList.remove('active', 'btn-primary');
        btnPro.classList.add('btn-outline-secondary');
        this.showToast('Voz configurada: Asesora Femenina Natural 🌸', 'success', 'bi-mic-fill');
      });

      btnPro.addEventListener('click', () => {
        this.voiceStyle = 'pro';
        this.voicePitch = 1.0;
        this.voiceRate = 1.0;
        localStorage.setItem('hercar_voice_style', 'pro');
        localStorage.setItem('hercar_voice_pitch', 1.0);
        localStorage.setItem('hercar_voice_rate', 1.0);
        if (speedRange && speedLabel) {
          speedRange.value = 1.0;
          speedLabel.textContent = '1.00x (Formal y Serena 👔)';
        }
        btnPro.classList.add('active', 'btn-primary');
        btnPro.classList.remove('btn-outline-secondary');
        btnWarm.classList.remove('active', 'btn-primary');
        btnWarm.classList.add('btn-outline-primary');
        this.showToast('Voz configurada: Asesor Formal 👔', 'info', 'bi-briefcase-fill');
      });
    }

    if (btnTest) {
      btnTest.addEventListener('click', () => {
        const saludoPrueba = this.voiceStyle === 'pro'
          ? 'Estimado postulante o estudiante. Soy el asistente virtual oficial del Instituto Hermanos Cárcamo de Paita. Te oriento con información actualizada sobre carreras técnicas, requisitos de matrícula y trámites académicos.'
          : '¡Hola! Te doy la bienvenida al Instituto Hermanos Cárcamo de Paita. Con mucho gusto te oriento sobre nuestras cuatro carreras técnicas, admisión y trámites académicos. ¿Qué información deseas consultar?';
        this.speak(saludoPrueba);
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        localStorage.removeItem('hercar_voice_uri');
        localStorage.removeItem('hercar_voice_rate');
        localStorage.removeItem('hercar_voice_pitch');
        localStorage.removeItem('hercar_voice_style');
        this.voiceRate = 1.0;
        this.voicePitch = 1.0;
        this.voiceStyle = 'calida';
        this.voiceURI = null;
        if (speedRange && speedLabel) {
          speedRange.value = 1.0;
          speedLabel.textContent = '1.00x (Natural)';
        }
        this.initVoiceSynthesis();
        this.showToast('Voz restablecida a entonación natural y clara', 'info', 'bi-arrow-counterclockwise');
      });
    }
  }

  extractSpokenAnswer(htmlOrMarkdown, title = '') {
    if (!htmlOrMarkdown && !title) {
      return this.preparePhoneticText('¡Hola! Con mucho gusto te oriento en lo que necesites sobre el instituto.');
    }

    let raw = (htmlOrMarkdown || '').toString();

    // 1. Eliminar scripts, estilos, botones y badges
    raw = raw
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<button[\s\S]*?<\/button>/gi, '')
      .replace(/<span\s+class=["'][^"']*badge[^"']*["'][\s\S]*?<\/span>/gi, '')
      .replace(/<i\s+class=["'][^"']*bi-[^"']*["'][^>]*><\/i>/gi, '');

    // 2. Convertir saltos de bloque y elementos de lista en pausas naturales
    raw = raw
      .replace(/<\/(p|div|h[1-6]|tr|li|blockquote)>/gi, '. ')
      .replace(/<br\s*[\/]?>/gi, '. ');

    // 3. Extraer texto visible de enlaces markdown [Texto](url) -> Texto
    raw = raw.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    // 4. Eliminar etiquetas HTML restantes
    raw = raw.replace(/<[^>]+>/g, ' ');

    // 5. Limpiar formato Markdown (negrita, cursiva, encabezados) sin destruir puntuación
    raw = raw
      .replace(/[*_#`~>]/g, ' ')
      .replace(/^\s*[-•·▪]\s+/gm, '. ')
      .replace(/^\s*\d+\.\s+/gm, '. ');

    // 6. Eliminar emojis para evitar que el sintetizador describa caras o símbolos
    raw = raw.replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, ' ');

    // 7. Normalizar espacios y puntos repetidos
    raw = raw
      .replace(/\s+/g, ' ')
      .replace(/\.{2,}/g, '.')
      .replace(/\s*\.\s*/g, '. ')
      .trim();

    // 8. Construir locución fluida de hasta 3 oraciones completas
    const sentences = raw.split(/(?<=[.!?])\s+/).filter(s => {
      const cleanS = s.trim();
      if (cleanS.length < 10) return false;
      if (/^(preguntas sugeridas|principales comunicados|guia del sistema)/i.test(cleanS)) return false;
      return true;
    });

    let spoken = '';
    if (sentences.length > 0) {
      let acc = [];
      let totalLen = 0;
      for (const sent of sentences) {
        if (totalLen + sent.length <= 380 || acc.length === 0) {
          acc.push(sent.trim());
          totalLen += sent.length;
        } else {
          break;
        }
      }
      spoken = acc.join(' ');
    } else {
      spoken = raw.slice(0, 300);
    }

    if (!spoken || spoken.length < 15) {
      if (title && title.length > 5) {
        spoken = `Te comparto la información oficial sobre ${title}. Puedes revisar todos los detalles en tu pantalla.`;
      } else {
        spoken = 'He preparado la información oficial completa en tu pantalla para resolver tu consulta.';
      }
    }

    return this.preparePhoneticText(spoken);
  }

  generateSpokenHeadline(htmlOrText, customTitle = null) {
    if (!htmlOrText && !customTitle) {
      return this.preparePhoneticText('¡Hola! Qué gusto saludarte. Con todo gusto te oriento en lo que necesites sobre el instituto.');
    }
    // Extraer y hablar la respuesta real completa que el bot acaba de entregar
    return this.extractSpokenAnswer(htmlOrText, customTitle);
  }

  preparePhoneticText(text) {
    if (!text) return '';
    let p = text.toString();

    // 1. Limpieza de honestidad académica y gratuidad pública
    p = p
      .replace(/Banco\s+de\s+la\s+Naci[oó]n\s*\(?\s*BN\s*\)?/gi, 'Banco de la Nación')
      .replace(/Ministerio\s+de\s+Educaci[oó]n\s*\(?\s*MINEDU\s*\)?/gi, 'Ministerio de Educación')
      .replace(/Seguro\s+Integral\s+de\s+Salud\s*\(?\s*SIS\s*\)?/gi, 'Seguro Integral de Salud')
      .replace(/TUPA\s+Institucional/gi, 'Tupa institucional')
      .replace(/aprox\.\s*/gi, 'aproximadamente ')
      .replace(/\b100%\s*gratuita\b/gi, 'pública y sin mensualidades')
      .replace(/\b100%\s*gratuito\b/gi, 'público y sin mensualidades')
      .replace(/\bcien por ciento gratuita\b/gi, 'pública y sin mensualidades')
      .replace(/\bcien por ciento gratuito\b/gi, 'público y sin mensualidades')
      .replace(/\btodas son gratuitas\b/gi, 'todas son carreras públicas sin mensualidad')
      .replace(/\bcarreras gratuitas\b/gi, 'carreras públicas sin mensualidad')
      .replace(/¡?\s*NO SE PAGAN PENSIONES NI MENSUALIDADES!?/gi, 'no se pagan pensiones ni mensualidades');

    // 2. Monedas y montos monetarios en soles
    p = p
      .replace(/S\/\.?\s*250(?:\.00)?/gi, 'doscientos cincuenta soles')
      .replace(/S\/\.?\s*180(?:\.00)?/gi, 'ciento ochenta soles')
      .replace(/S\/\.?\s*150(?:\.00)?/gi, 'ciento cincuenta soles')
      .replace(/S\/\.?\s*120(?:\.00)?/gi, 'ciento veinte soles')
      .replace(/S\/\.?\s*50(?:\.00)?/gi, 'cincuenta soles')
      .replace(/S\/\.?\s*30(?:\.00)?/gi, 'treinta soles')
      .replace(/S\/\.?\s*25(?:\.00)?/gi, 'veinticinco soles')
      .replace(/S\/\.?\s*20(?:\.00)?/gi, 'veinte soles')
      .replace(/S\/\.?\s*15(?:\.00)?/gi, 'quince soles')
      .replace(/S\/\.?\s*10(?:\.00)?/gi, 'diez soles')
      .replace(/S\/\.?\s*(\d+)(?:\.00)?/gi, '$1 soles');

    // 3. Cuenta bancaria institucional y Códigos
    p = p
      .replace(/00-631-012948/g, 'cero cero, seis tres uno, cero uno dos nueve cuatro ocho')
      .replace(/018-631-000631012948-52/g, 'cero uno ocho, seis tres uno, triple cero, seis tres uno cero uno dos nueve cuatro ocho, cincuenta y dos')
      .replace(/20215039231/g, 'dos cero dos uno, cinco cero tres nueve, dos tres uno')
      .replace(/\(073\)\s*211048|073-211048/g, 'cero siete tres, dos uno uno, cero cuatro ocho')
      .replace(/968\s*184\s*783|968184783/g, 'nueve seis ocho, uno ocho cuatro, siete ocho tres');

    // 4. Horas y rangos de horario
    p = p
      .replace(/8:00\s*(?:a\.?m\.?|am)\b/gi, 'ocho de la mañana')
      .replace(/8:30\s*(?:a\.?m\.?|am)\b/gi, 'ocho y media de la mañana')
      .replace(/1:15\s*(?:p\.?m\.?|pm)\b/gi, 'una y quince de la tarde')
      .replace(/12:00\s*(?:p\.?m\.?|pm)\b/gi, 'doce del mediodía')
      .replace(/3:00\s*(?:p\.?m\.?|pm)\b/gi, 'tres de la tarde')
      .replace(/7:40\s*(?:p\.?m\.?|pm)\b/gi, 'siete y cuarenta de la noche');

    // 5. Siglas institucionales con pronunciación natural
    p = p
      .replace(/\bIESTP\s+Hermanos\s+Cárcamo\b/gi, 'Instituto Hermanos Cárcamo')
      .replace(/\bIESTP\s+HERCAR\b/gi, 'Instituto Hermanos Cárcamo')
      .replace(/\bIESTP\b/gi, 'Instituto')
      .replace(/\bHERCAR\b/gi, 'Hercar')
      .replace(/\bHercarBot\s*IA\b/gi, 'HercarBot')
      .replace(/\bHercarBot\b/gi, 'HercarBot')
      .replace(/\bMINEDU\b/gi, 'Minedu')
      .replace(/\bAPSTI\b/gi, 'A, P, S, T, I')
      .replace(/\bANI\b/gi, 'A, N, I')
      .replace(/\bCONTA\b/gi, 'Contabilidad')
      .replace(/\bDPA\b/gi, 'D, P, A')
      .replace(/\bDPI\b/gi, 'límite de faltas')
      .replace(/\bFUT\b/gi, 'F, U, T')
      .replace(/\bTUPA\b/gi, 'Tupa')
      .replace(/\bSIS\b/gi, 'Seguro Integral de Salud')
      .replace(/\bBN\b/gi, 'Banco de la Nación')
      .replace(/\bCCI\b/gi, 'código interbancario')
      .replace(/\bCEPRE\b/gi, 'Cepre')
      .replace(/\bEFSRT\b/gi, 'prácticas preprofesionales')
      .replace(/\bSANIPES\b/gi, 'Sanipes')
      .replace(/\bIMARPE\b/gi, 'Imarpe')
      .replace(/\bPRODUCE\b/gi, 'Ministerio de la Producción')
      .replace(/\bPRONABEC\b/gi, 'Pronabec')
      .replace(/\bSUNAT\b/gi, 'Sunat')
      .replace(/\bDNI\b/gi, 'D, N, I')
      .replace(/\bPDF\b/gi, 'P, D, F')
      .replace(/\bWhatsApp\b/gi, 'WhatsApp')
      .replace(/\bchatbot\b/gi, 'asistente virtual')
      .replace(/\bIA\b/gi, 'inteligencia artificial')
      .replace(/ieshercar\.edu\.pe/gi, 'portal del instituto')
      .replace(/\b70%/g, 'setenta por ciento')
      .replace(/\b30%/g, 'treinta por ciento')
      .replace(/\b100%/g, 'cien por ciento')
      .replace(/2026/g, 'dos mil veintiséis')
      .replace(/2025/g, 'dos mil veinticinco')
      .replace(/1°/g, 'primer').replace(/2°/g, 'segundo').replace(/3°/g, 'tercer')
      .replace(/4°/g, 'cuarto').replace(/5°/g, 'quinto').replace(/6°/g, 'sexto')
      .replace(/N°|Nro\./gi, 'número')
      .replace(/https?:\/\/\S+/g, 'enlace oficial');

    // 6. Limpieza de caracteres no pronunciables preservando signos de entonación
    p = p
      .replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, '')
      .replace(/\s*\/\s*/g, ' o ')
      .replace(/[*#_`\[\]()^~|•·▪]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return p;
  }

  speak(text) {
    if (this.isMuted || !('speechSynthesis' in window) || !text) return;
    this.stopSpeaking();

    const clean = this.preparePhoneticText(text);
    if (!clean || clean.trim().length === 0) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    this.currentUtterance = utterance;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || 'es-PE';
    } else {
      utterance.lang = 'es-PE';
    }

    // Entonación humana natural
    utterance.rate = this.voiceRate || 1.0;
    utterance.pitch = this.voicePitch || 1.0;
    utterance.volume = this.voiceVolume || 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.voiceIndicator) this.voiceIndicator.classList.add('active');
      if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'inline-flex';
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.voiceIndicator) this.voiceIndicator.classList.remove('active');
      if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'none';
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.voiceIndicator) this.voiceIndicator.classList.remove('active');
      if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'none';
    };

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.speechHeartbeatInterval) {
      clearInterval(this.speechHeartbeatInterval);
      this.speechHeartbeatInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    if (this.voiceIndicator) this.voiceIndicator.classList.remove('active');
    if (this.btnStopSpeech) this.btnStopSpeech.style.display = 'none';
  }

  playSound(type = 'receive') {
    if (this.isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'send') {
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(750, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(650, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(480, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      }
    } catch {}
  }

  /* ==========================================================================
     PANTALLA DE BIENVENIDA Y MENSAJES
     ========================================================================== */

  renderWelcome() {
    if (!this.messagesContainer) return;
    this.messagesContainer.innerHTML = '';

    const welcomeHtml = `
      <div class="bot-welcome-hero animate-fade-in">
        <div class="welcome-badge">
          <i class="bi bi-patch-check-fill text-primary"></i> Información oficial del IESTP Hermanos Cárcamo · Paita 2026
        </div>
        <h1 class="welcome-title">¡Hola! ¿En qué te puedo ayudar hoy? 👋</h1>
        <p class="welcome-subtitle">
          Soy el asistente virtual del <strong>IESTP "Hermanos Cárcamo"</strong> de Paita. Selecciona uno de los temas principales o escribe tu duda en el chat:
        </p>

        <!-- Banner Visual Institucional del Campus Real -->
        <div class="welcome-campus-card mb-3">
          <div class="campus-banner-img-wrap">
            <img src="assets/img/campus-hercar.jpg" alt="Campus Central IESTP Hermanos Cárcamo - Paita" class="campus-banner-img" />
            <div class="campus-banner-overlay">
              <div>
                <div class="campus-banner-title">
                  <i class="bi bi-geo-alt-fill text-danger me-1"></i> Campus Central Paita Alta
                </div>
                <div class="campus-banner-addr">
                  Av. Miguel Grau Mz. A Lt. 01 – Urb. El Parque · Paita, Piura
                </div>
              </div>
              <div class="campus-banner-tags">
                <span class="campus-badge"><i class="bi bi-telephone-fill me-1"></i> (073) 251013</span>
                <span class="campus-badge"><i class="bi bi-clock-fill me-1"></i> Lun-Vie 8am-3pm</span>
                <span class="campus-badge bg-gold"><i class="bi bi-mortarboard-fill me-1"></i> 100% Gratuito</span>
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
              <small>APSTI, Negocios, Contabilidad y Pesquería con mallas completas</small>
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
              <strong>Matrícula Paso a Paso</strong>
              <small>¿Qué pago? ¿Dónde voy? ¿Cómo registro mi voucher en el BN?</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_cotizador_tupa" style="border-top: 3px solid #0284c7;">
            <div class="feature-pill-icon-box" style="background: rgba(2,132,199,0.12); color: #0284c7;">
              <i class="bi bi-receipt-cutoff"></i>
            </div>
            <div>
              <strong>Cotizador de Pagos TUPA</strong>
              <small>Calcula el monto exacto de certificados, carné y trámites</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_metodos_pago_digitales" style="border-top: 3px solid #059669;">
            <div class="feature-pill-icon-box" style="background: rgba(5,150,105,0.12); color: #059669;">
              <i class="bi bi-phone-fill"></i>
            </div>
            <div>
              <strong>Pagos Digitales & Págalo.pe</strong>
              <small>Paga sin colas desde tu celular con App BN, Yape o Págalo.pe</small>
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

          <div class="feature-pill" data-chat-action="ver_calculadora_dpi" style="border-top: 3px solid #dc2626;">
            <div class="feature-pill-icon-box" style="background: rgba(220,38,38,0.12); color: #dc2626;">
              <i class="bi bi-alarm-fill"></i>
            </div>
            <div>
              <strong>Calculadora DPI (Faltas 30%)</strong>
              <small>Calcula tus inasistencias máximas para no desaprobar tu curso</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_titulacion_efsrt" style="border-top: 3px solid #8b5cf6;">
            <div class="feature-pill-icon-box" style="background: rgba(139,92,246,0.12); color: #8b5cf6;">
              <i class="bi bi-award-fill"></i>
            </div>
            <div>
              <strong>Titulación & Prácticas EFSRT</strong>
              <small>820 horas de prácticas, carta de presentación y título MINEDU</small>
            </div>
          </div>

          <div class="feature-pill" data-chat-action="ver_calendario_2026" style="border-top: 3px solid #0891b2;">
            <div class="feature-pill-icon-box" style="background: rgba(8,145,178,0.12); color: #0891b2;">
              <i class="bi bi-calendar3"></i>
            </div>
            <div>
              <strong>Calendario & Campus 2026</strong>
              <small>Cronograma de clases, fechas clave y croquis de pabellones</small>
            </div>
          </div>

        </div>

        <!-- Chips Rápidos Espaciosos y Variados -->
        <div class="suggested-prompts-section">
          <span class="suggested-label"><i class="bi bi-lightning-charge-fill text-warning me-1"></i> Preguntas Frecuentes y Herramientas Rápidas:</span>
          <div class="prompts-chips-wrapper">
            <button class="prompt-chip highlight-tour-chip" data-chat-action="iniciar_mini_tour"><i class="bi bi-compass-fill me-1"></i> 💡 ¿Cómo funciona HercarBot? (Mini Tour Guiado)</button>
            <button class="prompt-chip" data-prompt="¿Cuál es el número de cuenta bancaria para pagar?">🏦 Número de Cuenta BN</button>
            <button class="prompt-chip" data-prompt="¿Cuánto cuesta la matrícula y qué hago después de pagar?">💰 ¿Qué pago y dónde voy?</button>
            <button class="prompt-chip" data-prompt="Calculadora de notas y promedio final">📊 Calculadora de Notas (70/30)</button>
            <button class="prompt-chip" data-prompt="Cotizador de trámites TUPA">🧮 Cotizador TUPA</button>
            <button class="prompt-chip" data-prompt="¿Cómo pagar por Págalo.pe o transferencia bancaria?">📱 Págalo.pe / App BN</button>
            <button class="prompt-chip" data-prompt="Calculadora de faltas e inasistencias DPI">⏱️ ¿Cuántas faltas puedo tener?</button>
            <button class="prompt-chip" data-prompt="Comparar las 4 carreras del instituto">⚖️ Comparar 4 carreras</button>
            <button class="prompt-chip" data-prompt="¿Cuánto gana un egresado técnico en Paita?">💼 Sueldos en Paita</button>
            <button class="prompt-chip" data-prompt="¿Cómo hago mis prácticas preprofesionales EFSRT?">🏢 Prácticas EFSRT (820 hrs)</button>
            <button class="prompt-chip" data-prompt="Calendario académico 2026 y fechas clave">📅 Calendario Académico 2026</button>
            <button class="prompt-chip" data-prompt="Mapa del campus y ambientes del instituto">🗺️ Croquis de Ambientes</button>
            <button class="prompt-chip" data-prompt="¿Cómo justificar inasistencias por salud o trabajo?">📝 Justificar faltas</button>
            <button class="prompt-chip" data-prompt="¿Cómo recupero mi clave del sistema o aula virtual?">🔑 Olvidé mi contraseña</button>
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

    // Interceptar solicitud de tour o instrucciones interactivas
    if (/^(tour|guia|guía|instrucciones|tutorial|como funciona|cómo funciona|como sirve|cómo sirve|ayuda tour)/i.test(queryText)) {
      if (this.tourGuide) {
        this.tourGuide.start();
        return;
      }
    }

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
            <button class="tool-btn" title="Escuchar en voz alta" onclick="hercarBotApp.speakCurrent(this)">
              <i class="bi bi-volume-up"></i>
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
📌 *Cuenta Banco de la Nación:* 00-631-012948
💳 *Código CCI:* 018-631-000631012948-52
📍 *Campus Central:* Av. Miguel Grau Mz. A Lt. 01, Paita Alta
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
    const bubble = btn.closest('.msg-bubble-bot');
    if (!bubble) return;
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
        `, "Al ser un instituto de educación pública, no cobramos pensiones ni mensualidades por estudiar. Únicamente se abona la tasa administrativa de matrícula por semestre en el Banco de la Nación.", [
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

      const matchesCareer = norm.includes(cId) || norm.includes(cCode) || norm.includes(cNom) || (cNomCorto && norm.includes(cNomCorto)) ||
        (cId === 'apsti' && (norm.includes('sistemas') || norm.includes('software') || norm.includes('programacion') || norm.includes('computacion') || norm.includes('redes') || norm.includes('ti') || norm.includes('informatica') || norm.includes('desarrollo web') || norm.includes('ciberseguridad'))) ||
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

    // 14.4 Número de Cuenta Bancaria Oficial para Pagos (Banco de la Nación / CCI)
    if (norm.includes('numero de cuenta') || norm.includes('num de cuenta') || norm.includes('nro de cuenta') || norm.includes('pasa la cuenta') || norm.includes('pasar la cuenta') || norm.includes('pasas la cuenta') || norm.includes('pasa el numero') || norm.includes('dame la cuenta') || norm.includes('a que cuenta') || norm.includes('cuenta para pagar') || norm.includes('cuenta bancaria') || (norm.includes('cuenta') && (norm.includes('banco') || norm.includes('nacion') || norm.includes('depositar') || norm.includes('transferir') || norm.includes('corriente') || norm.includes('pagar') || norm.includes('deposito'))) || norm.includes('cual es la cuenta') || norm.includes('datos bancarios') || norm.includes('datos de la cuenta') || norm.includes('cci del banco') || norm.includes('codigo interbancario')) {
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

    // 14.6 Métodos de Pago Digitales (Págalo.pe, App BN, Yape, Plin y Transferencia CCI)
    if (norm.includes('pagalo') || norm.includes('yape') || norm.includes('plin') || norm.includes('interbancari') || norm.includes('transferencia') || norm.includes('cci') || norm.includes('agente multired') || norm.includes('sin ir al banco') || norm.includes('pagar por internet') || norm.includes('pago digital') || norm.includes('pago virtual') || norm.includes('app bn') || norm.includes('aplicativo bn')) {
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
    if (norm.includes('pago') || norm.includes('pagar') || norm.includes('voucher') || norm.includes('banco') || norm.includes('cuenta') || norm.includes('subir voucher') || norm.includes('tesoreria') || norm.includes('deposito') || norm.includes('pagos ieshercar')) {
      this.renderGuiaPagos();
      this.logQuery('pagos');
      return;
    }

    // 16. Curso de Inglés y Requisito de Idioma Extranjero
    if (norm.includes('ingles') || norm.includes('idioma') || norm.includes('idiomas') || norm.includes('curso de ingles') || norm.includes('ingles tecnico') || norm.includes('suficiencia')) {
      this.renderCursoIngles();
      this.logQuery('ingles');
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
      const spokenFaq = this.extractSpokenAnswer(matchedFaq.respuesta, matchedFaq.titulo);
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
        1. APSTI: Arquitectura de Plataformas y Servicios de Tecnologías de la Información
        2. ANI: Administración de Negocios Internacionales (logística portuaria de Paita)
        3. Contabilidad: Tributación SUNAT, finanzas y costos empresariales
        4. DPA: Desarrollo Pesquero y Acuícola (plantas de congelado Tierra Colorada, conchas de abanico, SANIPES)
      - Portales Oficiales:
        * Pagos y Vouchers: https://pagos.ieshercar.edu.pe/
        * Sistema Académico / Matrícula: https://sistema.ieshercar.edu.pe/acceso
        * Aula Virtual: https://aula.ieshercar.edu.pe/
        * Trámites y Mesa de Partes: https://ieshercar.edu.pe/registro-tramite/
      - Matrícula y Pagos: Cuenta corriente oficial del Banco de la Nación N.° 00-631-012948. Tras pagar, el alumno sube el voucher nítido a pagos.ieshercar.edu.pe o lo presenta en Tesorería.
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
      El estudiante te ha compartido una imagen o comprobante bancario.
      TU MISIÓN:
      1. Si es un comprobante de pago o voucher del Banco de la Nación:
         - Identifica si es para el IESTP Hermanos Cárcamo (Cuenta: 00-631-012948, RUC: 20484258810).
         - Revisa monto, fecha y número de operación.
         - Indícale al estudiante que debe registrarlo en https://pagos.ieshercar.edu.pe/ para que Tesorería lo valide.
      2. Si es un certificado de estudios, DNI o documento:
         - Oriéntalo con amabilidad sobre el trámite institucional que le corresponde en https://ieshercar.edu.pe/registro-tramite/.
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
              <strong class="text-primary d-block mb-1"><i class="bi bi-bank me-1"></i> 1. Banco y Cuenta Corriente</strong>
              <span>Banco de la Nación del Perú.<br>Cta. Cte.: <strong>00-631-012948</strong><br>Titular: IESTP Hermanos Cárcamo.</span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-success d-block mb-1"><i class="bi bi-cash-stack me-1"></i> 2. Tasas Oficiales Válidas</strong>
              <span>• Matrícula Regular: <strong>S/ 180.00</strong><br>• Examen Ordinario: <strong>S/ 150.00</strong><br>• Certificado Modular: <strong>S/ 50.00</strong></span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-warning d-block mb-1"><i class="bi bi-calendar-check me-1"></i> 3. Número de Operación y Fecha</strong>
              <span>El número de secuencia u operación bancaria (6 a 8 dígitos) y la fecha deben ser completamente nítidos.</span>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 bg-light rounded-3 border small h-100">
              <strong class="text-danger d-block mb-1"><i class="bi bi-cloud-arrow-up-fill me-1"></i> 4. Registro Obligatorio</strong>
              <span>Debes ingresar a <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a> y subir la foto nítida con tu DNI.</span>
            </div>
          </div>
        </div>

        <div class="alert alert-info py-2 px-3 small mb-3">
          <i class="bi bi-clock-history me-1"></i> <strong>Aprobación:</strong> Tesorería valida los vouchers en un plazo máximo de 24 a 48 horas hábiles. Una vez aprobado, podrás ratificar tu matrícula o retirar tu certificado.
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none"><i class="bi bi-box-arrow-up-right text-primary"></i> Subir a pagos.ieshercar.edu.pe</a>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Ver Video Tutorial</button>
          <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso"><i class="bi bi-ui-checks text-success"></i> Pasos de Matrícula</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡He revisado tu imagen adjunta! Aquí tienes las indicaciones y requisitos clave para que Tesorería valide tu comprobante sin ningún inconveniente.");
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
          <p class="mb-0 text-muted">Solo se abona la tasa administrativa por <strong>Derecho de Matrícula Semestral</strong> (aprox. <strong>S/. 120.00</strong> por semestre según TUPA, que incluye carné de medio pasaje y seguro estudiantil SIS).</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-warning fw-bold" style="color:#d97706 !important;">
            <span class="badge bg-warning text-dark rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">2</span>
            <span>¿DÓNDE PAGO? (BANCO DE LA NACIÓN)</span>
          </div>
          <p class="mb-1"><strong>Cuenta Corriente Oficial:</strong> <code class="fs-6 px-2 py-1 bg-white border rounded">00-631-012948</code></p>
          <p class="mb-0 text-muted">A nombre de: <em>IESTP Hermanos Cárcamo</em>. Puedes pagar en cualquier agencia del Banco de la Nación, Agente MultiRed o en línea por la plataforma <strong>Págalo.pe</strong>.</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-danger fw-bold">
            <span class="badge bg-danger rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">3</span>
            <span>¿QUÉ HAGO INMEDIATAMENTE DESPUÉS DE PAGAR?</span>
          </div>
          <p class="mb-0 text-muted">Conserva el voucher original en físico (¡no lo botes ni lo ensucies!). Tómale una <strong>foto nítida y legible</strong> con tu celular donde se aprecie claramente el <strong>N° de Operación, Fecha, Hora e Importe</strong> depositado.</p>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-success fw-bold">
            <span class="badge bg-success rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">4</span>
            <span>¿A DÓNDE VOY O DÓNDE LO REGISTRO?</span>
          </div>
          <p class="mb-2 text-muted">Tienes dos opciones:</p>
          <ul class="mb-2 ps-3 text-muted">
            <li><strong>Virtual (Recomendado):</strong> Entra a <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold">pagos.ieshercar.edu.pe</a>, selecciona "Matrícula", digita tu DNI, los datos del voucher y adjunta la foto.</li>
            <li><strong>Presencial:</strong> Acércate a la <strong>Oficina de Tesorería / Secretaría</strong> del campus en <em>Av. Víctor Raúl Haya de la Torre s/n, Paita Alta</em> (Lunes a Viernes de 8:00 a.m. a 1:00 p.m.).</li>
          </ul>
        </div>

        <div class="p-3 bg-white rounded-3 border small mb-3">
          <div class="d-flex align-items-center gap-2 mb-2 text-info fw-bold">
            <span class="badge bg-info text-dark rounded-circle" style="width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;">5</span>
            <span>¿CÓMO SÉ QUE YA ESTOY MATRICULADO?</span>
          </div>
          <p class="mb-0 text-muted">En 24 a 48 horas hábiles, Secretaría Académica valida el comprobante, emite tu <strong>Ficha de Matrícula Oficial</strong> y habilita tus credenciales para el <a href="https://sistema.ieshercar.edu.pe/acceso" target="_blank">Sistema Académico</a> y el <a href="https://aula.ieshercar.edu.pe/" target="_blank">Aula Virtual</a>.</p>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn" style="text-decoration:none;"><i class="bi bi-box-arrow-up-right text-warning"></i> Ir a pagos.ieshercar.edu.pe</a>
          <button class="interactive-btn" data-chat-action="ver_curso_ingles"><i class="bi bi-translate text-primary"></i> Curso de Inglés (Titulación)</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt text-danger"></i> Dónde queda el Instituto</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "¡Hola! Con gusto te explico los pasos de matrícula. Recuerda que al ser educación pública no pagas mensualidades, solo la tasa semestral en el Banco de la Nación y registras tu voucher en el portal oficial.", [
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
            <span class="badge bg-primary-subtle text-primary p-2"><i class="bi bi-laptop me-1"></i> Coord. APSTI (Software & Redes)</span>
            <span class="badge bg-success-subtle text-success p-2"><i class="bi bi-globe me-1"></i> Coord. Negocios (ANI)</span>
            <span class="badge bg-purple-subtle text-purple p-2" style="background:#f3e8ff; color:#7e22ce;"><i class="bi bi-calculator me-1"></i> Coord. Contabilidad</span>
            <span class="badge bg-info-subtle text-info p-2"><i class="bi bi-water me-1"></i> Coord. Pesquería (DPA)</span>
          </div>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Horarios de Atención</button>
          <button class="interactive-btn" data-chat-action="ver_todas_carreras"><i class="bi bi-mortarboard text-primary"></i> 4 Carreras Técnicas</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "Nuestra institución está liderada por la Dirección General junto a la Unidad Académica, Secretaría General y Tesorería. Aquí puedes conocer a nuestro equipo directivo.", [
      { label: "📍 Horarios y Ubicación", prompt: "¿Dónde queda el instituto y cuál es el horario de atención?" },
      { label: "💻 Carrera APSTI", prompt: "¿Qué cursos se llevan en APSTI?" },
      { label: "📜 Trámites y Certificados", prompt: "¿Cómo tramito mi Certificado Modular?" }
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
    this.appendBotMessage(html, "Con más de treinta y ocho años de trayectoria formando profesionales técnicos en Paita, el Instituto Hermanos Cárcamo tiene como misión brindar educación pública de calidad y alta empleabilidad.", [
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
              <p class="mb-0 text-muted">Lunes a Viernes para estudiantes regulares de APSTI, Negocios Internacionales, Contabilidad y Pesquería.</p>
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
    this.appendBotMessage(html, "Nuestras clases se imparten en el turno mañana, de lunes a viernes, desde las ocho de la mañana hasta la una y quince de la tarde.", [
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
    this.appendBotMessage(html, "El sistema de calificación oficial del Minedu es vigesimal, y apruebas con nota trece. Si tienes entre diez y doce accedes al examen de subsanación antes de cerrar el semestre.", [
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
          <p class="mb-0 text-muted">Permite cambiarte entre las carreras del IESTP Hermanos Cárcamo (ej. de Contabilidad a APSTI). Se solicita antes del inicio del ciclo académico y está sujeto a vacantes disponibles.</p>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> ¿Cómo Pagar la Tasa?</button>
          <button class="interactive-btn" data-chat-action="ver_contacto_ubicacion"><i class="bi bi-geo-alt"></i> Horarios de Mesa de Partes</button>
        </div>
      </div>
    `;
    this.appendBotMessage(html, "Si vienes de otra universidad o instituto técnico, puedes convalidar tus cursos aprobados presentando tu certificado oficial de estudios en secretaría.", [
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
    this.appendBotMessage(html, "Brindamos atención en bienestar estudiantil con afiliación gratuita al SIS, tópico médico de primeros auxilios, tutoría psicopedagógica y actividades deportivas.", [
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
            <i class="bi bi-file-earmark-check text-success"></i> Trámite TUPA Titulación
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
                <h6 class="fw-bold text-dark mb-0">APSTI (Sistemas & TI)</h6>
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
            <span class="badge bg-warning text-dark fw-bold px-3 py-2"><i class="bi bi-bank me-1"></i> Cta. Cte. 00-631-012948</span>
          </div>
        </div>

        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="bi bi-credit-card me-1 text-primary"></i> Datos para tu Pago:</h6>
          <ul class="mb-0 ps-3 text-muted">
            <li><strong>Banco de la Nación:</strong> Cuenta Corriente N° <code>00-631-012948</code>.</li>
            <li><strong>Código de Cuenta Interbancario (CCI):</strong> <code>018-631-000631012948-52</code> (Desde cualquier banco o Págalo.pe).</li>
            <li><strong>Titular Oficial:</strong> IESTP Hermanos Cárcamo.</li>
            <li><strong>Registro de Comprobante:</strong> Una vez realizado el pago, sube la foto a <a href="https://pagos.ieshercar.edu.pe/" target="_blank">pagos.ieshercar.edu.pe</a> con tu DNI.</li>
          </ul>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Subir a pagos.ieshercar.edu.pe
          </a>
          <button class="interactive-btn" data-chat-action="ver_metodos_pago_digitales">
            <i class="bi bi-phone-fill text-success"></i> Ver Pagos con Págalo.pe / App
          </button>
          <button class="interactive-btn" data-chat-action="ver_tramites_tupa">
            <i class="bi bi-file-earmark-text text-warning"></i> Requisitos de Trámites
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, `El total calculado para los trámites seleccionados es de S/. ${total}.00 a depositar en la Cuenta Corriente 00-631-012948 del Banco de la Nación.`, [
      { label: "💳 ¿Cómo registrar voucher?", prompt: "¿Cómo registro mi voucher en el portal de pagos?" },
      { label: "📱 Pagos con Págalo.pe", prompt: "¿Cómo pagar con Págalo.pe o transferencia bancaria?" }
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
   * Guía de Métodos de Pago Digitales (Págalo.pe, App BN, CCI y Agentes)
   */
  renderMetodosPagoDigitales() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #10b981;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-success px-3 py-1"><i class="bi bi-wallet2 me-1"></i>Canales Digitales</span>
          <span class="badge bg-light text-dark border">Sin Hacer Colas</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Cómo Pagar por Canales Digitales y Agentes</h4>
        <p class="small text-muted mb-3">Evita colas en la agencia bancaria utilizando las opciones digitales oficiales:</p>

        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-globe2 text-primary fs-5"></i>
                <h6 class="fw-bold text-dark mb-0">1. Págalo.pe (Web y App)</h6>
              </div>
              <p class="small text-muted mb-2">Paga con cualquier tarjeta de débito o crédito Visa o Mastercard sin costo adicional.</p>
              <a href="https://pagalo.pe/" target="_blank" class="btn btn-sm btn-outline-primary rounded-pill px-3" style="font-size: 0.76rem;">
                <i class="bi bi-box-arrow-up-right me-1"></i> Abrir Págalo.pe
              </a>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-bank text-success fs-5"></i>
                <h6 class="fw-bold text-dark mb-0">2. Transferencia Interbancaria (CCI)</h6>
              </div>
              <p class="small text-muted mb-1">Transfiere desde tu banca móvil BCP, BBVA, Interbank o Yape (opción a otros bancos):</p>
              <code class="d-block p-1 bg-light rounded text-primary fw-bold" style="font-size: 0.78rem;">018-631-000631012948-52</code>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-shop text-warning fs-5"></i>
                <h6 class="fw-bold text-dark mb-0">3. Agentes MultiRed en Paita</h6>
              </div>
              <p class="small text-muted mb-0">Deposita en bodegas o farmacias con agente en Paita Alta o Baja a la Cuenta Corriente: <strong>00-631-012948</strong>.</p>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="p-3 bg-white rounded-3 border h-100 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-camera-fill text-info fs-5"></i>
                <h6 class="fw-bold text-dark mb-0">4. Registro Obligatorio</h6>
              </div>
              <p class="small text-muted mb-0">Guarda la captura o foto del voucher e ingrésala en <a href="https://pagos.ieshercar.edu.pe/" target="_blank">pagos.ieshercar.edu.pe</a> para que Caja valide.</p>
            </div>
          </div>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa">
            <i class="bi bi-calculator text-warning"></i> Abrir Cotizador de Tasas TUPA
          </button>
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Subir a pagos.ieshercar.edu.pe
          </a>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos">
            <i class="bi bi-credit-card text-success"></i> Ver Video Tutorial de Pagos
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "Puedes realizar tus abonos cómodamente sin colas a través de Págalo.pe, transferencias interbancarias por CCI o agentes MultiRed.", [
      { label: "🏦 Cotizador de tasas", prompt: "¿Cuánto cuesta el trámite o matrícula?" },
      { label: "💳 Registrar comprobante", prompt: "¿Cómo registrar el voucher en el portal?" }
    ]);
  }

  /**
   * Tarjeta Oficial de Cuentas Bancarias del IESTP Hermanos Cárcamo
   * Muestra la Cuenta Corriente del Banco de la Nación y CCI para copiar con 1 clic
   */
  renderNumeroCuentaBancaria() {
    const html = `
      <div class="faq-card-custom" style="border-top: 4px solid #f59e0b;">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span class="badge bg-warning text-dark px-3 py-1 fw-bold"><i class="bi bi-bank me-1"></i>Banco de la Nación</span>
          <span class="badge bg-success text-white"><i class="bi bi-shield-check me-1"></i>Cuenta Oficial de Recaudación</span>
        </div>
        <h4 class="fw-bold mb-1 text-dark">Número de Cuenta Oficial para Pagos</h4>
        <p class="small text-muted mb-3">
          Aquí tienes los datos bancarios oficiales del <strong>IESTP "Hermanos Cárcamo" de Paita</strong> para abonar matrícula, carné de medio pasaje, certificados modulares o trámites TUPA:
        </p>

        <!-- Tarjeta Premium de Cuentas y Códigos -->
        <div class="p-3 rounded-3 mb-3 border shadow-sm" style="background: linear-gradient(135deg, #091a3e 0%, #163e8c 100%); color: #ffffff;">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <img src="https://ieshercar.edu.pe/public/assets/img/Logo-Hercar.png" alt="Logo" style="width: 28px; height: 28px; background: #fff; border-radius: 6px; padding: 2px;">
              <span class="small text-white-50 fw-semibold">Banco de la Nación del Perú</span>
            </div>
            <span class="badge bg-warning text-dark fw-bold">Cuenta Corriente</span>
          </div>

          <!-- Cuenta Corriente BN -->
          <div class="p-2 px-3 rounded-2 mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);">
            <div>
              <span class="small d-block text-white-50" style="font-size: 0.74rem;">Número de Cuenta Corriente (BN):</span>
              <span class="fs-4 fw-bold font-monospace text-warning d-block" style="letter-spacing: 1px;">00-631-012948</span>
            </div>
            <button class="btn btn-sm btn-warning text-dark fw-bold rounded-pill px-3 py-1 shadow-sm" 
                    onclick="hercarBotApp.copyData('00-631-012948', 'Cuenta Corriente BN')">
              <i class="bi bi-clipboard-check me-1"></i> Copiar Cuenta
            </button>
          </div>

          <!-- CCI Interbancario -->
          <div class="p-2 px-3 rounded-2 mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);">
            <div>
              <span class="small d-block text-white-50" style="font-size: 0.74rem;">Código de Cuenta Interbancario (CCI - Otros Bancos / Yape / Págalo.pe):</span>
              <span class="fs-5 fw-bold font-monospace text-white d-block" style="letter-spacing: 0.5px;">018-631-000631012948-52</span>
            </div>
            <button class="btn btn-sm btn-outline-light fw-bold rounded-pill px-3 py-1" 
                    onclick="hercarBotApp.copyData('018-631-000631012948-52', 'Código CCI')">
              <i class="bi bi-clipboard me-1"></i> Copiar CCI
            </button>
          </div>

          <div class="small text-white-50 mt-2" style="font-size: 0.76rem;">
            <i class="bi bi-person-badge me-1 text-warning"></i><strong>Titular Oficial:</strong> Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" - Paita
          </div>
        </div>

        <!-- Canales de Pago Disponibles -->
        <div class="p-3 bg-light rounded-3 border small mb-3">
          <h6 class="fw-bold text-dark mb-2"><i class="bi bi-wallet2 text-primary me-1"></i> ¿Cómo y dónde puedes pagar con este número de cuenta?</h6>
          <div class="row g-2">
            <div class="col-sm-6">
              <div class="p-2 bg-white rounded border h-100">
                <strong class="text-primary d-block small"><i class="bi bi-shop me-1"></i>1. Agencias BN y Agentes MultiRed</strong>
                <span class="text-muted" style="font-size: 0.76rem;">Dicta en cualquier ventanilla o agente la Cta. Cte. <strong>00-631-012948</strong> y tu DNI. Puedes pagar en cualquier parte de Paita o del Perú.</span>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="p-2 bg-white rounded border h-100">
                <strong class="text-success d-block small"><i class="bi bi-phone me-1"></i>2. Canales Digitales y Transferencias</strong>
                <span class="text-muted" style="font-size: 0.76rem;">Paga en <strong>Págalo.pe</strong>, App BN o haz transferencia interbancaria desde BCP, BBVA o Interbank con el CCI <strong>018-631-000631012948-52</strong>.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Alerta de Registro de Voucher -->
        <div class="p-3 rounded-3 border mb-3 small d-flex align-items-center gap-2" style="background: #fffbeb; border-color: #fde68a !important; color: #92400e;">
          <i class="bi bi-exclamation-triangle-fill fs-4 flex-shrink-0 text-warning"></i>
          <div>
            <strong>¡Paso obligatorio tras pagar!</strong> Conserva tu voucher o captura de transferencia y regístralo con tu número de DNI en <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="fw-bold text-decoration-underline" style="color: #92400e;">pagos.ieshercar.edu.pe</a> para que Secretaría valide tu pago.
          </div>
        </div>

        <div class="interactive-button-grid">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="interactive-btn text-decoration-none">
            <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Registrar Voucher en el Portal
          </a>
          <button class="interactive-btn" data-chat-action="ver_cotizador_tupa">
            <i class="bi bi-calculator text-warning"></i> Cotizador de Trámites TUPA
          </button>
          <button class="interactive-btn" data-chat-action="ver_metodos_pago_digitales">
            <i class="bi bi-phone-fill text-success"></i> Ver Pagos por Págalo.pe / App
          </button>
          <button class="interactive-btn" data-chat-action="ver_matricula_paso_a_paso">
            <i class="bi bi-ui-checks text-info"></i> Pasos de Matrícula
          </button>
        </div>
      </div>
    `;

    this.appendBotMessage(html, "¡Claro que sí! Nuestra cuenta corriente oficial en el Banco de la Nación es cero cero, seis tres uno, cero uno dos nueve cuatro ocho. Si vas a transferir desde tu celular por Yape u otro banco, puedes usar el código interbancario que tienes en la tarjeta para copiarlo con un toque.", [
      { label: "💳 Subir comprobante", prompt: "¿Cómo registro mi voucher en el portal de pagos?" },
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
      <div class="ingles-detail-card p-4 bg-white rounded-3 border shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-primary px-3 py-1 fs-7"><i class="bi bi-translate me-1"></i>Idioma Extranjero Oficial</span>
          <span class="badge bg-warning text-dark"><i class="bi bi-award-fill me-1"></i>Requisito MINEDU</span>
        </div>
        <h4 class="fw-bold mb-2 text-dark">${ing.nombre}</h4>
        <p class="small text-muted mb-3">${ing.finalidad}</p>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-journal-check text-primary me-1"></i> Modalidades y Niveles:</h6>
        <div class="mb-3">${modHtml}</div>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-stars text-warning me-1"></i> Beneficios del Curso Institucional:</h6>
        <ul class="campo-laboral-ul mb-3">${benHtml}</ul>

        <h6 class="fw-bold text-dark mb-2"><i class="bi bi-credit-card-2-front text-success me-1"></i> ¿Cómo Inscribirte y Pagar la Tasa?</h6>
        <ol class="tramite-pasos-ol mb-3">${pasosHtml}</ol>

        <div class="d-flex flex-wrap gap-2 mb-3">
          <a href="https://pagos.ieshercar.edu.pe/" target="_blank" class="btn btn-sm btn-primary rounded-pill px-3 py-2 text-white">
            <i class="bi bi-credit-card me-1"></i> Registrar Pago de Inglés en pagos.ieshercar.edu.pe
          </a>
          <a href="https://wa.me/51969100257?text=Hola,%20quisiera%20informes%20sobre%20el%20Curso%20de%20Ingles%20del%20IESTP%20Hermanos%20Carcamo" target="_blank" class="btn btn-sm btn-success rounded-pill px-3 py-2 text-white">
            <i class="bi bi-whatsapp me-1"></i> Consultar por WhatsApp
          </a>
        </div>

        <div class="interactive-button-grid">
          <button class="interactive-btn" data-chat-action="ver_tramite_especifico" data-chat-val="tramite-titulacion"><i class="bi bi-mortarboard text-primary"></i> Ver Requisitos de Titulación</button>
          <button class="interactive-btn" data-chat-action="ver_guia_pagos"><i class="bi bi-credit-card text-warning"></i> Guía de Pagos BN</button>
        </div>
      </div>
    `;

    const inglesChips = [
      { label: 'Requisitos de Titulación', prompt: '¿Cuáles son los requisitos para titularse profesionalmente?' },
      { label: 'Certificado Modular', prompt: '¿Cómo tramito mi Certificado Modular y cuánto demora?' },
      { label: 'Reglamento Académico', prompt: '¿Cuál es la nota mínima para aprobar y qué pasa si jalo un curso?' }
    ];
    this.appendBotMessage(html, "El curso de inglés técnico institucional es requisito obligatorio del Minedu para titularte profesionalmente. Te oriento en sus niveles y matrícula.", inglesChips);
  }

  renderCarreraCompleta(carrera) {
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
          <div class="d-flex align-items-center gap-2">
            <span class="badge" style="background: ${c.color}; color: #fff; font-size: 0.75rem;">${c.codigo}</span>
            <h6 class="mb-0 fw-bold">${c.nombre}</h6>
          </div>
          <p class="mb-0 small text-muted text-truncate" style="max-width: 400px;">${c.perfilEgreso}</p>
        </div>
        <i class="bi bi-chevron-right text-muted ms-auto"></i>
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
      { label: 'APSTI (Computación)', prompt: '¿Cómo es la carrera de APSTI y cuál es su campo laboral?' },
      { label: 'Negocios Internacionales', prompt: '¿De qué trata la carrera de Administración de Negocios Internacionales?' },
      { label: 'Contabilidad', prompt: '¿Cuál es el perfil y campo de trabajo en Contabilidad?' },
      { label: 'Desarrollo Pesquero', prompt: '¿Qué se aprende en Desarrollo Pesquero y Acuícola en Paita?' },
      { label: 'Test Vocacional', prompt: 'Quiero hacer el test vocacional' }
    ];
    this.appendBotMessage(html, "¡Hola! En el Instituto Cárcamo contamos con cuatro carreras técnicas de tres años: Desarrollo de Sistemas y Software, Administración de Negocios Internacionales, Contabilidad, y Pesquería. Al ser educación pública, no pagas mensualidades, solo la matrícula administrativa de cada semestre.", allCareerChips);
  }

  renderAdmisionInfo(query = '') {
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
    const cuentaBN = '00-631-012948';
    const pasos = [
      'Paso 1: Realiza el depósito en el Banco de la Nación a la Cuenta Corriente N° 00-631-012948 (Titular: IESTP Hermanos Cárcamo).',
      'Paso 2: Asegúrate de que el voucher contenga tu DNI, fecha, hora y número de operación de forma nítida.',
      'Paso 3: Ingresa desde tu celular o PC a https://pagos.ieshercar.edu.pe/',
      'Paso 4: Digita tu número de DNI para ingresar.',
      'Paso 5: Selecciona tu carrera (APSTI, ANI, CONTA o DPA) y el concepto pagado (Matrícula, Admisión, Certificado).',
      'Paso 6: Digita el número de operación y sube la foto clara del comprobante.',
      'Paso 7: Guarda y espera la validación de Caja (24 a 48 horas hábiles).'
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
          <strong>Cuenta Corriente Banco de la Nación:</strong> <code class="fs-6">${cuentaBN}</code><br>
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
    this.appendBotMessage(html, "Para realizar tus pagos, puedes abonar en cualquier agencia o agente del Banco de la Nación, o transferir por código interbancario. Luego subes la foto de tu comprobante a nuestro portal de pagos para que Caja lo valide.", pagosChips);
  }

  renderTramiteDetalle(tramite) {
    const reqList = tramite.requisitos.map(r => `<li><i class="bi bi-check2-square text-primary me-2"></i>${r}</li>`).join('');
    const pasosList = tramite.pasos.map(p => `<li>${p.replace(/^\d+[\.\)]\s*/, '')}</li>`).join('');

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
    switch (action) {
      case 'iniciar_mini_tour':
        if (this.tourGuide) {
          this.tourGuide.start();
        }
        break;
      case 'abrir_generador_fut':
        this.openFutModal();
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
        this.copyData('00-631-012948', 'Cuenta Corriente BN');
        break;
      case 'copiar_cci_bn':
        this.copyData('018-631-000631012948-52', 'Código Interbancario (CCI)');
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
        desc: 'Soy la asistente virtual oficial del IESTP "Hermanos Cárcamo" de Paita. Te guiaré en 30 segundos por todas mis funciones.',
        voice: '¡Hola! Te doy una cordial bienvenida a HercarBot, el asistente virtual oficial del Instituto Hermanos Cárcamo de Paita. Te mostraré rápidamente las funciones principales de nuestra plataforma.'
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
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(this.app.preparePhoneticText(text));
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v =>
        v.lang.startsWith('es') && /sabina|paloma|dalia|salma|paulina|elena|helena|monica|mónica|camila|lucia|lucía|soledad|francisca|andrea|laura|victoria|rosa|carmen|penelope|penélope|esperanza|conchita|valeria|mia|mujer|female|google español/i.test(v.name)
      ) || voices.find(v => v.lang.startsWith('es') && !/male|hombre|jorge|alvaro|álvaro|raul|raúl|david|carlos|pablo|luis|miguel|pedro|jose|josé/i.test(v.name))
        || voices.find(v => v.lang.startsWith('es'));
      if (femaleVoice) utter.voice = femaleVoice;
      utter.lang = 'es-PE';
      utter.pitch = 1.0;
      utter.rate = 1.0;
      window.speechSynthesis.speak(utter);
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
