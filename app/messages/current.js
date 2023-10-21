import { requestSendMessage } from './sendMessage.js';
import { updateMessageCurrent } from '../db/db-mssql.js';

export async function listenCurrent(dataCurrent, current) {
  console.log('[LISTEN CURRENT]', current)
  try {
    if (dataCurrent.has(current.hour)) {
      console.log('[SEND MESSAGE CURRENT] Hay mensajes en la hora', current.hour)
      for (let obj of dataCurrent.get(current.hour)) {
        let res = await requestSendMessage(obj.celular, obj.mensaje);
        console.log(res)
        if (res.status == 'success') {
          console.log('Mensaje enviado')
          await updateMessageCurrent(obj.idMensaje);
          dataCurrent.delete(current.hour);
        } else {
          throw new Error('Ocurrio un error al enviar el mensaje (peticion)')
        }
      }
    } else {
      console.log('[SEND MESSAGE] No hay mensajes en la hora', current.hour)
    }
  } catch (error) {
    console.log('[ERROR LISTEN]',error)
  }
}
