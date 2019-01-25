const express = require('express');
const app = express();

// Declare MiddleWare
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

// Connect to MongoDB Database
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {useNewUrlParser: true});

// Import Routes
const signinRoute = require("./routes/signin");
const signupRoute = require("./routes/signup");

//Use Middleware 
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routing Logic Starts
app.get('/',(req, res) => {
    res.send("Main Page!");
});

app.use('/api',signinRoute);
app.use('/api',signupRoute);

// Start Server
const port = process.env.SRV_PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});