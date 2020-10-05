import express from "express";
import publicRoute from './routes/public.js';

const app = express.Router();

app.use('/public', publicRoute);

app.get('/', (req, res) => res.send('test'));

export default app;