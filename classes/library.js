export default function Library() {
  let library = []

  const add = book => library.push(book)

  const getAllBooks = () => library

  const deleteBook = book => library = library.filter(b => b.id !== book.id)

  return {
    add,
    getAllBooks,
    deleteBook
  }
}
