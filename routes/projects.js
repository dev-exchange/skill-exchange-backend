const router = require('express').Router();
const { User } = require('../models/userModel');
const Project = require('../models/projectModel');
const authenticate = require('../utils/authenticate');
const isOwner = require('../utils/isOwner');


// Route to Get All Projects
router.get('/projects', async (req, res, next) => {
    const projects = await Project.find()
                        .populate('owner', ['email', 'username'])
                        .populate('subscribed', ['email', 'username']);
    res.status(200).json(projects);
});

// Route to Create a Project
router.post('/projects', authenticate, async (req, res, next) => {

    try {
        // Find User who is Creating Project
        const user = await User.findOne({username: res.locals.username});

        // Create Unique Name to save in DB
        const name = `${res.locals.username + '-' + req.body.title.replace(' ', '-').toLowerCase()}`; 
        // Make sure project with same name does not exist
        const projectExists = await Project.findOne({name: name});
        if(!projectExists) {

            // Create New Project Model
            let project = new Project({
                title: req.body.title,
                subtitle: req.body.subtitle,
                name: name,
                description: req.body.description,
                status: req.body.status,
                owner: user._id,
                subscribed: [user._id]
            });

            // Save the Project to the Database
            project = await project.save();

            // Update the User Document with Newly Created Project
            user.owned.push(project._id);
            user.subscribed.push(project._id);
            await user.save();
            
            res.status(200).json(project);

        } else {
            res.status(400);
            next(new Error('Project With that name already exists'));
        };
    
    } catch (error) {
        next(error);        
    };
});


// Route to Get a Project
router.get('/projects/:username/:title', async (req, res, next) => {

    try {
        // Find Project Based On Name Field
        const name = `${req.params.username}-${req.params.title}`;

        const project = await Project.findOne({name: name})
                            .populate('owner', ['email', 'username'])
                            .populate('subscribed', ['email', 'username']);
        
        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404);
            next(new Error("Project Not Found"));
        };

    } catch (error) {
        next(error);
    }


});

// Route to Update a Project
router.put('/projects/:username/:title', authenticate, async (req, res, next) => {

    // Find Project Based On Name Field
    const name = `${req.params.username}-${req.params.title}`;
    let project = await Project.findOne({name: name}).populate('owner', 'username');
    
    if(project) {
        // Make Sure Project Owner is Submitting Update Request
        if(isOwner(project.owner.username, res.locals.username)) {
        
            for (const property in req.body) {
                project[property] = req.body[property];
            }
            project.name = `${req.params.username}-${req.body.title.replace(' ', '-').toLowerCase()}`;
            project.updated = Date.now();

            // Save Updated Project
            project = await project.save();
            res.status(200).json({
                message: "Project Updated",
                project: project
            });

        } else {
            // Allow Non Project Owners to subscribe if open join is true
            res.status(400);
            next(new Error('Only Project Owner can Update Projects'));
        };
    } else {
        next(new Error('Project Not Found'));
    };
});

// Route to Delete a project
        
    
module.exports = router;