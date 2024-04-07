window.onload = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (task) {
    let li = document.createElement("li");
    li.className = "listItem";
    let p = document.createElement("p");
    p.textContent = task.text;
    if (task.completed) {
      p.classList.add("completed");
    }
    li.appendChild(p);
    let checkButton = document.createElement("button");
    checkButton.className = "markCompleteButton";
    checkButton.addEventListener("click", function () {
      markComplete(checkButton);
    });
    let checkIcon = document.createElement("img");
    checkIcon.src = "./assets/check.svg";
    checkButton.appendChild(checkIcon);
    li.appendChild(checkButton);
    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteItemButton";
    deleteButton.addEventListener("click", function () {
      deleteItem(deleteButton);
    });
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "./assets/delete.svg";
    deleteButton.appendChild(deleteIcon);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
};

let ul = document.getElementById("unorderedList");
let inputBox = document.getElementById("addItemInputTextBox");
let inputText;
function addItem() {
  inputText = inputBox.value;
  if (inputText === "") {
    alert("Please enter a value");
  } else {
    let li = document.createElement("li");
    li.classList.add("listItem");
    let newP = document.createElement("p");
    newP.textContent = inputText;
    let checkButton = document.createElement("button");
    checkButton.classList.add("markCompleteButton");
    checkButton.addEventListener("click", function () {
      markComplete(checkButton);
    });
    let checkIcon = document.createElement("img");
    checkIcon.src = "./assets/check.svg";
    checkButton.appendChild(checkIcon);
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteItemButton");
    deleteButton.addEventListener("click", function () {
      deleteItem(deleteButton);
    });
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "./assets/delete.svg";
    deleteButton.appendChild(deleteIcon);
    li.appendChild(newP);
    li.appendChild(checkButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    inputBox.value = "";
    saveTasks();
  }
}
function saveTasks() {
  let tasks = Array.from(document.querySelectorAll(".listItem")).map((li) => {
    let pElement = li.querySelector("p");
    return {
      text: pElement.textContent,
      completed: pElement.classList.contains("completed"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function markComplete(button) {
  let listItem = button.parentElement;
  let pElement = Array.from(listItem.children).find((child) => child.tagName === "P");
  if (pElement) {
    pElement.classList.toggle("completed");
  }
  saveTasks();
}
function deleteItem(button) {
  let listItem = button.parentElement;
  listItem.remove();
  saveTasks();
}
