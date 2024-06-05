import React from 'react';
import {Button} from "../../../../common/button";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../../const/path";
import useCreateGiveBackProduct from "../../hooks/useCreateGiveBackProduct";
import {Modal} from "../../../../common/modal";
import {Text} from "../../../../common/text";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ActionFormBtnList = () => {
  const {t} = useTranslation()
  const {validate, functions, formData} = useCreateGiveBackProduct()
  const navigate = useNavigate()
  return (
    <>
      <div style={{textAlign: 'right'}}>
        <Button appearance="ghost"
                onClick={() => navigate(PATH.GIVE_BACK_PRODUCT)}
                style={{width: 74}}
        >{t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}</Button>
        <Button
          onClick={() => functions.submit()}
          style={{marginLeft: 12, padding: '0 16px'}}
          disabled={validate}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.SAVE)}
        </Button>
      </div>
      {(!!formData?.orderReturnDetail?.id && !!!formData?.orderReturnDetail?.products?.find(item => {
        return (+item.quantity - +item.quantity_returned) !== 0
      })) && (
        <Modal width={480}>
          <Text fontWeight={600} fontSize={20}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.UNABLE_RETURN_VOUCHER)}</Text>
          <div style={{margin: '30px 0 29px 0'}}>
            <Text>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.UNABLE_RETURN_VOUCHER_CONTENT)}</Text>
          </div>
          <div style={{textAlign: 'end'}}>
            <Button appearance={'ghost'}
                    style={{width: 207, padding: 0, fontSize: 13}}
                    onClick={() => navigate(PATH.GIVE_BACK_PRODUCT)}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.UNABLE_RETURN_VOUCHER_BACK)}</Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ActionFormBtnList;