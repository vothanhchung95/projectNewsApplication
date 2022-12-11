"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
let newsPerPage = document.getElementById("input-page-size");
let newsCategory = document.getElementById("input-category");
let btnSubmit = document.getElementById("btn-submit");

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
if (currentUser === null) currentUser = [];
console.log(currentUser);

// Thêm sự kiện click vào nút submit
btnSubmit.addEventListener("click", () => {
  // Ghi dữ liệu vào currentUser
  currentUser.newsCategory = newsCategory.value;
  currentUser.newsPerPage = newsPerPage.value;
  newsPerPage.value = "";
  newsCategory.value = "";
  console.log(currentUser);
  // Lưu dữ liệu currentUser vào localStorage
  saveToStorage("currentUser", JSON.stringify(currentUser));
});
