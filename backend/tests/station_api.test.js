const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Station = require('../models/station');

const api = supertest(app);

const testStations = [
    { FID: 1, ID: 1001, Nimi: 'Station 1', x: 24.123, y: 60.123 },
    { FID: 2, ID: 1002, Nimi: 'Station 2', x: 24.456, y: 60.456 },
    { FID: 3, ID: 1003, Nimi: 'Station 3', x: 24.789, y: 60.789 },
  ];

beforeEach(async () => {
  await Station.deleteMany({});

  const stationObjects = testStations.map(station => new Station(station));
  const savePromises = stationObjects.map(station => station.save());
  await Promise.all(savePromises);
});

describe('Stations API', () => {
test('GET request returns paginated station data', async () => {
  const response = await api.get('/api/stations').expect(200);

  expect(response.body.stations.length).toBe(3);
  expect(response.body.totalStationPages).toBe(1);
});

test('GET/search request returns correct stations', async () => {
  const response = await api
    .get('/api/stations/search')
    .query({ query: 'Station 1' })
    .expect(200);

  expect(response.body.length).toBe(1);
  expect(response.body[0].Nimi).toBe('Station 1');
});

test('GET /search handles missing query parameter', async () => {
  await api.get('/api/stations/search').expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
})