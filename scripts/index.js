"use strict"
import handleResize from "./handleResize.js"
import printBook, { printAllBooks } from "../scripts/render.js"
import Book from "../classes/book.js"
import Library from "../classes/library.js"

const form = document.forms.addBook
const myLibrary = new Library()

// EVENT LISTNERS
;["load", "resize"].forEach(event => window.addEventListener(event, handleResize))
document.getElementById("show-form-button").addEventListener("click", handleShowForm)
form.addEventListener("submit", handleSubmit)

// EVENT LISTNER FUNCTIONS
function handleShowForm(e) {
  if(e.target.textContent === "Add book") {
    form.style = "display: block"
    e.target.textContent = "Hide form"
    // Scroll so button is 100px from the top of the viewport (if page is long enough)
    window.scroll({ top: e.pageY - 100, left: 0, behavior: "smooth" })
  }
  else {
    form.style = "display: none"
    e.target.textContent = "Add book"
  }
}

function handleSubmit(e) {
  e.preventDefault()
  const book = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("num-pages").value,
    document.getElementById("read").checked
  )
  myLibrary.add(book)
  printBook(book, myLibrary)
  form.reset()
}

// ENTRY POINT
const importedBooks = [
  new Book("The Hobbit", "J.R.R. Tolkien", 295, false),
  new Book("How Not to Die", "Bob Smith", 220, false),
  new Book("The Rabbit", "Alice Pocomono", 319, false),
  new Book("Moonlander", "Charlie Kirk", 491, false)
]
importedBooks.forEach(book => myLibrary.add(book))
printAllBooks(myLibrary)
