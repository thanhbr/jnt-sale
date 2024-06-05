import {WAREHOUSE_TRANSFER_ICONS} from './_icons'

export const WAREHOUSE_TS_BREADCRUMB = [
  {id: 1, name: 'Kho', url: '#'},
  {id: 2, name: 'Chuyển kho', url: '#'},
]

export const WAREHOUSE_TRANSFER_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: WAREHOUSE_TRANSFER_ICONS.repeat,
  },
  {
    id: 4,
    name: 'Thêm mới',
    appearance: 'primary',
    icon: WAREHOUSE_TRANSFER_ICONS.plus,
    href: '/warehouse/transfer/create',
  },
]

export const WAREHOUSE_TS_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'Ngày chuyển kho', value: ''}
]

export const WAREHOUSE_TS_FILTER_FORM_PRINT = [
  {id: 1, name: 'Tất cả', value: '-1'},
  {id: 2, name: 'Chưa in vận đơn', value: '0'},
  {id: 3, name: 'Đã in vận đơn', value: '1'},
]

export const WAREHOUSE_TS_FILTER_TAG_FIELDS = [
  'dateTime',
  'warehouseExport',
  'warehouseImport',
  'createdUser',
]

export const WAREHOUSE_TS_TABLE_CELL_PAYMENT_TYPES = {
  danger: 'not_payment',
  success: 'paid_short',
  warning: 'Đã thanh toán một phần',
}

export const WAREHOUSE_TS_TABLE_CELL_SHIPPING_STATUSES = {
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

export const WAREHOUSE_TRANSFER_TABLE_ROW_MENU_POPOVER = [
  {id: 1, name: 'Chỉnh sửa đơn hàng', icon: WAREHOUSE_TRANSFER_ICONS.edit05},
  {id: 2, name: 'Hủy giao hàng', icon: WAREHOUSE_TRANSFER_ICONS.truck},
  {id: 3, name: 'In mẫu ĐVVC', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 4, name: 'In mẫu Evo A4', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 5, name: 'In mẫu Evo A5', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 6, name: 'In mẫu Evo K80', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 7, name: 'Sửa COD đơn 1 phần ', icon: WAREHOUSE_TRANSFER_ICONS.edit05},
]

export const WAREHOUSE_TS_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: 'Chi tiết phiếu chuyển kho', value: 'detailWarehouseTransfer'},
]

export const WAREHOUSE_TRANSFER_MANAGER_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS = {
  partSign: {_1: 'Ký nhận 1 phần'},
  payer: {
    _1: 'Người nhận trả phí',
    _2: 'Người gửi trả phí',
    _3: 'Người gửi cuối tháng trả phí',
  },
  requestGoods: {_1: 'Đến lấy hàng tại nhà', _6: 'Gửi tại bưu cục'},
  recipientView: {_1: 'Cho khách xem hàng', _2: 'Không cho khách xem'},
}

export const WAREHOUSE_TRANSFER_MANAGER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS = {
  PP_PM: 'Người gửi cuối tháng trả phí',
  PP_CASH: 'Người gửi',
  CC_CASH: 'Người nhận',
}

export const WAREHOUSE_TRANSFER_TABLE_THEAD_SELECTED_ACTIONS = [
  {id: 1, name: 'Hủy giao hàng', value: '7'},
]


export const WAREHOUSE_TRANSFER_TABLE_THEAD_PRINT_ACTIONS = [
  {id: 1, name: 'In đơn J&T Express', icon: WAREHOUSE_TRANSFER_ICONS.edit05},
  {id: 2, name: 'In đơn GHN 80x80', icon: WAREHOUSE_TRANSFER_ICONS.truck},
  {id: 2, name: 'In đơn Viettel Post', icon: WAREHOUSE_TRANSFER_ICONS.truck},
  {id: 2, name: 'In đơn SuperShip', icon: WAREHOUSE_TRANSFER_ICONS.truck},
  {id: 3, name: 'In đơn Nhất Tín', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 3, name: 'In đơn SNAPPY', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 4, name: 'In mẫu Evo A4', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 5, name: 'In mẫu Evo A5', icon: WAREHOUSE_TRANSFER_ICONS.printer},
  {id: 6, name: 'In mẫu Evo K80', icon: WAREHOUSE_TRANSFER_ICONS.printer},
]

export const WAREHOUSE_TRANSFER_DETAILS_LIST_TIME = [
  {id: 1, name: 'Thời gian gửi đơn', value: ''},
  {id: 1, name: 'Thời gian nhận hàng', value: ''},
  {id: 1, name: 'Tới bưu cục phát', value: ''},
  {id: 1, name: 'Giao hàng thành công', value: ''},
]

export const ADJUST_COD_FILTER_FORM = [
  {id: 0, name: 'Có', value: '1'},
  {id: 1, name: 'Không', value: '0'},
]