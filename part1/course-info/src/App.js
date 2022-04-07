const Header = (props) => {
  return <h1>Course: {props.course.name}</h1>
}

const Part = (props) => {
  return (
    <div>
      {props.name}: {props.exercise}
    </div>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  );
}

const Total = (props) => {
  const total = props.exercises[0] + props.exercises[1] + props.exercises[2];
  return (
    <p>
      Number of exercises: {total}
    </p>
  );
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
      <Header course={course} />
      <Content parts={course.parts} />
      <Total exercises={[course.parts[0].exercises, course.parts[1].exercises,course.parts[2].exercises]} />
    </div>
  )
}

export default App