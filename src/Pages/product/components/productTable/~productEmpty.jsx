import React from 'react';
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {PRODUCT_ICONS} from "../../interfaces/~icon";
import useProductTbody from "../../hooks/useProductTbody";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ProductEmpty = ({...props}) => {
  const { t } = useTranslation()
  const {hasProduct} = useProductTbody()
  return (
    <StyledProductEmpty {...props}>
      <img
        className={"product-empty__banner"}
        src={"/img/product/empty.png"}
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 12}}>
        {hasProduct
          ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ANY_PRODUCT_YET)
          : t(DISPLAY_NAME_MENU.GENERAL.NOT_DATA_FOUND)}
      </Text>
      {hasProduct && (
        <Button href={'/product/create'} icon={PRODUCT_ICONS.plus}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.CREATE_PRODUCT)}</Button>
      )}
    </StyledProductEmpty>
  );
};

export default ProductEmpty;

export const StyledProductEmpty = styled.div`
  min-height: calc(100vh - 300px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .product-empty__banner {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
`
