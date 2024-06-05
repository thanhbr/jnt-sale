import {
  SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES,
} from '../interfaces/_constants'
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0, { type: 'end' })]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const ShippingDifferenceInitialState = {
  filter: {
    dateTime: {
      activeValue: {
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        type: SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      value: formatDateTimeDefaultValue,
      trigger: true
    },
    employee: {
      activeValue: {
        type: {name: 'team_of_employees', value: ''},
        value: [],
      },
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      type: {
        list: [],
        value: {name: 'team_of_employees', value: ''},
      },
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
    source: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    sortBy: {
      value: 'origin'
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
  view: {
    value: 1,
    name: 'view_detail',
    list: [
      {
        value: 1,
        name: 'view_detail'
      },

      {
        value: 2,
        name: 'view_overview'
      },
    ]
  },
  loading: false
}