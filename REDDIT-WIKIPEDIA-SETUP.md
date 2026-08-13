# Reddit y Wikipedia — setup para YouGuide

No pude verificar en vivo los nombres de subreddits desde acá (Reddit bloquea el acceso automatizado que tengo disponible en esta sesión), así que antes de postear, confirmá vos mismo que cada subreddit existe y que las reglas del día coinciden con lo que te describo abajo.

---

## Reddit

### Lo primero, importante: Reddit NO es como Instagram

En Instagram podés postear directamente como marca. En Reddit, si abrís una cuenta y el primer post es "miren mi app", en la mayoría de los subs te lo van a borrar (o directo shadowban la cuenta) por ser autopromoción disfrazada. La regla no escrita más común es la "regla 90/9/1": ~90% de tu actividad tiene que ser genuina (comentar, responder, participar en otras conversaciones) antes de que un post tuyo promocionando algo propio se sostenga.

### 1. La cuenta

No la armes como cuenta corporativa tipo "u/YouGuideOficial" — eso se nota a la legua y genera rechazo. Dos opciones más honestas:

- **Tu cuenta personal** (o una nueva a tu nombre/alias), participando como el creador de la app. Esto es lo que mejor funciona en Reddit: la gente responde bien a "soy el dev, hice esto, pregúntenme lo que quieran" — mucho mejor que a una marca posteando.
- Si preferís separar lo personal, una cuenta tipo `u/youguide_dev` o `u/martin_youguide`, pero dejando claro en la bio y en los posts que sos el creador (transparencia total = lo que Reddit permite).

### 2. Dónde participar (verificá que existan antes de postear)

| Subreddit | Por qué | Tipo de participación |
|---|---|---|
| r/SideProject | Comunidad de builders mostrando lo que hicieron — autopromoción esperada y bienvenida | Post directo "hice esto" con contexto real |
| r/androidapps o r/AppHookup | Usuarios buscando apps nuevas para Android | Post con foco en la funcionalidad (audio automático por GPS), no en venta |
| r/blind | Comunidad real de personas ciegas o con baja visión | Esta es la más valiosa y la más delicada: solo postear si genuinamente buscás su feedback sobre la accesibilidad, no como canal de marketing. Si el feedback es que algo no funciona bien para ellos, escuchalo — ahí está el valor real, no en la promoción. |
| r/accessibility | Comunidad más amplia de accesibilidad digital | Similar al anterior, con foco más técnico (cómo funciona el diseño accessibility-first) |
| r/argentina | Comunidad general de Argentina | Solo si hay contexto real (ej. "hice una app en Tandil, cuento cómo fue") — evitar que se lea como spam turístico |
| r/Tandil (si existe) | Comunidad local | Ideal si existe: la app nació ahí, hay historia real que contar |

### 3. Post de ejemplo para r/SideProject (transparente, no disfrazado)

```
Título: Hice una app que narra la historia de un lugar automáticamente cuando llegás caminando (Android)

Hola! Soy el creador de YouGuide, una app de audioguías que usa geolocalización
para detectar cuándo llegás a un punto turístico y arrancar la narración sola,
sin que tengas que buscar nada ni mirar la pantalla.

La empecé pensando en accesibilidad (funciona 100% por audio, así que sirve
también para personas ciegas o con baja visión), pero terminó siendo útil para
cualquiera que quiera caminar una ciudad sin ir mirando el celular.

Hoy cubre 1247 sitios en 313 ciudades de 6 países. Está en fase Beta, gratis,
se instala por APK directo (todavía no está en Play Store).

Repo/descarga: https://youguide.com.ar/

Cualquier feedback es bienvenido, especialmente de gente que la pruebe en algún
punto que ya tengamos cargado.
```

### 4. Post de ejemplo para r/blind (mucho más cuidado, foco 100% en accesibilidad real)

```
Título: Hice una app de audioguías turísticas pensada accessibility-first — busco feedback real de la comunidad

Hola a todos. Desarrollé YouGuide, una app para Android que narra la historia
de lugares turísticos automáticamente por geolocalización — no hace falta
mirar la pantalla ni tocar el teléfono en ningún momento, todo funciona por audio.

La diseñé pensando específicamente en accesibilidad, pero soy vidente y sé que
eso significa que probablemente se me escapan cosas que solo se notan usándola
de verdad. Si alguien quiere probarla y contarme qué funciona y qué no
(navegación con lector de pantalla, claridad del audio, lo que sea), se los
voy a agradecer muchísimo — y lo que digan lo tomo en serio para mejorarla,
no como validación de marketing.

Es gratis, Android, fase Beta: https://youguide.com.ar/
```

---

## Wikipedia — freno honesto antes de avanzar

Acá tengo que ser directo: **hoy no conviene crear una página de Wikipedia para YouGuide, y probablemente ni siquiera se pueda.**

### Por qué

Wikipedia exige que un tema sea "notable" (WP:GNG en su política): necesita cobertura significativa en fuentes **independientes y confiables** — notas de medios reales, no el propio sitio, no redes sociales, no un blog propio. Hoy YouGuide no tiene ese tipo de cobertura externa todavía.

Además, si vos (como creador) o alguien vinculado a la app escribe el artículo, eso es "conflicto de interés" (WP:COI) según las reglas de Wikipedia — está permitido pero hay que declararlo explícitamente, y aun así un artículo sin fuentes independientes casi seguro termina borrado en días (a veces horas) por los editores voluntarios que patrullan páginas nuevas. En el peor caso, puede generar que tu cuenta quede marcada.

### El camino real (en orden)

1. **Conseguir cobertura de prensa real primero** — esto ya lo tenías anotado como acción pendiente en el análisis GEO: una nota en un medio de Tandil, alguna mención en un blog de tecnología/turismo, o aprovechar el evento Flama 2026 para una nota. Necesitás mínimo 2-3 fuentes independientes con cobertura sustancial (no una mención de una línea).
2. **Recién ahí** un artículo de Wikipedia se vuelve viable — y lo ideal es que lo cree alguien sin conflicto de interés, o vos mismo declarándolo (hay un proceso llamado "Articles for Creation" pensado justo para estos casos, con revisión antes de publicar).
3. **Alternativa más liviana: Wikidata.** Tiene un umbral de notabilidad más bajo que Wikipedia, pero igual pide al menos alguna referencia externa para no ser borrado. Tampoco lo armaría todavía sin al menos una fuente real.

### Qué hacer mientras tanto

Nada en Wikipedia por ahora. Enfocá la energía en conseguir la primera nota de prensa real (es el mismo punto que ya estaba en el informe GEO original) — eso desbloquea Wikipedia más adelante, y de paso es una señal de autoridad más fuerte que la propia página de Wikipedia.
