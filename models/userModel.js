const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 8,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        maxlength: 250,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },    
    updated: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;