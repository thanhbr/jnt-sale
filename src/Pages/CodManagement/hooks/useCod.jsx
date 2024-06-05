import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {
  orderActions,
  CodReducer,
} from '../provider/_reducer'
import  {CodInitialState} from '../provider/initState'


const useCod = () => {
  const [state, dispatch] = useReducer(CodReducer, CodInitialState)
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
    shipping_partner: 1,
    shipping_status: Array.isArray(filter.shippingStatus.value)
        ? filter.shippingStatus.value.filter(x => x.checked).map(item => item.id).join(',')
        : '',
    comparing_check: filter.statusComparing.activeValue?.value || '',
    user: filter.employee.activeValue?.value || '',
    
  }

 
  const handleOriginFetch = async dateTimeValue => {
    const splitDate = dateTimeValue.split(' - ')
    const startDate = convertDateTimeToApiFormat(splitDate[0])
    const endDate = convertDateTimeToApiFormat(splitDate[1])
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/delivery/cod-list?keyword=&date_type=received&start_date=${startDate}&end_date=${endDate}&shipping_partner=1&shipping_status=&comparing_check=&user=&per_page=${table.pagination.amount}&start=${table.pagination.active}`
    )
    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []
        
      
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

  const handleStatusListFetch = async (dateTimeValue) => {
    const splitDate = dateTimeValue.split(' - ')
    const startDate = convertDateTimeToApiFormat(splitDate[0])
    const endDate = convertDateTimeToApiFormat(splitDate[1])

    const response = await sendRequestAuth(
      'get',    
      `${config.API}/order/delivery/cod-status-list?keyword=&date_type=received&start_date=${startDate}&end_date=${endDate}&shipping_partner=1&shipping_status&comparing_check=&user=`,
    )
    if (!!response?.data?.success) {  
      const resList = response?.data?.data
      const statusListData = Object.values(resList || {}).map(status => ({...status, checked: true, sub_arr: status.sub_arr?.map(x => ({...x, checked: true}))}))

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
      `${config.API}/order/delivery/cod-list${queryStr}`,
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
      `${config.API}/order/delivery/cod-list${queryStr}`,
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
      dispatch({type: 'SET_LOADING', payload: true})

    }
  }

  
  return {
    fetch: {
      origin: handleOriginFetch,
      statusList: handleStatusListFetch,
    },
    pagination: {
      onAmountChange: handlePaginationAmountChange,
      onPageChange: handlePaginationPageChange,
    },
    provider: {state, dispatch}
  }
}

export default useCod
