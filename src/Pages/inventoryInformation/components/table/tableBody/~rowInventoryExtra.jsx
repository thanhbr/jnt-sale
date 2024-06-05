import React, {useContext} from 'react';
import styled from "styled-components";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import {INVENTORY_TABLE_ROW_EXTRA_TABS} from "../../../interfaces/~contants";
import {Text} from "../../../../../common/text";
import {fNumber} from "../../../../../util/formatNumber";
import {InventoryInformationContext} from "../../../provider/~context";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const RowInventoryExtra = ({ id, active, data, rowData, ...props }) => {
  const {t} = useTranslation()
  const { pageState, pageDispatch } = useContext(InventoryInformationContext)
  const dataDetail = pageState?.table?.detail?.list
  return (
    <StyledRowInventoryExtra {...props} data-active={active}>
      {active && (
        <div className="row-inventory-extra__container">
          <div className="row-inventory-extra__tabs">
            {INVENTORY_TABLE_ROW_EXTRA_TABS.map(item => (
              <div
                key={item.id}
                className="row-inventory-extra__tab"
                data-active={true}
                // data-active={item.value === activeTab}
                // onClick={() => setActiveTab(item.value)}
              >
                {t(item.name)}
              </div>
            ))}
          </div>
          <div className={'row-inventory-extra__table'}>
            <Text className={'row-inventory-extra__table--title'}>{t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.INFO)}</Text>
            <div>
              <div className={'row-inventory-extra__thead'}>
                <div className={'row-inventory-extra__thead--tr'}>{t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE)}</div>
                <div className={'row-inventory-extra__thead--tr'}>{t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.QUANTITY)}</div>
                <div className={'row-inventory-extra__thead--tr'}>{t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.WAITING_EXPORT)}</div>
                <div className={'row-inventory-extra__thead--tr'}>{t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.WAITING_IMPORT)}</div>
              </div>
              <div className={'row-inventory-extra__tbody'}>
                {dataDetail?.map(item => (
                  <div key={item.warehouse_id} className={'row-inventory-extra__tbody--tr'}>
                    <div className={'row-inventory-extra__tbody--td'}>{item.warehouse_name}</div>
                    <div className={'row-inventory-extra__tbody--td'}>{fNumber(item.warehouse_quantity)}</div>
                    <div className={'row-inventory-extra__tbody--td'}>{fNumber(item.order_quantity)}</div>
                    <div className={'row-inventory-extra__tbody--td'}>{fNumber(item.purchase_quantity)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledRowInventoryExtra>
  )
}

export default RowInventoryExtra


const StyledRowInventoryExtra = styled.div`
  //max-height: 0;

  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    //max-height: 75vh;
    padding: 4px 0 7px 0;
  }

  .row-inventory-extra {
    &__container {
      overflow: hidden;

      border-left: 4px solid #1e9a98;
      border-radius: 0px 8px 8px 8px;
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 4px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #e2eaf8;
      border-radius: 8px 8px 0px 0px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0px 0px;
      }

      &[data-active='true'] {
        background: #fff;
      }
    }

    &__content {
      max-height: 60vh;
      padding: 24px 36px 32px 36px;

      overflow: auto;

      background: #fff;
      border-radius: 0 8px 0 0;
    }

    &__loading {
      width: 100%;
      height: 200px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    &__table {
      background: white;
      padding: 12px 0 24px 0;
      &--title {
        font-weight: 600 !important;
        font-size: 16px !important;
        line-height: 140% !important;
        color: #00081D !important;
        margin-left: 32px;
      }
    }
    
    &__thead {
      background: #F7F9FD;
      border-width: 1px 1px 1px 1px;
      border-style: solid;
      border-color: #E2EAF8;
      
      border-radius: 8px 8px 0 0;
      display: flex;
      padding: 13px 0;
      margin: 12px 32px 0 32px;
      
      &--tr:nth-child(1) {
        width: 55.5rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
      } 
      &--tr:nth-child(2) {
        width: 11.25rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
      } 
      &--tr:nth-child(3) {
        width: 11.25rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
      } 
      &--tr:nth-child(4) {
        width: 11.25rem;
        margin-left: 24px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
      } 
    }
    
    &__tbody {
      margin: 0 32px;
      &--tr {
        background: #FFFFFF;
        border-width: 0 1px 1px 1px;
        border-style: solid;
        border-color: #E2EAF8;
        display: flex;
        padding: 19px 0 20px 0;
      }
      
      &--td:nth-child(1) {
        width: 55.5rem;
        margin-left: 24px;
        font-weight: 400;
        font-size: 14px;
      }
      &--td:nth-child(2) {
        width: 11.25rem;
        margin-left: 24px;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
      }
      &--td:nth-child(3) {
        width: 11.25rem;
        margin-left: 24px;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
      }
      &--td:nth-child(4) {
        width: 11.25rem;
        margin-left: 24px;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
      }
      
      &--tr:last-child {
        border-radius: 0 0 8px 8px;
      }
    }
  }
`
