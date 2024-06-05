export const transformDateApiToReportFormat = str =>
  str
    ? str.split(' ')[0]
      ? str.split(' ')[0].split('-').reverse().join('/')
      : '---'
    : '---'

export const transformAddressData = data => ({
  name: data?.name || '---',
  value: data?.id || '',
  list: data?.list,
})

export const transformDateApiToOrderFormat = dateTimeParam => {
  const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
  const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
  const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
  const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
  const hm = `${hms[0]}:${hms[1]}`
  return `${dmy} ${hm}`.trim()
}

export const transformProductData = data => ({
  data,
  name: data?.product_name || '---',
  value: data?.id || '',
})

export const transformSelectedProductData = data => ({
  product_id: data?.info?.product_id || '',
  product_id_details: data?.info?.id || '',
  quantity: data?.transferQuantity || 0,
})

export const transformQueryObjToString = data => {
  let queryString = '?'
  let i = 0
  for (const [key, value] of Object.entries(data)) {
    queryString += `${i > 0 ? '&' : ''}${key}=${value}`
    i++
  }
  return queryString
}

export const transformWarehouseData = data => ({
  data,
  name: data?.warehouse_name || '---',
  value: data?.id || '',
})
