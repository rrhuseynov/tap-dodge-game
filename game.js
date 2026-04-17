(function () {
  function $(id){ return document.getElementById(id); }

  function show(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = $(id);
    if (el) el.classList.add('active');
  }

  // безопасный старт
  window.addEventListener('load', function () {
    setTimeout(function(){
      try { show('menu'); } catch(e){ console.log(e); }
      try { renderShop(); } catch(e){ console.log(e); }
      bindMenu();
    }, 600);
  });

  function bindMenu(){
    const s = $('btnStart');
    const sh = $('btnShop');
    const back = $('backBtn');

    if (s) s.onclick = function(){ show('game'); };
    if (sh) sh.onclick = function(){ show('shop'); };
    if (back) back.onclick = function(){ show('menu'); };
  }

  // --- SHOP DATA под твои JPG ---
  const shopData = [
    { img: "assets/bag.jpg",        amount: 1000, price: 180 },
    { img: "assets/chest.jpg",      amount: 5000, price: 700 },
    { img: "assets/chest_gems.jpg", amount: 1200, price: 1200 }
  ];

  function renderShop(){
    const c = $('shopItems');
    if (!c) return;
    c.innerHTML = '';

    shopData.forEach(function(item){
      const d = document.createElement('div');
      d.className = 'shop-item';

      d.innerHTML = `
        <img src="${item.img}" class="shop-icon" onerror="this.style.display='none'">
        <div class="shop-text">+${item.amount}</div>

        <img src="assets/price_btn.jpg" class="price-btn" onerror="this.style.display='none'">
        <img src="assets/coin.jpg" class="coin-icon" onerror="this.style.display='none'">
        <div class="price-text">${item.price}</div>
      `;

      c.appendChild(d);
    });
  }
})();