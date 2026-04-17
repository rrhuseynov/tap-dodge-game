function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* welcome → menu */
setTimeout(() => {
  show('menu');
}, 2000);

/* показать continue */
function showContinue() {
  document.getElementById('continueBox').classList.remove('hidden');
}

/* скрыть continue */
function hideContinue() {
  document.getElementById('continueBox').classList.add('hidden');
}

/* ДЛЯ ТЕСТА (пока нет физики) */
setTimeout(() => {
  if (document.getElementById('game').classList.contains('active')) {
    showContinue();
  }
}, 5000);
