import { requestSendMessageReminder } from './sendMessage.js';
import { updateMessageReminder } from '../db/db-mssql.js';

export async function listenReminder(dataReminder, current) {
  console.log('[LISTEN REMINDER DAY]', current)
  try {
    if (dataReminder.has(current.hour)) {
      console.log('[SEND MESSAGE REMINDER DAY] Hay mensajes en la hora', current.hour)
      for (let obj of dataReminder.get(current.hour)) {
        let res = await requestSendMessageReminderDay(obj.celular, obj.mensaje);
        console.log(res)
        if (res.status == 'success') {
          console.log('Mensaje enviado')
          await updateMessageReminderDay(obj.idMensaje);
          dataReminder.delete(current.hour);
        } else {
          throw new Error('Ocurrio un error al enviar el mensaje (peticion)')
        }
      }
    } else {
      console.log('[SEND MESSAGE REMINDER DAY] No hay mensajes en la hora', current.hour)
    }
  } catch (error) {
    console.log('[ERROR LISTEN REMINDER DAY]',error)
  }
}
