import { formatDatetime } from '../../../common/form/datePicker/_functions'
import {
  CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES, CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
export const formatDateTimeCashBookDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const CashBooksInitialState = {
  filter: {
    advancedSearch: {
      customer: {
        keyword: '',
        value: '',
      },
      itemDetails: '',
    },
    dateTime: {
      activeValue: {
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        type: CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeCashBookDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      value: formatDateTimeCashBookDefaultValue,
      trigger: true
    },
    paymentMethod: {
      activeValue: [],
      keyword: '',
      list: [],
      originList: [],
      tab: 'all', // all | checked
      value: [],
    },
    receiptType: {
      activeValue: {
        type: CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES[0],
        value: null
      },
      keyword: '',
      list: [],
      listOrigin: [],
      type: { // 0: Default; 1: Phiếu thu; 2; Phiếu chi
        list: CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES,
        value: CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES[0]
      }, 
      value: null,
    },
    search: {
      value: '',
    },
  },
  notifications: {
    list: [],
  },
  panels: {
    total_beginning: 0,
    total_payment: 0,
    total_receipt: 0,
  },
  table: {
    display: {
      list: [],
    },
    pagination: {
      active: 0,
      amount: 20,
      total: 0,
      totalItems: 0,
    },
    loading: false,
  },
  loading: false
}