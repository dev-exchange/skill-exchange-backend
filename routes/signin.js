const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/signin', async (req, res) => {

    // Search for username in the database
    let foundUser = await User.findOne({ username: req.body.username});
    if(foundUser){
        // compare password to saved hash
        const result = await bcrypt.compare(req.body.password, foundUser.password);    
        if (result == true) {
            // If password submitted matches password in db send back jwt
            // Create JWT
            const token = jwt.sign({
                "username": foundUser.username,
            }, process.env.SecretKey, { expiresIn: "24h" });

            // Send Back JWT
            res.status(200).json({
                token: token,
            });
        } else {
            // If password submitted does not match password in db send back error message
            res.json({ error: "Username or Password is incorrect"});
        };

    } else {
        // If username is not in database send back error message
        res.json({ error: "Username or Password is incorrect"});
    }; 
});

module.exports = router;