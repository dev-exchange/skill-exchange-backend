const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    subscribed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    created: {
        type: Date,
        default: Date.now(),
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;