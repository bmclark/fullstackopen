import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [popular, setPopular] = useState(anecdotes[selected])
  const votesCopy = [...votes]
  const [popIndex, setPopIndex] = useState(0)

  const rndNum = () => {
    setSelected(Math.round((Math.random() * 10000 )) % anecdotes.length)
    getPopular()
  }

  const vote = () => {
    votesCopy[selected] += 1
    setVotes(votesCopy)
    getPopular()
  }

  function getPopular() {
    const max = Math.max(...votes)
    const index = votes.indexOf(max)
    setPopular(anecdotes[index])
    setPopIndex(index)
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>this anecdote has {votes[selected]} votes</p>
      <p></p>
      <button onClick={vote}>vote</button>
      <button onClick={rndNum}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{popular}</p>
      <p>has {votes[popIndex]} votes</p>
    </div>
  )
}

export default App