import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    setLoggedUser(localStorage.getItem('bookAppUserName'))
    setToken(localStorage.getItem('bookAppUserToken'))
  }, []) // eslint-disable-line

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setLoggedUser(null)
    setPage('login')
  }

  let authors = useQuery(ALL_AUTHORS)
  let books = useQuery(ALL_BOOKS)
  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          style={loggedUser ? { display: 'inline' } : { display: 'none' }}
          onClick={() => setPage('add')}
        >
          add book
        </button>
        <button
          style={loggedUser ? { display: 'inline' } : { display: 'none' }}
          onClick={() => setPage('recommended')}
        >
          recommend
        </button>
        <button
          style={loggedUser && { display: 'none' }}
          onClick={() => setPage('login')}
        >
          login
        </button>
        logged in as: {loggedUser ? loggedUser : 'quest'}
        <button
          style={
            loggedUser
              ? {
                  position: 'absolute',
                  top: 0,
                  right: 0
                }
              : { display: 'none' }
          }
          onClick={logout}
        >
          logout
        </button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} setPage={setPage} />

      <Recommended show={page === 'recommended'} />

      <LoginForm
        show={page === 'login'}
        setLoggedUser={setLoggedUser}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
