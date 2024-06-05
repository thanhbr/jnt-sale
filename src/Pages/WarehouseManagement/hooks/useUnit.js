import { getData, postData } from 'api/api'
import { createWarehouseManager, updateWarehouseManager } from 'api/url'
import { useReducer } from 'react'
import { useContext, useEffect, useState } from 'react'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { ActionType } from '../store/action'
import { initial, provinceData } from '../store/initial'
import useAlert from 'hook/useAlert'
import CONFIG from 'config'
import { transformAddressData } from '../utils/transform'
import useInfo from './useInfo'

export const useWarehouse = () => {
  const { state, dispatch } = useContext(WarehouseManager)
  const { methods } = useInfo()
  const {
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
    getQualifiedArray,
  } = methods
  const { showAlert } = useAlert()
  const [page, setPage] = useState()
  const fetchList = async () => {
    try {
      const res = await getData(
        `${CONFIG.API}/warehouse/warehouses?keyword=&is_purchase`,
      )
      setPage(res.data.meta)
      dispatch({ type: ActionType.META, payload: res.data.meta })
      dispatch({ type: ActionType.SET_LIST, payload: res.data.data })
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
  const getDetailWarehouseManager = async id => {
    try {
      const res = await getData(`${CONFIG.API}/warehouse/detail/${id}`)
      if (res.data.success) {
        const findProvince = provinceData.find(
          item => item?.value === `${res?.data?.data?.city_id}`,
        )
        if (findProvince) handleProvinceChange(findProvince)

        const findDistrict = getQualifiedArray(findProvince?.list)
          .map(transformAddressData)
          .find(item => item?.value === `${res?.data?.data?.district_id}`)
        if (findDistrict) handleDistrictChange(findDistrict)

        const findWard = getQualifiedArray(findDistrict?.list)
          .map(transformAddressData)
          .find(item => item?.value === `${res?.data?.data?.ward_id}`)
        if (findWard) handleWardChange(findWard)

        dispatch({
          type: ActionType.UPDATE_FORM,
          payload: { ...res.data.data, findWard, findProvince, findDistrict },
        })

        dispatch({ type: ActionType.OPEN_MODAL, payload: true })
        dispatch({ type: ActionType.DISABLE_SAVE, payload: true })
      }
    } catch (er) {
      console.log(er)
    }
  }

  const createUnitsManage = async data => {
    try {
      const res = await postData(createWarehouseManager(), data)
      if (res.data.success) {
        showAlert({ content: res.data?.message, type: 'success' })
        dispatch({ type: ActionType.OPEN_MODAL, payload: false })
        dispatch({ type: ActionType.CHECK_EMPTY, payload: false })
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
        dispatch({ type: ActionType.RESET_FORM })
        fetchList()
      } else {
        if (!Array.isArray(res.data?.errors?.details)) {
          if (res.data?.errors?.details?.field === 'warehouse_name')
            dispatch({type: 'SET_ERROR', payload: [{field: res.data?.errors?.details?.field, message: res.data?.errors?.details?.message}]})
          else {
            showAlert({ content: res.data?.errors?.details?.message, type: 'danger' })
          }
        } else if (Array.isArray(res.data?.errors?.details)) {
          let errors = []
          res.data?.errors?.details.forEach(item => {
            if (item.field === 'warehouse_name') errors.push({field: item.field, message: item.message})
            else showAlert({ content: item.message, type: item.field === 'is_main' ? 'warning' : 'danger' })
          })

          if (errors.length > 0) dispatch({type: 'SET_ERROR', payload: errors})
        } else 
          showAlert({ content: res.data?.errors?.message, type: 'danger' })
      }
    } catch (er) {
      console.log(er)
    }
  }
  const updateUnitsManage = async data => {
    try {
      const res = await postData(
        updateWarehouseManager(state.edit_item_id),
        data,
      )
      if (res.data.success) {
        showAlert({ content: res.data?.message, type: 'success' })
        dispatch({ type: ActionType.OPEN_MODAL, payload: false })
        dispatch({ type: ActionType.CHECK_EMPTY, payload: false })
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
        dispatch({ type: ActionType.SET_EDIT_ITEM_ID, payload: '' })
        dispatch({ type: ActionType.RESET_FORM })
        fetchList()
      } else {
        if (!Array.isArray(res.data?.errors?.details)) {
          if (res.data?.errors?.details?.field === 'warehouse_name')
            dispatch({type: 'SET_ERROR', payload: [{field: res.data?.errors?.details?.field, message: res.data?.errors?.details?.message}]})
          else {
            showAlert({ content: res.data?.errors?.details?.message, type: 'danger' })
          }
        } else if (Array.isArray(res.data?.errors?.details)) {
          let errors = []
          res.data?.errors?.details.forEach(item => {
            if (item.field === 'warehouse_name') errors.push({field: item.field, message: item.message})
            else showAlert({ content: item.message, type: item.field === 'is_main' ? 'warning' : 'danger' })
          })

          if (errors.length > 0) dispatch({type: 'SET_ERROR', payload: errors})
        } else 
          showAlert({ content: res.data?.errors?.message, type: 'danger' })
      }
    } catch (er) {
      console.log(er)
    }
  }
  return {
    fetchList,
    onChangePage,
    handleAmountChange,
    page,
    getDetailWarehouseManager,
    createUnitsManage,
    updateUnitsManage,
  }
}
