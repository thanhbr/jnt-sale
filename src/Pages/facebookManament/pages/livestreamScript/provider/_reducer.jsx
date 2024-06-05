import {facebookLivestreamScriptActions as actions} from './_actions'

export const FacebookLivestreamScriptReducer = (state, action) => {
  switch (action.type) {
    case actions.FANPAGE_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          fanpage: {
            ...state.filter.fanpage,
            list: action.payload?.list,
            listOrigin: action.payload?.list,
          },
        },
      }

    case actions.FANPAGE_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          search: {
            ...state.filter.fanpage,
            value: action.payload?.value,
          },
        },
      }

    case actions.FANPAGE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          fanpage: {
            ...state.filter.fanpage,
            keyword: action.payload?.keyword,
            list: action.payload?.list,
          },
        },
      }

    case actions.FANPAGE_VALUE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          fanpage: {
            ...state.filter.fanpage,
            list: action.payload?.list,
            value: action.payload?.value,
          },
        },
      }

    case actions.FANPAGE_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          fanpage: {
            ...state.filter.fanpage,
            list: action.payload?.list,
            tab: action.payload?.tab,
          },
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

    default:
      throw new Error()
  }
}
