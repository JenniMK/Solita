const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Station = require('../models/station')

describe('Station model', () => {
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
    await Station.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })
  
  test('creating a new station', async () => {
    const stationData = {
      FID: 1,
      ID: 1,
      Nimi: 'Test Station',
      x: 24.945831,
      y: 60.192059,
    }
  
    const station = new Station(stationData)
    const savedStation = await station.save()
  
    expect(savedStation).toMatchObject(stationData)
  }, 10000)
  
  test('creating a station with missing required fields should fail', async () => {
    const stationData = {
      FID: 1,
      Nimi: 'Test Station',
      x: 24.945831,
      y: 60.192059,
    }
  
    const station = new Station(stationData)
  
    await expect(station.save()).rejects.toThrowError(mongoose.Error.ValidationError)
  }, 10000) 
  
  test('transforming station document toJSON', async () => {
    const stationData = {
      FID: 1,
      ID: 1,
      Nimi: 'Test Station',
      x: 24.945831,
      y: 60.192059,
    }
  
    const station = new Station(stationData)
    const savedStation = await station.save()
  
    const jsonResponse = savedStation.toJSON()
  
    expect(jsonResponse).toHaveProperty('id')
    expect(jsonResponse).not.toHaveProperty('_id')
    expect(jsonResponse).not.toHaveProperty('__v')
  }, 10000)
})
  
