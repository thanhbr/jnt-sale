import React from 'react';
import {Grid} from "@mui/material";
import PaymentMethod from "./~paymentMethod";
import RevenueValue from "./~revenueValue";
import styled from "styled-components";

const ReceiptPaymentCreate = () => {
  return (
    <StyledReceiptPaymentCreate>
      <Grid container>
        <Grid xs={6} sm={6} md={6} lg={6} item style={{paddingRight: 8}}>
          <PaymentMethod />
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item style={{paddingLeft: 8}}>
          <RevenueValue/>
        </Grid>
      </Grid>
    </StyledReceiptPaymentCreate>
  )
}

export default ReceiptPaymentCreate


export const StyledReceiptPaymentCreate = styled.div`
  .receipt-create__option-text:hover span,
  .receipt-create__option-text[data-active='true'] span {
    color: rgb(229, 16, 29) !important;
  }
`
