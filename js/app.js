let productos = [];
const estado = { q: "", orden: "recientes" };

const grid = document.getElementById("grid");

function tarjeta(p) {
  const img = p.imagenes?.[0] || "img/placeholder.svg";
  const agotado = p.estado === "agotado";
  return `
  <article class="card ${agotado ? "sold" : ""}">
    <a class="card-img" href="producto.html?id=${encodeURIComponent(p.id)}">
      <img src="${esc(img)}" alt="${esc(p.nombre)}" loading="lazy">
      <span class="chip">${esc(p.categoria)}</span>
      ${agotado ? '<span class="badge-sold">Agotado · ¡Pídelo por encargo!</span>' : ""}
    </a>
    <div class="card-body">
      <h3><a href="producto.html?id=${encodeURIComponent(p.id)}">${esc(p.nombre)}</a></h3>
      <p class="loc">📍 ${esc(p.ubicacion?.texto)}</p>
      <div class="card-foot">
        <span class="price">${formatPrecio(p.precio)}</span>
        <a class="btn-wa" href="${waProducto(p)}" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp">${WA_ICON}</a>
      </div>
    </div>
  </article>`;
}

function render() {
  const q = estado.q.trim().toLowerCase();
  let lista = productos.filter((p) =>
    (!q || `${p.nombre} ${p.descripcion} ${p.categoria}`.toLowerCase().includes(q)));
  if (estado.orden === "menor") lista.sort((a, b) => a.precio - b.precio);
  if (estado.orden === "mayor") lista.sort((a, b) => b.precio - a.precio);
  grid.innerHTML = lista.length ? lista.map(tarjeta).join("") : '<p class="empty">No encontramos productos con esos criterios.</p>';
  document.getElementById("conteo").textContent = `${lista.length} producto${lista.length === 1 ? "" : "s"}`;
}

document.getElementById("buscar").addEventListener("input", (e) => { estado.q = e.target.value; render(); });
document.getElementById("orden").addEventListener("change", (e) => { estado.orden = e.target.value; render(); });

cargarProductos()
  .then((data) => {
    productos = data;
    render();
  })
  .catch(() => {
    grid.innerHTML = '<p class="empty">No se pudieron cargar los productos. Abre el sitio con un servidor local (ver README).</p>';
  });
