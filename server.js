const express = require('express');
const app = express();

// Declare MiddleWare
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const authenticate = require('./utils/authenticate');

// Connect to MongoDB Database
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {useNewUrlParser: true});

// Import Routes
const signinRoute = require("./routes/signin");
const signupRoute = require("./routes/signup");
const userRoute = require('./routes/users');

//Use Middleware 
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routing Logic Starts
app.get('/',(req, res) => {
    res.send("Main Page!");
});

// Unprotected Routes
app.use('/api',signinRoute);
app.use('/api',signupRoute);

app.use(authenticate);
// Protected Routes
app.use('/api', userRoute);


// Start Server
const port = process.env.SRV_PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});