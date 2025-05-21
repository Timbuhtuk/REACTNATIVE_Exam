const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateBook = require('../middlewares/validateBook');
const upload = require('../middlewares/upload');

// GET top 3 authors
router.get('/top-authors', bookController.getTopAuthors);

// GET top 10 books by genre
router.get('/top/genre/:genre', bookController.getTopBooksByGenre);

// GET top 10 books
router.get('/top', bookController.getTopBooks);

// GET books by author
router.get('/author/:name', bookController.getBooksByAuthor);

// GET books by genre
router.get('/genre/:genre', bookController.getBooksByGenre);

// GET all books
router.get('/', bookController.getAllBooks);

// GET book by ID (must come after all above!)
router.get('/:id', bookController.getBookById);

// POST new book
router.post('/', upload.single('file'), validateBook, bookController.addBook);

// GET read book
router.get('/:id/read', bookController.readBook);

// PUT update book
router.put('/:id', bookController.updateBook);

// DELETE book
router.delete('/:id', bookController.deleteBook);

// POST rate a book
router.post('/:id/rate', bookController.rateBook);

// POST review a book
router.post('/:id/review', bookController.addReview);

module.exports = router;