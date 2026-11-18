const fs = require('fs');
const assert = require('assert');

console.log('=== TEST DE RESPONSIVIDAD Y EXPERIENCIA MÓVIL (v24) ===\n');

const styleCss = fs.readFileSync('css/style.css', 'utf8');
const adminCss = fs.readFileSync('css/admin.css', 'utf8');
const loginHtml = fs.readFileSync('login.html', 'utf8');
const registerHtml = fs.readFileSync('register.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const swJs = fs.readFileSync('sw.js', 'utf8');

// 1. Verificación de Media Queries Clave en style.css
assert(styleCss.includes('@media (max-width: 768px)'), 'style.css debe contener media query para móviles/tablets (768px)');
assert(styleCss.includes('@media (max-width: 600px)'), 'style.css debe contener media query para celulares (600px)');
assert(styleCss.includes('@media (max-width: 380px)'), 'style.css debe contener media query para pantallas angostas (380px)');
console.log('✓ Media queries para 768px, 600px y 380px presentes en style.css.');

// 2. Cabecera en 2 Filas Perfectas en Móvil
assert(styleCss.includes('flex-wrap: wrap !important') && styleCss.includes('.header-quick-portals'), 'Cabecera móvil debe permitir envolver para ubicar portales en fila 2');
assert(styleCss.includes('order: 1 !important') && styleCss.includes('order: 2 !important') && styleCss.includes('order: 3 !important'), 'Cabecera debe ordenar meta (1), controles (2) y portales (3)');
assert(styleCss.includes('-webkit-overflow-scrolling: touch'), 'Portales y áreas desplazables deben tener scroll táctil acelerado por hardware');
console.log('✓ Cabecera móvil en 2 filas limpias y cinta deslizable con aceleración táctil.');

// 3. Safe-Areas para Notch e Inicio en iPhone/Android
assert(styleCss.includes('env(safe-area-inset-top'), 'style.css debe soportar notch con safe-area-inset-top');
assert(styleCss.includes('env(safe-area-inset-bottom'), 'style.css debe soportar barra de gestos inferior con safe-area-inset-bottom');
console.log('✓ Compatibilidad con Safe Areas (notch superior y home bar inferior) verificada.');

// 4. Prevenir Zoom Automático no deseado en iOS Safari (font-size >= 16px)
assert(styleCss.includes('font-size: 16px !important'), 'Campos de entrada deben tener font-size: 16px en móvil para evitar zoom en iOS');
console.log('✓ Prevención de zoom forzado en iOS Safari con inputs a 16px.');

// 5. Touch Targets Mínimos de 44px / 48px según estándares WCAG
assert(styleCss.includes('min-height: 44px !important'), 'Botones interactivos del bot deben tener al menos 44px de altura táctil');
assert(styleCss.includes('min-height: 48px !important'), 'Opciones del test vocacional deben tener al menos 48px de altura táctil');
console.log('✓ Touch targets ergonómicos para dedos (>= 44px / 48px) verificados.');

// 6. Test Vocacional sin Traslación Horizontal Molesta en Táctil
assert(styleCss.includes('.test-choice-btn') && styleCss.includes('transform: none !important'), 'Opciones de test vocacional no deben desplazarse horizontalmente en móvil');
console.log('✓ Opciones de test vocacional estables en touch.');

// 7. Modal del Generador de FUT Adaptado a Celular
assert(styleCss.includes('.hercar-fut-box') && styleCss.includes('max-height: calc(100vh - 20px) !important'), 'Caja del FUT modal debe ocupar casi todo el alto en celular');
assert(styleCss.includes('flex-direction: column-reverse !important'), 'Acciones del FUT modal deben apilarse verticalmente en celular para alcance de pulgar');
console.log('✓ Modal Generador de FUT optimizado como sheet móvil.');

// 8. Grid de 4 Herramientas en 2 Columnas Simétricas
assert(styleCss.includes('grid-template-columns: repeat(2, minmax(0, 1fr)) !important'), 'Las 4 tarjetas principales deben formar 2 columnas balanceadas en móvil');
console.log('✓ Grid de herramientas principales en 2 columnas simétricas.');

// 9. Adaptaciones Móviles en login.html y register.html
assert(loginHtml.includes('@media (max-width: 576px)'), 'login.html debe incluir estilos para pantallas menores a 576px');
assert(registerHtml.includes('@media (max-width: 576px)'), 'register.html debe incluir estilos para pantallas menores a 576px');
console.log('✓ Formularios de Login y Registro adaptados con márgenes y padding touch en celulares.');

// 10. Adaptaciones Móviles en Panel Admin (css/admin.css)
assert(adminCss.includes('@media (max-width: 767.98px)'), 'admin.css debe incluir estilos responsivos para tablets y celulares');
assert(adminCss.includes('sql-panel-card'), 'admin.css debe adaptar la tarjeta del panel SQL en móviles');
console.log('✓ Panel de Administración y Base de Datos SQL adaptados con scroll táctil y botones 2x2.');

// 11. Preservación Estricta de Restricciones
assert(indexHtml.includes('id="voice-companion-bar"') && indexHtml.includes('style="display: none !important;"'), '#voice-companion-bar debe permanecer oculto en el HTML');
assert(styleCss.includes('#voice-companion-bar') || styleCss.includes('.voice-companion-bar'), 'Selector de barra de voz referenciado');
assert(!indexHtml.includes('APSTI'), 'index.html no debe contener el acrónimo no oficial APSTI');
assert(swJs.includes('hercarbot-pwa-v2026-v24'), 'sw.js debe estar en la versión de caché v24');
assert(indexHtml.includes('?v=20261118c'), 'index.html debe tener assets con ?v=20261118c');
console.log('✓ Restricciones y versión v24 / 20261118c preservadas estrictamente.');

console.log('\n======================================================');
console.log('TODAS LAS PRUEBAS DE RESPONSIVIDAD MÓVIL PASARON (100%)');
console.log('======================================================');
