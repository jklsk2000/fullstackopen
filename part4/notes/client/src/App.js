import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errMsg, setErrMsg] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then(initNotes => {
                setNotes(initNotes)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }
        noteService
            .create(noteObject)
            .then(res => {
                setNotes(notes.concat(noteObject))
                setNewNote('')
            })
    }

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(n => n.id !== id ? n : returnedNote))
            })
            .catch(err => {
                setErrMsg(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrMsg(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll 
        ? notes
        : notes.filter(note => note.important)

    return (
        <div>
        <h1>Notes</h1>
        <Notification message={errMsg} />
        <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
        </div>

        <ul>
            <ul>
            {notesToShow.map(note => 
                <Note 
                    key={note.id} 
                    note={note} 
                    toggleImportance={() => toggleImportanceOf(note.id)} 
                />
            )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </ul>
        <Footer />
        </div>
    )
}

export default App
