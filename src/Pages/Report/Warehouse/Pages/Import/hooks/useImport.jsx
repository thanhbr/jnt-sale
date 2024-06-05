import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  importActions,
  importInitialState,
  importReducer,
} from '../provider/_reducer'

const useImport = () => {
  const [searchParams] = useSearchParams()

  const [state, dispatch] = useReducer(importReducer, importInitialState)
  const { filter, table } = state

  const filterQueries = {
    keyword: filter.search?.value || '',
    date_type: filter.dateTime?.activeValue?.type?.value || '',
    start_date:
      filter.dateTime.activeValue?.start && filter.dateTime.activeValue.value
        ? convertDateTimeToApiFormat(
        filter.dateTime.activeValue.value.split(' - ')[0],
        )
        : '',
    end_date:
      filter.dateTime.activeValue?.end && filter.dateTime.activeValue.value
        ? convertDateTimeToApiFormat(
        filter.dateTime.activeValue.value.split(' - ')[1],
        )
        : '',
    warehouse_id: filter.warehouse.activeValue?.value || '',
    supplier_id: filter.supplier.activeValue?.value || '',
  }

  const handleOriginFetch = async () => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value

    const querySearch = searchParams.get('search') || ''
    if (querySearch)
      dispatch({
        type: importActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
        payload: {
          end: '',
          start: '',
          type: filter.dateTime.type,
          value: '',
        },
      })

    const splitDate = dateTimeValue.split(' - ')
    const startDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[0])
    const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/report/warehouses/purchase?keyword=${querySearch}&start_date=${startDate}&end_date=${endDate}&warehouse_id&supplier_id&per_page=20&start=0`),
      sendRequestAuth('get', `${config.API}/report/warehouses/purchase/total?keyword${querySearch}=&start_date=${startDate}&end_date=${endDate}&warehouse_id&supplier_id&per_page=20&start=0`)
    ])

    if (!!response[0]?.data?.success) {
      const displayListData = Array.isArray(response[0]?.data?.data)
        ? response[0].data.data
        : []
      // set default value for input filter
      dispatch({
        type: importActions.FILTER_SEARCH_UPDATE,
        payload: { value: querySearch },
      })
      // update display list
      dispatch({
        type: importActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
        },
      })
      dispatch({
        type: importActions.PANELS_UPDATE,
        payload: {
          panels: {
            importTotal: response[1]?.data?.data?.total_quantity || 0,
            importValueTotal: response[1]?.data?.data?.total_purchase || 0,
            paymentTotal:response[1]?.data?.data?.total_payment || 0,
            debtsTotal: +response[1]?.data?.data?.total_purchase - +response[1]?.data?.data?.total_payment,
            totals: +response[1]?.data?.data?.totals,
          },
          pagination: {
            totalItems: response[1]?.data?.data?.totals || 0,
          }
        }
      })
    }

    if (!querySearch) {
      dispatch({
        type: importActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })
    }
  }

  const handlePaginationAmountChange = async n => {
    dispatch({
      type: importActions.TABLE_SELECTED_LIST_UPDATE,
      payload: { selected: { list: [] } },
    })
    dispatch({
      type: importActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: { table: { display: { loading: true } } },
    })

    const currentPage = table.pagination.active || 0
    const totalPages = Math.ceil(table.pagination.totalItems / n)
    const page =
      table.pagination.totalItems < currentPage * n
        ? totalPages - 1
        : currentPage

    let queryStr = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...filterQueries,
      per_page: n,
      start: page * n,
    })) {
      queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/report/warehouses/purchase${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: importActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: { active: page, amount: n, total: totalPages },
        },
      })

    }

    dispatch({
      type: importActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: { active: null },
    })

    dispatch({
      type: importActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: { table: { display: { loading: false } } },
    })
  }

  const handlePaginationPageChange = async page => {
    dispatch({
      type: importActions.TABLE_SELECTED_LIST_UPDATE,
      payload: { selected: { list: [] } },
    })
    dispatch({
      type: importActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: { table: { display: { loading: true } } },
    })

    const amount = table.pagination?.amount || 20

    let queryStr = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...filterQueries,
      per_page: amount,
      start: page * amount,
    })) {
      queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/report/warehouses/purchase${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: importActions.TABLE_PAGINATION_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: { active: page },
        },
      })

    }

    dispatch({
      type: importActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: { active: null },
    })

    dispatch({
      type: importActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: { table: { display: { loading: false } } },
    })
  }

  return {
    fetch: {
      origin: handleOriginFetch,
    },
    pagination: {
      onAmountChange: handlePaginationAmountChange,
      onPageChange: handlePaginationPageChange,
    },
    provider: { state, dispatch },
  }
}

export default useImport
