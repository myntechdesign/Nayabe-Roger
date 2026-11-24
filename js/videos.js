/* ==========================================================
   VIDEOS.JS – Reproducción automática de los videos
   - Todos van sin sonido (muted) para que el navegador
     los deje reproducir solos; el sonido es solo la música.
   - Un video solo se reproduce cuando está en pantalla
     (ahorra datos y batería en el celular).
   - El carrusel de "Nuestros momentos" avanza solo.
   ========================================================== */
var vids = document.querySelectorAll('video');
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    var v = en.target;
    if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () { }); }
    else v.pause();
  });
}, { threshold: .25 });
vids.forEach(function (v) { v.muted = true; io.observe(v); });

/* Carrusel automático (celular y computadora) */
var car = document.getElementById('car'), ci = 0;
setInterval(function () {
  var w = car.children[1].offsetLeft - car.children[0].offsetLeft; /* ancho de una tarjeta + espacio */
  if (car.scrollWidth <= car.clientWidth + 4) return;
  var alFinal = car.scrollLeft + car.clientWidth >= car.scrollWidth - 4;
  ci = alFinal ? 0 : Math.round(car.scrollLeft / w) + 1;
  car.scrollTo({ left: ci * w, behavior: 'smooth' });
}, BODA.carruselMs);
