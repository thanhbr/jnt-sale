import React, {memo, useState} from 'react';
import {Button} from "../../../../common/button";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {ProductSearch} from "./~productSearch";
import styled from "styled-components";
import {Grid} from "@mui/material";
import FilterStatus from "./~filterStatus";
import FilterGroupProduct from "./~filterGroupProduct";
import useProductFilterForm from "../../hooks/useProductFilterForm";
import ProductTags from "./~productTags";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const ProductFilterForm = memo(({...props}) => {
  const { t } = useTranslation()
  const [shouldCollapse, setShouldCollapse] = useState(false)
  const {functions, canSubmitOtherFilter, countOtherFilter} = useProductFilterForm()

  return (
    <StyledProductFilterForm {...props}>
      <div className="product-filter-form__group">
        <Grid container spacing={1}>
          <Grid xs={3} sm={3} md={3} lg={3} item>
            <ProductSearch />
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
              {t(DISPLAY_NAME_MENU.GENERAL.OTHER_FILTERS)}
            </Button>
            {shouldCollapse && (
              <Button
                appearance="secondary"
                disabled={!canSubmitOtherFilter}
                size="md-"
                onClick={() => canSubmitOtherFilter && functions.applyOrderOtherFilter() }
                // onClick={() => canSubmitOtherFilter && functions.applyOrderOtherFilter() }
                style={{marginLeft: 8}}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.APPLY)}
              </Button>
            )}
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item>
            <div
              className="product-filter-form__group product-filter-form__collapse"
              data-collapse={shouldCollapse}
            >
              <Grid container  spacing={1} style={{marginTop: 4}}>
                <Grid xs={3} sm={3} md={3} lg={3} item>
                  <FilterStatus />
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} item className={'product-filter-form__group--product'}>
                  <FilterGroupProduct />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
            <div className="product-filter-form__group" style={{marginBottom: 4}}>
              <ProductTags />
            </div>
          </Grid>
        </Grid>

      </div>
    </StyledProductFilterForm>
  );
})


export const StyledProductFilterForm = styled.div`
  .product-filter-form {
    &__collapse {
      max-height: 0;
      margin-bottom: 0 !important;

      overflow: hidden;

      transition: all 0.25s;

      &[data-collapse='true'] {
        max-height: 50vh;
        margin-bottom: 16px;

        overflow: unset;
      }
    }
    @media only screen and (max-width : 1440px ){
      &__group--product .category-input__menu-toggle {
        width: 127px !important;
      }
      &__group--product .category-input__input input {
        padding-left: 138px !important;
      }
    }
  }
`
