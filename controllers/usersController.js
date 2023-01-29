    // Description: This file contains the controller functions for the users routes.
    // The controller functions are used to handle requests to the API.


    const User = require('../models/User');
    const Note = require('../models/Note');

    // asyncHandler is used to wrap async functions and handle errors.
    const asyncHandler = require('express-async-handler');

    // bcrypt is used to hash passwords.
    const bcrypt = require('bcrypt');

    // @desc Get all users
    // @route GET /users
    // @access Private
    const getAllUsers = asyncHandler(async (req, res) => {
        const users = await User.find().select('-password').lean()
        if(!users) {
            return res.status(400).json({ message: 'No users found' });
        }
        res.json(users);
    });

    // @desc Create a user
    // @route POST /users
    // @access Private
    const createUser = asyncHandler(async (req, res) => {
        const { username, password, roles } = req.body;

        // Check if all fields are provided
        if(!username || !password || !Array.isArray(roles) || !roles.length) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check for duplicates
        const duplicate = await User.findOne({ username }).lean().exec();
        if(duplicate) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userObject = { username, password: hashedPassword, roles };

        // Create user
        const user = await User.create(userObject);
        if(user){
            res.status(201).json({ message: `User ${username} created successfully` });
        } else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    });

    // @desc Update a user
    // @route PATCH /users
    // @access Private
    const updateUser = asyncHandler(async (req, res) => {
        // gets the id, username, roles, active, and password from the request body
        const { id, username, roles, active, password } = req.body;
        // Check if all fields are provided
        if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean") {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findById(id).exec();
        // Check if user exists
        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Check for duplicates
        const duplicate = await User.findOne({ username }).lean().exec();
        //Allow the user to update their own account
        if(duplicate && duplicate?._id.toString() !== id) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        user.username = username;
        user.roles = roles;
        user.active = active;
    });

    // @desc Delete a user
    // @route DELETE /users
    // @access Private
    const deleteUser = asyncHandler(async (req, res) => {

    });

    module.exports = {
        getAllUsers,
        createUser,
        updateUser,
        deleteUser
    }