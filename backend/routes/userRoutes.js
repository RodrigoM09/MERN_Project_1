const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// CRUD operations for the user model
// GET /users - returns all users
// GET /users/:id - returns a user with the specified id
// POST /users - creates a new user
// PATCH /users/:id - updates a user with the specified id
// DELETE /users/:id - deletes a user with the specified id
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;