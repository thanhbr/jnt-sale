
const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    case 'SET_USER_FB':
      return {
        ...state,
        userFB: {
          ...state.userFB,
          ...action.payload,
        },
      }
    case 'SET_LOGIN':
      return {
        ...state,
        isLogin: true,
      }
    case 'SET_LOGOUT':
      return {
        ...state,
        isLogin: false,
      }

    case 'SET_LOGIN_FB':
      return {
        ...state,
        isLoginFB: true,
      }
    case 'SET_LOGOUT_FB':
      return {
        ...state,
        isLoginFB: false,
      }
    case 'CHANGE_LANG':
      return {
        ...state,
        lang: action.payload,
      }
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        noti: {
          ...state.noti,
          ...action.payload,
        },
      }
    case 'GET_STORE_INFO':
      return {
        ...state,
        shopInfo: action.payload,
      }
    case 'DELETE_MESSAGE': {
      const noti = {...state.noti}
      delete noti[action.payload]
      return {
        ...state,
        noti,
      }
    }
    case 'IC_EDIT_MODAL': {
      return {
        ...state,
        ICEditPopUp: {
          ...state.ICEditPopUp,
          ...action.payload,
        },
      }
    }
    case 'CHANGE_INPROGRESS':
      return {
        ...state,
        inprogress: action.payload,
      }
    case 'UPDATE_AVATAR_FACEBOOK':
      return {
        ...state,
        avatar: action.payload,
      }
    case 'UPDATE_BACK_DROP_STATUS':
      return {
        ...state,
        isShowBackDrops: action.payload,
      }

    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        shouldMinimizeSidebar:
          action?.payload?.toggle || !state.shouldMinimizeSidebar,
      }

    case 'SET_SHOW_FEED_BACK':
      return {
        ...state,
        showFeedBack: !state.showFeedBack,
      }

    case 'ALERT_CLOSE':
      return {...state, alert: null}

    case 'ALERT_OPEN':
      return {
        ...state,
        alert: {
          duration: action?.payload?.duration || 5000,
          content: action?.payload?.content,
          open: true,
          type: ['danger', 'info', 'success', 'warning'].includes(
            action?.payload?.type,
          )
            ? action.payload.type
            : 'info',
          onClose: action?.payload?.onClose,
        },
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'SET_SCROLL':
      return {
        ...state,
        scroll: action.payload,
      }

    case 'SET_CUSTOM_NAR_FACEBOOK':
      return {
        ...state,
        facebook: {
          ...state.facebook,
          cNabar: action.payload
        }
      }
    case 'SET_PAGE_FACEBOOK':
      return {
        ...state,
        facebook: {
          ...state.facebook,
          fanpage: action?.payload?.selected,
        },
      }

    case 'FACEBOOK_AUTH_UPDATE':
      return {
        ...state,
        facebookAuth: {
          ...state.facebookAuth,
          auth: {
            ...state.auth,
            ...action?.payload?.auth,
          },
        },
      }

    case 'FACEBOOK_AUTH_USER_UPDATE':
      return {
        ...state,
        facebookAuth: {
          ...state.facebookAuth,
          user: {
            ...state.user,
            ...action?.payload?.user,
          },
        },
      }

    case 'UPDATE_CHANGE_STATUS':
      return {
        ...state,
        facebookAuth: {
          ...state.facebookAuth,
          changed: {
            ...state.facebookAuth.changed,
            ...action?.payload
          }
        },
      }
    default:
      return state
  }
}

export default Reducer
