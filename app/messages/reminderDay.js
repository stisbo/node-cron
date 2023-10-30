import { requestSendMessageReminder } from './sendMessage.js';


export async function listenerReminderDay(dataReminder, current){
  console.log('[LISTEN REMINDER DAY]', current);
  try {
    if (dataReminder.has(current.hour)) {
      console.log('[SEND MESSAGE REMINDER DAY] Hay mensajes en la hora', current.hour)
      for (let obj of dataReminder.get(current.hour)) {
        let res = await requestSendMessageReminder(obj.celular, obj.mensaje);
        console.log(res)
        if (res.status == 'success') {
          console.log('Mensaje enviado')
          await updateMessageReminder(obj.idMensaje);
          dataReminder.delete(current.hour);
        } else {
          throw new Error('Ocurrio un error al enviar el mensaje (peticion)')
        }
      }
    } else {
      console.log('[SEND MESSAGE REMINDER] No hay mensajes en la hora', current.hour)
    }
  } catch (error) {
    console.log('[ERROR LISTEN REMINDER]',error)
  }
}