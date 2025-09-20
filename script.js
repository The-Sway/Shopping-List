const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.getElementById("shopping-list");

function inputLength() {
  return input.value.trim().length;
}

function createDeleteButton() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "delete";
  btn.setAttribute("aria-label", "Delete item");
  return btn;
}

function addDeleteToListItem(li) {
  if (!li.querySelector(".delete")) {
    const btn = createDeleteButton();
    li.appendChild(btn);
  }
  if (!li.hasAttribute("tabindex")) li.setAttribute("tabindex", "0");
  li.classList.add("fade-in");
  window.setTimeout(() => li.classList.remove("fade-in"), 300);
}

function createListElement() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.textContent = text;
  addDeleteToListItem(li);
  ul.appendChild(li);
  input.value = "";
  input.focus();
}

document.querySelectorAll("#shopping-list li").forEach(addDeleteToListItem);
document.querySelectorAll("#shopping-list li").forEach((li) => {
  li.classList.add("fade-in");
  window.setTimeout(() => li.classList.remove("fade-in"), 300);
});

function animateAndRemove(li) {
  const startHeight = li.getBoundingClientRect().height;
  li.style.height = startHeight + "px";
  li.offsetHeight;
  li.style.transition = "height 180ms ease, opacity 180ms ease, margin 180ms ease";
  li.style.height = "0px";
  li.style.opacity = "0";
  li.style.margin = "0";
  window.setTimeout(() => li.remove(), 200);
}

ul.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete")) {
    const li = target.closest("li");
    if (li) animateAndRemove(li);
    return;
  }
  const li = target.closest("li");
  if (li && ul.contains(li)) li.classList.toggle("done");
});

ul.addEventListener("keydown", (event) => {
  const li = event.target.closest && event.target.closest("li");
  if (!li || !ul.contains(li)) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    li.classList.toggle("done");
  }
});

button.addEventListener("click", () => {
  if (inputLength() > 0) createListElement();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && inputLength() > 0) {
    createListElement();
  }
});
