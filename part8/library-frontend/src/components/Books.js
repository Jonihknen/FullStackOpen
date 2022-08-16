import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

const Books = ({ show, books }) => {
  const [booksToDisplay, setBooksToDisplay] = useState(books)
  const [genre, setGenre] = useState('all genres')
  const genres = [...new Set(books.flatMap((b) => b.genres))].concat(
    'all genres'
  )
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (result.data) {
      setBooksToDisplay(result.data.allBooks)
    }
  }, [result.data])

  const switchGenre = (genre) => {
    if (genre === 'all genres') {
      setBooksToDisplay(books)
      return
    }
    setGenre(genre)
    getBooks({ variables: { genre: genre } })
  }

  if (!show) {
    return null
  }

  if (booksToDisplay) {
    return (
      <div>
        <h2>books</h2>
        <div>
          in genre <b>{genre}</b>
        </div>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToDisplay.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {genres.map((genre) => (
          <button key={genre} onClick={() => switchGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    )
  }
  return 'no books added'
}

export default Books
