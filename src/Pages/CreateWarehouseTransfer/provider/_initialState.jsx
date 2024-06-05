import addressData from 'Pages/addressSeparationTool/_data.json'
import { transformAddressData } from "../utils/transform"

export const paymentDefaultDateTime = new Date()
export const provinceData = addressData.map(transformAddressData)

export const createWarehouseTransferInitialState = {
  form: {
    generalInfo: {
      warehouseImport: '',
      warehouseExport: '',
      warehouseList: {
        list: [],
        page: 0,
        total: 10,
        store_limit: 0
      },
      warehouseKeyword: '',
    },
    productInfo: {
      list: [],
      listOrigin: [],
      loading: false,
      page: 0,
      selected: [], // {data, quantity}[]
      total: 0,
      totalOrigin: 0,
      value: '',
    },
    extraInfo: {
      transferDate: new Date(),
      note: '',
    },
    validate: {},
    isValid: false,
  },
  createModal: {
    meta: {
      start: 0,
      per_page: 20,
      total: 20,
      store_limit: 0,
    }, 
    form: {
      address: {
        value: '',
        origin: '',
        province: {list: provinceData, keyword: '', value: null},
        district: {list: [], keyword: '', value: null},
        ward: {list: [], keyword: '', value: null},
        provinceOrigin: null,
        districtOrigin: null,
        wardOrigin: null,
      },
      name: {
          value: '',
          origin: ''
      },
      isPurchase: {
          value: true,
          origin: true
      },
      isMain: {
          value: false,
          origin: false
      },
      status: {
          value: true,
          origin: true
      }
    }, 
    errors: [],
    open: false,
    openConfirmClose: false,
    animationClose: false,
  },
  modalInfo: {
    open: false,
    type: '',
    title: '',
    message: '',
},
  loading: false,
  skeleton: false,
  triggerCollectDefault: false,
}
