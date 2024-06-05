import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useImportFilterForm from 'Pages/Report/Warehouse/Pages/Import/hooks/useImportFilterForm'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/Report/Warehouse/Pages/Import/interfaces/_constants'

export const ImportDateTime = () => {
  const {dateTime} = useImportFilterForm()
  
  return (
    <CategoryDateTimeRangePicker
      className="import-filter-form__input-wide"
      categoryList={ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={125}
      value={dateTime.value}
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
