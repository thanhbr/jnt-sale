import { PATH } from 'const/path'
import {CASHBOOKS_ICONS} from './_icons'

export const CASHBOOKS_BREADCRUMB = [
  {id: 1, name: 'accountant', url: '#'},
  {id: 2, name: 'cashbook', url: '#'},
]

export const CASHBOOKS_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: CASHBOOKS_ICONS.repeat,
  },
  {
    id: 2,
    name: 'export_excel',
    appearance: 'secondary',
    icon: CASHBOOKS_ICONS.download,
    onClick: () => console.log('export_excel'),
  },
]

export const CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'cashbook_date', value: 'sended'},
  // {id: 2, name: 'Ngày tạo đơn', value: 'created'},
  // {id: 3, name: 'Ngày nhận hàng', value: 'received'},
  // {id: 4, name: 'Ngày ký nhận', value: 'singed'},
]

export const CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES = [
  {id: 1, name: 'cashbook_receipt_type', value: '0'},
  {id: 2, name: 'cashbook_receipt', value: '1'},
  {id: 3, name: 'cashbook_payment', value: '2'},
]

export const CASHBOOKS_FILTER_TAG_FIELDS = [
  'dateTime',
  'paymentMethod',
  'receiptType',
]

export const CASHBOOKS_TABLE_CELL_SHIPPING_STATUSES = {
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

export const CASHBOOKS_OBJECT_TYPE = [
  {
    id: 1,
    name: 'cashbook_supplier',
    value: 'supplier',
    icon: CASHBOOKS_ICONS.suppliersIcon,
    link: `${PATH.SUPLIERS}?search=`
  },
  {
    id: 2,
    name: 'cashbook_customer',
    value: 'customer',
    icon: CASHBOOKS_ICONS.customerIcon,
    link: `${PATH.CUSTOMER}?keyword=`
  },
  {
    id: 3,
    name: 'cashbook_employee',
    value: 'user',
    icon: CASHBOOKS_ICONS.employeeIcon,
    link: `${PATH.USER}?search=`
  },
  {
    id: 4,
    name: 'cashbook_transport_unit',
    value: 'partner_ship',
    icon: CASHBOOKS_ICONS.shippingUnitIcon,
    link: `${PATH.SHIPPING_PARTNER}?id=`
  },
  {
    id: 5,
    name: 'cashbook_other_party',
    value: 'other',
    icon: CASHBOOKS_ICONS.personsIcon,
  },
]

export const CASHBOOKS_LINK_OBJECT = (type, data) => {
  switch (type) {
    case 'customer':
      return data?.object_phone || ''
    case 'user':
      return data?.object_phone || ''
    case 'partner_ship':
      return data?.object_id || ''
    default: return data?.object_name || ''
  }
}


export const CASHBOOKS_LINK_CODE = (type, link) => {
  switch (type) {
    case 1:
      return `/accountant/receipts?search=${link}`
    case 2:
      return `/accountant/payment?search=${link}`
    default: return ''
  }
}

export const CASHBOOKS_LINK_REFERENCE_DOCS = data => {
  return !!data?.order_refund_code
          ? `/giveback-products?search=${data?.order_refund_code}`
          : !!data?.purchase_id
            ? `/purchases?search=${data?.purchase_id}`
            : `/orders?search=${data?.order_id || ''}`
}
