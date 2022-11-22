"use strict"
import handleResize from "./resize.js"
import printBook, { printAllBooks } from "../scripts/render.js"
import Book from "../classes/book.js"
import Library from "../classes/library.js"

const form = document.forms.addBook
const myLibrary = new Library()

// EVENT LISTNERS
;["load", "resize"].forEach(event => window.addEventListener(event, handleResize))
document.getElementById("show-form-button").addEventListener("click", handleShowForm)
form.addEventListener("input", handleFormValidation)
form.addEventListener("submit", handleSubmit)

// EVENT LISTENER FUNCTIONS
function handleShowForm(e) {
  if(e.target.textContent === "New book") {
    form.style = "display: block"
    e.target.textContent = "Hide form"
    // Scroll so button is 100px from the top of the viewport (if page is long enough)
    window.scroll({ top: e.pageY - 100, left: 0, behavior: "smooth" })
  }
  else {
    form.style = "display: none"
    e.target.textContent = "New book"
  }
}

function handleFormValidation(e) {
  if(e.target.name !== "numPages") return
  const regex = /^\d{1,5}$/
  if(!regex.test(e.target.value)) {
    e.target.setCustomValidity("Enter a whole number (max 99,999)")
  }
  else {
    e.target.setCustomValidity("")
  }
  e.target.reportValidity()
}

function handleSubmit(e) {
  e.preventDefault()

  const book = new Book(
    document.getElementById("title").value.trim(),
    document.getElementById("author").value.trim(),
    document.getElementById("num-pages").value.trim(),
    document.getElementById("read").checked
  )
  myLibrary.add(book)
  printBook(book, myLibrary)
  form.reset()
}

// ENTRY POINT
const importedBooks = [
  new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
  new Book("How Not to Die", "Bob Smith", 220, false),
  new Book("The Rabbit", "Alice Pocomono", 319, false),
  new Book("Moonlander", "Charlie Kirk", 491, false)
]
importedBooks.forEach(book => myLibrary.add(book))
printAllBooks(myLibrary)
