export const ORDER_DETAIL_TAB = {
  order_detail: 1,
  shipping: 2,
  payment: 3,
  order_history: 4
}

export const ORDER_BREADCRUMB = [
  { id: 1, name: 'Đơn hàng', url: '#' },
  { id: 2, name: 'Quản lý đơn hàng', url: '#' },
]
export const StatusOrderDetail = {
  cancel_order: 15,
  cancel_delivery: 7,
  send_daft: 1,
}

export const shippingRequirement = {
  partsign:{ 1: 'Ký nhận 1 phần' },
  payer: { 1: 'Người nhận trả phí',2: 'Người gửi trả phí', 3: 'Người gửi cuối tháng trả phí' },
  request_goods: { 1: 'Đến lấy hàng tại nhà',6: 'Gửi tại bưu cục' },
  recipient_view: { 1: 'Cho khách xem hàng',2: 'Không cho khách xem' }
}
export const orderStatus = {
  GUIDONGIAOHANG: {
    'id': '1',
    'name': 'Gửi đơn giao hàng'
  },
  LAYHANGTHANHCONG: {
    'id': '2',
    'name': 'Lấy hàng thành công'
  },
  DANGVANCHUYEN: {
    'id': '22',
    'name': 'Đang vận chuyển'
  },
  DANGPHATHANG: {
    'id': '3',
    'name': 'Đang phát hàng'
  },
  GIAOHANGTHANHCONG: {
    'id': '4',
    'name': 'Giao hàng thành công'
  },
  KIENVANDE: {
    'id': '23',
    'name': 'Kiện vấn đề'
  },
  CHOCHUYENHOAN: {
    'id': '17',
    'name': 'Chờ chuyển hoàn'
  },
  CHUYENHOAN: {
    'id': '5',
    'name': 'Chuyển hoàn'
  },
  CHUYENHOANTHANHCONG: {
    'id': '6',
    'name': 'Chuyển hoàn thành công'
  },
  CHODOISOAT: {
    'id': '20',
    'name': 'Chờ đối soát'
  },
  DADOISOAT: {
    'id': '19',
    'name': 'Đã đối soát'
  },
  HUYGIAOHANG: {
    'id': '7',
    'name': 'Hủy giao hàng'
  },
  BANTAICUAHANGG: {
    'id': '8',
    'name': 'Bán tại cửa hàng'
  },
  DONNHAP: {
    'id': '21',
    'name': 'Đơn nháp'
  },
  HUY: {
    'id': '15',
    'name': 'Hủy'
  }
}