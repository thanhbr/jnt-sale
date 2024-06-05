import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  transferActions,
  importInitialState,
  importReducer,
} from '../provider/_reducer'

const useTransfer = () => {
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
    warehouse_transfer: filter.warehouse.activeValue?.value || '',
    warehouse_receive: filter.receiveWarehouse.activeValue?.value || '',
  }

  const handleOriginFetch = async () => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value

    const querySearch = searchParams.get('search') || ''
    if (querySearch)
      dispatch({
        type: transferActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
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

    const response = await sendRequestAuth('get', `${config.API}/report/warehouses/transfer?keyword=${querySearch}&start_date=${startDate}&end_date=${endDate}`)

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []
      // set default value for input filter
      dispatch({
        type: transferActions.FILTER_SEARCH_UPDATE,
        payload: { value: querySearch },
      })
      // update display list
      dispatch({
        type: transferActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
        },
      })
      dispatch({
        type: transferActions.PANELS_UPDATE,
        payload: {
          panels: response.data.meta,
          pagination: {
            totalItems: response.data.meta?.totals || 0,
          }
        }
      })
    }

    if (!querySearch) {
      dispatch({
        type: transferActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })
    }
  }

  const handlePaginationAmountChange = async n => {
    dispatch({
      type: transferActions.TABLE_SELECTED_LIST_UPDATE,
      payload: { selected: { list: [] } },
    })
    dispatch({
      type: transferActions.TABLE_DISPLAY_LOADING_UPDATE,
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
      `${config.API}/report/warehouses/transfer${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: transferActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: { active: page, amount: n, total: totalPages },
        },
      })

    }

    dispatch({
      type: transferActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: { active: null },
    })

    dispatch({
      type: transferActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: { table: { display: { loading: false } } },
    })
  }

  const handlePaginationPageChange = async page => {
    dispatch({
      type: transferActions.TABLE_SELECTED_LIST_UPDATE,
      payload: { selected: { list: [] } },
    })
    dispatch({
      type: transferActions.TABLE_DISPLAY_LOADING_UPDATE,
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
      `${config.API}/report/warehouses/transfer${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: transferActions.TABLE_PAGINATION_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: { active: page },
        },
      })

    }

    dispatch({
      type: transferActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: { active: null },
    })

    dispatch({
      type: transferActions.TABLE_DISPLAY_LOADING_UPDATE,
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

export default useTransfer
