import React, {useState} from 'react';
import {Box, Modal} from "@mui/material";
import '../../../../Component/FeedBack/index.module.scss'
import cls from "clsx";
import css from "./index.module.scss";
import {FEED_BACK_ICONS} from "../../../../Component/FeedBack/_icons";
import {Button} from "../../../../common/button";
import {useForm} from "react-hook-form";
import {postData} from "../../../../api/api";
import {getUrlCreateCustomerGroup,getUrlUpdateCustomerGroup} from "../../../../api/url";
import ModalConfirm from "../../components/ModalConfirm";
import {REGEX_CUSTOMER_CODE} from "../../../../util/regex";
import useGroupCustomerContext from '../../hooks/_context'
import useGroupCustomer from '../../hooks/useGroupCustomer'
import { failIcon, successIcon } from '../../components/notification'
import { replaceAllCustom } from '../../../../util/functionUtil'
import { useTranslation } from "react-i18next";

const GroupCustomerModal = ({...props}) => {
  const { register, handleSubmit, formState: { errors }, reset, setError, getValues } = useForm({
    mode: 'all'});
  const [state, dispatch]= useGroupCustomerContext();

  const [aniModalClose, setAniModalClose] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const {functions} = useGroupCustomer()
  const { t } = useTranslation()
  const onSubmit = data => {
    if(!isUpdate) return
    setIsUpdate(false)
    const dataReset = {
      // eslint-disable-next-line no-undef
      group_code: _.cloneDeep(getValues("group_code")),
      // eslint-disable-next-line no-undef
      group_name: _.cloneDeep(getValues("group_name")),
    }
    reset({
      'group_code': '',
      'group_name': ''
    })
    if(!props.dataRow) {
      const url = getUrlCreateCustomerGroup()
      data.status = data.status == true ? 1: 2;
      postData(url, data)
        .then(res => {
          if (res.data && res.data.success) {
            if (res.data.success == true) { 
                dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: res.data.message, success: true, iconUrl: successIcon}})
            } else {
                dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: res.data.message, success: false, iconUrl: failIcon}})
            }
            
            dispatch({type:'SET_CREATED', payload: true})
            setIsUpdate(false)
            props.closeModal(true)
            functions.fetchData()
          } else {
            reset(dataReset)
            setError(res.data.errors[0].field,
              { type: 'invalid', message: res.data.errors[0].message },
              { shouldFocus: true });
            dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: t("create_customer_group_fail"), success: false, iconUrl: failIcon}})
          }
        })
        .catch(e => {
          console.log(`ERROR ADD GROUP CUSTOMER: ${e.message}`)
        })
    } else {
      const url = getUrlUpdateCustomerGroup(props.dataRow.id)
      data.status = data.status == true ? 1: 2;
      postData(url, data)
        .then(res => {
          if (res.data && res.data.success) {
            if (res.data.success == true) { 
                dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: res.data.message, success: true, iconUrl: successIcon}})
            } else {
                dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: res.data.message, success: false, iconUrl: failIcon}})
            }
            setIsUpdate(false)
            props.closeModal(true)
            functions.fetchData()
          } else {
            reset(dataReset)
            setError(res.data.errors[0].field,
              { type: 'invalid', message: res.data.errors[0].message },
              { shouldFocus: true });
            dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: t("update_customer_group_fail"), success: false, iconUrl: failIcon}})
          }
        })
        .catch(e => {
          console.log(`ERROR UPDATE GROUP CUSTOMER: ${e.message}`)
        })
      }
  }
  const handleConfirm = confirm => {
    setConfirm(false)
    if(confirm) {
      setAniModalClose(true)
      setTimeout(() => {
        props.closeModal(true)
        setAniModalClose(false)
      }, 300)
    }
  }
  const handleClose = () => {
    if(!isUpdate) {
      setAniModalClose(true)
      setTimeout(() => {
        props.closeModal(true)
        setAniModalClose(false)
      }, 300)
    } else {
      setConfirm(true)
    }
  }
  return (
    <>
      <Modal
        open={props.show}
        onClose={handleClose}
      >
        <Box className={`${cls(css.box_modal)} ${aniModalClose && cls(css.modal_custom)}`}>
          <div className={cls(css.dismiss)}
               onClick={handleClose}
          >
            {FEED_BACK_ICONS.dismiss}
          </div>
          <div className={cls(css.wrapper)}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className={cls(css.title)}>{t("infor_customer_group")}</p>
              <p className={cls(css.sub_title)}>{t("help_select_type_customers_group")}</p>
              <div className={cls(css.general)}>
                <label htmlFor={'modal_cus_id'}>{t("customer_group_code")} <span>*</span></label>
                <div className={cls(css.field)}>
                  <input id={'modal_cus_id'}
                         placeholder={t("enter_customer_group_code")}
                         maxLength={50}
                         autoComplete={'off'}
                         className={`${errors.group_code ? cls(css.input_error) : cls(css.input_success)}`}
                         {...register("group_code", {
                           required: t("require_customer_group_code"),
                           pattern: {
                             value: REGEX_CUSTOMER_CODE,
                             message: t("validate_customer_group_code"),
                           },
                           onChange: (e) => {
                             e.target.value = replaceAllCustom(e.target.value,' ', '')
                             setIsUpdate(true)
                           }
                         })}
                         defaultValue={props.dataRow ? props.dataRow.code : '' }
                  />
                  {errors.group_code && (
                    <>
                      <span className={cls(css.errors)}>{errors.group_code.message}</span>
                    </>
                  )}
                </div>
              </div>
              <div className={cls(css.general)}>
                <label htmlFor={'modal_cus_name'}>{t("customer_group_name")} <span>*</span></label>
                <div className={cls(css.field)}>
                  <input id={'modal_cus_name'}
                         placeholder={t("enter_customer_group_name")}
                         maxLength={255}
                         autoComplete={'off'}
                         className={`${errors.group_name ? cls(css.input_error) : cls(css.input_success)}`}
                         {...register("group_name", {
                           required: t("require_customer_group_name"),
                           onChange: (e) => {
                             e.target.value = replaceAllCustom(e.target.value,'  ', '')
                             setIsUpdate(true)
                           }
                         })}
                         defaultValue={props.dataRow ? props.dataRow.name : '' }
                  />
                  {errors.group_name && (
                    <>
                      <span className={cls(css.errors)}>{errors.group_name.message}</span>
                    </>
                  )}
                </div>
              </div>
              <div className={cls(css.grp_acin)}>
                <input type={'checkbox'}
                       className={cls(css.active_toggle)}
                       {...register("status",{
                        onChange: (e) => {
                          setIsUpdate(true)
                        }
                       })}
                       defaultChecked={props.dataRow ? props.dataRow.status == 1 ? true: false : true }
                />
                <div className={cls(css.acin_text)}>
                  <span className={cls(css.acin)}>{t("general_active")}/{t("general_deactivation")}</span>
                </div>
              </div>
              <div className={cls(css.group_button)}>
                <hr />
                <Button className={cls(css.cancel)}
                        type={'button'}
                        appearance={'secondary'}
                        onClick={handleClose}
                >{t("general_cancel")}</Button>
                <Button className={props.dataRow ? cls(css.update) : cls(css.save)}
                        type={'submit'}>{props.dataRow ? t("update") : t("general_save")}</Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {confirm && <ModalConfirm txtConfirm={t("general_confirm")} handleConfirm={handleConfirm}/>}
    </>
  )
};

export default GroupCustomerModal;