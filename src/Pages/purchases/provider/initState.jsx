import moment from 'moment'
import {PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES} from '../interfaces/_constants'

import { getDateFromNow } from '../utils/date'
import { formatDatetime } from '../../../common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`
const date = new Date()

export const PurchasesInitialState = {
  filter: {
    dateTime: {
      activeValue: {
        end: '',
        start: '',
        type: PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES[1],
        value: '',
      },
      end: '',
      start: '',
      type: PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES[1],
      value: '',
      trigger: true,
    },
    search: {
      value: '',
    },
    supplier: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    warehouse: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    payment_status: null,
    warehouse_status: null,
    isApplyFilter: false,
  },
  notifications: {
    list: [],
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
    properties: {
      canShowExport: false
    }
  },
  loading: false,

  // CREATE PURCHASE

  purchase : {
    generalInfo: {
      vendor: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
      warehouse: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
      dateTime: {
        formatValue: moment(date).format("DD/MM/YYYY HH:mm"),
        value: new Date(),
        trigger: false
      },
      code: '',
      validate: {
        vendor: '',
        warehouse: '',
      }
    },
    productInfo: {
      list: [],
      listOrigin: [],
      loading: false,
      page: 0,
      selected: [], // {data, quantity}[]
      total: 0,
      totalOrigin: 0,
      value: '',
      validate: '',
      vat: 0,
      totalAmount: 0,
      totalPayment: 0,
      totalReturn: 0,
      canLoadMore: true,
    },
    paymentVendor: {
      status: true,
      paymentMethod: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
      price: {value: 0},
    },
    extraInfo: {
      user: {},
      note: '',
      refundReason: ''
    },
    productInventory: false,
    statusInfo: {
      paymentStatus: 0,
      warehouseStatus: 0,
      canEdit: true,
    },
    detail: {},
    validate: {
      price: '',
      maxPrice: '',
    }
  },

  refund : {
    productInfo: {
      list: [],
      listOrigin: [],
      loading: false,
      page: 0,
      selected: [], // {data, quantity}[]
      total: 0,
      totalOrigin: 0,
      value: '',
      validate: '',
      vat: 0,
      totalAmount: 0,
      totalPayment: 0,
      status: true,
      refundAll: true,
      totalReturn: 0,
    },
    paymentVendor: {
      status: true,
      paymentMethod: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
      price: {value: 0},
    },
    extraInfo: {
      user: {},
      refundReason: '',
      vendor: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
      warehouse: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
    },
    productInventory: false,
    statusInfo: {
      paymentStatus: 0,
      warehouseStatus: 0,
      canEdit: true,
    },
    detail: {},
    validate: {
      method: '',
      price: '',
      maxPrice: ''
    }
  },


  // SUPPLIER
  supplier: {

    open_modal: false,
    open_modal_confirm: false,
    modal_confirm: false,
    open_confirm_delete: false,
    open_confirm_cancel: {
      open:false,
      array_id:[],
    },
    supplier: {
      code: "",
      name: "",
      alias: "",
      contact_name: "",
      mobile: "",
      address: "",
      email: "",
      details: "",
      status: 1
    },
    detailActive: null,
    detailList: [],
    id_supplier: '',
    change_modal: false,
    check_submit: {
      code_check: {
        status: false,
        message: '',
      },
      name_check: {
        status: false,
        message: '',
      },
      address_check: {
        status: false,
        message: '',
      },
      phone_check: {
        status: false,
        message: '',
      },
      short_name_check: {
        status: false,
        message: '',
      },
      contract_name_check: {
        status: false,
        message: '',
      },
      email_check: {
        status: false,
        message: '',
      },
      note_check: {
        status: false,
        message: '',
      },
    },
    origin_list:[],
    purchase_list: '',
    purchase_total: '',
    purchase_meta: '',
    is_active: [],
    is_check: [],
    count: 0,
    key_word:''
  }
}