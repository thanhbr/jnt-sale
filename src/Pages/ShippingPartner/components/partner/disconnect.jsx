import React, { useState,useContext ,useRef,useEffect, useReducer} from 'react'
import { Box,Modal} from '@material-ui/core'
import {Button} from '../../../../common/button'
import {PARTNER_ICONS} from '../../interfaces/_icons'
import { getUrlDisconnectPartner,getUrlPartnerDefault } from '../../../../api/url'
import {getData} from '../../../../api/api'
import {StyledPartner} from './_styled'
import toast from "../toast";
import { useForm } from 'react-hook-form'
import usePartnerContext from '../../hooks/partnerContext'
import { useTranslation } from "react-i18next";

export const PartnerDisconnect = ({...props}) => {
  const [GlobalState, GlobalDispatch] = usePartnerContext();
  const {handleSubmit } = useForm()
  const { t } = useTranslation();
  const getListPartner = () => {
    const url = getUrlPartnerDefault() 
    getData(url)
      .then(res => {
        if (res && res.data && res.data.success) { 
          const data = res.data.data || [] ;
          GlobalDispatch({type: 'GET_LIST_PARTNER', payload: data})
        } else {
        }
      })
      .catch(error => {
        console.log(`error${error}`)
      })
  } 

    const disconnectSubmit= () => {
      const url = getUrlDisconnectPartner(props.partner.id)
      getData(url)
        .then(res => {
          if (res.data && res.data.success) {
            toast.success({ title: t("disconnect_success") })
              props.closeModal();
              getListPartner()
          } else {
            toast.error({ title: t("disconnect_fail") })
          }
        })
        .catch(e => {
        })
    }
    const disconnect = () => {
      return (<Modal
        open={props.show}
        onClose={props.closeModal}
        >  
        <StyledPartner>
          <Box className='modal-connect' style={props.partner.is_default ==true ? {height:'445px'} :  {height:'357px'}}>
              <form onSubmit={handleSubmit(disconnectSubmit)}>
                <div className='modal-header'>
                    {t("disconnect_with_shipping_partner")}
                </div>
                <div className='modal-body'>
                    <div className='modal-hd-body text-al-center'>
                      <img src='/img/shipper-partner/img_dis.png'/>
                    </div>
                    <div className='modal-content-body'>
                      <div className='note-connect'>
                          <label className='des-text-color'>
                              {t("after_disconnecting_you_will")}:
                          </label>
                          <div className='mgl-16 mgt-8'>
                            <ul className="list-note-connect">
                              <li>{t("after_disconnecting_1")}</li>
                              <li> {t("after_disconnecting_2")} EVO.</li>
                            </ul>
                          </div>
                      </div>
                      {props.partner.is_default ==true && (
                      <div className='des-connect pt-18'>
                        <div className='note-warning-dis'>
                            <span className='mgb-10'>{PARTNER_ICONS.warning}</span>
                            <span className='mgl-7'><b>{t("note_disconnect")}:</b> {t("after_disconnecting_3")}</span>
                        </div>
                      </div>)
                      }
                    </div>
                </div>
                <div className='modal-footer pt-18'>
                    <Button className="part-item_cancel" style={{height:'32px',fontSize:"14px"}}
                    onClick={props.closeModal}
                    >{t("cancel-order")}</Button>
                    <Button className="save" style={{height:'32px',fontSize:"14px"}}  type={'submit'} 
                    disabled={props.partner.is_default ==true && (
                      true)
                    }
                    > {t("disconnect")}</Button>
                </div>
              </form>
          </Box>
        </StyledPartner> 
      </Modal>
      )
    }
    return ( 
        disconnect()
    )
}
