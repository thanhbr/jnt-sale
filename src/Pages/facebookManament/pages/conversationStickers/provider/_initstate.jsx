export const facebookConversationStickersInitialState = {
  auth: {
    accessToken: '',
    graphDomain: '',
    signRequest: '',
    userId: '',
    dataAccessExpirationTime: 0,
    expiresIn: 0,
  },
  user: {avatar: '', name: ''},
  table: {
    display: {
      list: [],
      updateList:[]
    },
    pagination: {
      active: 0,
      amount: 20,
      total: 0,
      totalItems: 0,
    },
    selected: {
      list: [],
    },
    loading: false
  },
  loading: false,
  modal: {
    form: {
      data: {
        color: '',
        stickerName: '',
        id: ''
      },
      validate: {
        stickerName: '',
        color: '',
      }
    },
    header: {},
    footer: {},
    status: {
      active: false,
      confirm: false,
      animate: false,
      delete: false,
    }
  }
}
