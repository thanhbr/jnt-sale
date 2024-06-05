import {REPORT_INVENTORY_ICONS} from "../../Inventory/interfaces/_icon";

export const REPORT_QUOTA_BREADCRUMB_TITLE = 'inventory_below_reorder_level_report'

export const REPORT_QUOTA_BREADCRUMB = [
  {id: 1, name: 'report_warehouse', url: '#'},
  {id: 2, name: 'inventory_below_reorder_level_report', url: '#'},
]


export const REPORT_QUOTA_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: REPORT_INVENTORY_ICONS.repeat,
  },
  {
    id: 2,
    name: 'export_report',
    // appearance: 'secondary',
    icon: REPORT_INVENTORY_ICONS.export,
  }
]