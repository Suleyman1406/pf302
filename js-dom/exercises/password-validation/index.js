const passwordWrapper = document.getElementById("password-wrapper");
const paswordInput = passwordWrapper.querySelector("input");
const passwordHintBox = passwordWrapper.querySelector(".hint-box");
const passwordHints = passwordHintBox.children;

paswordInput.addEventListener("focus", () => {
  passwordHintBox.classList.add("active");
});
paswordInput.addEventListener("blur", () => {
  passwordHintBox.classList.remove("active");
});

paswordInput.addEventListener("keyup", (e) => {
  const value = e.target.value.trim();

  passwordHints[0].className = value.length > 7 ? "success" : "";
  passwordHints[1].className = /[A-Z]/.test(value) ? "success" : "";
  passwordHints[2].className = /[a-z]/.test(value) ? "success" : "";
  passwordHints[3].className = /[@\*!_\-$#%^\.]/.test(value) ? "success" : "";
  passwordHints[4].className = /[0-9]/.test(value) ? "success" : "";
});
