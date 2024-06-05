import React from 'react';
import Box from "@mui/material/Box";
import {Input} from "../../../../common/form/input";
import {Button} from "../../../../common/button";
import {Grid} from "@mui/material";
import {ICONS} from "../../interfaces/~icon";
import styled from "styled-components";
import FilterWarehouse from "./~filterWarehouse";
import FilterQuota from "./~filterQuota";
import FilterQuantityWaiting from "./~filterQuantityWaiting";
import useFilterInventoryInformation from "../../hooks/useFilterInventoryInformation";
import TagInventoryInfo from "./~tagInventoryInfo";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const InventoryInfoFilter = () => {
  const {t} = useTranslation()
  const {shouldCollapse, search, functions, countTagFilter} = useFilterInventoryInformation()

  return (
    <StyledInventoryInfoFilter>
      <Box
        component="div"
        noValidate
        autoComplete="off"
        className={"inventory-information-filter"}
      >
        <div className="inventory-information-filter__group">
          <Input
            className="inventory-information-filter__input-wide"
            icon={ICONS.searchMd}
            placeholder={t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.SEARCH_HEADER)}
            autoComplete={'false'}
            value={search?.value || ''}
            onChange={e => search.onChangeKeywordSearch(e?.target?.value)}
          />
          <Button
            appearance="secondary"
            badgeType="danger"
            icon={ICONS.filterFunnel02}
            size="md-"
            className={'inventory-information-filter__order'}
            badge={
              +countTagFilter > 0
                ? +countTagFilter > 9
                ? '9+'
                : +countTagFilter
                : undefined
            }
            onClick={() => functions?.onChangeShouldCollapse()}
          >
            {t(DISPLAY_NAME_MENU.GENERAL.OTHER_FILTERS)}
          </Button>
          {shouldCollapse && (
            <Button
              appearance="secondary"
              size="md-"
              disabled={!functions?.canSubmitOtherFilter}
              onClick={() => functions?.canSubmitOtherFilter && functions.applyProductOtherFilter()}
              style={{padding: '0 23px'}}
            >
              {t(DISPLAY_NAME_MENU.GENERAL.APPLY)}
            </Button>
          )}
        </div>
        {shouldCollapse && (
          <div
            className="inventory-information-filter__collapse"
            // data-collapse={shouldCollapse}
          >
            <Grid container className={"inventory-information-filter__collapse-group"}>
              <Grid item xs={3} sm={3} md={3} lg={3} >
                <div className={"inventory-information-filter__user-status"}>
                  <FilterWarehouse />
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} >
                <div className={"inventory-information-filter__user-role"}>
                  <FilterQuota />
                </div>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} >
                <div className={"inventory-information-filter__user-role inventory-information-filter__user-role--waiting"}>
                  <FilterQuantityWaiting />
                </div>
              </Grid>
            </Grid>
          </div>
        )}
        {/*{state.showTag && <Tag />}*/}
      </Box>
      <div className="inventory-information-filter-form__group" style={{marginBottom: 4}}>
        <TagInventoryInfo />
      </div>
    </StyledInventoryInfoFilter>
  );
};

export default InventoryInfoFilter

const StyledInventoryInfoFilter = styled.div`
  .inventory-information-filter {
    background: white;
    padding: 0 0 1rem 0;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    &__group {
      display: flex;
      .button__container {
        svg {
          height: 15px !important;
          width: 16px !important;
        }
        span {
          font-size: 14px;
        }
      }
    }
    &__input-wide {
      width: 24.5rem;
      margin-right: .75rem;
    }
    &__order {
      margin-right: .75rem;
    }
    &__collapse-group {
      margin-top: 16px;
    }
    &__user-status {
      max-width: 24.5rem;
      margin-right: .5rem;
    }
    &__user-role {
      margin-left: 4px;
      max-width: 24.5rem;
      &--waiting {
        max-width: 26rem;
      }
    }
    &-form__option-text {
      padding: 8px 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 129%;
      cursor: pointer;
      &:hover {
        color: rgb(30, 154, 152);
      }
      &[data-active='true'] {
        color: var(--bg-pr-large-default);
      }
    }
  }
  .user-management-filter-collapse__input-wide {
    .category-input__menu-toggle {
      width: 155px !important;
    }
    .category-input__input .input__input {
      padding-left: 160px !important;
    }
  }
  @media (min-width: 1280px) and (max-width: 1440px) {
    .user-management-filter__user-status {
      width: 325px;
    }
    .user-management-filter__user-role {
      margin-left: 60px;
      width: 316px;
    }
}
  
`