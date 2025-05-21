const Book = require('../models/Book');

const getAllBooks = async () => Book.find().sort({ createdAt: -1 });

const getBookById = async (id) => Book.findById(id);

const getBooksByAuthor = async (author) =>
    Book.find({ author: new RegExp(author, 'i') });

const getBooksByGenre = async (genre) =>
    Book.find({ genre: new RegExp(genre, 'i') });

const getTopBooks = async () =>
    Book.find().sort({ rating: -1 }).limit(10);

const getTopBooksByGenre = async (genre) =>
    Book.find({ genre: new RegExp(genre, 'i') }).sort({ rating: -1 }).limit(10);

const getTopAuthors = async () => {
    return Book.aggregate([
        {
            $group: {
                _id: '$author',
                avgRating: {$avg: '$rating'},
                count: {$sum: 1},
            },
        },
        {$sort: {avgRating: -1}},
        {$limit: 3},
    ]);
};

const addBook = async (bookData) => {
    const book = new Book(bookData);
    return book.save();
};


const updateBook = async (id, data) =>
    Book.findByIdAndUpdate(id, data, { new: true });

const deleteBook = async (id) => Book.findByIdAndDelete(id);

const rateBook = async (id, rating) => {
    const book = await Book.findById(id);
    if (!book) return null;

    book.rating = (book.rating + rating) / 2;
    return book.save();
};

const addReview = async (id, review) => {
    const book = await Book.findById(id);
    if (!book) return null;
    book.reviews.push(review);
    return book.save();
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
};
