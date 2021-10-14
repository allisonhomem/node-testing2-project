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

describe('[POST] /api/library', () => {
  test('[1] creates a new book in the database', async () => {
    await request(server).post('/api/library').send({title: "Pride & Predjudice", author: "Jane Austin", summary: "A delightful satire of romance in the nineteenth century"})
    const updatedLibrary = await db('library')
    expect(updatedLibrary).toHaveLength(library.length + 1)
  }, 1000)
  test('[2] responds with newly created book', async() => {
    const newBook = {title: "Pride & Predjudice", author: "Jane Austin", summary: "A delightful satire of romance in the nineteenth century"}
    const res = await request(server).post('/api/library').send(newBook)
    expect(res.body).toMatchObject({...newBook, book_id: library.length + 1})
  })
  test.todo('[3] authors name returns anonymous if no name is sent in req.body')
  test.todo('[4] responds with error if req.body missing title or summary')
})

describe('[DELETE] /api/library/:id', () => {
  test.todo('[5] deletes book with corresponding id in database')
  test.todo('[6] responds with success message upon deletion')
  test.todo('[7] responds with error message if book_id does not exist')
})