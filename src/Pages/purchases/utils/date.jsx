export const getDateFromNow = (n,otp = {type: 'start'}) => {
  let date = new Date()
  if(otp && otp?.type == 'start')
    date.setHours(0,0,0,0);
  if(otp && otp?.type == 'end')
    date.setHours(23,59,0,0);
  const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
  return new Date(res)
}


export const convertDateTimeToApiFormat = data => {
  const dateTimeSplit = data.split(' ')
  const dmy = dateTimeSplit[0] ? dateTimeSplit[0].split('/') : []
  const ymd = `${dmy[2]}-${dmy[1]}-${dmy[0]}`
  return `${ymd} ${dateTimeSplit[1] || ''}`.trim() + ':00'
}