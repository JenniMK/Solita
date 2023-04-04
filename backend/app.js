const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const journeysRouter = require('./controllers/journeys')
const stationsRouter = require('./controllers/stations')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

logger.info("connecting to MongoDB")

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to database')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/journeys', journeysRouter)
app.use('/api/stations', stationsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app