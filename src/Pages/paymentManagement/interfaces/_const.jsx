import {ICONS} from "../../customer/_icons";
import {PAYMENT_MANAGEMENT_ICONS} from "./icon"
export const PAYMENT_MANAGEMENT_BREADCRUMB = [
    {id: 1, name: "Kế toán", url: '#'},
    {id: 2, name: "Phiếu chi", url: '#'},
]
export const PAYMENT_MANAGEMENT_HEADER_ACTIONS = [
    {
        id: 1,
        name: null,
        appearance: 'secondary',
        icon: ICONS.reload,
    },
    {
        id: 2,
        name: "Tạo phiếu chi",
        appearance: 'primary',
        icon: ICONS.plus,
    },
]
export const PAYMENT_MANAGEMENT_TABLE_HEADER = [
    {id : 1, name:'Mã phiếu chi'},
    {id : 2, name:'Loại phiếu chi'},
    {id : 3, name:'Nhóm người nhận'},
    {id : 4, name:'Người nhận'},
    {id : 5, name:'Giá trị chi'},
    {id : 6, name:'Phương thức thanh toán'},
    {id : 6, name:'Trạng thái'},
]
export const PAYMENT_MANAGEMENT_TABLE_THEAD_PAYMENT_FILTER_LIST = [
    { id: 1, name: 'Hoàn thành', value: '1' },
    { id: 2, name: 'Hủy', value: '2' },
]

export const PAYMENT_TYPE_CREATE_BREAD_CRUMB = [
    {
        id: 1,
        name: 'Kế toán',
        url: '#',
    },
    {id: 2, name: 'Phiếu chi', url: '#'},
    {id: 3, name: 'Tạo mới phiếu chi', url: '#'},
]
export const RECIPIENT_GROUP_TYPE = [
    'customer',
    'supplier',
    'user',
    'partner_ship',
    'other',
]
export const CREATE_PAYMENT_FORM_VALIDATE ={
    paymentCode:{
        MAX:'Mã phiếu chi chỉ được phép nhập tối đa 50 ký tự.',
        VALID:'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt',
    },
    paymentValue:{
        MAX:'Mã phiếu chi chỉ được phép nhập tối đa 50 ký tự.',
        VALID:'Giá trị chi cần > 0',
        EMPTY:'Giá trị chi không được để trống.'
    },
    description:{
        MAX:'Mô tả chỉ được phép nhập tối đa 255 ký tự'
    },
    other:{
        EMPTY:'Người nhận không được để trống.',
        MAX:'Người nhận chỉ được phép nhập tối đa 50 ký tự'
    }
}
export const PAYMENT_TYPE_MODAL_HEADER_TITLE = {
    title: 'Thông tin loại phiếu chi',
    subTitle: '“Giúp bạn quản lý các nguồn chi phí trong hoạt động kinh doanh”',
}
export const PAYMENT_METHODS_MODAL_HEADER_TITLE = {
    title: 'Thông tin phương thức thanh toán',
    subTitle: '“Sử dụng khi bạn thực hiện thanh toán mua/bán hàng”',
}
export const ICON_PAYMENT_MANAGEMENT={
    link:(
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 6.5L14 2.5M14 2.5H10M14 2.5L8.66667 7.83333M6.66667 3.83333H5.2C4.0799 3.83333 3.51984 3.83333 3.09202 4.05132C2.71569 4.24307 2.40973 4.54903 2.21799 4.92535C2 5.35318 2 5.91323 2 7.03333V11.3C2 12.4201 2 12.9802 2.21799 13.408C2.40973 13.7843 2.71569 14.0903 3.09202 14.282C3.51984 14.5 4.0799 14.5 5.2 14.5H9.46667C10.5868 14.5 11.1468 14.5 11.5746 14.282C11.951 14.0903 12.2569 13.7843 12.4487 13.408C12.6667 12.9802 12.6667 12.4201 12.6667 11.3V9.83333" stroke="#1A94FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    ),
    unitOpacity:(
        <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.44531 10.1367C4.46387 10.1367 5.25684 9.62402 5.70117 8.79688H5.72852V10H6.91797V1.94727H7.75195V1.09961H6.91797V0.135742H5.72852V1.09961H4.36133V1.94727H5.72852V4.08008H5.70117C5.25684 3.25977 4.42969 2.75391 3.4248 2.75391C1.64062 2.75391 0.423828 4.19629 0.423828 6.43848V6.44531C0.423828 8.6875 1.62695 10.1367 3.44531 10.1367ZM3.67773 9.08398C2.41992 9.08398 1.64062 8.0791 1.64062 6.44531V6.43848C1.64062 4.81836 2.41992 3.80664 3.67773 3.80664C4.87402 3.80664 5.73535 4.85254 5.73535 6.43848V6.44531C5.73535 8.03809 4.88086 9.08398 3.67773 9.08398Z" fill="#7C88A6"/>
            <path d="M0 12.5293H8.02539V13.3496H0V12.5293Z" fill="#7C88A6"/>
        </svg>

    ),
    unit:(
        <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.44531 10.1367C4.46387 10.1367 5.25684 9.62402 5.70117 8.79688H5.72852V10H6.91797V1.94727H7.75195V1.09961H6.91797V0.135742H5.72852V1.09961H4.36133V1.94727H5.72852V4.08008H5.70117C5.25684 3.25977 4.42969 2.75391 3.4248 2.75391C1.64062 2.75391 0.423828 4.19629 0.423828 6.43848V6.44531C0.423828 8.6875 1.62695 10.1367 3.44531 10.1367ZM3.67773 9.08398C2.41992 9.08398 1.64062 8.0791 1.64062 6.44531V6.43848C1.64062 4.81836 2.41992 3.80664 3.67773 3.80664C4.87402 3.80664 5.73535 4.85254 5.73535 6.43848V6.44531C5.73535 8.03809 4.88086 9.08398 3.67773 9.08398Z" fill="#00081D"/>
            <path d="M0 12.5293H8.02539V13.3496H0V12.5293Z" fill="#00081D"/>
        </svg>

    )
}
export const PAYMENT_MANAGEMENT_FILTER_FORM_DATE_TIME_SORT_TYPES = [
    {id: 1, name: 'Ngày tạo phiếu', value: 'created'},
]
export const PAYMENT_MANAGEMENT_TABLE_ROW_MENU_POPOVER = [
    {
        id: 1,
        name: 'In phiếu chi',
        icon: PAYMENT_MANAGEMENT_ICONS.print,
        // isDeveloping: true,
        action: 'print',
    },
    {
        id: 2,
        name: 'Hủy phiếu chi',
        icon: PAYMENT_MANAGEMENT_ICONS.circle_remove,
        // isDeveloping: true,
        action: 'cancel',
    },
]
export const PAYMENT_MANAGEMENT__TABLE_ROW_EXTRA_TABS = [
    {id: 1, name: 'Chi tiết phiếu chi', value: 'detailDelivery'},
]
export const PAYMENT_MANAGEMENT_TABLE_THEAD_STATUS_FILTER_LIST = [
    {id: 1, name: 'Hoàn thành', value: '1'},
    {id: 2, name: 'Hủy', value: '2'},
]
export const PAYMENT_MANAGEMENT_FILTER_FORM_GROUP_SUBMITTER = [
    {id: 1, code: '', name: 'Tất cả nhóm người nhận'},
    {id: 1, code: 'supplier', name: 'Nhà cung cấp'},
    {id: 2, code: 'customer', name: 'Khách hàng'},
    {id: 3, code: 'user', name: 'Nhân viên'},
    {id: 4, code: 'partner_ship', name: 'Đối tác vận chuyển'},
    {id: 5, code: 'other', name: 'Đối tượng khác'}
]