// Description: This file contains the schema for the Note model.
// The Note model is used to store note information in the database.

// mongoose is a library that allows us to interact with MongoDB
const mongoose = require('mongoose');

// AutoIncrement is used to automatically increment the _id field of the model.
// This is used to generate the _id field of the model.
const AutoIncrement = require('mongoose-sequence')(mongoose);

// This is the schema for the user model.
// The user model is used to store user information in the database.
const noteSchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
    },
    {
        timestamps: true
    }
    );

// This is used to automatically increment the _id field of the model
noteSchema.plugin(AutoIncrement, {
    // This is the name of the field that will be incremented.
    inc_field: 'ticket',
    // This is the name of the field that will be used to store the current sequence.
    id: 'ticketNums',
    // This is the starting sequence. The first _id will be 500.
    start_seq: 500,
});

module.exports = mongoose.model('Note', noteSchema);