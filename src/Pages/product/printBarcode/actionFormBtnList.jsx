import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../../../common/button";
import {PATH} from "../../../const/path";
import usePrintBarcode from "../hooks/usePrintBarcode";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const ActionFormBtnList = () => {
  const { t } = useTranslation()
  const {functions, properties} = usePrintBarcode()
  const navigate = useNavigate();
  return (
    <div style={{textAlign: 'right', height: 60}}>
      <Button appearance="ghost"
              onClick={() => navigate(PATH.PRODUCT_MANAGEMENT)}
      >
        {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.BACK_PRODUCT_LIST)}
      </Button>
      <Button
        onClick={() => functions.submit()}
        style={{marginLeft: 12}}
        disabled={properties?.canSubmit}
      >
        {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EXPORT_BARCODE_PRINTING)}
      </Button>
    </div>
  )
};

export default ActionFormBtnList;