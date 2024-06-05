import {DELIVERY_ICONS} from './_icons'

export const ORDER_BREADCRUMB = [
  {id: 1, name: 'Vận chuyển', url: '#'},
  {id: 2, name: 'kiện vấn đề', url: '#'},
]

export const DELIVERY_PAGE_HEADER_ACTIONS = [
  // {
  //   id: 1,
  //   name: null,
  //   appearance: 'secondary',
  //   icon: DELIVERY_ICONS.repeat,
  // },
  //
  // {
  //   id: 3,
  //   name: 'Thao tác khác',
  //   appearance: 'secondary',
  //   // icon: DELIVERY_ICONS.filePlus,
  //   type: 'dropdown',
  //   items: [
  //     {name: 'Lên đơn hàng loạt', url: '/tools/bulks-order'},
  //     {name: 'Tra cứu hành trình vận đơn', url: '/tools/shipping-tracking'}
  //   ],
  //   className: "delivery-management-table__selected-action-dropdown"
  // },
  // {
  //   id: 2,
  //   name: 'Xuất Excel',
  //   appearance: 'secondary',
  //   icon: DELIVERY_ICONS.download,
  //   onClick: () => console.log('Xuất Excel'),
  // },
  // {
  //   id: 4,
  //   name: 'Tạo đơn hàng',
  //   appearance: 'primary',
  //   icon: DELIVERY_ICONS.plus,
  //   href: '/orders/create',
  // },
]

export const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'Ngày gửi đơn', value: 'sended'},
  {id: 2, name: 'Ngày cập nhật', value: 'updated'},
]

export const ORDER_FILTER_FORM_DUPLICATE_VALUES = [
  {id: 1, name: 'Không lọc đơn trùng', value: '0'},
  {id: 2, name: 'Lọc đơn trùng', value: '1'},
]

export const ORDER_FILTER_FORM_PRINT = [
  {id: 2, name: 'Chưa xử lý', value: '0'},
  {id: 3, name: 'Đã xử lý', value: '1'},
]

export const ORDER_FILTER_TAG_FIELDS = [
  'dateTime',
  'orderStatus',
  'employee',
  'product',
]

export const ORDER_TABLE_CELL_PAYMENT_TYPES = {
  danger: 'not_payment',
  success: 'paid_short',
  warning: 'Đã thanh toán một phần',
}

export const ORDER_TABLE_CELL_SHIPPING_STATUSES = {
  _1: {background: '#EBF5FF', color: '#1A94FF'},
  _2: {background: '#EFFBF4', color: '#33CC70'},
  _3: {background: '#ECF4FE', color: '#0B74E5'},
  _4: {background: '#EBFFF5', color: '#00AB56'},
  _5: {background: '#FFEBF2', color: '#FC5994'},
  _6: {background: '#EBFFF9', color: '#007B56'},
  _7: {background: '#FFEBEB', color: '#FF7471'},
  _8: {background: '#EBFAFF', color: '#038DB2'},
  _15: {background: '#FCEEEF', color: '#D93843'},
  _17: {background: '#FFF0EB', color: '#FC4C0A'},
  _19: {background: '#EBFFF4', color: '#007D3A'},
  _20: {background: '#FFF5EB', color: '#FC820A'},
  _21: {background: '#EFF3FB', color: '#7C88A6'},
  _22: {background: '#EBF8FE', color: '#1BACF9'},
  _23: {background: '#FFEBEC', color: '#FF424E'},
}

export const DELIVERY_TABLE_ROW_MENU_POPOVER = [
  {id: 1, name: 'Chỉnh sửa đơn hàng', icon: DELIVERY_ICONS.edit05},
  {id: 2, name: 'Hủy giao hàng', icon: DELIVERY_ICONS.truck},
  {id: 3, name: 'In mẫu ĐVVC', icon: DELIVERY_ICONS.printer},
  {id: 4, name: 'In mẫu EVO A4', icon: DELIVERY_ICONS.printer},
  {id: 5, name: 'In mẫu EVO A5', icon: DELIVERY_ICONS.printer},
  {id: 6, name: 'In mẫu EVO K80', icon: DELIVERY_ICONS.printer},
]

export const ORDER_TABLE_ROW_EXTRA_TABS = [
  {id: 3, name: 'Hành trình vận đơn', value: 'history'},
]

export const DELIVERY_MANAGER_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS = {
  partSign: {_1: 'Ký nhận 1 phần'},
  payer: {
    _1: 'Người nhận trả phí',
    _2: 'Người gửi trả phí',
    _3: 'Người gửi cuối tháng trả phí',
  },
  requestGoods: {_1: 'Đến lấy hàng tại nhà', _6: 'Gửi tại bưu cục'},
  recipientView: {_1: 'Cho khách xem hàng', _2: 'Không cho khách xem'},
}

export const DELIVERY_MANAGER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS = {
  PP_PM: 'Người gửi cuối tháng trả phí',
  PP_CASH: 'Người gửi',
  CC_CASH: 'Người nhận',
}

export const DELIVERY_TABLE_THEAD_SELECTED_ACTIONS = [
  {id: 1, name: 'Hủy giao hàng', value: '7'},
]


export const DELIVERY_TABLE_THEAD_PRINT_ACTIONS = [
  {id: 1, name: 'In đơn evoshop', icon: DELIVERY_ICONS.edit05},
  {id: 4, name: 'In mẫu EVO A4', icon: DELIVERY_ICONS.printer},
  {id: 5, name: 'In mẫu EVO A5', icon: DELIVERY_ICONS.printer},
  {id: 6, name: 'In mẫu EVO K80', icon: DELIVERY_ICONS.printer},
]

export const DELIVERY_DETAILS_LIST_TIME = [
  {id: 1, name: 'Thời gian gửi đơn', value: ''},
  {id: 1, name: 'Thời gian nhận hàng', value: ''},
  {id: 1, name: 'Tới bưu cục phát', value: ''},
  {id: 1, name: 'Giao hàng thành công', value: ''},
]