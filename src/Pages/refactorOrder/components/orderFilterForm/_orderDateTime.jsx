import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/refactorOrder/interfaces/_constants'
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import { getDateFromNow } from '../../utils/date'

export const OrderDateTime = () => {
  const {dateTime} = useOrderFilterForm()
  const predefinedRanges = [
    {
      label: 'Hôm qua',
      value: [addDays(getDateFromNow(0, {type: 'start'}), -1), addDays(getDateFromNow(0, {type: 'end'}), -1)],
    },
    {
      label: 'Hôm nay',
      value: [getDateFromNow(0, {type: 'start'}), getDateFromNow(0, {type: 'end'})],
    },
    {
      label: '7 ngày trước',
      value: [subDays(getDateFromNow(0, {type: 'start'}), 6), new Date()],
    },
    {
      label: 'Tháng này',
      value: [startOfMonth(getDateFromNow(0, {type: 'start'})), new Date()],
    },
  ];
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-form__input-wide"
      categoryList={ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={125}
      value={dateTime.value}
      triggerDefault={dateTime.triggerDefault}
      onChange={dateTime.onChange}
      datePickerProps={{
        defaultValue: dateTime.defaultValue,
        disabledDate: dateTime.disabledDate,
        placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
        range: predefinedRanges
      }}
    />
  )
}
