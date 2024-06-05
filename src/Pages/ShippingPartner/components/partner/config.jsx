import React, { useState,useEffect} from 'react'
import { Box,Modal,InputAdornment,OutlinedInput} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import {Button} from '../../../../common/button'
import {PARTNER_ICONS} from '../../interfaces/_icons'
import { getData, postData } from '../../../../api/api'
import { useForm } from 'react-hook-form'
import {StyledConfig} from './_styled'
import toast from "../toast";
import {getPartnerDetail,getUrlConfigPartnerId,getListPartner,setPartnerDefault} from '../../hooks/index.jsx'
import {CheckBoxButton,RadioButton} from '../template/_tplconfig'
import {Switch} from '../../../../common/switch'
import {SHIPPING_REQUREMENT} from 'Pages/ShippingPartner/interfaces/_constants'
import usePartnerContext from '../../hooks/partnerContext'
import ModalConfirm from '../../../../Component/ModalConfirm'
import { getUrlCheckPartsignJNT } from '../../../../api/url'
import { useTranslation } from "react-i18next";


export const PartnerConfig = ({...props}) => {

    const [infoState,infoDispatch] = usePartnerContext();
    const [isUpdate,setUpdate] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [widthState,setWidthSate] = useState(0);
    const [heightState,setHeightSate] = useState(0);
    const [lengthState,setLengthSate] = useState(0);
    const partnerInfo = infoState.partnerInfo; 
    const [aniModalClose, setAniModalClose] = useState(false)
    const { register,handleSubmit, formState: { errors } } = useForm()
    const {getDataPartnerDetail} =getPartnerDetail(props.partner.id);
    const {postDataPartnerDefault} =setPartnerDefault(props.partner.id,infoState.setting.is_default);
    const [partsignJNT, setPartsignJNT] = useState(false);
    const { t } = useTranslation();

    useEffect( () => { 
        getDataPartnerDetail();
        check_partsign();
    }, [])
    const handleConfirm = confirm => {
      setConfirm(false);
      if(confirm) {
        props.closeModal()
        getDataPartnerDetail();
      }
    }
    const saveConfigSubmit = (formdata) => { 
        if(isUpdate == false){
          setUpdate(true);
        const data= infoState.setting;
        if(props.partner.id == 3) {
            data.width = formdata.width;
            data.length = formdata.length;
            data.height= formdata.height;
        } 
        const url = getUrlConfigPartnerId(props.partner.id);
        postData(url, data)
        .then(res => {
          if (res.data && res.data.success) { 
            props.closeModal();
            if(typeof(infoState.setting.is_default) != 'undefined'){
              postDataPartnerDefault();
            }
            getDataPartnerDetail();
            toast.success({ title: t("update_config_shipping_success") });
          } else {
            toast.success({ title: t("update_config_shipping_fail") });
          }
        })
        .catch(e => {
        })
      }
    }

    const check_partsign = () => {
      const url = getUrlCheckPartsignJNT();
      getData(url)
        .then(res => {
          if(res.data.success==false || res.data.data.partsign==0){
            setPartsignJNT(true)
          }else{
            setPartsignJNT(false)
          }
        })
        .catch(e => {
        })
    }
    
    const formDefault = () => {
        if(Object.keys(partnerInfo).length != 0){
          return (
            <Modal
              open={props.show}
              onClose={() => {
                infoState.isChange == true ? setConfirm(true) : props.closeModal();
                setAniModalClose(true)
                setTimeout(() => {
                  setAniModalClose(false)
                }, 300)
              }}
              >  
              <StyledConfig>
              <Box className={(aniModalClose == false) ? 'modal-config' :'modal-config modal_custom'}>
                  <div className="modal-config_dismiss"
                        onClick={() => {
                          props.closeModal()
                          setAniModalClose(true)
                          setTimeout(() => {
                            setAniModalClose(false)
                          }, 300)
                        }}
                    >
                      {PARTNER_ICONS.dismiss}
                    </div>
                    <form onSubmit={handleSubmit(saveConfigSubmit)}>
                      <div className='modal-config_header'>
                          {t("shipping_configuration")} {props.partner.name}
                            {/*<CheckBoxButton status={props.partner.is_default} name={SHIPPING_REQUREMENT.is_default.label} type="SET_FIELD_DEFAULT"/>*/}
                      </div>
                      <div className='modal-config_body'>
                          <div className='modal-config_hd_body'>
                            <div style={{height:"25px"}}>{t("shipping_configuration")}</div>
                            {
                              props.partner.id ==1 && (
                                <CheckBoxButton disabled={partsignJNT} status={partnerInfo.setting.partsign} key={partnerInfo.setting.partsign} name={SHIPPING_REQUREMENT.partsign.label} type="SET_FIELD_PARTSIGN" />
                              )
                            }
                          </div>
                          <div className='modal-config_content'>
                            <div className='modal-config_gr'> 
                                <div className='modal-config_lb'> <div style={{height:"17px"}}>{t("payment_side")}</div></div>
                                <RadioButton data={props.partner.id == 1 ? SHIPPING_REQUREMENT.payer_jnt: SHIPPING_REQUREMENT.payer} checked={partnerInfo.setting.payment_method} params={'payment_method'} type="SET_FIELD_PAYMENT" />
                            </div>
                            {
                                props.partner.id !=3 && (
                                <div className="modal-config_gr pdt-21">
                                    <div className='modal-config_lb'>{t("require_get_order")}</div>
                                    <RadioButton data={SHIPPING_REQUREMENT.request_goods} checked={partnerInfo.setting.request_goods}  type="SET_FIELD_REQUEST_GOODS" params={'request_goods'}/>
                                </div>
                                )
                            }
                            {
                                props.partner.id ==3 && (
                                <div className="modal-config_gr pdt-21 pdt-11">
                                    <div className='modal-config_lb' style={{marginBottom: "8px"}}>{t("dimenson_package")}</div>
                                    <div className='modal-config-size'>
                                    <OutlinedInput
                                      id="outlined-adornment-length"
                                      value={lengthState != '0' && typeof(lengthState) != 'undefined' ? lengthState : infoState.setting.length} // key={infoState.setting.length}
                                      {...register("length",{
                                        onChange: (event) => {
                                          setLengthSate(event.target.value)
                                        },
                                      }
                                      )}
                                      onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                      startAdornment={<InputAdornment position="start">{t("long")}</InputAdornment>}
                                      aria-describedby="outlined-length-helper-text"
                                      inputProps={{
                                        'aria-label': t("long")
                                      }}
                                      onInput={(e) => {
                                        if (Number(e.target.value) > 150) {
                                          e.target.value = 150
                                        }
                                      }}
                                      
                                    />
                                    <OutlinedInput
                                      id="outlined-adornment-width"
                                      value={widthState != '0' && typeof(widthState) != 'undefined' ? widthState : infoState.setting.width} // key={infoState.setting.width}
                                      {...register("width",{
                                        onChange: (event) => {
                                          setWidthSate(event.target.value)
                                        },
                                      }
                                      )}
                                      onKeyPress={ (event) => {
                                          if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                          }
                                        }
                                      }
                                      startAdornment={<InputAdornment position="start">{t("width")}</InputAdornment>}
                                      aria-describedby="outlined-width-helper-text"
                                      inputProps={{
                                        'aria-label': t("width"),
                                      }}
                                      onInput={(e) => {
                                        if (Number(e.target.value) > 150) {
                                          e.target.value = 150
                                        }
                                      }}
                                    />
                                    <OutlinedInput
                                      id="outlined-adornment-length"
                                      value={heightState != '0' && typeof(heightState) != 'undefined' ? heightState : infoState.setting.height} // key={infoState.setting.height}
                                      {...register("height",{
                                        onChange: (event) => {
                                          setHeightSate(event.target.value)
                                        },
                                      }
                                      )}
                                      onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                      startAdornment={<InputAdornment position="start">{t("height")}</InputAdornment>}
                                      aria-describedby="outlined-height-helper-text"
                                      inputProps={{
                                        'aria-label': t("height"),
                                      }}
                                      onInput={(e) => {
                                        if (Number(e.target.value) > 150) {
                                          e.target.value = 150
                                        }
                                      }}
                                    />
                                    </div>
                                </div>
                                )
                            }
                            {
                                props.partner.id ==2 && (
                                    <div className='modal-config_gr pdt-21'>
                                        <div className='modal-config_lb'>{t("shipping_method")}</div>
                                        <RadioButton data={SHIPPING_REQUREMENT.transport} checked={partnerInfo.setting.transport} params={'transport'} type="SET_FIELD_TRANSPORT"/>
                                    </div>
                                )
                            }
                            {
                                (props.partner.id !=2 && props.partner.id != 4 )&& (
                                <div className='modal-config_gr pdt-21'>
                                    <div className='modal-config_lb'>{t("require_send_order")}</div>
                                    <RadioButton data={props.partner.id == 3 ? SHIPPING_REQUREMENT.recipient_view_full: SHIPPING_REQUREMENT.recipient_view} checked={partnerInfo.setting.recipient_view} params={'recipient_view'} type="SET_FIELD_RECIPIENT_VIEW"/>
                                </div>
                                )
                            }
                          </div>
                      </div>
                      <div className='modal-config_hd_body mgt-footer pdt-21'>
                          {t("configuration_printing_delivery")}
                            <div className='modal-config_gr' style={{paddingTop: "20px"}}>
                                {
                                    props.partner.id ==1 && (
                                        <div className="mgt-cbk">
                                        <Switch defaultChecked={infoState.setting.bg_cod == 1 ? false: true} value={infoState.setting.bg_cod} key={infoState.setting.bg_cod}
                                        onChange={val => { 
                                          infoDispatch({type: 'SET_FIELD_BG_COD', payload: (val == true ? 0:1)})
                                          infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                      }}
                                        />
                                        <label className='modal-config_lb_switch'
                                        onClick={val => { 
                                          infoDispatch({type: 'SET_FIELD_BG_COD', payload: (infoState.setting.bg_cod == 0 ? 1:0)})
                                          infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                      }}
                                        >{t("hide_cod_background_img")}</label>
                                        </div>
                                    )
                                }
                                <div className="mgt-cbk pgt-lb" style={{marginTop: "8px"}}>
                                    <Switch defaultChecked={infoState.setting.hidden_phone == 1 ? true: false} value={infoState.setting.hidden_phone} key={infoState.setting.hidden_phone}
                                        onChange={val => { 
                                            infoDispatch({type: 'SET_FIELD_HIDDEN_PHONE', payload: (val == true ? 1:0)})
                                            infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                        }}
                                    />
                                    <label className='modal-config_lb_switch'
                                    onClick={val => { 
                                      infoDispatch({type: 'SET_FIELD_HIDDEN_PHONE', payload: (infoState.setting.hidden_phone == 0 ? 1:0)})
                                      infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                  }}
                                    >{t("hide_sender_phone")}</label>
                                </div>
                                <div className="mgt-cbk pgt-lb" style={{marginTop: "8px"}}>
                                    <Switch defaultChecked={infoState.setting.hidden_name == 1 ? true: false} value={infoState.setting.hidden_name} key={infoState.setting.hidden_name}
                                        onChange={val => { 
                                            infoDispatch({type: 'SET_FIELD_HIDDEN_NAME', payload: (val == true ? 1:0)})
                                            infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                        }}
                                    />
                                    <label className='modal-config_lb_switch'
                                    onClick={val => { 
                                      infoDispatch({type: 'SET_FIELD_HIDDEN_NAME', payload: (infoState.setting.hidden_name == 0 ? 1:0)})
                                      infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                  }}
                                    >{t("hide_recipient_name")}</label>
                                </div>
                                <div className="mgt-cbk pgt-lb" style={{marginTop: "8px"}}>
                                    <Switch defaultChecked={infoState.setting.hidden_cod == 1 ? true: false} value={infoState.setting.hidden_cod} key={infoState.setting.hidden_cod}
                                        onChange={val => { 
                                            infoDispatch({type: 'SET_FIELD_HIDDEN_COD', payload: (val == true ? 1:0)})
                                            infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                        }}
                                    />
                                    <label className='modal-config_lb_switch'
                                    onClick={val => { 
                                      infoDispatch({type: 'SET_FIELD_HIDDEN_COD', payload: (infoState.setting.hidden_cod == 0 ? 1:0)})
                                      infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                                  }}
                                    >{t("hide_cod_amount")}</label>
                                </div>
                            </div>
                      </div>
                        <div className='modal-config_footer pt-32'>
                        <div>
                            <Button type={'button'}  className="modal-config_cancel"
                                    onClick={() => {
                                      infoState.isChange == true ? setConfirm(true) : props.closeModal();
                                      setAniModalClose(true)
                                      setTimeout(() => {
                                        setAniModalClose(false)
                                      }, 300)
                                    }}
                            >
                                {t("general_cancel")}
                            </Button>
                            <Button type={'submit'} className="modal-config_save"> 
                                {t("save")}
                            </Button>
                        </div>
                      </div>
                    </form>
                </Box>
                {confirm ? <ModalConfirm txtConfirm={t("general_confirm")} handleConfirm={handleConfirm} /> : ''}
              </StyledConfig> 
            </Modal>
          )
        }
    }

    return (
        formDefault()
    )
}
