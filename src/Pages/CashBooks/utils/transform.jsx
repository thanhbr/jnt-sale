export const transformOriginData = data => {
  return {
    paymentMethod: {
      list: data.paymentMethod.map(item => ({
        data: item || null,
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    receiptType: {
      list: data.receiptType.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
        type: item?.type || '',
      })),
    },
  }
}

export const transformQueryObjToString = data => {
  let queryString = '?'
  let i = 0
  for (const [key, value] of Object.entries(data)) {
    queryString += `${i > 0 ? '&' : ''}${key}=${value}`
    i++
  }
  return queryString
}

export const transformReceiptTypeData = data => ({
  data,
  name: data?.warehouse_name || '---',
  value: data?.id || '',
})
