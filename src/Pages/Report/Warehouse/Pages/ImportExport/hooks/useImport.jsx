import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
   importExportInitialState, importExportReducer,importExportActions
} from '../provider/_reducer'
import {reportInventoryActions} from "../../Inventory/provider/initState";
const useImport = () => {
  const [searchParams] = useSearchParams()

  const [state, dispatch] = useReducer(importExportReducer, importExportInitialState)
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
    warehouse_id: filter.warehouse.activeValue?.value || '',
    category_id: filter?.category_id?.id || ''
  }

  const handleOriginFetch = async () => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value

    const querySearch = searchParams.get('search') || ''
    if (querySearch)
      dispatch({
        type: importExportActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
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
      sendRequestAuth('get', `${config.API}/report/warehouses/inventory?keyword=${querySearch}&warehouse_id&category_id&start_date=${startDate}&end_date=${endDate}&per_page=200&start=0`),
      sendRequestAuth('get', `${config.API}/product/category/list?keyword&status`)
    ])

    if (!!response[0]?.data?.success) {
      const displayListData = Array.isArray(response[0]?.data?.data)
        ? response[0].data.data
        : []
      // set default value for input filter
      dispatch({
        type: importExportActions.FILTER_SEARCH_UPDATE,
        payload: { value: querySearch },
      })
      // update display list
      dispatch({
        type: importExportActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData,
          },
        },
      })
      dispatch({type:importExportActions.PANELS_UPDATE,payload:{
          panels:response[0]?.data?.meta
        }})
      dispatch({
        type: reportInventoryActions?.TABLE_PAGINATION_UPDATE,
        payload: {
          totalItems: response[0]?.data?.meta?.totals
        }
      })

    }
    if(response[1]?.data?.success) {
      dispatch({type: importExportActions.FORM_CREATE_ADD_LIST_ORIGIN, payload: {
          list: response[1]?.data?.data,
          listOrigin: response[1]?.data?.data,
        }})
    }
    if (!querySearch) {
      dispatch({
        type: importExportActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })
    }
  }



  return {
    fetch: {
      origin: handleOriginFetch,
    },
    provider: { state, dispatch },
  }
}

export default useImport
