import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import useFilterForm from '../../hooks/useCodFilterForm'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES} from '../../interfaces/_constants'
import {useTranslation} from "react-i18next";

export const OrderDateTime = () => {
  const {dateTime} = useFilterForm()
  const { t } = useTranslation()
  return (
    <CategoryDateTimeRangePicker
      className="order-cod-filter-form__input-wide-item"
      categoryList={ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={128}
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
