const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Journey = require('../models/journey')

describe('Journey model', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterEach(async () => {
    await Journey.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  test('creating a new journey', async () => {
    const journeyData = {
      Departure: new Date(),
      Return: new Date(),
      'Departure station id': 1,
      'Departure station name': 'Station A',
      'Return station id': 2,
      'Return station name': 'Station B',
      'Covered distance (m)': 1000,
      'Duration_sec': 600
    }

    const journey = new Journey(journeyData)
    const savedJourney = await journey.save()

    expect(savedJourney).toMatchObject(journeyData)
  }, 10000)

  test('creating a journey with missing required fields should fail', async () => {
    const journeyData = {
      Departure: new Date(),
      Return: new Date(),
      'Departure station id': 1,
      'Departure station name': 'Station A',
      'Return station id': 2,
      'Return station name': 'Station B'
    }
  
    const journey = new Journey(journeyData)

    await expect(journey.save()).rejects.toThrowError(mongoose.Error.ValidationError)
  }, 10000)

  test('transforming journey document toJSON', async () => {
    const journeyData = {
      Departure: new Date(),
      Return: new Date(),
      'Departure station id': 1,
      'Departure station name': 'Station A',
      'Return station id': 2,
      'Return station name': 'Station B',
      'Covered distance (m)': 1000,
      'Duration_sec': 600
    }

    const journey = new Journey(journeyData)
    const savedJourney = await journey.save()

    const jsonResponse = savedJourney.toJSON()

    expect(jsonResponse).toHaveProperty('id')
    expect(jsonResponse).not.toHaveProperty('_id')
    expect(jsonResponse).not.toHaveProperty('__v')
  }, 10000)
})
