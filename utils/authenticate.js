function authenticate(req, res, next) {
    console.log("Works!");
    
    next();
};

module.exports = authenticate;