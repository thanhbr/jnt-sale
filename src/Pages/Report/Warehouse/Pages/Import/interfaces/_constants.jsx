import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_ICONS} from './_icons'

export const ORDER_BREADCRUMB = [
  {id: 1, name: 'report_warehouse', url: '#'},
  {id: 2, name: 'report_import_goods', url: '#'},
]

export const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'import_date', value: 'import'},
]

export const ORDER_FILTER_FORM_DUPLICATE_VALUES = [
  {id: 1, name: 'no_duplicate_filter', value: '0'},
  {id: 2, name: 'duplicate_order_filter', value: '1'},
]

export const ORDER_FILTER_TAG_FIELDS = [
  'dateTime',
  'warehouse',
  'supplier',
]

export const ORDER_LIMIT_EXPORT = 5000

export const ORDER_TABLE_CELL_PAYMENT_TYPES = {
  danger: 'not_payment',
  success: 'paid_short',
  warning: 'partial_paid',
}

export const ORDER_TABLE_CELL_SHIPPING_STATUSES = {
  _1: {background: '#EBF5FF', color: '#1A94FF'},
  _2: {background: '#EFFBF4', color: '#33CC70'},
  _3: {background: '#ECF4FE', color: '#0B74E5'},
  _4: {background: '#EBFFF5', color: '#00AB56'},
  _5: {background: '#FFEBF2', color: '#FC5994'},
  _6: {background: '#EBFFF9', color: '#007B56'},
  _7: {background: '#FFEBEB', color: '#FF7471'},
  _8: {background: '#EBFAFF', color: '#038DB2'},
  _15: {background: '#EFF3FB', color: '#7C88A6'},
  _17: {background: '#FFF0EB', color: '#FC4C0A'},
  _19: {background: '#EBFFF4', color: '#007D3A'},
  _20: {background: '#FFF5EB', color: '#FC820A'},
  _21: {background: '#EFF3FB', color: '#7C88A6'},
  _22: {background: '#EBF8FE', color: '#1BACF9'},
  _23: {background: '#FFEBEC', color: '#FF424E'},
}

export const ORDER_TABLE_ROW_EXTRA_TABS = [
  {id: 1, name: 'order_detail', value: 'detail'},
  {id: 2, name: 'delivery', value: 'shipping'},
  {id: 3, name: 'payment', value: 'payment'},
  {id: 4, name: 'order_history_infomation', value: 'history'},
]


export const ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST = [
  {id: 1, name: 'paid_short', value: 'paid'},
  {id: 2, name: 'not_payment', value: 'unpaid'},
  {id: 3, name: 'partial_paid', value: 'partial'},
]
