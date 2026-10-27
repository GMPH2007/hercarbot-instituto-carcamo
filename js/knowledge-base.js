/**
 * BASE DE CONOCIMIENTO INSTITUCIONAL ULTRA COMPLETA Y CONECTADA
 * IESTP "HERMANOS CÁRCAMO" - PAITA, PIURA
 * Incluye Comunicados Oficiales 2026, Avisos en Drive, 4 Carreras con Mallas,
 * TUPA de Trámites, Admisión, Pagos, Prácticas EFSRT, Becas y Contacto.
 */

const COMUNICADOS_OFICIALES = [
  {
    id: 'comunicado-admision-ordinario-2026',
    titulo: 'Resultados Oficiales y Cuadro de Mérito: Examen Ordinario de Admisión 2026',
    fecha: 'Marzo 2026 — Publicación Oficial',
    importante: true,
    resumen: 'Publicación oficial del Cuadro de Méritos General con los postulantes que alcanzaron vacante en los 4 programas de estudio: APSTI, Administración de Negocios Internacionales, Contabilidad y Desarrollo Pesquero y Acuícola.',
    enlaceDrive: 'https://drive.google.com/file/d/1tbEWl2oBRglGp9QWx012TIE66yYBS1VN/view?usp=drive_link',
    enlacePlataforma: 'https://sistema.ieshercar.edu.pe/acceso',
    indicaciones: 'Los ingresantes deben acercarse a Secretaría Académica portando DNI original y voucher de matrícula validado para recoger su Constancia Oficial de Ingreso e iniciar su registro de asignaturas.'
  },
  {
    id: 'comunicado-cepre-2026',
    titulo: 'Comunicado: Academia CEPRE-HERCAR 2026 (Resultados Finales e Ingreso Directo)',
    fecha: 'Publicación Oficial 2026',
    importante: true,
    resumen: 'Se publicaron los Resultados Finales del Cuadro de Mérito de la Academia CEPRE-HERCAR con los postulantes que obtuvieron vacante de Ingreso Directo a las 4 carreras profesionales técnicas.',
    enlaceDrive: 'https://drive.google.com/file/d/1tbEWl2oBRglGp9QWx012TIE66yYBS1VN/view?usp=drive_link',
    indicaciones: 'Los ingresantes por CEPRE deben presentar sus certificados de estudios y DNI en Secretaría para la emisión de su constancia de ingreso directo y proceder con su matrícula oficial.'
  },
  {
    id: 'comunicado-becas-pronabec-2026',
    titulo: 'Convocatoria Becas PRONABEC 2026: Beca 18 y Beca Continuidad de Estudios',
    fecha: 'Convocatoria Nacional 2026',
    importante: true,
    resumen: 'El IESTP Hermanos Cárcamo como instituto tecnológico público licenciable orienta la postulación a las becas integrales del Estado peruano para estudiantes de alto rendimiento y condición SISFOH.',
    enlacePlataforma: 'https://ieshercar.edu.pe/',
    indicaciones: 'Beneficios otorgados por el Estado: laptop, subvención económica mensual para alimentación y movilidad local, materiales de estudio y titulación costo cero. Asesoría presencial en la Oficina de Bienestar Estudiantil.'
  },
  {
    id: 'comunicado-calendario-2026',
    titulo: 'Calendario Académico Oficial: Semestre Lectivo 2026-I',
    fecha: 'Aprobado por Dirección General',
    importante: false,
    resumen: 'Cronograma oficial de actividades pedagógicas del semestre 2026-I: Inicio de clases lectivas el Lunes 31 de Marzo de 2026. Evaluaciones de progreso continuo, semana de exámenes de medio ciclo y cierre de actas.',
    enlacePlataforma: 'https://sistema.ieshercar.edu.pe/acceso',
    indicaciones: 'Revisa las 18 semanas lectivas en el Sistema Académico Institucional (sistema.ieshercar.edu.pe). Recuerda que el límite máximo de inasistencias es del 30% para no desaprobar por DPI.'
  },
  {
    id: 'comunicado-pagos-video',
    titulo: 'Video Instructivo Oficial: Sistema de Registro de Pagos (Banco de la Nación)',
    fecha: 'Vigente para el Periodo 2026',
    importante: true,
    resumen: 'Tutorial oficial paso a paso para que estudiantes y postulantes de APSTI, ANI, CONTA y DPA registren sus comprobantes de depósito del Banco de la Nación en la plataforma oficial.',
    enlaceDrive: 'https://drive.google.com/file/d/1kYBJhVXOqO7BoQUpMZmYs-1E59gIUV9h/view?usp=sharing',
    enlacePlataforma: 'https://pagos.ieshercar.edu.pe/',
    indicaciones: 'Verifica que el número de operación, fecha e importe del voucher sean claramente legibles para que Tesorería valide en 24 a 48 horas hábiles.'
  },
  {
    id: 'comunicado-matricula-2026',
    titulo: 'Proceso de Matrícula y Ratificación Semestral en el Sistema Institucional',
    fecha: 'Cronograma Académico 2026',
    importante: false,
    resumen: 'Apertura de la matrícula a través del Sistema Académico Institucional (sistema.ieshercar.edu.pe) para alumnos regulares e ingresantes a las 4 carreras técnicas.',
    enlacePlataforma: 'https://sistema.ieshercar.edu.pe/acceso',
    indicaciones: 'Pagar la tasa administrativa correspondiente en el Banco de la Nación (Cta. Cte. 00-631-012948), subir el voucher a pagos.ieshercar.edu.pe y luego matricular tus unidades didácticas en el portal académico.'
  },
  {
    id: 'comunicado-bolsa-trabajo-puerto',
    titulo: 'Bolsa de Trabajo y Pasantías: Nuevas Plazas en Empresas del Puerto de Paita',
    fecha: 'Convenios Estratégicos 2026',
    importante: false,
    resumen: 'Convocatoria laboral y prácticas preprofesionales con Terminales Portuarios Euroandinos (TPE), empresas conserveras, exportadoras hidrobiológicas, agencias de aduanas y estudios contables de Paita.',
    enlacePlataforma: 'https://ieshercar.edu.pe/registro-tramite/',
    indicaciones: 'Presentar Curriculum Vitae documentado en la Coordinación de Empleabilidad o registrar solicitud por Mesa de Partes Virtual indicando programa de estudios y promedio ponderado.'
  },
  {
    id: 'comunicado-carne-minedu',
    titulo: 'Emisión de Carné de Educación Superior MINEDU (Medio Pasaje Oficial)',
    fecha: 'Convocatoria MINEDU 2026',
    importante: false,
    resumen: 'Trámite del carné oficial emitido por el Ministerio de Educación para el beneficio de medio pasaje en el transporte público urbano e interurbano según Ley N° 26271.',
    indicaciones: 'Estar formalmente matriculado en el semestre en curso, entregar fotografía digital tamaño carnet a color con fondo blanco y abonar la tasa oficial en el Banco de la Nación.'
  },
  {
    id: 'comunicado-practicas-efsrt',
    titulo: 'Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT)',
    fecha: 'Prácticas Preprofesionales Modulares',
    importante: false,
    resumen: 'Requisitos y presentación de cartas de presentación y constancias de prácticas en empresas pesqueras, agencias de aduanas, terminales portuarios y estudios contables de Paita.',
    indicaciones: 'Cumplir con un mínimo de 240 a 300 horas de prácticas por cada módulo formativo para la obtención del Certificado Modular progresivo.'
  },
  {
    id: 'comunicado-bienestar-psicologia',
    titulo: 'Servicio de Psicopedagogía, Tutoría Integral y Seguro SIS Gratuito',
    fecha: 'Atención Permanente 2026',
    importante: false,
    resumen: 'La Unidad de Bienestar Estudiantil brinda atención psicológica gratuita, orientación vocacional, talleres de nivelación académica, soporte emocional y afiliación activa al SIS.',
    enlacePlataforma: 'https://ieshercar.edu.pe/',
    indicaciones: 'Horario de atención: Lunes a Viernes de 8:00 a.m. a 1:00 p.m. en el campus de Paita Alta. Para afiliarte al Seguro Integral de Salud presenta tu copia de DNI en el Tópico Médico.'
  },
  {
    id: 'comunicado-seminario-tecnologico',
    titulo: 'Jornada de Actualización Tecnológica y Seminario de Innovación Portuaria 2026',
    fecha: 'Capacitación Extracurricular',
    importante: false,
    resumen: 'Ciclo de conferencias y talleres prácticos en Inteligencia Artificial aplicada a la productividad, Ciberseguridad, Gestión Aduanera en la Ventanilla Única de Comercio Exterior (VUCE) y Tributación SUNAT.',
    enlacePlataforma: 'https://ieshercar.edu.pe/',
    indicaciones: 'Abierto para estudiantes de los 4 programas de estudio. Se otorgará certificación institucional oficial con valor extracurricular a quienes cumplan con el 100% de asistencia.'
  },
  {
    id: 'comunicado-aniversario-39',
    titulo: '39° Aniversario de Fundación Institucional del IESTP Hermanos Cárcamo (1987 - 2026)',
    fecha: 'Celebración Institucional 2026',
    importante: true,
    resumen: 'Conmemoración de 39 años formando a los mejores profesionales técnicos de Paita y la macro región norte. Se desarrollarán actividades protocolares, pasacalles cívicos, campeonatos deportivos y feria de proyectos de titulación.',
    enlacePlataforma: 'https://ieshercar.edu.pe/',
    indicaciones: 'Participan las 4 carreras: APSTI, Negocios Internacionales, Contabilidad y Desarrollo Pesquero. Habrá premiación especial para los mejores proyectos modulares e iniciativas de emprendimiento regional.'
  },
  {
    id: 'comunicado-convalidacion-universitaria',
    titulo: 'Convenios de Articulación y Convalidación Universitaria para Egresados Titulados',
    fecha: 'Oportunidad de Complementación Profesional',
    importante: true,
    resumen: 'Convenios estratégicos para que nuestros titulados convaliden sus 3 años de formación modular y obtengan el Grado de Bachiller e Ingeniería o Licenciatura universitaria en menor tiempo.',
    enlacePlataforma: 'https://ieshercar.edu.pe/registro-tramite/',
    indicaciones: 'Aplica para APSTI (Ingeniería de Sistemas / Informática), ANI (Administración / Comercio Exterior), Contabilidad (Contabilidad y Finanzas) e Ingeniería Pesquera/Acuícola. Solicita tu Carta de Presentación en Secretaría General.'
  },
  {
    id: 'comunicado-feria-innovacion-paita',
    titulo: 'Feria Tecnológica, Productiva y de Negocios "Paita Innova 2026"',
    fecha: 'Exposición Anual de Proyectos',
    importante: false,
    resumen: 'Encuentro donde los estudiantes presentan prototipos de software, sistemas web, planes de exportación con el puerto, consultorías tributarias a mypes y alimentos innovadores con recursos marinos locales.',
    enlacePlataforma: 'https://ieshercar.edu.pe/',
    indicaciones: 'Presencia de empresarios del Terminal Portuario Euroandinos, plantas pesqueras y cámaras de comercio de Piura para reclutamiento directo de talentos e inserción laboral inmediata.'
  }
];

const INSTITUTO_LINKS = {
  webPrincipal: 'https://ieshercar.edu.pe/',
  mesaPartesVirtual: 'https://ieshercar.edu.pe/registro-tramite/',
  sistemaInstitucional: 'https://sistema.ieshercar.edu.pe/acceso',
  sistemaPagos: 'https://pagos.ieshercar.edu.pe/',
  aulaVirtual: 'https://aula.ieshercar.edu.pe/',
  bibliotecaLatina: 'https://iestphercar.bibliotecalatina.com/login',
  bibliotecaYoleo: 'https://ieshercar.edu.pe/',
  videoPagosDrive: 'https://drive.google.com/file/d/1kYBJhVXOqO7BoQUpMZmYs-1E59gIUV9h/view?usp=sharing',
  resultadosCepreDrive: 'https://drive.google.com/file/d/1tbEWl2oBRglGp9QWx012TIE66yYBS1VN/view?usp=drive_link',
  facebookOficial: 'https://web.facebook.com/iestphercar.edu.pe',
  youtubeOficial: 'https://www.youtube.com/@ieshercar',
  whatsappInformes: 'https://wa.me/51969100257?text=Hola,%20quisiera%20informacion%20del%20IESTP%20Hermanos%20Carcamo',
  mapsUbicacion: 'https://maps.google.com/?q=IESTP+Hermanos+Carcamo+Paita'
};

const INSTITUTO_DETALLE = {
  nombre: 'Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo"',
  nombreCorto: 'IESTP Hermanos Cárcamo',
  siglas: 'IESTP HERCAR',
  lema: 'Formando Profesionales y Construyendo Oportunidades',
  tipo: 'Institución Pública de Educación Superior Tecnológica (Educación Gratuita - MINEDU)',
  creacion: {
    resolucionCreacion: 'Resolución Ministerial N.° 232-87-ED (09 de mayo de 1987)',
    resolucionRevalidacion: 'Resolución Directoral N.° 0528-2006-ED',
    trayectoria: 'Más de 38 años de trayectoria formando profesionales técnicos para el desarrollo de Paita y el país'
  },
  mision: 'Institución educativa de nivel superior que forma profesionales técnicos competitivos, íntegros, con sentido crítico y social, que responden a las demandas del contexto local, regional, nacional y global, contribuyendo a la mejora de la calidad y desarrollo de nuestra sociedad, con valores, inclusión y sostenibilidad ambiental.',
  vision: 'Al 2032, ser una institución educativa licenciada, líder en la formación tecnológica integral, con programas de estudio que responden a los desafíos de la sociedad, promoviendo la calidad educativa, inclusión, medio ambiente, emprendimiento, innovación, relacionando la oferta formativa con la demanda laboral, en un contexto local, regional, nacional y global.',
  valores: ['Puntualidad', 'Honestidad', 'Respeto', 'Trabajo en Equipo', 'Compromiso', 'Ética'],
  autoridades: {
    director: 'Econ. Adolfo Zeta Pazo',
    cargoDirector: 'Director General',
    jefeAcademico: 'Lic. Juan García Reto',
    cargoAcademico: 'Jefe de Unidad Académica',
    jefeAdministrativo: 'CPC Edson Maza',
    cargoAdministrativo: 'Jefe de Unidad Administrativa'
  },
  ubicacion: {
    direccion: 'Av. Miguel Grau – Urb. El Parque Mz. A Lt. 01, Paita Alta, Piura',
    referencia: 'Av. Miguel Grau con Urb. El Parque Mz. A Lt. 01',
    horario: 'Lunes a Viernes de 8:00 a.m. a 1:00 p.m. y de 2:00 p.m. a 4:30 p.m.'
  },
  contacto: {
    telefonoFijo: '(073) 251013',
    celularWhatsApp: '+51 969 100 257',
    correoGeneral: 'ieshercar@ieshercar.edu.pe',
    correoTramites: 'tramitesiestphermanoscarcamo@gmail.com',
    correoSecretaria: 'secretaria@ieshercar.edu.pe'
  },
  bancoNacion: {
    banco: 'Banco de la Nación del Perú',
    titular: 'IESTP Hermanos Cárcamo - Paita',
    cuentaCorriente: '00-631-012948',
    cci: '018-631-000631012948-52'
  }
};

/**
 * Obtiene todos los comunicados combinando los oficiales predeterminados
 * con los comunicados dinámicos publicados desde el Panel Administrativo.
 */
function getInstitutionalAnnouncements() {
  let custom = [];
  try {
    const raw = localStorage.getItem('hercarbot_custom_announcements');
    if (raw) custom = JSON.parse(raw);
  } catch (e) {}
  return [...custom, ...COMUNICADOS_OFICIALES];
}

const CARRERAS_COMPLETAS = [
  {
    id: 'apsti',
    codigo: 'APSTI',
    nombre: 'Arquitectura de Plataformas y Servicios de Tecnologías de la Información',
    nombreCorto: 'APSTI (Computación / Software & TI)',
    duracion: '3 años (6 semestres académicos / 120 créditos)',
    modalidad: 'Presencial - 100% Gratuito',
    titulo: 'Profesional Técnico en Arquitectura de Plataformas y Servicios de Tecnologías de la Información (A Nombre de la Nación)',
    perfilEgreso: 'Especialista en diseño y administración de infraestructura de TI, servidores Linux/Windows, redes de comunicación, desarrollo de software web y móvil, bases de datos SQL/NoSQL y servicios de computación en la nube (Cloud) con ciberseguridad.',
    modulos: [
      {
        modulo: 'Módulo I: Mantenimiento de Equipos, Soporte Técnico y Redes de Cómputo',
        certificacion: 'Certificado Modular I - Especialista en Soporte TI y Redes',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Organización y Arquitectura del Computador', 'Sistemas Operativos Monousuario/Multiusuario', 'Ofimática Profesional Avanzada', 'Lógica y Algoritmos de Programación', 'Comunicación y Redacción Técnica', 'Matemática Aplicada'] },
          { ciclo: 'II Semestre', cursos: ['Mantenimiento y Reparación de Hardware', 'Redes de Datos I (Cableado y TCP/IP)', 'Fundamentos de Bases de Datos', 'Inglés Técnico I', 'Ética Profesional', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Desarrollo de Software y Administración de Bases de Datos',
        certificacion: 'Certificado Modular II - Desarrollador Web y Gestor de BD',
        semestres: [
          { ciclo: 'III Semestre', cursos: ['Modelado de Bases de Datos (MySQL / SQL Server)', 'Programación Orientada a Objetos', 'Desarrollo Web Frontend (HTML5, CSS3, JavaScript, React)', 'Ingeniería de Requerimientos', 'Metodologías Ágiles (Scrum)', 'Inglés Técnico II'] },
          { ciclo: 'IV Semestre', cursos: ['Desarrollo Web Backend (Node.js / Python / PHP)', 'Desarrollo de Aplicaciones Móviles (Android / Flutter)', 'Optimización y Seguridad de Bases de Datos', 'Taller de Programación Empresarial', 'Innovación y Emprendimiento', 'Prácticas Preprofesionales EFSRT II'] }
        ]
      },
      {
        modulo: 'Módulo III: Administración de Plataformas y Servicios Cloud',
        certificacion: 'Certificado Modular III - Administrador de Redes y Servidores Cloud',
        semestres: [
          { ciclo: 'V Semestre', cursos: ['Servidores Linux (Ubuntu / RedHat)', 'Windows Server y Active Directory', 'Ciberseguridad y Auditoría TI', 'Cloud Computing (AWS / Azure / GCP)', 'Enrutamiento y Conmutación de Redes (Cisco CCNA)', 'Proyecto de Innovación I'] },
          { ciclo: 'VI Semestre', cursos: ['Seguridad de la Información y Hacking Ético', 'DevOps y Automatización', 'Gestión de Servicios TI (ITIL)', 'Integración de Plataformas y APIs', 'Proyecto de Titulación II', 'Prácticas Preprofesionales EFSRT III'] }
        ]
      }
    ],
    campoLaboral: [
      'Empresas pesqueras, agroindustriales y terminales portuarios de Paita administrando redes y sistemas',
      'Desarrollador de software web, aplicaciones móviles y bases de datos para empresas privadas y públicas',
      'Administrador de servidores en la nube y soporte de ciberseguridad',
      'Bancos, Cajas de Ahorro (Caja Piura, Caja Sullana) y empresas de telecomunicaciones',
      'Emprendimiento propio en consultoría digital, soporte técnico y desarrollo de software'
    ],
    color: '#0d6efd',
    icono: 'bi-laptop-fill'
  },
  {
    id: 'ani',
    codigo: 'ANI',
    nombre: 'Administración de Negocios Internacionales',
    nombreCorto: 'Negocios Internacionales & Comercio Exterior',
    duracion: '3 años (6 semestres académicos / 120 créditos)',
    modalidad: 'Presencial - 100% Gratuito',
    titulo: 'Profesional Técnico en Administración de Negocios Internacionales (A Nombre de la Nación)',
    perfilEgreso: 'Experto en operaciones de exportación e importación, gestión de agencias de aduanas, logística portuaria y de transporte marítimo en el Puerto de Paita, aranceles, incoterms, financiamiento y negocios globales.',
    modulos: [
      {
        modulo: 'Módulo I: Gestión Comercial y Administrativa de Negocios',
        certificacion: 'Certificado Modular I - Asistente Administrativo Comercial',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Fundamentos de Administración y Gestión Empresarial', 'Marketing Internacional y Ventas', 'Matemática Financiera y Estadística', 'Documentación Mercantil y Contratos', 'Herramientas Digitales para Negocios', 'Comunicación Empresarial'] },
          { ciclo: 'II Semestre', cursos: ['Contabilidad y Costos de Comercio Exterior', 'Comportamiento del Consumidor Global', 'Legislación Comercial y Laboral', 'Inglés Comercial I', 'Gestión del Talento Humano', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Operatividad Aduanera y Comercio Exterior',
        certificacion: 'Certificado Modular II - Especialista en Operaciones de Aduanas',
        semestres: [
          { ciclo: 'III Semestre', cursos: ['Legislación Aduanera y Ley General de Aduanas', 'Nomenclatura y Clasificación Arancelaria', 'Procedimientos Aduaneros de Importación / Exportación (DAM)', 'Incoterms 2020 y Medios de Pago', 'Inteligencia de Mercados Internacionales', 'Inglés de Negocios II'] },
          { ciclo: 'IV Semestre', cursos: ['Valoración Aduanera y Tributación del Comercio Exterior', 'Envases, Embalajes y Rotulado Internacional', 'Seguros y Transporte Multimodal', 'Trámites VUCE (SENASA, SANIPES, DIGESA)', 'Financiamiento y Cartas de Crédito', 'Prácticas Preprofesionales EFSRT II'] }
        ]
      },
      {
        modulo: 'Módulo III: Logística Internacional y Cadena de Suministro',
        certificacion: 'Certificado Modular III - Gestor de Logística Portuaria e Internacional',
        semestres: [
          { ciclo: 'V Semestre', cursos: ['Operatividad Portuaria en Terminales de Paita (TPE)', 'Distribución Física Internacional (DFI) y Cadena de Frío', 'Gestión de Almacenes y Depósitos Aduaneros', 'Planes de Negocios de Exportación I', 'Seguridad en Comercio Exterior (BASC / OEA)', 'Inglés de Negocios III'] },
          { ciclo: 'VI Semestre', cursos: ['Supply Chain Management (Cadena de Suministro)', 'E-Commerce y Negocios Digitales Globales', 'Tratados de Libre Comercio (TLC) y Mercados Emergentes', 'Proyecto de Titulación Internacional II', 'Auditoría en Comercio Exterior', 'Prácticas Preprofesionales EFSRT III'] }
        ]
      }
    ],
    campoLaboral: [
      'Agencias de Aduana y Agencias Marítimas en Paita, Talara y Piura',
      'Terminales Portuarios Euroandinos (TPE Paita) y operadores logísticos (Ransa, Neptunia, Medlog, etc.)',
      'Empresas exportadoras de pota congelada, uva, mango, banano orgánico, café y cacao',
      'Bancos y entidades financieras en áreas de comercio exterior',
      'Creación de empresas exportadoras o importadoras independientes'
    ],
    color: '#198754',
    icono: 'bi-globe-americas'
  },
  {
    id: 'conta',
    codigo: 'CONTA',
    nombre: 'Contabilidad',
    nombreCorto: 'Contabilidad & Tributación SUNAT',
    duracion: '3 años (6 semestres académicos / 120 créditos)',
    modalidad: 'Presencial - 100% Gratuito',
    titulo: 'Profesional Técnico en Contabilidad (A Nombre de la Nación)',
    perfilEgreso: 'Profesional capacitado en formulación de estados financieros, liquidación tributaria ante la SUNAT (IGV, Renta, PDT, SIRE), costos para empresas pesqueras e industriales, planillas electrónicas (PLAME) y auditoría contable.',
    modulos: [
      {
        modulo: 'Módulo I: Procesos Contables y Libros Principales',
        certificacion: 'Certificado Modular I - Asistente Contable y de Registros',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Introducción a la Contabilidad y Plan Contable General Empresarial', 'Documentación Mercantil y Financiera', 'Matemática Financiera y Comercial', 'Ofimática Contable (Excel Intermedio - Avanzado)', 'Legislación Comercial y Societaria', 'Comunicación'] },
          { ciclo: 'II Semestre', cursos: ['Contabilidad General (Libro Diario, Mayor, Inventarios)', 'Libros Auxiliares (Compras, Ventas, Caja y Bancos)', 'Software Contable I (Concar / Siscont)', 'Planillas Electrónicas y Legislación Laboral (PLAME / T-Registro)', 'Ética Contable', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Costos y Aplicaciones Tributarias SUNAT',
        certificacion: 'Certificado Modular II - Especialista Tributario y de Costos',
        semestres: [
          { ciclo: 'III Semestre', cursos: ['Código Tributario y Sistema Tributario Peruano', 'Impuesto General a las Ventas (IGV) e Impuesto Selectivo al Consumo', 'Contabilidad de Costos I (Materia Prima, Mano de Obra, CIF)', 'Costos por Órdenes y por Procesos', 'Facturación Electrónica y Software Contable II', 'Inglés Técnico Contable I'] },
          { ciclo: 'IV Semestre', cursos: ['Impuesto a la Renta (Regímenes MYPE, General, Especial)', 'Contabilidad de Costos en la Industria Pesquera y Agroindustrial', 'Sistema Integrado de Registros Electrónicos (SIRE - SUNAT)', 'Declaraciones Telemáticas y PDTs', 'Finanzas y Presupuesto Empresarial', 'Prácticas Preprofesionales EFSRT II'] }
        ]
      },
      {
        modulo: 'Módulo III: Estados Financieros, Auditoría y SIAF',
        certificacion: 'Certificado Modular III - Analista de Estados Financieros y Auditoría',
        semestres: [
          { ciclo: 'V Semestre', cursos: ['Formulación de Estados Financieros (Balance General, Estado de Resultados)', 'Normas Internacionales de Información Financiera (NIIF)', 'Contabilidad Gubernamental y Sistema SIAF', 'Análisis de Ratios Financieros', 'Auditoría y Control Interno', 'Proyecto de Innovación I'] },
          { ciclo: 'VI Semestre', cursos: ['Auditoría Tributaria y Financiera Avanzada', 'Peritaje Contable y Judicial', 'Contabilidad de Sociedades y Fusiones', 'Seminario de Actualización Tributaria', 'Proyecto de Titulación Contable II', 'Prácticas Preprofesionales EFSRT III'] }
        ]
      }
    ],
    campoLaboral: [
      'Departamentos contables y de finanzas de empresas pesqueras, industriales y comerciales',
      'Estudios contables y asesorías tributarias independientes',
      'Instituciones financieras, bancos y cajas municipales de Paita y Piura',
      'Entidades públicas (Municipalidad de Paita, UGEL, hospitales) manejando el SIAF',
      'Auditoría interna, liquidación de impuestos SUNAT y consultoría'
    ],
    color: '#6f42c1',
    icono: 'bi-calculator-fill'
  },
  {
    id: 'dpa',
    codigo: 'DPA',
    nombre: 'Desarrollo Pesquero y Acuícola',
    nombreCorto: 'Pesquería, Acuicultura & Calidad Marina',
    duracion: '3 años (6 semestres académicos / 120 créditos)',
    modalidad: 'Presencial - 100% Gratuito',
    titulo: 'Profesional Técnico en Desarrollo Pesquero y Acuícola (A Nombre de la Nación)',
    perfilEgreso: 'Carrera líder de Paita. Capacita en extracción pesquera responsable, navegación marítima, cultivo acuícola de concha de abanico, langostinos, trucha y tilapia, control de calidad e inocuidad en plantas congeladoras (HACCP, BPM) y gestión ambiental marina.',
    modulos: [
      {
        modulo: 'Módulo I: Extracción, Navegación y Artes de Pesca',
        certificacion: 'Certificado Modular I - Técnico en Operaciones Pesqueras y Navegación',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Oceanografía, Meteorología y Recursos Marinos de Paita', 'Biología Pesquera y Taxonomía', 'Diseño y Armado de Artes de Pesca (Cerco, Cortina, Arrastre)', 'Navegación Costera, GPS, Radar y Ecosondas', 'Seguridad y Supervivencia en el Mar (Normas OMI/DICAPI)', 'Física Aplicada'] },
          { ciclo: 'II Semestre', cursos: ['Técnicas de Pesca Artesanal e Industrial', 'Manipulación, Conservación y Frío en Embarcación', 'Mantenimiento de Motores Marinos', 'Legislación Pesquera, Vedas y Cuotas (PRODUCE / IMARPE)', 'Preservación del Ecosistema Marino', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Producción Acuícola y Cultivo de Especies',
        certificacion: 'Certificado Modular II - Especialista en Acuicultura Continental y Marina',
        semestres: [
          { ciclo: 'III Semestre', cursos: ['Biología de Especies Cultivables', 'Diseño de Estanques y Jaulas Flotantes', 'Calidad de Agua y Parámetros Físico-Químicos', 'Cultivo de Concha de Abanico en Bahía de Sechura / Paita', 'Cultivo de Langostinos en Estanques', 'Inglés Técnico Pesquero I'] },
          { ciclo: 'IV Semestre', cursos: ['Cultivo de Peces (Tilapia, Trucha, Paiche, Corvina)', 'Nutrición y Dietas Acuícolas', 'Sanidad Acuícola y Control de Patologías', 'Producción de Fitoplancton y Zooplancton (Alimento Vivo)', 'Gestión Económica de Granjas Acuícolas', 'Prácticas Preprofesionales EFSRT II'] }
        ]
      },
      {
        modulo: 'Módulo III: Procesamiento, Calidad HACCP y Gestión Ambiental',
        certificacion: 'Certificado Modular III - Gestor de Calidad en Plantas Pesqueras y Medio Ambiente',
        semestres: [
          { ciclo: 'V Semestre', cursos: ['Tecnología de Congelado de Pota, Pescado y Mariscos', 'Tecnología de Conservas y Enlatados', 'Tecnología de Harina y Aceite de Pescado', 'Microbiología de Alimentos Marinos', 'Buenas Prácticas de Manufactura (BPM) y PHS', 'Proyecto de Innovación Pesquera I'] },
          { ciclo: 'VI Semestre', cursos: ['Sistema de Calidad e Inocuidad HACCP', 'Auditorías Sanitarias (SANIPES, BRC, FDA, IFS)', 'Tratamiento de Efluentes y Residuos Pesqueros', 'Gestión de Impacto Ambiental Marino', 'Proyecto de Titulación Pesquero II', 'Prácticas Preprofesionales EFSRT III'] }
        ]
      }
    ],
    campoLaboral: [
      'Plantas congeladoras, conserveras y harineras de Paita, Sechura, Pisco y Chimbote en control de calidad y producción',
      'Laboratorios de control sanitario e inocuidad hidrobiológica (SANIPES, CERPER, SGS)',
      'Centros de cultivo acuícola de concha de abanico, langostinos y peces marinos',
      'Embarcaciones de pesca artesanal e industrial como oficial o patrón de navegación',
      'Organismos públicos de fiscalización e investigación: IMARPE, PRODUCE, SANIPES, DICAPI'
    ],
    color: '#0dcaf0',
    icono: 'bi-water'
  }
];

const GUIA_TRAMITES_TUPA = [
  {
    id: 'tramite-matricula',
    nombre: 'Matrícula Regular y Ratificación Semestral',
    categoria: 'Académico',
    costo: 'Aprox. S/ 80.00 - S/ 100.00 (Tasa semestral)',
    plazo: 'Inmediato tras validación de Caja',
    requisitos: [
      'Haber aprobado los cursos correlativos (máximo 2 asignaturas a cargo)',
      'Comprobante de depósito en el Banco de la Nación',
      'Ficha de matrícula generada en sistema.ieshercar.edu.pe'
    ],
    pasos: [
      'Depositar en el Banco de la Nación a la Cta. Cte. N° 00-631-012948.',
      'Subir el voucher a https://pagos.ieshercar.edu.pe/.',
      'Esperar la validación de Caja (24 horas).',
      'Ingresar a https://sistema.ieshercar.edu.pe/acceso con tu DNI y seleccionar tus asignaturas.',
      'Descargar tu Ficha Oficial de Matrícula.'
    ]
  },
  {
    id: 'tramite-certificado-modular',
    nombre: 'Certificado Modular (Diploma de Módulo)',
    categoria: 'Certificaciones',
    costo: 'Aprox. S/ 40.00 - S/ 50.00 por módulo',
    plazo: '7 a 10 días hábiles',
    requisitos: [
      'Haber aprobado el 100% de los cursos del Módulo I, II o III',
      'Constancia aprobada de Prácticas Preprofesionales (EFSRT) del módulo',
      'Comprobante de pago validado en el sistema de pagos',
      'FUT dirigido a la Dirección General'
    ],
    pasos: [
      'Solicitar tu récord de notas en Secretaría.',
      'Pagar la tasa en el BN y registrar el voucher en pagos.ieshercar.edu.pe.',
      'Presentar FUT adjuntando constancia de prácticas por Mesa de Partes en sede Paita.',
      'Secretaría emite el Certificado Modular oficial con firma y sello del Director.'
    ]
  },
  {
    id: 'tramite-titulacion',
    nombre: 'Titulación Profesional Técnica',
    categoria: 'Titulación',
    costo: 'Según TUPA institucional',
    plazo: '30 a 45 días (Inscripción en MINEDU)',
    requisitos: [
      'Haber aprobado los 6 semestres (120 créditos)',
      'Tener los 3 Certificados Modulares de tu carrera',
      'Constancia de cumplimiento de Prácticas Preprofesionales (EFSRT)',
      'Constancia de idioma extranjero (Inglés Básico)',
      'Aprobación de la sustentación del Proyecto de Innovación / Plan de Negocios',
      'Constancia de no adeudo a biblioteca ni tesorería'
    ],
    pasos: [
      'Solicitar expediente de egresado en Secretaría General.',
      'Presentar proyecto de innovación ante el coordinador de carrera.',
      'Sustentación pública ante el jurado calificador.',
      'Emisión y registro oficial del Título a Nombre de la Nación ante el MINEDU.'
    ]
  },
  {
    id: 'tramite-carne',
    nombre: 'Carné de Educación Superior (Medio Pasaje)',
    categoria: 'Bienestar',
    costo: 'Aprox. S/ 15.00 - S/ 20.00 (Tasa fijada por MINEDU)',
    plazo: 'Sujeto al cronograma de entrega del MINEDU',
    requisitos: [
      'Estar formalmente matriculado en el semestre lectivo',
      'Fotografía digital tamaño carnet a color con fondo blanco',
      'Comprobante de pago del Banco de la Nación'
    ],
    pasos: [
      'Secretaría publica la convocatoria semestral de carné emitida por el MINEDU.',
      'Realizar el depósito en el BN y registrar el voucher.',
      'Entregar foto digital en secretaría.',
      'Recepción física del carné oficial cuando el MINEDU remite el lote a Paita.'
    ]
  },
  {
    id: 'tramite-constancia-estudios',
    nombre: 'Constancia de Estudios / Notas / Egresado',
    categoria: 'Documentos',
    costo: 'Aprox. S/ 15.00 - S/ 25.00',
    plazo: '2 a 3 días hábiles',
    requisitos: [
      'Estar matriculado o haber cursado ciclos en el instituto',
      'FUT indicando el motivo',
      'Comprobante de pago validado'
    ],
    pasos: [
      'Depositar en el BN y validar en el sistema de pagos.',
      'Presentar solicitud en Mesa de Partes.',
      'Recoger el documento en Secretaría.'
    ]
  }
];

const BASE_PREGUNTAS_RESPUESTAS = [
  {
    id: 'faq-comunicados-todos',
    titulo: 'Comunicados y Avisos Oficiales Recientes',
    keywords: ['comunicado', 'comunicados', 'aviso', 'avisos', 'novedades', 'noticias', 'anuncio', 'anuncios'],
    categorias: ['general'],
    respuesta: `📢 **Principales Comunicados Oficiales del IESTP Hermanos Cárcamo:**

1. 🎯 **Academia CEPRE-HERCAR 2026:** Publicados los resultados finales del cuadro de mérito con ingreso directo. [Ver Resultados en PDF](https://drive.google.com/file/d/1tbEWl2oBRglGp9QWx012TIE66yYBS1VN/view?usp=drive_link)
2. 💳 **Registro de Pagos y Vouchers:** Video instructivo oficial disponible para registrar depósitos del Banco de la Nación en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/). [Ver Video en Drive](https://drive.google.com/file/d/1kYBJhVXOqO7BoQUpMZmYs-1E59gIUV9h/view?usp=sharing)
3. 📝 **Admisión 2026:** Convocatoria abierta para Examen Ordinario y modalidades de exonerados.
4. 🚌 **Carné de Medio Pasaje MINEDU:** Recepción de fotografías digitales en Secretaría para el nuevo periodo lectivo.`
  },
  {
    id: 'faq-resultados-cepre',
    titulo: 'Resultados Finales de la Academia CEPRE-HERCAR',
    keywords: ['resultado', 'resultados', 'cepre', 'cuadro de merito', 'ingresantes', 'lista de ingresantes', 'ingreso directo'],
    categorias: ['admision'],
    respuesta: `🎉 **Resultados de la Academia CEPRE-HERCAR 2026:**
Los resultados oficiales con los ingresantes directos por carrera (APSTI, ANI, Contabilidad y Desarrollo Pesquero y Acuícola) están publicados en el enlace oficial de Google Drive:
📄 [Abrir Documento Oficial de Resultados en Google Drive](https://drive.google.com/file/d/1tbEWl2oBRglGp9QWx012TIE66yYBS1VN/view?usp=drive_link)

Si obtuviste vacante, acércate a Secretaría General en la sede Paita con tu DNI y certificado de estudios para emitir tu constancia de ingreso.`
  },
  {
    id: 'faq-admision',
    titulo: 'Requisitos y Modalidades de Admisión 2026',
    keywords: ['admision', 'ingreso', 'postular', 'requisitos', 'examen', 'inscribirme', 'inscripcion', 'vacantes', 'costo admision', 'carpeta'],
    categorias: ['admision'],
    respuesta: `🎯 **Proceso de Admisión en el IESTP Hermanos Cárcamo:**
Cuenta con 3 modalidades de ingreso oficial:
1. **Examen Ordinario:** Para egresados de secundaria (100 preguntas de Raz. Matemático, Raz. Verbal, Cultura General y Ciencias).
2. **Academia CEPRE-HERCAR:** Ingreso directo por cuadro de mérito en evaluaciones periódicas.
3. **Exonerados:** Para los 2 primeros puestos de secundaria, deportistas calificados IPD, personas con discapacidad (CONADIS) y beneficiarios del PIR.

📋 **Documentos requeridos:**
- Certificado oficial de estudios de 1° a 5° de secundaria.
- Copia simple de DNI vigente.
- Partida de nacimiento original o copia.
- 2 Fotos tamaño carnet a color fondo blanco.
- Voucher de pago del Banco de la Nación validado en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/).`
  },
  {
    id: 'faq-pagos',
    titulo: '¿Cómo registrar y validar vouchers en pagos.ieshercar.edu.pe?',
    keywords: ['pago', 'pagos', 'pagar', 'voucher', 'banco', 'cuenta', 'subir voucher', 'tesoreria', 'banco de la nacion', 'bn', 'plataforma de pagos'],
    categorias: ['pagos'],
    respuesta: `💳 **Guía del Sistema de Registro de Pagos:**
1. **Depósito BN:** Deposita en el Banco de la Nación a la Cuenta Corriente N° **\`00-631-012948\`** (Titular: IESTP Hermanos Cárcamo).
2. **Ingreso:** Entra con tu DNI a [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/).
3. **Registro:** Elige tu carrera (APSTI, ANI, CONTA o DPA) y concepto (Matrícula, Admisión, Certificado, etc.).
4. **Datos:** Digita el número de operación, fecha, monto exacto y sube una foto nítida del comprobante.
5. **Validación:** Caja/Tesorería validará tu pago en un plazo de 24 a 48 horas hábiles.
🎥 [Ver Video Instructivo Oficial en Drive](https://drive.google.com/file/d/1kYBJhVXOqO7BoQUpMZmYs-1E59gIUV9h/view?usp=sharing)`
  },
  {
    id: 'faq-carreras',
    titulo: 'Las 4 Carreras Profesionales Técnicas y Mallas',
    keywords: ['carreras', 'programas', 'duracion', 'ani', 'apsti', 'conta', 'dpa', 'titulo', 'que carreras hay', 'cuales son las carreras', 'estudios'],
    categorias: ['carreras'],
    respuesta: `🎓 **4 Carreras Técnicas (3 Años / 6 Semestres / 120 Créditos):**
1. 💻 **APSTI:** Arquitectura de Plataformas y Servicios TI (Software, Redes, Cloud y Ciberseguridad).
2. 🚢 **ANI:** Administración de Negocios Internacionales (Comercio Exterior, Aduanas y Logística Portuaria).
3. 📊 **CONTA:** Contabilidad (Tributación SUNAT, Costos, Planillas y Auditoría).
4. 🐟 **DPA:** Desarrollo Pesquero y Acuícola (Pesca, Acuicultura de concha de abanico/langostinos y Calidad HACCP).

⭐ **Beneficios:** 100% Gratuitas, Título a Nombre de la Nación y Triple Certificación Modular Progresiva.`
  },
  {
    id: 'faq-plataformas',
    titulo: 'Enlaces Directos a Plataformas y Servicios Virtuales',
    keywords: ['plataforma', 'plataformas', 'aula virtual', 'sistema', 'biblioteca', 'yoleo', 'biblioteca latina', 'enlace', 'links', 'entrar a notas', 'notas'],
    categorias: ['plataformas'],
    respuesta: `🌐 **Portales y Sistemas Oficiales en Vivo:**
* 💻 **Sistema Académico:** [sistema.ieshercar.edu.pe/acceso](https://sistema.ieshercar.edu.pe/acceso) *(Notas y Matrícula)*
* 💳 **Portal de Pagos:** [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) *(Subir comprobantes BN)*
* 📚 **Aula Virtual:** [aula.ieshercar.edu.pe](https://aula.ieshercar.edu.pe/) *(Clases y Tareas)*
* 📖 **Biblioteca Virtual Latina:** [iestphercar.bibliotecalatina.com](https://iestphercar.bibliotecalatina.com/login)
* 🌐 **Web Institucional:** [ieshercar.edu.pe](https://ieshercar.edu.pe/)`
  },
  {
    id: 'faq-contacto',
    titulo: 'Ubicación de la Sede en Paita, Horarios y Teléfonos',
    keywords: ['ubicacion', 'direccion', 'donde queda', 'horario', 'telefono', 'celular', 'paita', 'secretaria', 'atencion', 'como llegar', 'donde estan'],
    categorias: ['general'],
    respuesta: `📍 **Sede Institucional Paita:**
Av. Miguel Grau – Urb. El Parque Mz. A Lt. 01, Parte Alta, Paita, Piura.
⏰ **Horario de Atención:** Lunes a Viernes de 8:00 a.m. a 3:00 p.m. (Horario continuo).
📞 **Teléfono Fijo:** (073) 251013
📱 **Móvil / WhatsApp:** [969 100 257](https://wa.me/51969100257)
✉️ **Correo:** \`ieshercar@ieshercar.edu.pe\`
🗺️ [Ver Ubicación en Google Maps](https://maps.google.com/?q=IESTP+Hermanos+Carcamo+Paita)`
  },
  {
    id: 'faq-gratuidad',
    titulo: '¿Cuánto cuesta la mensualidad o pensión?',
    keywords: ['mensualidad', 'pension', 'cuanto cuesta', 'costo', 'gratis', 'publico', 'cuanto se paga', 'pagar mes'],
    categorias: ['admision'],
    respuesta: `🎓 **Educación Pública sin Mensualidades:**
El **IESTP Hermanos Cárcamo es una institución tecnológica pública** del Estado, dependiente del Ministerio de Educación (MINEDU). 
**¡NO SE PAGAN PENSIONES NI MENSUALIDADES!** 
La formación profesional técnica es pública y no tiene mensualidades. El único abono corresponde a la **tasa administrativa por derecho de matrícula semestral** (aprox. S/. 120.00 por semestre fijado en el TUPA institucional), que incluye carné oficial de medio pasaje, Seguro Integral de Salud (SIS) y servicios académicos.`
  },
  {
    id: 'faq-becas',
    titulo: 'Becas Pronabec y Beneficios Estudiantiles',
    keywords: ['beca', 'becas', 'pronabec', 'beca 18', 'continuidad', 'permanencia', 'apoyo'],
    categorias: ['bienestar'],
    respuesta: `🌟 **Becas y Apoyo Estudiantil:**
Al ser una institución pública de educación superior licenciada, los estudiantes del IESTP Hermanos Cárcamo pueden postular a los programas de becas del Estado a través de PRONABEC:
- **Beca 18:** Para egresados de secundaria con alto rendimiento académico y condición de pobreza o vulnerabilidad.
- **Beca Continuidad:** Para estudiantes que requieren apoyo para culminar sus estudios.
- **Beca Permanencia:** Para talentos destacados durante su formación técnica profesional.`
  },
  {
    id: 'faq-curso-ingles',
    titulo: 'Curso de Idioma Extranjero (Inglés para Titulación)',
    keywords: ['ingles', 'curso de ingles', 'idioma', 'idiomas', 'ingles tecnico', 'certificado de ingles', 'examen de ingles', 'suficiencia', 'titulacion ingles', 'aprender ingles', 'centro de idiomas'],
    categorias: ['academico', 'titulacion'],
    respuesta: `🇬🇧 **Curso de Inglés & Requisito de Idioma Extranjero para Titulación:**

Por disposición de la Ley de Institutos N° 30512 del MINEDU, el dominio de un idioma extranjero (mínimo Nivel Básico A2) es un **requisito obligatorio para obtener el Título Profesional Técnico** en las 4 carreras (APSTI, ANI, CONTA y DPA).

⭐ **Opciones que ofrece el IESTP Hermanos Cárcamo:**
1. 📚 **Curso Modular de Inglés Institucional:** Impartido por el instituto con certificación directa y valor oficial para tu expediente de graduación.
2. 📝 **Examen de Suficiencia o Convalidación:** Si ya estudiaste en un centro de idiomas externo (ICPNA, Británico, etc.), puedes convalidar presentando tu certificado en Mesa de Partes.

💳 **Registro de Pago:**
Se deposita en el Banco de la Nación a la Cta. Cte. N° **\`00-631-012948\`** y se registra el voucher en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/).`
  },
  {
    id: 'faq-autoridades',
    titulo: 'Autoridades y Plana Directiva Institucional',
    keywords: ['director', 'directora', 'autoridades', 'plana docente', 'profesores', 'docentes', 'jefatura', 'secretaria general', 'quien dirige', 'coordinador', 'adolfo zeta'],
    categorias: ['institucional'],
    respuesta: `🏛️ **Plana Directiva y Autoridades del IESTP "Hermanos Cárcamo":**
* **Director General:** **Econ. Adolfo Zeta Pazo** — Lidera la gestión institucional, licenciamiento y vinculación estratégica con el sector productivo de Paita.
* **Jefe de Unidad Académica:** **Lic. Juan García Reto** — Responsable de la planificación curricular, mallas, supervisión pedagógica y titulación.
* **Jefe de Unidad Administrativa:** **CPC Edson Maza** — Gestión administrativa, recursos y presupuesto institucional.
* **Coordinaciones de Carrera:**
  - Coordinación de **APSTI** (Arquitectura de Plataformas y Servicios TI).
  - Coordinación de **ANI** (Administración de Negocios Internacionales).
  - Coordinación de **Contabilidad** (Finanzas y Tributación).
  - Coordinación de **Desarrollo Pesquero y Acuícola** (Acuicultura y Tecnología Pesquera).
* **Secretaría Académica & Mesa de Partes:** Trámites de certificados, matrículas y constancias en Av. Miguel Grau – Urb. El Parque Mz. A Lt. 01, Paita Alta.`
  },
  {
    id: 'faq-historia-mision',
    titulo: 'Historia, Misión, Visión y Valores del Instituto',
    keywords: ['historia', 'mision', 'vision', 'valores', 'lema', 'fundacion', 'que es hercar', 'quienes son los hermanos carcamo', 'resolucion ministerial'],
    categorias: ['institucional'],
    respuesta: `🎓 **IESTP "Hermanos Cárcamo" - Paita, Piura:**
* **Creación Legal:** Creado mediante la **Resolución Ministerial N.° 232-87-ED** (09 de mayo de 1987) y revalidado con la **Resolución Directoral N.° 0528-2006-ED**. Cuenta con más de 38 años de trayectoria formando profesionales técnicos.
* **Lema Oficial:** *"Formando Profesionales y Construyendo Oportunidades"*.
* **Identidad Paiteña:** Lleva el nombre de los ilustres hermanos marinos próceres paiteños que forman parte del legado heroico y marítimo de la provincia de Paita.
* 🎯 **Misión Institucional:** "Institución educativa de nivel superior que forma profesionales técnicos competitivos, íntegros, con sentido crítico y social, que responden a las demandas del contexto local, regional, nacional y global, contribuyendo a la mejora de la calidad y desarrollo de nuestra sociedad, con valores, inclusión y sostenibilidad ambiental."
* 👁️ **Visión al 2032:** "Al 2032, ser una institución educativa licenciada, líder en la formación tecnológica integral, con programas de estudio que responden a los desafíos de la sociedad, promoviendo la calidad educativa, inclusión, medio ambiente, emprendimiento, innovación, relacionando la oferta formativa con la demanda laboral, en un contexto local, regional, nacional y global."
* 💎 **Valores Institucionales:** Puntualidad, Honestidad, Respeto, Trabajo en Equipo, Compromiso y Ética.`
  },
  {
    id: 'faq-reglamento-desaprobados',
    titulo: 'Reglamento Académico: ¿Qué pasa si desapruebo un curso?',
    keywords: ['jalar', 'jale', 'desaprobar', 'reprobar', 'desaprobe', 'curso a cargo', 'subsanacion', 'recuperacion', 'inasistencias', 'reglamento', 'nota minima', 'escala vigesimal'],
    categorias: ['academico'],
    respuesta: `📖 **Reglamento Académico y Evaluación de Aprendizajes (MINEDU):**
* 💯 **Escala de Calificación:** La escala es vigesimal (0 a 20). La **nota mínima aprobatoria es 13 (trece)**. Las fracciones de 0.5 o más se redondean al entero superior inmediato.
* ⚠️ **Cursos a Cargo (Desaprobados):**
  - Un estudiante puede matricularse en el ciclo siguiente con un **máximo de 2 unidades didácticas (cursos) a cargo**.
  - Si desaprueba 3 o más cursos, no podrá avanzar de ciclo y deberá repetir los cursos desaprobados en el siguiente periodo lectivo.
* 📝 **Semana de Recuperación y Subsanación:** Al finalizar cada semestre lectivo se programa una evaluación de recuperación para estudiantes con promedios entre 10 y 12.
* ⏰ **Inasistencias:** El límite máximo de inasistencias injustificadas es el **30% del total de horas** de la asignatura; superarlo genera inhabilitación (DPI).`
  },
  {
    id: 'faq-turnos-horarios',
    titulo: 'Turnos y Horarios de Clases',
    keywords: ['turno', 'turnos', 'horario de clases', 'a que hora estudio', 'manana', 'tarde', 'noche', 'asistencia', 'clases'],
    categorias: ['academico'],
    respuesta: `⏰ **Horarios y Turnos de Formación Académica:**
* ☀️ **Turno Diurno (Mañana):**
  - Horario regular de clases: **8:00 a.m. a 1:15 p.m.** (Lunes a Viernes).
  - Aplica para los programas de APSTI, ANI, Contabilidad y Desarrollo Pesquero y Acuícola.
* 🌤️ **Turno Tarde / Vespertino:**
  - Habilitado según disponibilidad de talleres de cómputo, laboratorios de redes y plantas piloto.
* 📍 **Modalidad:** Presencial con soporte de clases grabadas y material complementario en el [Aula Virtual Institucional](https://aula.ieshercar.edu.pe/).`
  },
  {
    id: 'faq-convalidacion',
    titulo: 'Convalidación de Cursos y Traslados de Matrícula',
    keywords: ['convalida', 'convalidacion', 'traslado', 'traslado externo', 'traslado interno', 'otra universidad', 'otro instituto', 'cambio de carrera'],
    categorias: ['tramites'],
    respuesta: `🔄 **Proceso de Convalidación y Traslados:**
* **Traslado Externo:** Si provienes de otra universidad o instituto público/privado con carreras afines, debes presentar:
  1. Certificado oficial de estudios visado por la institución de origen.
  2. Sílabos visados de los cursos a convalidar.
  3. FUT de solicitud por Mesa de Partes en la sede Paita.
* **Porcentaje de Coincidencia:** Se convalida cuando el contenido del sílabo coincide en un mínimo del **70% al 80%** de competencias y créditos.
* **Traslado Interno:** Cambio entre programas del IESTP Hermanos Cárcamo (sujeto a vacantes disponibles al inicio del semestre).`
  },
  {
    id: 'faq-bienestar',
    titulo: 'Bienestar Estudiantil, Seguro SIS y Servicios al Alumno',
    keywords: ['bienestar', 'seguro', 'sis', 'topico', 'salud', 'deportes', 'cultural', 'psicologia', 'atencion medica'],
    categorias: ['bienestar'],
    respuesta: `🏥 **Servicios de Bienestar Estudiantil HERCAR:**
* 🩺 **Seguro Integral de Salud (SIS):** Como estudiante de educación superior pública, tienes derecho a afiliación y atención gratuita a través del Seguro Integral de Salud (SIS Gratuito).
* 🩹 **Tópico de Primeros Auxilios:** Atención inmediata ante emergencias de salud dentro de la sede institucional.
* ⚽ **Talleres y Deportes:** Campeonatos inter-carreras de fulbito, vóley, danzas folclóricas y participación en aniversarios de Paita.
* 🤝 **Consejería y Tutoría:** Cada aula cuenta con un docente tutor para acompañamiento psicopedagógico y prevención de deserción escolar.`
  },
  {
    id: 'faq-matricula-paso-a-paso',
    titulo: 'Paso a Paso de Matrícula y Pagos: ¿Qué pago, dónde voy y qué hago?',
    keywords: ['matricula', 'paso a paso', 'que pago', 'donde voy', 'que hago', 'como matricularme', 'proceso matricula', 'pago matricula', 'donde pagar', 'voucher matricula', 'donde registrar', 'cuanto pago'],
    categorias: ['pagos', 'tramites'],
    respuesta: `📋 **Guía Completa y Paso a Paso para Tu Matrícula en el IESTP Hermanos Cárcamo:**

1️⃣ **¿QUÉ PAGO Y CUÁNTO ES?**
* La enseñanza en el instituto es **100% GRATUITA** (sin pensiones mensuales por ser instituto público).
* Solo se abona la tasa administrativa por concepto de **Derecho de Matrícula Semestral** (aprox. **S/. 120.00** según TUPA vigente, que cubre carné de medio pasaje y seguro estudiantil).

2️⃣ **¿DÓNDE PAGO?**
* **Banco de la Nación:** En ventanilla, Agente MultiRed de Paita/Piura o por la app **Págalo.pe**.
* **Cuenta Corriente Oficial:** N° **\`00-631-012948\`** a nombre del *IESTP Hermanos Cárcamo*.
* *(Conserva el voucher original físico en perfecto estado; no lo dobles ni manches).*

3️⃣ **¿QUÉ HAGO INMEDIATAMENTE DESPUÉS DE PAGAR?**
* Tómale una foto nítida y legible con tu celular o escanéalo en formato PDF/JPG.
* Asegúrate de que se vean claramente: **Número de Operación**, **Fecha**, **Hora** e **Importe depositado**.

4️⃣ **¿A DÓNDE VOY O DÓNDE LO REGISTRO?**
* **Opción Online (Recomendada):** Entra al portal [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/), selecciona el trámite "Matrícula", ingresa tu DNI, los datos del voucher y sube la foto.
* **Opción Presencial:** Acércate a la **Oficina de Tesorería / Secretaría Académica** en el campus central (Av. Víctor Raúl Haya de la Torre s/n, Paita Alta) de Lunes a Viernes de 8:00 a.m. a 1:00 p.m.

5️⃣ **¿CÓMO SÉ QUE YA ESTOY MATRICULADO?**
* Secretaría valida tu pago en un plazo de **24 a 48 horas hábiles**.
* Te emiten tu **Ficha de Matrícula Oficial** y se te activan los accesos al [Sistema Académico](https://sistema.ieshercar.edu.pe/acceso) y al [Aula Virtual](https://aula.ieshercar.edu.pe/).`
  },
  {
    id: 'faq-que-hago-despues-de-pagar',
    titulo: '¿Qué hago después de pagar en el Banco de la Nación? (Dónde ir y qué presentar)',
    keywords: ['despues de pagar', 'ya pague', 'donde llevo el voucher', 'que hago con el voucher', 'subir voucher', 'validar voucher', 'donde ir', 'oficina pagos', 'caja'],
    categorias: ['pagos'],
    respuesta: `🧾 **¿Ya pagaste en el Banco de la Nación? Sigue estos 3 pasos obligatorios:**

1. **Fotografía el Voucher:** Toma una foto nítida donde se lea el N° de Operación del Banco de la Nación (Cta. Cte. \`00-631-012948\`).
2. **Regístralo en la Plataforma:** Ingresa a [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) y completa los campos de DNI, fecha, hora, monto y archivo de imagen.
3. **Confirmación en Secretaría:** Si el trámite requiere entrega de expediente físico (como titulación o carné), acércate con el voucher original a la Secretaría General del campus en Paita Alta. En 24 a 48 horas recibirás la constancia oficial.`
  },
  {
    id: 'faq-ingles-titulacion-minedu',
    titulo: 'Curso de Inglés Institucional: Requisito Obligatorio de Titulación MINEDU',
    keywords: ['ingles', 'idioma', 'curso de ingles', 'titulacion ingles', 'minedu ingles', 'nivel a2', 'convalidar ingles', 'donde estudiar ingles', 'ingles obligatorio'],
    categorias: ['academico', 'tramites'],
    respuesta: `🌐 **Reglamento del Curso de Idioma Extranjero (Inglés):**

* **¿Es Obligatorio?** **SÍ.** De acuerdo a la **Ley de Institutos N° 30512** y los lineamientos académicos del MINEDU, todo estudiante de educación superior tecnológica debe acreditar el **Nivel Básico A2 concluido** para tramitar su **Título Profesional Técnico a Nombre de la Nación**.
* **¿Dónde se estudia?**
  1. **En el IESTP Hermanos Cárcamo:** El instituto dicta los módulos de inglés técnico y talleres de idiomas orientados a las carreras (APSTI, Negocios, Contabilidad y Pesquería).
  2. **Semi-presencial y Virtual:** Clases flexibles diseñadas para que los estudiantes cumplan las 120 horas lectivas requeridas.
* **¿Se puede convalidar si ya estudié inglés?**
  - **SÍ.** Si cuentas con certificado o constancia de nivel básico concluido emitido por un Centro de Idiomas universitario o instituto reconocido (ej. ICPNA, Británico, UNP), preséntalo por **Mesa de Partes** con un FUT solicitando la convalidación oficial.
* **¿A dónde acudir por consultas?**
  - A la **Jefatura de Unidad Académica** o **Secretaría General** en el campus central de Paita Alta.`
  },
  {
    id: 'faq-limite-edad',
    titulo: '¿Hay límite de edad para postular o estudiar en el instituto?',
    keywords: ['edad', 'limite de edad', 'edad maxima', 'edad minima', 'tengo 30', 'tengo 40', 'tengo 50', 'puedo estudiar si soy mayor', 'hasta que edad', 'edad para postular'],
    categorias: ['admision', 'general'],
    respuesta: `🎉 **¡NO HAY LÍMITE DE EDAD PARA ESTUDIAR!**

En el **IESTP "Hermanos Cárcamo" de Paita**, la educación pública es inclusiva y para todos:
* **Requisito único de estudios:** Haber culminado la educación secundaria completa (de 1° a 5° año) en cualquier colegio del Perú o convalidación extranjera.
* **Sin importar tu edad:** Si tienes 17, 25, 40 o más de 50 años, tienes exactamente el mismo derecho a postular, ingresar y titularte como Profesional Técnico a Nombre de la Nación.
* **Adultos que trabajan:** Muchos de nuestros alumnos son personas que trabajan en el puerto, plantas pesqueras o mypes y buscan superarse con un título oficial gratuito.`
  },
  {
    id: 'faq-uniforme-vestimenta',
    titulo: '¿Se usa uniforme institucional o cómo es la vestimenta?',
    keywords: ['uniforme', 'vestimenta', 'ropa', 'como ir vestido', 'mandil', 'chaleco', 'camisa', 'codigo de vestimenta'],
    categorias: ['academico', 'general'],
    respuesta: `👕 **Uso de Uniforme y Vestimenta en el Campus:**

* **Para Clases Teóricas:** Ropa casual formal y decorosa (pantalón, polo o camisa, calzado cerrado). No se permite el ingreso con sandalias playeras ni shorts por normas de seguridad en talleres.
* **Uniforme Institucional:** Se utiliza en ceremonias oficiales, izamientos, desfiles cívicos y visitas técnicas a empresas (camisa/blusa institucional con el logo bordado del IESTP Hermanos Cárcamo y pantalón de vestir).
* **Talleres y Laboratorios Especializados:**
  - 💻 **APSTI:** Polo institucional y calzado dieléctrico para mantenimiento de computadoras y cableado estructurado.
  - 🐟 **Desarrollo Pesquero y Acuícola:** Mandil blanco o mameluco de trabajo, botas impermeables y gorro protector para plantas piloto y laboratorios de calidad marina.
  - 🚢 **Negocios y Contabilidad:** Presentación ejecutiva para sustentaciones y ferias empresariales.`
  },
  {
    id: 'faq-trabajar-y-estudiar',
    titulo: '¿Puedo trabajar y estudiar al mismo tiempo en el instituto?',
    keywords: ['trabajar y estudiar', 'puedo trabajar', 'estudio y trabajo', 'chamba y estudio', 'trabajo y quiero estudiar', 'horarios para trabajar'],
    categorias: ['academico', 'bienestar'],
    respuesta: `💼 **¡SÍ, ES TOTALMENTE COMPATIBLE!**

El IESTP Hermanos Cárcamo brinda facilidades para que los estudiantes puedan generar ingresos y formarse profesionalmente:
* ⏰ **Turno Diurno Fijo:** Las clases presenciales se desarrollan en las mañanas de **8:00 a.m. a 1:15 p.m.**, dejándote las tardes y noches libres para trabajar.
* 📚 **Aula Virtual 24/7:** Las grabaciones de sesiones, materiales, lecturas y tareas están disponibles en [aula.ieshercar.edu.pe](https://aula.ieshercar.edu.pe/) a cualquier hora.
* 🤝 **Convalidación de tu Trabajo como Prácticas (EFSRT):** Si trabajas en un puesto afín a tu carrera (ej. en una agencia de aduanas, empresa pesquera, estudio contable o soporte técnico), ¡puedes convalidar tus horas de trabajo como tus Prácticas Preprofesionales oficiales!`
  },
  {
    id: 'faq-sueldos-empleabilidad',
    titulo: '¿Cuánto gana un egresado técnico y cuál es la demanda laboral en Paita?',
    keywords: ['cuanto gana', 'sueldo', 'salario', 'cuanto pagan', 'remuneracion', 'empleabilidad', 'cuanto voy a ganar', 'chamba', 'bolsa de trabajo sueldos'],
    categorias: ['carreras', 'bolsa_trabajo'],
    respuesta: `💰 **Estimación Salarial y Demanda Laboral en Paita y Piura:**

Por la cercanía al **Puerto de Paita (TPE)**, plantas congeladoras, agencias marítimas y sector agroindustrial, los profesionales técnicos del IESTP Hermanos Cárcamo tienen alta demanda:

1. 💻 **APSTI (Sistemas / TI / Redes):**
   * *Practicante / Asistente inicial:* S/. 1,025 a S/. 1,500 mensuales.
   * *Técnico Especialista en Servidores, Redes o Software:* **S/. 2,200 a S/. 4,500+** (posibilidad de trabajo remoto para Lima y el extranjero).
2. 🚢 **Negocios Internacionales (ANI):**
   * *Asistente de Aduanas / Operaciones Portuarias:* S/. 1,300 a S/. 2,000.
   * *Coordinador de Exportaciones / Despachador de Aduana Oficial:* **S/. 2,500 a S/. 5,000+**.
3. 📊 **Contabilidad:**
   * *Asistente Contable / Facturación SUNAT:* S/. 1,200 a S/. 1,800.
   * *Analista de Costos Pesqueros / Tributario:* **S/. 2,000 a S/. 4,000+** (más ingresos por asesorías contables independientes a mypes).
4. 🐟 **Desarrollo Pesquero y Acuícola (DPA):**
   * *Inspector de Calidad Junior:* S/. 1,400 a S/. 2,200.
   * *Jefe de Aseguramiento de Calidad HACCP / Supervisor Acuícola:* **S/. 2,800 a S/. 6,000+** en plantas exportadoras de pota y langostino.`
  },
  {
    id: 'faq-recuperar-contrasena',
    titulo: '¿Cómo recupero mi clave del Sistema Académico o Aula Virtual?',
    keywords: ['olvide mi clave', 'perdi mi contrasena', 'recuperar clave', 'no puedo entrar al aula', 'no puedo entrar al sistema', 'acceso bloqueado', 'cambiar clave', 'reseteo de clave'],
    categorias: ['plataformas', 'academico'],
    respuesta: `🔑 **Recuperación de Claves y Accesos Institucionales:**

Si olvidaste o bloqueaste tu contraseña de las plataformas del instituto:
1. 💻 **Sistema Académico (sistema.ieshercar.edu.pe):**
   * Tu usuario es tu **número de DNI**.
   * Si es tu primer ingreso o se reseteó, la clave predeterminada suele ser tu DNI o la asignada en tu Ficha de Matrícula.
   * Si no ingresa, envía un mensaje al WhatsApp de Secretaría o a Mesa de Partes Virtual solicitando *"Reseteo de contraseña del Sistema Académico"* adjuntando foto de tu DNI.
2. 📚 **Aula Virtual (aula.ieshercar.edu.pe):**
   * Haz clic en el enlace *"¿Olvidó su nombre de usuario o contraseña?"* en la pantalla de acceso.
   * Escribe tu correo electrónico registrado para recibir el enlace de cambio.
3. 📱 **Atención inmediata:** Escribe por WhatsApp al **+51 969 100 257** de Lunes a Viernes de 8:00 a.m. a 1:00 p.m.`
  },
  {
    id: 'faq-justificar-inasistencias',
    titulo: '¿Cómo y en qué plazo se justifican las inasistencias a clases?',
    keywords: ['justificar falta', 'justificar inasistencia', 'falte a clases', 'estoy enfermo', 'justificante', 'certificado medico', 'plazo justificar', 'no desaprobar por falta'],
    categorias: ['academico', 'reglamento'],
    respuesta: `📝 **Procedimiento de Justificación de Inasistencias:**

Para evitar superar el límite del 30% de inasistencias y quedar en condición de **DPI (Desaprobado por Inasistencias)**:
* ⏰ **Plazo Máximo:** Tienes hasta **5 días hábiles** contados desde el día de la falta para presentar tu justificación.
* 📄 **Documentos a Presentar:**
  - **Por Salud:** Certificado médico de ESSALUD, MINSA, posta médica o clínica particular con sello del médico tratante.
  - **Por Trabajo / Fuerza Mayor:** Constancia laboral timbrada por la empresa o documento que sustente la emergencia.
* 📍 **¿Dónde se entrega?**
  - Presenta un FUT (Formulario Único de Trámite) en la **Secretaría Académica** o por la [Mesa de Partes Virtual](https://ieshercar.edu.pe/registro-tramite/) dirigido a la Jefatura de Unidad Académica.`
  },
  {
    id: 'faq-efsrt-practicas-horas',
    titulo: 'Prácticas Preprofesionales (EFSRT): Horas, requisitos y convalidación',
    keywords: ['practicas', 'efsrt', 'horas de practicas', 'cuantas horas', 'carta de presentacion', 'informe de practicas', 'donde hacer practicas', 'experiencias formativas'],
    categorias: ['academico', 'tramites'],
    respuesta: `🏢 **Guía de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT):**

Las EFSRT son obligatorias para obtener los Certificados Modulares y el Título Profesional Técnico:
* ⏱️ **Total de Horas:** Se deben cumplir **820 horas en total** divididas progresivamente en los 3 módulos:
  - **Módulo I:** 240 a 260 horas lectivas.
  - **Módulo II:** 280 horas lectivas.
  - **Módulo III:** 300 horas lectivas.
* 📋 **Paso a Paso:**
  1. Solicita tu **Carta de Presentación** en Secretaría General indicando el nombre de la empresa aliada en Paita o Piura.
  2. Desarrolla tus actividades bajo el Plan de Prácticas autorizado por tu Coordinador de Carrera.
  3. Al terminar, la empresa emite tu **Constancia de Prácticas** con evaluación de desempeño.
  4. Presentas tu **Informe Final de EFSRT** para aprobación y emisión de tu Certificado Modular.`
  },
  {
    id: 'faq-como-titularme',
    titulo: '¿Cómo obtener el Título Profesional Técnico a Nombre de la Nación?',
    keywords: ['como me titulo', 'titulacion', 'requisitos para titularme', 'tesis', 'plan de negocios', 'examen de suficiencia', 'tramite de titulo', 'titulo a nombre de la nacion'],
    categorias: ['titulacion', 'academico'],
    respuesta: `🎓 **Requisitos y Modalidades para la Titulación Profesional Técnica:**

El IESTP Hermanos Cárcamo emite Títulos Oficiales registrados ante el **MINEDU**:
* 📌 **Requisitos Obligatorios:**
  1. Haber aprobado los **120 créditos académicos** de los 6 semestres.
  2. Contar con los **3 Certificados Modulares** correspondientes a tu carrera.
  3. Haber culminado y sustentado las **820 horas de Prácticas EFSRT**.
  4. Constancia de dominio de **Idioma Extranjero (Inglés Básico A2)**.
  5. Constancia de no adeudo de libros (Biblioteca) ni tasas administrativas (Tesorería).
* 🏆 **Modalidades de Titulación:**
  * **Proyecto de Innovación / Investigación Aplicada:** Desarrollo de un software, producto hidrobiológico innovador o plan logístico para Paita.
  * **Plan de Negocios de Exportación / Emprendimiento:** Modelo de negocio rentable evaluado por jurado docente.
  * **Examen de Suficiencia Profesional:** Evaluación teórica-práctica de competencias de la carrera.`
  },
  {
    id: 'faq-como-llegar-paita',
    titulo: '¿Cómo llegar al IESTP Hermanos Cárcamo en Paita Alta?',
    keywords: ['como llegar', 'donde queda el instituto', 'direccion exacta', 'colectivo', 'combi', 'desde piura', 'desde sullana', 'transporte paita', 'paradero'],
    categorias: ['contacto', 'general'],
    respuesta: `📍 **Ubicación y Guía de Transporte para Llegar al Campus:**

* 📌 **Dirección:** Av. Miguel Grau – Urb. El Parque Mz. A Lt. 01, Paita Alta, Piura.
* 🚗 **Cómo llegar según tu lugar de origen:**
  - **Desde Paita Baja (Puerto / Centro):** Toma los colectivos o mototaxis que suben por la Av. Miguel Grau hacia Paita Alta; bajarse en la entrada de la Urb. El Parque (referencia: IESTP Hermanos Cárcamo).
  - **Desde Piura:** Toma los buses o autos colectivos en el Terminal de Piura hacia Paita (buses Dora, EPPO u otros colectivos). Bajar en el paradero de Paita Alta antes de descender al puerto.
  - **Desde Sullana:** Toma el transporte directo Sullana - Paita y desciende en el cruce de Paita Alta.
* 🗺️ [Abrir Ubicación en Google Maps](https://maps.google.com/?q=IESTP+Hermanos+Carcamo+Paita)`
  },
  {
    id: 'faq-diferencia-cepre-ordinario',
    titulo: 'Diferencias entre la Academia CEPRE-HERCAR y el Examen Ordinario',
    keywords: ['diferencia cepre ordinario', 'cepre o examen', 'que es cepre', 'ingreso directo', 'examen ordinario', 'cual conviene mas'],
    categorias: ['admision'],
    respuesta: `⚖️ **Comparativa: Academia CEPRE vs. Examen Ordinario:**

* 🏆 **Academia CEPRE-HERCAR:**
  - **Modalidad:** Ciclo intensivo de preparación pre-académica (de enero a marzo).
  - **Ventaja principal:** **INGRESO DIRECTO** sin rendir el examen general de admisión, para quienes alcancen los mejores puestos en las evaluaciones continuas quincenales.
  - **Para quién es:** Recomendado para estudiantes que quieren nivelar matemáticas, lenguaje y ciencias antes de empezar la carrera.
* 📝 **Examen Ordinario de Admisión:**
  - **Modalidad:** Examen único general de 100 preguntas de opción múltiple.
  - **Ventaja principal:** Es una evaluación de un solo día para quienes ya tienen preparación secundaria completa.
  - **Ambas opciones otorgan la misma vacante 100% gratuita para cualquiera de las 4 carreras.**`
  },
  {
    id: 'faq-carnet-pasaje-beneficios',
    titulo: 'Carné de Educación Superior MINEDU: Derechos del Medio Pasaje',
    keywords: ['carnet', 'carne', 'medio pasaje', 'pasaje escolar', 'ley 26271', 'cuanto pago en combi', 'cuanto dura el carne'],
    categorias: ['bienestar', 'tramites'],
    respuesta: `🚌 **Derecho de Medio Pasaje con el Carné Oficial MINEDU:**

* 📜 **Amparo Legal:** Regulado por la **Ley N° 26271**, que establece que los estudiantes de educación superior universitaria y técnica pagan un **máximo del 50% de la tarifa del pasaje adulto**.
* ⏰ **Vigencia y Horario:** Válido los 7 días de la semana (Lunes a Domingo) de **5:00 a.m. a 12:00 de la medianoche** en transporte urbano e interurbano (Paita - Sullana - Piura).
* 📋 **Requisitos para solicitarlo:** Estar matriculado formalmente en el semestre vigente, foto digital formal a color fondo blanco y voucher de pago de la tasa oficial fijada por el MINEDU (aprox. S/ 15 a S/ 20).`
  },
  {
    id: 'faq-computadoras-laboratorios',
    titulo: 'Infraestructura, Talleres de Cómputo, Laboratorios y Wifi',
    keywords: ['laboratorios', 'computadoras', 'taller de computo', 'wifi', 'internet', 'aulas', 'equipamiento', 'plantas piloto', 'equipos'],
    categorias: ['institucional', 'academico'],
    respuesta: `🖥️ **Infraestructura y Equipamiento Tecnológico del IESTP Hermanos Cárcamo:**

El campus de Paita Alta cuenta con ambientes diseñados para el aprendizaje práctico:
* 💻 **Centros de Cómputo de APSTI:** Computadoras actualizadas con software de desarrollo (Visual Studio Code, Python, Node.js, Packet Tracer, Android Studio, servidores Linux y Windows Server).
* 🌐 **Conectividad:** Red de fibra óptica y zonas de wifi estudiantil para investigación y acceso al Aula Virtual.
* 🐟 **Plantas Piloto y Laboratorio de Pesquería y Acuicultura:** Módulos de cultivo acuícola, tinas de prueba biológica, equipos de medición físico-química de agua y taller de armado de artes de pesca.
* 📊 **Aulas Climatizadas y Talleres Contables:** Equipadas con software contable profesional (Concar, Siscont, hojas electrónicas de cálculo avanzado y simuladores SUNAT).`
  },
  {
    id: 'faq-convalidacion-universidades',
    titulo: 'Convenios de Articulación y Convalidación con Universidades',
    keywords: ['convalidacion universitaria', 'convalidar con universidad', 'seguir estudios', 'ingenieria', 'licenciatura', 'bachiller', 'continuar estudios', 'universidades con convenio'],
    categorias: ['carreras', 'institucional'],
    respuesta: `🎓 **¡Continúa tus Estudios Universitarios tras Egresar!**

Gracias a la Ley de Institutos N° 30512, los egresados titulados del IESTP Hermanos Cárcamo pueden convalidar sus 3 años de carrera técnica para obtener su grado universitario:
* 🚀 **Equivalencias Directas:**
  - **APSTI** ➡️ Convalida con **Ingeniería de Sistemas, Informática o Software**.
  - **ANI** ➡️ Convalida con **Administración de Empresas o Comercio Exterior**.
  - **Contabilidad** ➡️ Convalida con **Contabilidad y Finanzas / Auditoría**.
  - **Desarrollo Pesquero** ➡️ Convalida con **Ingeniería Pesquera o Acuícola**.
* 🏛️ **Opciones de Articulación:** Convenios y modalidades de traslado para graduados en universidades públicas y privadas de la región Piura y nacionales (modalidades para gente que trabaja o programas de complementación).`
  },
  {
    id: 'faq-pagos-digitales-yape-pagalo',
    titulo: '¿Cómo pagar con Págalo.pe, Yape, Transferencia Bancaria (CCI) o Agentes?',
    keywords: ['yape', 'plin', 'pagalo.pe', 'pagalo', 'transferencia', 'cci', 'interbancario', 'agente multired', 'bcp a banco de la nacion', 'como pagar sin ir al banco'],
    categorias: ['pagos'],
    respuesta: `💳 **Métodos de Pago Digitales y Sin Hacer Colas:**

Para mayor comodidad de los estudiantes y postulantes de Paita y Piura, existen múltiples formas de abonar a la cuenta oficial del instituto:

1. 📱 **App y Web Págalo.pe (Banco de la Nación):**
   * Ingresa a [pagalo.pe](https://pagalo.pe/) desde tu celular o computadora.
   * Regístrate y busca el concepto o paga con tarjeta de débito/crédito **Visa, Mastercard o American Express** de cualquier banco.
   * Descarga la constancia en PDF y súbela a [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/).

2. 🏦 **Transferencia Interbancaria (Desde BCP, BBVA, Interbank o Scotiabank):**
   * **Código de Cuenta Interbancario (CCI):** \`018-631-000631012948-52\`
   * **Titular:** IESTP Hermanos Cárcamo
   * *Importante:* Guarda la captura donde figure la operación exitosa y el número de transferencia.

3. 🏪 **Agentes MultiRed en Paita y Alrededores:**
   * Hay más de 30 agentes en Paita Alta, Paita Baja, Pueblo Nuevo y Miraflores.
   * Solo brinda el número de Cuenta Corriente: **\`00-631-012948\`** y tu DNI.

4. 📲 **¿Se puede pagar con Yape o Plin?**
   * **Sí, mediante transferencia interbancaria:** Utiliza la opción *"Transferir a otros bancos"* en Yape o Plin e ingresa el CCI oficial (\`018-631-000631012948-52\`).`
  },
  {
    id: 'faq-croquis-campus-ambientes',
    titulo: 'Distribución y Croquis de Ambientes del Campus en Paita Alta',
    keywords: ['mapa del campus', 'croquis', 'ambientes', 'donde queda direccion', 'donde queda secretaria', 'donde queda el laboratorio', 'pabellones', 'aulas'],
    categorias: ['institucional', 'contacto'],
    respuesta: `🗺️ **Distribución de Pabellones y Espacios del IESTP Hermanos Cárcamo:**

El campus institucional en Paita Alta está organizado en las siguientes zonas:
* 🏛️ **Pabellón Administrativo (Ingreso Principal):** Dirección General, Jefatura de Unidad Académica, Secretaría General, Mesa de Partes y Ventanilla de Caja.
* 💻 **Pabellón Tecnológico (APSTI):** Laboratorios de Cómputo 1, 2 y 3 equipados con internet de alta velocidad, fibra óptica y taller de ensamblaje/redes.
* 🚢 **Pabellón de Negocios y Finanzas:** Aulas climatizadas de Contabilidad y Administración de Negocios Internacionales.
* 🐟 **Pabellón de Tecnología Marina (DPA):** Planta Piloto Pesquera, Laboratorio de Análisis de Calidad e Inocuidad HACCP y taller de artes de pesca.
* 📚 **Centro de Recursos de Aprendizaje:** Biblioteca física y acceso a la Biblioteca Virtual Latina.
* 🏥 **Unidad de Bienestar:** Tópico médico de atención gratuita SIS, departamento psicopedagógico, cafetín y losa polideportiva multiusos.`
  },
  {
    id: 'faq-calendario-2026-cronograma',
    titulo: 'Calendario Académico y Fechas Clave del Año 2026',
    keywords: ['calendario 2026', 'cronograma 2026', 'inicio de clases', 'cuando empiezan las clases', 'cuando terminan las clases', 'feriados', 'semana tecnica', 'aniversario'],
    categorias: ['academico', 'institucional'],
    respuesta: `📅 **Calendario Académico y Fechas Oficiales 2026:**

* 🚀 **Semestre Académico 2026-I:**
  - **Matrícula Regular:** Del 03 al 21 de Marzo de 2026.
  - **Matrícula Extemporánea:** Del 24 al 28 de Marzo de 2026.
  - **Inicio de Clases Lectivas:** **Lunes 31 de Marzo de 2026**.
  - **39° Aniversario Institucional:** **09 de Mayo de 2026** (Desfile cívico, sesión solemne y feria de proyectos).
  - **Evaluaciones de Medio Ciclo:** Del 26 al 30 de Mayo de 2026 (Semana 9).
  - **Cierre de Semestre y Evaluaciones Finales:** Finales de Julio de 2026.
  - **Semana de Recuperación / Subsanación:** Primera semana de Agosto de 2026.

* 🍂 **Semestre Académico 2026-II:**
  - **Inicio de Clases:** Mediados de Agosto de 2026.
  - **Semana de la Educación Técnico-Productiva:** Septiembre 2026.
  - **Clausura del Año Académico:** Diciembre 2026.`
  },
  {
    id: 'faq-certificados-secundaria-digital',
    titulo: '¿Cómo obtener tu Certificado Oficial de Secundaria por Internet?',
    keywords: ['certificado de secundaria', 'certificado minedu', 'como sacar certificado de colegio', 'certificado de estudios digital', 'certificado gratis'],
    categorias: ['admision', 'tramites'],
    respuesta: `📄 **Cómo Descargar tu Certificado Oficial de Secundaria Gratis:**

Para postular a la admisión del IESTP Hermanos Cárcamo ya no necesitas ir a tu colegio antiguo:
1. Ingresa a la plataforma oficial del Ministerio de Educación: **[certificado.minedu.gob.pe](https://certificado.minedu.gob.pe/)**.
2. Haz clic en *"Solicitar Certificado de Estudios"*.
3. Ingresa tu número de DNI y fecha de nacimiento.
4. Selecciona tu colegio de egreso en Piura o cualquier región del país.
5. El sistema generará tu **Certificado Oficial con Firma Digital y Código QR** con valor legal pleno.`
  }
];

const CURSO_INGLES_INSTITUTO = {
  nombre: 'Curso de Idioma Extranjero - Inglés (Básico e Intermedio / Inglés Técnico)',
  institucion: 'IESTP Hermanos Cárcamo - Paita',
  finalidad: 'Requisito obligatorio para la Titulación Profesional Técnica según la Ley N° 30512 del MINEDU y desarrollo de competencias bilingües para el puerto de Paita y el mercado global.',
  modalidades: [
    {
      nivel: 'Inglés Básico I, II y III (Nivel A1 - A2)',
      duracion: '3 Módulos Progresivos (120 horas académicas)',
      modalidad: 'Semi-presencial y Virtual con clases grabadas y material interactivo',
      certificacion: 'Certificado Oficial de Suficiencia en Idioma Extranjero con valor legal para Titulación'
    },
    {
      nivel: 'Examen de Suficiencia / Convalidación Externa',
      descripcion: 'Para estudiantes o egresados con estudios previos en ICPNA, Británico o centros de idiomas universitarios.',
      requisito: 'Solicitud por Mesa de Partes adjuntando copia simple del certificado de estudios y voucher de pago de convalidación.'
    }
  ],
  pasosInscripcion: [
    'Consultar la apertura de ciclo de inglés en Secretaría General o comunicados oficiales.',
    'Realizar el depósito en el Banco de la Nación (Cta. Cte. 00-631-012948).',
    'Registrar el voucher en la plataforma https://pagos.ieshercar.edu.pe/.',
    'Registrar tus datos en la ficha de inscripción del curso de inglés.',
    'Acceder a las sesiones de clase y talleres de conversación.'
  ],
  beneficios: [
    'Cumplimiento directo del requisito de titulación profesional técnica.',
    'Horarios adaptados a estudiantes de turno regular y personas con empleo.',
    'Docentes titulados con amplia experiencia pedagógica en idiomas.',
    'Tarifa pública accesible según TUPA del instituto.'
  ]
};

const CONVENIOS_BOLSA_TRABAJO = [
  {
    sector: 'Operaciones Portuarias y Comercio Exterior',
    empresas: ['Terminales Portuarios Euroandinos (TPE Paita)', 'Ransa Comercial', 'Medlog Perú', 'Agencias de Aduana de Paita y Talara'],
    carrerasAfines: ['Administración de Negocios Internacionales (ANI)', 'Contabilidad (CONTA)']
  },
  {
    sector: 'Industria Pesquera, Acuícola y Sanidad Marina',
    empresas: ['Seafrost S.A.C.', 'Austral Group', 'Pesquera Hayduk', 'Olympic Perú Inc.', 'Laboratorios SANIPES / CERPER'],
    carrerasAfines: ['Desarrollo Pesquero y Acuícola (DPA)', 'Contabilidad']
  },
  {
    sector: 'Tecnología de Información, Software y Redes',
    empresas: ['Empresas Agroindustriales del Valle del Chira', 'Caja Municipal de Piura', 'Caja Sullana', 'Proveedores de Servicios Cloud y Telecomunicaciones'],
    carrerasAfines: ['Arquitectura de Plataformas y Servicios TI (APSTI)']
  },
  {
    sector: 'Sector Financiero, Tributario y Municipal',
    empresas: ['Municipalidad Provincial de Paita', 'Cajas Municipales y Bancos', 'Estudios Contables y Auditoras de Piura y Paita'],
    carrerasAfines: ['Contabilidad (CONTA)', 'Administración de Negocios Internacionales']
  }
];

const SIMULADOR_EXAMEN_HERCAR = [
  {
    area: 'Razonamiento Matemático (30%)',
    pregunta: 'Si 6 programadores del IESTP Hermanos Cárcamo desarrollan un módulo de software en 10 días, ¿cuántos días tardarán 12 programadores trabajando al mismo ritmo?',
    opciones: ['3 días', '5 días', '8 días', '12 días'],
    correcta: 1, // 5 días
    explicacion: 'Es una regla de tres simple inversa: a mayor número de programadores, menor número de días. (6 * 10) / 12 = 60 / 12 = 5 días.'
  },
  {
    area: 'Razonamiento Verbal (30%)',
    pregunta: 'Identifica el antónimo contextual de la palabra EFICIENTE en la gestión de exportaciones marítimas:',
    opciones: ['Competente', 'Deficiente', 'Capaz', 'Diligente'],
    correcta: 1, // Deficiente
    explicacion: 'Eficiente significa que realiza sus funciones con efectividad y rapidez. Su antónimo directo es Deficiente o Incompetente.'
  },
  {
    area: 'Cultura General y Realidad Nacional (20%)',
    pregunta: '¿Cuál es el principal puerto marítimo de la región Piura para la exportación de pota, concha de abanico, uva y banano orgánico?',
    opciones: ['Puerto de Matarani', 'Puerto de Paita', 'Puerto de Salaverry', 'Puerto de Ilo'],
    correcta: 1, // Puerto de Paita
    explicacion: 'El Puerto de Paita, operado por Terminales Portuarios Euroandinos (TPE), es el segundo puerto con mayor movimiento de contenedores del Perú.'
  },
  {
    area: 'Ciencias y Tecnología (20%)',
    pregunta: 'En redes informáticas y desarrollo web, ¿qué protocolo seguro cifra la comunicación entre el navegador y el servidor?',
    opciones: ['FTP', 'HTTP', 'HTTPS (SSL/TLS)', 'DNS'],
    correcta: 2, // HTTPS
    explicacion: 'HTTPS (HyperText Transfer Protocol Secure) utiliza certificados SSL/TLS para cifrar y proteger todos los datos transmitidos.'
  },
  {
    area: 'Razonamiento Matemático (30%)',
    pregunta: 'Un lote de exportación en el Puerto de Paita tiene un valor FOB de $20,000. Si se aplica un arancel preferencial del 5%, ¿cuánto es el valor del tributo?',
    opciones: ['$500', '$1,000', '$1,500', '$2,000'],
    correcta: 1, // $1,000
    explicacion: 'El 5% de $20,000 se calcula: 20000 * 0.05 = $1,000.'
  },
  {
    area: 'Razonamiento Verbal (30%)',
    pregunta: 'Completa la analogía: BALANZA es a COMERCIO como RADAR es a...',
    opciones: ['Aduana', 'Navegación', 'Contabilidad', 'Almacén'],
    correcta: 1, // Navegación
    explicacion: 'La balanza es el instrumento fundamental para medir en el comercio, del mismo modo que el radar es el instrumento guía para la navegación marítima y aérea.'
  },
  {
    area: 'Cultura General y Realidad Nacional (20%)',
    pregunta: '¿Por qué el instituto tecnológico de Paita lleva el nombre de "Hermanos Cárcamo"?',
    opciones: [
      'En honor a los héroes y marinos próceres paiteños que destacaron en la historia marítima',
      'Por los primeros alcaldes de la provincia de Paita',
      'Por una empresa pesquera fundadora del puerto',
      'Por una familia de comerciantes extranjeros de Piura'
    ],
    correcta: 0,
    explicacion: 'El nombre honra a los próceres y marinos de la ilustre familia Cárcamo, héroes civiles y navales del puerto de Paita reconocidos por su patriotismo.'
  },
  {
    area: 'Ciencias e Inocuidad (20%)',
    pregunta: 'En plantas procesadoras pesqueras de Paita y exportación de alimentos, ¿qué significa el sistema HACCP obligatorio por SANIPES?',
    opciones: [
      'Control de Calidad de Motores Marinos',
      'Análisis de Peligros y Puntos Críticos de Control',
      'Asociación de Comercio y Puertos del Perú',
      'Norma de Cableado Estructurado'
    ],
    correcta: 1,
    explicacion: 'HACCP (Hazard Analysis and Critical Control Points) es el sistema preventivo internacional que garantiza la inocuidad y seguridad de alimentos hidrobiológicos.'
  }
];

/**
 * DATOS COMPARATIVOS DE LAS 4 CARRERAS TÉCNICAS
 * Útil para el método renderComparadorCarreras()
 */
const DATOS_COMPARATIVOS_CARRERAS = [
  {
    id: 'apsti',
    codigo: 'APSTI',
    nombre: 'Arquitectura de Plataformas y Servicios TI',
    icono: 'bi-laptop-fill',
    color: '#0d6efd',
    colorBg: '#eff6ff',
    duracion: '3 años (6 semestres / 120 créditos)',
    perfilClave: 'Desarrollo de software web/móvil, administración de redes Cisco, servidores Linux/Windows y nube AWS/Azure con ciberseguridad.',
    certificacionesModulares: [
      'Módulo I: Soporte TI y Redes',
      'Módulo II: Desarrollo de Software y Bases de Datos',
      'Módulo III: Servidores y Computación Cloud'
    ],
    campoLaboralPaita: 'Empresas pesqueras, Terminales Portuarios Euroandinos (TPE), municipalidades, bancos, cajas de ahorro y trabajo remoto internacional.',
    sueldoPromedio: 'S/. 2,200 - S/. 4,500+ mensual',
    convalidacionUniversitaria: 'Ingeniería de Sistemas, Ingeniería de Software o Informática.'
  },
  {
    id: 'ani',
    codigo: 'ANI',
    nombre: 'Administración de Negocios Internacionales',
    icono: 'bi-globe-americas',
    color: '#198754',
    colorBg: '#f0fdf4',
    duracion: '3 años (6 semestres / 120 créditos)',
    perfilClave: 'Operaciones de importación/exportación, despachos aduaneros (DAM), logística en el Puerto de Paita, Incoterms y trámites VUCE.',
    certificacionesModulares: [
      'Módulo I: Gestión Comercial y Administrativa',
      'Módulo II: Operatividad Aduanera y DAM',
      'Módulo III: Logística Internacional y Cadena de Frío'
    ],
    campoLaboralPaita: 'Terminal Portuario Euroandinos (TPE), agencias de aduana (Ransa, Medlog), empresas agroexportadoras de mango, uva y pota.',
    sueldoPromedio: 'S/. 2,000 - S/. 5,000+ mensual',
    convalidacionUniversitaria: 'Administración de Empresas, Comercio Exterior o Negocios Internacionales.'
  },
  {
    id: 'conta',
    codigo: 'CONTA',
    nombre: 'Contabilidad & Tributación SUNAT',
    icono: 'bi-calculator-fill',
    color: '#6f42c1',
    colorBg: '#faf5ff',
    duracion: '3 años (6 semestres / 120 créditos)',
    perfilClave: 'Liquidación de tributos SUNAT (IGV, Renta, PDT, SIRE), estados financieros con NIIF, costos para pesqueras, planillas PLAME y auditoría.',
    certificacionesModulares: [
      'Módulo I: Procesos Contables y Libros',
      'Módulo II: Costos y Aplicaciones Tributarias SUNAT',
      'Módulo III: Estados Financieros, Auditoría y SIAF'
    ],
    campoLaboralPaita: 'Estudios contables, empresas pesqueras e industriales de Paita, entidades públicas con SIAF (Municipalidad, Hospital) y asesorías independientes.',
    sueldoPromedio: 'S/. 1,800 - S/. 4,000+ mensual',
    convalidacionUniversitaria: 'Contabilidad y Finanzas, Auditoría o Gestión Pública.'
  },
  {
    id: 'dpa',
    codigo: 'DPA',
    nombre: 'Desarrollo Pesquero y Acuícola',
    icono: 'bi-water',
    color: '#0dcaf0',
    colorBg: '#ecfeff',
    duracion: '3 años (6 semestres / 120 créditos)',
    perfilClave: 'Cultivo de concha de abanico, langostinos y tilapia, navegación y artes de pesca, control de calidad e inocuidad marina (HACCP/BPM) y gestión ambiental.',
    certificacionesModulares: [
      'Módulo I: Operaciones Pesqueras y Navegación',
      'Módulo II: Producción y Granjas Acuícolas',
      'Módulo III: Calidad HACCP y Plantas Congeladoras'
    ],
    campoLaboralPaita: 'Plantas congeladoras de pota y pescado (Seafrost, Hayduk, Austral), concesiones acuícolas en Paita y Sechura, laboratorios SANIPES e IMARPE.',
    sueldoPromedio: 'S/. 2,500 - S/. 6,000+ mensual',
    convalidacionUniversitaria: 'Ingeniería Pesquera, Acuícola o Biología Marina.'
  }
];

/**
 * TABLA OFICIAL PARA EL CÁLCULO DE DPI (DESAPROBADO POR INASISTENCIAS - 30%)
 * En 18 semanas lectivas por semestre
 */
const TABLA_DPI_INASISTENCIAS = [
  { horasSemanales: 2, totalHorasSemestre: 36, maximoInasistenciasHoras: 10, sesionesEquivalentes: '5 clases de 2 hrs' },
  { horasSemanales: 3, totalHorasSemestre: 54, maximoInasistenciasHoras: 16, sesionesEquivalentes: '5 clases de 3 hrs' },
  { horasSemanales: 4, totalHorasSemestre: 72, maximoInasistenciasHoras: 21, sesionesEquivalentes: '5 clases de 4 hrs' },
  { horasSemanales: 5, totalHorasSemestre: 90, maximoInasistenciasHoras: 27, sesionesEquivalentes: '5 clases de 5 hrs' },
  { horasSemanales: 6, totalHorasSemestre: 108, maximoInasistenciasHoras: 32, sesionesEquivalentes: '5 clases de 6 hrs' },
  { horasSemanales: 8, totalHorasSemestre: 144, maximoInasistenciasHoras: 43, sesionesEquivalentes: '5 clases de 8 hrs' }
];

/**
 * GUÍA OFICIAL DE EXPERIENCIAS FORMATIVAS (EFSRT)
 */
const GUIA_PRACTICAS_EFSRT = {
  totalHorasExigidas: 820,
  normativa: 'Lineamientos Académicos Generales del MINEDU y Ley N° 30512',
  modulos: [
    {
      modulo: 'Módulo I',
      horas: 240,
      ciclos: 'Al concluir el I o II Semestre',
      documento: 'Certificado Modular I',
      requisitos: ['Aprobación de unidades del Módulo I', 'Carta de presentación institucional', 'Informe de prácticas aprobado']
    },
    {
      modulo: 'Módulo II',
      horas: 280,
      ciclos: 'Al concluir el III o IV Semestre',
      documento: 'Certificado Modular II',
      requisitos: ['Aprobación de unidades del Módulo II', 'Constancia de desempeño emitida por empresa', 'Informe técnico de prácticas']
    },
    {
      modulo: 'Módulo III',
      horas: 300,
      ciclos: 'Al concluir el V o VI Semestre',
      documento: 'Certificado Modular III',
      requisitos: ['Aprobación de unidades del Módulo III', 'Constancia de culminación de prácticas', 'Sustentación de informe final']
    }
  ]
};

/**
 * CATÁLOGO OFICIAL DE TASAS Y TRÁMITES TUPA (PARA EL COTIZADOR INTERACTIVO)
 */
const TASAS_TUPA_COTIZADOR = [
  { id: 'tupa-matricula', nombre: 'Matrícula Regular Semestral', costo: 120, categoria: 'Academico', icon: 'bi-pencil-square', detalle: 'Incluye seguro estudiantil y registro en sistema.ieshercar.edu.pe' },
  { id: 'tupa-carne', nombre: 'Carné de Educación Superior MINEDU (Medio Pasaje)', costo: 20, categoria: 'Bienestar', icon: 'bi-card-heading', detalle: 'Carné oficial con vigencia anual según Ley 26271' },
  { id: 'tupa-cert-modular', nombre: 'Certificado Modular Progresivo (Por Módulo)', costo: 45, categoria: 'Certificaciones', icon: 'bi-award', detalle: 'Diploma oficial por culminar Módulo I, II o III' },
  { id: 'tupa-constancia', nombre: 'Constancia de Estudios / Notas / Egresado', costo: 20, categoria: 'Documentos', icon: 'bi-file-earmark-text', detalle: 'Emisión en 2 a 3 días hábiles con firma y sello' },
  { id: 'tupa-admision-ordinario', nombre: 'Carpeta e Inscripción Examen Ordinario', costo: 150, categoria: 'Admision', icon: 'bi-person-check', detalle: 'Derecho a examen de 100 preguntas y balotario' },
  { id: 'tupa-convalidacion', nombre: 'Convalidación de Unidad Didáctica (Por Curso)', costo: 30, categoria: 'Academico', icon: 'bi-arrow-left-right', detalle: 'Para traslados de universidades u otros institutos' },
  { id: 'tupa-titulacion', nombre: 'Carpeta de Titulación Profesional Técnica', costo: 250, categoria: 'Titulacion', icon: 'bi-mortarboard', detalle: 'Sustentación de proyecto e inscripción oficial en MINEDU' }
];

/**
 * DIRECTORIO Y AMBIENTES DEL CAMPUS PAITA ALTA
 */
const CAMPUS_AMBIENTES_HERCAR = [
  { ambiente: 'Pabellón Administrativo', descripcion: 'Dirección General, Jefatura Académica, Secretaría General, Mesa de Partes y Ventanilla de Caja', icon: 'bi-building' },
  { ambiente: 'Centros de Cómputo APSTI (1, 2 y 3)', descripcion: 'Laboratorios equipados con computadoras Core i7, fibra óptica de alta velocidad y servidores de prueba', icon: 'bi-laptop' },
  { ambiente: 'Planta Piloto y Laboratorio Pesquero (DPA)', descripcion: 'Módulos de acuicultura, equipos de análisis físico-químico del agua y taller de artes de pesca', icon: 'bi-water' },
  { ambiente: 'Aulas Climatizadas de Negocios y Contabilidad', descripcion: 'Salas de proyección multimedia, simulación de despacho aduanero y software contable Concar/Siscont', icon: 'bi-calculator' },
  { ambiente: 'Centro de Recursos y Biblioteca Virtual Latina', descripcion: 'Espacios de lectura, computadoras de consulta y acceso a miles de libros digitales 24/7', icon: 'bi-book' },
  { ambiente: 'Tópico de Salud y Consejería', descripcion: 'Atención médica inmediata de primeros auxilios y afiliación activa gratuita al SIS', icon: 'bi-hospital' },
  { ambiente: 'Losa Polideportiva y Cafetín', descripcion: 'Espacios recreativos para fulbito, vóley, campeonatos intercarreras y descanso estudiantil', icon: 'bi-trophy' }
];



