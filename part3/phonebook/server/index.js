require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}
app.use(requestLogger)
app.use(morgan('tiny'))


app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people
        <br><br>${Date()}`)
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons)
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            res.json(person)
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            error: 'content missing'
        })
    } else if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    } 
    
    
    Person.findOne({ name: body.name }).then(p => {
        if (p) {
            return res.status(400).json({
                error: 'person already exists in phonebook'
            })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number,
            })
        
            person.save().then(res => {
                console.log(`${body.name} successfully saved to MongoDB`)
            })
        
            res.json(person)
        }
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})