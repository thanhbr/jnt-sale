import {INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING, INVENTORY_INFORMATION_ROW_QUOTA} from "../interfaces/~contants";

export const inventoryInformationActions = {
  SET_SEARCH: 'SET_SEARCH',
  FILTER_LIST_WAREHOUSE_UPDATE_LIST: 'FILTER_LIST_WAREHOUSE_UPDATE_LIST',
  FILTER_UPDATE_VALUE_WAREHOUSE_UPDATE: 'FILTER_UPDATE_VALUE_WAREHOUSE_UPDATE',
  FILTER_UPDATE_TAB_WAREHOUSE_UPDATE: 'FILTER_UPDATE_TAB_WAREHOUSE_UPDATE',
  FILTER_SEARCH_LIST_WAREHOUSE_UPDATE: 'FILTER_SEARCH_LIST_WAREHOUSE_UPDATE',
  FILTER_UPDATE_TYPE_QUOTA: 'FILTER_UPDATE_TYPE_QUOTA',
  FILTER_UPDATE_QUOTA: 'FILTER_UPDATE_QUOTA',
  FILTER_UPDATE_QUANTITY_WAITING: 'FILTER_UPDATE_QUANTITY_WAITING',
  TOGGLE_MODAL_EXPORT_EXCEL: 'TOGGLE_MODAL_EXPORT_EXCEL',
  FILTER_UPDATE_ACTIVE_WAREHOUSE: 'FILTER_UPDATE_ACTIVE_WAREHOUSE',
  FILTER_UPDATE_ACTIVE_VALUE_QUOTA: 'FILTER_UPDATE_ACTIVE_VALUE_QUOTA',
  FILTER_UPDATE_ACTIVE_NORM_TYPE_QUOTA: 'FILTER_UPDATE_ACTIVE_NORM_TYPE_QUOTA',
  FILTER_UPDATE_ACTIVE_QUANTITY_WAITING: 'FILTER_UPDATE_ACTIVE_QUANTITY_WAITING',

  // TABLE
  SHOW_TABLE_DETAIL_PRODUCT: 'SHOW_TABLE_DETAIL_PRODUCT',
  UPDATE_LIST_TABLE_PRODUCT: 'UPDATE_LIST_TABLE_PRODUCT',
  TOGGLE_LOADING_TABLE_PRODUCT: 'TOGGLE_LOADING_TABLE_PRODUCT',
  SET_PAGINATION: 'SET_PAGINATION',

  //  MODAL
  UPDATE_EXPORT_MODAL_DATA: 'UPDATE_EXPORT_MODAL_DATA',
}

export const inventoryInformationInitialState = {
  search: '',
  filter: {
    groupWarehouse: {
      keyword: '',
      value: [],
      activeValue: [],
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
    },
    quota: {
      value: '',
      activeValue: '',
      norm_type: INVENTORY_INFORMATION_ROW_QUOTA?.find(item => item.active),
      activeNormType: [],
    },
    quantityWaiting: {
      value: INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING?.find(item => item.active),
      activeValue: []
    }
  },
  panels: {
    warehouse: '',
    quota: '',
    quantityWaiting: '',
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
  },
  paginate: {
    active: 0,
    amount: 20,
    total: 1,
    totalItems: 20,
  },
  modals: {
    export : {
      open: false,
      exportUrl: '#',
      exportModalData: []
    }
  },
}

export const inventoryInformationReducer = (state, action) => {
  switch (action.type) {
    case inventoryInformationActions.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }
    case inventoryInformationActions.FILTER_LIST_WAREHOUSE_UPDATE_LIST:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupWarehouse: {
            ...state.filter.groupWarehouse,
            keyword: action.payload?.keyword,
            value: action.payload?.value,
            activeValue: action.payload?.activeValue,
            list: action.payload?.list,
            listOrigin: action.payload?.listOrigin,
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_VALUE_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupWarehouse: {
            ...state.filter.groupWarehouse,
            value: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_TAB_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupWarehouse: {
            ...state.filter.groupWarehouse,
            tab: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_SEARCH_LIST_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupWarehouse: {
            ...state.filter.groupWarehouse,
            list: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_TYPE_QUOTA:
      return {
        ...state,
        filter: {
          ...state.filter,
          quota: {
            ...state.filter.quota,
            norm_type: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_QUOTA:
      return {
        ...state,
        filter: {
          ...state.filter,
          quota: {
            ...state.filter.quota,
            value: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_QUANTITY_WAITING:
      return {
        ...state,
        filter: {
          ...state.filter,
          quantityWaiting: {
            ...state.filter.quantityWaiting,
            value: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_ACTIVE_WAREHOUSE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupWarehouse: {
            ...state.filter.groupWarehouse,
            activeValue: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_ACTIVE_VALUE_QUOTA:
      return {
        ...state,
        filter: {
          ...state.filter,
          quota: {
            ...state.filter.quota,
            activeValue: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_ACTIVE_NORM_TYPE_QUOTA:
      return {
        ...state,
        filter: {
          ...state.filter,
          quota: {
            ...state.filter.quota,
            activeNormType: action.payload
          }
        },
      }
    case inventoryInformationActions.FILTER_UPDATE_ACTIVE_QUANTITY_WAITING:
      return {
        ...state,
        filter: {
          ...state.filter,
          quantityWaiting: {
            ...state.filter.quantityWaiting,
            activeValue: action.payload
          }
        },
      }
    case inventoryInformationActions.TOGGLE_MODAL_EXPORT_EXCEL:
      return {
        ...state,
        modals: {
          ...state.modals,
          export: {
            ...state.modals.export,
            open: action.payload
          }
        },
      }
    case inventoryInformationActions.SHOW_TABLE_DETAIL_PRODUCT:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            id: action?.payload?.id,
            active: action?.payload?.active,
            list: action?.payload?.list,
          }
        },
      }
    case inventoryInformationActions.UPDATE_LIST_TABLE_PRODUCT:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action?.payload,
          }
        },
      }
    case inventoryInformationActions.TOGGLE_LOADING_TABLE_PRODUCT:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            loading: action?.payload,
          }
        },
      }
    case inventoryInformationActions.SET_PAGINATION:
      return {
        ...state,
        paginate: {
          ...state.paginate,
          active: action?.payload?.active,
          amount: action?.payload?.amount,
          total: action?.payload?.total,
          totalItems: action?.payload?.totalItems,
        },
      }
    case inventoryInformationActions.UPDATE_EXPORT_MODAL_DATA:
      return {
        ...state,
        modals: {
          ...state.modals,
          export: {
            ...state.modals.export,
            exportModalData: action?.payload,
          }
        },
      }
    default: break
  }
}