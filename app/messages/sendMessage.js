import axios from 'axios';
import FormData from 'form-data';
export async function requestSendMessageReminder(phone, message) {
  try {
    const url = 'https://webinventario.com/mensajero_wps/mensajerowtsp.php';
    var data = new FormData();
    data.append('datos', `${phone}||[RECORDATORIO]: ${message}`);
    const response = await axios.post(url, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error('[ERROR SEND MESSAGE REMINDER]: ', error);
  }
  return null;
}

export async function requestSendMessage(phone, message){
  try {
    const url = 'https://webinventario.com/mensajero_wps/mensajerowtsp.php';
    var data = new FormData();
    data.append('datos', `${phone}||${message}`);
    const response = await axios.post(url, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error('[ERROR SEND MESSAGE]: ', error);
  }
  return null;
}