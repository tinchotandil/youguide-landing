// api/ruta.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Capturamos el ID de la ruta desde la URL (/ruta/xyz123)
  const { id } = req.query;
  
  // Título por defecto (atractivo y genérico)
  let routeName = "¡Mira esta ruta turística en YouGuide!";
  let siteFound = false;

  try {
    // 1. Importación de Datos: Leemos el archivo destinos.json
    const dataPath = path.join(process.cwd(), 'data', 'destinos.json');
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const destinos = JSON.parse(fileContent);

    // 2. Mapeo de ID a Nombre: Buscamos el ID en los destinos (o sitios si aplica)
    // Buscamos coincidencia con el ID del destino (ciudad/región)
    const destinoMatch = destinos.find(d => d.id === id);
    
    if (destinoMatch) {
      routeName = `Ruta Compartida: ${destinoMatch.nombre}`;
      siteFound = true;
    } else {
      // Búsqueda exhaustiva en la lista de sitios de cada destino por si el ID coincide con un nombre
      for (const d of destinos) {
        if (d.sitios && d.sitios.includes(id)) {
          routeName = `Ruta Compartida: ${id}`;
          siteFound = true;
          break;
        }
      }
    }
  } catch (error) {
    console.error("[Metadata] Error reading destinos.json:", error);
  }

  // Si no se encontró el sitio (o es un ID técnico/prueba), routeName mantiene el valor genérico.
  // El ID técnico (xyz123) ya no se mostrará en el título visual si no tiene mapeo.
  
  const routeDescription = "Descubre esta increíble ruta guiada en YouGuide. Abre la app o descárgala para comenzar la aventura.";
  
  // URL de imagen real del proyecto para Open Graph y UI
  const logoUrl = "https://youguide.vercel.app/logo.png";
  
  // Identificador seguro para el clipboard/referrer (Lógica interna)
  const deferredPayload = `route_${id}`;

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${routeName} | YouGuide</title>
      
      <!-- Open Graph / WhatsApp Meta Tags -->
      <meta property="og:title" content="${routeName}">
      <meta property="og:description" content="${routeDescription}">
      <meta property="og:image" content="${logoUrl}">
      <meta property="og:type" content="website">
      
      <!-- Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${routeName}">
      <meta name="twitter:description" content="${routeDescription}">
      <meta name="twitter:image" content="${logoUrl}">

      <style>
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          padding: 20px;
          text-align: center;
        }
        .card {
          background: white;
          padding: 48px 32px;
          border-radius: 24px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          box-sizing: border-box;
        }
        .logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid #f97316;
          margin-bottom: 24px;
          object-fit: cover;
          display: inline-block;
        }
        h1 { 
          color: #1e293b; 
          font-size: 24px; 
          margin-bottom: 12px;
          font-weight: 700;
          line-height: 1.2;
        }
        p { 
          color: #64748b; 
          font-size: 16px; 
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .btn {
          display: inline-block;
          background-color: #f97316; /* Naranja YouGuide */
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          width: 100%;
          box-sizing: border-box;
          box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.2);
        }
        .btn:active {
          transform: scale(0.98);
        }
        .loader {
            display: none;
            margin-top: 20px;
            font-size: 14px;
            color: #94a3b8;
            font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <img src="${logoUrl}" alt="YouGuide Logo" class="logo">
        <h1>${routeName}</h1>
        <p>Te han invitado a explorar una ruta personalizada. Abre la app para ver todos los detalles y comenzar el recorrido.</p>
        <button id="actionBtn" class="btn">Explorar en la App</button>
        <div id="loader" class="loader">Abriendo YouGuide...</div>
      </div>

      <script>
        const payload = "${deferredPayload}";
        const actionBtn = document.getElementById('actionBtn');
        const loader = document.getElementById('loader');

        actionBtn.addEventListener('click', async () => {
          actionBtn.style.display = 'none';
          loader.style.display = 'block';

          const userAgent = navigator.userAgent || navigator.vendor || window.opera;
          
          if (/android/i.test(userAgent)) {
            // ANDROID: Alert Beta and redirect to landing page
            alert('YouGuide se encuentra en fase Beta cerrada. Te redirigiremos a nuestra web principal.');
            window.location.href = '/';
          } 
          else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // IOS: Fallback de Deferred -> Escribir en el portapapeles
            try {
              await navigator.clipboard.writeText(payload);
            } catch (err) {
              const textArea = document.createElement("textarea");
              textArea.value = payload;
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              try { document.execCommand('copy'); } catch (e) {}
              document.body.removeChild(textArea);
            }
            
            // IOS: Alert Beta and redirect to landing page
            alert('YouGuide se encuentra en fase Beta cerrada. Te redirigiremos a nuestra web principal.');
            window.location.href = '/';
          } 
          else {
            alert('Abre este enlace desde tu móvil para ver la ruta.\\nID: ' + payload);
            actionBtn.style.display = 'block';
            loader.style.display = 'none';
          }
        });
      </script>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
