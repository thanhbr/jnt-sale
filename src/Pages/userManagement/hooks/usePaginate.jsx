import { useReducer } from "react"
import { sendRequestAuth } from "../../../api/api"
import config from "../../../config"
import { userManagementActions, userManagementInitialState, userManagementReducer } from "../provider/_reducer"

export const usePaginate = () => {
  const [state, dispatch] = useReducer(userManagementReducer, userManagementInitialState)
  const queryStartFrom =
    state.paginate.active * state.paginate.amount

  const queries = {
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
      // const displayListData = Array.isArray(response?.data?.data)
      //   ? response.data.data
      //   : []

      // const displayArrDetailsData = response?.data?.arr_detail ?? {}

      // dispatch({
      //   type: orderActions.TABLE_AMOUNT_UPDATE,
      //   payload: {
      //     display: {
      //       list: displayListData,
      //       arr_details: displayArrDetailsData
      //     },
      //     paginate: {active: page, amount: n, total: totalPages},
      //   },
      // })

      // const phoneList = Array.isArray(response?.data?.data)
      //   ? response.data.data.map(item => item?.customer_mobile || '')
      //   : []

      // if (phoneList.length > 0)
      //   handleGetReportStatus(phoneList, displayListData, displayArrDetailsData)
    }
  }

  const handlePaginationPageChange = async page => {
    const amount = state.paginate?.amount || 10

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
      // const displayListData = Array.isArray(response?.data?.data)
      //   ? response.data.data
      //   : []

      // const displayArrDetailsData = response?.data?.arr_detail ?? {}

      // dispatch({
      //   type: orderActions.TABLE_PAGINATION_UPDATE,
      //   payload: {
      //     display: {
      //       list: displayListData,
      //       arr_details: displayArrDetailsData
      //     },
      //     paginate: {active: page},
      //   },
      // })

    }
  }
  return {
    handlePaginationAmountChange,
    handlePaginationPageChange
  }
}