function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* welcome */
window.onload = function () {
  setTimeout(() => show('menu'), 1500);
};

/* FIX START */
function goStart() {
  show('game_start');
}

/* FIX TAP TO START */
function startFromTap() {
  show('game');
  startGame();
}

/* ===== GAME ===== */

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let ball, obstacles;
let running = false;

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);

function startGame() {
  resize();

  running = true;

  ball = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    r: 12,
    dx: 0
  };

  obstacles = [];

  spawnObstacle();
  requestAnimationFrame(loop);
}

/* control */
document.addEventListener('click', () => {
  if (!running) return;
  ball.dx = ball.dx === 0 ? 4 : -ball.dx;
});

/* obstacles */
function spawnObstacle() {
  if (!running) return;

  obstacles.push({
    x: Math.random() * (canvas.width - 100),
    y: -20,
    w: 100,
    h: 10,
    speed: 3
  });

  setTimeout(spawnObstacle, 900);
}

/* loop */
function loop() {
  if (!running) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  updateObstacles();

  requestAnimationFrame(loop);
}

/* ball */
function drawBall() {
  ball.x += ball.dx;

  if (ball.x < ball.r) ball.x = ball.r;
  if (ball.x > canvas.width - ball.r) ball.x = canvas.width - ball.r;

  ctx.fillStyle = "#00ffcc";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

/* obstacles */
function updateObstacles() {
  obstacles.forEach(o => {
    o.y += o.speed;

    ctx.fillStyle = "#7CFF6B";
    ctx.fillRect(o.x, o.y, o.w, o.h);

    if (
      ball.x > o.x &&
      ball.x < o.x + o.w &&
      ball.y + ball.r > o.y &&
      ball.y - ball.r < o.y + o.h
    ) {
      running = false;
      document.getElementById('continueBox').classList.remove('hidden');
    }
  });
}
