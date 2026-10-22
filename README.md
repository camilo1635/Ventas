# VentasJuan

Tienda web estática de electrónicos (HTML + CSS + JS, sin dependencias). Sin pagos online: el comprador contacta al vendedor por WhatsApp.

## Ver el sitio
```
cd D:\VentasJuan
python -m http.server 8000
```
Abre http://localhost:8000 (no funciona abriendo el HTML con doble clic, porque carga `productos.json`).

## Configurar
Edita `js/config.js`: `whatsapp` (código de país + número, solo dígitos), nombre de tienda y moneda.

## Agregar un producto
1. Copia las fotos a `img/`.
2. Añade un objeto en `data/productos.json`:
```json
{
  "id": "mi-producto",
  "nombre": "Nombre",
  "categoria": "Celulares",
  "descripcion": "Texto…",
  "precio": 500000,
  "imagenes": ["img/foto1.jpg", "img/foto2.jpg"],
  "video": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  "ubicacion": { "texto": "Ciudad, barrio", "mapa_query": "barrio, ciudad, país" },
  "especificaciones": ["dato 1", "dato 2"],
  "estado": "disponible"
}
```
- `video`: enlace de YouTube o ruta a un `.mp4` (puede ir vacío `""`).
- `estado`: `disponible` o `agotado` (los agotados muestran un aviso para pedir por encargo).
- `id` debe ser único.

## Publicar
Sube la carpeta a cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages).
