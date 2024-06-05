import {ORDER_ICONS} from "../../refactorOrder/interfaces/_icons";
import {ICON} from "./_icon";
import {THEME_SEMANTICS} from "../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../common/theme/_colors";

export const SUPPLIER_HEADER=[
    {id: 1, name: 'Quản lý đối tác', url:'#'},
    {id: 2, name: 'Nhà cung cấp', url: '#'}
]
export const SUPPLIER_BUTTON_ACTION = [
    {
        id: 1,
        name: null,
        appearance: 'secondary',
        icon: ORDER_ICONS.repeat,
        tooltip: 'Làm mới dữ liệu',
    },

    {
        id: 3,
        name: 'Thêm mới',
        appearance: 'primary',
        icon: ORDER_ICONS.plus,
    },
];
export const SUPPLIER_TABLE_HEADER=[
    {id:1, name:'Mã nhà cung cấp',class:'supplier-management-table_code-supplier'},
    {id:2, name:'Tên nhà cung cấp',class:'supplier-management-table_name-supplier'},
    {id:3, name:'Địa chỉ liên hệ',class:'supplier-management-table_address-supplier'},
    {id:4, name:'Điện thoại',class:'supplier-management-table_phone-supplier'},
    {id:5, name:'Ghi chú',class:'supplier-management-table_note-supplier'},
    {id:6, name:'Trạng thái sử dụng',class:'supplier-management-table_status-supplier'},
]
export const SUPPLIER_MODAL_HEADER_TITLE = {
    title: 'Thông tin nhà cung cấp',
    subTitle: '“Quản lý thông tin các đối tác cung cấp hàng hóa cho cửa hàng của bạn”',
}
export const SUPPLIER_ACTION_DROP_DOWN = [
    { id: '1', name: 'Chỉnh sửa', icon: ICON.edit, action: 1 },
    { id: '2', name: 'Xóa', icon: ICON.delete, action: 2 ,isDanger:true},

]
export const TAB_SUPPLIER_DETAIL=[
    {id:1,name:'Chi tiết nhà cung cấp',value:'supplierDetails'},
    {id:2,name:'Lịch sử nhập hàng',value:'supplierHistory'}
]
export const DETAIL_TABLE_HEADING_LIST = [
    'Thông tin nhà cung cấp',
    '',
]
export const DETAIL_TABLE_FIGURE_LIST = [
    {
        id: 1,
        label: 'Tên viết tắt',
        color: THEME_SEMANTICS.delivering,
    },
    {
        id: 2,
        label: 'Địa chỉ liên hệ',
        color: THEME_SEMANTICS.delivering,
    },
    {
        id: 3,
        label: 'Tên người liên hệ',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 4,
        label: 'Email',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 5,
        label: 'Số điện thoại',
        color: THEME_COLORS.secondary_100,
    },
    {
        id: 6,
        label: 'Ghi chú',
        color: THEME_COLORS.secondary_100,
    },

];
export const   PURCHASE_TABLE_HEADER=[
    {id:1,label:'Mã phiếu nhập hàng',class:'supplier-management_purchase-code-head'},
    {id:2,label:'Ngày tạo phiếu',class:'supplier-management_purchase-date-head'},
    {id:5,label:'SL nhập kho',class:'supplier-management_purchase-total-head'},
    {id:6,label:'SL chưa nhập',class:'supplier-management_purchase-empty-head'},
    {id:3,label:'Giá trị hàng nhập',class:'supplier-management_purchase-supplier-head'},
]
export const PAYMENT_STATUS = [
    'not_payment',
    '1_part_payment',
    'paid_short',
    '1_part_back_payment',
    'fully_refunded'
]
