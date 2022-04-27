import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import service from './services/service'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  if (message.includes("Added")) {
  return (
    <div className='success' > {message} </div>
  )}
  if (message.includes("was already removed from server")) {
    return (
    <div className='error' > {message} </div>
    )
  }
}


const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findString, setFindString] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [displayMessage, setDisplayMessage] = useState(null)


  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(findString.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFindStringChange = (event) => {
    setFindString(event.target.value)
    const x = event.target.value
    if (x !== "") {
      setShowAll(false) 
    }
    if (x.length === 0) {
      setShowAll(true) 
    }
  }

  const addContact = (event) => {
    event.preventDefault()
    const addedObject ={
      name: newName,
      number: newNumber
    }
    const target = persons.filter((person) =>
      person.name.toLowerCase() === newName.toLowerCase())

    if (!persons.some(e => e.name.toUpperCase() === newName.toUpperCase())) {
      service.create(addedObject).then(returnedData => {
        setPersons(persons.concat(returnedData))
        setDisplayMessage(`Added ${newName} `)
        setTimeout(() => {
        setDisplayMessage(null)
      }, 3600)
        setNewName("")
        setNewNumber("")
      })
    } else 
      updateNumber(target[0].id, newName, newNumber)
      setNewName("")
      setNewNumber("")
  }

  const delName = (id, name) => {
    if (window.confirm(`delete ${name} ?`)) {
      service.deleteUser(id).then(returnedData => {
        console.log(returnedData)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setDisplayMessage(
          `${name} was already removed from server`
        )
        setTimeout(() => {
          setDisplayMessage(null)
        }, 3600)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const updateNumber = (id, name, newNumber) => {
    const newObject ={
      name: name,
      number: newNumber
    }
    if (window.confirm(`${name} is already added on phonebook, replace the old number with a new one?`)) {
      service.update(id, newObject).then(returnedData => {
        console.log(returnedData)
        setPersons(persons.map(person => person.id !== id ? person : returnedData))
        setDisplayMessage(`Added ${newName} `)
        setTimeout(() => {
        setDisplayMessage(null)
      }, 3600)
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={displayMessage}/>
      <Filter value={findString} onChange={handleFindStringChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addContact} newName={newName}
      handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} delName={delName} />
    </div>
  )
}

export default App