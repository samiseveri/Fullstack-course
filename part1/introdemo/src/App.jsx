import { useState } from 'react'
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Statistics =({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total === 0) return <p>no body cares</p>
    return (
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>total: {total}</p>
      </div>
    )
  }

  const Header = (props) => <h1>{props.course.name}</h1>

  const Part = (props) => <p>{props.name} {props.exercises}</p>

  const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

  const Total =(props) => <p>amount of exercises {props.total}</p>

  return (
    <div>
      <h1>Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

      <Header course={course} />
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

export default App