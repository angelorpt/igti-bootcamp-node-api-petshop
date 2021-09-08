import pg from "pg";

export const connect = async () => {
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });
  global.connection = pool;
  return pool.connect();
};
