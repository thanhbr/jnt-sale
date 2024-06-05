import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_COMPARING_VALUES,
  ORDER_FILTER_FORM_PRINT
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from '../../../common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`
export const CodInitialState = {
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
        type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2],
        value: formatDateTimeDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2],
      value: formatDateTimeDefaultValue,
      trigger: true
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
    employee: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    statusComparing: {
      activeValue: null,
      keyword: '',
      list: ORDER_FILTER_FORM_COMPARING_VALUES,
      listOrigin: ORDER_FILTER_FORM_COMPARING_VALUES,
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
   
  },
  notifications: {
    listSuccess: [],
    listFail: [],
  },
  panels: {
    codTotal: 0,
    orderTotal: 0,
    weightTotal: 0,
    partsignTotal: 0,
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
  modals: {
    import : false
  },
  loading: false,
  confirm_export: false,
  status_export: 0,
}