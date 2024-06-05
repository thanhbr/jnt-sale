import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {orderActions, LocationReducer} from '../provider/_reducer'
import {LocationInitialState} from '../provider/initState'
import {useParams, useSearchParams} from 'react-router-dom'

const useLocation = () => {
  const [state, dispatch] = useReducer(LocationReducer, LocationInitialState)
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
      `${config.API}/report/sales/area-sales-report?city_id=&date_type=created&start_date=${startDate}&end_date=${endDate}&sort_by=total_orders&sort_type=4`,
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

  return {
    fetch: {
      origin: handleOriginFetch,
    },
    provider: {state, dispatch},
  }
}

export default useLocation
