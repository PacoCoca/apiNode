import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/index.js';
import getConnection from '../database/getConnection.js';

class AuthenticationService {
  async login(email, password) {
    if (!email || !password) {
      return 'badRequest';
    }
    let conn;
    try {
      conn = await getConnection();
      let query = 'SELECT id, password FROM user WHERE email=?';
      const stored = await conn.get(query, [email]);
      if (!stored || !stored['password']) {
        // User doesn't exist
        return 'wrongUser';
      }

      const passwordCorrect = await bcrypt.compare(password, stored['password']);
      if (!passwordCorrect) {
        return 'wrongPassword';
      }

      // Send the token and save issued time
      const iat = Math.floor(Date.now() / 1000);
      conn.run(
        `UPDATE user SET iat=date(?,"unixepoch") WHERE email=?`,
        [iat, email]
      );

      const payload = {
        'iat': iat,
        'email': email,
      };

      // Default algorithm is HS256 (HMAC with SHA-256), the one we'll use, so 
      // I don't need to specify it
      // The key must be at least 256 bits to be secure
      const token = jsonwebtoken.sign(payload, config.authKey);

      return token;
    } catch (error) {
      console.log('Error at AuthenticationService -> login: ');
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }

  async checkValidToken(token) {
    if (!token) {
      return 'invalidToken';
    }
    let conn;
    try {
      conn = await getConnection();
      const query = 'SELECT id FROM user WHERE email=? AND iat=date(?,"unixepoch")';
      const { email, iat } = jsonwebtoken.verify(token, config.authKey);
      if (!email || !iat) {
        return 'invalidToken';
      }
      const params = [email, iat];

      const result = await conn.get(query, params);
      return result.length !== 0 ? 'ok' : 'invalidToken';
    } catch (error) {
      if (error.name == 'JsonWebTokenError') {
        return 'invalidToken';
      }
      console.log('Error at AuthenticationService -> checkValidToken: ');
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }
}

export default new AuthenticationService();