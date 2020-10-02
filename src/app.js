import express from 'express';
import config from './config/index.js';
import api from './api/index.js';

const app = express();

app.use(api);

app.listen(config.port, () => console.log(`Express app started on port ${config.port}`));
