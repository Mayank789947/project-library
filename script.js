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