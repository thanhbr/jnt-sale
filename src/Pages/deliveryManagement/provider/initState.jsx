import {
  ADJUST_COD_FILTER_FORM,
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

export const DeliveryInitialState = {
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
    duplicate: {
      activeValue: ORDER_FILTER_FORM_DUPLICATE_VALUES[0],
      list: ORDER_FILTER_FORM_DUPLICATE_VALUES,
      value: ORDER_FILTER_FORM_DUPLICATE_VALUES[0],
    },
    product: {
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
    shippingPartner: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    cod: {
      activeValue: null,
      keyword: '',
      list: ADJUST_COD_FILTER_FORM,
      originList: ADJUST_COD_FILTER_FORM,
      value: null,
    },
    shippingStatus: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
    },
    print: {
      activeValue: null,
      list: ORDER_FILTER_FORM_PRINT,
      originList: ORDER_FILTER_FORM_PRINT,
      value: null,
      keyword: ''
    },
    downtime: {
      activeValue: '',
      value: ''
    },
    allocation: {
      activeValue: '',
      value: ''
    }
  },
  notifications: {
    list: [],
  },
  panels: {
    codTotal: 0,
    orderTotal: 0,
    shippingFeeTotal: 0,
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