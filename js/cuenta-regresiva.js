/* ==========================================================
   CUENTA-REGRESIVA.JS – Días, horas, minutos y segundos
   que faltan para BODA.fecha (definida en config.js)
   ========================================================== */
var target = new Date(BODA.fecha).getTime();
function setUnit(id, v) {
  v = ('0' + v).slice(-2);
  var e = document.getElementById(id);
  if (e.textContent != v) { e.textContent = v; gsap.fromTo(e, { scale: 1.25, opacity: .4 }, { scale: 1, opacity: 1, duration: .5 }); }
}
function tick() {
  var m = Math.max(0, target - Date.now()), h = Math.floor(m / 36e5);
  document.getElementById('d').textContent = Math.floor(h / 24);
  setUnit('h', h % 24); setUnit('mi', Math.floor(m / 6e4) % 60); setUnit('se', Math.floor(m / 1e3) % 60);
}
tick(); setInterval(tick, 1000);
