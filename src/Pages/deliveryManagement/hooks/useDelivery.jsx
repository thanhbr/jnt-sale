import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {orderActions, DeliveryReducer} from '../provider/_reducer'
import {DeliveryInitialState} from '../provider/initState'
import {useParams, useSearchParams} from 'react-router-dom'

const useDelivery = () => {
  const [state, dispatch] = useReducer(DeliveryReducer, DeliveryInitialState)
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
    shipping_partner: filter.shippingPartner.activeValue?.value || '',
    shipping_status: Array.isArray(filter.shippingStatus.value)
      ? filter.shippingStatus.value
          .filter(x => x.checked)
          .map(item => item.id)
          .join(',')
      : '',
    is_printed: filter.print.activeValue?.value || '',
    down_cod: filter.cod.activeValue?.value || '',
    item_details: filter.advancedSearch.itemDetails || '',
    product_id: filter.product.activeValue.map(item => item?.value).join(','),
    is_duplicate: filter.duplicate.activeValue?.value,
    allocation_time: filter.allocation.value || '',
  }

  const handleGetReportStatus = async (
    phoneList,
    displayListData,
    displayArrDetailsData,
  ) => {
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
            list: displayListData,
            report: response.data.data,
            arr_details: displayArrDetailsData,
          },
        },
      })
    }
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
      : convertDateTimeToApiFormat(splitDate[0])
    const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/delivery/list?keyword=${querySearch}&date_type=sended&start_date=${startDate}&end_date=${endDate}&shipping_partner=&shipping_status=&product_id&is_duplicate=&is_printed&item_details&down_cod&per_page=${table.pagination.amount}&start=${table.pagination.active}`,
    )
    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: orderActions.FILTER_SEARCH_UPDATE,
        payload: {value: querySearch},
      })

      const displayArrDetailsData = response?.data?.arr_detail ?? {}
      dispatch({
        type: orderActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
            arr_details: displayArrDetailsData,
          },
        },
      })

      const phoneList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.customer_mobile || '')
        : []

      if (phoneList.length > 0)
        handleGetReportStatus(phoneList, displayListData, displayArrDetailsData)
    }
  }

  const handleStatusListFetch = async dateTimeValue => {
    const splitDate = dateTimeValue.split(' - ')
    const querySearch = searchParams.get('search') || ''

    const startDate = querySearch
      ? ''
      : convertDateTimeToApiFormat(splitDate[0])
    const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/delivery/status-list?keyword=${querySearch}&date_type=sended&start_date=${startDate}&end_date=${endDate}&shipping_partner=&shipping_status=&product_id&is_duplicate=&is_printed&item_details&down_cod`,
    )
    if (!!response?.data?.success) {
      const resList = response?.data?.data
      const statusListData = Object.values(resList || {}).map(status => ({
        ...status,
        checked: true,
        sub_arr: status.sub_arr?.map(x => ({...x, checked: true})),
      }))

      dispatch({
        type: 'STATUS_LIST_UPDATE',
        payload: {
          statusList: statusListData,
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
      per_page: n,
      start: page * n,
    })) {
      queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/delivery/list${queryStr}`,
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

      const phoneList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.customer_mobile || '')
        : []

      if (phoneList.length > 0)
        handleGetReportStatus(phoneList, displayListData, displayArrDetailsData)
    }
  }

  const handlePaginationPageChange = async page => {
    dispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: []}},
    })
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
      `${config.API}/order/delivery/list${queryStr}`,
    )

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

      const phoneList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.customer_mobile || '')
        : []

      if (phoneList.length > 0)
        handleGetReportStatus(phoneList, displayListData, displayArrDetailsData)
    }
  }
  return {
    fetch: {
      origin: handleOriginFetch,
      status: handleGetReportStatus,
      statusList: handleStatusListFetch,
    },
    pagination: {
      onAmountChange: handlePaginationAmountChange,
      onPageChange: handlePaginationPageChange,
    },
    provider: {state, dispatch},
  }
}

export default useDelivery
