---
name: hercarbot-customization-ui
description: >-
  Guía de diseño visual, Estudio de Personalización de Usuario (paletas,
  avatares, perfil activo, tipografía accesible), adaptabilidad en Modo Oscuro y
  síntesis de voz Web Speech API de HercarBot IA.
---

# Personalización UI, Modo Oscuro y Voz — HercarBot IA

## Arquitectura de Personalización (`localStorage`)
- Clave principal de preferencias de usuario: `hercarbot_user_prefs`
  - `palette`: `'hercar'` | `'oceano'` | `'tecnologico'` | `'ejecutivo'` (aplicada vía `document.body.dataset.hercarPalette`)
  - `fontScale`: `'normal'` | `'large'` | `'xlarge'` (aplicada vía `--hercar-font-scale`)
  - `density`: `'comfortable'` | `'compact'`
  - `avatar`: `'avatar-ia'` (`assets/img/hercarbot-avatar.jpg`) | `'escudo'` (`assets/img/logo-hercar.png`)
  - `userProfile`: `'general'` | `'postulante'` | `'estudiante'` | `'egresado'`
- Checklists interactivos persistentes:
  - Examen de Suficiencia Profesional (7 requisitos): `hercarbot_checklist_suficiencia`
  - Trámite de Título Profesional (10 requisitos): `hercarbot_checklist_titulo`

## Clases de Alerta Compatibles con Modo Claro y Modo Oscuro
Usa siempre `.hercar-alert-danger`, `.hercar-alert-warning`, `.hercar-alert-success`, `.hercar-alert-info` definidos en `css/style.css` en lugar de colores inline fijos sin reglas oscuras, garantizando legibilidad WCAG en `body.dark-theme`.

## Deep Links / Atajos PWA
`HercarBotApp.handleInitialUrlParams()` soporta:
- `?action=admision|fut|pagos|ingles|suficiencia|titulo|tupa|carreras|personalizar`
- `?carrera=apsti|ani|conta|dpa`
- `?q=<texto>`
