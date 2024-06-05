import React, {useContext, useState} from 'react';
import {FeedbackContext} from "../provider/_context";
import {feedbackActions} from "../provider/_reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";

const useTBoyFeedback = () => {
  const {state, dispatch} = useContext(FeedbackContext)
  const table = state?.table
  const [debounceRefresh, setDebounceRefresh] = useState(true)
  const shouldShowCreateBtn = state?.table?.display?.listDefault?.length === 0

  const querySearch = {
    per_page: state?.table?.pagination?.amount || 20,
    start: (state?.table?.pagination?.active * state?.table?.pagination?.amount) || 0,
  }

  const refreshTable = async _ => {
    if(debounceRefresh) {
      dispatch({type: feedbackActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: [], loading: true}})
      setDebounceRefresh(false)
      setTimeout(() => setDebounceRefresh(true), 2000)

      fetchReceiptByFilter(querySearch)
    }
  }

  const fetchReceiptByFilter = async querySearch => {
    const qs = {...querySearch}
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth('get', `${config.API}/feedback/list${queryString}`)
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
    table,
    shouldShowCreateBtn,
    methods: {
      refreshTable,
    }
  }
}

export default useTBoyFeedback;