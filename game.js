// SCREENS
const menu = document.getElementById("menu");
const game = document.getElementById("game");

// BUTTONS
const startBtn = document.getElementById("startBtn");
const shopBtn = document.getElementById("shopBtn");
const appearanceBtn = document.getElementById("appearanceBtn");
const leaderboardBtn = document.getElementById("leaderboardBtn");

// CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 280;
canvas.height = 460;

// ASSETS
const ballImg = new Image();
ballImg.src = "assets/ball.png";

const lineImg = new Image();
lineImg.src = "assets/line.png";

// PLAYER
let player = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    radius: 12
};

// PLATFORMS
let lines = [];

// START GAME
startBtn.onclick = () => {
    menu.classList.remove("active");
    game.classList.add("active");
    startGame();
};

// OTHER BUTTONS
shopBtn.onclick = () => alert("Shop soon");
appearanceBtn.onclick = () => alert("Appearance soon");
leaderboardBtn.onclick = () => alert("Leaderboard soon");

// SPAWN LINES
function spawnLine() {
    lines.push({
        x: Math.random() * (canvas.width - 100),
        y: -20,
        width: 100,
        height: 12
    });
}

// DRAW PLAYER
function drawPlayer() {
    ctx.drawImage(
        ballImg,
        player.x - player.radius,
        player.y - player.radius,
        player.radius * 2,
        player.radius * 2
    );
}

// DRAW LINE (PNG)
function drawLine(l) {
    ctx.drawImage(lineImg, l.x, l.y, l.width, l.height);
}

// UPDATE LOOP
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();

    for (let l of lines) {
        l.y += 3;
        drawLine(l);

        // COLLISION
        if (
            player.y + player.radius > l.y &&
            player.y - player.radius < l.y + l.height &&
            player.x > l.x &&
            player.x < l.x + l.width
        ) {
            gameOver();
            return;
        }
    }

    requestAnimationFrame(update);
}

// START
function startGame() {
    lines = [];

    setInterval(spawnLine, 1200);

    update();
}

// TOUCH MOVE
document.addEventListener("touchmove", (e) => {
    let rect = canvas.getBoundingClientRect();
    player.x = e.touches[0].clientX - rect.left;
});

// GAME OVER
function gameOver() {
    alert("Game Over");
    location.reload();
}
