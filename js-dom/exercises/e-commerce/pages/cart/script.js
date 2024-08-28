const tableContent = document.querySelector(".table-content");

function fillTable() {
  const cart = getCartItems();
  cart.forEach((cartItem) => {
    const { product, count } = cartItem;
    const rowElement = document.createElement("div");
    rowElement.className = "table-row";
    rowElement.innerHTML = `
      <div class="table-data">${product.id}</div>
      <div class="table-data">${product.title}</div>
      <div class="table-data">${product.price}</div>
      <div class="table-data">${product.description}</div>
      <div class="table-data count">${count}</div>
      <div class="table-data">
        <button class="increase">+</button>
        <button class="decrease">-</button>
        <img width="20" src="../../assets/icons/remove-from-cart.svg" alt="Remove from cart" />
      </div>
    `;
    const countElement = rowElement.querySelector(".count");
    rowElement.querySelector(".increase").addEventListener("click", () => {
      const newCount = changeCartItemCount(product, 1);
      countElement.textContent = newCount;
    });
    rowElement.querySelector(".decrease").addEventListener("click", () => {
      const newCount = changeCartItemCount(product, -1);
      countElement.textContent = newCount;
      if (newCount < 1) rowElement.remove();
    });

    rowElement.querySelector("img").addEventListener("click", () => {
      removeFromCart(product);
      rowElement.remove();
    });
    tableContent.append(rowElement);
  });
}

function changeCartItemCount(product, value) {
  const cart = getCartItems();
  const cartItemIdx = cart.findIndex((ci) => ci.product.id === product.id);
  if (cartItemIdx === -1) return;
  cart[cartItemIdx].count += value;
  const count = cart[cartItemIdx].count;
  if (count < 1) {
    cart.splice(cartItemIdx, 1);
  }
  setCart(cart);
  return count;
}

function removeFromCart(product) {
  const cart = getCartItems();
  const cartItemIdx = cart.findIndex((ci) => ci.product.id === product.id);
  if (cartItemIdx !== -1) {
    cart.splice(cartItemIdx, 1);
    setCart(cart);
  }
}

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) ?? [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

fillTable();
