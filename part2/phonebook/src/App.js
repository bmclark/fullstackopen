import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Search from './components/Search'
import AddPerson from './components/AddPerson'
import Person from './components/Person'
import personService from './services/person'
import person from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  const displayMessage = (newMessage, error = false) => {
    setMessage({
      text: newMessage,
      error
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  const searchResults = !search 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)


  const handleButtonClick = (event) => {
    event.preventDefault()
    // create person object
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // check for repeat names
    const names = persons.map(person => person.name.toLowerCase())
    const repeatName = names.includes(newName.toLowerCase())
    if (repeatName) {
      //get name id
      const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const updateName = window.confirm(`${newName} exists, update?`)
        if (updateName) { 
          personService.update(person.id, newPerson)
          .then(displayMessage(`${newName} has been updated`))
          .then(()=>refresh())
          .catch(error =>{
            displayMessage(`ERROR`, error)
          })
        }
    } else {
        // check if number is repeated {
        const numbers = persons.map(person => person.number)
        const repeatNumber = numbers.includes(newNumber)
        if (repeatNumber) {
          const person = persons.find(person => person.number === newNumber)
          const updateNumber = window.confirm(`${newNumber} exists, update?`)
          if (updateNumber) { 
            personService
            .update(person.id, newPerson)
            .then(displayMessage(`${newNumber} has been updated`))
            .then(() => refresh())
            .catch(error =>{
              displayMessage(`ERROR`, error)
            })
          }
        } else { // name/number not repeated
          addPerson({...newPerson, id: person.length + 1})
          displayMessage(`${newName} has been added`)

      }
    }
  }

  const refresh = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setNewName('')
        setNewNumber('')
        setSearch('')
      })
  }

  const handleDelete = (props) => {
    const result = window.confirm(`delete ${props.name}?`)
    if (result) { 
      personService
        .deletePerson(props.id)
        .then(() => refresh())
        .catch(error =>{
          displayMessage(`ERROR: ${props.name} has already been removed!`, error)
        }
          
          )

      displayMessage(`${props.name} has been deleted`)

      // personService.getAll().then(response => setPersons(response.data))
    }
    personService.getAll()
  }

  const addPerson = (person) => {
    personService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setSearch('')
      })
      .catch(error =>{
        displayMessage(`ERROR`, error)
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error =>{
        displayMessage(`ERROR`, error)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search search={search} handleSearchChange={handleSearchChange} />
      <AddPerson 
        newName={newName}
        newNumber={newNumber}
        handleButtonClick={handleButtonClick}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers:</h3>
      {searchResults.map(person => (
        <Person 
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person)}
        />
      ))}
      <button onClick={() => refresh()}>refresh</button>
    </div>
  )
}

export default App