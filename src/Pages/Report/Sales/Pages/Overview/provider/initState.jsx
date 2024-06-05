import { getDateFromNow } from '../../Employee/utils/date'
import { formatDatetime } from '../../../../../../common/form/datePicker/_functions'
import { ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES } from '../interfaces/_constants'

const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
const formatDateTimeDefaultValue = `${formatDatetime(
  dateTimeDefaultValue[0],{onlyDate: true}
)} - ${formatDatetime(dateTimeDefaultValue[1],{onlyDate: true})}`

export const SaleOverviewInitialState = {
  filter: {
    dateTime: {
      activeValue: {
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0].value,
        value: formatDateTimeDefaultValue,
      },
      end: dateTimeDefaultValue[1],
      start: dateTimeDefaultValue[0],
      type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0].value,
      value: formatDateTimeDefaultValue,
      option: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0].option,
      label: '7_days_ago',
      active: 7,
      trigger: true
    },
  },
  overview: {
    revenues: [],
    products: [],
    orders: [],
    profits: [],
    timeX: [],
    loading: false,
  },
  orders: {
    origin: [],
    list: []
  },
  products: [],
  employees: [],
  statisticTab: 1,
  loading: false,
}