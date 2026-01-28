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
const cardContainer = document.querySelector(".card-container");

const myLibrary = [
   {
      title: "The Jungle Book",
      author: "Rudyard Kipling",
      pages: 130,
      status: true,
   },
   {
      title: "The Odyssey",
      author: "Homer",
      pages: 488,
      status: false,
   },
];

class Book {
   constructor(title, author, pages, status) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
   }
}

function addBookToLibrary(book) {
   let uuid = crypto.randomUUID();
   book.id = uuid;
   myLibrary.push(book);
}

function createBookCard(book) {
   let bookCard = document.createElement("div");
   let bookTitle = document.createElement("h2");
   let authorName = document.createElement("p");
   let pageCount = document.createElement("p");
   let readingStatus = document.createElement("p");
   let changeStatusBtn = document.createElement("button");
   let deleteBtn = document.createElement("button");

   bookTitle.textContent = `${book.title}`;
   authorName.textContent = `Author: ${book.author}`;
   pageCount.textContent = `Pages: ${book.pages}`;
   if (book.status === true) {
      readingStatus.textContent = `Status: "Yes, read it"`;
      changeStatusBtn.textContent = "Unread";
      changeStatusBtn.style.backgroundColor = "#A4031F";
   } else {
      readingStatus.textContent = `Status: "Not read yet"`;
      changeStatusBtn.textContent = "Read";
      changeStatusBtn.style.backgroundColor = "#007468ff";
   }
   deleteBtn.textContent = "Delete";

   bookCard.setAttribute("data-id", `${book.id}`);
   bookCard.setAttribute("class", "book-card");
   deleteBtn.setAttribute("class", "deleteBtn");
   deleteBtn.setAttribute("data-id", `${book.id}`);

   bookCard.append(bookTitle, authorName, pageCount, readingStatus, changeStatusBtn, deleteBtn);
   cardContainer.append(bookCard);

   changeStatusBtn.addEventListener("click", () => {
      if (changeStatusBtn.textContent === "Read") {
         readingStatus.textContent = `Status: "Yes, read it"`;
         changeStatusBtn.textContent = "Unread";
         changeStatusBtn.style.backgroundColor = "#A4031F";
      } else {
         changeStatusBtn.textContent = "Read";
         readingStatus.textContent = `Status: "Not read yet"`;
         changeStatusBtn.style.backgroundColor = "#007468ff";
      }
   })

   deleteBtn.addEventListener("click", (e) => {
      deleteBook(e.target.dataset.id);
   })
}

function listAllBooks() {
   myLibrary.map(book => {
      book.id = crypto.randomUUID();
      createBookCard(book);
   })
}

listAllBooks();


function deleteBook(id) {
   let bookIndex = myLibrary.findIndex(book => book.id === id)
   myLibrary.splice(bookIndex, 1);
   cardContainer.innerHTML = "";
   listAllBooks();
}

addBookBtn.addEventListener("click", () => {
   formValidator.reset();
   dialog.showModal();
});

closeBtn.addEventListener("click", () => {
   dialog.close()
})

form.addEventListener("submit", e => {
   e.preventDefault();

   if (!form.checkValidity()) return;

   const newBook = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readStatus.checked
   );

   addBookToLibrary(newBook);
   createBookCard(newBook);
   dialog.close();
});


function setupFormValidation(form) {
   const inputs = form.querySelectorAll("input");

   function validateInput(input) {
      const errorEl = input.parentElement.querySelector(".error-message");

      if(input.validity.valid) {
         errorEl.textContent = "";
         return true;
      }

      if(!input.classList.contains("touched")) {
         return false;
      }

      if(input.validity.valueMissing) {
         errorEl.textContent = "This field is required";
      } else if (input.validity.typeMismatch) {
         errorEl.textContent = "Invalid value";
      } else if (input.validity.rangeUnderflow) {
         errorEl.textContent = "Value must be greater than 1";
      }

      return false;
   }

   inputs.forEach((input) => {
      input.addEventListener("blur", () => {
         input.classList.add("touched");
         validateInput(input);
      })

      input.addEventListener("input", () => {
         if(input.classList.contains("touched")) {
            validateInput(input);
         }
      })
   })


   form.addEventListener("submit", (e) => {
      let isFormValid = true;

      inputs.forEach((input) => {
         input.classList.add("touched");
         if (!validateInput(input)) {
            isFormValid = false;
         }
      })

      if (!isFormValid) {
         e.preventDefault();
      }
   })

   return {
      reset() {
         inputs.forEach((input) => {
            input.classList.remove("touched");
            input.setCustomValidity("");
            const errorEl = input.parentElement.querySelector(".error-message");
            if(errorEl) errorEl.textContent = "";
         })
         form.reset();
      }
   }
}

const formValidator = setupFormValidation(form);


