import React, {useReducer} from 'react';
import {feedbackInitialState, feedbackReducer, feedbackActions} from "../provider/_reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";

const useFeedback = () => {
  const [state, dispatch] = useReducer(feedbackReducer, feedbackInitialState)

  const handleOriginFetch = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/feedback/list?per_page=20&start=0`),
    ])
    if(response[0]?.data?.success) {
      const feedback = response[0]?.data
      dispatch({
        type: feedbackActions.TABLE_UPDATE_DISPLAY_LIST,
        payload: {list: feedback?.data, listDefault: feedback?.data, loading: false}
      })
      dispatch({type: feedbackActions.TABLE_UPDATE_PAGINATION,
        payload: {active: feedback?.meta?.start,
          amount: feedback?.meta?.per_page,
          total: Math.ceil(feedback?.meta?.totals / feedback?.meta?.per_page),
          totalItems: feedback?.meta?.totals,
        }})
    }
  }


  const querySearch = {
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
      type: feedbackActions.TABLE_SELECTED_LIST_UPDATE,
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
    const response = await sendRequestAuth('get', `${config.API}/feedback/list${qs}`)
    if(response?.data.success) {
      const feedback = response?.data
      dispatch({type: feedbackActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: feedback?.data, loading: false}})
      dispatch({type: feedbackActions.TABLE_UPDATE_PAGINATION,
        payload: {active: feedback?.meta?.start / feedback?.meta?.per_page,
          amount: feedback?.meta?.per_page,
          total: Math.ceil(feedback?.meta?.totals / feedback?.meta?.per_page),
          totalItems: feedback?.meta?.totals,
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

export default useFeedback