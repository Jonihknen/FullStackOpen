import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from "react-router-dom"

const Menu = ({anecdotes, addNew, handleNotification, notification}) => {
  const padding = {
    paddingRight: 5
  }
  let borders = null
  if (notification) {
  borders = {
    border: '1px solid red'
  }}
  return (
    
    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/createNew">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <div style={borders}>{notification}</div>


      <Routes>
        <Route path="/notes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/createNew" element={<CreateNew addNew={addNew} handleNotification={handleNotification}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
      </Routes>
    </Router>
  )
}

const AnecdoteList = ({anecdotes}) => {
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/notes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
  )}

  const Anecdote = ({ anecdotes }) => {
    const padding = {
      paddingTop: 10
    }
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === Number(id))
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author} </h2>
        <div>{anecdote.user}</div>
        <div>has {anecdote.votes} votes</div>
        <div style={padding}>for more info see <a href={anecdote.info}>{anecdote.info}</a> </div>
      </div>
    )
  }
  

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => {
  const style = {
    position: "fixed",
          left: 0,
          bottom: 0,
          right: 0,
  }
  return (
  <div style={style}><b>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </b></div>
  ) }

const CreateNew = ({addNew, handleNotification}) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    navigate('/')
    handleNotification(`a new anecdote ${content} created!`)

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {

  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  
  const handleNotification = (data) => {
    setNotification(data)
    setTimeout(function() {
    setNotification(null)
      }, 5000); 
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} handleNotification={handleNotification} notification={notification}/>
      <Footer />
    </div>
  )
}

export default App
