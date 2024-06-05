export const transformOriginData = data => {
  return {
    adminUser: {
      list: data.adminUserList.map(item => ({
        data: item || null,
        name: item?.fullname || '',
        value: item?.user_id || '',
      })),
    },
    shippingPartner: {
      list: data.shippingPartnerListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    orderOrigin: {
      list: data.orderOriginList.map(item => ({
        data: item || null,
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
  }
}

export const transformListData = statusListData => {
  const statusList = statusListData.filter(x => x.id !== '22')
  const tag22 = statusListData.find(x => x.id === '22')
  statusList.splice(3, 0, tag22)

  return statusList
}
