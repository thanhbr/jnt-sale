import {formatDatetime} from 'common/form/datePicker/_functions'
import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import {getDateFromNow} from '../utils/date'

export const importExportActions = {
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
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  FILTER_ADVANCED_CATEGORY_UPDATE: 'FILTER_ADVANCED_CATEGORY_UPDATE',
  PANELS_UPDATE:'PANELS_UPDATE',
  FILTER_DELETE_UPDATE:'FILTER_DELETE_UPDATE',


  //PRODUCT GROUP
  FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC: 'FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC',
  FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC: 'FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC',
  FORM_CREATE_UPDATE_LIST_CHILDREN_TWO: 'FORM_CREATE_UPDATE_LIST_CHILDREN_TWO',
  FORM_CREATE_SEARCH_LIST_ORIGIN: 'FORM_CREATE_SEARCH_LIST_ORIGIN',
  FORM_CREATE_ADD_LIST_ORIGIN:'FORM_CREATE_ADD_LIST_ORIGIN',
  // NOTIFICATIONS
  NOTIFICATIONS_LIST_UPDATE: 'NOTIFICATIONS_LIST_UPDATE',
  // TABLE
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_DISPLAY_DETAIL_ID_UPDATE: 'TABLE_DISPLAY_DETAIL_ID_UPDATE',
  TABLE_DISPLAY_LOADING_UPDATE: 'TABLE_DISPLAY_LOADING_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE',



  //VALIDATE
  VALIDATE_FORM_CREATE_GROUP_PRODUCT: 'VALIDATE_FORM_CREATE_GROUP_PRODUCT',
}

export const dateTimeDefaultValue = [
  getDateFromNow(-30, {type: 'start'}),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const importExportInitialState = {
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
    category_id: {
      id: null,
      name: '',
      active: null,
    },
    groupProduct: {
      id: '',
      value: '',
      list: [],
      listOrigin: [],
      listChildTwo: [],
      search: {
        keyword: '',
        list: [],
      },
    },
    validate: {
      group: {
        status: false,
        message: '',
      },
    },
  },
  table: {
    display: {
      list: [],
      loading: true,
    },
    panels: {
    },
    pagination: {
      totalItems: 0,
    },
   canLoadMore:false
  },
}

export const importExportReducer = (state, action) => {
  switch (action.type) {

    case importExportActions.FILTER_DATE_TIME_UPDATE:
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

    case importExportActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
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

    case importExportActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
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

    case importExportActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            list: action.payload.warehouse.list,
            listOrigin: action.payload.warehouse.list,
          },
        },
      }
    case importExportActions.PANELS_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          ...action.payload?.panels
        },
      }
    case importExportActions.FILTER_SEARCH_UPDATE:
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

    case importExportActions.FILTER_WAREHOUSE_KEYWORD_UPDATE:
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

    case importExportActions.FILTER_WAREHOUSE_UPDATE:
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

    case importExportActions.OTHER_FILTER_APPLY:
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
          category_id:{
            ...state.filter.category_id,
            active:state.filter.category_id?.name || null ,
          },
          groupProduct:{
            ...state.filter?.groupProduct,
            id: state.filter.category_id?.id
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
            totalItems: action.payload?.pagination?.totalItems,
          },
        },
      }
      case importExportActions.FILTER_DELETE_UPDATE:
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
            totalItems: action.payload?.pagination?.totalItems,
          },
        },
      }

    case importExportActions.TABLE_DISPLAY_DATA_UPDATE:
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
    case importExportActions.TABLE_DISPLAY_LOADING_UPDATE:
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
    case importExportActions.TABLE_PAGINATION_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          pagination: {
            ...state.table.pagination,
            totalItems: action.payload?.totalItems || 0,
          },
        },
      }

    case importExportActions.TAG_FILTER_DELETE:
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
              category_id: {
                ...state.filter.category_id,
                id: null,
                name: null,
                active: null,
              },
              groupProduct: {
                ...state.filter.groupProduct,
                value: '',
                id:'',
              }
            },
          }
        default:
          return {...state}
      }
  //PRODUCT GROUP
    case importExportActions.FORM_CREATE_UPDATE_LIST_CHILDREN_TWO:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter.groupProduct,
            listChildTwo: action?.payload,
          }
        }
      }
    case importExportActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter.groupProduct,
            value: action?.payload,
          }
        }
      }
    case importExportActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter.groupProduct,
            id: action?.payload,
          }
        }
      }
    case importExportActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT:
      return {
        ...state,
        filter: {
          ...state.filter,
          validate: {
            ...state.filter.validate,
            group: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case importExportActions.FILTER_ADVANCED_CATEGORY_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          category_id: {
            ...state.filter.category_id,
            id: action?.payload?.id || null,
            active: action?.payload?.active || null,
            name: action?.payload?.name || '',
          },
        },
      }
    case importExportActions.FORM_CREATE_ADD_LIST_ORIGIN:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter.groupProduct,
            list: action?.payload?.list,
            listOrigin: action?.payload?.listOrigin,
          }
        }
      }
    case importExportActions.FORM_CREATE_SEARCH_LIST_ORIGIN:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupProduct: {
            ...state.filter.groupProduct,
            search: {
              keyword: action?.payload?.keyword,
              list: action?.payload?.list,
            },
          }
        }
      }
    default:
      throw new Error()
  }
}
