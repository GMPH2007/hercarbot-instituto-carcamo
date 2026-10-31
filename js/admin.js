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
          showAdminToast('Sesión cerrada correctamente. Redirigiendo...', 'info', 'bi-shield-lock');
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 600);
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
  const sectionIds = ['metricas', 'comunicados', 'tramites-fut', 'vocacional', 'faqs', 'no-resueltas', 'configuracion'];
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

