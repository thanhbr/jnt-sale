import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_COMPARING_VALUES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { getDateFromNow } from '../../deliveryManagement/utils/date'
import { formatDatetime } from '../../../common/form/datePicker/_functions'

export const orderActions = {
  //  FILTER
  FILTER_ADVANCED_SEARCH_UPDATE: 'FILTER_ADVANCED_SEARCH_UPDATE',
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_STATUS_COMPARING_UPDATE: 'FILTER_STATUS_COMPARING_UPDATE',
  FILTER_STATUS_COMPARING_KEYWORD_UPDATE:
    'FILTER_STATUS_COMPARING_KEYWORD_UPDATE',
  FILTER_EMPLOYEE_KEYWORD_UPDATE:
  'FILTER_EMPLOYEE_KEYWORD_UPDATE',
  FILTER_EMPLOYEE_UPDATE: 'FILTER_EMPLOYEE_UPDATE',
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE:
    'FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE',
  FILTER_SHIPPING_PARTNER_UPDATE: 'FILTER_SHIPPING_PARTNER_UPDATE',
  FILTER_SHIPPING_STATUS_KEYWORD_UPDATE:
    'FILTER_SHIPPING_STATUS_KEYWORD_UPDATE',
  FILTER_SHIPPING_STATUS_TAB_UPDATE: 'FILTER_SHIPPING_STATUS_TAB_UPDATE',
  FILTER_SHIPPING_STATUS_UPDATE: 'FILTER_SHIPPING_STATUS_UPDATE',
  FILTER_SHIPPING_STATUS_LIST_UPDATE: 'FILTER_SHIPPING_STATUS_LIST_UPDATE',
  FILTER_SOURCE_KEYWORD_UPDATE: 'FILTER_SOURCE_KEYWORD_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  OTHER_FILTER_APPLY: 'OTHER_FILTER_APPLY',
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  // NOTIFICATIONS
  NOTIFICATIONS_LIST_UPDATE_SUCCESS: 'NOTIFICATIONS_LIST_UPDATE_SUCCESS',
  NOTIFICATIONS_LIST_UPDATE_FAIL: 'NOTIFICATIONS_LIST_UPDATE_FAIL',
  // PANELS
  PANELS_UPDATE: 'PANELS_UPDATE',
  // TABLE
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
  TABLE_AMOUNT_UPDATE: 'TABLE_AMOUNT_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE',
  //Export 
  CONFIRM_EXPORT: 'CONFIRM_EXPORT',
  STATUS_EXPORT: 'STATUS_EXPORT',
}

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type:'end'})]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const CodReducer = (state, action) => {
  switch (action.type) {
    case orderActions.FILTER_ADVANCED_SEARCH_UPDATE:
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

    case orderActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            list: action.payload.shippingPartner.list,
            listOrigin: action.payload.shippingPartner.list,
          },
          employee: {
            ...state.filter.employee,
            list: action.payload.employee.list,
            listOrigin: action.payload.employee.list,
          }
        },
      }

    case orderActions.FILTER_PRINT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          print: {
            ...state.filter.print,
            value: action.payload?.value || null,
            keyword: action.payload?.value?.name || '',
          },
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

    case orderActions.FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case orderActions.FILTER_SHIPPING_PARTNER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            keyword: action.payload?.value?.name || '',
            value: action.payload?.value || null,
          },
        },
      }

    case orderActions.FILTER_EMPLOYEE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }
    case orderActions.FILTER_EMPLOYEE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: action.payload?.value?.name || '',
            value: action.payload?.value || null,
          },
        },
      }
    case orderActions.FILTER_STATUS_COMPARING_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          statusComparing: {
            ...state.filter.statusComparing,
            keyword: action.payload?.value?.name || '',
            value: action.payload?.value || null,
          },
        },
      }
    case orderActions.FILTER_STATUS_COMPARING_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          statusComparing: {
            ...state.filter.statusComparing,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case orderActions.FILTER_SHIPPING_STATUS_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingStatus: {
            ...state.filter.shippingStatus,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case orderActions.FILTER_SHIPPING_STATUS_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingStatus: {
            ...state.filter.shippingStatus,
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case orderActions.FILTER_SHIPPING_STATUS_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingStatus: {
            ...state.filter.shippingStatus,
            // list: action?.payload?.list,
            value: action.payload?.value || [],
          },
        },
      }

    case orderActions.NOTIFICATIONS_LIST_UPDATE_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          listSuccess: action.payload?.notifications?.listSuccess || [],
        },
        
      }

    case orderActions.NOTIFICATIONS_LIST_UPDATE_FAIL:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          listFail: action.payload?.notifications?.listFail || [],
        },
      }

    case orderActions.FILTER_SHIPPING_STATUS_LIST_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingStatus: {
            ...state.filter.shippingStatus,
            list: action.payload,
            listOrigin: action.payload,
          },
        }
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
          shippingPartner: {
            ...state.filter.shippingPartner,
            activeValue: state.filter.shippingPartner.value,
          },
          employee: {
            ...state.filter.employee,
            activeValue: state.filter.employee.value,
          },
          statusComparing: {
            ...state.filter.statusComparing,
            activeValue: state.filter.statusComparing.value,
          },
          shippingStatus: {
            ...state.filter.shippingStatus,
            activeValue: state.filter.shippingStatus.value,
            list: action.payload?.statusList,
            listOrigin: action.payload?.statusList,
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
          codTotal: action.payload?.panels?.codTotal,
          orderTotal: action.payload?.panels?.orderTotal,
          weightTotal: action.payload?.panels?.weightTotal,
          partsignTotal: action.payload?.panels?.partsignTotal,
          shippingFeeTotal: action.payload?.panels?.shippingFeeTotal,
        },
      }

    case orderActions.PANELS_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          codTotal: action.payload?.panels?.codTotal,
          orderTotal: action.payload?.panels?.orderTotal,
          weightTotal: action.payload?.panels?.weightTotal,
          partsignTotal: action.payload?.panels?.partsignTotal,
          shippingFeeTotal: action.payload?.panels?.shippingFeeTotal,
        },
        table: {
          ...state.table,
          pagination: {
            ...state.table.pagination,
            total: Math.ceil(action.payload.pagination.totalItems / state.table.pagination.amount),
            totalItems: action.payload.pagination.totalItems,
          },
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
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
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
          loading: true
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

    case orderActions.TABLE_PAGINATION_UPDATE:
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

    case orderActions.TABLE_SELECTED_LIST_UPDATE:
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
    case 'TABLE_DISPLAY_LOADING_UPDATE':
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
                  type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2],
                  value: '',
                },
                end: '',
                start: '',
                type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2],
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
                  type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2],
                  value: formatDateTimeDefaultValue,
                },
                end: dateTimeDefaultValue[1],
                start: dateTimeDefaultValue[0],
                type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2],
                value: formatDateTimeDefaultValue,
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[1]:
          return {
            ...state,
            filter: {
              ...state.filter,
              shippingStatus: {
                ...state.filter.shippingStatus,
                activeValue: [],
                keyword: '',
                value: [],
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[2]:
          return {
            ...state,
            filter: {
              ...state.filter,
              shippingPartner: {
                ...state.filter.shippingPartner,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[3]:
          return {
            ...state,
            filter: {
              ...state.filter,
              employee: {
                ...state.filter.employee,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[4]:
          return {
            ...state,
            filter: {
              ...state.filter,
              statusComparing: {
                ...state.filter.statusComparing,
                activeValue: [],
                keyword: '',
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
          loading: action.payload
        },
      }
    case 'FILTER_DATE_TIME_TRIGGER_UPDATE' :
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

    case 'UPDATE_LOADING' :
      return {
        ...state,
        loading: action.payload
      }
    case 'TOGGLE_MODAL' :
      return {
        ...state,
        modals: {
          ...state.modals,
          import: action.payload
        },
      }
    case orderActions.CONFIRM_EXPORT:
        return {
            ...state,
            confirm_export: action.payload,
        }
    case orderActions.STATUS_EXPORT:
        return {
            ...state,
            status_export: action.payload,
        }

    default:
      throw new Error()
  }
}
