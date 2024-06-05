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
    product: {
      list: data.productListData.map(item => ({
        data: item || null,
        name: item?.product_name || '',
        value: item?.id || '',
      })),
    },
    shippingPartner: {
      list: data.shippingPartnerListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    orderStatus: {
      list: data.shippingStatusListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    source: {
      list: data.sourceListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    warehouse: {
      list: data.warehouseListData.map(item => ({
        name: item?.warehouse_name || '',
        value: item?.id || '',
      })),
    },
  }
}
