import React, {useState} from 'react';
import {Grid} from "@mui/material";
import {Button} from "../../../../../../../common/button";
import {RECEIPT_ICONS} from "../../../../../../receiptManagement/interfaces/icon";
import styled from "styled-components";
import Search from "./_search";
import Inventory from "./_inventory";
import GroupProduct from "./_groupProduct";
import Tags from "./_tags";
import Panel from "./_panel";
import useFilterReportInventory from "../../hooks/useFilterReportInventory";
import { useTranslation } from 'react-i18next'

const Filter = ({...props}) => {
  const {filter} = useFilterReportInventory()
  const [shouldCollapse, setShouldCollapse] = useState(false)
  const {t} = useTranslation()
  return (
    <StyledFilterForm {...props}>
      <div className="report-inventory-filter-form__group">
        <Grid container spacing={1}>
          <Grid xs={3} sm={3} md={3} lg={3} item>
            <Search />
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} item style={{display: 'flex'}}>
            <Button
              appearance="secondary"
              badge={filter?.countReportInventoryFilter}
              badgeType="danger"
              icon={RECEIPT_ICONS.filterFunnel02}
              size="md-"
              onClick={() => setShouldCollapse(!shouldCollapse)}
            >
              {t('general_other_filters')}
            </Button>
            {shouldCollapse && (
              <Button
                appearance="secondary"
                disabled={!filter?.canSubmitOtherFilter}
                size="md-"
                onClick={() => filter?.canSubmitOtherFilter && filter?.applyOtherFilter() }
                style={{marginLeft: 8}}
              >
                {t('general_apply')}
              </Button>
            )}
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
            <div
              className="report-inventory-filter-form__group report-inventory-filter-form__collapse"
              data-collapse={shouldCollapse}
            >
              <Grid container spacing={1}>
                {/*<Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16, paddingRight: 3}}>*/}
                {/*  <DateTime />*/}
                {/*</Grid>*/}
                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16, paddingRight: 3}}>
                  <Inventory />
                </Grid>
                <Grid xs={3} sm={3} md={3} lg={3} item style={{marginTop: 16, paddingRight: 3}}>
                  <GroupProduct />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
            <div className="report-inventory-filter-form__group">
              <Tags />
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} item style={{paddingTop: 0}}>
            <div className="report-inventory-filter-form__group">
              <Panel />
            </div>
          </Grid>
        </Grid>

      </div>
    </StyledFilterForm>
  )
}

export default Filter

const StyledFilterForm = styled.div`
  .rs-btn-close {
    display: none;
  }
  .report-inventory-filter-form__collapse[data-collapse='false'] {
    height: 0;
    overflow: hidden;
  }
  .report-inventory-filter-form__option-text {
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
      & .report-inventory-filter-form__option-text[data-active='true'] span {
        color: rgb(229, 16, 29) !important;
      }
    }
  }
`