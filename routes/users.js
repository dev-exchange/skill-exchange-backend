const router = require('express').Router();
const Users = require('../models/userModel');
const authenticate = require('../utils/authenticate');


function profileOwner (user, res) {    
    // Check to See if they are the profile owner            
    if (user.username === res.locals.username) {
        return true;    
    } else;
    // Request is not from profile owner
        return false; 
};

router.get('/users', authenticate, async (req, res, next) => {
    const users = await Users.find();
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(500);
        next(new Error('Can Not Get Users'));
    };
});

// Route to Get User
router.get('/users/:username', authenticate, async (req, res, next) => {
    const user = await Users.findOne({username: req.params.username});
    if (user) {
        let owner = profileOwner(user, res);
        if (owner) {
            // Send All Data Back to User
            res.status(200).json(user);
        } else {
            // Send Partial Data Back to User
            res.status(200).json({
                username: user.username,
                email: user.email
            });
        };
    } else {
        res.status(404);
        next(new Error('User Not Found!'));
    };
});

// Route to Update User
router.put('/users/:username', authenticate, async (req, res, next) => {
    //Find user in database
    let user = await Users.findOne({username: req.params.username});
    if (user) {
        // Make sure user submitting request is the account owner
        let owner = profileOwner(user, res);
        if (owner) {
            // Update Data That Was Sent
            for (const property in req.body) {
                user[property] = req.body[property];
            };

            // Save Updated user to Database
            user = await user.save();
            
            res.status(200).json({
                message: "User Updated",
                user: user
            });

        } else {
            // Send Back Error
            res.status(403);
            next(new Error('Can Only Update Your Account'));
        };
    } else {
        res.status(404);
        next(new Error('Can Not Update a User That Does Not Exist'));
    };
});

// Route to Get User
router.delete('/users/:username', authenticate, async (req, res, next) => {
    const user = await Users.findOne({username: req.params.username});
    if (user) {
        let owner = profileOwner(user, res);
        if (owner) {
            // Delete User
            await Users.deleteOne({ username: res.locals.username});
            res.status(200).json({
                message: "User Deleted",
                user: user
            });

        } else {
            // Send Back Error
        };
    } else {
        res.status(404);
        next(new Error('User Not Found!'));
    };
});

module.exports = router;