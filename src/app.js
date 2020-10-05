import express from 'express';
import config from './config/index.js';
import api from './api/index.js';
import bodyParser from 'body-parser';

const app = express();

// Middleware to parse the body of the requests
app.use(bodyParser.json());

app.use(api);

app.listen(config.port, () => console.log(`Express app started on port ${config.port}`));
