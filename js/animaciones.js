/* ==========================================================
   ANIMACIONES.JS – Efectos visuales (GSAP)
   - Pétalos que caen
   - Entrada de la portada (nombres, línea, frase, botón)
   - Aparición de secciones al hacer scroll (.rv)
   - Dibujo del monograma N & R
   ========================================================== */
gsap.registerPlugin(ScrollTrigger);

/* --- Pétalos y flores cayendo (colores de la paleta) --- */
var IDS = ['fl', 'pt', 'fl', 'pt', 'fl'];
var COLS = ['#F5E8D5', '#E3BFBF', '#C18F91', '#E8CDC5', '#CFB080'];
var fall = document.getElementById('fall'), H = innerHeight, NS = 'http://www.w3.org/2000/svg';
for (var i = 0; i < 20; i++) {
  var s = document.createElementNS(NS, 'svg'), u = document.createElementNS(NS, 'use'), z = 14 + Math.random() * 26;
  u.setAttribute('href', '#' + IDS[i % 5]); s.appendChild(u);
  s.setAttribute('viewBox', '-12 -12 24 24'); s.setAttribute('width', z); s.setAttribute('height', z);
  s.style.left = Math.random() * 100 + '%'; s.style.color = COLS[i % 5]; s.style.opacity = .4 + Math.random() * .4;
  fall.appendChild(s);
  gsap.set(s, { y: -60, transformPerspective: 400 });
  gsap.to(s, { y: H + 80, duration: 10 + Math.random() * 10, ease: 'none', repeat: -1, delay: -Math.random() * 20 });
  gsap.to(s, { x: (Math.random() < .5 ? -1 : 1) * (30 + Math.random() * 40), duration: 2 + Math.random() * 2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to(s, { rotation: 360, rotationX: (Math.random() < .5 ? 360 : -360), duration: 5 + Math.random() * 5, ease: 'none', repeat: -1 });
}

/* --- Portada: cada letra de los nombres entra por separado --- */
var n = document.getElementById('names'), t = n.textContent; n.innerHTML = '';
/* Se divide en dos grupos ("Nayabe &" y "Roger"): en el celular quedan en dos líneas y nunca se corta una palabra */
var cut = t.lastIndexOf(' ');
[t.slice(0, cut), t.slice(cut + 1)].forEach(function (parte, k) {
  var g = document.createElement('span'); g.className = 'nl';
  parte.split('').forEach(function (c) { var e = document.createElement('span'); e.className = 'ch'; e.innerHTML = c == ' ' ? '&nbsp;' : c; g.appendChild(e); });
  n.appendChild(g); if (k == 0) n.appendChild(document.createTextNode(' '));
});
var ln = document.getElementById('ln'), L = ln.getTotalLength(); ln.style.strokeDasharray = L; ln.style.strokeDashoffset = L;
gsap.timeline({ defaults: { ease: 'power3.out' } })
  .from('.small', { opacity: 0, y: -20, duration: 1 })
  .from('#names .ch', { opacity: 0, y: 50, rotationX: -90, scale: .4, stagger: .07, duration: 1 }, '-=.4')
  .to(ln, { strokeDashoffset: 0, duration: 1.2 }, '-=.4')
  .from('.phrase', { opacity: 0, y: 20, duration: 1 }, '-=.6')
  .from('#play', { opacity: 0, scale: .5, duration: .8, ease: 'back.out(2)' }, '-=.4');
gsap.to('#names', { scale: 1.03, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3 });

/* --- Secciones con clase .rv aparecen al hacer scroll --- */
gsap.utils.toArray('.rv').forEach(function (e) {
  gsap.from(e, { opacity: 0, y: 50, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: e, start: 'top 88%' } });
});

/* --- Monograma: se dibuja el círculo y entran las letras --- */
var mr = document.getElementById('mr'), ML = mr.getTotalLength(); mr.style.strokeDasharray = ML; mr.style.strokeDashoffset = ML;
gsap.to(mr, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: '.mono', start: 'top 85%' } });
gsap.from('.m1', { opacity: 0, scale: .6, transformOrigin: 'center', stagger: .25, duration: 1, scrollTrigger: { trigger: '.mono', start: 'top 85%' } });
gsap.to('#hero .ring', { y: -80, scrollTrigger: { trigger: '#hero', scrub: 1, start: 'top top', end: 'bottom top' } });
