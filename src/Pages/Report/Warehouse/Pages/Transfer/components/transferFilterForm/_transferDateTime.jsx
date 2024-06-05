import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useTransferFilterForm from 'Pages/Report/Warehouse/Pages/Transfer/hooks/useTransferFilterForm'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/Report/Warehouse/Pages/Transfer/interfaces/_constants'

export const TransferDateTime = () => {
  const {dateTime} = useTransferFilterForm()
  
  return (
    <CategoryDateTimeRangePicker
      className="import-filter-form__input-wide"
      categoryList={ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={130}
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
