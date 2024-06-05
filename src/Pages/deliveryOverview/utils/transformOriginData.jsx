export const transformOriginData = data => {
    return {
        shippingPartner: {
            // list: data.shippingPartnerListData.map(item => item.connected && ({
            //   name: item?.name || '',
            //   value: item?.id || '',
            // })),
            list: data.shippingPartnerListData.map(item => ({
                name: item?.name || '',
                value: item?.id || '',
            })),
        },
    }
}
