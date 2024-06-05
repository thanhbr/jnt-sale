import { sendRequestAuth } from 'api/api'
import { removeAcent } from 'common/fieldText/_functions'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import {
  SHIPPING_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { ShippingDifferenceContext } from '../provider/_context'
import { formatDateTimeDefaultValue, shippingActions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const useShippingDifferenceEmployeeFilterForm = () => {
  const { pageState, pageDispatch } = useContext(ShippingDifferenceContext)
  const { filter, table } = pageState

  const [searchParams, setSearchParams] = useSearchParams()

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

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
      type: shippingActions.FILTER_DATE_TIME_UPDATE,
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
      type: shippingActions.FILTER_SOURCE_UPDATE,
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
      type: shippingActions.FILTER_SOURCE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: sourceListData,
      },
    })
  }

  // ===== ===== ===== ===== =====
  // EMPLOYEE
  // ===== ===== ===== ===== =====
  const employeeActiveValue = filter.employee.activeValue
  const employeeCategoryList = filter.employee.type.list
  const employeeCategoryValue = filter.employee.type.value
  const employeeKeyword = filter.employee.keyword
  const employeeList = filter.employee.list
  const employeeListOrigin = filter.employee.listOrigin
  const employeeTab = filter.employee.tab
  const employeeValue = filter.employee.value

  const handleEmployeeChange = data => {
    const find = employeeValue.find(item => item.value === data.id)
    const employeeListData =
      employeeTab === 'checked'
        ? employeeValue.filter(item => item.value !== data.id)
        : employeeList
    const employeeValueData = find
      ? employeeValue.filter(item => item.value !== data.id)
      : [...employeeValue, { name: data.value, value: data.id }]

    pageDispatch({
      type: shippingActions.FILTER_EMPLOYEE_UPDATE,
      payload: {
        list: employeeListData,
        value: employeeValueData,
      },
    })
  }

  const handleEmployeeKeywordChange = data => {
    let foundEmployeeId = data?.id
    if (!foundEmployeeId) {
      const foundEmployee = employeeListOrigin.find(
        item => item.name === data?.value.trim(),
      )
      foundEmployeeId = foundEmployee?.value || ''
    }

    const formatDataValue = data?.value
      ? removeAcent(data?.value?.trim()?.toLowerCase())
      : ''
    const employeeListData = employeeListOrigin.filter(item => {
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

    if (data?.category?.value !== employeeCategoryValue?.value) {
      pageDispatch({
        type: shippingActions.FILTER_EMPLOYEE_CATEGORY_UPDATE,
        payload: {
          list: employeeListData,
          type: { value: data?.category },
        },
      })
      return
    }

    pageDispatch({
      type: shippingActions.FILTER_EMPLOYEE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value,
        list: employeeListData,
        type: {
          value: data?.category || filter.employee.type.value,
        },
      },
    })
  }

  const handleEmployeeResetInput = () => {
    pageDispatch({
      type: shippingActions.FILTER_EMPLOYEE_UPDATE,
      payload: {
        list: employeeListOrigin,
        value: [],
      },
    })
  }

  const handleEmployeeTabChange = tab => {
    const formatDataValue = employeeKeyword
      ? removeAcent(employeeKeyword?.toLowerCase())
      : ''

    const employeeListData = employeeListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: shippingActions.FILTER_EMPLOYEE_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? employeeValue : employeeListData,
        tab,
      },
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // SHIPPING PARTNER
  // ===== ===== ===== ===== =====
  const shippingPartnerActiveValue = filter.shippingPartner.activeValue
  const shippingPartnerKeyword = filter.shippingPartner.keyword
  const shippingPartnerList = filter.shippingPartner.list
  const shippingPartnerListOrigin = filter.shippingPartner.listOrigin
  const shippingPartnerValue = filter.shippingPartner.value

  const handleShippingPartnerChange = data =>
    pageDispatch({
      type: shippingActions.FILTER_SHIPPING_PARTNER_UPDATE,
      payload: { value: data },
    })

  const handleShippingPartnerKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const shippingPartnerListData = shippingPartnerListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: shippingActions.FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: shippingPartnerListData,
      },
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(employeeActiveValue.value) !== JSON.stringify(employeeValue) ||
    JSON.stringify(employeeActiveValue.type) !== JSON.stringify(employeeCategoryValue),
    JSON.stringify(shippingPartnerActiveValue) !== JSON.stringify(shippingPartnerValue),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    Array.isArray(employeeActiveValue?.value) &&
    employeeActiveValue.value.length > 0,
    !!shippingPartnerActiveValue?.value,
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
    staff_id: Array.isArray(employeeValue)
      ? employeeValue.map(item => item?.value).join(',')
      : 0,
    shipping_partner: shippingPartnerValue?.value || '',
  }

  const applyShippingDifferenceOtherFilter = async () => {
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
      staff_id: Array.isArray(employeeValue)
        ? employeeValue.map(item => item?.value).join(',')
        : 0,
      shipping_partner: shippingPartnerValue?.value || '',
    }

    fetchShippingDifferenceByFilter(collection, { forceLoading: true })
  }

  const fetchShippingDifferenceByFilter = async (qs, opt) => {
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
      sendRequestAuth('get', `${config.API}/report/sales/fee/staffs${queryString}`),
    ])

    if (response[0]?.status === 200) {
      pageDispatch({
        type: shippingActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
          },
          panels: response[0]?.data?.meta
        },
      })
    }

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'SET_LOADING',
        payload: true,
      })
  }

  const debounceOrderByFilter = useCallback(debounce((keyword, queries) => {
    fetchShippingDifferenceByFilter(
      { ...queries, keyword: keyword.trim() },
      { forceLoading: true },
    )
  }, 500), [])

  const handleSearchChange = e => {
    if (e.target.value === ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: shippingActions.FILTER_SEARCH_UPDATE,
      payload: { value: keyword },
    })
    debounceOrderByFilter(keyword.trim().split(' ').join(','), queries)
    // if(keyword.trim().length > 0) debounceOrderByFilter(keyword.trim().split(' ').join(','))
  }
  const filterTagDelete = t => {
    pageDispatch({
      type: shippingActions.TAG_FILTER_DELETE,
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
          type: shippingActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          payload: { trigger: null },
        })

        break

      case SHIPPING_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break

      case SHIPPING_FILTER_TAG_FIELDS[1]:
        tmpCollection = { ...tmpCollection, staff_id: '' }
        break

      case SHIPPING_FILTER_TAG_FIELDS[2]:
        tmpCollection = { ...tmpCollection, shipping_partner: '' }
        break
      default:
        break
    }

    const collection = { ...queries, ...tmpCollection }

    fetchShippingDifferenceByFilter(collection, { forceLoading: true })
  }

  const filterTagDeleteAll = isSoft => {
    SHIPPING_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: shippingActions.TAG_FILTER_DELETE,
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
      date_type: 'sended',
      start_date: convertDateTimeToApiFormat(date[0]),
      end_date: convertDateTimeToApiFormat(date[1]),
      shipping_partner: '',
      staff_id: '',
    }

    fetchShippingDifferenceByFilter(collection, { forceLoading: true })
  }
  const viewPage = pageState.view

  const handleViewPageChange = data => {
    pageDispatch({
      type: shippingActions.FILTER_VIEW_PAGE_UPDATE,
      payload: data,
    })
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
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    employee: {
      activeValue: employeeActiveValue,
      categoryList: employeeCategoryList,
      categoryValue: employeeCategoryValue,
      keyword: employeeKeyword,
      list: employeeList,
      tab: employeeTab,
      value: employeeValue,
      onChange: handleEmployeeChange,
      onInputReset: handleEmployeeResetInput,
      onKeywordChange: handleEmployeeKeywordChange,
      onTabChange: handleEmployeeTabChange,
    },
    shippingPartner: {
      activeValue: shippingPartnerActiveValue,
      keyword: shippingPartnerKeyword,
      list: shippingPartnerList,
      value: shippingPartnerValue,
      onChange: handleShippingPartnerChange,
      onKeywordChange: handleShippingPartnerKeywordChange,
    },
    source: {
      activeValue: sourceActiveValue,
      keyword: sourceKeyword,
      list: sourceList,
      value: sourceValue,
      onChange: handleSourceChange,
      onKeywordChange: handleSourceKeywordChange,
    },
    view: {
      type: viewPage,
      onChange: handleViewPageChange
    },
    canSubmitOtherFilter,
    queries,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
        JSON.stringify(pageState.filter.dateTime.activeValue),
        !!sourceActiveValue?.name,
      ].includes(true),
      applyShippingDifferenceOtherFilter,
      refresh: () =>
        fetchShippingDifferenceByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, forceLoading: true },
        ),
      fetchShippingDifferenceWithCurrentFilter: () =>
        fetchShippingDifferenceByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active },
        ),
      fetchUpdateData: () =>
        fetchShippingDifferenceByFilter(
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

export default useShippingDifferenceEmployeeFilterForm
