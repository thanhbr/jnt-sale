import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { ProductRevenueContext } from '../provider/_context'
import { formatDateTimeDefaultValue, orderActions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const useProductRevenueFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pageState, pageDispatch } = useContext(ProductRevenueContext)
  const { filter, table } = pageState

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

  const debounceSearchChange = useCallback(debounce((keyword, queries) => {
    fetchProductRevenueByFilter({...queries, keyword: keyword.trim()}, { forceLoading: true },)
  }, 500), [])
  const handleSearchChange = (e, queries) => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ' ') || ''
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    debounceSearchChange(keyword, queries)
  }
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

  // SORT BY

  const sortBy = filter.sortBy.value

  const handleSortByChange = data => {
    pageDispatch({
      type: orderActions.UPDATE_SORT_BY,
      payload: data,
    })
    fetchProductRevenueByFilter(
      { ...queries, sort_by: data.value },
      { forceLoading: true },
    )
  }

  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
  ].filter(item => item === true).length

  const queries = {
    keyword: searchValue.trim() || '',
    date_type: dateTimeActiveValue?.type?.value || 'sended',
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
        : '',
    per_page: 200,
    start: 0,
    sort_by: sortBy || 'revenue_before_discount'
  }

  const applyProductRevenueOtherFilter = async () => {
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
    }

    fetchProductRevenueByFilter(collection, { forceLoading: true })
  }

  const fetchProductRevenueByFilter = async (qs, opt) => {
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
      sendRequestAuth('get', `${config.API}/report/sales/product-sales-report${queryString}`),
      // sendRequestAuth('get', `${config.API}/order/delivery-total${queryString}`),
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
          topProduct: response[0].data.data.slice(0, 3),
          total: response[0].data?.meta
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
          type: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
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

    fetchProductRevenueByFilter(collection, { forceLoading: true })
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
      date_type: 'created',
      start_date: convertDateTimeToApiFormat(date[0]),
      end_date: convertDateTimeToApiFormat(date[1]),
      order_origin_id: '',
    }

    fetchProductRevenueByFilter(collection, { forceLoading: true })
  }

  return {
    pageState,
    badge: {
      others: otherFilterBadge,
    },
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    dateTime: {
      activeValue: dateTimeActiveValue,
      defaultValue: dateTimeDefaultValue,
      disabledDate: afterToday(),
      triggerDefault: dateTimeTrigger,
      value: dateTimeValue,
      onChange: handleDateTimeChange,
    },
    sortBy: {
      value: sortBy,
      onchange: handleSortByChange,
    },
    canSubmitOtherFilter,
    queries,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
        JSON.stringify(pageState.filter.dateTime.activeValue),
      ].includes(true),
      applyProductRevenueOtherFilter,
      refresh: () =>
        fetchProductRevenueByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, forceLoading: true },
        ),
      fetchProductRevenueWithCurrentFilter: () =>
        fetchProductRevenueByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active },
        ),
      fetchUpdateData: () =>
        fetchProductRevenueByFilter(
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

export default useProductRevenueFilterForm
