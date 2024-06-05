export const transformOriginData = data => {
  return {
    shippingPartner: {
      list: data.shippingPartnerListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    employee: {
      list: data.employeeListData.map(item => ({
        name: item?.fullname || '',
        value: item?.user_id || '',
      })),
    }
  }
}
