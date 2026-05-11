import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Load destinos.json
  const filePath = path.join(process.cwd(), 'data', 'destinos.json');
  let destinos = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    destinos = JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading destinos.json:', error);
    return res.status(500).send('Error generating sitemap.');
  }

  const baseUrl = 'https://youguide.vercel.app';
  const currentDate = new Date().toISOString();

  // Create sitemap XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Main Home Page
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Dynamic City Pages
  destinos.forEach(city => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/destinos/${city.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // cache for 1 day
  res.status(200).send(xml);
}
