import Database from 'sqlite-async';

async function getConnection() {
  return Database.open(
    `./instance/sqlite.db`,
    Database.OPEN_READWRITE
  );
}

export default getConnection; 