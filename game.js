// game.js

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = () => {
  setTimeout(() => {
    show("menu");
    init();
  }, 700);
};

function init() {

  document.getElementById("startBtn").onclick = () => {
    show("game");
    startGame();
  };

  document.getElementById("shopBtn").onclick = () => {
    show("shop");
  };

  document.getElementById("backBtn").onclick = () => {
    show("menu");
  };

  renderShop();
}

/* SHOP */
const shopData = [
  { img: "assets/dot.png", price: "assets/price-100.png" },
  { img: "assets/z.png", price: "assets/price-300.png" },
  { img: "assets/t.png", price: "assets/price-500.png" },
  { img: "assets/L.png", price: "assets/price-500.png" },
  { img: "assets/I.png", price: "assets/price-700.png" },
  { img: "assets/square.png", price: "assets/price-900.png" }
];

function renderShop() {
  const container = document.getElementById("shopItems");
  container.innerHTML = "";

  shopData.forEach(item => {
    const div = document.createElement("div");
    div.className = "shop-item";

    div.innerHTML = `
      <img src="${item.img}" class="shop-icon">
      <img src="${item.price}" class="price-btn">
    `;

    container.appendChild(div);
  });
}

/* SIMPLE GAMEPLAY */
let canvas, ctx, player, obstacles;

function startGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  player = { x: canvas.width / 2, y: canvas.height - 100, r: 20 };
  obstacles = [];

  canvas.onclick = () => {
    player.x = Math.random() * canvas.width;
  };

  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // player
  ctx.fillStyle = "lime";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
  ctx.fill();

  // spawn obstacles
  if (Math.random() < 0.03) {
    obstacles.push({
      x: Math.random() * canvas.width,
      y: 0,
      size: 30
    });
  }

  // draw obstacles
  ctx.fillStyle = "red";
  obstacles.forEach(o => {
    o.y += 5;
    ctx.fillRect(o.x, o.y, o.size, o.size);

    // collision
    if (
      o.x < player.x + player.r &&
      o.x + o.size > player.x - player.r &&
      o.y < player.y + player.r &&
      o.y + o.size > player.y - player.r
    ) {
      alert("Game Over");
      show("menu");
    }
  });

  requestAnimationFrame(gameLoop);
}
