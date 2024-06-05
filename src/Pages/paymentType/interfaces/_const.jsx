import {ICONS} from "../../customer/_icons";
import {ORDER_ICONS} from "../../refactorOrder/interfaces/_icons";
import {ICON} from "../../supplierManagement/interfaces/_icon";

export const PAYMENT_TYPE_BREADCRUMB = [
    {id: 1, name: "Cấu hình & cài đặt", url: '#'},
    {id: 2, name: "Loại phiếu chi", url: '#'},
]
export const PAYMENT_TYPE_MODAL_HEADER_TITLE = {
    title: 'Thông tin loại phiếu chi',
    subTitle: '“Giúp bạn quản lý các nguồn chi phí trong hoạt động kinh doanh”',
}
export const PAYMENT_TYPE_HEADER_ACTIONS = [
    {
        name: null,
        appearance: 'secondary',
        icon: ICONS.reload,
    },
    {
        name: "Thêm mới",
        appearance: 'primary',
        icon: ICONS.plus,
    },
]
export const PAYMENT_TYPE_TABLE_HEADER = [
    {id : 1, name:'Mã loại phiếu chi'},
    {id : 1, name:'Tên loại phiếu chi'},
    {id : 1, name:'Mô tả'},
    {id : 1, name:'Trạng thái'},

]
export const PAYMENT_TYPE_ROW_MENU = [
    {id:1,name:'Chỉnh sửa', icon: ORDER_ICONS.edit05,},
    {id:2,name:'Xóa',icon:ICON.delete,isDanger:true},
]
export const VALIDATE_VALUE = {
    val_name:{
        EMPTY:'Tên loại phiếu chi không được để trống.',
        MAX:'Tên loại phiếu chi chỉ được phép nhập 30 ký tự.'
    },
    val_code:{
        VALID:'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt',
        MAX:'Mã loại loại phiếu chi chỉ được phép nhập 50 ký tự.'
    },
    val_description:{
        MAX:'Mô tả chỉ được phép nhập 255 ký tự.'
    },
}