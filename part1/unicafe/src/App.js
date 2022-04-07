import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (!props.total) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given </p>
      </div>
    )
  }  

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.ratings[0]} />
          <StatisticLine text="neutral" value={props.ratings[1]} />
          <StatisticLine text="bad" value={props.ratings[2]} />
          <StatisticLine text="all " value={props.total} />  
          <StatisticLine text="average " value={props.avgScore} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1);
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  }
  const increaseBad = () => {
    setBad(bad + 1);
  }

  const total = () => {
    return good + neutral + bad;
  }

  const score = () => {
    return ((good - bad) / total()) * 100 ;
  }
  
  const positive = () => {
    return `${(good / total()) * 100}%`;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onClick={increaseGood}
        text='good'
      />
      <Button 
        onClick={increaseNeutral}
        text='neutral'
      />
      <Button 
        onClick={increaseBad}
        text='bad'
      />
      <Statistics ratings={[good, neutral, bad]} total={total()} avgScore={score()} positive={positive()} />
    </div>
  )
}

export default App;
