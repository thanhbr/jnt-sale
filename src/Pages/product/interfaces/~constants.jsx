import {PRODUCT_ICONS} from "./~icon";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";


export const PRODUCT_BREADCRUMB_TITLE = DISPLAY_NAME_MENU.PRODUCT_PAGE.BREADCRUM_TITLE

export const PRODUCT_BREADCRUMB = [
  {id: 1, name: DISPLAY_NAME_MENU.PRODUCT_PAGE.BREADCRUM_FIRST, url: '#'},
  {id: 2, name: DISPLAY_NAME_MENU.PRODUCT_PAGE.BREADCRUM_SECOND, url: '#'},
]

export const PRODUCT_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: PRODUCT_ICONS.repeat,
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.PRODUCT_PAGE.IMPORT_PRODUCT,
    appearance: 'secondary',
    // href: '/tools/bulks-order',
    icon: PRODUCT_ICONS.import,
    // isDeveloping: true,
  },
  {
    id: 3,
    name: DISPLAY_NAME_MENU.GENERAL.EXPORT_EXCEL,
    appearance: 'secondary',
    icon: PRODUCT_ICONS.download,
    // isDeveloping: true,
  },
  {
    id: 4,
    name: DISPLAY_NAME_MENU.GENERAL.CREATE,
    appearance: 'primary',
    href: '/product/create',
    icon: PRODUCT_ICONS.plus,
  },
]

export const FILTER_STATUS_PRODUCT_CONSTANTS = [
  {id: 1, name: DISPLAY_NAME_MENU.GENERAL.ACTIVATED, active: false},
  {id: 2, name: DISPLAY_NAME_MENU.GENERAL.DEACTIVATION, active: false},
]

export const FILTER_PRICE_PRODUCT_CONSTANTS = [
  {id: 1, name: DISPLAY_NAME_MENU.GENERAL.RETAIL_PRICE, active: false, value: 1},
  {id: 2, name: DISPLAY_NAME_MENU.GENERAL.WHOLESALE_PRICE, active: false, value: 2},
]

export const CREATE_PRODUCT_CONSTANTS = {
  header: {
    breadcrumb: [
      {id: 1, name: DISPLAY_NAME_MENU.PRODUCT, url: '#'},
      {id: 2, name: DISPLAY_NAME_MENU.PRODUCT_PAGE.CREATE_PRODUCT, url: '#'},
    ],
  },
}

export const EDIT_PRODUCT_CONSTANTS = {
  header: {
    breadcrumb: [
      {id: 1, name: DISPLAY_NAME_MENU.PRODUCT, url: '#'},
      {id: 2, name: DISPLAY_NAME_MENU.PRODUCT_PAGE.EDIT_PRODUCT, url: '#'},
    ],
  },
}

export const PRINT_BARCODE_PRODUCT_CONSTANTS = {
  header: {
    breadcrumb: [
      {id: 1, name: DISPLAY_NAME_MENU.PRODUCT, url: '#'},
      {id: 2, name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRINT_BARCODE, url: '#'},
    ],
  },
}


export const CREATE_PRODUCT_REDIRECT_CONSTANTS = [
  {id: 'basic', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.BASIC_INFO, location: 70, active: true},
  {id: 'product', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SPECIFICATIONS, location: 420, active: false},
  {id: 'inventory', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.WAREHOUSE_INFO, location: 800, active: false},
  {id: 'price', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_INFO, location: 1000, active: false},
  {id: 'version', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_INFO, location: 1300, active: false},
]

export const EDIT_SINGLE_PRODUCT_REDIRECT_CONSTANTS = [
  {id: 'basic', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.BASIC_INFO, location: 70, active: true},
  {id: 'product', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SPECIFICATIONS, location: 420, active: false},
  {id: 'price', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.WAREHOUSE_INFO, location: 800, active: false},
  {id: 'version', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_INFO, location: 1000, active: false},
]

export const EDIT_MULTIPLE_PRODUCT_REDIRECT_CONSTANTS = [
  {id: 'basic', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.BASIC_INFO, location: 70, active: true},
  {id: 'product', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SPECIFICATIONS, location: 420, active: false},
  {id: 'version', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_INFO, location: 800, active: false},
]

export const CREATE_PRODUCT_TYPE_WEIGHT_CONSTANTS = [
  {id: 'g', name: 'g', active: true},
  {id: 'kg', name: 'kg', active: false},
]


export const CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS = [
  {id: 1, code: 'size', name: DISPLAY_NAME_MENU.GENERAL.SIZE},
  {id: 2, code: 'color', name: DISPLAY_NAME_MENU.GENERAL.COLOR},
  {id: 3, code: 'type', name: DISPLAY_NAME_MENU.GENERAL.TYPE}
]


export const CREATE_PRODUCT_COLUMN_ATTR_CONSTANTS = {
  id: '',
  idEdit: '',
  image: '',
  image_name: '',
  name: '',
  attr_size: '',
  attr_color: '',
  attr_type: '',
  sku: '',
  barcode: '',
  weight: '',
  type_weight: 'g',
  list_type: [
    {id: 'g', name: 'g', active: true},
    {id: 'kg', name: 'kg', active: false},
  ],
  inventory: '',
  status: '1',
  price: '',
  wholesale_price: '',
  supplier_price: '',
  cost_price: '',
  verOldStatus: 'create',
}


export const PRODUCT_TABLE_ROW_MENU_POPOVER = [
  {
    id: 1,
    name:  DISPLAY_NAME_MENU.GENERAL.EDIT,
    icon: PRODUCT_ICONS.editPopover,
    action: 'edit',
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.GENERAL.DELETE,
    icon: PRODUCT_ICONS.removePopover,
    action: 'remove',
  },
  {
    id: 3,
    name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRINT_BARCODE,
    icon: PRODUCT_ICONS.printPopover,
    action: 'print',
  },
  {
    id: 4,
    name: DISPLAY_NAME_MENU.IMPORT_GOODS,
    icon: PRODUCT_ICONS.importPopover,
    action: 'import',
    isDeveloping: true,
  },
]
export const PRODUCT_TABLE_HEADER_ROW_MENU_POPOVER = [
  {
    id: 1,
    name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRINT_BARCODE,
    icon: '',
    action: 'print',
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.GENERAL.ACTIVATED,
    icon: '',
    action: 'active',
  },
  {
    id: 3,
    name: DISPLAY_NAME_MENU.GENERAL.DEACTIVATION,
    icon: '',
    action: 'deActive',
  },
  {
    id: 4,
    name: DISPLAY_NAME_MENU.IMPORT_GOODS,
    icon: '',
    action: 'import',
    isDeveloping: true,
  },
]
export const PRODUCT_PAPER_SIZE = [
  {id: 1, code: '2tem_72x22', image_link: '/img/product/print-barcode-1.png', title: `${DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_ROLL} 2 tem`, sub_title: `${(DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_SIZE_PRINT)} 72x22 mm`, active: '1'},
  {id: 2, code: '2tem_74x22', image_link: '/img/product/print-barcode-2.png', title: `${DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_ROLL} 2 tem`, sub_title: `${(DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_SIZE_PRINT)} 74x22 mm`, active: '2'},
  {id: 3, code: '3tem_110x22', image_link: '/img/product/print-barcode-3.png', title: `${DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_ROLL} 3 tem`, sub_title: `${(DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_SIZE_PRINT)} 110x22 mm`, active: '2'},
  {id: 4, code: 'a4_100', image_link: '/img/product/print-barcode-4.png', title: 'A4 - No.138', sub_title: '100 tem', active: '2'},
  {id: 5, code: 'a4_65', image_link: '/img/product/print-barcode-5.png', title: 'A4 - No.145', sub_title: '65 tem', active: '2'},
  {id: 6, code: 'a5_65', image_link: '/img/product/print-barcode-6.png', title: 'A5', sub_title: '65 tem', active: '2'},
]


export const PRODUCT_PAPER_SETTING_BARCODE = [
  {id: 1, code: 'shopname', name: DISPLAY_NAME_MENU.GENERAL.STORE_NAME, active: 1, position: 1},
  {id: 2, code: 'product_name', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_NAME, active: 1, position: 2},
  {id: 3, code: 'barcode', name: DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_BARCODE, active: 1, position: 3},
  {id: 4, code: 'price', name: DISPLAY_NAME_MENU.GENERAL.PRODUCT_PRICE, active: 1, position: 4},
]
export const EXPORT={
  label:'EXPORT'
}
export const IMPORT={
  label:'IMPORT'
}
export const PRODUCT_COLUMN_NAMES = [
  {name: 'Mã khách hàng', className: 'table_consignment column_id'},
  {name: 'Tên khách hàng', className: 'table_consignment column_name'},
  {name: 'Nhóm khách hàng', className: 'table_consignment column_group'},
  {name: 'Điện thoại', className: 'table_consignment column_phone'},
  {name: 'Địa chỉ', className: 'table_consignment column_address'},
  {name: 'Trạng thái', className: 'table_consignment column_status'},
]

export const PRODUCT_EXPORT_COLUMN_NAMES = [
  'Tên sản phẩm*',
  'Tên phiên bản',
  'Mã sản phẩm/SKU*',
  'Mã vạch sản phẩm',
  'Mô tả ngắn',
  'Mã nhóm sản phẩm *',
  'Đơn vị*',
  'Khối lượng(g)',
  'Thuộc tính 1',
  'Giá trị thuộc tính 1',
  'Thuộc tính 2',
  'Giá trị thuộc tính 2',
    'Thuộc tính 3',
    'Giá trị thuộc tính 3',
    'Giá bán lẻ*',
    'Giá bán sỉ*',
    'Giá nhập*',
    'Giá vốn',
    'Tồn kho'
]


export const PRODUCT_LIMIT_EXPORT = 5000;