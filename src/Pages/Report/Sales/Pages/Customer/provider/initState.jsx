import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'
import { QuantityEmployeeOption } from '../components/customerFilterForm/_quantityEmployee'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0, { type: 'end' })]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const CustomerInitialState = {
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
    location: {
      activeValue: {
        type: {name: 'Khu vực', value: ''},
        value: [],
      },
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      type: {
        list: [],
        value: {name: 'Khu vực', value: ''},
      },
      value: [],
    },
    sortBy: {
      value: 'total_orders'
    },
    sortType: {
      value: 4
    },
    top: QuantityEmployeeOption[0]
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