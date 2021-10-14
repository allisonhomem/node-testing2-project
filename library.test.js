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
  })
  test('[2] responds with newly created book', async() => {
    const newBook = {title: "Pride & Predjudice", author: "Jane Austin", summary: "A delightful satire of romance in the nineteenth century"}
    const res = await request(server).post('/api/library').send(newBook)
    expect(res.body).toMatchObject({...newBook, book_id: library.length + 1})
  })
  test('[3] authors name returns anonymous if no name is sent in req.body', async () => {
    const newBook = {title: "Pride & Predjudice", summary: "A delightful satire of romance in the nineteenth century"}
    const res = await request(server).post('/api/library').send(newBook)
    expect(res.body).toMatchObject({...newBook, book_id: library.length + 1, author: "anonymous"})
  })
  test('[4] responds with error if req.body missing title or summary', async () => {
    let newBook = {title: null, author: "Jane Austen", summary: "A delightful satire of romance in the nineteenth century"}
    let res = await request(server).post('/api/library').send(newBook)
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('message', 'Title and Summary must be filled out')

    let newBook2 = {title: "Pride & Predjudice", author: "Jane Austen", summary: null}
    let res2 = await request(server).post('/api/library').send(newBook2)
    expect(res2.status).toBe(400)
    expect(res2.body).toHaveProperty('message', 'Title and Summary must be filled out')
  })
})

describe('[DELETE] /api/library/:id', () => {
  test('[5] deletes book with corresponding id in database', async () => {
    await request(server).delete('/api/library/1')
    const deleted = await db('library').where('book_id', 1).first()
    expect(deleted).toBeFalsy()
  })
  test('[6] responds with success message upon deletion', async () => {
    let res = await request(server).delete('/api/library/1')
    expect(res.body).toHaveProperty('message', 'The book with id: 1 has been deleted from the library')
  })
  test('[7] responds with error message if book_id does not exist', async () => {
    let res = await request(server).delete('/api/library/100')
    expect(res.body).toHaveProperty('message', 'There is no book in the library with id: 100')
  })
})