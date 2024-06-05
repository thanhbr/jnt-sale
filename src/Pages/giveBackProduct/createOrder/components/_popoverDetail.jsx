import React from 'react';
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {formatMoney} from "../../../../util/functionUtil";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const PopoverDetail = ({data,...prop}) => {
  const {t} = useTranslation()
  return (
    <StyledBodyRefundProduct>
      <div>
        <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.INCLUDE)}:</Text>
      </div>
      <div className={'create-giveback-product-popover__discount'}>
        <Text>{t(DISPLAY_NAME_MENU.GENERAL.DISCOUNT_ON_PRODUCT)}:</Text>
        <Text fontWeight={500}>{formatMoney(data?.discount_price_paid)}</Text>
      </div>
      <div className={'create-giveback-product-popover__discount'}>
        <Text>{t(DISPLAY_NAME_MENU.GENERAL.DISCOUNT_ON_TOTAL_ORDER)}:</Text>
        <Text fontWeight={500}>{formatMoney(data?.product_discount_total_order)}</Text>
      </div>
      <p className={'create-giveback-product-popover__note'}>
        <strong>{t(DISPLAY_NAME_MENU.GENERAL.NOTE)}:</strong> {t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.UNABLE_RETURN_VOUCHER_TOOLTIP)}
      </p>
    </StyledBodyRefundProduct>
  )
}

export default PopoverDetail

export const StyledBodyRefundProduct = styled.div`
  width: 22.25rem;
  height: 10.625rem;
  padding: 24px 18px;
  
  .create-giveback-product-popover {
    &__discount {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }
    &__note {
      font-size: 12px;
      line-height: 140%;
      color: #7C88A6;
      margin-top: 12px;
      font-style: italic;
    }
  }
`
