const BASE_URL = "http://localhost:3000/api";
const productTableBodyElement = document.querySelector("table tbody");
const productCreateForm = document.querySelector("form");
const productEditForm = document.querySelector(".modal form");
const modalWrapper = document.querySelector(".modal-wrapper");
const loadMoreBtnElement = document.querySelector(".load-more-btn");

const tableSkeletonElement = document.querySelector(".table-skeleton");
const editFormNameField = productEditForm.querySelector("input[name=name]");
const editFormPriceField = productEditForm.querySelector("input[name=price]");
const editFormCategoryField = productEditForm.querySelector(
  "input[name=category]"
);
const editFormImgUrlField = productEditForm.querySelector("input[name=imgUrl]");
const editFormInStockField = productEditForm.querySelector(
  "input[name=inStock]"
);
let editedProduct = null;
const PRODUCT_TAKE_COUNT = 2;

async function getProducts(skip = 0) {
  try {
    const response = await fetch(
      `${BASE_URL}/products?take=${PRODUCT_TAKE_COUNT}&skip=${skip}`
    );
    const data = await response.json();
    const { products, hasMore } = data;
    updateLoadMoreBtn(hasMore);
    return products ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
async function fillTable() {
  const products = await getProducts();
  productTableBodyElement.innerHTML = "";
  products.forEach((product) => {
    createProductRow(product);
  });
  tableSkeletonElement.classList.add("hide");
}

function createProductRow(product) {
  const rowElement = document.createElement("tr");
  generateProductRow(rowElement, product);
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

  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.status === 201) {
    createProductRow(data);
    resetFormFields();
    showToast("Product Created!");
  } else {
    showToast(data.error, "error");
  }
});

function resetFormFields() {
  productCreateForm.querySelector("input[name=name]").value = "";
  productCreateForm.querySelector("input[name=price]").value = "";
  productCreateForm.querySelector("input[name=category]").value = "";
  productCreateForm.querySelector("input[name=imgUrl]").value = "";
  productCreateForm.querySelector("input[name=inStock]").checked = false;
}

modalWrapper.addEventListener("click", closeEditModal);
modalWrapper.firstElementChild.addEventListener("click", (e) =>
  e.stopPropagation()
);

function openEditModal() {
  editFormNameField.value = editedProduct.name;
  editFormPriceField.value = parseInt(editedProduct.price);
  editFormCategoryField.value = editedProduct.category;
  editFormImgUrlField.value = editedProduct.imageUrl;
  editFormInStockField.checked = editedProduct.inStock;
  modalWrapper.classList.add("open");
}

function closeEditModal() {
  editedProduct = null;
  modalWrapper.classList.remove("open");
}

productEditForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = editFormNameField.value;
  const price = editFormPriceField.valueAsNumber;
  const category = editFormCategoryField.value;
  const imageUrl = editFormImgUrlField.value;
  const inStock = editFormInStockField.checked;

  const newProductData = {
    name,
    price,
    category,
    imageUrl,
    inStock,
  };

  const response = await fetch(`${BASE_URL}/products/${editedProduct.id}`, {
    method: "PUT",
    body: JSON.stringify(newProductData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const product = await response.json();

  if (response.status !== 200) {
    showToast(product.error ?? "Something went wrong!", "error");
    return;
  }

  const productRows = Array.from(productTableBodyElement.children);
  const editedRow = productRows.find(
    (pr) => pr.querySelector("td:nth-child(2)").textContent == editedProduct.id
  );

  generateProductRow(editedRow, product);
  showToast("Product Updated!");
  closeEditModal();
});

function handleEdit(product) {
  editedProduct = product;
  openEditModal();
}

function generateProductRow(row, product) {
  row.innerHTML = `
      <td><span class="status ${product.inStock && "active"}"></span></td>
      <td>${product.id}</td>
      <td><a href="../product-detail/index.html?id=${product.id}">${
    product.name
  }</a></td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td><button class="edit-btn">Edit</button></td>
    `;
  row
    .querySelector(".edit-btn")
    .addEventListener("click", () => handleEdit(product));
}

function showToast(text, type = "success", duration = 3000) {
  Toastify({
    text,
    duration,
    style: {
      background: type === "success" ? "green" : "red",
      color: "white",
    },
  }).showToast();
}

function updateLoadMoreBtn(hasMore) {
  loadMoreBtnElement.style.display = hasMore ? "block" : "none";
}

loadMoreBtnElement.addEventListener("click", async () => {
  loadMoreBtnElement.disabled = true;
  const products = await getProducts(productTableBodyElement.children.length);
  products.forEach((product) => {
    createProductRow(product);
  });
  loadMoreBtnElement.disabled = false;
});
