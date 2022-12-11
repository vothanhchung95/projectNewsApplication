"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

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

let userArrStorage = JSON.parse(getFromStorage("key"));
if (userArrStorage === null) userArrStorage = [];
let userArr = userArrStorage;
console.log(userArrStorage); //test

// Thêm sự kiện click cho nút Login
loginBtn.addEventListener("click", function () {
  // Ghi dữ liệu vào inputUser
  const inputUser = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  // Thêm điều kiện và hiện thông báo khi nhấn submit
  if (usernameInput.value === "" && passwordInput.value === "") {
    alert("Please fill out Username and Password");
    return false;
  } else {
    let index = -1;
    for (let i = 0; i < userArr.length; i++) {
      if (
        // Kiểm tra username và password được nhập với username và password đã được đăng ký trước đó
        inputUser.username === userArr[i].username &&
        inputUser.password === userArr[i].password
      ) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      // Khi username và password được nhập trùng với username và password đã được đăng ký
      let currentUser = {
        firstName: userArr[index].firstName,
        lastName: userArr[index].lastName,
        username: userArr[index].username,
        password: userArr[index].password,
        newsPerPage: "6",
        newsCategory: "Technology",
      };
      console.log(currentUser);
      // Lưu username và password hiện tại vào currentUser (người dùng đang đăng nhập)
      saveToStorage("currentUser", JSON.stringify(currentUser));
      // Chuyển tới trang index
      window.location.href = "/index.html";
      return true;
    } else {
      // Khi username và password được nhập không trùng với username và password đã được đăng ký
      alert("Wrong username or password");
      return false;
    }
  }
});

console.log(currentUser); //check currentUser
