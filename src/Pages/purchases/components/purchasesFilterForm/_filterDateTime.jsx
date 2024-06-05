import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFilterForm from 'Pages/purchases/hooks/useFilter'
import {PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/purchases/interfaces/_constants'

export const FilterDateTime = () => {
  const {dateTime} = useFilterForm()
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-form__input-wide"
      categoryList={PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={130}
      value={dateTime.value}
      categoryValue={dateTime.activeValue.type}
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
