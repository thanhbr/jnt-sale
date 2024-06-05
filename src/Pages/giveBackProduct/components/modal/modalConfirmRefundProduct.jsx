import React from 'react';
import {Modal} from "../../../../common/modal";
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import useTableGiveBackProduct from "../../hooks/useTableGiveBackProduct";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";
import {useTranslation} from "react-i18next";

const ModalConfirmRefundProduct = () => {
  const {t} = useTranslation()
  const {functions} = useTableGiveBackProduct()
  return (
    <Modal title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.MODAL_CONFIRM_TITLE)} width={480}
    >
      <Text>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.MODAL_CONFIRM_SUBTITLE)}</Text>
      <div style={{display: 'flex', justifyContent: 'end', marginTop: 40}}>
        <Button size={'sm'}
                appearance={'ghost'}
                style={{marginRight: 8}}
                onClick={() => functions.toggleConfirmRefund('')}
        >{t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}</Button>
        <Button size={'sm'}
                onClick={() => functions.handleSubmitConfirm()}
        >{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)}</Button>
      </div>
    </Modal>
  )
}

export default ModalConfirmRefundProduct;