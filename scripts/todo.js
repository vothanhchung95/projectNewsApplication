"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const todoContainer = document.getElementById("todo-container");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
let inputTask = document.getElementById("input-task");

// Hàm lưu data vào localStorage
const key = "key";
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Hàm lấy data localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// Lấy data từ local Storage
let currentUser = JSON.parse(getFromStorage("currentUser"));
if (currentUser === null) currentUser = [];
console.log(currentUser);

let userArrStorage = JSON.parse(getFromStorage("key"));
if (userArrStorage === null) userArrStorage = [];
let userArr = userArrStorage;
console.log(userArrStorage);

let todoArr = JSON.parse(localStorage.getItem("todo")) || [];

// Thêm sự kiện click cho nút Add
btnAdd.addEventListener("click", function () {
  // Lưu dữ liệu được nhập vào object todo:
  let todo = {
    task: inputTask.value,
    owner: currentUser.username,
    checked: false,
  };

  // Thêm điều kiện và hiện thông báo khi nhấn submit
  if (todo !== "") {
    let todoTask = new TodoTask(todo.task, todo.owner, todo.checked);
    todoArr.push(todoTask);
    console.log(todoArr);
    inputTask.value = "";
    addTodos();
  } else {
    // Hiện thông báo khi nhấn Add nhưng dữ liệu không được nhập
    alert("Please input Task");
  }
  saveToStorage("todo", JSON.stringify(todoArr)); // Lưu todoArr vào localStorage
});

console.log(todoArr); //kiểm tra todoArr

// Gọi hàm addTodos
addTodos();

// Khai báo hàm addTodos, hàm khởi tạo danh sách to do
function addTodos() {
  todoList.innerHTML = "";

  for (let i = 0; i < todoArr.length; i++) {
    // Kiểm tra và lựa chọn task của người dùng hiện tại:
    if (currentUser.username === todoArr[i].owner) {
      // Khởi tạo danh sách todo của người dùng hiện tại:
      let li = document.createElement("li");
      li.innerHTML = `${todoArr[i].task}`;
      let span = document.createElement("span");
      span.classList.add("close");

      // Thêm sự kiện xóa task todo
      span.addEventListener("click", function (e) {
        removeTask(e, i);
      });
      span.innerHTML = "x";
      li.appendChild(span);

      // Thêm sự kiện hoàn thành cho task todo
      if (todoArr[i].checked) li.classList.add("checked");
      todoList.appendChild(li);
      li.addEventListener("click", () => {
        isDone(i);
        location.reload();
      });
    }
  }
}

// Khai báo hàm isDone
function isDone(index) {
  let tasks = todoArr[index];
  tasks.checked = true;

  // Lưu todoArr vào localStorage
  saveToStorage("todo", JSON.stringify(todoArr));
}

// Khai báo hàm removeTask
function removeTask(e, index) {
  e.stopPropagation();
  todoArr.splice(index, 1);
  addTodos(todoArr);

  // Lưu todoArr vào localStorage
  saveToStorage("todo", JSON.stringify(todoArr));
}
