// Utilidades compartidas
const WA_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.4-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>';

function formatPrecio(n) {
  return new Intl.NumberFormat(CONFIG.locale, {
    style: "currency", currency: CONFIG.moneda, maximumFractionDigits: 0,
  }).format(n);
}

function waLink(texto) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}

function waProducto(p) {
  if (p.estado === "agotado") {
    const u = new URL(`producto.html?id=${encodeURIComponent(p.id)}`, location.href).href;
    return waLink(`Hola ${CONFIG.tienda}, vi que "${p.nombre}" está agotado. Quiero pedirlo por encargo.\n${u}`);
  }
  const url = new URL(`producto.html?id=${encodeURIComponent(p.id)}`, location.href).href;
  return waLink(`Hola ${CONFIG.tienda}, me interesa "${p.nombre}" (${formatPrecio(p.precio)}). ¿Sigue disponible?\n${url}`);
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

async function cargarProductos() {
  const r = await fetch("data/productos.json");
  if (!r.ok) throw new Error("No se pudo cargar productos.json");
  return r.json();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tienda]").forEach((e) => (e.textContent = CONFIG.tienda));
  const fab = document.getElementById("wa-fab");
  if (fab) {
    fab.href = waLink(`Hola ${CONFIG.tienda}, quisiera más información sobre sus productos.`);
    fab.innerHTML = WA_ICON + "<span>WhatsApp</span>";
  }
});
