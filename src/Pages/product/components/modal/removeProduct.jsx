import React from 'react';
import useProductTbody from "../../hooks/useProductTbody";
import {Box, Modal} from "@mui/material";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const RemoveProduct = () => {
  const { t } = useTranslation()
  const {functions} = useProductTbody()
  return (
    <Modal open={true}>
      <Box>
        <StyledModalRemoveProduct>
          <p className={'modal-remove-product__title'}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.REMOVE_PRODUCT)}</p>
          <p className={'modal-remove-product__subtitle1'}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_3_PRODUCT)}</p>
          <p className={'modal-remove-product__subtitle2'}>{t(DISPLAY_NAME_MENU.GENERAL.YOU_SURE)}</p>
          <div className={'modal-remove-product__group-button'}>
            <Button appearance={'ghost'}
                    size={'sm'}
                    className={'modal-remove-product__dismiss'}
                    onClick={() => functions?.handleCloseRemoveProduct()}
            >{t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}</Button>
            <Button appearance={'danger'}
                    size={'sm'}
                    className={'modal-remove-product__apply'}
                    onClick={() => functions?.handleSubmitRemoveProduct()}
            >{t(DISPLAY_NAME_MENU.GENERAL.REMOVE)}</Button>
          </div>
        </StyledModalRemoveProduct>
      </Box>
    </Modal>
  )
}

export default RemoveProduct;

export const StyledModalRemoveProduct = styled.div`
  background: white;
  width: 480px;
  height: 236px;
  margin: auto;
  margin-top: 17.5rem;
  
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
  ul {
    list-style: disc;
    margin-left: 24px;
  }
  
  .modal-remove-product {
    &__title {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 24px;
    }
    &__subtitle1 {
      font-weight: 400;
      font-size: 14px;
    }
    &__subtitle2 {
      margin-top: 24px;
      font-weight: 400;
      font-size: 14px;
    }
    &__group-button {
      margin-top: 32px;
      text-align: right;
    }
    &__dismiss {
      width: 110px;
    }
    &__apply {
      width: 110px;
      margin-left: 8px;
    }
  }
`
