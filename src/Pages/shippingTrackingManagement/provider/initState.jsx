import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_DUPLICATE_VALUES,
  ORDER_FILTER_FORM_PRINT
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from '../../../common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const ShippingTrackingInitialState = {
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
        type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      value: formatDateTimeDefaultValue,
      trigger: true
    },
    search: {
      value: '',
    },
    orderStatus: {
      activeValue: null,
      list: ORDER_FILTER_FORM_PRINT,
      value: null,
      keyword: ''
    },
    employee: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    downtime: {
      activeValue: '',
      value: ''
    }
  },
  notifications: {
    list: [],
  },
  form: {
      note: '',
      billCode: '',
      status: false,
      solvingAction : {},
  },
  validate: {
    timeSolving: false
  },
  showConfirm: false,
  showForm: false,
  panels: {
    codTotal: 0,
    orderTotal: 0,
    shippingFeeTotal: 0,
  },
  table: {
    display: {
      list: [],
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
    loading: false
  },
  loading: false
}