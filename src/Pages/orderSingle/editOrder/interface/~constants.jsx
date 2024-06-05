export const ORDER_SINGLE_CONSTANTS = {
  header: {
    breadcrumb: [
      {
        id: 1,
        name: 'Đơn hàng',
        url: '#',
      },
      {id: 2, name: 'Quản lý đơn hàng', url: '#'},
      {id: 3, name: 'Chỉnh sửa đơn hàng', url: '#'},
    ],
  },
  form: {
    productInfo: {
      inventoryType: [
        {
          id: 1,
          name: 'Nhập tên hàng hóa',
          tooltip: (
            <ul style={{paddingLeft: 12}}>
              <li style={{marginBottom: 8, listStyleType: 'disc'}}>
                Bạn sẽ tự nhập tên hàng hóa và số lượng của hàng hóa, evoshop đề
                xuất bạn nên dùng cú pháp nội dung hàng hóa là:
              </li>
              <li style={{marginBottom: 8}}>
                Tên sản phẩm | Số lượng sản phẩm
              </li>
              <li style={{listStyleType: 'disc'}}>Ví dụ: Áo dài tay | 2</li>
            </ul>
          ),
          value: 'manual',
        },
        {
          id: 2,
          name: 'Sử dụng tên sản phẩm có sẵn',
          tooltip: (
            <ul style={{paddingLeft: 12}}>
              <li style={{marginBottom: 8, listStyleType: 'disc'}}>
                Bạn sẽ chọn và sử dụng tên của các sản phẩm mà bạn đã tạo ở phần
                Quản lý sản phẩm trên hệ thống.
              </li>
              <li style={{listStyleType: 'disc'}}>
                Lưu ý: Thao tác này chỉ sử dụng tên sản phẩm, không trừ tồn kho
                khi bán sản phẩm.
              </li>
            </ul>
          ),
          value: 'auto',
        },
      ],
      withInventoryPriceType: [
        {name: 'Giá bán lẻ', value: 1},
        {name: 'Giá bán sỉ', value: 2},
      ],
    },
    shippingInfo: {
      1: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
          {value: 3, label: 'Người gửi cuối tháng trả phí', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        partsign: false,
        packageQuantity: 1,
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
      2: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
        ],
        transport: [
          {value: '', label: 'Mặc định', checked: true},
          {value: 'road', label: 'Đường bộ', checked: false},
          {value: 'fly', label: 'Đường hàng không', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        pick_date: null,
        pick_shift: [
          {value: 1, label: 'Buổi sáng', checked: false},
          {value: 2, label: 'Buổi chiều', checked: false},
          {value: 3, label: 'Buổi tối', checked: false},
        ],
        cargoInsurrance: {
          value: '',
          active: true
        },
      },
      3: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
          {value: 3, label: 'Cho thử hàng', checked: false},
        ],
        cargoInsurrance: {
          active: false,
          value: '',
        },
        lengh: 1,
        width: 2,
        height: 3
      },
      4: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
      5: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
          {value: 3, label: 'Người gửi cuối tháng trả phí', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        partsign: false,
        packageQuantity: 1,
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
      6: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
      7: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
          {value: 3, label: 'Người gửi cuối tháng trả phí', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        partsign: false,
        packageQuantity: 1,
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
      8: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
          {value: 3, label: 'Người gửi cuối tháng trả phí', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        partsign: false,
        packageQuantity: 1,
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
      9: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
          {value: 3, label: 'Người gửi cuối tháng trả phí', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        partsign: false,
        packageQuantity: 1,
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
      10: {
        payer: [
          {value: 1, label: 'Người nhận', checked: true},
          {value: 2, label: 'Người gửi', checked: false},
          {value: 3, label: 'Người gửi cuối tháng trả phí', checked: false},
        ],
        request: [
          {value: 1, label: 'Cho khách xem hàng', checked: true},
          {value: 2, label: 'Không cho khách xem hàng', checked: false},
        ],
        request_goods: [
          {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
          {value: 6, label: 'Gửi tại bưu cục', checked: false},
        ],
        partsign: false,
        packageQuantity: 1,
        cargoInsurrance: {
          active: false,
          value: '',
        },
      },
    },
    paymentMethod: {
      listType: [
        {id: 1, name: 'Khách hàng thanh toán trước', value: 'before'},
        {id: 2, name: 'Thu COD sau khi giao hàng thành công', value: 'cod'},
        {id: 3, name: 'Thanh toán sau', value: 'after'},
      ],
    },
  },
  printModal: {
    pageSize: {
      list: [
        {
          name: 'Mẫu in ĐVVC',
          value: 'others',
        },
        {
          name: 'Mẫu in evoshop A4',
          value: 'a4',
        },
        {
          name: 'Mẫu in evoshop A5',
          value: 'a5',
        },
        {
          name: 'Mẫu in evoshop K80',
          value: 'k80',
        },
      ],
    },
  },
}
