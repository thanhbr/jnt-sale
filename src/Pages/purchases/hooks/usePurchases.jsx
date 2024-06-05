import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PurchasesInitialState } from '../provider/initState'
import { actionTypes, PurchasesReducer } from '../provider/_reducer'

const usePurchases = () => {
  const [state, dispatch] = useReducer(PurchasesReducer, PurchasesInitialState)
  const {filter, table} = state
  const [searchParams] = useSearchParams()

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
    supplier_id: filter.supplier.activeValue?.value || '',
    warehouse_id: filter.warehouse.activeValue?.value || '',
    payment_status: filter.payment_status?.value?.join(',') || '',
    warehouse_status: filter.warehouse_status?.value?.join(',') || '',
  }
  
  const handleOriginFetch = async () => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch)
      dispatch({
        type: actionTypes.FILTER_ACTIVE_DATE_TIME_UPDATE,
        payload: {
          end: '',
          start: '',
          type: filter.dateTime.type,
          value: '',
        },
      })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/purchase/list?keyword=${querySearch}&start_date=&end_date=&warehouse_id&supplier_id&payment_status&warehouse_status&per_page=${table.pagination.amount}&start=${table.pagination.active}`,
    )
    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: actionTypes.FILTER_SEARCH_UPDATE,
        payload: {value: querySearch},
      })
      
      dispatch({
        type: actionTypes.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: {
            total: Math.ceil(Number(response?.data?.meta.totals) /  Number(response?.data?.meta.per_page)),
            totalItems: Number(response?.data?.meta.totals),
          }
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
    dispatch({type: 'SET_LOADING', payload: false})

    const response = await sendRequestAuth(
      'get',
      `${config.API}/purchase/list${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: actionTypes.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: {active: page, amount: n, total: totalPages},
        },
      })
    }
    
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
      `${config.API}/purchase/list${queryStr}`,
    )

    if (!!response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data)
        ? response.data.data
        : []

      dispatch({
        type: actionTypes.TABLE_PAGINATION_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
          pagination: {active: page},
        },
      })
    }
    dispatch({type: 'SET_LOADING', payload: true})
  }
  const handleCloseImportExcel = () => {
    dispatch({type: 'UPDATE_SHOW_EXPORT', payload: false})
  }
  const handleOpenImportExcel = () => {
    dispatch({type: 'UPDATE_SHOW_EXPORT', payload: true})
  }

  return {
    fetch: {
      origin: handleOriginFetch,
    },
    pagination: {
      onAmountChange: handlePaginationAmountChange,
      onPageChange: handlePaginationPageChange,
    },
    methods: {
      onCloseImportModal: handleCloseImportExcel,
      onOpenImportModal: handleOpenImportExcel,
    },
    provider: {state, dispatch},
  }
}

export default usePurchases
