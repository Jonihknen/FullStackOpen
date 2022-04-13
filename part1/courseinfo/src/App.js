
const Header = (props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Part = (props) => {
  return (
      <p> {props.exercises} {props.parts}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part exercises={props.exercises[0].name} parts={props.exercises[0].exercises} />
      <Part exercises={props.exercises[1].name} parts={props.exercises[1].exercises} />
      <Part exercises={props.exercises[2].name} parts={props.exercises[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>total exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )
}






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

  

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}




export default App