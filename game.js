function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = () => {
  setTimeout(() => show('menu'), 1500);
};

/* ===== MENU CLICK ПО КООРДИНАТАМ ===== */
function menuClick(e) {
  let y = e.clientY / window.innerHeight;

  if (y > 0.40 && y < 0.50) {
    show('game_start'); // START
  }
  else if (y > 0.50 && y < 0.60) {
    show('shop');
  }
  else if (y > 0.60 && y < 0.70) {
    show('appearance_ball');
  }
  else if (y > 0.70 && y < 0.80) {
    show('leaderboard');
  }
}

/* ===== START ===== */
function startFromTap() {
  show('game');
  startGame();
}

function backMenu() {
  show('menu');
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

document.addEventListener('click', () => {
  if (!running) return;
  ball.dx = ball.dx === 0 ? 4 : -ball.dx;
});

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

function loop() {
  if (!running) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  updateObstacles();

  requestAnimationFrame(loop);
}

function drawBall() {
  ball.x += ball.dx;

  if (ball.x < ball.r) ball.x = ball.r;
  if (ball.x > canvas.width - ball.r) ball.x = canvas.width - ball.r;

  ctx.fillStyle = "#00ffcc";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

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
      alert("GAME OVER");
      show('menu');
    }
  });
}
