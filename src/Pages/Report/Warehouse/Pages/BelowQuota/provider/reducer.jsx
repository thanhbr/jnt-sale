import {reportQuotaActions} from "./initState";

export const reportQuotaReducer = (state, action) => {
  switch (action.type) {
    case reportQuotaActions.SET_LIST_DEFAULT:
      return {
        ...state,
        table: {
          ...state.table,
          listDefault: action.payload || []
        },
      }
    // ============== FILTER =====================
    case reportQuotaActions.FILTER_CHANGE_SEARCH_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.payload
        },
      }
    case reportQuotaActions.FILTER_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            activeValue: action?.payload?.activeValue || [],
            keyword: action?.payload?.keyword || '',
            list: action?.payload?.list || [],
            listOrigin: action?.payload?.listOrigin || [],
            value: action?.payload?.value || [],
          }
        },
      }
    case reportQuotaActions.FILTER_WAREHOUSE_CHANGE_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            keyword: action?.payload || '',
          }
        },
      }
    case reportQuotaActions.FILTER_WAREHOUSE_UPDATE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            value: action?.payload || {},
          }
        },
      }
    case reportQuotaActions.FILTER_WAREHOUSE_UPDATE_LIST:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            list: action?.payload,
          }
        },
      }
    case reportQuotaActions.FILTER_ACTIVE_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            activeValue: action?.payload || [],
          }
        },
      }
      // ============== END WAREHOUSE =====================
    // ============== END FILTER =====================
    case reportQuotaActions?.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.list || [],
            loading: action.payload?.loading,
            quantityLow: action?.payload?.quantityLow
          },
        },
      }
    case reportQuotaActions.TABLE_PAGINATION_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          pagination: {
            ...state.table.pagination,
            active: action.payload?.active || 0,
            amount: action.payload?.amount || 20,
            total: action.payload?.total || 0,
            totalItems: action.payload?.totalItems || 0,
          },
        },
      }
    default: ''
  }
}