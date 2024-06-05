import {getDateFromNow, formatDatetime} from "../interfaces/_util";

export const dateTimeDefaultValue = [
  getDateFromNow(-30, {type: 'start'}),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const reportInventoryState = {
  filter: {
    keyword: '',
    dateTime: {
      activeValue: {
        end: '',
        start: '',
        value: '',
        // end: dateTimeDefaultValue[1],
        // start: dateTimeDefaultValue[0],
        // type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        // value: formatDateTimeDefaultValue,
      },
      end: '',
      start: '',
      trigger: true,
      value: '',
      // end: dateTimeDefaultValue[1],
      // start: dateTimeDefaultValue[0],
      // type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      //
    },
    warehouse: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    groupProduct: {
      id: '',
      activeValue: '',
      value: '',
      list: [],
      listOrigin: [],
      listChildTwo: [],
      search: {
        keyword: '',
        list: [],
      },
    },
    per_page: '',
    start: 0,
  },
  panels: {
    totalQuantity: 0,
    totalAmount: 0,
  },
  table: {
    display: {
      list: [],
      loading: true,
    },
    listDefault: [],
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
}


export const reportInventoryActions = {
  SET_LIST_DEFAULT: 'SET_LIST_DEFAULT',
  FILTER_CHANGE_SEARCH_KEYWORD: 'FILTER_CHANGE_SEARCH_KEYWORD',

  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_DATE_TIME_TRIGGER_UPDATE: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',

  FILTER_WAREHOUSE_UPDATE: 'FILTER_WAREHOUSE_UPDATE',
  FILTER_WAREHOUSE_CHANGE_KEYWORD: 'FILTER_WAREHOUSE_CHANGE_KEYWORD',
  FILTER_WAREHOUSE_UPDATE_LIST: 'FILTER_WAREHOUSE_UPDATE_LIST',
  FILTER_WAREHOUSE_UPDATE_VALUE: 'FILTER_WAREHOUSE_UPDATE_VALUE',
  FILTER_ACTIVE_WAREHOUSE_UPDATE: 'FILTER_ACTIVE_WAREHOUSE_UPDATE',

  FILTER_GROUP_CUSTOMER_UPDATE: 'FILTER_GROUP_CUSTOMER_UPDATE',
  FILTER_GROUP_CUSTOMER_UPDATE_LIST_CHILDREN_TWO: 'FILTER_GROUP_CUSTOMER_UPDATE_LIST_CHILDREN_TWO',
  FILTER_GROUP_CUSTOMER_CHANGE_KEYWORD: 'FILTER_GROUP_CUSTOMER_CHANGE_KEYWORD',
  FILTER_GROUP_CUSTOMER_CHANGE_ID: 'FILTER_GROUP_CUSTOMER_CHANGE_ID',
  FILTER_GROUP_CUSTOMER_UPDATE_VALUE: 'FILTER_GROUP_CUSTOMER_UPDATE_VALUE',
  FILTER_GROUP_CUSTOMER_UPDATE_ACTIVE_VALUE: 'FILTER_GROUP_CUSTOMER_UPDATE_ACTIVE_VALUE',

  PANEL_UPDATE: 'PANEL_UPDATE',

  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
}