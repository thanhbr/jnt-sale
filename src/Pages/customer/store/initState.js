export const initCustomerState = {
  filter: {
    start: 0,
    per_page: 20,
    keyword: {
      label: '',
      value: '',
      name: '',
    },
    group: {
      label: '',
      value: '',
      name: '',
    },
    city: {
      label: '',
      value: '',
      name: '',
    },
    district: {
      label: '',
      value: '',
      name: '',
    },
    ward: {
      label: '',
      value: '',
      name: '',
    },
  },
  shippingStatus: {
    activeValue: [],
    keyword: '',
    list: [],
    listOrigin: [],
    tab: 'all', // all | checked
    value: [],
  },
  tag: {
    group: {
      label: '',
      value: '',
      name: '',
    },
    city: {
      label: '',
      value: '',
      name: '',
    },
    district: {
      label: '',
      value: '',
      name: '',
    },
    ward: {
      label: '',
      value: '',
      name: '',
    },
  },
  status: false,
  listCustomer: [],
  selectedList: [],
  meta: { start: 1, per_page: 20 },
  isLoading: true,
  tabDetails: {},
  groupCustomer: [],
  groupCity: [],
  showOtherFilter: false,
  showTag: false,
  infoUser: [],
  customerPurchase: { originList: [] },
  modal: null,
  errors: { submitData: [], details: [], type: '', isError: false },
}