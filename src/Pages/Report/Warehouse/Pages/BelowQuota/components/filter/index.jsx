import React from "react";
import {Grid} from "@mui/material";
import {Button} from "../../../../../../../common/button";
import styled from "styled-components";
import Inventory from "./_inventory";
import Search from "./_search";
import useFilter from "../../hooks/useFilter";
import Tag from "./_tag";
import { useTranslation } from 'react-i18next'

const Filter = ({...props}) => {
  const {filter} = useFilter()
  const {t} = useTranslation()
  return (
    <StyledFilterForm {...props}>
      <div className="report-below-quota-filter-form__group">
        <Grid container spacing={1}>
          <Grid xs={3} sm={3} md={3} lg={3} item>
            <Search />
          </Grid>
          <Grid xs={3} sm={3} md={3} lg={3} item>
            <Inventory />
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} item style={{display: 'flex'}}>
            <Button
              appearance="secondary"
              disabled={!filter?.canSubmitOtherFilter}
              size="md-"
              onClick={() => filter?.canSubmitOtherFilter && filter?.applyOtherFilter() }
              style={{width: 101}}
            >
              {t('general_apply')}
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
            <div className="report-below-quota-filter-form__group">
              <Tag />
            </div>
          </Grid>
        </Grid>

      </div>
    </StyledFilterForm>
  )
}

export default Filter

const StyledFilterForm = styled.div`
  .report-below-quota-filter-form__collapse[data-collapse='false'] {
    height: 0;
    overflow: hidden;
  }
  .report-below-quota-filter-form__option-text {
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
    
    &:hover span {
      color: rgb(229, 16, 29) !important;
    }
    
    &[data-active="true"] span {
      color: rgb(229, 16, 29) !important;
    }
  }
  .report-below-quota-filter-form__input-wide {
    max-width: 24.5rem;
    & .auto-complete__option-container span:hover {
      color: rgb(229, 16, 29) !important;
    }
    & .report-below-quota-filter-form__option-text[data-active='true'] span {
      color: rgb(229, 16, 29) !important;
    }
  }
`