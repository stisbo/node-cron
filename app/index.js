import cron from 'node-cron';
import { query } from './db/db-mssql.js';
import { moment } from 'moment-timezone';

moment.tz.setDefault('America/La_Paz');
query(`SELECT tu.celular, tm.mensaje, tm.fecha, tm.hora, tm.estado FROM tblUsuario tu
      LEFT JOIN tblMensaje tm
      ON tu.idUsuario = tm.idUsuarioDestino
      WHERE tm.fecha = '2023-09-19'
      AND tm.estado LIKE 'NO ENVIADO'
      AND tm.hora BETWEEN '13:00' AND '14:00';`)
  .then(result => {
    console.log(result);
    result.forEach(element => {
      console.log(new Date(element.hora))
    });
  })
  .catch(error => {
    console.log(error);
  })
  console.log(moment())
cron.schedule('*/1 * * * *', () => {
  console.log('Ejecutando la tarea cada minuto');
  console.log(new Date());
});