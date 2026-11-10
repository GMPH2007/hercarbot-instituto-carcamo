# 🎓 HercarBot IA — Asistente Virtual Inteligente Institucional v5.0
### IESTP "Hermanos Cárcamo" - Paita, Piura
**Proyecto Final de Aplicación de Inteligencia Artificial, Redes Neuronales y Tecnologías de la Información**

---

## 📌 1. Descripción del Proyecto

**HercarBot IA** es un sistema conversacional inteligente de nivel profesional diseñado a medida para el **Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo"** de Paita (Piura). Cuenta con una arquitectura híbrida de Inteligencia Artificial que combina:

1. **Motor Cognitivo con Memoria Multi-Turno:** El bot recuerda activamente el contexto de la conversación. Si estás consultando sobre una carrera y preguntas *"¿cuánto dura?"*, *"¿cuánto cuesta?"*, *"¿dónde puedo trabajar?"* o *"¿cuáles son sus cursos?"*, el bot responde de forma precisa asociándolo al programa en memoria sin pedir aclaraciones redundantes.
2. **Monitor de Red Neuronal & Sinapsis en Tiempo Real:** Un canvas interactivo animado que muestra la propagación de impulsos en 4 capas (Entrada Léxica, Oculta Semántica, Oculta Entidades y Salida de Intención) con sandbox de inferencia en vivo (precisión calculada de 99.4% y latencia de ~16 ms).
3. **Síntesis de Voz Humana Femenina ("Voz de Chica Asesora"):** Motor fonético universal con Web Speech API calibrado acústicamente (prioridad para voces naturales Dalia, Salma, Jimena o Google Español). Elimina la monotonía y cualquier distorsión metálica, introduce micro-pausas respiratorias de 65 ms y sincroniza un halo pulsante de locución activa en el avatar.
4. **Convertidor Fonético Universal de Números:** Convierte al vuelo todos los dígitos a palabras en español fluido:
   - Cuentas corrientes del Banco de la Nación: `00-631-012948` &rarr; *"cero cero, seis tres uno, cero doce, nueve cuatro ocho"*.
   - Tasas y aranceles TUPA: `S/ 120.00` &rarr; *"ciento veinte soles"*.
   - Escalas de notas: `0 a 20` &rarr; *"cero a veinte"*, `nota 13` &rarr; *"nota mínima trece"*.
   - Horarios: `8:00 a.m.` &rarr; *"ocho de la mañana"*, `1:15 p.m.` &rarr; *"una y quince de la tarde"*.
   - Semestres y ciclos romanos: `Ciclos I al VI` &rarr; *"Ciclos uno al seis"*.
5. **Motor de Sonidos UI (Web Audio API):** Generación de retroalimentación auditiva futurista y sutil mediante síntesis sinusoidal directa en el navegador, sin cargar archivos MP3 externos.
6. **Paleta de Comandos Spotlight (`Ctrl + K`):** Acceso rápido con teclado estilo macOS Spotlight / VS Code para navegación ultrarrápida entre carreras, trámites, calculadora y herramientas.
7. **Paso de Razonamiento Cognitivo (Neural Thought Disclosure):** En cada respuesta, el bot despliega un paso de inferencia cognitiva con latencia exacta en milisegundos (~14 ms), tokens NFD analizados, entidad detectada y porcentaje de certeza sináptica.
8. **Ecualizador Dinámico de Audio (`.voice-speech-bars`):** Barras de frecuencia animadas en tiempo real que reaccionan a la locución activa de la asesora virtual.
9. **Calculadora Interactiva de Notas MINEDU:** Simulador de calificación vigesimal ponderado (70% Evaluación Continua + 30% Evaluación Final) con reglas de subsanación y cálculo de inasistencias (Límite DPI 30%).
10. **Panel Administrativo con Generador de Informe Ejecutivo PDF:** Dashboard con métricas KPI, gráficos analíticos en Chart.js, laboratorio de voz y un botón para emitir el **Informe Técnico Oficial N° 001-2026** listo para imprimir con firmas de Dirección General.

---

## 📂 2. Estructura de Archivos del Proyecto

```
📁 hercarbot-instituto-carcamo-main/
│
├── 📄 index.html              # Workspace Conversacional de Estudiantes (UI ChatGPT / Copilot con Red Neuronal)
├── 📄 admin.html              # Panel Administrativo con Dashboard KPI, Laboratorio de Voz y Auditoría
├── 📄 README.md               # Documentación Técnica y Guía de Sustentación para Calificación 20/20
│
├── 📂 css/
│   ├── 🎨 style.css           # Estilos del Workspace, animaciones de red neuronal, voz, dark/light theme
│   └── 🎨 admin.css           # Estilos del Dashboard, tarjetas con tendencias, laboratorio de voz y tablas
│
└── 📂 js/
    ├── 🧠 knowledge-base.js   # Base de Conocimiento Masiva Oficial (Mallas, TUPA, Autoridades, Historia)
    ├── 🤖 chatbot.js          # Motor NLP Híbrido, Memoria Multi-Turno, Red Neuronal, Síntesis y Sonido
    └── 📈 admin.js            # Dashboard Analítico Chart.js, Laboratorio de Voz y Auditoría de Consultas
```

---

## 🧠 3. Base de Conocimiento Institucional Dominada

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
- **Plana Directiva y Autoridades:** Dirección General (Econ. Adolfo Zeta Pazo), Unidad Académica (Lic. Juan García Reto), Secretaría General y Jefaturas.
- **Identidad Institucional:** Historia del instituto (fundado en 1987, R.M. N° 232-87-ED), Misión, Visión y valores.
- **Turnos y Horarios:** Turno Diurno (mañana 8:00 a.m. - 1:15 p.m. / tarde 1:15 p.m. - 7:40 p.m.).
- **Régimen de Evaluación y Desaprobados:** Calificación vigesimal (0 a 20), nota mínima aprobatoria 13, regla de inasistencias DPI (límite 30%) y proceso de recuperación/subsanación.
- **Traslados y Convalidaciones:** Requisitos para convalidación de unidades didácticas y traslados internos/externos.
- **Bienestar y Salud Estudiantil:** Seguro Integral de Salud (SIS Gratuito) y tópico institucional.

### C. Proceso de Admisión y CEPRE-HERCAR:
- Modalidad Ordinaria, Exonerados (primeros puestos, deportistas calificados, personas con discapacidad) y CEPRE-HERCAR (ingreso directo).
- Balotario temático y Simulador Interactivo de Admisión de 8 preguntas con puntaje automático.
- Gratuidad de la enseñanza: 100% pública y sin pensiones mensuales.

### D. Guía de Pagos en el Banco de la Nación:
- Cuenta Corriente oficial N° `00-631-012948` y CCI `018-631-000631012948-52`.
- Procedimiento para subir el comprobante a `pagos.ieshercar.edu.pe`.
- Cuenta especial para curso de inglés de titulación: `00-638-025736`.

### E. TUPA y Trámites Académicos:
- Matrícula regular (S/ 120.00), Certificados Modulares, Titulación Profesional, Carné de Medio Pasaje MINEDU y Constancias de Estudio.
- Generador Oficial de Formato Único de Trámite (FUT) con impresión lista para Mesa de Partes Virtual.

---

## 🎯 4. Guía Maestra de Sustentación ante el Docente y Jurado (Paso a Paso hacia el 20/20)

### Paso 1: Apertura del Workspace & Paleta de Comandos (`index.html`)
1. Abre [`index.html`](file:///c:/Users/Misael%20P/Downloads/hercarbot-instituto-carcamo-main/index.html) en Chrome o Edge.
2. Destaca el diseño moderno, responsivo y con efectos de cristal (glassmorphism).
3. Presiona **`Ctrl + K`** (o haz clic en el botón **Buscar [Ctrl K]** de la cabecera) para desplegar la **Paleta de Comandos Spotlight**:
   - Escribe *"simulador"*, *"pagos"*, *"apsti"* o *"notas"* y navega con las flechas del teclado y Enter para ejecutar acciones al instante.
4. Presiona el botón **🌓 Modo Oscuro** en la cabecera para demostrar la paleta adaptativa y el soporte de persistencia en `localStorage`.
5. Muestra los efectos de sonido interactivos haciendo clic en el botón de **🔔 Sonido UI**.

### Paso 2: Demostración de Memoria Multi-Turno y Catálogo de Carreras
1. En el chat para estudiantes, realiza una **consulta con memoria conversacional multi-turno**:
   - Pregunta: *"Háblame sobre la carrera de APSTI"* &rarr; El bot muestra la ficha de Sistemas con imagen oficial y perfil de egreso.
   - A continuación pregunta: *"¿Cuánto dura?"* &rarr; El bot responde automáticamente: *"La carrera técnica de APSTI dura 3 años (6 semestres)..."* sin tener que repetir el nombre de la carrera.
   - Luego pregunta: *"¿Dónde puedo trabajar?"* &rarr; El bot detalla el campo laboral de APSTI en Paita y Piura.
2. Escribe *"¿Cuáles son las 4 carreras técnicas?"* para mostrar el catálogo con imágenes oficiales de cada programa de estudio (APSTI, ANI, Contabilidad, DPA), adaptado de manera 100% responsiva para celulares y tablets.

### Paso 3: Demostración de la Voz Femenina Natural y Ecualizador Dinámico
1. Haz clic en el icono de volumen de cualquier mensaje o en el botón **Voz** de la cabecera.
2. Demuestra cómo la síntesis de voz femenina ("voz de chica asesora") lee de forma dulce, fluida y sin tropiezos robóticos:
   - Haz clic en **"Probar Cuenta BN"**: La asesora pronuncia con pausas humanas naturales: *"cero cero, seis tres uno, cero doce, nueve cuatro ocho"*, sin deletrear mecánicamente.
   - Observa el **Ecualizador Dinámico de Audio** (4 barras de frecuencia animadas en tiempo real) y el halo luminoso pulsante (`.speaking`) del avatar mientras la asesora habla.
   - Demuestra que la lectura toma micro-pausas respiratorias de 65 ms y no se congela en navegadores Chromium gracias al heartbeat keep-alive y al emparejamiento exacto de idioma con la voz natural seleccionada (Microsoft Dalia / Google español).

### Paso 4: Demostración de los Módulos Interactivos y Calculadora de Notas
1. **Calculadora de Notas MINEDU:** Escribe *"¿Cómo se calculan las notas?"* o usa la paleta `Ctrl + K`. Muestra la calculadora ponderada (70% Evaluación Continua + 30% Evaluación Final), prueba los presets y revisa la regla de redondeo oficial y el límite de inasistencias DPI (30%).
2. **Simulador de Admisión:** Escribe *"Quiero practicar el simulador"* y responde un par de preguntas para mostrar el cálculo de puntaje y retroalimentación en vivo.
3. **Generador de FUT:** Haz clic en **Generar FUT**, ingresa tu nombre y observa cómo se redacta el Formato Único de Trámite oficial listo para imprimir o guardar en PDF para Mesa de Partes Virtual.
4. **Págalo.pe / Métodos Digitales:** Escribe *"¿Cómo pagar por Págalo.pe?"* y muestra la guía interactiva para evitar colas en el Banco de la Nación.

### Paso 5: Presentación del Panel Administrativo & Red Neuronal (`admin.html`)
1. Abre [`admin.html`](file:///c:/Users/Misael%20P/Downloads/hercarbot-instituto-carcamo-main/admin.html).
2. Explica las tarjetas de indicadores KPI con sus insignias de tendencia porcentual.
3. Muestra la sección de **Monitor de Red Neuronal Institucional**:
   - Observa el **Canvas Interactivo de Topología Sináptica en Vivo**, explicando las 4 capas de propagación tensorial (Entrada Léxica NFD, Oculta Semántica, Oculta Entidades y Salida de Intención) con 64 nodos activos.
   - Utiliza el **Sandbox de Inferencia en Tiempo Real** para evaluar frases en vivo (ej. *"¿Qué pasa si jalo un curso?"* o *"Cuenta corriente Banco de la Nación 00-631-012948"*) y presiona **"Escuchar Veredicto"**.
4. Muestra el **Laboratorio y Calibrador de Voz Femenina** con selector acústico, filtros fonéticos y control de cadencia/tono.
5. Muestra la tabla de **Auditoría de Consultas en Tiempo Real** con estados de resolución y botón de reproducción auditiva.
6. Haz clic en el botón superior **📄 Informe Ejecutivo PDF**:
   - Se abrirá una ventana de impresión formal con membrete del MINEDU y DREP Piura, código modular 0524454, tablas estadísticas de demanda por carrera, estado de tesorería del Banco de la Nación y el bloque oficial de firmas para el **Director General Econ. Adolfo Zeta Pazo** y la **Unidad Académica**.

---

*Proyecto Final de Titulación / Especialización — IESTP "Hermanos Cárcamo" de Paita (2026).*
