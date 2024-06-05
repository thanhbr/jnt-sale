import { formatDatetime } from "../../../../../common/form/datePicker/_functions";
import { LIVESTREAM_STATUS, ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES } from "../interface/_const";
export const dateTimeDefaultValue = [
  // getDateFromNow(-7, {type: 'start'}),
  // getDateFromNow(0, {type: 'end'}),
  null,
  null
]
export const formatDateTimeDefaultValue = `${formatDatetime(
    dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const facebookLivestreamInitialState = {
  filter: {
    keyword: '',
    search: {
      value: '',
    },
    advancedSearch: {
      customer: {
        keyword: '',
        value: '',
      },
      liveVideoId: '',
    },
    dateTime: {
      activeValue: {
        end: null,
        start: null,
        type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: null,
      },
      end: null,
      start: null,
      type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      trigger: true,
      value: null,
    },
    status: {
      list: LIVESTREAM_STATUS,
      activeValue: null,
      value: null,
    }
  },
  panels: {
    codTotal: 0,
    orderTotal: 0,
    orderValueTotal: 0,
    shippingFeeTotal: 0,
  },
  paymentMethod: {
    list: [],
  },
  table: {
    display: {
      list: [],
      loading: true,
    },
    detail: {
      id: null,
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
  },
  page: {
    list: [],
    active: []
  },
}
