// Description: This file is the entry point for the application. It creates the server and listens for requests.
// It also uses middleware to handle requests and errors.

// dotenv is used to load environment variables from a .env file into process.env.
require('dotenv').config();

// express is used to create the server. It is a node module.
const express = require('express');

// app is the express application. It is used to create the server.
const app = express();

// Path is used to get the path to the current directory.
const path = require('path');

// logger is used to log requests to the console and to a file.
const { logger } = require('./middleware/logger');

// errorHandler is used to handle errors. It takes an error, request, response, and next as parameters.
const errorHandler = require('./middleware/errorHandler');

// cookieParser is used to parse cookies. parse cookies means to decode the cookie string and convert it to an object.
const cookieParser = require('cookie-parser');

// cors is used to allow or restrict access to the API based on the origin of the request.
const cors = require('cors');

// corsOptions is used to configure the CORS options for the app.
// CORS options are the rules that are applied to the CORS middleware.
const corsOptions = require('./config/corsOptions');

// connectDB is used to connect to the database. It is a function that returns a promise.
// The promise resolves when the connection is successful and rejects when the connection is unsuccessful.
const connectDB = require('./config/dbConn');

// mongoose is used to connect to the database.
const mongoose = require('mongoose');

// logEvents is used to log events to the console and to a file.
const { logEvents} = require('./middleware/logger');

// PORT is the port the application is running on. It is set to 8080 if the PORT environment variable is not set.
const PORT = process.env.PORT || 3500;

// ENV is the environment the application is running in. IE development, production, etc.
console.log(process.env.NODE_ENV);

connectDB();

// Tells express to use the middleware folder for middleware.
// logger is the name of the js file in the middleware' folder.
app.use(logger);

// Allows application to use CORS. (Cross Origin Resource Sharing)
// CORS is a mechanism that allows restricted resources on a web page to be requested
// from another domain outside the domain from which the first resource was served.
app.use(cors(corsOptions));

//Allows application to parse JSON data.(Receive and send JSON data)
app.use(express.json());

//Allows application to parse URL encoded data.(Receive and send URL encoded data, "cookies")
app.use(cookieParser());

// Tells express to use the public folder for static files. IE CSS, JS, images, etc.
app.use('/', express.static(path.join(__dirname, '/public')));

// Tells express to use the routes folder for routing(CONTROLLER).
// roots is the name of the js file in the routes' folder.
app.use('/', require('./routes/root'));

app.use('/users', require('./routes/userRoutes'));

// sends 404 error if no route is found.
app.all('*', (req, res) => {
    res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: 'Not found' });
  } else {
    res.type('txt').send('Not found');
  }
});

// Uses the errorHandler middleware to handle errors.
app.use(errorHandler);

// Tells the application to listen for requests on the PORT.
mongoose.connection.once('open', () => {
  console.log('Connected to database');
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

})

mongoose.connection.on('error', (err) => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t{err.syscall}\t${err.hostname}`,
      'mongoErrLog.log')
});