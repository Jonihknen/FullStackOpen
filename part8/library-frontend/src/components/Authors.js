import { useState } from 'react'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = ({ show, authors }) => {
  const [changeBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const handleUpdate = (event) => {
    event.preventDefault()
    changeBirthyear({ variables: { name, born } })
    setBorn('')
    setName('')
  }
  if (!show) {
    return null
  }

  if (authors) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.id}>
                <td
                  onClick={function () {
                    setName(a.name)
                  }}
                >
                  {' '}
                  {a.name}
                </td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>
                author
                <select
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                >
                  {authors.map((a) => (
                    <option key={a.id}>{a.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      </div>
    )
  }
  return 'no authors added'
}

export default Authors
