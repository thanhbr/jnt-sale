
export const giveBackProductActions = {
  // CREATE
  UPDATE_ORDER_RETURN_DETAIL: 'UPDATE_ORDER_RETURN_DETAIL',
  UPDATE_LIST_PAYMENT_METHOD: 'UPDATE_LIST_PAYMENT_METHOD',
  CHANGE_CREATE_NOTE: 'CHANGE_CREATE_NOTE',
  CHANGE_CREATE_CHECK_ALL_PRODUCT: 'CHANGE_CREATE_CHECK_ALL_PRODUCT',
  CHANGE_CREATE_CHECK_REFUND_RECEIVED: 'CHANGE_CREATE_CHECK_REFUND_RECEIVED',
  CHANGE_CREATE_UPDATE_PAYMENT_TIME: 'CHANGE_CREATE_UPDATE_PAYMENT_TIME',
  CHANGE_CREATE_UPDATE_PAYMENT_METHOD: 'CHANGE_CREATE_UPDATE_PAYMENT_METHOD',
  CHANGE_CREATE_UPDATE_STATUS_REFUND: 'CHANGE_CREATE_UPDATE_STATUS_REFUND',
  CHANGE_CREATE_UPDATE_PAYMENT_MONEY: 'CHANGE_CREATE_UPDATE_PAYMENT_MONEY',
  CHANGE_CREATE_UPDATE_PRODUCT_NAME: 'CHANGE_CREATE_UPDATE_PRODUCT_NAME',

  SET_EXPORTING_HEADER: 'SET_EXPORTING_HEADER',

  //FILTER
  SET_SEARCH_TABLE: 'SET_SEARCH_TABLE',
  FILTER_GIVEBACK_PRODUCT_WAREHOUSE: 'FILTER_GIVEBACK_PRODUCT_WAREHOUSE',
  FILTER_GIVEBACK_PRODUCT_WAREHOUSE_VALUE: 'FILTER_GIVEBACK_PRODUCT_WAREHOUSE_VALUE',
  FILTER_GIVEBACK_PRODUCT_REFUND_STATUS_VALUE: 'FILTER_GIVEBACK_PRODUCT_REFUND_STATUS_VALUE',
  FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME: 'FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME',
  FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_ACTIVE: 'FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_ACTIVE',
  FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_ACTIVE: 'FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_ACTIVE',
  FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_ACTIVE: 'FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_ACTIVE',
  FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_VALUE: 'FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_VALUE',
  FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_VALUE: 'FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_VALUE',
  FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_VALUE: 'FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_VALUE',
  FILTER_GIVEBACK_PRODUCT_PAYMENT_STATUS: 'FILTER_GIVEBACK_PRODUCT_PAYMENT_STATUS',
  SET_CHECK_LIST_GIVEBACK_PRODUCT: 'SET_CHECK_LIST_GIVEBACK_PRODUCT',

  // TABLE
  LOADING_TABLE: 'LOADING_TABLE',
  SET_PER_PAGE: 'SET_PER_PAGE',
  SET_ACTIVE_VALUE_PAGE: 'SET_ACTIVE_VALUE_PAGE',
  UPDATE_LIST_GIVEBACK_PRODUCT_TABLE: 'UPDATE_LIST_GIVEBACK_PRODUCT_TABLE',
  UPDATE_LIST_GIVEBACK_PRODUCT_TABLE_DEFAULT: 'UPDATE_LIST_GIVEBACK_PRODUCT_TABLE_DEFAULT',
  UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL: 'UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL',
  UPDATE_GIVEBACK_PRODUCT_TABLE_PAGINATION: 'UPDATE_GIVEBACK_PRODUCT_TABLE_PAGINATION',
  UPDATE_GIVEBACK_PRODUCT_TABLE_PANEL: 'UPDATE_GIVEBACK_PRODUCT_TABLE_PANEL',

  // MODAL
  MODAL_UPDATE_LOADING_LIST_ORDER: 'MODAL_UPDATE_LOADING_LIST_ORDER',
  MODAL_UPDATE_LIST_ORDER: 'MODAL_UPDATE_LIST_ORDER',
  MODAL_TOGGLE_ORDER: 'MODAL_TOGGLE_ORDER',
  MODAL_UPDATE_ITEM_ACTIVE: 'MODAL_UPDATE_ITEM_ACTIVE',
  MODAL_CHANGE_KEYWORD_ORDER: 'MODAL_CHANGE_KEYWORD_ORDER',
  MODAL_CHANGE_DATE_TIME_ORDER: 'MODAL_CHANGE_DATE_TIME_ORDER',
  MODAL_CHANGE_DATA_REFUND_PAYMENT: 'MODAL_CHANGE_DATA_REFUND_PAYMENT',
  MODAL_UPDATE_LIST_PAYMENT: 'MODAL_UPDATE_LIST_PAYMENT',
  MODAL_UPDATE_ACTIVE_VALUE_PAYMENT: 'MODAL_UPDATE_ACTIVE_VALUE_PAYMENT',
  MODAL_UPDATE_AMOUNT_PAYMENT: 'MODAL_UPDATE_AMOUNT_PAYMENT',
  MODAL_CHANGE_PAYMENT_METHOD: 'MODAL_CHANGE_PAYMENT_METHOD',
  MODAL_UPDATE_CONFIRM_REFUND_ITEM_ACTIVE: 'MODAL_UPDATE_CONFIRM_REFUND_ITEM_ACTIVE',
}


export const giveBackProductReducer = (state, action) => {

  switch (action.type) {
    case giveBackProductActions.UPDATE_ORDER_RETURN_DETAIL:
      return {
        ...state,
        form: {
          ...state.form,
          orderReturnDetail: action?.payload
        },
      }
    case giveBackProductActions.UPDATE_LIST_PAYMENT_METHOD:
      return {
        ...state,
        form: {
          ...state.form,
          apiListPayment: action?.payload
        },
      }
    case giveBackProductActions.CHANGE_CREATE_NOTE:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            note: action?.payload
          }
        },
      }
    case giveBackProductActions.CHANGE_CREATE_CHECK_ALL_PRODUCT:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            checkAllProduct: action?.payload
          }
        },
      }
    case giveBackProductActions.CHANGE_CREATE_CHECK_REFUND_RECEIVED:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            checkRefundReceived: action?.payload
          }
        },
      }
    case giveBackProductActions.CHANGE_CREATE_UPDATE_PAYMENT_TIME:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            paymentTime: action?.payload
          }
        },
      }
    case giveBackProductActions.CHANGE_CREATE_UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            payment_method: action?.payload
          }
        },
      }
    case giveBackProductActions.CHANGE_CREATE_UPDATE_STATUS_REFUND:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            is_refund: action?.payload
          }
        },
      }
    case giveBackProductActions.CHANGE_CREATE_UPDATE_PAYMENT_MONEY:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            payment_money: action?.payload
          }
        },
      }
    case giveBackProductActions.CHANGE_CREATE_UPDATE_PRODUCT_NAME:
      return {
        ...state,
        form: {
          ...state?.form,
          orderReturnDetail: {
            ...state?.form?.orderReturnDetail,
            details: action?.payload
          }
        },
      }
    case giveBackProductActions.LOADING_TABLE:
      return {
        ...state,
        table: {
          ...state?.table,
          display: {
            ...state?.table?.display,
            loading: action?.payload
          }
        },
      }
    case giveBackProductActions.SET_PER_PAGE:
      return {
        ...state,
        table: {
          ...state?.table,
          pagination: {
            ...state?.table?.pagination,
            amount: action?.payload
          }
        },
      }
    case giveBackProductActions.SET_ACTIVE_VALUE_PAGE:
      return {
        ...state,
        table: {
          ...state?.table,
          pagination: {
            ...state?.table?.pagination,
            active: action?.payload
          }
        },
      }
    case giveBackProductActions.UPDATE_LIST_GIVEBACK_PRODUCT_TABLE:
      return {
        ...state,
        table: {
          ...state?.table,
          display: {
            ...state?.table?.display,
            list: action?.payload
          }
        },
      }
    case giveBackProductActions.UPDATE_LIST_GIVEBACK_PRODUCT_TABLE_DEFAULT:
      return {
        ...state,
        table: {
          ...state?.table,
          display: {
            ...state?.table?.display,
            listDefault: action?.payload
          }
        },
      }
    case giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL:
      return {
        ...state,
        table: {
          ...state?.table,
          detail: {
            ...state?.table?.detail,
            active: action.payload?.active || null,
            list: action.payload?.list || [],
          }
        },
      }

    case giveBackProductActions.UPDATE_ID_GIVEBACK_PRODUCT_TABLE_DETAIL:
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
    case giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PAGINATION:
      return {
        ...state,
        table: {
          ...state.table,
          pagination: {
            ...state.table.pagination,
            active: action.payload?.active || 0,
            amount: action.payload?.amount || 20,
            total: action.payload?.total || 0,
            totalItems: action.payload?.totalItems || 0,
          },
        },
      }
    case giveBackProductActions.SET_SEARCH_TABLE:
      return {
        ...state,
        filter: {
          ...state.filter,
          search: {
            ...state.filter.search,
            value: action.payload || '',
          },
        },
      }
    case giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PANEL:
      return {
        ...state,
        table: {
          ...state.table,
          panels: {
            ...state.table.panels,
            totalOrder: action.payload?.totalOrder || 0,
            totalValueGoods: action.payload?.totalValueGoods || 0,
            amountRefunded: action.payload?.amountRefunded || 0,
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_WAREHOUSE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            list: action.payload?.list || [],
            listOrigin: action.payload?.listOrigin || [],
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_WAREHOUSE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            value: action.payload|| '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_REFUND_STATUS_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          receivingState: {
            ...state.filter.receivingState,
            value: action.payload|| '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            value: action?.payload?.value || '',
            start: action?.payload?.start || '',
            end: action?.payload?.end || '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_ACTIVE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: action?.payload || '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_ACTIVE:
      return {
        ...state,
        filter: {
          ...state?.filter,
          warehouse: {
            ...state?.filter?.warehouse,
            activeValue: action?.payload || '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_ACTIVE:
      return {
        ...state,
        filter: {
          ...state?.filter,
          receivingState: {
            ...state?.filter?.receivingState,
            activeValue: action?.payload || '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            value: action?.payload || '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_VALUE:
      return {
        ...state,
        filter: {
          ...state?.filter,
          warehouse: {
            ...state?.filter?.warehouse,
            value: action?.payload || '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_VALUE:
      return {
        ...state,
        filter: {
          ...state?.filter,
          receivingState: {
            ...state?.filter?.receivingState,
            value: action?.payload || '',
          },
        },
      }
    case giveBackProductActions.FILTER_GIVEBACK_PRODUCT_PAYMENT_STATUS:
      return {
        ...state,
        filter: {
          ...state?.filter,
          payment: {
            ...state?.filter?.payment,
            value: action?.payload || '',
          },
        },
      }
    case giveBackProductActions.SET_CHECK_LIST_GIVEBACK_PRODUCT:
      return {
        ...state,
        filter: {
          ...state?.filter,
          checkedList: action?.payload || '',
        },
      }

    //  MODAL
    case giveBackProductActions.MODAL_UPDATE_LIST_ORDER:
      return {
        ...state,
        modal: {
          ...state?.modal,
          order: {
            ...state?.modal?.order,
            list: action?.payload?.list || [],
            listOrigin: action?.payload?.listOrigin || [],
          },
        },
      }
    case giveBackProductActions.MODAL_TOGGLE_ORDER:
      return {
        ...state,
        modal: {
          ...state?.modal,
          order: {
            ...state?.modal?.order,
            open: action?.payload,
          },
        },
      }
    case giveBackProductActions.MODAL_UPDATE_ITEM_ACTIVE:
      return {
        ...state,
        modal: {
          ...state?.modal,
          order: {
            ...state?.modal?.order,
            value: action?.payload,
          },
        },
      }
    case giveBackProductActions.MODAL_UPDATE_LOADING_LIST_ORDER:
      return {
        ...state,
        modal: {
          ...state?.modal,
          order: {
            ...state?.modal?.order,
            loading: action?.payload,
          },
        },
      }
    case giveBackProductActions.MODAL_CHANGE_KEYWORD_ORDER:
      return {
        ...state,
        modal: {
          ...state?.modal,
          order: {
            ...state?.modal?.order,
            keyword: action?.payload,
          }
        },
      }

    case giveBackProductActions.MODAL_CHANGE_DATE_TIME_ORDER:
      return {
        ...state,
        modal: {
          ...state?.modal,
          order: {
            ...state?.modal?.order,
            dateTime: {
              ...state?.modal?.order?.dateTime,
              value: action?.payload?.value || '',
              start: action?.payload?.start || '',
              end: action?.payload?.end || '',
            },

          }
        },
      }
    case giveBackProductActions.MODAL_CHANGE_DATA_REFUND_PAYMENT:
      return {
        ...state,
        modal: {
          ...state?.modal,
          refundPayment: {
            ...state?.modal?.refundPayment,
            open: action?.payload?.open,
            data: action?.payload?.data,
          },
        },
      }
    case giveBackProductActions.MODAL_UPDATE_LIST_PAYMENT:
      return {
        ...state,
        modal: {
          ...state?.modal,
          refundPayment: {
            ...state?.modal?.refundPayment,
            payment: {
              ...state?.modal?.refundPayment?.payment,
              list: action?.payload,
            }
          },
        },
      }
    case giveBackProductActions.MODAL_UPDATE_ACTIVE_VALUE_PAYMENT:
      return {
        ...state,
        modal: {
          ...state?.modal,
          refundPayment: {
            ...state?.modal?.refundPayment,
            payment: {
              ...state?.modal?.refundPayment?.payment,
              activeValue: action?.payload,
            }
          },
        },
      }
    case giveBackProductActions.MODAL_UPDATE_AMOUNT_PAYMENT:
      return {
        ...state,
        modal: {
          ...state?.modal,
          refundPayment: {
            ...state?.modal?.refundPayment,
            payment: {
              ...state?.modal?.refundPayment?.payment,
              amount: action?.payload,
            }
          },
        },
      }
    case giveBackProductActions.MODAL_UPDATE_CONFIRM_REFUND_ITEM_ACTIVE:
      return {
        ...state,
        modal: {
          ...state?.modal,
          confirmRefund: {
            ...state?.modal?.confirmRefund,
            open: action?.payload?.open,
            data: action?.payload?.data,
          },
        },
      }
    // Export
    case giveBackProductActions.SET_EXPORTING_HEADER:
      return {
        ...state,
        exports: {
          ...state?.exports,
          exporting: action?.payload
        },
      }
    default:
      break
  }
}