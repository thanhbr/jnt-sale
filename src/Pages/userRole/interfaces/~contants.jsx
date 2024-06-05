import {ICONS} from "../../customer/_icons";
import {PAYMENT_METHOD_ICONS} from "../../paymentsMethod/interfaces/~icon";

export const USER_ROLE_BREADCRUMB = [
  {id: 1, name: 'Cấu hình & cài đặt', url: '#'},
  {id: 2, name: 'Người dùng & phân quyền', url: '#'},
]

export const USER_ROLE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: ICONS.reload,
  },
  {
    id: 2,
    name: 'Thêm mới vai trò',
    appearance: 'primary',
    icon: ICONS.plus,
    // href: '/users/create',
  },
]

export const POPOVER_USER = [
  { id: '1', name: 'Chỉnh sửa', icon: PAYMENT_METHOD_ICONS.edit, action: 1 },
  { id: '2', name: 'Xóa', icon: PAYMENT_METHOD_ICONS.danger, action: 2 }
]