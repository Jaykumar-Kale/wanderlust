(function () {
  const PAGE = window.PAGE || {};
  const key = PAGE.MAPTILER_KEY;
  const L = PAGE.LISTING || {};

  if (!key) {
    console.error("❌ MAP_TILER_KEY missing. Set it in .env or app.js locals.");
    return;
  }
  if (typeof maplibregl === "undefined") {
    console.error("❌ MapLibre not loaded. Include CSS/JS in the base layout.");
    return;
  }

  let coords =
    Array.isArray(L.coordinates) && L.coordinates.length === 2
      ? L.coordinates
      : [77.2090, 28.6139]; // fallback
  const [lng, lat] = coords;

  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`,
    center: [lng, lat],
    zoom: Array.isArray(L.coordinates) ? 12 : 10,
  });

  map.addControl(new maplibregl.NavigationControl());
  map.on("error", (e) => console.error("Map error:", e?.error || e));

  if (Array.isArray(L.coordinates) && L.coordinates.length === 2) {
    const popupHtml = `
      <div style="font:600 14px/1.2 system-ui">${L.title || "Listing"}</div>
      <div style="font:12px/1.2 system-ui">${L.location || ""}</div>
      ${L.price != null ? `<div style="font:12px/1.2 system-ui">₹ ${Number(L.price).toLocaleString("en-IN")}</div>` : ""}
    `;
    new maplibregl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new maplibregl.Popup({ offset: 16 }).setHTML(popupHtml))
      .addTo(map);
  }
})();
