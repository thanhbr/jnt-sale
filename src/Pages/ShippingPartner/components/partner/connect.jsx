import React, { useState} from 'react'
import { Box,Modal} from '@material-ui/core'
import {Button} from '../../../../common/button'
import {PARTNER_ICONS} from '../../interfaces/_icons'
import {postData} from '../../../../api/api'
import { useForm } from 'react-hook-form'
import {StyledPartner} from './_styled'
import toast from "../toast";
import {getListPartner, getUrlConnectPartnerById, getUrlConnectGHN} from '../../hooks/index.jsx'
import {VNPOST_CONFIG} from 'Pages/ShippingPartner/interfaces/_constants'
import {Select} from 'common/form/select'
import {Option} from 'common/form/select/_option'
import { useTranslation } from "react-i18next";

export const PartnerConnect = ({...props}) => {
  
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [errorSubmit, setErrorSubmit] = useState('');
    const {reloadShippingPartner} =getListPartner();
    const [typeGHN, setTypeAPIGHN] = useState('get_store');
    const [listStoreGHN, setListStoreGHN] = useState([]); 
    const [inforGHN, setInforGHN] = useState([]); 
    const [isUpdate,setUpdate] = useState(false);
    const [passConfirm, setPassConfirm] = useState(true)
    const [passCurrent, setPassCurrent] = useState(true)
    const { t } = useTranslation();

    //Submit form default
    const formSubmit= (data) => {
      if(isUpdate == false){
        setUpdate(true);
      let url = getUrlConnectPartnerById(props.partner.id);
      postData(url, data)
        .then(res => {
          if (res.data && res.data.success) {
            props.closeModal();
            toast.success({ title: t("connect_success_shipping_partner") });
            reloadShippingPartner();
          } else {
            setErrorSubmit(t("error_connect")+res.data.message );
          }
          setUpdate(false);
        })
        .catch(e => {
        })
      }
    }
    const formDefault = () => {
      return (<Modal
        open={props.show}
        onClose={props.closeModal}
        >  
        <StyledPartner>
          <Box className='modal-connect' style={props.partner.id==4 && errorSubmit ==''? {height:"578px"} : props.partner.id==2 && errorSubmit =='' ? {height:"560px"} : {height:"auto"}}>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className='modal-header'>
                    <div className='modal-header-uppercase'>{t("connect_with")} {props.partner.name}</div>
                </div>
                <div className='modal-body'>
                    <div className='modal-hd-body'>
                        {t("login_account")} {props.partner.name}
                    </div>
                    {errorSubmit !='' &&  
                    (<div className='error-form-submit'>
                    <img
                      src='/svg/error-v2.svg'
                      alt='icon-error'
                    /><span className='mgl-7'>{errorSubmit}</span><span className='error-form-submit_close' onClick={(e)=>{setErrorSubmit('');}}>{PARTNER_ICONS.close}</span>
                  </div> )
                    
                    }
                    <div className='modal-content-body'>
                      <div className='form-text-input'>
                        <label style={{display: 'flex',height:"20px"}}>{t("email_phone")}  {PARTNER_ICONS.star}</label>
                        <input className="input-form" placeholder={t("enter_email_phone")}
                               {...register("email", { required: true})}
                        />
                        {errors.email && <span className='part-item-errors'>{t("require_email_phone")}</span>}
                      </div>
                      <div className='form-text-input part_pst_pass'>
                          <label style={{display: 'flex',height:"20px"}}>{t("Password")} {PARTNER_ICONS.star}</label>
                          <input className="input-form" placeholder={t("enter_password")} type={passCurrent ? 'password' : 'text'}
                          {...register("password", { required: true })}
                          />
                          {errors.password && <span className='part-item-errors'>{t("require_password")}</span>}
                            <div className="part_toggle_eye"
                                onClick={() =>  setPassCurrent(!passCurrent) } >
                              {passCurrent ? PARTNER_ICONS.not_eye : PARTNER_ICONS.eye}
                            </div>
                      </div>
                      <div className='note-connect mgt-8'>
                          <label>
                              {t("two_way_connection_with_partner")} {props.partner.name} {t("help_the_store")}:
                          </label>
                          <div className='mgl-16 mgt-8'>
                            <ul className="list-note-connect">
                              <li>{t("shipping_partner_note_1")} {props.partner.name}.</li>
                              <li>{t("shipping_partner_note_2")} </li>
                              <li>{t("shipping_partner_note_3")}</li>
                              { props.partner.id == 4 &&
                                (<li>{t("shipping_partner_note_4")}</li>)
                              }
                            </ul>
                          </div>
                      </div>
                      <div className='des-connect pt-32'>
                        <label>{t("you_dont_have_an_account_yet")}?</label><span style={{padding:'2px'}}> <a href={props.partner.link_register} style={{color: '#1A94FF'}} target="_blank">{t("register_now")}</a> </span><br></br>
                        <div style={{height:'20px'}}><a href={props.partner.link_home} style={{color: '#1A94FF'}} target="_blank">{t("learn_more_about")} {props.partner.name}</a></div>
                      </div>
                    </div>
                </div>
                <div className='modal-footer pt-32'>
                    <Button className="part-item_cancel" type="button"  style={{height:'32px',fontSize:"14px"}}
                    onClick={props.closeModal}
                    >{t("general_cancel")}</Button>
                    <Button className="save" type={'submit'}  style={{height:'32px',fontSize:"14px"}}> {t("connect")}</Button>
                </div>
              </form>
          </Box>
        </StyledPartner> 
      </Modal>
      )
    }

    //Form VietNamPOST
    const JNTConnect = () => {
      return (<Modal
        open={props.show}
        onClose={props.closeModal}
        >  
        <StyledPartner>
          <Box className='modal-connect' style={errorSubmit =='' ? {height:"474px"}: {height:"auto"}}>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className='modal-header'>
                    <div className='modal-header-uppercase'>{t("connect_with")} {props.partner.name}</div>
                </div>
                <div className='modal-body'>
                    <div className='modal-hd-body'>
                        {t("login_account")} {props.partner.name}
                    </div>
                    {errorSubmit !='' &&  
                    (<div className='error-form-submit'>
                    <img
                      src='/svg/error-v2.svg'
                      alt='icon-error'
                    /><span className='mgl-7'>{errorSubmit}</span><span className='error-form-submit_close' onClick={(e)=>{setErrorSubmit('');}}>{PARTNER_ICONS.close}</span>
                  </div> )
                    
                    }
                    <div className='modal-content-body'>
                      <div className='form-text-input'>
                        <label style={{display: 'flex'}}>{t("customer_code")}  {PARTNER_ICONS.star}</label>
                        <input className="input-form" placeholder={t("enter_customer_code")}
                        {...register("vip_code_jnt", { required: true })}
                        />
                        {errors.vip_code_jnt && <span className='part-item-errors'>{t("require_customer_code")}</span>}
                      </div>
                      <div className='note-connect pt-18'>
                          <label>
                            EVO {t("two_way_connection_with_partner")} {props.partner.name} {t("help_the_store")} :
                          </label>
                          <div className='mgl-16 mgt-8'>
                            <ul className="list-note-connect">
                              <li>{t("shipping_partner_note_1")} {props.partner.name}.</li>
                              <li>{t("shipping_partner_note_2")} </li>
                              <li>{t("shipping_partner_note_3")}</li>
                            </ul>
                          </div>
                      </div>
                      <div className='des-connect pt-32'>
                        <label>{t("you_dont_have_an_account_yet")}?</label><span> <a href={props.partner.link_register} style={{color: '#1A94FF'}} target="_blank">{t("register_now")}</a> </span><br></br>
                        <label style={{paddingTop:'2px'}}><a href={props.partner.link_home} style={{color: '#1A94FF'}} target="_blank">{t("learn_more_about")} {props.partner.name}</a></label>
                      </div>
                    </div>
                </div>
                <div className='modal-footer pt-32'>
                    <Button className="part-item_cancel" type="button"   style={{height:'32px',fontSize:"14px"}}
                    onClick={props.closeModal}
                    >{t("general_cancel")}</Button>
                    <Button className="save" type={'submit'}  style={{height:'32px',fontSize:"14px"}}>{t("connect")}</Button>
                </div>
              </form>
          </Box>
        </StyledPartner> 
      </Modal>
      )
    }

    const formGHNSubmit= (data) => {
      if(isUpdate == false){
        setUpdate(true);
      let url = getUrlConnectGHN(typeGHN);
      data.shop_id = inforGHN.shop_id;
      data.phone = inforGHN.shop_phone;
      postData(url, data)
        .then(res => { 
          if (res.data && res.data.success) {
            if(typeGHN=='get_store'){
              setListStoreGHN(res.data.data)
              setInforGHN(res.data.data[0]);
              setTypeAPIGHN('get_otp');
            } else if(typeGHN=='get_otp'){
              setTypeAPIGHN('get_connect');
            } else {
                props.closeModal(); 
                toast.success({ title: t("connect_success_shipping_partner") });
                reloadShippingPartner();
            }
            setUpdate(false);
          } else {
            setErrorSubmit(t("error_connect")+res.data.message );
          }
        })
        .catch(e => {
        })
      }
    }
    //Form VietNamPOST
    const GHNConnect = () => {
      return (<Modal
        open={props.show}
        onClose={props.closeModal}
        >  
        <StyledPartner>
          <Box className='modal-connect' style={errorSubmit =='' ? {height:"474px"}: {height:"auto"}}>
              <form onSubmit={handleSubmit(formGHNSubmit)}>
                <div className='modal-header'>
                    <div className='modal-header-uppercase'>{t("connect_with")} {props.partner.name}</div>
                </div>
                <div className='modal-body'>
                    <div className='modal-hd-body'>
                        {t("login_account")} {props.partner.name}
                    </div>
                    {errorSubmit !='' &&  
                    (<div className='error-form-submit'>
                    <img
                      src='/svg/error-v2.svg'
                      alt='icon-error'
                    /><span className='mgl-7'>{errorSubmit}</span><span className='error-form-submit_close' onClick={(e)=>{setErrorSubmit('');}}>{PARTNER_ICONS.close}</span>
                  </div> )
                    
                    }
                    <div className='modal-content-body'>
                        {typeGHN =='get_store' && (
                          <div className='form-text-input'>
                              <label style={{display: 'flex',float:'left'}}>{t("token_account_ghn")}  {PARTNER_ICONS.star}</label>
                              <span className="noti-token-ghn">
                              <a href="https://help.upos.vn/doi-tac-van-chuyen/ket-noi-ghn" style={{color: '#1A94FF'}} target="_blank">{t("instruction_get_token_ghn")}</a>
                              </span>
                              <input placeholder={t("enter_token_account")}
                              {...register("token", { required: true })}
                              />
                              {errors.token && <span className='part-item-errors'>{t("enter_token_account")}</span>}
                          </div>
                        )}
                        {typeGHN =='get_otp' && (
                          <div className='form-text-input'>
                              <label style={{display: 'flex'}}>{t("select_connected_store")}  {PARTNER_ICONS.star}</label>
                              <Select displayEmpty={t("select_feedback_type")}
                                  value={inforGHN.shop_name} 
                              >
                                {listStoreGHN.length > 0 &&
                                  listStoreGHN.map(item => (
                                    <Option className="part-item_select_option" key={item.shop_phone} value={item.shop_phone} 
                                    onClick={() =>{setInforGHN(item);}}
                                    >{item.shop_name}</Option>
                                  ))}
                              </Select>
                          </div>
                        )}
                        {typeGHN =='get_connect' && (
                          <div className='form-text-input'>
                              <label style={{display: 'flex'}}>SMS OTP  {PARTNER_ICONS.star}</label>
                              <input className="input-form" placeholder={t("enter_otp_via_sms")}
                              {...register("otp", { required: true })}
                              />
                              {errors.otp && <span className='part-item-errors'>{t("require_otp_via_sms")}</span>}
                          </div>
                        )}
                      <div className='note-connect pt-18'>
                          <label>
                            EVO {t("two_way_connection_with_partner")} {props.partner.name} {t("help_the_store")}:
                          </label>
                          <div className='mgl-16 mgt-8'>
                            <ul className="list-note-connect">
                              <li>{t("shipping_partner_note_1")} {props.partner.name}.</li>
                              <li>{t("shipping_partner_note_2")} </li>
                              <li>{t("shipping_partner_note_3")}</li>
                            </ul>
                          </div>
                      </div>
                      <div className='des-connect pt-24'>
                        <label>{t("you_dont_have_an_account_yet")}</label><span> <a href={props.partner.link_register} style={{color: '#1A94FF'}} target="_blank">{t("register_now")}</a> </span><br></br>
                        <div style={{height:'20px'}}><a href={props.partner.link_home} style={{color: '#1A94FF'}} target="_blank">Tìm hiểu thêm về {props.partner.name}</a></div>
                      </div>
                    </div>
                </div>
                <div className='modal-footer pt-32'>
                    <Button className="part-item_cancel modal-config_height_32" type="button"  style={{height:'32px',fontSize:"14px"}}
                    onClick={props.closeModal}
                    >{t("general_cancel")}</Button>
                    <Button className="save" type={'submit'} style={{height:'32px',fontSize:"14px"}}>{t("connect")}</Button>
                </div>
              </form>
          </Box>
        </StyledPartner> 
      </Modal>
      )
    }
    
   
    //Form VietNamPOST
    const VNPOSTConnect = () => {
      return (<Modal
        open={props.show}
        onClose={props.closeModal}
        >  
        <StyledPartner>
          <Box className='modal-connect' style={{height:'342px'}}>
              <form onSubmit={handleSubmit(formVNPOSTSubmit)}>
                <div className='modal-header' style={{width:'256px'}}>
                     <div className='modal-header-uppercase'>{t("connect_with")} {props.partner.name}</div>
                </div>
                <div className='modal-body'>
                    {errorSubmit !='' &&  
                    (<div className='error-form-submit'>
                    <img
                      src='/svg/error-v2.svg'
                      alt='icon-error'
                    /><span className='mgl-7'>{errorSubmit}</span><span className='error-form-submit_close' onClick={(e)=>{setErrorSubmit('');}}>{PARTNER_ICONS.close}</span>
                  </div> )
                    }
                    <div className='modal-content-body'>
                      <div className='note-connect' style={{paddingTop:"8px"}}>
                          <label>
                            EVO {t("two_way_connection_with_partner")} {props.partner.name} {t("help_the_store")}:
                          </label>
                          <div className='mgl-16 mgt-8'>
                            <ul className="list-note-connect">
                              <li>{t("shipping_partner_note_1")} {props.partner.name}.</li>
                              <li>{t("shipping_partner_note_2")}</li>
                              <li>{t("shipping_partner_note_3")}</li>
                              <li>{t("shipping_partner_note_5")}</li>
                            </ul>
                          </div>
                      </div>
                      <div className='des-connect pt-32'>
                        <div style={{width:"184px",height:"20px"}}><a href={props.partner.link_home} style={{color: '#1A94FF'}} target="_blank">{t("learn_more_about")} {props.partner.name}</a></div>
                      </div>
                    </div>
                </div>
                <div className='modal-footer pt-32'>
                    <Button className="part-item_cancel" type="button"  style={{height:'32px',fontSize:"14px"}}
                    onClick={props.closeModal}
                    >{t("general_cancel")}</Button>
                    <Button className="save" style={{height:'32px',fontSize:"14px"}} type={'submit'}> {t("connect")}</Button>
                </div>
              </form>
          </Box>
        </StyledPartner> 
      </Modal>
      )
    }
    const formVNPOSTSubmit =()=>{
      window.MVPUQ.requestPermision(
      VNPOST_CONFIG.id_customer, // ID đối tác
      VNPOST_CONFIG.url_login, //Link vnpost
      function (status, customerCode, tenKhachHang) {
          if(status ==1 && customerCode != ''){
                let url = getUrlConnectPartnerById(props.partner.id);
                postData(url, {customer_code:customerCode})
                  .then(res => {
                    if (res.data && res.data.success) {
                      props.closeModal();
                      toast.success({ title: t("connect_success_shipping_partner") });
                      reloadShippingPartner();
                    } else {
                      setErrorSubmit(t("error_connect")+res.data.message );
                    }
                  })
                  .catch(e => {
                })
          }else{
          }
      });
    }

    const renderSwitch = (idPartner) =>{
        switch(idPartner) {
          case 1:
            return JNTConnect();
          case 6:
            return VNPOSTConnect();
          case 3:
            return GHNConnect();
          default:
            return formDefault();
        }
    }
    return ( 
        renderSwitch(props.partner.id)
        
    )
}
