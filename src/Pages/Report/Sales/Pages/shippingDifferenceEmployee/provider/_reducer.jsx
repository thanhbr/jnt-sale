import {
  SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES,
  SHIPPING_FILTER_FORM_DUPLICATE_VALUES,
  SHIPPING_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { getDateFromNow } from 'Pages/Report/Sales/Pages/shippingDifferenceEmployee/utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'

export const shippingActions = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  //  FILTER
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',

  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_EMPLOYEE_UPDATE: 'FILTER_EMPLOYEE_UPDATE',
  FILTER_EMPLOYEE_CATEGORY_UPDATE: 'FILTER_EMPLOYEE_CATEGORY_UPDATE',
  FILTER_EMPLOYEE_KEYWORD_UPDATE: 'FILTER_EMPLOYEE_KEYWORD_UPDATE',
  FILTER_EMPLOYEE_TAB_UPDATE: 'FILTER_EMPLOYEE_TAB_UPDATE',
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE:
    'FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE',
  FILTER_SHIPPING_PARTNER_UPDATE: 'FILTER_SHIPPING_PARTNER_UPDATE',

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
  FILTER_SORTBY_UPDATE: 'FILTER_SORTBY_UPDATE',
  FILTER_VIEW_PAGE_UPDATE: 'FILTER_VIEW_PAGE_UPDATE',
}

const dateTimeDefaultValue = [
  getDateFromNow(-7),
  getDateFromNow(0, { type: 'end' }),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const ShippingDifferenceReducer = (state, action) => {
  switch (action.type) {
    case shippingActions.FOCUS_INPUT:
      return {
        ...state,
        focusInputOnSuccess: action.payload
      }
    case shippingActions.FILTER_DATE_TIME_UPDATE:
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

    case shippingActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
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

    case shippingActions.FILTER_EMPLOYEE_KEYWORD_UPDATE:
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

    case shippingActions.FILTER_EMPLOYEE_UPDATE:
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

    case shippingActions.FILTER_EMPLOYEE_CATEGORY_UPDATE:
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

    case shippingActions.FILTER_EMPLOYEE_TAB_UPDATE:
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

    case shippingActions.FILTER_SEARCH_UPDATE:
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

    case shippingActions.FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE:
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

    case shippingActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            list: action.payload.employee.list,
            listOrigin: action.payload.employee.list,
            type: {
              ...state.filter.employee.type,
              list: action.payload.employee.type.list,
            },
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            list: action.payload.shippingPartner.list,
            listOrigin: action.payload.shippingPartner.list,
          },
        },
      }

    case shippingActions.OTHER_FILTER_APPLY:
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
          ...action.payload?.panels,
        },
      }

    case shippingActions.PANELS_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          ...action.payload?.panels
        },
      }
    case shippingActions.TABLE_AMOUNT_UPDATE:
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

    case shippingActions.TABLE_DISPLAY_DATA_UPDATE:
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
        },
      }

    // FILTER

    case shippingActions.FILTER_SORTBY_UPDATE :
      return {
        ...state,
        filter: {
          ...state.filter,
          sortBy: {
            value: action.payload
          },
        },
      }

    case shippingActions.FILTER_SHIPPING_PARTNER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            value: action.payload?.value || null,
          },
        },
      }

    case shippingActions.FILTER_VIEW_PAGE_UPDATE :
      return {
        ...state,
        view: {
          ...state.view,
          ...action.payload
        }
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

    case shippingActions.TABLE_DISPLAY_DETAIL_UPDATE:
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

    case shippingActions.TABLE_PAGINATION_UPDATE:
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

    case shippingActions.TABLE_SELECTED_LIST_UPDATE:
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
    case shippingActions.TABLE_DISPLAY_LOADING_UPDATE:
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
    case shippingActions.TAG_FILTER_DELETE:
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
                  type: SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: '',
                },
                end: '',
                start: '',
                type: SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: '',
              },
            },
          }
        case SHIPPING_FILTER_TAG_FIELDS[0]:
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...state.filter.dateTime,
                activeValue: {
                  end: dateTimeDefaultValue[1],
                  start: dateTimeDefaultValue[0],
                  type: SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: formatDateTimeDefaultValue,
                },
                end: dateTimeDefaultValue[1],
                start: dateTimeDefaultValue[0],
                type: SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: formatDateTimeDefaultValue,
              },
            },
          }

        case SHIPPING_FILTER_TAG_FIELDS[1]:
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

        case SHIPPING_FILTER_TAG_FIELDS[2]:
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
        case SHIPPING_FILTER_TAG_FIELDS[3]:
          return {
            ...state,
            filter: {
              ...state.filter,
              employee: {
                ...state.filter.employee,
                activeValue: {
                  ...state.filter.employee.activeValue,
                  type: { name: 'team_of_employees', value: '' },
                },
                type: {
                  ...state.filter.employee.type,
                  value: { name: 'team_of_employees', value: '' },
                },
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
