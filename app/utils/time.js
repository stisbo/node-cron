import moment from 'moment-timezone';
moment.tz.setDefault('America/La_Paz');
/**
 * @return A object with date, one hour before and one time with half an hour before 
 */
export function dateHourBefore(){
  const dateBefore  = new Date(moment().format());
  dateBefore.setTime(dateBefore.getTime() - (3600*1000));
  const hourLimit = new Date(dateBefore.getTime() + (30*60*1000));
  return {
    date: `${dateBefore.getFullYear()}-${dateBefore.getMonth()+1 > 9 ? '':'0'}${dateBefore.getMonth()+1}-${dateBefore.getDate() > 9 ? '':'0'}${dateBefore.getDate()}`,
    hour: `${dateBefore.getHours() > 9 ? '':'0'}${dateBefore.getHours()}:${dateBefore.getMinutes() > 9 ? '':'0'}${dateBefore.getMinutes()}`,
    hourLimit: `${hourLimit.getHours() > 9 ? '':'0'}${hourLimit.getHours()}:${hourLimit.getMinutes() > 9 ? '':'0'}${hourLimit.getMinutes()}`
  }
}


/**
 * @return A object with date, hour and limitHour
 */
export function currentDate(){
  const current = new Date(moment().format());
  const hourLimit = new Date(current.getTime() + (30*60*1000));
  return {
    date: `${current.getFullYear()}-${current.getMonth()+1 > 9 ? '':'0'}${current.getMonth()+1}-${current.getDate() > 9 ? '':'0'}${current.getDate()}`,
    hour: `${current.getHours() > 9 ? '':'0'}${current.getHours()}:${current.getMinutes() > 9 ? '':'0'}${current.getMinutes()}`,
    hourLimit: `${hourLimit.getHours() > 9 ? '':'0'}${hourLimit.getHours()}:${hourLimit.getMinutes() > 9 ? '':'0'}${hourLimit.getMinutes()}`
  }
}
