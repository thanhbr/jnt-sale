import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from 'Pages/refactorOrder/interfaces/_constants'
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";

export const OrderDateTime = () => {
  const {dateTime} = useInventoryFilterForm()
  return (
    <CategoryDateTimeRangePicker
      className="order-filter-form__input-wide"
      categoryList={[{id: 1, name: 'Ngày tạo phiếu', value: 'created'}]}
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
