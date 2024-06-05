export const getDateFromNow = (n,otp = {type: 'start'}) => {
  let date = new Date()
  if(otp && otp?.type == 'start')
    date.setHours(0,0,0,0);
  if(otp && otp?.type == 'end')
    date.setHours(23,59,0,0);
  const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
  return new Date(res)
}
