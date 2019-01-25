const router = require('express').Router();

router.post('/signin', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    // Search for username in the database
        // If username in database compare password to saved password
            // If password submitted matches password in db send back jwt
            // If password submitted does not match password in db send back error message
        // If username is not in database send back error message

    console.log(req.body);
    
    let data = {
        "route": "Signin",
        "status": "200 Success"
    };

    res.json(data);
});

module.exports = router;