import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,EMPLOYEE_TABLE_THEAD_STATISTIC_FILTER_LIST
} from '../interfaces/_constants'
import {EmployeeContext} from '../provider/_context'
import {formatDateTimeDefaultValue, orderActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const useEmployeeFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(EmployeeContext)
  const {filter, table} = pageState

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // ADVANCED SEARCH
  // ===== ===== ===== ===== =====
  const advancedSearchCustomer = filter.advancedSearch.customer

  const advanedSearchBadge =
    !!advancedSearchCustomer.keyword

  const handleAdvancedSearchChange = (val, id) => {
    pageDispatch({
      type: orderActions.FILTER_ADVANCED_SEARCH_UPDATE,
      payload: {
        customer: {keyword: val, value: val ? null : ''},
        liveVideoId: id,
      },
    })

    // if val exist -> search cumstomer id then fetch order
    // if (val.trim()) fetchCustomer(val.trim(), id)
    // else fecth order with empty value
    // else
    fetchEmployeeByFilter(
      {
        ...queries,
        keyword_customer: val.trim(),
        customer_id: '',
      },
      {forceLoading: true},
    )
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const {afterToday} = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    querySearch ? '' : getDateFromNow(-7, {type: 'start'}),
    querySearch ? '' : getDateFromNow(0, {type: 'end'}),
  ]
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

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

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
      : [...employeeValue, {name: data.value, value: data.id}]

    pageDispatch({
      type: orderActions.FILTER_EMPLOYEE_UPDATE,
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
        type: orderActions.FILTER_EMPLOYEE_CATEGORY_UPDATE,
        payload: {
          list: employeeListData,
          type: {value: data?.category},
        },
      })
      return
    }

    pageDispatch({
      type: orderActions.FILTER_EMPLOYEE_KEYWORD_UPDATE,
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
      type: orderActions.FILTER_EMPLOYEE_UPDATE,
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
      type: orderActions.FILTER_EMPLOYEE_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? employeeValue : employeeListData,
        tab,
      },
    })
  }


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
      type: orderActions.FILTER_SHIPPING_PARTNER_UPDATE,
      payload: {value: data},
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
      type: orderActions.FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: shippingPartnerListData,
      },
    })
  }


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
      payload: {value: data},
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
    JSON.stringify(employeeActiveValue.value) !==
    JSON.stringify(employeeValue) ||
    JSON.stringify(employeeActiveValue.type) !==
    JSON.stringify(employeeCategoryValue),
    JSON.stringify(shippingPartnerActiveValue) !==
    JSON.stringify(shippingPartnerValue),
    JSON.stringify(sourceActiveValue) !== JSON.stringify(sourceValue),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    Array.isArray(employeeActiveValue?.value) &&
    employeeActiveValue.value.length > 0,
    !!shippingPartnerActiveValue?.value,
    !!sourceActiveValue?.value,
  ].filter(item => item === true).length

  const queries = {
    keyword: searchValue.trim() || '',
    date_type: dateTimeActiveValue?.type?.value || '',
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
        : '',
    keyword_customer: advancedSearchCustomer.keyword.trim(),
    customer_id: advancedSearchCustomer.value || '',
    staff_id: Array.isArray(employeeActiveValue?.value)
      ? employeeActiveValue.value.map(item => item?.value).join(',')
      : '',
    group_user: employeeActiveValue?.type?.value || '',
    shipping_partner: shippingPartnerActiveValue?.value || '',
    order_origin_id: sourceActiveValue?.value || '',
    per_page: 50,
    start: 0,
  }


  const debounceEmployeeByFilter = useCallback(debounce((keyword, queries) => {
    fetchEmployeeByFilter({...queries, keyword: keyword.trim()}, { forceLoading: true },)
  }, 500), [])

  const handleSearchChange = (e, queries) => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ' ') || ''
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    debounceEmployeeByFilter(keyword, queries)
  }

  const applyEmployeeOtherFilter = async () => {
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
        : '',
      group_user: employeeCategoryValue?.value || '',
      shipping_partner: shippingPartnerValue?.value || '',
      order_origin_id: sourceValue?.value || '',
    }

    fetchEmployeeByFilter(collection, {forceLoading: true})
  }

  const fetchEmployeeByFilter = async (qs, opt) => {
    setSearchParams('')
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
      sendRequestAuth('get', `${config.API}/report/sales/staff-sales-report${queryString}`),
      sendRequestAuth('get',`${config.API}/report/sales/staff-total-sales-report${queryString}`)
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
      payload: {type: t, isSingle: true},
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
          payload: {trigger: null},
        })

        break

      case ORDER_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break

      case ORDER_FILTER_TAG_FIELDS[4]:
        tmpCollection = {
          ...tmpCollection,
          group_user: ''
        }
        break

      case ORDER_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, staff_id: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, shipping_partner: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, order_origin_id: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchEmployeeByFilter(collection, {forceLoading: true})
  }

  const filterTagDeleteAll = isSoft => {
    ORDER_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: orderActions.TAG_FILTER_DELETE,
        payload: {type: item},
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
      date_type: 'created',
      start_date: convertDateTimeToApiFormat(date[0]),
      end_date: convertDateTimeToApiFormat(date[1]),
      staff_id: '',
      shipping_partner: '',
      order_origin_id: '',
      per_page: 50,
    }

    fetchEmployeeByFilter(collection, {forceLoading: true})
  }

  const refresh = () => {
    fetchEmployeeByFilter(
      {
        ...queries,
        date_type: 'created',
        start_date: convertDateTimeToApiFormat(
          formatDateTimeDefaultValue.split(' - ')[0],
        ),
        end_date: convertDateTimeToApiFormat(
          formatDateTimeDefaultValue.split(' - ')[1],
        ),
        staff_id: '',
        shipping_partner: '',
        order_origin_id: '',
        per_page: 50,
        start: 0,
      },
      {activePage: table.pagination.active, forceLoading: true},
    )
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

    fetchEmployeeByFilter({
      ...queries,
      sort_by: sortByValue
    },{ forceLoading: true })
  }

  return {
    pageState,
    advancedSearch: {
      customer: {keyword: advancedSearchCustomer.keyword},
      onChange: handleAdvancedSearchChange,
    },
    badge: {
      advanced: advanedSearchBadge,
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
      value: sortBy,
      onChange: handleSortByChange
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
    search: {
      value: searchValue,
      onChange: handleSearchChange,
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
    canSubmitOtherFilter,
    queries,
    refresh,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
        JSON.stringify(pageState.filter.dateTime.activeValue),
        Array.isArray(employeeActiveValue?.value) &&
        employeeActiveValue.value.length > 0 &&
        !!employeeActiveValue?.type?.name,
        !!shippingPartnerActiveValue?.name,
        !!sourceActiveValue?.name,
      ].includes(true),
      applyEmployeeOtherFilter,
      refresh: () =>
        fetchEmployeeByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active, forceLoading: true},
        ),
      fetchEmployeeWithCurrentFilter: () =>
        fetchEmployeeByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active},
        ),
      fetchUpdateData: () =>
        fetchEmployeeByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active, notClearDetail: true},
        ),
      filterTagDelete,
      filterTagDeleteAll,
    },
  }
}

export default useEmployeeFilterForm
