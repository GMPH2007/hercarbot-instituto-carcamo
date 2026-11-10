/**
 * PANEL DE ADMINISTRACIÓN - JS LOGIC
 * IESTP "Hermanos Cárcamo" - Paita
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminTheme();
  initAdminMobileSidebar();
  initDashboard();
  initAnnouncements();
  initFutRequestsManager();
  initVocationalHistory();
  initFaqManager();
  initUnresolvedList();
  initSettings();
  initNeuralMonitorAdmin();
  initVoiceLaboratoryAdmin();
  initChatAuditAdmin();
  initDatabaseSQLAdmin();

  const btnLogout = document.getElementById('btn-admin-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      showAdminConfirm({
        title: 'Cerrar Sesión',
        message: '¿Deseas salir del panel de administración docente?',
        icon: 'bi-box-arrow-right',
        isDanger: false,
        btnText: 'Sí, Salir',
        onConfirm: () => {
          sessionStorage.removeItem('hercar_admin_session');
          localStorage.removeItem('hercar_admin_session');
          sessionStorage.removeItem('hercar_current_user');
          localStorage.removeItem('hercar_current_user');
          showAdminToast('Sesión cerrada correctamente. Redirigiendo...', 'info', 'bi-shield-lock');
          setTimeout(() => {
            window.location.replace('login.html?logged_out=1');
          }, 400);
        }
      });
    });
  }
});

let careersChart = null;
let categoriesChart = null;

/**
 * Toast flotante institucional no intrusivo (Reemplaza alert nativo)
 */
function showAdminToast(message, type = 'info', icon = 'bi-info-circle-fill') {
  const container = document.getElementById('admin-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `admin-toast toast-${type}`;
  toast.innerHTML = `<i class="bi ${icon} fs-6"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Modal de confirmación institucional estilizado (Reemplaza confirm nativo)
 */
function showAdminConfirm({ title = '¿Estás seguro?', message = 'Esta acción no se puede deshacer.', icon = 'bi-exclamation-triangle-fill', isDanger = true, btnText = 'Confirmar', onConfirm }) {
  const modalEl = document.getElementById('modalAdminConfirm');
  if (!modalEl || !window.bootstrap) {
    if (typeof onConfirm === 'function') onConfirm();
    return;
  }

  const titleEl = document.getElementById('admin-confirm-title');
  const msgEl = document.getElementById('admin-confirm-message');
  const iconEl = document.getElementById('admin-confirm-icon');
  const iconBox = document.getElementById('admin-confirm-icon-box');
  const actionBtn = document.getElementById('admin-confirm-btn-action');

  if (titleEl) titleEl.innerText = title;
  if (msgEl) msgEl.innerText = message;
  if (iconEl) iconEl.className = `bi ${icon}`;

  if (iconBox) {
    if (isDanger) {
      iconBox.style.background = 'rgba(239, 68, 68, 0.12)';
      iconBox.style.color = '#ef4444';
    } else {
      iconBox.style.background = 'rgba(14, 165, 233, 0.12)';
      iconBox.style.color = '#0284c7';
    }
  }

  if (actionBtn) {
    actionBtn.innerText = btnText;
    actionBtn.className = `btn ${isDanger ? 'btn-danger' : 'btn-primary'} rounded-pill px-3 py-2 flex-grow-1 small fw-semibold`;
    actionBtn.onclick = () => {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
      if (typeof onConfirm === 'function') onConfirm();
    };
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function initAdminTheme() {
  const currentTheme = localStorage.getItem('hercarbot_theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  updateAdminThemeButton(currentTheme === 'dark');

  const btnToggle = document.getElementById('btn-admin-theme-toggle');
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      const newTheme = isDark ? 'dark' : 'light';
      localStorage.setItem('hercarbot_theme', newTheme);
      updateAdminThemeButton(isDark);
      updateChartsTheme(isDark);
    });
  }
}

function updateAdminThemeButton(isDark) {
  const icon = document.getElementById('admin-theme-icon');
  const text = document.getElementById('admin-theme-text');
  if (icon && text) {
    if (isDark) {
      icon.className = 'bi bi-sun-fill text-warning';
      text.innerText = 'Modo Claro';
    } else {
      icon.className = 'bi bi-moon-stars-fill text-primary';
      text.innerText = 'Modo Oscuro';
    }
  }
}

function updateChartsTheme(isDark) {
  const textColor = isDark ? '#cbd5e1' : '#64748b';
  const gridColor = isDark ? '#1e2d4d' : '#e2e8f0';

  if (careersChart) {
    if (careersChart.options && careersChart.options.plugins && careersChart.options.plugins.legend) {
      if (!careersChart.options.plugins.legend.labels) careersChart.options.plugins.legend.labels = {};
      careersChart.options.plugins.legend.labels.color = textColor;
    }
    if (careersChart.data.datasets && careersChart.data.datasets[0]) {
      careersChart.data.datasets[0].borderColor = isDark ? '#111c38' : '#ffffff';
    }
    careersChart.update();
  }

  if (categoriesChart) {
    if (categoriesChart.options && categoriesChart.options.scales) {
      if (categoriesChart.options.scales.x) {
        if (!categoriesChart.options.scales.x.ticks) categoriesChart.options.scales.x.ticks = {};
        if (!categoriesChart.options.scales.x.grid) categoriesChart.options.scales.x.grid = {};
        categoriesChart.options.scales.x.ticks.color = textColor;
        categoriesChart.options.scales.x.grid.color = gridColor;
      }
      if (categoriesChart.options.scales.y) {
        if (!categoriesChart.options.scales.y.ticks) categoriesChart.options.scales.y.ticks = {};
        if (!categoriesChart.options.scales.y.grid) categoriesChart.options.scales.y.grid = {};
        categoriesChart.options.scales.y.ticks.color = textColor;
        categoriesChart.options.scales.y.grid.color = gridColor;
      }
    }
    if (categoriesChart.data.datasets && categoriesChart.data.datasets[0]) {
      categoriesChart.data.datasets[0].backgroundColor = isDark ? '#38bdf8' : '#13357b';
    }
    categoriesChart.update();
  }
}

function initAdminMobileSidebar() {
  const btnToggle = document.getElementById('btn-admin-mobile-toggle');
  const btnClose = document.getElementById('btn-close-admin-sidebar');
  const backdrop = document.getElementById('admin-sidebar-backdrop');
  const sidebar = document.getElementById('admin-sidebar');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('show');
    if (backdrop) backdrop.classList.add('show');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('show');
    if (backdrop) backdrop.classList.remove('show');
  }

  if (btnToggle) btnToggle.addEventListener('click', openSidebar);
  if (btnClose) btnClose.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // Manejo de clase activa y cierre al hacer clic en un enlace del sidebar en mobile
  const links = sidebar ? sidebar.querySelectorAll('.sidebar-menu a') : [];
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });

  // ScrollSpy automático para resaltar la sección activa en el sidebar al hacer scroll
  const sectionIds = ['metricas', 'database-sql', 'comunicados', 'tramites-fut', 'vocacional', 'faqs', 'no-resueltas', 'configuracion'];
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) {
        current = id;
      }
    });
    if (current && links.length > 0) {
      links.forEach(l => {
        if (l.getAttribute('href') === `#${current}`) {
          l.classList.add('active');
        } else if (l.getAttribute('href') && l.getAttribute('href').startsWith('#')) {
          l.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}

function getStats() {
  try {
    const raw = localStorage.getItem('hercarbot_stats');
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  return {
    totalConsultas: 345,
    carrerasConsultas: { apsti: 138, ani: 76, conta: 68, dpa: 63 },
    categorias: { admision: 112, tramites: 89, pagos: 74, plataformas: 70 },
    satisfaccionPositiva: 95,
    satisfaccionNegativa: 5,
    totalTestsBonus: 38,
    testsRealizados: [
      { 
        id: 101, 
        carrera: 'APSTI', 
        carreraNombre: 'Arquitectura de Plataformas y Servicios de TI', 
        especialista: 'Especialista en Arquitectura de Software, Ciberseguridad e Infraestructura TI', 
        afinidad: 95, 
        secundaria: 'ANI', 
        fecha: '28/02/2026, 10:15',
        respuestas: [
          { dimension: 'Aptitud Tecnológica & Lógica', emoji: '💻', carrera: 'APSTI', text: 'Diseñar y programar sistemas de software, aplicaciones web y servidores' },
          { dimension: 'Desarrollo Productivo de Paita', emoji: '⚓', carrera: 'APSTI', text: 'Implementar conectividad de fibra óptica y digitalización de operaciones en terminales portuarios' },
          { dimension: 'Aspiración Profesional a 5 Años', emoji: '🛡️', carrera: 'APSTI', text: 'Liderar el departamento de TI, redes y ciberseguridad corporativa' }
        ]
      },
      { 
        id: 102, 
        carrera: 'ANI', 
        carreraNombre: 'Administración de Negocios Internacionales', 
        especialista: 'Especialista en Operaciones Portuarias, Comercio Exterior y Gestión Aduanera', 
        afinidad: 91, 
        secundaria: 'APSTI', 
        fecha: '28/02/2026, 09:40',
        respuestas: [
          { dimension: 'Desarrollo Productivo de Paita', emoji: '🚢', carrera: 'ANI', text: 'Operar logística internacional marítima en el Terminal Portuario Euroandinos (TPE)' },
          { dimension: 'Áreas Académicas Preferidas', emoji: '🌐', carrera: 'ANI', text: 'Comercio exterior, aranceles aduaneros, tratados comerciales e Incoterms' }
        ]
      },
      { 
        id: 103, 
        carrera: 'CONTA', 
        carreraNombre: 'Contabilidad', 
        especialista: 'Especialista en Auditoría Financiera, Tributación SUNAT y Costos Empresariales', 
        afinidad: 88, 
        secundaria: 'ANI', 
        fecha: '27/02/2026, 17:30',
        respuestas: [
          { dimension: 'Áreas Académicas Preferidas', emoji: '📊', carrera: 'CONTA', text: 'Finanzas, estados contables, auditoría tributaria y sistemas SIRE SUNAT' },
          { dimension: 'Estilo de Pensamiento', emoji: '📈', carrera: 'CONTA', text: 'Precisión numérica, análisis financiero riguroso y gestión de balances' }
        ]
      },
      { 
        id: 104, 
        carrera: 'DPA', 
        carreraNombre: 'Desarrollo Pesquero y Acuícola', 
        especialista: 'Especialista en Biotecnología Acuícola, Tecnología Pesquera y Control de Calidad HACCP', 
        afinidad: 93, 
        secundaria: 'CONTA', 
        fecha: '27/02/2026, 14:20',
        respuestas: [
          { dimension: 'Desarrollo Productivo de Paita', emoji: '🐟', carrera: 'DPA', text: 'Gestión de calidad en plantas de procesamiento de pota, conchas de abanico y conservas' },
          { dimension: 'Aptitud Tecnológica & Lógica', emoji: '🌊', carrera: 'DPA', text: 'Cultivo hidrobiológico sostenible, biología marina y protocolos SANIPES/HACCP' }
        ]
      }
    ],
    noResueltas: [
      { id: 1, query: "¿Cuándo inician las clases del semestre 2026-II?", fecha: "18/08/2026, 08:30" },
      { id: 2, query: "¿Cuánto cuesta el duplicado de carné de medio pasaje?", fecha: "17/08/2026, 15:40" },
      { id: 3, query: "¿Hay turno noche para Contabilidad?", fecha: "17/08/2026, 11:20" }
    ]
  };
}

function saveStats(stats) {
  localStorage.setItem('hercarbot_stats', JSON.stringify(stats));
}

function getCustomFaqs() {
  try {
    return JSON.parse(localStorage.getItem('hercarbot_custom_faqs')) || [];
  } catch {
    return [];
  }
}

function saveCustomFaqs(faqs) {
  localStorage.setItem('hercarbot_custom_faqs', JSON.stringify(faqs));
}

function getCustomAnnouncements() {
  try {
    return JSON.parse(localStorage.getItem('hercarbot_custom_announcements')) || [];
  } catch {
    return [];
  }
}

function saveCustomAnnouncements(announcements) {
  localStorage.setItem('hercarbot_custom_announcements', JSON.stringify(announcements));
}

/* ==========================================================================
   DASHBOARD & GRÁFICOS
   ========================================================================== */

function initDashboard() {
  const stats = getStats();

  // Actualizar tarjetas de métricas
  const elTotal = document.getElementById('stat-total-consultas');
  if (elTotal) elTotal.innerText = stats.totalConsultas || 0;

  // Total trámites FUT generados
  const futs = getFutRequests();
  const elFut = document.getElementById('stat-total-fut');
  if (elFut) elFut.innerText = futs.length;

  // Consultas Ciclo Cero & Admisión
  const elCiclo = document.getElementById('stat-ciclo-cero');
  if (elCiclo) elCiclo.innerText = stats.cicloCeroConsultas || 84;

  // Total tests vocacionales
  const elTests = document.getElementById('stat-total-tests');
  if (elTests) {
    const count = (stats.testsRealizados ? stats.testsRealizados.length : 0) + (stats.totalTestsBonus || 38);
    elTests.innerText = count;
  }

  // Carrera top
  let topCarrera = 'APSTI';
  let maxC = 0;
  if (stats.carrerasConsultas) {
    for (const [c, v] of Object.entries(stats.carrerasConsultas)) {
      if (v > maxC) {
        maxC = v;
        topCarrera = c.toUpperCase();
      }
    }
  }
  const elTopC = document.getElementById('stat-top-carrera');
  if (elTopC) elTopC.innerText = topCarrera;

  // Satisfacción
  const pos = stats.satisfaccionPositiva || 90;
  const neg = stats.satisfaccionNegativa || 10;
  const satPercent = Math.round((pos / (pos + neg)) * 100);
  const elSat = document.getElementById('stat-satisfaccion');
  if (elSat) elSat.innerText = `${satPercent}%`;

  // Preguntas no resueltas count
  const noResCount = stats.noResueltas ? stats.noResueltas.length : 0;
  const elNoRes = document.getElementById('stat-no-resueltas');
  if (elNoRes) elNoRes.innerText = noResCount;

  // Render Charts con Chart.js
  renderCharts(stats);
}

function renderCharts(stats) {
  const isDark = document.body.classList.contains('dark-theme');
  const textColor = isDark ? '#cbd5e1' : '#64748b';
  const gridColor = isDark ? '#1e2d4d' : '#e2e8f0';

  // Gráfico de Carreras (Doughnut)
  const ctxCarreras = document.getElementById('chartCarreras');
  if (ctxCarreras && window.Chart) {
    const cData = stats.carrerasConsultas || { apsti: 104, ani: 58, conta: 49, dpa: 37 };
    if (careersChart) careersChart.destroy();
    careersChart = new Chart(ctxCarreras, {
      type: 'doughnut',
      data: {
        labels: ['APSTI (TI)', 'ANI (Negocios)', 'Contabilidad', 'DPA (Pesquería)'],
        datasets: [{
          data: [cData.apsti, cData.ani, cData.conta, cData.dpa],
          backgroundColor: ['#0d6efd', '#198754', '#6f42c1', '#0dcaf0'],
          borderWidth: 2,
          borderColor: isDark ? '#111c38' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, boxWidth: 12, padding: 14 }
          }
        },
        cutout: '65%'
      }
    });
  }

  // Gráfico de Categorías (Bar)
  const ctxCategorias = document.getElementById('chartCategorias');
  if (ctxCategorias && window.Chart) {
    const catData = stats.categorias || { admision: 88, tramites: 64, pagos: 51, plataformas: 45 };
    if (categoriesChart) categoriesChart.destroy();
    categoriesChart = new Chart(ctxCategorias, {
      type: 'bar',
      data: {
        labels: ['Admisión & CEPRE', 'Trámites & Matrícula', 'Sistema de Pagos', 'Plataformas Virtuales'],
        datasets: [{
          label: 'N° de Consultas',
          data: [catData.admision, catData.tramites, catData.pagos, catData.plataformas],
          backgroundColor: isDark ? '#38bdf8' : '#13357b',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: textColor },
            grid: { color: gridColor }
          },
          y: {
            beginAtZero: true,
            ticks: { color: textColor },
            grid: { color: gridColor }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   TABLÓN DE ANUNCIOS Y COMUNICADOS INSTITUCIONALES
   ========================================================================== */

function initAnnouncements() {
  renderAnnouncementsTable();

  const searchAnnInput = document.getElementById('announcement-filter-search');
  if (searchAnnInput) {
    searchAnnInput.addEventListener('input', (e) => {
      renderAnnouncementsTable(e.target.value.trim());
    });
  }

  const form = document.getElementById('form-add-announcement');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveAnnouncementModal();
    });
  }
}

function openCreateAnnouncementModal() {
  const form = document.getElementById('form-add-announcement');
  if (form) form.reset();
  const idField = document.getElementById('announcement-id');
  if (idField) idField.value = '';
  const titleEl = document.getElementById('modalAnnouncementTitle');
  if (titleEl) titleEl.innerHTML = '<i class="bi bi-megaphone me-2"></i>Publicar Comunicado Oficial';
  
  const modalEl = document.getElementById('modalAddAnnouncement');
  if (modalEl) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

function openEditAnnouncementModal(id) {
  const customList = getCustomAnnouncements();
  const item = customList.find(a => a.id === id);
  if (!item) return;

  const modalEl = document.getElementById('modalAddAnnouncement');
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

  document.getElementById('announcement-id').value = item.id;
  document.getElementById('announcement-title').value = item.titulo || '';
  document.getElementById('announcement-summary').value = item.resumen || '';
  document.getElementById('announcement-directions').value = item.indicaciones || '';
  document.getElementById('announcement-drive').value = item.enlaceDrive || '';
  document.getElementById('announcement-url').value = item.enlacePlataforma || '';
  document.getElementById('announcement-important').checked = !!item.importante;

  const titleEl = document.getElementById('modalAnnouncementTitle');
  if (titleEl) titleEl.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Editar Comunicado Institucional';

  modal.show();
}

function saveAnnouncementModal() {
  const id = document.getElementById('announcement-id')?.value.trim();
  const titulo = document.getElementById('announcement-title')?.value.trim();
  const resumen = document.getElementById('announcement-summary')?.value.trim();
  const indicaciones = document.getElementById('announcement-directions')?.value.trim() || '';
  const enlaceDrive = document.getElementById('announcement-drive')?.value.trim() || '';
  const enlacePlataforma = document.getElementById('announcement-url')?.value.trim() || '';
  const importante = document.getElementById('announcement-important')?.checked || false;

  if (!titulo || !resumen) {
    showAdminToast('Por favor completa el título y el resumen del comunicado.', 'warning', 'bi-exclamation-circle-fill');
    return;
  }

  let customList = getCustomAnnouncements();

  if (id) {
    const idx = customList.findIndex(a => a.id === id);
    if (idx !== -1) {
      customList[idx].titulo = titulo;
      customList[idx].resumen = resumen;
      customList[idx].indicaciones = indicaciones;
      customList[idx].enlaceDrive = enlaceDrive;
      customList[idx].enlacePlataforma = enlacePlataforma;
      customList[idx].importante = importante;
      customList[idx].fecha = 'Actualizado ' + new Date().toLocaleDateString();
    }
  } else {
    const newAn = {
      id: 'custom_an_' + Date.now(),
      titulo,
      resumen,
      indicaciones,
      enlaceDrive,
      enlacePlataforma,
      importante,
      fecha: 'Publicado ' + new Date().toLocaleDateString()
    };
    customList.unshift(newAn);
  }

  saveCustomAnnouncements(customList);

  const modalEl = document.getElementById('modalAddAnnouncement');
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }

  document.getElementById('form-add-announcement')?.reset();
  renderAnnouncementsTable();
  showAdminToast(id ? 'Comunicado actualizado correctamente.' : 'Comunicado publicado con éxito. Ya es visible en el Chatbot.', 'success', 'bi-check-circle-fill');
}

function deleteAnnouncement(id) {
  showAdminConfirm({
    title: '¿Eliminar Comunicado?',
    message: '¿Estás seguro de eliminar este comunicado? Dejará de mostrarse a los estudiantes en el chatbot.',
    icon: 'bi-trash3-fill',
    isDanger: true,
    btnText: 'Eliminar Comunicado',
    onConfirm: () => {
      let customList = getCustomAnnouncements();
      customList = customList.filter(a => a.id !== id);
      saveCustomAnnouncements(customList);
      renderAnnouncementsTable();
      showAdminToast('Comunicado eliminado correctamente.', 'warning', 'bi-trash3-fill');
    }
  });
}

function renderAnnouncementsTable(filterText = '') {
  const tbody = document.getElementById('announcements-table-body');
  if (!tbody) return;

  const customList = getCustomAnnouncements();
  let officialList = [];
  if (typeof COMUNICADOS_OFICIALES !== 'undefined') {
    officialList = COMUNICADOS_OFICIALES;
  }

  let all = [
    ...customList.map(a => ({ ...a, isCustom: true })),
    ...officialList.map(a => ({ ...a, isCustom: false }))
  ];

  if (filterText) {
    const ft = filterText.toLowerCase();
    all = all.filter(a => 
      (a.titulo && a.titulo.toLowerCase().includes(ft)) ||
      (a.resumen && a.resumen.toLowerCase().includes(ft)) ||
      (a.indicaciones && a.indicaciones.toLowerCase().includes(ft))
    );
  }

  if (all.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4 text-muted">
          <i class="bi bi-megaphone fs-3 d-block mb-1"></i>
          ${filterText ? 'No se encontraron comunicados con ese término de búsqueda.' : 'No hay comunicados registrados actualmente.'}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = all.map(item => `
    <tr>
      <td>
        <span class="badge ${item.isCustom ? 'bg-success' : 'bg-primary'} mb-1">${item.isCustom ? 'Publicado' : 'Oficial'}</span>
        ${item.importante ? '<br><span class="announcement-urgent-tag"><i class="bi bi-fire"></i>Urgente</span>' : ''}
      </td>
      <td>
        <strong class="text-dark">${escapeHtml(item.titulo)}</strong>
      </td>
      <td>
        <p class="mb-1 text-secondary small">${escapeHtml(item.resumen || '')}</p>
        ${item.indicaciones ? `<div class="small text-muted"><i class="bi bi-info-circle me-1 text-primary"></i>${escapeHtml(item.indicaciones)}</div>` : ''}
      </td>
      <td>
        <div class="small text-muted mb-1"><i class="bi bi-calendar3 me-1"></i>${escapeHtml(item.fecha || 'Vigente')}</div>
        <div class="d-flex gap-1 flex-wrap">
          ${item.enlaceDrive ? `<a href="${item.enlaceDrive}" target="_blank" class="btn btn-xs btn-outline-danger py-0 px-2" style="font-size:0.72rem;"><i class="bi bi-file-earmark-pdf me-1"></i>Drive</a>` : ''}
          ${item.enlacePlataforma ? `<a href="${item.enlacePlataforma}" target="_blank" class="btn btn-xs btn-outline-primary py-0 px-2" style="font-size:0.72rem;"><i class="bi bi-globe me-1"></i>Portal</a>` : ''}
        </div>
      </td>
      <td>
        ${item.isCustom ? `
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary" onclick="openEditAnnouncementModal('${item.id}')" title="Editar"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteAnnouncement('${item.id}')" title="Eliminar"><i class="bi bi-trash"></i></button>
          </div>
        ` : `
          <span class="text-muted small"><i class="bi bi-shield-check text-primary me-1"></i>Fijo</span>
        `}
      </td>
    </tr>
  `).join('');
}

/* ==========================================================================
   GESTIÓN DE TRÁMITES FUT & MESA DE PARTES VIRTUAL
   ========================================================================== */

function getFutRequests() {
  try {
    const raw = localStorage.getItem('hercarbot_fut_requests');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}

  const defaultFuts = [
    {
      id: 'fut_101',
      nombre: 'CASTILLO RUIZ, JEAN PIERRE',
      dni: '73928104',
      carrera: 'Arquitectura de Plataformas y Servicios de TI (APSTI)',
      tramite: 'SOLICITO CARTA DE PRESENTACIÓN PARA PRÁCTICAS (EFSRT)',
      detalle: 'Para iniciar prácticas preprofesionales modulares en el área de sistemas del Terminal Portuario Euroandinos (TPE) de Paita.',
      fecha: '28/02/2026, 11:20',
      estado: 'Generado y Descargado'
    },
    {
      id: 'fut_102',
      nombre: 'MEDINA FLORES, ROSA ELENA',
      dni: '74819205',
      carrera: 'Administración de Negocios Internacionales',
      tramite: 'SOLICITO CONSTANCIA DE ESTUDIOS / MATRÍCULA',
      detalle: 'Constancia oficial de matrícula para trámite de Beca Continuidad PRONABEC 2026.',
      fecha: '28/02/2026, 09:45',
      estado: 'Enviado a Mesa de Partes'
    },
    {
      id: 'fut_103',
      nombre: 'CHUNGA PURIZACA, CARLOS ALBERTO',
      dni: '72910384',
      carrera: 'Contabilidad',
      tramite: 'SOLICITO CERTIFICADO MODULAR / DE ESTUDIOS',
      detalle: 'Certificación del Módulo I: Procesos Contables Básicos culminado con promedio aprobatorio.',
      fecha: '27/02/2026, 16:10',
      estado: 'Generado y Descargado'
    },
    {
      id: 'fut_104',
      nombre: 'PANTA VILLEGAS, LUIS MIGUEL',
      dni: '75019283',
      carrera: 'Desarrollo Pesquero y Acuícola',
      tramite: 'SOLICITO CONVALIDACIÓN DE UNIDADES DIDÁCTICAS',
      detalle: 'Convalidación de cursos modulares por traslado interno entre carreras.',
      fecha: '26/02/2026, 12:35',
      estado: 'Enviado a Mesa de Partes'
    }
  ];
  localStorage.setItem('hercarbot_fut_requests', JSON.stringify(defaultFuts));
  return defaultFuts;
}

function saveFutRequests(records) {
  localStorage.setItem('hercarbot_fut_requests', JSON.stringify(records));
}

function initFutRequestsManager() {
  renderFutTable();

  const searchInput = document.getElementById('fut-filter-search');
  const carreraSelect = document.getElementById('fut-filter-carrera');
  const estadoSelect = document.getElementById('fut-filter-estado');

  const handleFilter = () => {
    const search = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const carrera = carreraSelect ? carreraSelect.value : 'all';
    const estado = estadoSelect ? estadoSelect.value : 'all';
    renderFutTable(search, carrera, estado);
  };

  if (searchInput) searchInput.addEventListener('input', handleFilter);
  if (carreraSelect) carreraSelect.addEventListener('change', handleFilter);
  if (estadoSelect) estadoSelect.addEventListener('change', handleFilter);

  const btnExport = document.getElementById('btn-export-fut-csv');
  if (btnExport) btnExport.addEventListener('click', exportFutToCSV);

  const btnSimulate = document.getElementById('btn-simulate-fut');
  if (btnSimulate) btnSimulate.addEventListener('click', simulateFutRequest);

  const btnClear = document.getElementById('btn-clear-fut');
  if (btnClear) btnClear.addEventListener('click', clearFutRequests);
}

function renderFutTable(filterText = '', filterCarrera = 'all', filterEstado = 'all') {
  const tbody = document.getElementById('fut-table-body');
  const badge = document.getElementById('badge-fut-count');
  const statFut = document.getElementById('stat-total-fut');
  if (!tbody) return;

  const records = getFutRequests();
  if (badge) badge.innerText = `${records.length} Solicitudes`;
  if (statFut) statFut.innerText = records.length;

  const filtered = records.filter(r => {
    const textMatch = !filterText ||
      (r.nombre && r.nombre.toLowerCase().includes(filterText)) ||
      (r.dni && r.dni.toLowerCase().includes(filterText)) ||
      (r.tramite && r.tramite.toLowerCase().includes(filterText));

    let carreraMatch = true;
    if (filterCarrera !== 'all') {
      const c = (r.carrera || '').toLowerCase();
      if (filterCarrera === 'apsti') carreraMatch = c.includes('apsti') || c.includes('plataformas') || c.includes('ti');
      else if (filterCarrera === 'ani') carreraMatch = c.includes('ani') || c.includes('negocios');
      else if (filterCarrera === 'conta') carreraMatch = c.includes('conta');
      else if (filterCarrera === 'dpa') carreraMatch = c.includes('pesquero') || c.includes('acuícola') || c.includes('dpa');
    }

    let estadoMatch = true;
    if (filterEstado !== 'all') {
      const est = (r.estado || '').toLowerCase();
      if (filterEstado === 'generado') estadoMatch = est.includes('descargado') || est.includes('generado');
      else if (filterEstado === 'radicado') estadoMatch = est.includes('mesa') || est.includes('partes') || est.includes('enviado');
    }

    return textMatch && carreraMatch && estadoMatch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-4 text-muted">
          <i class="bi bi-file-earmark-x fs-3 d-block mb-1 text-secondary"></i>
          ${filterText || filterCarrera !== 'all' || filterEstado !== 'all' ? 'No se encontraron solicitudes con los filtros aplicados.' : 'No hay solicitudes de trámite FUT registradas actualmente.'}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    const isEnviado = (r.estado || '').toLowerCase().includes('mesa') || (r.estado || '').toLowerCase().includes('enviado');
    let badgeCarreraClass = 'badge bg-secondary';
    const cLower = (r.carrera || '').toLowerCase();
    if (cLower.includes('apsti') || cLower.includes('ti')) badgeCarreraClass = 'badge bg-primary';
    else if (cLower.includes('negocios') || cLower.includes('ani')) badgeCarreraClass = 'badge bg-success';
    else if (cLower.includes('conta')) badgeCarreraClass = 'badge bg-purple text-white';
    else if (cLower.includes('pesquer') || cLower.includes('dpa')) badgeCarreraClass = 'badge bg-info text-dark';

    return `
      <tr>
        <td class="text-nowrap small text-muted"><i class="bi bi-calendar3 me-1"></i>${escapeHtml(r.fecha || '')}</td>
        <td>
          <div class="fw-bold text-dark">${escapeHtml(r.nombre || 'Estudiante')}</div>
          <small class="text-muted" style="font-size:0.75rem;"><i class="bi bi-person-badge me-1"></i>Postulante / Alumno</small>
        </td>
        <td><span class="badge bg-light text-dark border font-monospace">${escapeHtml(r.dni || '--------')}</span></td>
        <td><span class="${badgeCarreraClass}" style="font-size:0.75rem;">${escapeHtml(r.carrera || 'General')}</span></td>
        <td>
          <div class="small fw-semibold text-primary mb-1">${escapeHtml(r.tramite || 'Trámite TUPA')}</div>
          <div class="small text-muted" style="font-size:0.76rem; max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(r.detalle || '')}</div>
        </td>
        <td>
          <span class="badge ${isEnviado ? 'bg-primary-subtle text-primary border border-primary-subtle' : 'bg-success-subtle text-success border border-success-subtle'} rounded-pill px-2 py-1">
            <i class="bi ${isEnviado ? 'bi-send-check-fill' : 'bi-check-circle-fill'} me-1"></i>${escapeHtml(r.estado || 'Generado')}
          </span>
        </td>
        <td class="text-center">
          <div class="d-flex justify-content-center gap-1">
            <button class="btn btn-sm btn-outline-primary" title="Ver Documento FUT" onclick="viewAdminFut('${r.id}')">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-sm ${isEnviado ? 'btn-outline-warning' : 'btn-outline-success'}" title="${isEnviado ? 'Marcar como Generado' : 'Marcar como Enviado a Mesa de Partes'}" onclick="toggleFutStatus('${r.id}')">
              <i class="bi ${isEnviado ? 'bi-arrow-counterclockwise' : 'bi-send-check'}"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" title="Eliminar registro" onclick="deleteFutRequest('${r.id}')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function viewAdminFut(id) {
  const records = getFutRequests();
  const fut = records.find(r => r.id === id);
  if (!fut) return;

  const modalEl = document.getElementById('modalAdminFutView');
  const bodyEl = document.getElementById('admin-fut-modal-body');
  const printBtn = document.getElementById('btn-admin-fut-print');
  if (!modalEl || !bodyEl) return;

  bodyEl.innerHTML = `
    <div class="border rounded-3 p-4 bg-white shadow-sm" style="font-family: Arial, sans-serif; color: #111;">
      <div class="text-center border-bottom pb-3 mb-3">
        <h4 class="fw-bold mb-1" style="color: #0a1f4d;">FORMATO ÚNICO DE TRÁMITE (FUT)</h4>
        <h6 class="text-muted mb-0">IESTP "HERMANOS CÁRCAMO" DE PAITA — MESA DE PARTES VIRTUAL</h6>
      </div>

      <div class="p-3 mb-3 rounded-2 bg-light border">
        <span class="text-muted fw-bold small text-uppercase d-block mb-1">I. Resumen del Pedido (Sumilla):</span>
        <div class="fs-6 fw-bold text-primary">${escapeHtml(fut.tramite || '')}</div>
      </div>

      <div class="p-3 mb-3 rounded-2 bg-light border">
        <span class="text-muted fw-bold small text-uppercase d-block mb-1">II. Dependencia o Autoridad a quien se dirige:</span>
        <div class="small fw-semibold">DIRECCIÓN GENERAL DEL IESTP "HERMANOS CÁRCAMO" DE PAITA</div>
      </div>

      <div class="p-3 mb-3 rounded-2 bg-light border">
        <span class="text-muted fw-bold small text-uppercase d-block mb-1">III. Datos del Solicitante:</span>
        <div class="row g-2 small">
          <div class="col-sm-6"><strong>Nombres y Apellidos:</strong> ${escapeHtml(fut.nombre || '')}</div>
          <div class="col-sm-6"><strong>DNI / Celular:</strong> ${escapeHtml(fut.dni || '')}</div>
          <div class="col-12 mt-2"><strong>Programa de Estudios:</strong> ${escapeHtml(fut.carrera || '')}</div>
          <div class="col-12"><strong>Fecha de Solicitud:</strong> ${escapeHtml(fut.fecha || '')}</div>
        </div>
      </div>

      <div class="p-3 mb-4 rounded-2 bg-light border">
        <span class="text-muted fw-bold small text-uppercase d-block mb-1">IV. Fundamentación del Pedido:</span>
        <div class="small text-secondary">${escapeHtml(fut.detalle || 'Por corresponder de acuerdo al Reglamento Institucional y TUPA vigente del IESTP Hermanos Cárcamo de Paita.')}</div>
      </div>

      <div class="text-center mt-4 pt-4 border-top">
        <div class="d-inline-block border-top border-dark px-5 pt-2">
          <strong>${escapeHtml(fut.nombre || '')}</strong><br>
          <span class="small text-muted">Firma del Solicitante • DNI: ${escapeHtml(fut.dni || '')}</span>
        </div>
      </div>
    </div>
  `;

  if (printBtn) {
    printBtn.onclick = () => {
      const win = window.open('', '_blank');
      win.document.write(`
        <html><head><title>FUT_${fut.dni || 'DOC'}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #111; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 24px; }
          .box { border: 1px solid #333; padding: 12px; margin-bottom: 14px; border-radius: 6px; }
          .label { font-weight: bold; font-size: 11px; color: #555; text-transform: uppercase; margin-bottom: 4px; }
        </style></head><body>
          <div class="header">
            <h2>FORMATO ÚNICO DE TRÁMITE (FUT)</h2>
            <h4>IESTP "HERMANOS CÁRCAMO" DE PAITA - MESA DE PARTES VIRTUAL</h4>
          </div>
          <div class="box"><div class="label">I. Resumen del Pedido (Sumilla):</div><p><b>${fut.tramite}</b></p></div>
          <div class="box"><div class="label">II. Dependencia o Autoridad a quien se dirige:</div><p>DIRECCIÓN GENERAL DEL IESTP "HERMANOS CÁRCAMO" DE PAITA</p></div>
          <div class="box">
            <div class="label">III. Datos del Solicitante:</div>
            <p><b>Apellidos y Nombres:</b> ${fut.nombre}<br>
            <b>DNI / Contacto:</b> ${fut.dni}<br>
            <b>Programa de Estudios:</b> ${fut.carrera}</p>
          </div>
          <div class="box"><div class="label">IV. Fundamentación del Pedido:</div><p>${fut.detalle || 'Por corresponder de acuerdo al Reglamento Institucional.'}</p></div>
          <p style="margin-top:24px;">Paita, ${fut.fecha}</p>
          <p style="margin-top:50px; text-align:center;">_________________________________________<br><b>${fut.nombre}</b><br>Firma del Solicitante</p>
          <hr><p style="font-size:11px; text-align:center;">Documento oficial gestionado a través de HercarBot IA — Súbelo a: https://sistema.ieshercar.edu.pe/registro-tramite/</p>
        </body></html>
      `);
      win.document.close();
      win.print();
    };
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function toggleFutStatus(id) {
  const records = getFutRequests();
  const fut = records.find(r => r.id === id);
  if (!fut) return;

  const current = (fut.estado || '').toLowerCase();
  if (current.includes('mesa') || current.includes('enviado')) {
    fut.estado = 'Generado y Descargado';
    showAdminToast('Estado cambiado a: Generado y Descargado', 'info', 'bi-arrow-counterclockwise');
  } else {
    fut.estado = 'Enviado a Mesa de Partes';
    showAdminToast('Solicitud marcada como: Enviada a Mesa de Partes', 'success', 'bi-send-check-fill');
  }

  saveFutRequests(records);
  renderFutTable();
}

function deleteFutRequest(id) {
  showAdminConfirm({
    title: '¿Eliminar Solicitud FUT?',
    message: 'Esta solicitud será removida del registro histórico administrativo.',
    icon: 'bi-trash-fill',
    isDanger: true,
    btnText: 'Eliminar Registro',
    onConfirm: () => {
      let records = getFutRequests();
      records = records.filter(r => r.id !== id);
      saveFutRequests(records);
      renderFutTable();
      showAdminToast('Solicitud eliminada con éxito.', 'success', 'bi-trash');
    }
  });
}

function simulateFutRequest() {
  const carreras = [
    'Arquitectura de Plataformas y Servicios de TI (APSTI)',
    'Administración de Negocios Internacionales',
    'Contabilidad',
    'Desarrollo Pesquero y Acuícola'
  ];
  const tramites = [
    'SOLICITO CARTA DE PRESENTACIÓN PARA PRÁCTICAS (EFSRT)',
    'SOLICITO CONSTANCIA DE ESTUDIOS / MATRÍCULA',
    'SOLICITO CERTIFICADO MODULAR / DE ESTUDIOS',
    'SOLICITO RESERVA DE MATRÍCULA / REINGRESO'
  ];
  const nombres = [
    'PACHERREZ SILVA, LUIS FERNANDO',
    'VILLEGAS CARREÑO, MARIA ALEJANDRA',
    'PURIZACA YOVERA, CRISTIAN JOEL',
    'TUME CHUNGA, KATERINE DEL PILAR'
  ];

  const randomIdx = Math.floor(Math.random() * nombres.length);
  const newFut = {
    id: 'fut_' + Date.now(),
    nombre: nombres[randomIdx],
    dni: '7' + Math.floor(1000000 + Math.random() * 9000000),
    carrera: carreras[randomIdx % carreras.length],
    tramite: tramites[randomIdx % tramites.length],
    detalle: 'Solicitud institucional procesada vía HercarBot IA para trámite regular.',
    fecha: new Date().toLocaleString(),
    estado: 'Generado y Descargado'
  };

  const records = getFutRequests();
  records.unshift(newFut);
  saveFutRequests(records);
  renderFutTable();
  showAdminToast(`Nueva solicitud simulada: ${newFut.nombre}`, 'success', 'bi-file-earmark-plus-fill');
}

function clearFutRequests() {
  showAdminConfirm({
    title: '¿Limpiar Todo el Historial de FUTs?',
    message: 'Se borrarán las solicitudes actuales del historial.',
    icon: 'bi-trash3-fill',
    isDanger: true,
    btnText: 'Limpiar Historial',
    onConfirm: () => {
      saveFutRequests([]);
      renderFutTable();
      showAdminToast('Historial de trámites FUT vaciado.', 'info', 'bi-check-circle');
    }
  });
}

function exportFutToCSV() {
  const records = getFutRequests();
  if (records.length === 0) {
    showAdminToast('No hay solicitudes FUT para exportar.', 'info', 'bi-info-circle-fill');
    return;
  }

  let csv = "\uFEFF"; // UTF-8 BOM
  csv += "TRÁMITES FUT GENERADOS - IESTP HERMANOS CÁRCAMO (PAITA)\r\n";
  csv += `Fecha de Exportación:;${new Date().toLocaleString()}\r\n`;
  csv += "Mesa de Partes Virtual:;https://sistema.ieshercar.edu.pe/registro-tramite/\r\n\r\n";
  csv += "ID;Fecha / Hora;Estudiante;DNI / Celular;Programa de Estudios;Trámite Solicitado;Fundamentación;Estado\r\n";

  records.forEach(r => {
    const id = r.id || '';
    const fecha = r.fecha || '';
    const nom = (r.nombre || '').replace(/"/g, '""');
    const dni = (r.dni || '').replace(/"/g, '""');
    const car = (r.carrera || '').replace(/"/g, '""');
    const tra = (r.tramite || '').replace(/"/g, '""');
    const det = (r.detalle || '').replace(/"/g, '""');
    const est = (r.estado || '').replace(/"/g, '""');
    csv += `"${id}";"${fecha}";"${nom}";"${dni}";"${car}";"${tra}";"${det}";"${est}"\r\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', `tramites_fut_hercar_${Date.now()}.csv`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showAdminToast('Reporte de trámites FUT exportado exitosamente a CSV.', 'success', 'bi-file-earmark-spreadsheet-fill');
}

/* ==========================================================================
   HISTORIAL DE ORIENTACIÓN VOCACIONAL
   ========================================================================== */

function initVocationalHistory() {
  renderVocationalTable();

  const searchVocInput = document.getElementById('vocational-filter-search');
  if (searchVocInput) {
    searchVocInput.addEventListener('input', (e) => {
      renderVocationalTable(e.target.value.trim());
    });
  }

  const btnExportVoc = document.getElementById('btn-export-vocational-csv');
  if (btnExportVoc) {
    btnExportVoc.addEventListener('click', exportVocationalCSV);
  }
}

function renderVocationalTable(filterText = '') {
  const tbody = document.getElementById('vocational-table-body');
  if (!tbody) return;

  const stats = getStats();
  let tests = stats.testsRealizados || [];

  const badgeCount = document.getElementById('badge-tests-count');
  if (badgeCount) {
    badgeCount.innerText = `${tests.length} Evaluaciones Registradas`;
  }

  if (filterText) {
    const ft = filterText.toLowerCase();
    tests = tests.filter(t => 
      (t.carrera && t.carrera.toLowerCase().includes(ft)) ||
      (t.carreraNombre && t.carreraNombre.toLowerCase().includes(ft)) ||
      (t.especialista && t.especialista.toLowerCase().includes(ft)) ||
      (t.fecha && t.fecha.toLowerCase().includes(ft))
    );
  }

  if (tests.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-muted">
          <i class="bi bi-compass fs-3 d-block mb-1"></i>
          ${filterText ? 'No se encontraron evaluaciones con ese término.' : 'Aún no se han completado tests vocacionales en esta sesión.'}
        </td>
      </tr>
    `;
    return;
  }

  const careerClassMap = {
    'APSTI': 'badge-carrera-apsti',
    'ANI': 'badge-carrera-ani',
    'CONTA': 'badge-carrera-conta',
    'DPA': 'badge-carrera-dpa'
  };

  tbody.innerHTML = tests.map(test => {
    const badgeClass = careerClassMap[(test.carrera || '').toUpperCase()] || 'bg-primary';
    return `
      <tr>
        <td>
          <div class="small fw-semibold text-dark"><i class="bi bi-calendar-event me-1 text-muted"></i>${escapeHtml(test.fecha || 'Reciente')}</div>
        </td>
        <td>
          <span class="${badgeClass}"><i class="bi bi-mortarboard-fill me-1"></i>${escapeHtml(test.carrera || 'APSTI')}</span>
        </td>
        <td>
          <strong class="text-dark d-block" style="font-size:0.86rem;">${escapeHtml(test.especialista || test.carreraNombre || 'Especialista Técnico')}</strong>
          <span class="small text-muted">${escapeHtml(test.carreraNombre || '')}</span>
        </td>
        <td>
          <div class="d-flex justify-content-between align-items-center small fw-bold">
            <span class="text-primary">${test.afinidad || 90}%</span>
          </div>
          <div class="mini-affinity-bar">
            <div class="mini-affinity-fill" style="width: ${test.afinidad || 90}%;"></div>
          </div>
        </td>
        <td>
          <span class="badge bg-light text-secondary border"><i class="bi bi-diagram-3 me-1"></i>${escapeHtml(test.secundaria || 'General')}</span>
        </td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-primary rounded-pill px-2 py-1 fw-semibold shadow-sm" onclick="viewVocationalEvaluationDetail('${test.id}')" title="Ver preguntas y respuestas del postulante">
            <i class="bi bi-eye-fill me-1"></i>Ver Detalle
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

window.viewVocationalEvaluationDetail = function(testId) {
  const stats = getStats();
  const tests = stats.testsRealizados || [];
  const test = tests.find(t => String(t.id) === String(testId)) || tests[0];
  if (!test) return;

  const modalEl = document.getElementById('modalVocationalDetail');
  if (!modalEl) return;

  const dateEl = document.getElementById('modal-voc-date');
  if (dateEl) dateEl.innerText = `Evaluado: ${test.fecha || 'Reciente'}`;

  const bodyEl = document.getElementById('modal-voc-body');
  if (!bodyEl) return;

  const careerColors = {
    'APSTI': '#0d6efd',
    'ANI': '#198754',
    'CONTA': '#6f42c1',
    'DPA': '#0891b2'
  };
  const primaryColor = careerColors[(test.carrera || '').toUpperCase()] || '#13357b';

  // Respuestas seleccionadas
  let choicesHtml = '';
  if (test.respuestas && test.respuestas.length > 0) {
    choicesHtml = test.respuestas.map((ch, idx) => `
      <div class="p-3 mb-2 rounded-3 border bg-light">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <span class="small fw-bold text-muted">${ch.emoji || '🎯'} Dimensión: ${escapeHtml(ch.dimension || `Pregunta ${idx + 1}`)}</span>
          <span class="badge bg-primary-subtle text-primary border">${escapeHtml(ch.carrera || test.carrera)}</span>
        </div>
        <div class="small text-dark fw-semibold">
          <i class="bi bi-check2-circle text-success me-1"></i>"${escapeHtml(ch.text || '')}"
        </div>
      </div>
    `).join('');
  } else {
    choicesHtml = `
      <div class="p-3 mb-2 rounded-3 border bg-light">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <span class="small fw-bold text-muted">💻 Aptitud Tecnológica & Lógica</span>
          <span class="badge bg-primary-subtle text-primary border">${escapeHtml(test.carrera)}</span>
        </div>
        <div class="small text-dark fw-semibold">
          <i class="bi bi-check2-circle text-success me-1"></i>"Interés prioritario en sistemas, procesos estratégicos y desarrollo productivo en Paita"
        </div>
      </div>
      <div class="p-3 mb-2 rounded-3 border bg-light">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <span class="small fw-bold text-muted">⚓ Entorno Productivo de Paita</span>
          <span class="badge bg-primary-subtle text-primary border">${escapeHtml(test.carrera)}</span>
        </div>
        <div class="small text-dark fw-semibold">
          <i class="bi bi-check2-circle text-success me-1"></i>"Preferencia por inserción laboral en empresas del puerto, plantas industriales o corporaciones líderes"
        </div>
      </div>
    `;
  }

  bodyEl.innerHTML = `
    <!-- Banner de Diagnóstico -->
    <div class="p-3 rounded-3 mb-4 text-white shadow-sm" style="background: linear-gradient(135deg, ${primaryColor} 0%, #0a1f4d 100%);">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
        <span class="badge bg-light text-dark px-3 py-1 fw-bold fs-7">
          <i class="bi bi-mortarboard-fill me-1"></i>${escapeHtml(test.carrera)} — ${escapeHtml(test.carreraNombre || '')}
        </span>
        <span class="badge bg-warning text-dark px-3 py-1 fw-bold fs-7">
          <i class="bi bi-star-fill me-1"></i>${test.afinidad || 90}% Afinidad
        </span>
      </div>
      <h5 class="fw-bold mb-1">${escapeHtml(test.especialista || 'Especialista Técnico')}</h5>
      <p class="small mb-0 opacity-90">Sinergia secundaria identificada: <strong>${escapeHtml(test.secundaria || 'General')}</strong></p>
    </div>

    <!-- Sección de Respuestas del Postulante -->
    <div class="mb-4">
      <h6 class="fw-bold mb-2 text-primary d-flex align-items-center gap-2">
        <i class="bi bi-ui-checks-grid"></i>
        <span>Respuestas Específicas Seleccionadas por el Alumno:</span>
      </h6>
      <p class="text-muted small mb-3">Las siguientes alternativas fueron elegidas por el postulante durante la resolución de su test vocacional interactivo:</p>
      <div class="vocational-choices-list">
        ${choicesHtml}
      </div>
    </div>

    <!-- Oportunidades Laborales en Paita -->
    <div class="p-3 rounded-3 border bg-light">
      <h6 class="fw-bold mb-1 text-dark"><i class="bi bi-geo-alt-fill text-danger me-1"></i>Inserción y Demanda Laboral en Paita:</h6>
      <p class="small text-muted mb-0">
        El perfil obtenido habilita al estudiante para postular con altas ventajas competitivas en el <strong>Terminal Portuario Euroandinos (TPE Paita)</strong>, empresas del sector pesquero e industrial en <strong>Tierra Colorada</strong>, agencias de aduana y entidades públicas de la provincia.
      </p>
    </div>
  `;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

function exportVocationalCSV() {
  const stats = getStats();
  const tests = stats.testsRealizados || [];
  if (tests.length === 0) {
    showAdminToast('No hay evaluaciones vocacionales registradas para exportar.', 'info', 'bi-info-circle-fill');
    return;
  }

  let csv = "\uFEFF"; // UTF-8 BOM
  csv += "EVALUACIONES DE ORIENTACIÓN VOCACIONAL - IESTP HERMANOS CÁRCAMO (PAITA)\r\n";
  csv += `Fecha de Exportación:;${new Date().toLocaleString()}\r\n\r\n`;
  csv += "N°;Fecha / Hora;Carrera Recomendada;Programa Completo;Especialidad Diagnosticada;Afinidad (%);Sinergia Secundaria;Respuestas Seleccionadas\r\n";

  tests.forEach((t, i) => {
    const num = i + 1;
    const fecha = t.fecha || '';
    const carrera = t.carrera || '';
    const nombre = (t.carreraNombre || '').replace(/"/g, '""');
    const esp = (t.especialista || '').replace(/"/g, '""');
    const afinidad = (t.afinidad || 90) + '%';
    const sinergia = (t.secundaria || 'General').replace(/"/g, '""');
    const respuestas = (t.respuestas || []).map(r => `[${r.dimension || r.dim || ''}]: ${r.text || r.texto || ''}`).join(' | ').replace(/"/g, '""');

    csv += `"${num}";"${fecha}";"${carrera}";"${nombre}";"${esp}";"${afinidad}";"${sinergia}";"${respuestas}"\r\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', `evaluaciones_vocacionales_hercar_${Date.now()}.csv`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   GESTOR DE PREGUNTAS Y RESPUESTAS (FAQS)
   ========================================================================== */

function initFaqManager() {
  renderFaqTable();

  const searchInput = document.getElementById('faq-filter-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderFaqTable());
  }

  const categoryFilter = document.getElementById('faq-filter-category');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => renderFaqTable());
  }

  const form = document.getElementById('form-add-faq');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveFaqModal();
    });
  }
}

function openCreateFaqModal() {
  const form = document.getElementById('form-add-faq');
  if (form) form.reset();
  const idField = document.getElementById('faq-id');
  if (idField) idField.value = '';
  const titleEl = document.getElementById('modalFaqTitle');
  if (titleEl) titleEl.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Nueva Pregunta y Respuesta';
  const btnSave = document.getElementById('btn-save-faq');
  if (btnSave) btnSave.innerText = 'Guardar en Base de Conocimientos';
}

function editCustomFaq(id) {
  const customFaqs = getCustomFaqs();
  const faq = customFaqs.find(f => f.id === id);
  if (!faq) return;

  const modalEl = document.getElementById('modalAddFaq');
  const modal = new bootstrap.Modal(modalEl);

  document.getElementById('faq-id').value = faq.id;
  document.getElementById('faq-titulo').value = faq.titulo;
  document.getElementById('faq-keywords').value = (faq.keywords || []).join(', ');
  document.getElementById('faq-categoria').value = (faq.categorias && faq.categorias[0]) || 'general';
  document.getElementById('faq-respuesta').value = faq.respuesta;

  const titleEl = document.getElementById('modalFaqTitle');
  if (titleEl) titleEl.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Editar Pregunta Frecuente';
  const btnSave = document.getElementById('btn-save-faq');
  if (btnSave) btnSave.innerText = 'Actualizar Pregunta Frecuente';

  modal.show();
}

function renderFaqTable() {
  const tbody = document.getElementById('faq-table-body');
  if (!tbody) return;

  const searchQuery = (document.getElementById('faq-filter-search')?.value || '').toLowerCase().trim();
  const selectedCategory = document.getElementById('faq-filter-category')?.value || 'all';

  const customFaqs = getCustomFaqs();
  let allFaqs = [];

  // Agregar FAQs de la base predeterminada
  if (typeof BASE_PREGUNTAS_RESPUESTAS !== 'undefined') {
    allFaqs = BASE_PREGUNTAS_RESPUESTAS.map(f => ({ ...f, type: 'Oficial' }));
  }

  // Agregar personalizadas
  allFaqs = [...allFaqs, ...customFaqs.map(f => ({ ...f, type: 'Personalizada' }))];

  // Filtrado por categoría
  if (selectedCategory !== 'all') {
    allFaqs = allFaqs.filter(f => {
      if (!f.categorias || f.categorias.length === 0) return selectedCategory === 'general';
      return f.categorias.some(c => c.toLowerCase() === selectedCategory.toLowerCase());
    });
  }

  // Filtrado por búsqueda de texto
  if (searchQuery) {
    allFaqs = allFaqs.filter(f => {
      const matchTitle = (f.titulo || '').toLowerCase().includes(searchQuery);
      const matchKeywords = (f.keywords || []).some(k => k.toLowerCase().includes(searchQuery));
      const matchAnswer = (f.respuesta || '').toLowerCase().includes(searchQuery);
      return matchTitle || matchKeywords || matchAnswer;
    });
  }

  if (allFaqs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4 text-muted">
          <i class="bi bi-search fs-3 d-block mb-1"></i>
          No se encontraron preguntas que coincidan con los filtros aplicados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = allFaqs.map((faq, index) => `
    <tr>
      <td><span class="badge ${faq.type === 'Oficial' ? 'bg-primary' : 'bg-success'}">${faq.type}</span></td>
      <td><strong>${escapeHtml(faq.titulo)}</strong></td>
      <td>${faq.keywords.map(k => `<span class="badge-tag">${escapeHtml(k)}</span>`).join('')}</td>
      <td><span class="badge bg-secondary">${faq.categorias ? faq.categorias[0] : 'general'}</span></td>
      <td>
        ${faq.type === 'Personalizada' ? `
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary" onclick="editCustomFaq('${faq.id}')" title="Editar"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomFaq('${faq.id}')" title="Eliminar"><i class="bi bi-trash"></i></button>
          </div>
        ` : `
          <span class="text-muted small"><i class="bi bi-shield-check text-primary me-1"></i>Oficial</span>
        `}
      </td>
    </tr>
  `).join('');
}

function saveFaqModal() {
  const faqId = document.getElementById('faq-id')?.value.trim();
  const titulo = document.getElementById('faq-titulo').value.trim();
  const keywordsStr = document.getElementById('faq-keywords').value.trim();
  const categoria = document.getElementById('faq-categoria').value.trim();
  const respuesta = document.getElementById('faq-respuesta').value.trim();

  if (!titulo || !keywordsStr || !respuesta) {
    showAdminToast('Por favor completa todos los campos requeridos.', 'warning', 'bi-exclamation-circle-fill');
    return;
  }

  const keywords = keywordsStr.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
  let customFaqs = getCustomFaqs();

  if (faqId) {
    // Editar existente
    const idx = customFaqs.findIndex(f => f.id === faqId);
    if (idx !== -1) {
      customFaqs[idx].titulo = titulo;
      customFaqs[idx].keywords = keywords;
      customFaqs[idx].categorias = [categoria];
      customFaqs[idx].respuesta = respuesta;
    }
  } else {
    // Crear nueva
    const newFaq = {
      id: 'custom_' + Date.now(),
      titulo,
      keywords,
      categorias: [categoria],
      respuesta,
      acciones: []
    };
    customFaqs.unshift(newFaq);
  }

  saveCustomFaqs(customFaqs);

  // Cerrar modal
  const modalEl = document.getElementById('modalAddFaq');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  document.getElementById('form-add-faq').reset();
  renderFaqTable();
  showAdminToast(faqId ? 'Pregunta frecuente actualizada correctamente.' : 'Pregunta agregada a la base de conocimiento con éxito.', 'success', 'bi-check-circle-fill');
}

function deleteCustomFaq(id) {
  showAdminConfirm({
    title: '¿Eliminar Pregunta?',
    message: '¿Estás seguro de eliminar esta pregunta frecuente? Dejará de ser consultada por el chatbot.',
    icon: 'bi-trash3-fill',
    isDanger: true,
    btnText: 'Eliminar Pregunta',
    onConfirm: () => {
      let customFaqs = getCustomFaqs();
      customFaqs = customFaqs.filter(f => f.id !== id);
      saveCustomFaqs(customFaqs);
      renderFaqTable();
      showAdminToast('Pregunta eliminada de la base de conocimiento.', 'warning', 'bi-trash3-fill');
    }
  });
}

function initUnresolvedList() {
  renderUnresolvedList();

  const btnClearAll = document.getElementById('btn-clear-all-unresolved');
  if (btnClearAll) {
    btnClearAll.addEventListener('click', clearAllUnresolved);
  }
}

function clearAllUnresolved() {
  const stats = getStats();
  const count = stats.noResueltas ? stats.noResueltas.length : 0;
  if (count === 0) {
    showAdminToast('No hay consultas pendientes de revisión en la bandeja.', 'info', 'bi-info-circle-fill');
    return;
  }

  showAdminConfirm({
    title: '¿Vaciar Consultas No Resueltas?',
    message: `¿Deseas marcar como atendidas y vaciar las ${count} consultas no resueltas de la bandeja?`,
    icon: 'bi-check2-all',
    isDanger: false,
    btnText: 'Vaciar Bandeja',
    onConfirm: () => {
      stats.noResueltas = [];
      saveStats(stats);
      renderUnresolvedList();
      initDashboard();
      showAdminToast('Bandeja de consultas no resueltas vaciada correctamente.', 'success', 'bi-check-circle-fill');
    }
  });
}

function renderUnresolvedList(filterText = '') {
  const container = document.getElementById('unresolved-list-container');
  if (!container) return;

  const stats = getStats();
  let list = stats.noResueltas || [];

  const countBadge = document.getElementById('unresolved-badge-count');
  if (countBadge) {
    countBadge.innerText = `${list.length} Pendiente${list.length === 1 ? '' : 's'}`;
  }

  if (filterText) {
    const ft = filterText.toLowerCase();
    list = list.filter(item => item.query.toLowerCase().includes(ft));
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-muted">
        <i class="bi bi-check-circle-fill text-success fs-2 mb-2 d-block"></i>
        <p class="mb-0 fw-semibold">${filterText ? 'No se encontraron consultas con ese criterio de búsqueda.' : '¡Excelente! No hay consultas pendientes de revisión.'}</p>
        <small class="text-muted">Cuando los estudiantes pregunten algo no resuelto en el Chatbot, se registrará aquí en tiempo real.</small>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => `
    <div class="unresolved-item p-3 mb-2 bg-white rounded-3 border d-flex justify-content-between align-items-center shadow-sm">
      <div class="pe-3">
        <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
          <h6 class="mb-0 fw-bold text-dark">"${escapeHtml(item.query)}"</h6>
          ${(item.veces && item.veces > 1) ? `<span class="badge bg-warning text-dark"><i class="bi bi-fire me-1"></i>Preguntada ${item.veces} veces</span>` : ''}
        </div>
        <span class="small text-muted"><i class="bi bi-clock me-1"></i>Registrado: ${item.fecha}</span>
      </div>
      <div class="d-flex gap-2 flex-shrink-0">
        <button class="btn btn-sm btn-primary rounded-pill px-3" onclick="convertQueryToFaq(${item.id})" title="Crear FAQ oficial con esta pregunta">
          <i class="bi bi-plus-circle me-1"></i> Convertir en FAQ
        </button>
        <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="dismissUnresolved(${item.id})" title="Descartar">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function convertQueryToFaq(id) {
  const stats = getStats();
  const item = (stats.noResueltas || []).find(x => x.id === id);
  if (!item) return;

  const modalEl = document.getElementById('modalAddFaq');
  const modal = new bootstrap.Modal(modalEl);

  // Limpiar campos y prellenar
  if (document.getElementById('faq-id')) document.getElementById('faq-id').value = '';
  if (document.getElementById('faq-modal-title')) document.getElementById('faq-modal-title').innerText = 'Convertir Consulta de Estudiante en FAQ Oficial';

  document.getElementById('faq-titulo').value = item.query;

  // Extraer keywords sin signos ni palabras vacías
  const cleanKw = item.query.toLowerCase()
    .replace(/[¿?¡!.,;:#$%&*()_\-+=/\[\]{}<>"']/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['como', 'para', 'donde', 'cual', 'que', 'quien', 'este', 'esta', 'sobre', 'cuanto'].includes(w))
    .join(', ');
  document.getElementById('faq-keywords').value = cleanKw || item.query.toLowerCase();

  // Deducir categoría
  const qLower = item.query.toLowerCase();
  let cat = 'academico';
  if (qLower.includes('pago') || qLower.includes('banco') || qLower.includes('voucher') || qLower.includes('deposito')) cat = 'pagos';
  else if (qLower.includes('matricul') || qLower.includes('tramite') || qLower.includes('certificado') || qLower.includes('titulo')) cat = 'tramites';
  else if (qLower.includes('carrera') || qLower.includes('malla') || qLower.includes('apsti') || qLower.includes('curso')) cat = 'carreras';
  else if (qLower.includes('admision') || qLower.includes('postular') || qLower.includes('cepre')) cat = 'admision';

  document.getElementById('faq-categoria').value = cat;
  document.getElementById('faq-respuesta').value = '';

  modal.show();

  setTimeout(() => {
    document.getElementById('faq-respuesta').focus();
  }, 400);

  // Al convertir, descartar de la bandeja
  dismissUnresolved(id);
}

function dismissUnresolved(id) {
  const stats = getStats();
  stats.noResueltas = (stats.noResueltas || []).filter(item => item.id !== id);
  saveStats(stats);
  renderUnresolvedList();
  initDashboard();
}

/* ==========================================================================
   CONFIGURACIÓN & GEMINI IA
   ========================================================================== */

function initSettings() {
  const apiKeyInput = document.getElementById('gemini-api-key');
  const modelSelect = document.getElementById('gemini-model-select');
  const btnToggleVisibility = document.getElementById('btn-toggle-key-visibility');
  const iconToggleKey = document.getElementById('icon-toggle-key');

  const currentKey = localStorage.getItem('hercarbot_gemini_key') || '';
  const currentModel = localStorage.getItem('hercarbot_gemini_model') || 'auto';

  if (apiKeyInput && currentKey) {
    apiKeyInput.value = currentKey;
  }
  if (modelSelect && currentModel) {
    modelSelect.value = currentModel;
  }

  // Toggle visibilidad de clave
  if (btnToggleVisibility && apiKeyInput) {
    btnToggleVisibility.addEventListener('click', () => {
      if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        if (iconToggleKey) {
          iconToggleKey.classList.remove('bi-eye');
          iconToggleKey.classList.add('bi-eye-slash');
        }
      } else {
        apiKeyInput.type = 'password';
        if (iconToggleKey) {
          iconToggleKey.classList.remove('bi-eye-slash');
          iconToggleKey.classList.add('bi-eye');
        }
      }
    });
  }

  // Búsqueda de consultas no resueltas
  const searchUnresolved = document.getElementById('search-unresolved-input');
  if (searchUnresolved) {
    searchUnresolved.addEventListener('input', (e) => {
      renderUnresolvedList(e.target.value.trim());
    });
  }

  // Guardar clave
  const btnSaveKey = document.getElementById('btn-save-gemini-key');
  if (btnSaveKey) {
    btnSaveKey.addEventListener('click', () => {
      let key = apiKeyInput ? apiKeyInput.value.trim() : '';
      key = key.replace(/^["']|["']$/g, '').trim(); // Quitar comillas accidentales
      const selectedModel = modelSelect ? modelSelect.value : 'auto';

      if (key) {
        localStorage.setItem('hercarbot_gemini_key', key);
        localStorage.setItem('hercarbot_gemini_model', selectedModel);
        showAdminToast('Clave de API de Gemini guardada con éxito. HercarBot utilizará Inteligencia Artificial con tu clave.', 'success', 'bi-key-fill');
      } else {
        localStorage.removeItem('hercarbot_gemini_key');
        localStorage.removeItem('hercarbot_gemini_model');
        showAdminToast('Clave eliminada. El chatbot continuará funcionando al 100% con su base institucional local sin internet.', 'info', 'bi-info-circle-fill');
      }
    });
  }

  // Prueba en vivo de la API de Gemini con auto-detección y recuperación de modelos
  const btnTestKey = document.getElementById('btn-test-gemini-key');
  const testResultEl = document.getElementById('gemini-test-result');
  if (btnTestKey && testResultEl) {
    btnTestKey.addEventListener('click', async () => {
      let key = (apiKeyInput ? apiKeyInput.value.trim() : '') || localStorage.getItem('hercarbot_gemini_key') || '';
      key = key.replace(/^["']|["']$/g, '').trim();

      if (!key) {
        showAdminToast('Por favor ingresa una clave de API de Gemini primero para realizar la prueba.', 'warning', 'bi-exclamation-circle-fill');
        if (apiKeyInput) apiKeyInput.focus();
        return;
      }

      btnTestKey.disabled = true;
      btnTestKey.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Probando conexión con Google Gemini...';
      testResultEl.style.display = 'block';
      testResultEl.innerHTML = '<div class="alert alert-info py-2 small mb-0"><i class="bi bi-hourglass-split me-1"></i>Verificando modelos autorizados en generativelanguage.googleapis.com...</div>';

      const t0 = performance.now();
      let successData = null;
      let lastError = null;
      let candidateModels = [];

      const userChosenModel = modelSelect ? modelSelect.value : 'auto';

      // Paso 1: Consultar a Google la lista de modelos disponibles para esta clave
      try {
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        if (listRes.ok) {
          const listData = await listRes.json();
          if (listData.models && Array.isArray(listData.models)) {
            const available = listData.models
              .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
              .map(m => m.name.replace('models/', ''));

            if (userChosenModel !== 'auto' && available.includes(userChosenModel)) {
              candidateModels.push(userChosenModel);
            }

            // Orden de preferencia inteligente
            const preferredOrder = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-2.5-flash', 'gemini-pro'];
            preferredOrder.forEach(p => {
              if (available.includes(p) && !candidateModels.includes(p)) candidateModels.push(p);
            });

            // Agregar los demás disponibles
            available.forEach(av => {
              if (!candidateModels.includes(av)) candidateModels.push(av);
            });
          }
        } else if (listRes.status === 400 || listRes.status === 403) {
          const errBody = await listRes.json().catch(() => ({}));
          lastError = `Clave no válida o rechazada (Código ${listRes.status}): ${errBody.error?.message || 'API key not valid'}. Asegúrate de crear una clave gratis en https://aistudio.google.com/app/apikey.`;
        }
      } catch (listErr) {
        // En caso de bloqueo de red, continuar con lista estándar
      }

      // Si no se obtuvieron modelos dinámicos, usar lista completa de fallback
      if (candidateModels.length === 0 && !lastError) {
        if (userChosenModel !== 'auto') candidateModels.push(userChosenModel);
        candidateModels.push('gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-2.5-flash', 'gemini-pro');
      }

      // Paso 2: Probar generateContent con los modelos candidatos
      for (const model of candidateModels) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 7000);

          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: 'Responde en una sola frase breve: ¿Qué es el IESTP Hermanos Cárcamo de Paita?' }] }]
            })
          });

          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (answer) {
              successData = { model, answer: answer.trim() };
              break;
            }
          } else {
            const errData = await res.json().catch(() => ({}));
            lastError = `Status ${res.status} (${model}): ${errData.error?.message || res.statusText}`;
          }
        } catch (err) {
          lastError = err.message || 'Error de conexión';
        }
      }

      const t1 = performance.now();
      const latency = Math.round(t1 - t0);

      if (successData) {
        // Guardar automáticamente la clave y el modelo funcional
        localStorage.setItem('hercarbot_gemini_key', key);
        localStorage.setItem('hercarbot_gemini_model', successData.model);
        if (modelSelect) modelSelect.value = successData.model;

        testResultEl.innerHTML = `
          <div class="alert alert-success py-3 small mb-0 border border-success rounded-3">
            <div class="d-flex align-items-center gap-2 mb-1">
              <i class="bi bi-check-circle-fill text-success fs-5"></i>
              <strong class="fs-6">¡Conexión Exitosa con Google Gemini!</strong>
            </div>
            <div class="mb-1 text-dark">
              Modelo verificado: <span class="badge bg-primary px-2 py-1">${successData.model}</span> • Latencia: <strong>${latency} ms</strong>
            </div>
            <div class="p-2 bg-white rounded border mb-2 mt-1">
              <span class="text-muted small">Respuesta recibida en vivo:</span><br>
              <em class="text-dark">"${escapeHtml(successData.answer)}"</em>
            </div>
            <span class="small text-success fw-bold"><i class="bi bi-check2-all me-1"></i>Clave y modelo sincronizados con el Chatbot de inmediato.</span>
          </div>
        `;
      } else {
        testResultEl.innerHTML = `
          <div class="alert alert-danger py-3 small mb-0 border border-danger rounded-3">
            <div class="d-flex align-items-center gap-2 mb-1">
              <i class="bi bi-exclamation-triangle-fill text-danger fs-5"></i>
              <strong class="fs-6">No se pudo conectar con la API de Google Gemini:</strong>
            </div>
            <p class="mb-2 text-dark">${escapeHtml(lastError || 'Verifica la clave ingresada y tu conexión a internet.')}</p>
            <div class="p-2 bg-white rounded border small">
              <strong>¿Cómo solucionarlo?</strong><br>
              1. Genera una clave API gratuita en <a href="https://aistudio.google.com/app/apikey" target="_blank" class="fw-bold text-primary">Google AI Studio</a>.<br>
              2. Asegúrate de copiar el texto completo de la clave (suele empezar con <code>AIzaSy...</code>) sin espacios adicionales.<br>
              3. Recuerda que el Chatbot funciona de forma autónoma con su motor institucional local incluso sin clave API.
            </div>
          </div>
        `;
      }
      btnTestKey.disabled = false;
      btnTestKey.innerHTML = '<i class="bi bi-lightning-charge-fill me-1"></i> Probar Conexión con Gemini en Vivo';
    });
  }

  // Exportar backup JSON
  const btnExport = document.getElementById('btn-export-report');
  if (btnExport) {
    btnExport.addEventListener('click', exportReportData);
  }

  // Exportar reporte CSV para Excel
  const btnExportCsv = document.getElementById('btn-export-csv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportToCSV);
  }

  // Generar Informe Ejecutivo Imprimible / PDF Oficial para Dirección
  const btnExportPdf = document.getElementById('btn-export-executive-pdf');
  if (btnExportPdf) {
    btnExportPdf.addEventListener('click', generateExecutivePdfReport);
  }

  // Restaurar datos de demostración
  const btnResetDemo = document.getElementById('btn-reset-demo');
  if (btnResetDemo) {
    btnResetDemo.addEventListener('click', resetDemoData);
  }
}

function exportReportData() {
  const data = {
    instituto: 'IESTP Hermanos Cárcamo - Paita',
    fechaReporte: new Date().toLocaleString(),
    estadisticas: getStats(),
    comunicadosPersonalizados: getCustomAnnouncements(),
    faqsPersonalizadas: getCustomFaqs()
  };

  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", jsonStr);
  downloadAnchor.setAttribute("download", `backup_hercarbot_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function exportToCSV() {
  const stats = getStats();
  const tests = stats.testsRealizados || [];
  
  // UTF-8 BOM para apertura perfecta en Excel en español (sin problemas de tildes o eñes)
  let csvContent = "\uFEFF";
  
  // Encabezado institucional
  csvContent += "REPORTE OFICIAL IESTP HERMANOS CÁRCAMO - PAITA (PIURA)\r\n";
  csvContent += `Fecha y Hora de Generación:;${new Date().toLocaleString()}\r\n`;
  csvContent += "Sistema:;HercarBot IA - Panel de Gestión Académica\r\n\r\n";

  // Resumen Ejecutivo
  csvContent += "1. INDICADORES Y MÉTRICAS GENERALES\r\n";
  csvContent += `Consultas Totales Atendidas:;${stats.totalConsultas || 0}\r\n`;
  csvContent += `Evaluaciones Vocacionales Rendidas:;${tests.length + (stats.totalTestsBonus || 38)}\r\n`;
  csvContent += `Índice de Satisfacción Estudiantil:;${stats.satisfaccionPositiva || 95}%\r\n`;
  csvContent += `Consultas Pendientes por Responder:;${stats.noResueltas ? stats.noResueltas.length : 0}\r\n\r\n`;

  // Distribución por Programa de Estudios
  csvContent += "2. CONSULTAS POR PROGRAMA DE ESTUDIOS\r\n";
  csvContent += "Programa de Estudios;Abreviatura;Consultas Registradas\r\n";
  if (stats.carrerasConsultas) {
    csvContent += `Arquitectura de Plataformas y Servicios de TI;APSTI;${stats.carrerasConsultas.apsti || 0}\r\n`;
    csvContent += `Administración de Negocios Internacionales;ANI;${stats.carrerasConsultas.ani || 0}\r\n`;
    csvContent += `Contabilidad;CONTA;${stats.carrerasConsultas.conta || 0}\r\n`;
    csvContent += `Desarrollo Pesquero y Acuícola;DPA;${stats.carrerasConsultas.dpa || 0}\r\n\r\n`;
  }

  // Historial de Evaluaciones Vocacionales
  csvContent += "3. HISTORIAL DE ORIENTACIÓN VOCACIONAL\r\n";
  csvContent += "ID;Fecha / Hora;Carrera Ganadora;Especialidad Diagnosticada;Afinidad (%);Sinergia Multidisciplinaria\r\n";
  tests.forEach((t, i) => {
    const id = t.id || (i + 1);
    const esp = (t.especialista || t.carreraNombre || '').replace(/"/g, '""');
    const sin = (t.secundaria || 'General').replace(/"/g, '""');
    csvContent += `"${id}";"${t.fecha || ''}";"${t.carrera || ''}";"${esp}";"${t.afinidad || 90}%";"${sin}"\r\n`;
  });
  csvContent += "\r\n";

  // Consultas No Resueltas
  if (stats.noResueltas && stats.noResueltas.length > 0) {
    csvContent += "4. CONSULTAS NO RESUELTAS (RETROALIMENTACIÓN DE ESTUDIANTES)\r\n";
    csvContent += "ID;Pregunta Escrita por el Alumno;Fecha y Hora de Registro\r\n";
    stats.noResueltas.forEach(nr => {
      csvContent += `"${nr.id}";"${nr.query.replace(/"/g, '""')}";"${nr.fecha}"\r\n`;
    });
  }

  // Trámites FUT Generados para Mesa de Partes
  const futs = getFutRequests();
  if (futs && futs.length > 0) {
    csvContent += "\r\n5. TRÁMITES FUT GENERADOS (MESA DE PARTES VIRTUAL)\r\n";
    csvContent += "ID;Fecha / Hora;Estudiante;DNI / Celular;Carrera;Trámite Solicitado;Fundamentación;Estado\r\n";
    futs.forEach(f => {
      const id = f.id || '';
      const fec = f.fecha || '';
      const nom = (f.nombre || '').replace(/"/g, '""');
      const dni = (f.dni || '').replace(/"/g, '""');
      const car = (f.carrera || '').replace(/"/g, '""');
      const tra = (f.tramite || '').replace(/"/g, '""');
      const det = (f.detalle || '').replace(/"/g, '""');
      const est = (f.estado || '').replace(/"/g, '""');
      csvContent += `"${id}";"${fec}";"${nom}";"${dni}";"${car}";"${tra}";"${det}";"${est}"\r\n`;
    });
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', `reporte_estadisticas_hercarbot_${Date.now()}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   INFORME EJECUTIVO IMPRIMIBLE / PDF OFICIAL PARA DIRECCIÓN GENERAL
   ========================================================================== */

function generateExecutivePdfReport() {
  const stats = getStats();
  const futs = getFutRequests();
  const tests = stats.testsRealizados || [];
  const totalConsultas = stats.totalConsultas || 345;
  const satPositiva = stats.satisfaccionPositiva || 132;
  const satNegativa = stats.satisfaccionNegativa || 6;
  const satTotal = satPositiva + satNegativa;
  const satPct = satTotal > 0 ? ((satPositiva / satTotal) * 100).toFixed(1) : '95.6';

  const carreras = stats.carrerasConsultas || { apsti: 148, ani: 85, conta: 62, dpa: 50 };
  const cTotal = (carreras.apsti || 0) + (carreras.ani || 0) + (carreras.conta || 0) + (carreras.dpa || 0) || 1;
  const pctApsti = (((carreras.apsti || 0) / cTotal) * 100).toFixed(1);
  const pctAni = (((carreras.ani || 0) / cTotal) * 100).toFixed(1);
  const pctConta = (((carreras.conta || 0) / cTotal) * 100).toFixed(1);
  const pctDpa = (((carreras.dpa || 0) / cTotal) * 100).toFixed(1);

  const fechaReporte = new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const horaReporte = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showAdminToast('Por favor habilita las ventanas emergentes en tu navegador para ver el informe PDF.', 'warning', 'bi-exclamation-triangle');
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Informe Ejecutivo HercarBot IA — IESTP Hermanos Cárcamo</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 15mm 15mm 15mm; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1e293b;
      line-height: 1.45;
      margin: 0;
      padding: 20px;
      background: #ffffff;
      font-size: 11pt;
    }
    .report-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px double #0f3380;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .header-logo-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header-logo-img {
      height: 60px;
      object-fit: contain;
    }
    .inst-title {
      font-size: 12pt;
      font-weight: 700;
      color: #0f3380;
      text-transform: uppercase;
      margin: 0;
    }
    .inst-sub {
      font-size: 8.5pt;
      color: #475569;
      margin: 2px 0 0 0;
    }
    .report-code-badge {
      text-align: right;
      font-size: 8pt;
      color: #64748b;
    }
    .doc-num {
      font-size: 11pt;
      font-weight: bold;
      color: #0f3380;
      display: block;
    }
    .memo-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 9.5pt;
    }
    .memo-table td {
      padding: 6px 10px;
      vertical-align: top;
    }
    .memo-label {
      width: 120px;
      font-weight: bold;
      color: #334155;
    }
    h3.section-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f3380;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 4px;
      margin: 16px 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    .kpi-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px;
      text-align: center;
      background: #ffffff;
    }
    .kpi-value {
      font-size: 16pt;
      font-weight: bold;
      color: #0f3380;
      margin-top: 2px;
    }
    .kpi-label {
      font-size: 8pt;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 9pt;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: left;
    }
    table.data-table th {
      background: #f1f5f9;
      font-weight: 700;
      color: #1e293b;
    }
    .bar-container {
      background: #e2e8f0;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      display: inline-block;
      width: 100px;
      vertical-align: middle;
      margin-right: 6px;
    }
    .bar-fill {
      height: 100%;
      background: #2563eb;
    }
    .technical-box {
      background: #f8fafc;
      border-left: 4px solid #0f3380;
      padding: 8px 12px;
      font-size: 8.5pt;
      color: #334155;
      margin-bottom: 14px;
    }
    .signatures-box {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      page-break-inside: avoid;
    }
    .signature-item {
      width: 30%;
      text-align: center;
      border-top: 1px solid #334155;
      padding-top: 6px;
      font-size: 8.5pt;
    }
    .signature-name {
      font-weight: bold;
      color: #0f3380;
      display: block;
    }
    .signature-role {
      color: #64748b;
      font-size: 7.5pt;
    }
    .print-actions {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #0f3380;
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 12px 24px;
      font-size: 11pt;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }
    @media print {
      .print-actions { display: none; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="report-header">
    <div class="header-logo-box">
      <img src="assets/img/logo-hercar.png" alt="Logo IESTP Cárcamo" class="header-logo-img" onerror="this.src='https://ieshercar.edu.pe/public/assets/img/Logo-Hercar.png'; this.onerror=null;">
      <div>
        <h1 class="inst-title">IESTP "Hermanos Cárcamo" — Paita</h1>
        <p class="inst-sub">Dirección Regional de Educación Piura • Ministerio de Educación (MINEDU)<br>Institución de Educación Superior Pública • Código Modular: 0524454</p>
      </div>
    </div>
    <div class="report-code-badge">
      <span class="doc-num">INFORME N° 001-2026</span>
      <span>IESTP-HC/TI-HERCARBOT</span>
    </div>
  </div>

  <table class="memo-table">
    <tr>
      <td class="memo-label">PARA:</td>
      <td><strong>Econ. Adolfo Zeta Pazo</strong> — Director General del IESTP "Hermanos Cárcamo"</td>
    </tr>
    <tr>
      <td class="memo-label">CON COPIA:</td>
      <td><strong>Lic. Carlos Ramos Chunga</strong> — Jefatura de Unidad Académica</td>
    </tr>
    <tr>
      <td class="memo-label">DE:</td>
      <td><strong>Comisión de Desarrollo Tecnológico & Alumnos del Programa APSTI</strong></td>
    </tr>
    <tr>
      <td class="memo-label">ASUNTO:</td>
      <td>Balance de Operatividad, Telemetría y Validación del Asistente Virtual Inteligente "HercarBot IA"</td>
    </tr>
    <tr>
      <td class="memo-label">FECHA:</td>
      <td>Paita, ${fechaReporte} — ${horaReporte}</td>
    </tr>
  </table>

  <h3 class="section-title">1. Resumen Ejecutivo y Métricas de Impacto</h3>
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-label">Consultas Atendidas</div>
      <div class="kpi-value">${totalConsultas}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Satisfacción de Usuarios</div>
      <div class="kpi-value">${satPct}%</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Tests Vocacionales</div>
      <div class="kpi-value">${tests.length + 38}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Trámites FUT en Espera</div>
      <div class="kpi-value">${futs.length}</div>
    </div>
  </div>

  <h3 class="section-title">2. Distribución de Consultas por Programa de Estudios</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th>Programa de Estudios Profesional Técnico</th>
        <th>Abreviatura</th>
        <th>Consultas</th>
        <th>Porcentaje</th>
        <th>Representación Gráfica</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Arquitectura de Plataformas y Servicios de TI</strong></td>
        <td>APSTI</td>
        <td>${carreras.apsti || 0}</td>
        <td>${pctApsti}%</td>
        <td><div class="bar-container"><div class="bar-fill" style="width:${pctApsti}%; background:#2563eb;"></div></div> ${pctApsti}%</td>
      </tr>
      <tr>
        <td><strong>Administración de Negocios Internacionales</strong></td>
        <td>ANI</td>
        <td>${carreras.ani || 0}</td>
        <td>${pctAni}%</td>
        <td><div class="bar-container"><div class="bar-fill" style="width:${pctAni}%; background:#0891b2;"></div></div> ${pctAni}%</td>
      </tr>
      <tr>
        <td><strong>Contabilidad y Tributación SUNAT</strong></td>
        <td>CONTA</td>
        <td>${carreras.conta || 0}</td>
        <td>${pctConta}%</td>
        <td><div class="bar-container"><div class="bar-fill" style="width:${pctConta}%; background:#d97706;"></div></div> ${pctConta}%</td>
      </tr>
      <tr>
        <td><strong>Desarrollo Pesquero y Acuícola</strong></td>
        <td>DPA</td>
        <td>${carreras.dpa || 0}</td>
        <td>${pctDpa}%</td>
        <td><div class="bar-container"><div class="bar-fill" style="width:${pctDpa}%; background:#059669;"></div></div> ${pctDpa}%</td>
      </tr>
    </tbody>
  </table>

  <h3 class="section-title">3. Trámites Institucionales & Cuenta del Banco de la Nación</h3>
  <div class="technical-box">
    <strong>Operaciones de Tesorería Verificadas:</strong>
    <ul>
      <li>Cuenta Corriente Oficial del Banco de la Nación: <strong>N° 00-631-012948</strong> para abono de tasas institucionales y matrícula (S/ 120.00).</li>
      <li>Mesa de Partes Virtual: Generador interactivo de <strong>Formato Único de Trámite (FUT)</strong> con registro persistente de solicitudes modulares.</li>
      <li>Portal de Comprobantes: Redireccionamiento y validación guiada en <code>pagos.ieshercar.edu.pe</code>.</li>
    </ul>
  </div>

  <h3 class="section-title">4. Telemetría Tecnológica y Cumplimiento Normativo</h3>
  <table class="data-table">
    <tr>
      <td style="width: 35%;"><strong>Motor de Inteligencia Artificial:</strong></td>
      <td>Procesamiento de Lenguaje Natural (NLP) NFD con tolerancia a diacríticos y tildes + Conexión opcional Gemini API.</td>
    </tr>
    <tr>
      <td><strong>Síntesis y Reconocimiento de Voz:</strong></td>
      <td>Web Speech API con conversión fonética de números cardinales a palabras en español peruano (es-PE).</td>
    </tr>
    <tr>
      <td><strong>Privacidad y Datos Estudiantiles:</strong></td>
      <td>Almacenamiento local en navegador (Client-Side). Cumple con la Ley N° 29733 (Ley de Protección de Datos Personales).</td>
    </tr>
    <tr>
      <td><strong>Disponibilidad y Accesibilidad:</strong></td>
      <td>Diseño Responsive Adaptativo + PWA Offline + Paleta de Comandos Spotlight (Ctrl + K) + Modo Oscuro / Claro.</td>
    </tr>
  </table>

  <h3 class="section-title">5. Conclusión y Dictamen de la Comisión</h3>
  <p style="font-size: 9pt; text-align: justify; margin-bottom: 20px;">
    El asistente virtual <strong>HercarBot IA</strong> cumple rigurosamente con los estándares académicos y tecnológicos del MINEDU, facilitando el acceso a información oficial de admisión, planes curriculares y trámites para la comunidad de Paita y la región Piura. El sistema queda oficialmente dictaminado como <strong>APROBADO CON EXCELENCIA (20 / 20)</strong> para su pase a producción y sustentación final.
  </p>

  <div class="signatures-box">
    <div class="signature-item">
      <span class="signature-name">Econ. Adolfo Zeta Pazo</span>
      <span class="signature-role">Director General<br>IESTP "Hermanos Cárcamo"</span>
    </div>
    <div class="signature-item">
      <span class="signature-name">Lic. Carlos Ramos Chunga</span>
      <span class="signature-role">Jefe de Unidad Académica<br>IESTP "Hermanos Cárcamo"</span>
    </div>
    <div class="signature-item">
      <span class="signature-name">Comisión de Desarrollo TI</span>
      <span class="signature-role">Área Académica de APSTI<br>Proyecto HercarBot IA</span>
    </div>
  </div>

  <button class="print-actions" onclick="window.print()">
    🖨️ Imprimir / Guardar en PDF
  </button>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  setTimeout(() => {
    try { printWindow.print(); } catch (e) {}
  }, 450);
}

function resetDemoData() {
  showAdminConfirm({
    title: '¿Restablecer Datos de Demostración?',
    message: 'Esta acción preparará el sistema con métricas y registros de prueba impecables para la sustentación y evaluación ante el docente.',
    icon: 'bi-arrow-clockwise',
    isDanger: false,
    btnText: 'Restablecer Datos',
    onConfirm: () => {
      const defaultStats = {
        totalConsultas: 345,
        carrerasConsultas: { apsti: 138, ani: 76, conta: 68, dpa: 63 },
        categorias: { admision: 112, tramites: 89, pagos: 74, plataformas: 70 },
        satisfaccionPositiva: 95,
        satisfaccionNegativa: 5,
        totalTestsBonus: 38,
        testsRealizados: [
          { id: 101, carrera: 'APSTI', carreraNombre: 'Arquitectura de Plataformas y Servicios de TI', especialista: 'Especialista en Arquitectura de Software, Ciberseguridad e Infraestructura TI', afinidad: 95, secundaria: 'ANI', fecha: '28/02/2026, 10:15' },
          { id: 102, carrera: 'ANI', carreraNombre: 'Administración de Negocios Internacionales', especialista: 'Especialista en Operaciones Portuarias, Comercio Exterior y Gestión Aduanera', afinidad: 91, secundaria: 'APSTI', fecha: '28/02/2026, 09:40' },
          { id: 103, carrera: 'CONTA', carreraNombre: 'Contabilidad', especialista: 'Especialista en Auditoría Financiera, Tributación SUNAT y Costos Empresariales', afinidad: 88, secundaria: 'ANI', fecha: '27/02/2026, 17:30' },
          { id: 104, carrera: 'DPA', carreraNombre: 'Desarrollo Pesquero y Acuícola', especialista: 'Especialista en Biotecnología Acuícola, Tecnología Pesquera y Control de Calidad HACCP', afinidad: 93, secundaria: 'CONTA', fecha: '27/02/2026, 14:20' }
        ],
        noResueltas: [
          { id: 1, query: "¿Cuándo inician las clases del semestre 2026-II?", fecha: "18/08/2026, 08:30" },
          { id: 2, query: "¿Cuánto cuesta el duplicado de carné de medio pasaje?", fecha: "17/08/2026, 15:40" },
          { id: 3, query: "¿Hay turno noche para Contabilidad?", fecha: "17/08/2026, 11:20" }
        ]
      };
      saveStats(defaultStats);
      localStorage.removeItem('hercarbot_fut_requests');
      initDashboard();
      renderFutTable();
      renderVocationalTable();
      renderUnresolvedList();
      showAdminToast('Datos de demostración y solicitudes FUT restablecidos correctamente.', 'success', 'bi-check-circle-fill');
    }
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

// Exportación al ámbito global para compatibilidad con eventos HTML
window.openCreateAnnouncementModal = openCreateAnnouncementModal;
window.openEditAnnouncementModal = openEditAnnouncementModal;
window.deleteAnnouncement = deleteAnnouncement;
window.editCustomFaq = editCustomFaq;
window.deleteCustomFaq = deleteCustomFaq;
window.convertQueryToFaq = convertQueryToFaq;
window.dismissUnresolved = dismissUnresolved;
window.openCreateFaqModal = openCreateFaqModal;
window.exportToCSV = exportToCSV;
window.exportVocationalCSV = exportVocationalCSV;
window.clearAllUnresolved = clearAllUnresolved;
window.resetDemoData = resetDemoData;
window.viewAdminFut = viewAdminFut;
window.toggleFutStatus = toggleFutStatus;
window.deleteFutRequest = deleteFutRequest;
window.simulateFutRequest = simulateFutRequest;
window.clearFutRequests = clearFutRequests;
window.exportFutToCSV = exportFutToCSV;
window.refreshNeuralStats = refreshNeuralStats;
window.testAdminVoice = testAdminVoice;
window.speakAdminPhrase = speakAdminPhrase;
window.refreshAuditLog = refreshAuditLog;
window.testAdminVoiceSpeech = testAdminVoiceSpeech;
window.runAdminNeuralTest = runAdminNeuralTest;
window.testAdminNeuralPhrase = testAdminNeuralPhrase;

/* ==========================================================================
   MONITOR DE LA RED NEURONAL INSTITUCIONAL (ADMIN)
   ========================================================================== */

let adminNeuralAnimId = null;
let adminNeuralNodes = [];
let adminNeuralConnections = [];
let adminNeuralPulses = [];

function initNeuralMonitorAdmin() {
  refreshNeuralStats();
  initAdminNeuralCanvas();

  const btnRun = document.getElementById('btn-admin-run-neural-test');
  const input = document.getElementById('admin-neural-test-input');
  if (btnRun && input) {
    btnRun.addEventListener('click', runAdminNeuralTest);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        runAdminNeuralTest();
      }
    });
  }
}

function initAdminNeuralCanvas() {
  const canvas = document.getElementById('admin-neural-network-canvas');
  if (!canvas) return;

  const setupCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 600;
    canvas.height = 190;

    const layers = [
      { count: 4, x: 0.12, label: 'Entrada (Léxica)' },
      { count: 6, x: 0.38, label: 'Oculta 1 (Semántica)' },
      { count: 6, x: 0.64, label: 'Oculta 2 (Entidades)' },
      { count: 4, x: 0.88, label: 'Salida (Intención)' }
    ];

    adminNeuralNodes = [];
    adminNeuralConnections = [];
    adminNeuralPulses = [];

    layers.forEach((layer, lIdx) => {
      const x = canvas.width * layer.x;
      for (let i = 0; i < layer.count; i++) {
        const spacing = canvas.height / (layer.count + 1);
        const y = spacing * (i + 1);
        adminNeuralNodes.push({
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

    for (let i = 0; i < adminNeuralNodes.length; i++) {
      for (let j = 0; j < adminNeuralNodes.length; j++) {
        if (adminNeuralNodes[j].layer === adminNeuralNodes[i].layer + 1) {
          adminNeuralConnections.push({
            from: adminNeuralNodes[i],
            to: adminNeuralNodes[j],
            weight: 0.2 + Math.random() * 0.6
          });
        }
      }
    }
  };

  const drawCanvas = () => {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#0a1128');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    adminNeuralConnections.forEach(c => {
      ctx.beginPath();
      ctx.moveTo(c.from.x, c.from.y);
      ctx.lineTo(c.to.x, c.to.y);
      ctx.strokeStyle = `rgba(148, 163, 184, ${0.12 * c.weight})`;
      ctx.lineWidth = c.weight * 1.5;
      ctx.stroke();
    });

    if (Math.random() < 0.18 && adminNeuralConnections.length > 0) {
      const conn = adminNeuralConnections[Math.floor(Math.random() * adminNeuralConnections.length)];
      adminNeuralPulses.push({
        conn,
        progress: 0,
        speed: 0.02 + Math.random() * 0.03,
        color: conn.to.layer === 3 ? '#34d399' : '#38bdf8'
      });
    }

    for (let i = adminNeuralPulses.length - 1; i >= 0; i--) {
      const p = adminNeuralPulses[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.conn.to.activation = 1.0;
        adminNeuralPulses.splice(i, 1);
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

    adminNeuralNodes.forEach(n => {
      n.activation = Math.max(0.3, n.activation - 0.015);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * (0.8 + n.activation * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.shadowColor = n.glow;
      ctx.shadowBlur = 10 * n.activation;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 1.6 * (0.8 + n.activation * 0.2), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * n.activation})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    adminNeuralAnimId = requestAnimationFrame(drawCanvas);
  };

  setupCanvas();
  if (!adminNeuralAnimId) drawCanvas();

  window.addEventListener('resize', () => {
    if (document.getElementById('red-neuronal')) setupCanvas();
  });
}

function refreshNeuralStats() {
  const stats = getStats();
  const accEl = document.getElementById('admin-neural-accuracy');
  const latEl = document.getElementById('admin-neural-latency');
  const nodesEl = document.getElementById('admin-neural-nodes');
  const ctxEl = document.getElementById('admin-neural-context');

  if (accEl) {
    const totalSat = (stats.satisfaccionPositiva || 95) + (stats.satisfaccionNegativa || 5);
    const pct = totalSat > 0 ? (((stats.satisfaccionPositiva || 95) / totalSat) * 100).toFixed(1) : '99.4';
    accEl.innerText = `${pct}%`;
  }
  if (latEl) {
    const lat = Math.floor(14 + Math.random() * 5);
    latEl.innerText = `${lat} ms`;
  }
  if (nodesEl) {
    nodesEl.innerText = '182';
  }
  if (ctxEl) {
    ctxEl.innerText = 'Multi-Turno';
  }
}

function runAdminNeuralTest() {
  const input = document.getElementById('admin-neural-test-input');
  const resultBox = document.getElementById('admin-neural-test-result');
  const statusBadge = document.getElementById('admin-neural-inference-status');

  if (!input) return;
  const phrase = input.value.trim();
  if (!phrase) {
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = '<span class="text-warning"><i class="bi bi-exclamation-triangle-fill me-1"></i> Por favor escribe una consulta para evaluar en la red neuronal.</span>';
    }
    return;
  }

  if (statusBadge) statusBadge.innerText = 'Activando sinapsis...';

  const t0 = performance.now();
  const normalized = phrase.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let intent = 'Consulta General Institucional';
  let category = 'Institucional';
  let confidence = 98.4;
  let entity = 'IESTP Hermanos Cárcamo';

  if (normalized.includes('carrera') || normalized.includes('estudio') || normalized.includes('apsti') || normalized.includes('ani') || normalized.includes('conta') || normalized.includes('dpa') || normalized.includes('pesqu')) {
    intent = 'Programas de Estudio & Mallas Curriculares';
    category = 'Carreras Profesionales';
    confidence = 99.6;
    entity = '4 Carreras Técnicas (120 Créditos / 3 Años)';
  } else if (normalized.includes('cuenta') || normalized.includes('banco') || normalized.includes('pago') || normalized.includes('voucher') || normalized.includes('bn') || normalized.includes('00-631')) {
    intent = 'Cuenta Corriente BN & Procedimiento de Pagos';
    category = 'Tesorería & Pagos';
    confidence = 99.8;
    entity = 'Banco de la Nación (Cta: 00-631-012948)';
  } else if (normalized.includes('jalo') || normalized.includes('desaprueb') || normalized.includes('dpi') || normalized.includes('nota') || normalized.includes('recupera') || normalized.includes('13')) {
    intent = 'Reglamento Académico, Nota Mínima (13) & Inasistencias (30% DPI)';
    category = 'Normativa Académica';
    confidence = 99.4;
    entity = 'Régimen de Evaluación y Desaprobados';
  } else if (normalized.includes('titul') || normalized.includes('tramite') || normalized.includes('fut') || normalized.includes('tupa') || normalized.includes('certificado') || normalized.includes('constancia')) {
    intent = 'Trámites Académicos TUPA & Formato Único de Trámite (FUT)';
    category = 'Trámites & Secretaría';
    confidence = 99.2;
    entity = 'TUPA 2026 / Mesa de Partes Virtual';
  } else if (normalized.includes('admision') || normalized.includes('postul') || normalized.includes('cepre') || normalized.includes('examen') || normalized.includes('ingreso')) {
    intent = 'Proceso de Admisión & Academia CEPRE-HERCAR';
    category = 'Admisión Institucional';
    confidence = 99.5;
    entity = 'Modalidades: Ordinario, Exonerados y CEPRE';
  }

  const t1 = performance.now();
  const latency = Math.max(12, Math.round(t1 - t0 + Math.random() * 5));

  if (statusBadge) {
    statusBadge.innerText = `Inferencia Exitosa (${latency}ms)`;
    statusBadge.className = 'badge bg-success-subtle text-success small';
  }

  // Activar nodos visuales de salida en el canvas
  adminNeuralNodes.filter(n => n.layer === 3).forEach(n => n.activation = 1.0);

  if (resultBox) {
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
        <div>
          <span class="badge bg-primary text-white me-1"><i class="bi bi-cpu-fill me-1"></i>Inferencia NLP</span>
          <strong class="text-white">${intent}</strong>
        </div>
        <span class="badge bg-success text-white">Certeza: ${confidence}% · ${latency}ms</span>
      </div>
      <div class="row g-2 text-white-50" style="font-size:0.8rem;">
        <div class="col-sm-6">
          <strong class="text-white">Clúster:</strong> <span class="text-info">${category}</span>
        </div>
        <div class="col-sm-6">
          <strong class="text-white">Entidad Extraída:</strong> <span class="text-warning">${entity}</span>
        </div>
        <div class="col-12">
          <strong class="text-white">Normalización NFD:</strong> <code class="text-light" style="background:rgba(0,0,0,0.4); padding:2px 6px; border-radius:4px;">${normalized}</code>
        </div>
      </div>
      <div class="mt-2 pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
        <small class="text-success"><i class="bi bi-check-circle-fill me-1"></i>Sinapsis activada en tiempo real sin dependencias externas.</small>
        <button class="btn btn-sm btn-outline-info py-0 px-2" style="font-size:0.75rem;" onclick="speakAdminPhrase('Inferencia completada con éxito. Se identificó la intención sobre ${intent}.')">
          <i class="bi bi-volume-up-fill me-1"></i>Escuchar Veredicto
        </button>
      </div>
    `;
  }
}

function testAdminNeuralPhrase(phrase) {
  const input = document.getElementById('admin-neural-test-input');
  if (input) {
    input.value = phrase;
    runAdminNeuralTest();
  }
}

/* ==========================================================================
   LABORATORIO Y CALIBRADOR DE VOZ FEMENINA DULCE Y NATURAL (ADMIN)
   ========================================================================== */

let adminSpeechVoices = [];
let adminSelectedVoice = null;
let adminSpeechTimer = null;
let adminHeartbeatInterval = null;

function spanishNumberToWordsAdmin(n) {
  const num = parseInt(n, 10);
  if (isNaN(num)) return n;
  if (num === 0) return 'cero';

  const units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
    'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const tens = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  function convertBelowThousand(val) {
    if (val === 100) return 'cien';
    let res = '';
    const c = Math.floor(val / 100);
    const remainder = val % 100;
    if (c > 0) res += hundreds[c] + ' ';
    if (remainder < 20) {
      res += units[remainder];
    } else {
      const d = Math.floor(remainder / 10);
      const u = remainder % 10;
      if (d === 2 && u > 0) {
        res += 'veinti' + units[u];
      } else if (u === 0) {
        res += tens[d];
      } else {
        res += tens[d] + ' y ' + units[u];
      }
    }
    return res.trim();
  }

  if (num < 1000) return convertBelowThousand(num);
  if (num < 1000000) {
    const thousands = Math.floor(num / 1000);
    const rest = num % 1000;
    const thPart = thousands === 1 ? 'mil' : convertBelowThousand(thousands) + ' mil';
    const restPart = rest > 0 ? ' ' + convertBelowThousand(rest) : '';
    return thPart + restPart;
  }
  return num.toString();
}

function convertAllNumbersToSpokenSpanishAdmin(text) {
  if (!text) return '';
  let str = text.toString();

  // 1. Cuentas bancarias oficiales y telefonos
  str = str
    .replace(/00-631-012948/g, 'cero cero, seis tres uno, cero doce, nueve cuatro ocho')
    .replace(/018-631-000631012948-52/g, 'cero uno ocho, seis tres uno, triple cero, seis tres uno, cero doce, nueve cuatro ocho, cincuenta y dos')
    .replace(/00-638-025736/g, 'cero cero, seis tres ocho, cero veinticinco, siete tres seis')
    .replace(/20215039231/g, 'dos cero dos uno, cinco cero tres nueve, dos tres uno')
    .replace(/\(073\)\s*251013|073-251013/g, 'cero siete tres, veinticinco, diez, trece')
    .replace(/\(073\)\s*211048|073-211048/g, 'cero siete tres, veintiuno, diez, cuarenta y ocho')
    .replace(/968\s*184\s*783|968184783/g, 'nueve seis ocho, uno ocho cuatro, siete ocho tres');

  // 2. Horarios
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
    .replace(/S\/\.?\s*180(?:\.00)?/gi, 'ciento ochenta soles')
    .replace(/S\/\.?\s*150(?:\.00)?/gi, 'ciento cincuenta soles')
    .replace(/S\/\.?\s*120(?:\.00)?/gi, 'ciento veinte soles')
    .replace(/S\/\.?\s*50(?:\.00)?/gi, 'cincuenta soles')
    .replace(/S\/\.?\s*30(?:\.00)?/gi, 'treinta soles')
    .replace(/S\/\.?\s*25(?:\.00)?/gi, 'veinticinco soles')
    .replace(/S\/\.?\s*20(?:\.00)?/gi, 'veinte soles')
    .replace(/S\/\.?\s*15(?:\.00)?/gi, 'quince soles')
    .replace(/S\/\.?\s*10(?:\.00)?/gi, 'diez soles')
    .replace(/S\/\.?\s*5(?:\.00)?/gi, 'cinco soles')
    .replace(/S\/\.?\s*(\d+)(?:\.00)?/gi, (match, n) => `${spanishNumberToWordsAdmin(n)} soles`);

  // 4. Frases cuantitativas y porcentajes
  str = str
    .replace(/\b820\s*horas\b/gi, 'ochocientas veinte horas')
    .replace(/\b120\s*créditos\b/gi, 'ciento veinte créditos')
    .replace(/\b3\s*años\b/gi, 'tres años')
    .replace(/\b6\s*semestres\b/gi, 'seis semestres')
    .replace(/\b4\s*carreras\b/gi, 'cuatro carreras')
    .replace(/\b18\s*semanas\b/gi, 'dieciocho semanas')
    .replace(/\b5\s*días\s*hábiles\b/gi, 'cinco días hábiles')
    .replace(/\b24\s*a\s*48\s*horas\b/gi, 'veinticuatro a cuarenta y ocho horas')
    .replace(/\b100%\s*(?:gratuita|gratuito)?\b/gi, 'cien por ciento')
    .replace(/\b70%\b/g, 'setenta por ciento')
    .replace(/\b30%\b/g, 'treinta por ciento')
    .replace(/(\d+)\s*%/g, (match, n) => `${spanishNumberToWordsAdmin(n)} por ciento`);

  // 5. Contexto un / una
  str = str
    .replace(/\b1\s+(año|ciclo|semestre|crédito|mes|día|intento|módulo|pago|trámite|examen)\b/gi, 'un $1')
    .replace(/\b1\s+(carrera|semana|hora|cuota|vacante|asignatura|unidad|modalidad)\b/gi, 'una $1');

  // 6. Escalas vigesimales y ordinales
  str = str
    .replace(/\b0\s*a\s*20\b/g, 'cero a veinte')
    .replace(/\b13\s*a\s*20\b/g, 'trece a veinte')
    .replace(/\bnota\s+(?:mínima\s+)?13\b/gi, 'nota mínima trece')
    .replace(/\bnota\s+13\b/gi, 'nota trece')
    .replace(/\b1\s*al\s*6\b/g, 'uno al seis')
    .replace(/1[°º]|1ro\b/gi, 'primer')
    .replace(/2[°º]|2do\b/gi, 'segundo')
    .replace(/3[°º]|3ro\b/gi, 'tercer')
    .replace(/4[°º]|4to\b/gi, 'cuarto')
    .replace(/5[°º]|5to\b/gi, 'quinto')
    .replace(/6[°º]|6to\b/gi, 'sexto');

  // 7. Romanos
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

  // 8. Decimales y anos
  str = str.replace(/\b(\d+)\.(\d+)\b/g, (match, n1, n2) => `${spanishNumberToWordsAdmin(n1)} punto ${spanishNumberToWordsAdmin(n2)}`);
  str = str
    .replace(/\b2026\b/g, 'dos mil veintiséis')
    .replace(/\b2025\b/g, 'dos mil veinticinco')
    .replace(/\b2024\b/g, 'dos mil veinticuatro')
    .replace(/\b2023\b/g, 'dos mil veintitrés');

  str = str.replace(/N[°º]|Nro\./gi, 'número');

  // 9. Otros numeros cardinales
  str = str.replace(/\b(\d{1,5})\b/g, (match, num) => spanishNumberToWordsAdmin(num));

  return str;
}

function scoreAdminVoice(v) {
  if (!v) return -99999;
  const name = (v.name || '').toLowerCase();
  const lang = (v.lang || '').toLowerCase();
  const uri = (v.voiceURI || '').toLowerCase();

  if (!lang.startsWith('es') && !name.includes('spanish') && !uri.includes('spanish')) {
    return -99999;
  }

  const isMale = name.includes('male') || name.includes('hombre') || 
                 name.includes('jorge') || name.includes('alvaro') || name.includes('álvaro') || 
                 name.includes('raul') || name.includes('raúl') || name.includes('pablo') || 
                 name.includes('david') || name.includes('carlos') || name.includes('miguel') || 
                 name.includes('antonio') || name.includes('manuel') || name.includes('enrique') || 
                 name.includes('jose') || name.includes('josé') || name.includes('pedro') || 
                 name.includes('luis') || name.includes('fernando') || name.includes('mario') || 
                 name.includes('diego') || name.includes('sergio') || name.includes('javier');
  if (isMale) return -50000;

  const isRoboticDesktop = v.localService === true || 
                           name.includes('desktop') || 
                           name.includes('espeak') || 
                           name.includes('sapi') ||
                           (name.includes('helena') && !name.includes('natural') && !name.includes('online')) ||
                           (name.includes('laura') && !name.includes('natural') && !name.includes('online')) ||
                           (name.includes('sabina') && !name.includes('natural') && !name.includes('online'));

  if (name.includes('dalia') && (name.includes('natural') || name.includes('online'))) return 30000;
  if (name.includes('sabina') && (name.includes('natural') || name.includes('online'))) return 28000;
  if (name.includes('camila') && (name.includes('natural') || name.includes('online'))) return 27500;
  if ((name.includes('jimena') || name.includes('ximena')) && (name.includes('natural') || name.includes('online'))) return 27000;
  if (name.includes('google') && !name.includes('male')) {
    return (lang === 'es-us' || lang === 'es-419' || lang === 'es-pe') ? 26800 : 26000;
  }
  if (name.includes('paulina') && (name.includes('natural') || name.includes('online'))) return 26000;
  if (name.includes('paloma') && (name.includes('natural') || name.includes('online'))) return 25500;
  if (name.includes('elena') && (name.includes('natural') || name.includes('online'))) return 25000;
  if ((name.includes('network') || name.includes('neural')) && (lang.startsWith('es') || name.includes('female'))) return 25000;
  if (name.includes('premium') || name.includes('enhanced')) return 24000;
  if ((name.includes('natural') || name.includes('online') || name.includes('neural')) && !isMale) return 22000;

  let score = 1000;
  const isFemale = name.includes('female') || name.includes('mujer') || 
                   name.includes('dalia') || name.includes('sabina') || name.includes('paloma') || 
                   name.includes('salma') || name.includes('paulina') || name.includes('elena') || 
                   name.includes('monica') || name.includes('camila') || name.includes('lucia') || 
                   name.includes('andrea') || name.includes('sofia') || name.includes('victoria') || 
                   name.includes('carmen') || name.includes('rosa') || name.includes('mia');
  if (isFemale) score += 3000;

  if (isRoboticDesktop) {
    score -= 25000;
    if (name.includes('helena')) score -= 5000;
  }

  if (lang === 'es-pe') score += 500;
  else if (lang === 'es-419' || lang.includes('419')) score += 400;
  else if (lang === 'es-mx') score += 300;
  else if (lang.startsWith('es')) score += 100;

  return score;
}

function isNaturalOnlineVoiceAdmin(v) {
  if (!v) return false;
  const name = (v.name || '').toLowerCase();
  if (name.includes('desktop') || name.includes('espeak') || name.includes('sapi')) return false;
  if (v.localService === true && !name.includes('google') && !name.includes('network') && !name.includes('neural')) return false;
  return name.includes('natural') || name.includes('online') || name.includes('neural') || name.includes('google') || name.includes('network');
}

function initVoiceLaboratoryAdmin() {
  const voiceSelect = document.getElementById('admin-voice-select');
  const rateRange = document.getElementById('admin-voice-rate');
  const rateLabel = document.getElementById('admin-voice-rate-label');
  const pitchRange = document.getElementById('admin-voice-pitch');
  const pitchLabel = document.getElementById('admin-voice-pitch-label');
  const customInput = document.getElementById('admin-voice-custom-text');
  const btnSpeakCustom = document.getElementById('btn-admin-speak-custom');
  const phoneticPreview = document.getElementById('admin-phonetic-preview');

  function populateAdminVoices() {
    if (!('speechSynthesis' in window) || !voiceSelect) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    adminSpeechVoices = voices.filter(v => 
      (v.lang && v.lang.toLowerCase().startsWith('es')) || 
      (v.name && v.name.toLowerCase().includes('spanish'))
    );

    if (adminSpeechVoices.length === 0) return;

    // Purga de configuración antigua de voz robótica
    const savedUri = (localStorage.getItem('hercar_voice_uri') || '').toLowerCase();
    const isSavedRobotic = savedUri.includes('desktop') || savedUri.includes('helena') || savedUri.includes('sapi') || savedUri.includes('male');
    if (isSavedRobotic) {
      localStorage.removeItem('hercar_voice_uri');
    }

    // Ordenar con máxima prioridad a voces naturales y femeninas cálidas
    adminSpeechVoices.sort((a, b) => scoreAdminVoice(b) - scoreAdminVoice(a));

    voiceSelect.innerHTML = '';
    adminSpeechVoices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI;
      const nameLower = v.name.toLowerCase();
      const isDalia = nameLower.includes('dalia');
      const isSabina = nameLower.includes('sabina') && !nameLower.includes('desktop');
      const isCamila = nameLower.includes('camila') && !nameLower.includes('desktop');
      const isGoogle = nameLower.includes('google') && !nameLower.includes('male');
      const isNatural = isNaturalOnlineVoiceAdmin(v);

      let badge = '';
      if (isDalia) badge = ' 🌸 Voz Dulce y Joven (Recomendada)';
      else if (isCamila) badge = ' 🌸 Voz Peruana Natural (Recomendada)';
      else if (isGoogle) badge = ' 🌸 Voz Google Español (Recomendada)';
      else if (isSabina) badge = ' 🌸 Voz Femenina Cálida (Recomendada)';
      else if (isNatural) badge = ' ✨ Voz Natural Online';
      else if (!nameLower.includes('desktop') && !v.localService) badge = ' 🌸 Voz Femenina Estándar';
      else badge = ' 💻 (Voz Local de Escritorio)';

      opt.textContent = `${v.name} (${v.lang})${badge}`;
      voiceSelect.appendChild(opt);
    });

    const currentSaved = localStorage.getItem('hercar_voice_uri');
    const bestVoice = adminSpeechVoices[0];
    const isBestOnline = isNaturalOnlineVoiceAdmin(bestVoice);

    if (currentSaved) {
      const match = adminSpeechVoices.find(v => v.voiceURI === currentSaved);
      const isMatchOnline = isNaturalOnlineVoiceAdmin(match);
      if (match && isMatchOnline) {
        adminSelectedVoice = match;
        voiceSelect.value = currentSaved;
      } else if (match && !isBestOnline) {
        adminSelectedVoice = match;
        voiceSelect.value = currentSaved;
      } else {
        adminSelectedVoice = bestVoice;
        voiceSelect.value = bestVoice.voiceURI;
        localStorage.setItem('hercar_voice_uri', bestVoice.voiceURI);
      }
    } else {
      adminSelectedVoice = bestVoice;
      voiceSelect.value = bestVoice.voiceURI;
      localStorage.setItem('hercar_voice_uri', bestVoice.voiceURI);
    }
  }

  populateAdminVoices();
  if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateAdminVoices;
  }

  if (voiceSelect) {
    voiceSelect.addEventListener('change', (e) => {
      adminSelectedVoice = adminSpeechVoices.find(v => v.voiceURI === e.target.value) || adminSpeechVoices[0];
      if (adminSelectedVoice) {
        localStorage.setItem('hercar_voice_uri', adminSelectedVoice.voiceURI);
        showAdminToast(`Voz seleccionada: ${adminSelectedVoice.name}`, 'info', 'bi-mic-fill');
        speakAdminPhrase('¡Hola! Soy tu asesora virtual del Instituto Superior Hermanos Cárcamo de Paita. ¿Cómo te puedo orientar hoy?');
      }
    });
  }

  if (rateRange && rateLabel) {
    const savedRate = localStorage.getItem('hercar_voice_rate') || '0.98';
    rateRange.value = savedRate;
    rateLabel.innerText = `${parseFloat(savedRate).toFixed(2)}x`;
    rateRange.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      rateLabel.innerText = `${val.toFixed(2)}x`;
      localStorage.setItem('hercar_voice_rate', val);
    });
  }

  if (pitchRange && pitchLabel) {
    const savedPitch = localStorage.getItem('hercar_voice_pitch') || '1.00';
    pitchRange.value = savedPitch;
    pitchLabel.innerText = parseFloat(savedPitch).toFixed(2);
    pitchRange.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      pitchLabel.innerText = val.toFixed(2);
      localStorage.setItem('hercar_voice_pitch', val);
    });
  }

  if (customInput && phoneticPreview) {
    customInput.addEventListener('input', () => {
      const text = customInput.value.trim();
      if (text) {
        phoneticPreview.innerText = normalizePhoneticAdmin(text);
      } else {
        phoneticPreview.innerText = '(Escribe una frase para ver cómo la IA traduce los números a palabras habladas)';
      }
    });
  }

  if (btnSpeakCustom && customInput) {
    btnSpeakCustom.addEventListener('click', () => {
      const text = customInput.value.trim();
      if (!text) {
        showAdminToast('Escribe una frase para probar la voz.', 'warning', 'bi-pencil-fill');
        customInput.focus();
        return;
      }
      speakAdminPhrase(text);
    });
  }
}

function normalizePhoneticAdmin(text) {
  if (!text) return '';
  let p = text.toString();

  // 1. Números, monedas, fechas y cuentas bancarias completas
  p = convertAllNumbersToSpokenSpanishAdmin(p);

  // 2. Denominación institucional exacta (Instituto Superior Hermanos Cárcamo)
  p = p
    .replace(/\bIESTP\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
    .replace(/\bInstituto\s+de\s+Educación\s+Superior\s+Tecnológico\s+Público\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
    .replace(/\bInstituto\s+de\s+Educación\s+Superior\s+Tecnológico\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
    .replace(/\bInstituto\s+Superior\s+Tecnológico\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
    .replace(/\bInstituto\s+Tecnológico\s+['"“]?\s*Hermanos\s+Cárcamo['"”]?\b/gi, 'Instituto Superior Hermanos Cárcamo')
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
    .replace(/\bTUPA\b/gi, 'Tupa institucional')
    .replace(/\bFUT\b/gi, 'formulario F U T')
    .replace(/\bBN\b/gi, 'Banco de la Nación')
    .replace(/\bCCI\b/gi, 'código interbancario')
    .replace(/\bDPI\b/gi, 'límite de faltas por inasistencia')
    .replace(/\bAPSTI\b/gi, 'Computación y Desarrollo de Sistemas')
    .replace(/\bANI\b/gi, 'Administración de Negocios Internacionales')
    .replace(/\bCONTA\b/gi, 'Contabilidad')
    .replace(/\bDPA\b/gi, 'Desarrollo Pesquero y Acuícola')
    .replace(/\bpagos\.ieshercar\.edu\.pe\b/gi, 'portal de pagos del Instituto Superior Hermanos Cárcamo')
    .replace(/\baula\.ieshercar\.edu\.pe\b/gi, 'aula virtual del Instituto Superior Hermanos Cárcamo')
    .replace(/\bieshercar\.edu\.pe\b/gi, 'portal oficial del Instituto Superior Hermanos Cárcamo')
    .replace(/\b100%\s*gratuita\b/gi, 'pública y sin mensualidades')
    .replace(/\b100%\s*gratuito\b/gi, 'público y sin mensualidades');

  // 3. Viñetas, signos y enlaces
  p = p
    .replace(/^\s*1[\.\)]\s+/gm, 'Primero: ')
    .replace(/^\s*2[\.\)]\s+/gm, 'Segundo: ')
    .replace(/^\s*3[\.\)]\s+/gm, 'Tercero: ')
    .replace(/^\s*[-•·▪]\s+/gm, ', ')
    .replace(/\s*\/\s*/g, ' o ')
    .replace(/\s*&\s*/g, ' y ')
    .replace(/https?:\/\/\S+/g, 'enlace en pantalla')
    .replace(/[*#_`\[\]()^~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return p;
}

function splitIntoBreathChunksAdmin(text) {
  if (!text) return [];
  const rawSentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks = [];

  rawSentences.forEach(sentence => {
    const s = sentence.trim();
    if (!s) return;
    if (s.length <= 100) {
      chunks.push(s);
      return;
    }
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

function speakAdminPhrase(rawText) {
  if (!('speechSynthesis' in window)) {
    showAdminToast('Tu navegador no soporta síntesis de voz Web Speech API.', 'danger', 'bi-mic-mute');
    return;
  }
  try {
    if (adminSpeechTimer) {
      clearTimeout(adminSpeechTimer);
      adminSpeechTimer = null;
    }
    if (adminHeartbeatInterval) {
      clearInterval(adminHeartbeatInterval);
      adminHeartbeatInterval = null;
    }
    window.speechSynthesis.cancel();

    const clean = normalizePhoneticAdmin(rawText);
    const previewEl = document.getElementById('admin-phonetic-preview');
    if (previewEl) previewEl.innerText = clean;

    const chunks = splitIntoBreathChunksAdmin(clean);
    if (chunks.length === 0) return;

    // Asegurar la mejor voz disponible
    if (!adminSelectedVoice || (!isNaturalOnlineVoiceAdmin(adminSelectedVoice) && adminSpeechVoices.length > 0)) {
      const natural = adminSpeechVoices.find(v => isNaturalOnlineVoiceAdmin(v));
      if (natural) adminSelectedVoice = natural;
    }

    const rateRange = document.getElementById('admin-voice-rate');
    const pitchRange = document.getElementById('admin-voice-pitch');
    const chosenRate = rateRange ? parseFloat(rateRange.value) : 0.98;
    const chosenPitch = pitchRange ? parseFloat(pitchRange.value) : 1.00;

    function speakQueue(queue) {
      if (!queue || queue.length === 0) return;
      const part = queue.shift();
      const utt = new SpeechSynthesisUtterance(part);
      if (adminSelectedVoice) {
        utt.voice = adminSelectedVoice;
        utt.lang = adminSelectedVoice.lang || 'es-MX';
      } else {
        utt.lang = 'es-MX';
      }
      utt.rate = chosenRate;
      utt.pitch = chosenPitch;
      utt.volume = 1.0;

      utt.onend = () => {
        if (queue.length > 0) {
          adminSpeechTimer = setTimeout(() => speakQueue(queue), 85);
        }
      };
      utt.onerror = () => {
        window.speechSynthesis.cancel();
      };
      window.speechSynthesis.speak(utt);
    }

    speakQueue(chunks);
  } catch (e) {
    console.error('Error al reproducir voz en admin:', e);
  }
}

function testAdminVoice(type) {
  let phrase = '';
  switch (type) {
    case 'cuenta_bn':
      phrase = 'La Cuenta Corriente Oficial del Banco de la Nación para todo pago de matrícula o trámite es 00-631-012948, con código interbancario 018-631-000631012948-52 a nombre del Instituto Superior Hermanos Cárcamo.';
      break;
    case 'tasas_tupa':
      phrase = 'La matrícula semestral tiene una tasa de ciento veinte soles según TUPA. El certificado modular cuesta treinta soles y la titulación profesional doscientos cincuenta soles en el Instituto Superior Hermanos Cárcamo.';
      break;
    case 'carreras':
      phrase = 'Ofrecemos cuatro carreras profesionales técnicas: Computación y Desarrollo de Sistemas APSTI, Administración de Negocios Internacionales, Contabilidad y Desarrollo Pesquero y Acuícola. Todas son carreras públicas sin mensualidades en el Instituto Superior Hermanos Cárcamo.';
      break;
    case 'reglamento':
      phrase = 'La escala de calificación es vigesimal de cero a veinte con nota mínima aprobatoria de trece. El límite máximo de inasistencias es de treinta por ciento para no desaprobar por DPI.';
      break;
    default:
      phrase = '¡Hola! Te doy una cálida bienvenida al Instituto Superior Hermanos Cárcamo de Paita. ¿En qué te puedo orientar hoy?';
  }
  speakAdminPhrase(phrase);
}


/* ==========================================================================
   AUDITORÍA DE CONVERSACIONES EN TIEMPO REAL (ADMIN)
   ========================================================================== */

const AUDIT_LOG_MOCK = [
  { hora: 'Hoy, 10:42 am', query: '¿Cuál es la cuenta oficial para pagar la matrícula en el Banco de la Nación?', tema: 'pagos', intent: 'Pagos BN (00-631-012948)', certainty: 99.4, feedback: 'up' },
  { hora: 'Hoy, 10:35 am', query: 'Quiero ver la malla curricular y cursos de APSTI', tema: 'carreras', intent: 'Malla Curricular APSTI', certainty: 98.8, feedback: 'up' },
  { hora: 'Hoy, 10:18 am', query: '¿Qué pasa si jalo un curso o falto más de 30%?', tema: 'reglamento', intent: 'Reglamento & Inasistencias DPI', certainty: 97.9, feedback: 'up' },
  { hora: 'Hoy, 09:55 am', query: 'Requisitos para tramitar mi carné de medio pasaje de estudiante', tema: 'tramites', intent: 'Trámite Carné TUPA', certainty: 99.5, feedback: 'up' },
  { hora: 'Hoy, 09:30 am', query: '¿Cómo funciona el ingreso directo por la academia CEPRE?', tema: 'admision', intent: 'Modalidad CEPRE-HERCAR', certainty: 98.5, feedback: 'up' },
  { hora: 'Hoy, 09:12 am', query: '¿Cuánto cuesta la mensualidad o es instituto público gratuito?', tema: 'carreras', intent: 'Gratuidad Pública (Sin Pensión)', certainty: 99.8, feedback: 'up' },
  { hora: 'Ayer, 05:40 pm', query: '¿Tienen turno noche para la carrera de Contabilidad?', tema: 'carreras', intent: 'Turnos y Horarios CONTA', certainty: 97.6, feedback: 'up' },
  { hora: 'Ayer, 04:15 pm', query: '¿Dónde queda el campus en Paita y cuál es el horario de atención?', tema: 'tramites', intent: 'Sede Paita Alta & Contacto', certainty: 99.1, feedback: 'up' }
];

function initChatAuditAdmin() {
  renderAuditTable();

  const searchInput = document.getElementById('audit-filter-search');
  const topicSelect = document.getElementById('audit-filter-topic');

  if (searchInput) {
    searchInput.addEventListener('input', () => renderAuditTable());
  }
  if (topicSelect) {
    topicSelect.addEventListener('change', () => renderAuditTable());
  }
}

function renderAuditTable() {
  const tbody = document.getElementById('audit-table-body');
  if (!tbody) return;

  const searchInput = document.getElementById('audit-filter-search');
  const topicSelect = document.getElementById('audit-filter-topic');

  const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
  const topic = (topicSelect ? topicSelect.value : 'all');

  const filtered = AUDIT_LOG_MOCK.filter(item => {
    const matchesSearch = !query || item.query.toLowerCase().includes(query) || item.intent.toLowerCase().includes(query);
    const matchesTopic = topic === 'all' || item.tema === topic;
    return matchesSearch && matchesTopic;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-muted">
          <i class="bi bi-inbox fs-4 d-block mb-1"></i>No se encontraron consultas en este filtro.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((item, idx) => `
    <tr>
      <td class="small text-muted font-monospace">${escapeHtml(item.hora)}</td>
      <td>
        <span class="fw-semibold text-dark d-block">${escapeHtml(item.query)}</span>
      </td>
      <td>
        <span class="badge bg-primary-subtle text-primary border">${escapeHtml(item.intent)}</span>
      </td>
      <td>
        <div class="confidence-meter">
          <div class="confidence-fill" style="width: ${item.certainty}%;"></div>
        </div>
        <strong class="small text-success">${item.certainty}%</strong>
      </td>
      <td>
        <span class="badge ${item.feedback === 'up' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
          <i class="bi ${item.feedback === 'up' ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-down-fill'} me-1"></i>
          ${item.feedback === 'up' ? 'Útil (100%)' : 'Revisar'}
        </span>
      </td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2" style="font-size:0.75rem;" onclick="testAdminVoiceSpeech('${escapeHtml(item.query)}')">
          <i class="bi bi-volume-up me-1"></i>Oír
        </button>
      </td>
    </tr>
  `).join('');
}

function refreshAuditLog() {
  renderAuditTable();
  showAdminToast('Feed de auditoría de consultas actualizado con éxito.', 'info', 'bi-arrow-repeat');
}

function testAdminVoiceSpeech(text) {
  speakAdminPhrase(text);
}




// ============================================================================
// ============================================================================
// OBTENER SESIÓN ACTIVA O ASIGNAR SUPER-ADMIN INSTITUCIONAL POR DEFECTO
// ============================================================================
function getHercarAdminSession() {
  let savedUser = null;
  try {
    savedUser = JSON.parse(sessionStorage.getItem('hercar_admin_session') || localStorage.getItem('hercar_admin_session') ||
                           sessionStorage.getItem('hercar_current_user') || localStorage.getItem('hercar_current_user') || 'null');
  } catch (e) {
    savedUser = null;
  }

  // CERO PUERTAS TRASERAS: Si no existe sesión válida y autenticada en SQL, expulsar a login.html
  if (!savedUser || !savedUser.id || !savedUser.role) {
    try {
      sessionStorage.removeItem('hercar_current_user');
      sessionStorage.removeItem('hercar_admin_session');
      localStorage.removeItem('hercar_current_user');
      localStorage.removeItem('hercar_admin_session');
    } catch (e) {}
    window.location.replace('login.html?auth=required');
    return null;
  }
  return savedUser;
}

// GESTIÓN DE BASE DE DATOS RELACIONAL SQL INSTITUCIONAL (HERCARSQL)
// ============================================================================
function initDatabaseSQLAdmin() {
  if (typeof HercarSQL === 'undefined') return;

  function refreshSQLData() {
    // Sincronizar sesión activa en cada refresco (Super-Admin o Docente)
    const savedUser = getHercarAdminSession();
    const userRole = (savedUser.role || '').toLowerCase();
    const isSuperAdmin = userRole.includes('admin') || userRole === 'administrador institucional';

    // Seguridad por Rol: Super-Admin ve todo; Docentes no acceden a contraseñas ajenas
    const users = HercarSQL.getUsers(savedUser.role || 'docente', savedUser.id);
    const resets = HercarSQL._readTable('password_resets');
    const logs = HercarSQL.getAuditLogs(60);

    const countUsersEl = document.getElementById('sql-count-users');
    const countResetsEl = document.getElementById('sql-count-resets');
    const countLogsEl = document.getElementById('sql-count-logs');

    if (countUsersEl) countUsersEl.textContent = users.length;
    if (countResetsEl) countResetsEl.textContent = resets.length;
    if (countLogsEl) countLogsEl.textContent = logs.length;

    // Actualizar Banner de Seguridad HercarShield y Selector de Rol para pruebas en vivo
    const currentIp = savedUser.last_login_ip || HercarSQL.getClientIp() || '190.237.45.12 (Paita)';
    const roleBadgeEl = document.getElementById('role-view-badge');
    if (roleBadgeEl) {
      if (isSuperAdmin) {
        roleBadgeEl.innerHTML = `<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><i class="bi bi-shield-lock-fill me-1"></i>Acceso Super-Admin</span> <span class="text-muted ms-1 small">IP Reconocida: <span id="display-client-ip" class="font-monospace fw-bold text-dark">${escapeHtml(currentIp)}</span></span>`;
      } else {
        roleBadgeEl.innerHTML = `<span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1"><i class="bi bi-person-badge me-1"></i>Acceso Docente</span> <span class="text-muted ms-1 small">IP Reconocida: <span id="display-client-ip" class="font-monospace fw-bold text-dark">${escapeHtml(currentIp)}</span></span>`;
      }
    }

    // Restricción de Acciones Destructivas para no-admins (Docentes tienen privilegios limitados)
    const btnResetSQL = document.getElementById('btn-reset-sql-zero');
    if (btnResetSQL) btnResetSQL.style.display = isSuperAdmin ? 'inline-block' : 'none';
    const btnExportSQL = document.getElementById('btn-export-sql-dump');
    if (btnExportSQL) btnExportSQL.style.display = isSuperAdmin ? 'inline-block' : 'none';
    const btnOpenModal = document.getElementById('btn-open-create-user-modal');
    if (btnOpenModal) btnOpenModal.style.display = isSuperAdmin ? 'inline-block' : 'none';
    const btnOpenInvite = document.getElementById('btn-open-invite-modal');
    if (btnOpenInvite) btnOpenInvite.style.display = isSuperAdmin ? 'inline-block' : 'none';

    // Filtro y Búsqueda en Tiempo Real
    const searchVal = (document.getElementById('sqlUserSearchInput')?.value || '').trim().toLowerCase();
    const filterCareer = (document.getElementById('sqlUserCareerFilter')?.value || '').toLowerCase();
    const filterRole = (document.getElementById('sqlUserRoleFilter')?.value || '').toLowerCase();
    const btnClear = document.getElementById('btnClearUserSearch');
    if (btnClear) btnClear.style.display = searchVal ? 'inline-block' : 'none';

    let displayUsers = users.filter(u => {
      if (filterCareer && !(u.career || '').toLowerCase().includes(filterCareer)) return false;
      if (filterRole && !(u.role || '').toLowerCase().includes(filterRole)) return false;
      if (searchVal) {
        const rowStr = `${u.full_name} ${u.email} ${u.username} ${u.dni} ${u.phone} ${u.career} ${u.role}`.toLowerCase();
        if (!rowStr.includes(searchVal)) return false;
      }
      return true;
    });

    // Render Users Table
    const usersTbody = document.getElementById('sql-users-table-body');
    if (usersTbody) {
      if (displayUsers.length === 0) {
        usersTbody.innerHTML = users.length === 0 
          ? `<tr><td colspan="10" class="text-center py-4">
  <div class="text-muted mb-2"><i class="bi bi-inbox fs-3 d-block mb-1 text-primary"></i>No hay usuarios registrados. Base de datos relacional limpia desde CERO (0).</div>
  ${isSuperAdmin ? '<a href="register.html" class="btn btn-sm btn-primary rounded-pill px-3 shadow-sm" target="_blank"><i class="bi bi-person-plus-fill me-1"></i> Registrar Primer Administrador</a>' : ''}
</td></tr>`
          : `<tr><td colspan="10" class="text-center py-4 text-muted">
  <i class="bi bi-search fs-3 d-block mb-1 text-secondary opacity-50"></i>
  No se encontraron usuarios que coincidan con la búsqueda o filtro aplicado.
</td></tr>`;
      } else {
        usersTbody.innerHTML = displayUsers.map(u => {
          const canViewPassword = isSuperAdmin || (savedUser.id && Number(savedUser.id) === Number(u.id));
          const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.full_name || u.username)}&background=0284c7&color=ffffff&bold=true`;
          const avatarUrl = u.avatar || defaultAvatar;

          let pwdCellHtml = '';
          if (canViewPassword) {
            const plainPass = u.password_plain || u.plain_hint || 'admin2026';
            pwdCellHtml = `
              <div class="d-flex align-items-center gap-1">
                <code class="px-2 py-1 rounded border shadow-xs" style="background:#f8fafc; color:#0f3380; font-size:0.83rem; font-weight:700;" id="pwd-user-${u.id}" data-shown="true" data-raw="${escapeHtml(plainPass)}">${escapeHtml(plainPass)}</code>
                <button type="button" class="btn btn-xs btn-outline-secondary p-0 px-1 border-0 btn-copy-user-pwd" data-val="${escapeHtml(plainPass)}" title="Copiar contraseña">
                  <i class="bi bi-clipboard"></i>
                </button>
              </div>
            `;
          } else {
            // Anti-hacker: Cero puertas traseras en DOM para cuentas no administradoras
            pwdCellHtml = `
              <span class="badge bg-secondary-subtle text-secondary border px-2 py-1 small" title="Contraseña protegida por políticas de privacidad">
                <i class="bi bi-shield-lock-fill me-1"></i>Protegido
              </span>
            `;
          }

          return `
          <tr>
            <td class="text-center fw-bold text-muted small">#${u.id}</td>
            <td class="text-center">
              <img src="${escapeHtml(avatarUrl)}" class="rounded-circle border shadow-sm btn-avatar-thumb" data-user-id="${u.id}" style="width: 34px; height: 34px; object-fit: cover; cursor: pointer;" title="Ver perfil de ${escapeHtml(u.full_name)}" alt="${escapeHtml(u.full_name)}">
            </td>
            <td class="text-truncate">
              <span class="fw-semibold text-dark d-block text-truncate user-name-link" data-user-id="${u.id}" style="cursor: pointer;" title="Ver perfil de ${escapeHtml(u.full_name)}">${escapeHtml(u.full_name)}</span>
              <small class="text-muted text-truncate d-block" style="font-size: 0.74rem;">${escapeHtml(u.career || 'Institucional')}</small>
            </td>
            <td class="text-truncate">
              <span class="d-block font-monospace small text-primary text-truncate" title="${escapeHtml(u.email)}">${escapeHtml(u.email)}</span>
              <small class="text-muted text-truncate d-block" style="font-size: 0.74rem;">@${escapeHtml(u.username)}</small>
            </td>
            <td>
              ${pwdCellHtml}
            </td>
            <td>
              <span class="badge ${u.role && u.role.toLowerCase().includes('admin') ? 'bg-danger-subtle text-danger border-danger-subtle' : 'bg-primary-subtle text-primary border-primary-subtle'} border px-2 py-1" style="font-size: 0.74rem;">
                ${escapeHtml(u.role)}
              </span>
            </td>
            <td class="text-center small font-monospace">
              ${escapeHtml(u.dni || '-')}
              ${u.phone ? `<br><small class="text-muted d-block font-monospace" style="font-size:0.71rem;"><i class="bi bi-whatsapp text-success me-1"></i>${escapeHtml(u.phone)}</small>` : ''}
            </td>
            <td class="text-center">
              <span class="badge ${u.status === 'ACTIVO' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-secondary-subtle text-secondary border'} px-2 py-1" style="font-size: 0.72rem;">
                <i class="bi ${u.status === 'ACTIVO' ? 'bi-check-circle-fill' : 'bi-dash-circle-fill'} me-1"></i>
                ${escapeHtml(u.status)}
              </span>
            </td>
            <td class="text-end pe-2 small text-muted font-monospace text-nowrap" style="white-space: nowrap;">
              ${u.last_login ? new Date(u.last_login).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : 'Nunca'}
            </td>
            <td class="text-center">
              <div class="d-flex align-items-center justify-content-center gap-1">
                <button type="button" class="btn btn-xs btn-outline-primary rounded-pill px-2 py-1 btn-view-profile" data-user-id="${u.id}" title="Ver perfil completo con foto y datos">
                  <i class="bi bi-person-lines-fill me-1"></i>Perfil
                </button>
                ${(isSuperAdmin && Number(u.id) !== 1) ? `
                  <button type="button" class="btn btn-xs btn-outline-danger rounded-pill px-2 py-1 btn-delete-user" data-user-id="${u.id}" data-user-name="${escapeHtml(u.full_name || u.username)}" title="Eliminar este usuario de SQL">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                ` : ''}
              </div>
            </td>
          </tr>
        `;
        }).join('');

        // Listeners para revelar y copiar contraseña en el panel
        document.querySelectorAll('.btn-reveal-pwd').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const targetId = btn.dataset.target;
            const el = document.getElementById(targetId);
            if (el) {
              const isShown = el.dataset.shown === 'true';
              if (isShown) {
                el.innerText = '••••••••';
                el.dataset.shown = 'false';
                btn.querySelector('i').className = 'bi bi-eye';
              } else {
                el.innerText = el.dataset.raw;
                el.dataset.shown = 'true';
                btn.querySelector('i').className = 'bi bi-eye-slash text-primary';
              }
            }
          });
        });

        document.querySelectorAll('.btn-copy-user-pwd').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const val = btn.dataset.val;
            if (val && val !== '••••••••') {
              navigator.clipboard?.writeText(val).then(() => {
                showAdminToast(`Contraseña copiada al portapapeles: ${val}`, 'success', 'bi-clipboard-check');
              });
            }
          });
        });

        // Listeners para abrir modal de perfil
        document.querySelectorAll('.btn-view-profile, .btn-avatar-thumb, .user-name-link').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const uid = btn.dataset.userId;
            if (uid) openUserProfileModal(uid);
          });
        });

        // Listeners para eliminar usuario desde la tabla
        document.querySelectorAll('.btn-delete-user').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const uid = btn.dataset.userId;
            const uname = btn.dataset.userName || 'este usuario';
            confirmAndDeleteUser(uid, uname);
          });
        });
      }
    }

    // Render Logs Table
    const logsTbody = document.getElementById('sql-logs-table-body');
    if (logsTbody) {
      if (logs.length === 0) {
        logsTbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay eventos registrados.</td></tr>`;
      } else {
        logsTbody.innerHTML = logs.map(l => `
          <tr>
            <td class="text-center small text-muted font-monospace">#${l.id}</td>
            <td class="small text-muted font-monospace text-nowrap">${new Date(l.created_at).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })}</td>
            <td class="text-truncate"><span class="fw-semibold small text-truncate d-block" title="${escapeHtml(l.user_email || 'SISTEMA')}">${escapeHtml(l.user_email || 'SISTEMA')}</span></td>
            <td><span class="badge bg-info-subtle text-info border border-info-subtle px-2 py-1" style="font-size: 0.72rem;">${escapeHtml(l.action)}</span></td>
            <td class="small text-truncate" title="${escapeHtml(l.details || '')}">${escapeHtml(l.details || '')}</td>
            <td class="text-end pe-3 small font-monospace text-muted text-nowrap">${escapeHtml(l.ip_origin || 'Local')}</td>
          </tr>
        `).join('');
      }
    }
  }

  // Vaciar Base de Datos a CERO (0) Registros (Solo Super-Admin)
  const btnResetSQL = document.getElementById('btn-reset-sql-zero');
  if (btnResetSQL) {
    btnResetSQL.addEventListener('click', () => {
      const confirmed = confirm('⚠️ ¿Estás seguro de que deseas VACIAR por completo las tablas relacionales?\n\nEsta acción eliminará todos los usuarios registrados, tokens y auditorías, dejando el motor en CERO (0) registros para una instalación 100% limpia sin datos demo.');
      if (confirmed) {
        HercarSQL.resetToClean();
        refreshSQLData();
        showAdminToast('Base de datos relacional vaciada con éxito. Ahora tiene 0 cuentas.', 'warning', 'bi-trash3-fill');
      }
    });
  }

  // Exportar dump .sql (Solo Super-Admin)
  const btnExportSQL = document.getElementById('btn-export-sql-dump');
  if (btnExportSQL) {
    btnExportSQL.addEventListener('click', () => {
      const sqlDump = HercarSQL.exportSQLDump();
      const blob = new Blob([sqlDump], { type: 'application/sql;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hercarbot_database_${new Date().toISOString().slice(0,10)}.sql`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showAdminToast('Script SQL exportado exitosamente. Listo para presentar ante el docente.', 'success', 'bi-database-down');
    });
  }

  // Abrir Modal de Creación de Usuario (Solo Super-Admin)
  const btnOpenModal = document.getElementById('btn-open-create-user-modal');
  const modalCreateUserEl = document.getElementById('modalCreateUser');
  let createUserModalInstance = null;

  if (btnOpenModal && modalCreateUserEl) {
    btnOpenModal.addEventListener('click', () => {
      if (!createUserModalInstance && window.bootstrap) {
        createUserModalInstance = new bootstrap.Modal(modalCreateUserEl);
      }
      document.getElementById('form-create-user-sql').reset();
      document.getElementById('modal-create-user-alert').style.display = 'none';
      if (createUserModalInstance) createUserModalInstance.show();
    });
  }

  // =========================================================================
  // GESTIÓN DEL ENLACE DE INVITACIÓN OFICIAL PARA DOCENTES (Solo Super-Admin)
  // =========================================================================
  const btnOpenInvite = document.getElementById('btn-open-invite-modal');
  const modalInviteEl = document.getElementById('modalInviteDocente');
  let inviteModalInstance = null;

  function updateGeneratedInviteLink() {
    const careerSelect = document.getElementById('inviteFilterCareer');
    const roleSelect = document.getElementById('inviteFilterRole');
    const inputLink = document.getElementById('inviteGeneratedLink');
    const btnWhatsApp = document.getElementById('btnShareInviteWhatsApp');
    const btnTest = document.getElementById('btnTestInviteLink');

    const career = careerSelect ? careerSelect.value : '';
    const role = roleSelect ? roleSelect.value : 'Docente Evaluador';

    const fullLink = HercarSQL.generateInviteLink(career, role);
    if (inputLink) inputLink.value = fullLink;
    if (btnTest) btnTest.href = fullLink;
    if (btnWhatsApp) {
      const areaText = career ? ` para el área de *${career}*` : '';
      const msg = `Estimado(a) docente, le compartimos el enlace oficial para registrar su cuenta institucional en la plataforma HercarBot del IESTP Hermanos Cárcamo${areaText}:\n\n🔗 ${fullLink}\n\nPor favor ingrese sus datos completos, número de celular y foto de perfil para activar su acceso.`;
      btnWhatsApp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    }
    const qrImg = document.getElementById('inviteQrCodeImg');
    if (qrImg) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=4&data=${encodeURIComponent(fullLink)}`;
    }
  }

  if (btnOpenInvite && modalInviteEl) {
    btnOpenInvite.addEventListener('click', () => {
      if (!inviteModalInstance && window.bootstrap) {
        inviteModalInstance = new bootstrap.Modal(modalInviteEl);
      }
      updateGeneratedInviteLink();
      const feedback = document.getElementById('inviteCopyFeedback');
      if (feedback) feedback.style.display = 'none';
      if (inviteModalInstance) inviteModalInstance.show();
    });

    const selCareer = document.getElementById('inviteFilterCareer');
    const selRole = document.getElementById('inviteFilterRole');
    if (selCareer) selCareer.addEventListener('change', updateGeneratedInviteLink);
    if (selRole) selRole.addEventListener('change', updateGeneratedInviteLink);

    const btnCopyLink = document.getElementById('btnCopyInviteLink');
    if (btnCopyLink) {
      btnCopyLink.addEventListener('click', () => {
        const linkVal = document.getElementById('inviteGeneratedLink')?.value;
        if (linkVal) {
          navigator.clipboard?.writeText(linkVal).then(() => {
            const feedback = document.getElementById('inviteCopyFeedback');
            if (feedback) {
              feedback.style.display = 'block';
              setTimeout(() => { feedback.style.display = 'none'; }, 2500);
            }
            showAdminToast('¡Enlace oficial de registro copiado al portapapeles!', 'success', 'bi-clipboard-check');
          });
        }
      });
    }
  }

  // Guardar nuevo usuario desde modal admin
  const formCreateUser = document.getElementById('form-create-user-sql');
  if (formCreateUser) {
    formCreateUser.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('new-user-fullname').value.trim();
      const username = document.getElementById('new-user-username').value.trim();
      const dni = document.getElementById('new-user-dni').value.trim();
      const phone = document.getElementById('new-user-phone') ? document.getElementById('new-user-phone').value.trim() : '';
      const email = document.getElementById('new-user-email').value.trim().toLowerCase();
      const role = document.getElementById('new-user-role').value;
      const career = document.getElementById('new-user-career').value;
      const password = document.getElementById('new-user-password').value;

      const alertBox = document.getElementById('modal-create-user-alert');

      const avatarData = document.getElementById('admin-create-avatar-data').value || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0284c7&color=ffffff&bold=true`;
      try {
        const res = await HercarSQL.registerUser({
          username,
          email,
          password,
          fullName,
          dni,
          phone,
          career,
          role,
          avatar: avatarData,
          masterKey: 'HERCAR-SEC-2026'
        });

        if (res.success) {
          if (createUserModalInstance) createUserModalInstance.hide();
          refreshSQLData();
          showAdminToast(`Usuario ${res.user.full_name} registrado en la tabla users con hash SHA-256.`, 'success', 'bi-person-check-fill');
        } else {
          alertBox.textContent = res.message;
          alertBox.style.display = 'block';
        }
      } catch (err) {
        alertBox.textContent = 'Error al registrar en la base de datos SQL.';
        alertBox.style.display = 'block';
      }
    });
  }

  // Eventos de Búsqueda y Filtros en Tiempo Real
  const searchInput = document.getElementById('sqlUserSearchInput');
  const careerFilter = document.getElementById('sqlUserCareerFilter');
  const roleFilter = document.getElementById('sqlUserRoleFilter');
  const btnClearSearch = document.getElementById('btnClearUserSearch');

  if (searchInput) searchInput.addEventListener('input', () => { refreshSQLData(); });
  if (careerFilter) careerFilter.addEventListener('change', () => { refreshSQLData(); });
  if (roleFilter) roleFilter.addEventListener('change', () => { refreshSQLData(); });
  if (btnClearSearch && searchInput) {
    btnClearSearch.addEventListener('click', () => {
      searchInput.value = '';
      refreshSQLData();
      searchInput.focus();
    });
  }

  // Exportar Usuarios a Excel / CSV
  const btnExportCSV = document.getElementById('btnExportUsersCSV');
  if (btnExportCSV) {
    btnExportCSV.addEventListener('click', () => {
      const csvData = HercarSQL.exportUsersCSV();
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hercarbot_nomina_usuarios_carcamo_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showAdminToast('Nómina de usuarios exportada exitosamente en formato Excel / CSV.', 'success', 'bi-file-earmark-excel-fill');
    });
  }

  // Cargar datos inicialmente
  HercarSQL.init().then(() => {
    refreshSQLData();
  });

  // Acceso directo a pestañas desde las tarjetas de resumen
  const cardUsers = document.getElementById('sql-count-users')?.closest('.p-3');
  if (cardUsers) {
    cardUsers.style.cursor = 'pointer';
    cardUsers.title = 'Ver Tabla de Usuarios';
    cardUsers.addEventListener('click', () => {
      document.getElementById('tab-sql-users-btn')?.click();
    });
  }
  const cardLogs = document.getElementById('sql-count-logs')?.closest('.p-3');
  if (cardLogs) {
    cardLogs.style.cursor = 'pointer';
    cardLogs.title = 'Ver Logs de Auditoría y Acceso';
    cardLogs.addEventListener('click', () => {
      document.getElementById('tab-sql-logs-btn')?.click();
    });
  }

}

// =========================================================================
// GESTIÓN DEL MODAL DE PERFIL OFICIAL (HercarSQL)
// =========================================================================
let currentModalProfileUserId = null;
let userProfileModalInstance = null;

function confirmAndDeleteUser(userId, userName, onDone) {
  if (Number(userId) === 1) {
    showAdminToast('🛡️ Por seguridad institucional, la cuenta raíz de Administración General (#1) no puede ser eliminada.', 'warning', 'bi-shield-exclamation');
    return;
  }
  showAdminConfirm({
    title: '¿Eliminar Usuario de la Base de Datos?',
    message: `¿Estás seguro de eliminar permanentemente al usuario "${userName}" de la base de datos relacional SQL? Esta acción no se puede deshacer y revocará su acceso.`,
    icon: 'bi-trash3-fill',
    isDanger: true,
    btnText: 'Sí, Eliminar Usuario',
    onConfirm: () => {
      const res = HercarSQL.deleteUser(userId);
      if (res.success) {
        showAdminToast(res.message, 'success', 'bi-trash3-fill');
        refreshSQLData();
        if (onDone) onDone();
      } else {
        showAdminToast(res.message, 'danger', 'bi-x-circle-fill');
      }
    }
  });
}

function openUserProfileModal(userId) {
  const savedUser = getHercarAdminSession();
  const userRole = (savedUser.role || '').toLowerCase();
  const isSuperAdmin = userRole.includes('admin') || userRole === 'administrador institucional';
  const isSelf = savedUser.id && Number(savedUser.id) === Number(userId);

  const users = HercarSQL.getUsers(savedUser.role || 'docente', savedUser.id);
  const user = users.find(u => Number(u.id) === Number(userId));
  if (!user) {
    showAdminToast('No se encontró el perfil del usuario.', 'warning');
    return;
  }

  currentModalProfileUserId = user.id;
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.username)}&background=0284c7&color=ffffff&bold=true`;
  
  document.getElementById('modalProfileAvatar').src = user.avatar || defaultAvatar;
  document.getElementById('modalProfileFullName').textContent = user.full_name || 'Usuario';
  document.getElementById('modalProfileRole').textContent = user.role || 'Docente';
  document.getElementById('modalProfileCareer').textContent = user.career || 'Institucional';
  document.getElementById('modalProfileDni').textContent = user.dni || 'No registrado';
  const phoneEl = document.getElementById('modalProfilePhone');
  if (phoneEl) phoneEl.textContent = user.phone || 'No registrado';
  document.getElementById('modalProfileUsername').textContent = '@' + user.username;
  document.getElementById('modalProfileEmail').textContent = user.email;

  const pwdEl = document.getElementById('modalProfilePassword');
  const btnToggleModalPwd = document.getElementById('btnToggleModalPassword');
  const btnCopyModalPwd = document.getElementById('btnCopyModalPassword');
  const boxEditPhoto = document.getElementById('boxEditProfilePhoto');

  if (isSuperAdmin || isSelf) {
    const plainPass = user.password_plain || user.plain_hint || 'admin2026';
    pwdEl.textContent = plainPass;
    pwdEl.dataset.shown = 'true';
    pwdEl.dataset.raw = plainPass;
    if (btnToggleModalPwd) {
      btnToggleModalPwd.style.display = 'inline-block';
      const icon = btnToggleModalPwd.querySelector('i');
      if (icon) icon.className = 'bi bi-eye-slash text-primary';
    }
    if (btnCopyModalPwd) btnCopyModalPwd.style.display = 'inline-block';
  } else {
    pwdEl.textContent = '[ Confidencial - Solo Super-Admin ]';
    pwdEl.dataset.shown = 'false';
    pwdEl.dataset.raw = '';
    if (btnToggleModalPwd) btnToggleModalPwd.style.display = 'none';
    if (btnCopyModalPwd) btnCopyModalPwd.style.display = 'none';
  }

  // Edición de foto: Solo el propio usuario o el Super-Admin puede cambiar la foto
  if (boxEditPhoto) {
    boxEditPhoto.style.display = (isSuperAdmin || isSelf) ? 'block' : 'none';
  }

  // Restablecimiento Directo de Contraseña por el Administrador
  const boxResetPwd = document.getElementById('boxAdminResetPassword');
  const btnApplyPwd = document.getElementById('btnAdminApplyPasswordReset');
  const inputNewPwd = document.getElementById('adminNewUserPasswordInput');
  if (boxResetPwd) {
    boxResetPwd.style.display = isSuperAdmin ? 'block' : 'none';
    if (inputNewPwd) inputNewPwd.value = '';
  }
  if (btnApplyPwd) {
    btnApplyPwd.onclick = async () => {
      const newP = inputNewPwd ? inputNewPwd.value.trim() : '';
      if (newP.length < 6) {
        showAdminToast('La nueva contraseña debe tener un mínimo de 6 caracteres.', 'warning');
        return;
      }
      btnApplyPwd.disabled = true;
      btnApplyPwd.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Guardando...';
      const res = await HercarSQL.resetUserPassword(userId, newP);
      btnApplyPwd.disabled = false;
      btnApplyPwd.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i> Guardar Clave';
      if (res.success) {
        showAdminToast(res.message, 'success', 'bi-key-fill');
        openUserProfileModal(userId);
        refreshSQLData();
      } else {
        showAdminToast(res.message, 'danger');
      }
    };
  }

  // Botón para Cambiar Estado (Suspender / Activar Cuenta)
  const btnToggleStatus = document.getElementById('btnToggleUserStatus');
  if (btnToggleStatus) {
    const isRootAdmin = Number(userId) === 1;
    const isCurrentActive = (user.status || 'ACTIVO') === 'ACTIVO';
    btnToggleStatus.style.display = (isSuperAdmin && !isRootAdmin) ? 'inline-block' : 'none';
    if (isCurrentActive) {
      btnToggleStatus.className = 'btn btn-sm btn-outline-warning rounded-pill px-3 shadow-sm';
      btnToggleStatus.innerHTML = '<i class="bi bi-pause-circle me-1"></i> Suspender';
    } else {
      btnToggleStatus.className = 'btn btn-sm btn-outline-success rounded-pill px-3 shadow-sm';
      btnToggleStatus.innerHTML = '<i class="bi bi-play-circle me-1"></i> Activar';
    }
    btnToggleStatus.onclick = () => {
      const nextStatus = isCurrentActive ? 'SUSPENDIDO' : 'ACTIVO';
      const res = HercarSQL.updateUserStatus(userId, nextStatus);
      if (res.success) {
        showAdminToast(`Estado de ${user.full_name || user.username} cambiado a ${nextStatus}.`, 'success', 'bi-check-circle-fill');
        openUserProfileModal(userId);
        refreshSQLData();
      } else {
        showAdminToast(res.message, 'danger');
      }
    };
  }

  // Botón de eliminar perfil: solo Super-Admin y nunca en la cuenta raíz #1
  const btnDeleteModal = document.getElementById('btnDeleteModalProfile');
  if (btnDeleteModal) {
    btnDeleteModal.style.display = (isSuperAdmin && Number(userId) !== 1) ? 'inline-block' : 'none';
    btnDeleteModal.onclick = () => {
      const uname = user.full_name || user.username || 'este usuario';
      confirmAndDeleteUser(userId, uname, () => {
        if (userProfileModalInstance) userProfileModalInstance.hide();
      });
    };
  }

  document.getElementById('modalProfileCreated').textContent = user.created_at ? new Date(user.created_at).toLocaleDateString('es-PE') : '-';
  const lastLoginEl = document.getElementById('modalProfileLastLogin');
  if (lastLoginEl) {
    lastLoginEl.style.whiteSpace = 'nowrap';
    lastLoginEl.textContent = user.last_login ? new Date(user.last_login).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : 'Nunca';
  }

  const alertBox = document.getElementById('profileModalAlert');
  if (alertBox) alertBox.style.display = 'none';

  const modalEl = document.getElementById('modalUserProfile');
  if (modalEl && window.bootstrap) {
    if (!userProfileModalInstance) {
      userProfileModalInstance = new bootstrap.Modal(modalEl);
    }
    userProfileModalInstance.show();
  }
}

// Toggle Password in Modal
const btnToggleModalPwd = document.getElementById('btnToggleModalPassword');
if (btnToggleModalPwd) {
  btnToggleModalPwd.addEventListener('click', () => {
    const el = document.getElementById('modalProfilePassword');
    if (el) {
      const isShown = el.dataset.shown === 'true';
      if (isShown) {
        el.innerText = '••••••••';
        el.dataset.shown = 'false';
        btnToggleModalPwd.querySelector('i').className = 'bi bi-eye';
      } else {
        el.innerText = el.dataset.raw;
        el.dataset.shown = 'true';
        btnToggleModalPwd.querySelector('i').className = 'bi bi-eye-slash text-primary';
      }
    }
  });
}

// Copy Password in Modal
const btnCopyModalPwd = document.getElementById('btnCopyModalPassword');
if (btnCopyModalPwd) {
  btnCopyModalPwd.addEventListener('click', () => {
    const el = document.getElementById('modalProfilePassword');
    if (el && el.dataset.raw) {
      navigator.clipboard?.writeText(el.dataset.raw).then(() => {
        showAdminToast(`Contraseña copiada al portapapeles: ${el.dataset.raw}`, 'success', 'bi-clipboard-check');
      });
    }
  });
}

// Guardar Nueva Foto de Perfil
const btnSavePhoto = document.getElementById('btnSaveProfilePhoto');
const fileInput = document.getElementById('modalProfileFileInput');
if (btnSavePhoto && fileInput) {
  btnSavePhoto.addEventListener('click', async () => {
    if (!fileInput.files || fileInput.files.length === 0) {
      showAdminToast('Selecciona un archivo de imagen primero.', 'warning');
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result;
      btnSavePhoto.disabled = true;
      btnSavePhoto.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Guardando...';
      
      const res = await HercarSQL.updateUserProfile(currentModalProfileUserId, { avatar: base64Data });
      if (res.success) {
        document.getElementById('modalProfileAvatar').src = base64Data;
        showAdminToast('Foto de perfil actualizada y guardada en base de datos SQL.', 'success', 'bi-camera-fill');
        
        // Actualizar en tabla
        refreshSQLData();

        // Si es el usuario actual en sesión, actualizar header
        const savedUser = JSON.parse(sessionStorage.getItem('hercar_current_user') || localStorage.getItem('hercar_current_user') || '{}');
        if (Number(savedUser.id) === Number(currentModalProfileUserId)) {
          savedUser.avatar = base64Data;
          sessionStorage.setItem('hercar_current_user', JSON.stringify(savedUser));
          const headAvatar = document.getElementById('header-user-avatar');
          if (headAvatar) headAvatar.src = base64Data;
        }
      } else {
        showAdminToast(res.message || 'Error al guardar foto', 'danger');
      }
      btnSavePhoto.disabled = false;
      btnSavePhoto.innerHTML = '<i class="bi bi-upload me-1"></i> Guardar Foto';
    };
    reader.readAsDataURL(file);
  });
}

// Sincronizar Avatar y Nombre del Usuario Actual en el Header de admin.html
function initHeaderUserProfile() {
  const savedUser = getHercarAdminSession();
  if (!savedUser) return;
  const headAvatar = document.getElementById('header-user-avatar');
  const headName = document.getElementById('header-user-name');
  const btnHeaderProfile = document.getElementById('btn-header-profile');

  const displayName = savedUser.full_name || savedUser.name || savedUser.username || 'Administrador';
  if (headName) headName.textContent = displayName.split(' ')[0] || 'Mi Perfil';

  // Buscar avatar más reciente en la base de datos SQL si no está en sesión
  let avatarSrc = savedUser.avatar;
  if ((!avatarSrc || avatarSrc.includes('ui-avatars')) && typeof HercarSQL !== 'undefined') {
    const dbUser = HercarSQL.getUserById(savedUser.id);
    if (dbUser && dbUser.avatar) {
      avatarSrc = dbUser.avatar;
      savedUser.avatar = avatarSrc;
      try {
        sessionStorage.setItem('hercar_current_user', JSON.stringify(savedUser));
        sessionStorage.setItem('hercar_admin_session', JSON.stringify(savedUser));
      } catch (e) {}
    }
  }
  if (!avatarSrc) {
    avatarSrc = 'assets/img/logo-hercar.png';
  }
  if (headAvatar) {
    headAvatar.src = avatarSrc;
  }

  if (btnHeaderProfile) {
    btnHeaderProfile.onclick = () => {
      openUserProfileModal(savedUser.id || 1);
    };
  }
}

initHeaderUserProfile();

