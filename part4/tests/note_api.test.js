const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const MONGODB_URI = process.env.TEST_MONGODB_URI


test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
