const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')
const app = express()

mongoose.set('strictQuery', false)
info(`connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
    app.listen(config.PORT, () => {
      info(`server running on port ${config.PORT}`)
    })
  })
  .catch(err => {
    error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)