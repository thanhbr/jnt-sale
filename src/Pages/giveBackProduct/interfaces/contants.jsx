import {GIVEBACK_PRODUCT_ICONS} from "./icon";
import {THEME_COLORS} from "../../../common/theme/_colors";
import {THEME_SEMANTICS} from "../../../common/theme/_semantics";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

export const EDIT_GIVEBACK_PRODUCT_CONSTANTS = {
  header: {
    breadcrumb: [
      {id: 1, name: DISPLAY_NAME_MENU.GENERAL.ORDER, url: '#'},
      {id: 2, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.MANAGEMENT, url: '#'},
      {id: 3, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE, url: '#'},
    ],
  },
}
export const GIVEBACK_PRODUCT_HEADER_BREADCRUMB = [
  {id: 1, name: DISPLAY_NAME_MENU.GENERAL.ORDER, url: '#'},
  {id: 2, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.HOME, url: '#'},
]

export const GIVEBACK_PRODUCT_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: GIVEBACK_PRODUCT_ICONS.repeat,
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.GENERAL.EXPORT_EXCEL,
    appearance: 'secondary',
    icon: GIVEBACK_PRODUCT_ICONS.download,
  },
  {
    id: 3,
    name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE,
    appearance: 'primary',
    // href: '/orders/create',
    icon: GIVEBACK_PRODUCT_ICONS.plus,
  },
]

export const GIVEBACK_PRODUCT_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'order_date_created', value: 'created'},
]

export const GIVEBACK_PRODUCT_MODAL_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: DISPLAY_NAME_MENU.GENERAL.ORDER_SENT_DATE, value: 'created'},
]


export const GIVEBACK_PRODUCT_TABLE_CELL_PAYMENT_TYPES = {
  danger: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.NOT_REFUND_YET,
  success: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUNDS,
  warning: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.ONE_PART_REFUND,
}


export const GIVEBACK_PRODUCT_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: DISPLAY_NAME_MENU.GENERAL.PAYMENT_DETAIL, value: 'detail'},
  {id: 2, name: DISPLAY_NAME_MENU.GENERAL.REFUND_HISTORY, value: 'history'},
]


export const GIVEBACK_PRODUCT_FILTER_STATUS_REFUNDS = [
  {id: 1, name: DISPLAY_NAME_MENU.GENERAL.RECEIVED, value: 'detail'},
  {id: 2, name: DISPLAY_NAME_MENU.GENERAL.NOT_RECEIVED, value: 'history'},
]

export const GIVEBACK_PRODUCT_TABLE_ROW_EXTRA_TAB_PAYMENT_SUBMIT_MODAL_FIGURES = [
  {id: 1, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.ORDER_VALUE, color: THEME_COLORS.secondary_100},
  {id: 2, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.VALUE_PAID, color: THEME_COLORS.secondary_100},
  {id: 3, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUNDED, color: THEME_SEMANTICS.delivered},
  {id: 4, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.STILL_PAY, color: THEME_SEMANTICS.failed},
]


export const GIVEBACK_PRODUCT_LIMIT_EXPORT = 5000

export const GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST = [
  {id: 1, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUNDS, value: '1'},
  {id: 3, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.ONE_PART_REFUND, value: '3'},
  {id: 2, name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.NOT_REFUND_YET, value: '2'},
]

export const GIVEBACK_PRODUCT_TABLE_ROW_MENU_POPOVER = [
  {
    id: 1,
    name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND,
    icon: GIVEBACK_PRODUCT_ICONS.paid,
    // isDeveloping: true,
    action: 'refund',
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CONFIRM_RECEIPT,
    icon: GIVEBACK_PRODUCT_ICONS.confirm_paid,
    // isDeveloping: true,
    action: 'confirm',
  },
]