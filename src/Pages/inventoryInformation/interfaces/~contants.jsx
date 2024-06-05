import {ICONS} from "./~icon";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

export const INVENTORY_INFORMATION_BREADCRUMB = [
  {id: 1, name: DISPLAY_NAME_MENU.GENERAL.WAREHOUSE, url: '#'},
  {id: 2, name: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.INFO, url: '#'},
]
export const INVENTORY_INFORMATION_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: ICONS.reload,
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.GENERAL.EXPORT_EXCEL,
    appearance: 'primary',
    icon: ICONS.excel,
    // href: '/users/create',
  },
]

export const INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING = [
  {id: 0, name: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.QUANTITY_WAITING_OPTION_1, active: true},
  {id: 1, name: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.QUANTITY_WAITING_OPTION_2, active: false},
]

export const INVENTORY_INFORMATION_EXPORT_ROW_EXCEL = [
  {id: 1, name: 'Số thứ tự', checked: false},
  {id: 2, name: 'Mã sản phẩm riêng', checked: false},
  {id: 3, name: 'Mã sản phẩm', checked: false},
  {id: 4, name: 'Mã vận đơn', checked: false},
  {id: 5, name: 'Mã đơn gộp', checked: false},
  {id: 6, name: 'Tên người nhận', checked: false},
  {id: 7, name: 'Số điện thoại người nhận', checked: false},
  {id: 8, name: 'Địa chỉ nhận', checked: false},
  {id: 9, name: 'Quận/Huyện', checked: false},
  {id: 10, name: 'Phường/Xã', checked: false},
]

export const INVENTORY_INFORMATION_LIMIT_EXPORT = 5000


export const INVENTORY_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.DETAILS, value: 'detail'},
]


export const INVENTORY_INFORMATION_ROW_QUOTA = [
  {id: 1, name: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.LARGER_LEVEL, active: true, params: '>'},
  {id: 2, name: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.SMALL_LEVEL, active: false, params: '<'},
  {id: 3, name: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.LEVEL_IS_EQUAL, active: false, params: '='},
]