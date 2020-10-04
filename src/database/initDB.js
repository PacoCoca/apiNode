import Database from 'sqlite-async';
import fs from 'fs';

let conn;
try {
  // Create instance folder if it doesn't exist
  const path = './instance';
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  // Create connection
  const conn = await Database.open(
    `${path}/sqlite.db`,
    Database.OPEN_READWRITE | Database.OPEN_CREATE
  );

  // Read and execute schema 
  const schema = fs.readFileSync('./src/database/schema.sql').toString();
  await conn.exec(schema);

  console.log('Database initialized correctly')
} catch (error) {
  console.log(error);
} finally {
  if (conn) {
    conn.close();
  }
}
