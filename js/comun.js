// Funciones compartidas por todas las páginas.

const DIAS_AVISO = 30; // días antes del vencimiento en que se marca "por vencer"

const CLASES_FUEGO = {
  A: "Sólidos combustibles (madera, papel, tela)",
  B: "Líquidos y gases inflamables (nafta, aceite, gas)",
  C: "Equipos eléctricos energizados",
  D: "Metales combustibles (magnesio, sodio)",
  K: "Aceites y grasas de cocina",
};

async function cargarMatafuegos() {
  const resp = await fetch("data/matafuegos.json", { cache: "no-store" });
  if (!resp.ok) throw new Error("No se pudo cargar la base de datos (" + resp.status + ")");
  return resp.json();
}

function parsearFecha(iso) {
  if (!iso) return null;
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d);
}

function formatearFecha(iso) {
  const f = parsearFecha(iso);
  return f ? f.toLocaleDateString("es-AR") : "—";
}

function diasHasta(iso) {
  const f = parsearFecha(iso);
  if (!f) return null;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return Math.round((f - hoy) / 86400000);
}

// Devuelve { nivel: "ok" | "aviso" | "vencido", texto }
function estadoFecha(iso) {
  const dias = diasHasta(iso);
  if (dias === null) return { nivel: "aviso", texto: "Sin dato" };
  if (dias < 0) return { nivel: "vencido", texto: "Vencido hace " + -dias + " días" };
  if (dias <= DIAS_AVISO) return { nivel: "aviso", texto: "Vence en " + dias + " días" };
  return { nivel: "ok", texto: "Vigente" };
}

// Estado general: el peor entre recarga y prueba hidráulica.
function estadoGeneral(m) {
  const orden = { ok: 0, aviso: 1, vencido: 2 };
  const estados = [estadoFecha(m.vencimientoRecarga), estadoFecha(m.vencimientoPruebaHidraulica)];
  const peor = estados.reduce((a, b) => (orden[b.nivel] > orden[a.nivel] ? b : a));
  const textos = { ok: "Apto para uso", aviso: "Requiere atención pronto", vencido: "Fuera de servicio / vencido" };
  return { nivel: peor.nivel, texto: textos[peor.nivel] };
}

// URL de la ficha que se codifica en el QR (funciona en cualquier hosting).
function urlFicha(id) {
  const base = new URL("matafuego.html", window.location.href);
  base.search = "?id=" + encodeURIComponent(id);
  return base.href;
}

function escapar(txt) {
  return String(txt ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
