/* ===== NAV ===== */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = () => {
  setTimeout(() => show('menu'), 1500);
};

/* ===== MENU CLICK ===== */
function menuClick(e) {
  let y = e.clientY / window.innerHeight;

  if (y > 0.38 && y < 0.48) show('game_start');
  else if (y > 0.48 && y < 0.58) show('shop');
  else if (y > 0.58 && y < 0.68) show('appearance_ball');
  else if (y > 0.68 && y < 0.78) show('leaderboard');
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
let score = 0;
let best = localStorage.getItem("best") || 0;
let coinCount = localStorage.getItem("coins") || 120;
let lives = 3;
let running = false;

/* resize */
function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

/* start */
function startGame() {
  resize();

  running = true;
  score = 0;
  lives = 3;

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

  score++;

  if (score > best) {
    best = score;
    localStorage.setItem("best", best);
  }

  updateUI();

  requestAnimationFrame(loop);
}

/* ball */
function drawBall() {
  ball.x += ball.dx;

  if (ball.x < ball.r) ball.x = ball.r;
  if (ball.x > canvas.width - ball.r) ball.x = canvas.width - ball.r;

  let g = ctx.createRadialGradient(ball.x, ball.y, 3, ball.x, ball.y, ball.r);
  g.addColorStop(0, '#6aff9c');
  g.addColorStop(1, '#2a8cff');

  ctx.fillStyle = g;
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
      loseLife();
    }
  });
}

/* lives */
function loseLife() {
  lives--;

  if (lives <= 0) {
    running = false;
    alert("GAME OVER");
    show('menu');
  } else {
    ball.x = canvas.width / 2;
    ball.dx = 0;
  }
}

/* UI */
function updateUI() {
  document.getElementById('scoreText').innerText = score;
  document.getElementById('coinText').innerText = coinCount;
  document.getElementById('bestText').innerText = best;

  let hearts = "";
  for (let i = 0; i < lives; i++) hearts += "❤️";
  document.getElementById('livesText').innerText = hearts;

  let progress = (score % 1000) / 10;
  document.getElementById('progress').style.width = progress + "%";
}
