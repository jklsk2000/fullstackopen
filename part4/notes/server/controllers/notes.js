const router = require('express').Router()
const Note = require('../models/note')

router.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

router.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => next(err))
})

router.post('/', (request, response, next) => {
  const note = new Note({
    content: request.body.content,
    important: request.body.imporant || false,
  })
  note.save()
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

router.put('/:id', (request, response, next) => {
  const note = {
    content: request.body.content,
    important: request.body.important,
  }
  Note.findByIdAndUpdate(
    request.params.id,
    note,
    { new: true }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(err => next(err))
})

module.exports = router