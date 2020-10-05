import getConnection from '../database/getConnection.js';

class UserService {
  async create(email, password, type) {
    if (!email || !password || !type) {
      return 'badRequest';
    }
    let conn;
    try {
      conn = await getConnection();
      const query = 'INSERT INTO user(email, password, type) VALUES(?,?,?)';
      const params = [
        email,
        password,
        type,
      ];

      await conn.run(query, params);
      return 'ok';
    } catch (error) {
      console.log('Error at UserService -> create: ');
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }

  async userData(email) {
    if (!email) {
      return 'badRequest';
    }
    let conn;
    try {
      conn = await getConnection();
      const query = 'SELECT id, type FROM user WHERE email=?';
      const params = [
        email
      ];

      return await conn.get(query, params);
    } catch (error) {
      console.log('Error at UserService -> userData: ');
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }
}

export default new UserService();