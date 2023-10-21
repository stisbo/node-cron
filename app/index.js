import cron from 'node-cron';
import { getMessagesReminder, getMessageCurrent } from './db/db-mssql.js';
import { currentDate, dateHourReminder } from './utils/time.js';
import { listenReminder } from './messages/reminder.js';
import { listenCurrent } from './messages/current.js';
let minutesControll = 0;
let dataReminder = new Map();
let dataCurrent = new Map();
cron.schedule('*/1 * * * *', async () => {
  console.log(`***** ----- *****\n`)
  const current = currentDate();
  if (minutesControll == 0 || minutesControll == 30) {
    const dateReminder = dateHourReminder(); // an hour later
    minutesControll = 0;
    dataReminder = await getMessagesReminder(dateReminder.date, dateReminder.hour, dateReminder.hourLimit);
    dataCurrent = await getMessageCurrent(current.date, current.hour, current.hourLimit);
    // console.log('[LOAD DATA CURRENT]', dataCurrent)
    // console.log('[LOAD DATA REMINDER] ', dataReminder)
  }
  console.log('[CANT. MESSAGES REMINDER]', dataReminder.size)
  console.log('[CANT. MESSAGES CURRENT]', dataCurrent.size)
  await listenReminder(dataReminder, current)
  await listenCurrent(dataCurrent, current)
  minutesControll++;
})