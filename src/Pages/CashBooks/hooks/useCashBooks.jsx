import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {actions, CashBooksReducer} from '../provider/_reducer'
import {CashBooksInitialState} from '../provider/initState'
import {useParams, useSearchParams} from 'react-router-dom'

const useCashBooks = () => {
  const [state, dispatch] = useReducer(CashBooksReducer, CashBooksInitialState)
  const {filter, table} = state

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
      payment_method_id: Array.isArray(filter.paymentMethod.activeValue)
        ? filter.paymentMethod.activeValue.map(item => item?.value).join(',')
        : '',
      receipt_type: filter.receiptType.activeValue?.type?.value || '',
      receipt_type_id: filter.receiptType.activeValue?.value?.value || '',
  }

  const [searchParams] = useSearchParams()
  const handleOriginFetch = async dateTimeValue => {
    const splitDate = dateTimeValue.split(' - ')
    const querySearch = searchParams.get('search') || ''

    if (querySearch)
      dispatch({
        type: actions.FILTER_ACTIVE_DATE_TIME_UPDATE,
        payload: {
          end: '',
          start: '',
          type: filter.dateTime.type,
          value: '',
        },
      })

    const startDate = querySearch
      ? ''
      : convertDateTimeToApiFormat(splitDate[0])
    const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])
    const response = await sendRequestAuth(
      'get',
      `${config.API}/cashbook/list?keyword=${querySearch}&date_type=sended&start_date=${startDate}&end_date=${endDate}&payment_method_id=&receipt_type=&receipt_type_id&per_page=${table.pagination.amount}&start=${table.pagination.active}`,
    )
    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: actions.FILTER_SEARCH_UPDATE,
        payload: {value: querySearch},
      })

      const displayArrDetailsData = response?.data?.arr_detail ?? {}
      dispatch({
        type: actions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
        },
      })
      
    }
  }

  const handlePaginationAmountChange = async n => {
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
      `${config.API}/cashbook/list${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      const displayArrDetailsData = response?.data?.arr_detail ?? {}

      dispatch({
        type: actions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: {active: page, amount: n, total: totalPages},
        },
      })

    }
  }

  const handlePaginationPageChange = async page => {
    const amount = table.pagination?.amount || 10
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
    dispatch({type: 'SET_LOADING', payload: false})
    const response = await sendRequestAuth(
      'get',
      `${config.API}/cashbook/list${queryStr}`,
    )
    dispatch({type: 'SET_LOADING', payload: true})

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: actions.TABLE_PAGINATION_UPDATE,
        payload: {
          display: {
            list: displayListData,
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

export default useCashBooks
