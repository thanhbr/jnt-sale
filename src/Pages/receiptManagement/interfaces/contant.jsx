import {RECEIPT_ICONS} from "./icon";

export const RECEIPT_BREADCRUMB_TITLE = 'Quản lý phiếu thu'

export const RECEIPT_BREADCRUMB = [
  {id: 1, name: 'Kế toán', url: '#'},
  {id: 2, name: 'Phiếu thu', url: '#'},
]


export const RECEIPT_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: RECEIPT_ICONS.repeat,
  },
  {
    id: 2,
    name: 'Tạo phiếu thu',
    // appearance: 'secondary',
    href: '/accountant/receipt/create',
    icon: RECEIPT_ICONS.plus,
  }
]

export const RECEIPT_TABLE_ROW_MENU_POPOVER = [
  {
    id: 1,
    name: 'In phiếu thu',
    icon: RECEIPT_ICONS.print,
    // isDeveloping: true,
    action: 'print',
  },
  {
    id: 2,
    name: 'Hủy phiếu thu',
    icon: RECEIPT_ICONS.circle_remove,
    // isDeveloping: true,
    action: 'cancel',
  },
]

export const RECEIPT_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: 'Chi tiết phiếu thu', value: 'detailDelivery'},
]

export const RECEIPT_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'Ngày tạo phiếu', value: 'created'},
]

export const RECEIPT_FILTER_FORM_GROUP_SUBMITTER = [
  {id: 0, code: '', name: 'Tất cả nhóm người nộp'},
  {id: 1, code: 'supplier', name: 'Nhà cung cấp'},
  {id: 2, code: 'customer', name: 'Khách hàng'},
  {id: 3, code: 'user', name: 'Nhân viên'},
  {id: 4, code: 'partner_ship', name: 'Đối tác vận chuyển'},
  {id: 5, code: 'other', name: 'Đối tượng khác'}
]


export const RECEIPT_TABLE_THEAD_STATUS_FILTER_LIST = [
  {id: 1, name: 'Hoàn thành', value: '1'},
  {id: 2, name: 'Hủy', value: '2'},
]


// CREATE RECEIPT

export const RECEIPT_TYPE_CREATE_BREAD_CRUMB = [
  {
    id: 1,
    name: 'Kế toán',
    url: '#',
  },
  {id: 2, name: 'Phiếu thu', url: '#'},
  {id: 3, name: 'Tạo mới phiếu thu', url: '#'},
]
export const PAYMENT_TYPE_MODAL_HEADER_TITLE = {
  title: 'Thông tin loại phiếu chi',
  subTitle: '“Giúp bạn quản lý các nguồn chi phí trong hoạt động kinh doanh”',
}
export const PAYMENT_METHODS_MODAL_HEADER_TITLE = {
  title: 'Thông tin phương thức thanh toán',
  subTitle: '“Sử dụng khi bạn thực hiện thanh toán mua/bán hàng”',
}