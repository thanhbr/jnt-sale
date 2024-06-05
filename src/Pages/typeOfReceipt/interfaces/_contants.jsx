import {ICONS_TYPE_OF_RECEIPT} from "./_icons";

export const TYPE_RECEIPT_BREADCRUMB_TITLE = 'Loại phiếu thu'

export const TYPE_RECEIPT_BREADCRUMB = [
  {id: 1, name: 'Cấu hình & cài đặt', url: '#'},
  {id: 2, name: 'Loại phiếu thu', url: '#'},
]

export const TYPE_RECEIPT_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: ICONS_TYPE_OF_RECEIPT.repeat,
  },
  {
    id: 2,
    name: 'Thêm mới',
    appearance: 'primary',
    icon: ICONS_TYPE_OF_RECEIPT.plus,
  },
]


export const TYPE_RECEIPT_ROW_ACTION =[
  { id: '1', name: 'Chỉnh sửa', icon: ICONS_TYPE_OF_RECEIPT.edit, action: 1 },
  { id: '2', name: 'Xóa', icon: ICONS_TYPE_OF_RECEIPT.remove, action: 2 },
]

export const TYPE_RECEIPT_TABLE_THEAD_SELECTED_ACTIONS = [
  {id: 1, name: 'Kích hoạt', value: '1'},
  {id: 0, name: 'Ngưng sử dụng', value: '2'},
]
