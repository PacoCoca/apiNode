import service from '../../services/private.js'
import express from 'express';
import middlewares from '../middlewares/index.js';

const route = express.Router();

// All requests require to be admin
route.use('/', middlewares.checkValidToken, middlewares.userData);

route.post('/', async (req, res) => {
  if (res.locals['userType'] !== 'admin') {
    res.status(401).send('unauthorized');
    return;
  }

  const result = await service.create(
    req.body['field1'],
    req.body['field2'],
  );

  switch (result) {
    case 'badRequest':
      res.status(400).send('bad request');
      return;
    case 'ok':
      res.status(200).send('ok');
      return;
    case 'error':
      res.status(500).send('error');
      return;
  }
});

route.get('/:id?', async (req, res) => {
  if (res.locals['userType'] !== 'admin') {
    res.status(401).send('unauthorized');
    return;
  }

  const result = await service.read(req.params.id);
  if (result === "error") {
    res.status(500).send("error");
    return;
  }
  res.send(result);
});

route.put('/:id', async (req, res) => {
  if (res.locals['userType'] !== 'admin') {
    res.status(401).send('unauthorized');
    return;
  }

  const result = await service.update(
    req.params['id'],
    req.body['field1'],
    req.body['field2'],
  );

  switch (result) {
    case 'badRequest':
      res.status(400).send('bad request');
      return;
    case 'ok':
      res.status(200).send('ok');
      return;
    case 'error':
      res.status(500).send('error');
      return;
  }
});

route.delete('/:id', async (req, res) => {
  if (res.locals['userType'] !== 'admin') {
    res.status(401).send('unauthorized');
    return;
  }

  const result = await service.delete(
    req.params['id']
  );

  switch (result) {
    case 'badRequest':
      res.status(400).send('bad request');
      return;
    case 'ok':
      res.status(200).send('ok');
      return;
    case 'error':
      res.status(500).send('error');
      return;
  }
});

export default route;