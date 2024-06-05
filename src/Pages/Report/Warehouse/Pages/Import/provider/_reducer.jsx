import {formatDatetime} from 'common/form/datePicker/_functions'
import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import {getDateFromNow} from '../utils/date'
import { actionTypes } from '../../../../../purchases/provider/_reducer'

export const importActions = {
  //  FILTER
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_DATE_TIME_TRIGGER_UPDATE: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_WAREHOUSE_KEYWORD_UPDATE: 'FILTER_WAREHOUSE_KEYWORD_UPDATE',
  FILTER_WAREHOUSE_UPDATE: 'FILTER_WAREHOUSE_UPDATE',
  FILTER_SUPPLIER_KEYWORD_UPDATE: 'FILTER_SUPPLIER_KEYWORD_UPDATE',
  FILTER_SUPPLIER_UPDATE: 'FILTER_SUPPLIER_UPDATE',
  OTHER_FILTER_APPLY: 'OTHER_FILTER_APPLY',
  DELETE_APPLY: 'DELETE_APPLY',
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  // NOTIFICATIONS
  NOTIFICATIONS_LIST_UPDATE: 'NOTIFICATIONS_LIST_UPDATE',
  // PANELS
  PANELS_UPDATE: 'PANELS_UPDATE',
  // TABLE
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_DISPLAY_DETAIL_ID_UPDATE: 'TABLE_DISPLAY_DETAIL_ID_UPDATE',
  TABLE_DISPLAY_LOADING_UPDATE: 'TABLE_DISPLAY_LOADING_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE',
}

export const dateTimeDefaultValue = [
  getDateFromNow(-7, {type: 'start'}),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const importInitialState = {
  filter: {
    search: {
      value: '',
    },
    dateTime: {
      activeValue: {
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
        value: formatDateTimeDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
      trigger: true,
      value: formatDateTimeDefaultValue,
    },
    warehouse: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    supplier: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
  },
  notifications: {
    list: [],
  },
  panels: {
    importTotal: 0,
    importValueTotal: 0,
    paymentTotal: 0,
    debtsTotal: 0,
    totals: 0,
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
    pagination: {
      active: 0,
      amount: 20,
      total: 0,
      totalItems: 0,
    },
    selected: {
      list: [],
    },
  },
  loading: false
}

export const importReducer = (state, action) => {
  switch (action.type) {

    case importActions.FILTER_DATE_TIME_UPDATE:
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

    case importActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
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

    case importActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
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

    case importActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            list: action.payload.warehouse.list,
            listOrigin: action.payload.warehouse.list,
          },
          supplier: {
            ...state.filter.supplier,
            list: action.payload.supplier.list,
            listOrigin: action.payload.supplier.list,
          },
        },
      }

    case importActions.FILTER_SEARCH_UPDATE:
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

    case importActions.FILTER_WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case importActions.FILTER_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            value: action.payload?.value || null,
          },
        },
      }


    case actionTypes.FILTER_SUPPLIER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          supplier: {
            ...state.filter.supplier,
            keyword: action.payload?.value?.name || '',
            value: action.payload?.value || null,
          },
        },
      }
    case actionTypes.FILTER_SUPPLIER_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          supplier: {
            ...state.filter.supplier,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case importActions.NOTIFICATIONS_LIST_UPDATE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: action.payload?.notifications?.list || [],
        },
      }

    case importActions.OTHER_FILTER_APPLY:
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
          warehouse: {
            ...state.filter.warehouse,
            activeValue: state.filter.warehouse.value,
          },
          supplier: {
            ...state.filter.supplier,
            activeValue: state.filter.supplier.value,
          },
        },
        panels: {
          ...state.panels,
          importTotal: action.payload?.panels?.importTotal,
          importValueTotal: action.payload?.panels?.importValueTotal,
          paymentTotal: action.payload?.panels?.paymentTotal,
          debtsTotal: action.payload?.panels?.debtsTotal,
          totals: action.payload?.panels?.totals,
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

    case importActions.DELETE_APPLY:
      return {
        ...state,
        panels: {
          ...state.panels,
          importTotal: action.payload?.panels?.importTotal,
          importValueTotal: action.payload?.panels?.importValueTotal,
          paymentTotal: action.payload?.panels?.paymentTotal,
          debtsTotal: action.payload?.panels?.debtsTotal,
          totals: action.payload?.panels?.totals,
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

    case importActions.PANELS_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          importTotal: action.payload?.panels?.importTotal,
          importValueTotal: action.payload?.panels?.importValueTotal,
          paymentTotal: action.payload?.panels?.paymentTotal,
          debtsTotal: action.payload?.panels?.debtsTotal,
          totals: action.payload?.panels?.totals,
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

    case importActions.TABLE_AMOUNT_UPDATE:
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

    case importActions.TABLE_DISPLAY_DATA_UPDATE:
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

    case importActions.TABLE_DISPLAY_DETAIL_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            active: action.payload?.active || null,
            list: action.payload?.list || [],
          },
        },
      }

    case importActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            id: action.payload?.id || null,
          },
        },
      }

    case importActions.TABLE_DISPLAY_LOADING_UPDATE:
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

    case importActions.TABLE_PAGINATION_UPDATE:
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

    case importActions.TABLE_SELECTED_LIST_UPDATE:
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

    case importActions.TAG_FILTER_DELETE:
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
                  type: '',
                  value: '',
                },
                end: '',
                start: '',
                type: '',
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
                  end: action.payload?.isSingle ? '' : dateTimeDefaultValue[1],
                  start: action.payload?.isSingle
                    ? ''
                    : dateTimeDefaultValue[0],
                  type: action.payload?.isSingle
                    ? ''
                    : ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: action.payload?.isSingle
                    ? ''
                    : formatDateTimeDefaultValue,
                },
                end: action.payload?.isSingle ? '' : dateTimeDefaultValue[1],
                start: action.payload?.isSingle ? '' : dateTimeDefaultValue[0],
                type: action.payload?.isSingle
                  ? ''
                  : ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: action.payload?.isSingle
                  ? ''
                  : formatDateTimeDefaultValue,
              },
            },
          }

        case ORDER_FILTER_TAG_FIELDS[1]:
          return {
            ...state,
            filter: {
              ...state.filter,
              warehouse: {
                ...state.filter.warehouse,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[2]:
          return {
            ...state,
            filter: {
              ...state.filter,
              supplier: {
                ...state.filter.supplier,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        default:
          return {...state}
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
