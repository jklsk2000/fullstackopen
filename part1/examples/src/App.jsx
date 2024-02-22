import './App.css'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} {props.age} years old</p>
    </div>
  )
}

function App() {
  const name = 'Danny';
  const age = 23; 

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
    </div>
  )
}

export default App
