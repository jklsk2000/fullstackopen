/* eslint-disable react/prop-types */
import { useState } from 'react'

const MostVotes = ({ anecdotes, votes }) => {
  let max = votes[0]
  let indexOMax = 0

  for (let i = 1; i < votes.length; i++) {
    if (votes[i] > max) {
      max = votes[i]
      indexOMax = i
    }
  }

  if (max == 0) {
    return <div>No votes yet!</div>
  }

  return (
    <div>
      <div>{anecdotes[indexOMax]}</div><br />
      <div>with {votes[indexOMax]} votes!</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const len = anecdotes.length
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(len).fill(0))

  const handleNext = () => {
    const next = Math.floor(Math.random() * len)
    setSelected(next)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>

      <h2>Anecdote with most votes</h2>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
