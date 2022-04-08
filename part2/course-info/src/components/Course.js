const Header = (props) => {
  return <h2>{props.name}</h2>
}

const Part = (props) => {
  return (
    <div>
      {props.name}: {props.exercise}
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.id} name={part.name} exercise={part.exercises} /> 
      )}
    </div>
  )
}

const Total = (props) => <h3>Number of exercises: {props.total}</h3>

const Course = (props) => {

  return (
    <div>
      <h1>Web development curriculum</h1>
      {props.course.map(course =>
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total total=
            {course.parts.reduce((sum, part) => {
              return sum += part.exercises
            }, 0)} />
        </div>)}
    </div>
  )
}

export default Course