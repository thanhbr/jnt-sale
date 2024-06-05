import { provinceData } from '../../orderSingle/provider/_initialState'

export const posOrderInitialState = {
  loading: false,
  barcode: {
    status: false,
    value: ''
  },
  statusUpdate: false,
  general: {
    modal: {
      leave: false,
      removeOrder: {
        display: false,
        order: {}
      }
    }
  },
  orders: {
    warehouse: [],
    keyword: [], // search for 5 item order
    customer: [
      { id: 1, data: {} , tab: 'guest'}
    ],
    list: [
      //list order create - default 1 tab
      {
        id: 1,
        product: [],
        discount: {
          type: '%',
          value: 0,
        },
        priceType: 1,
        changed: false
      }

    ],
    active: 1,
    createdOrderID: '',
    addressOrder: {},
  },
  payment: {
    // list payment method
  },
  warehouses: {
    // list warehouse
    list: [],
    listOrigin: [],
    keyword: '',
  },
  products: {
    // list quick products
    list: [],
    listOrigin: [],
    meta: {},
    value: {},
    show: false,
    shortcut: false,
    filter: {
      groupProduct: {
        id: '',
        activeValue: '',
        value: '',
        list: [],
        listOrigin: [],
        listChildTwo: [],
        search: {
          keyword: '',
          list: [],
        },
      },
      sort: {
        value: {
          id: 1,
          name: 'Sản phẩm mới nhất'
        },
        list: [
          { id: 1, name: 'Sản phẩm mới nhất' },
          { id: 2, name: 'Sản phẩm bán chạy nhất' },
          { id: 1, name: 'Sản phẩm có doanh thu cao nhất' },
        ]
      }
    },
    typeView: 1 //1 grid , 2 list
  },
  productSearch: {
    keyword: '',
    list: [],
    listOrigin: [],
    value: {}
  },
  customerInfo: {
    keyword: '',
    list: [],
    listOrigin: [],
    page: 0,
    total: 0,
    totalOrigin: 0,
    value: '',
  },
  rightContent: {
    tab: 'guest',
    modal: {
      selectPayment: {
        open: false
      },
      createCustomer: {
        showMore: false,
        open: false,
        form: {
          suggestAddress: [],
          address: {
            value: '',
            province: { list: provinceData, keyword: '', value: null },
            district: { list: [], keyword: '', value: null },
            ward: { list: [], keyword: '', value: null },
          },
          fullName: '',
          phone: '',
          code: '',
          groupCustomer: { list: [], listOrigin: [], keyword: '', value: null },
          gender: { list: [
              {name: 'Nam', value: 1},
              {name: 'Nữ', value: 2},
            ],value: {name: 'Nam', value: 1} },
          email: '',
          note: '',
          validate: {
            fullName: '',
            phone: ''
          }
        }
      },
      responseSubmit: {
        open: false,
        sent: []
      },
      confirmOrder: {
        open: false
      }
    },
    errorSubmit: false
  }
}
