import React, {useState} from 'react';
import {Grid} from "@mui/material";
import {Button} from "../../../../common/button";
import ReceiptSearch from "./~receiptSearch";
import ReceiptDateTime from "./receiptDateTime";
import ReceiptGroupSubmitter from "./receiptGroupSubmitter";
import ReceiptPayment from "./receiptPayment";
import ReceiptEmployee from "./receiptEmployee";
import ReceiptType from "./receiptType";
import ReceiptTags from "./receiptTags";
import styled from "styled-components";
import useReceiptFilter from "../../hooks/useReceiptFilter";
import {RECEIPT_ICONS} from "../../interfaces/icon";

const ReceiptFilterForm = ({...props}) => {
  const {methods, canSubmitOtherFilter, countOtherFilter} = useReceiptFilter()
  const [shouldCollapse, setShouldCollapse] = useState(false)

  return (
    <StyledReceiptFilterForm {...props}>
      <div className="receipt-filter-form__group">
        <Grid container spacing={1}>
          <Grid xs={3} sm={3} md={3} lg={3} item>
            <ReceiptSearch />
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} item style={{display: 'flex'}}>
            <Button
              appearance="secondary"
              badge={countOtherFilter}
              badgeType="danger"
              icon={RECEIPT_ICONS.filterFunnel02}
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
              className="receipt-filter-form__group receipt-filter-form__collapse"
              data-collapse={shouldCollapse}
            >
              <Grid container spacing={1}>
                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16, paddingRight: 3}}>
                  <ReceiptDateTime />
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16, paddingRight: 3}}>
                  <ReceiptGroupSubmitter />
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16, paddingRight: 3}}>
                  <ReceiptPayment />
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16, paddingRight: 3}}>
                  <ReceiptEmployee />
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 8, paddingRight: 3}}>
                  <ReceiptType />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
            <div className="receipt-filter-form__group">
              <ReceiptTags />
            </div>
          </Grid>
        </Grid>

      </div>
    </StyledReceiptFilterForm>
  )
}

export default ReceiptFilterForm

const StyledReceiptFilterForm = styled.div`
  .receipt-filter-form__collapse[data-collapse='false'] {
    height: 0;
    overflow: hidden;
  }
  .receipt-filter-form__option-text {
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
  .receipts-filter-form__input-wide {
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
      & .receipt-filter-form__option-text[data-active='true'] span {
        color: rgb(229, 16, 29) !important;
      }
    }
  }
`