import {COD_ICONS} from './_icons'

export const COD_BREADCRUMB = [
  {id: 1, name: 'shipping', url: '#'},
  {id: 2, name: "cod_management", url: '#'},
]

export const COD_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: COD_ICONS.repeat,
  },

  {
    id: 3,
    name: 'import_list_cod',
    appearance: 'secondary',
    icon: COD_ICONS.upload,
    onClick: () => console.log('Import Excel'),
  },
  {
    id: 2,
    name: "general_export_excel",
    appearance: 'secondary',
    icon: COD_ICONS.download,
    onClick: () => console.log('Xuất Excel'),
  }
]

export const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'order_date_sended', value: 'sended'},
  {id: 2, name: 'order_date_created', value: 'created'},
  {id: 3, name: 'order_date_pickup', value: 'received'},
  {id: 4, name: 'order_date_receipt', value: 'singed'},
]

export const ORDER_FILTER_FORM_COMPARING_VALUES = [
  {id: 0, name: 'not_self_checked', value: '0'},
  {id: 1, name: 'self_checked', value: '1'},
]


export const ORDER_FILTER_TAG_FIELDS = [
  'dateTime',
  'shippingStatus',
  'shippingPartner',
  'employee',
  'statusComparing'
]


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



export const ORDER_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: 'Chi tiết COD', value: 'detailCOD'},
  {id: 3, name: 'Hành trình vận đơn', value: 'history'},
]

export const ORDER_COMPARING_ROW_EXTRA_TABS = [
  {id: 1, name: 'Cập nhật thành công', value: 'comparingSuccess'},
  {id: 2, name: 'Cập nhật thất bại', value: 'comparingFail'},
]

export const MODAL = {
  IMPORT: 'IMPORT',
}

export const COD_COMPARING_HEADER_COLUMN_LENGTH = 1
export const COD_COMPARING_FILE_READ_CHUNK_SIZE = 500
export const COD_COMPARING_START_ROW_NUMBER = 5

export const COD_COMPARING_COLUMN_STYLE = [
  {width: '33%'},
  {width: '24%'},
]

export const COD_COMPARING_COLUMN_NAMES = [
  {name: 'Mã vận đơn', className: 'table_consignment column_id'},
]

export const COD_COMPARING_EXPORT_COLUMN_NAMES = [
  'stt',
  'mã vận đơn*',
  null
]

export const COD_LIMIT_EXPORT = 5000

export const COD_STATUS_COMPARING = ['4','5','6','17','19','20'];

