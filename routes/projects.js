const router = require('express').Router();
const { User } = require('../models/userModel');
const Project = require('../models/projectModel');
const authenticate = require('../utils/authenticate');
const profileOwner = require('../utils/profileOwner');


// Route to Get All Projects
router.get('/projects', async (req, res, next) => {
    const projects = await Project.find().populate('owner', ['email', 'username']);
    res.json(projects);
});

// Route to Create a Project
router.post('/projects', authenticate, async (req, res, next) => {

    try {
        // Find User who is Creating Project
        const user = await User.findOne({username: res.locals.username});

        // Create New Project Model
        let project = new Project({
            name: req.body.name,
            description: req.body.description,
            owner: user._id
        });

        // Save the Project to the Database
        project = await project.save();

        // Update the User Document with Newly Created Project
        user.owned.push(project._id);
        user.subscribed.push(project._id);
        await user.save();
        
        res.status(200).json(project);
    
    } catch (error) {
        next(error);        
    };
});


// Route to Get a Project


// Route to Update a Project


// Route to Delete a project
        
    
module.exports = router;