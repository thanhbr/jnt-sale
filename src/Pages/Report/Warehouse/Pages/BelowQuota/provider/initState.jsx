export const reportQuotaState = {
  filter: {
    keyword: '',
    warehouse: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    per_page: '',
    start: 0,
  },
  table: {
    display: {
      list: [],
      loading: true,
      quantityLow: 0
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
      total: 3,
      totalItems: 59,
    },
    selected: {
      list: [],
    },
  },
}


export const reportQuotaActions = {
  SET_LIST_DEFAULT: 'SET_LIST_DEFAULT',
  FILTER_CHANGE_SEARCH_KEYWORD: 'FILTER_CHANGE_SEARCH_KEYWORD',

  FILTER_WAREHOUSE_UPDATE: 'FILTER_WAREHOUSE_UPDATE',
  FILTER_WAREHOUSE_CHANGE_KEYWORD: 'FILTER_WAREHOUSE_CHANGE_KEYWORD',
  FILTER_WAREHOUSE_UPDATE_LIST: 'FILTER_WAREHOUSE_UPDATE_LIST',
  FILTER_WAREHOUSE_UPDATE_VALUE: 'FILTER_WAREHOUSE_UPDATE_VALUE',
  FILTER_ACTIVE_WAREHOUSE_UPDATE: 'FILTER_ACTIVE_WAREHOUSE_UPDATE',

  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
}