const buttonElement = document.getElementById("submitBtn");

// buttonElement.addEventListener("click", () => {
//   alert("Birde basma!");
// });

// buttonElement.addEventListener("mouseenter", () => {
//   console.log("mouse entered");
// });
// buttonElement.addEventListener("mouseleave", () => {
//   console.log("mouse left");
// });
// buttonElement.addEventListener("mousemove", (e) => {
//   console.log("mouse move", e);
// });
// buttonElement.addEventListener("mouseover", (e) => {
//   console.log("mouse over");
// });

// window.document.body.addEventListener("mousemove", (e) => {
//   if (e.y < 1) {
//     alert("Nolar cixma!");
//   }
// });

// const inputElement = document.querySelector("input");
// inputElement.style.transition = "1s";

// inputElement.addEventListener("focus", () => {
//   inputElement.style.padding = "10px";
// });
// inputElement.addEventListener("blur", () => {
//   inputElement.style.padding = 0;
// });

// console.log(inputElement.value);
// inputElement.addEventListener("keyup", (e) => {
//   console.log(e.target.value);
// });

const fruitNameInput = document.getElementById("fruitNameInput");
const fruitAddBtn = document.getElementById("fruitAddBtn");
const fruits = document.getElementById("fruits");
const fruitSearchInput = document.getElementById("fruitSearchInput");

fruitAddBtn.addEventListener("click", () => {
  const fruitName = fruitNameInput.value.trim();
  if (!fruitName) {
    alert("Fruit name is required!");
    return;
  }

  const fruitListItemElement = document.createElement("li");

  const fruitNameELement = document.createElement("span");
  fruitNameELement.textContent = fruitName;

  const fruitDeleteBtn = document.createElement("button");
  fruitDeleteBtn.textContent = "x";
  fruitDeleteBtn.className = "delete-btn";

  fruitDeleteBtn.addEventListener("click", () => {
    fruitListItemElement.remove();
  });

  fruitListItemElement.append(fruitNameELement, fruitDeleteBtn);
  fruits.append(fruitListItemElement);
  fruitNameInput.value = "";
});

fruitSearchInput.addEventListener("keyup", (e) => {
  const searchStr = e.target.value;

  Array.from(fruits.children).forEach((fruitLi) => {
    if (
      fruitLi.firstElementChild.textContent
        .toLowerCase()
        .startsWith(searchStr.trim().toLowerCase())
    ) {
      fruitLi.style.display = "list-item";
    } else {
      fruitLi.style.display = "none";
    }
  });
});
