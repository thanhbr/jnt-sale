import React, {useState} from 'react';
import {Box, Modal} from "@mui/material";
import '../../../../Component/FeedBack/index.module.scss'
import cls from "clsx";
import css from "./index.module.scss";
import {FEED_BACK_ICONS} from "../../../../Component/FeedBack/_icons";
import {Button} from "../../../../common/button";
import {useForm} from "react-hook-form";
import {postData} from "../../../../api/api";
import toast from "../../../../Component/Toast";
import {UposLogFunc} from "../../../../util/functionUtil";
import {getUrlCreateCustomerGroup} from "../../../../api/url";
import {SCRIPT} from "../../CreateCustomer/_script";
import ModalConfirm from "../../../../Component/ModalConfirm";
import {REGEX_CUSTOMER_CODE} from "../../../../util/regex";

const CreateGroupCustomer = ({...props}) => {
  const { register, handleSubmit, formState: { errors }, reset, setError, getValues } = useForm({
    mode: 'all'});
  const [aniModalClose, setAniModalClose] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [checkStatus, setCheckStatus] = useState(true)
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
    const dataV = {
      ...data,
      status: data.status ? 1 : 2
    }
    const url = getUrlCreateCustomerGroup()
    postData(url, dataV)
      .then(res => {
        if (res.data && res.data.success) {
          toast.success({ title: 'Thêm mới thành công.' })
          setIsUpdate(false)
          props.closeModal(true)
        } else {
          reset(dataReset)
          setError(res.data.errors[0].field,
            { type: 'invalid', message: res.data.errors[0].message },
            { shouldFocus: true });
          toast.error({ title: 'Thêm mới thất bại!' })
        }
      })
      .catch(e => {
        UposLogFunc(`ERROR UPDATE PROFILE: ${e.message}`)
      })
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
              <p className={cls(css.title)}>Thông tin nhóm khách hàng</p>
              <p className={cls(css.sub_title)}>“Giúp bạn phân loại khách hàng theo nhóm”</p>
              <div className={cls(css.general)}>
                <label htmlFor={'modal_cus_id'}>Mã nhóm khách hàng <span>*</span></label>
                <div className={cls(css.field)}>
                  <input id={'modal_cus_id'}
                         placeholder={'Nhập mã nhóm khách hàng'}
                         maxLength={50}
                         autoComplete={'off'}
                         className={`${errors.group_code ? cls(css.input_error) : cls(css.input_success)}`}
                         {...register("group_code", {
                           required: SCRIPT.VALIDATE.GROUP_CUSTOMER_ID,
                           pattern: {
                             value: REGEX_CUSTOMER_CODE,
                             message: 'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt!',
                           },
                           onChange: (e) => {
                             e.target.value = e.target.value.replaceAll(' ', '')
                             setIsUpdate(true)
                           }
                         })}
                  />
                  {errors.group_code && (
                    <>
                      {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                      <span className={cls(css.errors)}>{errors.group_code.message}</span>
                    </>
                  )}
                </div>
              </div>
              <div className={cls(css.general)}>
                <label htmlFor={'modal_cus_name'}>Tên nhóm khách hàng <span>*</span></label>
                <div className={cls(css.field)}>
                  <input id={'modal_cus_name'}
                         placeholder={'Nhập tên nhóm khách hàng'}
                         maxLength={255}
                         autoComplete={'off'}
                         className={`${errors.group_name ? cls(css.input_error) : cls(css.input_success)}`}
                         {...register("group_name", {
                           required: SCRIPT.VALIDATE.GROUP_CUSTOMER_NAME,
                           onChange: (e) => {
                             e.target.value = e.target.value.replaceAll('  ', '')
                             setIsUpdate(true)
                           }
                         })}
                  />
                  {errors.group_name && (
                    <>
                      {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                      <span className={cls(css.errors)}>{errors.group_name.message}</span>
                    </>
                  )}
                </div>
              </div>
              <div className={cls(css.grp_acin)}>
                <input type={'checkbox'}
                       checked={checkStatus}
                       disabled={true}
                       className={cls(css.active_toggle)}
                       {...register("status", {
                         onChange: () => setCheckStatus(!checkStatus)
                       })}
                />
                <div className={cls(css.acin_text)} onClick={() => setCheckStatus(!checkStatus)}>
                  <span className={cls(css.acin)}>Kích hoạt/Ngưng sử dụng</span>
                </div>
              </div>
              <div className={cls(css.group_button)}>
                <hr />
                <Button className={cls(css.cancel)}
                        type={'button'}
                        appearance={'secondary'}
                        onClick={handleClose}
                >{SCRIPT.T_CANCEL}</Button>
                <Button className={cls(css.save)}
                        type={'submit'}>{SCRIPT.T_SAVE}</Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {confirm && <ModalConfirm txtConfirm={'Xác nhận'} handleConfirm={handleConfirm}/>}
    </>
  )
};

export default CreateGroupCustomer;