const express = require('express');
const router = express.Router();
const path = require('path');

// GET / - returns the index.html file.
// This route is used to serve the index.html file.
// The index.html file is the entry point for the React app.
// The React app is served from this file.
router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// module.exports allows this file to be used in other files.
module.exports = router;