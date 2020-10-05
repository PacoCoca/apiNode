import getConnection from '../database/getConnection.js';

class PrivateService {
  async create(field1, field2) {
    if (!field1 && !field2) {
      return "badRequest";
    }
    let conn;
    try {
      conn = await getConnection();
      const query = 'INSERT INTO private(field1, field2) VALUES(?,?)';
      const params = [
        field1,
        field2,
      ];

      await conn.run(query, params);
      return 'ok';
    } catch (error) {
      console.log("Error at PrivateService -> create: ");
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }

  async read(id) {
    let conn;
    try {
      conn = await getConnection();
      let query = 'SELECT id, field1, field2 FROM private WHERE 1=1';
      const params = [];

      if (id) {
        query += ' AND id=?';
        params.push(id);
      }

      const result = await conn.all(query, params);
      return result;
    } catch (error) {
      console.log("Error at PrivateService -> read: ");
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }

  async update(id, field1, field2) {
    if (!id || (!field1 && !field2)) {
      return "badRequest";
    }
    let conn;
    try {
      conn = await getConnection();
      let query = 'UPDATE private SET id=id';
      const params = [];
      if (field1) {
        query += ', field1=?';
        params.push(field1);
      }
      if (field2) {
        query += ', field2=?';
        params.push(field2);
      }

      await conn.run(query, params);
      return 'ok';
    } catch (error) {
      console.log("Error at PrivateService -> update: ");
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }

  async delete(id) {
    if (!id) {
      return "badRequest";
    }
    let conn;
    try {
      conn = await getConnection();
      const query = 'DELETE FROM private WHERE id=?';
      const params = [id];

      await conn.run(query, params);
      return 'ok';
    } catch (error) {
      console.log("Error at PrivateService -> delete: ");
      console.log(error);
      return 'error';
    } finally {
      if (conn)
        conn.close();
    }
  }
}

export default new PrivateService();