import {BULK_ORDER_ICONS} from './_icons'

export const BULK_ORDER_CONSTANTS = {
  breadcrumb: [
    {
      id: 1,
      name: 'Công cụ bổ trợ',
      url: '#',
    },
    {id: 2, name: 'Lên đơn hàng loạt', url: '#'},
  ],
  headerActions: [
    {
      id: 1,
      name: 'Tool tách địa chỉ',
      appearance: 'secondary',
      href: '/tools/address-separation',
      icon: BULK_ORDER_ICONS.locationCross,
      props: {
        target: '_blank',
      },
    },
    {
      id: 2,
      name: 'Tải file nhập mẫu',
      appearance: 'secondary',
      href: '/files/excel_bulk_orders_v1.1_transfee.xlsx',
      icon: BULK_ORDER_ICONS.download01,
      props: {
        download: 'excel_bulk_orders_v2',
      },
    },
    {
      id: 3,
      name: 'Thực hiện lên đơn hàng loạt',
      href: '/tools/bulks-order/create',
      icon: BULK_ORDER_ICONS.filePlus02,
    },
  ],
}

export const BULK_ORDER_CREATE_CONSTANTS = {
  breadcrumb: [
    {
      id: 1,
      name: 'Quay lại danh sách',
      url: '/tools/bulks-order',
      isBack: true,
    },
  ],
  headerActions: [
    {
      id: 1,
      name: 'Tool tách địa chỉ',
      appearance: 'secondary',
      href: '/tools/address-separation',
      icon: BULK_ORDER_ICONS.locationCross,
    },
  ],
  headerDetailActions: [
    {
      id: 1,
      name: 'Tool tách địa chỉ',
      appearance: 'secondary',
      href: '/tools/address-separation',
      icon: BULK_ORDER_ICONS.locationCross,
      props: {
        target: '_blank',
      },
    },
    {
      id: 2,
      name: 'Tải file nhập mẫu',
      appearance: 'secondary',
      href: '/files/excel_bulk_orders_v1.1_transfee.xlsx',
      icon: BULK_ORDER_ICONS.download01,
      props: {
        download: 'excel_bulk_orders_v2',
      },
    },
    {
      id: 3,
      name: 'Tải lên file lên đơn khác',
      href: '/tools/bulks-order/create',
      icon: BULK_ORDER_ICONS.filePlus02,
    },
  ],
  bodyActions: [
    {
      id: 1,
      title: 'Tải lên tệp',
      banner: '/img/bulks-order/body-action-banner.png',
      description:
        'Tải lên file thông tin đơn hàng theo mẫu Evoshop để bắt đầu thực hiện lên đơn hàng loạt.',
      buttonProps: {
        children: 'Tải lên file lên đơn',
      },
    },
    {
      id: 2,
      title: 'Tải xuống mẫu',
      banner: '/img/bulks-order/body-action-banner.png',
      description:
        'Tải xuống file mẫu lên đơn hàng loạt và nhập dữ liệu theo mẫu để thực hiện tải file lên đơn.',
      buttonProps: {
        children: 'Tải xuống file mẫu',
        download: 'excel_bulk_orders_v2',
        href: '/files/excel_bulk_orders_v1.1_transfee.xlsx',
      },
    },
  ],
  importFileModal: {
    columnNames: [
      'Mã đơn hàng riêng',
      'Tên người nhận (*)',
      'Điện thoại (*)',
      'Địa chỉ (*)',
      'Tỉnh/Thành phố',
      'Quận/huyện',
      'Phường/xã',
      'Tên hàng hóa (*)',
      'Giá trị hàng hóa\n(Nhập nếu mua bảo hiểm)',
      'Tiền thu hộ\n(COD)',
      'Trọng lượng\n(kg) (*)',
      'Kích thước',
      null,
      null,
      'Số kiện hàng (*)',
      'Phí giao hàng hộ',
      'Ghi chú',
    ],
    startRowNumber: 6,
  },
  printModal: {
    pageSize: {
      list: [
        {
          name: 'Mẫu in evoshop K80',
          value: 'k80',
          id: 4,
        },
        {
          name: 'Mẫu in evoshop A4',
          value: 'a4',
          id: 2,
        },
        {
          name: 'Mẫu in evoshop A5',
          value: 'a5',
          id: 3,
        },
        {
          name: 'Mẫu đơn vị vận chuyển',
          value: 'others',
          id: 1,
        },
      ],
    },
  },
}
