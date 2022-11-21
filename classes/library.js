export default class Library {
  constructor() {
    this.library = []
  }

  add(book) {
    this.library.push(book)
  }

  getAllBooks() {
    return this.library
  }

  delete(book) {
    this.library = this.library.filter(b => b.id !== book.id)
  }
}
