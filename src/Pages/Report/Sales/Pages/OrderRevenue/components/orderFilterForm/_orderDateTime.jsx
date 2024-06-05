import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useOrderFilterForm from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderFilterForm'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/Report/Sales/Pages/OrderRevenue/interfaces/_constants'

export const OrderDateTime = () => {
  const {dateTime} = useOrderFilterForm()
  
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
        cleanable:false
      }}
    />
  )
}
