import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES, ORDER_FILTER_TAG_FIELDS} from '../interfaces/_constants'
import {DeliveryContext} from '../provider/_context'
import {orderActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import { formatDateTimeDefaultValue } from '../../partSign/provider/_reducer'
import { NULL } from 'sass'
import { transformListData } from '../utils/transform'
import { da } from 'react-date-range/dist/locale'
import { fNumber } from '../../../util/formatNumber'

const PartSignFilterForm = () => {
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {filter, table} = pageState
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value

  let searchTimeout
  const handleSearchChange = e => {
    if(e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    console.log(e.target.value)
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })

    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(
      () => (
        (!!keyword.trim() || keyword === '') &&
        fetchDeliveryByFilter({...queries, keyword: keyword.trim()})),
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
      ...queries,
      keyword_customer: val.trim(),
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

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
  // ===== ===== ===== ===== =====
  const adminUserActiveValue = filter.adminUser.activeValue
  const adminUserList = filter.adminUser.list
  const adminUserValue = filter.adminUser.value
  const shippingAdminUserOrigin = filter.adminUser.listOrigin
  const adminUserKeyword = filter.adminUser.keyword
  const handleAdminUserChange = data => {
    pageDispatch({
      type: orderActions.FILTER_ADMIN_USER_UPDATE,
      payload: { value: data },
    })
  }

  const handleAdminUserKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const listData = shippingAdminUserOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_ADMIN_USER_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: listData,
      },
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const orderOriginActiveValue = filter.orderOrigin.activeValue
  const orderOriginList = filter.orderOrigin.list
  const orderOriginValue = filter.orderOrigin.value
  const shippingOrderOriginOrigin = filter.orderOrigin.listOrigin
  const orderOriginKeyword = filter.orderOrigin.keyword
  const handleOrderOriginChange = data => {
    pageDispatch({
      type: orderActions.FILTER_ORDER_ORIGIN_UPDATE,
      payload: { value: data },
    })
  }

  const handleOrderOriginKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const listData = shippingOrderOriginOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_ORDER_ORIGIN_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: listData,
      },
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(adminUserActiveValue) !== JSON.stringify(adminUserValue),
    JSON.stringify(shippingPartnerActiveValue) !== JSON.stringify(shippingPartnerValue),
    JSON.stringify(orderOriginActiveValue) !== JSON.stringify(orderOriginValue),
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!shippingPartnerActiveValue?.value,
    !!adminUserActiveValue?.value,
    !!orderOriginActiveValue?.value,
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
    shipping_partner: shippingPartnerActiveValue?.value || '',
    user_id: adminUserActiveValue?.value || '',
    order_origin_id: orderOriginActiveValue?.value || '',
    per_page: table.pagination.amount,
    start: 0,
  }

  const applyDeliveryOtherFilter = async () => {
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
      shipping_partner: shippingPartnerValue?.value || '',
      user_id: adminUserValue?.value || '',
      order_origin_id: orderOriginValue?.value || '',
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchDeliveryByFilter(collection)
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

  const fetchDeliveryByFilter = async (qs, opt) => {
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'TABLE_DISPLAY_LOADING_UPDATE',
        payload: {table: {display: {loading: true}}},
      })

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/order/partsign/list${convertQuery(qs)}`),
      sendRequestAuth('get', `${config.API}/order/partsign/total-list${convertQuery(qs)}`),
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
            partSignCODTotal: response[1]?.data?.data?.total_cod_partsign || 0,
            partaSignTotal: response[1]?.data?.data?.totals || 0,
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
        tmpCollection = {...tmpCollection, shipping_partner: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, user_id: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, order_origin_id: ''}
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
      shipping_partner: '',
      user_id: '',
      order_origin_id: '',
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchDeliveryByFilter(collection)
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
    adminUser: {
      activeValue: adminUserActiveValue,
      list: adminUserList,
      keyword: adminUserKeyword,
      value: adminUserValue,
      onChange: handleAdminUserChange,
      onKeywordChange: handleAdminUserKeywordChange,
    },
    orderOrigin: {
      activeValue: orderOriginActiveValue,
      list: orderOriginList,
      keyword: orderOriginKeyword,
      value: orderOriginValue,
      onChange: handleOrderOriginChange,
      onKeywordChange: handleOrderOriginKeywordChange,
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
          {activePage: table.pagination.active, notClearDetail: true},
        ),
    },
    canSubmitOtherFilter
  }
}

export default PartSignFilterForm
