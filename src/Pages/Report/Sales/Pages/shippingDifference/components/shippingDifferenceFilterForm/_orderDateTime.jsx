import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFilterForm from 'Pages/Report/Sales/Pages/shippingDifference/hooks/useShippingDifferenceFilterForm'
import { SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES } from '../../interfaces/_constants'

export const OrderDateTime = () => {
  const {dateTime} = useFilterForm()
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-form__input-wide"
      categoryList={SHIPPING_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={140}
      value={dateTime.value}
      categoryValue={dateTime.activeValue.type}
      triggerDefault={dateTime.triggerDefault}
      onChange={dateTime.onChange}
      datePickerProps={{
        defaultValue: dateTime.defaultValue,
        disabledDate: dateTime.disabledDate,
        placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
        cleanable: false
      }}
    />
  )
}
