export const transformOriginData = data => {
  return {
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
    // shippingStatus: {
    //   list: Object.values(data.shippingStatusListData || {}),
    // }
  }
}
