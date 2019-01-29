const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {    
    if (req.headers['x-access-token']) {
        // Verify JWT
        jwt.verify(req.headers['x-access-token'], process.env.SecretKey, (err, decoded) => {

            if(err) {
                // If there's an error set status code and send to error handler
                res.status(401);
                next(err);             
            } else {
                // Save decoded token to response
                res.locals.username = decoded.username;
                next();
            };
        });
    } else {
        // If no token sent set status code and senr to erro handler
        res.status(401);
        next(new Error("Not Authenticated!"));
    };
};

module.exports = authenticate;