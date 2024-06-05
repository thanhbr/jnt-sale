
const initGrCustomerState = {
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
    }
  },
  status: false,
  listGrCustomer: [],
  meta: {
    start: 0,
    per_page: 20
  },
  isLoading: true,
  showOtherFilter: false,
  showTag: false,
  successMessage : {
    active: false,
    message: '',
    iconUrl: ''
  },
  isChecked : [],
  allChecked : false,
  isCreated: false
}

export default initGrCustomerState;