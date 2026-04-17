// ===== NAV =====
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'game') startGame();
}

// welcome
window.onload = function () {
  setTimeout(() => show('menu'), 2000);
};

// ===== STORAGE =====
let best = localStorage.getItem("best") || 0;
let coinCount = localStorage.getItem("coins") || 120;

// ===== GAME =====
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let ball, obstacles, coins;
let score = 0;
let lives = 3;
let speedMultiplier = 1;
let gameRunning = false;

// resize
function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);

// start
function startGame() {
  gameRunning = true;
  resize();

  ball = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    r: 12,
    dx: 0
  };

  obstacles = [];
  coins = [];
  score = 0;
  lives = 3;
  speedMultiplier = 1;

  updateUI();

  spawnObstacle();
  spawnCoin();

  requestAnimationFrame(loop);
}

// control
document.addEventListener('click', () => {
  if (!gameRunning) return;
  ball.dx = ball.dx === 0 ? 4 : -ball.dx;
});

// spawn
function spawnObstacle() {
  if (!gameRunning) return;

  obstacles.push({
    x: Math.random() * (canvas.width - 100),
    y: -20,
    w: 100,
    h: 10,
    speed: (2 + Math.random() * 2) * speedMultiplier
  });

  setTimeout(spawnObstacle, 900);
}

function spawnCoin() {
  if (!gameRunning) return;

  coins.push({
    x: Math.random() * (canvas.width - 20),
    y: -20,
    r: 8,
    speed: 2 * speedMultiplier
  });

  setTimeout(spawnCoin, 1500);
}

// loop
function loop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  updateObstacles();
  updateCoins();

  score++;

  if (score > best) {
    best = score;
    localStorage.setItem("best", best);
  }

  if (score % 300 === 0) speedMultiplier += 0.2;

  updateUI();

  requestAnimationFrame(loop);
}

// ball
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

// obstacles
function updateObstacles() {
  obstacles.forEach((o) => {
    o.y += o.speed;

    ctx.fillStyle = '#7CFF6B';
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

// coins
function updateCoins() {
  coins.forEach((c, i) => {
    c.y += c.speed;

    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();

    let dx = ball.x - c.x;
    let dy = ball.y - c.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < ball.r + c.r) {
      coins.splice(i, 1);
      coinCount += 10;
      localStorage.setItem("coins", coinCount);
    }
  });
}

// lives
function loseLife() {
  lives--;

  if (lives <= 0) {
    gameOver();
  } else {
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.dx = 0;
}

// UI
function updateUI() {
  document.getElementById('scoreText').innerText = score;
  document.getElementById('coinText').innerText = coinCount;

  let hearts = '';
  for (let i = 0; i < lives; i++) hearts += '❤️';
  document.getElementById('livesText').innerText = hearts;
}

// game over
function gameOver() {
  gameRunning = false;
  document.getElementById('continueBox').classList.remove('hidden');
}

// continue
function buyLife() {
  if (coinCount >= 200) {
    coinCount -= 200;
    localStorage.setItem("coins", coinCount);
    lives = 1;
    resumeGame();
  }
}

function watchAd() {
  lives = 1;
  resumeGame();
}

function resumeGame() {
  document.getElementById('continueBox').classList.add('hidden');
  gameRunning = true;
  resetBall();
  requestAnimationFrame(loop);
}
