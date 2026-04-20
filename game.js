const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 280;
canvas.height = 460;

/* SCREENS */
const screens = {
    menu: document.getElementById("menu"),
    game: document.getElementById("game"),
    shop: document.getElementById("shop")
};

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
}

/* BUTTONS */
document.getElementById("startBtn").onclick = () => {
    showScreen("game");
    startGame();
};

document.getElementById("shopBtn").onclick = () => showScreen("shop");

document.getElementById("appearanceBtn").onclick = () => alert("Soon");
document.getElementById("leaderboardBtn").onclick = () => alert("Soon");

document.getElementById("backBtn").onclick = () => showScreen("menu");

/* GAME LOGIC */

let ball = { x: 140, y: 400, size: 20, dx: 3 };
let lines = [];
let running = false;

const ballImg = new Image();
ballImg.src = "assets/ball.png";

const lineImg = new Image();
lineImg.src = "assets/line.png";

function startGame() {
    ball.x = 140;
    ball.y = 400;
    lines = [];
    running = true;
}

function spawnLine() {
    const width = 100 + Math.random() * 80;

    lines.push({
        x: Math.random() * (canvas.width - width),
        y: -20,
        width: width,
        height: 12
    });
}

function update() {
    if (!running) return;

    ball.x += ball.dx;

    if (ball.x < 0 || ball.x > canvas.width - ball.size) {
        ball.dx *= -1;
    }

    if (Math.random() < 0.02) spawnLine();

    lines.forEach(line => line.y += 3);

    // collision
    lines.forEach(line => {
        if (
            ball.x < line.x + line.width &&
            ball.x + ball.size > line.x &&
            ball.y < line.y + line.height &&
            ball.y + ball.size > line.y
        ) {
            running = false;
            setTimeout(() => {
                alert("Game Over");
                startGame();
            }, 100);
        }
    });

    lines = lines.filter(l => l.y < canvas.height);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // lines
    lines.forEach(line => {
        ctx.drawImage(lineImg, line.x, line.y, line.width, line.height);
    });

    // ball
    ctx.drawImage(ballImg, ball.x, ball.y, ball.size, ball.size);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
