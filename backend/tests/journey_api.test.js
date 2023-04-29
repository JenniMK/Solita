/* const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Journey = require('../models/journey');

const api = supertest(app);

const testJourneys = [
  {
    Departure: new Date(),
    Return: new Date(),
    "Departure station id": 1,
    "Departure station name": "Station A",
    "Return station id": 2,
    "Return station name": "Station B",
    "Covered distance (m)": 5000,
    "Duration_sec": 3600,
  },
  {
    Departure: new Date(),
    Return: new Date(),
    "Departure station id": 2,
    "Departure station name": "Station B",
    "Return station id": 3,
    "Return station name": "Station C",
    "Covered distance (m)": 6000,
    "Duration_sec": 4800,
  },
];

beforeEach(async () => {
  await Journey.deleteMany({});

  const journeyObjects = testJourneys.map(journey => new Journey(journey));
  const savePromises = journeyObjects.map(journey => journey.save());
  await Promise.all(savePromises);
});

describe('Journeys API', () => {
  test('GET /api/journeys returns paginated journey data', async () => {
    const response = await api.get('/api/journeys').expect(200);

    expect(response.body.journeys.length).toBe(2);
  expect(response.body.totalJourneyPages).toBe(1);
}, 60000);
-
  afterAll(() => {
    mongoose.connection.close();
  });
}); */