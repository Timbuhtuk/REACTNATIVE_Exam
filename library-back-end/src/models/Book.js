const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    filePath: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);
