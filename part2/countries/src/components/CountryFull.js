const CountryFull = (props) => {
  const result = props.results.filter(country => country.name.common.toLowerCase().includes(props.name.toLowerCase()))

  if (!props.display) {
    return null;
  }

  console.log(result[0]);
  
  return (
    <div>
      <h2>{result[0].name.common}</h2>
      <p>capital: {result[0].capital}</p>
      <p>area: {result[0].area}</p>
      <p>languages:</p>
      <ul>
        {Object.keys(result[0].languages).map(key => <li key={key}>{result[0].languages[key]}</li>)}
      </ul>
      <p>flag: {result[0].flag}</p>
    </div>
  )
}

export default CountryFull