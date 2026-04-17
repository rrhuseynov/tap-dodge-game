let canvas, ctx;
let ball, obstacles, coins;
let score = 0;
let gameRunning = false;

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'game') startGame();
}

/* welcome → menu */
setTimeout(() => {
  show('menu');
}, 2000);

/* ==== GAME START ==== */

function startGame() {
  gameRunning = true;

  // создаём canvas если нет
  if (!canvas) {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.getElementById('game').appendChild(canvas);
  }

  resizeCanvas();

  ball = {
    x: canvas.width / 2,
    y: canvas.height - 80,
    r: 15,
    dx: 0
  };

  obstacles = [];
  coins = [];
  score = 0;

  spawnObstacle();
  spawnCoin();

  requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

/* ==== CONTROLS ==== */

document.addEventListener('click', () => {
  ball.dx = ball.dx === 0 ? 5 : -ball.dx;
});

/* ==== SPAWN ==== */

function spawnObstacle() {
  obstacles.push({
    x: Math.random() * (canvas.width - 120),
    y: -20,
    w: 120,
    h: 10,
    speed: 3 + Math.random() * 2
  });

  setTimeout(spawnObstacle, 1000);
}

function spawnCoin() {
  coins.push({
    x: Math.random() * (canvas.width - 30),
    y: -20,
    r: 10,
    speed: 3
  });

  setTimeout(spawnCoin, 2000);
}

/* ==== GAME LOOP ==== */

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  updateObstacles();
  updateCoins();

  requestAnimationFrame(gameLoop);
}

/* ==== BALL ==== */

function drawBall() {
  ball.x += ball.dx;

  if (ball.x < ball.r) ball.x = ball.r;
  if (ball.x > canvas.width - ball.r) ball.x = canvas.width - ball.r;

  let gradient = ctx.createRadialGradient(
    ball.x, ball.y, 5,
    ball.x, ball.y, ball.r
  );
  gradient.addColorStop(0, '#6aff9c');
  gradient.addColorStop(1, '#2a8cff');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

/* ==== OBSTACLES ==== */

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    o.y += o.speed;

    ctx.fillStyle = '#7CFF6B';
    ctx.fillRect(o.x, o.y, o.w, o.h);

    // collision
    if (
      ball.x > o.x &&
      ball.x < o.x + o.w &&
      ball.y + ball.r > o.y &&
      ball.y - ball.r < o.y + o.h
    ) {
      gameOver();
    }
  }
}

/* ==== COINS ==== */

function updateCoins() {
  for (let i = 0; i < coins.length; i++) {
    let c = coins[i];
    c.y += c.speed;

    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();

    // collect
    let dx = ball.x - c.x;
    let dy = ball.y - c.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < ball.r + c.r) {
      coins.splice(i, 1);
      score += 10;
    }
  }
}

/* ==== GAME OVER ==== */

function gameOver() {
  gameRunning = false;
  showContinue();
}

/* ==== CONTINUE ==== */

function showContinue() {
  document.getElementById('continueBox').classList.remove('hidden');
}

function hideContinue() {
  document.getElementById('continueBox').classList.add('hidden');
  show('game');
}
