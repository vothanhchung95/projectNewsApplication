"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logoutBtn = document.getElementById("btn-logout");
const welcomeMessage = document.getElementById("welcome-message");

// Hàm lưu data vào localStorage
const key = "key";
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
// Hàm lấy data localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// Lấy data người dùng đăng nhập từ local Storage
let currentUser = JSON.parse(getFromStorage("currentUser"));

// Kiểm tra và hiển thị trang theo trạng thái đăng nhập
if (currentUser === null) {
  mainContent.style.display = "none";
} else {
  loginModal.style.display = "none";
  welcomeMessage.innerHTML = `Welcome ${currentUser.firstName}`;
}

// Thêm sự kiện khi click vào nút Logout
logoutBtn.addEventListener("click", function () {
  // remove người dùng hiện tại khỏi localStorage
  localStorage.removeItem("currentUser");
  // Chuyển hướng đến trang login
  window.location.assign("../pages/login.html");
});

console.log(currentUser); //check currentUser
