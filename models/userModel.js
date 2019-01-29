const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fName: String,
    lName: String
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;