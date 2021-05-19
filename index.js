let myLibrary = [
  new Book("Harry Poter", "J. K. Rowling", 200, false),
  new Book("The Lord of the Rings", "J. R. R. Tolkien", 500, true),
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(title) {
  myLibrary = myLibrary.filter((b) => b.title !== title);
}

function toggleRead(title) {
  const bookToUpdate = myLibrary.find((b) => b.title === title);
  bookToUpdate.read = !bookToUpdate.read;
}

function createBookCard(book) {
  const newCardTemplate = document.querySelector("#book-card-template");
  const newCard = template(newCardTemplate, {
    ...book,
    read: book.read,
    readText: book.read ? "✓ Read" : "Not read yet",
  });

  const readButton = newCard.querySelector("button[data-read]");
  readButton.addEventListener("click", () => {
    toggleRead(book.title);
    showLibrary();
  });

  const removeButton = newCard.querySelector("button[data-remove]");
  removeButton.addEventListener("click", () => {
    removeBookFromLibrary(book.title);
    showLibrary();
  });

  document.getElementById("books").appendChild(newCard);
}

function showLibrary() {
  document.querySelector("#books").innerHTML = "";
  myLibrary.forEach((book) => createBookCard(book));
}

function showBookForm() {
  const bookFormTemplate = document
    .querySelector("#book-form-template")
    .content.cloneNode(true);
  const newBookForm = bookFormTemplate.querySelector("#book-form");

  document.querySelector(".main .container").prepend(bookFormTemplate);
  document.getElementById("form-close").addEventListener("click", () => {
    newBookForm.remove();
  });

  newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBookForm = document.querySelector("#book-form");
    const data = Object.fromEntries(new FormData(newBookForm).entries());

    myLibrary.push(new Book(data.title, data.author, data.pages, data.read));

    showLibrary();
  });
}

function template(element, data) {
  const parser = new DOMParser();
  const str = element.innerHTML.replaceAll(/{(\w*)}/g, function (m, key) {
    return data[key] || "";
  });
  const doc = parser.parseFromString(str, "text/html");
  return doc.body;
}

const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", () => {
  if (document.querySelectorAll(".main .container #book-form").length === 0) {
    showBookForm();
  }
});

showLibrary();
