/* eslint-disable react/prop-types */
const Course = ({ course }) => {
  const parts = course.parts
  const total = parts.reduce((s, p) => s += p.exercises, 0)

  return (
    <div>
      <h1>{course.name}</h1>
      {parts.map((part) => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

export default Course