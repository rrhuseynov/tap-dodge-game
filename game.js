function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = () => {
  setTimeout(() => {
    show('menu');
    renderShop();
  }, 1200);
};

function goGameStart() {
  show('game_start');
}

function startGameNow() {
  show('game');
}

/* ===== SHOP ===== */

let coins = 500;

const shopData = [
  { coins: 1000, price: 180 },
  { coins: 5000, price: 700 },
  { coins: 1200, price: 1200 }
];

function renderShop() {
  const container = document.getElementById("shopItems");
  container.innerHTML = "";

  shopData.forEach(item => {
    const div = document.createElement("div");
    div.className = "shop-item";

    div.innerHTML = `
      <div>+${item.coins}</div>
      <div class="buy-btn" onclick="buy(${item.price})">🪙 ${item.price}</div>
    `;

    container.appendChild(div);
  });
}

function buy(price) {
  coins += price;
  alert("Coins: " + coins);
}