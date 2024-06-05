import React from 'react';
import {Checkbox} from "../../../../common/form/checkbox";
import {Text} from "../../../../common/text";
import useCreateGiveBackProduct from "../../hooks/useCreateGiveBackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const GetRefund = () => {
  const {t} = useTranslation()
  const {formData, functions} = useCreateGiveBackProduct()
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <span>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.GET_REFUNDS)}</span>
      <div style={{display: 'flex'}}
           onClick={() => functions?.handleCheckRefundReceived()}
      >
        <Checkbox
          checked={+formData?.orderReturnDetail?.checkRefundReceived === 1}
          style={{margin: '1px 8px 0 0'}}
        />
        <Text style={{cursor: 'pointer'}}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_RECEIVED)}</Text>
      </div>
    </div>
  )
}

export default GetRefund;