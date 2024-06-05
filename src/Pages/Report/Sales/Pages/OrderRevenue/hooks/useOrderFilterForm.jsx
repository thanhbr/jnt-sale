import { sendRequestAuth } from 'api/api'
import { removeAcent } from 'common/fieldText/_functions'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { OrderContext } from '../provider/_context'
import { formatDateTimeDefaultValue, orderActions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'
import { debounce } from '@mui/material'
import { orderInitialState } from 'Pages/Report/Sales/Pages/OrderRevenue/provider/_reducer'
import { useSearchParams } from 'react-router-dom'
import { transformDateTime } from '../utils/transform'
import { ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES } from '../../Overview/interfaces/_constants'

const useOrderFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pageState, pageDispatch } = useContext(OrderContext)
  const { filter, table } = pageState

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====

  const { afterToday } = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    querySearch ? '' : getDateFromNow(-7, { type: 'start' }),
    querySearch ? '' : getDateFromNow(0, { type: 'end' }),
  ]

  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeOption = filter.dateTime.option
  const dateTimeValue = filter.dateTime.value
  const dateTimeLabel = filter.dateTime.label
  const dateTimeTrigger = filter.dateTime.trigger

  const handleDateTimeChange = data => {
    const timeValue = transformDateTime({ value: data.value, type: dateTimeType })
    pageDispatch({
      type: orderActions.FILTER_DATE_TIME_VALUE_UPDATE,
      payload: {
        value: timeValue,
        label: data.label,
        active: data.value,
        start: convertDateTimeToApiFormat(timeValue.split(' - ')[0]),
        end: convertDateTimeToApiFormat(timeValue.split(' - ')[1])
      },
    })
  }

  const handleDateTimeDefault = type => {
    const dataDate = ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0].option[0]
    const timeValue = transformDateTime({ value: dataDate.value, type: type })
    pageDispatch({
      type: orderActions.FILTER_DATE_TIME_VALUE_UPDATE,
      payload: {
        value: timeValue,
        label: dataDate.label,
        active: dataDate.value,
        start: convertDateTimeToApiFormat(timeValue.split(' - ')[0]),
        end: convertDateTimeToApiFormat(timeValue.split(' - ')[1])
      },
    })
  }
  // ===== ===== ===== ===== =====
  // SHIPPING STATUS
  // ===== ===== ===== ===== =====
  const shippingStatusActiveValue = filter.shippingStatus.activeValue
  const shippingStatusKeyword = filter.shippingStatus.keyword
  const shippingStatusList = filter.shippingStatus.list
  const shippingStatusListOrigin = filter.shippingStatus.listOrigin
  const shippingStatusTab = filter.shippingStatus.tab
  const shippingStatusValue = filter.shippingStatus.value

  const handleShippingStatusChange = data => {
    const find = shippingStatusValue.find(item => item.value === data.value)
    const shippingStatusListData =
      shippingStatusTab === 'checked'
        ? shippingStatusValue.filter(item => item.value !== data.value)
        : shippingStatusList
    const shippingStatusValueData = find
      ? shippingStatusValue.filter(item => item.value !== data.value)
      : [...shippingStatusValue, data]

    pageDispatch({
      type: orderActions.FILTER_SHIPPING_STATUS_UPDATE,
      payload: {
        list: shippingStatusListData,
        value: shippingStatusValueData,
      },
    })
  }

  const handleShippingStatusKeywordChange = data => {
    const formatDataValue = data?.value.trim()
      ? removeAcent(data?.value.trim()?.toLowerCase())
      : ''

    const findList =
      shippingStatusTab === 'checked'
        ? shippingStatusValue
        : shippingStatusListOrigin

    const shippingStatusListData = findList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_SHIPPING_STATUS_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: shippingStatusListData,
      },
    })
  }

  const handleShippingStatusResetInput = () => {
    pageDispatch({
      type: orderActions.FILTER_SHIPPING_STATUS_UPDATE,
      payload: {
        list: shippingStatusListOrigin,
        value: [],
      },
    })
  }

  const handleShippingStatusTabChange = tab => {
    const formatDataValue = shippingStatusKeyword
      ? removeAcent(shippingStatusKeyword?.toLowerCase())
      : ''

    const shippingStatusListData = shippingStatusListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_SHIPPING_STATUS_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? shippingStatusValue : shippingStatusListData,
        tab,
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ,
    JSON.stringify(shippingStatusActiveValue) !==
    JSON.stringify(shippingStatusValue),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    Array.isArray(shippingStatusActiveValue) &&
    shippingStatusActiveValue.length > 0,
  ].filter(item => item === true).length

  const queries = {
    keyword: searchValue.trim() || '',
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
        : '',
    shipping_status: Array.isArray(shippingStatusActiveValue)
      ? shippingStatusActiveValue.map(item => item?.value).join(',')
      : '',
    per_page: table.pagination.amount || 20,
    start: 0,
  }

  const debounceSearchChange = useCallback(debounce((keyword, queries) => {
    fetchOrderByFilter({ ...queries, keyword: keyword.trim() }, { forceLoading: true },)
  }, 500), [])
  const handleSearchChange = (e, queries) => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: { value: keyword },
    })
    debounceSearchChange(keyword, queries)
  }

  const applyOrderOtherFilter = async () => {
    const collection = {
      ...queries,
      start_date:
        dateTimeStart && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[0])
          : '',
      end_date:
        dateTimeEnd && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[1])
          : '',
      shipping_status: Array.isArray(shippingStatusValue)
        ? shippingStatusValue.map(item => item?.value).join(',')
        : '',
    }

    fetchOrderByFilter(collection, { forceLoading: true })
  }

  const fetchOrderByFilter = async (qs, opt) => {
    setSearchParams('')
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: true } } },
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/report/sales/order-report${queryString}`),
      sendRequestAuth('get', `${config.API}/report/sales/order-total-report${queryString}`)
    ])

    if (!!response[0]?.data?.success && !!response[1]?.data?.success) {
      pageDispatch({
        type: orderActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
          },
          panels: {
            orderTotal: response[1]?.data?.data?.total_order || 0,
            orderRevenue: response[1]?.data?.data?.total_revenue || 0,
            orderProfit: response[1]?.data?.data?.total_profit || 0,
          },
          pagination: {
            active: opt?.activePage || 0,
            amount: table.pagination.amount,
            total: response[1]?.data?.data?.total_order
              ? Math.ceil(
                response[1]?.data?.data?.total_order / table.pagination.amount,
              )
              : 0,
            totalItems: response[1]?.data?.data?.total_order || 0,
          },
        },
      })
    }

    if (!!!opt?.notClearDetail)
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })

    pageDispatch({
      type: orderActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: { id: null },
    })
  }

  const filterTagDelete = t => {
    pageDispatch({
      type: orderActions.TAG_FILTER_DELETE,
      payload: { type: t, isSingle: true },
    })

    let tmpCollection = {}
    switch (t) {
      case 'dateTime.current':
        tmpCollection = {
          ...tmpCollection,
          date_type: '',
          start_date: '',
          end_date: '',
        }

        pageDispatch({
          type: orderActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          payload: { trigger: null },
        })

        break

      case ORDER_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break

      case ORDER_FILTER_TAG_FIELDS[1]:
        tmpCollection = { ...tmpCollection, shipping_status: '' }
        break
      default:
        break
    }

    const collection = { ...queries, ...tmpCollection }

    fetchOrderByFilter(collection, { forceLoading: true })
  }

  const filterTagDeleteAll = isSoft => {
    ORDER_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: orderActions.TAG_FILTER_DELETE,
        payload: { type: item },
      }),
    )

    pageDispatch({
      type: orderActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
      payload: {
        trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
      },
    })

    if (isSoft) return

    const date = formatDateTimeDefaultValue.split(' - ')

    const collection = {
      ...queries,
      start_date: convertDateTimeToApiFormat(date[0]),
      end_date: convertDateTimeToApiFormat(date[1]),
      shipping_status: '',
    }

    fetchOrderByFilter(collection, { forceLoading: true })
  }

  const refresh = () => {
    fetchOrderByFilter(
      {
        ...queries,
        date_type: 'created',
        start_date: convertDateTimeToApiFormat(
          formatDateTimeDefaultValue.split(' - ')[0],
        ),
        end_date: convertDateTimeToApiFormat(
          formatDateTimeDefaultValue.split(' - ')[1],
        ),
        shipping_status: '',
        per_page: 20,
        start: 0,
      },
      { activePage: table.pagination.active, forceLoading: true },
    )
  }

  return {
    pageState,
    badge: {
      others: otherFilterBadge,
    },
    dateTime: {
      activeValue: dateTimeActiveValue,
      defaultValue: dateTimeDefaultValue,
      disabledDate: afterToday(),
      triggerDefault: dateTimeTrigger,
      value: dateTimeValue,
      active: filter.dateTime.active,
      type: dateTimeType,
      label: dateTimeLabel,
      option: dateTimeOption,
      onChange: handleDateTimeChange,
      onReset: handleDateTimeDefault
    },
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    shippingStatus: {
      activeValue: shippingStatusActiveValue,
      keyword: shippingStatusKeyword,
      list: shippingStatusList,
      tab: shippingStatusTab,
      value: shippingStatusValue,
      onChange: handleShippingStatusChange,
      onInputReset: handleShippingStatusResetInput,
      onKeywordChange: handleShippingStatusKeywordChange,
      onTabChange: handleShippingStatusTabChange,
    },
    canSubmitOtherFilter,
    queries,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
        JSON.stringify(orderInitialState.filter.dateTime.activeValue),
        Array.isArray(shippingStatusActiveValue) &&
        shippingStatusActiveValue.length > 0,
      ].includes(true),
      applyOrderOtherFilter,
      refresh: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, forceLoading: true },
        ),
      fetchOrderWithCurrentFilter: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active },
        ),
      fetchUpdateData: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, notClearDetail: true },
        ),
      filterTagDelete,
      filterTagDeleteAll,
    },
  }
}

export default useOrderFilterForm
