import React from 'react';
import {CategoryDateTimeRangePicker} from "../../../../common/form/datePicker/_categoryDateTimeRangePicker";
import {GIVEBACK_PRODUCT_FILTER_FORM_DATE_TIME_SORT_TYPES} from "../../interfaces/contants";
import useHeaderGivebackProduct from "../../hooks/useHeaderGivebackProduct";
import styled from "styled-components";

const InventoryInfoDateTime = () => {
  const {functions, disabledDate, filter} = useHeaderGivebackProduct()
  return (
    <StyledGivebackProductDateTime>
      <div className={'giveback-product-filter-date'}>
        <CategoryDateTimeRangePicker
          className="inventory-info-filter-form__input-wide"
          categoryList={GIVEBACK_PRODUCT_FILTER_FORM_DATE_TIME_SORT_TYPES}
          categoryWidth={125}
          value={filter?.dateTime?.value}
          // triggerDefault={filter?.dateTime?.trigger}
          onChange={value => functions.handleChangeDatetime(value)}
          datePickerProps={{
            defaultValue: '',
            // defaultValue: dateTime.defaultValue,
            disabledDate: disabledDate,
            placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
          }}
          style={{width: '24.5rem'}}
        />
      </div>
    </StyledGivebackProductDateTime>
  )
}

export default InventoryInfoDateTime


export const StyledGivebackProductDateTime = styled.div`
  .giveback-product-filter-date .rs-picker-toggle-value {
    font-size: 13px;
  }
`
