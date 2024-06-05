import { REPORT_SALE_ICONS } from './_icons'
import { PATH } from '../../../../const/path'
import {DISPLAY_NAME_MENU} from '../../../../const/display_name_menu'

export const REPORT_SALE_BREADCRUMB = [
  { id: 1, name: DISPLAY_NAME_MENU.REPORT, url: '#' },
  { id: 2, name: DISPLAY_NAME_MENU.REPORT_SALE, url: '#' },
]

export const REPORT_SALE_CONTENT = [
  {
    id: 1,
    title: DISPLAY_NAME_MENU.SALES_ACTIVITY_REPORT,
    page : [
      {
        id: 1,
        title: 'sales_overview',
        content: 'sales_activity_overview',
        image: (REPORT_SALE_ICONS.sale_overview),
        url: PATH.REPORT_SALES_OVERVIEW
      },
      {
        id: 2,
        title: 'employee_report',
        content: 'salesperson_order_stats_by_order_status',
        image: (REPORT_SALE_ICONS.sale_employee),
        url: PATH.REPORT_SALES_EMPLOYEE
      },
      {
        id: 3,
        title: 'report_by_order_source',
        content: 'statistics_by_order_source_and_status',
        image: (REPORT_SALE_ICONS.sale_order_origin),
        url: PATH.REPORT_SALES_ORDER_ORIGIN
      },
      {
        id: 4,
        title: 'report_by_region',
        content: 'statistics_by_province',
        image: (REPORT_SALE_ICONS.sale_location),
        url: PATH.REPORT_SALES_LOCATION
      },
      {
        id: 5,
        title: 'report_by_customer',
        content: 'statistics_by_customer',
        image: (REPORT_SALE_ICONS.sale_customer),
        url: PATH.REPORT_SALES_CUSTOMER
      },
      {
        id: 6,
        title: 'revenue_and_profit',
        content: 'product_cost_price_sales_revenue_profit_analysis',
        image: (REPORT_SALE_ICONS.sale_product_revenue),
        url: PATH.REPORT_SALES_PRODUCT_REVENUE
      },
      {
        id: 7,
        title: 'revenue_and_profit_order',
        content: 'order_and_order_item_cost_price_sales_revenue_profit_analysis',
        image: (REPORT_SALE_ICONS.sale_order_revenue),
        url: PATH.REPORT_SALES_ORDER_REVENUE
      },
      {
        id: 8,
        title: 'revenue_shipment_and_fee_difference',
        content: 'statistics_number_of_orders_and_revenue_of_sales_by_employee_according_to_each_order_status',
        image: (REPORT_SALE_ICONS.shipping_difference),
        url: PATH.REPORT_SALES_SHIPPING_DIFFERENCE
      },
    ]
  },
  // {
  //   id: 2,
  //   title: 'Đơn bán tại quầy (POS)',
  //   page : [
  //     {
  //       id: 1,
  //       title: 'Tổng quan đơn POS',
  //       content: 'Phân tích giá vốn, giá bán, doanh thu, lợi nhuận theo sản phẩm.',
  //       image: (REPORT_SALE_ICONS.icon_report),
  //       url: PATH.REPORT_SALES_POS_OVERVIEW
  //     },
  //   ]
  // },
]

