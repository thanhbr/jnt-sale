import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'
import {WAREHOUSE_TS_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/WareHouseTransfer/interfaces/_constants'

export const OrderDateTime = () => {
  const {dateTime} = useFilterForm()
  return (
    <CategoryDateTimeRangePicker
      className="warehouse-ts-filter-form__input-wide"
      categoryList={WAREHOUSE_TS_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={125}
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
