import { DELIVERY_ICONS } from './_icons'

export const ORDER_BREADCRUMB = [
  { id: 1, name: 'Vận chuyển', url: '#' },
  { id: 2, name: 'Đơn giao hàng', url: '#' },
]

export const DELIVERY_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: DELIVERY_ICONS.repeat,
  },

  {
    id: 3,
    name: 'Thao tác khác',
    appearance: 'secondary',
    // icon: DELIVERY_ICONS.filePlus,
    type: 'dropdown',
    items: [
      { name: 'Lên đơn hàng loạt', url: '/tools/bulks-order' },
      { name: 'Tra cứu hành trình vận đơn', url: '/tools/shipping-tracking' }
    ],
    className: 'delivery-management-table__selected-action-dropdown'
  },
  {
    id: 2,
    name: 'Xuất Excel',
    appearance: 'secondary',
    icon: DELIVERY_ICONS.download,
    onClick: () => console.log('Xuất Excel'),
  },
  {
    id: 4,
    name: 'Tạo đơn hàng',
    appearance: 'primary',
    icon: DELIVERY_ICONS.plus,
    href: '/orders/create',
  },
]

export const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  { id: 1, name: 'delivery_date', value: 'received' },
  { id: 2, name: 'create_order_date', value: 'created' },
]


export const ORDER_FILTER_TAG_FIELDS = [
  'dateTime',
  'source',
]

export const EMPLOYEE_TABLE_THEAD_STATISTIC_FILTER_LIST = [
  { id: 1, name: 'total_revenue', value: 'total_cod' },
  { id: 2, name: 'total_orders', value: 'total_order' },
  { id: 3, name: 'success_rate', value: 'total_rate' },
]