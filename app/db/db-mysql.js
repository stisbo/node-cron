import { mysql } from 'mysql2';
import dotenv from "dotenv";
dotenv.config();

export const pool = await mysql.createPool({
  host: 'tu-servidor',
  user: 'tu-usuario',
  password: 'tu-contraseña',
  database: 'tu-base-de-datos',
});
export const data = '';

