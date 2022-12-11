"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
let pageNumber = document.getElementById("page-num");
let prevLink = document.getElementById("btn-prev");
let nextLink = document.getElementById("btn-next");
let page = 1;
let pageSize = 5;
let numPage = 1;
let queryInput = document.getElementById("input-query");
let btnSearch = document.getElementById("btn-submit");
let querySearch = "";

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

console.log(currentUser); //check currentUser

// Thêm sự kiện click cho nút Search
btnSearch.addEventListener("click", function () {
  // Ghi dữ liệu vào querrySearch
  querySearch = queryInput.value;
  getNews();
});

// Xử lý bất đồng bộ hàm getNews và gọi API
async function getNews() {
  let newsapiURL = `https://newsapi.org/v2/top-headlines?q=${querySearch}&country=us&category=${currentUser.newsCategory}&apiKey=c3ac43b0e5c14b7888b41d1db5bc6784&page=${page}&pageSize=${currentUser.newsPerPage}`;
  let newsData = await fetch(newsapiURL).then((res) => res.json());
  console.log(newsData);
  // Tính số trang hiển thị
  numPage = Math.ceil(newsData.totalResults / pageSize);

  // Tạo nội dung các bài viết cho trang tin tức
  newsContainer.innerHTML = "";
  for (let i = 0; i < newsData.articles.length; i++) {
    newsContainer.innerHTML += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${newsData.articles[i].urlToImage}"
            class="card-img"
            alt="${newsData.articles[i].description}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${newsData.articles[i].title}</h5>
            <p class="card-text">${newsData.articles[i].content}</p>
            <a href="${newsData.articles[i].url}"
              class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }

  // Thêm trạng thái active và disabled cho các nút previous và next
  pageNumber.innerHTML = page;
  if (page <= 1) {
    prevLink.classList.remove("active");
    prevLink.classList.add("disabled");
  } else {
    prevLink.classList.remove("disabled");
    prevLink.classList.add("active");
  }

  if (page === numPage) {
    nextLink.classList.remove("active");
    nextLink.classList.add("disabled");
  } else {
    nextLink.classList.remove("disabled");
    nextLink.classList.add("active");
  }
}

// Gọi hàm getNews
getNews();

// Thêm sự kiện click cho nút previous
prevBtn.addEventListener("click", function () {
  if (page > 1) {
    page -= 1;
    getNews();
  }
});

// Thêm sự kiện click cho nút next
nextBtn.addEventListener("click", function () {
  if (page <= numPage) {
    page += 1;
    getNews();
  }
});
