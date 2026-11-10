# Reglas Institucionales y de Ingeniería — HercarBot IA (IESTP "Hermanos Cárcamo")

Este repositorio contiene **HercarBot IA**, el asistente virtual institucional y panel administrativo del **IESTP "Hermanos Cárcamo" de Paita (Piura, Perú)** (`https://ieshercar.edu.pe/`).

## 1. Fuente Única de Verdad Institucional (Obligatorio)
Toda edición en datos, FAQs, locuciones de voz, FUT o UI debe respetar sin excepciones la normativa oficial vigente (**TUPA 2026 — R.D. N° 020-2026-ME-GRP-DREP-IESTP"HC"-DG**):

- **Canal único de pago:** Los pagos se realizan **exclusivamente de manera presencial en ventanilla del Banco de la Nación** indicando el DNI y nombre completo del estudiante.
- **Canales prohibidos:** Está terminantemente prohibido indicar o sugerir pagos por **Págalo.pe**, **Agentes MultiRed**, **Yape**, **Plin**, aplicativos móviles o **transferencias interbancarias (CCI)**. Nunca reintroducir la cuenta obsoleta `00-631-012948` ni el CCI `018-631-000631012948-52`.
- **Dos cuentas oficiales en el Banco de la Nación:**
  1. **Cuenta Corriente TUPA General `00-638-002361`** (43 procedimientos): Matrícula Ordinaria (**S/ 250.00**), Examen de Admisión (**S/ 200.00**), Examen de Suficiencia Profesional (**S/ 200.00**, 2da opción **S/ 100.00**), Formato/Caligrafiado de Título (**S/ 60.00**), Derecho de Título (**S/ 100.00**), Ficha de Actividades Sistema Tradicional ≤ 2008 (**S/ 12.00**), Certificado Modular (**S/ 25.00**), Certificado de Estudios (**S/ 240.00** los 6 periodos / **S/ 40.00** por periodo), Constancias (**S/ 15.00**), Revalidación idioma extranjero B1 (**S/ 150.00**), etc. Post-pago: registrar voucher en `https://pagos.ieshercar.edu.pe/` y presentar original + copias en Tesorería.
  2. **Cuenta Actividades Productivas / Inglés `00-638-025736`** (23 ítems): Curso de Inglés Básico para Titulación (**S/ 400.00**, Duplicado **S/ 50.00**), Academia Pre Tecno Hercar (**S/ 400.00**), Ciclo de Actualización (**S/ 400.00**), Toga y Birrete (**S/ 50.00**), etc. Post-pago explícito: **sacar 2 copias a tu voucher y entregarlos en Tesorería, en la oficina del instituto**.
- **Los 4 Programas de Estudios y Proyección 2027:**
  1. **APSTI** (*Arquitectura de Plataformas y Servicios de Tecnologías de la Información*) — **en el año 2027 pasará a denominarse `Computación e Informática`**.
  2. **ANI** (*Administración de Negocios Internacionales*).
  3. **Contabilidad**.
  4. **DPA** (*Desarrollo Pesquero y Acuícola*).
- **Sede y Contacto Oficial:** `Av. Miguel Grau Mz. A Lt. 001 – Urb. El Parque, Paita, Piura` · Teléfono `(073) 251013` · WhatsApp `969 100 257` · Horario Lunes a Viernes `8:00 a.m. – 3:00 p.m.` · Mesa de Partes: `https://sistema.ieshercar.edu.pe/registro-tramite/`.

## 2. Reglas de UI, Modo Oscuro, Accesibilidad y Voz
- **Contraste en Modo Oscuro:** Nunca aplicar estilos inline con fondos claros (`#fef2f2`, `#fffbeb`, `#f0fdf4`) sin clases adaptativas (`.hercar-alert-*`) o reglas explícitas bajo `body.dark-theme` en `css/style.css`. Verificar siempre contraste de `strong`, `code` y `a` en ambos temas.
- **Acciones interactivas y accesibilidad:** Todo atributo `data-chat-action` en HTML/JS debe tener su correspondiente `case` en `HercarBotApp.triggerAction`. Todos los `input`, `select` y `textarea` visibles deben tener `<label for>` o `aria-label`.
- **Síntesis de voz (`SpeechSynthesis`):** Mantener la sincronía fonética entre `js/chatbot.js` (`preparePhoneticText` + `convertAllNumbersToSpokenSpanish`) y `js/admin.js` (`normalizePhoneticAdmin` + `convertAllNumbersToSpokenSpanishAdmin`), preservando `_activeUtterances` para evitar cortes por recolección de basura en Chromium.

## 3. Seguridad y Despliegue
- **Cero secretos en el repositorio:** Jamás escribir Personal Access Tokens (PAT) de GitHub o claves API reales dentro de archivos del workspace.
- **Sincronización de caché PWA:** Al modificar CSS, JS o la base de conocimiento, actualizar los query strings `?v=...` en `index.html` y `admin.html`, además de incrementar `CACHE_NAME` en `sw.js`.
