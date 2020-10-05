import express from "express";
import authentication from "./routes/authentication.js";
import publicRoute from './routes/public.js';

const app = express.Router();

app.use('/auth', authentication);
app.use('/public', publicRoute);

app.get('/', (req, res) => res.send('test'));

export default app;