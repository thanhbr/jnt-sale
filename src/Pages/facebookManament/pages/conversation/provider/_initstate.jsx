import addressData from 'Pages/addressSeparationTool/_data.json'
import {PRICE_POLICY} from '../component/order/_pricePolicyAutoComplete'
import {formatDatetime} from 'common/form/datePicker/_functions'
import {paymentDefaultDateTime} from 'Pages/orderSingle/provider/_initialState'
import {FACEBOOK_CONSTANTS} from  '../../../interfaces/_constants'

export const transformAddressData = data => ({
  name: data?.name || '---',
  value: data?.id || '',
  list: data?.list,
})

export const provinceData = addressData.map(transformAddressData)

export const facebookConversationInitialState = {
  auth: {
    accessToken: '',
    graphDomain: '',
    signRequest: '',
    userId: '',
    dataAccessExpirationTime: 0,
    expiresIn: 0,
  },
  user: {avatar: '', name: ''},
  conversation: {
    display: {
      list: [],
      updateList: [],
      page: 0,
    },
    star: [],
    loading: true,
    loadingMore: false,
  },
  loading: false,
  page: {
    list: [],
    active: [],
  },
  filter: {
    conversation: {
      keyword: '',
      type: 0,
      isRead: {
        id: 0,
        name: 'Tất cả',
        active: 0,
      },
      isStar: {
        active: 0,
        id: 0,
        name: 'Tất cả',
      },
      isPhone: {
        active: 0,
        id: 0,
        name: 'Tất cả',
      },
      tagsCustomer: {
        active: [],
        keyword: '',
        list: [],
        listOrigin: [],
        tab: 'all', // all | checked
        value: [],
      },
      post: {
        active: [],
        keyword: '',
        list: [],
        listOrigin: [],
        tab: 'all', // all | checked
        value: [],
        page: 0,
      },
      date: {
        start_date: '',
        end_date: '',
        value: '',
      },
    },
  },
  meta: {
    total: 0,
    unread: {
      all: 0,
      messages: 0,
      comments: 0,
    },
  },
  detail: {
    conversation: {
      list: [],
      listSelected: [],
      type: 1,
      customer: {},
      showRightSide: true,
      scrollBottom: false,
      scrollToView: 0,
      paging: {},
      detailPost: {},
      confirm: {
        delete: '',
        disable: '',
        create: {
          status: '',
          data: {},
        },
        edit: '',
      },
      typing: {
        media: {
          images: [],
          imageTemp: [],
          imageFiles: [],
          carousel: false,
        },
        text: {
          commentType: '',
          comment: {},
          type: '',
          value: '',
          search: false,
        },
        scriptResponse: {
          list: [],
          keyword: '',
          detail: {
            data: {
              data: null,
              confirm: false,
              loading: false,
              modifiled: false,
            },
            type: '',
          },
          loading: false,
        },
      },
      message: {
        show: false,
        data: {},
        media: {
          images: [],
          imageTemp: [],
          imageFiles: [],
          type: false,
          typeValue: 1, //1 Không đính kèm anh, //2 Gửi ảnh bài viết // 3 tải ảnh khác
          carousel: false,
        },
        value: '',
        loading: false,
      },
      firstFrame: true,
    },

    // Customer
    customerInfor: {
      list: [],
      listPhone: [],
      listAddress: [],
      listOrder: [],
      total_reports: 0,
      list_report:[],
      suggestAddress: [],
      errorSeparate: false,
      address: {
        value: '',
        province: {list: provinceData, keyword: '', value: null},
        district: {list: [], keyword: '', value: null},
        ward: {list: [], keyword: '', value: null},
      },
      disabledNameDefault: false,
      validate: {
        customer_name: false,
        customer_mobile: {status: false, message:''},
        customer_notes: false,
      },
      isNotEnoughCustomerInfo: false
    },

    // Order
    productInfo: {
      inventory: false,
      inventoryConfig: {
        warehouse: {
          list: [],
          pagination: {page: 0, total: 0},
          value: null,
          valueOrigin: null,
          keyword: '',
          loading: false,
          loadingMore: false,
        },
        pricePolicy: {
          list: PRICE_POLICY,
          listOrigin: PRICE_POLICY,
          value: PRICE_POLICY[0],
          valueOrigin: PRICE_POLICY[0],
        },
        product: {
          list: [],
          pagination: {page: 0, total: 0},
          value: [],
          valueOrigin: [],
          discount: 0,
          discount_value: 0,
          discountType: '%',
          keyword: '',
          loading: false,
          loadingMore: false,
        },
      },
      nonInventoryConfig: {
        manual: {value: ''},
      },
      withInventoryConfig: {
        discount: {value: 0, type: '%'},
        priceType: {
          list: FACEBOOK_CONSTANTS.productInfo.withInventoryPriceType,
          value:
            FACEBOOK_CONSTANTS.productInfo.withInventoryPriceType[0],
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
    },

    paymentInfo: {
      type: 'cod',
      method: {
        list: [],
        pagination: {page: 0, total: 0},
        value: null,
        valueOrigin: null,
        keyword: '',
        loading: false,
        loadingMore: false,
      },
      money: 0,
      dateTime: {
        formatValue: formatDatetime(paymentDefaultDateTime),
        value: paymentDefaultDateTime,
      },
    },

    shippingInfo: {
      isStorePickUp: false,
      cod: 0,
      weight: 1,
      longs: 1,
      width: 1,
      height: 1,
      cargoInsurrance: {},
      shippingPoint: {
        list: [],
        pagination: {page: 0, total: 0},
        value: null,
        valueOrigin: null,
        keyword: '',
        loading: false,
        loadingMore: false,
      },
      note: {
        list: [],
        pagination: {page: 0, total: 0},
        value: null,
        valueOrigin: null,
        keyword: '',
        loading: false,
        loadingMore: false,
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

    loading: false,
    tabInfo: 1,
  },
  tags: {
    active: false,
    confirm: false,
    animate: false,
    change: false,
    form: {
      data: {
        color: '',
        stickerName: '',
        id: '',
      },
    },
  },
  notification: false,
  validate: {},
  loadingFee: false,
  triggerCollectDefault: '',
  collapseStatus: [],
  deliveryNote: [],
}
