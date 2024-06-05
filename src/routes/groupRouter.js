import { PATH } from '../const/path'
import { InventoryInformation } from '../Pages/inventoryInformation'
import { WareHouseTransfer } from '../Pages/WareHouseTransfer'
import WarehouseManagement from '../Pages/WarehouseManagement'
import { CreateWarehouseTransfer } from '../Pages/CreateWarehouseTransfer'
import { PurchasesManagement } from '../Pages/purchases'
import { CreatePurchases } from '../Pages/purchases/create'
import { EditPurchases } from '../Pages/purchases/create/edit'
import { RefundPurchases } from '../Pages/purchases/create/refund'
import { PageFacebookFanpage } from '../Pages/facebookManament/pages/fanpage'
import { PageFacebookResponseContentScript } from '../Pages/facebookManament/pages/responseContentScript'
import { PageFacebookHideAutoComment } from '../Pages/facebookManament/pages/hideAutoComment'
import { PageFacebookAutoResponses } from '../Pages/facebookManament/pages/autoResponses'
import CreateAutoResponses from '../Pages/facebookManament/pages/autoResponses/create'
import { PageFacebookConversationStickers } from '../Pages/facebookManament/pages/conversationStickers'
import { PageFacebookLivestreamScript } from '../Pages/facebookManament/pages/livestreamScript'
import { PageFacebookLivestreamScriptSingle } from '../Pages/facebookManament/pages/livestreamScript/single'
import { PrintConfig } from '../Pages/facebookManament/pages/printConfig'
import { FacebookConversation } from '../Pages/facebookManament/pages/conversation'
import { FacebookOrders } from '../Pages/facebookManament/pages/orders'
import { FacebookLivestream } from '../Pages/facebookManament/pages/livestream'
import { FacebookLiveStreamDetail } from '../Pages/facebookManament/pages/livestreamDetail'
import { Customer } from '../Pages/customer'
import CreateCustomer from '../Pages/customer/CreateCustomer/createCustomer'
import EditCustomer from '../Pages/customer/EditCustomer'
import SupplierManagement from '../Pages/supplierManagement'
import { ShippingPartner } from '../Pages/ShippingPartner'
import { PageBulkOrder } from '../Pages/bulkOrder'
import { PageBulkOrderCreate } from '../Pages/bulkOrder/pages/create'
import { AddressSeparationTool } from '../Pages/addressSeparationTool'
import { AddressSeparationSingleFile } from '../Pages/addressSeparationTool/fileId'
import { ShippingTracking } from '../Pages/shippingTracking'
import { DeliveryManagement } from '../Pages/deliveryManagement'
import { PartSign } from '../Pages/partSign'
import ComingSoon from '../Pages/comingSoon'
import { CodManagement } from '../Pages/CodManagement'
import { ShippingTrackingManagement } from '../Pages/shippingTrackingManagement'
import { DeliveryOverview } from '../Pages/deliveryOverview'
import CreateProduct from '../Pages/product/createProduct'
import { RefactorOrder } from '../Pages/refactorOrder'
import { OrderOrigin } from '../Pages/OrderOrigin'
import { PageOrderSingle } from '../Pages/orderSingle'
import { PageEditOrderSingle } from '../Pages/orderSingle/editOrder'
import ProductGroup from '../Pages/productGroup'
import UnitsManage from '../Pages/UnitsManage'
import { GroupCustomer } from '../Pages/GroupCustomer'
import { UserPage } from '../Pages/userManagement'
import { CreateUser } from '../Pages/userManagement/createUser'
import { PaymentMethod } from '../Pages/paymentsMethod'
import { UserRole } from '../Pages/userRole'
import { UserRoleCreate } from '../Pages/userRole/create'
import PrintBarcode from '../Pages/product/printBarcode'
import ProductPage from '../Pages/product'
import Consignment from '../Pages/Consignment'
import DeliveryNote from '../Pages/DeliveryNote'
import PrintTemplate from '../Pages/PrintTemplate'
import Setting from '../Pages/Setting'
import CreateGiveBackProductPage from "../Pages/giveBackProduct/createOrder";
import GiveBackProductPage from "../Pages/giveBackProduct";
import InventoryManagement from "../Pages/inventoryManagement"
import {PageInventorySingle} from "../Pages/createInventory"
import { EvoPolicy } from '../Pages/policy'
import ReceiptManagement from "../Pages/receiptManagement";
import ReceiptCreate from "../Pages/receiptManagement/components/createReceipt";
import TypeOfReceipt from "../Pages/typeOfReceipt";
import { ReportWarehouseManagement } from '../Pages/Report/Warehouse/index'
import { ImportWarehouse } from '../Pages/Report/Warehouse/Pages/Import'
import ReportInventory from '../Pages/Report/Warehouse/Pages/Inventory'
import { ImportExportWarehouse } from '../Pages/Report/Warehouse/Pages/ImportExport'
import ReportBelowQuota from '../Pages/Report/Warehouse/Pages/BelowQuota'
import { TransferWarehouse } from '../Pages/Report/Warehouse/Pages/Transfer'
import { ReportSaleManagement } from '../Pages/Report/Sales/index'
import { ReportSaleOverview } from '../Pages/Report/Sales/Pages/Overview'
import { ReportEmployee } from '../Pages/Report/Sales/Pages/Employee'
import { ReportOrderOrigin } from '../Pages/Report/Sales/Pages/OrderOrigin'
import { ReportLocation } from '../Pages/Report/Sales/Pages/Location'
import { ReportCustomer } from '../Pages/Report/Sales/Pages/Customer'
import { ReportProductRevenue } from '../Pages/Report/Sales/Pages/ProductRevenue'
import { OrderRevenue } from '../Pages/Report/Sales/Pages/OrderRevenue'

import { PaymentType } from '../Pages/paymentType/index'
import { PaymentManagement } from '../Pages/paymentManagement'
import CreatePayment from '../Pages/paymentManagement/component/createPayment/index'
import CapitalAdjustment from "../Pages/capitalPriceAdjustment";
import CreateCapitalAdjustment from "../Pages/capitalPriceAdjustment/component/createCapital/index"
import { CashBooks } from 'Pages/CashBooks'

import { ForControlCOD } from '../Pages/ForControlCOD'

import { MiniGame } from 'Pages/facebookManament/pages/minigame/component/body'
import { PosOrder } from '../Pages/Pos'
import { ReportShippingDifference } from '../Pages/Report/Sales/Pages/shippingDifference'
import { ReportShippingDifferenceEmployee } from '../Pages/Report/Sales/Pages/shippingDifferenceEmployee'
import Feedback from "../Pages/feedback";

// const envLive = (location.host === 'banhang.upos.vn') || (location.host === 'evoshop.vn')
const envLive = false

export const warehouseRoute = [
  { path: PATH.WAREHOUSE_PRODUCT, component: InventoryInformation },
  { path: PATH.WAREHOUSE_MANAGEMENT, component: WarehouseManagement },
  { path: PATH.WAREHOUSE_TRANSFER, component: WareHouseTransfer },
  { path: PATH.WAREHOUSE_TRANSFER_CREATE, component: CreateWarehouseTransfer },

  { path: PATH.PURCHASE, component: PurchasesManagement },
  { path: PATH.PURCHASE_CREATE, component: CreatePurchases },
  { path: PATH.PURCHASE_EDIT, component: EditPurchases },
  { path: PATH.PURCHASE_REFUND, component: RefundPurchases },


  // path inventory management
  {path:PATH.INVENTORY_MANAGEMENT,component: InventoryManagement},
  {path:PATH.INVENTORY_CREATE,component: PageInventorySingle},
  {path:PATH.INVENTORY_EDIT,component: PageInventorySingle},
  { path: PATH.INVENTORY_CONTROL, component: InventoryManagement },
]

export const partnerRoute = [
  { path: PATH.CUSTOMER, component: Customer },
  { path: PATH.CREATE_CUSTOMER, component: CreateCustomer },
  { path: PATH.EDIT_CUSTOMER, component: EditCustomer },

  { path: PATH.SUPLIERS, component: SupplierManagement },
  { path: PATH.SHIPPING_PARTNER, component: ShippingPartner },
]

export const addOnToolRoute = [
  { path: PATH.TOOL_BULK_ORDER, component: PageBulkOrder },
  { path: PATH.TOOL_BULK_ORDER_CREATE, component: PageBulkOrderCreate },

  { path: PATH.TOOL_ADDRESS_SEPARATION, component: AddressSeparationTool },
  { path: PATH.TOOL_ADDRESS_SEPARATION_FILE, component: AddressSeparationSingleFile },

  { path: PATH.TOOL_SHIPPING_TRACKING, component: ShippingTracking },
  {path: PATH.FEEDBACK, component: Feedback},
]

export const deliveryRoute = [
  { path: PATH.DELIVERY_MANAGEMENT, component: DeliveryManagement },
  { path: PATH.PART_SIGN, component: PartSign },
  { path: PATH.DELIVERY_OVERVIEW, component: DeliveryOverview },
  { path: PATH.DELIVERY_COD_MANAGEMENT, component: CodManagement },
  { path: PATH.SHIPPING_TRACKING, component: ShippingTrackingManagement },
  { path: PATH.DELIVERY_OVERVIEW_DASHBOARD, component: DeliveryOverview },
  { path: PATH.DELIVERY_COD_CHECK, component: ComingSoon },
  {path: PATH.FOR_CONTROL_COD, component: ForControlCOD},
]

export const cashBookRoute = [
  { path: PATH.CASHBOOK_RECEIPTS, component: ComingSoon },
  { path: PATH.CASHBOOK_PAYMENTS, component: ComingSoon },
  { path: PATH.COST_PRICE, component: ComingSoon },
]

export const productRoute = [
  { path: PATH.CREATE_PRODUCT, component: CreateProduct },
  { path: PATH.EDIT_PRODUCT, component: CreateProduct },
  { path: PATH.PRINT_BARCODE_PRODUCT, component: PrintBarcode },
  { path: PATH.PRODUCT_MANAGEMENT, component: ProductPage },
]

export const orderRoute = [
  { path: PATH.ORDER, component: RefactorOrder },
  { path: PATH.ORDER_ORIGIN, component: OrderOrigin },
  { path: PATH.ORDER_CREATE, component: PageOrderSingle },
  { path: PATH.EDIT_ORDER, component: PageEditOrderSingle },
  { path: PATH.COPY_ORDER, component: PageEditOrderSingle },

  { path: PATH.GIVE_BACK_PRODUCT, component: envLive ? ComingSoon: GiveBackProductPage },
  { path: PATH.CREATE_GIVE_BACK_PRODUCT, component: envLive ? ComingSoon:  CreateGiveBackProductPage },
]

export const configAndSettingRoute = [
  { path: PATH.SETTING, component: Setting },
  { path: PATH.PRODUCT_GROUP, component: ProductGroup },
  { path: PATH.UNITS_MANAGE, component: UnitsManage },
  { path: PATH.GROUP_CUSTOMER, component: GroupCustomer },
  { path: PATH.CONSIGNMENT, component: Consignment },
  { path: PATH.DELIVERY_NOTE, component: DeliveryNote },
  { path: PATH.PRINT_TEMPLATE_SETTING, component: PrintTemplate },

  { path: PATH.USER, component: UserPage },
  { path: PATH.CREATE_USER, component: CreateUser },

  { path: PATH.PAYMENT_METHOD, component: PaymentMethod },

  { path: PATH.USER_ROLE, component: UserRole },
  { path: PATH.USER_ROLE_CREATE, component: UserRoleCreate },
  { path: PATH.USER_ROLE_EDIT, component: UserRoleCreate },

  { path: PATH.TYPE_RECEIPT, component: TypeOfReceipt },
  { path: PATH.SETTING_TYPE_PAYMENT, component: PaymentType }

]

export const configPolicy = [
  { path: PATH.PRIVATE_POLICY, component: EvoPolicy },
]

export const facebookRoute = [
  { path: PATH.FACEBOOK_CONNECT, component: PageFacebookFanpage },
  {
    path: PATH.FACEBOOK_RESPONSE_CONTENT_SCRIPT,
    component: PageFacebookResponseContentScript,
  },
  {
    path: PATH.FACEBOOK_HIDE_AUTO_COMMENT,
    component: PageFacebookHideAutoComment,
  },
  {
    path: PATH.FACEBOOK_AUTO_RESPONSES,
    component: PageFacebookAutoResponses,
  },
  {
    path: PATH.FACEBOOK_AUTO_RESPONSES_CREATE,
    component: CreateAutoResponses,
  },
  {
    path: PATH.FACEBOOK_AUTO_RESPONSES_EDIT,
    component: CreateAutoResponses,
  },
  {
    path: PATH.FACEBOOK_CONVERSATION_TICKERS,
    component: PageFacebookConversationStickers,
  },
  {
    path: PATH.FACEBOOK_LIVESTREAM_SCRIPT,
    component: PageFacebookLivestreamScript,
  },
  {
    path: PATH.FACEBOOK_LIVESTREAM_SCRIPT_SINGLE,
    component: PageFacebookLivestreamScriptSingle,
  },
  {
    path: PATH.FACEBOOK_PRINT_SETTING,
    component: PrintConfig,
  },
  {
    path: '/facebook/conversation',
    component: FacebookConversation,
  },
  {
    path: '/facebook/orders',
    component: FacebookOrders,
  },

  {
    path: '/facebook/livestream',
    component: FacebookLivestream,
  },

  {
    path: '/facebook/:pageId/livestream/:liveStreamId',
    component: FacebookLiveStreamDetail,
  },

  {
    path: `${PATH.MINI_GAME}/:idMiniGame`,
    component: MiniGame,
  },
]

export const accountantRoute = [
  { path: PATH.ACCOUNTANT_RECEIPTS, component: ReceiptManagement },
  { path: PATH.ACCOUNTANT_RECEIPT_CREATE, component: ReceiptCreate },
  { path: PATH.ACCOUNTANT_PAYMENT, component: PaymentManagement },
  { path: PATH.ACCOUNTANT_PAYMENT_CREATE, component: CreatePayment },
  { path: PATH.PRICE_ADJUSTMENT, component: CapitalAdjustment },
  { path: PATH.PRICE_ADJUSTMENT_CREATE, component: CreateCapitalAdjustment },
  { path: PATH.PRICE_ADJUSTMENT_EDIT, component: CreateCapitalAdjustment },
  { path: PATH.CASHBOOKS, component: CashBooks },
]


export const reportRoute = [

  //report warehouse

  { path: PATH.REPORT_WAREHOUSE, component: ReportWarehouseManagement },
  { path: PATH.REPORT_WAREHOUSE_IMPORT, component: ImportWarehouse },
  { path: PATH.REPORT_WAREHOUSE_INVENTORY, component: ReportInventory },
  { path: PATH.REPORT_WAREHOUSE_NOTE, component: ComingSoon },
  { path: PATH.REPORT_WAREHOUSE_IMPORT_EXPORT, component: ImportExportWarehouse },
  { path: PATH.REPORT_WAREHOUSE_QUANTITY_LOW_RATE, component: ReportBelowQuota },
  { path: PATH.REPORT_WAREHOUSE_TRANSFER, component: TransferWarehouse },

  //report sales

  { path: PATH.REPORT_SALES, component: ReportSaleManagement },
  { path: PATH.REPORT_SALES_OVERVIEW, component: ReportSaleOverview },
  { path: PATH.REPORT_SALES_EMPLOYEE, component: ReportEmployee },
  { path: PATH.REPORT_SALES_ORDER_ORIGIN, component: ReportOrderOrigin },
  { path: PATH.REPORT_SALES_LOCATION, component: ReportLocation },
  { path: PATH.REPORT_SALES_CUSTOMER, component: ReportCustomer },
  { path: PATH.REPORT_SALES_PRODUCT_REVENUE, component: ReportProductRevenue },
  { path: PATH.REPORT_SALES_ORDER_REVENUE, component: OrderRevenue },
  { path: PATH.REPORT_SALES_SHIPPING_DIFFERENCE, component: ReportShippingDifference },
  { path: PATH.REPORT_SALES_SHIPPING_DIFFERENCE_EMPLOYEE, component: ReportShippingDifferenceEmployee },
  { path: PATH.REPORT_SALES_POS_OVERVIEW, component: ComingSoon },
]

export const posRoute = [
  { path: PATH.POS, component: PosOrder },
]