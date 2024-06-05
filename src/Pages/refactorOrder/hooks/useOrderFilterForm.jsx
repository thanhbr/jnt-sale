import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
  ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST,
} from '../interfaces/_constants'
import {OrderContext} from '../provider/_context'
import {formatDateTimeDefaultValue, orderActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import { debounce } from '@mui/material'
import {orderInitialState} from 'Pages/refactorOrder/provider/_reducer'
import { useSearchParams } from 'react-router-dom'

const useOrderFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(OrderContext)
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
  const advancedSearchLiveVideoId = filter.advancedSearch.liveVideoId

  const advanedSearchBadge =
    !!advancedSearchCustomer.keyword || !!advancedSearchLiveVideoId

  const fetchCustomer = async (k, id) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/customers?keyword=${k}&group=&city_id=&district_id=&ward_id=&per_page=20&start=0`,
    )

    if (!!response?.data?.success) {
      const idList = Array.isArray(response?.data?.data)
        ? response.data.data.map(item => item?.id)
        : []
      const idListString = idList.join(',').replace(/,,/g, ',')

      pageDispatch({
        type: orderActions.FILTER_ADVANCED_SEARCH_UPDATE,
        payload: {customer: {value: idListString}},
      })

      fetchOrderByFilter({
        ...queries,
        customer_id: idListString || '',
        livestream_id: id || '',
      })
    }
  }

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
    fetchOrderByFilter(
      {
        ...queries,
        keyword_customer: val.trim(),
        customer_id: '',
        livestream_id: id || '',
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

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

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
      `${
        config.API
      }/product/list-all-product-details?per_page=20&start=0&keyword=${keyword.trim()}`,
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
        if (!!keyword.trim()) {
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
        }
      }, 500)
    } else if (productTab === 'checked') {
      const formatDataValue = data?.value.trim()
        ? removeAcent(data?.value.trim()?.toLowerCase())
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

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // WAREHOUSE
  // ===== ===== ===== ===== =====
  const warehouseActiveValue = filter.warehouse.activeValue
  const warehouseKeyword = filter.warehouse.keyword
  const warehouseList = filter.warehouse.list
  const warehouseListOrigin = filter.warehouse.listOrigin
  const warehouseValue = filter.warehouse.value

  const handleWarehouseChange = data =>
    pageDispatch({
      type: orderActions.FILTER_WAREHOUSE_UPDATE,
      payload: {value: data},
    })

  const handleWarehouseKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const warehouseListData = warehouseListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: orderActions.FILTER_WAREHOUSE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: warehouseListData,
      },
    })
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
  // PAYMENT
  // ===== ===== ===== ===== =====
  const paymentValue = filter.payment.value

  const handlePaymentChange = data => {
    const paymentValueData = Array.isArray(data) ? data : []

    pageDispatch({
      type: orderActions.FILTER_PAYMENT_UPDATE,
      payload: {payment: {value: paymentValueData}},
    })

    fetchOrderByFilter({
      ...queries,
      payment:
        paymentValueData.length < ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.length
          ? paymentValueData.join(',')
          : '',
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
      JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(employeeActiveValue.value) !==
      JSON.stringify(employeeValue) ||
      JSON.stringify(employeeActiveValue.type) !==
        JSON.stringify(employeeCategoryValue),
    JSON.stringify(shippingStatusActiveValue) !==
      JSON.stringify(shippingStatusValue),
    JSON.stringify(shippingPartnerActiveValue) !==
      JSON.stringify(shippingPartnerValue),
    JSON.stringify(productActiveValue) !== JSON.stringify(productValue),
    JSON.stringify(sourceActiveValue) !== JSON.stringify(sourceValue),
    JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue),
    JSON.stringify(duplicateActiveValue) !== JSON.stringify(duplicateValue),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    Array.isArray(employeeActiveValue?.value) &&
      employeeActiveValue.value.length > 0,
    Array.isArray(shippingStatusActiveValue) &&
      shippingStatusActiveValue.length > 0,
    !!shippingPartnerActiveValue?.value,
    Array.isArray(productActiveValue) && productActiveValue.length > 0,
    !!sourceActiveValue?.value,
    !!warehouseActiveValue?.value,
    duplicateActiveValue?.value === '1',
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
    user_id: Array.isArray(employeeActiveValue?.value)
      ? employeeActiveValue.value.map(item => item?.value).join(',')
      : '',
    group_user: employeeActiveValue?.type?.value || '',
    warehouse_id: warehouseActiveValue?.value || '',
    shipping_partner: shippingPartnerActiveValue?.value || '',
    shipping_status: Array.isArray(shippingStatusActiveValue)
      ? shippingStatusActiveValue.map(item => item?.value).join(',')
      : '',
    order_origin_id: sourceActiveValue?.value || '',
    livestream_id: advancedSearchLiveVideoId.trim() || '',
    product_id: Array.isArray(productActiveValue)
      ? productActiveValue.map(item => item?.value).join(',')
      : '',
    is_duplicate: duplicateActiveValue?.value || '',
    payment:
      Array.isArray(paymentValue) &&
      paymentValue.length < ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.length
        ? paymentValue.join(',')
        : '',
    per_page: table.pagination.amount,
    start: 0,
  }


  const debounceOrderByFilter = useCallback(debounce((keyword, queries) => {
    fetchOrderByFilter(
      {...queries, keyword: keyword.trim()},
      {forceLoading: true},
    )
  }, 500), [queries])

  const handleSearchChange = e => {
    if (e.target.value === ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: orderActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    debounceOrderByFilter(keyword.trim().split(' ').join(','), queries)
    // if(keyword.trim().length > 0) debounceOrderByFilter(keyword.trim().split(' ').join(','))
  }


  const applyOrderOtherFilter = async () => {
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
      user_id: Array.isArray(employeeValue)
        ? employeeValue.map(item => item?.value).join(',')
        : '',
      group_user: employeeCategoryValue?.value || '',
      warehouse_id: warehouseValue?.value || '',
      shipping_partner: shippingPartnerValue?.value || '',
      shipping_status: Array.isArray(shippingStatusValue)
        ? shippingStatusValue.map(item => item?.value).join(',')
        : '',
      order_origin_id: sourceValue?.value || '',
      product_id: Array.isArray(productValue)
        ? productValue.map(item => item?.value).join(',')
        : '',
      is_duplicate: duplicateValue?.value || '',
    }

    fetchOrderByFilter(collection, {forceLoading: true})
  }

  const fetchReportStatus = async (phoneList, displayListData) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/customer/report`,
      JSON.stringify({phone: phoneList}),
    )

    if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          display: {
            list: displayListData.map(item => ({
              ...item,
              total_reports: item?.customer_mobile
                ? response.data.data.find(
                    find => find?.phone === item?.customer_mobile,
                  )?.totals || 0
                : 0,
            })),
          },
        },
      })
    }
  }

  const fetchOrderByFilter = async (qs, opt) => {
    setSearchParams('')
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: true}}},
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/order/orders${queryString}`),
      sendRequestAuth('get', `${config.API}/order/order-total${queryString}`),
    ])

    const displayData = Array.isArray(response[0]?.data?.data)
      ? response[0].data.data
      : []

    const phoneList = displayData.map(item => item?.customer_mobile || '')

    if (phoneList.length > 0) fetchReportStatus(phoneList, displayData)

    if (response[0]?.status === 200 && response[1]?.status === 200) {
      pageDispatch({
        type: orderActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
          },
          panels: {
            codTotal: response[1]?.data?.data?.totals_cod || 0,
            orderTotal: response[1]?.data?.data?.totals || 0,
            orderValueTotal: response[1]?.data?.data?.totals_amount || 0,
            shippingFeeTotal: response[1]?.data?.data?.totals_ship_fee || 0,
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

    pageDispatch({
      type: orderActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: {id: null},
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

      case ORDER_FILTER_TAG_FIELDS[8]:
        tmpCollection = {
          ...tmpCollection,
          group_user: ''
        }
        break

      case ORDER_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, user_id: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, shipping_status: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, shipping_partner: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[4]:
        tmpCollection = {...tmpCollection, product: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[5]:
        tmpCollection = {...tmpCollection, order_origin_id: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[6]:
        tmpCollection = {...tmpCollection, warehouse_id: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[7]:
        tmpCollection = {...tmpCollection, is_duplicate: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchOrderByFilter(collection, {forceLoading: true})
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
      user_id: '',
      shipping_status: '',
      shipping_partner: '',
      product_id: '',
      order_origin_id: '',
      warehouse_id: '',
      is_duplicate: '0',
    }

    fetchOrderByFilter(collection, {forceLoading: true})
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
        user_id: '',
        shipping_status: '',
        shipping_partner: '',
        product_id: '',
        order_origin_id: '',
        warehouse_id: '',
        is_duplicate: '0',
        per_page: 20,
        start: 0,
      },
      {activePage: table.pagination.active, forceLoading: true},
    )
  }

  return {
    advancedSearch: {
      customer: {keyword: advancedSearchCustomer.keyword},
      liveVideoId: advancedSearchLiveVideoId,
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
    duplicate: {
      activeValue: duplicateActiveValue,
      list: duplicateList,
      value: duplicateValue,
      onChange: handleDuplicateChange,
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
    payment: {
      value: paymentValue,
      onChange: handlePaymentChange,
    },
    product: {
      activeValue: productActiveValue,
      list: productList,
      loading: productLoading,
      tab: productTab,
      value: productValue,
      onChange: handleProductChange,
      onInputReset: handleProductResetInput,
      onKeywordChange: handleProductKeywordChange,
      onTabChange: handleProductTabChange,
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
      keyword: shippingStatusKeyword,
      list: shippingStatusList,
      tab: shippingStatusTab,
      value: shippingStatusValue,
      onChange: handleShippingStatusChange,
      onInputReset: handleShippingStatusResetInput,
      onKeywordChange: handleShippingStatusKeywordChange,
      onTabChange: handleShippingStatusTabChange,
    },
    source: {
      activeValue: sourceActiveValue,
      keyword: sourceKeyword,
      list: sourceList,
      value: sourceValue,
      onChange: handleSourceChange,
      onKeywordChange: handleSourceKeywordChange,
    },
    warehouse: {
      activeValue: warehouseActiveValue,
      keyword: warehouseKeyword,
      list: warehouseList,
      value: warehouseValue,
      onChange: handleWarehouseChange,
      onKeywordChange: handleWarehouseKeywordChange,
    },
    canSubmitOtherFilter,
    queries,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
          JSON.stringify(orderInitialState.filter.dateTime.activeValue),
        Array.isArray(employeeActiveValue?.value) &&
        employeeActiveValue.value.length > 0 &&
          !!employeeActiveValue?.type?.name,
        Array.isArray(shippingStatusActiveValue) &&
        shippingStatusActiveValue.length > 0,
        !!shippingPartnerActiveValue?.name,
        Array.isArray(productActiveValue) && productActiveValue.length > 0,
        !!sourceActiveValue?.name,
        !!warehouseActiveValue?.name,
        duplicateActiveValue?.value === '1',
      ].includes(true),
      applyOrderOtherFilter,
      refresh: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active, forceLoading: true},
        ),
      fetchOrderWithCurrentFilter: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active},
        ),
      fetchUpdateData: () =>
        fetchOrderByFilter(
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

export default useOrderFilterForm
