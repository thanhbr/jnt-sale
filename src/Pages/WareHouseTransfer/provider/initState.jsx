export const wareHouseTransferInitialState = {
  filter: {
    advancedSearch: {
      customer: {
        keyword: '',
        value: '',
      },
      itemDetails: '',
    },
    dateTime: {
      activeValue: {
        end: '',
        start: '',
        value: '',
      },
      end: '',
      start: '',
      value: '',
      trigger: true
    },
    search: {
      value: '',
    },
    warehouseExport: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    warehouseImport: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    createdUser: {
      listOrigin: [],
      list: [],
      value: [],
      activeValue: [],
      loading: false,
      tab: 'all', // all | checked
      keyword: ''
    }
  },
  notifications: {
    list: [],
  },
  table: {
    display: {
      list: [],
      report: []
    },
    detail: {
      active: null,
      list: [],
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
    loading: false,
  },
  loading: false
}