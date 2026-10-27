# 🎓 HercarBot IA — Asistente Virtual Inteligente Institucional
### IESTP "Hermanos Cárcamo" - Paita, Piura
**Proyecto Final de Aplicación de Inteligencia Artificial y Tecnologías de la Información**

---

## 📌 1. Descripción del Proyecto

**HercarBot IA** es una aplicación web conversacional dedicada (diseño moderno tipo ChatGPT / Copilot Institucional) construida a medida para el **Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo"** de Paita.

El sistema cuenta con una **Base de Conocimiento Profunda y Exhaustiva** que contiene:
- Planes de estudio completos ciclo por ciclo (I al VI) de las 4 carreras técnicas.
- TUPA de trámites académicos (matrículas, certificados modulares, titulación, carné de medio pasaje, etc.).
- Modalidades y balotario de admisión (Ordinario, Exonerados y Academia CEPRE-HERCAR).
- Simulador Interactivo de Examen de Admisión de 8 preguntas con puntaje y retroalimentación inmediata.
- Guía interactiva paso a paso para el registro de pagos del Banco de la Nación en `pagos.ieshercar.edu.pe`.
- Test de Orientación Vocacional algorítmico y Sugerencias Rápidas (Chips interactivos).
- Directorio temático interactivo con más de 30 temas institucionales organizados en 4 categorías.
- Soporte de Voz bidireccional (Micrófono y Lectura en voz alta mediante Web Speech API).
- Modo Oscuro / Modo Claro con detección y persistencia en navegador.
- Motor de procesamiento de lenguaje natural (NLP) normalizado contra tildes, mayúsculas y diacríticos.
- Panel Administrativo con gráficos en tiempo real (Chart.js), búsqueda y edición de FAQs, y test de conexión en vivo con la API de Google Gemini con medición de latencia.

---

## 📂 2. Estructura de Archivos

```
📁 proyecto final instituto hermnqos carcamo/
│
├── 📄 index.html              # Aplicación Web Dedicada de HercarBot IA (Workspace Conversacional con Dark Mode)
├── 📄 admin.html              # Panel Administrativo con Dashboard de Métricas, Gestor de FAQs y Test Gemini
├── 📄 README.md               # Documentación y Guía de Sustentación ante el Docente
│
├── 📂 css/
│   ├── 🎨 style.css           # Estilos del Workspace (Sidebar, Cards, Chips, Dark Theme, Modals, Voice)
│   └── 🎨 admin.css           # Estilos del Panel de Control y Analíticas
│
└── 📂 js/
    ├── 🧠 knowledge-base.js   # Base de Conocimiento Masiva (Mallas, TUPA, Autoridades, Historia, Simulador)
    ├── 🤖 chatbot.js          # Motor Inteligente NLP normalizado + Test Vocacional + Simulador + Web Speech + Gemini
    └── 📈 admin.js            # Lógica del Dashboard con gráficos Chart.js, búsqueda, edición y test API en vivo
```

---

## 🧠 3. Base de Conocimiento Integrada

El chatbot domina y responde sobre:

### A. Carreras Profesionales Técnicas (3 años / 6 semestres / 120 créditos):
1. **APSTI** (*Arquitectura de Plataformas y Servicios TI / Software y Redes*):
   - Módulo I: Soporte Técnico, Mantenimiento y Redes (Ciclos I y II).
   - Módulo II: Desarrollo de Software y Bases de Datos (Ciclos III y IV).
   - Módulo III: Administración de Plataformas y Cloud Computing (Ciclos V y VI).
2. **ANI** (*Administración de Negocios Internacionales / Comercio Exterior y Aduanas*):
   - Módulo I: Gestión Comercial y Administrativa (Ciclos I y II).
   - Módulo II: Operatividad Aduanera y Comercio Exterior (Ciclos III y IV).
   - Módulo III: Logística Internacional y Cadena de Suministro (Ciclos V y VI).
3. **CONTA** (*Contabilidad y Tributación SUNAT*):
   - Módulo I: Procesos Contables y Libros (Ciclos I y II).
   - Módulo II: Costos y Liquidación Tributaria SIRE/PDT (Ciclos III y IV).
   - Módulo III: Estados Financieros, Auditoría y SIAF (Ciclos V y VI).
4. **DPA** (*Desarrollo Pesquero y Acuícola / Acuicultura y Plantas Pesqueras*):
   - Módulo I: Extracción, Navegación y Artes de Pesca (Ciclos I y II).
   - Módulo II: Producción Acuícola y Cultivo de Especies (Ciclos III y IV).
   - Módulo III: Procesamiento de Congelado/Conservas y Calidad HACCP (Ciclos V y VI).

### B. Vida Institucional y Normativa:
- **Plana Directiva y Autoridades:** Dirección General, Jefatura de Unidad Académica, Secretaría Académica y Jefaturas de Área.
- **Identidad Institucional:** Historia del instituto, Misión, Visión y valores.
- **Turnos y Horarios:** Turno Diurno (mañana/tarde) y Turno Nocturno según carrera.
- **Régimen de Evaluación y Desaprobados:** Calificación vigesimal (0 a 20), nota mínima aprobatoria 13, procesos de recuperación, DPI y repitencia.
- **Traslados y Convalidaciones:** Requisitos para traslados internos/externos y convalidación de unidades didácticas.
- **Bienestar y Salud Estudiantil:** Afiliación y atención médica con Seguro Integral de Salud (SIS Gratuito).

### C. Proceso de Admisión y CEPRE-HERCAR:
- Examen ordinario y balotario temático.
- Simulador interactivo de examen de admisión con 8 preguntas evaluativas.
- Ingreso directo por CEPRE-HERCAR y vacantes reservadas.
- Modalidad de Exonerados (Primeros puestos, deportistas calificados, personas con discapacidad).
- Requisitos para la carpeta de postulante y educación pública 100% gratuita.

### D. Guía de Pagos en el Banco de la Nación:
- Cuenta Corriente oficial N° `00-631-012948`.
- Procedimiento para subir el voucher a `pagos.ieshercar.edu.pe`.
- Acceso directo al video tutorial oficial en Google Drive.

### E. TUPA y Trámites Académicos:
- Requisitos, costos y plazos para: Certificados Modulares, Titulación Profesional, Matrícula Semestral, Constancias de Estudio y Carné de Medio Pasaje MINEDU.

---

## 🎯 4. Guía de Sustentación para el Alumno

Sigue esta secuencia para impresionar a tu profesor y al jurado evaluador para obtener la máxima calificación (20 / 20):

1. **Abrir [`index.html`](file:///c:/Users/Misael%20P/Downloads/proyecto%20final%20instituto%20hermnqos%20carcamo/index.html) en el navegador:**
   - Destacar la interfaz moderna y fluida tipo ChatGPT / Copilot.
   - Demostrar el botón de cambio de tema **🌓 Modo Oscuro / Modo Claro** en la barra superior.
   - Abrir el botón **🧭 Directorio de Temas** para mostrar las más de 30 consultas organizadas en tarjetas.
2. **Demostración de Inteligencia Conversacional (NLP con y sin tildes):**
   - Escribir con acentos: *"¿Cómo es el proceso de admisión?"* o *"¿dónde queda el instituto?"* -> El bot procesa sin problemas gracias a la normalización léxica NFD.
   - Preguntar por autoridades: *"¿Quién es el director del instituto?"* -> El bot muestra la tarjeta de las autoridades académicas.
   - Preguntar por normas de desaprobación: *"¿Qué pasa si jalo un curso?"* -> El bot detalla el reglamento de notas mínimas y recuperación.
   - Mostrar la interacción con los **Chips de Sugerencias Rápidas** que aparecen al pie de cada mensaje.
3. **Demostración de los Módulos Interactivos:**
   - **Test Vocacional:** Iniciar el test interactivo de 3 preguntas y ver cómo el algoritmo calcula la afinidad técnica del estudiante.
   - **Simulador de Admisión:** Responder las preguntas de razonamiento matemático, verbal, cultura general y pesquería, obteniendo feedback inmediato y nota final.
   - **Soporte de Voz:** Probar el micrófono para dictar una pregunta y activar el altavoz para escuchar la respuesta institucional.
4. **Abrir el Panel de Control [`admin.html`](file:///c:/Users/Misael%20P/Downloads/proyecto%20final%20instituto%20hermnqos%20carcamo/admin.html):**
   - Mostrar los gráficos de estadísticas con Chart.js (consultas por carrera, distribución horaria, etc.).
   - Usar el **Buscador en tiempo real** y el filtro por categoría de preguntas frecuentes.
   - Mostrar la **Edición o Creación de una FAQ** mediante ventana modal.
   - Probar la herramienta de **"Probar Conexión con Gemini en Vivo"** que mide la latencia de respuesta en milisegundos con la API de IA.
   - Descargar el reporte completo del sistema en formato JSON.

---
*Proyecto Final - IESTP Hermanos Cárcamo de Paita (2026).*
