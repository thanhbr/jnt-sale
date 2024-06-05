import React from 'react';
import {CategoryDateTimeRangePicker} from "../../../../common/form/datePicker/_categoryDateTimeRangePicker";
import {PRICE_ADJUSTMENT_FILTER_FORM_DATE_TIME_SORT_TYPES} from "../../interfaces/_const";
import useFilterCapitalAdjustment from "../../hooks/useFilterCapitalAdjustment";
import {afterToday} from "rsuite/esm/DateRangePicker/disabledDateUtils";

const DateCreate = () => {
  const {dateTime} = useFilterCapitalAdjustment()
  return (
    <CategoryDateTimeRangePicker
      className="capital-adjustment-form__input-wide"
      categoryList={PRICE_ADJUSTMENT_FILTER_FORM_DATE_TIME_SORT_TYPES}
      categoryWidth={125}
      value={dateTime.value}
      triggerDefault={dateTime.triggerDefault}
      onChange={dateTime.onChange}
      datePickerProps={{
        defaultValue: [],
        disabledDate: afterToday(),
        placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
        cleanable:false
      }}
    />
  )
}

export default DateCreate;