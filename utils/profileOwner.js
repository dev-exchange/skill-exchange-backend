function profileOwner (user, res) {    
    // Check to See if they are the profile owner            
    if (user.username === res.locals.username) {
        return true;    
    } else;
    // Request is not from profile owner
        return false; 
};

module.exports = profileOwner;