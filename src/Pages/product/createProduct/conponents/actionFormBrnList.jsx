import React from 'react';
import {Button} from "../../../../common/button";
import {PATH} from "../../../../const/path";
import {useNavigate} from "react-router-dom";
import useCreateInfoVersion from "../../hooks/useCreateInfoVersion";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ActionFormBrnList = () => {
  const { t } = useTranslation()
  const {functions, value} = useCreateInfoVersion()
  const navigate = useNavigate()

  return (
    <div style={{textAlign: 'right', height: 60}}>
      <Button appearance="ghost"
              onClick={() => navigate(PATH.PRODUCT_MANAGEMENT)}
              style={{width: 74}}
      >
        {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
      </Button>
      <Button
        onClick={() => functions.submit()}
        style={{marginLeft: 12, padding: '0 16px', width: 108}}
        disabled={value.canSaveProduct || value?.validatePrice}
      >
        {t(DISPLAY_NAME_MENU.GENERAL.SAVE)}
      </Button>
    </div>
  )
}

export default ActionFormBrnList;