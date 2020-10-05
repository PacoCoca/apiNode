import service from '../../services/authentication.js';
import middlewares from '../middlewares/index.js';
import express from 'express';

const route = express.Router();

route.post('/login', async (req, res) => {
  // Check user credentials
  const tryLog = await service.login(req.body['email'], req.body['password']);
  switch (tryLog) {
    case 'badRequest':
      res.status(400).send('bad request');
      return;
    case 'wrongUser':
    case 'wrongPassword':
      res.status(401).send('wrong credentials');
      return;
    case 'error':
      res.status(500).send('error');
      return;
    default:
      res.status(200).send(tryLog);
  }
});

route.post('/checkJWT', middlewares.checkValidToken);
route.post('/checkJWT', async (req, res) => {
  // If it is here, it passed the checkValidToken middleware => token correct
  res.status(200).send('ok');
});

export default route;