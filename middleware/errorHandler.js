const { logEvents } = require('./logger');

// This is the error handler middleware. It is used to handle errors.
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'error.log')
    console.log(err.stack);


    const status = res.statusCode ? res.statusCode : 500;

    res.status(status)

    res.json({message: err.message})

}

// module.exports allows this file to be used in other files.
module.exports = errorHandler;