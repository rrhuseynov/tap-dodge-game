// game.js

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.addEventListener("load", () => {
  setTimeout(() => {
    show("menu");
    init();
  }, 700);
});

function init() {

  document.getElementById("startBtn").onclick = () => {
    alert("Game next step");
  };

  document.getElementById("shopBtn").onclick = () => {
    show("shop");
  };

  document.getElementById("backBtn").onclick = () => {
    show("menu");
  };

  renderShop();
}

/* SHOP DATA — USING YOUR ASSETS */
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
