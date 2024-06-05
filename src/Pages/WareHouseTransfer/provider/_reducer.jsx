
import {formatDatetime} from '../../../common/form/datePicker/_functions'
import { WAREHOUSE_TS_FILTER_FORM_DATE_TIME_SORT_TYPES, WAREHOUSE_TS_FILTER_TAG_FIELDS } from '../interfaces/_constants'
import {getDateFromNow} from '../utils/date'

export const warehouseTransferActions = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  //  FILTER
  FILTER_ADVANCED_SEARCH_UPDATE: 'FILTER_ADVANCED_SEARCH_UPDATE',
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_WAREHOUSE_KEYWORD_UPDATE: 'FILTER_WAREHOUSE_KEYWORD_UPDATE',
  FILTER_WAREHOUSE_UPDATE: 'FILTER_WAREHOUSE_UPDATE',
  //Warehouse
  FILTER_WAREHOUSE_EXPORT_KEYWORD_UPDATE:
    'FILTER_WAREHOUSE_EXPORT_KEYWORD_UPDATE',
  FILTER_WAREHOUSE_EXPORT_UPDATE: 'FILTER_WAREHOUSE_EXPORT_UPDATE',
  FILTER_WAREHOUSE_IMPORT_KEYWORD_UPDATE:
    'FILTER_WAREHOUSE_IMPORT_KEYWORD_UPDATE',
  FILTER_WAREHOUSE_IMPORT_UPDATE: 'FILTER_WAREHOUSE_IMPORT_UPDATE',
  //Created user
  FILTER_CREATED_USER_ENABLE_LOADING: 'FILTER_CREATED_USER_ENABLE_LOADING',
  FILTER_CREATED_USER_KEYWORD_UPDATE: 'FILTER_CREATED_USER_KEYWORD_UPDATE',
  FILTER_CREATED_USER_TAB_UPDATE: 'FILTER_CREATED_USER_TAB_UPDATE',
  FILTER_CREATED_USER_UPDATE: 'FILTER_CREATED_USER_UPDATE',
  OTHER_FILTER_APPLY: 'OTHER_FILTER_APPLY',
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  // NOTIFICATIONS
  NOTIFICATIONS_LIST_UPDATE: 'NOTIFICATIONS_LIST_UPDATE',
  // TABLE
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE',
  TABLE_DISPLAY_LOADING_UPDATE: 'TABLE_DISPLAY_LOADING_UPDATE',
  TABLE_AMOUNT_UPDATE: 'TABLE_AMOUNT_UPDATE',
}

const dateTimeDefaultValue = [
  getDateFromNow(-7),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const WareHouseTransferReducer = (state, action) => {
  switch (action.type) {
    case warehouseTransferActions.FILTER_WAREHOUSE_EXPORT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouseExport: {
            ...state.filter.warehouseExport,
            value: action.payload?.value || null,
          },
        },
      }

    case warehouseTransferActions.FILTER_WAREHOUSE_EXPORT_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouseExport: {
            ...state.filter.warehouseExport,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case warehouseTransferActions.FILTER_WAREHOUSE_IMPORT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouseImport: {
            ...state.filter.warehouseImport,
            value: action.payload?.value || null,
          },
        },
      }

    case warehouseTransferActions.FILTER_WAREHOUSE_IMPORT_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouseImport: {
            ...state.filter.warehouseImport,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case warehouseTransferActions.FOCUS_INPUT:
      return {
        ...state,
        focusInputOnSuccess: action.payload,
      }
    case warehouseTransferActions.FILTER_ADVANCED_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          advancedSearch: {
            ...state.filter.advancedSearch,
            customer: {
              ...state.filter.advancedSearch.customer,
              keyword:
                typeof action.payload?.customer?.keyword === 'string'
                  ? action.payload.customer.keyword
                  : state.filter.advancedSearch.customer.keyword,
              value:
                typeof action.payload?.customer?.value === 'string'
                  ? action.payload.customer.value
                  : state.filter.advancedSearch.customer.value,
            },
            itemDetails:
              typeof action.payload?.itemDetails === 'string'
                ? action.payload.itemDetails
                : state.filter.advancedSearch.itemDetails,
          },
        },
      }

    case warehouseTransferActions.FILTER_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            end: action.payload?.end,
            start: action.payload?.start,
            type: action.payload?.type,
            value: action.payload?.value,
          },
        },
      }

    case warehouseTransferActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              ...state.filter.dateTime.activeValue,
              end: action.payload?.end,
              start: action.payload?.start,
              type: action.payload?.type,
              value: action.payload?.value,
            },
          },
        },
      }

    case warehouseTransferActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouseExport: {
            ...state.filter.warehouesExport,
            originList: action.payload.warehouse.list,
            list: action.payload.warehouse.list,
          },
          warehouseImport: {
            ...state.filter.warehouseImport,
            originList: action.payload.warehouse.list,
            list: action.payload.warehouse.list,
          },
          createdUser: {
            ...state.filter.createdUser,
            originList: action.payload.user.list,
            list: action.payload.user.list,
          },
        },
      }

    case warehouseTransferActions.FILTER_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          search: {
            ...state.filter.search,
            value: action.payload.value || '',
          },
        },
      }

    case warehouseTransferActions.NOTIFICATIONS_LIST_UPDATE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: action.payload?.notifications?.list || [],
        },
      }

    case warehouseTransferActions.OTHER_FILTER_APPLY:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              end: state.filter.dateTime.end,
              start: state.filter.dateTime.start,
              type: state.filter.dateTime.type,
              value: state.filter.dateTime.value,
            },
          },
          warehouseExport: {
            ...state.filter.warehouseExport,
            activeValue: state.filter.warehouseExport.value
          },
          warehouseImport: {
            ...state.filter.warehouseImport,
            activeValue: state.filter.warehouseImport.value
          },
          createdUser: {
            ...state.filter.createdUser,
            activeValue: state.filter.createdUser.value
          },
        },
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
            arr_details: action.payload?.display?.arr_details || {},
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
            totalItems: action.payload?.pagination?.totalItems,
          },
        },
        panels: {
          ...state.panels,
          codTotal: action.payload?.panels?.codTotal,
          orderTotal: action.payload?.panels?.orderTotal,
          shippingFeeTotal: action.payload?.panels?.shippingFeeTotal,
        },
      }

    case warehouseTransferActions.TABLE_AMOUNT_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
            arr_details: action.payload?.display?.arr_details || {},
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
          },
        },
      }

    case warehouseTransferActions.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
            report: action.payload?.display?.report || [],
            arr_details: action.payload?.display?.arr_details || {},
          },
          loading: true,
          pagination: {
            ...state.table.pagination,
            total: Math.ceil(
              action.payload.pagination.totalItems /
                state.table.pagination.amount,
            ),
            totalItems: action.payload.pagination.totalItems,
          },
        },
      }

    case warehouseTransferActions.TABLE_DISPLAY_DETAIL_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            active: action.payload?.active || null,
            list: action.payload?.moreItem
              ? [...state.table.detail.list, action.payload.moreItem]
              : [...state.table.detail.list],
          },
        },
      }

    case warehouseTransferActions.TABLE_PAGINATION_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
            arr_details: action.payload?.display?.arr_details || {},
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
          },
        },
      }

    case warehouseTransferActions.TABLE_SELECTED_LIST_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          selected: {
            ...state.table.selected,
            list: action.payload?.selected?.list || [],
          },
        },
      }
    case warehouseTransferActions.TABLE_DISPLAY_LOADING_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            loading: action.payload?.table?.display?.loading,
          },
        },
      }
    case 'TABLE_DETAIL_LOADING_UPDATE':
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            loading: action.payload,
          },
        },
      }
    case warehouseTransferActions.TAG_FILTER_DELETE:
      switch (action.payload?.type) {
        case WAREHOUSE_TS_FILTER_TAG_FIELDS[0]:
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...state.filter.dateTime,
                activeValue: {
                  end: '',
                  start: '',
                  type: WAREHOUSE_TS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: '',
                },
                end: '',
                start: '',
                type: WAREHOUSE_TS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: '',
              },
            },
          }
        case WAREHOUSE_TS_FILTER_TAG_FIELDS[1]:
          return {
            ...state,
            filter: {
              ...state.filter,
              warehouseExport: {
                ...state.filter.warehouseExport,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        case WAREHOUSE_TS_FILTER_TAG_FIELDS[2]:
          return {
            ...state,
            filter: {
              ...state.filter,
              warehouseImport: {
                ...state.filter.warehouseImport,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        case WAREHOUSE_TS_FILTER_TAG_FIELDS[3]:
          return {
            ...state,
            filter: {
              ...state.filter,
              createdUser: {
                ...state.filter.createdUser,
                activeValue: [],
                keyword: '',
                loading: false,
                tab: 'all', // all | checked
                value: [],
              },
            },
          }
        default:
          return {...state}
      }

    case warehouseTransferActions.FILTER_CREATED_USER_ENABLE_LOADING:
      return {
        ...state,
        filter: {
          ...state.filter,
          createdUser: {
            ...state.filter.createdUser,
            loading: true,
          },
        },
      }

    case warehouseTransferActions.FILTER_CREATED_USER_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          createdUser: {
            ...state.filter.createdUser,
            keyword: action.payload.keyword,
            list: action.payload.list,
            loading: false,
            tab: action.payload?.tab || state.filter.createdUser.tab,
          },
        },
      }

    case warehouseTransferActions.FILTER_CREATED_USER_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          createdUser: {
            ...state.filter.createdUser,
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case warehouseTransferActions.FILTER_CREATED_USER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          createdUser: {
            ...state.filter.createdUser,
            list: action?.payload?.list,
            value: action.payload?.value || [],
          },
        },
      }

    case 'SET_LOADING':
      return {
        ...state,
        table: {
          ...state.table,
          loading: action.payload,
        },
      }
    case 'FILTER_DATE_TIME_TRIGGER_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: action.payload?.trigger,
          },
        },
      }

    case 'UPDATE_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    default:
      throw new Error()
  }
}
