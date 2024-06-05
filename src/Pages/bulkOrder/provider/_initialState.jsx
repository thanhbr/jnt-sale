import {formatDatetime} from 'common/form/datePicker/_functions'
import {getDateFromNow} from '../utils/date'

export const dateTimeDefaultValue = [
  getDateFromNow(-7, {type: 'start'}),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const bulkOrderInitialState = {
  filter: {
    dateTime: {
      activeValue: {
        end: null,
        start: null,
        value: '',
      },
      end: null,
      start: null,
      trigger: true,
      value: '',
    },
    employee: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
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
  },
  table: {
    display: {
      list: [],
      loading: true,
    },
    pagination: {
      active: 0,
      amount: 20,
      total: 0,
      totalItems: 0,
    },
  },
}

export const bulkOrderCreateInitialState = {
  form: {
    loading: true,
    shippingPartner: {
      keyword: '',
      list: [],
      listOrigin: [],
      options: null,
      value: null,
    },
    shippingPoint: {
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
    activePrint:'',
  },
  table: {
    display: {
      list: [],
      listOrigin: [],
      loading: true,
      onlyError: false,
    },
    error: {
      list: [],
    },
    file: {
      id: null,
    },
    report: {
      list: [],
    },
    selected: {
      list: [],
    },
    total: {
      rows: 0,
      sent: 0,
    },
  },
  loadingPercent: 0,
  loading: false
}
