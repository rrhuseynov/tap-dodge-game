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

/* SHOP */

let coins = 500;

const shopData = [
  {
    img: "assets/bag.png",
    amount: 1000,
    price: 180
  },
  {
    img: "assets/chest.png",
    amount: 5000,
    price: 700
  },
  {
    img: "assets/chest_gems.png",
    amount: 1200,
    price: 1200
  }
];

function renderShop() {
  const container = document.getElementById("shopItems");
  container.innerHTML = "";

  shopData.forEach(item => {
    const div = document.createElement("div");
    div.className = "shop-item";

    div.innerHTML = `
      <img src="${item.img}" class="shop-icon">
      <div class="shop-text">+${item.amount}</div>

      <img src="assets/price_btn.png" class="price-btn">
      <img src="assets/coin.png" class="coin-icon">
      <div class="price-text">${item.price}</div>
    `;

    container.appendChild(div);
  });
}