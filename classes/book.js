export default class Book {
  constructor(title, author, numPages, isRead) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.isRead = isRead
    this.id = self.crypto.randomUUID()
  }

  getProperties() {
    return [this.title, this.author, this.numPages, this.isRead]
  }

  setIsRead(e) {
    this.isRead = e.target.checked
  }
}
