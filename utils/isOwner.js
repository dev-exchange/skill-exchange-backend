function isOwner(objectOwner, currentUser) {
    if (objectOwner === currentUser) {
        return true;    
    } else{;
    // Request is not from objectowner
        return false;  
    };
}
module.exports = isOwner;