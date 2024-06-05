export const transformOriginData = data => {
  return {
    employee: {
      list: data.employeeListData.map(item => ({
        name: item?.fullname || '',
        value: item?.user_id || '',
        groups: item?.user_group
            ? item.user_group.split(',').filter(item => !!item)
            : [],
      })),
      type: {
        list: data.employeeGroupData.map(item => ({
          name: item?.group_name || '',
          value: item?.id || '',
        })),
      },
    },
    warehouse: {
      list: data.warehouseListData.map(item => ({
        name: item?.warehouse_name || '',
        value: item?.id || '',
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
export const transformWarehouseData = data => ({
  data,
  name: data?.warehouse_name || '---',
  value: data?.id || '',
})
export const transformOriginWareHouse = data => {
  return {
    warehouse: {
      list: data.warehouseData.map(item => ({
        name: item?.warehouse_name || '',
        value: item?.id || '',
      })),
    },
  }
}
