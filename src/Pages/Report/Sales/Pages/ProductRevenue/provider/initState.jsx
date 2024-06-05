import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0, { type: 'end' })]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const ProductRevenueInitialState = {
  filter: {
    search: {
      value: '',
    },
    dateTime: {
      activeValue: {
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      value: formatDateTimeDefaultValue,
      trigger: true
    },
    sortBy: {
      value: 'profit',
      name: 'report__profit'
    }
  },
  table: {
    display: {
      list: [],
      report: []
    },
    detail: {
      active: null,
      list: [],
    },
    topProduct: [],
    total: {
      'totals': {
        'total_quantity': 0,
        'total_value': 0,
        'total_discount': 0
      },
      'totals_other': {
        'total_revenue_before_discount': 0,
        'total_revenue_after_discount': 0,
        'total_profit': 0
      }
    },
    loading: false,
  },
  loading: false
}