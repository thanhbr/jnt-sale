import React, {useState} from 'react';
import {Grid} from "@mui/material";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";
import PaymentSearch from "./_paymentManagementSearch";
import PaymentDateTime from "./paymentDateTime";
import PaymentGroupSubmitter from "./paymentGroupSubmitter";
import RecipientPayment from "./recipientPayment";
import PaymentEmployee from "./paymentEmployee";
import PaymentType from "./paymentType";
import PaymentTags from "./paymentTags";
import {PAYMENT_MANAGEMENT_ICONS} from "../../interfaces/icon";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";

const PaymentManagementFilterForm = ({...props}) => {
    const {methods, canSubmitOtherFilter, countOtherFilter} = usePaymentManagementFilter()
    const [shouldCollapse, setShouldCollapse] = useState(false)

    return (
        <StyledReceiptFilterForm {...props}>
            <div className="payment-management-filter-form__group">
                <Grid container spacing={1}>
                    <Grid xs={3} sm={3} md={3} lg={3} item>
                        <PaymentSearch />
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} item style={{display: 'flex'}}>
                        <Button
                            appearance="secondary"
                            badge={countOtherFilter}
                            badgeType="danger"
                            icon={ORDER_ICONS.filterFunnel02}
                            size="md-"
                            onClick={() => setShouldCollapse(!shouldCollapse)}
                        >
                            Bộ lọc khác
                        </Button>
                        {shouldCollapse && (
                            <Button
                                appearance="secondary"
                                disabled={!canSubmitOtherFilter}
                                size="md-"
                                onClick={() => canSubmitOtherFilter && methods.applyOrderOtherFilter() }
                                style={{marginLeft: 8}}
                            >
                                Áp dụng
                            </Button>
                        )}
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
                        <div
                            className="payment-management-filter-form__group payment-management-filter-form__collapse"
                            data-collapse={shouldCollapse}
                        >
                            <Grid container spacing={1}>
                                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16}}>
                                    <PaymentDateTime />
                                </Grid>
                                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16}}>
                                    <PaymentGroupSubmitter />
                                </Grid>
                                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16}}>
                                    <RecipientPayment />
                                </Grid>
                                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16}}>
                                    <PaymentEmployee />
                                </Grid>
                                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 8}}>
                                    <PaymentType />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
                        <div className="payment-management-filter-form__group">
                            <PaymentTags />
                        </div>
                    </Grid>
                </Grid>

            </div>
        </StyledReceiptFilterForm>
    )
}

export default PaymentManagementFilterForm

const StyledReceiptFilterForm = styled.div`
  .payment-management-filter-form__collapse[data-collapse='false'] {
    height: 0;
    overflow: hidden;
  }
  .payment-management-filter-form__option-text {
    min-height: 36px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(21, 22, 36);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    cursor: pointer;
    transition: color 0.25s ease 0s;
  }
  .payment-management-filter-form__input-wide {
    &--submitter {
      //& .alternative-auto-complete__menu.common-scrollbar {
      //  padding-top: 12px;
      //}
      //& .alternative-auto-complete__menu-header {
      //  display: none !important;
      //}
      & .auto-complete__option-container span:hover {
        color: rgb(229, 16, 29) !important;
      }
      & .payment-management-filter-form__option-text[data-active='true'] span {
        color: rgb(229, 16, 29) !important;
      }
    }
  }
`