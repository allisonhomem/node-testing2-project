const router = require('express').Router();
const Library = require('./library-model.js');
const {checkBookId, validateBook} = require('./library-middleware.js');


router.post('/', validateBook, async (req, res, next) => {

    Library.addBook(req.body)
           .then(newBook => {
               res.json(newBook)
           })
           .catch(err => next(err))
})

router.delete('/:id', checkBookId, async (req, res, next) => {

    Library.deleteBook(req.params.id)
           .then(() => {
               next({status: 200, message: `The book with id: ${req.params.id} has been deleted from the library`})
           })
           .catch(err => next(err))
})


module.exports = router;