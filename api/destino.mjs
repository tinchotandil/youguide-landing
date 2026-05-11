import fs from 'fs';
import path from 'path';

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
  const sitio2 = sitios.length > 1 ? sitios[1] : 'muchos más';

  const title = `Qué hacer en ${nombre} | Audioguía YouGuide`;
  const description = `Descubrí ${cantidad_sitios} puntos turísticos en ${nombre}, como ${sitio1} y ${sitio2}. Descargá la app y escuchá la historia mientras caminás.`;
  const url = `https://youguide.vercel.app/destinos/${ciudad}`;
  const logoUrl = "https://youguide.vercel.app/img/logo.png";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": nombre,
    "description": description,
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
          font-size: 20px;
          color: #cbd5e1;
          margin-bottom: 40px;
          line-height: 1.6;
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
        <p class="lead">${description}</p>
        
        <div class="sites-box">
          <h2>${cantidad_sitios} Puntos Turísticos Disponibles</h2>
          <ul class="sites-grid">
            ${sitiosHtml}
          </ul>
        </div>
        
        <div class="cta-section">
          <h2>Explorá ${nombre} a tu propio ritmo</h2>
          <p style="color: #cbd5e1; margin-bottom: 24px;">Descargá la aplicación gratuita y dejá que YouGuide te cuente las historias de estos lugares mágicos de manera automática.</p>
          <a href="https://github.com/tinchotandil/youguide-landing/releases/download/v1.7.4/YouGuide.1.7.4.apk" class="btn">Descargar YouGuide Beta</a>
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
