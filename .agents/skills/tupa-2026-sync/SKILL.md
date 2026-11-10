---
name: tupa-2026-sync
description: >-
  Runbook oficial para actualizar tasas TUPA 2026, cuentas del Banco de la Nación,
  requisitos de Examen de Suficiencia, Trámite de Título y cambios curriculares
  en HercarBot IA sin romper la coherencia entre conocimiento, chatbot, admin y HTML.
---

# Sincronización Oficial TUPA 2026 y Datos Institucionales

Usa esta skill siempre que debas agregar o modificar tasas, cuentas bancarias, comunicados, requisitos o programas de estudios del IESTP "Hermanos Cárcamo".

## Fuente de Referencia
- Consulta la tabla completa de los **43 procedimientos de Cuenta General (`00-638-002361`)** y los **23 ítems de Actividades Productivas (`00-638-025736`)** en [tupa-2026-rates.md](./references/tupa-2026-rates.md).

## Archivos que Deben Mantenerse Sincronizados
1. `js/knowledge-base.js`:
   - `COMUNICADOS_OFICIALES`, `INSTITUTO_DETALLE`, `PLANA_DOCENTE_OFICIAL`, `ESTADISTICAS_OFICIALES_HERCAR`
   - `REQUISITOS_SUFICIENCIA_PROFESIONAL` y `REQUISITOS_TITULO_PROFESIONAL`
   - `TUPA_2026_COMPLETO`, `TASAS_TUPA_COTIZADOR`, `GUIA_TRAMITES_TUPA`, `CURSO_INGLES_INSTITUTO`, `BASE_PREGUNTAS_RESPUESTAS`
2. `js/chatbot.js`:
   - `convertAllNumbersToSpokenSpanish` y `preparePhoneticText`
   - `getFutConfig`, `mapTramiteIdToFutKey`, `collectFutFormData`, `buildFutHtmlDocument`
   - `processQuery`, `renderCotizadorTupa`, `renderBuscadorTupaCompleto`, `renderNumeroCuentaBancaria`, `renderCursoIngles`, `renderExamenSuficiencia`, `renderTramiteTitulo`, `queryGemini`, `queryGeminiWithImage`
3. `js/admin.js` y `admin.html`:
   - Sandbox neuronal (`runAdminNeuralTest`), `AUDIT_LOG_MOCK`, pruebas de voz (`testAdminVoice`) e informe PDF (`generarReporteEjecutivo`).
4. `index.html`, `register.html`, `sw.js`:
   - JSON-LD SEO, `<noscript>`, Directorio de Temas, selects del FUT/Registro y versión de caché (`?v=...` y `CACHE_NAME`).

## Validación Post-Edición
Ejecuta la skill `hercarbot-audit` o corre su script de verificación para confirmar cero referencias obsoletas y cero errores en navegador headless.
