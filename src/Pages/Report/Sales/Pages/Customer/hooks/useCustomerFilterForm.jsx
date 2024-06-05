import { sendRequestAuth } from 'api/api'
import { removeAcent } from 'common/fieldText/_functions'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { CustomerContext } from '../provider/_context'
import { formatDateTimeDefaultValue, orderActions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'
import { debounce } from '@mui/material'

const useCustomerFilterForm = () => {
  const { pageState, pageDispatch } = useContext(CustomerContext)
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
  // LOCATION
  // ===== ===== ===== ===== =====
  const locationActiveValue = filter.location.activeValue
  const locationCategoryValue = filter.location.type.value
  const locationKeyword = filter.location.keyword
  const locationList = filter.location.list
  const locationListOrigin = filter.location.listOrigin
  const locationTab = filter.location.tab
  const locationValue = filter.location.value
  const handleLocationChange = data => {
    const find = locationValue.find(item => item.value === data.value)
    const locationListData =
      locationTab === 'checked'
        ? locationValue.filter(item => item.value !== data.value)
        : locationList
    const locationValueData = find
      ? locationValue.filter(item => item.value !== data.value)
      : [...locationValue, {name: data.name, value: data.value}]

    pageDispatch({
      type: orderActions.FILTER_LOCATION_UPDATE,
      payload: {
        list: locationListData,
        value: locationValueData,
      },
    })
  }

  const handleLocationKeywordChange = data => {
    let foundCustomerId = data?.id
    if (!foundCustomerId) {
      const foundCustomer = locationListOrigin.find(
        item => item.name === data?.value.trim(),
      )
      foundCustomerId = foundCustomer?.value || ''
    }

    const formatDataValue = data?.value
      ? removeAcent(data?.value?.trim()?.toLowerCase())
      : ''
    const locationListData = locationListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (
        formatNameItem.includes(formatDataValue) &&
        (data.category.value !== ''
          ? item.groups.includes(data.category.value)
          : true)
      )
        return true
      return false
    })

    if (data?.category?.value !== locationCategoryValue?.value) {
      pageDispatch({
        type: orderActions.FILTER_LOCATION_CATEGORY_UPDATE,
        payload: {
          list: locationListData,
          type: {value: data?.category},
        },
      })
      return
    }

    pageDispatch({
      type: orderActions.FILTER_LOCATION_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value,
        list: locationListData,
        type: {
          value: data?.category || filter.location.type.value,
        },
      },
    })
  }

  const handleLocationResetInput = () => {
    pageDispatch({
      type: orderActions.FILTER_LOCATION_UPDATE,
      payload: {
        list: locationListOrigin,
        value: [],
      },
    })
  }

  const handleLocationTabChange = tab => {
    const formatDataValue = locationKeyword
      ? removeAcent(locationKeyword?.toLowerCase())
      : ''

    const locationListData = locationListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_LOCATION_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? locationValue : locationListData,
        tab,
      },
    })
  }


// ===== ===== ===== ===== =====
  // SORT
  // ===== ===== ===== ===== =====

  const sortBy = filter.sortBy
  const sortType = filter.sortType

  const handleSortByChange = (data, type) => {
    const sortByValue = data

    pageDispatch({
      type: orderActions.FILTER_SORTBY_UPDATE,
      payload: sortByValue,
    })
    pageDispatch({
      type: orderActions.FILTER_SORT_TYPE_UPDATE,
      payload: type,
    })

    fetchCustomerByFilter({
      ...queries,
      sort_by: sortByValue,
      sort_type: type
    }, { forceLoading: true })
  }

  //// --- TOP EMPLOYEE

  const topEmployee = pageState.filter.top

  const handleTopEmployeeChange = (data) => {
    pageDispatch({
      type: orderActions.FILTER_UPDATE_TOP,
      payload: data
    })
    fetchCustomerByFilter({...queries,top: data.value}, { forceLoading: true })
  }




  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(locationActiveValue.value) !== JSON.stringify(locationValue)
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!locationActiveValue?.value,
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
    city_id: Array.isArray(locationValue)
      ? locationValue.map(item => item?.value).join(',')
      : '',
    sort_by: sortBy?.value || 'total_orders',
    sort_type: sortType?.value || 4,
    top: topEmployee?.value || 10,
    per_page: 200,
    start: 0,
  }

  const applyCustomerOtherFilter = async () => {
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
    }

    fetchCustomerByFilter(collection, { forceLoading: true })
  }

  const fetchCustomerByFilter = async (qs, opt) => {
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
      sendRequestAuth('get', `${config.API}/report/sales/customer-sales-report${queryString}`),
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
        tmpCollection = { ...tmpCollection, city_id: '' }
        break
      default:
        break
    }

    const collection = { ...queries, ...tmpCollection }
    fetchCustomerByFilter(collection, { forceLoading: true })
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
      city_id: '',
    }

    fetchCustomerByFilter(collection, { forceLoading: true })
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
      onChange: handleDateTimeChange,
    },
    sortBy: {
      value: sortBy.value,
      onChange: handleSortByChange
    },
    sortType: sortType.value,
    topEmployee: {
      ...topEmployee,
      onchange: handleTopEmployeeChange
    },
    location: {
      activeValue: locationActiveValue,
      categoryValue: locationCategoryValue,
      keyword: locationKeyword,
      list: locationList,
      tab: locationTab,
      value: locationValue,
      onChange: handleLocationChange,
      onInputReset: handleLocationResetInput,
      onKeywordChange: handleLocationKeywordChange,
      onTabChange: handleLocationTabChange,
    },
    canSubmitOtherFilter,
    queries,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
        JSON.stringify(pageState.filter.dateTime.activeValue),
        !!locationActiveValue?.name,
      ].includes(true),
      applyCustomerOtherFilter,
      refresh: () =>
        fetchCustomerByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, forceLoading: true },
        ),
      fetchUpdateData: () =>
        fetchCustomerByFilter(
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

export default useCustomerFilterForm
