export const transformOriginData = data => {
  return {
    source: {
      list: data.sourceListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
  }
}


export const transformPaymentMethodData = data => ({
  data,
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
