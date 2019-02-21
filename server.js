const express = require('express');
const app = express();

// Declare MiddleWare
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const errorhandler = require('./utils/errorHandler');

// Connect to MongoDB Database
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {useNewUrlParser: true}, (err) => {
    if (err) console.log(err);
});

// Import Routes
const signinRoute = require("./routes/signin");
const signupRoute = require("./routes/signup");
const userRoute = require('./routes/users');
const projectRoute = require('./routes/projects');

//Use Middleware 
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routing Logic Starts
app.get('/',(req, res) => {
    res.send("<h1>Skill Exchange</h1>");
});

// Unprotected Routes
app.use('/api',signinRoute);
app.use('/api',signupRoute);

// Protected Routes
app.use('/api', userRoute);
app.use('/api', projectRoute);

// Error Handler
app.use(errorhandler);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});