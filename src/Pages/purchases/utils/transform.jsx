export const transformOriginData = data => {
  return {
    supplier: {
      list: data.supplierData.map(item => ({
        name: item?.supplier_name || '',
        value: item?.supplier_id || '',
      })),
    },
    warehouse: {
      list: data.warehouseData.map(item => ({
        name: item?.warehouse_name || '',
        value: item?.id || '',
      })),
    },
  }
}
export const transformAddressData = data => ({
  name: data?.name || '---',
  value: data?.id || '',
  list: data?.list,
})

export const transformCustomerData = data => ({
  data,
  name: data?.name || '---',
  value: data?.id || '',
})

export const transformPaymentMethodData = data => ({
  data,
  name: data?.name || '---',
  value: data?.id || '',
})

export const transformProductData = data => ({
  data,
  name: data?.product_name || '---',
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

export const transformWarehouseData = data => ({
  data,
  name: data?.warehouse_name || '---',
  value: data?.id || '',
})

export const transformListProductData = data => {
  let products = []
  data.map(item => {
    products = [...products, {
      product_id: item?.data.product_id,
      product_id_details: item?.data.id,
      unit_id: item?.data?.unit_id || 0,
      unit_name: item?.data?.unit_name || 0,
      quantity: item?.quantity || 0,
      price: item?.price || 0,
    }]
  })
  return products
}