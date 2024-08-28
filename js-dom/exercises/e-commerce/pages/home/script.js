const tableContent = document.querySelector(".table-content");
const cartLengthElement = document.querySelector("#cart-length");

function fillTable() {
  products.forEach((product) => {
    const rowElement = document.createElement("div");
    rowElement.className = "table-row";
    rowElement.innerHTML = `
      <div class="table-data">${product.id}</div>
      <div class="table-data">${product.title}</div>
      <div class="table-data">${product.price}</div>
      <div class="table-data">${product.description}</div>
      <div class="table-data">
        <a href="../product-detail/index.html?id=${product.id}">Detail</a>
        <img width="30" src="../../assets/icons/add-to-cart.svg" alt="Add to cart" />
      </div>
    `;

    rowElement
      .querySelector("img")
      .addEventListener("click", () => addToCart(product));

    tableContent.append(rowElement);
  });
}

function addToCart(product) {
  const cart = getCartItems();
  const existCartItemIdx = cart.findIndex((ci) => ci.product.id === product.id);

  if (existCartItemIdx === -1) {
    const cartItem = {
      count: 1,
      product,
    };
    cart.push(cartItem);
  } else {
    cart[existCartItemIdx].count++;
  }

  setCart(cart);
}

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) ?? [];
}
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  countCartItems();
}
function countCartItems() {
  // const count = getCartItems().length;
  const count = getCartItems().reduce((prev, val) => prev + val.count, 0);
  const hasAnyItem = count > 0;
  cartLengthElement.style.display = hasAnyItem ? "flex" : "none";
  cartLengthElement.textContent = hasAnyItem ? count : 0;
}

countCartItems();
fillTable();
