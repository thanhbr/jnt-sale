import React, { useReducer } from 'react';

import { userManagementActions, userManagementInitialState, userManagementReducer } from "../provider/_reducer";
import { sendRequestAuth } from "../../../api/api";
import config from "../../../config";
import { transformOriginData } from "../utils/transform";
import {useSearchParams} from "react-router-dom";

const useUserManagement = () => {
  const [state, dispatch] = useReducer(userManagementReducer, userManagementInitialState)

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
    dispatch({
      type: userManagementActions.FILTER,
      payload: transformOriginData(collections, state),
    })
  }
  const [searchParams] = useSearchParams()
  const handleUserManagement = async () => {
    const keyword = searchParams.get('search') || ''
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employee/groups?keyword=`),
      sendRequestAuth('get', `${config.API}/admin/employees?keyword=${keyword}&group&status&per_page=20&start=0`),
    ])
    collectOriginData(response)
    if (response[1]?.data.success) {
      let  meta  = response[1]?.data.meta
      const perPage = meta?.per_page || 0
      const start = meta?.start || 0
      const total = meta?.total || 0
      dispatch({ type: userManagementActions.LIST_USER, payload: response[1]?.data.data })
      dispatch({ type: userManagementActions.LOADING, payload: true })
      dispatch({
        type: userManagementActions.GET_PAGINATE, payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        }
      })
    }
  }
  const queryStartFrom =
    state.paginate.active * state.paginate.amount

  const queries = {
    keyword: state?.search || '',
    group: state?.filter?.groupEmployee?.activeValue?.id || '',
    status: state?.filter?.groupStatus?.activeValue?.id || '',
    per_page: state.paginate.amount,
    start: queryStartFrom,
  }
  const handlePaginationAmountChange = async n => {
    
    const currentPage = state.paginate.active || 0
    const totalPages = Math.ceil(state.paginate.totalItems / n)
    const page =
      state.paginate.totalItems < currentPage * n
        ? totalPages - 1
        : currentPage
    let queryStr = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...queries,
      per_page: n,
      start: page * n,
    })) {
      queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    dispatch({type:userManagementActions.LOADING,payload:false})
    const response = await sendRequestAuth(
      'get',
      `${config.API}/admin/employees${queryStr}`,
    )

    if (response?.data?.success) {
      let  meta  = response?.data.meta
      const perPage = meta?.per_page || 0
      const start = meta?.start || 0
      const total = meta?.total || 0
      dispatch({ type: userManagementActions.LIST_USER, payload: response?.data.data })
      dispatch({
        type: userManagementActions.GET_PAGINATE, payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        }
      })
      dispatch({type:userManagementActions.LOADING,payload:true})
      // dispatch({type:userManagementActions.IS_CHECK,payload:[]})
      // dispatch({type:userManagementActions.IS_CHECK_ALL,payload:false})
      // dispatch({type:userManagementActions.COUNT,payload:0})
    }
  }

  const handlePaginationPageChange = async page => {
    const amount = state.paginate?.amount || 10
    dispatch({type:userManagementActions.LOADING,payload:false})
    let queryStr = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...queries,
      per_page: amount,
      start: page * amount,
    })) {
      queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    // dispatch({type: 'SET_LOADING', payload: false})
    const response = await sendRequestAuth(
      'get',
      `${config.API}/admin/employees${queryStr}`,
    )

    if (response.data.success) {
      
      let  meta  = response.data.meta
      const perPage = meta?.per_page || 0
      const start = meta?.start || 0
      const total = meta?.total || 0
      dispatch({ type: userManagementActions.LIST_USER, payload: response.data.data })
      dispatch({
        type: userManagementActions.GET_PAGINATE, payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        }
        
      })
      dispatch({type:userManagementActions.LOADING,payload:true})
      // dispatch({type:userManagementActions.IS_CHECK,payload:[]})
      // dispatch({type:userManagementActions.IS_CHECK_ALL,payload:false})
      // dispatch({type:userManagementActions.COUNT,payload:0})
    }
  }
  return {
    provider: { state, dispatch },
    fetch: {
      userManagement: handleUserManagement
    },
    handlePaginationAmountChange,
    handlePaginationPageChange
  }
};

export default useUserManagement;