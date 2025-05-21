const validateBook = (req, res, next) => {
    const { title, author, genre } = req.body;
    const year = parseInt(req.body.year, 10);

    if (!title || !author || !genre || isNaN(year)) {
        return res.status(400).json({
            success: false,
            message: 'Missing or invalid fields: title, author, genre, year',
        });
    }

    if (year < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid year',
        });
    }

    req.body.year = year;
    next();
};


module.exports = validateBook;
