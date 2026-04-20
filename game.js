// game.js

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = ()=>{
  setTimeout(()=>{
    show("menu");
    init();
  },700);
};

function init(){

  startBtn.onclick = ()=>{
    show("game");
    startGame();
  };

  shopBtn.onclick = ()=> show("shop");
  appearanceBtn.onclick = ()=> alert("Soon");
  leaderboardBtn.onclick = ()=> alert("Soon");
  backBtn.onclick = ()=> show("menu");
}

/* GAME */

let canvas,ctx,player,blocks,gameOver;

function startGame(){

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  player = {x:canvas.width/2,y:canvas.height-120,r:25};
  blocks = [];
  gameOver = false;

  canvas.onclick = (e)=>{
    player.x = e.clientX;
  };

  loop();
}

function loop(){

  if(gameOver) return;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // player
  ctx.fillStyle="lime";
  ctx.beginPath();
  ctx.arc(player.x,player.y,player.r,0,Math.PI*2);
  ctx.fill();

  // spawn
  if(Math.random()<0.03){
    blocks.push({
      x:Math.random()*canvas.width,
      y:-50,
      size:40
    });
  }

  ctx.fillStyle="red";

  blocks.forEach(b=>{
    b.y+=5;
    ctx.fillRect(b.x,b.y,b.size,b.size);

    // collision
    if(
      b.x < player.x + player.r &&
      b.x + b.size > player.x - player.r &&
      b.y < player.y + player.r &&
      b.y + b.size > player.y - player.r
    ){
      endGame();
    }
  });

  requestAnimationFrame(loop);
}

function endGame(){
  gameOver = true;

  setTimeout(()=>{
    const again = confirm("Game Over\nRestart?");
    if(again){
      startGame();
    } else {
      show("menu");
    }
  },100);
}
