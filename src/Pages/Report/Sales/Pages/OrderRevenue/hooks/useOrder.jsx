import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  orderActions,
  orderInitialState,
  orderReducer,
} from '../provider/_reducer'

const useOrder = () => {
  const [searchParams] = useSearchParams()

  const [state, dispatch] = useReducer(orderReducer, orderInitialState)
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
    shipping_status: filter.shippingStatus.activeValue
      .map(item => item?.value)
      .join(','),
  }

  const fetchRowDetail = async data => {
    if (!!!data?.id) {
      dispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })
      return
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/detail/${data?.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      dispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, list: [newItem] },
      })
    }

    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: { table: { display: { loading: false } } },
    })
  }

  const handleOriginFetch = async () => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value

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

    const splitDate = dateTimeValue.split(' - ')
    const startDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[0])
    const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/report/sales/order-report?start_date=${startDate}&end_date=${endDate}&shipping_status=&keyword=&per_page=20&start=0`),
      sendRequestAuth('get', `${config.API}/report/sales/order-total-report?start_date=${startDate}&end_date=${endDate}&shipping_status=&keyword=&per_page=20&start=0`)
    ])

    if (!!response[0]?.data?.success && !!response[1]?.data?.success) {
      const displayListData = Array.isArray(response[0]?.data?.data)
        ? response[0].data.data
        : []
      // set default value for input filter
      dispatch({
        type: orderActions.FILTER_SEARCH_UPDATE,
        payload: { value: querySearch },
      })
      // update display list
      dispatch({
        type: orderActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          table: {
            display: {
              list: displayListData,
            },
          },
        },
      })
      dispatch({
        type: orderActions.PANELS_UPDATE,
        payload: {
          pagination: { totalItems: response[1]?.data?.data?.total_order || 0 },
          panels: {
            orderTotal: response[1]?.data?.data?.total_order || 0,
            orderRevenue: response[1]?.data?.data?.total_revenue || 0,
            orderProfit: response[1]?.data?.data?.total_profit || 0,
          },
        },
      })
      // auto fetch detail order id and open
      if (querySearch) {
        dispatch({
          type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
          payload: { active: displayListData[0] },
        })
        fetchRowDetail({ id: querySearch })
      }
    }

    if (!querySearch) {
      dispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })
    }
  }

  const handlePaginationAmountChange = async n => {
    dispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: { selected: { list: [] } },
    })
    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
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
      `${config.API}/report/sales/order-report${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: orderActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: { active: page, amount: n, total: totalPages },
        },
      })

    }

    dispatch({
      type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: { active: null },
    })

    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: { table: { display: { loading: false } } },
    })
  }

  const handlePaginationPageChange = async page => {
    dispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: { selected: { list: [] } },
    })
    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
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
      `${config.API}/report/sales/order-report${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: orderActions.TABLE_PAGINATION_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: { active: page },
        },
      })

      const phoneList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.customer_mobile || '')
        : []

    }

    dispatch({
      type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: { active: null },
    })

    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
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

export default useOrder
