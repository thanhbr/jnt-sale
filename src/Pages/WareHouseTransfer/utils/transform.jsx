export const transformOriginData = data => {
  return {
    warehouse: {
      list: data.warehouse.map(item => ({
        data: item || null,
        name: item?.warehouse_name || '',
        value: item?.id || '',
      })),
    },
    user: {
      list: data.user.map(item => ({
        data: item || null,
        name: item?.fullname || '',
        value: item?.user_id || '',
      })),
    },
  }
}
