import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFilterForm from 'Pages/CashBooks/hooks/useCashBooksFilterForm'
import {CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/CashBooks/interfaces/_constants'

export const CashBooksDateTime = () => {
  const {dateTime} = useFilterForm()
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-form__input-wide"
      categoryList={CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={94}
      value={dateTime.value}
      categoryValue={dateTime.activeValue.type}
      triggerDefault={dateTime.triggerDefault}
      onChange={dateTime.onChange}
      datePickerProps={{
        defaultValue: dateTime.defaultValue,
        disabledDate: dateTime.disabledDate,
        placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
        cleanable: false,
      }}
    />
  )
}
