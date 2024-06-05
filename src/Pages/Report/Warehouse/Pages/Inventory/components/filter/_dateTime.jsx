import React from 'react';
import {CategoryDateTimeRangePicker} from "../../../../../../../common/form/datePicker/_categoryDateTimeRangePicker";
import {REPORT_INVENTORY__FILTER_FORM_DATE_TIME_SORT_TYPES} from "../../interfaces/_contant";
import useFilterReportInventory from "../../hooks/useFilterReportInventory";

const DateTime = () => {
  const {dateTime} = useFilterReportInventory()

  return (
    <CategoryDateTimeRangePicker
      className="report-inventory-filter-form__input-wide"
      categoryList={REPORT_INVENTORY__FILTER_FORM_DATE_TIME_SORT_TYPES}
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

export default DateTime;