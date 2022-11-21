"use strict"
const tableWrapper = document.querySelector('.table-wrapper')
let lastWidth = window.innerWidth

// Load and resize event listeners are used to dynamically adjust cell padding and font on
// small screens. The function uses while loops rather than if statements to allow for
// iterative adjustments on load as well as on resize.
export default function handleResize(e) {
  const cells = document.querySelectorAll("th, td")
  let shrinking = true
  if(window.innerWidth > lastWidth) shrinking = false
  lastWidth = window.innerWidth
  const minPadding = 2
  const maxPadding = 20
  const minFont = 8
  const maxFont = 16

  // Table is too big for viewport, reduce padding
  while (
    // clientWidth includes padding but excludes borders, margins, and vertical scrollbars
    tableWrapper.clientWidth >= window.innerWidth &&
    parseInt(window.getComputedStyle(cells[0]).getPropertyValue('padding-left')) > minPadding &&
    shrinking
  ) {
    adjustPadding(cells)
  }

  // Table is STILL too big for viewport, reduce font
  while (
    tableWrapper.clientWidth >= window.innerWidth &&
    parseInt(window.getComputedStyle(cells[0]).getPropertyValue('padding-left')) === minPadding &&
    parseInt(window.getComputedStyle(cells[0]).getPropertyValue('font-size')) > minFont &&
    shrinking
  ) {
    adjustFont(cells)
  }

  // Prevent undoing changes on resize but it works well to allow on load
  if(e.type === "resize" && shrinking) return

  // Table is too small for viewport, increase font
  while (
    tableWrapper.clientWidth < window.innerWidth &&
    parseInt(window.getComputedStyle(cells[0]).getPropertyValue('font-size')) < maxFont
  ) {
    adjustFont(cells, true)
  }

  // Table is STILL too small for viewport, increase padding
  while (
    tableWrapper.clientWidth < window.innerWidth &&
    parseInt(window.getComputedStyle(cells[0]).getPropertyValue('font-size')) === maxFont &&
    parseInt(window.getComputedStyle(cells[0]).getPropertyValue('padding-left')) < maxPadding
  ) {
    adjustPadding(cells, true)
  }
}

function adjustPadding(cells, increase) {
  const padding = parseInt(window.getComputedStyle(cells[0]).getPropertyValue('padding-left'))
  const newPadding = `${increase ? padding + 1 : padding - 1}px`
  cells.forEach(c => {
    c.style.paddingLeft = newPadding
    c.style.paddingRight = newPadding
  })
}

function adjustFont(cells, increase) {
  const fontSize = parseInt(window.getComputedStyle(cells[0]).getPropertyValue('font-size'))
  const newfontSize = `${increase ? fontSize + 1 : fontSize - 1}px`
  cells.forEach(c => {
    c.style.fontSize = newfontSize
    c.style.fontSize = newfontSize
  })
}
