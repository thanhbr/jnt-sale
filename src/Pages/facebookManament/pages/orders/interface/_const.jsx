import {PATH} from "../../../../../const/path";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import {ORDER_ICONS} from "../../../../refactorOrder/interfaces/_icons";
import {ICON_ROW_MENU} from "./icon";
import {ActionType} from "../../../../DeliveryNote/store/action";
import {getData} from "../../../../../api/api";
import {getListDeliveryNote} from "../../../../../api/url";

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
        name: null,
        appearance: 'secondary',
        icon: ORDER_ICONS.repeat,
        tooltip:'Làm mới dữ liệu',
    },
]
// const breadCrumbOrder = () => {
//     return (
//         <>
//             <Text>
//                 Mách nhỏ:
//             </Text>
//             <Text >Hãy thiết lập quản lý fanpage trước để chốt đơn nhanh và quản lý hiệu quả hơn</Text>
//         </>
//     )
// }
export const ORDER_TABLE_CELL_PAYMENT_TYPES = {
    danger: 'not_payment',
    success: 'paid_short',
    warning: 'Đã thanh toán một phần',
}
export const ORDER_FILTER_FACE_BOOK = [
    'dateTime',
    'employee',
    'page',
    'post',
    'shippingStatus',
];
export const ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST = [
    {id: 1, name: 'paid_short', value: 'paid'},
    {id: 2, name: 'not_payment', value: 'unpaid'},
    {id: 3, name: '1_part_payment', value: 'partial'},
];
export const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
    {id: 1, name: 'order_date_created', value: 'created'},
    {id: 2, name: 'Ngày gửi đơn', value: 'sended'},
]
export const ORDER_TABLE_ROW_EXTRA_TABS = [
    {id: 1, name: 'Chi tiết đơn hàng', value: 'detail'},
    {id: 2, name: 'Giao hàng', value: 'shipping'},
    {id: 3, name: 'Thanh toán', value: 'payment'},
    {id: 4, name: 'Lịch sử đơn hàng', value: 'history'},
]

export const ORDER_TABLE_ROW_EXTRA_TAB_DETAIL_HEADING_LIST = [
    'Thông tin người bán',
    'Thông tin người nhận',
    'Thông tin khác',
]

export const ORDER_TABLE_ROW_EXTRA_TAB_DETAIL_FIGURE_LIST = [
    {
        id: 1,
        label: 'Điểm gửi hàng:',
        color: THEME_SEMANTICS.delivering,
    },
    {
        id: 2,
        label: 'Tên khách hàng:',
        color: THEME_SEMANTICS.delivering,
    },
    {
        id: 3,
        label: 'Mã đơn hàng riêng:',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 4,
        label: 'Người tạo đơn:',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 5,
        label: 'Địa chỉ:',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 6,
        label: 'Ghi chú đơn hàng:',
        color: THEME_COLORS.secondary_100,
    },
]

export const ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_FIGURE_LIST = [
    {id: 1, name: 'Đơn vị vận chuyển:'},
    {id: 2, name: 'Tiền thu hộ:', tooltip: 'Số tiền cần thu hộ trên đơn hàng'},
    {id: 3, name: 'Yêu cầu lấy hàng:'},
    {id: 4, name: 'Ngày gửi đơn:'},
    {id: 5, name: 'Bảo hiểm hàng hóa:'},
    {id: 6, name: 'Yêu cầu khi giao:'},
    {id: 7, name: 'Người trả phí:'},
]
const fullStatusIdList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '15',
    '17',
    '19',
    '20',
    '21',
    '22',
    '23',
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

    {
        id: 4,
        name: 'Gửi đơn giao hàng',
        icon: ORDER_ICONS.truck,
        inventoryStatus: ['8', '21'],
        noInventoryStatus: ['21'],
        action: 'shipping',
    },
    {
        id: 5,
        name: 'Hủy giao hàng',
        icon: ORDER_ICONS.truckX,
        inventoryStatus: ['1'],
        noInventoryStatus: ['1'],
        action: 'cancel-shipping',
    },
    {
        id: 6,
        name: 'Hủy đơn hàng',
        icon: ORDER_ICONS.packageX,
        inventoryStatus: ['1', '7', '8', '21'],
        noInventoryStatus: ['1', '7', '21'],
        action: 'cancel-order',
    },




]
export const ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS = {
    partSign: {_1: 'Ký nhận 1 phần'},
    payer: {
        _1: 'Người nhận trả phí',
        _2: 'Người gửi trả phí',
        _3: 'Người gửi cuối tháng trả phí',
    },
    requestGoods: {_1: 'Đến lấy hàng tại nhà', _6: 'Gửi tại bưu cục'},
    recipientView: {_1: 'Cho khách xem hàng', _2: 'Không cho khách xem'},
}

export const ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS = {
    PP_PM: 'Người gửi cuối tháng trả phí',
    PP_CASH: 'Người gửi',
    CC_CASH: 'Người nhận',
}

export const ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_PRINT_DATA = [
    {id: 1, name: 'Mẫu ĐVVC', type: 'others', size: ''},
    {id: 2, name: 'Mẫu evoshop A5', type: 'evoshop', size: 'a5'},
    {id: 3, name: 'Mẫu evoshop A4', type: 'evoshop', size: 'a4'},
    {id: 4, name: 'Mẫu evoshop K80', type: 'evoshop', size: 'k80'},
]

export const ORDER_TABLE_ROW_EXTRA_TAB_PAYMENT_SUBMIT_MODAL_FIGURES = [
    {id: 1, name: 'Giá trị đơn hàng', color: THEME_COLORS.secondary_100},
    {id: 2, name: 'Tiền thu hộ', color: THEME_COLORS.secondary_100},
    {id: 3, name: 'paid_short', color: THEME_SEMANTICS.delivered},
    {id: 4, name: 'Còn phải trả', color: THEME_SEMANTICS.failed},
]

export const ORDER_TABLE_THEAD_SELECTED_ACTIONS = [
    {id: 1, name: 'Gửi đơn giao hàng', value: '1'},
    {id: 2, name: 'Hủy giao hàng', value: '7'},
    {id: 3, name: 'Hủy đơn hàng', value: '15'},
]

export const ORDER_TABLE_CELL_SHIPPING_STATUSES = {
    _1: {background: '#EBF5FF', color: '#1A94FF'},
    _2: {background: '#EFFBF4', color: '#33CC70'},
    _3: {background: '#ECF4FE', color: '#0B74E5'},
    _4: {background: '#EBFFF5', color: '#00AB56'},
    _5: {background: '#FFEBF2', color: '#FC5994'},
    _6: {background: '#EBFFF9', color: '#007B56'},
    _7: {background: '#FFEBEB', color: '#FF7471'},
    _8: {background: '#EBFAFF', color: '#038DB2'},
    _15: {background: '#EFF3FB', color: '#7C88A6'},
    _17: {background: '#FFF0EB', color: '#FC4C0A'},
    _19: {background: '#EBFFF4', color: '#007D3A'},
    _20: {background: '#FFF5EB', color: '#FC820A'},
    _21: {background: '#EFF3FB', color: '#7C88A6'},
    _22: {background: '#EBF8FE', color: '#1BACF9'},
    _23: {background: '#FFEBEC', color: '#FF424E'},
}