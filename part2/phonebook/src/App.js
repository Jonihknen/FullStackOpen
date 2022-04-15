import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findString, setFindString] = useState('')
  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(findString.toLowerCase()))

  const addContact = (event) => {
    event.preventDefault()
    const addedObject ={
      name: newName,
      number: newNumber
    }
    if (!persons.some(e => e.name.toUpperCase() === newName.toUpperCase())) {
      setPersons(persons.concat(addedObject))
      setNewName("")
      setNewNumber("")
    } else {window.alert(`${newName} is already added to phonebook`)
    }
  }

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={findString} onChange={handleFindStringChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addContact} newName={newName}
      handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App