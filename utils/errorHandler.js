function errorHandler(error, req, res, next){
    res.json({error: error.message});
};

module.exports = errorHandler;