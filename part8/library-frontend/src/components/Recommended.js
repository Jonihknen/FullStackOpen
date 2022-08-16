const Recommended = ({ show, user, books }) => {
  if (!show) {
    return null
  }

  const favGenre = user?.data?.me?.favoriteGenre
  books = books.data.allBooks.filter((book) => book.genres.includes(favGenre))

  if (books && favGenre) {
    return (
      <div>
        <h2>recommendation</h2>
        <div>
          books in your favorite genre <b>{favGenre}</b>{' '}
        </div>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{favGenre}</b>
      </div>
      <div>
        no <b>{favGenre}</b> books added
      </div>
    </div>
  )
}

export default Recommended
