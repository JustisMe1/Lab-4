const express = require('express');
const pug = require('pug');
const animal = require('./routes/animal.route');
require('dotenv').config();

//initialize method
const app = express();
//use port from env or default to 3000
const PORT = process.env.PORT || 3000;

//configure routes
app.use('/', animal);

app.set('views', `${__dirname}/views`);
app.set("view engine", "pug");

// Listen on PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})