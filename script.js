const bookContainer = document.querySelector(".book-container");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const readStatus = document.querySelector("#read-status")
const form = document.querySelector(".form");

const myLibrary = [];

function Book(title, author, pages, status) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.status = status;
}

function addBookToLibrary(book) {
   let uuid = crypto.randomUUID();
   book.id = uuid;
   myLibrary.push(book);
   console.log(myLibrary);
}

function createBookCard() {
   let bookCard = document.createElement("div");
   let bookTitle = document.createElement("h2");
   let authorName = document.createElement("p");
   let pageCount = document.createElement("p");
   let readingStatus = document.createElement("p");
   let changeStatusBtn = document.createElement("button");
   let deleteBtn = document.createElement("button");

   bookTitle.textContent = "The Odyssey";
   authorName.textContent = "author: Homer";
   pageCount.textContent = "pages: 448";
   readingStatus.textContent = "status: Not read yet";
   changeStatusBtn.textContent = "Read";
   deleteBtn.textContent = "Delete";

   bookCard.setAttribute("class", "book-card");
   deleteBtn.setAttribute("class", "deleteBtn");

   bookCard.append(bookTitle, authorName, pageCount, readingStatus, changeStatusBtn, deleteBtn);
   bookContainer.append(bookCard);
   
}

createBookCard();


addBookBtn.addEventListener("click", () => {
   dialog.showModal();
});

closeBtn.addEventListener("click", () => {
   dialog.close()
})

submitBtn.addEventListener("click", (e) => {
   e.preventDefault();
   console.log(titleInput.value);
   console.log(authorInput.value);
   console.log(pagesInput.value);
   console.log(readStatus.checked);

   if(readStatus.checked) {
     const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatus.checked = "Yes, read it");
     addBookToLibrary(newBook);
   } else {
      const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatus.checked = "Not read yet");
      addBookToLibrary(newBook);
   }
   form.reset();
})