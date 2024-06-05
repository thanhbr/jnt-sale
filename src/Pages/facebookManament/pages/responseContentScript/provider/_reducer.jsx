import {facebookResponseContentScriptActions as actions} from './_actions'
import {facebookResponseContentScriptInitialState} from './_initstate'

export const FacebookResponseContentScriptReducer = (state, action) => {
  switch (action.type) {
    case actions.FILTER_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.payload?.keyword,
        },
      }

    case actions.SCRIPT_LIST_UPDATE:
      return {
        ...state,
        script: {
          ...state.script,
          list: action.payload?.list,
        },
      }

    case actions.SCRIPT_LOADING_UPDATE:
      return {
        ...state,
        script: {
          ...state.script,
          loading: action.payload?.loading,
        },
      }

    case actions.MODAL_CONFIRM_DELETE_UPDATE: {
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmDelete: {
            ...state.modal.confirmDelete,
            data: action.payload?.data,
          },
        },
      }
    }

    case actions.MODAL_CONFIRM_DELETE_LOADING_TOGGLE: {
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmDelete: {
            ...state.modal.confirmDelete,
            loading: action.payload?.loading,
          },
        },
      }
    }

    case actions.DETAIL_UPDATE:
      return {
        ...state,
        script: {
          ...state.script,
          detail: {
            ...state.script.detail,
            type: action.payload?.type,
            data: {
              ...state.script.detail.data,
              data: action.payload?.detailData,
            },
          },
        },
      }

    case actions.DETAIL_RESET:
      return {
        ...state,
        script: {
          ...state.script,
          detail: facebookResponseContentScriptInitialState.script.detail,
        },
      }

    case actions.DETAIL_CONFIRM_UPDATE:
      return {
        ...state,
        script: {
          ...state.script,
          detail: {
            ...state.script.detail,
            data: {
              ...state.script.detail.data,
              confirm: action.payload?.confirm,
            },
          },
        },
      }

    case actions.DETAIL_LOADING_UPDATE:
      return {
        ...state,
        script: {
          ...state.script,
          detail: {
            ...state.script.detail,
            data: {
              ...state.script.detail.data,
              loading: action.payload?.loading,
            },
          },
        },
      }

    case actions.DETAIL_MODIFILED_UPDATE:
      return {
        ...state,
        script: {
          ...state.script,
          detail: {
            ...state.script.detail,
            data: {
              ...state.script.detail.data,
              modifiled: action.payload?.modifiled,
            },
          },
        },
      }

    default:
      throw new Error()
  }
}
