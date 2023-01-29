// This file is used to configure the CORS options for the app
// CORS options are the rules that are applied to the CORS middleware.
// CORS Middleware is used to allow or restrict access to the API based on the origin of the request.
const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

// module.exports allows this file to be used in other files.
module.exports = corsOptions