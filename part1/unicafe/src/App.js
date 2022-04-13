import { useState } from 'react'

const Header = (props) => {
  return (
  <h1>{props.text}</h1>
  )
}

const StatisticLine = ({text, value}) => {
  if (value !== Math.floor(value)) {
    value = value.toFixed(2)
  }
  if (text === "positive") {
    return (
      <tr><td>{text}</td><td>{value}%</td></tr>
    )
  }
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total > 0) {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="total" value={total}/>
          <StatisticLine text="average" value={(good - bad) / total}/>
          <StatisticLine text="positive" value={good / total*100} />
        </tbody>
      </table>
    </div>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodIncrease = () => setGood(good + 1)
  const neutralIncrease = () => setNeutral(neutral + 1)
  const badIncrease = () => setBad(bad + 1)
  
  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={goodIncrease} text='good'/>
      <Button onClick={neutralIncrease} text='neutral'/> 
      <Button onClick={badIncrease} text='bad'/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

