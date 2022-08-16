import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = ({ show }) => {
  const user = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  if (user.loading || books.loading) {
    return <p>Loading...</p>
  }

  if (!show || !user.data) {
    return null
  }

  const favGenre = user?.data?.me?.favoriteGenre
  const allBooks = books.data.allBooks
  if (books.data.allBooks && user) {
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
            {allBooks
              .filter((book) => book.genres.includes(favGenre))
              .map((b) => (
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
