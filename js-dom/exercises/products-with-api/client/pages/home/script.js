const BASE_URL = "http://localhost:3000/api";
const productTableBodyElement = document.querySelector("table tbody");
const productCreateForm = document.querySelector("form");

async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const products = await response.json();
    return products ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
async function fillTable() {
  const products = await getProducts();

  console.log(products);
  products.forEach((product) => {
    createProductRow(product);
  });
}

function createProductRow(product) {
  const rowElement = document.createElement("tr");
  rowElement.innerHTML = `
      <td><span class="status ${product.inStock && "active"}"></span></td>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
    `;
  productTableBodyElement.append(rowElement);
}

fillTable();

productCreateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = productCreateForm.querySelector("input[name=name]").value;
  const price =
    productCreateForm.querySelector("input[name=price]").valueAsNumber;
  const category = productCreateForm.querySelector(
    "input[name=category]"
  ).value;
  const imageUrl = productCreateForm.querySelector("input[name=imgUrl]").value;
  const inStock = productCreateForm.querySelector(
    "input[name=inStock]"
  ).checked;

  const newProduct = {
    name,
    price,
    category,
    imageUrl,
    inStock,
  };

  // const headers = new Headers();
  // headers.append("Content-type", "application/json");

  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 201) {
    const product = await response.json();
    createProductRow(product);
    resetFormFields();
  }
});

function resetFormFields() {
  productCreateForm.querySelector("input[name=name]").value = "";
  productCreateForm.querySelector("input[name=price]").value = "";
  productCreateForm.querySelector("input[name=category]").value = "";
  productCreateForm.querySelector("input[name=imgUrl]").value = "";
  productCreateForm.querySelector("input[name=inStock]").checked = false;
}
