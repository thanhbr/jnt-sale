import {useContext, useEffect, useState} from "react";
import {UserManagementContext} from "../provider/_context";
import {getData, postData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {userManagementActions} from "../provider/_reducer";
import toast from "../../../Component/Toast";
import { replaceAllCustom, UposLogFunc } from '../../../util/functionUtil'
import {transformOriginData} from "../utils/transform";
import {checkPasswordVN, replaceVN} from "../../../util/checkPasswordVN";
import {getUrlDetailUserManagement} from "../../../api/url";
import useGlobalContext from "../../../containerContext/storeContext";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

export const useModal = () => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(UserManagementContext)
  const [GlobalState, ] = useGlobalContext()
  const [groupEmployee, setGroupEmployee] = useState([])
  const checkedRules = pageState?.modalUserRole?.value
  const [checkedRulesDefault, setCheckedRulesDefault] = useState([])
  const [closeModalRole, setCloseModalRole] = useState(false)
  const [changeModalRole, setChangeModalRole] = useState(false)
  const [changeModalInfo, setChangeModalInfo] = useState(false)
  const [changeModalPass, setChangeModalPass] = useState(false)
  const [debounceSubmitInfo, setDebounceSubmitInfo] = useState(true)
  const [debounceSubmitPass, setDebounceSubmitPass] = useState(true)
  const [debounceSubmitRule, setDebounceSubmitRule] = useState(true)
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const fullName = pageState?.formModalInfo?.fullName?.value
  const phone = pageState?.formModalInfo?.phone?.value
  const email = pageState?.formModalInfo?.email?.value
  const address = pageState?.formModalInfo?.address?.value
  const dob = pageState?.formModalInfo?.dob?.display
  const gender = pageState?.formModalInfo?.gender?.value
  const note = pageState?.formModalInfo?.note?.value
  const activeEmployee = pageState?.formModalInfo?.active?.value === '1'
  const currentUserName = pageState?.userDetailInfo?.username || ''
  const currentPassword = pageState?.formModalPass?.password?.value
  const newPassword = pageState?.formModalPass?.newPassword?.value
  const confirmPassword = pageState?.formModalPass?.confirmNewPassword?.value

  const [typeCurrentPassword, setTypeCurrentPassword] = useState('password')
  const [typeNewPassword, setTypeNewPassword] = useState('password')
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password')

  useEffect(() => {
    handleUserManagement()
  }, [pageState?.id_user])

  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  const handleUserManagement = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employee/groups?keyword=`),
      sendRequestAuth('get', `${config.API}/admin/employee/detail/${pageState?.id_user}`),
    ])
    if (response[0]?.data?.success && !!response[0]?.data?.data) {
      setGroupEmployee(response[0]?.data?.data)
    }
    if (response[1]?.data?.success && !!response[1]?.data?.data) {
      const userDetailRole = response[1]?.data?.data?.groups_list
      pageDispatch({
        type: userManagementActions.MODAL_ROLE_UPDATE,
        payload: { value: userDetailRole.map(item => item.id)}
      })
      setCheckedRulesDefault(userDetailRole.map(item => item.id))

      pageDispatch({
        type: userManagementActions.USER_DETAIL_INFO,
        payload:  response[1]?.data?.data
      })

      // USER INFO
      pageDispatch({
        type: userManagementActions.FORM_INFO_FULL_NAME_UPDATE,
        payload: { value: response[1]?.data?.data?.fullname }
      })
      pageDispatch({
        type: userManagementActions.FORM_INFO_PHONE_UPDATE,
        payload: { value: response[1]?.data?.data?.phone }
      })
      pageDispatch({
        type: userManagementActions.FORM_INFO_EMAIL_UPDATE,
        payload: { value: response[1]?.data?.data?.email }
      })
      pageDispatch({
        type: userManagementActions.FORM_INFO_ADDRESS_UPDATE,
        payload: { value: response[1]?.data?.data?.address }
      })

      if(response[1]?.data?.data?.birthday && isValidDate(new Date(response[1]?.data?.data?.birthday))) {
        let dateSelected = new Date(response[1]?.data?.data?.birthday);
        let dateString = dateSelected.getFullYear() + "-" + ("0"+(dateSelected.getMonth()+1)).slice(-2) + "-" + ("0" + dateSelected.getDate()).slice(-2)
        pageDispatch({
          type: userManagementActions.FORM_INFO_DOB_UPDATE,
          payload: { value: dateString, display: dateSelected}
        })
      } else {
        pageDispatch({
          type: userManagementActions.FORM_INFO_DOB_UPDATE,
          payload: { value: '', display: ''}
        })
      }
      if(!!response[1]?.data?.data?.note) {
        pageDispatch({
          type: userManagementActions.FORM_INFO_NOTE_UPDATE,
          payload: { value: response[1]?.data?.data?.note }
        })
      } else {
        pageDispatch({
          type: userManagementActions.FORM_INFO_NOTE_UPDATE,
          payload: { value: '' }
        })
      }
      pageDispatch({
        type: userManagementActions.FORM_INFO_GENDER_UPDATE,
        payload: { value: response[1]?.data?.data?.gender }
      })
      pageDispatch({
        type: userManagementActions.FORM_INFO_STATUS_UPDATE,
        payload: { value: response[1]?.data?.data?.status }
      })
    }
  }

  const handleChangeRule = id => {
    const isChecked = checkedRules.includes(id)
    const rules = isChecked ? checkedRules.filter(item => item !== id) : [...checkedRules, id]
    pageDispatch({
      type: userManagementActions.MODAL_ROLE_UPDATE,
      payload: { value: rules}
    })
    if(rules?.length > 0) {
      pageDispatch({
        type: userManagementActions.MODAL_VALID_RULES,
        payload: { status: false, message: '' }
      })
    } else {
      pageDispatch({
        type: userManagementActions.MODAL_VALID_RULES,
        payload: { status: true, message: 'Bạn cần chọn ít nhất 1 vai trò cho nhân viên này!' }
      })
    }
    setChangeModalRole(true)
  }

  const onCloseModalUserRole = () => {
    if(!changeModalRole) {
      setCloseModalRole(true)
      setTimeout(() => {
        pageDispatch({ type: userManagementActions.MODAL_USER_ROLE, payload: false})
        setCloseModalRole(false)
      }, 300)
    } else {
      pageDispatch({
        type: userManagementActions.MODAL_CONFIRM_USER_ROLE,
        payload: true
      })
    }
  }
  const closeModalRoleConfirm = () => {
    pageDispatch({
      type: userManagementActions.MODAL_CONFIRM_USER_ROLE,
      payload: false
    })
  }
  const acceptanceModalRoleConfirm = () => {
    //CLOSE MODAL CONFIRM
    pageDispatch({
      type: userManagementActions.MODAL_CONFIRM_USER_ROLE,
      payload: false
    })
    //CLOSE MODAL ROLE
    setCloseModalRole(true)
    setTimeout(() => {
      pageDispatch({ type: userManagementActions.MODAL_USER_ROLE, payload: false})
      setCloseModalRole(false)
    }, 300)
    // CLEAR VALIDATE
    pageDispatch({
      type: userManagementActions.MODAL_VALID_RULES,
      payload: { status: false, message: '' }
    })
  }

  const handleSubmitRule = () => {
    if(debounceSubmitRule) {
      setDebounceSubmitRule(false)
      const url = `${config.API}/admin/employee/update-role/${pageState?.id_user}`
      const dataPost = new FormData()
      dataPost.append('groups', pageState?.modalUserRole?.value?.toString() || checkedRulesDefault)

      postData(url, dataPost)
        .then(response => {
          if (response.data && response.data.success) {
            toast.success({ title: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_ROLE_SUCCESS) })

            //CLOSE MODAL ROLE
            setCloseModalRole(true)
            setTimeout(() => {
              pageDispatch({ type: userManagementActions.MODAL_USER_ROLE, payload: false})
              setCloseModalRole(false)
            }, 300)

            fetchDataAfterUpdate()
          } else {
            toast.error({ title: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_ROLE_FAILED) })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR UPDATE ROLE USER: ${e.message}`)
        })
    }
    setTimeout(() => {setDebounceSubmitRule(true)}, 1000)
  }

  const [closeModalInfo, setCloseModalInfo] = useState(false)
  const onCloseModalUserInfo = () => {
    if(!changeModalInfo) {
      setCloseModalInfo(true)
      setTimeout(() => {
        pageDispatch({ type: userManagementActions.MODAL_USER_INFOR, payload: false})
        setCloseModalInfo(false)
      }, 300)
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_FULL_NAME,
        payload: { status: false, message: '' }
      })
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_PHONE,
        payload: { status: false, message: '' }
      })
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_EMAIL,
        payload: { status: false, message: '' }
      })
    } else {
      pageDispatch({ type: userManagementActions.MODAL_CONFIRM_USER_INFO, payload: true})
    }
  }
  const handleChangeFullName = value => {
    setChangeModalInfo(true)
    pageDispatch({
      type: userManagementActions.FORM_INFO_FULL_NAME_UPDATE,
      payload: { value: value }
    })
    if(!!value.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_FULL_NAME,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleBlurFullName = () => {
    pageDispatch({ type: userManagementActions.FORM_INFO_FULL_NAME_UPDATE, payload: { value: fullName.trim() }})
    if(!!!fullName) {
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_FULL_NAME,
        payload: { status: true, message: 'Họ tên không được để trống!' }
      })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_FULL_NAME,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleChangePhone = value => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setChangeModalInfo(true)
      pageDispatch({
        type: userManagementActions.FORM_INFO_PHONE_UPDATE,
        payload: { value: value.trim() }
      })
      if(!!value.trim()) {
        pageDispatch({
          type: userManagementActions.VALID_USER_INFO_PHONE,
          payload: { status: false, message: '' }
        })
      }
    }
  }

  const handleBlurPhone = () => {
    if(!!!phone) {
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_PHONE,
        payload: { status: true, message: 'Số điện thoại không được để trống!' }
      })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_PHONE,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleChangeEmail = value => {
    setChangeModalInfo(true)
    pageDispatch({
      type: userManagementActions.FORM_INFO_EMAIL_UPDATE,
      payload: { value: value.trim() }
    })
  }

  const handleBlurEmail = () => {
    if(!!!email.toLowerCase().match(regexEmail) && !!email) {
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_EMAIL,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.EMAIL) }
      })
    } else {
      pageDispatch({
        type: userManagementActions.VALID_USER_INFO_EMAIL,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleBlurAddress = value => {
    if(!!value) {
      pageDispatch({
        type: userManagementActions.FORM_INFO_ADDRESS_UPDATE,
        payload: { value: value.trim() }
      })
    }
  }

  const handleBlurNote = () => {
    pageDispatch({
      type: userManagementActions.FORM_INFO_NOTE_UPDATE,
      payload: { value: note.trim() }
    })
  }

  const handleChangeDOB = date => {
    setChangeModalInfo(true)
    let dateSelected = new Date(date)
    let dateString = dateSelected.getFullYear() + "-" + ("0"+(dateSelected.getMonth()+1)).slice(-2) + "-" + ("0" + dateSelected.getDate()).slice(-2)
    pageDispatch({
      type: userManagementActions.FORM_INFO_DOB_UPDATE,
      payload: { value: dateString, display: dateSelected}
    })
  }

  const handleChangeDOBNew = date => {
    const dateFormat = date?.formatValue?.split(' ')[0]
    let dateSelected = new Date(`${dateFormat.split('/')[2]}/${dateFormat.split('/')[1]}/${dateFormat.split('/')[0]}`)
    let dateString = dateSelected.getFullYear() + "-" + ("0"+(dateSelected.getMonth()+1)).slice(-2) + "-" + ("0" + dateSelected.getDate()).slice(-2)
    pageDispatch({
      type: userManagementActions.FORM_INFO_DOB_UPDATE,
      payload: { value: dateString, display: dateSelected}
    })
  }

  const handleChangeNote = value => {
    setChangeModalInfo(true)
    pageDispatch({
      type: userManagementActions.FORM_INFO_NOTE_UPDATE,
      payload: { value: value }
    })
  }

  const handleChangeAddress = value => {
    setChangeModalInfo(true)
    pageDispatch({
      type: userManagementActions.FORM_INFO_ADDRESS_UPDATE,
      payload: { value: value }
    })
  }

  const handleChangeGender = value => {
    setChangeModalInfo(true)
    pageDispatch({
      type: userManagementActions.FORM_INFO_GENDER_UPDATE,
      payload: { value: value }
    })
  }

  const handleChangeStatus = () => {
    setChangeModalInfo(true)
    pageDispatch({
      type: userManagementActions.FORM_INFO_STATUS_UPDATE,
      payload: { value: activeEmployee ? '2' : '1' }
    })
  }

  const fetchDataAfterUpdate = () => {
    // FETCH LIST DATA
    const collectOriginData = data => {
      const fields = [
        'groupEmployee',
      ]
      let collections = {}
      fields.forEach((item, i) => {
        const obj = {}
        obj[item] = data[i]?.data?.success ? data[i]?.data?.data : []

        collections = { ...collections, ...obj }
      })
      pageDispatch({
        type: userManagementActions.FILTER,
        payload: transformOriginData(collections, pageState),
      })
    }

    const keyword = pageState?.search || ''
    const group_id = groupEmployee?.activeValue?.id || ''
    const status_id = pageState?.filter?.groupStatus?.activeValue?.id || ''
    const active = pageState?.paginate?.active || 0
    const amount = pageState?.paginate?.amount || 20
    const total = pageState?.paginate?.total || 0
    const totalItems = pageState?.paginate?.totalItems || 0
    const fetch = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/employee/groups`),
        sendRequestAuth('get', `${config.API}/admin/employees?keyword=${keyword}&group=${group_id}&status=${status_id}&start=${active}&per_page=${amount}`),
      ])
      collectOriginData(response)
      if (response[1]?.data.success) {
        pageDispatch({ type: userManagementActions.LIST_USER, payload: response[1]?.data.data })
        pageDispatch({ type: userManagementActions.LOADING, payload: true })
        pageDispatch({
          type: userManagementActions.GET_PAGINATE, payload: {
            active: active,
            amount: amount,
            total: total,
            totalItems: totalItems,
          }
        })
      }
    }
    fetch()

    // FETCH DETAIL
    if(!!pageState?.detailActive) {
      const fetchRowDetail = async (id) => {
        const response = await getData(getUrlDetailUserManagement(id))
        if (!!response?.data?.success) {
          const newItem = response?.data?.data
          pageDispatch({
            type: userManagementActions.DETAIL_ACTIVE,
            payload: newItem,
          })
          pageDispatch({
            type: userManagementActions.DETAIL_LIST,
            payload: [...pageState.detailList, newItem],
          })
          pageDispatch({
            type: userManagementActions.LOADING_DETAIL,
            payload: true,
          })
        }
      }
      fetchRowDetail(pageState?.detailActive?.user_id)
    }
  }


  const canSubmitInfo = [
    pageState?.validateModalInfo?.fullName?.status,
    pageState?.validateModalInfo?.phone.status,
    pageState?.validateModalInfo?.email?.status,
    !debounceSubmitInfo
  ].includes(true)

  const handleSubmitInfo =  () => {
    if(debounceSubmitInfo) {
      setDebounceSubmitInfo(false)

      const url = `${config.API}/admin/employee/update/${pageState?.id_user}`
      const dataPost = new FormData()
      dataPost.append('name', pageState?.formModalInfo?.fullName?.value || '')
      dataPost.append('phone', pageState?.formModalInfo?.phone?.value || '')
      dataPost.append('email', pageState?.formModalInfo?.email?.value || '')
      dataPost.append('address', pageState?.formModalInfo?.address?.value || '')
      dataPost.append('birthday', pageState?.formModalInfo?.dob?.value || '')
      dataPost.append('gender', pageState?.formModalInfo?.gender?.value || '')
      dataPost.append('note', pageState?.formModalInfo?.note?.value || '')
      dataPost.append('status', pageState?.formModalInfo?.active?.value || '')

      postData(url, dataPost)
        .then(response => {
          if (response?.data && response?.data?.success) {
            toast.success({ title: t(DISPLAY_NAME_MENU.USER_PAGE.UPDATE_SUCCESS) })
            //CLOSE MODAL ROLE
            setCloseModalInfo(true)
            setTimeout(() => {
              pageDispatch({ type: userManagementActions.MODAL_USER_INFOR, payload: false})
              setCloseModalInfo(false)
            }, 300)

            fetchDataAfterUpdate()
          } else if(response?.data?.code === 101) {
            const details = response?.data?.details
            details.map(item => {
              if(item.code === 6009) {
                pageDispatch({
                  type: userManagementActions.VALID_USER_INFO_PHONE,
                  payload: { status: true, message: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_RES1) }
                })
              }
              if(item.code === 6011) {
                pageDispatch({
                  type: userManagementActions.VALID_USER_INFO_EMAIL,
                  payload: { status: true, message: t(DISPLAY_NAME_MENU.USER_PAGE.CREATE_RES3) }
                })
              }
            })
          }
          else {
            toast.error({ title: t(DISPLAY_NAME_MENU.USER_PAGE.UPDATE_FAILED) })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR UPDATE ROLE USER: ${e.message}`)
        })
    }
    setTimeout(() => setDebounceSubmitInfo(true), 1000)
  }
  const closeModalInfoConfirm = () => {
    pageDispatch({
      type: userManagementActions.MODAL_CONFIRM_USER_INFO,
      payload: false
    })
  }

  const acceptanceModalInfoConfirm = () => {
    //CLOSE MODAL CONFIRM
    pageDispatch({
      type: userManagementActions.MODAL_CONFIRM_USER_INFO,
      payload: false
    })
    //CLOSE MODAL ROLE
    setCloseModalInfo(true)
    setTimeout(() => {
      setCloseModalInfo(false)
      pageDispatch({ type: userManagementActions.MODAL_USER_INFOR, payload: false})
    }, 300)
    pageDispatch({
      type: userManagementActions.VALID_USER_INFO_FULL_NAME,
      payload: { status: false, message: '' }
    })
    pageDispatch({
      type: userManagementActions.VALID_USER_INFO_PHONE,
      payload: { status: false, message: '' }
    })
    pageDispatch({
      type: userManagementActions.VALID_USER_INFO_EMAIL,
      payload: { status: false, message: '' }
    })
  }

  const handleChangeCurrentPassword = value => {
    setChangeModalPass(true)
    const passwordFormat = replaceAllCustom(value.replace(replaceVN, ''),' ', '')
    pageDispatch({
      type: userManagementActions.FORM_PASS_CURRENT_UPDATE,
      payload: { value: passwordFormat.trim() }
    })
    if(!!passwordFormat.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CURRENT,
        payload: { status: false, message: '' }
      })
    }
  }

  const handleBlurCurrentPassword = value => {
    if(!!!currentPassword) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CURRENT,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.CURRENT_PASS) }
      })
      return
    }
    if(value.trim().length < 6) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CURRENT,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CURRENT_PASS_MIN_6) }
      })
    }
    if(value.trim().length > 30) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CURRENT,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CURRENT_PASS_MAX_50) }
      })
    }
    if(checkPasswordVN(value)) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CURRENT,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CHARACTER_PASSWORD) }
      })
    }
  }

  const handleChangeTypeCurrentPassword = () => setTypeCurrentPassword(typeCurrentPassword === 'password' ? 'text' : 'password')
  const handleChangeTypeNewPassword = () => setTypeNewPassword(typeNewPassword === 'password' ? 'text' : 'password')
  const handleChangeTypeConfirmPassword = () => setTypeConfirmPassword(typeConfirmPassword === 'password' ? 'text' : 'password')

  const handleChangeNewPassword = value => {
    setChangeModalPass(true)
    const newPasswordFormat = replaceAllCustom(value.replace(replaceVN, ''),' ', '')
    if(!!newPasswordFormat.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_NEW,
        payload: { status: false, message: '' }
      })
    }
    pageDispatch({
      type: userManagementActions.FORM_PASS_NEW_PASS_UPDATE,
      payload: { value: newPasswordFormat.trim() }
    })
  }
  const handleBlurNewPassword = value => {
    if(!!!newPassword) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_NEW,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.NEW_PASS) }
      })
      return
    }
    if(value.trim().length < 6) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_NEW,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.NEW_PASS_MIN_6) }
      })
    }
    if(value.trim() === confirmPassword) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: {status: false, message: ''}
      })
    }
    if(value.trim().length > 30) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_NEW,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.NEW_PASS_MAX_50) }
      })
    }
    if(checkPasswordVN(value)) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_NEW,
        payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.CHARACTER_PASSWORD) }
      })
    }
    if(value.trim() !== confirmPassword) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.NOT_MATCH_PASSWORD)}
      })
    }
  }
  const handleChangeConfirmPassword = value => {
    const confirmPasswordFormat = replaceAllCustom(value.replace(replaceVN, ''),' ', '')
    setChangeModalPass(true)
    pageDispatch({
      type: userManagementActions.FORM_PASS_CONFIRM_PASS_UPDATE,
      payload: { value: confirmPasswordFormat.trim() }
    })
    if(!!confirmPasswordFormat.trim()) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: { status: false, message: '' }
      })
    }
  }
  const handleBlurConfirmPassword = value => {
    if(!!!confirmPassword) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: {status: true, message:  'Mật khẩu xác nhận không được để trống!'}
      })
      return
    }
    if(value.trim().length < 6) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: {status: true, message: 'Mật khẩu xác nhận cần có ít nhất 6 ký tự!'}
      })
      return
    }
    if(value.trim().length > 30) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: { status: true, message: 'Mật khẩu xác nhận chỉ được phép nhập tối đa 30 ký tự!' }
      })
    }
    if(value.trim() !== newPassword) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: {status: true, message: 'Mật khẩu xác nhận không khớp với Mật khẩu mới!'}
      })
    }
    if(checkPasswordVN(value)) {
      pageDispatch({
        type: userManagementActions.VALID_USER_PASS_CONFIRM,
        payload: { status: true, message: 'Mật khẩu xác nhận đang chứa ký tự có dấu, vui lòng kiểm tra lại!' }
      })
    }
  }

  const closeModalPassConfirm = () => {
    pageDispatch({
      type: userManagementActions.MODAL_CONFIRM_USER_PASS,
      payload: false
    })
  }

  const [closeModalPass, setCloseModalPass] = useState(false)
  const acceptanceModalPassConfirm = () => {
    //CLOSE MODAL CONFIRM
    pageDispatch({
      type: userManagementActions.MODAL_CONFIRM_USER_PASS,
      payload: false
    })
    //CLOSE MODAL ROLE
    setCloseModalPass(true)
    setTimeout(() => {
      setCloseModalPass(false)
      pageDispatch({ type: userManagementActions.MODAL_USER_PASS, payload: false})
    }, 300)
    pageDispatch({
      type: userManagementActions.VALID_USER_PASS_CURRENT,
      payload: { status: false, message: '' }
    })
    pageDispatch({
      type: userManagementActions.VALID_USER_PASS_NEW,
      payload: { status: false, message: '' }
    })
    pageDispatch({
      type: userManagementActions.VALID_USER_PASS_CONFIRM,
      payload: { status: false, message: '' }
    })
    pageDispatch({ type: userManagementActions.FORM_PASS_CURRENT_UPDATE, payload: { value: '' } })
    pageDispatch({ type: userManagementActions.FORM_PASS_NEW_PASS_UPDATE, payload: { value: '' } })
    pageDispatch({ type: userManagementActions.FORM_PASS_CONFIRM_PASS_UPDATE, payload: { value: '' } })
  }
  const onCloseModalUserPass = () => {
    if(!changeModalPass) {
      setCloseModalPass(true)
      setTimeout(() => {
        pageDispatch({ type: userManagementActions.MODAL_USER_PASS, payload: false})
        pageDispatch({
          type: userManagementActions.VALID_USER_PASS_CURRENT,
          payload: { status: false, message: '' }
        })
        pageDispatch({
          type: userManagementActions.VALID_USER_PASS_NEW,
          payload: { status: false, message: '' }
        })
        pageDispatch({
          type: userManagementActions.VALID_USER_PASS_CONFIRM,
          payload: { status: false, message: '' }
        })
        setCloseModalPass(false)
      }, 300)
    } else {
      pageDispatch({ type: userManagementActions.MODAL_CONFIRM_USER_PASS, payload: true})
    }
  }
  const handleSubmitPass =  () => {
    if(debounceSubmitPass) {
      setDebounceSubmitPass(false)
      const url = `${config.API}/admin/employee/change-password/${pageState?.id_user}`
      const data = {
        'password': pageState?.formModalPass?.password?.value || '',
        'new_password': pageState?.formModalPass?.newPassword?.value || '',
        'confirm_password': pageState?.formModalPass?.confirmNewPassword?.value || ''
      }
      const dataPost = JSON.stringify(data)

      postData(url, dataPost)
        .then(response => {
          if (response.data && response.data.success) {
            toast.success({ title: 'Thay đổi mật khẩu tài khoản thành công.' })
            setCloseModalPass(true)
            setTimeout(() => {
              pageDispatch({ type: userManagementActions.MODAL_USER_PASS, payload: false})
              pageDispatch({ type: userManagementActions.FORM_PASS_CURRENT_UPDATE, payload: { value: '' } })
              pageDispatch({ type: userManagementActions.FORM_PASS_NEW_PASS_UPDATE, payload: { value: '' } })
              pageDispatch({ type: userManagementActions.FORM_PASS_CONFIRM_PASS_UPDATE, payload: { value: '' } })
              setCloseModalPass(false)
            }, 300)
          } else if(!response.data.success && response.data.code === 6034) {
            pageDispatch({
              type: userManagementActions.VALID_USER_PASS_CURRENT,
              payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.INVALID.ERROR_PASS) }
            })
          } else if (!response.data.success && response.data.code === 6059) {
            pageDispatch({
              type: userManagementActions.VALID_USER_PASS_CONFIRM,
              payload: {status: true, message: 'Mật khẩu xác nhận không khớp với Mật khẩu mới!'}
            })
          } else {
            toast.error({ title: 'Thay đổi mật khẩu tài khoản thất bại!' })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR UPDATE PASSWORD USER: ${e.message}`)
        })
    }
    setTimeout(() => {setDebounceSubmitPass(true)}, 1000)
  }

  const canSubmitPass = [
    pageState?.validateModalPass?.currentPassword?.status,
    pageState?.validateModalPass?.newPassword.status,
    pageState?.validateModalPass?.confirmNewPassword?.status,
    !changeModalPass,
    !debounceSubmitPass,
    !!!currentPassword,
    !!!newPassword,
    !!!confirmPassword,
  ].includes(true)

  const canSubmitRule = [
    pageState?.modalValidRules?.status,
    !debounceSubmitRule,
  ].includes(true)

  return {
    groupEmployee: {
      list: groupEmployee
    },
    valueForm: {
      //RULES
      rules: checkedRules,
      //USER INFO
      fullName,
      phone,
      email,
      address,
      dob,
      gender,
      note,
      activeEmployee,
      currentPassword,
      newPassword,
      confirmPassword,
      currentUserName
    },
    functions: {
      onChangeRule: handleChangeRule,
      onSubmitRule: handleSubmitRule,
      onCloseModalUserRole,
      closeModalRole,
      closeModalRoleConfirm,
      acceptanceModalRoleConfirm,
      onCloseModalUserInfo,
      closeModalInfo,
      closeModalInfoConfirm,
      acceptanceModalInfoConfirm,
      onCloseModalUserPass,
      closeModalPass,
      closeModalPassConfirm,
      acceptanceModalPassConfirm,

      onChangeFullName: handleChangeFullName,
      onChangePhone: handleChangePhone,
      onChangeEmail: handleChangeEmail,
      onChangeAddress: handleChangeAddress,
      onChangeDOB: handleChangeDOB,
      onChangeDOBNew: handleChangeDOBNew,
      onChangeNote: handleChangeNote,
      onChangeGender: handleChangeGender,
      onChangeStatus: handleChangeStatus,
      onSubmitInfo: handleSubmitInfo,

      onChangeCurrentPassword: handleChangeCurrentPassword,
      onChangeTypeCurrentPassword: handleChangeTypeCurrentPassword,
      onChangeNewPassword: handleChangeNewPassword,
      onChangeTypeNewPassword: handleChangeTypeNewPassword,
      onChangeConfirmPassword: handleChangeConfirmPassword,
      onChangeTypeConfirmPassword: handleChangeTypeConfirmPassword,
      onSubmitPass: handleSubmitPass,
    },
    validate: {
      errorCheckRules: pageState?.modalValidRules,
      canSubmitRule,

      errorFullName: pageState?.validateModalInfo?.fullName,
      onBlurFullName: handleBlurFullName,
      errorPhone: pageState?.validateModalInfo?.phone,
      onBlurPhone: handleBlurPhone,
      errorEmail: pageState?.validateModalInfo?.email,
      onBlurEmail: handleBlurEmail,
      onBlurAddress: handleBlurAddress,
      onBlurNote: handleBlurNote,
      canSubmitInfo,

      errorCurrentPassword: pageState?.validateModalPass?.currentPassword,
      errorNewPassword: pageState?.validateModalPass?.newPassword,
      errorConfirmPassword: pageState?.validateModalPass?.confirmNewPassword,
      onBlurCurrentPassword: handleBlurCurrentPassword,
      onBlurNewPassword: handleBlurNewPassword,
      onBlurConfirmPassword: handleBlurConfirmPassword,
      canSubmitPass,
    },
    typeInput: {
      currentPassword: typeCurrentPassword,
      newPassword: typeNewPassword,
      confirmPassword: typeConfirmPassword,
      disableActive: GlobalState?.user?.user_id === pageState.id_user
    },
  }
}