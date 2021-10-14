const db = require('../../data/db-config.js');

const checkBookId = (req, res, next) => {

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