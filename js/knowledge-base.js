/**
 * BASE DE CONOCIMIENTO INSTITUCIONAL ULTRA COMPLETA Y CONECTADA
 * IESTP "HERMANOS CÁRCAMO" - PAITA, PIURA
 * Fuente Oficial: https://ieshercar.edu.pe/ y TUPA 2026 (R.D. N° 020-2026)
 * Incluye Comunicados Oficiales 2026, 4 Carreras (con transición APSTI -> Computación e Informática 2027),
 * Plana Docente Oficial, Estadísticas 2022-2026, TUPA 2026 Completo (2 Cuentas BN),
 * Requisitos de Examen de Suficiencia Profesional y Trámite de Título Profesional.
 */

const COMUNICADOS_OFICIALES = [
  {
    id: 'comunicado-pagos-tupa-2026',
    titulo: 'Comunicado Oficial de Tesorería: Pagos Exclusivos en Ventanilla del Banco de la Nación (TUPA 2026)',
    fecha: 'Vigente 2026 — R.D. N° 020-2026',
    importante: true,
    resumen: 'Se recuerda a estudiantes y postulantes que NO se aceptan pagos por Págalo.pe, agentes MultiRed, Yape ni Plin. Todos los abonos se realizan únicamente en ventanilla del Banco de la Nación en la Cta. Cte. N° 00-638-002361 (Trámites TUPA, Matrícula S/ 250, Admisión, Título y Suficiencia) o Cta. N° 00-638-025736 (Curso de Inglés S/ 400, CEPRE S/ 400, Actualización y Ceremonia).',
    enlacePlataforma: 'https://pagos.ieshercar.edu.pe/',
    indicaciones: 'Indicar DNI y nombres completos del estudiante en el voucher. Para trámites TUPA (00-638-002361), registrar el voucher en pagos.ieshercar.edu.pe para generar boleta electrónica y llevar copias a Tesorería. Para Curso de Inglés (00-638-025736), sacar 2 copias al voucher y entregarlos en Tesorería en la oficina del instituto.'
  },
  {
    id: 'comunicado-apsti-2027-computacion',
    titulo: 'Actualización Académica 2027: APSTI pasará a denominarse Computación e Informática',
    fecha: 'Proyección Institucional 2027',
    importante: true,
    resumen: 'El programa de estudios de Arquitectura de Plataformas y Servicios de Tecnologías de la Información (APSTI) proyecta para el año 2027 su actualización de denominación a Computación e Informática, fortaleciendo las competencias en desarrollo de software, redes, servidores, bases de datos y tecnologías emergentes.',
    enlacePlataforma: 'https://ieshercar.edu.pe/Carrera/APSTI/',
    indicaciones: 'Actualmente en 2026 funciona como APSTI y en el 2027 será Computación e Informática. Las otras 3 carreras continúan siendo Administración de Negocios Internacionales, Contabilidad y Desarrollo Pesquero y Acuícola.'
  },
  {
    id: 'comunicado-admision-ordinario-2026',
    titulo: 'Resultados Oficiales y Cuadro de Mérito: Examen Ordinario de Admisión 2026',
    fecha: 'Marzo 2026 — Publicación Oficial',
    importante: true,
    resumen: 'Publicación oficial del Cuadro de Méritos General con los postulantes que alcanzaron vacante en los 4 programas de estudio: Arquitectura de Plataformas y Servicios de TI (APSTI), Administración de Negocios Internacionales, Contabilidad y Desarrollo Pesquero y Acuícola.',
    enlaceDrive: 'https://drive.google.com/file/d/1tbEWl2oBRglGp9QWx012TIE66yYBS1VN/view?usp=drive_link',
    enlacePlataforma: 'https://sistema.ieshercar.edu.pe/acceso',
    indicaciones: 'Los ingresantes deben acercarse a Secretaría Académica portando DNI original y voucher/boleta de matrícula validada (Cta. BN 00-638-002361) para recoger su Constancia Oficial de Ingreso.'
  },
  {
    id: 'comunicado-cepre-2026',
    titulo: 'Comunicado: Academia Pre Tecno Hercar / CEPRE 2026 (Resultados Finales e Ingreso Directo)',
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
    resumen: 'El IESTP Hermanos Cárcamo como instituto tecnológico público orienta la postulación a las becas integrales del Estado peruano para estudiantes de alto rendimiento y condición SISFOH.',
    enlacePlataforma: 'https://ieshercar.edu.pe/Informacion_Academica/Becas/becas.php',
    indicaciones: 'Beneficios otorgados por el Estado: laptop, subvención económica mensual para alimentación y movilidad local, materiales de estudio y titulación. Asesoría presencial en la Oficina de Bienestar y Empleabilidad.'
  },
  {
    id: 'comunicado-calendario-2026',
    titulo: 'Calendario Académico Oficial: Periodos 2026-I y 2026-II',
    fecha: 'Aprobado por Dirección General',
    importante: false,
    resumen: 'Segundo período académico 2026-II: Matrícula ordinaria del 17 al 21 de agosto, inicio de clases el lunes 24 de agosto de 2026, retroalimentación y recuperación del 14 al 18 de diciembre, culminación el 24 de diciembre y entrega de boletas de notas del 28 al 30 de diciembre de 2026.',
    enlacePlataforma: 'https://ieshercar.edu.pe/Tramites/Matricula/',
    indicaciones: 'Revisa tus unidades didácticas en sistema.ieshercar.edu.pe. Recuerda que el límite máximo de inasistencias es del 30% para no desaprobar por DPI.'
  },
  {
    id: 'comunicado-pagos-video',
    titulo: 'Video Instructivo Oficial: Sistema de Registro de Pagos (Banco de la Nación)',
    fecha: 'Vigente para el Periodo 2026',
    importante: true,
    resumen: 'Tutorial oficial paso a paso para que estudiantes y postulantes de APSTI, ANI, Contabilidad y DPA registren sus comprobantes de ventanilla del Banco de la Nación en pagos.ieshercar.edu.pe.',
    enlaceDrive: 'https://drive.google.com/file/d/1kYBJhVXOqO7BoQUpMZmYs-1E59gIUV9h/view?usp=sharing',
    enlacePlataforma: 'https://pagos.ieshercar.edu.pe/',
    indicaciones: 'Verifica que el DNI, nombres completos del estudiante, número de operación, fecha e importe sean claramente legibles para generar tu boleta electrónica y validarla en Tesorería.'
  },
  {
    id: 'comunicado-matricula-2026',
    titulo: 'Proceso de Matrícula y Ratificación Semestral en el Sistema Institucional',
    fecha: 'Cronograma Académico 2026',
    importante: false,
    resumen: 'Matrícula ordinaria para ingresantes y regulares (TUPA 2026: S/ 250.00). El pago se realiza exclusivamente en ventanilla del Banco de la Nación a la Cta. Cte. N° 00-638-002361 (no se aceptan pagos en agentes ni Págalo.pe).',
    enlacePlataforma: 'https://ieshercar.edu.pe/Tramites/Matricula/',
    indicaciones: 'Indicar DNI y nombres completos en el voucher, registrarlo en pagos.ieshercar.edu.pe para obtener boleta electrónica, llevar voucher original y 3 copias de la boleta a Tesorería para sellado y entregar 1 copia sellada y firmada en Secretaría Académica.'
  },
  {
    id: 'comunicado-bolsa-trabajo-puerto',
    titulo: 'Bolsa de Trabajo y Pasantías: Nuevas Plazas en Empresas del Puerto de Paita',
    fecha: 'Convenios Estratégicos 2026',
    importante: false,
    resumen: 'Convocatoria laboral y prácticas preprofesionales con Terminales Portuarios Euroandinos (TPE), empresas conserveras, exportadoras hidrobiológicas, agencias de aduanas y estudios contables de Paita.',
    enlacePlataforma: 'https://bolsalaboral.ieshercar.edu.pe/',
    indicaciones: 'Presentar Curriculum Vitae documentado en Bienestar y Empleabilidad o registrar solicitud por Mesa de Partes Virtual (sistema.ieshercar.edu.pe/registro-tramite/).'
  },
  {
    id: 'comunicado-carne-minedu',
    titulo: 'Emisión de Carné de Educación Superior MINEDU (Medio Pasaje Oficial)',
    fecha: 'Convocatoria MINEDU 2026',
    importante: false,
    resumen: 'Trámite del carné oficial emitido por el Ministerio de Educación para el beneficio de medio pasaje en el transporte público urbano e interurbano según Ley N° 26271.',
    indicaciones: 'Estar formalmente matriculado en el semestre en curso, entregar fotografía digital tamaño carnet a color con fondo blanco y abonar la tasa oficial en ventanilla del Banco de la Nación (Cta. Cte. 00-638-002361).'
  },
  {
    id: 'comunicado-practicas-efsrt',
    titulo: 'Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT)',
    fecha: 'Prácticas Preprofesionales Modulares',
    importante: false,
    resumen: 'Requisitos y presentación de cartas de presentación y constancias de prácticas en empresas pesqueras, agencias de aduanas, terminales portuarios y estudios contables de Paita.',
    indicaciones: 'Cumplir con las horas de prácticas por cada módulo formativo para la obtención del Certificado Modular progresivo.'
  },
  {
    id: 'comunicado-bienestar-psicologia',
    titulo: 'Servicio de Psicopedagogía, Tutoría Integral y Seguro SIS Gratuito',
    fecha: 'Atención Permanente 2026',
    importante: false,
    resumen: 'La Unidad de Bienestar y Empleabilidad brinda atención psicológica gratuita, orientación vocacional, Comité de Defensa del Estudiante (CODE), soporte emocional y afiliación al SIS.',
    enlacePlataforma: 'https://ieshercar.edu.pe/Informacion_Academica/Bienestar_Empleabilidad/',
    indicaciones: 'Horario de atención: Lunes a Viernes de 8:00 a.m. a 3:00 p.m. en el campus de Av. Grau Mz. A Lt. 001 – Urb. El Parque, Paita.'
  },
  {
    id: 'comunicado-seminario-tecnologico',
    titulo: 'Jornada de Actualización Tecnológica y Seminario de Innovación Portuaria 2026',
    fecha: 'Capacitación Extracurricular',
    importante: false,
    resumen: 'Ciclo de conferencias y talleres prácticos en Inteligencia Artificial aplicada a la productividad, Ciberseguridad, Gestión Aduanera en la Ventanilla Única de Comercio Exterior (VUCE) y Tributación SUNAT.',
    enlacePlataforma: 'https://ieshercar.edu.pe/',
    indicaciones: 'Abierto para estudiantes de los 4 programas de estudio.'
  },
  {
    id: 'comunicado-aniversario-39',
    titulo: '39° Aniversario de Fundación Institucional del IESTP Hermanos Cárcamo (1987 - 2026)',
    fecha: 'Celebración Institucional 2026',
    importante: true,
    resumen: 'Conmemoración de 39 años formando a los mejores profesionales técnicos de Paita y la región Piura. Creación mediante R.M. N° 232-87-ED y revalidación mediante R.M./R.D. N° 0528-2006-ED.',
    enlacePlataforma: 'https://ieshercar.edu.pe/Nosotros/Historia/',
    indicaciones: 'Participan los 4 programas: APSTI (próxima Computación e Informática 2027), Negocios Internacionales, Contabilidad y Desarrollo Pesquero y Acuícola.'
  },
  {
    id: 'comunicado-convalidacion-universitaria',
    titulo: 'Convenios de Articulación y Convalidación Universitaria para Egresados Titulados',
    fecha: 'Oportunidad de Complementación Profesional',
    importante: true,
    resumen: 'Los titulados pueden convalidar sus 3 años de formación modular para obtener el Grado de Bachiller e Ingeniería o Licenciatura universitaria en menor tiempo.',
    enlacePlataforma: 'https://sistema.ieshercar.edu.pe/registro-tramite/',
    indicaciones: 'Aplica para APSTI / Computación e Informática (Ing. de Sistemas / Informática), ANI (Administración / Comercio Exterior), Contabilidad y Desarrollo Pesquero y Acuícola.'
  },
  {
    id: 'comunicado-feria-innovacion-paita',
    titulo: 'Feria Tecnológica, Productiva y de Negocios "Paita Innova 2026"',
    fecha: 'Exposición Anual de Proyectos',
    importante: false,
    resumen: 'Encuentro donde los estudiantes presentan prototipos de software, sistemas web, planes de exportación portuaria, consultorías tributarias y alimentos hidrobiológicos innovadores.',
    enlacePlataforma: 'https://ieshercar.edu.pe/',
    indicaciones: 'Vinculación directa con empresas portuarias, pesqueras y cámaras de comercio de la región.'
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
  matriculaOficial: 'https://ieshercar.edu.pe/Tramites/Matricula/',
  tupaPdf: 'https://ieshercar.edu.pe/public/assets/documentos-institucionales/tupa-2026.pdf',
  tupaPagina: 'https://ieshercar.edu.pe/Transparencia/TUPA/',
  planaDocente: 'https://ieshercar.edu.pe/Nosotros/Estructura_Organizativa/Plana-Docente/',
  estadisticasConvenios: 'https://ieshercar.edu.pe/Transparencia/Estadisticas-Convenios/',
  bienestarEmpleabilidad: 'https://ieshercar.edu.pe/Informacion_Academica/Bienestar_Empleabilidad/',
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
  tipo: 'Institución Pública de Educación Superior Tecnológica (Educación Pública sin mensualidades - MINEDU)',
  creacion: {
    resolucionCreacion: 'Resolución Ministerial N.° 232-87-ED (09 de mayo de 1987)',
    resolucionRevalidacion: 'Resolución Ministerial / Directoral N.° 0528-2006-ED',
    trayectoria: 'Más de 39 años de trayectoria formando profesionales técnicos para el desarrollo de Paita, Piura y el Perú'
  },
  mision: 'Institución educativa de nivel superior que forma profesionales técnicos competitivos, íntegros, con sentido crítico y social, que responden a las demandas del contexto local, regional, nacional y global, contribuyendo a la mejora de la calidad y desarrollo de nuestra sociedad, con valores, inclusión y sostenibilidad ambiental.',
  vision: 'Al 2032, ser una institución educativa licenciada, líder en la formación tecnológica integral, con programas de estudio que responden a los desafíos de la sociedad, promoviendo la calidad educativa, inclusión, medio ambiente, emprendimiento, innovación, relacionando la oferta formativa con la demanda laboral, en un contexto local, regional, nacional y global.',
  valores: ['Puntualidad', 'Honestidad', 'Respeto', 'Trabajo en Equipo', 'Compromiso', 'Ética'],
  autoridades: {
    director: 'Econ. Adolfo Zeta Pazo',
    cargoDirector: 'Director General (e)',
    jefeAcademico: 'Lic. Juan García Reto',
    cargoAcademico: 'Jefe de Unidad Académica',
    jefeAdministrativo: 'CPC Edson Maza Gonzales',
    cargoAdministrativo: 'Jefe de Unidad Administrativa'
  },
  ubicacion: {
    direccion: 'Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita, Piura',
    referencia: 'Av. Miguel Grau – Urb. El Parque Mz. A Lote 01, Paita Alta',
    horario: 'Lunes a Viernes de 8:00 a.m. a 3:00 p.m.'
  },
  contacto: {
    telefonoFijo: '(073) 251013',
    celularWhatsApp: '969 100 257',
    correoGeneral: 'ieshercar@ieshercar.edu.pe',
    correoTramites: 'tramitesiestphermanoscarcamo@gmail.com',
    correoSecretaria: 'secretaria@ieshercar.edu.pe'
  },
  bancoNacion: {
    banco: 'Banco de la Nación del Perú',
    titular: 'IESTP Hermanos Cárcamo - Paita',
    cuentaCorriente: '00-638-002361',
    cuentaGeneralTupa: '00-638-002361',
    cuentaActividadesIngles: '00-638-025736',
    canalAutorizado: 'Únicamente en ventanillas del Banco de la Nación. NO se aceptan pagos en Págalo.pe, agentes MultiRed, Yape ni Plin.',
    indicacionGeneral: 'Para trámites TUPA (00-638-002361): indicar DNI y nombres completos en el voucher, registrarlo en pagos.ieshercar.edu.pe para generar la boleta electrónica y llevar el voucher original y copias a Tesorería para el sellado.',
    indicacionIngles: 'Para Curso de Inglés y Actividades Productivas (00-638-025736): depositar en ventanilla del Banco de la Nación, sacar 2 copias al voucher y entregarlos en Tesorería en la oficina del instituto.'
  }
};

/**
 * PLANA DOCENTE OFICIAL (Fuente: https://ieshercar.edu.pe/Nosotros/Estructura_Organizativa/Plana-Docente/)
 * 20 docentes distribuidos en los 4 Programas de Estudios
 */
const PLANA_DOCENTE_OFICIAL = {
  apsti: [
    'José Hernández Panta',
    'Javier Jaramillo Atoche',
    'Luis Cherre Lizama',
    'Erick Denegri Arizapana',
    'Juan Ruidias Casaverde'
  ],
  ani: [
    'Eduardo Masias de la Rosa',
    'Yemina Vite Piedra',
    'Paola Manrique Purizaca',
    'Karolina Grace Farfán Cavero',
    'Juan García Reto'
  ],
  conta: [
    'Nelly Julca García',
    'José Llontop Pasache',
    'Nilda Panta Flores',
    'Edson Maza Gonzales',
    'Daniel Olaya Castillo'
  ],
  dpa: [
    'Rocio Chapa Tume',
    'Dalila Barrios Cruz',
    'Fabiola Pinto Granda',
    'Bertha Rufasto Kanashiro',
    'Sergio Panta Jacinto'
  ]
};

/**
 * ESTADÍSTICAS ACADÉMICAS OFICIALES 2022–2026
 * Fuente: https://ieshercar.edu.pe/Transparencia/Estadisticas-Convenios/
 */
const ESTADISTICAS_OFICIALES_HERCAR = {
  ingresantes2026: { ani: 40, apsti: 38, conta: 44, dpa: 42, total: 164 },
  matriculados2026: { ani: 147, apsti: 88, conta: 113, dpa: 89, total: 437 },
  egresados2025: { ani: 33, apsti: 23, conta: 31, dpa: 29, total: 116 },
  titulados2026: { ani: 30, apsti: 9, computacionInformatica: 1, conta: 27, dpa: 2, tecnologiaPesquera: 18, total: 87 }
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
    nombreCorto: 'APSTI → Computación e Informática (2027)',
    nombre2027: 'Computación e Informática',
    nota2027: 'Actualización 2027: A partir del año 2027, la carrera de APSTI pasará a denominarse Computación e Informática.',
    duracion: '3 años (6 semestres académicos / 120 créditos)',
    modalidad: 'Presencial - Educación Pública (Sin mensualidades)',
    titulo: 'Profesional Técnico en Arquitectura de Plataformas y Servicios de Tecnologías de la Información (A Nombre de la Nación) — En 2027: Computación e Informática',
    docentes: PLANA_DOCENTE_OFICIAL.apsti,
    modulosWebOficial: [
      'Módulo I: Mantenimiento de Sistemas y Servicios de TI.',
      'Módulo II: Puesta en Producción y Monitoreo de Sistemas y Servicios de TI.',
      'Módulo III: Diseño de Arquitectura de Infraestructura y Plataforma de TI.'
    ],
    perfilEgreso: 'Formación modular orientada al diseño y desarrollo de infraestructuras tecnológicas avanzadas, plataformas basadas en servidores de alto rendimiento, sistemas de información empresarial, automatización de procesos, redes, bases de datos y software web/móvil. Nota 2027: Este programa evolucionará en el 2027 bajo la denominación de Computación e Informática.',
    modulos: [
      {
        modulo: 'Módulo I: Mantenimiento de Sistemas y Servicios de TI',
        certificacion: 'Certificado Modular I - Mantenimiento de Sistemas y Servicios de TI',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Organización y Arquitectura del Computador', 'Sistemas Operativos Monousuario/Multiusuario', 'Ofimática Profesional Avanzada', 'Lógica y Algoritmos de Programación', 'Comunicación y Redacción Técnica', 'Matemática Aplicada'] },
          { ciclo: 'II Semestre', cursos: ['Mantenimiento y Reparación de Hardware', 'Redes de Datos I (Cableado y TCP/IP)', 'Fundamentos de Bases de Datos', 'Inglés Técnico I', 'Ética Profesional', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Puesta en Producción y Monitoreo de Sistemas y Servicios de TI',
        certificacion: 'Certificado Modular II - Puesta en Producción y Monitoreo de Sistemas y Servicios de TI',
        semestres: [
          { ciclo: 'III Semestre', cursos: ['Modelado de Bases de Datos (MySQL / SQL Server)', 'Programación Orientada a Objetos', 'Desarrollo Web Frontend (HTML5, CSS3, JavaScript, React)', 'Ingeniería de Requerimientos', 'Metodologías Ágiles (Scrum)', 'Inglés Técnico II'] },
          { ciclo: 'IV Semestre', cursos: ['Desarrollo Web Backend (Node.js / Python / PHP)', 'Desarrollo de Aplicaciones Móviles (Android / Flutter)', 'Optimización y Seguridad de Bases de Datos', 'Taller de Programación Empresarial', 'Innovación y Emprendimiento', 'Prácticas Preprofesionales EFSRT II'] }
        ]
      },
      {
        modulo: 'Módulo III: Diseño de Arquitectura de Infraestructura y Plataforma de TI',
        certificacion: 'Certificado Modular III - Diseño de Arquitectura de Infraestructura y Plataforma de TI',
        semestres: [
          { ciclo: 'V Semestre', cursos: ['Servidores Linux (Ubuntu / RedHat)', 'Windows Server y Active Directory', 'Ciberseguridad y Auditoría TI', 'Cloud Computing (AWS / Azure / GCP)', 'Enrutamiento y Conmutación de Redes (Cisco CCNA)', 'Proyecto de Innovación I'] },
          { ciclo: 'VI Semestre', cursos: ['Seguridad de la Información y Hacking Ético', 'DevOps y Automatización', 'Gestión de Servicios TI (ITIL)', 'Integración de Plataformas y APIs', 'Proyecto de Titulación II', 'Prácticas Preprofesionales EFSRT III'] }
        ]
      }
    ],
    campoLaboral: [
      'Empresas pesqueras, agroindustriales y terminales portuarios de Paita administrando redes y sistemas',
      'Desarrollador de software web, aplicaciones móviles y bases de datos para empresas privadas y públicas',
      'Administrador de servidores de alto rendimiento, infraestructura TI y ciberseguridad',
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
    modalidad: 'Presencial - Educación Pública (Sin mensualidades)',
    titulo: 'Profesional Técnico en Administración de Negocios Internacionales (A Nombre de la Nación)',
    docentes: PLANA_DOCENTE_OFICIAL.ani,
    modulosWebOficial: [
      'Módulo I: Procesos de Importación y Exportación de Productos y Servicios.',
      'Módulo II: Soporte Operativo, Técnico y Logístico Para la Importación y Exportación.',
      'Módulo III: Logística Internacional, Aduanas y Cadena de Suministro.'
    ],
    perfilEgreso: 'Experto en gestión y dirección de actividades comerciales y empresariales en un entorno global: operaciones de importación y exportación, mercados internacionales, logística portuaria en el Puerto de Paita, aduanas, aranceles, tratados internacionales e impulso de proyectos de emprendimiento.',
    modulos: [
      {
        modulo: 'Módulo I: Procesos de Importación y Exportación de Productos y Servicios',
        certificacion: 'Certificado Modular I - Procesos de Importación y Exportación',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Fundamentos de Administración y Gestión Empresarial', 'Marketing Internacional y Ventas', 'Matemática Financiera y Estadística', 'Documentación Mercantil y Contratos', 'Herramientas Digitales para Negocios', 'Comunicación Empresarial'] },
          { ciclo: 'II Semestre', cursos: ['Contabilidad y Costos de Comercio Exterior', 'Comportamiento del Consumidor Global', 'Legislación Comercial y Laboral', 'Inglés Comercial I', 'Gestión del Talento Humano', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Soporte Operativo, Técnico y Logístico para la Importación y Exportación',
        certificacion: 'Certificado Modular II - Soporte Operativo y Aduanero',
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
    modalidad: 'Presencial - Educación Pública (Sin mensualidades)',
    titulo: 'Profesional Técnico en Contabilidad (A Nombre de la Nación)',
    docentes: PLANA_DOCENTE_OFICIAL.conta,
    modulosWebOficial: [
      'Módulo I: Desarrollo de Operaciones Contables y Financieras.',
      'Módulo II: Formulación de Estados Financieros.',
      'Módulo III: Análisis Financiero.'
    ],
    perfilEgreso: 'Profesional formado en gestión fiscal y tributaria, normativas contables vigentes, ética profesional e integridad financiera. Domina formulación y análisis de estados financieros, liquidación tributaria ante la SUNAT (IGV, Renta, PDT, SIRE), software contable, costos empresariales, planillas electrónicas (PLAME) y auditoría.',
    modulos: [
      {
        modulo: 'Módulo I: Desarrollo de Operaciones Contables y Financieras',
        certificacion: 'Certificado Modular I - Operaciones Contables y Financieras',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Introducción a la Contabilidad y Plan Contable General Empresarial', 'Documentación Mercantil y Financiera', 'Matemática Financiera y Comercial', 'Ofimática Contable (Excel Intermedio - Avanzado)', 'Legislación Comercial y Societaria', 'Comunicación'] },
          { ciclo: 'II Semestre', cursos: ['Contabilidad General (Libro Diario, Mayor, Inventarios)', 'Libros Auxiliares (Compras, Ventas, Caja y Bancos)', 'Software Contable I (Concar / Siscont)', 'Planillas Electrónicas y Legislación Laboral (PLAME / T-Registro)', 'Ética Contable', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Formulación de Estados Financieros y Tributación SUNAT',
        certificacion: 'Certificado Modular II - Formulación de Estados Financieros',
        semestres: [
          { ciclo: 'III Semestre', cursos: ['Código Tributario y Sistema Tributario Peruano', 'Impuesto General a las Ventas (IGV) e Impuesto Selectivo al Consumo', 'Contabilidad de Costos I (Materia Prima, Mano de Obra, CIF)', 'Costos por Órdenes y por Procesos', 'Facturación Electrónica y Software Contable II', 'Inglés Técnico Contable I'] },
          { ciclo: 'IV Semestre', cursos: ['Impuesto a la Renta (Regímenes MYPE, General, Especial)', 'Contabilidad de Costos en la Industria Pesquera y Agroindustrial', 'Sistema Integrado de Registros Electrónicos (SIRE - SUNAT)', 'Declaraciones Telemáticas y PDTs', 'Finanzas y Presupuesto Empresarial', 'Prácticas Preprofesionales EFSRT II'] }
        ]
      },
      {
        modulo: 'Módulo III: Análisis Financiero, Auditoría y SIAF',
        certificacion: 'Certificado Modular III - Análisis Financiero y Auditoría',
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
    modalidad: 'Presencial - Educación Pública (Sin mensualidades)',
    titulo: 'Profesional Técnico en Desarrollo Pesquero y Acuícola (A Nombre de la Nación)',
    docentes: PLANA_DOCENTE_OFICIAL.dpa,
    modulosWebOficial: [
      'Módulo I: Administración y Dirección de Actividades de Pesca.',
      'Módulo II: Implementación y Supervisión de Sistemas Acuícolas.',
      'Módulo III: Aseguramiento de la Calidad de los Procesos de Productos.'
    ],
    perfilEgreso: 'Carrera insignia de Paita orientada a la aplicación científica y técnica de la biología marina, ecología y gestión sostenible de recursos acuáticos. Capacita en captura, procesamiento, conservación de productos pesqueros, normativas sanitarias internacionales (HACCP/SANIPES) e implementación de sistemas acuícolas.',
    modulos: [
      {
        modulo: 'Módulo I: Administración y Dirección de Actividades de Pesca',
        certificacion: 'Certificado Modular I - Administración de Actividades de Pesca',
        semestres: [
          { ciclo: 'I Semestre', cursos: ['Oceanografía, Meteorología y Recursos Marinos de Paita', 'Biología Pesquera y Taxonomía', 'Diseño y Armado de Artes de Pesca (Cerco, Cortina, Arrastre)', 'Navegación Costera, GPS, Radar y Ecosondas', 'Seguridad y Supervivencia en el Mar (Normas OMI/DICAPI)', 'Física Aplicada'] },
          { ciclo: 'II Semestre', cursos: ['Técnicas de Pesca Artesanal e Industrial', 'Manipulación, Conservación y Frío en Embarcación', 'Mantenimiento de Motores Marinos', 'Legislación Pesquera, Vedas y Cuotas (PRODUCE / IMARPE)', 'Preservación del Ecosistema Marino', 'Prácticas Preprofesionales EFSRT I'] }
        ]
      },
      {
        modulo: 'Módulo II: Implementación y Supervisión de Sistemas Acuícolas',
        certificacion: 'Certificado Modular II - Implementación de Sistemas Acuícolas',
        semestres: [
          { ciclo: 'III Semestre', cursos: ['Biología de Especies Cultivables', 'Diseño de Estanques y Jaulas Flotantes', 'Calidad de Agua y Parámetros Físico-Químicos', 'Cultivo de Concha de Abanico en Bahía de Sechura / Paita', 'Cultivo de Langostinos en Estanques', 'Inglés Técnico Pesquero I'] },
          { ciclo: 'IV Semestre', cursos: ['Cultivo de Peces (Tilapia, Trucha, Paiche, Corvina)', 'Nutrición y Dietas Acuícolas', 'Sanidad Acuícola y Control de Patologías', 'Producción de Fitoplancton y Zooplancton (Alimento Vivo)', 'Gestión Económica de Granjas Acuícolas', 'Prácticas Preprofesionales EFSRT II'] }
        ]
      },
      {
        modulo: 'Módulo III: Aseguramiento de la Calidad de los Procesos de Productos',
        certificacion: 'Certificado Modular III - Aseguramiento de la Calidad HACCP',
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

/**
 * REQUISITOS OFICIALES PARA SOLICITAR EXAMEN DE SUFICIENCIA PROFESIONAL
 * Fuente: Infografía Oficial IESTP Hermanos Cárcamo & TUPA 2026
 */
const REQUISITOS_SUFICIENCIA_PROFESIONAL = {
  titulo: 'Requisitos para Solicitar Examen de Suficiencia Profesional',
  cuentaBN: '00-638-002361',
  costo: 'S/ 200.00 (Segunda opción: S/ 100.00)',
  presentacion: 'El expediente deberá ser presentado debidamente FOLIADO.',
  notaCoordinador: 'OJO: En cuanto a los requisitos y la gestión para el Examen de Suficiencia, se realiza con el Coordinador de su Programa de Estudios.',
  canalPago: 'Los pagos se harán únicamente en ventanilla del Banco de la Nación en la Cta. Cte. N° 00-638-002361 (NO Págalo.pe ni agentes).',
  requisitos: [
    '1. Solicitud dirigida al Director General pidiendo programar el Examen de Suficiencia Profesional cumpliendo con todos los requisitos.',
    '2. Copia a color de la Constancia de No Adeudar.',
    '3. Copia a color de DNI.',
    '4. Copia a color de ambos lados de los tres (03) Certificados Modulares.',
    '5. Copia a color de ambos lados del Certificado de Actualización según carrera profesional (Solo para egresados del 2021 hacia atrás).',
    '6. Copia a color de ambos lados del Curso de Inglés Básico.',
    '7. Boleta electrónica de pago y copia sellada por el área de Tesorería por derecho de Examen de Suficiencia (S/. 200.00).'
  ]
};

/**
 * REQUISITOS OFICIALES PARA TRÁMITE DE TÍTULO PROFESIONAL
 * Fuente: Infografía Oficial IESTP Hermanos Cárcamo & TUPA 2026
 */
const REQUISITOS_TITULO_PROFESIONAL = {
  titulo: 'Requisitos para Trámite de Título Profesional',
  cuentaBN: '00-638-002361',
  presentacion: [
    'Documentación debidamente FOLIADA.',
    'En folder A/4.',
    'Acompañada de un sobre manila A4.'
  ],
  costos: {
    formatoCaligrafiado: 'S/ 60.00 (Pago por Formato y Caligrafiado de Título - Boleta electrónica original y 1 copia sellada por Tesorería)',
    derechoTitulo: 'S/ 100.00 (Pago por Derecho de Título Profesional - Boleta electrónica original y 1 copia sellada por Tesorería)',
    fichaActividades: 'S/ 12.00 (Solo para egresados que estudiaron en el Sistema Tradicional del 2008 hacia abajo)'
  },
  canalPago: 'Los pagos se harán en el Banco de la Nación en la Cuenta Corriente N.º 00-638-002361 (solo ventanilla BN, NO Págalo.pe ni agentes).',
  requisitos: [
    { num: 1, titulo: 'Solicitud', detalle: 'Solicitud dirigida al Director General, solicitando obtención de Título Profesional.' },
    { num: 2, titulo: 'Certificado de Estudios de Educación Secundaria', detalle: 'Original de Certificado de Estudios de Educación Secundaria debidamente firmado por el Director de la Institución Educativa y contar con el código virtual de verificación y código QR.' },
    { num: 3, titulo: 'Certificado de Estudios de Educación Superior', detalle: 'Original de Certificado de Estudios de Educación Superior.' },
    { num: 4, titulo: 'Partida de Nacimiento', detalle: 'Original de Partida de Nacimiento actualizada.' },
    { num: 5, titulo: 'DNI Legalizado', detalle: 'Copia a color de DNI legalizada por Notario. Importante: la copia debe ser totalmente nítida, especialmente en nombre completo, fecha de nacimiento y número de DNI.' },
    { num: 6, titulo: 'Fotografías', detalle: 'Dos (02) fotografías tamaño pasaporte: fondo blanco, revelada (no impresa), vestimenta formal, sin accesorios.' },
    { num: 7, titulo: 'Inglés Básico', detalle: 'Copia a color de Certificado de Inglés Básico.' },
    { num: 8, titulo: 'Pago por Formato y Caligrafiado de Título', detalle: 'Boleta electrónica de pago original y 1 copia sellada por el área de Tesorería. Monto: S/. 60.00.' },
    { num: 9, titulo: 'Pago por Derecho de Título Profesional', detalle: 'Boleta electrónica de pago original y 1 copia sellada por el área de Tesorería. Monto: S/. 100.00.' },
    { num: 10, titulo: 'Ficha de Actividades', detalle: 'Copia de Ficha de Actividades. Solo para egresados que estudiaron en el Sistema Tradicional del 2008 hacia abajo. Derecho de trámite: S/. 12.00.' }
  ]
};

/**
 * TUPA 2026 COMPLETO — RESOLUCIÓN DIRECTORAL N° 020-2026-ME-GRP-DREP-IESTP"HC"-DG
 */
const TUPA_2026_COMPLETO = {
  resolucion: 'Resolución Directoral N° 020-2026-ME-GRP-DREP-IESTP"HC"-DG',
  procedimientosCuentaGeneral: [
    { item: 1, concepto: 'Carpeta de Convalidación de PPP', costo: 25, cuenta: '00-638-002361' },
    { item: 2, concepto: 'Carpeta de Experiencias Formativas en Situaciones Reales de Trabajo (EFSRT)', costo: 20, cuenta: '00-638-002361' },
    { item: 3, concepto: 'Certificado de Estudios (Incluye los seis Periodos Académicos)', costo: 240, cuenta: '00-638-002361' },
    { item: 4, concepto: 'Certificado de Estudios (por Periodo Académico)', costo: 40, cuenta: '00-638-002361' },
    { item: 5, concepto: 'Certificado Modular (PPP / EFSRT)', costo: 25, cuenta: '00-638-002361' },
    { item: 6, concepto: 'Consolidado de notas (Asignaturas o Modular)', costo: 15, cuenta: '00-638-002361' },
    { item: 7, concepto: 'Constancia de Egresado (numerada)', costo: 15, cuenta: '00-638-002361' },
    { item: 8, concepto: 'Constancia de Estudios (numerada)', costo: 15, cuenta: '00-638-002361' },
    { item: 9, concepto: 'Constancia de Matrícula (numerada)', costo: 15, cuenta: '00-638-002361' },
    { item: 10, concepto: 'Constancia de No Adeudar', costo: 15, cuenta: '00-638-002361' },
    { item: 11, concepto: 'Constancia de Tercio Superior', costo: 15, cuenta: '00-638-002361' },
    { item: 12, concepto: 'Constancia de Trámite de Título Profesional', costo: 15, cuenta: '00-638-002361' },
    { item: 13, concepto: 'Convalidación de Prácticas Pre Profesionales con experiencia laboral y EFSRT', costo: 150, cuenta: '00-638-002361' },
    { item: 14, concepto: 'Convalidación de Unidad Didáctica (traslado externo)', costo: 30, cuenta: '00-638-002361' },
    { item: 15, concepto: 'Copia de SÍLABOS visado (por hoja impresa)', costo: 1, cuenta: '00-638-002361' },
    { item: 16, concepto: 'Convalidación de Unidad Didáctica (traslado interno)', costo: 30, cuenta: '00-638-002361' },
    { item: 17, concepto: 'Derecho de Evaluación Extraordinaria (Unidad Didáctica Específica)', costo: 300, cuenta: '00-638-002361' },
    { item: 18, concepto: 'Derecho de Evaluación Extraordinaria (Unidad Didáctica de Empleabilidad)', costo: 200, cuenta: '00-638-002361' },
    { item: 19, concepto: 'Derecho de Titulación', costo: 100, cuenta: '00-638-002361' },
    { item: 20, concepto: 'Duplicado de Boleta de Notas (Por Periodo Académico)', costo: 10, cuenta: '00-638-002361' },
    { item: 21, concepto: 'Duplicado de Certificado Modular', costo: 30, cuenta: '00-638-002361' },
    { item: 22, concepto: 'Duplicado de Notas de haber aprobado Módulo Profesional PPP', costo: 10, cuenta: '00-638-002361' },
    { item: 23, concepto: 'Duplicado de Oficio de prácticas pre profesionales y/o EFSRT', costo: 4, cuenta: '00-638-002361' },
    { item: 24, concepto: 'Duplicado de Título (Trámite y Formato)', costo: 200, cuenta: '00-638-002361' },
    { item: 25, concepto: 'Examen de Suficiencia Profesional (incluye actas)', costo: 200, cuenta: '00-638-002361' },
    { item: 26, concepto: 'Segunda Opción de Examen de Suficiencia Profesional', costo: 100, cuenta: '00-638-002361' },
    { item: 27, concepto: 'Formato de Título Profesional', costo: 60, cuenta: '00-638-002361' },
    { item: 28, concepto: 'Itinerario formativo por hoja', costo: 1, cuenta: '00-638-002361' },
    { item: 29, concepto: 'Licencia de Estudios (Alumnos del 2do. al 6to. Semestre)', costo: 100, cuenta: '00-638-002361' },
    { item: 30, concepto: 'Matrícula Ordinaria para Ingresantes y Regulares', costo: 250, cuenta: '00-638-002361' },
    { item: 31, concepto: 'Rectificación de Nombres y Apellidos (Estudiantes y Egresados)', costo: 40, cuenta: '00-638-002361' },
    { item: 32, concepto: 'Recuperación de Unidad Didáctica', costo: 35, cuenta: '00-638-002361' },
    { item: 33, concepto: 'Reincorporación', costo: 65, cuenta: '00-638-002361' },
    { item: 34, concepto: 'Repitencia de Unidad Didáctica', costo: 35, cuenta: '00-638-002361' },
    { item: 35, concepto: 'Reserva de Matrícula (Alumnos Ingresantes)', costo: 60, cuenta: '00-638-002361' },
    { item: 36, concepto: 'Revalidación de acreditación de idioma extranjero (nivel B1)', costo: 150, cuenta: '00-638-002361' },
    { item: 37, concepto: 'Revalidación de Título Profesional', costo: 200, cuenta: '00-638-002361' },
    { item: 38, concepto: 'Sustentación de Trabajo de Aplicación Profesional', costo: 200, cuenta: '00-638-002361' },
    { item: 39, concepto: 'Derecho Traslado Externo (Instituto Privado)', costo: 200, cuenta: '00-638-002361' },
    { item: 40, concepto: 'Derecho Traslado Externo (Instituto Público)', costo: 80, cuenta: '00-638-002361' },
    { item: 41, concepto: 'Derecho de traslado Interno de carrera Profesional', costo: 80, cuenta: '00-638-002361' },
    { item: 42, concepto: 'Derecho Examen de Admisión', costo: 200, cuenta: '00-638-002361' },
    { item: 43, concepto: 'Pago por Transferencia por error de cuenta', costo: 15, cuenta: '00-638-002361' }
  ],
  actividadesProductivasCuentaIngles: [
    { item: 1, concepto: 'Academia Pre Tecno Hercar 2026', costo: 400, cuenta: '00-638-025736' },
    { item: 2, concepto: 'Alquiler de Auditorio para Eventos Culturales por día', costo: 300, cuenta: '00-638-025736' },
    { item: 3, concepto: 'Alquiler de Auditorio para Eventos Sociales (excepto bailes) por día', costo: 500, cuenta: '00-638-025736' },
    { item: 4, concepto: 'Alquiler de Aula por jornada de 8 horas', costo: 70, cuenta: '00-638-025736' },
    { item: 5, concepto: 'Alquiler de Equipo de Sonido con Asistente por hora', costo: 40, cuenta: '00-638-025736' },
    { item: 6, concepto: 'Alquiler de Equipo Multimedia por hora (dentro del IESTP)', costo: 40, cuenta: '00-638-025736' },
    { item: 7, concepto: 'Alquiler de Laboratorio de Computación con 40 máquinas por hora', costo: 80, cuenta: '00-638-025736' },
    { item: 8, concepto: 'Alquiler de mesas c/u', costo: 5, cuenta: '00-638-025736' },
    { item: 9, concepto: 'Alquiler de Plataforma para Eventos Culturales y Recreativos (excepto bailes)', costo: 500, cuenta: '00-638-025736' },
    { item: 10, concepto: 'Alquiler de Sillas c/u', costo: 3, cuenta: '00-638-025736' },
    { item: 11, concepto: 'Alquiler de Toga y Birrete', costo: 50, cuenta: '00-638-025736' },
    { item: 12, concepto: 'Brindis de Ceremonia (incluye estudiante, papá y mamá)', costo: 30, cuenta: '00-638-025736' },
    { item: 13, concepto: 'Ciclo de Actualización para Examen de Suficiencia Profesional', costo: 400, cuenta: '00-638-025736' },
    { item: 14, concepto: 'Corbata Institucional - Estudiante', costo: 15, cuenta: '00-638-025736' },
    { item: 15, concepto: 'Corbatín Institucional - Estudiante', costo: 15, cuenta: '00-638-025736' },
    { item: 16, concepto: 'Curso de Inglés Básico para Titulación', costo: 400, cuenta: '00-638-025736' },
    { item: 17, concepto: 'Duplicado de Certificado de Inglés Básico para Titulación', costo: 50, cuenta: '00-638-025736' },
    { item: 18, concepto: 'Duplicado de Certificado de Actualización para Examen de Suficiencia Profesional', costo: 50, cuenta: '00-638-025736' },
    { item: 19, concepto: 'Insignia Institucional - Estudiante', costo: 5, cuenta: '00-638-025736' },
    { item: 20, concepto: 'Invitado a Ceremonia (una persona)', costo: 15, cuenta: '00-638-025736' },
    { item: 21, concepto: 'Medalla Institucional de Titulación', costo: 60, cuenta: '00-638-025736' },
    { item: 22, concepto: 'Porta Título', costo: 50, cuenta: '00-638-025736' },
    { item: 23, concepto: 'Pin o Botón Institucional', costo: 25, cuenta: '00-638-025736' }
  ]
};

const GUIA_TRAMITES_TUPA = [
  {
    id: 'tramite-matricula',
    nombre: 'Matrícula Ordinaria (Ingresantes y Regulares)',
    categoria: 'Académico',
    costo: 'S/ 250.00 (Banco de la Nación - Cta. Cte. N° 00-638-002361)',
    plazo: '24 a 48 horas tras validación en Tesorería y entrega en Secretaría Académica',
    requisitos: [
      'No registrar deudas de años anteriores',
      'Depósito en ventanilla del Banco de la Nación a la Cta. Cte. N° 00-638-002361 (NO Págalo.pe, NO agentes)',
      'Indicar en el voucher el DNI del estudiante y sus nombres y apellidos completos (incluso si paga otra persona)',
      'Registrar el voucher en pagos.ieshercar.edu.pe para generar la boleta electrónica',
      'Presentar en Tesorería el voucher original y tres (03) copias de la boleta para el sello correspondiente',
      'Entregar en Secretaría Académica una copia de la boleta sellada y firmada por Tesorería para inclusión en nómina'
    ],
    pasos: [
      'Realizar el pago de S/ 250.00 en una ventanilla del Banco de la Nación (Cta. Cte. N° 00-638-002361) indicando tu DNI y nombres completos.',
      'Conservar el voucher original y registrarlo en https://pagos.ieshercar.edu.pe/ para generar tu boleta electrónica.',
      'Presentar en Tesorería el voucher original y 3 copias de la boleta electrónica para obtener el sello correspondiente.',
      'Entregar en Secretaría Académica una copia de la boleta sellada y firmada por Tesorería para tu inclusión en la nómina de matrícula.'
    ]
  },
  {
    id: 'tramite-examen-suficiencia',
    nombre: 'Examen de Suficiencia Profesional (Titulación)',
    categoria: 'Titulación',
    costo: 'S/ 200.00 (2da opción: S/ 100.00) — Cta. Cte. N° 00-638-002361',
    plazo: 'Programado según cronograma de Coordinación de Programa de Estudios',
    requisitos: [
      'Solicitud dirigida al Director General pidiendo programar el Examen de Suficiencia Profesional cumpliendo con todos los requisitos',
      'Copia a color de la Constancia de No Adeudar',
      'Copia a color de DNI',
      'Copia a color de ambos lados de los tres (03) Certificados Modulares',
      'Copia a color de ambos lados del Certificado de Actualización según carrera profesional (Solo para egresados del 2021 hacia atrás)',
      'Copia a color de ambos lados del Curso de Inglés Básico',
      'Boleta electrónica de pago y copia sellada por el área de Tesorería por derecho de Examen de Suficiencia (S/. 200.00 en Cta. Cte. BN 00-638-002361)',
      'El expediente debe presentarse debidamente FOLIADO y gestionarse con el Coordinador de su Programa de Estudios'
    ],
    pasos: [
      'Coordinar los requisitos previos con el Coordinador de tu Programa de Estudios (APSTI, ANI, Contabilidad o DPA).',
      'Depositar S/ 200.00 en ventanilla del Banco de la Nación a la Cta. Cte. N° 00-638-002361 y validar boleta en pagos.ieshercar.edu.pe y Tesorería.',
      'Reunir todos los documentos a color solicitados y foliar debidamente todo el expediente.',
      'Presentar el expediente foliado con la solicitud dirigida al Director General y rendir el examen según programación.'
    ]
  },
  {
    id: 'tramite-titulacion',
    nombre: 'Trámite de Título Profesional Técnico a Nombre de la Nación',
    categoria: 'Titulación',
    costo: 'S/ 60.00 (Formato y Caligrafiado) + S/ 100.00 (Derecho de Título) [+ S/ 12.00 Ficha Tradicional <= 2008] — Cta. 00-638-002361',
    plazo: '30 a 45 días hábiles (Tramitación e inscripción en MINEDU)',
    requisitos: [
      'Presentación del expediente: Documentación debidamente FOLIADA, en folder A/4 y acompañada de un sobre manila A4',
      '1. Solicitud dirigida al Director General solicitando obtención de Título Profesional',
      '2. Original de Certificado de Estudios de Educación Secundaria (firmado por Director de I.E. y con código virtual de verificación y código QR)',
      '3. Original de Certificado de Estudios de Educación Superior',
      '4. Original de Partida de Nacimiento actualizada',
      '5. Copia a color de DNI legalizada por Notario (totalmente nítida en nombre completo, fecha de nacimiento y número de DNI)',
      '6. Dos (02) fotografías tamaño pasaporte: fondo blanco, revelada (no impresa), vestimenta formal, sin accesorios',
      '7. Copia a color de Certificado de Inglés Básico',
      '8. Pago por Formato y Caligrafiado de Título: Boleta electrónica original y 1 copia sellada por Tesorería — Monto: S/. 60.00 (Cta. BN 00-638-002361)',
      '9. Pago por Derecho de Título Profesional: Boleta electrónica original y 1 copia sellada por Tesorería — Monto: S/. 100.00 (Cta. BN 00-638-002361)',
      '10. Ficha de Actividades: Copia de Ficha de Actividades (Solo para egresados del Sistema Tradicional del 2008 hacia abajo — Derecho de trámite: S/. 12.00)'
    ],
    pasos: [
      'Realizar los depósitos en ventanilla del Banco de la Nación en la Cta. Cte. N° 00-638-002361 (S/. 60.00 Formato/Caligrafiado y S/. 100.00 Derecho de Título).',
      'Registrar los vouchers en pagos.ieshercar.edu.pe para generar las boletas electrónicas y acudir a Tesorería para obtener 1 copia sellada de cada pago.',
      'Reunir los 10 requisitos en original/legalizado según corresponda, foliar toda la documentación en un folder A/4 y acompañarla de un sobre manila A4.',
      'Ingresar el expediente completo por Mesa de Partes / Secretaría Académica.'
    ]
  },
  {
    id: 'tramite-certificado-modular',
    nombre: 'Certificado Modular (PPP / EFSRT)',
    categoria: 'Certificaciones',
    costo: 'S/ 25.00 (Duplicado: S/ 30.00) — Cta. Cte. N° 00-638-002361',
    plazo: '7 a 10 días hábiles',
    requisitos: [
      'Haber aprobado el 100% de las unidades didácticas del Módulo I, II o III',
      'Constancia aprobatoria de Prácticas Preprofesionales / EFSRT del módulo correspondiente',
      'Boleta electrónica de pago y copia sellada por Tesorería (S/ 25.00 en Cta. BN 00-638-002361)',
      'FUT debidamente llenado solicitando el Certificado Modular respectivo'
    ],
    pasos: [
      'Verificar que todas las notas del módulo estén aprobadas (mínimo 13) en sistema.ieshercar.edu.pe.',
      'Abonar S/ 25.00 en ventanilla del Banco de la Nación (Cta. 00-638-002361) y generar boleta en pagos.ieshercar.edu.pe.',
      'Sellar en Tesorería y presentar FUT junto con constancia EFSRT en Secretaría / Mesa de Partes.',
      'Recoger el Certificado Modular oficial con valor curricular MINEDU.'
    ]
  },
  {
    id: 'tramite-curso-ingles',
    nombre: 'Curso de Inglés Básico para Titulación (Cuenta Especial)',
    categoria: 'Titulación',
    costo: 'S/ 400.00 (Duplicado Certificado: S/ 50.00) — Cta. BN N° 00-638-025736',
    plazo: 'Según cronograma de módulos del curso institucional',
    requisitos: [
      'Depósito en el Banco de la Nación en la cuenta N° 00-638-025736 (NO en la cuenta general)',
      'Sacar 2 copias legibles al voucher de pago',
      'Entregar el voucher y las 2 copias en Tesorería, en la oficina del instituto',
      'Copia de DNI del estudiante o egresado'
    ],
    pasos: [
      'Acudir al Banco de la Nación y abonar en la cuenta N° 00-638-025736.',
      'Sacar 2 copias a tu voucher de pago.',
      'Entregar las 2 copias en la oficina de Tesorería del instituto para tu registro y habilitación.',
      'Para revalidación de inglés externo nivel B1, el trámite TUPA cuesta S/ 150.00 en la cuenta 00-638-002361.'
    ]
  },
  {
    id: 'tramite-admision',
    nombre: 'Derecho de Examen de Admisión & Academia Pre Tecno Hercar',
    categoria: 'Admisión',
    costo: 'Examen Admisión: S/ 200.00 (Cta. 00-638-002361) | Academia Pre Tecno Hercar: S/ 400.00 (Cta. 00-638-025736)',
    plazo: 'Según cronograma de Admisión vigente',
    requisitos: [
      'Certificado oficial de estudios de Educación Secundaria (con código QR / firma)',
      'Copia de DNI vigente y Partida de Nacimiento',
      'Fotografía tamaño carnet actual',
      'Voucher de pago original en ventanilla del Banco de la Nación y registro en pagos.ieshercar.edu.pe',
      'Llenado de ficha del postulante'
    ],
    pasos: [
      'Confirmar cronograma vigente en ieshercar.edu.pe/Tramites/Admision-Ciclo_Cero/.',
      'Abonar S/ 200.00 (Examen de Admisión en Cta. 00-638-002361) o S/ 400.00 (Academia Pre Tecno Hercar en Cta. 00-638-025736) en ventanilla BN.',
      'Registrar voucher en pagos.ieshercar.edu.pe y completar inscripción en Secretaría.'
    ]
  },
  {
    id: 'tramite-certificado-estudios',
    nombre: 'Certificado Oficial de Estudios (Por Periodo o 6 Periodos)',
    categoria: 'Documentos',
    costo: 'S/ 40.00 por periodo académico / S/ 240.00 los seis periodos — Cta. 00-638-002361',
    plazo: '3 a 5 días hábiles',
    requisitos: [
      'Haber cursado y aprobado las unidades didácticas correspondientes',
      'FUT especificando si es por periodo académico (S/ 40.00) o completo de 6 periodos (S/ 240.00)',
      'Boleta electrónica de pago en Cta. BN 00-638-002361 y sello de Tesorería',
      'Fotografías tamaño carnet/pasaporte según indicación de Secretaría'
    ],
    pasos: [
      'Pagar en ventanilla del Banco de la Nación (Cta. 00-638-002361) y validar en pagos.ieshercar.edu.pe.',
      'Sellar en Tesorería y presentar FUT por Mesa de Partes.',
      'Recoger certificado visado y firmado en Secretaría Académica.'
    ]
  },
  {
    id: 'tramite-constancias-tupa',
    nombre: 'Constancias Oficiales (Estudios, Matrícula, Egresado, No Adeudar, Tercio Superior)',
    categoria: 'Documentos',
    costo: 'S/ 15.00 cada constancia (Consolidado de notas: S/ 15.00) — Cta. 00-638-002361',
    plazo: '2 a 3 días hábiles',
    requisitos: [
      'FUT solicitando el tipo de constancia numerada (Estudios, Matrícula, Egresado, No Adeudar, Tercio Superior o Trámite de Título)',
      'Depósito de S/ 15.00 en ventanilla BN (Cta. 00-638-002361) validado en pagos.ieshercar.edu.pe y Tesorería',
      'Copia simple de DNI'
    ],
    pasos: [
      'Abonar S/ 15.00 en ventanilla del Banco de la Nación (Cta. 00-638-002361).',
      'Registrar voucher en pagos.ieshercar.edu.pe y sellar en Tesorería.',
      'Presentar FUT en Secretaría / Mesa de Partes.'
    ]
  },
  {
    id: 'tramite-convalidacion',
    nombre: 'Convalidación de Unidad Didáctica o Prácticas EFSRT',
    categoria: 'Académico',
    costo: 'S/ 30.00 por Unidad Didáctica (traslado interno o externo) | S/ 150.00 Convalidación PPP/EFSRT — Cta. 00-638-002361',
    plazo: '7 a 10 días hábiles',
    requisitos: [
      'Certificado oficial de estudios de la institución de origen',
      'Sílabos de los cursos aprobados visados por la institución de origen (Copia sílabos visado IESTP: S/ 1.00 por hoja)',
      'Boleta electrónica pagada en Cta. BN 00-638-002361 y sellada en Tesorería',
      'FUT detallando las unidades a convalidar'
    ],
    pasos: [
      'Solicitar evaluación previa en Coordinación Académica.',
      'Pagar S/ 30.00 por unidad didáctica (o S/ 150.00 por convalidación de PPP con experiencia laboral) en ventanilla BN Cta. 00-638-002361.',
      'Presentar expediente con sílabos visados por Mesa de Partes.'
    ]
  },
  {
    id: 'tramite-traslado-interno',
    nombre: 'Traslado Interno de Carrera Profesional',
    categoria: 'Académico',
    costo: 'S/ 80.00 (Cta. Cte. N° 00-638-002361)',
    plazo: '5 a 7 días hábiles (Antes del inicio del semestre)',
    requisitos: [
      'Haber aprobado el ciclo previo y existir vacante en el programa de destino (APSTI, ANI, Contabilidad o DPA)',
      'FUT solicitando traslado interno de carrera profesional',
      'Boleta electrónica de pago S/ 80.00 en Cta. BN 00-638-002361 sellada por Tesorería'
    ],
    pasos: [
      'Consultar disponibilidad de vacantes en Unidad Académica antes del periodo de matrícula.',
      'Depositar S/ 80.00 en ventanilla BN (Cta. 00-638-002361) y validar en pagos.ieshercar.edu.pe.',
      'Presentar FUT por Mesa de Partes para emisión de resolución.'
    ]
  },
  {
    id: 'tramite-traslado-externo',
    nombre: 'Traslado Externo (Instituto Público o Privado)',
    categoria: 'Académico',
    costo: 'S/ 80.00 (Instituto Público) | S/ 200.00 (Instituto Privado) — Cta. 00-638-002361',
    plazo: '7 a 12 días hábiles',
    requisitos: [
      'Certificado oficial de estudios y sílabos visados de la institución de origen',
      'Constancia de no haber sido separado por medida disciplinaria y copia de DNI',
      'Boleta electrónica sellada por Tesorería (S/ 80.00 público o S/ 200.00 privado en Cta. 00-638-002361)'
    ],
    pasos: [
      'Presentar expediente por Mesa de Partes dentro del cronograma de admisión.',
      'Abonar derecho en ventanilla BN (Cta. 00-638-002361) y registrar en pagos.ieshercar.edu.pe.',
      'Evaluación por Coordinación de Carrera y emisión de Resolución Directoral.'
    ]
  },
  {
    id: 'tramite-reserva-matricula',
    nombre: 'Reserva de Matrícula (Ingresantes) y Licencia de Estudios (2do al 6to)',
    categoria: 'Académico',
    costo: 'Reserva Ingresantes: S/ 60.00 | Licencia de Estudios (2do al 6to): S/ 100.00 — Cta. 00-638-002361',
    plazo: '3 a 5 días hábiles',
    requisitos: [
      'FUT dirigido a Dirección General justificando motivos',
      'Boleta electrónica de pago (S/ 60.00 reserva o S/ 100.00 licencia) en Cta. BN 00-638-002361 sellada en Tesorería'
    ],
    pasos: [
      'Abonar en ventanilla BN Cta. 00-638-002361 y validar en pagos.ieshercar.edu.pe.',
      'Presentar FUT y sustento en Mesa de Partes / Secretaría Académica.'
    ]
  },
  {
    id: 'tramite-reincorporacion',
    nombre: 'Reincorporación de Estudios',
    categoria: 'Académico',
    costo: 'S/ 65.00 — Cta. Cte. N° 00-638-002361',
    plazo: '3 a 5 días hábiles antes del inicio de matrícula',
    requisitos: [
      'FUT solicitando reincorporación al semestre académico',
      'Boleta electrónica de pago S/ 65.00 en Cta. BN 00-638-002361 sellada en Tesorería'
    ],
    pasos: [
      'Presentar FUT antes del inicio de matrícula.',
      'Abonar S/ 65.00 en ventanilla BN (Cta. 00-638-002361), registrar en pagos.ieshercar.edu.pe y sellar en Tesorería.'
    ]
  },
  {
    id: 'tramite-recuperacion-repitencia',
    nombre: 'Recuperación / Repitencia y Evaluación Extraordinaria de Unidad Didáctica',
    categoria: 'Académico',
    costo: 'Recuperación o Repitencia U.D.: S/ 35.00 | Eval. Extraordinaria U.D. Empleabilidad: S/ 200.00 | U.D. Específica: S/ 300.00 — Cta. 00-638-002361',
    plazo: 'Según calendario académico',
    requisitos: [
      'Estar dentro de los supuestos del reglamento de evaluación',
      'Boleta electrónica de pago en Cta. BN 00-638-002361 sellada por Tesorería',
      'FUT dirigido a Jefatura de Unidad Académica'
    ],
    pasos: [
      'Verificar situación académica con el docente y Coordinador de Programa.',
      'Pagar en ventanilla BN (Cta. 00-638-002361), generar boleta en pagos.ieshercar.edu.pe y sellar en Tesorería.'
    ]
  },
  {
    id: 'tramite-duplicado-diploma',
    nombre: 'Duplicado de Título Profesional o Certificado Modular',
    categoria: 'Documentos',
    costo: 'Duplicado de Título (Trámite y Formato): S/ 200.00 | Duplicado Cert. Modular: S/ 30.00 — Cta. 00-638-002361',
    plazo: '15 a 20 días hábiles',
    requisitos: [
      'Denuncia policial original por pérdida o entrega del documento deteriorado',
      'Copia de DNI vigente y fotografías tamaño pasaporte',
      'Boleta electrónica de pago en Cta. BN 00-638-002361 sellada por Tesorería'
    ],
    pasos: [
      'Presentar expediente completo con denuncia y FUT por Mesa de Partes.',
      'Abonar la tasa correspondiente en ventanilla BN (Cta. 00-638-002361).'
    ]
  },
  {
    id: 'tramite-carne',
    nombre: 'Carné de Educación Superior MINEDU (Medio Pasaje Oficial)',
    categoria: 'Bienestar',
    costo: 'Tasa oficial vigente según convocatoria MINEDU — Cta. BN N° 00-638-002361',
    plazo: 'Según cronograma oficial de remisión de lotes MINEDU',
    requisitos: [
      'Estar formalmente matriculado en el semestre lectivo vigente',
      'Fotografía digital tamaño carnet a color con fondo blanco y ropa formal oscura',
      'Comprobante de pago en ventanilla BN validado en pagos.ieshercar.edu.pe y Tesorería'
    ],
    pasos: [
      'Esperar la convocatoria semestral publicada por Secretaría Académica.',
      'Abonar en ventanilla del Banco de la Nación (Cta. 00-638-002361) y validar en pagos.ieshercar.edu.pe.',
      'Entregar foto digital según especificaciones para recibir el carné de medio pasaje (Ley N° 26271).'
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
      'Presentar FUT y sustento médico o laboral dentro de los 5 días hábiles de ocurrida la falta.',
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
    titulo: '¿Dónde pagar y cómo registrar vouchers en pagos.ieshercar.edu.pe?',
    keywords: ['pago', 'pagos', 'pagar', 'voucher', 'banco', 'cuenta', 'subir voucher', 'tesoreria', 'banco de la nacion', 'bn', 'plataforma de pagos', '00-638-002361'],
    categorias: ['pagos'],
    locucion: "¡Hola! En el Instituto Superior Hermanos Cárcamo NO se paga por Págalo punto pe, ni por agentes, ni por Yape. Todos los pagos se hacen únicamente en ventanilla del Banco de la Nación: la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno es para matrícula, admisión, certificados y titulación; y la cuenta cero cero, seis tres ocho, cero dos cinco, siete tres seis es para el curso de inglés, Cepre y actividades productivas. En tu pantalla tienes todos los pasos.",
    respuesta: `💳 **Guía Oficial de Pagos — Exclusivo en Ventanilla del Banco de la Nación:**
🚫 **IMPORTANTE:** **NO se aceptan pagos por Págalo.pe, ni en agentes MultiRed, ni por Yape o Plin.** El depósito se realiza únicamente de forma presencial en **ventanilla del Banco de la Nación**, indicando el **DNI y nombres y apellidos completos del estudiante**.

1. 🏛️ **Cuenta TUPA / Trámites Generales: \`00-638-002361\`** *(Matrícula Ordinaria S/ 250.00, Examen de Admisión S/ 200.00, Examen de Suficiencia S/ 200.00, Título S/ 100.00 + Formato S/ 60.00, Certificados Modulares S/ 25.00, Constancias S/ 15.00).*
   - Registra tu voucher en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) para generar tu **boleta electrónica**.
   - Lleva el voucher original y copias a **Tesorería** para el sellado (Matrícula: 3 copias de boleta y entrega 1 sellada en Secretaría; Título/Suficiencia: boleta original y 1 copia sellada).
2. 🇬🇧 **Cuenta Inglés y Actividades Productivas: \`00-638-025736\`** *(Curso de Inglés Básico S/ 400.00, Academia Pre Tecno Hercar S/ 400.00, Ciclo de Actualización S/ 400.00, Ceremonia).*
   - Paga en ventanilla del Banco de la Nación a la cuenta **\`00-638-025736\`**, **saca 2 copias a tu voucher y entrégalos en Tesorería, en la oficina del instituto**.
🎥 [Ver Video Instructivo Oficial en Drive](https://drive.google.com/file/d/1kYBJhVXOqO7BoQUpMZmYs-1E59gIUV9h/view?usp=sharing)`
  },
  {
    id: 'faq-carreras',
    titulo: 'Las 4 Carreras Profesionales Técnicas (y Computación e Informática 2027)',
    keywords: ['carreras', 'programas', 'duracion', 'ani', 'apsti', 'conta', 'dpa', 'titulo', 'que carreras hay', 'cuales son las carreras', 'estudios', 'computacion e informatica', '2027'],
    categorias: ['carreras'],
    locucion: "¡Hola! El Instituto Superior Hermanos Cárcamo ofrece cuatro carreras técnicas profesionales de tres años: Arquitectura de Plataformas y Servicios de Tecnologías de la Información, que en el dos mil veintisiete pasará a llamarse Computación e Informática; Administración de Negocios Internacionales; Contabilidad; y Desarrollo Pesquero y Acuícola. En tu pantalla puedes revisar sus perfiles.",
    respuesta: `🎓 **4 Carreras Profesionales Técnicas (3 Años / 6 Semestres / 120 Créditos):**
1. 💻 **APSTI:** Arquitectura de Plataformas y Servicios de Tecnologías de la Información *(Software, Servidores, Redes, Base de Datos y Soporte)* — **Nota 2027:** En el año **2027** esta carrera pasará a denominarse **Computación e Informática**.
2. 🚢 **ANI:** Administración de Negocios Internacionales *(Comercio Exterior, Importación/Exportación, Aduanas y Logística Portuaria)*.
3. 📊 **CONTA:** Contabilidad *(Gestión Fiscal y Tributaria SUNAT, Costos, Estados Financieros, Planillas y Auditoría)*.
4. 🐟 **DPA:** Desarrollo Pesquero y Acuícola *(Actividades de Pesca, Sistemas Acuícolas y Aseguramiento de la Calidad HACCP)*.

⭐ **Beneficios:** Educación pública sin mensualidades (solo matrícula semestral TUPA), Título Profesional Técnico a Nombre de la Nación y Triple Certificación Modular Progresiva.`
  },
  {
    id: 'faq-apsti-2027-computacion',
    titulo: 'APSTI y Actualización 2027: Computación e Informática',
    keywords: ['computacion e informatica', 'computacion informatica', 'apsti 2027', '2027', 'cambio de nombre apsti', 'computacion 2027'],
    categorias: ['carreras'],
    locucion: "¡Hola! Actualmente el programa de tecnología del instituto se denomina Arquitectura de Plataformas y Servicios de Tecnologías de la Información, APSTI, y para el año dos mil veintisiete pasará a llamarse Computación e Informática. En tu pantalla tienes todos los detalles de sus módulos y docentes.",
    respuesta: `💻 **De APSTI a Computación e Informática (Proyección 2027):**

* 📌 **Denominación Actual (2026):** **Arquitectura de Plataformas y Servicios de Tecnologías de la Información (APSTI)**.
* 🚀 **Denominación en 2027:** Para el año **2027**, la carrera de **APSTI** pasará a ser **Computación e Informática**, manteniendo su enfoque en sistemas de información, desarrollo de software, bases de datos, redes y arquitectura de infraestructura tecnológica.
* 📚 **Módulos Oficiales:**
  - **Módulo I:** Mantenimiento de Sistemas y Servicios de TI.
  - **Módulo II:** Puesta en Producción y Monitoreo de Sistemas y Servicios de TI.
  - **Módulo III:** Diseño de Arquitectura de Infraestructura y Plataforma de TI.
* 👨‍🏫 **Plana Docente Oficial:** José Hernández Panta, Javier Jaramillo Atoche, Luis Cherre Lizama, Erick Denegri Arizapana y Juan Ruidias Casaverde.`
  },
  {
    id: 'faq-plataformas',
    titulo: 'Enlaces Directos a Plataformas y Servicios Virtuales',
    keywords: ['plataforma', 'plataformas', 'aula virtual', 'sistema', 'biblioteca', 'yoleo', 'biblioteca latina', 'enlace', 'links', 'entrar a notas', 'notas'],
    categorias: ['plataformas'],
    locucion: "¡Hola! En la parte superior y en tu pantalla tienes acceso directo a todos nuestros sistemas: Sistema Académico para ver notas y matrícula, Portal de Pagos, Aula Virtual, Mesa de Partes y Biblioteca. Puedes abrir cualquiera con un solo toque.",
    respuesta: `🌐 **Portales y Sistemas Oficiales en Vivo:**
* 💻 **Sistema Académico:** [sistema.ieshercar.edu.pe/acceso](https://sistema.ieshercar.edu.pe/acceso) *(Notas y Matrícula)*
* 💳 **Portal de Pagos:** [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) *(Registrar vouchers BN y generar boleta electrónica)*
* 📄 **Mesa de Partes Virtual:** [sistema.ieshercar.edu.pe/registro-tramite/](https://sistema.ieshercar.edu.pe/registro-tramite/)
* 📚 **Aula Virtual:** [aula.ieshercar.edu.pe](https://aula.ieshercar.edu.pe/) *(Clases y Tareas)*
* 💼 **Bolsa Laboral:** [bolsalaboral.ieshercar.edu.pe](https://bolsalaboral.ieshercar.edu.pe/)
* 📖 **Biblioteca Virtual:** [biblioteca.ieshercar.edu.pe](https://biblioteca.ieshercar.edu.pe/) · [Biblioteca Latina](https://iestphercar.bibliotecalatina.com/login)
* 🌐 **Web Institucional:** [ieshercar.edu.pe](https://ieshercar.edu.pe/)`
  },
  {
    id: 'faq-contacto',
    titulo: 'Ubicación de la Sede en Paita, Horarios y Teléfonos',
    keywords: ['ubicacion', 'direccion', 'donde queda', 'horario', 'telefono', 'celular', 'paita', 'secretaria', 'atencion', 'como llegar', 'donde estan'],
    categorias: ['general'],
    locucion: "¡Hola! Nuestro campus principal queda en la avenida Miguel Grau, manzana A lote uno, urbanización El Parque, en Paita. Atendemos de lunes a viernes desde las ocho de la mañana hasta las tres de la tarde. En tu pantalla tienes nuestros teléfonos y mapa.",
    respuesta: `📍 **Sede Institucional Paita:**
Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita, Piura.
⏰ **Horario de Atención:** Lunes a Viernes de 8:00 a.m. a 3:00 p.m. (Horario continuo).
📞 **Teléfono Fijo:** (073) 251013
📱 **Móvil / WhatsApp:** [969 100 257](https://wa.me/51969100257)
✉️ **Correo:** \`ieshercar@ieshercar.edu.pe\`
🗺️ [Ver Ubicación en Google Maps](https://maps.google.com/?q=IESTP+Hermanos+Carcamo+Paita)`
  },
  {
    id: 'faq-gratuidad',
    titulo: '¿Cuánto cuesta la mensualidad o pensión?',
    keywords: ['mensualidad', 'pension', 'pensiones', 'gratis', 'gratuito', 'publico', 'pagar mes', 'se paga mensual'],
    categorias: ['admision'],
    locucion: "¡Hola! Te cuento con mucho gusto que en el Instituto Superior Hermanos Cárcamo estudiar es público y no se pagan pensiones ni mensualidades. Únicamente abonas el derecho de matrícula ordinaria por semestre en ventanilla del Banco de la Nación, que según el TUPA dos mil veintiséis es de doscientos cincuenta soles. ¡En tu pantalla te dejé todos los detalles!",
    respuesta: `🎓 **Educación Pública sin Mensualidades:**
El **IESTP Hermanos Cárcamo es una institución tecnológica pública** del Estado, dependiente del Ministerio de Educación (MINEDU). 
**¡NO SE PAGAN PENSIONES NI MENSUALIDADES!** 
El único aporte por semestre corresponde a la **Matrícula Ordinaria para Ingresantes y Regulares**, fijada en **S/ 250.00** según el **TUPA 2026** (R.D. N° 020-2026), la cual se paga **únicamente en ventanilla del Banco de la Nación** en la Cta. Cte. N° **\`00-638-002361\`** (no se aceptan pagos en agentes ni Págalo.pe).`
  },
  {
    id: 'faq-becas',
    titulo: 'Becas Pronabec y Beneficios Estudiantiles',
    keywords: ['beca', 'becas', 'pronabec', 'beca 18', 'continuidad', 'permanencia', 'apoyo'],
    categorias: ['bienestar'],
    locucion: "¡Hola! Nuestros estudiantes pueden postular a los programas de becas de Pronabec como Beca Dieciocho y Beca Permanencia, que te brindan apoyo económico para tu carrera. En tu pantalla tienes los requisitos.",
    respuesta: `🌟 **Becas y Apoyo Estudiantil:**
Al ser una institución pública de educación superior, los estudiantes del IESTP Hermanos Cárcamo pueden postular a los programas de becas del Estado a través de PRONABEC:
- **Beca 18:** Para egresados de secundaria con alto rendimiento académico y condición de pobreza o vulnerabilidad.
- **Beca Continuidad:** Para estudiantes que requieren apoyo para culminar sus estudios.
- **Beca Permanencia:** Para talentos destacados durante su formación técnica profesional.
- Más información oficial: [ieshercar.edu.pe/Informacion_Academica/Becas/becas.php](https://ieshercar.edu.pe/Informacion_Academica/Becas/becas.php)`
  },
  {
    id: 'faq-curso-ingles',
    titulo: 'Curso de Idioma Extranjero (Inglés para Titulación)',
    keywords: ['ingles', 'curso de ingles', 'idioma', 'idiomas', 'ingles tecnico', 'certificado de ingles', 'examen de ingles', 'titulacion ingles', 'aprender ingles', 'centro de idiomas', 'pago ingles', 'pago de ingles', 'cuenta ingles', 'cuenta de ingles', 'voucher ingles', '00-638-025736', 'omar garcia', 'tania herrera'],
    categorias: ['academico', 'titulacion', 'pagos'],
    locucion: "¡Hola! Para el Curso de Inglés Básico para Titulación, el costo es de cuatrocientos soles y el pago se realiza únicamente en el Banco de la Nación en la cuenta cero cero, seis tres ocho, cero dos cinco, siete tres seis. Recuerda sacar dos copias a tu voucher y entregarlos en Tesorería, en la oficina del instituto. En tu pantalla tienes todos los detalles oficiales.",
    respuesta: `🇬🇧 **Curso de Inglés & Requisito de Idioma Extranjero para Titulación:**

Por disposición de la Ley de Institutos N° 30512 del MINEDU, acreditar un idioma extranjero (Inglés Básico) es un **requisito obligatorio para el Examen de Suficiencia Profesional y el Trámite de Título Profesional** en las 4 carreras.

💳 **Datos Oficiales de Pago para el Curso de Inglés (TUPA 2026: S/ 400.00):**
* 🏦 **Banco de la Nación — Cuenta Específica:** **\`00-638-025736\`** *(Solo Banco de la Nación; NO Págalo.pe ni agentes).*
* 📄 **Entrega Obligatoria de Voucher:** **Debes sacar 2 copias a tu voucher y entregarlos en Tesorería, en la oficina del instituto.**
* ⚠️ **Aviso de Tesorería:** Regularizar sus cuotas en Tesorería para no retrasar la emisión del certificado del grupo ni el trámite de titulación.
* 🔄 **Revalidación Externa (Nivel B1):** Si estudiaste en un centro externo (ICPNA, Británico, universidad), el trámite TUPA de *Revalidación de acreditación de idioma extranjero (nivel B1)* cuesta **S/ 150.00** y se paga en la cuenta general **\`00-638-002361\`**. (Duplicado de Certificado de Inglés Básico: **S/ 50.00** en cuenta **\`00-638-025736\`**).`
  },
  {
    id: 'faq-autoridades',
    titulo: 'Autoridades, Plana Directiva y Plana Docente Oficial',
    keywords: ['director', 'directora', 'autoridades', 'plana docente', 'profesores', 'docentes', 'jefatura', 'secretaria general', 'quien dirige', 'coordinador', 'adolfo zeta'],
    categorias: ['institucional'],
    locucion: "¡Hola! Nuestra institución está dirigida por el economista Adolfo Zeta Pazo como Director General, junto a la Unidad Académica, la Unidad Administrativa y veinte docentes distribuidos en nuestras cuatro carreras. En tu pantalla puedes conocer a todo nuestro equipo directivo y docente.",
    respuesta: `🏛️ **Plana Directiva y Docente del IESTP "Hermanos Cárcamo" (ieshercar.edu.pe):**
* **Director General (e):** **Econ. Adolfo Zeta Pazo**
* **Jefe de Unidad Académica:** **Lic. Juan García Reto**
* **Jefe de Unidad Administrativa:** **CPC Edson Maza Gonzales**
* **Plana Docente Oficial por Programa (20 docentes):**
  - 💻 **APSTI (próxima Computación e Informática 2027):** José Hernández Panta, Javier Jaramillo Atoche, Luis Cherre Lizama, Erick Denegri Arizapana y Juan Ruidias Casaverde.
  - 🚢 **Administración de Negocios Internacionales:** Eduardo Masias de la Rosa, Yemina Vite Piedra, Paola Manrique Purizaca, Karolina Grace Farfán Cavero y Juan García Reto.
  - 📊 **Contabilidad:** Nelly Julca García, José Llontop Pasache, Nilda Panta Flores, Edson Maza Gonzales y Daniel Olaya Castillo.
  - 🐟 **Desarrollo Pesquero y Acuícola:** Rocio Chapa Tume, Dalila Barrios Cruz, Fabiola Pinto Granda, Bertha Rufasto Kanashiro y Sergio Panta Jacinto.`
  },
  {
    id: 'faq-historia-mision',
    titulo: 'Historia, Misión, Visión y Valores del Instituto',
    keywords: ['historia', 'mision', 'vision', 'valores', 'lema', 'fundacion', 'que es hercar', 'quienes son los hermanos carcamo', 'resolucion ministerial'],
    categorias: ['institucional'],
    locucion: "¡Hola! El Instituto Superior Hermanos Cárcamo tiene más de treinta y nueve años formando profesionales técnicos en Paita. Nuestro lema es: Formando Profesionales y Construyendo Oportunidades. En tu pantalla te comparto nuestra historia y valores.",
    respuesta: `🎓 **IESTP "Hermanos Cárcamo" - Paita, Piura:**
* **Creación Legal:** Creado mediante la **Resolución Ministerial N.° 232-87-ED** (09 de mayo de 1987) y revalidado con la **Resolución Ministerial / Directoral N.° 0528-2006-ED**. Cuenta con más de 39 años de trayectoria formando profesionales técnicos.
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
  - Si desaprueba 3 o más cursos, no podrá avanzar de ciclo y deberá repetir los cursos desaprobados (TUPA Recuperación/Repitencia U.D.: S/ 35.00).
* 📝 **Evaluación de Recuperación:** Al finalizar cada semestre lectivo se programa retroalimentación y recuperación para promedios entre 10 y 12.
* ⏰ **Inasistencias:** El límite máximo de inasistencias injustificadas es el **30% del total de horas** de la asignatura; superarlo genera inhabilitación (DPI).`
  },
  {
    id: 'faq-turnos-horarios',
    titulo: 'Turnos y Horarios de Clases',
    keywords: ['turno', 'turnos', 'horario de clases', 'a que hora estudio', 'manana', 'tarde', 'noche', 'asistencia', 'clases'],
    categorias: ['academico'],
    locucion: "¡Hola! Nuestras clases se imparten en el turno mañana, de lunes a viernes, desde las ocho de la mañana hasta la una y quince de la tarde, y la atención administrativa es de ocho de la mañana a tres de la tarde. En tu pantalla puedes revisar los horarios.",
    respuesta: `⏰ **Horarios y Turnos de Formación Académica:**
* ☀️ **Turno Diurno (Mañana):**
  - Horario regular de clases: **8:00 a.m. a 1:15 p.m.** (Lunes a Viernes).
  - Aplica para los programas de APSTI (Computación e Informática 2027), ANI, Contabilidad y Desarrollo Pesquero y Acuícola.
* 🌤️ **Turno Tarde / Vespertino:**
  - Habilitado según disponibilidad de talleres de cómputo, laboratorios de redes y plantas piloto.
* 🏛️ **Horario de Atención Administrativa:** Lunes a Viernes de **8:00 a.m. a 3:00 p.m.** en Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita.`
  },
  {
    id: 'faq-convalidacion',
    titulo: 'Convalidación de Cursos y Traslados de Matrícula',
    keywords: ['convalida', 'convalidacion', 'traslado', 'traslado externo', 'traslado interno', 'otra universidad', 'otro instituto', 'cambio de carrera'],
    categorias: ['tramites'],
    locucion: "¡Hola! Si vienes de otra universidad o instituto técnico, puedes convalidar tus asignaturas aprobadas presentando tu certificado oficial de estudios y sílabos en Secretaría. En tu pantalla tienes los requisitos y costos del TUPA dos mil veintiséis.",
    respuesta: `🔄 **Proceso de Convalidación y Traslados (TUPA 2026 - Cta. BN 00-638-002361):**
* **Traslado Interno de Carrera:** **S/ 80.00** (sujeto a vacantes disponibles al inicio del semestre).
* **Traslado Externo (Instituto Público):** **S/ 80.00** | **Traslado Externo (Instituto Privado):** **S/ 200.00**.
* **Convalidación de Unidad Didáctica (traslado interno o externo):** **S/ 30.00** por unidad didáctica.
* **Convalidación de PPP con experiencia laboral y EFSRT:** **S/ 150.00**.
* **Documentos:** Certificado oficial de estudios visado, sílabos visados, constancia de no separación disciplinaria, copia de DNI y FUT.`
  },
  {
    id: 'faq-bienestar',
    titulo: 'Bienestar Estudiantil, Seguro SIS y Servicios al Alumno',
    keywords: ['bienestar', 'seguro', 'sis', 'topico', 'salud', 'deportes', 'cultural', 'psicologia', 'atencion medica', 'code'],
    categorias: ['bienestar'],
    locucion: "¡Hola! En bienestar y empleabilidad cuentas con afiliación gratuita al Seguro Integral de Salud, tópico de primeros auxilios, orientación profesional, Comité de Defensa del Estudiante y talleres deportivos. ¡En tu pantalla puedes ver todos los beneficios!",
    respuesta: `🏥 **Servicios de Bienestar y Empleabilidad HERCAR:**
* 🩺 **Seguro Integral de Salud (SIS):** Como estudiante de educación superior pública, tienes derecho a afiliación y atención gratuita a través del SIS.
* 🛡️ **Comité de Defensa del Estudiante (CODE):** Garantiza un entorno seguro mediante el Reglamento CODE y atención de consultas o denuncias estudiantiles.
* 💼 **Orientación y Transición Laboral:** Bolsa Laboral en [bolsalaboral.ieshercar.edu.pe](https://bolsalaboral.ieshercar.edu.pe/).
* 🩹 **Tópico y Tutoría:** Atención inmediata y acompañamiento psicopedagógico en el campus.`
  },
  {
    id: 'faq-matricula-paso-a-paso',
    titulo: 'Paso a Paso de Matrícula y Pagos: ¿Qué pago, dónde voy y qué hago?',
    keywords: ['matricula', 'paso a paso', 'que pago', 'donde voy', 'que hago', 'como matricularme', 'proceso matricula', 'pago matricula', 'donde pagar', 'voucher matricula', 'donde registrar', 'cuanto pago'],
    categorias: ['pagos', 'tramites'],
    locucion: "¡Hola! Con mucho gusto te explico el procedimiento oficial de matrícula: realizas el pago de doscientos cincuenta soles únicamente en ventanilla del Banco de la Nación en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno indicando tu D N I y nombres completos. Luego registras el voucher en pagos punto i e s hercar punto edu punto pe, llevas el voucher original y tres copias de tu boleta electrónica a Tesorería para sellar, y entregas una copia sellada en Secretaría Académica.",
    respuesta: `📋 **Procedimiento Oficial de Matrícula (Fuente: ieshercar.edu.pe/Tramites/Matricula/):**

1️⃣ **¿QUÉ SE PAGA Y CUÁNTO ES? (TUPA 2026)**
* **Educación Pública sin mensualidades:** No se pagan pensiones mensuales.
* **Matrícula Ordinaria (Ingresantes y Regulares):** **S/ 250.00** (y no registrar deudas de años anteriores).

2️⃣ **¿DÓNDE Y CÓMO SE PAGA?**
* 🏦 **Banco de la Nación (ÚNICAMENTE EN VENTANILLA):** Cuenta Corriente N° **\`00-638-002361\`** a nombre del *IESTP Hermanos Cárcamo*.
* 🚫 **PROHIBIDO:** **NO se aceptan pagos en agentes MultiRed, ni en Págalo.pe, ni por Yape/Plin.**
* 🪪 **Datos obligatorios en el comprobante:** Indicar el **DNI del estudiante** y sus **nombres y apellidos completos**, incluso si otra persona realiza el pago. Conservar el voucher original.

3️⃣ **¿DÓNDE REGISTRO EL VOUCHER?**
* Entra a **[pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/)** y registra el comprobante para generar tu **boleta electrónica**.

4️⃣ **¿A DÓNDE VOY CON EL VOUCHER Y LA BOLETA?**
* 🏛️ **Tesorería (Campus Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita):** Presenta el **voucher original y tres (03) copias de la boleta electrónica** para obtener el sello correspondiente.
* 📑 **Secretaría Académica:** Entrega **una copia de la boleta sellada y firmada por Tesorería** para tu inclusión oficial en la nómina de matrícula.`
  },
  {
    id: 'faq-que-hago-despues-de-pagar',
    titulo: '¿Qué hago después de pagar en el Banco de la Nación? (Dónde ir y qué presentar)',
    keywords: ['despues de pagar', 'ya pague', 'donde llevo el voucher', 'que hago con el voucher', 'subir voucher', 'validar voucher', 'donde ir', 'oficina pagos', 'caja'],
    categorias: ['pagos'],
    locucion: "¡Hola! Depende de la cuenta que pagaste: si pagaste matrícula o trámites TUPA en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno, registras el voucher en pagos punto i e s hercar punto edu punto pe para sacar tu boleta electrónica y luego vas a Tesorería con el voucher original y copias para el sellado. Si pagaste el curso de inglés en la cuenta cero cero, seis tres ocho, cero dos cinco, siete tres seis, debes sacar dos copias a tu voucher y entregarlos en Tesorería, en la oficina del instituto.",
    respuesta: `🧾 **¿Ya pagaste en ventanilla del Banco de la Nación? Sigue el procedimiento según tu cuenta:**

### 🏛️ Si pagaste en la Cta. \`00-638-002361\` (Matrícula, Admisión, Título, Suficiencia, Certificados):
1. **Registra el voucher** en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) para generar tu **boleta electrónica**.
2. **Acude a Tesorería** (Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita) con el voucher original y las copias de tu boleta electrónica para el **sellado**:
   - *Matrícula:* voucher original + **3 copias** de la boleta electrónica (luego entregas 1 copia sellada en Secretaría Académica).
   - *Título Profesional / Examen de Suficiencia:* boleta electrónica original + **1 copia sellada** por Tesorería.

### 🇬🇧 Si pagaste en la Cta. \`00-638-025736\` (Curso de Inglés, CEPRE, Actualización):
1. **Saca 2 copias legibles a tu voucher**.
2. **Entrégalas en Tesorería, en la oficina del instituto** junto con tus datos completos para validar tu inscripción.`
  },
  {
    id: 'faq-ingles-titulacion-minedu',
    titulo: 'Curso de Inglés Institucional: Requisito Obligatorio de Titulación MINEDU',
    keywords: ['ingles', 'idioma', 'curso de ingles', 'titulacion ingles', 'minedu ingles', 'nivel a2', 'nivel b1', 'convalidar ingles', 'donde estudiar ingles', 'ingles obligatorio', 'pago ingles', 'cuenta ingles', '00-638-025736'],
    categorias: ['academico', 'tramites', 'pagos'],
    locucion: "¡Hola! Para el Examen de Suficiencia Profesional y la Titulación debes presentar copia a color del certificado del Curso de Inglés Básico. El pago de cuatrocientos soles se realiza en el Banco de la Nación en la cuenta cero cero, seis tres ocho, cero dos cinco, siete tres seis, sacando dos copias a tu voucher para entregarlas en Tesorería. En tu pantalla tienes todos los detalles.",
    respuesta: `🌐 **Reglamento del Curso de Inglés Básico para Titulación:**

* **¿Es Obligatorio?** **SÍ.** Es requisito obligatorio tanto para solicitar el **Examen de Suficiencia Profesional** (copia a color de ambos lados del curso de Inglés Básico) como para el **Trámite de Título Profesional**.
* 💳 **Cuenta de Pago del Curso de Inglés (TUPA 2026: S/ 400.00):** Banco de la Nación **Cta. N° \`00-638-025736\`** *(Solo ventanilla BN, NO Págalo.pe ni agentes)*.
* 📄 **Voucher:** Debes **sacar 2 copias a tu voucher y entregarlos en Tesorería, en la oficina del instituto**.
* 🔄 **Revalidación Externa (Nivel B1):** Si estudiaste inglés en un centro externo autorizado (ICPNA, Británico, universidad), el trámite de *Revalidación de acreditación de idioma extranjero (nivel B1)* cuesta **S/ 150.00** y se paga en la cuenta general **\`00-638-002361\`**.`
  },
  {
    id: 'faq-examen-suficiencia-requisitos',
    titulo: 'Requisitos Oficiales para Solicitar Examen de Suficiencia Profesional',
    keywords: ['examen de suficiencia', 'suficiencia profesional', 'requisitos suficiencia', 'certificado de actualizacion', 'egresados 2021', 'foliado', 'solicitar suficiencia'],
    categorias: ['titulacion', 'tramites'],
    locucion: "¡Hola! Para solicitar el Examen de Suficiencia Profesional debes presentar tu expediente debidamente foliado y gestionar los requisitos con el coordinador de tu programa de estudios. El pago por derecho de examen es de doscientos soles en la cuenta corriente cero cero, seis tres ocho, cero cero dos, tres seis uno del Banco de la Nación. En tu pantalla tienes los siete requisitos exactos.",
    respuesta: `📝 **REQUISITOS OFICIALES PARA SOLICITAR EXAMEN DE SUFICIENCIA PROFESIONAL:**

📌 **Presentación:** *El expediente deberá ser presentado **debidamente foliado**.*
⚠️ **OJO:** *La gestión y revisión de requisitos para el Examen de Suficiencia **se realiza con el Coordinador de su Programa de Estudios**.*

1. **Solicitud dirigida al Director General**, pidiendo programar el Examen de Suficiencia Profesional cumpliendo con todos los requisitos.
2. **Copia a color de la Constancia de No Adeudar.** *(Constancia TUPA: S/ 15.00 en Cta. 00-638-002361).*
3. **Copia a color de DNI.**
4. **Copia a color de ambos lados de los tres (03) Certificados Modulares.**
5. **Copia a color de ambos lados del Certificado de Actualización según carrera profesional** *(Solo para egresados del 2021 hacia atrás. Ciclo de Actualización: S/ 400.00 en Cta. 00-638-025736).*
6. **Copia a color de ambos lados del Curso de Inglés Básico.** *(Pago del curso en Cta. 00-638-025736).*
7. **Boleta electrónica de pago y copia sellada por el área de Tesorería** por derecho de Examen de Suficiencia (**S/. 200.00** — Segunda opción: S/ 100.00).

🏦 **NOTA DE PAGO:** Los pagos se harán en el **Banco de la Nación** en la **Cta. Cte. N° \`00-638-002361\`** (NO Págalo.pe ni agentes).`
  },
  {
    id: 'faq-tramite-titulo-requisitos',
    titulo: 'Requisitos Oficiales para Trámite de Título Profesional',
    keywords: ['tramite de titulo', 'titulo profesional', 'caligrafiado', 'formato de titulo', 'derecho de titulo', 'ficha de actividades', 'sobre manila', 'folder a4', 'dni legalizado', 'partida de nacimiento', 'sistema tradicional'],
    categorias: ['titulacion', 'tramites'],
    locucion: "¡Hola! Para el Trámite de Título Profesional debes presentar la documentación debidamente foliada en folder A cuatro acompañada de un sobre manila A cuatro. Incluye los pagos en ventanilla del Banco de la Nación cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno: sesenta soles por formato y caligrafiado y cien soles por derecho de título. En tu pantalla tienes los diez requisitos oficiales.",
    respuesta: `🎓 **REQUISITOS OFICIALES PARA TRÁMITE DE TÍTULO PROFESIONAL:**

📁 **Presentación del Expediente:** La documentación debe presentarse **debidamente foliada**, en **folder A/4** y acompañada de un **sobre manila A4**.

1. **Solicitud:** Dirigida al Director General, solicitando obtención de Título Profesional.
2. **Certificado de Estudios de Educación Secundaria:** Original, debidamente firmado por el Director de la I.E. y contar con el **código virtual de verificación y código QR**.
3. **Certificado de Estudios de Educación Superior:** Original de Certificado de Estudios de Educación Superior.
4. **Partida de Nacimiento:** Original de Partida de Nacimiento actualizada.
5. **DNI Legalizado:** Copia a color de DNI **legalizada por Notario** *(totalmente nítida en nombre completo, fecha de nacimiento y número de DNI)*.
6. **Fotografías:** Dos (02) fotografías tamaño pasaporte: fondo blanco, revelada (no impresa), vestimenta formal, sin accesorios.
7. **Inglés Básico:** Copia a color de Certificado de Inglés Básico.
8. **Pago por Formato y Caligrafiado de Título:** Boleta electrónica de pago original y **1 copia sellada por Tesorería** — **Monto: S/. 60.00**.
9. **Pago por Derecho de Título Profesional:** Boleta electrónica de pago original y **1 copia sellada por Tesorería** — **Monto: S/. 100.00**.
10. **Ficha de Actividades:** Copia de Ficha de Actividades *(Solo para egresados que estudiaron en el Sistema Tradicional del 2008 hacia abajo — Derecho de trámite: **S/. 12.00**)*.

🏦 **NOTA IMPORTANTE DE PAGO:** Los pagos se harán en el **Banco de la Nación** en la **Cuenta Corriente N.º \`00-638-002361\`** (solo ventanilla BN, NO Págalo.pe ni agentes).`
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
    locucion: "¡Hola! Para titularte debes presentar tu documentación debidamente foliada en folder A cuatro con un sobre manila A cuatro, adjuntando certificado de secundaria con código Q R, certificado de educación superior, partida de nacimiento, D N I legalizado, dos fotos pasaporte, certificado de inglés básico y los pagos de sesenta soles por formato y cien soles por derecho de título en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno del Banco de la Nación. En tu pantalla tienes todos los detalles.",
    respuesta: `🎓 **Trámite y Modalidades para Título Profesional Técnico (Cta. BN \`00-638-002361\`):**

📁 **Presentación del Expediente:** Documentación **debidamente foliada**, en **folder A/4** y acompañada de un **sobre manila A4**.
* 📌 **Requisitos Principales del Trámite de Título:**
  1. Solicitud dirigida al Director General.
  2. Original de Certificado de Estudios Secundarios (firmado por Director I.E. con código virtual de verificación y QR) y Original de Certificado de Estudios de Educación Superior.
  3. Original de Partida de Nacimiento actualizada y Copia a color de DNI legalizada por Notario.
  4. Dos (02) fotografías tamaño pasaporte (fondo blanco, revelada no impresa, vestimenta formal, sin accesorios).
  5. Copia a color de Certificado de Inglés Básico.
  6. **Pago Formato y Caligrafiado de Título:** **S/. 60.00** (boleta electrónica original + 1 copia sellada por Tesorería).
  7. **Pago Derecho de Título Profesional:** **S/. 100.00** (boleta electrónica original + 1 copia sellada por Tesorería).
  8. **Ficha de Actividades:** Copia *(solo egresados del Sistema Tradicional del 2008 hacia abajo — S/. 12.00)*.
* 🏆 **Modalidades:** Sustentación de Trabajo de Aplicación Profesional (**S/ 200.00**) o **Examen de Suficiencia Profesional** (**S/ 200.00**).`
  },
  {
    id: 'faq-como-llegar-paita',
    titulo: '¿Cómo llegar al IESTP Hermanos Cárcamo en Paita Alta?',
    keywords: ['como llegar', 'donde queda el instituto', 'direccion exacta', 'colectivo', 'combi', 'desde piura', 'desde sullana', 'transporte paita', 'paradero'],
    categorias: ['contacto', 'general'],
    locucion: "¡Hola! El instituto está ubicado en la avenida Miguel Grau, manzana A lote uno, urbanización El Parque, en Paita Alta. Si vienes en transporte público, cualquier colectivo que sube de Paita Baja te deja en la puerta principal.",
    respuesta: `📍 **Ubicación y Guía de Transporte para Llegar al Campus:**

* 📌 **Dirección:** Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita Alta, Piura.
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
    locucion: "¡Hola! La academia Pre Tecno Hercar o Cepre te ofrece preparación intensiva con ingreso directo por orden de mérito, mientras que el examen ordinario es una prueba única de admisión. Ambas modalidades te dan acceso a cualquiera de nuestras cuatro carreras públicas.",
    respuesta: `⚖️ **Comparativa: Academia Pre Tecno Hercar (CEPRE) vs. Examen Ordinario:**

* 🏆 **Academia Pre Tecno Hercar / CEPRE:**
  - **Costo TUPA 2026:** **S/ 400.00** (Banco de la Nación Cta. N° \`00-638-025736\`).
  - **Ventaja principal:** Preparación pre-académica con **INGRESO DIRECTO** por estricto orden de mérito.
* 📝 **Examen Ordinario de Admisión:**
  - **Costo TUPA 2026:** **S/ 200.00** (Banco de la Nación Cta. Cte. N° \`00-638-002361\`).
  - **Ventaja principal:** Evaluación única de conocimientos y aptitud académica para postulantes con secundaria concluida.`
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
* 📋 **Requisitos para solicitarlo:** Estar matriculado formalmente en el semestre vigente, foto digital formal a color fondo blanco y voucher pagado en ventanilla del Banco de la Nación (Cta. \`00-638-002361\`).`
  },
  {
    id: 'faq-computadoras-laboratorios',
    titulo: 'Infraestructura, Talleres de Cómputo, Laboratorios y Wifi',
    keywords: ['laboratorios', 'computadoras', 'taller de computo', 'wifi', 'internet', 'aulas', 'equipamiento', 'plantas piloto', 'equipos'],
    categorias: ['institucional', 'academico'],
    locucion: "¡Hola! Contamos con centros de cómputo modernos con fibra óptica, laboratorios de redes, plantas piloto de calidad pesquera y aulas tecnológicas. En tu pantalla puedes ver nuestras instalaciones.",
    respuesta: `🖥️ **Infraestructura y Equipamiento Tecnológico del IESTP Hermanos Cárcamo:**

El campus de Paita cuenta con ambientes diseñados para el aprendizaje práctico:
* 💻 **Centros de Cómputo (APSTI / Computación e Informática 2027):** Estaciones de trabajo actualizadas, proyectores multimedia y software de desarrollo, servidores y redes.
* 🌐 **Conectividad y Aulas Tecnológicas:** Acceso a internet, biblioteca especializada y aulas virtuales.
* 🐟 **Plantas Piloto y Laboratorio de Pesquería y Acuicultura:** Módulos de cultivo acuícola, análisis de agua, calidad HACCP y taller de artes de pesca.
* 📊 **Aulas de Negocios y Contabilidad:** Equipadas para gestión aduanera, software contable y análisis financiero.`
  },
  {
    id: 'faq-convalidacion-universidades',
    titulo: 'Convenios de Articulación y Convalidación con Universidades',
    keywords: ['convalidacion universitaria', 'convalidar con universidad', 'seguir estudios', 'ingenieria', 'licenciatura', 'bachiller', 'continuar estudios', 'universidades con convenio'],
    categorias: ['carreras', 'institucional'],
    locucion: "¡Hola! Al graduarte como profesional técnico, puedes convalidar tus tres años de estudio para continuar tu carrera universitaria en ingeniería de sistemas, administración, contabilidad o ingeniería pesquera. En tu pantalla te muestro las equivalencias.",
    respuesta: `🎓 **¡Continúa tus Estudios Universitarios tras Egresar!**

Gracias a la Ley de Institutos N° 30512, los egresados titulados del IESTP Hermanos Cárcamo pueden convalidar sus 3 años de carrera técnica para continuar estudios universitarios:
* 🚀 **Equivalencias Directas:**
  - **APSTI (Computación e Informática 2027)** ➡️ **Ingeniería de Sistemas, Informática o Software**.
  - **ANI** ➡️ **Administración de Empresas o Negocios Internacionales**.
  - **Contabilidad** ➡️ **Contabilidad y Finanzas / Auditoría**.
  - **Desarrollo Pesquero y Acuícola** ➡️ **Ingeniería Pesquera o Acuícola**.`
  },
  {
    id: 'faq-pagos-digitales-yape-pagalo',
    titulo: '¿Se puede pagar por Págalo.pe, Yape, Plin o Agentes MultiRed?',
    keywords: ['yape', 'plin', 'pagalo.pe', 'pagalo', 'transferencia', 'cci', 'interbancario', 'agente multired', 'bcp a banco de la nacion', 'como pagar sin ir al banco', 'por internet'],
    categorias: ['pagos'],
    locucion: "¡Atención muy importante! En el Instituto Superior Hermanos Cárcamo NO se aceptan pagos por Págalo punto pe, ni por Yape o Plin, ni en agentes MultiRed. Todos los pagos se realizan únicamente en ventanilla del Banco de la Nación en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno para trámites generales, o en la cuenta cero cero, seis tres ocho, cero dos cinco, siete tres seis para el curso de inglés. En tu pantalla te explico las dos cuentas oficiales.",
    respuesta: `🚫 **AVISO OFICIAL DE TESORERÍA: NO SE PAGA EN PÁGALO.PE NI EN AGENTES**

Para evitar rechazos en Tesorería o el recargo de **S/ 15.00 por transferencia por error de cuenta (TUPA 2026)**, ten en cuenta las reglas oficiales:

* ❌ **NO se aceptan pagos por Págalo.pe.**
* ❌ **NO se aceptan pagos en Agentes MultiRed, ni bodegas, ni farmacias.**
* ❌ **NO se aceptan pagos por Yape, Plin ni transferencias sin ventanilla BN.**
* ✅ **ÚNICO CANAL AUTORIZADO:** Pago presencial directo en **ventanilla del Banco de la Nación**, indicando el **DNI y nombres y apellidos completos del estudiante**.

### 🏦 Las 2 Cuentas Oficiales en el Banco de la Nación:
1. **Cuenta Corriente N° \`00-638-002361\` (Trámites TUPA y Académicos):** Matrícula (S/ 250), Examen de Admisión (S/ 200), Examen de Suficiencia (S/ 200), Título Profesional (S/ 100 + Formato S/ 60), Certificados Modulares (S/ 25), Constancias (S/ 15). *(Registrar voucher en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) para boleta electrónica y sellar en Tesorería).*
2. **Cuenta N° \`00-638-025736\` (Inglés y Actividades Productivas):** Curso de Inglés Básico para Titulación (S/ 400), Academia Pre Tecno Hercar (S/ 400), Ciclo de Actualización (S/ 400), Ceremonia. *(Sacar **2 copias al voucher** y entregarlos en Tesorería, en la oficina del instituto).*`
  },
  {
    id: 'faq-croquis-campus-ambientes',
    titulo: 'Distribución y Croquis de Ambientes del Campus en Paita Alta',
    keywords: ['mapa del campus', 'croquis', 'ambientes', 'donde queda direccion', 'donde queda secretaria', 'donde queda el laboratorio', 'pabellones', 'aulas'],
    categorias: ['institucional', 'contacto'],
    locucion: "¡Hola! Nuestro campus en la avenida Miguel Grau cuenta con pabellón administrativo, centros de cómputo, aulas para negocios y contabilidad, planta piloto pesquera y biblioteca. En tu pantalla puedes ver la distribución de ambientes.",
    respuesta: `🗺️ **Distribución de Pabellones y Espacios del IESTP Hermanos Cárcamo:**

El campus institucional en Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita Alta está organizado en las siguientes zonas:
* 🏛️ **Pabellón Administrativo:** Dirección General, Jefatura de Unidad Académica, Secretaría Académica, Mesa de Partes y Tesorería.
* 💻 **Pabellón Tecnológico (APSTI / Computación e Informática 2027):** Laboratorios de Cómputo equipados con internet y taller de redes.
* 🚢 **Pabellón de Negocios y Finanzas:** Aulas de Contabilidad y Administración de Negocios Internacionales.
* 🐟 **Pabellón de Tecnología Marina (DPA):** Planta Piloto Pesquera, Laboratorio de Calidad HACCP y taller de artes de pesca.
* 📚 **Biblioteca Especializada y Recursos:** Biblioteca física y acceso virtual.
* 🏥 **Bienestar y Deportes:** Tópico, atención psicológica/tutoría y áreas deportivas.`
  },
  {
    id: 'faq-calendario-2026-cronograma',
    titulo: 'Calendario Académico y Fechas Clave del Año 2026',
    keywords: ['calendario 2026', 'cronograma 2026', 'inicio de clases', 'cuando empiezan las clases', 'cuando terminan las clases', 'feriados', 'semana tecnica', 'aniversario'],
    categorias: ['academico', 'institucional'],
    locucion: "¡Hola! En nuestro calendario académico dos mil veintiséis, el segundo período académico inició el veinticuatro de agosto, con retroalimentación del catorce al dieciocho de diciembre y entrega de boletas del veintiocho al treinta de diciembre. En tu pantalla tienes el cronograma oficial completo.",
    respuesta: `📅 **Calendario Académico Oficial 2026 (ieshercar.edu.pe):**

* 🚀 **Semestre Académico 2026-I:**
  - **Inicio de Clases Lectivas:** Marzo de 2026 (18 semanas lectivas).
  - **Aniversario Institucional:** 09 de Mayo de 2026 (R.M. N° 232-87-ED).

* 🍂 **Segundo Período Académico 2026-II (Oficial):**
  - **Reingresos, Traslados y Matrícula Ordinaria:** Del 17 al 21 de Agosto de 2026.
  - **Inicio del Segundo Período:** **Lunes 24 de Agosto de 2026**.
  - **Retroalimentación y Recuperación:** Del 14 al 18 de Diciembre de 2026.
  - **Culminación del Segundo Período:** **24 de Diciembre de 2026**.
  - **Entrega de Boletas de Notas:** Del **28 al 30 de Diciembre de 2026**.`
  },
  {
    id: 'faq-certificados-secundaria-digital',
    titulo: '¿Cómo obtener tu Certificado Oficial de Secundaria por Internet?',
    keywords: ['certificado de secundaria', 'certificado minedu', 'como sacar certificado de colegio', 'certificado de estudios digital', 'certificado gratis'],
    categorias: ['admision', 'tramites'],
    locucion: "¡Hola! Puedes tramitar tu certificado oficial de estudios secundarios con firma digital y código Q R a través de la web del Ministerio de Educación: certificado punto minedu punto gob punto pe. Recuerda que para el trámite de Título Profesional necesitas el original firmado por el Director del colegio con código virtual de verificación y Q R.",
    respuesta: `📄 **Cómo Descargar tu Certificado Oficial de Secundaria (MINEDU):**

Para postular o completar tu expediente de titulación en el IESTP Hermanos Cárcamo:
1. Ingresa a la plataforma oficial del Ministerio de Educación: **[certificado.minedu.gob.pe](https://certificado.minedu.gob.pe/)**.
2. Haz clic en *"Solicitar Certificado de Estudios"* e ingresa tu DNI y datos del colegio.
3. Para el **Trámite de Título Profesional**, asegúrate de contar con el **Original debidamente firmado por el Director de la I.E. con código virtual de verificación y código QR**.`
  },
  {
    id: 'faq-tupa-tramites-lista',
    titulo: 'Guía Completa del TUPA 2026 Oficial (R.D. N° 020-2026)',
    keywords: ['tupa', 'tramites tupa', 'costos tramites', 'tasas institucionales', 'lista de tramites', 'cuanto cuesta cada tramite', 'todos los tramites', 'tupa 2026'],
    categorias: ['tramites', 'pagos'],
    locucion: "¡Hola! El TUPA dos mil veintiséis oficial aprobado por Resolución Directoral cero veinte contempla cuarenta y tres procedimientos en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno, como la matrícula ordinaria de doscientos cincuenta soles, examen de suficiencia de doscientos soles y derecho de título de cien soles más sesenta de formato; y veintitrés conceptos productivos en la cuenta cero cero, seis tres ocho, cero dos cinco, siete tres seis, como el curso de inglés de cuatrocientos soles. En tu pantalla tienes el tarifario oficial.",
    respuesta: `📋 **TUPA 2026 Oficial — R.D. N° 020-2026-ME-GRP-DREP-IESTP"HC"-DG:**
*Todos los pagos se efectúan **únicamente en ventanilla del Banco de la Nación** (NO Págalo.pe, NO agentes).*

### 🏦 Cta. Cte. BN N° \`00-638-002361\` (Procedimientos Administrativos):
| Trámite TUPA 2026 | Tasa (S/.) |
|:---|:---|
| **Matrícula Ordinaria (Ingresantes y Regulares)** | S/. 250.00 |
| **Derecho Examen de Admisión** | S/. 200.00 |
| **Examen de Suficiencia Profesional (incluye actas)** | S/. 200.00 |
| **Segunda Opción Examen de Suficiencia Profesional** | S/. 100.00 |
| **Derecho de Titulación / Título Profesional** | S/. 100.00 |
| **Formato y Caligrafiado de Título Profesional** | S/. 60.00 |
| **Sustentación de Trabajo de Aplicación Profesional** | S/. 200.00 |
| **Certificado Modular (PPP / EFSRT)** *(Duplicado: S/ 30)* | S/. 25.00 |
| **Certificado de Estudios (6 Periodos / Por Periodo)** | S/. 240.00 / S/. 40.00 |
| **Constancias (Estudios, Matrícula, Egresado, No Adeudar, Tercio, Título)** | S/. 15.00 c/u |
| **Revalidación de Idioma Extranjero (Nivel B1)** | S/. 150.00 |
| **Recuperación / Repitencia de Unidad Didáctica** | S/. 35.00 |
| **Traslado Interno / Traslado Externo Público / Privado** | S/. 80.00 / S/. 80.00 / S/. 200.00 |
| **Reserva Matrícula (Ingresantes) / Licencia Estudios (2do-6to)** | S/. 60.00 / S/. 100.00 |
| **Reincorporación / Duplicado de Título** | S/. 65.00 / S/. 200.00 |

### 🇬🇧 Cta. BN N° \`00-638-025736\` (Actividades Productivas — Sacar 2 copias al voucher):
| Concepto | Tasa (S/.) |
|:---|:---|
| **Curso de Inglés Básico para Titulación** *(Duplicado: S/ 50)* | S/. 400.00 |
| **Academia Pre Tecno Hercar 2026** | S/. 400.00 |
| **Ciclo de Actualización para Examen de Suficiencia** *(Dup.: S/ 50)* | S/. 400.00 |
| **Toga y Birrete / Medalla / Porta Título / Brindis** | S/ 50 / S/ 60 / S/ 50 / S/ 30 |

📄 [Ver TUPA 2026 Oficial (PDF)](https://ieshercar.edu.pe/public/assets/documentos-institucionales/tupa-2026.pdf)`
  },
  {
    id: 'faq-fut-mesa-de-partes',
    titulo: '¿Cómo llenar y presentar el Formulario Único de Trámite (FUT)?',
    keywords: ['fut', 'formulario unico de tramite', 'llenar fut', 'mesa de partes', 'presentar fut', 'modelo de fut', 'solicitud fut', 'descargar fut'],
    categorias: ['tramites'],
    locucion: "¡Hola! Para presentar cualquier trámite en el instituto debes utilizar el Formulario Único de Trámite. Puedes generarlo directamente con nuestro botón Generar FUT en la parte superior, o ingresar a la mesa de partes virtual las veinticuatro horas del día.",
    respuesta: `📄 **Guía para la Generación y Presentación del FUT Institucional:**

El **Formulario Único de Trámite (FUT)** es el documento oficial mediante el cual solicitas trámites académicos y administrativos ante la Dirección General:

* ⚡ **Generador de FUT en Pantalla:** Pulsa **"Generar FUT"** en la barra superior para redactar y descargar tu solicitud lista para imprimir o enviar.
* 📋 **Datos requeridos:** Sumilla, datos personales (DNI, domicilio, celular, correo), programa de estudios (APSTI / Computación e Informática 2027, ANI, Contabilidad o DPA), fundamentación y anexos (copia DNI, boleta electrónica / voucher BN sellado en Tesorería).
* 🌐 **Mesa de Partes Virtual:** [sistema.ieshercar.edu.pe/registro-tramite/](https://sistema.ieshercar.edu.pe/registro-tramite/) | **Presencial:** Lunes a Viernes de 8:00 a.m. a 3:00 p.m.`
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
    locucion: "¡Hola! Según el TUPA dos mil veintiséis, la reserva de matrícula para ingresantes cuesta sesenta soles y la licencia de estudios para alumnos del segundo al sexto semestre cuesta cien soles, pagando únicamente en ventanilla del Banco de la Nación en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno. En tu pantalla tienes los detalles.",
    respuesta: `⏸️ **Guía para Reserva de Matrícula y Licencia de Estudios (TUPA 2026):**

* 📌 **Costos Oficiales TUPA 2026 (Cta. Cte. BN \`00-638-002361\`):**
  - **Reserva de Matrícula (Alumnos Ingresantes):** **S/ 60.00**.
  - **Licencia de Estudios (Alumnos del 2do. al 6to. Semestre):** **S/ 100.00**.
  - **Reincorporación de Estudios:** **S/ 65.00**.
* 📋 **Requisitos:**
  1. Formulario Único de Trámite (FUT) dirigido a la Dirección General exponiendo el motivo justificado.
  2. Boleta electrónica de pago (pagada en ventanilla BN Cta. \`00-638-002361\` y validada en pagos.ieshercar.edu.pe / Tesorería).
  3. No registrar adeudos institucionales.`
  },
  {
    id: 'faq-traslado-interno-externo',
    titulo: 'Requisitos para Traslados Internos y Traslados Externos',
    keywords: ['traslado', 'traslado interno', 'traslado externo', 'cambiar de carrera', 'venir de otra universidad', 'traslado desde piura', 'cambio de instituto'],
    categorias: ['academico', 'tramites'],
    locucion: "¡Hola! Si deseas cambiarte de carrera dentro del instituto, el traslado interno cuesta ochenta soles; el traslado externo desde instituto público cuesta ochenta soles y desde instituto privado doscientos soles en el Banco de la Nación. En tu pantalla tienes los requisitos.",
    respuesta: `🔀 **Modalidades de Traslado Estudiantil (TUPA 2026 — Cta. BN \`00-638-002361\`):**

1. 🔄 **Traslado Interno de Carrera Profesional:**
   - **Tasa TUPA 2026:** **S/. 80.00** (sujeto a vacantes disponibles).
   - **Convalidación de Unidad Didáctica (traslado interno):** **S/. 30.00**.

2. 🏛️ **Traslado Externo (Desde otro Instituto):**
   - **Instituto Público:** **S/. 80.00** | **Instituto Privado:** **S/. 200.00**.
   - **Convalidación de Unidad Didáctica (traslado externo):** **S/. 30.00**.
   - **Documentos:** Certificado oficial de estudios, sílabos visados, constancia de no haber sido separado por sanción disciplinaria y FUT.`
  },
  {
    id: 'faq-bachiller-tecnico-sunedu',
    titulo: '¿Qué es el Grado de Bachiller Técnico y qué ventajas ofrece?',
    keywords: ['bachiller tecnico', 'grado de bachiller', 'bachillerato tecnico', 'ley 30512', 'diferencia entre bachiller y titulo', 'puedo hacer maestria'],
    categorias: ['academico', 'titulacion'],
    locucion: "¡Hola! La Ley de Institutos reconoce el Grado de Bachiller Técnico para egresados de carreras de tres años que aprueben un trabajo de aplicación profesional. Te otorga rango superior para ascensos laborales y estudios de posgrado.",
    respuesta: `🎓 **Grado de Bachiller Técnico (Amparo en la Ley N° 30512):**

El Grado de **Bachiller Técnico** es un grado académico de nivel superior que otorga prestigio y validez en el mercado profesional:

* 🚀 **¿Cómo se obtiene?**
  1. Haber aprobado satisfactoriamente los **120 créditos curriculares** de la carrera técnica (6 semestres).
  2. Haber culminado y sustentado un **Trabajo de Aplicación Profesional** (TUPA Sustentación: **S/ 200.00** en Cta. BN \`00-638-002361\`).
  3. Acreditar el dominio de un idioma extranjero (Inglés Básico).`
  },
  {
    id: 'faq-actividades-extracurriculares',
    titulo: 'Deportes, Talleres Culturales y Proyección Social Estudiantil',
    keywords: ['deportes', 'campeonatos', 'talleres', 'aniversario', 'copa hercar', 'danzas', 'musica', 'actividades', 'feria'],
    categorias: ['institucional', 'bienestar'],
    locucion: "¡Hola! En el instituto promovemos el desarrollo integral mediante formación académica, cultural y deportiva de alta calidad, olimpiadas deportivas y ferias tecnológicas en Paita.",
    respuesta: `🏆 **Vida Estudiantil, Cultura, Deporte y Tradición:**

El IESTP Hermanos Cárcamo promueve el desarrollo integral del estudiante mediante formación académica, cultural y deportiva de alta calidad:
* ⚽ **Olimpiadas Deportivas "Copa Hermanos Cárcamo"** y áreas deportivas en campus.
* 🎭 **Actividades Culturales y Aniversario Institucional** (09 de mayo).
* 🐟 **Feria Tecnológica e Innovación** con participación de los 4 programas de estudios.`
  },
  {
    id: 'faq-wifi-biblioteca-virtual',
    titulo: '¿Cómo acceder a la red Wi-Fi institucional y a la Biblioteca Virtual?',
    keywords: ['wifi', 'clave wifi', 'internet campus', 'biblioteca virtual', 'biblioteca latina', 'yoleo', 'libros virtuales', 'como entrar a la biblioteca'],
    categorias: ['plataformas', 'institucional'],
    locucion: "¡Hola! Puedes acceder a nuestra Biblioteca Virtual y a la Biblioteca Virtual Latina ingresando con tu D N I para consultar miles de libros digitales especializados para tu carrera.",
    respuesta: `📶 **Biblioteca Especializada y Biblioteca Virtual 24/7:**

* 📚 **Biblioteca Virtual Institucional:** [biblioteca.ieshercar.edu.pe](https://biblioteca.ieshercar.edu.pe/)
* 📖 **Biblioteca Virtual Latina:** [iestphercar.bibliotecalatina.com/login](https://iestphercar.bibliotecalatina.com/login) *(Ingreso con tu DNI)*
* 💻 **Laboratorios con Internet:** Acceso a internet y aulas virtuales en el campus de Paita.`
  },
  {
    id: 'faq-duplicado-documentos',
    titulo: '¿Cómo solicitar Duplicado de Título o Certificados por pérdida?',
    keywords: ['duplicado de titulo', 'perdi mi titulo', 'duplicado certificado', 'denuncia policial', 'recuperar certificado', 'tramitar duplicado'],
    categorias: ['tramites'],
    locucion: "¡Hola! Según el TUPA dos mil veintiséis, el duplicado de título cuesta doscientos soles y el duplicado de certificado modular cuesta treinta soles en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno del Banco de la Nación; mientras que el duplicado de certificado de inglés o de actualización cuesta cincuenta soles en la cuenta cero cero, seis tres ocho, cero dos cinco, siete tres seis. En tu pantalla tienes todos los detalles.",
    respuesta: `📑 **Tarifario Oficial de Duplicados (TUPA 2026):**

* 🏦 **En Cta. Cte. BN \`00-638-002361\`** *(ventanilla BN + pagos.ieshercar.edu.pe + Tesorería)*:
  - **Duplicado de Título (Trámite y Formato):** **S/. 200.00**
  - **Duplicado de Certificado Modular:** **S/. 30.00**
  - **Duplicado de Boleta de Notas (Por Periodo Académico):** **S/. 10.00**
  - **Duplicado de Notas de haber aprobado Módulo Profesional PPP:** **S/. 10.00**
  - **Duplicado de Oficio de prácticas pre profesionales y/o EFSRT:** **S/. 4.00**
* 🇬🇧 **En Cta. BN \`00-638-025736\`** *(sacar 2 copias al voucher y entregar en Tesorería)*:
  - **Duplicado de Certificado de Inglés Básico para Titulación:** **S/. 50.00**
  - **Duplicado de Certificado de Actualización para Examen de Suficiencia:** **S/. 50.00**`
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
    titulo: 'Modalidades de Titulación: Trabajo de Aplicación / Innovación vs. Examen de Suficiencia',
    keywords: ['modalidades de titulacion', 'proyecto de innovacion', 'tesis o examen', 'sustentacion', 'examen de suficiencia', 'como titularme facil'],
    categorias: ['titulacion'],
    locucion: "¡Hola! Puedes titularte sustentando un Trabajo de Aplicación Profesional por doscientos soles o rindiendo el Examen de Suficiencia Profesional por doscientos soles, ambos pagados en la cuenta corriente cero cero, seis tres ocho, cero cero dos, tres seis uno del Banco de la Nación. En tu pantalla tienes los detalles.",
    respuesta: `🎓 **Modalidades de Titulación Profesional Técnica (TUPA 2026 — Cta. \`00-638-002361\`):**

1. 💡 **Modalidad A: Sustentación de Trabajo de Aplicación Profesional:**
   - **Tasa TUPA:** **S/. 200.00** (Cta. Cte. BN \`00-638-002361\`).
   - **En qué consiste:** Elaboración y sustentación pública de un trabajo o proyecto aplicado a tu carrera profesional.

2. 📝 **Modalidad B: Examen de Suficiencia Profesional:**
   - **Tasa TUPA:** **S/. 200.00** (incluye actas) · Segunda opción: **S/. 100.00** (Cta. Cte. BN \`00-638-002361\`).
   - **Gestión:** Con el **Coordinador de tu Programa de Estudios**. Expediente **debidamente foliado** (incluye solicitud al Director General, constancia no adeudar, DNI a color, 3 certificados modulares a color ambos lados, certificado de actualización para egresados 2021 hacia atrás, inglés básico ambos lados y boleta sellada por Tesorería).`
  },
  {
    id: 'faq-carnet-medio-pasaje-tramite',
    titulo: 'Paso a paso para tramitar el Carné de Educación Superior MINEDU',
    keywords: ['pasos carnet', 'como sacar carnet', 'tramite de carnet', 'foto para carnet', 'medio pasaje tramitar', 'donde pagar carnet'],
    categorias: ['bienestar', 'tramites'],
    locucion: "¡Hola! Para tramitar tu carné de medio pasaje oficial del Minedu debes estar matriculado, pagar la tasa vigente en ventanilla del Banco de la Nación en la cuenta cero cero, seis tres ocho, cero cero dos, tres seis uno, registrar tu voucher en el portal de pagos y presentar tu foto digital formal con fondo blanco en Secretaría.",
    respuesta: `🚌 **Paso a Paso para Tramitar tu Carné de Educación Superior MINEDU:**

1. 💳 **Pago en Ventanilla del Banco de la Nación:**
   - Cuenta Corriente N° **\`00-638-002361\`** *(consultar importe vigente de la convocatoria en Secretaría Académica)*.
   - Registra el voucher en [pagos.ieshercar.edu.pe](https://pagos.ieshercar.edu.pe/) y sella en Tesorería.
2. 📸 **Especificaciones de la Fotografía:**
   - Fotografía digital a color tamaño carnet (fondo blanco liso, vestimenta formal, rostro descubierto).
3. 🏢 **Registro en Secretaría Académica:**
   - Presentar la foto y comprobante en Secretaría dentro de las fechas de convocatoria.`
  }
];

const CURSO_INGLES_INSTITUTO = {
  nombre: 'Curso de Inglés Básico para Titulación (Idioma Extranjero)',
  institucion: 'IESTP Hermanos Cárcamo - Paita',
  finalidad: 'Requisito obligatorio para solicitar el Examen de Suficiencia Profesional y para el Trámite de Título Profesional Técnico según la Ley N° 30512 del MINEDU.',
  cuentaBN: '00-638-025736',
  costoTupa: 'S/ 400.00 (Duplicado de Certificado: S/ 50.00)',
  revalidacionB1: 'S/ 150.00 (Revalidación de acreditación de idioma extranjero nivel B1 en Cta. Cte. 00-638-002361)',
  modalidades: [
    {
      nivel: 'Curso de Inglés Básico para Titulación (IESTP Hermanos Cárcamo)',
      duracion: '3 Módulos Progresivos (Certificación Oficial del Instituto)',
      modalidad: 'Costo TUPA 2026: S/ 400.00 — Cta. Banco de la Nación N° 00-638-025736',
      certificacion: 'Certificado Oficial de Inglés Básico (requisito en copia a color para Examen de Suficiencia y Título Profesional)'
    },
    {
      nivel: 'Revalidación de Acreditación de Idioma Extranjero (Nivel B1)',
      descripcion: 'Para estudiantes o egresados que acrediten estudios en centros de idiomas reconocidos externos.',
      requisito: 'Solicitud por Mesa de Partes adjuntando certificado oficial y pago TUPA de S/ 150.00 en la Cta. Cte. BN N° 00-638-002361.'
    }
  ],
  pasosInscripcion: [
    'El pago se realiza en el Banco de la Nación en la cuenta N° 00-638-025736 (NO Págalo.pe, NO agentes).',
    'Debes sacar 2 copias a tu voucher de pago.',
    'Entregar el voucher y las 2 copias en Tesorería, en la oficina del instituto (Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita).',
    'Verificar en Tesorería no mantener adeudos pendientes para no retrasar la entrega de certificados ni tu trámite de titulación.'
  ],
  avisoTesoreria: 'El pago del Curso de Inglés se realiza en el Banco de la Nación en la cuenta N° 00-638-025736. Debes sacar 2 copias a tu voucher y entregarlos en Tesorería, en la oficina del instituto.',
  beneficios: [
    'Cumplimiento directo del requisito obligatorio de Inglés Básico para Examen de Suficiencia y Título Profesional.',
    'Cuenta bancaria específica institucional (00-638-025736) según Anexo TUPA 2026 de Actividades Productivas.',
    'Posibilidad de revalidación externa (Nivel B1 - TUPA S/ 150.00 en Cta. 00-638-002361).'
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
    nombre: 'Arquitectura de Plataformas y Servicios de TI (2027: Computación e Informática)',
    icono: 'bi-laptop-fill',
    color: '#0d6efd',
    colorBg: '#eff6ff',
    duracion: '3 años (6 semestres / 120 créditos)',
    perfilClave: 'Diseño y desarrollo de infraestructuras tecnológicas avanzadas, servidores de alto rendimiento, sistemas de información empresarial, redes, bases de datos y software. En el 2027 pasará a denominarse Computación e Informática.',
    certificacionesModulares: [
      'Módulo I: Mantenimiento de Sistemas y Servicios de TI',
      'Módulo II: Puesta en Producción y Monitoreo de Sistemas y Servicios de TI',
      'Módulo III: Diseño de Arquitectura de Infraestructura y Plataforma de TI'
    ],
    campoLaboralPaita: 'Empresas pesqueras, Terminales Portuarios Euroandinos (TPE), municipalidades, bancos, cajas de ahorro y desarrollo de software.',
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
    perfilClave: 'Gestión y dirección de actividades comerciales globales, mercados internacionales, logística, aduanas, aranceles, importación y exportación en el Puerto de Paita.',
    certificacionesModulares: [
      'Módulo I: Procesos de Importación y Exportación de Productos y Servicios',
      'Módulo II: Soporte Operativo, Técnico y Logístico para Importación/Exportación',
      'Módulo III: Logística Internacional y Cadena de Suministro'
    ],
    campoLaboralPaita: 'Terminal Portuario Euroandinos (TPE), agencias de aduana (Ransa, Medlog), empresas agroexportadoras de mango, uva y pota.',
    sueldoPromedio: 'S/. 2,000 - S/. 5,000+ mensual',
    convalidacionUniversitaria: 'Administración de Empresas, Comercio Exterior o Negocios Internacionales.'
  },
  {
    id: 'conta',
    codigo: 'CONTA',
    nombre: 'Contabilidad',
    icono: 'bi-calculator-fill',
    color: '#6f42c1',
    colorBg: '#faf5ff',
    duracion: '3 años (6 semestres / 120 créditos)',
    perfilClave: 'Gestión fiscal y tributaria SUNAT (IGV, Renta, PDT, SIRE), estados financieros, software contable, costos empresariales, planillas PLAME y auditoría.',
    certificacionesModulares: [
      'Módulo I: Desarrollo de Operaciones Contables y Financieras',
      'Módulo II: Formulación de Estados Financieros',
      'Módulo III: Análisis Financiero'
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
    perfilClave: 'Biología marina, ecología, gestión sostenible de recursos acuáticos, captura, procesamiento y conservación pesquera, sistemas acuícolas y aseguramiento de calidad HACCP/SANIPES.',
    certificacionesModulares: [
      'Módulo I: Administración y Dirección de Actividades de Pesca',
      'Módulo II: Implementación y Supervisión de Sistemas Acuícolas',
      'Módulo III: Aseguramiento de la Calidad de los Procesos de Productos'
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
 * CATÁLOGO OFICIAL DE TASAS Y TRÁMITES TUPA 2026 (R.D. N° 020-2026)
 * Incluye cuenta bancaria específica del Banco de la Nación (00-638-002361 o 00-638-025736)
 */
const TASAS_TUPA_COTIZADOR = [
  { id: 'tupa-matricula', nombre: 'Matrícula Ordinaria (Ingresantes y Regulares)', costo: 250, cuenta: '00-638-002361', categoria: 'Academico', icon: 'bi-pencil-square', detalle: 'TUPA 2026 Item 30 · Ventanilla BN Cta. 00-638-002361 + pagos.ieshercar.edu.pe' },
  { id: 'tupa-admision-ordinario', nombre: 'Derecho Examen de Admisión', costo: 200, cuenta: '00-638-002361', categoria: 'Admision', icon: 'bi-person-check', detalle: 'TUPA 2026 Item 42 · Cta. Cte. BN 00-638-002361' },
  { id: 'tupa-examen-suficiencia', nombre: 'Examen de Suficiencia Profesional (incluye actas)', costo: 200, cuenta: '00-638-002361', categoria: 'Titulacion', icon: 'bi-journal-check', detalle: 'TUPA 2026 Item 25 · Cta. Cte. BN 00-638-002361 (2da opción: S/ 100)' },
  { id: 'tupa-formato-titulo', nombre: 'Formato y Caligrafiado de Título Profesional', costo: 60, cuenta: '00-638-002361', categoria: 'Titulacion', icon: 'bi-file-earmark-medical', detalle: 'TUPA 2026 Item 27 · Boleta electrónica original + 1 copia sellada por Tesorería' },
  { id: 'tupa-derecho-titulo', nombre: 'Derecho de Titulación / Título Profesional', costo: 100, cuenta: '00-638-002361', categoria: 'Titulacion', icon: 'bi-award-fill', detalle: 'TUPA 2026 Item 19 · Boleta electrónica original + 1 copia sellada por Tesorería' },
  { id: 'tupa-ficha-tradicional', nombre: 'Ficha de Actividades (Solo Sistema Tradicional <= 2008)', costo: 12, cuenta: '00-638-002361', categoria: 'Titulacion', icon: 'bi-archive', detalle: 'Solo egresados Sistema Tradicional 2008 hacia abajo' },
  { id: 'tupa-sustentacion-tap', nombre: 'Sustentación de Trabajo de Aplicación Profesional', costo: 200, cuenta: '00-638-002361', categoria: 'Titulacion', icon: 'bi-easel2-fill', detalle: 'TUPA 2026 Item 38 · Modalidad Trabajo de Aplicación' },
  { id: 'tupa-cert-modular', nombre: 'Certificado Modular (PPP / EFSRT)', costo: 25, cuenta: '00-638-002361', categoria: 'Certificaciones', icon: 'bi-award', detalle: 'TUPA 2026 Item 5 · Duplicado: S/ 30.00' },
  { id: 'tupa-constancia-estudios', nombre: 'Constancias (Estudios / Matrícula / Egresado / No Adeudar / Tercio)', costo: 15, cuenta: '00-638-002361', categoria: 'Documentos', icon: 'bi-file-earmark-text', detalle: 'TUPA 2026 Items 6-12 · Constancia numerada o Consolidado de notas' },
  { id: 'tupa-cert-estudios-ciclo', nombre: 'Certificado de Estudios (Por Periodo Académico)', costo: 40, cuenta: '00-638-002361', categoria: 'Documentos', icon: 'bi-file-earmark-ruled', detalle: 'TUPA 2026 Item 4 · Por un semestre/periodo académico' },
  { id: 'tupa-cert-estudios-comp', nombre: 'Certificado de Estudios Completo (6 Periodos)', costo: 240, cuenta: '00-638-002361', categoria: 'Documentos', icon: 'bi-folder-check', detalle: 'TUPA 2026 Item 3 · Incluye los seis periodos académicos' },
  { id: 'tupa-revalidacion-ingles', nombre: 'Revalidación de Acreditación de Idioma Extranjero (Nivel B1)', costo: 150, cuenta: '00-638-002361', categoria: 'Titulacion', icon: 'bi-translate', detalle: 'TUPA 2026 Item 36 · Cta. Cte. BN 00-638-002361' },
  { id: 'tupa-recuperacion-ud', nombre: 'Recuperación / Repitencia de Unidad Didáctica', costo: 35, cuenta: '00-638-002361', categoria: 'Academico', icon: 'bi-arrow-repeat', detalle: 'TUPA 2026 Items 32 y 34 · Por unidad didáctica' },
  { id: 'tupa-convalidacion', nombre: 'Convalidación de Unidad Didáctica (Traslado Interno/Externo)', costo: 30, cuenta: '00-638-002361', categoria: 'Academico', icon: 'bi-arrow-left-right', detalle: 'TUPA 2026 Items 14 y 16 · Convalidación PPP laboral/EFSRT: S/ 150' },
  { id: 'tupa-traslado-interno', nombre: 'Traslado Interno o Externo (Instituto Público)', costo: 80, cuenta: '00-638-002361', categoria: 'Academico', icon: 'bi-shuffle', detalle: 'TUPA 2026 Items 40 y 41 · Externo Instituto Privado: S/ 200' },
  { id: 'tupa-reserva-matricula', nombre: 'Reserva de Matrícula (Alumnos Ingresantes)', costo: 60, cuenta: '00-638-002361', categoria: 'Academico', icon: 'bi-pause-circle', detalle: 'TUPA 2026 Item 35 · Licencia de Estudios (2do-6to): S/ 100' },
  { id: 'tupa-reincorporacion', nombre: 'Reincorporación de Estudios', costo: 65, cuenta: '00-638-002361', categoria: 'Academico', icon: 'bi-arrow-clockwise', detalle: 'TUPA 2026 Item 33 · Retorno oficial' },
  { id: 'tupa-duplicado-titulo', nombre: 'Duplicado de Título (Trámite y Formato)', costo: 200, cuenta: '00-638-002361', categoria: 'Titulacion', icon: 'bi-files', detalle: 'TUPA 2026 Item 24 · Por pérdida o deterioro' },
  { id: 'prod-curso-ingles', nombre: 'Curso de Inglés Básico para Titulación', costo: 400, cuenta: '00-638-025736', categoria: 'Ingles y Productivas', icon: 'bi-translate', detalle: 'Cta. BN 00-638-025736 · Sacar 2 copias al voucher y entregar en Tesorería' },
  { id: 'prod-pre-hercar', nombre: 'Academia Pre Tecno Hercar 2026 (CEPRE)', costo: 400, cuenta: '00-638-025736', categoria: 'Ingles y Productivas', icon: 'bi-mortarboard', detalle: 'Cta. BN 00-638-025736 · Preparación e ingreso directo' },
  { id: 'prod-actualizacion-suf', nombre: 'Ciclo de Actualización para Examen de Suficiencia', costo: 400, cuenta: '00-638-025736', categoria: 'Ingles y Productivas', icon: 'bi-journal-bookmark', detalle: 'Cta. BN 00-638-025736 · Egresados 2021 hacia atrás' },
  { id: 'prod-duplicado-ingles', nombre: 'Duplicado Certificado Inglés Básico / Actualización', costo: 50, cuenta: '00-638-025736', categoria: 'Ingles y Productivas', icon: 'bi-file-earmark-check', detalle: 'Cta. BN 00-638-025736 · Actividades Productivas' },
  { id: 'prod-ceremonia-toga', nombre: 'Alquiler de Toga y Birrete / Porta Título', costo: 50, cuenta: '00-638-025736', categoria: 'Ingles y Productivas', icon: 'bi-award', detalle: 'Cta. BN 00-638-025736 · Medalla Institucional: S/ 60' }
];

/**
 * DIRECTORIO Y AMBIENTES DEL CAMPUS PAITA ALTA
 */
const CAMPUS_AMBIENTES_HERCAR = [
  { ambiente: 'Pabellón Administrativo', descripcion: 'Dirección General, Jefatura Académica, Secretaría Académica, Mesa de Partes y Tesorería', icon: 'bi-building' },
  { ambiente: 'Centros de Cómputo APSTI (2027: Computación e Informática)', descripcion: 'Laboratorios equipados con computadoras de última generación, internet y servidores de prueba', icon: 'bi-laptop' },
  { ambiente: 'Taller de Conectividad y Redes', descripcion: 'Equipamiento de red, routers, switches y herramientas para infraestructura y cableado estructurado', icon: 'bi-hdd-network' },
  { ambiente: 'Planta Piloto Pesquera (DPA)', descripcion: 'Autoclaves, selladoras de conservas, cámaras de congelado y áreas de procesamiento pesquero', icon: 'bi-box-seam' },
  { ambiente: 'Laboratorio de Microbiología y Control de Calidad HACCP', descripcion: 'Equipos de medición físico-química y análisis de inocuidad de productos hidrobiológicos', icon: 'bi-water' },
  { ambiente: 'Aulas de Negocios y Contabilidad', descripcion: 'Aulas tecnológicas con proyectores multimedia, gestión aduanera y software contable', icon: 'bi-calculator' },
  { ambiente: 'Biblioteca Especializada y Biblioteca Virtual', descripcion: 'Espacios de estudio, colección bibliográfica y acceso digital en biblioteca.ieshercar.edu.pe', icon: 'bi-book' },
  { ambiente: 'Bienestar, Empleabilidad y Tópico', descripcion: 'Orientación estudiantil, CODE, Bolsa Laboral y atención primaria con afiliación SIS', icon: 'bi-hospital' },
  { ambiente: 'Auditorio Central Institucional "Hermanos Cárcamo"', descripcion: 'Sala magna para conferencias, ceremonias de titulación y eventos académicos', icon: 'bi-people' },
  { ambiente: 'Áreas Deportivas y Recreación', descripcion: 'Espacios deportivos para formación integral y actividades culturales estudiantiles', icon: 'bi-trophy' }
];



