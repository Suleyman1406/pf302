// fetch("https://northwind.vercel.app/api/products")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

const tableContentElement = document.querySelector(".table-content");

async function getProducts() {
  try {
    const response = await fetch("https://northwind.vercel.app/api/products");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function fillTable() {
  const products = await getProducts();
  console.log(products);
  products.forEach((product) => {
    const rowElement = document.createElement("div");
    rowElement.className = "table-row";
    rowElement.innerHTML = `
      <div class="table-data">${product.id}</div>
      <div class="table-data">${product.name}</div>
      <div class="table-data">${product.quantityPerUnit}</div>
      <div class="table-data">${product.unitPrice}</div>
      <div class="table-data">${product.supplier?.companyName ?? "-"}</div>
      <div class="table-data"><button>X</button></div>
    `;
    const deleteBtnElement = rowElement.querySelector("button");
    deleteBtnElement.addEventListener("click", async () => {
      if (!confirm("Are you sure to delete this awesome product?")) return;
      deleteBtnElement.disabled = true;
      const isSuccess = await deleteProduct(product.id);
      if (isSuccess) rowElement.remove();
      deleteBtnElement.disabled = false;
    });
    tableContentElement.append(rowElement);
  });
}

async function deleteProduct(id) {
  await sleep(2000);
  const response = await fetch(
    `https://northwind.vercel.app/api/products/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.status === 200;
}

async function sleep(ms = 1000) {
  return new Promise((res) => {
    setTimeout(() => res(), ms);
  });
}

fillTable();
