const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    // owner: ID
    // subscribed: Array of ID's
    created: Date,
    updated: Date
});

const Projects = mongoose.model('project', projectSchema);

module.exports = Projects;