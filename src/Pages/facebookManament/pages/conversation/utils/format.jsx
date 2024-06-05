
import { replace } from 'lodash';
import numeral from 'numeral';


// ----------------------------------------------------------------------


export function fNumber(number) {
  return numeral(number).format();
}
// ----------------------------------------------------------------------
export const getDateFromNow = (n, otp) => {
  let date = new Date()
  if (otp && otp?.type == 'start') date.setHours(0, 0, 0, 0)
  if (otp && otp?.type == 'end') date.setHours(23, 59, 0, 0)
  const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
  return new Date(res)
}

export const getRangeTime = (datetime, n, otp) => {
  let date = new Date(datetime)
  if (otp && otp?.type == 'start') date
  if (otp && otp?.type == 'end') date.setHours(23, 59, 0, 0)
  const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
  return new Date(res)
}

export const objectToArrayKeyValue = (data) =>{
  return Object.entries(data).map(([name, value]) => ({name,value}))
}

export const convertQuery = query => {
  let queryString = '?'
  let i = 0
  for (const [key, value] of Object.entries(query)) {
    queryString += `${i > 0 ? '&' : ''}${key}=${value}`
    i++
  }
  return queryString
}



  