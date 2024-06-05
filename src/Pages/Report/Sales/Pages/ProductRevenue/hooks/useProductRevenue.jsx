import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {orderActions, ProductRevenueReducer} from '../provider/_reducer'
import {ProductRevenueInitialState} from '../provider/initState'
import {useParams, useSearchParams} from 'react-router-dom'

const useProductRevenue = () => {
  const [state, dispatch] = useReducer(ProductRevenueReducer, ProductRevenueInitialState)
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
      `${config.API}/report/sales/product-sales-report?keyword=${querySearch}&start_date=${startDate}&end_date=${endDate}&date_type=sended&sort_by=profit`,
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
          topProduct: displayListData.slice(0,3),
          total: response.data?.meta
        },
      })
      
    }
  }


  return {
    fetch: {
      origin: handleOriginFetch,
    },
    provider: {state, dispatch},
  }
}

export default useProductRevenue
