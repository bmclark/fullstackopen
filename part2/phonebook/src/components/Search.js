const Search = ({search, handleSearchChange}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      search: <input value={search} onChange={handleSearchChange} />
    </div>
  )
}

export default Search