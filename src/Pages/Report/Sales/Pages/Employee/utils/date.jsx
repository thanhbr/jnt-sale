export const getDateFromNow = (n,otp = {type: 'start'}) => {
  let date = new Date()
  if(otp && otp?.type == 'start')
    date.setHours(0,0,0,0);
  if(otp && otp?.type == 'end')
    date.setHours(23,59,0,0);
  const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
  return new Date(res)
}

export const getMonthFromNow = (n) => {
  let date = new Date()
  return (+date.getMonth() + 1)
}

export const getYearFromNow = _ => {
  let date = new Date()
  return date.getFullYear()
}

export const daysInMonth =  (month, year) => {
  return new Date(year, month, 0).getDate();
}