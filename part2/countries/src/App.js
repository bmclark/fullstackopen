import { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'
import CountryFull from './components/CountryFull'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(countries)
  const [country, setCountry] = useState('')
  // const results = !search
  // ? countries
  // : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))



  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setResults(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))    
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      search: <input value={search} onChange={handleSearchChange} />
      <Results results={results} />
      {/* <CountryFull display={display} results={results} name={country} /> */}
    </div>
  );
}

export default App;
