const db = require('../../data/db-config.js');

function getLibrary() {
    return db('library');
}

function getBookById(id) {
    return db('library').where('book_id', id).first();
}

async function addBook(newBook) {
    const [id] = await db('library').insert(newBook);
    return getBookById(id);
}

function deleteBook(id) {
 
}

module.exports = {
    getLibrary,
    getBookById,
    addBook,
    deleteBook
}