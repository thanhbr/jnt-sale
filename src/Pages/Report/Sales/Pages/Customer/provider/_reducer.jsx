import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_DUPLICATE_VALUES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { getDateFromNow } from 'Pages/Report/Sales/Pages/Customer/utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'

export const orderActions = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  //  FILTER
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_LOCATION_KEYWORD_UPDATE: 'FILTER_LOCATION_KEYWORD_UPDATE',
  FILTER_LOCATION_UPDATE: 'FILTER_LOCATION_UPDATE',
  FILTER_LOCATION_HYPER_LINK_UPDATE: 'FILTER_LOCATION_HYPER_LINK_UPDATE',
  FILTER_LOCATION_TAB_UPDATE: 'FILTER_LOCATION_TAB_UPDATE',
  FILTER_LOCATION_CATEGORY_UPDATE: 'FILTER_LOCATION_CATEGORY_UPDATE',
  FILTER_UPDATE_TOP: 'FILTER_UPDATE_TOP',
  FILTER_SORTBY_UPDATE: 'FILTER_SORTBY_UPDATE',
  FILTER_SORT_TYPE_UPDATE: 'FILTER_SORT_TYPE_UPDATE',
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

export const CustomerReducer = (state, action) => {
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
              end: '',
              start: '',
              type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
              value: '',
            },
            end: '',
            start: '',
            type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
            value: '',
            trigger: null
          },
        },
      }


    case orderActions.FILTER_LOCATION_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          location: {
            ...state.filter.location,
            keyword: action.payload.keyword,
            list: action.payload.list,
            type: {
              ...state.filter.location.type,
              value: action.payload.type?.value,
            },
          },
        },
      }

    case orderActions.FILTER_LOCATION_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          location: {
            ...state.filter.location,
            list: action.payload.list,
            value: action.payload.value,
          },
        },
      }


    case orderActions.FILTER_LOCATION_HYPER_LINK_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          location: {
            ...state.filter.location,
            list: action.payload.list?.list,
            value: action.payload.value,
            activeValue: {
              type: state.filter.location.type.value,
              value: action.payload.value,
            },
          },
        },
      }

    case orderActions.FILTER_LOCATION_CATEGORY_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          location: {
            ...state.filter.location,
            keyword: '',
            list: action.payload?.list,
            tab: 'all',
            type: {
              ...state.filter.location.type,
              value: action.payload?.type?.value,
            },
            value: [],
          },
        },
      }

    case orderActions.FILTER_LOCATION_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          location: {
            ...state.filter.location,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case orderActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          location: {
            ...state.filter.location,
            list: action.payload.location.list,
            listOrigin: action.payload.location.list,
          },
        },
      }

    case orderActions.FILTER_UPDATE_TOP:
      return {
        ...state,
        filter: {
          ...state.filter,
          top: action.payload,
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
          location: {
            ...state.filter.location,
            activeValue: {
              type: state.filter.location.type.value,
              value: state.filter.location.value,
            },
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

    case orderActions.FILTER_SORT_TYPE_UPDATE :
      return {
        ...state,
        filter: {
          ...state.filter,
          sortType: {
            value: action.payload
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
              location: {
                ...state.filter.location,
                activeValue: {
                  ...state.filter.location.activeValue,
                  value: [],
                },
                keyword: '',
                value: [],
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
