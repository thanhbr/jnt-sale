import React, {useReducer} from 'react';
import {sendRequestAuth} from "../../../../../../api/api";
import config from "../../../../../../config";
import {reportInventoryActions, reportInventoryState} from "../provider/initState";
import {reportInventoryReducer} from "../provider/reducer";
import {convertDateTimeToApiFormat} from "../../../../../../common/form/datePicker/_functions";

const useReportInventory = () => {
  const [state, dispatch] = useReducer(reportInventoryReducer, reportInventoryState)
  // const startDate = state?.filter?.dateTime?.start && state?.filter?.dateTime.value
  //                     ? convertDateTimeToApiFormat(state?.filter?.dateTime?.value?.split(' - ')[0]) : ''
  // const endDate = state?.filter?.dateTime?.end && state?.filter?.dateTime.value
  //                 ? convertDateTimeToApiFormat(state?.filter?.dateTime?.value?.split(' - ')[1]) : ''
  const filter = state?.filter

  const handleFetchOrigin = async _ => {
    const response = await Promise.all([
      // sendRequestAuth('get', `${config.API}/report/warehouses/stock?keyword=&start_date=${startDate}&end_date=${endDate}&warehouse_id&category_id&per_page=20&start=0`),
      sendRequestAuth('get', `${config.API}/report/warehouses/stock?keyword=&start_date=&end_date=&warehouse_id&category_id&per_page=20&start=0`),
      sendRequestAuth('get', `${config.API}/warehouse/warehouses?keyword=&is_purchase`),
      sendRequestAuth('get', `${config.API}/product/category/list?keyword=&status=`),
    ])
    if(response[0]?.data?.success) {
      dispatch({
        type: reportInventoryActions.PANEL_UPDATE,
        payload: {
          totalQuantity: response[0]?.data?.meta?.total_quantity,
          totalAmount: response[0]?.data?.meta?.total_amount
        }
      })
      dispatch({
        type: reportInventoryActions?.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          loading: false,
          list: response[0]?.data?.data
        }
      })
      dispatch({
        type: reportInventoryActions?.TABLE_PAGINATION_UPDATE,
        payload: {
          active: response[0]?.data?.meta?.start,
          amount: response[0]?.data?.meta?.per_page,
          total: Math.ceil(response[0]?.data?.meta?.totals / response[0]?.data?.meta?.per_page),
          totalItems: response[0]?.data?.meta?.totals
        }
      })
      dispatch({
        type: reportInventoryActions.SET_LIST_DEFAULT,
        payload: response[0]?.data?.data
      })
    }
    if(response[1]?.data?.success) {
      dispatch({
        type: reportInventoryActions.FILTER_WAREHOUSE_UPDATE,
        payload: {
          list: response[1]?.data?.data || [],
          listOrigin: response[1]?.data?.data || [],
        }
      })
    }
    if(response[2]?.data?.success) {
      dispatch({
        type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE,
        payload: {
          list: response[2]?.data?.data,
          listOrigin: response[2]?.data?.data,
        }
      })
    }
  }


  // ===== ===== ===== QUERIES ===== ===== =====
  const queries = {
    keyword: filter?.keyword || '',
    start_date:
      filter?.dateTime?.start && filter?.dateTime.value
        ? convertDateTimeToApiFormat(filter?.dateTime?.value?.split(' - ')[0])
        : '',
    end_date:
      filter?.dateTime?.end && filter?.dateTime.value
        ? convertDateTimeToApiFormat(filter?.dateTime?.value?.split(' - ')[1])
        : '',
    warehouse_id: filter?.warehouse?.value?.id || '',
    category_id: filter?.groupProduct?.id || '',
    per_page: filter?.per_page || 20,
    start: filter?.start || 0,
  }

  const fetchReportInventory = async (qs) => {
    dispatch({type: reportInventoryActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: [], loading: true}})

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth( 'get', `${config.API}/report/warehouses/stock${queryString}`,)
    if (response?.data?.success) {
      const receipts = response?.data?.data
      dispatch({
        type: reportInventoryActions.PANEL_UPDATE,
        payload: {
          totalQuantity: response?.data?.meta?.total_quantity,
          totalAmount: response?.data?.meta?.total_amount
        }
      })
      dispatch({
        type: reportInventoryActions?.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          list: receipts, loading: false
        }
      })
      dispatch({
        type: reportInventoryActions?.TABLE_PAGINATION_UPDATE,
        payload: {
          active: response?.data?.meta?.start / response?.data?.meta?.per_page,
          amount: response?.data?.meta?.per_page,
          total: Math.ceil(response?.data?.meta?.totals / response?.data?.meta?.per_page),
          totalItems: response?.data?.meta?.totals
        }
      })
    }
  }
  // ===== ===== ===== END QUERIES ===== ===== =====

  const handlePageChange = page => {
    const qs = {...queries,
      per_page: state?.table?.pagination?.amount,
      start: state?.table?.pagination?.amount * page
    }
    fetchReportInventory(qs)
  }

  const handleAmountChange = amount => {
    const qs = {...queries, per_page: amount, start: 0}
    fetchReportInventory(qs)
  }

  return {
    provider: {
      state,
      dispatch
    },
    fetch: {
      origin: handleFetchOrigin
    },
    pagination: {
      onAmountChange: handleAmountChange,
      onPageChange: handlePageChange,
    }
  }
}

export default useReportInventory;