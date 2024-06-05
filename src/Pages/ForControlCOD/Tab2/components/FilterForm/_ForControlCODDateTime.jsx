import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFilterForm from 'Pages/ForControlCOD/Tab2/hooks/useForControlCODFilterForm'
import {ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/ForControlCOD/Tab2/interfaces/_constants'

export const ForControlCODDateTime = () => {
  const {dateTime} = useFilterForm()
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-form__input-wide"
      categoryList={ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={110}
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
