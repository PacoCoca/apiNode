import sqlite3 from 'sqlite3';
import fs from 'fs';

// Create instance folder if it doesn't exist
const path = './instance';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

// Create connection
const db = new sqlite3.Database(
  `${path}/sqlite.db`,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

// Read and execute schema 
const schema = fs.readFileSync('./src/database/schema.sql').toString().split(';');

db.serialize(() => {
  db.run('BEGIN TRANSACTION');
  schema.forEach((query) => {
    if (query) {
      db.run(query, (err) => {
        if (err) {
          console.log(err); 
        }
      });
    }
  });
  db.run('COMMIT');
});

// Close the connection
db.close((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database initialized correctly')
  }
});
