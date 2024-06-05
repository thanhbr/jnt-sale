import {SINGLE_ADDRESS_DEFAULT_TAB} from './_singleConstants'

export const singleActions = {
  DATA_UPDATE: 'DATA_UPDATE',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_LOADING: 'FETCH_LOADING',
  MODAL_CLOSE: 'MODAL_CLOSE',
  MODAL_OPEN: 'MODAL_OPEN',
  ROW_EDIT: 'ROW_EDIT',
  ROW_EDIT_RESET: 'ROW_EDIT_RESET',
  ROW_EDIT_WARNING_EMPTY: 'ROW_EDIT_WARNING_EMPTY',
  TAB_SWITCH: 'TAB_SWITCH',
}

export const singleInitialState = {
  // data display
  failedData: [],
  successData: [],
  edit: null,
  isLoading: false,
  // navigation
  tab: {active: SINGLE_ADDRESS_DEFAULT_TAB},
  // utils
  modal: null,
}

export const singleReducer = (state, action) => {
  switch (action.type) {
    case singleActions.DATA_UPDATE:
      return {
        ...state,
        failedData: action?.payload?.failedData || [],
        successData: action?.payload?.successData || [],
      }

    case singleActions.FETCH_DATA:
      return {
        ...state,
        failedData: action?.payload?.failedData || [],
        successData: action?.payload?.successData || [],
        isLoading: false,
      }

    case singleActions.FETCH_LOADING:
      return {...state, isLoading: true}

    case singleActions.MODAL_CLOSE:
      return {...state, modal: null}

    case singleActions.MODAL_OPEN:
      if (!action?.payload?.id) return {...state}
      return {
        ...state,
        modal: {id: action.payload.id, data: action?.payload?.data || null},
      }

    case singleActions.ROW_EDIT:
      return {
        ...state,
        edit: {...state.edit, id: action?.payload?.id},
      }

    case singleActions.ROW_EDIT_RESET:
      return {...state, edit: null}

    case singleActions.ROW_EDIT_WARNING_EMPTY:
      return {
        ...state,
        edit: {...state.edit, warning: action?.payload?.warning},
      }

    case singleActions.TAB_SWITCH:
      return {
        ...state,
        tab: {
          ...state.tab,
          active: action?.payload?.tab || SINGLE_ADDRESS_DEFAULT_TAB,
        },
      }

    default:
      throw new Error()
  }
}
