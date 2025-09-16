const App = () => {

const course = {
  name: "super chool name for application",
  parts: [
    {name: "Fundamentals of React", exercises: 10},
    {name: "Using props to pass data", exercises: 7},
    {name: "Fundamentals of React", exercises: 14}
  ]
}

  const Header =(props) => {
    return <h1>{props.course.name}</h1>
  }

  const Content =(props) => {
    return(
      <div>
        {props.parts.map(part => (
          <p key={part.name}>{part.name}{part.exercises}</p>
        ))}
      </div>
    )
  }
  const Total =(props) => {
    return <p>amount of exercises {props.total}</p>
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

export default App