import React, {useCallback, useContext, useState} from 'react';
import {ReportQuotaContext} from "../provider/context";
import {debounce} from "@mui/material";
import {removeAcent} from "../../../../../../common/fieldText/_functions";
import {sendRequestAuth} from "../../../../../../api/api";
import config from "../../../../../../config";
import {reportQuotaActions} from "../provider/initState";

const useFilter = () => {
  const {pageState, pageDispatch} = useContext(ReportQuotaContext)
  const filter = pageState?.filter
  const keyword = filter?.keyword || ''
  const panels = pageState?.panels
  const displayList = pageState?.table?.display
  const pagination = pageState?.table?.pagination
  const [debounceRefresh, setDebounceRefresh] = useState(true)

  // ============ SEARCH ================
  const handleChangeSearch = e => {
    pageDispatch({
      type: reportQuotaActions.FILTER_CHANGE_SEARCH_KEYWORD,
      payload: e.target.value
    })
    debounceChangeSearch({...queries, keyword: e.target.value?.trim()})
  }
  const debounceChangeSearch = useCallback(debounce((data) => {
    fetchReportQuota(data)
  }, 500), [])
  // ============ END SEARCH ================
  

  // ===== ===== ===== WAREHOUSE ===== ===== =====
  const warehouseActiveValue = filter?.warehouse?.activeValue
  const warehouseKeyword = filter?.warehouse?.keyword
  const warehouseList = filter?.warehouse?.list
  const warehouseListOrigin = filter?.warehouse?.listOrigin
  const warehouseValue = filter?.warehouse?.value

  const handleWarehouseChange = cate => {
    pageDispatch({
      type: reportQuotaActions.FILTER_WAREHOUSE_UPDATE_VALUE,
      payload: cate
    })
  }

  const handleWarehouseKeywordChange = cate => {
    pageDispatch({
      type: reportQuotaActions.FILTER_WAREHOUSE_CHANGE_KEYWORD,
      payload: cate?.value
    })
    const formatDataValue = cate?.value
      ? removeAcent(cate?.value?.trim()?.toLowerCase())
      : ''
    const warehouseListData = [...warehouseListOrigin.filter(item => {
      const formatNameItem = item?.warehouse_name
        ? removeAcent(item.warehouse_name.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: reportQuotaActions.FILTER_WAREHOUSE_UPDATE_LIST,
      payload: warehouseListData
    })
  }
  // ===== ===== ===== END WAREHOUSE ===== ===== =====
  

  // ===== ===== ===== QUERIES ===== ===== =====
  const queries = {
    keyword: filter?.keyword || '',
    warehouse_id: warehouseValue?.id || '',
    per_page: filter?.per_page || 20,
    start: filter?.start || 0,
  }

  const fetchReportQuota = async (qs) => {
    pageDispatch({type: reportQuotaActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: [], loading: true}})

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth( 'get', `${config.API}/report/warehouses/quantity-low${queryString}`,)
    if (response?.data?.success) {
      const receipts = response?.data?.data
      pageDispatch({
        type: reportQuotaActions?.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          list: receipts, loading: false, quantityLow: response?.data?.meta?.quantity_low
        }
      })
      pageDispatch({
        type: reportQuotaActions?.TABLE_PAGINATION_UPDATE,
        payload: {
          active: response?.data?.meta?.start,
          amount: response?.data?.meta?.per_page,
          total: Math.ceil(response?.data?.meta?.totals / response?.data?.meta?.per_page),
          totalItems: response?.data?.meta?.totals
        }
      })
    }
  }
  // ===== ===== ===== END QUERIES ===== ===== =====

  const countReportInventoryFilter = [
    !!warehouseActiveValue?.id,
  ].filter(item => item === true).length

  const canSubmitOtherFilter = [
    !!warehouseValue?.id && JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue)
  ].includes(true)

  const shouldShowResetAll = [
    warehouseActiveValue?.id?.length > 0
  ].includes(true)

  const applyOtherFilter = _ => {
    if(!!warehouseValue?.id) {
      pageDispatch({
        type: reportQuotaActions.FILTER_ACTIVE_WAREHOUSE_UPDATE,
        payload: warehouseValue
      })
    }
    fetchReportQuota({...queries})
  }
  const filterDeleteAll = _ => {
    pageDispatch({
      type: reportQuotaActions.FILTER_WAREHOUSE_UPDATE_VALUE,
      payload: ''
    })
    pageDispatch({
      type: reportQuotaActions.FILTER_ACTIVE_WAREHOUSE_UPDATE,
      payload: ''
    })
    fetchReportQuota({
      ...queries,
      warehouse_id: ''
    })
  }


  const handleRefresh = _ => {
    if(debounceRefresh) {
      setDebounceRefresh(false)
      setTimeout(() => setDebounceRefresh(true), 2000)

      fetchReportQuota(queries)
    }
  }

  const shouldShowCreateBtn = pageState?.table?.listDefault?.length === 0 && !!!pageState?.filter?.keyword

  return {
    warehouse: {
      active: warehouseActiveValue,
      keyword: warehouseKeyword,
      value: warehouseValue,
      list: warehouseList,
      onChange: handleWarehouseChange,
      onKeywordChange: handleWarehouseKeywordChange,
    },
    search: {
      value: keyword,
      onChange: handleChangeSearch
    },
    filter: {
      countReportInventoryFilter,
      canSubmitOtherFilter,
      applyOtherFilter,
      shouldShowResetAll,
      filterDeleteAll
    },
    panels,
    methods: {
      onRefresh: handleRefresh,
    },
    displayList,
    pagination,
    queries,
    shouldShowCreateBtn
  }
}

export default useFilter