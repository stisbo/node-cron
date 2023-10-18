import { Connection } from "tedious";
import dotenv from "dotenv";
dotenv.config();
const config = {
  server: process.env.DB_HOST,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  },
  options: {
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    trustServerCertificate: true
  }
}

export function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);

    connection.on('connect', (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err);
        reject(err);
      } else {
        console.log('Conexión con la base de datos exitosa');
        resolve(connection);
      }
    });

    connection.connect();
  });
}