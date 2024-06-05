import {ICONS} from "../../customer/_icons";
import {PAYMENT_METHOD_ICONS} from "./~icon";

export const PAYMENT_METHOD_BREADCRUMB = [
  {id: 1, name: "Cấu hình & cài đặt", url: '#'},
  {id: 2, name: "Phương thức thanh toán", url: '#'},
]
export const PAYMENT_METHOD_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: ICONS.reload,
  },
  {
    id: 2,
    name: "Thêm mới",
    appearance: 'primary',
    icon: ICONS.plus,
    // href: '/payment-method/create',
  },
]

export const TABLE_HEADER= [
  {name : 'Phương thức thanh toán' , class :'full-name'},
  {name : 'Trạng thái sử dụng' , class :'status'},
  {name : '' , class :'setting'},
]

export const POPOVER_USER = [
  { id: '1', name: 'Chỉnh sửa', icon: PAYMENT_METHOD_ICONS.edit, action: 1 },
  { id: '2', name: 'Xóa', icon: PAYMENT_METHOD_ICONS.danger, action: 2 }
]
