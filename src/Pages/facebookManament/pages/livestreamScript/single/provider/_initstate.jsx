export const FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS = {
  pricePolicy: [
    {name: 'Giá bán lẻ', value: 1},
    {name: 'Giá bán sỉ', value: 2},
  ],
  orderSyntax: [
    {
      data: {
        tooltip:
          'Khi khách hàng bình luận đúng từ khóa được khai báo, bình luận đó sẽ được lưu vào phần ghi chú đơn hàng tạo tự động. ',
        disabled: true,
      },
      name: 'Từ khóa',
      value: 1,
    },
    {
      name: 'Số điện thoại',
      value: 2,
    },
  ],
  orderTime: [
    {
      name: 'Gộp các bình luận đúng cú pháp của một khách hàng và chỉ tạo một đơn hàng nháp',
      value: 1,
    },
    {
      name: 'Mỗi bình     luận đúng cú pháp tạo một đơn nháp',
      value: 2,
    },
  ],
}

export const facebookLivestreamScriptSingleInitialState = {
  form: {
    // basic info
    name: {value: '', valueOrigin: ''},
    fanpage: {list: [], value: [], valueOrigin: []},
    status: {value: true, valueOrigin: true},
    // declare order keyword
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
      list: FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.pricePolicy,
      listOrigin:
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.pricePolicy,
      value: FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.pricePolicy[0],
      valueOrigin:
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.pricePolicy[0],
    },
    product: {
      list: [],
      pagination: {page: 0, total: 0},
      value: [],
      valueOrigin: [],
      keyword: '',
      loading: false,
      loadingMore: false,
    },
    // config auto menu syntax
    orderSyntax: {
      list: FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderSyntax,
      value: [
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderSyntax[0],
      ],
      valueOrigin: [
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderSyntax[0],
      ],
    },
    orderTime: {
      list: FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderTime,
      value: FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderTime[0],
      valueOrigin:
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderTime[0],
    },
    orderConfirm: {
      value: true,
      valueOrigin: true,
    },
    // shipping info
    shippingPoint: {
      list: [],
      pagination: {page: 0, total: 0},
      value: null,
      valueOrigin: null,
      keyword: '',
      loading: false,
      loadingMore: false,
    },
    shippingPartner: {
      list: [],
      listOrigin: [],
      config: {},
      value: null,
      valueOrigin: null,
      keyword: '',
    },
    cod: {value: 0, valueOrigin: 0, disabled: true, disabledOrigin: true},
    insurance: {value: 0, valueOrigin: 0, disabled: true, disabledOrigin: true},
    packageNumber: {value: 1, valueOrigin: 1},
    weight: {value: 0, valueOrigin: 0},
    length: {value: 10, valueOrigin: 10},
    width: {value: 10, valueOrigin: 10},
    height: {value: 10, valueOrigin: 10},
    note: {
      list: [],
      pagination: {page: 0, total: 0},
      value: null,
      valueOrigin: null,
      keyword: '',
      keywordOrigin: '',
      loading: false,
      loadingMore: false,
    },
  },
  script: {list: []},
  validate: {
    // name
    name: '',
    // product
    productSearch: '',
    productTableTags: [],
    // size
    lengthType: 'danger',
    lengthContent: '',
    width: '',
    height: '',
  },
}
