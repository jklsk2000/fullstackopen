import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({click, text }) => {
    return ( 
        <button onClick={click}>{text}</button>
    )
}

const Statistics = ({ clicks }) => {
    const total = clicks.good + clicks.neutral + clicks.bad
    const avg = (clicks.good - clicks.bad) / total
    const pos = (clicks.good) / total * 100

    if (total === 0) {
        return (<p>No feedback given</p>)
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="good" value={clicks.good} />
                    <Statistic text="neutral" value={clicks.neutral} />
                    <Statistic text="bad" value={clicks.bad} />
                    <Statistic text="all" value={total} />
                    <Statistic text="average" value={avg} />
                    <Statistic text="positive" value={pos} />
                </tbody>
            </table>        
        </div>
    )
}

const Statistic = ({ text, value }) => {
    if (text === "positive") {
        return (
            <tr>
                <td>{text}</td>
                <td>{value} %</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    // const [good, setGood] = useState(0)
    // const [neutral, setNeutral] = useState(0)
    // const [bad, setBad] = useState(0)
    const [clicks, setClicks] = useState({
        good: 0, neutral: 0, bad: 0
    })

    const handleGood = () => {
        setClicks({...clicks, good: clicks.good + 1})
    }
    const handleNeutral = () => {
        setClicks({...clicks, neutral: clicks.neutral + 1})
    }
    const handleBad = () => {
        setClicks({...clicks, bad: clicks.bad + 1})
    }

    return (
        <div>
            <Header text="give feedback" />
            <Button click={handleGood} text="good" />
            <Button click={handleNeutral} text="neutral" />
            <Button click={handleBad} text="bad" />
            <Header text="statistics" />
            <Statistics clicks={clicks} />
        </div>
    )
}

export default App