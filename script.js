const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const readStatus = document.querySelector("#read-status")

const myLibrary = [];

function Book(title, author, pages, status) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.status = status;
}

