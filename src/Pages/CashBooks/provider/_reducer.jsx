import { filter } from 'lodash'
import { formatDatetime } from '../../../common/form/datePicker/_functions'
import { getDateFromNow } from '../../CashBooks/utils/date'
import {
  CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES, CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES, CASHBOOKS_FILTER_TAG_FIELDS
} from '../interfaces/_constants'

export const actions = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  //  FILTER
  FILTER_ADVANCED_SEARCH_UPDATE: 'FILTER_ADVANCED_SEARCH_UPDATE',
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_RECEIPT_TYPE_CATEGORY_UPDATE: 'FILTER_RECEIPT_TYPE_CATEGORY_UPDATE',
  FILTER_RECEIPT_TYPE_KEYWORD_UPDATE: 'FILTER_RECEIPT_TYPE_KEYWORD_UPDATE',
  OTHER_FILTER_APPLY: 'OTHER_FILTER_APPLY',
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  FILTER_RECEIPT_TYPE_UPDATE: 'FILTER_RECEIPT_TYPE_UPDATE',
  FILTER_PAYMENT_METHOD_KEYWORD_UPDATE:
    'FILTER_PAYMENT_METHOD_KEYWORD_UPDATE',
  FILTER_PAYMENT_METHOD_TAB_UPDATE: 'FILTER_PAYMENT_METHOD_TAB_UPDATE',
  FILTER_PAYMENT_METHOD_UPDATE: 'FILTER_PAYMENT_METHOD_UPDATE',
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
  TABLE_AMOUNT_UPDATE: 'TABLE_AMOUNT_UPDATE'
}

const dateTimeDefaultValue = [
  getDateFromNow(-7),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const CashBooksReducer = (state, action) => {
  switch (action.type) {
    case actions.FOCUS_INPUT: 
      return {
        ...state,
        focusInputOnSuccess: action.payload
      }
    case actions.FILTER_ADVANCED_SEARCH_UPDATE:
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

    case actions.FILTER_DATE_TIME_UPDATE:
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

    case actions.FILTER_ACTIVE_DATE_TIME_UPDATE:
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

    case actions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            list: action.payload.paymentMethod.list,
            originList: action.payload.paymentMethod.list,
          },
          receiptType: {
            ...state.filter.receiptType,
            list: action.payload.receiptType.list,
            originList: action.payload.receiptType.list,
          },
        },
      }

    case actions.FILTER_SEARCH_UPDATE:
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

    case actions.FILTER_RECEIPT_TYPE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          receiptType: {
            ...state.filter.receiptType,
            ...action.payload,
          },
        },
      }

    case actions.FILTER_RECEIPT_TYPE_CATEGORY_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          receiptType: {
            ...state.filter.receiptType,
            type: {
              ...state.filter.receiptType.type,
              value: action.payload?.type?.value,
            },
          },
        },
      }

    case actions.FILTER_RECEIPT_TYPE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          receiptType: {
            ...state.filter.receiptType,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    
    case actions.FILTER_PAYMENT_METHOD_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case actions.FILTER_PAYMENT_METHOD_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case actions.FILTER_PAYMENT_METHOD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            list: action?.payload?.list,
            value: action.payload?.value || [],
          },
        },
      }
  

    case actions.OTHER_FILTER_APPLY:
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
          receiptType: {
            ...state.filter.receiptType,
            activeValue: {
              type: state.filter.receiptType.type.value,
              value: state.filter.receiptType.value,
            }
          },
          paymentMethod: {
            ...state.filter.paymentMethod,
            activeValue: state.filter.paymentMethod.value
          }
        },
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
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
          total_beginning: action.payload?.panels?.total_beginning,
          total_payment: action.payload?.panels?.total_payment,
          total_receipt: action.payload?.panels?.total_receipt,
        },
      }

    case actions.PANELS_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          total_beginning: action.payload?.panels?.total_beginning,
          total_payment: action.payload?.panels?.total_payment,
          total_receipt: action.payload?.panels?.total_receipt,
        },
        table: {
          ...state.table,
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

    case actions.TABLE_AMOUNT_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
          },
        },
      }

    case actions.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          loading: true,
        },
      }

    case actions.TABLE_PAGINATION_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
          },
        },
      }

    case actions.TABLE_DISPLAY_LOADING_UPDATE:
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

    case actions.TAG_FILTER_DELETE:
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
                  type: CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: '',
                },
                end: '',
                start: '',
                type: CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: '',
              },
            },
          }
        case CASHBOOKS_FILTER_TAG_FIELDS[0]:
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...state.filter.dateTime,
                activeValue: {
                  end: dateTimeDefaultValue[1],
                  start: dateTimeDefaultValue[0],
                  type: CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: formatDateTimeDefaultValue,
                },
                end: dateTimeDefaultValue[1],
                start: dateTimeDefaultValue[0],
                type: CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: formatDateTimeDefaultValue,
              },
            },
          }
        case CASHBOOKS_FILTER_TAG_FIELDS[1]:
          return {
            ...state,
            filter: {
              ...state.filter,
              receiptType: {
                ...state.filter.receiptType,
                activeValue: {
                  type: CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES[0],
                  value: null
                },
                type: {
                  ...state.filter.receiptType.type,
                  value: CASHBOOKS_FILTER_FORM_RECEIPT_TYPE_SORT_TYPES[0],
                },
                keyword: '',
                value: null,
              },
            },
          }
        case CASHBOOKS_FILTER_TAG_FIELDS[2]:
          return {
            ...state,
            filter: {
              ...state.filter,
              paymentMethod: {
                ...state.filter.paymentMethod,
                activeValue: [],
                keyword: '',
                tab: 'all', // all | checked
                value: [],
              },
            },
          }
        default:
          return {...state}
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
