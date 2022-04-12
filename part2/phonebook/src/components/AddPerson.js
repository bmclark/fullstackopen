const AddPerson = ({newName, newNumber, handleButtonClick, handleNameChange, handleNumberChange}) => {
  return(
    <div>
      <form>
        <h3>add a new</h3>
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
    </div>
  )
}

export default AddPerson