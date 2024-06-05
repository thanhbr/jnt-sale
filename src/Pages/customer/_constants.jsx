export const CUSTOMER_HEADER_COLUMN_LENGTH = 1
export const CUSTOMER_FILE_READ_CHUNK_SIZE = 500
export const CUSTOMER_START_ROW_NUMBER = 2

export const CUSTOMER_BREADCRUMB = [
  {id: 1, name: 'Quản lý đối tác', url: '#'},
  {id: 2, name: 'Khách hàng', url: '#'},
]

export const CREATE_CUSTOMER_BREADCRUMB = [
  {id: 1, name: 'Quản lý đối tác', url: '#'},
  {id: 2, name: 'Khách hàng', url: '#'},
  {id: 3, name: 'Thông tin khách hàng', url: '#'},
]

export const CUSTOMER_COLUMN_STYLE = [
  {width: '33%'},
  {width: '10%', justifyContent: 'center'},
  {width: '24%'},
  {width: '14%'},
  {width: '10%', justifyContent: 'center'},
  {width: '9%', justifyContent: 'flex-end'},
]

export const CUSTOMER_COLUMN_NAMES = [
  {name: 'Mã khách hàng', className: 'table_consignment column_id'},
  {name: 'Tên khách hàng', className: 'table_consignment column_name'},
  {name: 'Nhóm khách hàng', className: 'table_consignment column_group'},
  {name: 'Điện thoại', className: 'table_consignment column_phone'},
  {name: 'Địa chỉ', className: 'table_consignment column_address'},
  {name: 'Trạng thái', className: 'table_consignment column_status'},
]

export const CUSTOMER_EXPORT_COLUMN_NAMES = [
  'stt',
  'tên khách hàng (*)',
  'mã khách hàng',
  'nhóm khách hàng',
  'email',
  'điện thoại (*)',
  'giới tính',
  'chính sách giá',
  'địa chỉ (*)',
  'tỉnh/thành phố',
  'quận/huyện/thị xã',
  'phường/xã/thị trấn',
]

export const CUSTOMER_DETAIL_TAB = {
  customer_detail: 1,
  purchase_history: 2,
}

export const MODAL = {
  IMPORT: 'IMPORT',
}

export const CUSTOMER_LIMIT_EXPORT = 5000

export const GROUP_CUSTOMER_MODAL_HEADER_TITLE = {
  title: 'Thông tin nhóm khách hàng',
  subTitle: '“Giúp bạn phân loại khách hàng theo nhóm”',
}