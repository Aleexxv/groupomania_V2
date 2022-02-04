const express = require('express');
// const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

db.authenticate()
    .then(() => console.log('Connexion à la base de donnée réussi !'))
    .catch(err => console.error('Connexion à la base de donnée échoué essai encore !', err));

    //APP
// CREATE APP AND USE
const app = express();
app.use(express.json());
// app.use(cors({
//     credentials: true,
//     origin : 'http://localhost:4000'
// }));

// ROUTES
// GET ALL BLOG_TEXTS
const usersRoute = require('./routes/users');
const blogTextsRoute = require('./routes/blogTexts');

//HEADERS APP
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers','origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/users', usersRoute);
app.use('/api/blogTexts', blogTextsRoute);

// EXPORT APP
module.exports = app;