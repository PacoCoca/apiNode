import getConnection from './getConnection.js';
import bcrypt from 'bcrypt';

async function addUser(user, password, type) {
  if (!user || !password || !type) {
    console.log('Syntax: npm run add-user USER PASSWORD USER_TYPE');
    return;
  }

  let conn;
  try {
    conn = await getConnection();
    const query = 'INSERT INTO user(email, password, type) VALUES(?, ?, ?)';
    const params = [
      user,
      await bcrypt.hash(password, 10),
      type
    ];

    await conn.run(query, params);
    console.log('User added correctly');
  } catch (error) {
    console.log(error);
  } finally {
    if (conn)
      conn.close();
  }
}

const [user, password, type] = process.argv.slice(2);
addUser(user, password, type);