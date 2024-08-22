const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector(".close-btn");
const modalWrapperElement = document.querySelector(".modal-wrapper");

openModalBtn.addEventListener("click", () => {
  modalWrapperElement.classList.add("open");
});

closeModalBtn.addEventListener("click", () => {
  modalWrapperElement.classList.remove("open");
});

modalWrapperElement.addEventListener("click", () => {
  modalWrapperElement.classList.remove("open");
});

modalWrapperElement.firstElementChild.addEventListener("click", (e) =>
  e.stopPropagation()
);

// const outer = document.getElementById("outer");
// const middle = document.getElementById("middle");
// const inner = document.getElementById("inner");

// outer.addEventListener("click", (e) => {
//   e.stopPropagation();
//   console.log("outer clicked");
// });
// middle.addEventListener("click", () => {
//   console.log("middle clicked");
// });
// inner.addEventListener("click", (e) => {
//   // e.stopPropagation();
//   console.log("inner clicked");
// });

// document.body.addEventListener("click", () => {
//   console.log("body clicked");
// });
