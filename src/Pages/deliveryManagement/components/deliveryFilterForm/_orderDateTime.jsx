import { CategoryDateTimeRangePicker } from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES } from 'Pages/deliveryManagement/interfaces/_constants'
import addDays from 'date-fns/addDays'
import { getDateFromNow } from '../../../refactorOrder/utils/date'
import subDays from 'date-fns/subDays'
import startOfMonth from 'date-fns/startOfMonth'
import { useTranslation } from 'react-i18next'

export const OrderDateTime = () => {
  const { t, i18n } = useTranslation()
  const { dateTime } = useFilterForm()

  const predefinedRanges = [
    {
      label: t('Yesterday'),
      value: [addDays(getDateFromNow(0, { type: 'start' }), -1), addDays(getDateFromNow(0, { type: 'end' }), -1)],
    },
    {
      label: t('today'),
      value: [getDateFromNow(0, { type: 'start' }), getDateFromNow(0, { type: 'end' })],
    },
    {
      label: t('7_days_ago'),
      value: [subDays(getDateFromNow(0, { type: 'start' }), 6), new Date()],
    },
    {
      label: t('this_month'),
      value: [startOfMonth(getDateFromNow(0, { type: 'start' })), new Date()],
    },
  ]
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-form__input-wide"
      categoryList={ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={125}
      value={dateTime.value}
      categoryValue={dateTime.activeValue.type}
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
