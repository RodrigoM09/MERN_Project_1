// This file is used to handle errors.
// It takes an error, request, response, and next as parameters.

const { logEvents } = require('./logger');

// This is the error handler middleware. It is used to handle errors.
const errorHandler = (err, req, res, next) => {
    // log the error to the console.
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'error.log')
    console.log(err.stack);

    // set the status code to 500 if it is not set.
    const status = res.statusCode ? res.statusCode : 500;

    // send the error message to the client.
    res.status(status)

    // if the request accepts html, send the error message as html.
    res.json({message: err.message})

}

// module.exports allows this file to be used in other files.
module.exports = errorHandler;