"use strict"

export default function printBook(book, myLibrary) {
  const row = document.createElement("tr")

  // Create and append TD elements for text fields and checkbox(isRead)
  book.displayProperties.forEach(field => {
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
    myLibrary.deleteBook(book)
    printAllBooks(myLibrary)
  })

  // Create TD element and append delete button
  const td = document.createElement("td")
  setPaddingAndFontSize(td)
  td.appendChild(deleteButton)
  row.appendChild(td)

  // Finally append this row to the table body
  document.querySelector('tbody').appendChild(row)

  function setPaddingAndFontSize(td) {
    const referenceCell = document.querySelector("th")
      td.style.fontSize = referenceCell.style.fontSize
      td.style.paddingLeft = referenceCell.style.paddingLeft
      td.style.paddingRight = referenceCell.style.paddingRight
  }
}

export function printAllBooks(myLibrary) {
  document.querySelector('tbody').innerHTML = ""
  myLibrary.getAllBooks().forEach(book => printBook(book, myLibrary))
}
