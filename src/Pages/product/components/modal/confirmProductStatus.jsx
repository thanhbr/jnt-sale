import React from 'react';
import {Box, Modal} from "@mui/material";
import {Text} from "../../../../common/text";
import styled from "styled-components";
import {Button} from "../../../../common/button";
import useProductTbody from "../../hooks/useProductTbody";
import {PRODUCT_ICONS} from "../../interfaces/~icon";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";
import {StyledModalConfirmProductDetail} from "./confirmProductDetailStatus";

const ConfirmProductStatus = () => {
  const { t } = useTranslation()
  const {functions,modal} = useProductTbody()

  return (
    <Modal open={true}>
      <Box>
        <StyledModalConfirmProduct>
          <p className={'modal-confirm-product__title'}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.STOP_USING_PRODUCT)}</p>
          <div style={{marginBottom: 24}}>
            <Text>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.MAKE_CHANGE_VERSION)}</Text>
            <ul>
              <li><Text>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_1_PRODUCT)}</Text></li>
              <li><Text>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_1_VERSION)}</Text></li>
              <li><Text>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_2_PRODUCT)}</Text></li>
            </ul>
          </div>
          <Text>{t(DISPLAY_NAME_MENU.GENERAL.YOU_SURE)}</Text>
          <div className={'modal-confirm-product__note'}>
            {PRODUCT_ICONS.blueQuestion}
            <Text style={{marginLeft: 6}}><strong>{t(DISPLAY_NAME_MENU.GENERAL.NOTE)}:</strong> {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SCRIPT_3_VERSION)}</Text>
          </div>
          <div className={'modal-confirm-product__group-button'}>
            <Button appearance={'ghost'}
                    size={'sm'}
                    onClick={() => functions.handleCloseConfirmProductStatus()}
                    style={{width: 110}}
            >{t(DISPLAY_NAME_MENU.GENERAL.CANCEL)}</Button>
            <Button size={'sm'}
                    className={'modal-confirm-product__apply'}
                    onClick={() =>{
                      if(modal?.confirmProductDetail) functions.handleSubmitChangeProductDetailtatus()
                      else if(modal?.confirmProductGroupStatus) functions.handleSubmitChangeProductGroupStatus()
                      else functions.handleSubmitChangeProductStatus()
                    }}
                    style={{width: 110}}
            >{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)}</Button>
          </div>
        </StyledModalConfirmProduct>
      </Box>
    </Modal>
  );
};

export default ConfirmProductStatus;

export const StyledModalConfirmProduct = styled.div`
  background: white;
  width: 595px;
  margin: auto;
  margin-top: 15rem;
  
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
  ul {
    list-style: disc;
    margin-left: 24px;
  }
  
  .modal-confirm-product {
    &__title {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 24px;
    }
    &__group-button {
      text-align: right;
    }
    &__apply {
      margin-left: 8px;
    }
    &__note {
      display: flex;
      margin: 24px 0;
      padding: 8px 16px;
      background: rgba(26, 148, 255, 0.1);
      border-radius: 6px;
      border: 1px solid #1A94FF;
    }
  }
`
