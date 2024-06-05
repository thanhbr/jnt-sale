export const OBJECT_TYPE_RECEIPT = data => {
  switch (data) {
    case 'supplier':
      return 'Nhà cung cấp'
    case 'customer':
      return 'Khách hàng'
    case 'user':
      return 'Nhân viên'
    case 'partner_ship':
      return 'Đơn vị vận chuyển'
    case 'other':
      return 'Khác'
    default: ''
  }
}

export const LINK_OBJECT_NAME_RECEIPT = (type, value, id) => {
  switch (type) {
    case 'supplier':
      return `/product/supplier?search=${value}`
    case 'customer':
      return `/partner-management/customer?keyword=${value}&group=&city=&district=&ward=&per_page=20&start=0`
    case 'user':
      return `/users?search=${value}`
    case 'partner_ship':
      return `/shipping/shipping-partners?id=${id}`
    case 'other':
      return '/'
    default: ''
  }
}