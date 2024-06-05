export const transformAddressData = data => ({
  name: data?.name || '---',
  value: data?.id || '',
  list: data?.list,
})

export const transformCustomerData = data => ({
  data: data,
  name: data?.name || '---',
  value: data?.id || '',
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
