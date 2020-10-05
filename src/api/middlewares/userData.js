import jsonwebtoken from 'jsonwebtoken';
import service from '../../services/user.js';
import config from '../../config/index.js';

async function userData(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { email, iat } = jsonwebtoken.verify(token, config.authKey);

    const result = await service.userData(email);
    if (result === 'badRequest') {
      res.status(400).send('bad request');
      return;
    }
    if (result === 'error') {
      res.status(500).send('error');
      return;
    }

    res.locals['userType'] = result['type'];
    res.locals['userId'] = result['id'];
    return next();
  } catch (error) {
    if (error.name == 'JsonWebTokenError') {
      res.status(401).send('invalid token');
    } else {
      res.status(500).send('error');
      console.log('Error at middlewares -> userData: ');
      console.log(error);
    }
    return;
  }
}

export default userData;