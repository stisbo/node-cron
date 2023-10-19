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
    console.error('Error al hacer la solicitud POST:', error);
  }
  return null;
}