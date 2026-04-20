const menu = document.getElementById("menu");
const game = document.getElementById("game");
const shop = document.getElementById("shop");

const startBtn = document.getElementById("startBtn");
const shopBtn = document.getElementById("shopBtn");
const backBtn = document.getElementById("backBtn");

function showScreen(screen) {
    menu.classList.remove("active");
    game.classList.remove("active");
    shop.classList.remove("active");
    screen.classList.add("active");
}

// КНОПКИ
startBtn.onclick = () => {
    showScreen(game);
    startGame();
};

shopBtn.onclick = () => showScreen(shop);
backBtn.onclick = () => showScreen(menu);

// ===== GAME =====
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 280;
canvas.height = 460;

let ball = {
    x: 140,
    y: 420,
    size: 40
};

let lines = [];
let speed = 3;

// ЗАГРУЗКА КАРТИНОК
const ballImg = new Image();
ballImg.src = "assets/ball.png";

const lineImg = new Image();
lineImg.src = "assets/line.png";

// УПРАВЛЕНИЕ
canvas.addEventListener("touchmove", (e) => {
    const rect = canvas.getBoundingClientRect();
    ball.x = e.touches[0].clientX - rect.left;
});

// СОЗДАНИЕ ЛИНИЙ
function spawnLine() {
    lines.push({
        x: Math.random() * (canvas.width - 120),
        y: -20,
        width: 120,
        height: 20
    });
}

// СТОЛКНОВЕНИЕ
function isColliding(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.size > b.x &&
           a.y < b.y + b.height &&
           a.y + a.size > b.y;
}

// ИГРА
function startGame() {
    lines = [];
    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // линии
    if (Math.random() < 0.03) spawnLine();

    lines.forEach((line, i) => {
        line.y += speed;

        ctx.drawImage(lineImg, line.x, line.y, line.width, line.height);

        if (isColliding(ball, line)) {
            alert("Game Over");
            showScreen(menu);
            return;
        }

        if (line.y > canvas.height) {
            lines.splice(i, 1);
        }
    });

    // шар
    ctx.drawImage(ballImg, ball.x, ball.y, ball.size, ball.size);

    requestAnimationFrame(gameLoop);
}
