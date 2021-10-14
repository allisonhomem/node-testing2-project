const request = require('supertest')
const server = require('./api/server.js')
const db = require('./data/db-config.js')
const { library } = require('./data/seeds/library-data.js')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db.seed.run()
  })
  afterAll(async () => {
    await db.destroy()
  })

test('[0] tests working', () => {
    expect(true).not.toBe(false);
})