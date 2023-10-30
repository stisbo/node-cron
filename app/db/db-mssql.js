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
async function query(sql) {
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
/**
 * Makes a request to the DB to get the messages a after hour
 * @param {*} date  Date to search for
 * @param {*} start: Start hour
 * @param {*} end: End hour
 * @return {*} Map: key: hour, value: array of objects with number and message
 */
export async function getMessageReminder(date, start, end){
  let mapMessages = new Map();
  try {
    const sql = `
    SELECT tr.idRecordatorio, tu.celular, tm.mensaje, tr.hora, tr.fecha FROM tblRecordatorio tr
    INNER JOIN tblMensaje tm ON tr.idMensaje = tm.idMensaje
    INNER JOIN tblUsuario tu ON tu.idUsuario = tm.idUsuarioDestino
    WHERE tr.estado LIKE 'NO ENVIADO' AND tr.fecha = '${date}'
    AND tr.hora BETWEEN '${start}' AND '${end}' 
    ORDER BY tr.hora ASC;`;
    const messages = await query(sql);
    mapMessages = mapMessagesFun(messages);
  } catch (error) {
    console.log('[ERROR REMINDER DAY DB]', error)
  }
  return mapMessages;
}
export async function updateMessageReminder(idRecordatorio){
  try {
    const sql = `UPDATE tblRecordatorio SET estado = 'ENVIADO' WHERE idRecordatorio = ${idRecordatorio}`;
    await query(sql);
    console.log('[RES UPDATE MSSG REMINDER]')
  } catch (error) {
    console.log('[ERROR UPDATE MESSAGE REMINDER]',error)
  }
}

export async function updateMessageCurrent(idMensaje){
  try {
    const sql = `UPDATE tblMensaje SET estado = 'ENVIADO' WHERE idMensaje = ${idMensaje}`;
    await query(sql);
    console.log('[RES UPDATE MSSG]')
  } catch (error) {
    console.log('[ERROR UPDATE MESSAGE]',error)
  }
}

export async function getMessageCurrent(date, start, end){
  let mapMessages = new Map();
  try {
    const sql = `SELECT tu.celular, tm.mensaje, tm.hora, tm.estado, tm.idMensaje 
    FROM tblUsuario tu
    LEFT JOIN tblMensaje tm
    ON tu.idUsuario = tm.idUsuarioDestino
    WHERE tm.fecha = '${date}'
    AND tm.estado LIKE 'NO ENVIADO'
    AND tm.hora BETWEEN '${start}' AND '${end}'
    ORDER BY tm.hora ASC;`;
    const messages = await query(sql);
    mapMessages = mapMessagesFun(messages);
  } catch (error) {
    console.log('[ERROR GET MESSAGES CURRENT]', error)
  }
  return mapMessages;
}

function mapMessagesFun(messages){
  const mapMessages = new Map();
  for(const message of messages){
    let date = new Date(message.hora);
    let hour = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    hour = `${ hour > 9 ? '' : '0'}${hour}:${minutes > 9 ? '' : '0'}${minutes}`;
    if(mapMessages.has(hour)){
      mapMessages.get(hour).push(message);
    }else{
      mapMessages.set(hour, [message]);
    }
  }
  return mapMessages;
}