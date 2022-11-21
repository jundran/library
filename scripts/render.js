"use strict"
const tableBody = document.querySelector('tbody')

export default function printBook(book, myLibrary) {
  const row = document.createElement("tr")

  // Create and append TD elements for text fields and checkbox(isRead)
  book.getProperties().forEach(field => {
    const td = document.createElement("td")
    setPaddingAndFontSize(td)

    // Set up checkbox for marking read status
    if(typeof field === "boolean") {
      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.checked = field
      checkbox.addEventListener("click", book.setIsRead)
      td.appendChild(checkbox)
    }
    else {
      td.textContent = field // text field
    }
    row.appendChild(td)
  })

  // Create delete button
  const deleteButton = document.createElement("Button")
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", () => {
    myLibrary.delete(book)
    printAllBooks(myLibrary)
  })

  // Create TD element and append delete button
  const td = document.createElement("td")
  setPaddingAndFontSize(td)
  td.appendChild(deleteButton)
  row.appendChild(td)

  // Finally append this row to the table body
  tableBody.appendChild(row)
}

export function printAllBooks(myLibrary) {
  tableBody.innerHTML = ""
  myLibrary.getAllBooks().forEach(book => printBook(book, myLibrary))
}

function setPaddingAndFontSize(td) {
  const referenceCell = document.querySelector("th")
    td.style.fontSize = referenceCell.style.fontSize
    td.style.paddingLeft = referenceCell.style.paddingLeft
    td.style.paddingRight = referenceCell.style.paddingRight
}
