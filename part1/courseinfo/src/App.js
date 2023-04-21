const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.num}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.parts[0].name} num={props.parts[0].num} />
            <Part name={props.parts[1].name} num={props.parts[1].num} />
            <Part name={props.parts[2].name} num={props.parts[2].num} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.parts[0].num + props.parts[1].num + props.parts[2].num}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                num: 10
            },
            {
                name: 'Using props to pass data',
                num: 7
            },
            {
                name: 'State of a component',
                num: 14
            }
        ]
    }
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  export default App