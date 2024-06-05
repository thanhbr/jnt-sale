import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_DUPLICATE_VALUES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import {getDateFromNow} from 'Pages/Report/Sales/Pages/Employee/utils/date'
import {formatDatetime} from 'common/form/datePicker/_functions'

export const orderActions = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  //  FILTER
  FILTER_ADVANCED_SEARCH_UPDATE: 'FILTER_ADVANCED_SEARCH_UPDATE',
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_DUPLICATE_UPDATE: 'FILTER_DUPLICATE_UPDATE',
  FILTER_PRINT_UPDATE: 'FILTER_PRINT_UPDATE',
  FILTER_COD_UPDATE: 'FILTER_COD_UPDATE',
  FILTER_EMPLOYEE_UPDATE: 'FILTER_EMPLOYEE_UPDATE',
  FILTER_EMPLOYEE_TAB_UPDATE: 'FILTER_EMPLOYEE_TAB_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_PRODUCT_ENABLE_LOADING: 'FILTER_PRODUCT_ENABLE_LOADING',
  FILTER_PRODUCT_KEYWORD_UPDATE: 'FILTER_PRODUCT_KEYWORD_UPDATE',
  FILTER_PRODUCT_TAB_UPDATE: 'FILTER_PRODUCT_TAB_UPDATE',
  FILTER_PRODUCT_UPDATE: 'FILTER_PRODUCT_UPDATE',
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE:
    'FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE',
  FILTER_SHIPPING_PARTNER_UPDATE: 'FILTER_SHIPPING_PARTNER_UPDATE',
  FILTER_SHIPPING_STATUS_KEYWORD_UPDATE:
    'FILTER_SHIPPING_STATUS_KEYWORD_UPDATE',
  FILTER_SHIPPING_STATUS_TAB_UPDATE: 'FILTER_SHIPPING_STATUS_TAB_UPDATE',
  FILTER_SHIPPING_STATUS_UPDATE: 'FILTER_SHIPPING_STATUS_UPDATE',
  FILTER_SHIPPING_STATUS_LIST_UPDATE: 'FILTER_SHIPPING_STATUS_LIST_UPDATE',
  FILTER_PRINT_KEYWORD_UPDATE: 'FILTER_PRINT_KEYWORD_UPDATE',
  FILTER_COD_KEYWORD_UPDATE: 'FILTER_COD_KEYWORD_UPDATE',
  FILTER_SOURCE_KEYWORD_UPDATE: 'FILTER_SOURCE_KEYWORD_UPDATE',
  FILTER_SOURCE_UPDATE: 'FILTER_SOURCE_UPDATE',
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
  FILTER_DATE_TIME_TRIGGER_UPDATE: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
  FILTER_SORTBY_UPDATE: 'FILTER_SORTBY_UPDATE',
}

const dateTimeDefaultValue = [
  getDateFromNow(-7),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const EmployeeReducer = (state, action) => {
  switch (action.type) {
    case orderActions.FOCUS_INPUT:
      return {
        ...state,
        focusInputOnSuccess: action.payload
      }
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


    case orderActions.FILTER_EMPLOYEE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: action.payload.keyword,
            list: action.payload.list,
            type: {
              ...state.filter.employee.type,
              value: action.payload.type?.value,
            },
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
            list: action.payload.list,
            value: action.payload.value,
          },
        },
      }

    case orderActions.FILTER_EMPLOYEE_CATEGORY_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: '',
            list: action.payload?.list,
            tab: 'all',
            type: {
              ...state.filter.employee.type,
              value: action.payload?.type?.value,
            },
            value: [],
          },
        },
      }

    case orderActions.FILTER_EMPLOYEE_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case orderActions.FILTER_SOURCE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          source: {
            ...state.filter.source,
            value: action.payload?.value || null,
          },
        },
      }

    case orderActions.FILTER_SOURCE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          source: {
            ...state.filter.source,
            keyword: action.payload.keyword,
            list: action.payload.list,
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
            type: {
              ...state.filter.employee.type,
              list: action.payload.employee.type.list,
            },
          },
          source: {
            ...state.filter.source,
            list: action.payload.source.list,
            listOrigin: action.payload.source.list,
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


    case orderActions.NOTIFICATIONS_LIST_UPDATE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: action.payload?.notifications?.list || [],
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
          employee: {
            ...state.filter.employee,
            activeValue: {
              type: state.filter.employee.type.value,
              value: state.filter.employee.value,
            },
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            activeValue: state.filter.shippingPartner.value,
          },
          source: {
            ...state.filter.source,
            activeValue: state.filter.source.value,
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
          ...action.payload?.panels,
        },
      }

    case orderActions.PANELS_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          ...action.payload?.panels
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

    case orderActions.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
            report: action.payload?.display?.report || [],
          },
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

    case orderActions.TABLE_PAGINATION_UPDATE:
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
              employee: {
                ...state.filter.employee,
                activeValue: {
                  ...state.filter.employee.activeValue,
                  value: [],
                },
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
              source: {
                ...state.filter.source,
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
              shippingPartner: {
                ...state.filter.shippingPartner,
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
              employee: {
                ...state.filter.employee,
                activeValue: {
                  ...state.filter.employee.activeValue,
                  type: {name: 'team_of_employees', value: ''},
                },
                type: {
                  ...state.filter.employee.type,
                  value: {name: 'team_of_employees', value: ''},
                },
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
    case orderActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
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

    case 'SET_DOWN_TIME_URL' :
      return {
        ...state,
        filter: {
          ...state.filter,
          downtime: {
            activeValue: action.payload,
            value: action.payload
          },
        },
      }

    case orderActions.FILTER_SORTBY_UPDATE :
      return {
        ...state,
        filter: {
          ...state.filter,
          sortBy: {
            value: action.payload
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
