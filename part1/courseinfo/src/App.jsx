/* eslint-disable react/prop-types */
const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ part, exercises }) => <p>{part} {exercises}</p>

const Total = ({ total }) => <p>Number of exercises {total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        part: 'Fundamentals of React',
        exercises: 10,
      },
      {
        part: 'Using props to pass data',
        exercises: 7,
      },
      {
        part: 'State of a component',
        exercises: 14,
      },
    ]
  }
  let total = 0;

  return (
    <>
      <Header course={course.name} />
      {course.parts.map(({ part, exercises }) => {
        total += exercises;
        return (
          <Content key={part} part={part} exercises={exercises} />
        )
      })}
      <Total total={total} />
    </>
  )
}

export default App