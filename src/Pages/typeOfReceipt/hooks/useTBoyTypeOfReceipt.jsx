import React, {useCallback, useContext, useState} from 'react';
import {TypeReceiptContext} from "../provider/_context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {typeReceiptActions} from "../provider/_actions";
import {debounce} from "@mui/material";

const useTBoyTypeOfReceipt = () => {
  const {pageState, pageDispatch} = useContext(TypeReceiptContext)
  const filter = pageState?.filter
  const table = pageState?.table
  const [debounceRefresh, setDebounceRefresh] = useState(true)

  const querySearch = {
    keyword: filter?.keyword || '',
    status: '',
    per_page: table?.pagination?.amount || 20,
    start: (table?.pagination?.active * table?.pagination?.amount) || 0,
  }

  const refreshTable = async _ => {
    if(debounceRefresh) {
      pageDispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: [], loading: true}})
      handleOriginFetch(querySearch)

      setDebounceRefresh(false)
      setTimeout(() => setDebounceRefresh(true), 2000)
    }
  }

  const searchHeader = keyword => {
    pageDispatch({type: typeReceiptActions.FILTER_ADVANCED_SEARCH_UPDATE, payload: keyword})
    debounceListResponse({...querySearch, keyword: keyword?.trim(), per_page: 20, start: 0})
  }


  const debounceListResponse = useCallback(debounce((queries) => {
    pageDispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: pageState?.table?.display?.list, loading: true}})
    handleOriginFetch(queries)
  }, 500), [])

  const handleOriginFetch = async (qs) => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/cashbook/receipts-type/list${queryString}`),
    ])

    if(response[0]?.data.success) {
      const receipts = response[0]?.data
      pageDispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: receipts?.data, loading: false}})
      pageDispatch({type: typeReceiptActions.TABLE_UPDATE_PAGINATION,
                    payload: {active: receipts?.meta?.start,
                      amount: receipts?.meta?.per_page,
                      total: Math.ceil(receipts?.meta?.total / receipts?.meta?.per_page),
                      totalItems: receipts?.meta?.total,
                    }})
    }
  }

  return {
    filter,
    table,
    functions: {
      refreshTable,
      searchHeader,
    }
  }
}

export default useTBoyTypeOfReceipt;