import service from '../../services/authentication.js';

async function checkValidToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('invalid token');
    return;
  }
  const token = (
    req.headers.authorization.split(' ')[0] === 'Token' ||
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) ? req.headers.authorization.split(' ')[1] : null;

  const validToken = await service.checkValidToken(token);
  switch (validToken) {
    case 'invalidToken':
      res.status(401).send('invalid token');
      return;
    case 'error':
      res.status(500).send('error');
      return;
    case 'ok':
      return next();
  }
}

export default checkValidToken;