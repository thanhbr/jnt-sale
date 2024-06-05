import React from 'react';
import {Grid} from "@mui/material";
import ProductTable from "./productTable";
import styled from "styled-components";
import ProductWarehouse from "./_productWarehouse";
import ProductPriceType from "./_productPriceType";
import ProductSearch from "./_productSearch";

const ProductInformation = () => {
  return (
    <StyledProductInformation>
      <Grid container>
        <Grid xs={2} sm={2} md={2} lg={2} item >
          <div style={{width: '11rem'}}>
            <ProductWarehouse />
          </div>
        </Grid>
        <Grid xs={2} sm={2} md={2} lg={2} item >
          <div style={{width: '11rem', marginLeft: '2.625rem'}}>
            <ProductPriceType />
          </div>
        </Grid>
        <Grid xs={8} sm={8} md={8} lg={8} item >
          <div style={{width: '32.0625rem', marginLeft: '5.25rem'}}>
            <ProductSearch />
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item >
          <div>
            <ProductTable />
          </div>
        </Grid>
      </Grid>
    </StyledProductInformation>
  );
};

export default ProductInformation;

export const StyledProductInformation = styled.div`
  .product-filter-form__input-wide--price {
    .alternative-auto-complete__menu-header {
      display: none !important;
    }
    .auto-complete__option-container {
      margin-top: 8px;
    }
  }
`
