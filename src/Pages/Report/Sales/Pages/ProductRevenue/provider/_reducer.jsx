import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_DUPLICATE_VALUES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { getDateFromNow } from 'Pages/Report/Sales/Pages/ProductRevenue/utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'

export const orderActions = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  //  FILTER
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  UPDATE_SORT_BY: 'UPDATE_SORT_BY',
  FILTER_PRODUCT_REVENUE_KEYWORD_UPDATE: 'FILTER_PRODUCT_REVENUE_KEYWORD_UPDATE',
  FILTER_PRODUCT_REVENUE_UPDATE: 'FILTER_PRODUCT_REVENUE_UPDATE',
  OTHER_FILTER_APPLY: 'OTHER_FILTER_APPLY',
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  // NOTIFICATIONS
  NOTIFICATIONS_LIST_UPDATE: 'NOTIFICATIONS_LIST_UPDATE',
  // PANELS
  PANELS_UPDATE: 'PANELS_UPDATE',
  // TABLE
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE',
  TABLE_DISPLAY_LOADING_UPDATE: 'TABLE_DISPLAY_LOADING_UPDATE',
}

const dateTimeDefaultValue = [
  getDateFromNow(-7),
  getDateFromNow(0, { type: 'end' }),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const ProductRevenueReducer = (state, action) => {
  switch (action.type) {
    case orderActions.FOCUS_INPUT:
      return {
        ...state,
        focusInputOnSuccess: action.payload
      }
    case orderActions.FILTER_DATE_TIME_UPDATE:
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

    case orderActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
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
            }
          },
        },
      }

    case orderActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
        },
      }

    case orderActions.UPDATE_SORT_BY:
      return {
        ...state,
        filter: {
          ...state.filter,
          sortBy: action.payload,
        },
      }

    case orderActions.OTHER_FILTER_APPLY:
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
          // productRevenue: {
          //   ...state.filter.productRevenue,
          //   activeValue: state.filter.productRevenue.value,
          // },
        },
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          topProduct: action.payload?.topProduct,
          total: action.payload?.total,
        },
      }

    case orderActions.TABLE_AMOUNT_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
        },
      }

    case orderActions.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          topProduct: action.payload?.topProduct,
          total: action.payload?.total,
          loading: true,
        },
      }

    case 'STATUS_LIST_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingStatus: {
            ...state.filter.shippingStatus,
            activeValue: [],
            list: action.payload?.statusList,
            listOrigin: action.payload?.statusList,
          },
        },
      }

    case orderActions.TABLE_DISPLAY_DETAIL_UPDATE:
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

    case orderActions.TABLE_DISPLAY_LOADING_UPDATE:
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
    case orderActions.TAG_FILTER_DELETE:
      switch (action.payload?.type) {
        case 'dateTime.current':
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...state.filter.dateTime,
                activeValue: {
                  end: '',
                  start: '',
                  type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: '',
                },
                end: '',
                start: '',
                type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: '',
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[0]:
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...state.filter.dateTime,
                activeValue: {
                  end: dateTimeDefaultValue[1],
                  start: dateTimeDefaultValue[0],
                  type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: formatDateTimeDefaultValue,
                },
                end: dateTimeDefaultValue[1],
                start: dateTimeDefaultValue[0],
                type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: formatDateTimeDefaultValue,
              },
            },
          }

        case ORDER_FILTER_TAG_FIELDS[1]:
          return {
            ...state,
            filter: {
              ...state.filter,
              productRevenue: {
                ...state.filter.productRevenue,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        default:
          return { ...state }
      }

    case 'SET_LOADING':
      return {
        ...state,
        table: {
          ...state.table,
          loading: action.payload,
        },
      }

    case orderActions.FILTER_SEARCH_UPDATE:
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

    case 'SET_DATE_TIME_URL' :
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              end: action.payload.end || state.filter.dateTime.end,
              start: action.payload.start || state.filter.dateTime.start,
              type: action.payload.type || state.filter.dateTime.type,
              value: action.payload.value || state.filter.dateTime.value,
            },
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
