import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {orderActions, ForControlCODReducer} from '../provider/_reducer'
import {ForControlCODInitialState} from '../provider/initState'
import {useParams, useSearchParams} from 'react-router-dom'

const useForControlCOD = () => {
  const [state, dispatch] = useReducer(ForControlCODReducer, ForControlCODInitialState)
  const {filter, table} = state

  const filterQueries = {
    multiple_search: filter.search?.value || '',
    date_type: filter.dateTime?.activeValue?.type?.value || '',
    start_date:
      filter.dateTime.activeValue?.start && filter.dateTime.activeValue.value
        ? convertDateTimeToApiFormat(
            filter.dateTime.activeValue.value.split(' - ')[0],
          )?.split(' ')[0]
        : '',
    end_date:
      filter.dateTime.activeValue?.end && filter.dateTime.activeValue.value
        ? convertDateTimeToApiFormat(
            filter.dateTime.activeValue.value.split(' - ')[1],
          )?.split(' ')[0]
        : '',
  }

  const [searchParams] = useSearchParams()
  const handleOriginFetch = async dateTimeValue => {
    const splitDate = dateTimeValue.split(' - ')
    const querySearch = searchParams.get('search') || ''

    if (querySearch)
      dispatch({
        type: orderActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
        payload: {
          end: '',
          start: '',
          type: filter.dateTime.type,
          value: '',
        },
      })

    const startDate = querySearch
      ? ''
      : convertDateTimeToApiFormat(splitDate[0]).split(' ')[0]
    const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1]).split(' ')[0]
    const response = await sendRequestAuth(
      'get',
      `${config.API}/cod/cod-list?multiple_search=${querySearch}&code_type=4&start_date=${startDate}&end_date=${endDate}&date_type=0&per_page=${table.pagination.amount}&start=${table.pagination.active}`,
    )
    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: orderActions.FILTER_SEARCH_UPDATE,
        payload: {value: querySearch},
      })

      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          pagination: {
            active: 0,
            amount: table.pagination.amount,
            total: response?.data?.meta?.total
              ? Math.ceil(
                  response?.data?.meta?.total / table.pagination.amount,
                )
              : 0,
            totalItems: response?.data?.meta?.total || 0,
          },
        },
      })

      dispatch({
        type: orderActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
        },
      })
      
    }
  }

  const handlePaginationAmountChange = async n => {
    dispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: []}},
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
      sort_type: filter.sort_type || '',
      sort_by: filter.sort_by || '',
      per_page: n,
      start: page * n,
    })) {
      queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/cod/cod-list${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      const displayArrDetailsData = response?.data?.arr_detail ?? {}

      dispatch({
        type: orderActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: displayListData,
            arr_details: displayArrDetailsData,
          },
          pagination: {active: page, amount: n, total: totalPages},
        },
      })

    }
  }

  const handlePaginationPageChange = async page => {
    const amount = table.pagination?.amount || 10
    dispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: []}},
    })
    let queryStr = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...filterQueries,
      per_page: amount,
      start: page * amount,
      sort_type: filter.sort_type || '',
      sort_by: filter.sort_by || '',
    })) {
      queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    dispatch({type: 'SET_LOADING', payload: false})
    const response = await sendRequestAuth(
      'get',
      `${config.API}/cod/cod-list${queryStr}`,
    )
    dispatch({type: 'SET_LOADING', payload: true})

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      const displayArrDetailsData = response?.data?.arr_detail ?? {}

      dispatch({
        type: orderActions.TABLE_PAGINATION_UPDATE,
        payload: {
          display: {
            list: displayListData,
            arr_details: displayArrDetailsData,
          },
          pagination: {active: page},
        },
      })
    }
  }
  return {
    fetch: {
      origin: handleOriginFetch,
    },
    pagination: {
      onAmountChange: handlePaginationAmountChange,
      onPageChange: handlePaginationPageChange,
    },
    provider: {state, dispatch},
  }
}

export default useForControlCOD
