import json
import re

with open('scratch/input.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

data = []
current_provincia = ""
current_ciudad = None

def slugify(text):
    text = text.lower()
    text = re.sub(r'[áäâà]', 'a', text)
    text = re.sub(r'[éëêè]', 'e', text)
    text = re.sub(r'[íïîì]', 'i', text)
    text = re.sub(r'[óöôò]', 'o', text)
    text = re.sub(r'[úüûù]', 'u', text)
    text = re.sub(r'ñ', 'n', text)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text

for line in lines:
    line = line.strip()
    if not line:
        continue
    
    if line.startswith("📍 PROVINCIA:"):
        current_provincia = line.replace("📍 PROVINCIA:", "").strip()
    elif line.startswith("🏙️"):
        # Match city name and number of sites
        m = re.match(r'🏙️ (.*?) \((\d+) sitios\)', line)
        if m:
            city_name = m.group(1).strip()
            num_sitios = int(m.group(2))
            current_ciudad = {
                "id": slugify(city_name),
                "nombre": city_name,
                "provincia": current_provincia,
                "cantidad_sitios": num_sitios,
                "sitios": []
            }
            data.append(current_ciudad)
    elif not line.startswith("🌎") and not line.startswith("─") and not line.startswith("━") and not line.startswith("📊") and not line.startswith("Países") and not line.startswith("Ciudades") and not line.startswith("Sitios") and not line.startswith("Actualizado"):
        # It's a site
        if current_ciudad is not None:
            current_ciudad["sitios"].append(line)

with open('data/destinos.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Parsed successfully!")
