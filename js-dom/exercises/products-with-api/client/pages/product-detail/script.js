const BASE_URL = "http://localhost:3000/api";

const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get("id");
const nameElement = document.getElementById("name");
const priceElement = document.getElementById("price");
const imgElement = document.getElementById("img");
const categoryElement = document.getElementById("category");
const loadingOverlayElement = document.querySelector(".loading-overlay");

async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const product = await response.json();

  if (response.status === 200) {
    nameElement.textContent = product.name;
    priceElement.textContent = product.price;
    imgElement.src = product.imageUrl;
    categoryElement.textContent = product.category;
    loadingOverlayElement.style.display = "none";
  } else {
    window.location.href = "../home/index.html";
  }
}

getProduct(productId);
