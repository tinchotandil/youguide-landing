# GEO Analysis — youguide.com.ar
**Fecha:** 2026-08-13 · **Metodología:** Google AI Optimization Guide (GEO = SEO fundamentals aplicados a superficies de búsqueda con IA)

## GEO Readiness Score: 62/100

| Categoría | Peso | Score | Ponderado |
|---|---|---|---|
| Citabilidad (passages) | 25% | 60/100 | 15.0 |
| Legibilidad estructural | 20% | 78/100 | 15.6 |
| Contenido multi-modal | 15% | 45/100 | 6.75 |
| Autoridad y señales de marca | 20% | 30/100 | 6.0 |
| Accesibilidad técnica | 20% | 92/100 | 18.4 |
| **Total** | | | **≈62/100** |

**Lectura rápida:** la base técnica es excelente (SSR completo, crawlers de IA habilitados, `llms.txt`, JSON-LD), pero el sitio casi no tiene presencia de marca fuera de Instagram, y las 89 páginas de ciudad (la mayoría de las URLs del sitio) son listas de nombres sin prosa citable. Son los dos frenos reales para aparecer en respuestas de IA.

---

## 1. Desglose por plataforma (estimado, no medido en vivo)

| Plataforma | Score est. | Por qué |
|---|---|---|
| Google AI Overviews | ~35/100 | Fuertemente correlacionado con ranking clásico. Datos reales de Search Console (últimos 3 meses) mostraban solo 3 apariciones para la web, en posiciones 39 y 90 — casi no hay ranking del que la IA pueda "tomar" el sitio todavía. |
| Google AI Mode (Gemini 3.5 Flash) | ~45/100 | Pool más amplio (~9 dominios citados/query), valora frescura y autoridad de entidad. El sitemap tiene `lastmod` en vivo (buena señal de frescura), pero la autoridad de marca es baja. |
| ChatGPT | ~20/100 | 47.9% de sus citas vienen de Wikipedia, 11.3% de Reddit. YouGuide no tiene presencia en ninguno de los dos. |
| Perplexity | ~20/100 | 46.7% de citas vienen de Reddit. Mismo problema: cero presencia. |
| Bing Copilot | ~35/100 | Bingbot está permitido en robots.txt (bien), pero la autoridad general es baja. |

*Nota: son estimaciones cualitativas basadas en accesibilidad técnica + señales de marca + datos históricos reales de Search Console, no mediciones en vivo de citación (no tengo acceso a herramientas tipo DataForSEO en esta sesión).*

---

## 2. Acceso de crawlers de IA (robots.txt) — ✅ Excelente

```
GPTBot            → Allow: /
OAI-SearchBot     → Allow: /
ChatGPT-User      → Allow: /
ClaudeBot         → Allow: /
Claude-User       → Allow: /
PerplexityBot     → Allow: /
Google-Extended   → Allow: /
Bingbot           → Allow: /
```

Los 8 crawlers relevantes para búsqueda con IA están explícitamente permitidos. No hay nada que corregir acá — es de los pocos sitios que ya lo tiene bien resuelto.

## 3. llms.txt — ✅ Presente y bien estructurado

`https://youguide.com.ar/llms.txt` existe, tiene formato Q&A ("Cómo responder preguntas sobre YouGuide"), datos clave concretos (1247 sitios, 313 ciudades, 113 tours, 6 países) y enlaces a páginas clave.

Según la evidencia primaria de Google (Mueller/Illyes) que usa este análisis, `llms.txt` **no es hoy un factor de citación** para los motores de IA principales — no le sumes score por tenerlo, pero tampoco es trabajo perdido: no molesta y ayuda a algunos resumidores/agentes que sí lo leen. Está reportado sin peso en el score.

## 4. Análisis de marca y autoridad — 🔴 El hallazgo más importante

| Señal | Estado |
|---|---|
| Instagram | ✅ @youguide.ar (enlazado en `sameAs`) |
| YouTube | ❌ Ausente — es la señal con **mayor correlación** con citas de IA (0.737, estudio Ahrefs) |
| Reddit | ❌ Ausente — 46.7% de citas de Perplexity y 11.3% de ChatGPT vienen de ahí |
| Wikipedia | ❌ Ausente — 47.9% de citas de ChatGPT vienen de ahí |
| TikTok | ❌ Ausente |
| Google Play Store | ❌ App no publicada (solo APK directo) — esto también es una barrera de confianza además de GEO |
| Domain Rating / backlinks | Desconocido, pero es la señal que **menos correlaciona** (0.266) según el mismo estudio — no es la prioridad |

**Por qué importa:** el estudio de Ahrefs que sustenta esta metodología muestra que las menciones de marca correlacionan 3x más que los backlinks con visibilidad en IA. Hoy YouGuide tiene un solo canal (Instagram) y cero presencia en los tres que más pesan (YouTube, Reddit, Wikipedia). Esto ya había aparecido en el análisis de Search Console de meses atrás: Instagram le está haciendo más trabajo de SEO/GEO a la marca que la propia web.

## 5. Citabilidad de passages

**Home (`/`):** buena base — datos concretos y verificables (1247 sitios, 313 ciudades, 113 tours, 6 países), definición clara en el primer bloque de texto, FAQ con 6 preguntas en formato pregunta-respuesta autocontenidas (~60-100 palabras cada una, cerca del rango óptimo de 134-167).

**Páginas de ciudad (`/destinos/*`, 89 URLs — la mayoría del sitio):** 🔴 débil. Ejemplo real (`/destinos/tandil`, texto visible completo):

> "Descubrí 60 puntos turísticos en Tandil, como Anfiteatro Martín Fierro y Café Golden. Descargá la app y escuchá la historia mientras caminás." + lista de 60 nombres de lugares con emoji de pin.

Es prácticamente solo una lista de nombres — no hay ningún párrafo autocontenido que una IA pueda citar como respuesta a "qué hacer en Tandil". Con 89 páginas apuntando a long-tail queries de este tipo, es la mayor oportunidad perdida del sitio.

## 6. Legibilidad estructural — sólida

- H1 único, jerarquía H2→H3 correcta.
- FAQ con headings en formato pregunta ("¿Por qué todavía no la descargo del Play Store?", etc.) — coincide exactamente con el patrón de queries reales, ideal para GEO.
- Párrafos cortos en el home.
- Sin tablas comparativas en ningún lado (oportunidad: tabla de cobertura por país/ciudad/sitios/tours).

## 7. Contenido multi-modal

- 15 imágenes en el home, **todas con `alt` descriptivo** (ej. "Sierras de Tandil", "Arquitectura Art Déco de Salamone en Azul") — bien.
- Cero video, cero elementos interactivos (calculadora, mapa interactivo, etc.).
- Las páginas de ciudad no parecen tener imagen propia por sitio (solo texto/lista).

## 8. Renderizado server-side — ✅ Excelente

El HTML servido por `curl` (sin JavaScript) ya contiene todo el contenido visible (~8.400 caracteres de texto en el home, headings, FAQ, JSON-LD). Cero dependencia de JS para que un crawler de IA vea el contenido real. Nada que corregir acá.

## 9. Schema / datos estructurados

Un solo bloque JSON-LD en el home con `@graph`: `SoftwareApplication` + `Organization` + `FAQPage`. Válido y bien formado.

**Falta:** las páginas de ciudad usan `TouristDestination` (confirmado en `/destinos/tandil`) — correcto como tipo, pero sin `description` rica ni `touristType`/`amenityFeature` que aprovechen los 60 puntos listados.

---

## Top 5 cambios de mayor impacto

1. **Reescribir las páginas de ciudad con un párrafo real citable, no solo una lista.** Un bloque de ~150 palabras por ciudad ("Tandil es conocida por sus sierras y su arquitectura de piedra... con YouGuide podés recorrer los 60 puntos incluyendo Anfiteatro Martín Fierro...") multiplicaría la citabilidad de 89 páginas de un saque. Es el cambio de mayor impacto posible en el sitio hoy.
2. **Abrir presencia en YouTube**, aunque sea con contenido simple (demo de 30 seg de la app funcionando en una ciudad). Es la señal individual con mayor correlación a citas de IA (0.737) y hoy es cero.
3. **Generar una mención real en Reddit o un foro de viajes** (ej. un post genuino en r/argentina o r/travel mostrando la app) — pesa fuerte en ChatGPT y Perplexity específicamente.
4. **Agregar una tabla comparativa** de cobertura (país / ciudades / sitios / tours) en el home — formato que las IA citan fácilmente para preguntas tipo "qué países cubre YouGuide".
5. **Publicar en Google Play Store** cuando esté lista — no es estrictamente GEO, pero la ausencia de Play Store es una barrera de confianza que también golpea la citabilidad indirectamente (menos reseñas públicas = menos señales de terceros que las IA puedan encontrar).

## Quick wins (bajo esfuerzo)
- Agregar `dateModified` visible en el home (ej. "Cobertura actualizada: agosto 2026") — refuerza frescura, que hoy solo vive en el sitemap.
- Sumar 1-2 líneas de descripción real por ciudad en `/destinos/*` (ver punto 1) antes de la lista de sitios.
- Agregar tabla de cobertura por país (punto 4).

## Ya está bien resuelto (no tocar)
- robots.txt con los 8 crawlers de IA relevantes permitidos.
- Renderizado 100% server-side.
- FAQ con headings en formato pregunta.
- `llms.txt` estructurado (sin sobreestimar su peso real en citación).
