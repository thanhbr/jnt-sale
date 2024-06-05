import React from 'react';
import styled from "styled-components";
import {Text} from "../../../../common/text"
import {formatMoney} from "../../../../util/functionUtil";
import {Tooltip as Tooltipv2} from "../../../../common/tooltipv2";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const RowExtraTable = ({data}) => {
  const {t} = useTranslation()
  return (
    <StyledRowExtraTable>
      <div className={'giveback-product-row-extra-table-header'}>
        <div className={'giveback-product-row-extra-table-header--code'}>
          <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SKU)}</Text>
        </div>
        <div className={'giveback-product-row-extra-table-header--name'}>
          <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_NAME)}</Text>
        </div>
        <div className={'giveback-product-row-extra-table-header--quantity'}>
          <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.NUMBER_GOOD_PAID)}</Text>
        </div>
        <div className={'giveback-product-row-extra-table-header--price'}>
          <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.SALES_VALUE)}</Text>
        </div>
        <div className={'giveback-product-row-extra-table-header--total'}>
          <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.VALUE_PAID)}</Text>
        </div>
      </div>
      <div className={'giveback-product-row-extra-table-body'}>
        {data?.map(item => (
          <div key={item?.product_id_details} className={'giveback-product-row-extra-table-body-tr'}>
            <div className={'giveback-product-row-extra-table-body--code'}>
              {item?.product_sku?.length > 20 ? (
                <Tooltipv2 className='tooltip_select_2row' title={item?.product_sku} baseOn='width' placement='top-center'>
                  <Text lineHeight={32}>{item?.product_sku}</Text>
                </Tooltipv2>
              ) : (<Text lineHeight={32}>{item?.product_sku}</Text>)}
            </div>
            <div className={'giveback-product-row-extra-table-body--name'}>
              <Tooltipv2 className='tooltip_select_2row' title={item?.product_name} baseOn='width' placement='top-center'>
                <Text lineHeight={32}>{item?.product_name}</Text>
              </Tooltipv2>
            </div>
            <div className={'giveback-product-row-extra-table-body--quantity'}>
              <Text lineHeight={32}>{item?.quantity}</Text>
            </div>
            <div className={'giveback-product-row-extra-table-body--price'}>
              <Text lineHeight={32}>{formatMoney(item?.price_sell)}</Text>
            </div>
            <div className={'giveback-product-row-extra-table-body--total'}>
              <Text lineHeight={32}>{formatMoney(item?.total_price)}</Text>
            </div>
          </div>
        ))}
      </div>
    </StyledRowExtraTable>
  )
}

export default RowExtraTable

const StyledRowExtraTable = styled.div`
  margin-top: 12px;
  
  .tooltip_select_2row {
    position: relative;
    display: inline-block;
    text-decoration: none;
    
    width: 100%;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .giveback-product-row-extra-table-header {
    display: flex;
    height: 44px;
    padding: 12px 24px;
    background: #F7F9FD;
    
    border-width: 1px;
    border-style: solid;
    border-color: #E2EAF8;
    border-radius: 8px 8px 0 0;
    
    &--code {
      width: 13.75rem;
    }
    &--name {
      width: 39rem;
      margin-left: 1.5rem;
    }
    &--quantity {
      width: 11.125rem;
      margin-left: .5rem;
      text-align: center;
    }
    &--price {
      width: 12.5rem;
      text-align: right;
      margin-left: 1.5rem;
    }
    &--total {
      width: 15.625rem;
      text-align: right;
      margin-left: 1.5rem;
    }
  }
  .giveback-product-row-extra-table-body {
    &-tr {
      display: flex;
      height: 56px;
      padding: 12px 24px;
      background: #FFFFFF;
      
      border-width: 0 1px 1px 1px;
      border-style: solid;
      border-color: #E2EAF8;
    }
    &-tr:nth-last-child(1) {
      border-radius: 0 0 8px 8px;
    }
    &--code {
      width: 13.75rem;
    }
    &--name {
      width: 39rem;
      margin-left: 1.5rem;
    }
    &--quantity {
      width: 8.125rem;
      margin-left: 1.5rem;
      text-align: center;
    }
    &--price {
      width: 12.5rem;
      text-align: right;
      margin-left: 1.5rem;
    }
    &--total {
      width: 15.625rem;
      text-align: right;
      margin-left: 1.5rem;
    }
  }
`
