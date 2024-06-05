import {REPORT_INVENTORY_ICONS} from './_icon'

export const REPORT_INVENTORY_BREADCRUMB_TITLE = 'inventory_report'

export const REPORT_INVENTORY_BREADCRUMB = [
  {id: 1, name: 'report_warehouse', url: '#'},
  {id: 2, name: 'inventory_report', url: '#'},
]


export const REPORT_INVENTORY_PAGE_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: REPORT_INVENTORY_ICONS.repeat,
  },
  {
    id: 2,
    name: 'report_print',
    appearance: 'secondary',
    icon: REPORT_INVENTORY_ICONS.printer,
  },
  {
    id: 3,
    name: 'export_report',
    // appearance: 'secondary',
    icon: REPORT_INVENTORY_ICONS.export,
  }
]


export const REPORT_INVENTORY__FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {id: 1, name: 'report__date_of_import_warehouse', value: 'created'},
]