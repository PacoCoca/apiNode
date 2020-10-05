import express from "express";
import authentication from "./routes/authentication.js";
import publicRoute from './routes/public.js';
import privateRoute from './routes/private.js';

const app = express.Router();

app.use('/auth', authentication);
app.use('/public', publicRoute);
app.use('/private', privateRoute);

app.get('/', (req, res) => res.send('test'));

export default app;