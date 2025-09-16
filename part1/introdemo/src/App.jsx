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
        <p>{props.part1} {props.exercises1}</p>
        <p>{props.part2} {props.exercises2}</p>
        <p>{props.part3} {props.exercises3}</p>
      </div>
    )
  }
  const Total =(props) => {
    return <p>amount of exercises {props.total}</p>
  }

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App