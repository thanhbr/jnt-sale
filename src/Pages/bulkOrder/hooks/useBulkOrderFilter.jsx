import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext, useState} from 'react'
import {bulkOrderActions} from '../provider/_actions'
import {BulkOrderContext} from '../provider/_context'
import {getDateFromNow} from '../utils/date'
import {
  generateQuery,
  removeAcent,
  splitDateTimeRangeValue,
} from '../utils/string'
import useBulkOrder from './useBulkOrder'
import {DateRangePicker} from 'rsuite'
import {bulkOrderInitialState} from '../provider/_initialState'
import {debounce} from "@mui/material";

const {allowedRange} = DateRangePicker

const useBulkOrderFilter = () => {
  const {state, dispatch} = useContext(BulkOrderContext)
  const {properties, methods} = useBulkOrder()

  // =================================================
  // SEARCH
  // =================================================
  const search = state.filter.search

  let searchTimeout
  const debounceSearchChange = useCallback(debounce((keyword) => {
  methods.fetchTable(
    generateQuery({...properties.queries, keyword: keyword.trim()}),
  )}, 500), [])
  const handleSearchChange = e => {
    const keyword = e.target.value || ''
    dispatch({
      type: bulkOrderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })

    clearTimeout(searchTimeout)

    if(keyword.trim().length > 0) debounceSearchChange(keyword)
  }

  // =================================================
  // SHIPPING PARTNER
  // =================================================
  const shippingPartner = state.filter.shippingPartner

  const handleShippingPartnerChange = data =>
    dispatch({
      type: bulkOrderActions.FILTER_SHIPPING_PARTNER_UPDATE,
      payload: {value: data},
    })

  const handleShippingPartnerKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const shippingPartnerListData = shippingPartner.listOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: bulkOrderActions.FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: shippingPartnerListData,
      },
    })
  }

  // =================================================
  // EMPLOYEE
  // =================================================
  const employee = state.filter.employee

  const handleEmployeeChange = data =>
    dispatch({
      type: bulkOrderActions.FILTER_EMPLOYEE_UPDATE,
      payload: {value: data},
    })

  const handleEmployeeKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const employeeListData = employee.listOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: bulkOrderActions.FILTER_EMPLOYEE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: employeeListData,
      },
    })
  }

  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const dateTime = state.filter.dateTime
  const minDate = getDateFromNow(-7, {type: 'start'})
  const maxDate = getDateFromNow(0, {type: 'end'})
  const allowRangeDate = allowedRange(minDate, maxDate)

  const handleDateTimeChange = data =>
    dispatch({
      type: bulkOrderActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[1],
        start: data.value[0],
        value: data.formatValue,
      },
    })

  // ==================================================================================================
  const [canFetchOriginFilter, setCanFetchOriginFilter] = useState(true)

  const canSubmitOtherFilter = [
    JSON.stringify(shippingPartner.activeValue) !==
      JSON.stringify(shippingPartner.value),
    JSON.stringify(employee.activeValue) !== JSON.stringify(employee.value),
    JSON.stringify(dateTime.activeValue.value) !==
      JSON.stringify(dateTime.value),
  ].includes(true)

  const shouldShowResetDefault = [
    JSON.stringify(shippingPartner.activeValue) !==
      JSON.stringify(shippingPartner.value),
    JSON.stringify(employee.activeValue) !== JSON.stringify(employee.value),
    JSON.stringify(dateTime.activeValue.value) !==
      JSON.stringify(bulkOrderInitialState.filter.dateTime.activeValue.value),
  ].includes(true)

  const otherFilterBadge = [
    !!shippingPartner.activeValue?.value,
    !!employee.activeValue?.value,
    !!dateTime.activeValue?.value,
  ].filter(item => item === true).length

  const isSearching = shouldShowResetDefault || !!search.value.trim()

  const handleFetchTableWithOtherFilter = () => {
    dispatch({type: bulkOrderActions.FILTER_OTHER_ACTIVE_VALUE_UPDATE})

    const dateTimeActiveValue = splitDateTimeRangeValue(
      state.filter.dateTime.value,
    )

    const q = generateQuery({
      ...properties.queries,
      shipping_partner: state.filter.shippingPartner.value?.value || '',
      user_id: state.filter.employee.value?.value || '',
      start_date: !!dateTimeActiveValue?.start ? convertDateTimeToApiFormat(dateTimeActiveValue.start) : '',
      end_date: !!dateTimeActiveValue?.end ? convertDateTimeToApiFormat(dateTimeActiveValue.end): '',
      start: 0,
    })

    methods.fetchTable(q)
  }

  const handleFetchOrigin = async () => {
    if (!canFetchOriginFilter) return
    setCanFetchOriginFilter(false)

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/users`),
      sendRequestAuth('get', `${config.API}/order/shipping/partner`),
    ])

    let checkResponse = true
    response.forEach(item => {
      if (!!!item?.data?.success) checkResponse = false
    })

    if (!checkResponse) return

    dispatch({
      type: bulkOrderActions.FILTER_ORIGIN_UPDATE,
      payload: {
        employee: {
          list: Array.isArray(response[0]?.data?.data)
            ? response[0].data.data.map(item => ({
                data: item,
                name: item?.fullname || '---',
                value: item?.user_id || '',
              }))
            : [],
        },
        shippingPartner: {
          list: Array.isArray(response[1]?.data?.data)
            ? response[1].data.data.map(item => ({
                data: item,
                name: item?.name || '---',
                value: item?.id || '',
              }))
            : [],
        },
      },
    })
  }

  const handleFilterTagDelete = type => {
    dispatch({
      type: bulkOrderActions.FILTER_TAG_DELETE,
      payload: {list: [type]},
    })

    let q = {...properties.queries}
    switch (type) {
      case 'shippingPartner':
        q = {...q, shipping_partner: ''}
        break
      case 'employee':
        q = {...q, user_id: ''}
        break
      case 'dateTime.current':
        q = {...q, start_date: '', end_date: ''}
        break
      default:
        break
    }
    const query = generateQuery(q)

    methods.fetchTable(query)
  }

  const handleAllFilterTagsDelete = () => {
    dispatch({
      type: bulkOrderActions.FILTER_TAG_DELETE,
      payload: {list: ['shippingPartner', 'employee', 'dateTime.current']},
    })

    const q = generateQuery({
      ...properties.queries,
      shipping_partner: '',
      user_id: '',
    })

    methods.fetchTable(q)
  }
  // ==================================================================================================

  return {
    dateTime: {
      data: dateTime,
      properties: {
        allowRangeDate,
      },
      methods: {
        onChange: handleDateTimeChange,
      },
    },
    employee: {
      data: employee,
      methods: {
        onChange: handleEmployeeChange,
        onKeywordChange: handleEmployeeKeywordChange,
      },
    },
    search: {
      data: search,
      methods: {
        onChange: handleSearchChange,
      },
    },
    shippingPartner: {
      data: shippingPartner,
      methods: {
        onChange: handleShippingPartnerChange,
        onKeywordChange: handleShippingPartnerKeywordChange,
      },
    },
    properties: {
      canSubmitOtherFilter,
      isSearching,
      shouldShowResetDefault,
      otherFilterBadge:
        otherFilterBadge > 0
          ? otherFilterBadge > 9
            ? '9+'
            : otherFilterBadge
          : undefined,
    },
    methods: {
      deleteAllFilterTags: handleAllFilterTagsDelete,
      deleteFilterTag: handleFilterTagDelete,
      fetchOrigin: handleFetchOrigin,
      fetchTableWithOtherFilter: handleFetchTableWithOtherFilter,
    },
  }
}

export default useBulkOrderFilter
