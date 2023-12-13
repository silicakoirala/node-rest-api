const errorMiddleware = (err, req, res, next ) => {
    console.log('Here is an error middleware');
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.statusCode(statusCode);
    res.json({message: err.message, stack: process.env.MODE_ENV === "development" ? err.stack: null})
}

module.exports = errorMiddleware;