import {formatDatetime} from 'common/form/datePicker/_functions'
import addressData from 'Pages/addressSeparationTool/_data.json'
import {ORDER_SINGLE_CONSTANTS} from '../interface/_constants'
import {transformAddressData} from '../utils/transform'

export const provinceData = addressData.map(transformAddressData)

export const paymentDefaultDateTime = new Date()

export const orderSingleInitialState = {
  form: {
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
      canLoadMore:true,
    },
    extraInfo: {
      uniqueOrderNumber: {value: ''},
      note: {value: ''},
    },
  },
  deliveryNote: [],
  collapseStatus: [],
  validate: {},
  responseOrders: {},
  loading: false,
  skeleton: false,
  triggerCollectDefault: false,

  // Edit form
  creator: '', // Người tạo đơn
  shipping_status: '', // Trạng thái đơn hàng: "1" - "Gửi đơn giao hàng" , "21" - "Đơn nháp", "8" - "Bán tại cửa hàng"
  field_paid: 0, // Text đã thanh toán

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
  validateEdit: {
    deliveryNote: {
      status: true,
      message: ''
    }
  },
  validateTable:true,
}
