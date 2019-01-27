const router = require('express').Router();
const User = require('../models/userModel');


router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({error: error})
    }
});

router.get('/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        if (user) {
            res.json(user);
        } else {
            res.json({error: "User Not Found"});
        };
    } catch (error) {
        res.json({error: error})
    }
});

module.exports = router;