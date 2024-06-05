export const paymentDefaultDateTime = new Date()
export const receiptInitialState = {
  filter: {
    keyword: '',
    dateTime: {
      activeValue: {
        end: '',
        start: '',
        value: '',
      },
      end: '',
      start: '',
      trigger: true,
      value: '',
    },
    groupSubmitter: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    paymentMethod: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
    },
    employeeCreate: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
    },
    typeReceipt: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
    },
    status: ['1', '2'],
    per_page: '',
    start: 0,
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
      total: 3,
      totalItems: 59,
    },
    selected: {
      list: [],
    },
    listDefault: [],
    debounceProductStatus: true,
    modal: {
      editDesc: {
        open: false,
        data: ''
      },
      cancelReceipt: {
        open: false,
        id: ''
      }
    }
  },
  formCreate:{
    form:{
      object_type : "",
      object_id : "",
      receipt_code : "",
      receipt_type_id : "",
      payment_method_id : '',
      total_amount : '',
      dt_record : paymentDefaultDateTime,
      reference_code : "",
      description : ""
    },
    validate: {
      groupSubmitter: {
        status: false,
        message: ''
      },
      submitter: {
        status: false,
        message: ''
      },
      typeReceipt: {
        status: false,
        message: ''
      },
      receiptCode: {
        status: false,
        message: ''
      },
      revenueValue: {
        status: false,
        message: ''
      },
      description: {
        status: false,
        message: ''
      },
    },
    fetch: {
      groupSubmitter: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
      submitter: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
        other: '',
        type: '',
      },
      customer: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
      supplier: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
      employee: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
      partnerShip: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
      typeReceipt: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
      paymentMethod: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
    },
    modal: {
      createReceipt: {
        open: false,
        changeForm: false,
        form: {
          name: '',
          code: '',
          description: '',
          status: 1, // 1 active or 0 deactivate
          is_default: ''
        },
        validate: {
          name: {
            status: false,
            message: ''
          },
          code: {
            status: false,
            message: ''
          },
          description: {
            status: false,
            message: ''
          },
        }
      },
      createPaymentMethod: {
        open: false,
        changeForm: false,
        form: {
          id: '',
          name: '',
          is_active: false,
          status: true
        },
        validate: {
          name: {
            status: false,
            message: ''
          }
        }
      }
    }
  }
}

export const receiptActions = {
  // FILTER
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_DATE_TIME_TRIGGER_UPDATE: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',

  FILTER_OTHER_PAYMENT_METHOD: 'FILTER_OTHER_PAYMENT_METHOD',
  FILTER_OTHER_PAYMENT_METHOD_CHANGE_KEYWORD: 'FILTER_OTHER_PAYMENT_METHOD_CHANGE_KEYWORD',
  FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE: 'FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE',
  FILTER_OTHER_PAYMENT_METHOD_TAB_UPDATE: 'FILTER_OTHER_PAYMENT_METHOD_TAB_UPDATE',
  FILTER_ACTIVE_OTHER_PAYMENT_METHOD_UPDATE: 'FILTER_ACTIVE_OTHER_PAYMENT_METHOD_UPDATE',

  FILTER_OTHER_GROUP_SUBMITTER: 'FILTER_OTHER_GROUP_SUBMITTER',
  FILTER_OTHER_GROUP_SUBMITTER_CHANGE_KEYWORD: 'FILTER_OTHER_GROUP_SUBMITTER_CHANGE_KEYWORD',
  FILTER_OTHER_GROUP_SUBMITTER_UPDATE_LIST: 'FILTER_OTHER_GROUP_SUBMITTER_UPDATE_LIST',
  FILTER_OTHER_GROUP_SUBMITTER_UPDATE_VALUE: 'FILTER_OTHER_GROUP_SUBMITTER_UPDATE_VALUE',
  FILTER_ACTIVE_OTHER_GROUP_SUBMITTER_UPDATE: 'FILTER_ACTIVE_OTHER_GROUP_SUBMITTER_UPDATE',

  FILTER_OTHER_EMPLOYEE_CREATE: 'FILTER_OTHER_EMPLOYEE_CREATE',
  FILTER_OTHER_EMPLOYEE_CREATE_CHANGE_KEYWORD: 'FILTER_OTHER_EMPLOYEE_CREATE_CHANGE_KEYWORD',
  FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE: 'FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE',
  FILTER_OTHER_EMPLOYEE_CREATE_TAB_UPDATE: 'FILTER_OTHER_EMPLOYEE_CREATE_TAB_UPDATE',
  FILTER_ACTIVE_OTHER_EMPLOYEE_CREATE_UPDATE: 'FILTER_ACTIVE_OTHER_EMPLOYEE_CREATE_UPDATE',

  FILTER_OTHER_TYPE_RECEIPT: 'FILTER_OTHER_TYPE_RECEIPT',
  FILTER_OTHER_TYPE_RECEIPT_CHANGE_KEYWORD: 'FILTER_OTHER_TYPE_RECEIPT_CHANGE_KEYWORD',
  FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE: 'FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE',
  FILTER_OTHER_TYPE_RECEIPT_TAB_UPDATE: 'FILTER_OTHER_TYPE_RECEIPT_TAB_UPDATE',
  FILTER_ACTIVE_OTHER_TYPE_RECEIPT_UPDATE: 'FILTER_ACTIVE_OTHER_TYPE_RECEIPT_UPDATE',

  FILTER_ACTIVE_OTHER_STATUS: 'FILTER_ACTIVE_OTHER_STATUS',
  FILTER_CHANGE_SEARCH_KEYWORD: 'FILTER_CHANGE_SEARCH_KEYWORD',
  // END FILTER


  // TABLE
  TABLE_LIST_DEFAULT: 'FILTER_LIST_DEFAULT',
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_DISPLAY_DETAIL_ID_UPDATE: 'TABLE_DISPLAY_DETAIL_ID_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',

  TOGGLE_MODAL_EDIT_DESCRIPTION: 'TOGGLE_MODAL_EDIT_DESCRIPTION',
  UPDATE_MODAL_EDIT_DESCRIPTION: 'UPDATE_MODAL_EDIT_DESCRIPTION',
  TOGGLE_MODAL_CANCEL_RECEIPT: 'TOGGLE_MODAL_CANCEL_RECEIPT',
  // END TABLE


  //=================== Create Receipt ===========
  FETCH_FORM_RECEIPT_GROUP_SUBMITTER_LIST: 'FETCH_FORM_RECEIPT_GROUP_SUBMITTER_LIST',
  FETCH_FORM_RECEIPT_GROUP_SUBMITTER_VALUE: 'FETCH_FORM_RECEIPT_GROUP_SUBMITTER_VALUE',
  FETCH_FORM_RECEIPT_GROUP_SUBMITTER_KEYWORD: 'FETCH_FORM_RECEIPT_GROUP_SUBMITTER_KEYWORD',
  FETCH_FORM_RECEIPT_GROUP_SUBMITTER_UPDATE_LIST: 'FETCH_FORM_RECEIPT_GROUP_SUBMITTER_UPDATE_LIST',

  FETCH_FORM_RECEIPT_SUBMITTER_LIST: 'FETCH_FORM_RECEIPT_SUBMITTER_LIST',
  FETCH_FORM_RECEIPT_SUBMITTER_LIST_UPDATE: 'FETCH_FORM_RECEIPT_SUBMITTER_LIST_UPDATE',
  FETCH_FORM_RECEIPT_SUBMITTER_VALUE: 'FETCH_FORM_RECEIPT_SUBMITTER_VALUE',
  FETCH_FORM_RECEIPT_SUBMITTER_OTHER: 'FETCH_FORM_RECEIPT_SUBMITTER_OTHER',

  FETCH_FORM_RECEIPT_CUSTOMER_LIST: 'FETCH_FORM_RECEIPT_CUSTOMER_LIST',
  FETCH_FORM_RECEIPT_SUPPLIER_LIST: 'FETCH_FORM_RECEIPT_SUPPLIER_LIST',
  FETCH_FORM_RECEIPT_EMPLOYEE_LIST: 'FETCH_FORM_RECEIPT_EMPLOYEE_LIST',
  FETCH_FORM_RECEIPT_PARTNER_SHIP_LIST: 'FETCH_FORM_RECEIPT_PARTNER_SHIP_LIST',

  FETCH_FORM_RECEIPT_TYPE_RECEIPT_LIST: 'FETCH_FORM_RECEIPT_TYPE_RECEIPT_LIST',
  FETCH_FORM_RECEIPT_TYPE_RECEIPT_VALUE: 'FETCH_FORM_RECEIPT_TYPE_RECEIPT_VALUE',
  FETCH_FORM_RECEIPT_TYPE_RECEIPT_KEYWORD: 'FETCH_FORM_RECEIPT_TYPE_RECEIPT_KEYWORD',

  FETCH_FORM_RECEIPT_PAYMENT_METHOD_LIST: 'FETCH_FORM_RECEIPT_PAYMENT_METHOD_LIST',
  FETCH_FORM_RECEIPT_PAYMENT_METHOD_VALUE: 'FETCH_FORM_RECEIPT_PAYMENT_METHOD_VALUE',
  FETCH_FORM_RECEIPT_PAYMENT_METHOD_KEYWORD: 'FETCH_FORM_RECEIPT_PAYMENT_METHOD_KEYWORD',

  FORM_CREATE_RECEIPT_UPDATE: 'FORM_CREATE_RECEIPT_UPDATE',

  // VALIDATE FORM
  VALIDATE_FORM_CREATE_RECEIPT: 'VALIDATE_FORM_CREATE_RECEIPT',


  // MODAL CREATE TYPE RECEIPT
  MODAL_CREATE_RECEIPT_TOGGLE_OPEN: 'MODAL_CREATE_RECEIPT_TOGGLE_OPEN',
  MODAL_CREATE_RECEIPT_UPDATE_FORM: 'MODAL_CREATE_RECEIPT_UPDATE_FORM',
  MODAL_CREATE_RECEIPT_CHANGE_FORM: 'MODAL_CREATE_RECEIPT_CHANGE_FORM',
  MODAL_CREATE_RECEIPT_UPDATE_VALIDATE: 'MODAL_CREATE_RECEIPT_UPDATE_VALIDATE',

  MODAL_REMOVE_RECEIPT_TOGGLE_OPEN: 'MODAL_REMOVE_RECEIPT_TOGGLE_OPEN',
  MODAL_REMOVE_RECEIPT_UPDATE_DATA: 'MODAL_REMOVE_RECEIPT_UPDATE_DATA',

  MODAL_INACTIVE_RECEIPT_TOGGLE_OPEN: 'MODAL_INACTIVE_RECEIPT_TOGGLE_OPEN',
  MODAL_INACTIVE_RECEIPT_DEBOUNCE: 'MODAL_INACTIVE_RECEIPT_DEBOUNCE',

  // MODAL CREATE PAYMENT METHOD
  MODAL_CREATE_PAYMENT_METHOD_TOGGLE_OPEN: 'MODAL_CREATE_PAYMENT_METHOD_TOGGLE_OPEN',
  MODAL_CREATE_PAYMENT_METHOD_CHANGE_FORM: 'MODAL_CREATE_PAYMENT_METHOD_CHANGE_FORM',
  MODAL_CREATE_PAYMENT_METHOD_UPDATE_FORM: 'MODAL_CREATE_PAYMENT_METHOD_UPDATE_FORM',
  MODAL_CREATE_PAYMENT_METHOD_UPDATE_VALIDATE: 'MODAL_CREATE_PAYMENT_METHOD_UPDATE_VALIDATE',
}