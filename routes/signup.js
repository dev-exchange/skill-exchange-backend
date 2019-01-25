const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fName: String,
    lName: String
});
const User = mongoose.model('user', userSchema);

router.post('/signup', async (req, res) => {

    // Search for username in the database
    try {
    
        // Search DB for account with provided username
        const foundUser = await User.findOne({ username: req.body.username });
        if (!foundUser) {
            
            // Hash Password
            const hash = brypt.hash(req.body.password, process.env.saltRounds);

            let newUser = new User({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                fName: req.body.fName,
                lName: req.body.lName
            });
            
            // Save New User to the DB
            newUser = await newUser.save();

            // Create JWT
            const token = jwt.sign({
                "username": newUser.username,
            }, process.env.SecretKey, { expiresIn: "24h" });

            // Send Back JWT
            res.status(200).json({
                token: token,
            });
        
        } else {
            // If username is found in database send error
            res.json( {message: "User Already Exists!"} );
        };
    } catch (error) {
        console.log(error);
        
    }
});

module.exports = router;