
import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@material-ui/core'
import { StyledPartner } from './_styled'
import { LIST_PARTNER } from 'Pages/ShippingPartner/interfaces/_constants'
import usePartnerContext from '../../hooks/partnerContext'
import { Button } from '../../../../common/button'
import { Text } from '../../../../common/text'
import { PartnerConnect } from './connect'
import { PartnerDisconnect } from './disconnect'
import { importScript } from '../../hooks/index.jsx'
import { PARTNER_ICONS } from '../../interfaces/_icons'
import { PartnerConfig } from './config'
import { getListPartner } from '../../hooks/index.jsx'
import { Tooltip } from 'common/tooltip'
import useClickOutside from '../../hooks/useClickOutside'
import { useTranslation } from "react-i18next";

export const ShippingPartnerBody = (status) => {
  importScript("https://donhang.vnpost.vn/assets/myvnpost.uyquyen.js");
  const [state] = usePartnerContext();
  const { reloadShippingPartner } = getListPartner();
  const { t } = useTranslation();
  useEffect(() => {
    reloadShippingPartner();

  }, []);
  const partner = state.listPartner;
  const [styling, setstyling] = useState({
    status: false,
    from: ""
  });


  const [showModal, setShowModal] = useState(false)
  const [partnerState, setpartnerState] = useState(LIST_PARTNER)
  const [showModalDisconnect, setModalDisconnect] = useState(false)
  const [showModalConfig, setModalConfig] = useState(true)
  const closeModal = () => { setShowModal(false) };
  const closeModalDisconnect = () => setModalDisconnect(false);
  const closeModalConfig = () => {
    setTimeout(() => {
      setModalConfig(false)
    }, 300)
  };

  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => {
    setstyling({ status: false, from: '' });
  })
  return (
    <Grid container>
      <Grid item lg={3} xs={8} sm={6} style={{ position: 'relative' }}>
        <StyledPartner>
          <div ref={styling?.status == true && styling?.from == LIST_PARTNER.id ? wrapperRef : () => { }} className={styling?.status == true && styling?.from == LIST_PARTNER.id
            ? "part-item part-item-detail"
            : "part-item"} data-partner={LIST_PARTNER.id}  >
            <div className="row part-item-ln-1">
              <div className="part-img-partner"><img src={LIST_PARTNER.logo} /></div>
              <div className="part-btn-1"><div className="label-btn-connect">{t('connecting')}</div></div>
            </div>
            <div className="part-text-default">{(LIST_PARTNER.is_default == true) ? t('partner_default') : ''} </div>
            <div className="row part-item-ln-2">
              <div className="part-description">
                {t(LIST_PARTNER.description)}
              </div>
            </div>
            <div className="row part-item-ln-3" >
              <div className="part-img-conf" onClick={() => { setModalConfig(true); setpartnerState(LIST_PARTNER) }}>{PARTNER_ICONS.config}</div>
            </div>
          </div>
        </StyledPartner>
      </Grid>
      {showModal ? <PartnerConnect partner={partnerState} show={showModal} closeModal={closeModal} /> : ''}
      {showModalDisconnect ? <PartnerDisconnect partner={partnerState} show={showModalDisconnect} closeModal={closeModalDisconnect} /> : ''}
      {showModalConfig ? <PartnerConfig partner={partnerState} show={showModalConfig} closeModal={closeModalConfig} /> : ''}
    </Grid>
  )
}
