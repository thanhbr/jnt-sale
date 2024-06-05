import React, { useEffect, useState, useContext } from 'react';

import { userManagementActions } from "../provider/_reducer";
import {getData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import { UserManagementContext } from "../provider/_context";
import toast from "../../../Component/Toast";
import { SCRIPT } from "../interfaces/~script";
import {getUrlDetailUserManagement} from "../../../api/url";
import {useNavigate} from "react-router-dom";

const useFilterUserManagement = () => {
  const { pageState, pageDispatch } = useContext(UserManagementContext)
  const stateGroupEmployee = {
    keyword: pageState?.filter?.groupEmployee?.keyword || '',
    value: pageState?.filter?.groupEmployee?.value || [],
    activeValue: pageState?.filter?.groupEmployee?.activeValue || [],
    list: pageState?.filter?.groupEmployee?.list || [],
    listOrigin: pageState?.filter?.groupEmployee?.listOrigin || [],
  }
  const stateGroupStatus = {
    value: pageState?.filter?.groupStatus?.value || [],
    activeValue: pageState?.filter?.groupStatus?.activeValue || [],
    list: pageState?.filter?.groupStatus?.list || [],
  }
  const search = pageState?.search

  const [isInit, setIsInit] = useState(true)
  const [valueSearch, setValueSearch] = useState(search)
  const navigate = useNavigate()
  useEffect(() => {
    if (isInit) return setIsInit(false)

    const timeOutId = setTimeout(() => {
      const fetchData = async () => {
        const response = await Promise.all([
          sendRequestAuth('get', `${config.API}/admin/employees?keyword=${search}&group&status&per_page=20&start=0`),
        ])
        if (response[0]?.data?.success) {

          let meta = response[0]?.data.meta
          const perPage = meta?.per_page || 0
          const start = meta?.start || 0
          const total = meta?.total || 0
          pageDispatch({ type: userManagementActions.LIST_USER, payload: response[0]?.data?.data })
          pageDispatch({
            type: userManagementActions.GET_PAGINATE, payload: {
              active: Math.floor(start / perPage),
              amount: perPage,
              total: Math.ceil(total / perPage),
              totalItems: total,
            }

          })
        }

      }
      fetchData()
    }, 500)
    return () => clearTimeout(timeOutId)
  }, [valueSearch]);

  const handleSearchChange = data => {
    setValueSearch(data)
    pageDispatch({
      type: userManagementActions.SET_SEARCH,
      payload: data.target.value.trim(),
    })
  }

  // =============== GROUP STATUS ==================
  const handleSelectedGroupStatus = data => {
    pageDispatch({
      type: userManagementActions.FILTER,
      payload: {
        groupStatus: { ...stateGroupStatus, value: data },
        groupEmployee: { ...stateGroupEmployee }
      }
    })
  }
  const handleBlurGroupStatus = () => {
    if (stateGroupStatus?.value?.length === 0) {
      pageDispatch({
        type: userManagementActions.FILTER,
        payload: {
          groupStatus: { ...stateGroupStatus, value: '' },
          groupEmployee: { ...stateGroupEmployee }
        }
      })
    }
  }

  // =============== GROUP EMPLOYEE ==================
  const handleSelectedGroupEmployee = data => {
    pageDispatch({
      type: userManagementActions.FILTER_EMPLOYEE_UPDATE,
      payload: { value: data },
    })
  }

  const handleChangeGroupEmployee = data => {
    const listByKey = stateGroupEmployee.listOrigin.filter((item) => {
      const name = item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('đ', 'd').toLowerCase()
      const key = data.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('đ', 'd').toLowerCase().trim()
      return name.includes(key)
    })
    if (!!listByKey) {
      pageDispatch({
        type: userManagementActions.FILTER,
        payload: {
          groupStatus: { ...stateGroupStatus },
          groupEmployee: { ...stateGroupEmployee, list: listByKey },
        }
      })
    }
  }

  const handleFocusGroupEmployee = () => {
    pageDispatch({
      type: userManagementActions.FILTER,
      payload: {
        groupStatus: { ...stateGroupStatus },
        groupEmployee: { ...stateGroupEmployee, list: stateGroupEmployee.listOrigin },
      }
    })
  }


  // APPLY
  const queries = {
    keyword: search.trim() || '',
    group: stateGroupEmployee?.value || [],
    status: stateGroupStatus?.value || [],
    per_page: 20,
    start: 0,
  }
  const fetchUserByFilter = async (qs, opt) => {
    // if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
    //   pageDispatch({
    //     type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
    //     payload: {table: {display: {loading: true}}},
    //   })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employees${queryString}`),
    ])
    if (response[0]?.data?.success && !!response[0]?.data?.data) {
      pageDispatch({ type: userManagementActions.LIST_USER, payload: response[0]?.data?.data })
      pageDispatch({
        type: userManagementActions.FILTER,
        payload: {
          groupStatus: { ...stateGroupStatus, activeValue: stateGroupStatus.value },
          groupEmployee: { ...stateGroupEmployee, activeValue: stateGroupEmployee.value },
        }
      })
      let meta = response[0]?.data.meta
      const perPage = meta?.per_page || 0
      const start = meta?.start || 0
      const total = meta?.total || 0
      pageDispatch({
        type: userManagementActions.GET_PAGINATE, payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        }

      })
    } else {
      toast.error(SCRIPT.ERROR.SEARCH)
    }
  }
  const applyUserOtherFilter = async () => {
    const collection = {
      ...queries,
      keyword: search.trim() || '',
      group: stateGroupEmployee?.value?.id || [],
      status: stateGroupStatus?.value?.id || [],
    }

    fetchUserByFilter(collection, { forceLoading: true })
  }


  // Badge
  const otherFilterBadge = [
    stateGroupEmployee?.activeValue.length !== 0,
    stateGroupStatus?.activeValue.length !== 0
  ].filter(item => item === true).length

  const canSubmitOtherFilter = [
    JSON.stringify(stateGroupEmployee?.activeValue) !== JSON.stringify(stateGroupEmployee?.value),
    JSON.stringify(stateGroupStatus?.activeValue) !== JSON.stringify(stateGroupStatus?.value),
  ].includes(true)

  const filterTagDelete = async val => {
    let tmpCollection = {
      keyword: search || '',
      status: stateGroupStatus?.activeValue?.id || '',
      group: stateGroupEmployee?.activeValue?.id || '',
    }
    switch (val) {
      case 'status':
        pageDispatch({
          type: userManagementActions.FILTER,
          payload: {
            groupStatus: { ...stateGroupStatus, activeValue: [], value: [] },
            groupEmployee: { ...stateGroupEmployee },
          }
        })
        tmpCollection = {
          ...tmpCollection,
          status: ''
        }
        break
      case 'employee':
        pageDispatch({
          type: userManagementActions.FILTER,
          payload: {
            groupStatus: { ...stateGroupStatus },
            groupEmployee: { ...stateGroupEmployee, activeValue: [], value: [] },
          }
        })
        tmpCollection = {
          ...tmpCollection,
          group: ''
        }
        break
      default:
        throw new Error()
    }

    const collection = { ...queries, ...tmpCollection }
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(collection)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employees${queryString}`),
    ])
    if (response[0]?.data?.success && !!response[0]?.data?.data) {
      pageDispatch({
        type: userManagementActions.LIST_USER,
        payload: response[0]?.data?.data
      })
      let meta = response[0]?.data.meta
      const perPage = meta?.per_page || 0
      const start = meta?.start || 0
      const total = meta?.total || 0
      pageDispatch({
        type: userManagementActions.GET_PAGINATE, payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        }

      })
    } else {
      toast.error(SCRIPT.ERROR.SEARCH)
    }
  }

  const handleDeleteAll = async () => {
    let tmpCollection = {
      keyword: search || '',
      status: '',
      group: '',
    }
    const collection = { ...queries, ...tmpCollection }
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(collection)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employees${queryString}`),
    ])
    if (response[0]?.data?.success && !!response[0]?.data?.data) {
      pageDispatch({
        type: userManagementActions.FILTER,
        payload: {
          groupStatus: { ...stateGroupStatus, activeValue: [], value: [] },
          groupEmployee: { ...stateGroupEmployee, activeValue: [], value: [] },
        }
      })
      pageDispatch({
        type: userManagementActions.LIST_USER,
        payload: response[0]?.data?.data
      })
      let meta = response[0]?.data.meta
      const perPage = meta?.per_page || 0
      const start = meta?.start || 0
      const total = meta?.total || 0
      pageDispatch({
        type: userManagementActions.GET_PAGINATE, payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        }

      })
    } else {
      toast.error(SCRIPT.ERROR.SEARCH)
    }
  }

  const [debounceRefresh, setDebounceRefresh] = useState(true)
  const refresh = async () => {
    if (debounceRefresh) {
      pageDispatch({ type: userManagementActions.LOADING, payload: false })
      setDebounceRefresh(false)

      let tmpCollection = {
        keyword: search || '',
        status: stateGroupStatus?.activeValue?.id || '',
        group: stateGroupEmployee?.activeValue?.id || '',
        start: pageState?.paginate?.amount * pageState?.paginate?.active || '0',
        per_page: pageState?.paginate?.amount || '20',
      }
      const collection = { ...queries, ...tmpCollection }
      let queryString = '?'
      let i = 0
      for (const [key, value] of Object.entries(collection)) {
        queryString += `${i > 0 ? '&' : ''}${key}=${value}`
        i++
      }
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/employees${queryString}`),
      ])
      if (response[0]?.data?.success && !!response[0]?.data?.data) {
        pageDispatch({
          type: userManagementActions.FILTER,
          payload: {
            groupStatus: { ...stateGroupStatus },
            groupEmployee: { ...stateGroupEmployee },
          }
        })
        pageDispatch({
          type: userManagementActions.LIST_USER,
          payload: response[0]?.data?.data})

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

        setTimeout(() => {
          setDebounceRefresh(true)
        }, 2000)
      } else { toast.error(SCRIPT.ERROR.SEARCH) }
      pageDispatch({ type: userManagementActions.LOADING, payload: true })
    }
  }

  const [debounceCheckPermission, setDebounceCheckPermission] = useState(true)
  const checkPermission = async () => {
    if(debounceCheckPermission) {
      setDebounceCheckPermission(false)
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/employee/check`)
      ])
      setTimeout(() => {setDebounceCheckPermission(true)}, 3000)

      if(!response[0]?.data?.success) {
        toast.error(response[0]?.data?.message)
      } else {
        navigate('/users/create')
      }
    }
  }

  return {
    provider: { pageState, pageDispatch },
    search: {
      onChange: handleSearchChange
    },
    groupStatus: {
      value: stateGroupStatus.value,
      activeValue: stateGroupStatus.activeValue,
      list: stateGroupStatus.list,
      onSelected: handleSelectedGroupStatus,
      onBlur: handleBlurGroupStatus,
    },
    groupEmployee: {
      value: stateGroupEmployee.value,
      activeValue: stateGroupEmployee.activeValue,
      list: stateGroupEmployee.list,
      onSelected: handleSelectedGroupEmployee,
      onKeywordChange: handleChangeGroupEmployee,
      onFocus: handleFocusGroupEmployee,
    },
    badge: {
      others: otherFilterBadge,
    },
    functions: {
      applyUserOtherFilter,
      canSubmitOtherFilter,
      filterTagDelete,
      handleDeleteAll,
      refresh,
      checkPermission
    }
  }
};

export default useFilterUserManagement