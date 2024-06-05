import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import {DeliveryContext} from '../provider/_context'
import {orderActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import {formatDateTimeDefaultValue} from '../../deliveryManagement/provider/_reducer'
import {NULL} from 'sass'
import {da} from 'react-date-range/dist/locale'
import {fNumber} from '../../../util/formatNumber'
import {debounce} from "@mui/material";
import { useSearchParams } from 'react-router-dom'

const DeliveryFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {filter, table} = pageState
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value

  const debounceSearchChange = useCallback(debounce((keyword, queries) => {
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchDeliveryByFilter({...queries, keyword: keyword.trim()}, [], {forcusInputOnSuccess: true})
  }, 500), [])
  const handleSearchChange = (e, queries) => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    debounceSearchChange(keyword, queries)
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
    pageDispatch({type: 'SET_LOADING', payload: false})
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
      customer_id: '',
      item_details: id || '',
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const {afterToday} = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    searchParams ? '' : getDateFromNow(-7),
    searchParams ? '' : getDateFromNow(0, {type: 'end'}),
  ]
  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeValue = filter.dateTime.value
  const dateTimeTrigger = filter.dateTime.trigger
  const handleDateTimeChange = data => {
    pageDispatch({
      type: orderActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[0],
        start: data.value[1],
        type: data.category,
        value: data.formatValue,
      },
    })}
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

  // ===== ===== ===== ===== =====
  // PRODUCT
  // ===== ===== ===== ===== =====
  const productActiveValue = filter.product.activeValue
  const productKeyword = filter.product.keyword
  const productList = filter.product.list
  const productLoading = filter.product.loading
  const productTab = filter.product.tab
  const productValue = filter.product.value

  const fetchProduct = async keyword => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list-all-product-details?per_page=20&start=0&keyword=${keyword}`,
    )

    return response
  }

  const handleProductChange = data => {
    const find = productValue.find(item => item.value === data.value)
    const productListData =
      productTab === 'checked'
        ? productValue.filter(item => item.value !== data.value)
        : productList
    const productValueData = find
      ? productValue.filter(item => item.value !== data.value)
      : [...productValue, data]

    pageDispatch({
      type: orderActions.FILTER_PRODUCT_UPDATE,
      payload: {
        list: productListData,
        value: productValueData,
      },
    })
  }

  let productKeywordTimeout
  const handleProductKeywordChange = data => {
    if (productTab === 'all') {
      clearTimeout(productKeywordTimeout)

      productKeywordTimeout = setTimeout(() => {
        pageDispatch({type: orderActions.FILTER_PRODUCT_ENABLE_LOADING})

        const keyword = data?.value || ''
        const response = fetchProduct(keyword)
        response.then(res => {
          if (res?.status === 200) {
            const productListData = res?.data?.data || []

            pageDispatch({
              type: orderActions.FILTER_PRODUCT_KEYWORD_UPDATE,
              payload: {
                isFetchNew: true,
                keyword: keyword,
                list: productListData.map(item => ({
                  data: item || null,
                  name: item?.product_name || '',
                  value: item?.id || '',
                })),
              },
            })
          }
        })
      }, 300)
    } else if (productTab === 'checked') {
      const formatDataValue = data?.value
        ? removeAcent(data?.value?.toLowerCase())
        : ''

      const productListData = productValue.filter(item => {
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

      pageDispatch({
        type: orderActions.FILTER_PRODUCT_KEYWORD_UPDATE,
        payload: {
          keyword: data?.value || '',
          list: productListData,
        },
      })
    }
  }
  const handleProductResetInput = () => {
    pageDispatch({
      type: orderActions.FILTER_PRODUCT_UPDATE,
      payload: {
        list: productList,
        value: [],
      },
    })
  }
  const handleProductTabChange = tab => {
    let productListData = []
    if (tab === 'checked') {
      productListData = productValue

      pageDispatch({
        type: orderActions.FILTER_PRODUCT_TAB_UPDATE,
        payload: {list: productListData, tab},
      })
    } else {
      const response = fetchProduct(productKeyword)
      response.then(res => {
        if (res?.status === 200) {
          const productListData = res?.data?.data || []

          pageDispatch({
            type: orderActions.FILTER_PRODUCT_KEYWORD_UPDATE,
            payload: {
              isFetchNew: true,
              keyword: productKeyword,
              list: productListData.map(item => ({
                data: item || null,
                name: item?.product_name || '',
                value: item?.id || '',
              })),
              tab,
            },
          })
        }
      })
    }
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // DUPLICATE
  // ===== ===== ===== ===== =====
  const duplicateActiveValue = filter.duplicate.activeValue
  const duplicateList = filter.duplicate.list
  const duplicateValue = filter.duplicate.value

  const handleDuplicateChange = data =>
    pageDispatch({
      type: orderActions.FILTER_DUPLICATE_UPDATE,
      payload: {value: data},
    })

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // PRINT
  // ===== ===== ===== ===== =====
  const printActiveValue = filter.print.activeValue
  const printList = filter.print.list
  const printOriginList = filter.print.originList
  const printValue = filter.print.value
  const printKeyword = filter.print.keyword
  const handlePrintChange = data => {
    pageDispatch({
      type: orderActions.FILTER_PRINT_UPDATE,
      payload: {value: data},
    })
  }

  const handlePrintKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const listData = printOriginList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_PRINT_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: listData,
      },
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // COD
  // ===== ===== ===== ===== =====
  const codActiveValue = filter.cod.activeValue
  const codList = filter.cod.list
  const codOriginList = filter.cod.originList
  const codValue = filter.cod.value
  const codKeyword = filter.cod.keyword

  const handleCODChange = data => {
    pageDispatch({
      type: orderActions.FILTER_COD_UPDATE,
      payload: {value: data},
    })
  }

  const handleCODKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const listData = codOriginList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_COD_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: listData,
      },
    })
  }

  // =============================== down time ======================
  const downTime = filter.downtime.value
  const activeDownTime = filter.downtime.activeValue
  const handleDownTimeChange = data => {
    data = fNumber(data.toString().replace(/[^0-9]/g, ''))
    if (data == 0) data = ''
    pageDispatch({
      type: orderActions.FILTER_DOWNTIME_UPDATE,
      payload: {value: data},
    })
  }

  // =============================== down time ======================
  const allocation = filter.allocation.value
  const activeAllocation = filter.allocation.activeValue
  const handleAllocationChange = data => {

    data = data.toString().replace(/[^0-9\-]+$/g, '') //eslint-disable-line
    if(data.length < 7)
      pageDispatch({
        type: orderActions.FILTER_ALLOCATION_UPDATE,
        payload: {value: data},
      })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
      JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(printActiveValue) !== JSON.stringify(printValue),
    JSON.stringify(codActiveValue) !== JSON.stringify(codValue),
    JSON.stringify(shippingPartnerActiveValue) !==
      JSON.stringify(shippingPartnerValue),
    JSON.stringify(productActiveValue) !== JSON.stringify(productValue),
    JSON.stringify(duplicateActiveValue) !== JSON.stringify(duplicateValue),
    downTime !== activeDownTime,
    allocation !== activeAllocation,
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    Array.isArray(shippingStatusActiveValue) && shippingStatusActiveValue.length > 0,
    !!shippingPartnerActiveValue?.value,
    Array.isArray(productActiveValue) && productActiveValue.length > 0,
    duplicateActiveValue?.value === '1',
    !!printActiveValue?.value,
    !!activeDownTime,
    !!activeAllocation,
    !!codActiveValue?.value,
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
    customer_id: advancedSearchCustomer.value || '',
    shipping_partner: shippingPartnerActiveValue?.value || '',
    shipping_status: Array.isArray(shippingStatusActiveValue)
      ? shippingStatusActiveValue.map(item => item?.id).join(',')
      : '',
    is_printed: printActiveValue?.value || '',
    down_cod: codActiveValue?.value || '',
    item_details: advancedSearchItemDetails || '',
    product_id: Array.isArray(productActiveValue)
      ? productActiveValue.map(item => item?.value).join(',')
      : '',
    is_duplicate: duplicateActiveValue?.value || '',
    per_page: table.pagination.amount,
    downtime: downTime || '',
    allocation_time: allocation || '',
    start: 0,
  }

  const applyDeliveryOtherFilter = async (shippingStatus, withPagination = false) => {
    const status = Array.isArray(shippingStatus) ? shippingStatus : shippingStatusValue
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
      shipping_status: Array.isArray(status)
        ? status
            .filter(x => x.checked)
            .map(item => item.id)
            .join(',')
        : '',
      is_printed: printValue?.value || '',
      down_cod: codValue?.value || '',
      product_id: Array.isArray(productValue)
        ? productValue.map(item => item?.value).join(',')
        : '',
      is_duplicate: duplicateValue?.value || '',
      start: withPagination ? table.pagination.active * table.pagination.amount : 0,
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchDeliveryByFilter(collection, status, {activePage: withPagination ? table.pagination.active : 0})
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
    setSearchParams('')

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
        `${config.API}/order/delivery/list${convertQuery(qs)}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/order/delivery/total-list${convertQuery(qs)}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/order/delivery/status-list${convertQuery(
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
            arr_details: response[0]?.data?.arr_detail,
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
            shippingFeeTotal: response[1]?.data?.data?.total_ship_fee || 0,
          },
          statusList: statusList,
        },
      })

      if (opt?.forcusInputOnSuccess) {
        pageDispatch({
          type: orderActions.FOCUS_INPUT,
          payload: true,
        })
      }
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
        tmpCollection = {...tmpCollection, shipping_status: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, shipping_partner: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, product: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[4]:
        tmpCollection = {...tmpCollection, is_printed: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[5]:
        tmpCollection = {...tmpCollection, is_duplicate: '0'}
        break

      case ORDER_FILTER_TAG_FIELDS[6]:
        tmpCollection = {...tmpCollection, downtime: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[7]:
        tmpCollection = {...tmpCollection, down_cod: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[8]:
        tmpCollection = {...tmpCollection, allocation_time: ''}
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
      user_id: '',
      shipping_status: '',
      shipping_partner: '',
      product: '',
      is_printed: '',
      warehouse_id: '',
      is_duplicate: '',
      date_type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0].value,
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
    duplicate: {
      activeValue: duplicateActiveValue,
      list: duplicateList,
      value: duplicateValue,
      onChange: handleDuplicateChange,
    },
    print: {
      activeValue: printActiveValue,
      list: printList,
      keyword: printKeyword,
      value: printValue,
      onChange: handlePrintChange,
      onKeywordChange: handlePrintKeywordChange,
    },
    cod: {
      activeValue: codActiveValue,
      list: codList,
      keyword: codKeyword,
      value: codValue,
      onChange: handleCODChange,
      onKeywordChange: handleCODKeywordChange,
    },
    downtime: {
      value: downTime,
      activeValue: activeDownTime,
      onChange: handleDownTimeChange,
    },
    allocation: {
      value: allocation,
      activeValue: activeAllocation,
      onChange: handleAllocationChange,
    },
    product: {
      activeValue: productActiveValue,
      list: productList,
      loading: productLoading,
      tab: productTab,
      value: productValue,
      onChange: handleProductChange,
      onKeywordChange: handleProductKeywordChange,
      onTabChange: handleProductTabChange,
      onInputReset: handleProductResetInput,
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
    shippingStatus: {
      activeValue: shippingStatusActiveValue,
      list: shippingStatusList,
      tab: shippingStatusTab,
      value: shippingStatusValue,
      onChange: handleShippingStatusChange,
      onKeywordChange: handleShippingStatusKeywordChange,
      onTabChange: handleShippingStatusTabChange,
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
    },
    canSubmitOtherFilter,
    loading: table.loading
  }
}

export default DeliveryFilterForm
