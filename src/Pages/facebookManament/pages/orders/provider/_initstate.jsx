import { ORDER_FILTER_FORM_DUPLICATE_VALUES } from '../../../../deliveryManagement/interfaces/_constants'
import {getDateFromNow} from "../../../../refactorOrder/utils/date";
import {formatDatetime} from "../../../../../common/form/datePicker/_functions";
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from "../interface/_const";
import {ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST} from "../../../../refactorOrder/interfaces/_constants";
export const dateTimeDefaultValue = [
  getDateFromNow(-7, {type: 'start'}),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
    dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const facebookOrdersInitialState = {
  filter: {
    advancedSearch: {
      customer: {
        keyword: '',
        value: '',
      },
      liveVideoId: '',
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
      trigger: true,
      value: formatDateTimeDefaultValue,
    },

    employee: {
      activeValue: {
        type: {name: 'Nhân viên chốt đơn', value: ''},
        value: [],
      },
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      type: {
        list: [],
        value: {name: 'Nhân viên chốt đơn', value: ''},
      },
      value: [],
      group_user:'',
    },
    orderStatus: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
    },
    payment: {
      value: ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
    },
    search: {
      value: '',
    },
    keyword: '',
    page_id: '',
    pageSelected: {
      activeValue: {
        type: {name: 'Trang', value: ''},
        value: [],
      },
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
      type: {
        list: [],
        value: {name: 'Trang', value: ''},
      },
    },
    conversation: {
      keyword: '',
      type: 0,
      tagsCustomer: {
        active: [],
        keyword: '',
        list: [],
        listOrigin: [],
        tab: 'all', // all | checked
        value: [],
      },
      post: {
        activeValue:  {
          type: {name: 'Bài viết', value: ''},
          value: [],
        },
        keyword: '',
        list: [],
        listOrigin: [],
        tab: 'all', // all | checked
        value: [],
        type: {
          list: [],
          value: {name: 'Bài viết', value: ''},
        },
        canLoadMore: true,
        pagination:{
          active: 0,
          amount: 20,
          total: 0,
          totalItems: 0,
        },
        loading: false,
      },

    },
    shouldCollapse: false
  },
  notifications: {
    list: [],
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
    active: [],
    status:false,
  },
}
