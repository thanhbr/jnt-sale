import { postData } from "api/api"
import { setActiveUserManagement } from "api/url"
import toast from "Component/Toast"
import useGlobalContext from "containerContext/storeContext"
import { useContext, useEffect, useState } from "react"
import { SCRIPT } from "../interfaces/~script"
import { UserManagementContext } from "../provider/_context"
import { userManagementActions } from "../provider/_reducer"
import {useTranslation} from "react-i18next";

export const useTableBody = () => {
  const {t} = useTranslation()
  const { pageState, pageDispatch } = useContext(UserManagementContext)
  const list = pageState.listUser
  const [count,] = useState(0)
  const [isActive, setIsActive] = useState(pageState.is_active)
  const [isCheckAll,] = useState(pageState.isCheckAll)
  const [disable, setDisabled] = useState(false)
  const [GlobalState,] = useGlobalContext()
  const userIdGlobal = GlobalState.user.user_id

  useEffect(() => {
    if (pageState.count === 0) pageDispatch({ type: userManagementActions.IS_CHECK_ALL, payload: false })
    setIsActive({ ...isActive, ...pageState.is_active })
  }, [pageState.count, pageState.is_active])
  const setActive = async data => {
    pageDispatch({ type: userManagementActions.DISABLE_BUTTON, payload: true })
    setTimeout(() => {
      pageDispatch({ type: userManagementActions.DISABLE_BUTTON, payload: false })
    }, 2000)
    try {
      const res = await postData(setActiveUserManagement(), data)
      if (res.data.code === 6070) {
        toast.success({ title: SCRIPT.NOTIFICATION.USER_ACTIVE })

      }
      if (res.data.code === 6071) {
        pageDispatch({ type: userManagementActions.DISABLE_BUTTON, payload: true })
        setTimeout(() => {
          pageDispatch({ type: userManagementActions.DISABLE_BUTTON, payload: false })
        }, 2000)
        let arr = []
        data.id.map(item => { arr = { ...arr, [item]: false } })
        pageDispatch({ type: userManagementActions.IS_ACTIVE, payload: arr })
        pageDispatch({ type: userManagementActions.IS_CHECK, payload: [] })
        pageDispatch({ type: userManagementActions.IS_CHECK_ALL, payload: false })
        pageDispatch({ type: userManagementActions.COUNT, payload: 0 })
        toast.success({ title: SCRIPT.NOTIFICATION.USER_DISACTIVE })
      }

    } catch (er) {
      console.log(er)
    }
  }
  const isActiveAll =
    list.length <= 0
      ? false
      : pageState.isCheck.length < list.length
      ? false
      : !!!list.find(
        item => !!!pageState.isCheck.find(find => find === item?.user_id),
      )
  const shouldActiveCheckbox = pageState.isCheck.length > 0
  const [debounceCheckAll, setDebounceCheckAll] = useState(true)
  const checkAll = () => {
    let newId = []
    if (isActiveAll) {
      newId = pageState.isCheck.filter(
        item => !!!list.find(find => find?.user_id === item),
      )
    } else {
      let addingList = []
      list.forEach(item => {
        if (!!!pageState.isCheck.find(find => find === item?.user_id)) {
          addingList = [...addingList, item?.user_id]
        }
      })
      newId = [...pageState.isCheck, ...addingList]

      if (newId.find(item => item === userIdGlobal) && debounceCheckAll) {
        setDebounceCheckAll(false)
        toast.warning('Hệ thống sẽ không chọn tài khoản đang đăng nhập vào hệ thống!')
        setTimeout(() => setDebounceCheckAll(true), 2000)
      }
    }
    pageDispatch({ type: userManagementActions.IS_CHECK, payload: newId })

  }
  const changeStatus = e => {
    e.stopPropagation()
    let { checked, id } = e.target
    if (!checked) {
      pageDispatch({ type: userManagementActions.OPEN_CONFIRM, payload: { open: true, id_confirm: 1 } })
      pageDispatch({ type: userManagementActions.IS_CHECK, payload: [id] })
    }
    else {
      setIsActive({ ...isActive, [id]: checked })
      setActive({ id: [id], status: 1 })
    }

  }
  const handleActive = async (data) => {
    let ArrTemp = []
    data?.id.map(item => {
      ArrTemp = { ...ArrTemp, [item]: data.status }
    })
    if (data.status === 2) pageDispatch({ type: userManagementActions.OPEN_CONFIRM, payload: { open: true, id_confirm: 1 } })
    else try {
      const res = await postData(setActiveUserManagement(), data)
      if (res.data.code === 6070) {
        toast.success({ title: SCRIPT.NOTIFICATION.USER_ACTIVE })
        pageDispatch({ type: userManagementActions.IS_CHECK, payload: [] })
        pageDispatch({ type: userManagementActions.IS_CHECK_ALL, payload: false })
        pageDispatch({ type: userManagementActions.IS_ACTIVE, payload: ArrTemp })
        pageDispatch({ type: userManagementActions.COUNT, payload: 0 })
      }

    } catch (er) {
      console.log(er);
    }

  }
  return {
    changeStatus,
    isActive,
    isCheckAll,
    checkAll,
    count,
    handleActive,
    disable,
    setActive,
    shouldActiveCheckbox,

  }
}