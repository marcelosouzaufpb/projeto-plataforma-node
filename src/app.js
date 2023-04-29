const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const port = process.env.PORT || 3000;
const router = require('./services/book.service');

const app = express();

app.use(morgan('tiny'));
app.use(helmet());

app.use('/api/v1', router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use((req, res) => {
    res.status(404).send('It is not found.');
});
