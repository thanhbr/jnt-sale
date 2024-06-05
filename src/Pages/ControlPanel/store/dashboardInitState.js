import {useTranslation} from 'react-i18next'
import moment from 'moment'

const days=7; // Days you want to subtract
const date = new Date();
export const InitialState = {
  total: {
    total_amounts: 0,
    total_cods_signed: 0,
    total_orders: 0,
    total_orders_signed: 0,
  },
  SelectedDuration: {label: 'for_week', value: 'for_week'},
  date_end : moment(date).format("YYYY-MM-DD"),
  date_start: moment(new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))).format("YYYY-MM-DD"),
  day: 7
}
