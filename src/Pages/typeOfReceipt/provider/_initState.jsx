
export const typeOfReceiptInitialState = {
  filter: {
    keyword: '',
  },
  table: {
    display: {
      list: [],
      loading: true,
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
    debounceProductStatus: true,
  },
  modal: {
    createReceipt: {
      open: false,
      changeForm: false,
      form: {
        name: '',
        code: '',
        description: '',
        status: 1, // 1 active or 0 deactivate
      },
      validate: {
        name: {
          status: false,
          message: ''
        },
        code: {
          status: false,
          message: ''
        },
        description: {
          status: false,
          message: ''
        },
      }
    },
    removeReceipt: {
      open: false,
      data: {}
    },
    inactiveStatus: {
      open: false,
      data: [],
      debounce: true
    }
  }
}