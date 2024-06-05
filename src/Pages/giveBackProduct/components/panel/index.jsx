import React from 'react';
import styled from "styled-components";
import {GivebackProductPanel} from "./_givebackPanel";
import useTableGiveBackProduct from "../../hooks/useTableGiveBackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const PanelFormGivebackProduct = () => {
  const {t} = useTranslation()
  const {table} = useTableGiveBackProduct()

  return (
    <StyledPanelFormGivebackProduct>
      <GivebackProductPanel
        className="giveback-product-panels__item"
        title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.TOTAL_NUMBER_ORDERS)}
        value={table?.panels?.totalOrder}
      />
      <GivebackProductPanel
        className="giveback-product-panels__item"
        currency="₫"
        title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.TOTAL_VALUE_GOODS)}
        value={table?.panels?.totalValueGoods}
      />
      <GivebackProductPanel
        className="giveback-product-panels__item"
        currency="₫"
        title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.AMOUNT_REFUNDED)}
        value={table?.panels?.amountRefunded}
      />
    </StyledPanelFormGivebackProduct>
  )
}

export default PanelFormGivebackProduct;

export const StyledPanelFormGivebackProduct = styled.div`
  margin: 0 -8px;

  display: flex;
  flex-wrap: wrap;

  .giveback-product-panels {
    &__item {
      width: calc(33.3% - 14px);
      margin: 0 7px;
    }
  }
`