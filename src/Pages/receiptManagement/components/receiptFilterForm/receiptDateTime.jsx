import React from 'react';
import {CategoryDateTimeRangePicker} from "../../../../common/form/datePicker/_categoryDateTimeRangePicker";
import {RECEIPT_FILTER_FORM_DATE_TIME_SORT_TYPES} from "../../interfaces/contant";
import styled from "styled-components";
import useReceiptFilter from "../../hooks/useReceiptFilter";

const ReceiptDateTime = () => {
  const {dateTime} = useReceiptFilter()

  return (
    <StyledCategoryDateTimeRangePicker>
      <CategoryDateTimeRangePicker
        className="receipt-filter-form__input-wide"
        categoryList={RECEIPT_FILTER_FORM_DATE_TIME_SORT_TYPES}
        categoryWidth={125}
        value={dateTime.value}
        triggerDefault={dateTime.triggerDefault}
        onChange={dateTime.onChange}
        datePickerProps={{
          defaultValue: '',
          // defaultValue: dateTime.defaultValue,
          disabledDate: dateTime.disabledDate,
          placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
        }}
      />
    </StyledCategoryDateTimeRangePicker>
  )
}

export default ReceiptDateTime

export const StyledCategoryDateTimeRangePicker = styled.div`
  .receipt-filter-form__input-wide {
    .rs-btn-close {
      display: none;
    }
  }
`
