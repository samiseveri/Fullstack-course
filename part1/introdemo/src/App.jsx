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
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

export default App