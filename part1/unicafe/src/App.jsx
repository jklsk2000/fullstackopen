/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ text, stat }) => {
  if (text === 'positive') {
    stat += ' %'
  }

  return (
    <tr>
      <td>{text}</td> 
      <td>{stat}</td> 
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return <div>No feedback given</div>
  }

  const calculateAverage = () => (good - bad) / all
  const calculatePositive = () => (good / all) * 100

  return (
    <div>
      <table>
        <tbody>
          <Statistic text='good' stat={good} />
          <Statistic text='neutral' stat={neutral} />
          <Statistic text='bad' stat={bad} />
          <Statistic text='all' stat={all} />
          <Statistic text='average' stat={calculateAverage()} />
          <Statistic text='positive' stat={calculatePositive()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
