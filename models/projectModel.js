const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    name: {
        type: String,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    membership: {
        type: Boolean,
        default: true,
    },
    openJoin: {
        type: Boolean,
        default: true,
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