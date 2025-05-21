const logger = (req, res, next) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19); // "YYYY-MM-DD HH:MM:SS"
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ${method} ${url}`);
    next();
};

module.exports = logger;
