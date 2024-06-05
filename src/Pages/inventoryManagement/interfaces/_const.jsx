import {ORDER_ICONS} from "../../refactorOrder/interfaces/_icons";
import {INVENTORY_ICON} from "./icon";
import {PATH} from "../../../const/path";
import {THEME_SEMANTICS} from "../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../common/theme/_colors";

export const INVENTORY_BREADCRUMB = [
    {id: 1, name: 'Kho', url: '#'},
    {id: 2, name: 'Kiểm kho', url: '#'},
]

export const INVENTORY_PAGE_HEADER_ACTIONS = [
    {
        id: 1,
        name: null,
        appearance: 'secondary',
        icon: ORDER_ICONS.repeat,
    },
    {
        id: 2,
        name: 'Tạo phiếu kiểm kho bằng Excel',
        appearance: 'secondary',
        icon: INVENTORY_ICON.import,
    },
    {
        id: 3,
        name: 'Thêm mới',
        appearance: 'primary',
        href:PATH.INVENTORY_CREATE,
        icon: INVENTORY_ICON.plus,
    },
]
export const INVENTORY_FILTER_TAG_FIELDS = [
    'dateTime',
    'employee',
    'shippingStatus',
    'warehouse_id',
]
export const INVENTORY_TABLE_CELL_SHIPPING_STATUSES = {
    _1: {background: '#FFF0EB', color: '#FC4C0A',title:'Đang kiểm kho'},
    _2: {background: '#EBFFF5', color: '#00AB56',title:'Đã kiểm kho'},
    _3: {background: '#EFF3FB', color: '#7C88A6',title:'Hủy'},

}
export const INVENTORY_TABLE_ROW_EXTRA_TABS = [
    {id: 1, name: 'Chi tiết đơn hàng', value: 'detail'},
]

export const INVENTORY_TABLE_ROW_EXTRA_TAB_DETAIL_HEADING_LIST = [
    'Thông tin tạo phiếu',
    'Thông tin cập nhật',
    'Thông tin cân bằng kho',
]
export const INVENTORY_TABLE_ROW_EXTRA_TAB_DETAIL_FIGURE_LIST = [
    {
        id: 1,
        label: 'Nhân viên tạo:',
        color: THEME_SEMANTICS.delivering,
    },
    {
        id: 2,
        label: 'Nhân viên cập nhật:',
        color: THEME_SEMANTICS.delivering,
    },
    {
        id: 3,
        label: 'Nhân viên cân bằng kho:',
        color: THEME_SEMANTICS.delivering,
    },
    {
        id: 4,
        label: 'Ngày tạo:',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 5,
        label: 'Ngày cập nhật:',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 6,
        label: 'Ngày cân bằng kho:',
        color: THEME_COLORS.secondary_100,
    },
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
export const INVENTORY_TABLE_ROW_MENU_POPOVER = [
    {
        id: 1,
        name: 'Chỉnh sửa',
        icon: ORDER_ICONS.edit05,

    },

    {
        id: 2,
        name: 'Cân bằng kho',
        icon: INVENTORY_ICON.balance,

    },
    {
        id: 4,
        name: 'In phiếu kiểm kho',
        icon: ORDER_ICONS.printer,

    },
    {
        id: 5,
        name: 'Hủy phiếu kiểm',
        icon: INVENTORY_ICON.cancel,
        isDanger:true,
    },

];
    export const IMPORT={
    label:'IMPORT'
};
export const INVENTORY_COLUMN_NAMES = {
    importFileModal: {
        columnNames: [
            'STT',
            'Mã sản phẩm(*)',
            'Tên sản phẩm',
            'Số lượng thực tế (*)',
            'Lý do',
        ],
        startRowNumber: 4,
    },
};
export const STATUS_INVENTORY = {
    'dang_kiem_kho':{
        status: 1,
    }
}