const GrCustomerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIST_GROUP_CUSTOMER':
      return {
        ...state,
        listGrCustomer: action.payload,
      }
    case 'SET_META':
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: {...state.filter, ...action.payload},
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
    case 'SET_SUCCESS_MESSAGE':
        return {
          ...state,
          successMessage: action.payload,
        }
    case 'SET_CHECKED':
      return {
        ...state,
        isChecked: action.payload,
      }
    case 'SET_ALL_CHECKED':
        return {
          ...state,
          isChecked: action.payload,
        }
    case 'SET_CREATED':
      return {
        ...state,
        isCreated: action.payload,
      }

    default:
      return state
  }
};

export default GrCustomerReducer;
