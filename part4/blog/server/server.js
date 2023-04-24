const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { PORT, MONGODB_URI } = require('./utils/config')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  )
  .catch(err => {
    console.error(`Failed to connect to MongoDB: ${err.message}`)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)