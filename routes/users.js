const router = require('express').Router();
const User = require('../models/userModel');
const authenticate = require('../utils/authenticate');


function profileOwner (user, res) {    
    // Check to See if they are the profile owner            
    if (user.username === res.locals.username) {
        return true;    
    } else;
    // Request is not from profile owner
        return false; 
};

// Route to Get All Users
router.get('/users', authenticate, async (req, res, next) => {
    try {
        const users = await User.find();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(500);
            next(new Error('Unable to Get All Users'));
        };        
    } catch (error) {
        next(error);
    };
});


// Route to Get User
router.get('/users/:username', authenticate, async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.params.username});
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
            next(new Error('User Not Found'));
        };        
    } catch (error) {
        next(error);
    };
});


// Route to Update User
router.put('/users/:username', authenticate, async (req, res, next) => {
    try {
         //Find user in database
        let user = await User.findOne({username: req.params.username});
        if (user) {
            // Make sure user submitting request is the account owner
            let owner = profileOwner(user, res);
            if (owner) {
                // Update Data That Was Sent
                for (const property in req.body) {
                    user[property] = req.body[property];
                };

                // Save Updated user to Database
                user.updated = Date.now();
                user = await user.save();
                
                res.status(200).json({
                    message: "User Updated",
                    user: user
                });

            } else {
                // Send Back Error
                res.status(403);
                next(new Error('Not Account Owner'));
            };
        } else {
            res.status(404);
            next(new Error('User Not Found'));
        };
            
    } catch (error) {
        next(error);        
    };
});


// Route to Delete User
router.delete('/users/:username', authenticate, async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.params.username});
        if (user) {
            let owner = profileOwner(user, res);
            if (owner) {
                // Delete User
                await User.deleteOne({ username: res.locals.username});
                res.status(200).json({
                    message: "User Deleted",
                    user: user
                });

            } else {
                // Send Back Error
                res.status(403);
                next(new Error('Not Account Owner'));
            };
        } else {
            res.status(404);
            next(new Error('User Not Found'));
        };
    } catch (error) {
        next(error);
    };
});

module.exports = router;