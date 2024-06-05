import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";

export const OrderDateTime = () => {
  const {dateTime} = useFacebookFilterForm()
  const ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES = [
    {id: 1, name: 'Ngày tạo', value: 'created'},
  ]
  return (
    <CategoryDateTimeRangePicker
      className="livestream-filter-facebook-form__input-date-time"
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
