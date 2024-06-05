import React, {useReducer} from 'react';
import {typeReceiptReducer} from "../provider/_reducer";
import {typeOfReceiptInitialState} from "../provider/_initState";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {typeReceiptActions} from "../provider/_actions";

const useTypeOfReceipt = () => {
  const [state, dispatch] = useReducer(typeReceiptReducer, typeOfReceiptInitialState)

  const handleOriginFetch = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/cashbook/receipts-type/list?keyword=&status&per_page=20&start=0`),
    ])
    if(response[0]?.data?.success) {
      const receipts = response[0]?.data
      dispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: receipts?.data, loading: false}})
      dispatch({type: typeReceiptActions.TABLE_UPDATE_PAGINATION,
                payload: {active: receipts?.meta?.start,
                          amount: receipts?.meta?.per_page,
                          total: Math.ceil(receipts?.meta?.total / receipts?.meta?.per_page),
                          totalItems: receipts?.meta?.total,
                }})
    }
  }


  const querySearch = {
    keyword: state?.filter?.keyword || '',
    status: '',
    per_page: state?.table?.pagination?.amount || 20,
    start: (state?.table?.pagination?.active * state?.table?.pagination?.amount) || 0,
  }

  const handleAmountChange = async n => {
    const qs = {...querySearch, per_page: n, start: 0}
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    fetchReceiptByFilter(queryString)

    dispatch({
      type: typeReceiptActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: []}},
    })
  }

  const handlePageChange = async page => {
    const qs = {...querySearch,
                per_page: state?.table?.pagination?.amount,
                start: state?.table?.pagination?.amount * page}
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    fetchReceiptByFilter(queryString)
  }

  const fetchReceiptByFilter = async qs => {
    const response = await sendRequestAuth('get', `${config.API}/cashbook/receipts-type/list${qs}`)
    if(response?.data.success) {
      const receipts = response?.data
      dispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: receipts?.data, loading: false}})
      dispatch({type: typeReceiptActions.TABLE_UPDATE_PAGINATION,
        payload: {active: receipts?.meta?.start / receipts?.meta?.per_page,
          amount: receipts?.meta?.per_page,
          total: Math.ceil(receipts?.meta?.total / receipts?.meta?.per_page),
          totalItems: receipts?.meta?.total,
        }})
    }
  }

  return {
    fetch: {
      origin: handleOriginFetch
    },
    provider: {
      state,
      dispatch
    },
    pagination: {
      onAmountChange: handleAmountChange,
      onPageChange: handlePageChange,
    }
  }
}

export default useTypeOfReceipt;