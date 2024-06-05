import { REPORT_WAREHOUSE_ICONS } from './_icons'
import { PATH } from '../../../../const/path'

export const REPORT_WAREHOUSE_BREADCRUMB = [
  { id: 1, name: 'report', url: '#' },
  { id: 2, name: 'report_warehouse', url: '#' },
]

export const REPORT_WAREHOUSE_CONTENT = [
  {
    id: 1,
    title: 'report_im_ex_transfer',
    page : [
      {
        id: 1,
        title: 'report_import_goods',
        content: 'track_info_product_import',
        image: (REPORT_WAREHOUSE_ICONS.warehouseImport),
        url: PATH.REPORT_WAREHOUSE_IMPORT
      },
      {
        id: 2,
        title: 'report_transfer',
        content: 'manage_quantity_value_transfer',
        image: (REPORT_WAREHOUSE_ICONS.warehouseTransfer),
        url: PATH.REPORT_WAREHOUSE_TRANSFER
      },
      {
        id: 3,
        title: 'report_ex_im_transfer',
        content: 'track_history_ex_im_activity',
        image: (REPORT_WAREHOUSE_ICONS.warehouseExim),
        url: PATH.REPORT_WAREHOUSE_IMPORT_EXPORT
      },
    ]
  },
  {
    id: 2,
    title: 'inventory_report_and_level',
    page : [
      {
        id: 1,
        title: 'inventory_report',
        content: 'inventory_quantity_value_report',
        image: (REPORT_WAREHOUSE_ICONS.warehouseInventory),
        url: PATH.REPORT_WAREHOUSE_INVENTORY
      },
      {
        id: 2,
        title: 'inventory_below_reorder_level_report',
        content: 'inventory_products_below_reorder_level',
        image: (REPORT_WAREHOUSE_ICONS.warehouseLowRate),
        url: PATH.REPORT_WAREHOUSE_QUANTITY_LOW_RATE
      },
    ]
  },
]