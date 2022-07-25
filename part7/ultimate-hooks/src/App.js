import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = (event) => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    console.log(baseUrl)
    const response = await axios.get(baseUrl)
    console.log(response.data)

    setResources(response.data)
  }

  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    setResources([...resources, response.data])
  }

  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}

const App = () => {
  const {reset : resetContent, ...content} = useField('text')
  const {reset : resetName, ...name} = useField('text')
  const {reset : resetNumber, ...number} = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.getAll();
    personService.getAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    resetContent()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App