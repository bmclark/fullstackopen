import React from 'react'
import { useState } from 'react'
import CountryFull from './CountryFull'

const ShowCountry = (props) => {
  if (props.display) {
    // console.log(props.result.name.common.includes(props.key), props.result.name.common)
    return (
      <div>
        <h2>{props.result.name.common}</h2>
        <p>capital: {props.result.capital}</p>
        <p>area: {props.result.area}</p>
        <p>languages:</p>
        <ul>
          {Object.keys(props.result.languages).map(key => <li key={key}>{props.result.languages[key]}</li>)}
        </ul>
        <p>flag: {props.result.flag}</p>
      </div>
    )
  }
}

const Results = ({results}) => {
  const [display, setDisplay] = useState(false)
  const [displayCountry, setDisplayCountry] = useState([])

  const handleButton = (country) => {
    console.log('button clicked', country)
    setDisplayCountry(results.filter(result => result.name.common.toLowerCase().includes(country.toLowerCase())))
  }
  
  if (results.length > 10) {
    return <div><p>Too many matches.</p></div>
  } else if (results.length > 1) {
    return (
      <div>
        {results.map(country => 
          <div>
            <br />
            {country.name.common}
            <button onClick={() => handleButton(country.name.common)}>Expand</button>
            <ShowCountry key={country.name.common} display={display} result={displayCountry} />
          </div>
            )}
      </div>
    )
    } else if (results.length === 1) {
      <ShowCountry display={display} result={results} />
    } else {
      return (
        <div>
          {results.name}
        </div>
      )
    }
}

export default Results