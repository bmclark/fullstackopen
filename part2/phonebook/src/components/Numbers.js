const Person = (props) => <p>{props.name} {props.number}</p>

const Numbers = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {props.persons.map(person => {
          return <Person key={person.id} name={person.name} number={person.number} />
          })
        }
      </div>
    </div>
  )
}

export default Numbers