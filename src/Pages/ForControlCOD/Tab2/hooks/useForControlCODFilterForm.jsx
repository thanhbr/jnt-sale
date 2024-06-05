import { debounce } from "@mui/material"
import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateRangePicker } from 'rsuite'
import {
  ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ForControlCOD_FILTER_TAG_FIELDS
} from '../interfaces/_constants'
import { ForControlCODContext } from '../provider/_context'
import { formatDateTimeDefaultValue, orderActions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'

const ForControlCODFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(ForControlCODContext)
  const {filter, table} = pageState
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

  const debounceSearchChange = useCallback(debounce((keyword, queries) => {
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchForControlCODByFilter({...queries, multiple_search: keyword.trim()}, [], {forcusInputOnSuccess: true})
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
    fetchForControlCODByFilter({
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
    querySearch ? '' : getDateFromNow(-7),
    querySearch ? '' : getDateFromNow(0, {type: 'end'}),
  ]
  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeValue = filter.dateTime.value
  const dateTimeTrigger = filter.dateTime.trigger
  const handleDateTimeChange = data => {
    let value = ''
    if (data.formatValue !== 'NaN/NaN/NaN NaN:NaN - NaN/NaN/NaN NaN:NaN') value = data.formatValue
    if (!value) return
    pageDispatch({
      type: orderActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[0],
        start: data.value[1],
        type: data.category,
        value: value,
      },
    })}
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // PRODUCT
  // ===== ===== ===== ===== =====
  // const productActiveValue = filter.product.activeValue
  // const productKeyword = filter.product.keyword
  // const productList = filter.product.list
  // const productLoading = filter.product.loading
  // const productTab = filter.product.tab
  // const productValue = filter.product.value

  // const fetchProduct = async keyword => {
  //   const response = await sendRequestAuth(
  //     'get',
  //     `${config.API}/product/list-all-product-details?per_page=20&start=0&keyword=${keyword}`,
  //   )

  //   return response
  // }

  // const handleProductChange = data => {
  //   const find = productValue.find(item => item.value === data.value)
  //   const productListData =
  //     productTab === 'checked'
  //       ? productValue.filter(item => item.value !== data.value)
  //       : productList
  //   const productValueData = find
  //     ? productValue.filter(item => item.value !== data.value)
  //     : [...productValue, data]

  //   pageDispatch({
  //     type: orderActions.FILTER_PRODUCT_UPDATE,
  //     payload: {
  //       list: productListData,
  //       value: productValueData,
  //     },
  //   })
  // }

  // let productKeywordTimeout
  // const handleProductKeywordChange = data => {
  //   if (productTab === 'all') {
  //     clearTimeout(productKeywordTimeout)

  //     productKeywordTimeout = setTimeout(() => {
  //       pageDispatch({type: orderActions.FILTER_PRODUCT_ENABLE_LOADING})

  //       const keyword = data?.value || ''
  //       const response = fetchProduct(keyword)
  //       response.then(res => {
  //         if (res?.status === 200) {
  //           const productListData = res?.data?.data || []

  //           pageDispatch({
  //             type: orderActions.FILTER_PRODUCT_KEYWORD_UPDATE,
  //             payload: {
  //               isFetchNew: true,
  //               keyword: keyword,
  //               list: productListData.map(item => ({
  //                 data: item || null,
  //                 name: item?.product_name || '',
  //                 value: item?.id || '',
  //               })),
  //             },
  //           })
  //         }
  //       })
  //     }, 300)
  //   } else if (productTab === 'checked') {
  //     const formatDataValue = data?.value
  //       ? removeAcent(data?.value?.toLowerCase())
  //       : ''

  //     const productListData = productValue.filter(item => {
  //       const formatNameItem = item?.name
  //         ? removeAcent(item.name.toLowerCase())
  //         : ''
  //       if (
  //         formatNameItem.includes(formatDataValue) &&
  //         (data.category.value !== ''
  //           ? item.groups.includes(data.category.value)
  //           : true)
  //       )
  //         return true
  //       return false
  //     })

  //     pageDispatch({
  //       type: orderActions.FILTER_PRODUCT_KEYWORD_UPDATE,
  //       payload: {
  //         keyword: data?.value || '',
  //         list: productListData,
  //       },
  //     })
  //   }
  // }
  // const handleProductResetInput = () => {
  //   pageDispatch({
  //     type: orderActions.FILTER_PRODUCT_UPDATE,
  //     payload: {
  //       list: productList,
  //       value: [],
  //     },
  //   })
  // }
  // const handleProductTabChange = tab => {
  //   let productListData = []
  //   if (tab === 'checked') {
  //     productListData = productValue

  //     pageDispatch({
  //       type: orderActions.FILTER_PRODUCT_TAB_UPDATE,
  //       payload: {list: productListData, tab},
  //     })
  //   } else {
  //     const response = fetchProduct(productKeyword)
  //     response.then(res => {
  //       if (res?.status === 200) {
  //         const productListData = res?.data?.data || []

  //         pageDispatch({
  //           type: orderActions.FILTER_PRODUCT_KEYWORD_UPDATE,
  //           payload: {
  //             isFetchNew: true,
  //             keyword: productKeyword,
  //             list: productListData.map(item => ({
  //               data: item || null,
  //               name: item?.product_name || '',
  //               value: item?.id || '',
  //             })),
  //             tab,
  //           },
  //         })
  //       }
  //     })
  //   }
  // }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
      JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
  ].filter(item => item === true).length

  const queries = {
    multiple_search: searchValue || '',
    date_type: dateTimeActiveValue?.type?.value || '',
    code_type: pageState.code_type,
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0]).split(' ')[0]
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1]).split(' ')[0]
        : '',
    start: 0,
  }

  const applyForControlCODOtherFilter = async (shippingStatus, withPagination = false) => {
    const collection = {
      ...queries,
      start_date:
        dateTimeStart && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[0]).split(' ')[0]
          : '',
      end_date:
        dateTimeEnd && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[1]).split(' ')[0]
          : '',
      start: withPagination ? table.pagination.active * table.pagination.amount : 0,
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchForControlCODByFilter(collection, status, {activePage: withPagination ? table.pagination.active : 0})
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

  const fetchForControlCODByFilter = async (qs, checkedStatus, opt) => {
    setSearchParams('')

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'TABLE_DISPLAY_LOADING_UPDATE',
        payload: {table: {display: {loading: true}}},
      })

    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/cod/cod-list${convertQuery(qs)}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/cod/cod-total${convertQuery(qs)}`,
      ),
    ])
    pageDispatch({type: 'SET_LOADING', payload: true})

    if (
      response[0]?.status === 200 &&
      response[1]?.status === 200
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
            total: response[0]?.data?.meta?.total
              ? Math.ceil(
                  response[0]?.data?.meta?.total / table.pagination.amount,
                )
              : 0,
            totalItems: response[0]?.data?.meta?.total || 0,
          },
          panels: {
            unpaidSum: response[1]?.data?.data[1]?.unpaidSum || 0,
            count_order_unpaidSum: response[1]?.data?.data[1]?.count_order|| 0,
            signpaidSum: response[1]?.data?.data[2]?.signpaidSum || 0,
            count_order_signpaidSum: response[1]?.data?.data[2]?.count_order || 0,
          },
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
      case ForControlCOD_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break
      case ForControlCOD_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, shipping_status: ''}
        break

      case ForControlCOD_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, shipping_partner: ''}
        break

      case ForControlCOD_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, product: ''}
        break

      case ForControlCOD_FILTER_TAG_FIELDS[4]:
        tmpCollection = {...tmpCollection, is_printed: ''}
        break

      case ForControlCOD_FILTER_TAG_FIELDS[5]:
        tmpCollection = {...tmpCollection, is_duplicate: '0'}
        break

      case ForControlCOD_FILTER_TAG_FIELDS[6]:
        tmpCollection = {...tmpCollection, downtime: ''}
        break

      case ForControlCOD_FILTER_TAG_FIELDS[7]:
        tmpCollection = {...tmpCollection, down_cod: ''}
        break

      case ForControlCOD_FILTER_TAG_FIELDS[8]:
        tmpCollection = {...tmpCollection, allocation_time: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchForControlCODByFilter(collection)
  }

  const filterTagDeleteAll = () => {
    ForControlCOD_FILTER_TAG_FIELDS.forEach(item =>
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
      start_date: convertDateTimeToApiFormat(date[0]).split(' ')[0],
      end_date: convertDateTimeToApiFormat(date[1]).split(' ')[0],
      date_type: ForControlCOD_FILTER_FORM_DATE_TIME_SORT_TYPES[0].value,
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchForControlCODByFilter(collection)
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
    product: {
      // activeValue: productActiveValue,
      // list: productList,
      // loading: productLoading,
      // tab: productTab,
      // value: productValue,
      // onChange: handleProductChange,
      // onKeywordChange: handleProductKeywordChange,
      // onTabChange: handleProductTabChange,
      // onInputReset: handleProductResetInput,
    },
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    functions: {
      applyForControlCODOtherFilter,
      fetchOrderWithCurrentFilter: () => fetchForControlCODByFilter(queries),
      fetchForControlCODByFilter,
      filterTagDelete,
      filterTagDeleteAll,
      fetchUpdateData: () =>
        fetchForControlCODByFilter(
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

export default ForControlCODFilterForm
