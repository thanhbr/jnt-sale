export const facebookHideAutoCommentInitialState = {
  auth: {
    accessToken: '',
    graphDomain: '',
    signRequest: '',
    userId: '',
    dataAccessExpirationTime: 0,
    expiresIn: 0,
  },
  user: {avatar: '', name: ''},
  extra: {
    hiddenAllComment: false,
    hiddenAllCommentHasPhone: false,
    listOrgin: [],
  },
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
  validate: {
    hide_text: {
      index: '',
      text: ''
    }
  },
  changed : false,
  confirm : false,
  loading: false
}
