export const formatDatetime = (data, opt={}) => {
  const D = new Date(data)

  let d = D.getDate()
  d = d < 10 ? `0${d}` : d

  let m = D.getMonth()
  m = m + 1
  m = m < 10 ? `0${m}` : m

  let y = D.getFullYear()

  let h = D.getHours()
  h = h < 10 ? `0${h}` : h

  let min = D.getMinutes()
  min = min < 10 ? `0${min}` : min
  let time = !! opt?.onlyDate ? `${d}/${m}/${y}` : `${d}/${m}/${y} ${h}:${min}`
  return time
}

export const convertDateTimeToApiFormat = data => {
  const dateTimeSplit = data.split(' ')
  const dmy = dateTimeSplit[0] ? dateTimeSplit[0].split('/') : []
  const ymd = `${dmy[2]}-${dmy[1]}-${dmy[0]}`
  return `${ymd} ${dateTimeSplit[1] || ''}`.trim()
}

export const convertDateTimeToApiFormatv2 = data => {
  const dateTimeSplit = data.split(' ')
  const dmy = dateTimeSplit[0] ? dateTimeSplit[0].split('/') : []
  return `${dmy} ${dateTimeSplit[1] || ''}`.trim()
}