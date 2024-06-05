import {PRODUCT_PAPER_SETTING_BARCODE, FILTER_PRICE_PRODUCT_CONSTANTS} from "../interfaces/~constants";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

export const productInitialState = {
  filter: {
    keyword: '',
    status: {
      id: '',
      name: '',
      active: '',
    },
    category_id: {
      id: '',
      name: '',
      active: '',
    },
    per_page: '',
    start: 0,
    warehouse: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
  },
  table: {
    display: {
      list: [],
      loading: true,
    },
    detail: {
      id: null,
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
    listDefault: [],
    debounceProductStatus: true,
  },
  formCreate: {
    basic: {
      active: true,
      name: '',
      code: '',
      barCode: '',
      groupProduct: {
        id: '',
        value: '',
        list: [],
        listOrigin: [],
        listChildTwo: [],
        search: {
          keyword: '',
          list: [],
        },
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
        barCode: {
          status: false,
          message: ''
        },
        group: {
          status: false,
          message: '',
        },
      },
      modal: {
        open: false,
        form: {
          code: '',
          name: '',
          group: [],
          note: '',
        },
        validate: {
          code: {
            status: false,
            message: '',
          },
          name: {
            status: false,
            message: '',
          }
        }
      }
    },
    product: {
      image: {
        id: '',
        name: '',
        link: '',
        // link: 'https://dev.upos.vn/assets/image/uploads/logo/1667471597_8a556216df2f9b03d6c3.jpg',
      },
      unit: {
        id: '',
        value: '',
        type: 'g',
        list: [],
        listOrigin: [],
      },
      weight: '',
      note: {
        open: false,
        content: '',
      },
      validate: {
        image: {
          status: false,
          message: ''
        },
        unit: {
          status: false,
          message: ''
        },
        weight: {
          status: false,
          message: ''
        },
      },
      modal: {
        open: false,
        form: {
          unit: '',
          symbol: '',
        },
        validate: {
          unit: {
            status: false,
            message: '',
          },
          symbol: {
            status: false,
            message: '',
          },
        }
      }
    },
    inventory: {
      statusInit: false,
      info: {
        id: '',
        value: '',
      },
      init: '',
      warehouse: {
        id: '',
        value: '',
        list: [],
        listOrigin: [],
      },
      validate: {
        init: {
          status: false,
          message: ''
        },
      }
    },
    price: {
      retail: '',
      wholesale: '',
      lastEntry: '',
      cost: '',
      validate: {
        retail: {
          status: false,
          message: '',
        },
        wholesale: {
          status: false,
          message: '',
        },
        lastEntry: {
          status: false,
          message: '',
        },
        cost: {
          status: false,
          message: '',
        },
      }
    },
    version: {
      initAttr: 0,
      arrAttr: [],
      attrVersion: [],
      valueVersion: [],
      valueEditVersion: [],
      formVersion: [{
       image: '',

       name: '',
       entryPrice: '',
        cost: '',
        retail: '',
        wholesale: '',
      }],
      modalPrice: {
        open: false
      },
      validateSKU: [],
      validateBarcode: [],
    },
    zoomIn: {
      open: false,
      linkActive: '',
    },
    statusForm: 'create',
  },
  printBarcode: {
    display: {
      list: [],
      loading: true,
    },
    warehouse: {
      id: '',
      value: '',
      list: [],
      listOrigin: [],
    },
    priceType: {
      id: '',
      value: {id: 1, name: DISPLAY_NAME_MENU.GENERAL.RETAIL_PRICE, active: false},
    },
    product: {
      id: '',
      value: '',
      list: [],
      listOrigin: [],
    },
    withInventoryConfig: {
      discount: {value: 0, type: '%'},
      priceType: {
        list: FILTER_PRICE_PRODUCT_CONSTANTS,
        value:
          FILTER_PRICE_PRODUCT_CONSTANTS[0],
      },
      search: {
        list: [],
        listOrigin: [],
        loading: false,
        page: 0,
        selected: [], // {data, quantity, price, discount, discountType}[]
        total: 0,
        totalOrigin: 0,
        value: '',
      },
      warehouse: {
        keyword: '',
        list: [],
        listOrigin: [],
        value: null,
      },
    },
    formSubmit: {
      print_type: '2tem_72x22',
      print_setting: PRODUCT_PAPER_SETTING_BARCODE,
      arr_product: []
    },
    loading: true,
  },
  modal: {
    confirmProductStatus: false,
    dataChangeProductStatus: {},
    confirmRemoveProduct: false,
    dataRemoveProduct: {},
    confirmProductDetailStatus : false,
    confirmProductGroupStatus : false,
    dataChangeProductDetailStatus: {},
    confirmPopup1: false,
    confirmPopup2: false,
    confirmPopup3: false,
    statusConfirmEdit: {
      warehouse_quantity: 0,
      order: 0
    }

  },
    export_file:'#',
    import_file:null,
  tab:{
    tab_id:[],
    list_id:[]
  },
  notifications: {
    list: [],
    total:''
  },

}