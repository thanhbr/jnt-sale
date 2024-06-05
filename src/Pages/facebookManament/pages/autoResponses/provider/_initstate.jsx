export const facebookAutoResponsesInitialState = {
  auth: {
    accessToken: '',
    graphDomain: '',
    signRequest: '',
    userId: '',
    dataAccessExpirationTime: 0,
    expiresIn: 0,
  },
  user: { avatar: '', name: '' },
  table: {
    display: {
      list: [],
      updateList: []
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
    loading: true
  },
  filter: {
    keyword: '',
    page_id: '',
    pageSelected: {
      activeValue: [],
      keyword: '',
      list: [],
      listOrigin: [],
      tab: 'all', // all | checked
      value: [],
    },
  },
  loading: false,
  confirm: {
    delete: '',
    disable: '',
    enable: {
      status: '',
      data: {}
    },
    create: {
      status: '',
      data: {}
    },
    edit: ''
  },
  detail: {},
  create: {
    basicInfo: {
      fanPage: {
        keyword: '',
        list: [],
        page: 0,
        total: 0,
        value: null,
      },
      scriptName: '',
      scriptStatus: true
    },
    postAndComment: {
      post: {
        type: 1,
        list: [],
        keyword: '',
        listSelected: [],
        page: 0,
        total: 0,
        totalSelected: 0,
        value: [],
        showModal: false,
        fetching: false,
      },
      comment: {
        type: 1,
        phone: true,
        keyword: {
          status: true,
          value: ''
        }
      }
    },
    autoResponse: {
      fitCondition: {
        commentResponse: {
          status: true,
          value: ''
        },
        messageResponse: {
          status: true,
          value: ''
        },
      },
      unfitCondition: {
        commentResponse: {
          status: true,
          value: ''
        },
        messageResponse: {
          status: true,
          value: ''
        }
      },
    }
  },
  validate: {
    basicInfo: {
      page: '',
      scriptName: '',
    },
    autoResponse: {
      fitCondition: {
        commentResponse: '',
        messageResponse: '',
      },
      unfitCondition: {
        commentResponse: '',
        messageResponse: ''
      },
    },
    postAndComment: {
      post: '',
      comment: ''
    },
  }
}
