import { Text } from "../../../../../common/text";
import { ORDER_ICONS } from "../../../../refactorOrder/interfaces/_icons";

export const LIVESTREAM_STATUS = [
    {value: 1, name: 'Đã truy cập'},
    {value: 0, name: 'Chưa truy cập'},
]

export const HEADER_FACE_BOOK_ORDERS = [
    {
        id: 1,
        name: <>
            <Text fontWeight={600}>
                Mách nhỏ:
            </Text>
            <Text> Hãy thiết lập quản lý fanpage trước để chốt đơn nhanh và quản lý hiệu quả hơn</Text>
        </> ,
        url: ''
    },
]
export const HAEDER_ACTION_BUTTON=[
    {
        id: 1,
        name: 'Đồng bộ livestream mới nhất',
        appearance: 'secondary',
        icon: ORDER_ICONS.repeat,
        tooltip:'Làm mới dữ liệu',
    },
    {
        id: 2,
        name: 'Quản lý kịch bản livestream',
        appearance: 'primary',
        href: '/facebook/livestream-scripts',
      },
]
export const ORDER_FILTER_FACE_BOOK = [
    'dateTime',
    'status'
];
export const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
    {id: 1, name: 'Ngày tạo', value: 'created'},
]
export const ORDER_TABLE_ROW_EXTRA_TABS = [
    {id: 1, name: 'Chi tiết đơn hàng', value: 'detail'},
    {id: 2, name: 'Giao hàng', value: 'shipping'},
    {id: 3, name: 'Thanh toán', value: 'payment'},
    {id: 4, name: 'Lịch sử đơn hàng', value: 'history'},
]
export const ORDER_TABLE_ROW_MENU_POPOVER = [
    {
        id: 1,
        name: 'Chỉnh sửa',
        icon: ORDER_ICONS.edit05,
        inventoryStatus: ['1', '8', '21'],
        // isDeveloping: true,
        noInventoryStatus: ['1', '21','8'],
        action: 'edit',
    },
]

export const ORDER_TABLE_THEAD_SELECTED_ACTIONS = [
    {id: 1, name: 'Chưa truy cập', value: '1'},
    {id: 2, name: 'Đã truy cập', value: '7'},
    {id: 3, name: 'Đã kết thúc', value: '15'},
]

export const ORDER_TABLE_CELL_SHIPPING_STATUSES = {
    _1: {background: '#FFEBEC', color: '#FF424E'},
    _2: {background: '#E6FFF2', color: '#00AB56'},
    _3: {background: '#EFF3FB', color: '#7C88A6'},
}