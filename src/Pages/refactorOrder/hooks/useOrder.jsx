import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {useSearchParams} from 'react-router-dom'
import {ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST} from '../interfaces/_constants'
import {
  orderActions,
  orderInitialState,
  orderReducer,
} from '../provider/_reducer'

const useOrder = () => {
  const [searchParams] = useSearchParams()

  const [state, dispatch] = useReducer(orderReducer, orderInitialState)
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
    user_id: filter.employee.activeValue?.value?.map(x => x.value).join(',') || '',
    warehouse_id: filter.warehouse.activeValue?.value || '',
    shipping_partner: filter.shippingPartner.activeValue?.value || '',
    shipping_status: filter.shippingStatus.activeValue
      .map(item => item?.value)
      .join(','),
    order_origin_id: filter.source.activeValue?.value || '',
    keyword_customer: filter.advancedSearch.customer.keyword.trim(),
    customer_id: filter.advancedSearch.customer.value || '',
    livestream_id: filter.advancedSearch.liveVideoId || '',
    product_id: filter.product.activeValue.map(item => item?.value).join(','),
    is_duplicate: filter.duplicate.activeValue?.value,
    payment:
      Array.isArray(filter.payment.value) &&
      filter.payment.value.length < ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.length
        ? filter.payment.value.join(',')
        : '',
  }

  const handleGetReportStatus = async (phoneList, displayListData) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/customer/report`,
      JSON.stringify({phone: phoneList}),
    )

    if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
      dispatch({
        type: orderActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData.map(item => ({
              ...item,
              total_reports: item?.customer_mobile
                ? response.data.data.find(
                    find => find?.phone === item?.customer_mobile,
                  )?.totals || 0
                : 0,
            })),
          },
        },
      })
    }
  }

  const fetchRowDetail = async data => {
    if (!!!data?.id) {
      dispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
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
        payload: {active: newItem, list: [newItem]},
      })
    }

    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: {table: {display: {loading: false}}},
    })
  }

  const handleOriginFetch = async () => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value

    const querySearch = searchParams.get('search') || ''
    if (querySearch)
      dispatch({
        type: orderActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
        payload: {
          end:'',
          start: '',
          type: filter.dateTime.type,
          value: '',
        },
      })

    const splitDate = dateTimeValue.split(' - ')
    const startDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[0])
    const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/orders?keyword=${querySearch}&date_type=created&start_date=${startDate}&end_date=${endDate}&customer_id=&user_id=&warehouse_id=&shipping_partner=&shipping_status=&order_origin_id=&livestream_id=&product_id=&is_duplicate=&per_page=20&start=0`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      // set default value for input filter
      dispatch({
        type: orderActions.FILTER_SEARCH_UPDATE,
        payload: {value: querySearch},
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
      // fetch report list
      const phoneList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.customer_mobile || '')
        : []
      if (phoneList.length > 0)
        handleGetReportStatus(phoneList, displayListData)
      // auto fetch detail order id and open
      if (querySearch) {
        dispatch({
          type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
          payload: {active: displayListData[0]},
        })
        fetchRowDetail({id: querySearch})
      }
    }

    if (!querySearch) {
      dispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
      })
    }
  }

  const handlePaginationAmountChange = async n => {
    dispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: []}},
    })
    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: {table: {display: {loading: true}}},
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
      `${config.API}/order/orders${queryStr}`,
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
          pagination: {active: page, amount: n, total: totalPages},
        },
      })

      const phoneList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.customer_mobile || '')
        : []

      if (phoneList.length > 0)
        handleGetReportStatus(phoneList, displayListData)
    }

    dispatch({
      type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: {active: null},
    })

    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: {table: {display: {loading: false}}},
    })
  }

  const handlePaginationPageChange = async page => {
    dispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: []}},
    })
    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: {table: {display: {loading: true}}},
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
      `${config.API}/order/orders${queryStr}`,
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
          pagination: {active: page},
        },
      })

      const phoneList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.customer_mobile || '')
        : []

      if (phoneList.length > 0)
        handleGetReportStatus(phoneList, displayListData)
    }

    dispatch({
      type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
      payload: {active: null},
    })

    dispatch({
      type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: {table: {display: {loading: false}}},
    })
  }

  return {
    fetch: {
      origin: handleOriginFetch,
      status: handleGetReportStatus,
    },
    pagination: {
      onAmountChange: handlePaginationAmountChange,
      onPageChange: handlePaginationPageChange,
    },
    provider: {state, dispatch},
  }
}

export default useOrder
