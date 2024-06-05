export const transformOriginData = data => {
  return {
    warehouse: {
      list: data.warehouseListData.map(item => ({
        name: item?.warehouse_name || '',
        value: item?.id || '',
      })),
    },
    supplier: {
      list: data.supplierData.map(item => ({
        name: item?.supplier_name || '',
        value: item?.supplier_id || '',
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
