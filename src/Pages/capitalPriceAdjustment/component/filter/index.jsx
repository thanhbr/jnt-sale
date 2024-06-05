import React, {useState} from 'react';
import {Input} from "../../../../common/form/input";
import {Button} from "../../../../common/button";
import {Grid} from "@material-ui/core";
import styled from "styled-components";
import {PRICE_ADJUSTMENT_ICONS} from "../../interfaces/_icon";
import DateCreate from "./~dateCreate";
import EmployeeCreate from "./~employeeCreate";
import CapitalAdjustmentTag from "./~capitalAdjustmentTag";
import useFilterCapitalAdjustment from "../../hooks/useFilterCapitalAdjustment";

const FilterCapitalAdjustment = () => {
  const {search, filter} = useFilterCapitalAdjustment()
  const [shouldCollapse, setShouldCollapse] = useState(false)

  return (
    <StyledFilterCapitalAdjustment>
      <div className="capital-adjustment-filter-form__group">

        <Grid container className="capital-adjustment-filter-wrapper">
          <Grid className="capital-adjustment-filter-item" item xs={3} sm={3} md={3}>
            <Input
              className="capital-adjustment-filter-form__input-wide"
              icon={PRICE_ADJUSTMENT_ICONS.searchMd}
              placeholder="Tìm kiếm theo mã phiếu điều chỉnh"
              value={search.value}
              onChange={e => search.onChange(e.target.value)}
            />
          </Grid>
          <Grid className="capital-adjustment-filter-item--group-btn" item xs={3} sm={3} md={3}>
            <Button
              appearance="secondary"
              badge={
                filter.otherFilterBadge > 0
                  ? filter.otherFilterBadge > 9
                    ? '9+'
                    : filter.otherFilterBadge
                  : undefined
              }
              badgeType="danger"
              icon={PRICE_ADJUSTMENT_ICONS.filterFunnel02}
              size="md-"
              className={'capital-adjustment-filter-item--filter'}
              onClick={() => setShouldCollapse(!shouldCollapse)}
            >
              Bộ lọc khác
            </Button>
            {shouldCollapse && (
            <Button
              appearance="secondary"
              disabled={!filter?.canSubmitFilter}
              size="md-"
              className={'capital-adjustment-filter-item--apply'}
              onClick={() =>
                filter?.canSubmitFilter && filter?.applyOrderOtherFilter()
              }
            >
              Áp dụng
            </Button>
            )}
          </Grid>
        </Grid>
      </div>
      <div
        className="capital-adjustment-filter-form__group capital-adjustment-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <Grid container className="capital-adjustment-filter-wrapper">
          <Grid className="capital-adjustment-filter-item" item xs={3} sm={3} md={3}>
            <DateCreate />
          </Grid>
          <Grid className="capital-adjustment-filter-item" item xs={3} sm={3} md={3}>
            <EmployeeCreate />
          </Grid>
        </Grid>
      </div>
      <div className="capital-adjustment-filter-form__group-tag">
        <CapitalAdjustmentTag />
      </div>
    </StyledFilterCapitalAdjustment>
  )
}

export default FilterCapitalAdjustment


export const StyledFilterCapitalAdjustment = styled.div`\
.MuiGrid-grid-md-3{
  @media screen and (max-width: 1440px){
    max-width: 28%;
    margin-right: 8px;
  }
  @media screen and (max-width: 1280px){
    max-width: 30%;
    margin-right: 8px;
  }
}
  .capital-adjustment-filter {
    &-form__input-wide {
      margin-right: 9px;
    }
    &-item {
      &--group-btn {
        display: flex;
      }
      &--filter {
        width: 121px;
        margin-right: 8px;
      }
      &--apply {
        width: 101px;
      }
    }
    &-form__collapse {
      margin-top: 16px;
      &[data-collapse='false'] {
        margin: 0;
        height: 0;
        overflow: hidden;
      }
    }
    &-form__option-text {
      margin: 16px 0;
      cursor: pointer;
      &:hover span {
        color: rgb(229, 16, 29) !important; 
      }
    }
  }
  .capital-adjustment-form__input-wide {
    width: 24.5rem;
  }
  @media screen and (max-width: 1599px) {
    .capital-adjustment-form__input-wide {
      width: 21rem;
    }
  }
  @media screen and (max-width: 1440px) {
    .capital-adjustment-form__input-wide {
      width: 19.5rem;
    }
  }
  @media screen and (max-width: 1366px) {
    .capital-adjustment-form__input-wide {
      width: 23rem;
    }
  }
`
