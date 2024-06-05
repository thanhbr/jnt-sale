import useCreateInfoVersion from "../../../hooks/useCreateInfoVersion";
import {Grid} from "@mui/material";
import {Button} from "../../../../../common/button";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import InfoVersionPage from "./content";
import React from "react";
import ConfirmPopup1 from "../modal/confirmPopup1";
import ConfirmPopup2 from "../modal/confirmPopup2";
import ConfirmPopup3 from "../modal/confirmPopup3";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const InfoVersion = () => {
  const { t } = useTranslation()
  const {value, functions} = useCreateInfoVersion()
  return (
    <>
      <Grid container>
        {value?.formInfoPrice?.initAttr === 0 ? (
          <>
            <Grid xs={9} sm={9} md={9} lg={9} item>
              <div style={{textAlign: 'left', marginTop: '-18px'}}>
                <p style={{color: '#7C88A6', marginBottom: '16px', fontSize: 15, fontWeight: 400}}>
                  {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.TITLE_VERSION_INFO)} <br /> {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SUBTITLE_VERSION_INFO)}
                </p>
                <Button
                  style={{width: '149px'}}
                  icon={PRODUCT_ICONS.plus}
                  size={'xs'}
                  onClick={() => functions.onAddAttrInit()}
                >{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ADD_VERSION)}</Button>
              </div>
            </Grid>
            <Grid xs={3} sm={3} md={3} lg={3} item>
              <div style={{marginTop: '-51px', textAlign: 'end'}}>
                <img src={'/img/product/placeholder-version.png'} alt={'placeholder-version'} />
              </div>
            </Grid>
          </>
        ) : <InfoVersionPage />}
      </Grid>

      {value?.modalConfirm?.confirmPopup1 && <ConfirmPopup1 />}
      {value?.modalConfirm?.confirmPopup2 && <ConfirmPopup2 />}
      {value?.modalConfirm?.confirmPopup3 && <ConfirmPopup3 />}
    </>
  );
};

export default InfoVersion;