import { POS_ICON } from './icons'

export const keyboardShortCutLeft = [
  {
    title: 'Thao tác trên đơn hàng',
    content: [
      {
        text: 'Tạo đơn hàng mới',
        icon: 'F1'
      },
      {
        text: 'Tìm kiếm sản phẩm',
        icon: 'F2'
      },
      {
        text: 'Di chuyển lên sản phẩm phía trên khi tìm kiếm',
        icon: POS_ICON.keyboardUp
      },
      {
        text: 'Di chuyển xuống sản phẩm kế tiếp khi tìm kiếm',
        icon: POS_ICON.keyboardDown
      },
      {
        text: 'Thêm sản phẩm vào đơn hàng',
        icon: 'Enter'
      },
      {
        text: 'Đóng danh sách sản phẩm xổ xuống khi tìm kiếm',
        icon: 'Esc'
      },
      {
        text: 'Chuyển đổi hình thức quét mã vạch',
        icon: 'F3'
      },
    ]
  },

  {
    title: 'Thao tác trên sản phẩm',
    content: [
      {
        text: 'Tăng số lượng sản phẩm',
        icon: POS_ICON.keyboardUp
      },
      {
        text: 'Giảm số lượng sản phẩm',
        icon: POS_ICON.keyboardDown
      },
      {
        text: 'Tại ô nhập của sản phẩm hiện tại, di chuyển đến ô nhập số lượng của sản phẩm bên dưới',
        icon: 'Enter'
      },
      {
        text: 'Tại ô nhập của sản phẩm hiện tại, di chuyển đến ô nhập số lượng của sản phẩm bên trên',
        icon: 'Shift'
      },
    ]
  }
]
export const keyboardShortCutRight = [
  {
    title: 'Thao tác chọn khách hàng',
    content: [
      {
        text: 'Tìm khách hàng từ danh sách có sẵn',
        icon: 'F4'
      },
      {
        text: 'Di chuyển lên khách hàng phía trên khi tìm kiếm',
        icon: POS_ICON.keyboardUp
      },
      {
        text: 'Di chuyển xuống khách hàng kế tiếp khi tìm kiếm',
        icon: POS_ICON.keyboardDown
      },
      {
        text: 'Thêm khách hàng vào đơn hàng',
        icon: 'Enter'
      },
    ]
  },

  {
    title: 'Thao tác thanh toán ',
    content: [
      {
        text: 'Nhập giảm giá trên đơn hàng',
        icon: 'F6'
      },
      {
        text: 'Chọn hình thức thanh toán',
        icon: 'F7'
      },
      {
        text: 'Nhập tiền khách đưa',
        icon: 'F8'
      },
      {
        text: 'Thanh toán đơn hàng',
        icon: 'F9'
      },
    ]
  },
  {
    title: 'Thao tác khác',
    content: [
      {
        text: 'Di chuyển sang thông tin tiếp theo',
        icon: 'Tab'
      },
      {
        text: 'Hiển thị chế độ toàn màn hình',
        icon: 'F11'
      },
      {
        text: 'Xoá đơn hàng đang tạo',
        icon: ['Shift', 'Delete']
      },
    ]
  },
]