const router = require('express').Router();
const Library = require('./library-model.js');
const {checkBookId, validateBook} = require('./library-middleware.js');

router.post('/', async (req, res, next) => {

    Library.addBook(req.body)
           .then(newBook => {
               res.json(newBook)
           })
           .catch(err => next(err))
})


module.exports = router;