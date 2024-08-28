const todoFormElement = document.getElementById("todo-form");
const todoListElement = document.getElementById("todo-items-list");
const toggleTodosBtnElement = document.getElementById("toggle-all-items");
const todoItemsCount = document.querySelector(".items-count").firstElementChild;
const actionButtons = document.querySelectorAll(".action-btns > button");
const clearCompletedTodosBtnElement = document.querySelector(
  "#clear-completed-items-btn"
);

todoFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.firstElementChild;
  const inputValue = input.value.trim();
  if (!inputValue) return;
  const liElement = document.createElement("li");
  liElement.innerHTML = `
    <div>
      <input type="checkbox">
      <span>${inputValue}</span>
    </div>
    <button>x</button>
  `;

  const buttonElement = liElement.querySelector("button");
  const checkboxElement = liElement.querySelector("input");

  checkboxElement.addEventListener("change", () => syncCount());

  buttonElement.addEventListener("click", () => {
    liElement.remove();
    syncCount();
  });

  todoListElement.append(liElement);
  syncCount();
  actionButtons[0].click();
  input.value = "";
});

toggleTodosBtnElement.addEventListener("click", () => {
  const elements = Array.from(todoListElement.children);
  const isCompleted = elements.every(
    (element) => element.firstElementChild.firstElementChild.checked
  );

  elements.forEach((el) => {
    el.firstElementChild.firstElementChild.checked = !isCompleted;
  });
  syncCount();
});

function syncCount() {
  todoItemsCount.textContent = todoListElement.querySelectorAll(
    "li input:not(:checked)"
  ).length;
}

clearCompletedTodosBtnElement.addEventListener("click", () => {
  todoListElement
    .querySelectorAll("li input:checked")
    .forEach((e) => e.parentElement.parentElement.remove());
  syncCount();
});

const STATE = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2,
};

function showTodosForState(state) {
  updateActionButtons(state);
  const elements = Array.from(todoListElement.children);
  switch (state) {
    case STATE.ALL:
      elements.forEach((el) => (el.style.display = "flex"));
      break;
    case STATE.ACTIVE:
      elements.forEach((el) => {
        const checked = el.firstElementChild.firstElementChild.checked;
        el.style.display = checked ? "none" : "flex";
      });
      break;
    case STATE.COMPLETED:
      elements.forEach((el) => {
        const checked = el.firstElementChild.firstElementChild.checked;
        el.style.display = checked ? "flex" : "none";
      });
      break;
  }
}

actionButtons[0].addEventListener("click", (e) => {
  showTodosForState(STATE.ALL);
});
actionButtons[1].addEventListener("click", () => {
  showTodosForState(STATE.ACTIVE);
});
actionButtons[2].addEventListener("click", () => {
  showTodosForState(STATE.COMPLETED);
});

function updateActionButtons(state) {
  actionButtons.forEach((btn) => btn.classList.remove("active"));
  switch (state) {
    case STATE.ALL:
      actionButtons[0].classList.add("active");
      break;
    case STATE.ACTIVE:
      actionButtons[1].classList.add("active");
      break;
    case STATE.COMPLETED:
      actionButtons[2].classList.add("active");
      break;
  }
}
