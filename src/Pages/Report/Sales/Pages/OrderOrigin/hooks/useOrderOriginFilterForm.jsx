import { sendRequestAuth } from 'api/api'
import { removeAcent } from 'common/fieldText/_functions'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { OrderOriginContext } from '../provider/_context'
import { formatDateTimeDefaultValue, orderActions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'
import { debounce } from '@mui/material'

const useOrderOriginFilterForm = () => {
  const { pageState, pageDispatch } = useContext(OrderOriginContext)
  const { filter, table } = pageState

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const { afterToday } = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [getDateFromNow(-7, { type: 'start' }), getDateFromNow(0, { type: 'end' })]
  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeValue = filter.dateTime.value
  const dateTimeTrigger = filter.dateTime.trigger

  const handleDateTimeChange = data =>
    pageDispatch({
      type: orderActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[1],
        start: data.value[0],
        type: data.category,
        value: data.formatValue,
      },
    })

  // ===== ===== ===== ===== =====
  // SOURCE
  // ===== ===== ===== ===== =====
  const sourceActiveValue = filter.source.activeValue
  const sourceKeyword = filter.source.keyword
  const sourceList = filter.source.list
  const sourceListOrigin = filter.source.listOrigin
  const sourceValue = filter.source.value

  const handleSourceChange = data =>
    pageDispatch({
      type: orderActions.FILTER_SOURCE_UPDATE,
      payload: { value: data },
    })

  const handleSourceKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const sourceListData = sourceListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_SOURCE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: sourceListData,
      },
    })
  }

  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(sourceActiveValue) !== JSON.stringify(sourceValue),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!sourceActiveValue?.value,
  ].filter(item => item === true).length

  const queries = {
    date_type: dateTimeActiveValue?.type?.value || '',
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
        : '',
    order_origin_id: sourceActiveValue?.value || '',
    per_page: 200,
    start: 0,
  }

  const applyOrderOriginOtherFilter = async () => {
    const collection = {
      ...queries,
      date_type: dateTimeType?.value || '',
      start_date:
        dateTimeStart && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[0])
          : '',
      end_date:
        dateTimeEnd && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[1])
          : '',
      order_origin_id: sourceValue?.value || '',
    }

    fetchOrderOriginByFilter(collection, { forceLoading: true })
  }

  const fetchOrderOriginByFilter = async (qs, opt) => {
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'SET_LOADING',
        payload: false,
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/report/sales/order-origin-sales-report${queryString}`),
      sendRequestAuth('get', `${config.API}/report/sales/order-origin-total-sales-report${queryString}`),
    ])

    if (response[0]?.status === 200) {
      pageDispatch({
        type: orderActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
          },
          panels: response[1]?.data?.data
        },
      })
    }

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'SET_LOADING',
        payload: true,
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
        tmpCollection = { ...tmpCollection, order_origin_id: '' }
        break
      default:
        break
    }

    const collection = { ...queries, ...tmpCollection }

    fetchOrderOriginByFilter(collection, { forceLoading: true })
  }

  const filterTagDeleteAll = isSoft => {
    ORDER_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: orderActions.TAG_FILTER_DELETE,
        payload: { type: item },
      }),
    )

    pageDispatch({
      type: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
      payload: {
        trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
      },
    })

    if (isSoft) return

    const date = formatDateTimeDefaultValue.split(' - ')

    const collection = {
      ...queries,
      date_type: 'received',
      start_date: convertDateTimeToApiFormat(date[0]),
      end_date: convertDateTimeToApiFormat(date[1]),
      order_origin_id: '',
    }

    fetchOrderOriginByFilter(collection, { forceLoading: true })
  }

  // ===== ===== ===== ===== =====
  // STATISTIC
  // ===== ===== ===== ===== =====

  const sortBy = filter.sortBy.value

  const handleSortByChange = data => {
    const sortByValue = data

    pageDispatch({
      type: orderActions.FILTER_SORTBY_UPDATE,
      payload: sortByValue,
    })

    fetchOrderOriginByFilter({
      ...queries,
      sort_by: sortByValue
    },{ forceLoading: true })
  }

  return {
    badge: {
      others: otherFilterBadge,
    },
    pageState,
    dateTime: {
      activeValue: dateTimeActiveValue,
      defaultValue: dateTimeDefaultValue,
      disabledDate: afterToday(),
      triggerDefault: dateTimeTrigger,
      value: dateTimeValue,
      onChange: handleDateTimeChange,
    },
    source: {
      activeValue: sourceActiveValue,
      keyword: sourceKeyword,
      list: sourceList,
      value: sourceValue,
      onChange: handleSourceChange,
      onKeywordChange: handleSourceKeywordChange,
    },
    sortBy: {
      value: sortBy,
      onChange: handleSortByChange
    },
    canSubmitOtherFilter,
    queries,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
        JSON.stringify(pageState.filter.dateTime.activeValue),
        !!sourceActiveValue?.name,
      ].includes(true),
      applyOrderOriginOtherFilter,
      refresh: () =>
        fetchOrderOriginByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, forceLoading: true },
        ),
      fetchOrderOriginWithCurrentFilter: () =>
        fetchOrderOriginByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active },
        ),
      fetchUpdateData: () =>
        fetchOrderOriginByFilter(
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

export default useOrderOriginFilterForm
