export const actions = {
  FETCH_LOADING: 'FETCH_LOADING',
  FETCH_ORIGIN: 'FETCH_ORIGIN',
  FETCH_PAGE: 'FETCH_PAGE',
  MODAL_CLOSE: 'MODAL_CLOSE',
  MODAL_OPEN: 'MODAL_OPEN',
}

export const initialState = {
  // data display
  dataDisplay: [],
  isLoading: false,
  isOriginFetch: true,
  // navigation
  pagination: null,
  // utils
  modal: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_ORIGIN:
      return {
        ...state,
        dataDisplay: Array.isArray(action?.payload?.data)
          ? action.payload.data
          : [],
        isLoading: false,
        isOriginFetch: false,
        pagination: {
          active: 0,
          total: action?.payload?.meta?.total,
          totalItems: action?.payload?.meta?.totalItems,
        },
      }

    case actions.FETCH_LOADING:
      return {...state, isLoading: true}

    case actions.FETCH_PAGE:
      return {
        ...state,
        dataDisplay: Array.isArray(action?.payload?.data)
          ? action.payload.data
          : [],
        isLoading: false,
        pagination: {
          active: action?.payload?.meta?.active,
          amount: action?.payload?.meta?.amount,
          total: action?.payload?.meta?.total,
          totalItems: action?.payload?.meta?.totalItems,
        },
      }

    case actions.MODAL_CLOSE:
      return {...state, modal: null}

    case actions.MODAL_OPEN:
      if (!action?.payload?.id) return {...state}
      return {
        ...state,
        modal: {id: action.payload.id, data: action?.payload?.data || null},
      }

    default:
      throw new Error()
  }
}
