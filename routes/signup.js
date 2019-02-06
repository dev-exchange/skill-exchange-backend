const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validate } = require('../models/userModel');

router.post('/signup', async (req, res, next) => {
    try {
        
        // Validate User Input
        const {error, value} = validate(req.body, "create");
        if(error) return res.json({error: error.message});

        // Search DB for account with provided username
        // If username is found in database send error
        const foundUser = await User.findOne({ username: value.username });
        if (foundUser) return res.json({error: "User Already Exists!"});
            
        // Hash Password
        const hash = await bcrypt.hash(value.password, 8);

        let newUser = new User({
            username: value.username,
            password: hash,
            email: value.email,
            firstName: value.firstName,
            lastName: value.lastName
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

    } catch (error) {  
        next(error)   
    }
});

module.exports = router;