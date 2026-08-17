import fs from 'fs';
import path from 'path';

// Categoriza un sitio por palabras clave presentes en su nombre real
// (no se inventa nada: solo se agrupa lo que ya está en destinos.json).
// Todas las palabras clave usan \b para evitar falsos positivos por
// coincidencia de subcadena (ej. "Universitario" contiene "rio").
const CATEGORIAS = [
  { key: 'naturaleza-serrana', label: 'paisajes serranos', re: /\bcerro|\bsierra|\bmonte\b|\bcascada|\bsalto\b|\bmirador/i },
  { key: 'naturaleza-agua', label: 'espacios junto al agua', re: /\blago|\blaguna|\br[ií]o\b|\barroyo|\bplaya|\bbalneario|\bcostanera|\bcosta\b/i },
  { key: 'naturaleza-protegida', label: 'áreas naturales protegidas', re: /parque nacional|reserva natural|\bbosque|\bhumedal/i },
  { key: 'religioso', label: 'patrimonio religioso', re: /\biglesia|\bcatedral|\bbas[ií]lica|\bcapilla|\bsantuario|\bmonasterio|\bseminario|\bparroquia/i },
  { key: 'museo', label: 'museos', re: /\bmuseo/i },
  { key: 'teatro', label: 'teatros históricos', re: /\bteatro/i },
  { key: 'ferroviario', label: 'patrimonio ferroviario', re: /\bestaci[oó]n|\bferrocarril|\btren\b/i },
  { key: 'urbano', label: 'plazas y paseos urbanos', re: /\bplaza|\bpaseo|\bpeatonal|\brambla/i },
  { key: 'monumento', label: 'monumentos y esculturas', re: /\bmonumento|\bescultura|\bmural\b|\bestatua|\bobelisco/i },
  { key: 'arquitectura', label: 'arquitectura histórica', re: /\bcasa\b|\bpalacio|\bedificio|\bmunicipalidad|\btorre\b|\bmercado/i },
];

function pluralizar(n, singular, plural) {
  return n === 1 ? singular : plural;
}

function categorizeSitios(sitios) {
  const grupos = {};
  sitios.forEach((s) => {
    const cat = CATEGORIAS.find((c) => c.re.test(s));
    const key = cat ? cat.key : 'otro';
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(s);
  });
  return grupos;
}

// Hash determinístico simple para elegir variantes de redacción sin
// depender de Math.random (mismo resultado siempre para la misma ciudad).
function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function buildLongDescription(cityData) {
  const { id, nombre, provincia, cantidad_sitios, sitios } = cityData;
  const grupos = categorizeSitios(sitios);
  const topCats = CATEGORIAS
    .filter((c) => grupos[c.key] && grupos[c.key].length > 0)
    .sort((a, b) => grupos[b.key].length - grupos[a.key].length)
    .slice(0, 3);

  const h = hashId(id);
  const sitioN = pluralizar(cantidad_sitios, 'sitio turístico', 'sitios turísticos');
  const puntoN = pluralizar(cantidad_sitios, 'punto de interés', 'puntos de interés');
  const sitioPlano = pluralizar(cantidad_sitios, 'sitio', 'sitios');

  const aperturas = [
    `${nombre} es uno de los destinos que cubre YouGuide en la provincia de ${provincia}, con ${cantidad_sitios} ${sitioN} disponibles para recorrer con audioguía automática por geolocalización.`,
    `En ${nombre} (${provincia}), YouGuide narra automáticamente ${cantidad_sitios} ${puntoN} apenas te acercás, sin necesidad de mirar el celular ni leer carteles.`,
    `${nombre}, en la provincia de ${provincia}, suma ${cantidad_sitios} ${sitioPlano} a la cobertura de YouGuide: cada uno dispara su propia historia por GPS cuando el visitante llega.`,
  ];

  let highlightSentence = '';
  if (topCats.length > 0) {
    const partes = topCats.map((c) => {
      const ejemplos = grupos[c.key].slice(0, 2).join(' y ');
      return `${c.label} (como ${ejemplos})`;
    });
    const ultima = partes.pop();
    highlightSentence = partes.length
      ? ` Entre los sitios incluidos hay ${partes.join(', ')} y ${ultima}.`
      : ` Entre los sitios incluidos hay ${ultima}.`;
  }

  const mecanicas = [
    ` La app es gratuita, está en fase Beta abierta y funciona 100% manos libres: no hace falta tocar el teléfono para que arranque cada relato.`,
    ` Todo el recorrido es gratuito y accessibility-first: la experiencia funciona por audio, sin necesidad de leer pantalla ni buscar información en el momento.`,
    ` Es una app gratuita, disponible en español, inglés, portugués, francés y alemán, pensada para que la pantalla se quede apagada en el bolsillo.`,
  ];

  const contexto = [
    ` ${nombre} forma parte de una red que ya cubre 1247 sitios turísticos en 313 ciudades de 6 países (Argentina, Brasil, Chile, Italia, Perú y Uruguay).`,
    ` Es una de las 313 ciudades donde ya funciona YouGuide, dentro de una cobertura total de 1247 sitios en 6 países de Sudamérica y Europa.`,
    ` La cobertura de ${nombre} se suma a los 1247 sitios que YouGuide ya narra en 313 ciudades de Argentina, Brasil, Chile, Italia, Perú y Uruguay.`,
  ];

  const cierres = [
    ` Descargá YouGuide y recorré ${nombre} a tu ritmo: la app se encarga de contarte la historia de cada lugar automáticamente cuando llegás.`,
    ` Con la app instalada, alcanza con caminar: YouGuide detecta cada uno de estos ${cantidad_sitios} ${sitioPlano} de ${nombre} y arranca la narración sin que tengas que buscar nada.`,
    ` No hace falta conexión constante ni buscar información en el momento: YouGuide ya tiene cargada la historia de estos ${cantidad_sitios} ${sitioPlano} de ${nombre}, lista para reproducirse por proximidad.`,
  ];

  return (
    aperturas[h % aperturas.length] +
    highlightSentence +
    mecanicas[(h >>> 2) % mecanicas.length] +
    contexto[(h >>> 4) % contexto.length] +
    cierres[(h >>> 6) % cierres.length]
  );
}

export default function handler(req, res) {
  const { ciudad } = req.query;

  // Load destinos.json
  const filePath = path.join(process.cwd(), 'data', 'destinos.json');
  let destinos = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    destinos = JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading destinos.json:', error);
    return res.status(500).send('Error loading destinations.');
  }

  // Find city
  const cityData = destinos.find(d => d.id === ciudad);

  if (!cityData) {
    return res.status(404).send('<h1>Ciudad no encontrada</h1><a href="/">Volver al inicio</a>');
  }

  const { nombre, provincia, cantidad_sitios, sitios } = cityData;
  const sitio1 = sitios.length > 0 ? sitios[0] : 'lugares increíbles';
  const sitio2 = sitios.length > 1 ? sitios[1] : null;
  const ejemplosSitios = sitio2 ? `${sitio1} y ${sitio2}` : sitio1;
  const puntoTuristicoN = pluralizar(cantidad_sitios, 'punto turístico', 'puntos turísticos');

  const title = `Qué hacer en ${nombre} | Audioguía YouGuide`;
  // Descripción corta para meta/OG/Twitter (snippet de buscador, ~155 caracteres).
  const description = `Descubrí ${cantidad_sitios} ${puntoTuristicoN} en ${nombre}, como ${ejemplosSitios}. Descargá la app y escuchá la historia mientras caminás.`;
  // Párrafo largo y citable para el cuerpo de la página y el schema (GEO).
  const longDescription = buildLongDescription(cityData);
  const url = `https://www.youguide.com.ar/destinos/${ciudad}`;
  const logoUrl = "https://www.youguide.com.ar/logo.png";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": nombre,
    "description": longDescription,
    "url": url,
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": provincia,
      "containedInPlace": {
        "@type": "Country",
        "name": "Argentina"
      }
    },
    "touristType": [
      "CityTourism",
      "CulturalTourism"
    ]
  };

  const sitiosHtml = sitios.map(sitio => `<li>📍 ${sitio}</li>`).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <meta name="description" content="${description}">
      <meta name="robots" content="index, follow">
      <link rel="canonical" href="${url}">

      <!-- Open Graph / WhatsApp Meta Tags -->
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${logoUrl}">
      <meta property="og:url" content="${url}">
      <meta property="og:type" content="website">

      <!-- Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:image" content="${logoUrl}">

      <!-- Schema Markup -->
      <script type="application/ld+json">
        ${JSON.stringify(schemaMarkup, null, 2)}
      </script>

      <style>
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: #0f172a; /* deep-800 */
          color: white;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        header {
          background-color: #0b1120;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-text {
          font-weight: 700;
          font-size: 24px;
          text-decoration: none;
          color: white;
        }
        .text-accent { color: #00D1B2; }
        .container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          flex: 1;
        }
        h1 {
          font-size: 48px;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #00D1B2 0%, #3b82f6 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p.lead {
          font-size: 19px;
          color: #e2e8f0;
          margin-bottom: 40px;
          line-height: 1.7;
        }
        .sites-box {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 40px;
        }
        .sites-box h2 {
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 24px;
        }
        .sites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sites-grid li {
          color: #94a3b8;
          font-size: 16px;
        }
        .cta-section {
          text-align: center;
          padding: 40px 0;
        }
        .btn {
          display: inline-block;
          background-color: #00D1B2;
          color: #0b1120;
          padding: 16px 32px;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
          transition: all 0.3s ease;
        }
        .btn:hover {
          background-color: #34d9c3;
          transform: scale(1.05);
        }
        footer {
          text-align: center;
          padding: 20px;
          color: #64748b;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <header>
        <a href="/" class="logo-text">🎧 You<span class="text-accent">Guide</span></a>
        <a href="/" style="color: #cbd5e1; text-decoration: none;">Volver al inicio</a>
      </header>

      <main class="container">
        <h1>Qué hacer en ${nombre}</h1>
        <p class="lead">${longDescription}</p>

        <div class="sites-box">
          <h2>${cantidad_sitios} ${pluralizar(cantidad_sitios, 'Punto Turístico Disponible', 'Puntos Turísticos Disponibles')}</h2>
          <ul class="sites-grid">
            ${sitiosHtml}
          </ul>
        </div>

        <div class="cta-section">
          <h2>Explorá ${nombre} a tu propio ritmo</h2>
          <p style="color: #cbd5e1; margin-bottom: 24px;">Descargá la aplicación gratuita y dejá que YouGuide te cuente las historias de estos lugares mágicos de manera automática.</p>
          <a href="https://github.com/tinchotandil/youguide-landing/releases/download/v1.7.9/YouGuide.1.7.9.apk" class="btn">Descargar YouGuide Beta</a>
        </div>
      </main>

      <footer>
        &copy; 2026 YouGuide. Todos los derechos reservados.
      </footer>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
