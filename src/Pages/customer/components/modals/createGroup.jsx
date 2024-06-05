import React, {useState} from 'react';
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {GROUP_CUSTOMER_MODAL_HEADER_TITLE} from "../../_constants";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {Switch} from "../switch";
import StringUtils from "../../../orderSingle/utils/string";
import {Box, Modal} from "@mui/material";
import {Button} from "../../../../common/button";
import {getUrlCreateCustomerGroup} from "../../../../api/url";
import {postData} from "../../../../api/api";
import toast from "../../../../Component/Toast";
import {UposLogFunc} from "../../../../util/functionUtil";

const CreateGroup = ({show, closeModal, updateGroup, ...props}) => {
  const [form, setForm] = useState({
    group_code: '',
    group_name: '',
    status: 1
  })
  const [error, setError] = useState({
    group_code: '',
    group_name: '',
  })
  const [changeInput, handleChangeInput] = useState(false)
  const [aniModalClose, setAniModalClose] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const handleSubmit = _ => {
    if(!validateBeforeSubmit()) {
      const url = getUrlCreateCustomerGroup()
      postData(url, form)
        .then(res => {
          if (res.data && res.data.success) {
            toast.success({ title: 'Thêm mới thành công.' })
            closeModal(true)

            form.id = res.data.meta.insert_id
            form.code = form.group_code
            form.name = form.group_name
            updateGroup(form)
          } else {
            res?.data?.errors?.map(item => {
              setError({
                ...error,
                group_code: item.field === 'group_code' ? 'Mã nhóm khách hàng đã tồn tại' : '',
              })
            })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR UPDATE PROFILE: ${e.message}`)
        })
    }
  }

  const validateBeforeSubmit = _ => {
    setError({
      ...error,
      group_code: !!!form?.group_code
        ? 'Mã nhóm khách hàng không được bỏ trống'
        : form?.group_code?.length > 50
          ? 'Mã nhóm khách hàng chỉ được phép nhập tối đa 50 ký tự'
          : '',
      group_name: !!!form?.group_name
        ? 'Tên nhóm khách hàng không được bỏ trống'
        : form?.group_name?.length > 255
          ? 'Tên nhóm khách hàng chỉ được phép nhập tối đa 255 ký tự'
          : ''
    })
    return !!!form?.group_code || !!!form?.group_name
  }

  const handleChangeCode = group_code => {
    handleChangeInput(true)
    setForm({...form, group_code: StringUtils.formatOrderCode(group_code)})
    if(!!group_code) {
      setError({ ...error, group_code: ''})
    }
  }

  const handleChangeName = group_name => {
    handleChangeInput(true)
    setForm({...form, group_name: group_name})
    if(!!group_name) {
      setError({ ...error, group_name: ''})
    }
  }

  const handleBlurCode = _ => {
    setError({
      ...error,
      group_code: !!!form?.group_code
        ? 'Mã nhóm khách hàng không được bỏ trống'
        : form?.group_code?.length > 50
          ? 'Mã nhóm khách hàng chỉ được phép nhập tối đa 50 ký tự'
          : ''
    })
  }

  const handleBlurName = _ => {
    setError({
      ...error,
      group_name: !!!form?.group_name
        ? 'Tên nhóm khách hàng không được bỏ trống'
        : form?.group_name?.length > 255
          ? 'Tên nhóm khách hàng chỉ được phép nhập tối đa 255 ký tự'
          : ''
    })
  }

  const handleClose = _ => {
    if(!changeInput) {
      setAniModalClose(true)
      setTimeout(() => {
        closeModal(true)
        setAniModalClose(false)
      }, 300)
    } else {
      setConfirm(true)
    }
  }

  const handleConfirm = confirm => {
    setConfirm(false)
    if(confirm) {
      setAniModalClose(true)
      setTimeout(() => {
        closeModal(true)
        setAniModalClose(false)
      }, 300)
    }
  }

  const canSubmit = [
    !!!error?.group_code,
    !!!error?.group_name,
  ].includes(false)

  return (
    <>
      <RightSightPopup
        openModal={show}
        confirmBeforeClose={true}
        clickClose={handleClose}
        disableSubmit={canSubmit}
        animationClose={aniModalClose}
        header={GROUP_CUSTOMER_MODAL_HEADER_TITLE}
        body={[
          {
            item: (
              <>
                <Input
                  className="order-filter-form__input-wide"
                  placeholder="Nhập mã nhóm khách hàng"
                  value={form.group_code}
                  onChange={(e) => handleChangeCode(e.target?.value)}
                  onBlur={() => handleBlurCode()}
                  validateText={error.group_code || ''}
                  validateType={'danger'}
                  label={<>Mã nhóm khách hàng <Text color={'red'}>*</Text></>}
                  maxLength={51}
                />
                <div style={{marginTop: 24}}>
                  <Input
                    className="order-filter-form__input-wide"
                    placeholder="Nhập tên nhóm khách hàng"
                    value={form.group_name}
                    onChange={(e) => handleChangeName(e.target?.value)}
                    onBlur={() => handleBlurName()}
                    validateText={error.group_name || ''}
                    validateType={'danger'}
                    label={<>Tên nhóm khách hàng <Text color={'red'}>*</Text></>}
                    maxLength={256}
                  />
                </div>
                <div style={{display: 'flex', marginTop: 24}}>
                  <Switch
                    checked={form?.status === 1}  style={{marginRight: 8}}
                    disabled={true}
                  />
                  <Text color="#191D32">
                    Kích hoạt/Ngưng sử dụng
                  </Text>
                </div>
              </>
            ),
          }
        ]}
        footer={
          {
            cancel: {
              width: 74,
              title: 'Huỷ'
            },
            save: {
              width: 110,
              title: 'Lưu'
            },
          }
        }
        acceptance={() => handleSubmit()}
      />
      {confirm && (
        <Modal
          open={confirm}
          onClose={() => {
            props.handleConfirm(false)
            setConfirm(false)
          }}
          className={'modal-confirm'}
        >
          <Box className={'modal-confirm__box'}>
            <div>
              <div style={{marginBottom: 16}}>
                <Text fontWeight={600} fontSize={20}>Xác nhận rời khỏi trang</Text>
              </div>
              <Text>Bạn đã thực hiện một số thay đổi. Bạn có chắc chắn muốn thoát khi dữ liệu chưa được lưu?</Text>
              <div className={'modal-confirm__group-btn'}>
                <Button size='sm' className={'modal-confirm__dismiss'} appearance={'ghost'}
                        onClick={() => {
                          handleConfirm(false)
                          setConfirm(false)
                        }}
                >Hủy</Button>
                <Button size='sm' className={'modal-confirm__save'}
                        onClick={() => {
                          handleConfirm(true)
                          setConfirm(false)
                        }}
                >Xác nhận</Button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default CreateGroup;