import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useContext, useState} from 'react'
import {bulkOrderActions} from '../provider/_actions'
import {BulkOrderContext} from '../provider/_context'
import {bulkOrderInitialState} from '../provider/_initialState'
import {getArrayFromValue} from '../utils/array'
import {generateQuery, splitDateTimeRangeValue} from '../utils/string'

const useBulkOrder = () => {
  const {state, dispatch} = useContext(BulkOrderContext)

  const [canFetchOrigin, setCanFetchOrigin] = useState(true)

  const dateTimeActiveValue = splitDateTimeRangeValue(
    bulkOrderInitialState.filter.dateTime.activeValue.value,
  )
  const queryStartFrom =
    state.table.pagination.active * state.table.pagination.amount

  const queries = {
    keyword: state.filter.search.value,
    shipping_partner: state.filter.shippingPartner.activeValue?.value || '',
    user_id: state.filter.employee.activeValue?.value || '',
    start_date: dateTimeActiveValue.start
      ? convertDateTimeToApiFormat(dateTimeActiveValue.start)
      : '',
    end_date: dateTimeActiveValue.end
      ? convertDateTimeToApiFormat(dateTimeActiveValue.end)
      : '',
    per_page: state.table.pagination.amount,
    start: queryStartFrom,
  }

  const hadnleFetchTable = async q => {
    dispatch({type: bulkOrderActions.TABLE_DISPLAY_LOADING_UPDATE})

    const response = await sendRequestAuth(
      'get',
      `${config.API}/tool/bulks/history${q}`,
    )

    if (!!response?.data?.success) {
      const perPage = response?.data?.meta?.per_page || 0
      const start = response?.data?.meta?.start || 0
      const total = response?.data?.meta?.total || 0

      dispatch({
        type: bulkOrderActions.TABLE_UPDATE,
        payload: {
          display: {list: getArrayFromValue(response?.data?.data)},
          pagination: {
            active: Math.floor(start / perPage),
            amount: perPage,
            total: Math.ceil(total / perPage),
            totalItems: total,
          },
        },
      })
    }

    return response
  }

  const handleFetchOrigin = async () => {
    if (!canFetchOrigin) return
    setCanFetchOrigin(false)

    const q = generateQuery(queries)
    hadnleFetchTable(q)
  }

  const handleTablePaginationAmountChange = async n => {
    const currentPage = state.table.pagination.active || 0
    const totalPages = state.table.pagination.total
    const totalItems = state.table.pagination.totalItems
    const page = totalItems < currentPage * n ? totalPages - 1 : currentPage

    const q = generateQuery({...queries, per_page: n, start: page * n})
    hadnleFetchTable(q)
  }

  const handleTablePaginationPageChange = async page => {
    const amount = state.table.pagination?.amount || 20

    const q = generateQuery({...queries, start: page * amount})
    hadnleFetchTable(q)
  }

  return {
    table: {
      data: state.table,
      methods: {
        onAmountChange: handleTablePaginationAmountChange,
        onPageChange: handleTablePaginationPageChange,
      },
    },
    properties: {
      queries,
    },
    methods: {
      fetchOrigin: handleFetchOrigin,
      fetchTable: hadnleFetchTable,
    },
  }
}

export default useBulkOrder
