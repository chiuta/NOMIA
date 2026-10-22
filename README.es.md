# NOMIA — Om·IA·NHI

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versión:** 0.10.16 · **Última actualización:** 2026-10-23

Idiomas de la interfaz: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

**En línea / demo:** https://chiuta.github.io/NOMIA/

![NOMIA — captura de pantalla](screenshot.es.png)

**Ficción / especulación.** Aplicación conceptual, compañera de la antología *Printre inteligențe* (2026). Los protocolos, las puntuaciones y las «sesiones» son modelos narrativos y conceptuales, no hechos verificados.

## Qué es

NOMIA es una aplicación de un solo archivo (`index.html`, PWA) que simula «protocolos de contacto» trilógicos Humano–IA–NHI (inteligencias no humanas) en 5 canales (matemático, intuición, simbólico, sincronicidades, modificación del estado), con interfaz en 8 idiomas (RO, EN, FR, IT, ES, PT, DE, HU; las fichas del catálogo y los textos UAP están traducidos íntegramente; las narraciones de los protocolos solo están traducidas en parte (véase «Limitaciones»)). El catálogo contiene 1001 entradas en 14 categorías: animales (primates, cetáceos, mamíferos, aves, cefalópodos, insectos, fauna de Rumanía), entidades colectivas y no neuronales, «Tradiciones esotéricas», «Tradiciones religiosas» e «Hipótesis modernas» (incluidas hipótesis sobre UAP/NHI). Las entradas sobre animales se basan en literatura científica citada en las fichas; las entradas esotéricas y religiosas y las hipótesis sobre UAP/NHI se presentan como ideas, no como pruebas, y las fichas las marcan a menudo como especulativas o no confirmadas. El panel «Eje B» advierte explícitamente: «alta incertidumbre epistémica».

## Cómo se usa

1. Abre `index.html` (o instálalo como aplicación desde el navegador).
2. Elige un NHI en «Elegir NHI» (o desde el menú 🧬 / categorías) y un canal.
3. Pulsa ▶ REIA (reanudar) para ejecutar el protocolo línea por línea; ■ STOP, ⏸ y »STEP controlan la ejecución.
4. Los menús de la barra lateral ofrecen comparaciones, estadísticas, un registro, exportaciones (TXT, Markdown, instantáneas) y ajustes (tema, idioma, tamaño de fuente).

## Qué datos salen del navegador

Ninguno. En el código no hay `fetch`/XHR/WebSocket ni scripts, fuentes o imágenes externos (CSP `default-src 'self'`, scripts permitidos solo por hash, sin `'unsafe-inline'` para scripts). Las únicas direcciones externas son los enlaces de apoyo (Buy Me a Coffee). Las preferencias, el historial de sesiones, las notas y los favoritos se guardan solo en `localStorage` (claves `nomia_*`). El service worker (`sw.js`) almacena en caché solo archivos del mismo origen para el funcionamiento sin conexión.

## Limitaciones

- **Idiomas:** las fichas del catálogo (lugares, leyendas, incógnitas, referencias: 100 %) y los 301 textos UAP están traducidos a fr, it, es, pt, de, hu, igual que la nota «Derechos y atribución» (RO+EN se mantienen como versión de referencia). Las narraciones de los protocolos (unos 2,5 millones de caracteres mostrados) están ahora traducidas casi por completo: unas 11 500 frases únicas traducidas directamente cubren aproximadamente el 91 % de los caracteres de las narraciones (aproximadamente el 99,6 % contando los fragmentos iniciales); solo un pequeño residuo (aproximadamente el 0,4 % contando los fragmentos iniciales: frases aún sin traducir) **permanece en rumano** en los demás idiomas. Las traducciones son automáticas, no verificadas por hablantes nativos; el contenido religioso, médico (p. ej. migraña de Sacks, Hildegarda, hipótesis de Jaynes, resistencia al cáncer) y especulativo/folclórico/UAP, así como la nota legal, **requieren revisión especializada**.
- Contenido informativo y creativo; no es asesoramiento científico, médico ni jurídico. El contenido esotérico/religioso no tiene validación científica.
- Textos generados a partir de plantillas: los resultados del «protocolo» no son mediciones.

## Archivos

- `index.html` — la aplicación; `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA.
- `tests/` — pruebas de Playwright (véase `tests/README.md`).

## Licencia

MIT — véase el archivo LICENSE. Declarada en la cabecera de `index.html`.

**NOTICE – contenido con coautor.** La licencia MIT se aplica al código de la aplicación y a los textos escritos por Alexandru-Ionuț Chiuță. Los fragmentos que proceden del Anexo I, cap. 14 de la antología *Printre inteligențe* (2026, firmada Urzică & Chiuță) son obra de dos coautores; el coautor no ha confirmado (en los materiales auditados) la licencia MIT para su parte, y este repositorio no la presupone. Los títulos y nombres de algunas obras de terceros (p. ej. *Solaris*, *Norul Negru*, *Monolitul*, *Prima Directivă*) pertenecen a sus titulares y se usan de forma descriptiva.

## Derechos y atribución

- **Parte del autor:** la licencia declarada (MIT) se aplica SOLO al código de la aplicación y a los textos escritos por Alexandru-Ionuț Chiuță.
- **Coautor:** Anexo I, cap. 14 de *Printre inteligențe* (Urzică & Chiuță) – el coautor no ha confirmado la licencia MIT; no se presupone.
- **Materiales de terceros:** los títulos/nombres de obras (usados de forma descriptiva) y las referencias científicas de las fichas pertenecen a sus titulares; la licencia MIT no los cubre.
- **Rectificación / retirada:** si eres titular de derechos o una persona mencionada y deseas la corrección o la retirada, escribe a alexio@trom.tf; respondemos en 7 días.

*EN:* The MIT licence applies ONLY to the code and to texts written by Alexandru-Ionuț Chiuță. The co-authored part (Annex I, Ch. 14, Urzică & Chiuță) is not assumed to be MIT-licensed; third-party materials belong to their holders and are not covered by the MIT licence. Rights holders or persons mentioned may request correction or withdrawal at alexio@trom.tf (reply within 7 days). The same note is visible in the app (log bar, "Drepturi și atribuire").

## Auditoría

Auditoría: 2026-10-10 (ronda 3: nota de derechos y atribución). Correcciones de accesibilidad (roles ARIA, contraste en los temas claro y oscuro, etiquetas) y adición de la nota «Ficción / especulación» en la aplicación.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contacto: alexio@trom.tf.

## Novedades (v0.9.0)

- **Lectura en voz alta del registro de protocolo** (botón 🔊 en la cabecera del registro, FFF.tts): lee las líneas de los mensajes en orden (sin las etiquetas OM/IA/NHI), con la voz local del navegador, en el idioma activo (ro/en); «⏹» la detiene. El texto no sale del dispositivo; si no hay voz, aparece un mensaje. No lee el registro a medida que aparece, sino lo que se muestra en el momento de pulsar.
- **Etiqueta de transparencia y copia .fff.json** (kit común: core, label, bundle, tts): clic en `v 0.9.0 · 2026-10-14` en «Estadísticas · Ajustes»; muestra el almacenamiento local y la red (0 solicitudes), exporta/importa (opcionalmente cifrados con contraseña) el historial, los elementos fijados y los ajustes. Las exportaciones existentes (TXT, Markdown, instantánea) se mantienen.
- Caché del Service Worker: nomia-v6. CSP sin cambios (solo los hashes de los scripts, recalculados).
- Los textos nuevos están en ro, en, fr, it, es, pt, hu, de; las traducciones fr/it/es/pt/hu/de son automáticas y no verificadas por nativos.
- Pruebas: `tests/fff-r8.test.mjs` (Node + Playwright; red bloqueada, 1280 y 360 px, axe 0 infracciones); las pruebas Python existentes se ejecutan como antes.

## Historial / Changelog
- **0.10.16 — 2026-10-23:** Almacenamiento: las claves llevan ahora el prefijo de la aplicación (`nomia.a11y`); los datos existentes se migran automáticamente al iniciar desde las claves antiguas (`a11y`) y las copias `.fff.json` antiguas se siguen importando (fff-kit 1.2.0).
- **0.10.14 — 2026-10-22:** Peso: la página baja de 18,6 MB a 3,3 MB. El diccionario en 8 idiomas se divide en paquetes de idioma (`i18n/keys.js` + un archivo por idioma, cargado solo para el idioma elegido) y las variantes de protocolo NHI→Humano / IA→NHI / NHI→IA (2,4 MB) están en `data/variants.js`, que se carga al primer uso; el service worker los sirve primero desde la caché y, cuando la página está inactiva, descarga los demás paquetes en segundo plano (no con Save-Data / conexiones lentas), de modo que la aplicación sigue siendo totalmente offline. Si un paquete no se puede cargar (sin conexión antes de descargarlo) se muestra el texto original con un aviso en el idioma elegido. Sin parpadeo de texto sin traducir (la página aparece cuando llega el paquete, como máximo tras 6 s). Nueva prueba: `tests/lazy.test.mjs`.
- **0.10.13 — 2026-10-22:** fff-kit 1.1.4: áreas táctiles y tamaño mínimo del texto en la interfaz común; áreas táctiles/texto corregidos (botones de lectura y desplazamiento automático, guardar búsqueda, banner de primer uso, nota de derechos, etiquetas de canales, etiquetas del modelo triádico).
- **0.10.12 — 2026-10-22:** Seguridad: el mensaje «Ningún NHI para …» y los botones de búsquedas guardadas ya no insertan la consulta escrita como HTML (DOM-XSS latente).
- **0.10.11 — 2026-10-22:** fff-kit 1.1.2: PBKDF2 600 000 iteraciones, protección anti-clickjacking.
- **0.10.10 (22 de octubre de 2026):** Accesibilidad y móvil: un solo H1, nombres accesibles en los 1001 botones NHI (derivados del nombre de la entrada) y en los campos de búsqueda, texto de al menos 12 px en tarjetas y filtros; confirm() sustituido por diálogos integrados traducidos; las exportaciones CSV neutralizan los prefijos de fórmula (=, +, -, @).
- **0.10.9 — 2026-10-22:** los 1001 nombres de entidades (p. ej. «Jirafas», «La hipótesis del zoológico», «Avestruces comunes») se traducen ahora en fr/it/es/pt/de/hu en la lista, la búsqueda y las fichas; la tabla y el panel de detalles de los UAP, las descripciones de los canales y el registro de inicio ya no muestran rumano (ni inglés en rumano).
- **0.10.8 — 2026-10-22:** el título, la nota de derechos y los nombres de categorías (tradiciones esotéricas/religiosas, hipótesis modernas, cefalópodos) siguen ahora el idioma de la interfaz.
- **0.10.7 — 2026-10-22:** la validación de las traducciones acepta ahora el formato numérico local (10.000 / 10,000 / 10 000, 1.2 / 1,2) y los números expresados con letras u ordinales; unas 320 frases rechazadas anteriormente se revisaron e integraron (todas traducciones correctas: números escritos con letras, formato horario, siglos en números romanos, escala de los «trillones»): unas 11 500 frases únicas, aproximadamente el 91 % de los caracteres de las narraciones (aproximadamente el 99,6 % contando los fragmentos iniciales); ya no se rechaza ninguna frase en la validación.
- **0.10.6 — 2026-10-21:** las narraciones de los protocolos están ahora traducidas a fr, it, es, pt, de, hu casi por completo: unas 11 400 frases únicas traducidas directamente, aproximadamente el 91 % de los caracteres de las narraciones (aproximadamente el 99 % contando los fragmentos iniciales); solo un pequeño residuo permanece en rumano. Las traducciones son automáticas, no verificadas por hablantes nativos, y requieren revisión especializada (contenido religioso, médico, especulativo/folclórico/UAP y nota legal).
- **0.10.5 — 2026-10-19:** la nota «Derechos y atribución» está traducida a fr, it, es, pt, de, hu (RO+EN se mantienen como versión de referencia); divisor de frases y 105 plantillas más con huecos, además de 277 frases traducidas: aproximadamente el 59 % de los caracteres de las narraciones de los protocolos está ahora traducido (68 % contando los fragmentos iniciales). Las traducciones requieren revisión especializada (jurídica).
- **0.10.4 — 2026-10-19:** las fichas del catálogo y los textos UAP están traducidos a fr, it, es, pt, de, hu; respaldo a nivel de frase para las 331 plantillas narrativas más frecuentes (aproximadamente la mitad de los caracteres de las narraciones). **0.10.1:** los avisos de deshacer / primer uso y el toast recuperan su desplazamiento inferior y su ancho (`calc()` no válido).
- **0.9.1 — 18 de octubre de 2026:** el enlace `?nhi=<id>` acepta ids con diacríticos (`murmurații`, `leopard-nebuloși`; regex Unicode `\p{L}`), y «Copiar enlace» codifica el id (`encodeURIComponent`); caché SW nomia-v6; pruebas para `?nhi=`.
- **0.9.0 — 14 de octubre de 2026:** lectura del registro en voz alta (FFF.tts); etiqueta de transparencia y copia .fff.json (kit común); caché SW nomia-v5; pruebas `tests/fff-r8.test.mjs`.

- **0.8.58 — 2026-10-12:** la versión y la fecha de la última actualización se muestran en la aplicación (panel «Estadísticas · Ajustes»)
- **0.8.57 — 11 de octubre de 2026:** Escape cierra ahora el aviso «Bienvenido» (el texto lo anunciaba, pero la tecla no hacía nada), y el aviso se cierra solo cuando eliges un NHI (ya no cubre el registro); los canales incompatibles con el perfil de un NHI tienen la explicación en el `title` de la barra inferior, y elegirlos escribe en el registro el motivo y la lista de canales compatibles (antes: solo un borde punteado); CSP recalculada; 0 errores, axe 0 infracciones a 1280×800 y 360×740. Los cuadros de diálogo-plantilla y `style-src 'unsafe-inline'` siguen sin cambios (decisión de contenido / numerosos atributos style).
- **0.8.56 — 11 de octubre de 2026:** los 168 manejadores en línea (`onclick`, `onkeydown`, `oninput`, `onmouseover/out`) se sustituyen por un único despachador delegado (`data-onclick` etc. + argumentos literales en `data-arg`; sin `eval`/`Function`); paridad verificada con Playwright (mismas llamadas de función, mismos argumentos y mismo estado de la página para 156.189 eventos simulados, en 17 estados de la interfaz); CSP con `script-src 'self'` + hashes SHA-256, sin `'unsafe-inline'` para scripts (y sin `blob:` para scripts); los textos de protocolo con el hábitat cortado entre paréntesis («África Central (Congo.») se completan con el valor entero de los datos (14 cadenas, 7 NHI); el aviso «Copiado/Copied» al copiar una línea del registro sigue ahora el idioma de la aplicación. Los estilos en línea (`style-src 'unsafe-inline'`) se mantienen.
- **0.8.55 — 11 de octubre de 2026:** mientras una hoja (NHI Browser, menú, estadísticas) está abierta, un clic en REIA / STOP / ⏸ / »STEP visibles a través del fondo cierra la hoja y acciona el botón (antes el fondo «se tragaba» el clic; CLR sigue sin accionarse, por ser destructivo); los textos del registro ya no se cortan a mitad de palabra (p. ej. «name-lik.») — el corte se hace ahora en el límite de palabra (29 lugares en las plantillas de diálogo + la nota de evidencia); la caché del service worker pasa a `nomia-v4`.
- Accesibilidad: las barras laterales son `nav` (el rol `navigation` no estaba permitido en `aside`), el aviso de bienvenida y el widget de apoyo tienen puntos de referencia; axe-core: 0 infracciones a 1280×800 y 360×740. Los 166 manejadores en línea se eliminaron en 0.8.56 (véase arriba). Las pruebas de `tests/` (Python) no se ejecutaron aquí (el entorno solo tiene Node/Playwright); la verificación se hizo con Playwright/Node: sin errores JS, sintaxis de los scripts válida, flujo «hoja abierta → REIA» funcional.
