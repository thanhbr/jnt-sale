import React from 'react';
import {Grid} from "@mui/material";
import GroupSubmitter from "./~groupSubmitter";
import Submitter from "./~submitter";
import ReceiptType from "./~receiptType";
import ReceiptCode from "./~receiptCode";
import styled from "styled-components";

const ReceiptGeneralCreate = () => {
  return (
    <StyledReceiptGeneralCreate>
      <Grid container>
        <Grid xs={6} sm={6} md={6} lg={6} item style={{paddingRight: 8}}>
          <GroupSubmitter />
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item style={{paddingLeft: 8}}>
          <Submitter />
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item style={{padding: '24px 8px 0 0'}}>
          <ReceiptType />
        </Grid>
        <Grid xs={6} sm={6} md={6} lg={6} item style={{padding: '24px 0 0 8px'}}>
          <ReceiptCode />
        </Grid>
      </Grid>
    </StyledReceiptGeneralCreate>
  )
}

export default ReceiptGeneralCreate

export const StyledReceiptGeneralCreate = styled.div`
  .receipt-create__option-text:hover span,
  .receipt-create__option-text:hover p,
  .receipt-create__option-text[data-active='true'] span,  
  .receipt-create__option-text[data-active='true'] p  {
    color: rgb(229, 16, 29) !important;
  }
  .alternative-auto-complete__menu-header {
    padding-top: 20px;
  }
  
  .receipt-create__option-text {
    display: flex;
    &__avatar {
      background: #1E9A98;
      width: 32px;
      height: 32px;
      padding: 5px 8px;
      border-radius: 50%;
      text-transform: uppercase;
      margin-right: 12px;
    }
  }
  .receipt-create__option-link {
    position: absolute;
    right: 24px;
    font-size: 14px;
    color: #1A94FF;
    z-index: 2;
    svg {
      position: absolute;
      left: -18px;
    }
  }
  //.receipt-create__option--supplier {
  //  .alternative-auto-complete__menu {
  //    height: 218px;
  //  }
  //}
  .receipt-create__option--customer {
    .alternative-auto-complete__menu {
      height: 298px;
    }
  }
`
