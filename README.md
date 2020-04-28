# Smart Device

### Сборка

Установка зависимостей - команда: npm i
Запуск сборки команда: npm start
Запуск тестов команда: npm test

Собирается с помощью ___gulp 4___.
Запускается командой __npm start__

Включает в себя:
 - автопрефиксер;
 - browser-sync;
 - минмизация css;
 - es-6 модули js;
 - babel;
 - html-include;

Все пути к файлам, необходимые для сборки, прописаны в объекте ___config___ в __gulpfile.js__

### CSS
 - Стили находятся в в директории `/source/sass`
 - Используется препроцессор sass
 - Стили для БЭМ-блоков находятся в отдельных файлах и импортируются в `source/css/style.scss` с помощью __@import__

### JS

- js-файлы находятся в директории `/source/js`
- используется __es-6__ и нативные __es-6 модули__.
- на этапе сбоки модули собираются с помощью rollup в __main.js__ в виде __IIFE__
- для IE существует отдельный файл __ie-main.js__, в который импортируются полифиллы для IE и подключается babel
- в зависимости от браузера на страницу с помощью JS подключается либо __main.js__, либо __ie-main.js__

### HTML

- находятся в корне директории `/source`

### IMAGES

- находятся в директории `/source/img` 
- используются __webp__-изображения, подключаются на страницу с помощью __picture__
- ___svg___ подключается на страницу с помощью __use__ 
