const containerElement = document.querySelector(".container");
const searchParams = new URLSearchParams(window.location.search);

const id = +searchParams.get("id");

const product = products.find((p) => p.id === id);

if (!product) {
  window.location.href = "../home/index.html";
}

containerElement.textContent = JSON.stringify(product);
