import React, {useEffect, useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";

import {postData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {UserManagementContext} from "../provider/_context";
import {userManagementActions} from "../provider/_reducer";
import toast from "../../../Component/Toast";
import { replaceAllCustom, UposLogFunc } from '../../../util/functionUtil'
import {PATH} from "../../../const/path";
import {replaceVN} from "../../../util/checkPasswordVN";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useCreateUserManagement = () => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(UserManagementContext)
  const fullName = pageState?.form?.userInfo?.fullName?.value
  const phone = pageState?.form?.userInfo?.phone?.value
  const email = pageState?.form?.userInfo?.email?.value
  const dob = pageState?.form?.userInfo?.dob?.display
  const address = pageState?.form?.userInfo?.address?.value
  const gender = pageState?.form?.userInfo?.gender?.value
  const note = pageState?.form?.userInfo?.note?.value
  const userName = pageState?.form?.accountInfo?.userName?.value
  const password = pageState?.form?.accountInfo?.password?.value
  const confirmPassword = pageState?.form?.accountInfo?.confirmPassword?.value
  const checkedRules = pageState?.form?.userRole?.group?.value
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const [groupEmployee, setGroupEmployee] = useState([])
  const [typePassword, setTypePassword] = useState('password')
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password')
  const navigate = useNavigate();
  const wipDisabled = pageState?.wipDisabledSubmit

  useEffect(() => {
    handleUserManagement()
  }, [])

  const handleUserManagement = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employee/groups?keyword=`),
    ])
    if (response[0]?.data?.success && !!response[0]?.data?.data) {
      setGroupEmployee(response[0]?.data?.data)
    }
  }

  const handleChangeFullName = value => {
    pageDispatch({
      type: userManagementActions.FORM_FULL_NAME_UPDATE,
      payload: { value: value }
    })
    if(!!value.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_FULL_NAME,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleChangePhone = value => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      pageDispatch({
        type: userManagementActions.FORM_PHONE_UPDATE,
        payload: { value: value.trim() }
      })
      if(!!value.trim()) {
        pageDispatch({
          type: userManagementActions.VALID_PHONE,
          payload: { status: false, message: '' }
        })
      }
    }
  }

  const handleChangeEmail = value => {
    pageDispatch({
      type: userManagementActions.FORM_EMAIL_UPDATE,
      payload: { value: value.trim() }
    })
  }

  const handleChangeDOB = date => {
    let dateSelected = new Date(date);
    let dateString = dateSelected.getFullYear() + "-" + ("0"+(dateSelected.getMonth()+1)).slice(-2) + "-" + ("0" + dateSelected.getDate()).slice(-2)
    pageDispatch({
      type: userManagementActions.FORM_DOB_UPDATE,
      payload: { value: dateString, display: dateSelected}
    })
  }

  const handleChangeGender = value => {
    pageDispatch({
      type: userManagementActions.FORM_GENDER_UPDATE,
      payload: { value: value }
    })
  }

  const handleChangeAddress = value => {
    pageDispatch({
      type: userManagementActions.FORM_ADDRESS_UPDATE,
      payload: { value: value }
    })
  }

  const handleChangeNote = value => {
    pageDispatch({
      type: userManagementActions.FORM_NOTE_UPDATE,
      payload: { value: value }
    })
    if(value.length > 255) {
      pageDispatch({
        type: userManagementActions.VALID_NOTE,
        payload: { status: true, message: 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!' }
      })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_NOTE,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleChangeUserName = value => {
    const userNameFormat = replaceAllCustom(value.replace(/[^\w\s]/gi, ''),' ', '')
    pageDispatch({
      type: userManagementActions.FORM_USER_NAME_UPDATE,
      payload: { value: userNameFormat.trim() }
    })
    if(!!userNameFormat.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_USER_NAME,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleChangePassword = value => {
    const passwordFormat = replaceAllCustom(value.replace(replaceVN, ''),' ', '')
    pageDispatch({
      type: userManagementActions.FORM_PASSWORD_UPDATE,
      payload: { value: passwordFormat.trim() }
    })
    if(!!passwordFormat.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_PASSWORD,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleChangeConfirmPassword = value => {
    const confirmPasswordFormat = replaceAllCustom(value.replace(replaceVN, ''),' ', '')
    pageDispatch({
      type: userManagementActions.FORM_CONFIRM_PASSWORD_UPDATE,
      payload: { value: confirmPasswordFormat.trim() }
    })
    if(!!confirmPasswordFormat.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_CONFIRM_PASSWORD,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleChangeTypePassword = () => setTypePassword(typePassword === 'password' ? 'text' : 'password')
  const handleChangeTypeConfirmPassword = () => setTypeConfirmPassword(typeConfirmPassword === 'password' ? 'text' : 'password')

  const handleChangeRule = id => {
    const isChecked = checkedRules.includes(id)
    const rules = isChecked ? checkedRules.filter(item => item !== id) : [...checkedRules, id]
    pageDispatch({
      type: userManagementActions.FORM_ROLE_UPDATE,
      payload: { value: rules}
    })
    if(rules?.length > 0) {
      pageDispatch({
        type: userManagementActions.VALID_CHECK_RULE,
        payload: { status: false, message: '' }
      })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_CHECK_RULE,
        payload: { status: true, message: 'Bạn cần chọn ít nhất 1 vai trò cho nhân viên này!' }
      })
    }
  }

  // VALIDATE
  const handleBlurFullName = () => {
    pageDispatch({
      type: userManagementActions.FORM_FULL_NAME_UPDATE,
      payload: { value: fullName.trim() }
    })
    if(!!!fullName) {
      pageDispatch({
         type: userManagementActions.VALID_FULL_NAME,
         payload: { status: true, message: 'Họ tên không được để trống!' }
       })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_FULL_NAME,
        payload: { status: false, message: '' }
      })
    }
  }
  const handleBlurPhone = () => {
    if(!!!phone) {
      pageDispatch({
        type: userManagementActions.VALID_PHONE,
        payload: { status: true, message: 'Số điện thoại không được để trống!' }
      })
    } else if (phone.length < 10) {
      pageDispatch({
        type: userManagementActions.VALID_PHONE,
        payload: { status: true, message: 'Số điện thoại tối thiểu có 10 và tối đa 11 chữ số.!' }
      })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_PHONE,
        payload: { status: false, message: '' }
      })
    }
  }
  const handleBlurEmail = () => {
    if(!!!email.toLowerCase().match(regexEmail) && !!email) {
      pageDispatch({
        type: userManagementActions.VALID_EMAIL,
        payload: { status: true, message: 'Vui lòng nhập đúng định dạng email (ví dụ: abc@gmail.com)' }
      })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_EMAIL,
        payload: { status: false, message: '' }
      })
    }
  }
  const handleBlurUserName = () => {
    if(!!!userName) {
      pageDispatch({ type: userManagementActions.VALID_USER_NAME, payload: { status: true, message: 'Tên đăng nhập không được để trống!' } })
    } else {
      pageDispatch({ type: userManagementActions.VALID_USER_NAME, payload: { status: false, message: '' } })
    }
  }
  const handleBlurPassword = value => {
    if(!!!password) {
      pageDispatch({
        type: userManagementActions.VALID_PASSWORD,
        payload: { status: true, message: 'Mật khẩu không được để trống!' }
      })
      return
    }
    if(value.trim().length < 6) {
      pageDispatch({
        type: userManagementActions.VALID_PASSWORD,
        payload: { status: true, message: 'Mật khẩu cần có ít nhất 6 ký tự!' }
      })
    }
    if(password.length > 30) {
      pageDispatch({
        type: userManagementActions.VALID_PASSWORD,
        payload: { status: true, message: 'Mật khẩu chỉ được phép nhập tối đa 30 ký tự!' }
      })
    }
    if(value.trim() === confirmPassword && confirmPassword.length < 30) {
      pageDispatch({
        type: userManagementActions.VALID_CONFIRM_PASSWORD,
        payload: {status: false, message: ''}
      })
    }
    if(value.trim() !== confirmPassword) {
      pageDispatch({
        type: userManagementActions.VALID_CONFIRM_PASSWORD,
        payload: {status: true, message: 'Mật khẩu xác nhận không khớp với Mật khẩu mới!'}
      })
    }
  }

  const handleBlurConfirmPassword = value => {
    if(!!!confirmPassword) {
      pageDispatch({
        type: userManagementActions.VALID_CONFIRM_PASSWORD,
        payload: {status: true, message: 'Mật khẩu xác nhận không được để trống!'}
      })
      return
    }
    if(value.trim().length < 6) {
      pageDispatch({
        type: userManagementActions.VALID_CONFIRM_PASSWORD,
        payload: {status: true, message: 'Mật khẩu xác nhận cần có ít nhất 6 ký tự!'}
      })
      return
    }
    if(confirmPassword.length > 30) {
      pageDispatch({
        type: userManagementActions.VALID_CONFIRM_PASSWORD,
        payload: { status: true, message: 'Mật khẩu xác nhận chỉ được phép nhập tối đa 30 ký tự!' }
      })
    }
    if(value.trim() !== password) {
      pageDispatch({
        type: userManagementActions.VALID_CONFIRM_PASSWORD,
        payload: {status: true, message: 'Mật khẩu xác nhận không khớp với Mật khẩu mới!'}
      })
    }
  }
  const handleBlurAddress = value => {
    if(!!value) {
      pageDispatch({
        type: userManagementActions.FORM_ADDRESS_UPDATE,
        payload: { value: value.trim() }
      })
    }
  }
  const handleBlurNote = () => {
    pageDispatch({
      type: userManagementActions.FORM_NOTE_UPDATE,
      payload: { value: note.trim() }
    })
  }

  const validateBeforeSubmit = () => {
    if(!!!fullName || !!!phone || phone.length < 10 || !!!userName || !!!password
        || !!!confirmPassword || !!!email.toLowerCase().match(regexEmail) && !!email
        || !!!checkedRules || password !== confirmPassword || note.trim().length > 255) {
      if(!!!fullName) {
        pageDispatch({
          type: userManagementActions.VALID_FULL_NAME,
          payload: { status: true, message: 'Họ tên không được để trống!' }
        })
      }
      if(!!!phone) {
        pageDispatch({
          type: userManagementActions.VALID_PHONE,
          payload: { status: true, message: 'Điện thoại không được để trống!' }
        })
      }
      if(!!!userName) {
        pageDispatch({
          type: userManagementActions.VALID_USER_NAME,
          payload: { status: true, message: 'Tên đăng nhập không được để trống!' }
        })
      }
      if(!!!password) {
        pageDispatch({
          type: userManagementActions.VALID_PASSWORD,
          payload: { status: true, message: 'Mật khẩu không được để trống!' }
        })
      }
      if(!!!confirmPassword) {
        pageDispatch({
          type: userManagementActions.VALID_CONFIRM_PASSWORD,
          payload: { status: true, message: 'Mật khẩu xác nhận không được để trống!' }
        })
      }
      if(checkedRules?.length === 0) {
        pageDispatch({
          type: userManagementActions.VALID_CHECK_RULE,
          payload: { status: true, message: 'Bạn cần chọn ít nhất 1 vai trò cho nhân viên này!' }
        })
      }
      if(password !== confirmPassword) {
        pageDispatch({
          type: userManagementActions.VALID_CONFIRM_PASSWORD,
          payload: {status: true, message: 'Mật khẩu xác nhận không khớp với Mật khẩu mới!'}
        })
      }
      if(note.trim().length > 255) {
        pageDispatch({
          type: userManagementActions.VALID_NOTE,
          payload: { status: true, message: 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!' }
        })
      }
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if(validateBeforeSubmit()) {
      const url = `${config.API}/admin/employee/create`
      const dataPost = new FormData()
      dataPost.append('name', pageState?.form?.userInfo?.fullName?.value?.trim() || '')
      dataPost.append('phone', pageState?.form?.userInfo?.phone?.value?.trim() || '')
      dataPost.append('email', pageState?.form?.userInfo?.email?.value?.trim() || '')
      dataPost.append('address', pageState?.form?.userInfo?.address?.value?.trim() || '')
      dataPost.append('birthday', pageState?.form?.userInfo?.dob?.value || '')
      dataPost.append('gender', pageState?.form?.userInfo?.gender?.value || '')
      dataPost.append('note', pageState?.form?.userInfo?.note?.value?.trim() || '')
      dataPost.append('username', pageState?.form?.accountInfo?.userName?.value?.trim() || '')
      dataPost.append('password', pageState?.form?.accountInfo?.password?.value?.trim() || '')
      dataPost.append('groups', pageState?.form?.userRole?.group?.value?.toString() || '')

      postData(url, dataPost)
        .then(response => {
          if (response?.data && response?.data?.success) {
            navigate(PATH.USER)
            toast.success({ title: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_SUCCESS) })
          } else if (!response?.data?.success && response?.data?.code === 101) {
            response?.data?.details?.map(item => {
              if(item.code === 6009) {
                pageDispatch({
                  type: userManagementActions.VALID_PHONE,
                  payload: { status: true, message: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_RES1) }
                })
              }
              if(item.code === 6010) {
                pageDispatch({
                  type: userManagementActions.VALID_USER_NAME,
                  payload: { status: true, message: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_RES2) }
                })
              }
              if(item.code === 6011) {
                pageDispatch({
                  type: userManagementActions.VALID_EMAIL,
                  payload: { status: true, message: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_RES3) }
                })
              }
            })
          } else if (response?.data?.code === 5028) {
            toast.error(t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_RES4))
            pageDispatch({ type: userManagementActions.WIP_DISABLED_SUBMIT, payload: true })
          }
            else {
            toast.error({ title: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_FAILED) })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR CREATE USER: ${e.message}`)
        })
    }
  }

  const handleChangeDOBNew = date => {
    const dateFormat = date?.formatValue?.split(' ')[0]
    let dateSelected = new Date(`${dateFormat.split('/')[2]}/${dateFormat.split('/')[1]}/${dateFormat.split('/')[0]}`)
    let dateString = dateSelected.getFullYear() + "-" + ("0"+(dateSelected.getMonth()+1)).slice(-2) + "-" + ("0" + dateSelected.getDate()).slice(-2)
    pageDispatch({
      type: userManagementActions.FORM_DOB_UPDATE,
      payload: { value: dateString, display: dateSelected}
    })
  }

  return {
    groupEmployee: {
      list: groupEmployee
    },
    valueForm: {
      fullName: fullName,
      phone: phone,
      email: email,
      dob: dob,
      address: address,
      gender: gender,
      note: note,
      userName: userName,
      password: password,
      confirmPassword: confirmPassword,
      rules: checkedRules
    },
    typeInput: {
      password: typePassword,
      confirmPassword: typeConfirmPassword,
    },
    validate: {
      errorFullName: pageState?.validate?.fullName,
      onBlurFullName: handleBlurFullName,
      errorPhone: pageState?.validate?.phone,
      onBlurPhone: handleBlurPhone,
      errorEmail: pageState?.validate?.email,
      onBlurEmail: handleBlurEmail,
      errorUserName: pageState?.validate?.userName,
      onBlurUserName: handleBlurUserName,
      errorPassword: pageState?.validate?.password,
      onBlurPassword: handleBlurPassword,
      errorNote: pageState?.validate?.note,
      errorConfirmPassword: pageState?.validate?.confirmPassword,
      onBlurConfirmPassword: handleBlurConfirmPassword,
      errorCheckRules: pageState?.validate?.checkRule,
      onBlurAddress: handleBlurAddress,
      onBlurNote: handleBlurNote,
    },
    functions: {
      onChangeFullName: handleChangeFullName, 
      onChangePhone: handleChangePhone,
      onChangeEmail: handleChangeEmail,
      onChangeDOB: handleChangeDOB,
      onChangeDOBNew: handleChangeDOBNew,
      onChangeGender: handleChangeGender,
      onChangeAddress: handleChangeAddress,
      onChangeNote: handleChangeNote,
      onChangeUserName: handleChangeUserName,
      onChangePassword: handleChangePassword,
      onChangeTypePassword: handleChangeTypePassword,
      onChangeTypeConfirmPassword: handleChangeTypeConfirmPassword,
      onChangeConfirmPassword: handleChangeConfirmPassword,
      onChangeRule: handleChangeRule,
      submit: handleSubmit
    },
    wipDisabled
  }
}

export default useCreateUserManagement;