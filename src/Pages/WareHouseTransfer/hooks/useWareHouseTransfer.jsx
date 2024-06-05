import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {warehouseTransferActions, WareHouseTransferReducer} from '../provider/_reducer'
import {wareHouseTransferInitialState} from '../provider/initState'
import {useParams, useSearchParams} from 'react-router-dom'

const useWareHouseTransfer = () => {
  const [state, dispatch] = useReducer(WareHouseTransferReducer, wareHouseTransferInitialState)
  const {filter, table} = state

  const filterQueries = {
    keyword: filter.search?.value || '',
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
        type: warehouseTransferActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
            report: response.data.data,
            arr_details: displayArrDetailsData,
          },
          pagination: {
            totalItems: response?.data?.meta?.total,
            amount: response?.data?.meta?.per_page
          }
        },
      })
    }
  }

  const [searchParams] = useSearchParams()
  const handleOriginFetch = async () => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch)
      dispatch({
        type: warehouseTransferActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
        payload: {
          end: '',
          start: '',
          type: filter.dateTime.type,
          value: '',
        },
      })

      const response = await sendRequestAuth(
        'get',
        `${config.API}/warehouse/transfer/list?keyword=${querySearch}&start_date=&end_date=&warehouse_import&warehouse_export&user_id&per_page=${table.pagination.amount}&start=${table.pagination.active}`,
      )
    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: warehouseTransferActions.FILTER_SEARCH_UPDATE,
        payload: {value: querySearch},
      })

      dispatch({
        type: warehouseTransferActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: {
            totalItems: response?.data?.meta?.total,
            amount: response?.data?.meta?.per_page
          }
        },
      })
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
      `${config.API}/warehouse/transfer/list${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      const displayArrDetailsData = response?.data?.arr_detail ?? {}

      dispatch({
        type: warehouseTransferActions.TABLE_AMOUNT_UPDATE,
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
      `${config.API}/warehouse/transfer/list${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      const displayArrDetailsData = response?.data?.arr_detail ?? {}

      dispatch({
        type: warehouseTransferActions.TABLE_PAGINATION_UPDATE,
        payload: {
          display: {
            list: displayListData,
            arr_details: displayArrDetailsData,
          },
          pagination: {active: page},
        },
      })
      dispatch({type: 'SET_LOADING', payload: true})
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

export default useWareHouseTransfer
