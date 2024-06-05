import {
  ADJUST_COD_FILTER_FORM,
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_DUPLICATE_VALUES,
  ORDER_FILTER_FORM_PRINT
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0, { type: 'end' })]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const OrderOriginInitialState = {
  filter: {
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
    source: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    sortBy: {
      value: 'total_cod'
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
    pagination: {
      active: 0,
      amount: 20,
      total: 0,
      totalItems: 0,
    },
    selected: {
      list: [],
    },
    loading: false,
  },
  loading: false
}