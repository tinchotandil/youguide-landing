// api/ruta.js

export default function handler(req, res) {
  // Capturamos el ID de la ruta desde la URL (/ruta/xyz123)
  const { id } = req.query;

  // Generamos datos dinámicos basados en el ID para probar.
  const routeName = `Ruta Compartida ${id ? id.toUpperCase() : ''}`;
  const routeDescription = "Descubre esta increíble ruta guiada en YouGuide. Abre la app o descárgala para comenzar la aventura.";
  const ogImageUrl = "https://tinchotandil-youguide.vercel.app/youguide-hero.jpg"; // Reemplaza con la imagen real de la ruta o logo

  // Identificador seguro para el clipboard/referrer
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
      <meta property="og:image" content="${ogImageUrl}">
      <meta property="og:type" content="website">
      
      <!-- Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${routeName}">
      <meta name="twitter:description" content="${routeDescription}">
      <meta name="twitter:image" content="${ogImageUrl}">

      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f3f4f6;
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
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          max-width: 400px;
          width: 100%;
        }
        h1 { color: #1f2937; font-size: 24px; margin-bottom: 10px; }
        p { color: #6b7280; font-size: 16px; margin-bottom: 30px; }
        .btn {
          display: inline-block;
          background-color: #f97316; /* Naranja YouGuide */
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          font-size: 16px;
          transition: background 0.3s;
          cursor: pointer;
          border: none;
          width: 100%;
          box-sizing: border-box;
        }
        .btn:hover { background-color: #ea580c; }
        .loader {
            display: none;
            margin-top: 15px;
            font-size: 14px;
            color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>${routeName}</h1>
        <p>Alguien te invitó a explorar esta ruta. Abre la app o descárgala para ver los detalles.</p>
        <button id="actionBtn" class="btn">Abrir / Descargar App</button>
        <div id="loader" class="loader">Procesando...</div>
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
            // ANDROID: Redirigir a Play Store inyectando el referrer
            const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.tinchotandil.youguide&referrer=' + encodeURIComponent(payload);
            window.location.href = playStoreUrl;
          } 
          else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // IOS: Fallback de Deferred -> Escribir en el portapapeles
            try {
              await navigator.clipboard.writeText(payload);
            } catch (err) {
              // Fallback para Safari antiguo
              const textArea = document.createElement("textarea");
              textArea.value = payload;
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              try { document.execCommand('copy'); } catch (e) {}
              document.body.removeChild(textArea);
            }
            
            // Redirigir a App Store
            window.location.href = 'https://apps.apple.com/app/idYOUR_APP_ID';
          } 
          else {
            // DESKTOP: Fallback básico
            alert('Abre este enlace desde tu teléfono móvil para ver la ruta.\\nID: ' + payload);
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
