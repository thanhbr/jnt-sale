import {formatDatetime} from 'common/form/datePicker/_functions'
import addressData from 'Pages/addressSeparationTool/_data.json'
import {ORDER_SINGLE_CONSTANTS} from '../interface/_constants'
import {transformAddressData} from '../utils/transform'

export const provinceData = addressData.map(transformAddressData)

export const paymentDefaultDateTime = new Date()

export const orderSingleInitialState = {
  form: {
    customerInfo: {
      suggestAddress: [],
      address: {
        value: '',
        province: {list: provinceData, keyword: '', value: null},
        district: {list: [], keyword: '', value: null},
        ward: {list: [], keyword: '', value: null},
      },
      fullName: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        totalOrigin: 0,
        value: '',
      },
      phone: {
        detail: null,
        list: [],
        listOrigin: [],
        loading: false,
        order: {loading: false, figures: [], recentList: []},
        page: 0,
        report: [],
        total: 0,
        totalOrigin: 0,
        value: '',
      },
      updateAddress: {
        open: false,
        check: false
      }
    },
    productInfo: {
      inventory: false,
      inventoryConfig: {
        auto: {
          list: [],
          listOrigin: [],
          loading: false,
          page: 0,
          selected: [], // {data, quantity}[]
          total: 0,
          totalOrigin: 0,
          value: '',
        },
        manual: {value: ''},
        type: 'manual', // manual | auto
      },
      withInventoryConfig: {
        discount: {value: 0, type: '%'},
        priceType: {
          list: ORDER_SINGLE_CONSTANTS.form.productInfo.withInventoryPriceType,
          value:
            ORDER_SINGLE_CONSTANTS.form.productInfo.withInventoryPriceType[0],
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
          validateEmptyProduct: '',
        },
        warehouse: {
          keyword: '',
          list: [],
          listOrigin: [],
          value: null,
        },
      },
    },
    shippingInfo: {
      isStorePickUp: false,
      collectMoney: 0,
      weight: 1,
      changeWeight: false,
      deliveryNote: {selected: 0, content: ''},
      size: {
        longs: 0,
        width: 0,
        height: 0,
      },
      shippingPartner: {
        id: 0,
        list: [],
        listOrigin: [],
        service: [],
        subService: {
          subServiceId: '',
          name: '',
        },
      },
    },
    extraInfo: {
      shippingPoint: {
        keyword: '',
        list: [],
        page: 0,
        total: 0,
        value: null,
      },
      source: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
      uniqueOrderNumber: {value: ''},
      note: {value: ''},
      shipFeeCustom: {value: 0, triggerCollectDefault: true},
    },
    paymentMethod: {
      type: 'cod', // before | cod | after
      method: {
        keyword: '',
        list: [],
        listOrigin: [],
        page: 0,
        total: 0,
        value: null,
      },
      money: {value: 0},
      dateTime: {
        formatValue: formatDatetime(paymentDefaultDateTime),
        value: paymentDefaultDateTime,
      },
    },
  },
  deliveryNote: [],
  collapseStatus: [],
  validate: {},
  responseOrders: {},
  loading: false,
  skeleton: false,
  triggerCollectDefault: false,
  warningPhone: false,

  // Edit form
  creator: '', // Người tạo đơn
  shipping_status: '', // Trạng thái đơn hàng: "1" - "Gửi đơn giao hàng" , "21" - "Đơn nháp", "8" - "Bán tại cửa hàng"
  field_paid: 0, // Text đã thanh toán
  priceOrder: {
    amount: '',
    discount: '',
    cod_amount: '',
    init: true,
  },
  editModalPayment: {
    open: false,
    validate: {
      name: {
        status: false,
        message: ''
      }
    },
    form: {
      name: '',
      is_active: false,
      status: true,
    },
    modalConfirm: false
  },
  editModalDeliveryNote: {
    open: false,
    validate: {
      note: {
        status: false,
        message: ''
      },
      position: {
        status: false,
        message: ''
      },
    },
    form: {
      note: '',
      position: '',
      is_active: false,
      status: true,
    },
    modalConfirm: false
  },
  editModalShippingPoint: {
    open: false,
    validate: {
      name: {
        status: false,
        message: ''
      },
      phone: {
        status: false,
        message: ''
      },
      email: {
        status: false,
        message: ''
      },
      address: {
        status: false,
        message: ''
      },
      city: {
        status: false,
        message: ''
      },
      district: {
        status: false,
        message: ''
      },
      ward: {
        status: false,
        message: ''
      },
    },
    form: {
      name: '',
      phone: '',
      email: '',
      city: [],
      district: [],
      ward: [],
      address: '',
      selectedOptions: '',
    },
    modalConfirm: false
  },
  editModalSourceOrder: {
    open: false,
    validate: {
      name: {
        status: false,
        message: ''
      }
    },
    form: {
      name: '',
      position: '',
      // is_active: false,
    },
    modalConfirm: false,
  },
  validateEdit: {
    deliveryNote: {
      status: true,
      message: ''
    }
  }
}
