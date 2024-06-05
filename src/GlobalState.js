const GlobalState = {
  user: {},
  userFB: {},
  isLogin: false,
  isLoginFB: false,
  lang: 'vi',
  noti: {
    // message: {
    //  type: filter, order ????
    // status: ---"success  error warning",---
    // autoHide: ---default is true, auto close noti -------
    // icon: path to icon
    // prefix: fix characted want to show
    // }
  },
  inprogress: false,
  ICEditPopUp: {
    isShow: false,
    data: {},
  },
  shopInfo: {},
  avatar: {},
  isShowBackDrops: false,
  shouldMinimizeSidebar: false,
  showFeedBack: false,
  alert: null,
  isLoading: true,
  scroll: false,
  facebook: {
    cNabar: false,
    fanpage: []
  },
  facebookAuth: {
    auth: {
      accessToken: '',
      graphDomain: '',
      signRequest: '',
      userId: '',
      dataAccessExpirationTime: 0,
      expiresIn: 0,
    },
    user: {avatar: '', name: ''},
    changed: {
      status: false,
      link: '/facebook',
      showPopup: false
    }
  },
}
export default GlobalState
