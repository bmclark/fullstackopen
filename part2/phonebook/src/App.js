import { useState, useEffect } from 'react'
// import Numbers from './components/Numbers'
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
  
  const searchResults = !search 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)
 
  // const handleButtonClick = (event) => {
  //   event.preventDefault()
  //   const names = persons.map(person => person.name)
  //   const numbers = persons.map(person => person.number)
  //   if (names.includes(newName)) { 
  //     alert(`${newName} is already added to phonebook`)
  //   } else if (numbers.includes(newNumber)) {
  //     alert(`${newNumber} is already added to phonebook`)
  //   } else {
  //     addPerson()
  //   }
  // }

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
          refresh()
        }
    } else {
        // check if number is repeated {
        const numbers = persons.map(person => person.number)
        const repeatNumber = numbers.includes(newNumber)
        if (repeatNumber) {
          const person = persons.find(person => person.number === newNumber)
          const updateNumber = window.confirm(`${newNumber} exists, update?`)
          if (updateNumber) { 
            personService.update(person.id, newPerson)
            refresh()
          }
        } else { // name/number not repeated
          addPerson({...newPerson, id: person.length + 1})
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
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
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