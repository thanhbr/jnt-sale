import { getData, postData } from 'api/api'
import { createUnit, getDetailUnit, getListUnit, updateUnit } from 'api/url'
import toast from 'Component/Toast'
import { useReducer } from 'react'
import { useContext, useEffect, useState } from 'react'
import { Unit } from 'Pages/UnitsManage';
import { ALERT_UNIT, NOTE } from '../SCRIPT_UNIT'
import { ActionType } from '../store/action'
import { initial } from '../store/initial'
import reducer from '../store/reducer'
import { checkEmptyNote } from './useCheckTextNote'
import useAlert from 'hook/useAlert'

export const useUnit = () => {
  const { state, dispatch } = useContext(Unit)
  const {showAlert} = useAlert()
  const [page, setPage] = useState()
  const [errors, setErrors] = useState([])
  const fetchList = async () => {
    try {
      const res = await getData(
        getListUnit(state.searchValue, state.pagination.amount,state.pagination.active),
      )
      setPage(res.data.meta)
      dispatch({ type: ActionType.META, payload: res.data.meta })
      dispatch({ type: ActionType.LIST_UNIT, payload: res.data.data })
      dispatch({ type: ActionType.IS_LOADING, payload: true })
      const perPage = res?.data?.meta?.per_page || 0
      const start = res?.data?.meta?.start || 0
      const total = res?.data?.meta?.total || 0
      dispatch({
        type: ActionType.GET_PAGINATION,
        payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        },
      })
    } catch (er) {
      console.log(er)
    }
  }
  const onChangePage = page => {
    const amount = state.meta.per_page
    dispatch({ type: ActionType.META_START, payload: page * amount })
    dispatch({ type: ActionType.IS_LOADING, payload: true })
    dispatch({ type: ActionType.IS_CHECK_ALL, payload: !state.isCheckAll })
    dispatch({ type: ActionType.COUNT, payload: 0 })
  }
  const handleAmountChange = amount => {
    dispatch({ type: ActionType.META_PER_PAGE, payload: amount })
    dispatch({ type: ActionType.META_START, payload: 0 })
    dispatch({ type: ActionType.IS_LOADING, payload: true })
    dispatch({ type: ActionType.IS_CHECK_ALL, payload: !state.isCheckAll })
    dispatch({ type: ActionType.COUNT, payload: 0 })

  }
  const getDetailUnit = async id => {
    try {
      const res = await getData(getDetailUnit(id))
      if (res.data.success) {
        dispatch({ type: ActionType.INFO_UNIT, payload: res.data.data })
      }
    } catch (er) {
      console.log(er)
    }
  }

  const changeCheckboxnote = () => {
    let defaultStatus = state.is_default
    if (defaultStatus == 0) dispatch({ type: ActionType.IS_DEFAULT, payload: 1 })
    if (defaultStatus == 1) dispatch({ type: ActionType.IS_DEFAULT, payload: 0 })
  }
  const changeStatusNote = () => {
    let defaultStatus = state.is_switch_active
    if (defaultStatus) {
      dispatch({
        type: ActionType.IS_SWITCH_ACTIVE,
        payload: !state.is_switch_active,
      })
      dispatch({ type: ActionType.STATUS, payload: -1 })
    } else {
      dispatch({
        type: ActionType.IS_SWITCH_ACTIVE,
        payload: !state.is_switch_active,
      })
      dispatch({ type: ActionType.STATUS, payload: 1 })
    }
  }
  const createUnitsManage = async data => {
    try {
      const inputData = {unit_name: data.unit_name.value, unit_short_name: data.unit_short_name.value, status: false}
      const res = await postData(createUnit(), inputData)
      if (res.data.success) {
        showAlert({content: res.data?.message, type: 'success', duration: 2000})
        dispatch({ type: ActionType.OPEN_MODAL, payload: !state.openModal })
        dispatch({ type: ActionType.CHECK_EMPTY, payload: false })
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
        fetchList()
      } else {
        setErrors(res.data.errors.details)
      }
    } catch (er) {
      console.log(er)
    }
  }
  const updateUnitsManage = async data => {
    try {
      const inputData = {unit_name: data.unit_name.value, unit_short_name: data.unit_short_name.value, status: data.status.value}
      const res = await postData(updateUnit(state.edit_id), inputData)
      if (res.data.success) {
        showAlert({content: res.data?.message, type: 'success', duration: 2000})
        dispatch({ type: ActionType.OPEN_MODAL, payload: !state.openModal })
        dispatch({ type: ActionType.CHECK_EMPTY, payload: false })
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
        dispatch({type: ActionType.SET_EDIT_ID, payload: ''})
        fetchList()
      } else {
        setErrors(res.data.errors.details)
      }
    } catch (er) {
      console.log(er)
    }
  }
  return {
    fetchList,
    onChangePage,
    handleAmountChange,
    errors,
    page,
    getDetailUnit,
    createUnitsManage,
    updateUnitsManage,
  }
}
