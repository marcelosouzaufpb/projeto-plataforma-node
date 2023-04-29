const express = require('express');
const morgan = require ('morgan')
const helmet = require ('helmet')

const app = express();
app.use (morgan('tiny'))
app.use (helmet())

app.use(express.json());


module.exports = {
    app,
};
