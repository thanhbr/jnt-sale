import { getDateFromNow } from '../../Employee/utils/date'
import { formatDatetime } from '../../../../../../common/form/datePicker/_functions'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{value: 'end'})]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],{onlyDate: true}
)} - ${formatDatetime(dateTimeDefaultValue[1],{onlyDate: true})}`

export const TestParams = () => {
  console.log(formatDateTimeDefaultValue)
}

export const REPORT_SALE_BREADCRUMB = [
  { id: 1, name: 'report', url: '#' },
  { id: 2, name: 'report_sale', url: '#' },
  { id: 3, name: 'overview', url: '#' },
]
export const TOOLTIP_ORDER_OF_THE_DAY = [
  "sending_shipping_order_tooltip",
  "success_pickup_tooltip",
  "in_transit_tooltip",
  "successful_delivery_of_goods_tooltip",
  "return_goods_tooltip",
  "settled_tooltip",
]

export const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
  {
    id: 1, name: 'Group_by_day', value: 'date',
    option: [
      {
        value: 7,
        label: '7_days_ago'
      },
      {
        value: 'month',
        label: 'this_month'
      },
      {
        value: 15,
        label: '15_days_ago'
      },
      {
        value: 'lmoth',
        label: 'last_month'
      },
      {
        value: 30,
        label: '30_days_ago'
      },
    ]
  },
  {
    id: 2, name: 'Group_by_month', value: 'month',
    option: [
      {
        value: 3,
        label: '3_months_ago'
      },
      {
        value: 12,
        label: '12_months_ago'
      },
      {
        value: 'lyear',
        label: 'last_year'
      },
      {
        value: 'year',
        label: 'this_year'
      },
    ]
  },
  {
    id: 3, name: 'Group_by_quarter', value: 'quarter',
    option: [
      {
        value: 4,
        label: 'the_last_4_quarters'
      },
      {
        value: 'lyear',
        label: 'last_year'
      },
      {
        value: 'year',
        label: 'this_year'
      },
    ]
  },
  {
    id: 4, name: 'Group_by_year', value: 'year',
    option: [
      {
        value: 3,
        label: 'the_past_3_years'
      },
      {
        value: 5,
        label: 'the_past_5_years'
      }
    ]
  },
]