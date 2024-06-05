import {
  ADJUST_COD_FILTER_FORM,
  ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ForControlCOD_FILTER_FORM_DUPLICATE_VALUES,
  ForControlCOD_FILTER_FORM_PRINT
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const ForControlCODInitialState = {
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
        type: ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      value: formatDateTimeDefaultValue,
      trigger: true
    },
    payment_method_id: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      loading: false,
      tab: 'all', // all | checked
      value: [],
    },
    receipt_type: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      loading: false,
      tab: 'all', // all | checked
      value: [],
    },
    receipt_type_id: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      loading: false,
      tab: 'all', // all | checked
      value: [],
    },
    search: {
      value: '',
    },
    sort_type: '',
    sort_by: ''
  },
  notifications: {
    list: [],
  },
  panels: {
    hadpaidSum: 0,
    count_order: 0,
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