export const actionTypes = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  SET_OVERVIEW: 'SET_OVERVIEW',
  UPDATE_ORDER: 'UPDATE_ORDER',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  UPDATE_STATISTIC_TAB: 'UPDATE_STATISTIC_TAB',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_LOADING_STATISTIC: 'UPDATE_LOADING_STATISTIC',
  FILTER_DATE_TIME_TYPE_UPDATE: 'FILTER_DATE_TIME_TYPE_UPDATE',
  FILTER_DATE_TIME_VALUE_UPDATE: 'FILTER_DATE_TIME_VALUE_UPDATE',
  //  FILTER
}
export const SaleOverviewReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_APPLY_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          isApplyFilter: action.payload
        }
      }
    case actionTypes.FILTER_DATE_TIME_TYPE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            type: action.payload?.type,
            option: action.payload?.option,
          },
        },
      }
    case actionTypes.FILTER_DATE_TIME_VALUE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            ...action.payload
          },
        },
      }
    case actionTypes.SET_OVERVIEW:
      return {
        ...state,
        overview: {
          ...state.overview,
          ...action.payload
        }
      }
    case actionTypes.UPDATE_ORDER:
      return {
        ...state,
        orders: {
          list: action.payload?.list,
          origin: action.payload?.origin,
        }
      }
    case actionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees:  action.payload,
      }
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products:  action.payload,
      }
    case actionTypes.UPDATE_LOADING:
      return {
        ...state,
        loading:  action.payload,
      }
    case actionTypes.UPDATE_LOADING_STATISTIC:
      return {
        ...state,
        overview: {
          ...state.overview,
          loading: action.payload,
        }
      }
    case actionTypes.UPDATE_STATISTIC_TAB:
      return {
        ...state,
        statisticTab:  action.payload,
      }
    default:
      throw new Error()
  }
}
