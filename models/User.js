// mongoose is a library that allows us to interact with MongoDB
// mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It manages relationships between data, provides schema validation,
// and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require('mongoose');

// This is the schema for the user model.
// The user model is used to store user information in the database.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
       type: String,
       default: 'employee'
    }],
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);