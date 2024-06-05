import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/refactorOrder/interfaces/_constants'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";

export const OrderDateTime = () => {
  const {dateTime} = useFacebookFilterForm()
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-facebook-form__input-wide"
      categoryList={ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={125}
      value={dateTime.value}
      triggerDefault={dateTime.triggerDefault}
      onChange={dateTime.onChange}
      datePickerProps={{
        defaultValue: dateTime.defaultValue,
        disabledDate: dateTime.disabledDate,
        placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
      }}
    />
  )
}
