import service from '../../services/public.js'
import express from 'express';

const route = express.Router();

route.post('/', async (req, res) => {
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
  const result = await service.read(req.params.id);
  if (result === "error") {
    res.status(500).send("error");
    return;
  }
  res.send(result);
});

route.put('/:id', async (req, res) => {
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
  const result = await service.update(
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