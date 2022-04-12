const Search = ({search, handleSearchChange}) => {
  return (
    <div>
      search: <input value={search} onChange={handleSearchChange} />
    </div>
  )
}

export default Search