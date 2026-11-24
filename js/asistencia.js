/* ==========================================================
   ASISTENCIA.JS – Formulario que arma el mensaje de WhatsApp
   El número de destino está en config.js (BODA.whatsapp)
   ========================================================== */
function upd() {
  var ok = document.querySelector('input[name="ok"]:checked').value;
  var t = 'Hola, ' + ok + '. Asistentes: ' + document.getElementById('nm').value + '. ' + document.getElementById('ms').value;
  document.getElementById('wa').href = 'https://wa.me/' + BODA.whatsapp + '?text=' + encodeURIComponent(t);
}
['nm', 'ms'].forEach(function (id) { document.getElementById(id).addEventListener('input', upd); });
document.querySelectorAll('input[name="ok"]').forEach(function (r) { r.addEventListener('change', upd); });
upd();
