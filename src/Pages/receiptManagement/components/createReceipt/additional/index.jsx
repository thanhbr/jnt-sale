import React from 'react';
import {Grid} from "@mui/material";
import UseCreate from "./~useCreate";
import RecordDate from "./~recordDate";
import ReceiptStore from "./~receiptStore";
import ReceiptDescription from "./~receiptDescription";
import ReferenceDocs from "./~referenceDocs";
import styled from "styled-components";

const ReceiptAdditionalCreate = () => {
  return (
    <StyledReceiptAdditionalCreate>
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <UseCreate />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item style={{marginTop: 48}}>
          <RecordDate />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item style={{marginTop: 24}}>
          <ReferenceDocs />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item style={{marginTop: 24}}>
          <ReceiptStore />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item style={{marginTop: 24}}>
          <ReceiptDescription />
        </Grid>
      </Grid>
    </StyledReceiptAdditionalCreate>
  )
}

export default ReceiptAdditionalCreate

export const StyledReceiptAdditionalCreate = styled.div`
  .rs-btn-close {
    display: none;
  }
`
