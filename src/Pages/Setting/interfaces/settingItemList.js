import { PATH } from "const/path"
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const settingItemList = [
    { title: DISPLAY_NAME_MENU.PRODUCT_PAGE.GROUP_PRODUCT, url: PATH.PRODUCT_GROUP, imageURL: '/img/setting/images/product_group.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.PRODUCT_CATEGORY_SUBTITLE},
    { title: DISPLAY_NAME_MENU.GENERAL.UNIT, url: PATH.UNITS_MANAGE, imageURL: '/img/setting/images/unit.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.UNIT_SUBTITLE},
    { title: DISPLAY_NAME_MENU.GENERAL.GROUP_CUSTOMER, url: PATH.GROUP_CUSTOMER, imageURL: '/img/setting/images/customer_group.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.GROUP_CUSTOMER_SUBTITLE},
    { title: DISPLAY_NAME_MENU.GENERAL.PAYMENT_METHOD, url: PATH.PAYMENT_METHOD, imageURL: '/img/setting/images/payment_method.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.PAYMENT_METHOD_SUBTITLE},
    { title: DISPLAY_NAME_MENU.GENERAL.SOURCE_ORDER, url: PATH.ORDER_ORIGIN, imageURL: '/img/setting/images/order_origin.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.SOURCE_ORDER_SUBTITLE},
    { title: DISPLAY_NAME_MENU.GENERAL.DELIVERY_POINT, url: PATH.CONSIGNMENT, imageURL: '/img/setting/images/consignment.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.DELIVERY_POINT_SUBTITLE},
    { title: DISPLAY_NAME_MENU.GENERAL.TYPE_OF_RECEIPT, url: PATH.TYPE_RECEIPT, imageURL: '/img/setting/images/receipt.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.TYPE_OF_RECEIPT_SUBTITLE},
    { title: DISPLAY_NAME_MENU.GENERAL.TYPE_OF_PAYMENT, url: PATH.SETTING_TYPE_PAYMENT, imageURL: '/img/setting/images/payment.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.PAYMENT_METHOD_SUBTITLE},
]
export default settingItemList;
export const settingUserList = [
    { title: DISPLAY_NAME_MENU.GENERAL.USER_MANAGEMENT, url: PATH.USER, imageURL: '/img/setting/images/user_manager.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.USER1_SUBTITLE},
    { title: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.ROLE_TITLE, url: PATH.USER_ROLE, imageURL: '/img/setting/images/user_role.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.ROLE_SUBTITLE},
]
export const settingDeliveryList = [
    { title: DISPLAY_NAME_MENU.GENERAL.PRINTED_FORM, url: PATH.PRINT_TEMPLATE_SETTING, imageURL: '/img/setting/images/print_template.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.PRINT_FORM},
    { title: DISPLAY_NAME_MENU.GENERAL.DELIVERY_NOTE_FORM, url: PATH.DELIVERY_NOTE, imageURL: '/img/setting/images/delivery_note.svg', description: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.DELIVERY_NOTE_FORM},
]
export const breadcrumbSetting=[
    {id:1, name: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.HEADER, url: ''}
]