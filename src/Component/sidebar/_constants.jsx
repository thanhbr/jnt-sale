import {DISPLAY_NAME_MENU} from 'const/display_name_menu'
import {PATH} from 'const/path'
import {ROLE} from 'const/role'
import {SIDEBAR_MENU_ICONS} from './_icons'

export const SIDEBAR_BOTTOM_ITEM = {
  id: 1,
  label: 'Công cụ bổ trợ',
  path: 0,
  role: ROLE.ADMINTRATOR,
  displayIcon: SIDEBAR_MENU_ICONS.assistance,
  extraList: [
    {
      id: 1,
      displayIcon: SIDEBAR_MENU_ICONS.shippingTracking,
      label: 'Hành trình vận đơn',
      path: PATH.TOOL_SHIPPING_TRACKING,
    },
    {
      id: 2,
      displayIcon: SIDEBAR_MENU_ICONS.separateAddress,
      label: 'Tool tách địa chỉ',
      path: PATH.TOOL_ADDRESS_SEPARATION,
    },
    {
      id: 3,
      displayIcon: SIDEBAR_MENU_ICONS.multipleOrder,
      label: 'Lên đơn hàng loạt',
      path: PATH.TOOL_BULK_ORDER,
    },
  ],
  list: [],
}


// const envLive = location.host === 'evoshop.vn'
const envLive = false

export const SIDEBAR_MENU_ITEMS = [
  {
    id: 1,
    label: DISPLAY_NAME_MENU.OVERVIEW,
    path: PATH.ADMIN_DASHBOAR,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.overview,
    list: [],
  },
  {
    id: 2,
    label: DISPLAY_NAME_MENU.PRODUCT,
    path: PATH.PRODUCT_MANAGEMENT,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.product,
    list: [],
  },
  {
    id: 3,
    label: DISPLAY_NAME_MENU.BILL,
    path: null,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.bill,
    list: envLive ?  [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.CREATE_ORDER,
        path: '/orders/create',
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.ORDER_MANAGER,
        path: PATH.ORDER,
      },
    ] : [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.CREATE_ORDER,
        path: '/orders/create',
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.ORDER_MANAGER,
        path: PATH.ORDER,
      },
      {
        id: 3,
        label: DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.HOME,
        path: PATH.GIVE_BACK_PRODUCT,
      },
    ],
  },
  {
    id: 4,
    label: DISPLAY_NAME_MENU.SALES_CHANEL,
    path: null,
    role: ROLE.ADMINTRATOR,
    isNew: true,
    displayIcon: SIDEBAR_MENU_ICONS.saleChanel,
    list: [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.SALE_AT_SHOP,
        path: PATH.POS,
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.FACEBOOK,
        path: PATH.FACEBOOK_CONNECT,
        activeList: [
          '/facebook/conversation-stickers',
          '/facebook/response-content-scripts',
          '/facebook/hide-auto-comments',
          '/facebook/auto-responses',
          '/facebook/livestream-scripts',
          '/facebook/printer-settings',
        ],
      },
      // {
      //   id: 3,
      //   label: DISPLAY_NAME_MENU.MARKET,
      //   isNew: true,
      //   path: PATH.ECOMMERCES,
      // },
    ],
  },
  {
    id: 5,
    label: DISPLAY_NAME_MENU.TRANPORT,
    path: null,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.transport,
    list: [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.TRANPORT_OVERVIEW,
        path: PATH.DELIVERY_OVERVIEW_DASHBOARD,
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.TRANPORTs,
        path: PATH.DELIVERY_MANAGEMENT,
      },
      {
        id: 3,
        label: DISPLAY_NAME_MENU.SIGN_1_PART,
        path: PATH.PART_SIGN,
      },
      {
        id: 4,
        label: DISPLAY_NAME_MENU.SHIPPING_TRACKING,
        path: PATH.SHIPPING_TRACKING,
      }
    ],
  },
  {
    id: 6,
    label: DISPLAY_NAME_MENU.COD_FOR_CONTROL,
    path: null,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.codManager,
    list: [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.COD_MANAGEMENT,
        path: PATH.DELIVERY_COD_MANAGEMENT,
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.FOR_CONTROL_COD,
        path: PATH.FOR_CONTROL_COD,
      },
    ],
  },
  {
    id: 7,
    label: DISPLAY_NAME_MENU.WAREHOUSE,
    path: null,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.warehouse,
    list: [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.LIST_WAREHOUSE,
        path: PATH.WAREHOUSE_MANAGEMENT,
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.INFO,
        path: PATH.WAREHOUSE_PRODUCT,
      },
      {
        id: 3,
        label: DISPLAY_NAME_MENU.IMPORT_GOODS,
        path: PATH.PURCHASE,
      },
      {
        id: 4,
        label: DISPLAY_NAME_MENU.WAREHOUSE_TRANSFER,
        path: PATH.WAREHOUSE_TRANSFER,
      },
      {
        id: 5,
        label: DISPLAY_NAME_MENU.WAREHOUSE_CHECK,
        path: PATH.INVENTORY_CONTROL,
      },
    ],
  },
  {
    id: 8,
    label: DISPLAY_NAME_MENU.ACCOUNTANT,
    path: null,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.accountant,
    list: [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.RECEIPTS_VOUCHER,
        path: PATH.ACCOUNTANT_RECEIPTS,
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.PAYMENT_VOUCHER,
        path: PATH.ACCOUNTANT_PAYMENT,
      },
      {
        id: 3,
        label: DISPLAY_NAME_MENU.CASH_BOOK,
        path: PATH.CASHBOOKS,
      },
      {
        id: 4,
        label: DISPLAY_NAME_MENU.COST_PRICE_UPDATE,
        path: PATH.PRICE_ADJUSTMENT,
      },
    ],
  },
  {
    id: 9,
    label: DISPLAY_NAME_MENU.PARTNER_MANAGER,
    path: null,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.partnerManager,
    list: [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.CUSTOMER,
        path: PATH.CUSTOMER,
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.SUPPLIER,
        path: PATH.SUPLIERS,
      },
      {
        id: 3,
        label: DISPLAY_NAME_MENU.SHIPPING_COMPANY,
        path: PATH.SHIPPING_PARTNER,
      },
    ],
  },
  {
    id: 10,
    label: DISPLAY_NAME_MENU.REPORT,
    path: null,
    role: ROLE.ADMINTRATOR,
    displayIcon: SIDEBAR_MENU_ICONS.report,
    list: [
      {
        id: 1,
        label: DISPLAY_NAME_MENU.WAREHOUSE_REPORT,
        path: PATH.REPORT_WAREHOUSE,
      },
      {
        id: 2,
        label: DISPLAY_NAME_MENU.SALES_REPORT,
        path: PATH.REPORT_SALES,
      },
    ],
  },
]
