export const SINGLE_ADDRESS_BREADCRUMB = [
  {
    id: 1,
    name: 'Quay lại danh sách',
    url: '/tools/address-separation',
    isBack: true,
  },
]

export const SINGLE_ADDRESS_DEFAULT_TAB = 'success'

export const SINGLE_ADDRESS_TABS = [
  {id: 1, name: 'Tách thành công', value: SINGLE_ADDRESS_DEFAULT_TAB},
  {id: 2, name: 'Tách thất bại', value: 'failed'},
]

export const SINGLE_REDUCER_EXPORT_POPOVER = [
  {id: 1, name: 'Xuất tất cả', type: 0},
  {
    id: 2,
    name: 'Xuất đơn tách thành công',
    type: 1,
  },
  {
    id: 3,
    name: 'Xuất đơn tách thất bại',
    type: 2,
  },
]
