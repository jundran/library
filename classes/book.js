export default function Book (_title, _author, _numPages, _isRead) {
  let title = _title
  let author = _author
  let numPages = _numPages
  let isRead = _isRead
  let id = self.crypto.randomUUID()

  const displayProperties = [title, author, numPages, isRead]

  const setIsRead = e => isRead = e.target.checked

  return {
    title,
    author,
    numPages,
    isRead,
    id,
    displayProperties,
    setIsRead
  }
}
