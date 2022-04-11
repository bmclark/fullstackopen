import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  const searchResults = !search 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)
 
  const handleButtonClick = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const numbers = persons.map(person => person.number)
    if (names.includes(newName)) { 
      alert(`${newName} is already added to phonebook`)
    } else if (numbers.includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
      addPerson()
    }
  }

  const addPerson = () => {
    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }))
    setNewName('')
    setNewNumber('')
    setSearch('')
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      search: <input value={search} onChange={handleSearchChange} />
      <form>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleButtonClick}>add</button>
        </div>
      </form>
      <Numbers persons={searchResults} />
    </div>
  )
}

export default App