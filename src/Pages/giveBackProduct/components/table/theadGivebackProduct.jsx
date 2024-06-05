import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Th} from "../../../../layouts/tableLayout/_th";
import styled from "styled-components";
import {PaymentFilterPopover} from "./_paymentFilterPopover";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const THeadGivebackProduct = () => {
  const {t} = useTranslation()
  return (
    <StyledTHeadGivebackProduct>
      <Tr type="tHead">
        <Th className="giveback-product-table__cell--code">{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.ORDER_RETURN_ID)}</Th>
        <Th className="giveback-product-table__cell--code">{t(DISPLAY_NAME_MENU.GENERAL.ODER_ID)}</Th>
        <Th className="giveback-product-table__cell--customer">{t(DISPLAY_NAME_MENU.CUSTOMER)}</Th>
        <Th className="giveback-product-table__cell--value">{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.VALUE_PAID)}</Th>
        <Th className="giveback-product-table__cell--receive">{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.GET_REFUNDS)}</Th>
        <Th className="giveback-product-table__cell--refund"
            icon={<PaymentFilterPopover />}
        >
          {t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_MONEY)}
        </Th>
        <Th className="giveback-product-table__cell--reason">{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_MONEY)}</Th>
        <Th
          className="giveback-product-table__cell"
          // icon={
          //   <div
          //     style={{position: 'relative', width: '100%', height: '100%'}}
          //   >
          //     <div
          //       style={{
          //         position: 'absolute',
          //         top: 0,
          //         right: 4,
          //         width: 20,
          //         height: 20,
          //       }}
          //     >
          //       {ORDER_ICONS.gearSix}
          //     </div>
          //   </div>
          // }
          style={{display: 'flex'}}
        />
      </Tr>
    </StyledTHeadGivebackProduct>
  )
}

export default THeadGivebackProduct


export const StyledTHeadGivebackProduct = styled.div`
  .giveback-product-table__cell {
    &--code {
      width: 10rem;
      margin-left: 24px;
    }
    &--customer {
      width: 12.5rem;
      margin-left: 24px;
    }
    &--value {
      width: 8.75rem;
      margin-left: 24px;
      text-align: right;
    }
    &--receive {
      width: 9.75rem;
      margin-left: 24px;
      text-align: center;
    }
    &--refund {
      width: 9.5rem;
      margin-left: 24px;
      text-align: right;
    }
    &--reason {
      width: 29.5rem;
      margin-left: 24px;
      flex: 1;
    }
  }
`
