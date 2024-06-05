import {reportInventoryActions} from "./initState";


export const reportInventoryReducer = (state, action) => {
  switch (action.type) {
    case reportInventoryActions.SET_LIST_DEFAULT:
      return {
        ...state,
        table: {
          ...state.table,
          listDefault: action.payload || []
        },
      }
    // ============== FILTER =====================
    case reportInventoryActions.FILTER_CHANGE_SEARCH_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.payload
        },
      }

    // ============== DATE =====================
    case reportInventoryActions.FILTER_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            end: action.payload?.end || '',
            start: action.payload?.start || '',
            type: action.payload?.type || '',
            value: action.payload?.value || '',
          },
        },
      }
    case reportInventoryActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              ...state.filter.dateTime.activeValue,
              end: action.payload?.end || '',
              start: action.payload?.start || '',
              value: action.payload?.value || '',
            },
          },
        },
      }
    case reportInventoryActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: !action.payload,
          },
        },
      }
    // ============== END DATE =====================

    // ============== WAREHOUSE =====================
    case reportInventoryActions.FILTER_WAREHOUSE_UPDATE:
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
    case reportInventoryActions.FILTER_WAREHOUSE_CHANGE_KEYWORD:
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
    case reportInventoryActions.FILTER_WAREHOUSE_UPDATE_VALUE:
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
    case reportInventoryActions.FILTER_WAREHOUSE_UPDATE_LIST:
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
    case reportInventoryActions.FILTER_ACTIVE_WAREHOUSE_UPDATE:
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

    //  =================== GROUP PRODUCT ===============
    case reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter.groupProduct,
            list: action?.payload?.list || [],
            listOrigin: action?.payload?.listOrigin || [],
          }
        }
      }
    case reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_LIST_CHILDREN_TWO:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter?.groupProduct,
            listChildTwo: action?.payload || [],
          }
        }
      }
    case reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter?.groupProduct,
            search: {
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
            },
          }
        }
      }
    case reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_ID:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter?.groupProduct,
            id: action?.payload || '',
          }
        }
      }
    case reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter?.groupProduct,
            value: action?.payload || '',
          }
        }
      }
    case reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_ACTIVE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter?.groupProduct,
            activeValue: action?.payload || '',
          }
        }
      }
    //  =================== END GROUP PRODUCT ===============


    // ============== END FILTER =====================
    case reportInventoryActions.PANEL_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          totalQuantity: action?.payload?.totalQuantity || 0,
          totalAmount: action?.payload?.totalAmount || 0
        },
      }

    case reportInventoryActions?.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.list || [],
            loading: action.payload?.loading,
          },
        },
      }
    case reportInventoryActions.TABLE_PAGINATION_UPDATE:
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
    default: break
  }
}