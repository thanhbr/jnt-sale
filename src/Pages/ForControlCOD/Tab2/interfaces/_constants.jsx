import {ForControlCOD_ICONS} from './_icons'

export const ForControlCOD_BREADCRUMB = [
  {id: 1, name: 'tranport', url: '#'},
  {id: 2, name: 'cod-for-control', url: '#'},
]

export const ForControlCOD_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: ForControlCOD_ICONS.repeat,
  },
  {
    id: 2,
    name: 'export_excel',
    appearance: 'secondary',
    icon: ForControlCOD_ICONS.download,
    onClick: () => console.log('Xuất Excel'),
  },
]

export const ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'order_sent_date', value: '0'},
]

export const ForControlCOD_FILTER_FORM_DUPLICATE_VALUES = [
  {id: 1, name: 'no_duplicate_filter', value: '0'},
  {id: 2, name: 'duplicate_order_filter', value: '1'},
]

export const ForControlCOD_FILTER_FORM_PRINT = [
  {id: 1, name: 'all', value: '-1'},
  {id: 2, name: 'not_printed', value: '0'},
  {id: 3, name: 'printed', value: '1'},
]

export const ForControlCOD_FILTER_TAG_FIELDS = [
  'dateTime',
  'shippingStatus',
  'shippingPartner',
  'product',
  'print',
  'duplicate',
  'downtime',
  'cod',
  'allocation',
]

export const ForControlCOD_TABLE_CELL_PAYMENT_TYPES = {
  danger: 'unpaid',
  success: 'paid',
  warning: 'partial_paid',
}

export const ForControlCOD_TABLE_CELL_SHIPPING_STATUSES = {
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

export const ForControlCOD_TABLE_ROW_MENU_POPOVER = [
  {id: 1, name: 'edit_order', icon: ForControlCOD_ICONS.edit05},
  {id: 2, name: 'cancel_delivery', icon: ForControlCOD_ICONS.truck},
  {id: 3, name: 'print_DVVC_template', icon: ForControlCOD_ICONS.printer},
  {id: 4, name: 'print_EVO_A4_template', icon: ForControlCOD_ICONS.printer},
  {id: 5, name: 'print_EVO_A5_template', icon: ForControlCOD_ICONS.printer},
  {id: 6, name: 'print_EVO_K80_template', icon: ForControlCOD_ICONS.printer},
  {id: 7, name: 'COD_partial_edit', icon: ForControlCOD_ICONS.edit05},
]

export const ForControlCOD_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: 'shipment_details', value: 'detailForControlCOD'},
  {id: 2, name: 'shipment_content', value: 'detailOrder'},
  // {id: 3, name: 'Hành trình vận đơn', value: 'payment'},
  {id: 3, name: 'shipment_route', value: 'history'},
]

export const ForControlCOD_MANAGER_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS = {
  partSign: {_1: 'partial_receipt'},
  payer: {
    _1: 'receiver_pays_fee',
    _2: 'sender_pays_fee',
    _3: 'sender_pays_monthly_fee',
  },
  requestGoods: {_1: 'pickup_at_home', _6: 'send_at_post_office'},
  recipientView: {_1: 'show_goods_to_customer', _2: 'not_show_goods_to_customer'},
}

export const ForControlCOD_MANAGER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS = {
  PP_PM: 'sender_pays_monthly_fee',
  PP_CASH: 'sender',
  CC_CASH: 'receiver',
}

export const ForControlCOD_TABLE_THEAD_SELECTED_ACTIONS = [
  {id: 1, name: 'cancel-tranport', value: '7'},
]


export const ForControlCOD_TABLE_THEAD_PRINT_ACTIONS = [
  {id: '1', name: 'print_J&T_Express_order', icon: ForControlCOD_ICONS.edit05, connected: false},
  {id: '3', name: 'print_GHN_order', icon: ForControlCOD_ICONS.truck, connected: false},
  {id: '4', name: 'print_VTP_order', icon: ForControlCOD_ICONS.truck, connected: false},
  {id: '5', name: 'print_SPS_order', icon: ForControlCOD_ICONS.truck, connected: false},
  {id: '8', name: 'print_NHATTIN_order', icon: ForControlCOD_ICONS.printer, connected: false},
  {id: '10', name: 'print_SNAPPY_order', icon: ForControlCOD_ICONS.printer, connected: false},
  {id: '-1', name: 'print_EVO_A4_template', icon: ForControlCOD_ICONS.printer, connected: true},
  {id: '-1', name: 'print_EVO_A5_template', icon: ForControlCOD_ICONS.printer, connected: true},
  {id: '-1', name: 'print_EVO_K80_template', icon: ForControlCOD_ICONS.printer, connected: true},
]

export const ForControlCOD_DETAILS_LIST_TIME = [
  {id: 1, name: 'order_sent_time', value: ''},
  {id: 1, name: 'order_receive_time', value: ''},
  {id: 1, name: 'arrive_at_post_office', value: ''},
  {id: 1, name: 'sended-success', value: ''},
]

export const ADJUST_COD_FILTER_FORM = [
  {id: 0, name: 'yes', value: '1'},
  {id: 1, name: 'no', value: '0'},
]