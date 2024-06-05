import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {shippingActions, ShippingDifferenceReducer} from '../provider/_reducer'
import {ShippingDifferenceInitialState} from '../provider/initState'
import {useParams, useSearchParams} from 'react-router-dom'

const useShippingDifferenceEmployee = () => {
  const [state, dispatch] = useReducer(ShippingDifferenceReducer, ShippingDifferenceInitialState)
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
        type: shippingActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
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
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/report/sales/fee/staffs?staff_id=0&keyword=${querySearch}&start_date=${startDate}&end_date=${endDate}&date_type=sended`,
      ),
    ])
    if (!!response[0]?.data?.success ) {
      const displayListData = Array.isArray(response[0]?.data?.data)
        ? response[0].data.data
        : []

      dispatch({
        type: shippingActions.FILTER_SEARCH_UPDATE,
        payload: {value: querySearch},
      })
      dispatch({
        type: shippingActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
        },
      })
      dispatch({
        type: shippingActions.PANELS_UPDATE,
        payload: {
          panels: response[0]?.data?.meta
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

export default useShippingDifferenceEmployee
