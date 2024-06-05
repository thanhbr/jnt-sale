import CONFIG from '../config'
import moment from 'moment'

let URL
let FBAPI
let URL_V3
const ENV = CONFIG.env
const days=7; // Days you want to subtract
const date = new Date();
switch (ENV) {
  case 'DEV':
    URL = CONFIG.API_V2
    // FBAPI = 'http://14.225.241.215/api/v2'
    FBAPI = CONFIG.API_FB
    URL_V3 = CONFIG.API
    break
  default:
    break
}
// https://api-dev.upos.vn/api/v2/auth/login
export function getUrlLogin(params) {
  return params?.option === 0 ? `${URL_V3}/auth/login` : `${URL_V3}/auth/jms-login`
}
export function getUrlJmsRegister(params) {
  return `${URL_V3}/auth/jms-register`
}
export function getUrlSendOTPPassword(params) {
  // return `${URL}/auth/users`
  return `${URL_V3}/open/shop/send-otp-password`
}
export function getUrlCheckOTPPassword(params) {
  // return `${URL}/auth/users`
  return `${URL_V3}/open/shop/check-otp-password`
}
export function getUrlResetPassword(params) {
  // return `${URL}/auth/users`
  return `${URL_V3}/account/reset-password`
}
export function saveAccount() { 
  return `${URL}/fb/page/update`
}
export function getCommentAndMesssage() { 
  return `${URL}/fb/pages/filter`
}
export function getUrlCustomerInfo() { 
  return `${URL_V3}/fb/customer`
}
export function saveFbUser() { 
  return `${FBAPI}/fb/user/save`
}
export function getFbUser() {
  return `${FBAPI}/fb/user`
}
export function getFanpageList() {
  return `${FBAPI}/fb/pages`
}
export function getUrlUserInfo() {
  return `${URL_V3}/auth/users`
}
export function getUrlChangePassword() {
  return `${URL_V3}/account/change-password`
}
export function getUrlUpdateProfile() {
  return `${URL_V3}/account/update-profile`
}
export function getUrlFeedbackCreate() {
  return `${URL_V3}/feedback/create`
}
export function getUrlLogOut() {
  return `${URL_V3}/auth/logout`
}
export function getUrlEmployeeList() {
  return `${URL_V3}/admin/employee/groups`
}
export function getUrlEmployeeListByGroup(keyword='', group='') {
  return `${URL_V3}/admin/users?keyword=${keyword}&group=${group}`
}
export function getUrlOriginsList() {
  return `${URL_V3}/order/origins`
}
export function getUrlShippingList() {
  return `${URL_V3}/order/shipping/partner`
}
export function getUrlWareHousesList() {
  return `${URL_V3}/warehouse/warehouses`
}
export function getUrlShippingStatusList() {
  return `${URL_V3}/order/shipping/status`
}
export function getUrlCreateCustomerGroup() {
  return `${URL_V3}/customer/group/create`
}
export function getUrlCreateCustomer() {
  return `${URL_V3}/customer/create`
}
export function getUrlDataChart(fromdate, toDate) {
  return `${URL}/dashboard/revenue?date_start=${fromdate}&date_end=${toDate}`
}
export function getUrlWareHouseInfo(is_purchase = '', keyword = '') {
  return `${URL}/warehouse/warehouses?is_purchase=${is_purchase}/keyword=${keyword}`
}
export function getUrlOrigin(keyword = '') {
  let url = `${URL}/order/origins?`
  if (keyword) url += `keyword=${keyword}`
  return url
}
export function getUrlOrderStatus() {
  return `${URL}/order/shipping/status`
}
export function getUrlEmployee(keyword = '', group = '', status = '') {
  let url = `${URL}/admin/employees?`
  if (keyword) url += `keyword=${keyword}`
  if (group) url += `group=${group}`
  if (status) url += `status=${status}`
  return url
}
export function getUrlOrder({
  keyword = '',
  customer_id = '',
  user_id = '',
  warehouse_id = '',
  shipping_partner = '',
  shipping_status = '',
  order_origin_id = '',
  livestream_id = '',
  product_id = '',
  is_duplicate = '',
  per_page = 10,
  start = '',
  end_date = moment(date).format("YYYY-MM-DD hh:mm"),
  start_date = moment(new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))).format("YYYY-MM-DD hh:mm"),
  date_type = ''
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '10'
  return `${URL_V3}/order/orders?keyword=${keyword}&date_type=${date_type}&start_date=${start_date}&end_date=${end_date}&customer_id=${customer_id}&user_id=${user_id}&warehouse_id=${warehouse_id}&shipping_partner=${shipping_partner}&shipping_status=${shipping_status}&order_origin_id=${order_origin_id}&livestream_id=${livestream_id}&product_id=${product_id}&is_duplicate=${is_duplicate}&per_page=${per_page}&start=${start}`
}

export function getUrlOrderUpdateStatus() {
  return `${URL_V3}/order/update_status`
}

export function getUrlCustomerActive() {
  return `${URL_V3}/customer/active`
}

export function getUrlDeleteCustomer(id) {
  return `${URL_V3}/customer/delete/${id}`
}

export function getUrlOrderTotal({
 keyword = '',
 customer_id = '',
 user_id = '',
 warehouse_id = '',
 shipping_partner = '',
 shipping_status = '',
 order_origin_id = '',
 livestream_id = '',
 product_id = '',
 is_duplicate = '',
 per_page = 10,
 start = '',
 end_date = moment(date).format("YYYY-MM-DD hh:mm"),
 start_date = moment(new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))).format("YYYY-MM-DD hh:mm"),
 date_type = ''
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '10'
  return `${URL_V3}/order/order-total?keyword=${keyword}&date_type=${date_type}&start_date=${start_date}&end_date=${end_date}&customer_id=${customer_id}&user_id=${user_id}&warehouse_id=${warehouse_id}&shipping_partner=${shipping_partner}&shipping_status=${shipping_status}&order_origin_id=${order_origin_id}&livestream_id=${livestream_id}&product_id=${product_id}&is_duplicate=${is_duplicate}&per_page=${per_page}&start=${start}`
}

export function getUrlReport({
  keyword = '',
  customer_id = '',
  warehouse_id = '',
  per_page = '',
  start = '',
  start_date = '',
  end_date = '',
  category_id = '',
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '20'
  return `${URL}/report/warehouses/warehouse-inventories?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&customer_id=${customer_id}&warehouse_id=${warehouse_id}&per_page=${per_page}&start=${start}&category_id=${category_id}`
}

export function getUrlReportExcel({
  keyword = '',
  customer_id = '',
  warehouse_id = '',
  start_date = '',
  end_date = '',
  category_id = '',
}) {
  return `${URL}/report/warehouses/warehouse-inventories?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&customer_id=${customer_id}&warehouse_id=${warehouse_id}&per_page=999999&start=&category_id=${category_id}`
}

export function getUrlLowQuantity({
  keyword = '',
  warehouse_id = '',
  per_page = '',
  start = '',
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '20'
  return `${URL}/report/warehouses/quantity-low-warehouse-report?keyword=${keyword}&warehouse_id=${warehouse_id}&per_page=${per_page}&start=${start}`
}

export function getUrlLowQuantityExcel({keyword = '', warehouse_id = ''}) {
  return `${URL}/report/warehouses/quantity-low-warehouse-report?keyword=${keyword}&warehouse_id=${warehouse_id}&per_page=9999999&start=`
}

export function getUrlTransfer({
  keyword = '',
  warehouse_transfer = '',
  warehouse_to_receive = '',
  per_page = '',
  start = '',
  start_date = '',
  end_date = '',
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '20'
  return `${URL}/report/warehouses/transfer-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_transfer=${warehouse_transfer}&warehouse_to_receive=${warehouse_to_receive}&per_page=${per_page}&start=${start}`
}

export function getUrlTransferExcel({
  keyword = '',
  warehouse_transfer = '',
  warehouse_to_receive = '',
  start_date = '',
  end_date = '',
}) {
  return `${URL}/report/warehouses/transfer-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_transfer=${warehouse_transfer}&warehouse_to_receive=${warehouse_to_receive}&per_page=999999&start=`
}
// keyword=&warehouse_id=11&per_page&start
export function getUrlWarehouseStockReport({
  keyword = '',
  warehouse_id = '',
  per_page = '',
  start = '',
  start_date = '',
  end_date = '',
  category_id = '',
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '20'
  return `${URL}/report/warehouses/stock-warehouse-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_id=${warehouse_id}&per_page=${per_page}&start=${start}&category_id=${category_id}`
}

export function getUrlWarehouseStockReportExport({
  keyword = '',
  warehouse_id = '',
  start_date = '',
  end_date = '',
  category_id = '',
}) {
  return `${URL}/report/warehouses/export-stock-warehouse-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_id=${warehouse_id}&category_id=${category_id}`
}

export function getUrlImport({
  keyword = '',
  warehouse_id = '',
  per_page = '',
  start = '',
  start_date = '',
  end_date = '',
  supplier_id = '',
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '20'
  return `${URL}/report/purchases/purchase-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_id=${warehouse_id}&per_page=${per_page}&start=${start}&supplier_id=${supplier_id}`
}

export function getUrlImportExcel({
  keyword = '',
  warehouse_id = '',
  start_date = '',
  end_date = '',
  supplier_id = '',
}) {
  return `${URL}/report/purchases/purchase-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_id=${warehouse_id}&per_page=9999999&start=&supplier_id=${supplier_id}`
}

export function getUrlSaleByTime({
  keyword = '',
  warehouse_id = '',
  per_page = '',
  start = '',
  start_date = '',
  end_date = '',
  customer = '',
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '20'
  return `${URL}/report/sales/orders-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_id=${warehouse_id}&per_page=${per_page}&start=${start}&customer=${customer}`
}

export function getUrlSaleByTimeExcel({
  keyword = '',
  warehouse_id = '',
  start_date = '',
  end_date = '',
  customer = '',
}) {
  return `${URL}/report/sales/orders-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&warehouse_id=${warehouse_id}&per_page=9999999&start=&customer=${customer}`
}

export function getUrlSaleByProduct({
  keyword = '',
  per_page = '',
  start = '',
  start_date = '',
  end_date = '',
}) {
  if (!start || start === '') start = '0'
  if (!per_page || per_page === '') per_page = '20'
  return `${URL}/report/sales/product-sales-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&per_page=${per_page}&start=${start}`
}

export function getUrlSaleByProductExcel({
  keyword = '',
  start_date = '',
  end_date = '',
}) {
  return `${URL}/report/sales/product-sales-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&per_page=999999&start=`
}

export function getUrlSaleByEmployee({
  keyword = '',
  origin_id = '',
  start_date = '',
  end_date = '',
  staff_id = '',
  date_type = '',
}) {
  return `${URL}/report/sales/staff-sales-report?keyword=${keyword}&start_date=${start_date}&end_date=${end_date}&origin_id=${origin_id}&staff_id=${staff_id}&date_type=${date_type}`
}

export function getUrlSaleByOrder({
  origin_id = '',
  start_date = '',
  end_date = '',
  date_type = '',
}) {
  return `${URL}/report/sales/origin-sales-report?&start_date=${start_date}&end_date=${end_date}&origin_id=${origin_id}&date_type=${date_type}`
}

export function getUrlSaleByOrderExcel({
  origin_id = '',
  start_date = '',
  end_date = '',
  date_type = '',
}) {
  return `${URL}/report/sales/origin-sales-report?&start_date=${start_date}&end_date=${end_date}&origin_id=${origin_id}&date_type=${date_type}`
}

export function getUrlCustomer({...params}) {
  const {
    keyword = '',
    group = 0,
    city_id = 0,
    district_id = 0,
    ward_id = 0,
    per_page = 10,
    start = 0,
  } = params
  const url = `${URL}/customer/customers?keyword=${keyword}&group=${group}&city_id=${city_id}&district_id=${district_id}&ward_id=${ward_id}&per_page=${per_page}&start=${start}`
  return url
}
export function getUrlOrderDetail(order_id) {
  return `${URL}/order/detail/${order_id}`
}
export function getUrlAReasList() {
  return `${URL}/area/areas`
}
export function getUrlProvinceDistrict() {
  return `${URL}/area/province-district`
}
export function getUrlProvince() {
  return `${URL}/area/provinces`
}
export function getUrlDistrict(city_id = '') {
  return `${URL}/area/districts?city_id=${city_id}`
}
export function getWardInfo(city_id = '', district_id = '') {
  return `${URL}/area/wards?city_id=${city_id}&district_id=${district_id}`
}
export function createAddress() {
  return `${URL_V3}/setting/address/create`
}
export function getUrlUpdateWarehouse(id) {
  return `${URL}/warehouse/update/${id}`
}
export function getUrlListProduct({
  keyword = '',
  category_id = '',
  product_id = '',
  warehouse_id = '',
  start = 0,
  per_page = '20',
  status = '',
}) {
  return `${URL}/product/products?keyword=${keyword}&category_id=${category_id}&product_id=${product_id}&status=${status}&warehouse_id=${warehouse_id}&per_page=${per_page}&start=${start}`
  // return `${URL}/product/products?keyword=${keyword}&category_id=${category_id}&product_id=${product_id}&status&warehouse_id=${warehouse_id}&per_page=${per_page}&${start}`;
}
export function getListShippingPartner() {
  return `${URL}/order/shipping/partner`
}
export function getUrlDetailProduct(id) {
  return `${URL}/product/detail/${id}`
}
export function getUrlAdress(keyword = '') {
  return `${URL}/setting/addresses?keyword=${keyword}`
}
export function getUrlDelivery(date_start = '', date_end = '') {
  return `${URL}/report/dashboard/delivery?date_start=${date_start}&date_end=${date_end}`
}
export function getUrlRevenue(date_start = '', date_end = '') {
  return `${URL}/report/dashboard/revenue?date_start=${date_start}&date_end=${date_end}`
}
export function getUrlCreateOrder() {
  return `${URL}/order/create`
}
export function getUrlShippingFee() {
  // return `https://api-dev.upos.vn/api/order/shipping/fee`;
  return `${URL}/order/shipping/fee`
}
export function getUrlDangerCustomer() {
  return `https://dev.upos.vn/corder/customer_danger`
}
export function getUrlCategory({...params}) {
  const {keyword = ''} = params
  return `${URL}/product/categories?keyword=${keyword}`
}
export function getUrlWarehouse({...params}) {
  const {keyword = '', is_purchase = ''} = params
  return `${URL}/warehouse/warehouses?keyword=${keyword}&is_purchase=${is_purchase}`
}

export function getUrlUnitList({...params}) {
  const {
    keyword = '',
    per_page = '50',
    start = '0',
  } = params
  return `${URL}/product/units?keyword=${keyword}&per_page=${per_page}&start=${start}`
}
export function getUrlUpdateStatus() {
  return `${URL}/order/update_status`
}
export function getUrlDeliveryBox1(params) {
  const {start_date = '', end_date = '', partner_ship = ''} = params || {}
  return `${URL}/report/delivery/delivery?partner_ship=${partner_ship}&date_start=${start_date}}&date_end=${end_date}`
}
export function getUrlSendLog(mess = '') {
  const token = '1613226593:AAHWouPrKsUYfM5y_l-ZSyKww9TA7I09yQ0'
  const chatId = '-1001436033026'
  const href = 'https://api.telegram.org/bot'
  const url = `${href + token}/sendMessage?chat_id=${chatId}&text=${mess}`
  return url
}
export function getUrldetectAddress(address) {
  // /area/detect-address
  return `${URL}/area/detect-address?address=${address}`
}
export function getUrlDetailsListAll(keyword = '', category_id = '',product_id_details = '', status = '', warehouse_id = '', per_page = '20', start = '0',) {
  return `${URL_V3}/product/list-all-product-details?keyword=${keyword}&category_id=${category_id}&product_id_details=${product_id_details}&status=${status}&warehouse_id=${warehouse_id}&per_page=${per_page}&start=${start}`
}
export function getUrldetailList(id) {
  return `${URL}/product/product-details/${id}`
}
export function getUrlCreateCategory() {
  return `${URL}/product/category/create`
}
export function getUrlUpdateCategory(id) {
  return `${URL}/product/category/update/${id}`
}

export function getUrlStoreSetting() {
  return `${URL_V3}/setting/config`
}
export function getUrlDeleteCategory(id) {
  return `${URL}/product/category/delete/${id}`
}
export function getUrlCreateUnit() {
  return `${URL_V3}/product/unit/create`
}
export function getUrlUpdateUnit(id) {
  return `${URL}/product/unit/update/${id}`
}
export function getUrlDeleteUnit(id) {
  return `${URL}/product/unit/delete/${id}`
}
export function getUrlTransferWarehouse() {
  return `${URL}/warehouse/transfer`
}
export function getUrlCreateWarehouse() {
  return `${URL}/warehouse/create`
}
export function getUrlDeleteWarehouse(id) {
  return `${URL}/warehouse/delete/${id}`
}
export function getCreateInventoryControlTicket(id) {
  return `${URL}/warehouse/inventory/create`
}
export function getUrlInventoryControlList({...props}) {
  const {
    keyword = '',
    warehouse_id = '',
    status = '',
    start_date = '',
    end_date = '',
    start = '',
    per_page = '',
  } = props
  return `${URL}/warehouse/inventory/list?keyword=${keyword}&warehouse_id=${warehouse_id}&status=${status}&start_date=${start_date}&end_date=${end_date}&per_page=${per_page}&start=${start}`
}

export function getUrlDetailInventoryControlTicket(id) {
  return `${URL}/warehouse/inventory/detail/${id}`
}
export function getUrlDeleteICticket(id) {
  return `${URL}/warehouse/inventory/delete/${id}`
}
export function getUrlUpdateICticket(id) {
  return `${URL}/warehouse/inventory/update/${id}`
}
export function getUrlListSupplier({...props}) {
  const {keyword = '', per_page = '20', start = '0'} = props
  return `${URL}/supplier/suppliers?keyword=${keyword}&per_page=${per_page}&start=${start}`
}
export function getUrlUpdateSupplier(id) {
  return `${URL}/supplier/update/${id}`
}
export function getUrlCreateSupplier() {
  return `${URL}/supplier/create`
}
export function getUrlDeleteSupplier(id) {
  return `${URL}/supplier/delete/${id}`
}
// {{server}}/api/v2/supplier/purchase/137?start_date=2021-06-01&end_date=2021-07-01&keyword=abc&supplier_id=137&per_page=10&start=0
export function getUrlSupplierPurchase({...params}) {
  const {
    start_date = '',
    end_date = '',
    keyword = '',
    supplier_id = '',
    per_page = '20',
    start = '0',
  } = params
  return `${URL}/supplier/purchase/${supplier_id}?start_date=${start_date}&end_date=${end_date}&keyword=${keyword}&supplier_id=${supplier_id}&per_page=${per_page}&start=${start}`
}
export function getUrlDetailSupplier(id) {
  return `${URL}/supplier/detail/${id}`
}
export function getUrBalanceInventoryControl(id) {
  return `${URL}/warehouse/inventory/balance/${id}`
}
export function getUrUpdateStatusProduct(id) {
  return `${URL}/product/update-status`
}
export function getUrlOrderRateByShippingStatus(date_start="2022-07-07",date_end="2022-07-13") {
  return `${URL_V3}/dashboard/delivery?date_start=${date_start}&date_end=${date_end}`
}
export function getUrlRevenueOverTime(date_start="2022-07-07",date_end="2022-07-13") {
  return `${URL_V3}/dashboard/revenue?date_start=${date_start}&date_end=${date_end}`
}
export function getUrlTopProducts(date_start="2022-07-07",date_end="2022-07-13") {
  return `${URL_V3}/dashboard/products?date_start=${date_start}&date_end=${date_end}`
}
export function getConsignment(per_page= '',start='',keyword =''){
  return `${URL_V3}/setting/addresses?keyword=${keyword}&is_default=&per_page=${per_page}&start=${start}`
}
export function getSearchConsignment(keyword=''){
  return `${URL_V3}/setting/addresses?keyword=${keyword}&is_default=&per_page&start`
}
export function getInfoConsignment(id){
  return `${URL_V3}/setting/address/detail/${id}`
}
export function postUpdateConsignment(id){
  return `${URL_V3}/setting/address/update/${id}`
}
export function postActiveStatus(){
  return `${URL_V3}/setting/address/active`
}
export function getUrlPartnerDefault() {
  return `${URL_V3}/setting/shipping/partner-setting`
}
export function postConnectJnt() {
  return `${URL_V3}/setting/shipping/jnt-connect`
}
export function postConnectSnappy() {
  return `${URL_V3}/setting/shipping/snappy-connect`
}
export function postConnectShip60() {
  return `${URL_V3}/setting/shipping/ship60-connect`
}
export function postConnectSuperShip() {
  return `${URL_V3}/setting/shipping/supership-connect`
}
export function postConnectNhatTin() {
  return `${URL_V3}/setting/shipping/nhattin-connect`
}
export function postConnectViettelPost() {
  return `${URL_V3}/setting/shipping/vtp-connect`
}
export function postConnectGHTK() {
  return `${URL_V3}/setting/shipping/ghtk-connect`
}
export function postConnectVietNamPost() {
  return `${URL_V3}/setting/shipping/vnp-connect`
}
export function postTokenGHN() {
  return `${URL_V3}/setting/shipping/ghn-get-store`
}
export function postOTPGHN() {
  return `${URL_V3}/setting/shipping/ghn-send-otp`
}
export function postConnectGHN() {
  return `${URL_V3}/setting/shipping/ghn-connect`
}
export function postConfigJnt() {
  return `${URL_V3}/setting/shipping/jnt-setting`
}
export function postConfigGHTK() {
  return `${URL_V3}/setting/shipping/ghtk-setting`
}
export function postConfigGHN() {
  return `${URL_V3}/setting/shipping/ghn-setting`
}
export function postConfigViettelPost() {
  return `${URL_V3}/setting/shipping/vtp-setting`
}
export function postConfigVietNamPost() {
  return `${URL_V3}/setting/shipping/vnp-setting`
}
export function getUrlPartnerDetail(id) {
  return `${URL_V3}/setting/shipping/partner-detail?partner=${id}`
}
export function postUrlConfigPartnerDefault(id,status) {
  return `${URL_V3}/setting/shipping/config-default?partner=${id}&status=${status}`
}
export function getUrlDisconnectPartner(id) {
  return `${URL_V3}/setting/shipping/disconnect?partner=${id}`
}

export function getListDeliveryNote(per_page='',start='',keyword='') {
  return `${URL_V3}/setting/delivery-note/list?keyword=${keyword}&per_page=${per_page}&start=${start}`
}
export function getListSearchDeliveryNote(key='') {
  return `${URL_V3}/setting/delivery-note/list?keyword=${key}&per_page&start`
}
export function getDetailNote(id){
  return `${URL_V3}/setting/delivery-note/detail/${id}`
}
export function createNote(){
  return `${URL_V3}/setting/delivery-note/create`
}
export function update_note(id){
  return `${URL_V3}/setting/delivery-note/update/${id}`
}
export function active_note(){
  return `${URL_V3}/setting/delivery-note/active`
}

export function getUrlUpdateCustomerGroup(id) {
  return `${URL_V3}/customer/group/update/${id}`
}

export function getUrlListUserManagement(keyword = '',per_page = '',start = ''){
  return `${URL_V3}/admin/employees?keyword=${keyword}&group=&status=&per_page=${per_page}&start=${start}`
}
export function getUrlDetailUserManagement(id){
  return `${URL_V3}/admin/employee/detail/${id}`
}
export function setActiveUserManagement(){
  return `${URL_V3}/admin/employee/active`
}
export function setResetPasswordUserManagement(id){
  return `${URL_V3}/admin/employee/reset-password/${id}`
}
export function getListProductGroup(keyword='') {
  return `${URL_V3}/product/category/list?keyword=${keyword}`
}
export function setActiveproductGroup() {
  return `${URL_V3}/product/category/active`
}
export function deleteProductGroup(id) {
  return `${URL_V3}/product/category/delete/${id}`
}export function createProductGroup() {
  return `${URL_V3}/product/category/create`
}
export function detailProductGroup(id) {
  return `${URL_V3}/product/category/detail/${id}`
}
export function updateProductGroup(id) {
  return `${URL_V3}/product/category/update/${id}`
}
export function getUrlCheckPartsignJNT(){
  return `${URL_V3}/setting/shipping/jnt-check-partsign`
}
export function getListUnit(search='', per_page='',start='') {
  return `${URL_V3}/product/unit/list?keyword=${search}&per_page=${per_page}&start=${start}`
}
export function getListSearchUnit(key='') {
  return `${URL_V3}/product/unit/list?keyword=${key}&per_page&start`
}
export function getDetailUnit(id){
  return `${URL_V3}/product/unit/detail/${id}`
}
export function createUnit(){
  return `${URL_V3}/product/unit/create`
}
export function updateUnit(id){
  return `${URL_V3}/product/unit/update/${id}`
}
export function active_unit(){
  return `${URL_V3}/product/unit/active`
}

export function getDeleteUnit(id) {
  return `${URL}/product/unit/delete/${id}`
}
export function getDetailWarehouseManager(id){
  return `${URL_V3}/warehouse/detail/${id}`
}
export function createWarehouseManager(){
  return `${URL_V3}/warehouse/create`
}
export function updateWarehouseManager(id){
  return `${URL_V3}/warehouse/update/${id}`
}
export function getDeleteWarehouseManager(id) {
  return `${URL_V3}/warehouse/delete/${id}`
}
export function getUrlWarehouseManagerActive() {
  return `${URL_V3}/warehouse/active`
}
export function getShopInfo() {
  return `${URL_V3}/shop/info`
}
export function updateShopInfo(id) {
  return `${URL_V3}/shop/update/${id}`
}export function updloadLogoShopInfo(id) {
  return `${URL_V3}/shop/upload/${id}`
}
export function uploadProductImage() {
  return `${URL_V3}/product/upload`
}

export function getListPartSign(search='', per_page='',start='', shipping_partner= '', user_id='', order_origin_id='') {
  return `${URL_V3}/order/partsign/total-list?keyword=${search}&date_type=sended&start_date=${per_page}&end_date=${start}&shipping_partner=${shipping_partner}&user_id=${user_id}&order_origin_id=${order_origin_id}`
}
export function getListSearchPartSign(key='') {
  return `${URL_V3}/product/unit/list?keyword=${key}&per_page&start`
}
export function getDetailPartSign(id){
  return `${URL_V3}/order/partsign/detail/${id}`
}
