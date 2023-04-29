const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const router = require('./services/book.service');

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/$DOMAIN/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/$DOMAIN/fullchain.pem')
};

const app = express();

app.use(morgan('tiny'));
app.use(helmet());

app.use('/api/v1', router);

https.createServer(options, app).listen(8000);
