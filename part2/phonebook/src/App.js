import { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import Person from './components/Person'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initPersons => {
                setPersons(initPersons)
            })
    }, [])

    const addPerson = (e) => {
        e.preventDefault()

        const newPerson = {
            name: newName, number: newNumber
        }        
        const exists = persons.filter(p => p.name === newName)
        if (exists.length !== 0) {
            const personToUpdate = exists[0]
            if (window.confirm(`${newName} is already added added to phonebook, replace the old number with the new one?`)) {
                personService
                    .update(personToUpdate.id, newPerson)
                    .then(updatedPerson => {
                        console.log(`${updatedPerson.name} was updated`)
                        setPersons(persons.map(p => p.id !== personToUpdate.id ? p : newPerson))
                    })
            }
        } else {
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
        }

        setMessage(`Added ${newName}`)

        setTimeout(() => {
            setMessage(null)
        }, 3000)

        setNewName('')
        setNewNumber('')
    }

    const toggleDeleteOf = person => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService 
                .deleteOne(person.id)
                .then(deletedPerson => {
                    setPersons(persons.filter(p => p.id !== deletedPerson.id))
                    window.location.reload()
                })
        }
    }

    const handleNameChange = (e) => {
        console.log(e.target.value)
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        console.log(e.target.value)
        setNewNumber(e.target.value)
    }

    const personToShow = filter.length === 0
        ? persons
        : persons.filter(p => p.name.toLowerCase().startsWith(filter))
    
    const handleFilterChange = (e) => {
        console.log(e.target.value)
        setFilter(e.target.value.toLowerCase())
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification msg={message} />
            <Filter handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm formSubmit={addPerson} name={newName} number={newNumber} 
                nameChange={handleNameChange} numberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <table>
                <tbody>
                    {personToShow.map(p =>
                        <Person 
                            key={p.id}
                            name={p.name} 
                            number={p.number}
                            toggleDelete={() => toggleDeleteOf(p)} 
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default App