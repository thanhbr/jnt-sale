import React, {useState} from 'react';
import {Button} from "../../../../common/button";
import {Input} from "../../../../common/form/input";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import InventoryInfoDateTime from "./inventoryInfoDateTime";
import {Grid} from "@material-ui/core";
import InventoryInfoExport from "./inventoryInfoExport";
import InventoryInfoRefundStatus from "./inventoryInfoRefundStatus";
import useHeaderGivebackProduct from "../../hooks/useHeaderGivebackProduct";
import GivebackProductTags from "./_givebackProductTags";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const FilterFormGivebackProduct = () => {
  const {t} = useTranslation()
  const { functions, canSubmitOtherFilter, badge, search } = useHeaderGivebackProduct()
  const [shouldCollapse, setShouldCollapse] = useState(false)

  return (
    <StyledGivebackProductFilterForm>
      <div className="giveback-product-filter-form__group">
        <Input
          className="giveback-product-filter-form__input-wide"
          icon={GIVEBACK_PRODUCT_ICONS.searchMd}
          placeholder={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.SEARCH)}
          value={search.value}
          onChange={(e) => functions.handleSearchList(e.target.value)}
        />
        <Button
          appearance="secondary"
          badge={
            badge.others > 0
              ? badge.others > 9
              ? '9+'
              : badge.others
              : undefined
          }
          badgeType="danger"
          icon={GIVEBACK_PRODUCT_ICONS.filterFunnel02}
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
            onClick={() =>
              canSubmitOtherFilter && functions.applyOrderOtherFilter()
            }
          >
            {t(DISPLAY_NAME_MENU.GENERAL.APPLY)}
          </Button>
        )}
      </div>
      <div
        className="giveback-product-filter-form__group giveback-product-filter-form__collapse"
        data-collapse={shouldCollapse}
      >

        <Grid container className="giveback-product-filter-wrapper">
          <Grid className="giveback-product-filter-item" item xs={3} sm={3} md={3}>
            <InventoryInfoDateTime />
          </Grid>
          <Grid className="giveback-product-filter-item--inventory" item xs={3} sm={3} md={3}>
            <InventoryInfoExport />
          </Grid>
          <Grid className="giveback-product-filter-item--status" item xs={3} sm={3} md={3}>
            <InventoryInfoRefundStatus />
          </Grid>
        </Grid>
      </div>
      <div className="giveback-product-filter-form__group-tag">
        <GivebackProductTags />
      </div>
    </StyledGivebackProductFilterForm>
  )
}

export default FilterFormGivebackProduct


export const StyledGivebackProductFilterForm = styled.div`
  //.giveback-product-filter-form__group
  .giveback-product-filter-form {
    &__group {
      width: calc(100% + 12px);
      margin: 0 -6px 16px -6px;

      display: flex;
      flex-wrap: wrap;
      align-items: center;

      & > * {
        margin: 0 6px;
      }
    }

    &__collapse {
      max-height: 0;
      margin-bottom: 0 !important;

      overflow: hidden;

      transition: all 0.25s;

      &[data-collapse='true'] {
        max-height: 50vh;
        margin-bottom: 16px !important;

        overflow: unset;
      }
    }

    &__input-wide {
      width: calc(25% - 12px);
      margin: 0 6px;

      @media screen and (max-width: 1599px) {
        width: calc((100% / 3) - 12px);
      }
    }

    &__option-text {
      min-height: 36px;

      display: flex;
      align-items: center;

      color: ${THEME_COLORS.gray_900};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;

      transition: color 0.25s;

      &[data-active='true'] {
        color: ${THEME_COLORS.primary_300};
        font-weight: 600;
      }
      &:hover {
        color: ${THEME_COLORS.primary_300};
      }
    }

    &__option-container {
      min-height: 45px;
      margin-bottom: 4px;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__option-tabs {
      position: sticky;
      top: 0;
      z-index: 1;

      width: 100%;
      height: 28px;
      margin-bottom: 16px;

      display: flex;
      align-items: center;

      background: #fff;

      &::before {
        position: absolute;
        top: -20px;
        left: -20px;

        width: calc(100% + 40px);
        height: calc(100% + 36px);

        background: #fff;
        border-radius: 8px 8px 0 0;

        content: '';
      }
    }

    &__option-tab {
      position: relative;
      z-index: 2;

      margin-right: 16px;

      color: #808089;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;

      &[data-active='true'] {
        color: ${THEME_COLORS.primary_300};
        font-weight: 600;

        cursor: default;
      }
    }

    &__collapse {
      .giveback-product--filter-form__input-wide {
        margin-bottom: 16px;
      }
    }
  }
  
  @media screen and (max-width: 1520px) {
    .giveback-product-filter-item {
      &--inventory {
        margin-left: 60px;
      }
      &--status {
        margin-left: 70px;
      }
    }
  }
  
  @media screen and (max-width: 1440px) {
    .giveback-product-filter-item {
      &--inventory {
        margin-left: 76px;
      }
      &--status {
        margin-left: 84px;
      }
    }
  }
  
  @media screen and (max-width: 1366px) {
    .giveback-product-filter-item {
      &--inventory {
        margin-left: 16px;
      }
      &--status {
        margin-left: 24px;
      }
    }
  }
`
