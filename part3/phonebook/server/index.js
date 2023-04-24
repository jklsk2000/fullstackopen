require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}
app.use(requestLogger)
app.use(morgan('tiny'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

app.get('/info', async (req, res, next) => {
  const numPersons = await Person.estimatedDocumentCount()
  res.send(`Phonebook has info for ${numPersons} people
    <br><br>${Date()}`)
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
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
    const person = new Person({
      name: body.name,
      number: body.number
    })
    if (p) {
      p.number = person.number
      p.save().then(res => {
        console.log(`${body.name}'s number successfully updated`)
      })
      res.json(person)
    } else {
      person.save().then(res => {
        console.log(`${body.name} successfully saved to MongoDB`)
      })
      res.json(person)
    }
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malfromatted id' })
  }
  next(error)
}

app.use(errorHandler)
