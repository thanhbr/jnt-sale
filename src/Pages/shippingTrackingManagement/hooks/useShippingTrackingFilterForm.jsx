import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import {DateRangePicker} from 'rsuite'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES, ORDER_FILTER_TAG_FIELDS} from '../interfaces/_constants'
import {ShippingTrackingContext} from '../provider/_context'
import {orderActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import { formatDateTimeDefaultValue } from '../../deliveryManagement/provider/_reducer'
import { NULL } from 'sass'
import { transformListData } from '../utils/transform'
import { da } from 'react-date-range/dist/locale'
import { fNumber } from '../../../util/formatNumber'
import { debounce } from '@mui/material'

const ShippingTrackingFilterForm = () => {
  const {pageState, pageDispatch} = useContext(ShippingTrackingContext)
  const {filter, table} = pageState
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value

  const debounceSearchChange = useCallback(debounce((keyword) => {
    (!!keyword.trim() || keyword === '') &&
    fetchShippingTrackingByFilter({...queries, keyword: keyword.trim()})
    pageDispatch({type: 'SET_LOADING', payload: true})
  }, 500), [])
  const handleSearchChange = e => {
    if(e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value || ''
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    pageDispatch({type: 'SET_LOADING', payload: false})
    debounceSearchChange(keyword)
  }

  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const {afterToday} = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
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


  // ORDER STATUS

  const orderStatusActiveValue = filter.orderStatus.activeValue
  const orderStatusList = filter.orderStatus.list
  const orderStatusValue = filter.orderStatus.value
  const orderStatusKeyword = filter.orderStatus.keyword

  const handleOrderStatusChange = data => {
    pageDispatch({
      type: orderActions.FILTER_ORDER_UPDATE,
      payload: { value: data },
    })
  }


  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
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
  // END EMPLOYEE


  // =============================== down time ======================
  const downTime = filter.downtime.value
  const activeDownTime = filter.downtime.activeValue
  const handleDownTimeChange = data => {
    data = fNumber(data.toString()
      .replace(/[^0-9]/g, ''))
    if(data == 0) data = ''
    pageDispatch({
      type: orderActions.FILTER_DOWNTIME_UPDATE,
      payload: { value: data },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(orderStatusActiveValue) !== JSON.stringify(orderStatusValue),
    JSON.stringify(employeeActiveValue) !==
    JSON.stringify(employeeValue),
    downTime !== activeDownTime
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!orderStatusActiveValue?.value,
    Array.isArray(employeeActiveValue?.value) &&
    employeeActiveValue.value.length > 0,
    downTime !== ''
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
    solving_status: orderStatusActiveValue?.value || '',
    per_page: table.pagination.amount,
    downtime: downTime || '',
    user_id: employeeActiveValue?.value || '',
    start: 0,
  }

  const applyShippingTrackingOtherFilter = async () => {
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
      solving_status: orderStatusValue?.value || '',
      downtime: downTime,
      user_id: employeeValue?.value || ''
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchShippingTrackingByFilter(collection, status)
  }

  const convertQuery = (query) => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(query)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    return queryString
  }

  const fetchShippingTrackingByFilter = async (qs, checkedStatus, opt) => {
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'TABLE_DISPLAY_LOADING_UPDATE',
        payload: {table: {display: {loading: true}}},
      })
    const statusCollection = {...qs}
    delete statusCollection.shipping_status

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/delivery/warning/orders${convertQuery(qs)}`),
      sendRequestAuth('get', `${config.API}/delivery/warning/orders-count${convertQuery(qs)}`),
    ])
    pageDispatch({type: 'SET_LOADING', payload: true})


    if (response[0]?.status === 200 && response[1]?.status === 200) {
      pageDispatch({
        type: orderActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
            arr_details: response[0]?.data?.arr_detail
          },
          pagination: {
            active: opt?.activePage || 0,
            amount: table.pagination.amount,
            total: response[1]?.data?.data?.totals
              ? Math.ceil(response[1].data.data.totals / table.pagination.amount)
              : 0,
            totalItems: response[1]?.data?.data?.totals || 0,
          },
          panels: {
            codTotal: response[1]?.data?.data?.total_cod || 0,
            orderTotal: response[1]?.data?.data?.totals || 0,
            shippingFeeTotal: response[1]?.data?.data?.total_ship_fee || 0,
          },
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
        tmpCollection = {...tmpCollection, solving_status: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, user_id: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, downtime: ''}
        break
      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchShippingTrackingByFilter(collection)
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
      user_id: '',
      solving_status: '',
      date_type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0].value,
      downtime : ''
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchShippingTrackingByFilter(collection)
  }

  return {
    queries,
    badge: {
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
    orderStatus: {
      activeValue: orderStatusActiveValue,
      list: orderStatusList,
      keyword: orderStatusKeyword,
      value: orderStatusValue,
      onChange: handleOrderStatusChange,
    },
    employee: {
      activeValue: employeeActiveValue,
      keyword: employeeKeyword,
      list: employeeList,
      value: employeeValue,
      onChange: handleEmployeeChange,
      onKeywordChange: handleEmployeeKeywordChange,
    },
    downtime: {
      value: downTime,
      activeValue: activeDownTime,
      onChange: handleDownTimeChange,
    },
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    functions: {
      applyShippingTrackingOtherFilter,
      fetchOrderWithCurrentFilter: () => fetchShippingTrackingByFilter(queries),
      filterTagDelete,
      filterTagDeleteAll,
      fetchUpdateData: () =>
        fetchShippingTrackingByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          }, [] ,
          {activePage: table.pagination.active, notClearDetail: true},
        ),
    },
    canSubmitOtherFilter
  }
}

export default ShippingTrackingFilterForm
