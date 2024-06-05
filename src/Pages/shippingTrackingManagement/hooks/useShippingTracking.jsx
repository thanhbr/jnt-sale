import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {
  orderActions,
  ShippingTrackingReducer,
} from '../provider/_reducer'
import  {ShippingTrackingInitialState} from '../provider/initState'
import { transformListData } from '../utils/transform'
import { useSearchParams } from 'react-router-dom'

const useShippingTracking = () => {
  const [state, dispatch] = useReducer(ShippingTrackingReducer, ShippingTrackingInitialState)
  const {filter, table} = state
  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('keyword') || ''
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
    solving_status: filter.orderStatus.activeValue?.value || '',
    downtime: filter?.downtime?.value || '',
    item_details: filter.advancedSearch.itemDetails || '',
  }

  const handleOriginFetch = async dateTimeValue => {
    const splitDate = dateTimeValue.split(' - ')
    const startDate = convertDateTimeToApiFormat(splitDate[0])
    const endDate = convertDateTimeToApiFormat(splitDate[1])
    dispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: querySearch},
    })
    if(!!querySearch){
      dispatch({
        type: orderActions.FILTER_DATE_TIME_UPDATE,
        payload: {
          end: '',
          start: '',
          type: 1,
          value: '',
        },
      })
    }
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/delivery/warning/orders?keyword=${querySearch}&date_type=created&start_date=${!querySearch ? startDate : ''}&end_date=${!querySearch ? endDate : ''}&solving_status=&user_id=&downtime&per_page=20&start=0`),
      sendRequestAuth('get', `${config.API}/delivery/warning/orders-count?keyword=${querySearch}&date_type=created&start_date=${!querySearch ? startDate : ''}&end_date=${!querySearch ? endDate : ''}&solving_status=&user_id=&downtime&per_page=20&start=0`),
    ])
    dispatch({type: 'SET_LOADING', payload: true})
    if (response[0]?.status === 200 && response[1]?.status === 200) {
      const displayListData = Array.isArray(response[0]?.data?.data)
        ? response[0].data.data
        : []

      const displayArrDetailsData = response[0]?.data?.arr_detail ?? {}

      dispatch({
        type: orderActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: displayListData,
            arr_details: displayArrDetailsData
          },
          pagination: {
            active:  0,
            amount: table.pagination.amount,
            total: response[1]?.data?.data?.totals
              ? Math.ceil(response[1].data.data.totals / table.pagination.amount)
              : 0,
            totalItems: response[1]?.data?.data?.totals || 0,
          },
          panels: {
            codTotal: response[1]?.data?.data?.total_cod || 0,
            orderTotal: response[1]?.data?.data?.totals || 0,
            shippingFeeTotal: response[1]?.data?.data?.total_ship_fee || 0,
          },
        },
      })
    }
  }


  const handlePaginationAmountChange = async n => {
    dispatch({
      type: 'SET_LOADING',
      payload: false,
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
      `${config.API}/delivery/warning/orders${queryStr}`,
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
    }

    // dispatch({
    //   type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
    //   payload: {active: null},
    // })

    dispatch({type: 'SET_LOADING', payload: true})
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
      `${config.API}/delivery/warning/orders${queryStr}`,
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
            arr_details: displayArrDetailsData
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

export default useShippingTracking
