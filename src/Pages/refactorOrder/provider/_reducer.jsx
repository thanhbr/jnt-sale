import {formatDatetime} from 'common/form/datePicker/_functions'
import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FORM_DUPLICATE_VALUES,
  ORDER_FILTER_TAG_FIELDS,
  ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST,
} from '../interfaces/_constants'
import {getDateFromNow} from '../utils/date'

export const orderActions = {
  //  FILTER
  FILTER_ADVANCED_SEARCH_UPDATE: 'FILTER_ADVANCED_SEARCH_UPDATE',
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_DATE_TIME_TRIGGER_UPDATE: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
  FILTER_DUPLICATE_UPDATE: 'FILTER_DUPLICATE_UPDATE',
  FILTER_EMPLOYEE_UPDATE: 'FILTER_EMPLOYEE_UPDATE',
  FILTER_EMPLOYEE_CATEGORY_UPDATE: 'FILTER_EMPLOYEE_CATEGORY_UPDATE',
  FILTER_EMPLOYEE_KEYWORD_UPDATE: 'FILTER_EMPLOYEE_KEYWORD_UPDATE',
  FILTER_EMPLOYEE_TAB_UPDATE: 'FILTER_EMPLOYEE_TAB_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_PAYMENT_UPDATE: 'FILTER_PAYMENT_UPDATE',
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
  FILTER_SOURCE_KEYWORD_UPDATE: 'FILTER_SOURCE_KEYWORD_UPDATE',
  FILTER_SOURCE_UPDATE: 'FILTER_SOURCE_UPDATE',
  FILTER_WAREHOUSE_KEYWORD_UPDATE: 'FILTER_WAREHOUSE_KEYWORD_UPDATE',
  FILTER_WAREHOUSE_UPDATE: 'FILTER_WAREHOUSE_UPDATE',
  OTHER_FILTER_APPLY: 'OTHER_FILTER_APPLY',
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  // NOTIFICATIONS
  NOTIFICATIONS_LIST_UPDATE: 'NOTIFICATIONS_LIST_UPDATE',
  // PANELS
  PANELS_UPDATE: 'PANELS_UPDATE',
  PRINT_DETAIL_UPDATE: 'PRINT_DETAIL_UPDATE',
  // PAYMENT METHOD
  PAYMENT_METHOD_UPDATE: 'PAYMENT_METHOD_UPDATE',
  // TABLE
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_DISPLAY_DETAIL_ID_UPDATE: 'TABLE_DISPLAY_DETAIL_ID_UPDATE',
  TABLE_DISPLAY_LOADING_UPDATE: 'TABLE_DISPLAY_LOADING_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE',
  TABLE_AMOUNT_UPDATE: 'TABLE_AMOUNT_UPDATE'
}

export const dateTimeDefaultValue = [
  getDateFromNow(-7, {type: 'start'}),
  getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

export const orderInitialState = {
  filter: {
    advancedSearch: {
      customer: {
        keyword: '',
        value: '',
      },
      liveVideoId: '',
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
    duplicate: {
      activeValue: ORDER_FILTER_FORM_DUPLICATE_VALUES[0],
      list: ORDER_FILTER_FORM_DUPLICATE_VALUES,
      value: ORDER_FILTER_FORM_DUPLICATE_VALUES[0],
    },
    employee: {
      activeValue: {
        type: {name: 'Nhóm nhân viên', value: ''},
        value: [],
      },
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      type: {
        list: [],
        value: {name: 'Nhóm nhân viên', value: ''},
      },
      value: [],
    },
    payment: {
      value: ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.map(item => item?.value),
    },
    product: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      loading: false,
      tab: 'all', // all | checked
      value: [],
    },
    search: {
      value: '',
    },
    shippingPartner: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    shippingStatus: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
    },
    source: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    warehouse: {
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
    codTotal: 0,
    orderTotal: 0,
    orderValueTotal: 0,
    shippingFeeTotal: 0,
  },
  paymentMethod: {
    keyword: '',
    list: [],
    listOrigin: [],
    page: 0,
    total: 0,
    value: null,
    validate: ''
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
  loading: false,
  printDetail: {},
}

export const orderReducer = (state, action) => {
  switch (action.type) {

    // ======================================================================================
    // START PAYMENT METHODS
    // ======================================================================================

    case 'PAYMENT_METHOD_UPDATE':
      return {
        ...state,
        paymentMethod: {
          ...state.paymentMethod,
          ...action.payload
        },
      }

    case 'PAYMENT_METHOD_VALIDATE':
      return {
        ...state,
        paymentMethod: {
          ...state.paymentMethod,
          validate: action.payload
        },
      }

    // ======================================================================================
    // END PAYMENT METHODS
    // ======================================================================================

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
            liveVideoId:
              typeof action.payload?.liveVideoId === 'string'
                ? action.payload.liveVideoId
                : state.filter.advancedSearch.liveVideoId,
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
            },
          },
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

    case orderActions.FILTER_DUPLICATE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          duplicate: {
            ...state.filter.duplicate,
            value: action.payload?.value,
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

    case orderActions.FILTER_ORIGIN_DATA_UPDATE:
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
          product: {
            ...state.filter.product,
            list: action.payload.product.list,
            listOrigin: action.payload.product.list,
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            list: action.payload.shippingPartner.list,
            listOrigin: action.payload.shippingPartner.list,
          },
          shippingStatus: {
            ...state.filter.shippingStatus,
            list: action.payload.shippingStatus.list,
            listOrigin: action.payload.shippingStatus.list,
          },
          source: {
            ...state.filter.source,
            list: action.payload.source.list,
            listOrigin: action.payload.source.list,
          },
          warehouse: {
            ...state.filter.warehouse,
            list: action.payload.warehouse.list,
            listOrigin: action.payload.warehouse.list,
          },
        },
      }

    case orderActions.FILTER_PAYMENT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          payment: {
            ...state.filter.payment,
            value: action.payload?.payment?.value || [],
          },
        },
      }

    case orderActions.FILTER_PRODUCT_ENABLE_LOADING:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            loading: true,
          },
        },
      }

    case orderActions.FILTER_PRODUCT_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            keyword: action.payload.keyword,
            list: action.payload.list,
            loading: false,
            tab: action.payload?.tab || state.filter.product.tab,
          },
        },
      }

    case orderActions.FILTER_PRODUCT_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case orderActions.FILTER_PRODUCT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            list: action?.payload?.list,
            value: action.payload?.value || [],
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
            value: action.payload?.value || null,
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
            keyword: '',
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
            list: action?.payload?.list,
            value: action.payload?.value || [],
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

    case orderActions.FILTER_WAREHOUSE_KEYWORD_UPDATE:
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

    case orderActions.FILTER_WAREHOUSE_UPDATE:
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
          duplicate: {
            ...state.filter.duplicate,
            activeValue: state.filter.duplicate.value,
          },
          employee: {
            ...state.filter.employee,
            activeValue: {
              type: state.filter.employee.type.value,
              value: state.filter.employee.value,
            },
          },
          product: {
            ...state.filter.product,
            activeValue: state.filter.product.value,
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            activeValue: state.filter.shippingPartner.value,
          },
          shippingStatus: {
            ...state.filter.shippingStatus,
            activeValue: state.filter.shippingStatus.value,
          },
          source: {
            ...state.filter.source,
            activeValue: state.filter.source.value,
          },
          warehouse: {
            ...state.filter.warehouse,
            activeValue: state.filter.warehouse.value,
          },
        },
        panels: {
          ...state.panels,
          codTotal: action.payload?.panels?.codTotal,
          orderTotal: action.payload?.panels?.orderTotal,
          orderValueTotal: action.payload?.panels?.orderValueTotal,
          shippingFeeTotal: action.payload?.panels?.shippingFeeTotal,
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

    case orderActions.PANELS_UPDATE:
      return {
        ...state,
        panels: {
          ...state.panels,
          codTotal: action.payload?.panels?.codTotal,
          orderTotal: action.payload?.panels?.orderTotal,
          orderValueTotal: action.payload?.panels?.orderValueTotal,
          shippingFeeTotal: action.payload?.panels?.shippingFeeTotal,
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

    case orderActions.PRINT_DETAIL_UPDATE:
      return {
        ...state,
        printDetail: action.payload
      }
    case orderActions.PAYMENT_METHOD_UPDATE:
      return {
        ...state,
        printDetail: action.payload
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
            list: action.payload?.list || [],
          },
        },
      }

    case orderActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
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
        case ORDER_FILTER_TAG_FIELDS[8]:
          return {
            ...state,
            filter: {
              ...state.filter,
              employee: {
                ...state.filter.employee,
                activeValue: {
                  ...state.filter.employee.activeValue,
                  type: {name: 'Nhóm nhân viên', value: ''},
                },
                type: {
                  ...state.filter.employee.type,
                  value: {name: 'Nhóm nhân viên', value: ''},
                },
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[2]:
          return {
            ...state,
            filter: {
              ...state.filter,
              shippingStatus: {
                ...state.filter.shippingStatus,
                activeValue: [],
                keyword: '',
                tab: 'all', // all | checked
                value: [],
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
              product: {
                ...state.filter.product,
                activeValue: [],
                keyword: '',
                loading: false,
                tab: 'all', // all | checked
                value: [],
              },
            },
          }
        case ORDER_FILTER_TAG_FIELDS[5]:
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
        case ORDER_FILTER_TAG_FIELDS[6]:
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
        case ORDER_FILTER_TAG_FIELDS[7]:
          return {
            ...state,
            filter: {
              ...state.filter,
              duplicate: {
                ...state.filter.duplicate,
                activeValue: ORDER_FILTER_FORM_DUPLICATE_VALUES[0],
                value: ORDER_FILTER_FORM_DUPLICATE_VALUES[0],
              },
            },
          }
        default:
          return {...state}
      }

    default:
      throw new Error()
  }
}
