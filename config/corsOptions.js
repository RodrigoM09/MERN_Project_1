// This file is used to configure the CORS options for the app
// CORS options are the rules that are applied to the CORS middleware.
// CORS Middleware is used to allow or restrict access to the API based on the origin of the request.
const allowedOrigins = require('./allowedOrigins')

// corsOptions is used to configure the CORS options for the app.
const corsOptions = {
    // origin is the origin of the request.
    origin: (origin, callback) => {
        // if the origin is in the allowedOrigins array or if the origin is undefined, allow the request.
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            // if the origin is not in the allowedOrigins array, do not allow the request.
            callback(new Error('Not allowed by CORS'))
        }
    },
    // credentials are the cookies that are sent with the request.
    credentials: true,
    // methods are the HTTP methods that are allowed.
    optionsSuccessStatus: 200
}

// module.exports allows this file to be used in other files.
module.exports = corsOptions