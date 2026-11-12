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
  mesaPartesVirtual: 'https://sistema.ieshercar.edu.pe/registro-tramite/',
  sistemaInstitucional: 'https://sistema.ieshercar.edu.pe/acceso',
  sistemaPagos: 'https://pagos.ieshercar.edu.pe/',
  aulaVirtual: 'https://aula.ieshercar.edu.pe/',
  bolsaLaboral: 'https://bolsalaboral.ieshercar.edu.pe/',
  bibliotecaVirtual: 'https://biblioteca.ieshercar.edu.pe/',
  bibliotecaLatina: 'https://iestphercar.bibliotecalatina.com/login',
  admisionCicloCero: 'https://ieshercar.edu.pe/Tramites/Admision-Ciclo_Cero/',
  becasPronabec: 'https://ieshercar.edu.pe/Informacion_Academica/Becas/becas.php',
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
    icono: 'bi-laptop-fill',
    imagen: 'assets/img/apsti.webp'
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
    icono: 'bi-globe-americas',
    imagen: 'assets/img/ani.webp'
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
    icono: 'bi-calculator-fill',
    imagen: 'assets/img/contabilidad.webp'
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
    icono: 'bi-water',
    imagen: 'assets/img/dpa.webp'
  }
];

const GUIA_TRAMITES_TUPA = [
  {
    id: 'tramite-matricula',
    nombre: 'Matrícula Regular y Ratificación Semestral',
    categoria: 'Académico',
    costo: 'S/ 120.00 (Tasa semestral en Banco de la Nación)',
    plazo: 'Inmediato tras validación de Caja (24-48 horas)',
    requisitos: [
      'Haber aprobado los cursos correlativos (máximo 2 asignaturas a cargo)',
      'Comprobante de depósito en el Banco de la Nación (Cta. Cte. N° 00-631-012948)',
      'Ficha de matrícula generada en sistema.ieshercar.edu.pe',
      'No registrar adeudos de material bibliográfico ni cuotas pendientes'
    ],
    pasos: [
      'Depositar en el Banco de la Nación a la Cta. Cte. N° 00-631-012948.',
      'Subir el voucher a https://pagos.ieshercar.edu.pe/.',
      'Esperar la validación de Caja (24 a 48 horas hábiles).',
      'Ingresar a https://sistema.ieshercar.edu.pe/acceso con tu DNI y seleccionar tus asignaturas.',
      'Descargar y guardar tu Ficha Oficial de Matrícula en PDF.'
    ]
  },
  {
    id: 'tramite-matricula-extemporanea',
    nombre: 'Matrícula Extemporánea / Fuera de Plazo',
    categoria: 'Académico',
    costo: 'S/ 140.00 (Tasa regular + recargo administrativo BN)',
    plazo: '2 a 3 días hábiles previa autorización de Dirección',
    requisitos: [
      'Solicitud mediante Formulario Único de Trámite (FUT) justificando motivo de retraso',
      'Voucher del Banco de la Nación con el recargo correspondiente',
      'Disponibilidad de vacante en el turno y sección solicitada'
    ],
    pasos: [
      'Generar FUT dirigido a la Jefatura de Unidad Académica exponiendo el motivo.',
      'Abonar S/ 140.00 en el Banco de la Nación y subir voucher a pagos.ieshercar.edu.pe.',
      'Presentar el FUT con voucher validado por Mesa de Partes.',
      'Una vez aprobado el proveído, registrar asignaturas en el Sistema Académico.'
    ]
  },
  {
    id: 'tramite-certificado-modular',
    nombre: 'Certificación Modular Progresiva (Módulos I, II o III)',
    categoria: 'Certificaciones',
    costo: 'S/ 45.00 por cada módulo formativo',
    plazo: '7 a 10 días hábiles (Emisión con firma de Dirección y Jefatura Académica)',
    requisitos: [
      'Haber aprobado el 100% de las unidades didácticas del Módulo I, II o III',
      'Constancia aprobatoria de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT) del módulo (mínimo 240 a 280 horas)',
      'Comprobante de pago validado en pagos.ieshercar.edu.pe',
      'FUT debidamente llenado solicitando el Certificado Modular respectivo'
    ],
    pasos: [
      'Verificar en el Sistema Académico que todas las notas del módulo estén registradas (nota mínima 13).',
      'Abonar S/ 45.00 en el Banco de la Nación y registrar en pagos.ieshercar.edu.pe.',
      'Presentar FUT y constancia de prácticas EFSRT por Mesa de Partes Virtual o presencial.',
      'Secretaría Académica emite el Certificado Modular oficial con valor curricular MINEDU.'
    ]
  },
  {
    id: 'tramite-titulacion',
    nombre: 'Título Profesional Técnico a Nombre de la Nación',
    categoria: 'Titulación',
    costo: 'S/ 180.00 (Incluye derecho de jurado, diploma caligráfico y registro MINEDU)',
    plazo: '30 a 45 días hábiles (Inscripción en el Registro Nacional de Títulos MINEDU)',
    requisitos: [
      'Haber aprobado los 6 semestres académicos (120 créditos curriculares completos)',
      'Contar con los 3 Certificados Modulares oficiales emitidos por el instituto',
      'Constancia global de Prácticas Preprofesionales EFSRT (720 a 840 horas según carrera)',
      'Constancia de acreditación de idioma extranjero (Inglés nivel A2 emitido por el instituto)',
      'Aprobación de la sustentación del Proyecto de Innovación Productiva o Examen de Suficiencia',
      'Constancia de no adeudo general (Biblioteca, Tesorería, Laboratorios y Dirección)',
      '4 Fotografías tamaño pasaporte en papel mate a color con terno formal'
    ],
    pasos: [
      'Aperturar Expediente de Titulación en Secretaría Académica.',
      'Designación de asesor y fecha de sustentación del Proyecto de Innovación o Examen.',
      'Sustentación pública y firma del Acta de Titulación Profesional Técnica.',
      'Tramitación del diploma oficial ante el MINEDU y entrega en ceremonia solemne.'
    ]
  },
  {
    id: 'tramite-bachiller-tecnico',
    nombre: 'Grado de Bachiller Técnico (Ley N° 30512)',
    categoria: 'Grados',
    costo: 'S/ 120.00 (Emisión de diploma y registro oficial)',
    plazo: '20 a 30 días hábiles',
    requisitos: [
      'Haber culminado satisfactoriamente los 120 créditos de la carrera técnica',
      'Haber concluido y aprobado un trabajo de aplicación profesional o proyecto de investigación',
      'Acreditar conocimiento de un idioma extranjero (Inglés básico-intermedio A2)',
      'Voucher del Banco de la Nación validado y FUT oficial'
    ],
    pasos: [
      'Presentar solicitud de Bachiller Técnico adjuntando trabajo de aplicación aprobado.',
      'Validar pago de la tasa oficial en pagos.ieshercar.edu.pe.',
      'Revisión en Unidad Académica y emisión del diploma con registro oficial.'
    ]
  },
  {
    id: 'tramite-carne',
    nombre: 'Carné de Educación Superior MINEDU (Medio Pasaje Oficial)',
    categoria: 'Bienestar',
    costo: 'S/ 18.00 (Tasa fijada por el Ministerio de Educación)',
    plazo: 'Según cronograma oficial de remisión de lotes MINEDU (15 a 25 días)',
    requisitos: [
      'Estar formalmente matriculado en el semestre lectivo vigente',
      'Fotografía digital tamaño carnet a color con fondo blanco y ropa oscura (JPG/PNG)',
      'Voucher de pago del Banco de la Nación validado en la plataforma de pagos'
    ],
    pasos: [
      'Secretaría Académica publica la convocatoria semestral de carné institucional.',
      'Abonar S/ 18.00 en el Banco de la Nación y subir comprobante a pagos.ieshercar.edu.pe.',
      'Cargar o enviar foto digital con las especificaciones técnicas requeridas.',
      'Recepción física del carné con chip para gozar del 50% de descuento en pasajes urbanos e interurbanos.'
    ]
  },
  {
    id: 'tramite-certificado-estudios',
    nombre: 'Certificado Oficial de Estudios (Por Ciclo o Completo)',
    categoria: 'Documentos',
    costo: 'S/ 25.00 por ciclo / S/ 60.00 ciclo completo (I al VI)',
    plazo: '3 a 5 días hábiles',
    requisitos: [
      'Haber cursado y aprobado las asignaturas correspondientes',
      'FUT especificando si requiere desglose por ciclo o récord completo',
      'Comprobante de depósito en el Banco de la Nación',
      '2 Fotos tamaño carnet para el membrete oficial del certificado'
    ],
    pasos: [
      'Pagar la tasa en el BN y validar comprobante en pagos.ieshercar.edu.pe.',
      'Presentar FUT y fotos por Mesa de Partes en campus Paita Alta.',
      'Secretaría confecciona el certificado con sellos de seguridad y firmas de ley.'
    ]
  },
  {
    id: 'tramite-convalidacion',
    nombre: 'Convalidación de Unidades Didácticas',
    categoria: 'Académico',
    costo: 'S/ 15.00 por cada curso a convalidar',
    plazo: '7 a 10 días hábiles (Dictamen de Comisión Académica)',
    requisitos: [
      'Certificado oficial de estudios de la institución de origen (otro instituto o universidad)',
      'Sílabos de los cursos aprobados debidamente visados y sellados por la institución de origen',
      'Coincidencia mínima del 80% de contenidos temáticos y créditos',
      'FUT detallando la tabla de convalidaciones solicitada'
    ],
    pasos: [
      'Solicitar formato de convalidación en Secretaría o generar FUT en línea.',
      'Entregar expediente completo con sílabos visados por Mesa de Partes.',
      'La Comisión Evaluadora emite Resolución Directoral de Convalidación de Asignaturas.'
    ]
  },
  {
    id: 'tramite-traslado-interno',
    nombre: 'Traslado Interno de Carrera Profesional',
    categoria: 'Académico',
    costo: 'S/ 40.00 (Derecho de traslado y apertura de nuevo legajo)',
    plazo: '5 a 7 días hábiles (Antes del inicio del semestre)',
    requisitos: [
      'Haber aprobado como mínimo el I Ciclo en la carrera de origen en el IESTP Hermanos Cárcamo',
      'Existencia de vacante disponible en la carrera de destino (APSTI, ANI, CONTA o DPA)',
      'FUT solicitando traslado interno con justificación vocacional',
      'Voucher del Banco de la Nación'
    ],
    pasos: [
      'Presentar solicitud durante el periodo de matrícula o ratificación.',
      'Evaluación del expediente por la Jefatura de Unidad Académica.',
      'Convalidación automática de cursos transversales comunes y emisión de nueva ficha.'
    ]
  },
  {
    id: 'tramite-traslado-externo',
    nombre: 'Traslado Externo Nacional (Desde otro Instituto o Universidad)',
    categoria: 'Académico',
    costo: 'S/ 70.00 (Derecho de traslado y convalidación inicial)',
    plazo: '7 a 12 días hábiles',
    requisitos: [
      'Certificado oficial de estudios de educación superior técnica o universitaria',
      'Constancia de no haber sido separado por medida disciplinaria en la institución de origen',
      'Sílabos oficiales sellados y copia de DNI',
      'Voucher del Banco de la Nación'
    ],
    pasos: [
      'Presentar expediente por Mesa de Partes en las fechas fijadas en el cronograma de admisión.',
      'Evaluación técnica de créditos y vacantes por la Coordinación de Carrera.',
      'Resolución Directoral de admisión por traslado externo y matrícula formal.'
    ]
  },
  {
    id: 'tramite-reserva-matricula',
    nombre: 'Reserva de Matrícula y Licencia Temporal de Estudios',
    categoria: 'Académico',
    costo: 'S/ 30.00 (Hasta por 2 semestres lectivos)',
    plazo: '3 a 5 días hábiles',
    requisitos: [
      'FUT solicitando la reserva de vacante antes de finalizar el primer mes de clases',
      'Exposición de motivos justificados (salud, trabajo, motivos familiares o económicos)',
      'Comprobante de depósito en el Banco de la Nación'
    ],
    pasos: [
      'Ingresar solicitud mediante FUT en Mesa de Partes Virtual o presencial.',
      'Abonar la tasa en el BN y registrar comprobante.',
      'Emisión de constancia oficial de reserva de vacante garantizada hasta por 1 año calendario.'
    ]
  },
  {
    id: 'tramite-reincorporacion',
    nombre: 'Reincorporación de Estudios (Retorno tras Reserva)',
    categoria: 'Académico',
    costo: 'S/ 35.00',
    plazo: '3 a 5 días hábiles antes del inicio de clases',
    requisitos: [
      'Haber contado con reserva aprobada o no haber excedido los 2 semestres de interrupción',
      'FUT solicitando reincorporación y adecuación al plan curricular vigente',
      'Voucher de pago del Banco de la Nación'
    ],
    pasos: [
      'Presentar FUT 15 días antes de iniciar la matrícula del semestre siguiente.',
      'Evaluación de adecuación de malla curricular si hubo actualización de plan de estudios.',
      'Habilitación en el Sistema Académico para proceder con la matrícula regular.'
    ]
  },
  {
    id: 'tramite-rectificacion-matricula',
    nombre: 'Rectificación de Matrícula (Cambio, Retiro o Inclusión de Curso)',
    categoria: 'Académico',
    costo: 'S/ 15.00',
    plazo: '24 a 48 horas (Dentro de las 2 primeras semanas de clases)',
    requisitos: [
      'Ficha de matrícula preliminar del semestre en curso',
      'FUT indicando las asignaturas que se agregan, retiran o cambian de sección',
      'Voucher de depósito en el Banco de la Nación'
    ],
    pasos: [
      'Llenar el formulario en Mesa de Partes o en línea.',
      'Coordinación Académica valida que no exista cruce de horarios.',
      'Actualización inmediata en el Sistema Académico Institucional.'
    ]
  },
  {
    id: 'tramite-constancia-egresado',
    nombre: 'Constancia de Egresado y No Adeudo Institucional',
    categoria: 'Documentos',
    costo: 'S/ 20.00',
    plazo: '2 a 3 días hábiles',
    requisitos: [
      'Haber aprobado la totalidad de los 120 créditos de la carrera (I al VI ciclo)',
      'Constancia de no adeudo emitida por Biblioteca y Laboratorios',
      'Voucher de pago BN y FUT formal'
    ],
    pasos: [
      'Verificar récord académico completo en el sistema.',
      'Abonar tasa en el BN y validar en pagos.ieshercar.edu.pe.',
      'Emisión de Constancia de Egresado oficial para postular a empleos o tramitar prácticas.'
    ]
  },
  {
    id: 'tramite-duplicado-diploma',
    nombre: 'Duplicado de Diploma de Título Técnico o Certificado Modular',
    categoria: 'Documentos',
    costo: 'S/ 90.00 (Por pérdida, deterioro o rectificación de datos)',
    plazo: '15 a 20 días hábiles (Requiere publicación en diario y reporte MINEDU)',
    requisitos: [
      'Denuncia policial original por pérdida o robo (o entrega del documento deteriorado)',
      'Publicación de pérdida en diario de circulación regional o nacional',
      'Copia de DNI vigente y 2 fotos tamaño pasaporte en traje formal',
      'Comprobante de depósito en el Banco de la Nación'
    ],
    pasos: [
      'Presentar expediente completo con denuncia y recorte de diario por Mesa de Partes.',
      'Dirección General emite Resolución de anulación del original y autorización de duplicado.',
      'Emisión del nuevo diploma con sello de "DUPLICADO" y registro en el MINEDU.'
    ]
  },
  {
    id: 'tramite-justificacion-inasistencia',
    nombre: 'Justificación Oficial de Inasistencias (Prevención de DPI)',
    categoria: 'Académico',
    costo: 'Gratuito (Trámite de Bienestar y Secretaría Académica)',
    plazo: '48 horas hábiles (Plazo máximo de presentación: 5 días hábiles tras la falta)',
    requisitos: [
      'FUT detallando fechas exactas de inasistencia y unidades didácticas afectadas',
      'Certificado médico original visado por MINSA / EsSalud (o constancia de trabajo en caso de fuerza mayor)',
      'Copia simple de DNI del estudiante'
    ],
    pasos: [
      'Presentar FUT y sustento médico o laboral dentro de los 5 días de ocurrida la falta.',
      'Jefatura de Unidad Académica emite proveído de justificación a los docentes responsables.',
      'Los docentes reprograman evaluaciones o prácticas pendientes sin penalización en nota.'
    ]
  }
];

const BASE_PREGUNTAS_RESPUESTAS = [
  {
    id: 'faq-comunicados-todos',
    titulo: 'Comunicados y Avisos Oficiales Recientes',
    keywords: ['comunicado', 'comunicados', 'aviso', 'avisos', 'novedades', 'noticias', 'anuncio', 'anuncios'],
    categorias: ['general'],
    locucion: "¡Hola! Te comparto los últimos comunicados oficiales del instituto: están disponibles los resultados de Cepre, las instrucciones para registrar comprobantes del Banco de la Nación, y la convocatoria para el carné de medio pasaje. En tu pantalla puedes ver todos los enlaces directos.",
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
    locucion: "¡Hola! Los resultados oficiales de la academia Cepre con ingreso directo ya están publicados. En tu pantalla tienes el enlace directo a Google Drive para consultar si obtuviste tu vacante.",
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
    locucion: "¡Hola! Para postular al instituto tenemos tres modalidades: el examen ordinario, la academia Cepre con ingreso directo, y exonerados para los primeros puestos de secundaria. En tu pantalla puedes ver todos los requisitos y documentos que necesitas.",
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
    locucion: "¡Hola! Para registrar tu pago, primero abonas en el Banco de la Nación a la cuenta corriente del instituto. Luego entras con tu D N I a pagos punto i e s hercar punto edu punto pe y subes la foto de tu comprobante. En tu pantalla te dejé los pasos completos.",
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
    locucion: "¡Hola! El instituto ofrece cuatro carreras técnicas profesionales de tres años: Computación y Desarrollo de Sistemas, Negocios Internacionales, Contabilidad, y Desarrollo Pesquero y Acuícola. Todas son públicas sin mensualidades. ¡En tu pantalla puedes revisar sus perfiles!",
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
    locucion: "¡Hola! En la parte superior y en tu pantalla tienes acceso directo a todos nuestros sistemas: Sistema Académico para ver notas y matrícula, Portal de Pagos, Aula Virtual y Biblioteca. Puedes abrir cualquiera con un solo toque.",
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
    locucion: "¡Hola! Nuestro campus principal queda en la avenida Miguel Grau, en la parte alta de Paita. Atendemos de lunes a viernes desde las ocho de la mañana hasta las tres de la tarde. En tu pantalla tienes nuestros teléfonos y mapa.",
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
    locucion: "¡Hola! Te cuento con mucho gusto que en el Instituto Hermanos Cárcamo estudiar es público y no se pagan pensiones ni mensualidades. Únicamente abonas la tasa administrativa de matrícula por semestre en el Banco de la Nación, que son unos ciento veinte soles e incluye tu carné y seguro de salud. ¡En tu pantalla te dejé todos los detalles!",
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
    locucion: "¡Hola! Nuestros estudiantes pueden postular a los programas de becas de Pronabec como Beca Dieciocho y Beca Permanencia, que te brindan apoyo económico para tu carrera. En tu pantalla tienes los requisitos.",
    respuesta: `🌟 **Becas y Apoyo Estudiantil:**
Al ser una institución pública de educación superior licenciada, los estudiantes del IESTP Hermanos Cárcamo pueden postular a los programas de becas del Estado a través de PRONABEC:
- **Beca 18:** Para egresados de secundaria con alto rendimiento académico y condición de pobreza o vulnerabilidad.
- **Beca Continuidad:** Para estudiantes que requieren apoyo para culminar sus estudios.
- **Beca Permanencia:** Para talentos destacados durante su formación técnica profesional.`
  },
  {
    id: 'faq-curso-ingles',
    titulo: 'Curso de Idioma Extranjero (Inglés para Titulación)',
    keywords: ['ingles', 'curso de ingles', 'idioma', 'idiomas', 'ingles tecnico', 'certificado de ingles', 'examen de ingles', 'suficiencia', 'titulacion ingles', 'aprender ingles', 'centro de idiomas', 'pago ingles', 'pago de ingles', 'cuenta ingles', 'cuenta de ingles', 'voucher ingles', '00-638-025736', 'omar garcia', 'tania herrera'],
    categorias: ['academico', 'titulacion', 'pagos'],
    locucion: "¡Hola! Te cuento que para el curso de inglés de titulación, el pago se realiza en el Banco de la Nación en la cuenta cero cero, seis tres ocho, cero dos cinco siete tres seis. Recuerda sacar dos copias a tu voucher y entregarlo en Tesorería del instituto para que no haya retrasos en la entrega de tu certificado. ¡En tu pantalla tienes el número de cuenta y los detalles oficiales!",
    respuesta: `🇬🇧 **Curso de Inglés & Requisito de Idioma Extranjero para Titulación:**

Por disposición de la Ley de Institutos N° 30512 del MINEDU, el dominio de un idioma extranjero (mínimo Nivel Básico A2) es un **requisito obligatorio para obtener el Título Profesional Técnico** en las 4 carreras (APSTI, ANI, CONTA y DPA).

💳 **Datos Oficiales de Pago para el Curso de Inglés:**
* 🏦 **Banco de la Nación - Cuenta Corriente Específica:** **\`00-638-025736\`**
* 📄 **Voucher:** Debes **sacar 2 copias a tu voucher** y entregarlos en la oficina de **Tesorería**, en el campus del instituto en Paita Alta.
* ⚠️ **Comunicado de Tesorería y Coordinación (Lic. Omar García Reto):** La entrega de certificados se realizará cuando no haya adeudos pendientes en el grupo. Todos los estudiantes deben regularizar sus cuotas para no perjudicar la emisión grupal del certificado y el proceso de titulación oficial. Para consultas de cobranza, coordinar con Tesorería (Srta. Tania Herrera Cruz).

⭐ **Opciones que ofrece el IESTP Hermanos Cárcamo:**
1. 📚 **Curso Modular de Inglés Institucional:** Impartido por el instituto con certificación directa y valor oficial para tu expediente de graduación.
2. 📝 **Examen de Suficiencia o Convalidación:** Si ya estudiaste en un centro de idiomas externo (ICPNA, Británico, etc.), puedes convalidar presentando tu certificado en Mesa de Partes.`
  },
  {
    id: 'faq-autoridades',
    titulo: 'Autoridades y Plana Directiva Institucional',
    keywords: ['director', 'directora', 'autoridades', 'directivos', 'jefatura', 'secretaria general', 'quien dirige', 'coordinador', 'adolfo zeta', 'resolucion de creacion'],
    categorias: ['institucional'],
    locucion: "¡Hola! Con mucho gusto te cuento que nuestra institución está dirigida por la Dirección General junto a la Unidad Académica y Secretaría General. Fue creada por Resolución Ministerial doscientos treinta y dos y revalidada con Resolución quinientos veintiocho. En tu pantalla puedes revisar todos los datos con calma.",
    respuesta: `🏛️ **Plana Directiva y Autoridades del IESTP "Hermanos Cárcamo":**
* **Director General:** **Econ. Adolfo Zeta Pazo** — Lidera la gestión institucional, licenciamiento y vinculación estratégica con el sector productivo de Paita.
* **Jefe de Unidad Académica:** **Lic. Juan García Reto** — Responsable de la planificación curricular, mallas, supervisión pedagógica y titulación.
* **Jefe de Unidad Administrativa:** **CPC Edson Maza** — Gestión administrativa, recursos y presupuesto institucional.
* **Resoluciones Oficiales:** Creado por **R.M. N° 232-87-ED** y revalidado por **R.M. N° 0528-2006-ED**.
* **Coordinaciones de Carrera:**
  - Coordinación de **APSTI** (Arquitectura de Plataformas y Servicios TI).
  - Coordinación de **ANI** (Administración de Negocios Internacionales).
  - Coordinación de **Contabilidad** (Finanzas y Tributación).
  - Coordinación de **Desarrollo Pesquero y Acuícola** (Acuicultura y Tecnología Pesquera).
* **Secretaría Académica & Mesa de Partes:** Trámites de certificados, matrículas y constancias en Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita Alta.`
  },
  {
    id: 'faq-plana-docente',
    titulo: 'Plana Docente Oficial del IESTP Hermanos Cárcamo (20 Docentes)',
    keywords: ['plana docente', 'profesores', 'docentes', 'quienes son los profesores', 'docentes apsti', 'docentes ani', 'docentes contabilidad', 'docentes dpa', 'jose hernandez', 'javier jaramillo', 'luis cherre', 'erick denegri', 'juan ruidias', 'eduardo masias', 'yemina vite', 'paola manrique', 'karolina farfan', 'juan garcia', 'nelly julca', 'jose llontop', 'nilda panta', 'edson maza', 'daniel olaya', 'rocio chapa', 'dalila barrios', 'fabiola pinto', 'bertha rufasto', 'sergio panta'],
    categorias: ['institucional', 'carreras'],
    locucion: "¡Hola! Qué gusto saludarte. Con todo cariño te cuento que nuestro instituto cuenta con veinte docentes altamente capacitados y titulados en sus cuatro carreras técnicas. En tu pantalla te comparto la plana docente oficial completa por cada programa de estudios.",
    respuesta: `👨‍🏫 **Plana Docente Oficial del IESTP "Hermanos Cárcamo" de Paita:**
*(Fuente Oficial: ieshercar.edu.pe/Nosotros/Estructura_Organizativa/Plana-Docente/)*

💻 **Arquitectura de Plataformas y Servicios de TI (APSTI):**
1. **Prof. José Hernández Panta** — Desarrollo de software, arquitectura de sistemas y bases de datos.
2. **Prof. Javier Jaramillo Atoche** — Redes de datos, conectividad y soporte de telecomunicaciones.
3. **Prof. Luis Cherre Lizama** — Sistemas operativos monousuario/multiusuario y servidores.
4. **Prof. Erick Denegri Arizapana** — Programación avanzada, aplicaciones cloud y desarrollo empresarial.
5. **Prof. Juan Ruidias Casaverde** — Plataformas web, bases de datos y seguridad informática.

🌐 **Administración de Negocios Internacionales (ANI):**
1. **Prof. Eduardo Masías de la Rosa** — Logística portuaria, aduanas y comercio exterior.
2. **Prof. Yemina Vite Piedra** — Marketing internacional, gestión comercial y planes de negocios.
3. **Prof. Paola Manrique Purizaca** — Finanzas internacionales, proyectos de exportación y aranceles.
4. **Prof. Karolina Grace Farfán Cavero** — Investigación de mercados y legislación aduanera.
5. **Prof. Juan García Reto** — Operatividad aduanera, transporte multimodal y distribución física internacional.

📊 **Contabilidad:**
1. **Prof. Nelly Julca García** — Formulación de estados financieros y auditoría contable.
2. **Prof. José Llontop Pasache** — Tributación, gestión fiscal ante SUNAT y software contable.
3. **Prof. Nilda Panta Flores** — Costos, presupuestos y operaciones comerciales.
4. **Prof. Edson Maza Gonzales** — Finanzas empresariales, análisis de balances y control de gestión.
5. **Prof. Daniel Olaya Castillo** — Contabilidad gubernamental y auditoría tributaria.

🐟 **Desarrollo Pesquero y Acuícola (DPA):**
1. **Prof. Rocío Chapa Tume** — Procesamiento de productos hidrobiológicos, congelados y conservas.
2. **Prof. Dalila Barrios Cruz** — Sistemas de cultivo acuícola y gestión ambiental costera.
3. **Prof. Fabiola Pinto Granda** — Control de calidad sanitaria, norma HACCP e inocuidad alimentaria (SANIPES).
4. **Prof. Bertha Rufasto Kanashiro** — Tecnología pesquera y evaluación de recursos marinos.
5. **Prof. Sergio Panta Jacinto** — Artes y métodos de pesca, navegación y operaciones marítimas.`
  },
  {
    id: 'faq-comite-defensa-code',
    titulo: 'Comité de Defensa del Estudiante (CODE) y Protección Integral',
    keywords: ['code', 'defensa del estudiante', 'denuncia', 'queja', 'acoso', 'derechos del estudiante', 'rd 046-2021', 'comite de defensa', 'bienestar estudiantil'],
    categorias: ['institucional', 'bienestar'],
    locucion: "¡Hola! Te cuento que en el Instituto Hermanos Cárcamo contamos con el Comité de Defensa del Estudiante, respaldado por resolución directoral cero cuarenta y seis. Garantiza un ambiente seguro, libre de discriminación y con total acompañamiento para ti. En tu pantalla tienes todos los detalles.",
    respuesta: `🛡️ **Comité de Defensa del Estudiante (CODE) — IESTP Hermanos Cárcamo:**
*(Aprobado mediante Resolución Directoral N° 046-2021)*

* ⚖️ **Misión del CODE:** Velar por la integridad, respeto y derechos de todos los estudiantes del instituto, garantizando un ambiente educativo seguro, inclusivo y libre de hostigamiento o discriminación.
* 📋 **Servicios del Comité:**
  - Atención y acompañamiento en situaciones de queja, reclamo o denuncia.
  - Asesoramiento y orientación psicológica y psicopedagógica confidencial.
  - Canales formales para la presentación del Formulario de Queja o Denuncia ante la Dirección General.
  - Seguimiento y resolución transparente de incidentes con garantías procesales.
* 🏢 **Atención Presencial:** Unidad de Bienestar y Empleabilidad, Campus Av. Miguel Grau Mz. A Lt. 001 - Urb. El Parque, Paita Alta.`
  },
  {
    id: 'faq-historia-mision',
    titulo: 'Historia, Misión, Visión y Valores del Instituto',
    keywords: ['historia', 'mision', 'vision', 'valores', 'lema', 'fundacion', 'que es hercar', 'quienes son los hermanos carcamo', 'resolucion ministerial'],
    categorias: ['institucional'],
    locucion: "¡Hola! El Instituto Hermanos Cárcamo tiene más de treinta y ocho años formando profesionales técnicos en Paita. Nuestro lema es: Formando Profesionales y Construyendo Oportunidades. En tu pantalla te comparto nuestra historia y valores.",
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
    locucion: "¡Hola! La escala de notas es vigesimal y apruebas con trece. Si desapruebas hasta dos cursos, puedes llevarlos a cargo en el siguiente ciclo; pero si desapruebas tres o más, tendrás que repetir esos cursos. ¡En tu pantalla tienes el reglamento completo!",
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
    locucion: "¡Hola! Nuestras clases se imparten en el turno mañana, de lunes a viernes, desde las ocho de la mañana hasta la una y quince de la tarde. En tu pantalla puedes revisar los horarios y turnos de talleres.",
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
    locucion: "¡Hola! Si vienes de otra universidad o instituto técnico, puedes convalidar tus asignaturas aprobadas presentando tu certificado oficial de estudios y sílabos en Secretaría. En tu pantalla tienes los requisitos.",
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
    locucion: "¡Hola! En bienestar estudiantil cuentas con afiliación gratuita al Seguro Integral de Salud, tópico de primeros auxilios, tutoría psicopedagógica y talleres deportivos. ¡En tu pantalla puedes ver todos los beneficios!",
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
    locucion: "¡Hola! Con mucho gusto te explico los pasos de matrícula: pagas tu tasa semestral en el Banco de la Nación, le tomas foto clara a tu comprobante y lo subes a pagos punto i e s hercar punto edu punto pe. ¡En tu pantalla te preparé la guía completa!",
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
    locucion: "¡Hola! Después de pagar en el Banco de la Nación, debes tomarle una foto nítida al voucher y registrarlo en pagos punto i e s hercar punto edu punto pe para que Tesorería valide tu matrícula en veinticuatro a cuarenta y ocho horas.",
    respuesta: `🧾 **¿Ya pagaste en el Banco de la Nación? Sigue estos 3 pasos obligatorios:**

1. **Fotografía el Voucher:** Toma una foto nítida donde se lea el N° de Operación del Banco de la Nación (Cta. Cte. \`00-631-012948\`).
2. **Regístralo en la Plataforma:** Ingresa a [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) y completa los campos de DNI, fecha, hora, monto y archivo de imagen.
3. **Confirmación en Secretaría:** Si el trámite requiere entrega de expediente físico (como titulación o carné), acércate con el voucher original a la Secretaría General del campus en Paita Alta. En 24 a 48 horas recibirás la constancia oficial.`
  },
  {
    id: 'faq-ingles-titulacion-minedu',
    titulo: 'Curso de Inglés Institucional: Requisito Obligatorio de Titulación MINEDU',
    keywords: ['ingles', 'idioma', 'curso de ingles', 'titulacion ingles', 'minedu ingles', 'nivel a2', 'convalidar ingles', 'donde estudiar ingles', 'ingles obligatorio', 'pago ingles', 'cuenta ingles', '00-638-025736'],
    categorias: ['academico', 'tramites', 'pagos'],
    locucion: "¡Hola! Para titularte profesionalmente es indispensable acreditar el nivel básico A dos de inglés. Recuerda que el pago del curso se realiza en la cuenta específica del Banco de la Nación cero cero, seis tres ocho, cero dos cinco siete tres seis, y debes entregar dos copias de tu voucher en Tesorería. En tu pantalla te dejé los detalles.",
    respuesta: `🌐 **Reglamento del Curso de Idioma Extranjero (Inglés):**

* **¿Es Obligatorio?** **SÍ.** De acuerdo a la **Ley de Institutos N° 30512** y los lineamientos académicos del MINEDU, todo estudiante de educación superior tecnológica debe acreditar el **Nivel Básico A2 concluido** para tramitar su **Título Profesional Técnico a Nombre de la Nación**.
* 💳 **Pago Oficial del Curso de Inglés:** Se abona en el Banco de la Nación a la Cuenta Corriente N° **\`00-638-025736\`**.
* 📄 **Voucher:** Debes **sacar 2 copias legibles al voucher** y entregarlos en la oficina de **Tesorería** del instituto en Paita Alta.
* ⚠️ **Aviso de Tesorería (Lic. Omar García Reto):** Todos los participantes deben regularizar adeudos para no perjudicar la entrega de certificados del grupo ni el trámite de titulación. Coordinar con Tesorería (Srta. Tania Herrera Cruz).
* **¿Dónde se estudia?**
  1. **En el IESTP Hermanos Cárcamo:** El instituto dicta los módulos de inglés técnico y talleres de idiomas orientados a las carreras (APSTI, Negocios, Contabilidad y Pesquería).
  2. **Semi-presencial y Virtual:** Clases flexibles diseñadas para que los estudiantes cumplan las 120 horas lectivas requeridas.
* **¿Se puede convalidar si ya estudié inglés?**
  - **SÍ.** Si cuentas con certificado o constancia de nivel básico concluido emitido por un Centro de Idiomas universitario o instituto reconocido (ej. ICPNA, Británico, UNP), preséntalo por **Mesa de Partes** con un FUT solicitando la convalidación oficial.
* **¿A dónde acudir por consultas?**
  - A la **Jefatura de Unidad Académica**, **Tesorería** o **Secretaría General** en el campus central de Paita Alta.`
  },
  {
    id: 'faq-limite-edad',
    titulo: '¿Hay límite de edad para postular o estudiar en el instituto?',
    keywords: ['edad', 'limite de edad', 'edad maxima', 'edad minima', 'tengo 30', 'tengo 40', 'tengo 50', 'puedo estudiar si soy mayor', 'hasta que edad', 'edad para postular'],
    categorias: ['admision', 'general'],
    locucion: "¡Hola! En el Instituto Hermanos Cárcamo no hay ningún límite de edad. Solo necesitas haber terminado la secundaria y muchas personas que trabajan estudian con nosotros para superarse profesionalmente. ¡Todos son bienvenidos!",
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
    locucion: "¡Hola! Para las clases teóricas la vestimenta es casual formal, mientras que el uniforme institucional se usa en ceremonias cívicas y visitas a empresas. En talleres y laboratorios se exige calzado cerrado y equipos de protección.",
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
    locucion: "¡Hola! Sí puedes trabajar y estudiar al mismo tiempo. Las clases son por la mañana hasta la una y quince de la tarde, y si tu empleo está relacionado a tu carrera, puedes convalidar tus horas de trabajo como prácticas preprofesionales.",
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
    locucion: "¡Hola! Por la cercanía al Puerto de Paita y las plantas exportadoras, nuestros egresados técnicos tienen alta demanda laboral y sueldos que van desde dos mil doscientos hasta más de cuatro mil soles según la especialidad. En tu pantalla tienes el reporte.",
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
    locucion: "¡Hola! Si olvidaste tu clave del Sistema Académico, recuerda que tu usuario es tu D N I. Puedes solicitar el restablecimiento escribiendo por WhatsApp a Secretaría o mediante el enlace de recuperación en el Aula Virtual.",
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
    locucion: "¡Hola! Tienes un plazo de cinco días hábiles para justificar tus faltas por motivos de salud o trabajo en Secretaría. Esto es muy importante para evitar el límite del treinta por ciento de faltas y no quedar inhabilitado.",
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
    locucion: "¡Hola! Para titularte debes cumplir ochocientas veinte horas de prácticas preprofesionales distribuidas en los tres módulos de tu carrera. En tu pantalla te muestro los pasos para solicitar tu carta de presentación.",
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
    locucion: "¡Hola! Para obtener tu título a nombre de la nación debes aprobar los ciento veinte créditos de tu carrera, completar tus prácticas preprofesionales y acreditar el curso de inglés. En tu pantalla puedes ver las modalidades de titulación.",
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
    locucion: "¡Hola! El instituto está ubicado en la avenida Miguel Grau, urbanización El Parque, en Paita Alta. Si vienes en transporte público, cualquier colectivo que sube de Paita Baja te deja en la puerta principal.",
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
    locucion: "¡Hola! La academia Cepre te ofrece preparación intensiva con ingreso directo por evaluaciones continuas, mientras que el examen ordinario es una prueba única de admisión. Ambas modalidades te dan una vacante pública sin mensualidades.",
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
    locucion: "¡Hola! Con tu carné de educación superior del Minedu tienes derecho al medio pasaje urbano e interurbano todos los días de la semana. En tu pantalla tienes los requisitos para tramitarlo con Secretaría.",
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
    locucion: "¡Hola! Contamos con centros de cómputo modernos con fibra óptica, laboratorios de redes y telecomunicaciones, plantas piloto de calidad pesquera y talleres contables con software profesional. En tu pantalla puedes ver nuestras instalaciones.",
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
    locucion: "¡Hola! Al graduarte como profesional técnico, puedes convalidar tus tres años de estudio para continuar tu carrera universitaria en ingeniería de sistemas, administración o contabilidad. En tu pantalla te muestro las equivalencias.",
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
    locucion: "¡Hola! Puedes realizar tus pagos sin salir de casa mediante Págalo punto pe con tarjeta, o por transferencia bancaria y Yape utilizando nuestro código interbancario oficial. ¡En tu pantalla tienes el número para copiarlo con un toque!",
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
    locucion: "¡Hola! Nuestro campus cuenta con pabellón administrativo, centros de cómputo para sistemas, aulas climatizadas para negocios y contabilidad, planta piloto pesquera y biblioteca. En tu pantalla puedes ver la distribución de ambientes.",
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
    locucion: "¡Hola! El inicio de clases del primer semestre está programado para el lunes treinta y uno de marzo de dos mil veintiséis. En tu pantalla tienes el cronograma completo de matrículas, aniversarios y evaluaciones.",
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
    locucion: "¡Hola! Puedes tramitar y descargar tu certificado oficial de estudios secundarios con firma digital de forma gratuita a través de la web del Ministerio de Educación: certificado punto minedu punto gob punto pe. En tu pantalla te dejé el enlace directo.",
    respuesta: `📄 **Cómo Descargar tu Certificado Oficial de Secundaria Gratis:**

Para postular a la admisión del IESTP Hermanos Cárcamo ya no necesitas ir a tu colegio antiguo:
1. Ingresa a la plataforma oficial del Ministerio de Educación: **[certificado.minedu.gob.pe](https://certificado.minedu.gob.pe/)**.
2. Haz clic en *"Solicitar Certificado de Estudios"*.
3. Ingresa tu número de DNI y fecha de nacimiento.
4. Selecciona tu colegio de egreso en Piura o cualquier región del país.
5. El sistema generará tu **Certificado Oficial con Firma Digital y Código QR** con valor legal pleno.`
  },
  {
    id: 'faq-tupa-tramites-lista',
    titulo: 'Guía Completa del TUPA Institucional (16 Trámites Oficiales)',
    keywords: ['tupa', 'tramites tupa', 'costos tramites', 'tasas institucionales', 'lista de tramites', 'cuanto cuesta cada tramite', 'todos los tramites'],
    categorias: ['tramites'],
    locucion: "¡Hola! En el instituto disponemos de dieciséis procedimientos oficiales aprobados en nuestro TUPA institucional, entre ellos matrículas, certificados modulares, grado de bachiller técnico y titulación profesional. En tu pantalla tienes el tarifario oficial completo.",
    respuesta: `📋 **Compendio Oficial de Trámites y Tasas TUPA del IESTP Hermanos Cárcamo:**
*Los pagos se efectúan en el Banco de la Nación (Cta. Cte. N° **\`00-631-012948\`**) y se validan en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/).*

| N° | Trámite Institucional | Tasa Oficial (S/.) | Plazo Estimado |
|:---|:----------------------|:-------------------|:---------------|
| 1 | **Matrícula Regular Semestral** | S/. 120.00 | 24 - 48 horas |
| 2 | **Matrícula Extemporánea** | S/. 140.00 | 48 - 72 horas |
| 3 | **Certificado Modular Progresivo (I, II o III)** | S/. 45.00 | 7 a 10 días |
| 4 | **Título Profesional Técnico a Nombre de la Nación** | S/. 180.00 | 30 a 45 días |
| 5 | **Grado de Bachiller Técnico (Ley 30512)** | S/. 120.00 | 20 a 30 días |
| 6 | **Carné de Educación Superior MINEDU (Medio Pasaje)** | S/. 18.00 | Lote MINEDU |
| 7 | **Certificado Oficial de Estudios (Por Ciclo)** | S/. 25.00 | 3 a 5 días |
| 8 | **Certificado Oficial Completo (I al VI Ciclo)** | S/. 60.00 | 5 a 7 días |
| 9 | **Convalidación de Unidad Didáctica (Por curso)** | S/. 15.00 | 7 a 10 días |
| 10 | **Traslado Interno de Carrera** | S/. 40.00 | 5 a 7 días |
| 11 | **Traslado Externo Nacional** | S/. 70.00 | 7 a 12 días |
| 12 | **Reserva de Matrícula (Hasta 2 semestres)** | S/. 30.00 | 3 a 5 días |
| 13 | **Reincorporación de Estudios** | S/. 35.00 | 3 a 5 días |
| 14 | **Rectificación de Matrícula** | S/. 15.00 | 24 a 48 horas |
| 15 | **Constancia de Egresado y No Adeudo** | S/. 20.00 | 2 a 3 días |
| 16 | **Duplicado de Diploma de Título Técnico** | S/. 90.00 | 15 a 20 días |`
  },
  {
    id: 'faq-fut-mesa-de-partes',
    titulo: '¿Cómo llenar y presentar el Formulario Único de Trámite (FUT)?',
    keywords: ['fut', 'formulario unico de tramite', 'llenar fut', 'mesa de partes', 'presentar fut', 'modelo de fut', 'solicitud fut', 'descargar fut'],
    categorias: ['tramites'],
    locucion: "¡Hola! Para presentar cualquier trámite en el instituto debes utilizar el Formulario Único de Trámite. Puedes generarlo directamente con nuestro botón Generar FUT en la parte superior, o ingresar a la mesa de partes virtual las veinticuatro horas del día.",
    respuesta: `📄 **Guía para la Generación y Presentación del FUT Institucional:**

El **Formulario Único de Trámite (FUT)** es el documento oficial mediante el cual solicitas trámites académicos y administrativos ante la Dirección General:

* ⚡ **Generador de FUT en Pantalla:** Puedes pulsar el botón azul **"Generar FUT"** en la barra superior o escribir tus datos para previsualizar y descargar tu solicitud en formato PDF listo para imprimir o enviar.
* 📋 **Datos requeridos en el formulario:**
  1. **Sumilla:** Resumen claro del pedido (Ej: *"Solicito Emisión de Certificado Modular I"* o *"Solicito Justificación de Inasistencia"*).
  2. **Datos Personales:** Apellidos y nombres completos, DNI, dirección actual en Paita o Piura, celular y correo electrónico.
  3. **Programa de Estudio y Semestre:** Carrera técnica (APSTI, ANI, CONTA o DPA), ciclo y turno (diurno o nocturno).
  4. **Fundamentación:** Exposición breve de los hechos y base de la solicitud.
  5. **Anexos adjuntos:** Copia de DNI, voucher del Banco de la Nación y sustentos respectivos.
* 🌐 **Canales de Recepción:**
  - **Mesa de Partes Virtual 24/7:** [sistema.ieshercar.edu.pe/registro-tramite/](https://sistema.ieshercar.edu.pe/registro-tramite/)
  - **Mesa de Partes Presencial:** Campus Paita Alta (Lunes a Viernes de 8:00 a.m. a 3:00 p.m.).`
  },
  {
    id: 'faq-balotario-admision',
    titulo: 'Balotario Completo de Temas para el Examen de Admisión 2026',
    keywords: ['balotario', 'que viene en el examen', 'temas del examen', 'guia de examen', 'temario admision', 'balotario 2026', 'preguntas del examen', 'que estudiar'],
    categorias: ['admision'],
    locucion: "¡Hola! El examen ordinario de admisión consta de cien preguntas de opción múltiple con duración de tres horas. Abarca razonamiento matemático, razonamiento verbal, cultura general, ciencias y realidad de la región Piura. En tu pantalla tienes el temario detallado.",
    respuesta: `🎯 **Balotario Oficial y Estructura del Examen de Admisión 2026:**
*La prueba contiene 100 preguntas de opción múltiple (duración: 3 horas) distribuidas de la siguiente manera:*

1. 📐 **Razonamiento Lógico-Matemático (30% - 30 preguntas):**
   - Planteo de ecuaciones de primer y segundo grado.
   - Regla de tres simple directa e inversa, porcentajes y regla de interés.
   - Sucesiones numéricas, literales y figuras en serie.
   - Razones, proporciones y proporcionalidad geométrica.
   - Áreas, perímetros y análisis combinatorio elemental.
2. 📖 **Razonamiento Verbal y Comprensión Lectora (30% - 30 preguntas):**
   - Comprensión de textos científicos, económicos y descriptivos.
   - Sinónimos y antónimos contextuales.
   - Analogías verbales y términos excluidos.
   - Oraciones incompletas y conectores lógicos de causa, consecuencia y contraste.
3. 🏛️ **Cultura General y Realidad Regional / Nacional (20% - 20 preguntas):**
   - Historia y Geografía del Perú y de la Región Piura.
   - El Puerto de Paita, Terminales Portuarios Euroandinos (TPE) y comercio marítimo.
   - Héroes patrios: Miguel Grau Seminario y los Hermanos Cárcamo de Paita.
   - Poderes del Estado, Constitución Política y derechos ciudadanos.
4. 🔬 **Ciencias Básicas, Medio Ambiente y Tecnología (20% - 20 preguntas):**
   - Ecosistema del Mar Peruano, Corriente de Humboldt y biodiversidad marina.
   - Fundamentos de física y química aplicada a la materia y energía.
   - Tecnologías de la Información y Comunicación (TIC), ciberseguridad e internet.
   - Principios de higiene y normas sanitarias de inocuidad alimentaria (HACCP).`
  },
  {
    id: 'faq-certificacion-modular',
    titulo: '¿Cómo funciona la Certificación Modular Progresiva y para qué sirve?',
    keywords: ['certificacion modular', 'certificado modular', 'diploma modular', 'modulos formativos', 'titulo intermedio', 'certificados por ciclo'],
    categorias: ['academico', 'carreras'],
    locucion: "¡Hola! Las certificaciones modulares son diplomas oficiales del Ministerio de Educación que obtienes cada dos semestres al aprobar los cursos y prácticas de cada módulo. Te permiten trabajar formalmente en tu especialidad antes de terminar la carrera.",
    respuesta: `🥇 **Certificación Modular Progresiva — ¡Trabaja mientras estudias!**

En el IESTP Hermanos Cárcamo la formación técnica está dividida en **3 Módulos Formativos Oficiales**. Cada vez que completas un módulo (1 año académico / 2 semestres) obtienes un diploma con valor oficial MINEDU:

* 💻 **En APSTI (Sistemas y Redes):**
  - **Módulo I (Ciclos I y II):** *Soporte Técnico, Mantenimiento de Equipos y Redes de Cómputo*.
  - **Módulo II (Ciclos III y IV):** *Desarrollo de Software y Gestión de Bases de Datos*.
  - **Módulo III (Ciclos V y VI):** *Administración de Plataformas, Infraestructura Cloud y Seguridad*.
* 🚢 **En ANI (Negocios Internacionales):**
  - **Módulo I (Ciclos I y II):** *Gestión Comercial y Administrativa de Negocios*.
  - **Módulo II (Ciclos III y IV):** *Operatividad Aduanera y Despacho de Exportación / Importación (DAM)*.
  - **Módulo III (Ciclos V y VI):** *Logística Internacional, Depósitos Portuarios y Cadena de Frío*.
* 📊 **En CONTA (Contabilidad):**
  - **Módulo I (Ciclos I y II):** *Procesos Contables, Libros Principales y Planillas PLAME*.
  - **Módulo II (Ciclos III y IV):** *Costos Industriales y Liquidación Tributaria SUNAT (SIRE / PDT)*.
  - **Módulo III (Ciclos V y VI):** *Formulación de Estados Financieros, Auditoría y Sistema SIAF-SP*.
* 🐟 **En DPA (Pesquería y Acuicultura):**
  - **Módulo I (Ciclos I y II):** *Extracción, Navegación Marina y Artes de Pesca*.
  - **Módulo II (Ciclos III y IV):** *Producción Acuícola y Granjas de Especies Marinas*.
  - **Módulo III (Ciclos V y VI):** *Procesamiento de Congelados / Conservas y Calidad HACCP*.`
  },
  {
    id: 'faq-planta-piloto-pesquera',
    titulo: 'Planta Piloto Pesquera, Congelados y Laboratorio de Control de Calidad HACCP',
    keywords: ['planta piloto', 'laboratorio pesquero', 'haccp', 'conservas', 'congelado de pota', 'maquinarias dpa', 'autoclaves', 'selladoras', 'sanipes'],
    categorias: ['carreras', 'institucional'],
    locucion: "¡Hola! El instituto cuenta con una moderna Planta Piloto Pesquera y laboratorio de microbiología marina donde los estudiantes aprenden en la práctica el procesamiento de congelados de pota y conservas de pescado bajo estrictas normas de calidad sanitaria.",
    respuesta: `🐟 **Planta Piloto Pesquera y Laboratorio de Control de Calidad (DPA):**

El IESTP Hermanos Cárcamo cuenta con una de las infraestructuras de formación pesquera y acuícola más completas del norte del país:

* 🥫 **Línea de Enlatado y Conservas:**
  - Selladora semiautomática de latas de hojalata y aluminio.
  - Autoclave vertical de esterilización térmica con registro termométrico.
  - Marmitas de cocción y mesas de fileteo en acero inoxidable quirúrgico AISI 316.
* ❄️ **Línea de Congelado y Procesamiento Hidrobiológico:**
  - Túnel de congelación rápida para pota (*Dosidicus gigas*), pescado blanco y conchas de abanico.
  - Cámara de almacenamiento a temperatura bajo cero (-18°C a -25°C).
  - Detector de metales y balanzas de precisión para empaque al vacío.
* 🔬 **Laboratorio de Análisis Sensorial y Microbiológico:**
  - Equipos de incubación para recuento de mesófilos, coliformes y *Salmonella*.
  - Refractómetros, pH-metros digitales y termocuplas de penetración.
  - Taller de armado, corte y reparación de redes de enmalle, cerco y palangre.`
  },
  {
    id: 'faq-laboratorios-apsti-cisco',
    titulo: 'Laboratorios de Cómputo APSTI, Academia Cisco, Linux y Servidores Cloud',
    keywords: ['laboratorios apsti', 'cisco', 'redes', 'computadoras', 'servidores', 'linux', 'packet tracer', 'programacion', 'hardware', 'software'],
    categorias: ['carreras', 'institucional'],
    locucion: "¡Hola! Para la carrera de Sistemas y Redes contamos con tres centros de cómputo con procesadores Core i7, fibra óptica dedicada, switches y routers Cisco para prácticas reales de cableado y servidores Linux en la nube.",
    respuesta: `💻 **Centros de Cómputo de Alta Tecnología para APSTI:**

La carrera de **Arquitectura de Plataformas y Servicios TI** cuenta con equipamiento especializado de estándar corporativo:

* 🖥️ **Centros de Cómputo 1, 2 y 3:**
  - Estaciones de trabajo de alto rendimiento con procesadores Intel Core i7, 16 GB de RAM y almacenamiento SSD NVMe.
  - Monitores panorámicos de alta definición para programación y diseño web.
  - Conexión simétrica de fibra óptica dedicada para despliegues en la nube.
* 🌐 **Taller de Conectividad y Redes Cisco:**
  - Racks con routers y switches administrables Cisco Catalyst.
  - Patch panels, crimpadoras, herramientas Fluke para certificación de cableado estructurado Cat 6A.
  - Entorno de simulación de redes complejas con Cisco Packet Tracer y GNS3.
* ☁️ **Servidores y Entornos de Desarrollo:**
  - Virtualización con Proxmox, VMware y servidores locales Linux (Ubuntu Server / Debian / Rocky Linux).
  - Herramientas instaladas: Visual Studio Code, Git, Docker, Node.js, Python, MySQL Workbench, XAMPP, Android Studio y React.`
  },
  {
    id: 'faq-comercio-exterior-ani-vuce',
    titulo: 'Operaciones Aduaneras VUCE, DAM y Logística en el Puerto de Paita (ANI)',
    keywords: ['vuce', 'dam', 'aduanas', 'puerto de paita', 'tpe', 'incoterms', 'comercio exterior ani', 'agencia de aduana', 'exportacion pota mango'],
    categorias: ['carreras'],
    locucion: "¡Hola! Los estudiantes de Negocios Internacionales se capacitan directamente en el uso de la Ventanilla Única de Comercio Exterior, llenado de la Declaración Aduanera de Mercancías y logística de contenedores refrigerados en el Puerto de Paita.",
    respuesta: `🚢 **Operatividad Aduanera y Portuaria de Vanguardia (ANI):**

La carrera de **Administración de Negocios Internacionales** está directamente articulada con el movimiento logístico del **Puerto de Paita (Terminales Portuarios Euroandinos - TPE)**:

* 📦 **Ventanilla Única de Comercio Exterior (VUCE):** Capacitación en trámites sanitarios y fitosanitarios ante **SANIPES** (productos pesqueros), **SENASA** (mango, uva y banano orgánico) y **DIGESA**.
* 📋 **Declaración Aduanera de Mercancías (DAM):** Llenado y liquidación de tributos arancelarios de regímenes de exportación definitiva, importación para el consumo, drawback y admisión temporal.
* 🌐 **Incoterms 2020 y Logística de Contenedores:** Simulación y costeo de fletes marítimos en contenedores reefer (refrigerados) de 40 pies hacia Estados Unidos, la Unión Europea y Asia.
* 🔐 **Certificaciones Internacionales de Seguridad:** Conocimiento de las normas BASC (Alianza Empresarial para un Comercio Seguro) y OEA (Operador Económico Autorizado).`
  },
  {
    id: 'faq-contabilidad-sire-sunat',
    titulo: 'Tributación SIRE SUNAT, PDT 621, PLAME y Software Contable (CONTA)',
    keywords: ['sire', 'sire sunat', 'pdt 621', 'plame', 'concar', 'siscont', 'tributacion', 'impuestos', 'libros electronicos', 'declaracion sunat'],
    categorias: ['carreras'],
    locucion: "¡Hola! En la carrera de Contabilidad aprenderás a dominar el Sistema Integrado de Registros Electrónicos SIRE de la SUNAT, liquidar impuestos mensuales en el PDT, elaborar planillas en el PLAME y gestionar software como Concar.",
    respuesta: `📊 **Dominio Tributario y Tecnológico SUNAT (Contabilidad):**

El plan de estudios de **Contabilidad** forma profesionales con alta capacidad técnica para responder a las exigencias modernas de la administración tributaria:

* 🏛️ **Sistema Integrado de Registros Electrónicos (SIRE - SUNAT):**
  - Generación y aceptación de propuestas del Registro de Compras Electrónico (RCE) y Registro de Ventas e Ingresos Electrónico (RVIE).
  - Manejo de inconsistencias, reemplazos de propuesta y notas de crédito.
* 🧾 **Declaración y Liquidación Telemática:**
  - Formulario Virtual Declara Fácil N° 621 (IGV - Renta Mensual).
  - Planilla Electrónica Mensual (PLAME) y T-Registro para contratos laborales y aportes a EsSalud / ONP.
  - Declaración Jurada Anual del Impuesto a la Renta de Tercera Categoría.
* 💻 **Software y Herramientas Especializadas:**
  - Talleres prácticos con Concar, Siscont y software de gestión contable-financiera.
  - Manejo de Sistemas Integrados de Administración Financiera del Estado (SIAF-SP) para trabajar en municipalidades y entidades públicas.`
  },
  {
    id: 'faq-convenios-empresas-paita',
    titulo: 'Convenios Empresariales y Alianzas Estratégicas en Paita y Piura',
    keywords: ['convenios', 'empresas con convenio', 'alianzas', 'donde trabajar', 'hayduk', 'seafrost', 'tpe', 'empresas paita', 'bolsa laboral empresas'],
    categorias: ['institucional', 'tramites'],
    locucion: "¡Hola! El instituto mantiene convenios activos con las empresas pesqueras, logísticas y agroindustriales más importantes de la provincia de Paita, facilitando pasantías, prácticas profesionales remuneradas y empleo directo para nuestros egresados.",
    respuesta: `🤝 **Red de Convenios y Alianzas Estratégicas del IESTP Hermanos Cárcamo:**

Gracias a su ubicación estratégica en el polo pesquero y portuario más importante del norte del país, el instituto cuenta con vínculos directos con:

* 🚢 **Sector Portuario y Comercio Exterior:**
  - **Terminales Portuarios Euroandinos (TPE Paita):** Pasantías operativas en patio de contenedores y áreas administrativas.
  - **Ransa Comercial y Medlog:** Operaciones de almacenamiento aduanero y distribución física.
  - **Agencias Marítimas y de Aduanas de Paita:** Prácticas para asistentes de despacho aduanero.
* 🐟 **Sector Pesquero e Hidrobiológico:**
  - **Seafrost S.A.C.:** Planta congeladora líder en Paita (prácticas en aseguramiento de calidad HACCP y congelado de pota).
  - **Corporación Hayduk y Austral Group:** Plantas procesadoras de conservas y harina de pescado.
  - **Pesquera Diamante y Consorcio de Alimentos:** Puestos técnicos en producción y sanidad.
* 💼 **Sector Agroindustrial y Financiero:**
  - **Empresas agroexportadoras del Valle del Chira:** Exportación de banano orgánico, mango y uva.
  - **Caja Municipal de Piura y Cajas de Ahorro:** Plazas para asistentes contables y créditos.
  - **Municipalidad Provincial de Paita:** Convenios interinstitucionales de apoyo técnico y social.`
  },
  {
    id: 'faq-seguro-sis-estudiantil',
    titulo: 'Seguro Integral de Salud (SIS Gratuito) y Tópico de Salud',
    keywords: ['sis', 'seguro gratis', 'seguro sis', 'topico', 'medico', 'enfermedad', 'atencion medica', 'accidente estudiantil'],
    categorias: ['bienestar'],
    locucion: "¡Hola! Todos los estudiantes matriculados que no cuenten con EsSalud tienen derecho a afiliarse gratuitamente al Seguro Integral de Salud. En el campus contamos con un tópico médico de atención inmediata para cualquier emergencia de salud.",
    respuesta: `🏥 **Atención Médica y Seguro Integral de Salud (SIS Gratuito):**

En el marco de la política de bienestar estudiantil del Ministerio de Educación:

* 🛡️ **Afiliación al SIS Gratuito:**
  - Si no estás asegurado en EsSalud ni en un seguro privado, la **Oficina de Bienestar Estudiantil** tramita tu afiliación inmediata al SIS Gratuito.
  - Cobertura completa de consultas médicas, medicinas, exámenes de laboratorio, hospitalización y cirugías en postas médicas y en el **Hospital Las Mercedes de Paita**.
* 🩺 **Tópico Médico del Campus Paita Alta:**
  - Atención primaria de emergencias, primeros auxilios, curaciones y control de signos vitales.
  - Horario de atención: Lunes a Viernes de 8:00 a.m. a 2:00 p.m.
  - Para afiliarte solo debes acercarte con tu **DNI original** a la Oficina de Bienestar Estudiantil.`
  },
  {
    id: 'faq-reserva-matricula',
    titulo: '¿Cómo solicitar Reserva de Matrícula o Licencia de Estudios?',
    keywords: ['reserva de matricula', 'reservar matricula', 'licencia de estudios', 'dejar de estudiar temporalmente', 'guardar vacante', 'posponer estudios'],
    categorias: ['academico', 'tramites'],
    locucion: "¡Hola! Si por motivos de trabajo, salud o familiares necesitas suspender tus estudios, puedes solicitar formalmente la reserva de tu vacante hasta por dos semestres consecutivos para no perder tus cursos aprobados ni tu derecho de ingreso.",
    respuesta: `⏸️ **Guía para Solicitar Reserva de Matrícula (Licencia de Estudios):**

Si por razones de fuerza mayor no puedes continuar el semestre, reserva tu vacante formalmente para proteger tu récord académico:

* ⏳ **Plazo para Solicitar:** Debe tramitarse dentro de los primeros **30 días calendario** de iniciado el semestre lectivo.
* 📌 **Periodo Máximo:** Puedes reservar tu matrícula hasta por **2 semestres académicos consecutivos** (1 año lectivo).
* 📋 **Requisitos:**
  1. Formulario Único de Trámite (FUT) dirigido a la Dirección General exponiendo el motivo justificado.
  2. Voucher de pago del Banco de la Nación por derecho de Reserva de Matrícula (**S/. 30.00**).
  3. No registrar adeudos con biblioteca ni laboratorios.
* 🔄 **Reincorporación:** Al término de tu reserva, presentas solicitud de reincorporación quince días antes de iniciar el nuevo semestre para retomar tus clases con total normalidad.`
  },
  {
    id: 'faq-traslado-interno-externo',
    titulo: 'Requisitos para Traslados Internos y Traslados Externos',
    keywords: ['traslado', 'traslado interno', 'traslado externo', 'cambiar de carrera', 'venir de otra universidad', 'traslado desde piura', 'cambio de instituto'],
    categorias: ['academico', 'tramites'],
    locucion: "¡Hola! Si deseas cambiarte de carrera dentro del instituto o vienes de otra universidad o instituto público o privado, puedes solicitar traslado interno o externo antes del inicio del semestre académico. En tu pantalla tienes los requisitos.",
    respuesta: `🔀 **Modalidades de Traslado Estudiantil en el IESTP Hermanos Cárcamo:**

1. 🔄 **Traslado Interno (Cambio de Programa de Estudio dentro del Instituto):**
   - **Requisito:** Haber aprobado por lo menos el I Semestre en la carrera de origen (APSTI, ANI, CONTA o DPA).
   - **Procedimiento:** Presentar FUT solicitando traslado y justificación vocacional durante el periodo de matrícula + tasa TUPA de S/. 40.00.
   - **Convalidación:** Los cursos transversales de formación general (comunicación, matemática, inglés, TIC) se convalidan automáticamente.

2. 🏛️ **Traslado Externo Nacional (Desde otro Instituto o Universidad):**
   - **Requisito:** Proceder de una institución de educación superior con autorización oficial del MINEDU o SUNEDU.
   - **Documentos:** Certificado oficial de estudios de la institución de procedencia, sílabos visados y constancia de no haber sido separado por sanción disciplinaria.
   - **Tasa TUPA:** S/. 70.00. La comisión académica evalúa créditos y emite Resolución Directoral de convalidación.`
  },
  {
    id: 'faq-bachiller-tecnico-sunedu',
    titulo: '¿Qué es el Grado de Bachiller Técnico y qué ventajas ofrece?',
    keywords: ['bachiller tecnico', 'grado de bachiller', 'bachillerato tecnico', 'ley 30512', 'diferencia entre bachiller y titulo', 'puedo hacer maestria'],
    categorias: ['academico', 'titulacion'],
    locucion: "¡Hola! La Ley de Institutos reconoce el Grado de Bachiller Técnico para egresados de carreras de tres años que aprueben un proyecto de aplicación. Te otorga rango superior para ascensos laborales y postular a maestrías en universidades.",
    respuesta: `🎓 **Grado de Bachiller Técnico (Amparo en la Ley N° 30512):**

El Grado de **Bachiller Técnico** es un grado académico de nivel superior que otorga prestigio y validez en el mercado profesional:

* 🚀 **¿Cómo se obtiene?**
  1. Haber aprobado satisfactoriamente los **120 créditos curriculares** de la carrera técnica (6 semestres).
  2. Haber culminado y sustentado un **Trabajo de Aplicación Profesional** o Proyecto de Innovación Tecnológica.
  3. Acreditar el dominio de un idioma extranjero (Inglés nivel A2).
* 🌟 **Beneficios y Ventajas Clave:**
  - **Continuidad de Estudios de Posgrado:** Permite postular directamente a diplomados y maestrías de especialización técnica y profesional en universidades nacionales e internacionales.
  - **Reconocimiento Salarial:** Habilita el acceso a plazas de nivel técnico profesional y escalas salariales superiores en el Estado (Ley SERVIR) y empresas privadas.
  - **Inscripción Oficial:** Se inscribe en el Registro Nacional de Grados y Títulos del Ministerio de Educación.`
  },
  {
    id: 'faq-actividades-extracurriculares',
    titulo: 'Deportes, Talleres Culturales y Proyección Social Estudiantil',
    keywords: ['deportes', 'campeonatos', 'talleres', 'aniversario', 'copa hercar', 'danzas', 'musica', 'actividades', 'feria'],
    categorias: ['institucional', 'bienestar'],
    locucion: "¡Hola! En el instituto promovemos el desarrollo integral: realizamos las olimpiadas deportivas Copa Hermanos Cárcamo, festivales de danzas folclóricas, ferias gastronómicas pesqueras en el puerto y proyectos de voluntariado en Paita.",
    respuesta: `🏆 **Vida Estudiantil, Cultura, Deporte y Tradición:**

El IESTP Hermanos Cárcamo fomenta la integración, el trabajo en equipo y el liderazgo de sus estudiantes:

* ⚽ **Olimpiadas Deportivas "Copa Hermanos Cárcamo":** Campeonatos intercarreras de fulbito femenino/masculino, vóley y básquetbol durante la Semana Técnica y el Aniversario Institucional.
* 🎭 **Elencos de Arte y Danzas Folclóricas:** Participación en desfiles cívicos, pasacalles y concursos regionales de marinera norteña, tondero y estampas costumbristas piuranas.
* 🐟 **Feria Tecnológica e Innovación Marina:** Exposición anual abierta al público de Paita donde los alumnos de DPA preparan degustaciones de conservas artesanales y hamburguesas de pota, y los de APSTI presentan aplicaciones móviles.
* 🤝 **Proyección Social y Cuidado Ambiental:** Campañas de limpieza de playas en Paita y Yacila, jornadas de reforestación y soporte técnico gratuito a comedores populares.`
  },
  {
    id: 'faq-wifi-biblioteca-virtual',
    titulo: '¿Cómo acceder a la red Wi-Fi institucional y a la Biblioteca Virtual?',
    keywords: ['wifi', 'clave wifi', 'internet campus', 'biblioteca virtual', 'biblioteca latina', 'yoleo', 'libros virtuales', 'como entrar a la biblioteca'],
    categorias: ['plataformas', 'institucional'],
    locucion: "¡Hola! En todo el campus disponemos de la red Wi-Fi Hermanos Cárcamo para estudiantes. Además, puedes acceder a más de cincuenta mil libros digitales en la Biblioteca Virtual Latina ingresando con tu DNI.",
    respuesta: `📶 **Acceso a Wi-Fi del Campus y Biblioteca Virtual 24/7:**

* 📡 **Conexión Wi-Fi Estudiantil:**
  - **Nombre de Red (SSID):** \`HERCAR-ESTUDIANTES\`
  - **Cobertura:** Pabellones de aulas, laboratorios de cómputo, biblioteca y losa deportiva.
  - **Acceso:** Solicita la contraseña semestral en el Centro de Cómputo APSTI portando tu carné o constancia de matrícula.
* 📚 **Biblioteca Virtual Latina (Acceso Gratuito 24/7):**
  - **Enlace de Ingreso:** [iestphercar.bibliotecalatina.com](https://iestphercar.bibliotecalatina.com/login)
  - **Usuario:** Tu número de **DNI**.
  - **Contraseña Inicial:** Tu número de DNI (se sugiere cambiarla al ingresar).
  - **Contenido:** Miles de libros digitales completos de Ingeniería de Software, Comercio Internacional, Auditoría SUNAT, Biología Marina, Acuicultura y Metodología de Investigación.`
  },
  {
    id: 'faq-duplicado-documentos',
    titulo: '¿Cómo solicitar Duplicado de Título o Certificados por pérdida?',
    keywords: ['duplicado de titulo', 'perdi mi titulo', 'duplicado certificado', 'denuncia policial', 'recuperar certificado', 'tramitar duplicado'],
    categorias: ['tramites'],
    locucion: "¡Hola! En caso de pérdida o deterioro de tu título técnico o certificado oficial, puedes tramitar un duplicado presentando la denuncia policial original, copia de DNI y voucher del Banco de la Nación en Secretaría Académica.",
    respuesta: `📑 **Procedimiento para Obtención de Duplicados Oficiales:**

1. 👮 **Denuncia Policial:** Realiza la denuncia formal por pérdida o robo de documento en cualquier comisaría de la Policía Nacional del Perú (PNP) o comisaría digital.
2. 📰 **Publicación en Diario (Solo para Título):** Realiza una publicación de aviso de pérdida en un diario de circulación regional de Piura (La Hora, El Tiempo o diario judicial).
3. 💳 **Pago en el Banco de la Nación:**
   - Duplicado de Título Profesional Técnico: **S/. 90.00**
   - Duplicado de Certificado Modular: **S/. 40.00**
   - Duplicado de Certificado de Estudios: **S/. 35.00**
4. 🏢 **Presentación:** Ingresa expediente completo con FUT por Mesa de Partes para emisión de la Resolución Directoral de Duplicado con registro en el MINEDU.`
  },
  {
    id: 'faq-examen-extraordinario-subsanacion',
    titulo: '¿Cómo es la Evaluación de Recuperación Pedagógica y Subsanación?',
    keywords: ['recuperacion', 'subsanacion', 'jale un curso', 'examen de recuperacion', 'desaprobados', 'nota 10', 'nota 11', 'nota 12', 'como apruebo'],
    categorias: ['academico'],
    locucion: "¡Hola! Si al terminar el semestre obtienes un promedio final entre diez y doce en un curso, tienes derecho al examen de recuperación pedagógica en la semana dieciocho. Si obtienes trece o más, apruebas la asignatura.",
    respuesta: `🎯 **Reglamento de Recuperación Pedagógica y Subsanación:**

El régimen de evaluación en el IESTP Hermanos Cárcamo es vigesimal (0 a 20) y la nota mínima aprobatoria es **13**:

* 📝 **Derecho a Evaluación de Recuperación:**
  - Aplica a estudiantes que al finalizar la semana 17 obtengan un promedio final entre **10, 11 y 12**.
  - Se rinde durante la **semana 18 del semestre** ante el docente titular de la asignatura.
  - La nota máxima que puede consignarse en el acta de recuperación es **13**.
* ⚠️ **Casos de Repitencia Directa:**
  - Si el promedio final es **igual o menor a 09**, desapruebas sin derecho a recuperación pedagógica.
  - Si tienes condición de **DPI (Desaprobado por Inasistencias al superar el 30% de faltas)**, tu nota final es cero cinco (05) y debes repetir la unidad didáctica obligatoriamente en el siguiente periodo.`
  },
  {
    id: 'faq-horario-atencion-mesa-partes',
    titulo: 'Canales y Horarios de Mesa de Partes Presencial y Virtual',
    keywords: ['mesa de partes horario', 'mesa de partes virtual', 'correo mesa de partes', 'donde dejar documentos', 'telefono mesa de partes', 'atencion presencial'],
    categorias: ['contacto', 'tramites'],
    locucion: "¡Hola! Nuestra mesa de partes virtual recibe solicitudes las veinticuatro horas en sistema punto i e s hercar punto edu punto pe. Para atención presencial te esperamos de lunes a viernes de ocho de la mañana a tres de la tarde en el campus de Paita Alta.",
    respuesta: `📬 **Canales de Atención de Mesa de Partes Institucional:**

* 🌐 **Mesa de Partes Virtual (24 horas / 7 días):**
  - **Enlace directo:** [sistema.ieshercar.edu.pe/registro-tramite/](https://sistema.ieshercar.edu.pe/registro-tramite/)
  - Permite ingresar trámites con FUT en PDF y comprobante del Banco de la Nación desde cualquier celular o PC.
  - Recibes un número de expediente y código de seguimiento para consultar el estado en tiempo real.
* 🏛️ **Mesa de Partes Presencial:**
  - **Ubicación:** Pabellón Administrativo, Ventanilla 1, Campus Paita Alta.
  - **Horario:** Lunes a Viernes de 8:00 a.m. a 3:00 p.m. continuo.
* ✉️ **Correo de Consultas:** \`mesadepartes@ieshercar.edu.pe\` / \`ieshercar@ieshercar.edu.pe\`
* 📞 **Teléfono de Mesa de Partes:** (073) 251013`
  },
  {
    id: 'faq-cepre-becas-directas',
    titulo: 'Academia CEPRE-HERCAR: Metodología, Simulacros y Vacantes de Ingreso Directo',
    keywords: ['cepre hercar', 'ciclo cero', 'ingreso directo cepre', 'academia cepre', 'vacantes cepre', 'cuanto dura cepre', 'simulacros cepre'],
    categorias: ['admision'],
    locucion: "¡Hola! La Academia Cepre-Hercar es nuestro programa oficial de preparación pre-superior. Cuenta con ocho semanas de clases intensivas, simulacros quincenales y vacantes de ingreso directo para los mejores puntajes.",
    respuesta: `🎯 **Academia Preuniversitaria y Técnica CEPRE-HERCAR:**

La mejor vía de preparación e ingreso directo para estudiantes de Paita, Sullana y Piura:

* 📚 **Características del Programa:**
  - **Duración:** 8 a 10 semanas de preparación intensiva (Enero a Marzo).
  - **Turnos:** Mañana (8:00 a.m. a 1:00 p.m.) y Tarde (2:00 p.m. a 7:00 p.m.).
  - **Plana Docente:** Profesores especialistas en razonamiento matemático, lenguaje, ciencias y cultura regional.
* 🏆 **Ingreso Directo:**
  - El **30% al 40% del total de vacantes de admisión** se reservan exclusivamente para ser cubiertas por estricto orden de mérito en la Academia CEPRE-HERCAR.
  - Se rinden **3 Exámenes Parciales Acumulativos**. Los estudiantes que alcancen los primeros puestos obtienen su constancia de ingreso directo sin rendir el examen ordinario.`
  },
  {
    id: 'faq-perfil-egresado-apsti',
    titulo: 'Perfil Profesional, Tecnologías y Campo Laboral de APSTI',
    keywords: ['perfil apsti', 'que hace un apsti', 'sueldo apsti', 'tecnologias apsti', 'trabajo programador paita', 'sistemas paita'],
    categorias: ['carreras'],
    locucion: "¡Hola! Como profesional en APSTI serás especialista en desarrollo de software web y móvil, administración de redes corporativas Cisco, gestión de bases de datos y soporte en la nube, con sueldos desde dos mil doscientos hasta más de cuatro mil quinientos soles.",
    respuesta: `💻 **Perfil del Egresado en Arquitectura de Plataformas y Servicios TI:**

* 🛠️ **Habilidades Clave:**
  - Creación de plataformas web modernas con JavaScript, React, Node.js y Python.
  - Diseño y administración de bases de datos relacionales en MySQL, SQL Server y PostgreSQL.
  - Configuración de redes de datos empresariales, routers y switches Cisco.
  - Seguridad informática, protección contra intrusiones y despliegues en servidores cloud (AWS / GCP).
* 💼 **Oportunidades de Empleo en Paita y Piura:**
  - Departamentos de TI en terminales portuarios (TPE Paita) y almacenes aduaneros.
  - Empresas pesqueras industriales administrando servidores de planta y conectividad marítima.
  - Entidades financieras (Caja Piura, bancos) y municipalidades de la región.
  - Trabajo remoto para empresas tecnológicas nacionales e internacionales.`
  },
  {
    id: 'faq-perfil-egresado-ani',
    titulo: 'Perfil Profesional y Alta Demanda Laboral en el Puerto de Paita (ANI)',
    keywords: ['perfil ani', 'que hace un administrador de negocios', 'sueldo ani', 'campo laboral aduanas paita', 'trabajo comercio exterior'],
    categorias: ['carreras'],
    locucion: "¡Hola! El egresado en Negocios Internacionales es el gestor clave de exportaciones e importaciones en el Puerto de Paita. Maneja la VUCE, aduanas, logística de contenedores refrigerados y contratos globales con sueldos de dos mil a cinco mil soles.",
    respuesta: `🚢 **Perfil del Egresado en Administración de Negocios Internacionales:**

* 🌐 **Habilidades Clave:**
  - Coordinación de despachos aduaneros de exportación e importación en la Intendencia de Aduana de Paita (SUNAT).
  - Trámites fitosanitarios y de origen en la Ventanilla Única de Comercio Exterior (VUCE).
  - Gestión de fletes marítimos, reservas de espacio naviero y cadena de frío en contenedores reefer.
  - Negociación internacional con compradores de Europa, Asia y Norteamérica bajo Incoterms 2020.
* 💼 **Oportunidades de Empleo en Paita y Piura:**
  - Agencias de aduanas líderes y operadores logísticos internacionales (Ransa, Medlog, Neptunia).
  - Empresas agroexportadoras del Valle del Chira (mango, uva, banano orgánico, palta).
  - Empresas conserveras y exportadoras de pota y pescado congelado en Paita y Talara.`
  },
  {
    id: 'faq-perfil-egresado-conta',
    titulo: 'Perfil Profesional y Asesoría Tributaria Independiente (Contabilidad)',
    keywords: ['perfil contabilidad', 'que hace un contador tecnico', 'sueldo contador', 'estudio contable paita', 'campo laboral contabilidad'],
    categorias: ['carreras'],
    locucion: "¡Hola! Como profesional en Contabilidad serás el consultor financiero y tributario indispensable para empresas pesqueras, comerciales y estudios contables, liquidando impuestos ante la SUNAT y formulando balances generales.",
    respuesta: `📊 **Perfil del Egresado en Contabilidad:**

* 🧾 **Habilidades Clave:**
  - Elaboración y análisis integral de Estados Financieros bajo Normas Internacionales de Información Financiera (NIIF).
  - Liquidación mensual de impuestos en el sistema SIRE de la SUNAT y PDT 621.
  - Cálculo de costos de producción en plantas pesqueras, agrícolas e industriales.
  - Manejo de planillas electrónicas PLAME, CTS, gratificaciones y beneficios laborales.
* 💼 **Oportunidades de Empleo:**
  - Contralorías y jefaturas de costos en empresas pesqueras y comerciales de Paita y Piura.
  - Asistente o auditor contable en estudios tributarios y firmas de auditoría.
  - Gestión presupuestal con el sistema SIAF en municipalidades y entidades públicas.
  - Ejercicio libre de la profesión asesorando a pequeñas y medianas empresas (MYPEs).`
  },
  {
    id: 'faq-perfil-egresado-dpa',
    titulo: 'Perfil Profesional en Plantas de Congelado, Acuicultura y HACCP (DPA)',
    keywords: ['perfil dpa', 'que hace pesqueria', 'sueldo pesqueria', 'jefe de calidad haccp', 'acuicultura paita', 'plantas pesqueras trabajo'],
    categorias: ['carreras'],
    locucion: "¡Hola! El egresado en Desarrollo Pesquero y Acuícola es el profesional insignia de Paita. Supervisa líneas de congelado y conservas de pescado, dirige el aseguramiento de calidad HACCP y gestiona centros acuícolas de concha de abanico con sueldos de dos mil quinientos a seis mil soles.",
    respuesta: `🐟 **Perfil del Egresado en Desarrollo Pesquero y Acuícola:**

* 🌊 **Habilidades Clave:**
  - Supervisión de líneas de producción de congelado rápido de pota, calamar y pescado blanco.
  - Manejo de autoclaves, selladoras y formulación de conservas marinas enlatadas.
  - Implementación y auditoría de sistemas de inocuidad alimentaria HACCP, BPM y normativas BRC / FDA.
  - Cultivo y reproducción de concha de abanico, langostinos y peces marinos en sistemas acuícolas.
* 💼 **Oportunidades de Empleo en Paita y la Costa Peruana:**
  - Jefe o inspector de aseguramiento de la calidad e inocuidad en plantas procesadoras pesqueras.
  - Supervisor de producción en congeladoras y conserveras de Paita, Sechura, Chimbote y Pisco.
  - Técnico extensionista en el Organismo Nacional de Sanidad Pesquera (SANIPES) o IMARPE.
  - Administrador de centros de cultivo acuícola de concha de abanico en la bahía de Sechura.`
  },
  {
    id: 'faq-historia-hermanos-carcamo',
    titulo: 'Historia de los Hermanos Cárcamo y Fundación del Instituto en Paita',
    keywords: ['quienes fueron los hermanos carcamo', 'historia del instituto', 'fundacion', 'por que hermanos carcamo', 'heroes carcamo', 'historia de paita'],
    categorias: ['institucional'],
    locucion: "¡Hola! El instituto lleva el nombre de los ilustres Hermanos Cárcamo en honor a los héroes navales y civiles paiteños que defendieron con honor las costas de nuestra patria en el mar de Paita. El instituto fue fundado mediante resolución ministerial para liderar la formación tecnológica del norte peruano.",
    respuesta: `⚓ **Legado Histórico y Fundación del IESTP "Hermanos Cárcamo":**

* 🎖️ **¿Quiénes fueron los Hermanos Cárcamo?**
  - Los ilustres **Hermanos Cárcamo** fueron patriotas y marinos paiteños cuya valentía y lealtad a la nación quedaron grabadas en la historia de la provincia de Paita y la costa norte del Perú.
  - Su ejemplo cívico y sacrificio naval inspiró la denominación del instituto para forjar una juventud con disciplina, honor y compromiso con el desarrollo marítimo y tecnológico.
* 🏛️ **Creación Institucional:**
  - Fundado como institución pública de educación superior tecnológica para dar respuesta al auge pesquero, portuario y comercial de Paita.
  - A lo largo de casi 4 décadas de trayectoria ha formado a más de 30 promociones de profesionales técnicos que hoy lideran empresas, puertos y entidades en todo el Perú y el extranjero.`
  },
  {
    id: 'faq-reglamento-asistencia-puntualidad',
    titulo: 'Reglamento Interno: Tolerancia de Ingreso, Faltas y Permisos',
    keywords: ['tolerancia', 'horario de entrada', 'tarde', 'puntualidad', 'reglamento de asistencia', 'cuantos minutos de tolerancia', 'faltas'],
    categorias: ['academico', 'institucional'],
    locucion: "¡Hola! En el instituto la tolerancia de ingreso es de diez minutos. Recuerda que la asistencia se registra en cada unidad didáctica y superar el treinta por ciento de inasistencias genera desaprobación por DPI sin derecho a examen.",
    respuesta: `⏰ **Normativa de Asistencia, Puntualidad y Permanencia:**

* ⏱️ **Tolerancia de Ingreso a Clases:**
  - Se otorga una **tolerancia máxima de 10 minutos** al inicio de la primera hora pedagógica.
  - Pasada la tolerancia, el docente consignará tardanza o inasistencia según el avance de la sesión.
* 🚨 **Regla de Oro del 30% (DPI):**
  - Según el reglamento nacional de educación superior tecnológica del MINEDU, el estudiante que acumule el **30% o más de inasistencias injustificadas** queda desaprobado automáticamente con nota cero cinco (**05 - DPI**).
* 📋 **Procedimiento de Permisos:**
  - Los permisos por comisiones académicas, deportivas o de salud deben ser autorizados previamente por la Jefatura de Unidad Académica.`
  },
  {
    id: 'faq-modalidades-titulacion',
    titulo: 'Modalidades de Titulación: Proyecto de Innovación vs. Examen de Suficiencia',
    keywords: ['modalidades de titulacion', 'proyecto de innovacion', 'tesis o examen', 'sustentacion', 'examen de suficiencia', 'como titularme facil'],
    categorias: ['titulacion'],
    locucion: "¡Hola! Puedes titularte mediante la sustentación de un Proyecto de Innovación Productiva orientado al puerto o las empresas de Paita, o rindiendo el Examen de Suficiencia Profesional. Ambas alternativas te otorgan el título a nombre de la nación.",
    respuesta: `🎓 **Comparativa de Modalidades de Titulación Profesional Técnica:**

1. 💡 **Modalidad A: Proyecto de Innovación Tecnológica / Plan de Negocio (Recomendada):**
   - **En qué consiste:** Elaboración y sustentación pública de una propuesta de mejora productiva o solución tecnológica aplicable al entorno de Paita (ej. sistema web para almacenes portuarios, nuevo producto a base de pota, etc.).
   - **Participantes:** Puede realizarse de forma individual o en equipos de hasta **2 estudiantes**.
   - **Asesoría:** El instituto designa un docente especialista para acompañar el desarrollo en los ciclos V y VI.

2. 📝 **Modalidad B: Examen de Suficiencia Profesional:**
   - **En qué consiste:** Evaluación integral de competencias teóricas y prácticas ante un jurado calificador docente.
   - **Estructura:** Consta de una prueba de conocimientos de los 3 módulos formativos y una demostración práctica en laboratorio o taller.
   - **Calificación:** Aprobación con nota mínima de **13** en escala vigesimal.`
  },
  {
    id: 'faq-carnet-medio-pasaje-tramite',
    titulo: 'Paso a paso para tramitar el Carné Universitario / Técnico MINEDU',
    keywords: ['pasos carnet', 'como sacar carnet', 'tramite de carnet', 'foto para carnet', 'medio pasaje tramitar', 'donde pagar carnet'],
    categorias: ['bienestar', 'tramites'],
    locucion: "¡Hola! Para tramitar tu carné de medio pasaje oficial del Minedu, solo debes abonar la tasa de dieciocho soles en el Banco de la Nación, validar tu comprobante en la plataforma de pagos y entregar tu foto digital formal con fondo blanco en Secretaría.",
    respuesta: `🚌 **Paso a Paso para Tramitar tu Carné de Educación Superior MINEDU:**

1. 💳 **Pago en el Banco de la Nación:**
   - Monto: **S/. 18.00** a la Cuenta Corriente N° **\`00-631-012948\`**.
   - Sube tu voucher a [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) eligiendo el concepto *"Carné de Medio Pasaje"*.
2. 📸 **Especificaciones de la Fotografía:**
   - Fotografía digital a color tamaño carnet (formato JPG o PNG).
   - Fondo blanco liso, sin sombras, tomada de frente con rostro descubierto.
   - Vestimenta formal o camisa/blusa oscura (no polos informales ni gorras/gafas).
3. 🏢 **Registro en Secretaría Académica:**
   - Envía tu archivo de foto indicando DNI, apellidos y carrera a Secretaría o cárgala en la convocatoria del portal institucional.
4. 📬 **Entrega:**
   - El MINEDU procesa el carné con chip de seguridad y la institución realiza la entrega física en campus para su uso inmediato.`
  }
];

const CURSO_INGLES_INSTITUTO = {
  nombre: 'Curso de Idioma Extranjero - Inglés (Básico e Intermedio / Inglés Técnico)',
  institucion: 'IESTP Hermanos Cárcamo - Paita',
  finalidad: 'Requisito obligatorio para la Titulación Profesional Técnica según la Ley N° 30512 del MINEDU y desarrollo de competencias bilingües para el puerto de Paita y el mercado global.',
  cuentaBN: '00-638-025736',
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
    'Realizar el depósito en el Banco de la Nación a la Cuenta específica del Curso de Inglés N° 00-638-025736.',
    'Sacar 2 copias legibles al voucher de pago original.',
    'Entregar el voucher original y las 2 copias en la Oficina de Tesorería del instituto (Campus Paita Alta).',
    'Regularizar cualquier adeudo pendiente con Tesorería (Coordinación: Srta. Tania Herrera Cruz / Lic. Omar García Reto).',
    'La entrega de certificados se realiza cuando todo el grupo esté al día sin deudas para no retrasar el proceso de titulación.'
  ],
  avisoTesoreria: 'La entrega de certificados de inglés para la titulación se realiza cuando no haya adeudos en el grupo. Todos los estudiantes deben regularizar sus cuotas en Tesorería para no perjudicar la emisión grupal ni el trámite de titulación.',
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
  },
  {
    area: 'Cultura y Comercio Portuario (20%)',
    pregunta: '¿Qué empresa opera y administra actualmente la concesión del Terminal Portuario de Paita?',
    opciones: [
      'ENAPU Perú',
      'Terminales Portuarios Euroandinos (TPE)',
      'APM Terminals',
      'DP World'
    ],
    correcta: 1, // TPE
    explicacion: 'Terminales Portuarios Euroandinos (TPE) es el concesionario oficial que administra y moderniza el Terminal Portuario de Paita desde 2009.'
  },
  {
    area: 'Ciencias del Mar y Ecología (20%)',
    pregunta: '¿Qué fenómeno oceanográfico enriquece con nutrientes y fitoplancton las aguas del mar de Paita, convirtiéndolo en uno de los más productivos del planeta?',
    opciones: [
      'El fenómeno de la Niña Modoki',
      'El afloramiento costero de la Corriente Peruana (Humboldt)',
      'La corriente cálida del Niño en verano',
      'La marea roja tóxica'
    ],
    correcta: 1, // Afloramiento
    explicacion: 'El afloramiento costero impulsado por la Corriente de Humboldt asciende aguas frías ricas en sales minerales y nutrientes, sustentando la biomasa de anchoveta, pota y peces.'
  },
  {
    area: 'Razonamiento Matemático (30%)',
    pregunta: 'Encuentra el número que continúa lógicamente la sucesión: 4, 9, 19, 39, ...',
    opciones: ['59', '69', '79', '89'],
    correcta: 2, // 79
    explicacion: 'El patrón es multiplicar por 2 y sumar 1: 4*2+1 = 9; 9*2+1 = 19; 19*2+1 = 39; 39*2+1 = 79.'
  },
  {
    area: 'Tecnología y Redes APSTI (20%)',
    pregunta: 'En arquitectura de redes de datos, ¿cuál es el dispositivo encargado de interconectar diferentes subredes y encaminar paquetes mediante direcciones IP?',
    opciones: ['Switch (Conmutador)', 'Router (Enrutador)', 'Hub (Concentrador)', 'Access Point'],
    correcta: 1, // Router
    explicacion: 'El router opera en la Capa 3 (Red) del modelo OSI y es el encargado de elegir la mejor ruta para enviar paquetes IP entre redes distintas.'
  },
  {
    area: 'Comercio Exterior e Incoterms 2020 (20%)',
    pregunta: 'En comercio internacional, ¿qué regla Incoterms 2020 establece que el exportador cumple su obligación cuando pone la mercancía a disposición del comprador a bordo del buque en el puerto de embarque designado?',
    opciones: ['EXW (Ex Works)', 'FOB (Free on Board)', 'CIF (Cost, Insurance and Freight)', 'DDP (Delivered Duty Paid)'],
    correcta: 1, // FOB
    explicacion: 'Bajo FOB (Franco a Bordo), el vendedor carga la mercancía en el buque en el puerto acordado (ej. FOB Paita) y el comprador asume el flete marítimo y seguro.'
  },
  {
    area: 'Tributación y Contabilidad (20%)',
    pregunta: 'En el Perú, ¿cuál es la tasa vigente del Impuesto General a las Ventas (IGV) aplicable en las operaciones comerciales gravadas?',
    opciones: ['15%', '16%', '18% (16% IGV + 2% IPM)', '19%'],
    correcta: 2, // 18%
    explicacion: 'La tasa total es del 18%, compuesta por 16% correspondiente al IGV y 2% al Impuesto de Promoción Municipal (IPM).'
  },
  {
    area: 'Razonamiento Verbal - Conectores (30%)',
    pregunta: 'Completa la oración: "El postulante repasó a conciencia todo el balotario del IESTP Hermanos Cárcamo; ________, obtuvo el puntaje más alto en el examen de admisión."',
    opciones: ['sin embargo', 'por consiguiente', 'no obstante', 'a pesar de que'],
    correcta: 1, // por consiguiente
    explicacion: '"Por consiguiente" o "por lo tanto" es el conector consecutivo de causa-efecto adecuado para indicar el resultado favorable del estudio.'
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
  { id: 'tupa-matricula-ext', nombre: 'Matrícula Extemporánea', costo: 140, categoria: 'Academico', icon: 'bi-clock-history', detalle: 'Matrícula con recargo fuera de fecha oficial' },
  { id: 'tupa-carne', nombre: 'Carné de Educación Superior MINEDU (Medio Pasaje)', costo: 18, categoria: 'Bienestar', icon: 'bi-card-heading', detalle: 'Carné oficial con vigencia anual según Ley 26271' },
  { id: 'tupa-cert-modular', nombre: 'Certificado Modular Progresivo (Por Módulo)', costo: 45, categoria: 'Certificaciones', icon: 'bi-award', detalle: 'Diploma oficial por culminar Módulo I, II o III' },
  { id: 'tupa-constancia-estudios', nombre: 'Constancia de Estudios / Notas / Egresado', costo: 20, categoria: 'Documentos', icon: 'bi-file-earmark-text', detalle: 'Emisión en 2 a 3 días hábiles con firma y sello' },
  { id: 'tupa-cert-estudios-ciclo', nombre: 'Certificado Oficial de Estudios (Por Ciclo)', costo: 25, categoria: 'Documentos', icon: 'bi-file-earmark-ruled', detalle: 'Certificado oficial con asignaturas y calificaciones' },
  { id: 'tupa-cert-estudios-comp', nombre: 'Certificado Oficial Completo (I al VI Ciclo)', costo: 60, categoria: 'Documentos', icon: 'bi-folder-check', detalle: 'Certificado de récord integral de los 6 semestres' },
  { id: 'tupa-admision-ordinario', nombre: 'Carpeta e Inscripción Examen Ordinario', costo: 150, categoria: 'Admision', icon: 'bi-person-check', detalle: 'Derecho a examen de 100 preguntas y balotario' },
  { id: 'tupa-convalidacion', nombre: 'Convalidación de Unidad Didáctica (Por Curso)', costo: 15, categoria: 'Academico', icon: 'bi-arrow-left-right', detalle: 'Para traslados de universidades u otros institutos' },
  { id: 'tupa-traslado-interno', nombre: 'Traslado Interno de Carrera Profesional', costo: 40, categoria: 'Academico', icon: 'bi-shuffle', detalle: 'Cambio de especialidad en el instituto' },
  { id: 'tupa-traslado-externo', nombre: 'Traslado Externo Nacional', costo: 70, categoria: 'Academico', icon: 'bi-box-arrow-in-right', detalle: 'Provenientes de otra institución superior' },
  { id: 'tupa-reserva-matricula', nombre: 'Reserva de Matrícula (Hasta 2 semestres)', costo: 30, categoria: 'Academico', icon: 'bi-pause-circle', detalle: 'Licencia temporal con vacante asegurada' },
  { id: 'tupa-reincorporacion', nombre: 'Reincorporación de Estudios', costo: 35, categoria: 'Academico', icon: 'bi-arrow-clockwise', detalle: 'Retorno formal tras reserva de vacante' },
  { id: 'tupa-bachiller-tecnico', nombre: 'Grado de Bachiller Técnico (Ley 30512)', costo: 120, categoria: 'Titulacion', icon: 'bi-mortarboard', detalle: 'Grado académico superior oficial MINEDU' },
  { id: 'tupa-titulacion', nombre: 'Título Profesional Técnico a Nombre de la Nación', costo: 180, categoria: 'Titulacion', icon: 'bi-award-fill', detalle: 'Sustentación de proyecto e inscripción oficial en MINEDU' },
  { id: 'tupa-duplicado-titulo', nombre: 'Duplicado de Diploma de Título Técnico', costo: 90, categoria: 'Titulacion', icon: 'bi-files', detalle: 'Por pérdida o deterioro previa denuncia' }
];

/**
 * DIRECTORIO Y AMBIENTES DEL CAMPUS PAITA ALTA
 */
const CAMPUS_AMBIENTES_HERCAR = [
  { ambiente: 'Pabellón Administrativo', descripcion: 'Dirección General, Jefatura Académica, Secretaría General, Mesa de Partes y Ventanilla de Caja', icon: 'bi-building' },
  { ambiente: 'Centros de Cómputo APSTI (1, 2 y 3)', descripcion: 'Laboratorios equipados con computadoras Core i7, fibra óptica de alta velocidad y servidores de prueba', icon: 'bi-laptop' },
  { ambiente: 'Taller de Conectividad y Redes Cisco', descripcion: 'Racks con routers y switches Cisco, patch panels y herramientas para cableado estructurado', icon: 'bi-hdd-network' },
  { ambiente: 'Planta Piloto Pesquera (DPA)', descripcion: 'Autoclaves verticales, selladoras de conservas, cámaras de congelado y mesas de fileteo en acero quirúrgico', icon: 'bi-box-seam' },
  { ambiente: 'Laboratorio de Microbiología y Control de Calidad HACCP', descripcion: 'Incubadoras biológicas, equipos de medición físico-química y análisis de inocuidad marina', icon: 'bi-water' },
  { ambiente: 'Aulas Climatizadas de Negocios y Contabilidad', descripcion: 'Salas de proyección multimedia, simulación de despacho aduanero y software contable Concar/Siscont', icon: 'bi-calculator' },
  { ambiente: 'Centro de Recursos y Biblioteca Virtual Latina', descripcion: 'Espacios de lectura, computadoras de consulta y acceso a miles de libros digitales 24/7', icon: 'bi-book' },
  { ambiente: 'Tópico de Salud y Consejería', descripcion: 'Atención médica inmediata de primeros auxilios y afiliación activa gratuita al SIS', icon: 'bi-hospital' },
  { ambiente: 'Auditorio Central Institucional "Hermanos Cárcamo"', descripcion: 'Sala magna para conferencias, ceremonias de graduación y seminarios de innovación', icon: 'bi-people' },
  { ambiente: 'Losa Polideportiva y Cafetín', descripcion: 'Espacios recreativos para fulbito, vóley, campeonatos intercarreras y descanso estudiantil', icon: 'bi-trophy' }
];

/**
 * INFORMACIÓN INSTITUCIONAL OFICIAL EXTRAÍDA DEL PORTAL WEB (https://ieshercar.edu.pe/)
 */
const DATOS_OFICIALES_PORTAL = {
  portalUrl: 'https://ieshercar.edu.pe/',
  resolucionCreacion: 'Resolución Ministerial N° 232-87-ED',
  resolucionRevalidacion: 'Resolución Ministerial N° 0528-2006-ED',
  lema: 'Formando Profesionales y Construyendo Oportunidades',
  objetivo: 'Promover el desarrollo integral del estudiante mediante una formación académica, cultural y deportiva de alta calidad, contribuyendo al progreso de la comunidad y al prestigio de nuestro Instituto Tecnológico.',
  direccion: 'Av. Grau Mz. A Lt. 001 - Urb. El Parque, Paita, Piura, Perú',
  telefono: '(073) 251013',
  celularOrientacion: '969100257',
  correo: 'ieshercar@ieshercar.edu.pe',
  horarioAtencion: 'Lunes a viernes de 8:00 a. m. a 3:00 p. m.',
  cuentaMatriculaBN: '00-638-002361',
  cuentaInstitucionalBN: '00-631-012948',
  codigoCCI: '018-631-000631012948-52',
  portalPagos: 'https://pagos.ieshercar.edu.pe/',
  portalAcademico: 'https://sistema.ieshercar.edu.pe/acceso',
  aulaVirtual: 'https://aula.ieshercar.edu.pe/',
  reglamentoInterno: 'Reglamento Interno 2025, Versión 02 (Aprobado el 11 de junio de 2025)',
  comiteDefensaEstudiante: 'CODE regido por RD N° 046-2021 para protección estudiantil, prevención y atención de quejas o denuncias'
};

/**
 * PLANA DOCENTE OFICIAL PUBLICADA EN EL PORTAL INSTITUCIONAL (20 Docentes / 4 Carreras)
 * Fuente: https://ieshercar.edu.pe/Nosotros/Estructura_Organizativa/Plana-Docente/
 */
const PLANA_DOCENTE_OFICIAL = [
  // Arquitectura de Plataformas y Servicios de TI (APSTI)
  { id: 'doc-apsti-1', nombre: 'José Hernández Panta', carreraId: 'apsti', carrera: 'Arquitectura de Plataformas y Servicios de TI', cvPublicado: true, perfil: 'Especialista en desarrollo de software, arquitectura de sistemas y bases de datos.' },
  { id: 'doc-apsti-2', nombre: 'Javier Jaramillo Atoche', carreraId: 'apsti', carrera: 'Arquitectura de Plataformas y Servicios de TI', cvPublicado: true, perfil: 'Docente en redes de computadoras, conectividad y soporte tecnológico.' },
  { id: 'doc-apsti-3', nombre: 'Luis Cherre Lizama', carreraId: 'apsti', carrera: 'Arquitectura de Plataformas y Servicios de TI', cvPublicado: true, perfil: 'Especialista en sistemas operativos, servidores e infraestructura tecnológica.' },
  { id: 'doc-apsti-4', nombre: 'Erick Denegri Arizapana', carreraId: 'apsti', carrera: 'Arquitectura de Plataformas y Servicios de TI', cvPublicado: true, perfil: 'Docente en programación avanzada, aplicaciones empresariales y tecnologías cloud.' },
  { id: 'doc-apsti-5', nombre: 'Juan Ruidias Casaverde', carreraId: 'apsti', carrera: 'Arquitectura de Plataformas y Servicios de TI', cvPublicado: true, perfil: 'Especialista en plataformas web, bases de datos y seguridad informática.' },

  // Administración de Negocios Internacionales (ANI)
  { id: 'doc-ani-1', nombre: 'Eduardo Masías de la Rosa', carreraId: 'ani', carrera: 'Administración de Negocios Internacionales', cvPublicado: true, perfil: 'Especialista en comercio exterior, logística portuaria y gestión aduanera.' },
  { id: 'doc-ani-2', nombre: 'Yemina Vite Piedra', carreraId: 'ani', carrera: 'Administración de Negocios Internacionales', cvPublicado: true, perfil: 'Docente en marketing internacional, administración y gestión empresarial.' },
  { id: 'doc-ani-3', nombre: 'Paola Manrique Purizaca', carreraId: 'ani', carrera: 'Administración de Negocios Internacionales', cvPublicado: true, perfil: 'Especialista en finanzas internacionales, formulación de proyectos y exportaciones.' },
  { id: 'doc-ani-4', nombre: 'Karolina Grace Farfán Cavero', carreraId: 'ani', carrera: 'Administración de Negocios Internacionales', cvPublicado: true, perfil: 'Docente en investigación de mercados, tratados comerciales y legislación aduanera.' },
  { id: 'doc-ani-5', nombre: 'Juan García Reto', carreraId: 'ani', carrera: 'Administración de Negocios Internacionales', cvPublicado: true, perfil: 'Especialista en operatividad portuaria, aduanas y distribución física internacional.' },

  // Contabilidad
  { id: 'doc-conta-1', nombre: 'Nelly Julca García', carreraId: 'conta', carrera: 'Contabilidad', cvPublicado: true, perfil: 'Especialista en formulación de estados financieros, auditoría y normas internacionales contables.' },
  { id: 'doc-conta-2', nombre: 'José Llontop Pasache', carreraId: 'conta', carrera: 'Contabilidad', cvPublicado: true, perfil: 'Docente en tributación, gestión fiscal, SUNAT y software contable empresarial.' },
  { id: 'doc-conta-3', nombre: 'Nilda Panta Flores', carreraId: 'conta', carrera: 'Contabilidad', cvPublicado: true, perfil: 'Especialista en costos, presupuestos y operaciones contables comerciales.' },
  { id: 'doc-conta-4', nombre: 'Edson Maza Gonzales', carreraId: 'conta', carrera: 'Contabilidad', cvPublicado: true, perfil: 'Docente en finanzas empresariales, análisis de balances y control de gestión.' },
  { id: 'doc-conta-5', nombre: 'Daniel Olaya Castillo', carreraId: 'conta', carrera: 'Contabilidad', cvPublicado: true, perfil: 'Especialista en contabilidad gubernamental, finanzas públicas y auditoría tributaria.' },

  // Desarrollo Pesquero y Acuícola (DPA)
  { id: 'doc-dpa-1', nombre: 'Rocío Chapa Tume', carreraId: 'dpa', carrera: 'Desarrollo Pesquero y Acuícola', cvPublicado: true, perfil: 'Especialista en procesamiento de productos hidrobiológicos, congelados y conservas.' },
  { id: 'doc-dpa-2', nombre: 'Dalila Barrios Cruz', carreraId: 'dpa', carrera: 'Desarrollo Pesquero y Acuícola', cvPublicado: true, perfil: 'Docente en sistemas de cultivo acuícola, biología marina y gestión ambiental.' },
  { id: 'doc-dpa-3', nombre: 'Fabiola Pinto Granda', carreraId: 'dpa', carrera: 'Desarrollo Pesquero y Acuícola', cvPublicado: true, perfil: 'Especialista en control de calidad, aseguramiento sanitario (HACCP / SANIPES) e inocuidad.' },
  { id: 'doc-dpa-4', nombre: 'Bertha Rufasto Kanashiro', carreraId: 'dpa', carrera: 'Desarrollo Pesquero y Acuícola', cvPublicado: true, perfil: 'Docente en tecnología pesquera, evaluación de recursos marinos y sostenibilidad costera.' },
  { id: 'doc-dpa-5', nombre: 'Sergio Panta Jacinto', carreraId: 'dpa', carrera: 'Desarrollo Pesquero y Acuícola', cvPublicado: true, perfil: 'Especialista en artes de pesca, navegación, operaciones de flota y manejo de recursos marinos.' }
];




