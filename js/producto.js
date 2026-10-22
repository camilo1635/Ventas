const cont = document.getElementById("detalle");

function videoHTML(url) {
  if (!url) return "";
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  let inner;
  if (yt) {
    inner = `<iframe src="https://www.youtube.com/embed/${yt[1]}" title="Video del producto" allowfullscreen loading="lazy"></iframe>`;
  } else {
    inner = `<video src="${esc(url)}" controls preload="metadata"></video>`;
  }
  return `<section class="block"><h2>Video</h2><div class="video">${inner}</div></section>`;
}

function mapaHTML(u) {
  if (!u) return "";
  const q = encodeURIComponent(u.mapa_query || u.texto);
  return `<section class="block"><h2>Ubicación</h2>
    <p class="loc">📍 ${esc(u.texto)}</p>
    <div class="map"><iframe src="https://www.google.com/maps?q=${q}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa"></iframe></div></section>`;
}

function render(p) {
  document.title = `${p.nombre} | ${CONFIG.tienda}`;
  const imgs = p.imagenes?.length ? p.imagenes : ["img/placeholder.svg"];
  const agotado = p.estado === "agotado";
  cont.innerHTML = `
    <a class="back" href="index.html">← Volver al catálogo</a>
    <div class="detail">
      <div class="gallery">
        <div class="main-img"><img id="principal" src="${esc(imgs[0])}" alt="${esc(p.nombre)}"></div>
        <div class="thumbs">${imgs.map((s, i) => `<button class="thumb ${i === 0 ? "active" : ""}" data-src="${esc(s)}"><img src="${esc(s)}" alt="Imagen ${i + 1}"></button>`).join("")}</div>
      </div>
      <div class="info">
        <span class="chip static">${esc(p.categoria)}</span>
        <h1>${esc(p.nombre)}</h1>
        <div class="price big">${formatPrecio(p.precio)}</div>
        ${agotado ? '<div class="sold-msg"><strong>🔥 ¡Este producto está agotado!</strong><span>Pídelo por encargo con el vendedor y te lo conseguimos.</span></div>' : ""}
        <a class="btn-primary" href="${waProducto(p)}" target="_blank" rel="noopener">${WA_ICON} ${agotado ? "Pedir por encargo por WhatsApp" : "Contactar al vendedor por WhatsApp"}</a>
        <section class="block"><h2>Descripción</h2><p>${esc(p.descripcion)}</p></section>
        ${p.especificaciones?.length ? `<section class="block"><h2>Características</h2><ul class="specs">${p.especificaciones.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></section>` : ""}
      </div>
    </div>
    <div class="extras">${videoHTML(p.video)}${mapaHTML(p.ubicacion)}</div>`;

  cont.querySelector(".thumbs").addEventListener("click", (e) => {
    const b = e.target.closest(".thumb");
    if (!b) return;
    document.getElementById("principal").src = b.dataset.src;
    cont.querySelectorAll(".thumb").forEach((t) => t.classList.toggle("active", t === b));
  });
}

const id = new URLSearchParams(location.search).get("id");
cargarProductos()
  .then((data) => {
    const p = data.find((x) => String(x.id) === id);
    if (!p) { cont.innerHTML = '<p class="empty">Producto no encontrado. <a href="index.html">Volver</a></p>'; return; }
    render(p);
  })
  .catch(() => { cont.innerHTML = '<p class="empty">No se pudo cargar el producto. Usa un servidor local (ver README).</p>'; });
