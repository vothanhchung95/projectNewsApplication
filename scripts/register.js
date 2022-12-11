"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const passwordConfirm = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

// Lấy data người dùng từ local Storage
let userArrStorage = JSON.parse(getFromStorage("key"));
if (userArrStorage === null) userArrStorage = [];
let userArr = userArrStorage;

// Hàm lưu data vào localStorage
const key = "key";
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
// Hàm lấy data localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// Thêm sự kiện click vào nút submit
submitBtn.addEventListener("click", function () {
  // Ghi dữ liệu vào dataUser
  const dataUser = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
    newsPerPage: "6",
    newsCategory: "Technology",
  };
  console.log(dataUser); // test

  // Validate dữ liệu được nhập
  const validate = validateData(dataUser);
  if (validate) {
    // Khởi tạo user mới với các dữ liệu hợp lệ
    let user = new User(
      dataUser.firstName,
      dataUser.lastName,
      dataUser.username,
      dataUser.password
    );
    console.log(user); //check user
    // Thêm user vào userArr và lưu vào localStorage
    userArr.push(user);
    saveToStorage("key", JSON.stringify(userArr));
    // Chuyển hướng trang tới login.html
    window.location.href = "../pages/login.html";
  }
  console.log(userArr);
});

// Khai báo hàm validateData
function validateData(inputData) {
  console.log(inputData);
  const keys = Object.keys(inputData);
  // Kiểm tra và tạo thông báo khi không nhập liệu vào các ô
  for (let i = 0; i < keys.length; i++) {
    if (inputData[keys[i]] === "") {
      alert(`Please input for ${keys[i].toUpperCase()}`);
      return false;
    }
  }
  // Kiểm tra và tạo thông báo khi nhập liệu trùng username
  for (let i = 0; i < userArr.length; i++) {
    if (inputData.username === userArr[i].username) {
      alert("Username must be unique!");
      return false;
    }
  }

  // Kiểm tra và tạo thông báo khi nhập liệu password
  if (inputData.password.length < 8) {
    alert("Password length must be atleast 8 characters");
    return false;
  }

  if (password.value !== passwordConfirm.value) {
    alert("Password do not match");
    return false;
  }
  return true;
}
console.log(userArr); //check userArr
