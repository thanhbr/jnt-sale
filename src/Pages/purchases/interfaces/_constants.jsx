import { PURCHASES_ICONS } from './_icons'

export const PURCHASES_BREADCRUMB = [
  { id: 1, name: 'warehouse', url: '#' },
  { id: 2, name: 'inventory_receipt', url: '#' },
]

export const PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  { id: 1, name: 'date_created_ticket', value: '2' },
  { id: 2, name: 'purchase_date', value: '1' },
  { id: 3, name: 'report__date_of_import_warehouse', value: '3' },
]

export const PURCHASES_FILTER_TAG_FIELDS = [
  'dateTime',
  'supplier',
  'warehouse',
]
export const IMPORT_FILE_PURCHASE = {
  importFileModal: {
    columnNames: [
      'STT',
      'Mã sản phẩm(*)',
      'Tên sản phẩm',
      'Giá nhập(*)',
      'Số lượng(*)',
    ],
    startRowNumber: 8,
  },
}

export const PURCHASES_TABLE_CELL_SHIPPING_STATUSES = {
  _1: { background: '#EBF5FF', color: '#1A94FF' },
  _2: { background: '#EFFBF4', color: '#33CC70' },
  _3: { background: '#ECF4FE', color: '#0B74E5' },
  _4: { background: '#EBFFF5', color: '#00AB56' },
  _5: { background: '#FFEBF2', color: '#FC5994' },
  _6: { background: '#EBFFF9', color: '#007B56' },
  _7: { background: '#FFEBEB', color: '#FF7471' },
  _8: { background: '#EBFAFF', color: '#038DB2' },
  _15: { background: '#FCEEEF', color: '#D93843' },
  _17: { background: '#FFF0EB', color: '#FC4C0A' },
  _19: { background: '#EBFFF4', color: '#007D3A' },
  _20: { background: '#FFF5EB', color: '#FC820A' },
  _21: { background: '#EFF3FB', color: '#7C88A6' },
  _22: { background: '#EBF8FE', color: '#1BACF9' },
  _23: { background: '#FFEBEC', color: '#FF424E' },
}

export const STATUS_PAYMENT = {
  'chua_thanh_toan': {
    background: '#FFEBEC',
    color: '#FF424E',
    name: 'not_payment',
    status: 1
  },
  'thanh_toan_1_phan': {
    background: '#FFF5EB',
    color: '#FC820A',
    name: '1_part_payment',
    status: 2
  },
  'da_thanh_toan': {
    background: '#EBFFF5',
    color: '#00AB56',
    name: 'paid_short',
    status: 3
  },
  'hoan_tien_1_phan': {
    background: '#EBFAFF',
    color: '#038DB2',
    name: '1_part_back_payment',
    status: 4
  },
  'hoan_tien_toan_bo': {
    background: '#EBF5FF',
    color: '#1A94FF',
    name: 'all_back_payment',
    status: 5
  },
}

export const STATUS_WAREHOUSE = {
  'chua_nhap_Kho': {
    background: '#FFEBEC',
    color: '#FF424E',
    name: 'not_yet_received',
    status: 1
  },
  'da_nhap_Kho': {
    background: '#EBFFF5',
    color: '#00AB56',
    name: 'inventory_received',
    status: 2
  },
  'hoan_tra_1_phan': {
    background: '#FFF5EB',
    color: '#FC820A',
    name: 'partially_returned',
    status: 3
  },
  'hoan_tra_toan_bo': {
    background: '#EBF5FF',
    color: '#1A94FF',
    name: 'fully_returned',
    status: 4
  },
}
export const PURCHASES_TABLE_ROW_MENU_POPOVER = [
  { id: 1, name: 'edit', icon: PURCHASES_ICONS.edit05 },
  { id: 2, name: 'print_purchase_order', icon: PURCHASES_ICONS.printer },
  { id: 3, name: 'return_order', icon: PURCHASES_ICONS.refund },
  // { id: 4, name: 'Xuất excel', icon: PURCHASES_ICONS.export },
  { id: 4, name: 'report__import_warehouse', icon: PURCHASES_ICONS.purchaseReceipt },
  { id: 5, name: 'delete', icon: PURCHASES_ICONS.recycle,   isDanger: true, },
]

export const PURCHASES_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: 'purchase_order_details', value: 'detailPurchases'},
  {id: 2, name: 'payment', value: 'payment'},
  {id: 3, name: 'report__import_warehouse', value: 'warehouse'},
  {id: 4, name: 'return_order', value: 'return'},
]

export const PURCHASES_TABLE_THEAD_SELECTED_ACTIONS = [
  { id: 1, name: 'cancel_delivery', value: '7' },
]

export const PURCHASES_TABLE_THEAD_PRINT_ACTIONS = [
  { id: 1, name: 'In đơn J&T Express', icon: PURCHASES_ICONS.edit05 },
  { id: 2, name: 'In đơn GHN 80x80', icon: PURCHASES_ICONS.truck },
  { id: 2, name: 'In đơn Viettel Post', icon: PURCHASES_ICONS.truck },
  { id: 2, name: 'In đơn SuperShip', icon: PURCHASES_ICONS.truck },
  { id: 3, name: 'In đơn Nhất Tín', icon: PURCHASES_ICONS.printer },
  { id: 3, name: 'In đơn SNAPPY', icon: PURCHASES_ICONS.printer },
  { id: 4, name: 'In mẫu UPOS A4', icon: PURCHASES_ICONS.printer },
  { id: 5, name: 'In mẫu UPOS A5', icon: PURCHASES_ICONS.printer },
  { id: 6, name: 'In mẫu UPOS K80', icon: PURCHASES_ICONS.printer },
]

export const CREATE_PURCHASE_CONSTANTS = {
  create: {
    shippingPoint: {
      options: [
        { id: 1, name: 'set_default_address', value: 'is_default' },
        {
          id: 2,
          name: 'hide_address_on_delivery_note',
          value: 'is_hidden_address',
        },
        {
          id: 3,
          name: 'hide_phone_on_delivery_note',
          value: 'is_hidden_phone',
        },
        {
          id: 4,
          name: 'hide_province_district_ward_on_delivery_note',
          value: 'is_hidden_province',
        },
      ],
    },
  },
  header: {
    breadcrumbCreate: [
      {
        id: 1,
        name: 'warehouse',
        url: '#',
      },
      { id: 2, name: 'import_goods', url: '#' },
      { id: 3, name: 'create_new_inventory_receipt', url: '#' },
    ],
    breadcrumbEdit: [
      {
        id: 1,
        name: 'warehouse',
        url: '#',
      },
      { id: 2, name: 'import_goods', url: '#' },
      { id: 3, name: 'edit_inventory_receipt', url: '#' },
    ],
    breadcrumbRefund: [
      { id: 1, name: 'back_to_inventory_receipt', url: '#' },
    ],
  },
}

//1: not_payment; 2: 1_part_payment; 3: paid_short; 4: Hoàn 1 phần tiền; 5: Hoàn toàn bộ tiền
export const PURCHASES_TABLE_THEAD_PAYMENT_FILTER_LIST = [
  { id: 1, name: 'not_payment', value: '1' },
  { id: 2, name: 'paid_short', value: '3' },
  { id: 3, name: '1_part_payment', value: '2' },
  { id: 4, name: 'all_back_payment', value: '5' },
  { id: 5, name: '1_part_back_payment', value: '4' },
]

//1: not_yet_received; 2: inventory_received; 3: partially_returned hàng; 4: fully_returned hàng
export const PURCHASES_TABLE_THEAD_WAREHOUSE_FILTER_LIST = [
  { id: 1, name: 'not_yet_received', value: '1' },
  { id: 2, name: 'inventory_received', value: '2' },
  { id: 3, name: 'partially_returned', value: '3' },
  { id: 4, name: 'fully_returned', value: '4' },
]
