const CustomerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIST_CUSTOMER':
      return {
        ...state,
        listCustomer: action.payload,
      }
    case 'SET_META':
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      }
    case 'CUSTOMER_PURCHASE_UPDATE':
      return {
        ...state,
        customerPurchase: {
          originList: action.payload,
        },
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: {...state.filter, ...action.payload},
      }
    case 'HAS_FILTER':
      return {
        ...state,
        filter: {...state.filter, hasFilter: true},
      }
    case 'CLEAR_HAS_FILTER':
      return {
        ...state,
        filter: {...state.filter, hasFilter: false},
      }
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: action.payload,
      }
    case 'SET_TAG':
      return {
        ...state,
        tag: {...state.tag, ...action.payload},
      }
    case 'SET_TAB_DETAILS':
      return {
        ...state,
        tabDetails: action.payload,
      }
    case 'SET_TAB_DETAILS_LOADING':
      return {
        ...state,
        detailLoading: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      }
    case 'SET_GROUP_CUSTOMER':
      return {
        ...state,
        groupCustomer: action.payload,
      }
    case 'SET_SHOW_TAG':
      return {
        ...state,
        showTag: action.payload,
      }
    case 'SET_SHOW_OTHER_FILTER':
      return {
        ...state,
        showOtherFilter: !state.showOtherFilter,
      }
    case 'CLOSE_OTHER_FILTER':
      return {
        ...state,
        showOtherFilter: false,
      }
    case 'CLEAR_SELECTED':
      return {
        ...state,
        selectedList: []
      }

    case 'CLEAR_SHIPPING_STATUS':
      return {
        ...state,
        shippingStatus: {
          ...state.shippingStatus,
          activeValue: [],
          keyword: '',
          tab: 'all', // all | checked
          value: [],
        },
      }
    case 'FILTER_SHIPPING_STATUS_TAB_UPDATE':
      return {
        ...state,
        shippingStatus: {
          ...state.shippingStatus,
          tab: action.payload.tab,
          list: action.payload.list,
        },
      }
    case 'SET_SELECTED_LIST':
      return {
        ...state,
        selectedList: action.payload,
      }

    case 'FETCH_SHIPPING_STATUS':
      return {
        ...state,
        shippingStatus: {
          ...state.shippingStatus,
          list: action.payload,
          listOrigin: action.payload,
        },
      }

    case 'SHOW_ERROR_LIST':
      return {
        ...state,
        errors: {
          ...state.errors,
          isError: false,
        },
      }

    case 'SET_IMPORT_ERROR_DATA':
      return {
        ...state,
        errors: {
          ...state.errors,
          details: action.payload.errorDetails,
          submitData: action.payload.submitData,
          type: 'import',
          isError: true,
        },
      }

    case 'FILTER_SHIPPING_STATUS_KEYWORD_UPDATE':
      return {
        ...state,
        shippingStatus: {
          ...state.shippingStatus,
          keyword: action.payload.keyword,
          list: action.payload.list,
        },
      }

    case 'FILTER_SHIPPING_STATUS_UPDATE':
      return {
        ...state,
        shippingStatus: {
          ...state.shippingStatus,
          list: action?.payload?.list,
          value: action.payload?.value || [],
        },
      }

    case 'FILTER_SHIPPING_STATUS_CLEAR_VALUE':
      return {
        ...state,
        shippingStatus: {
          ...state.shippingStatus,
          value: [],
        },
      }

    case 'SET_INFO_USER':
      return {
        ...state,
        infoUser: action.payload,
      }

    case 'SET_GROUP_CITY':
      return {
        ...state,
        groupCity: action.payload,
      }

    default:
      return state
  }
}

export default CustomerReducer
