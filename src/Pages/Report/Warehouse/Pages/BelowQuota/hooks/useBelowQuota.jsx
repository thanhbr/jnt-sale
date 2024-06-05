import React, {useReducer} from 'react';
import {reportQuotaState, reportQuotaActions} from "../provider/initState";
import {reportQuotaReducer} from "../provider/reducer";
import {sendRequestAuth} from "../../../../../../api/api";
import config from "../../../../../../config";

const useBelowQuota = () => {
  const [state, dispatch] = useReducer(reportQuotaReducer, reportQuotaState)

  const handleFetchOrigin = async _ => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/report/warehouses/quantity-low?keyword=&warehouse_id=&per_page=20&start=0`),
      sendRequestAuth('get', `${config.API}/warehouse/warehouses?keyword=&is_purchase`),
    ])
    if(response[0]?.data?.success) {
      dispatch({
        type: reportQuotaActions?.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          loading: false,
          list: response[0]?.data?.data,
          quantityLow: response[0]?.data?.meta?.quantity_low
        }
      })
      dispatch({
        type: reportQuotaActions?.TABLE_PAGINATION_UPDATE,
        payload: {
          active: response[0]?.data?.meta?.start,
          amount: response[0]?.data?.meta?.per_page,
          total: Math.ceil(response[0]?.data?.meta?.totals / response[0]?.data?.meta?.per_page),
          totalItems: response[0]?.data?.meta?.totals
        }
      })
      dispatch({
        type: reportQuotaActions?.SET_LIST_DEFAULT,
        payload: response[0]?.data?.data
      })
    }
    if(response[1]?.data?.success) {
      dispatch({
        type: reportQuotaActions?.FILTER_WAREHOUSE_UPDATE,
        payload: {
          list: response[1]?.data?.data || [],
          listOrigin: response[1]?.data?.data || [],
        }
      })
    }
  }


  // ===== ===== ===== QUERIES ===== ===== =====
  const queries = {
    keyword: state?.filter?.keyword || '',
    warehouse_id: state?.filter?.warehouse?.value?.id || '',
    per_page: state?.filter?.per_page || 20,
    start: state?.filter?.start || 0,
  }

  const fetchReportQuota = async (qs) => {
    dispatch({type: reportQuotaActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: [], loading: true}})

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth( 'get', `${config.API}/report/warehouses/quantity-low${queryString}`,)
    if (response?.data?.success) {
      const receipts = response?.data?.data
      dispatch({
        type: reportQuotaActions?.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          list: receipts, loading: false, quantityLow: response?.data?.meta?.quantity_low
        }
      })
      dispatch({
        type: reportQuotaActions?.TABLE_PAGINATION_UPDATE,
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
    fetchReportQuota(qs)
  }

  const handleAmountChange = amount => {
    const qs = {...queries, per_page: amount, start: 0}
    fetchReportQuota(qs)
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

export default useBelowQuota