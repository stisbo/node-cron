import cron from 'node-cron';
import { getMessagesReminder } from './db/db-mssql.js';
import { dateHourBefore, currentDate, dateHourReminder } from './utils/time.js';
import { listenReminder } from './messages/reminder.js';
let minutesControll = 0;
let dataReminder = new Map();
let dataCurrent = new Map();
cron.schedule('*/1 * * * *', async () => {
  const current = currentDate();
  if (minutesControll == 0 || minutesControll == 30) {
    const dateReminder = dateHourReminder(); // an hour later
    minutesControll = 0;
    dataReminder = await getMessagesReminder(dateReminder.date, dateReminder.hour, dateReminder.hourLimit);
    console.log('[LOAD DATA REMINDER] ', dataReminder)
    // dataCurrent = await getMessageCurrent();
  }
  console.log('[CANT. MESSAGES REMINDER]', dataReminder.size)
  await listenReminder(dataReminder, current)

  minutesControll++;
})