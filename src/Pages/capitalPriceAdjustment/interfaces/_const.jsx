import {PRICE_ADJUSTMENT_ICONS} from "./_icon";
export const HEADER_CREATE_CAPITAL_ADJUSTMENT = [
    {
        id: 1,
        name: 'Kế toán',
        url: '#',
    },
    {id: 2, name: 'Điều chỉnh giá vốn', url: '#'},
    {id: 3, name:  'Tạo mới phiếu điều chỉnh', url: '#'},
]
export const HEADER_CREATE_CAPITAL_ADJUSTMENT_EDIT = [
    {
        id: 1,
        name: 'Kế toán',
        url: '#',
    },
    {id: 2, name: 'Điều chỉnh giá vốn', url: '#'},
    {id: 3, name:  'Chỉnh sửa phiếu điều chỉnh', url: '#'},
]

export const PRICE_ADJUSTMENT_BREADCRUMB_TITLE = 'Điều chỉnh giá vốn'

export const PRICE_ADJUSTMENT_BREADCRUMB = [
  {id: 1, name: 'Kế toán', url: '#'},
  {id: 2, name: 'Điều chỉnh giá vốn', url: '#'},
]

export const PRICE_ADJUSTMENT_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: PRICE_ADJUSTMENT_ICONS.repeat,
  },
  {
    id: 2,
    name: 'Tạo phiếu điều chỉnh',
    appearance: 'primary',
    icon: PRICE_ADJUSTMENT_ICONS.plus,
    href: '/accountant/price-adjustment/create'
  },
]


export const PRICE_ADJUSTMENT_ROW_ACTION =[
  { id: '1', name: 'Chỉnh sửa', icon: PRICE_ADJUSTMENT_ICONS.edit, action: 1 },
  { id: '2', name: 'Xóa', icon: PRICE_ADJUSTMENT_ICONS.remove, action: 2 },
]


export const PRICE_ADJUSTMENT_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'Ngày tạo phiếu', value: 'created'},
]


export const PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES = [
  {id: 1, code: 'warning', name: 'Bản nháp'},
  {id: 2, code: 'success', name: 'Đã điều chỉnh'},
  {id: 3, code: 'info', name: 'Hủy'}
]

export const PRICE_ADJUSTMENT_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: 'Chi tiết phiếu điều chỉnh giá vốn', value: 'detail'},
]

export const PRICE_ADJUSTMENT_TABLE_ROW_MENU_POPOVER = [
  {id: 1, name: 'Chỉnh sửa', value: 'edit', icon: PRICE_ADJUSTMENT_ICONS.edit},
  {id: 2, name: 'Hủy phiếu điều chỉnh', value: 'cancel', icon: PRICE_ADJUSTMENT_ICONS.cancel},
]
