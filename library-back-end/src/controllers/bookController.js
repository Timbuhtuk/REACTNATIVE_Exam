const bookService = require('../services/bookService');
const fs = require('fs');
const path = require('path');

// GET /books
const getAllBooks = async (req, res, next) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

// GET /books/:id
const getBookById = async (req, res, next) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        next(err);
    }
};

// GET /books/author/:name
const getBooksByAuthor = async (req, res, next) => {
    try {
        const books = await bookService.getBooksByAuthor(req.params.name);
        res.json(books);
    } catch (err) {
        next(err);
    }
};

// GET /books/genre/:genre
const getBooksByGenre = async (req, res, next) => {
    try {
        const books = await bookService.getBooksByGenre(req.params.genre);
        res.json(books);
    } catch (err) {
        next(err);
    }
};

// GET /books/top
const getTopBooks = async (req, res, next) => {
    try {
        const books = await bookService.getTopBooks();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

// GET /books/top/:genre
const getTopBooksByGenre = async (req, res, next) => {
    try {
        const books = await bookService.getTopBooksByGenre(req.params.genre);
        res.json(books);
    } catch (err) {
        next(err);
    }
};

// GET /books/top/author/:name
const getTopAuthors = async (req, res, next) => {
    try {
        const topAuthors = await bookService.getTopAuthors();
        res.json(topAuthors);
    } catch (err) {
        next(err);
    }
};

// GET /books/:id/read
const readBook = async (req, res, next) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const filePath = path.resolve(book.filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        res.type('text/plain').send(fileContent);
    } catch (err) {
        next(err);
    }
};


// POST /books
const addBook = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required (text file)',
            });
        }

        const bookData = {
            ...req.body,
            filePath: req.file.path,
        };

        const newBook = await bookService.addBook(bookData);
        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
};


// PUT /books/:id
const updateBook = async (req, res, next) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        next(err);
    }
};

// DELETE /books/:id
const deleteBook = async (req, res, next) => {
    try {
        const deleted = await bookService.deleteBook(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        next(err);
    }
};

// POST /books/:id/rate
const rateBook = async (req, res, next) => {
    try {
        const rating = parseFloat(req.body.rating);
        if (isNaN(rating) || rating < 0 || rating > 10) {
            return res.status(400).json({ message: 'Rating must be a number between 0 and 10' });
        }

        const updated = await bookService.rateBook(req.params.id, rating);
        if (!updated) return res.status(404).json({ message: 'Book not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

// POST /books/:id/review
const addReview = async (req, res, next) => {
    try {
        const { author, text } = req.body;
        if (!author || !text) {
            return res.status(400).json({ message: 'Author and text are required for a review' });
        }

        const updated = await bookService.addReview(req.params.id, { author, text });
        if (!updated) return res.status(404).json({ message: 'Book not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    getBooksByGenre,
    getTopBooks,
    getTopBooksByGenre,
    getTopAuthors,
    addBook,
    updateBook,
    deleteBook,
    rateBook,
    addReview,
    readBook,
};
