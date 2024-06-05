import {formatDatetime} from "../../../common/form/datePicker/_functions";
import {GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST} from "../interfaces/contants";
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from "../../refactorOrder/interfaces/_constants";

export const paymentDefaultDateTime = new Date()

const getDateFromNow = (n, otp) => {
  let date = new Date()
  if (otp && otp?.type === 'start') date.setHours(0, 0, 0, 0)
  if (otp && otp?.type === 'end') date.setHours(23, 59, 0, 0)
  const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
  return new Date(res)
}

export const dateTimeDefaultValue = [
  getDateFromNow(-30, {type: 'start'}),
  getDateFromNow(0, {type: 'end'}),
]

export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const giveBackProductInitialState = {
  exports: {
    exporting: false,
  },
  filter: {
    search: {
      value: '',
    },
    dateTime: {
      activeValue: '',
      end: '',
      start: '',
      trigger: true,
      value: '',
      defaultValue: {
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeDefaultValue,
      },
    },
    warehouse: {
      activeValue: '',
      keyword: '',
      list: [],
      listOrigin: [],
      value: '',
    },
    receivingState: {
      activeValue: '',
      value: '',
    },
    payment: {
      value: GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
    },
    checkedList: GIVEBACK_PRODUCT_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
  },
  table: {
    display: {
      list: [],
      listDefault: [],
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
    panels: {
      totalOrder: 0,
      totalValueGoods: 0,
      amountRefunded: 0,
    }
  },
  form: {
    orderReturnDetail: {},
    apiListPayment: []
  },
  modal: {
    order: {
      open: false,
      loading: false,
      keyword: '',
      dateTime: {
        activeValue: {
          end: dateTimeDefaultValue[1],
          start: dateTimeDefaultValue[0],
          value: formatDateTimeDefaultValue,
        },
        default: [dateTimeDefaultValue[0], dateTimeDefaultValue[1]],
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        trigger: true,
        value: formatDateTimeDefaultValue,
      },
      list: [],
      listOrigin: [],
      page: 0,
      total: 0,
      totalOrigin: 0,
      value: '',
    },
    refundPayment: {
      open: false,
      data: [],
      payment: {
        list: [],
        activeValue: '',
        amount: '0',
      },
    },
    confirmRefund: {
      open: false,
      data: [],
    }
  }
}