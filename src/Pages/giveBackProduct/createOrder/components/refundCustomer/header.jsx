import React from 'react';
import {Switch} from "../../../../customer/components/switch";
import useCreateGiveBackProduct from "../../../hooks/useCreateGiveBackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const HeaderRefundCustomer = () => {
  const {t} = useTranslation()
  const {formData, functions} = useCreateGiveBackProduct()
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <span>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_TO_CUSTOMERS)}</span>
      <div style={{display: 'flex'}}>
        <Switch
          checked={+formData?.orderReturnDetail?.is_refund === 1}
          onChange={() => functions.handleChangeStatusRefund()}
        />
      </div>
    </div>
  )
}

export default HeaderRefundCustomer;