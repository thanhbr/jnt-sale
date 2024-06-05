import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import {CodContext} from '../provider/_context'
import {orderActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import {formatDateTimeDefaultValue} from '../provider/_reducer'
import {NULL} from 'sass'
import {da} from 'react-date-range/dist/locale'
import {fNumber} from '../../../util/formatNumber'
import {useTranslation} from "react-i18next";

const CodFilterForm = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(CodContext)
  const {filter, table} = pageState
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value.replaceAll(' ', ',')

  let searchTimeout
  const handleSearchChange = e => { 
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replaceAll(' ', ',') || ''
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })

    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(
      () =>
        (!!keyword.trim() || keyword === '') &&
        fetchDeliveryByFilter({...queries, keyword: keyword.trim()}),
      1000,
    )
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // ADVANCED SEARCH
  // ===== ===== ===== ===== =====
  const advancedSearchCustomer = filter.advancedSearch.customer
  const advancedSearchItemDetails = filter.advancedSearch.itemDetails

  const advanedSearchBadge =
    !!advancedSearchCustomer.keyword || !!advancedSearchItemDetails

  const handleAdvancedSearchChange = (val, id) => {
    pageDispatch({
      type: orderActions.FILTER_ADVANCED_SEARCH_UPDATE,
      payload: {
        customer: {keyword: val, value: val ? null : ''},
        itemDetails: id,
      },
    })
    fetchDeliveryByFilter({
      ...queries
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const {afterToday} = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    getDateFromNow(-7),
    getDateFromNow(0, {type: 'end'}),
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
        end: data.value[0],
        start: data.value[1],
        type: data.category,
        value: data.formatValue,
      },
    })
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // SHIPPING STATUS
  // ===== ===== ===== ===== =====
  const shippingStatusActiveValue = filter.shippingStatus.activeValue
  const shippingKeyword = filter.shippingStatus.keyword
  const shippingStatusList = filter.shippingStatus.list
  const shippingStatusListOrigin = filter.shippingStatus.listOrigin
  const shippingStatusTab = filter.shippingStatus.tab
  const shippingStatusValue = filter.shippingStatus.value

  const handleShippingStatusChange = data => {
    pageDispatch({
      type: orderActions.FILTER_SHIPPING_STATUS_UPDATE,
      payload: {
        value: data,
      },
    })
  }

  const handleShippingStatusKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
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

  const handleShippingStatusTabChange = tab => {
    const formatDataValue = shippingKeyword
      ? removeAcent(shippingKeyword?.toLowerCase())
      : ''

    const findList =
      tab === 'checked' ? shippingStatusValue : shippingStatusListOrigin

    const shippingStatusListData = findList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_SHIPPING_STATUS_TAB_UPDATE,
      payload: {list: shippingStatusListData, tab},
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

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // SHIPPING PARTNER
  // ===== ===== ===== ===== =====
  const employeeActiveValue = filter.employee.activeValue
  const employeeKeyword = filter.employee.keyword
  const employeeList = filter.employee.list
  const employeeListOrigin = filter.employee.listOrigin
  const employeeValue = filter.employee.value

  const handleEmployeeChange = data =>
    pageDispatch({
      type: orderActions.FILTER_EMPLOYEE_UPDATE,
      payload: {value: data},
    })

  const handleEmployeeKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const employeeListData = employeeListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_EMPLOYEE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: employeeListData,
      },
    })
  }
  // Status Comparing
  // ===== ===== ===== ===== =====
  const statusComparingActiveValue = filter.statusComparing.activeValue
  const statusComparingList = filter.statusComparing.list
  const statusComparingOriginList = filter.statusComparing.listOrigin
  const statusComparingValue = filter.statusComparing.value
  const statusComparingKeyword = filter.statusComparing.keyword

  const handleStatusComparingChange = data =>
    pageDispatch({
      type: orderActions.FILTER_STATUS_COMPARING_UPDATE,
      payload: {value: data},
    })
  const handleStatusComparingKeywordChange = data => {
      const formatDataValue = data?.value
        ? removeAcent(data?.value?.toLowerCase())
        : ''
      const listData = statusComparingOriginList.filter(item => {
        const formatNameItem = item?.name
          ? removeAcent(item.name.toLowerCase())
          : ''
        if (formatNameItem.includes(formatDataValue)) return true
        return false
      })
    
      pageDispatch({
        type: orderActions.FILTER_STATUS_COMPARING_KEYWORD_UPDATE,
        payload: {
          keyword: data?.value || '',
          list: listData ,
        },
      })
    }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
      JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
      JSON.stringify(shippingPartnerActiveValue) !== JSON.stringify(shippingPartnerValue),
      JSON.stringify(employeeActiveValue) !== JSON.stringify(employeeValue),
      JSON.stringify(statusComparingActiveValue) !== JSON.stringify(statusComparingValue),
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    Array.isArray(shippingStatusActiveValue) &&
      shippingStatusActiveValue.length > 0,
    !!shippingPartnerActiveValue?.value,
    !!employeeActiveValue?.value,
    statusComparingActiveValue?.value === '',
  ].filter(item => item === true).length

  const queries = {
    keyword: searchValue || '',
    date_type: dateTimeActiveValue?.type?.value || '',
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
        : '',
    shipping_partner: 1,
    user: employeeActiveValue?.value || '',
    shipping_status: Array.isArray(shippingStatusActiveValue)
      ? shippingStatusActiveValue.map(item => item?.id).join(',')
      : '',
    per_page: table.pagination.amount,
    comparing_check:statusComparingActiveValue?.value || '',
    start: 0,
  }

  const applyDeliveryOtherFilter = async shippingStatus => {
    const status = shippingStatus || shippingStatusValue
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
      shipping_partner: 1,
      user: employeeValue?.value || '',
      comparing_check:statusComparingValue?.value || '',
      shipping_status: Array.isArray(status)
        ? status
            .filter(x => x.checked)
            .map(item => item.id)
            .join(',')
        : '',
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchDeliveryByFilter(collection, status)
  }

  const convertQuery = query => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(query)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    return queryString
  }

  const fetchDeliveryByFilter = async (qs, checkedStatus, opt) => {
    
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'TABLE_DISPLAY_LOADING_UPDATE',
        payload: {table: {display: {loading: true}}},
      })
    const statusCollection = {...qs}
    delete statusCollection.shipping_status
   
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/order/delivery/cod-list${convertQuery(qs)}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/order/delivery/cod-total-list${convertQuery(qs)}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/order/delivery/cod-status-list${convertQuery(
          statusCollection,
        )}`,
      ),
    ])
    pageDispatch({type: 'SET_LOADING', payload: true})
    const statusListRes = response[2]
    const statusListOrigin = Object.values(statusListRes?.data?.data || {})
    const statusList = statusListOrigin?.map(status => ({
      ...status,
      checked: true,
      sub_arr: status.sub_arr?.map(x => {
        const status1 = checkedStatus?.find(y => y.id === x.id)
        return status1
          ? {...x, checked: status1.checked}
          : {...x, checked: true}
      }),
    }))
    
    if (
      response[0]?.status === 200 &&
      response[1]?.status === 200 &&
      statusListRes?.status === 200
    ) {
      pageDispatch({
        type: orderActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
          },
          pagination: {
            active: opt?.activePage || 0,
            amount: table.pagination.amount,
            total: response[1]?.data?.data?.totals
              ? Math.ceil(
                  response[1].data.data.totals / table.pagination.amount,
                )
              : 0,
            totalItems: response[1]?.data?.data?.totals || 0,
          },
          panels: {
            codTotal: response[1]?.data?.data?.total_cod || 0,
            orderTotal: response[1]?.data?.data?.totals || 0,
            weightTotal: response[1]?.data?.data?.total_weight || 0,
            partsignTotal : response[1]?.data?.data?.total_partsign || 0,
            shippingFeeTotal: response[1]?.data?.data?.total_ship_fee || 0,
          },
          statusList: statusList,
        },
      })
    }
    if (!!!opt?.notClearDetail)
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: null},
      })

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
      })
  }

  const fetchReloadTable = async (qs, checkedStatus, opt) => {
    
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/order/delivery/cod-list${convertQuery(qs)}`,
      )
    ])    
    if (
      response[0]?.status === 200 
    ) {
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
          }
        },
      })
    }
  }

  const filterTagDelete = t => {
    pageDispatch({type: orderActions.TAG_FILTER_DELETE, payload: {type: t}})
    pageDispatch({type: 'SET_LOADING', payload: false})
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
          payload: {trigger: null},
        })
        break
      case ORDER_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break
      case ORDER_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, shipping_status: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, shipping_partner: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, user: ''}
        break
      case ORDER_FILTER_TAG_FIELDS[4]:
        tmpCollection = {...tmpCollection, comparing_check: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchDeliveryByFilter(collection)
  }

  const filterTagDeleteAll = () => {
    ORDER_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: orderActions.TAG_FILTER_DELETE,
        payload: {type: item},
      }),
    )
    pageDispatch({
      type: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
      payload: {
        trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
      },
    })
    const date = formatDateTimeDefaultValue.split(' - ')
    const collection = {
      ...queries,
      start_date: convertDateTimeToApiFormat(date[0]),
      end_date: convertDateTimeToApiFormat(date[1]),
      shipping_status: '',
      shipping_partner: 1,
      user: '',
      comparing_check: '',
      date_type: t(ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2].value),
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchDeliveryByFilter(collection)
  }

  const handleModalImport = (status) => { 
    pageDispatch({type: 'TOGGLE_MODAL', payload: status})
  }

  return {
    queries,
    advancedSearch: {
      customer: {keyword: advancedSearchCustomer.keyword},
      itemDetails: advancedSearchItemDetails,
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
      value: dateTimeValue,
      triggerDefault: dateTimeTrigger,
      onChange: handleDateTimeChange,
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
    employee: {
      activeValue: employeeActiveValue,
      keyword: employeeKeyword,
      list: employeeList,
      value: employeeValue,
      onChange: handleEmployeeChange,
      onKeywordChange: handleEmployeeKeywordChange,
    },
    shippingStatus: {
      activeValue: shippingStatusActiveValue,
      list: shippingStatusList,
      tab: shippingStatusTab,
      value: shippingStatusValue,
      onChange: handleShippingStatusChange,
      onKeywordChange: handleShippingStatusKeywordChange,
      onTabChange: handleShippingStatusTabChange,
    },
    statusComparing: {
      activeValue: statusComparingActiveValue,
      list: statusComparingList,
      value: statusComparingValue,
      keyword:statusComparingKeyword,
      onChange: handleStatusComparingChange,
      onKeywordChange: handleStatusComparingKeywordChange,
    },
    functions: {
      applyDeliveryOtherFilter,
      fetchOrderWithCurrentFilter: () => fetchDeliveryByFilter(queries),
      filterTagDelete,
      filterTagDeleteAll,
      fetchUpdateData: () =>
        fetchDeliveryByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          [],
          {activePage: table.pagination.active, notClearDetail: true},
        ),
      fetchReloadData: () =>
        fetchReloadTable(
        {
          ...queries,
          start: table.pagination.active * table.pagination.amount,
        },
        [],
        {activePage: table.pagination.active, notClearDetail: true},
      ),
    },
    canSubmitOtherFilter,
    modals : {
      handleModalImport
    }
  }
}

export default CodFilterForm
