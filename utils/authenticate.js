const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    
    if (req.headers['x-access-token']) {

        jwt.verify(req.headers['x-access-token'], process.env.SecretKey, (err, decoded) => {
            console.log(decoded);
        });

    } else {
        res.json( {error: "Not Authenticated!"} );
    };
    
    next();
};

module.exports = authenticate;