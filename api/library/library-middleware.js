const db = require('../../data/db-config.js');
const { getBookById } = require('./library-model.js');

const checkBookId = async (req, res, next) => {
    const { id } = req.params

    const book = await getBookById(id)

    if(!book){
        next({status: 400, message: `There is no book in the library with id: ${id}`})
    }
    else {
        next();
    }
}

const validateBook = (req, res, next) => {
    const {title, summary} = req.body

    if(!title || !summary){
        next({status: 400, message: 'Title and Summary must be filled out'})
    }
    else {
        next();
    }
}

module.exports = {
    checkBookId,
    validateBook
}