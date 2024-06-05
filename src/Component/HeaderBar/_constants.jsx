import {HEADER_ICONS} from './_icons'
import {PATH} from "../../const/path";
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";

export const HEADER_QUICK_ACCESSES = [
  {
    id: 1,
    name: DISPLAY_NAME_MENU.CREATE_ORDER,
    displayIcon: HEADER_ICONS.createOrder,
    // action: () => console.log('Tạo đơn hàng'),
    path: PATH.ORDER_CREATE
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.CREATE_PRODUCT,
    displayIcon: HEADER_ICONS.createProduct,
    // action: () => console.log('Thêm sản phẩm'),
    path : PATH.CREATE_PRODUCT
  },
  {
    id: 3,
    name: DISPLAY_NAME_MENU.CREATE_CUSTOMER,
    displayIcon: HEADER_ICONS.createClient,
    // action: () => console.log('Thêm khách hàng'),
    path : PATH.CREATE_CUSTOMER
  },
  // {
  //   id: 4,
  //   name: 'Thêm nhập hàng',
  //   displayIcon: HEADER_ICONS.createImport,
  //   // action: () => console.log('Thêm nhập hàng'),
  //   path : PATH.PURCHASE_CREATE
  // },
]
