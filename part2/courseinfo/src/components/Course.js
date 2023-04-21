import Header from './Header'
import Part from './Part'
import Total from './Total'

const Course = ({course}) => {
    const total = course.parts.reduce(
        (sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <Header title={course.name} />
            {course.parts.map((part) => 
                <Part key={part.id} name={part.name} num={part.exercises} /> 
            )}
            <Total total={total} />
        </div>
    )
}

export default Course