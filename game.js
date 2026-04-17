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

/* ===== SHOP ===== */

let coins = 500;

const shopData = [
  { icon: "💰", amount: 1000, price: 180 },
  { icon: "🧰", amount: 5000, price: 700 },
  { icon: "💎", amount: 1200, price: 1200 }
];

function renderShop() {
  const container = document.getElementById("shopItems");
  container.innerHTML = "";

  shopData.forEach(item => {
    const div = document.createElement("div");
    div.className = "shop-item";

    div.innerHTML = `
      <div class="shop-icon">${item.icon}</div>
      <div class="shop-text">+${item.amount}</div>
      <div class="buy-btn" onclick="buy(${item.price})">🪙 ${item.price}</div>
    `;

    container.appendChild(div);
  });
}

function buy(price) {
  coins += price;
  alert("Coins: " + coins);
}