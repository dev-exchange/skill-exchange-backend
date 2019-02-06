const mongoose = require('mongoose');
const Joi = require('joi');


function validate(userObject, method) {
    const schema = (method == "create") ? createUserSchema : editUserSchema;
    return Joi.validate(userObject, schema)
};


const createUserSchema = Joi.object().keys({
    username: Joi.string().min(8).max(50).lowercase().trim().required(),
    password: Joi.string().min(8).max(50).trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    firstName: Joi.string().lowercase().trim(),
    lastName: Joi.string().lowercase().trim()
});


const editUserSchema = Joi.object().keys({
    username: Joi.string().min(8).max(50).lowercase().trim(),
    password: Joi.string().min(8).max(50).trim(),
    email: Joi.string().email().lowercase().trim(),
    firstName: Joi.string().lowercase().trim(),
    lastName: Joi.string().lowercase().trim()
});


const User = mongoose.model('user', new mongoose.Schema({
    username: {
        type: String,
        minlength: 8,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        maxlength: 250,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    subscribed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    owned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },    
    updated: {
        type: Date,
        required: true,
        default: Date.now()
    }
}));


module.exports = { User, validate };