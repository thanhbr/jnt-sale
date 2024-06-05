import {facebookFanpageActions} from './_actions'

export const FacebookFanpageReducer = (state, action) => {
  switch (action.type) {
    case facebookFanpageActions.FANPAGE_LIST_UPDATE:
      return {
        ...state,
        fanpage: {
          ...state.fanpage,
          list: action?.payload?.list,
          maxConnection: action?.payload?.maxConnection,
        },
      }

    case facebookFanpageActions.FANPAGE_SELECTED_UPDATE:
      return {
        ...state,
        fanpage: {
          ...state.fanpage,
          selected: action?.payload?.selected,
        },
      }

    case facebookFanpageActions.FILTER_CONNECTED_TOGGLE:
      return {
        ...state,
        filter: {
          ...state.filter,
          connected: action?.payload?.connected,
        },
      }

    case facebookFanpageActions.MODAL_ID_UPDATE:
      return {
        ...state,
        modal: {
          ...state.modal,
          id: action?.payload?.id,
          opt: action?.payload?.opt || null,
        },
      }

    case facebookFanpageActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      throw new Error()
  }
}
