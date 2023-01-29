const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});