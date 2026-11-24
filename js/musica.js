/* ==========================================================
   MUSICA.JS – Música de fondo (musica.mp3) y botón ♪
   - Empieza al tocar "Abrir invitación" (los navegadores
     solo permiten sonido después de un toque del usuario)
   - El botón ♪ de la esquina pausa / reanuda
   - También desbloquea la portada y baja a la invitación
   ========================================================== */
var on = false, mb = document.getElementById('mus');
var audio = new Audio('musica.mp3'); audio.loop = true; audio.preload = 'auto';

function mus() {
  on = !on;
  if (on) { var p = audio.play(); if (p && p.catch) p.catch(function () { on = false; mb.style.opacity = .5; mb.classList.remove('spin'); }); }
  else audio.pause();
  mb.style.opacity = on ? 1 : .5; mb.classList.toggle('spin', on);
}
mb.onclick = mus;

document.getElementById('play').onclick = function () {
  document.body.classList.remove('lock'); ScrollTrigger.refresh();
  if (!on) mus();
  gsap.to(mb, { autoAlpha: 1, duration: .6 });
  document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
};
