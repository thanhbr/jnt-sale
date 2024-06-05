import {dateTimeDefaultValue, formatDateTimeDefaultValue} from "../../giveBackProduct/provider/~init";
import {PRICE_ADJUSTMENT_FILTER_FORM_DATE_TIME_SORT_TYPES} from "../interfaces/_const";

export const CapitalAdjustmentState = {
  filter: {
    keyword: '',
    dateTime: {
      activeValue: '',
      end: '',
      start: '',
      trigger: true,
      value: '',
      defaultValue: {
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        type: PRICE_ADJUSTMENT_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeDefaultValue,
      },
    },
    employeeCreate: {
      tab: 'all',
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      value: [],
    },
    statusState: {
      activeValue: [1,2,3],
      value: [1,2,3],
    },
  },
  table: {
    display: {
      list: [],
      listOrigin: [],
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
    },
    modal: {
      cancelBill: {
        open: false,
        id: ''
      },
      approveBill: {
        open: false,
        id: ''
      },
    }
  },
    formCreate: {
        productInfo: {
            list: [],
            listOrigin: [],
            value: '',
            keyword: '',
            canLoadMore: true,
            total: 0,
            page: 0,
            loading: false
        },
        extraInfo:{
            code:'',
            user_name:'',
            note:''
        },
        search: {
            list: [],
            listOrigin: [],
            loading: false,
            page: 0,
            selected: [], // {data, quantity, price, discount, discountType}[]
            total: 0,
            totalOrigin: 0,
            value: '',
        },
        validate: {
            capital_price:[],
            code:{},
            note:{},
            table:false,
            submitForm:false,
            submitFormExtra:false,
        },
        modalConfirm:{
            confirmCapital:false
        },
    }
}