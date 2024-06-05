import React from 'react';
import styled from "styled-components";
import {Button} from "../../../../common/button";
import useTableGiveBackProduct from "../../hooks/useTableGiveBackProduct";
import useHeaderGivebackProduct from "../../hooks/useHeaderGivebackProduct";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const EmptyGivebackProduct = () => {
  const {t} = useTranslation()
  const { functions } = useHeaderGivebackProduct()
  const {table} = useTableGiveBackProduct()
  const displayList = table?.display?.listDefault
  return (
    <StyledTHeadGivebackProduct>
      <div>
        <img src={'/img/order/order-empty.png'} placeholder={'img-empty'}/>
        {displayList?.length === 0 ? (
          <div>
            <p className={'giveback-product-empty--text'}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.ANY_ORDER_YET)}</p>
            <Button style={{marginLeft: -36, width: 207, position: 'relative', paddingLeft: 24}}
                    onClick={() => functions.handleToggleModalOrder()}
            ><span style={{position: 'absolute', left: 9, top: 4}}>{GIVEBACK_PRODUCT_ICONS.plus}</span> {t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE)}</Button>
          </div>
        ) : (
          <p className={'giveback-product-empty--text'}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.NO_RETURN_FOUND)}</p>
        )}
      </div>
    </StyledTHeadGivebackProduct>
  )
}

export default EmptyGivebackProduct;


export const StyledTHeadGivebackProduct = styled.div`
  min-height: calc(100vh - 430px);
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: rgb(255, 255, 255);
  .giveback-product-empty--text {
    color: #7C88A6;
    font-weight: 600;
    font-size: 14px;
    margin: 16px 0 16px -24px;
  }
`