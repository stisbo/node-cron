import sql from 'mssql';
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(config);
export async function query(sql) {
  let res = []
  try {
    await pool.connect();
    const result = await pool.query(sql);
    res = result.recordset;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    pool.close();
  }
  return res;
}

