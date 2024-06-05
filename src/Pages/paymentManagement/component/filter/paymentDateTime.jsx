import React from 'react';
import {CategoryDateTimeRangePicker} from "../../../../common/form/datePicker/_categoryDateTimeRangePicker";
import styled from "styled-components"
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";
import {PAYMENT_MANAGEMENT_FILTER_FORM_DATE_TIME_SORT_TYPES} from "../../interfaces/_const";

const PaymentDateTime = () => {
    const {dateTime} = usePaymentManagementFilter()

    return (
        <StyledCategoryDateTimeRangePicker>
            <CategoryDateTimeRangePicker
                className="payment-management-filter-form__input-wide"
                categoryList={PAYMENT_MANAGEMENT_FILTER_FORM_DATE_TIME_SORT_TYPES}
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

export default PaymentDateTime

export const StyledCategoryDateTimeRangePicker = styled.div`
  .payment-management-filter-form__input-wide {
    .rs-btn-close {
      display: none;
    }
  }
`
