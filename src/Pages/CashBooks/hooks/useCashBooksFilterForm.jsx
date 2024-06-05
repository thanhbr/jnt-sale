import { debounce } from "@mui/material"
import { sendRequestAuth } from 'api/api'
import { removeAcent } from 'common/fieldText/_functions'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateRangePicker } from 'rsuite'
import { formatDateTimeDefaultValue } from '../../CashBooks/provider/_reducer'
import {
  CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES,
  CASHBOOKS_FILTER_TAG_FIELDS
} from '../interfaces/_constants'
import { CashBooksContext } from '../provider/_context'
import { actions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'

const CashBooksFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(CashBooksContext)
  const {filter, table} = pageState

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

  const debounceSearchChange = useCallback(debounce((keyword, queries) => {
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchCashBooksByFilter({...queries, keyword: keyword.trim()}, {forcusInputOnSuccess: true})
  }, 500), [])
  const handleSearchChange = (e, queries) => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: actions.FILTER_SEARCH_UPDATE,
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
      type: actions.FILTER_ADVANCED_SEARCH_UPDATE,
      payload: {
        customer: {keyword: val, value: val ? null : ''},
        itemDetails: id,
      },
    })
    fetchCashBooksByFilter({
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
      type: actions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[0],
        start: data.value[1],
        type: data.category,
        value: value,
      },
    })}
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // RECEIPT TYPE
  // ===== ===== ===== ===== =====
  const receiptTypeCategoryList = filter.receiptType.type.list
  const receiptTypeCategoryValue = filter.receiptType.type.value
  const receiptTypeActiveValue = filter.receiptType.activeValue
  const receiptTypeValue = filter.receiptType.value
  const receiptTypeKeyword = filter.receiptType.keyword
  const receiptTypeList = filter.receiptType.list
  const receiptTypeOriginList = filter.receiptType.originList

  const handleReceiptTypeChange = data =>
    pageDispatch({
      type: actions.FILTER_RECEIPT_TYPE_UPDATE,
      payload: {value: data},
    })

  const handleReceiptTypeKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const receiptTypeList = receiptTypeOriginList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (
        formatNameItem?.includes(formatDataValue)
        //  &&
        // (data.category.value !== ''
        //   ? item.groups.includes(data.category.value)
        //   : true)
      )
        return true
      return false
    })

    if (data?.category?.value !== receiptTypeCategoryValue?.value) {
      pageDispatch({
        type: actions.FILTER_RECEIPT_TYPE_CATEGORY_UPDATE,
        payload: {
          list: receiptTypeList,
          type: {value: data?.category},
        },
      })
      return
    }

    pageDispatch({
      type: actions.FILTER_RECEIPT_TYPE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value,
        list: receiptTypeList,
      },
    })
  }

  const handleReceiptTypeResetInput = () => {
    pageDispatch({
      type: actions.FILTER_RECEIPT_TYPE_UPDATE,
      payload: {
        list: receiptTypeOriginList,
        value: '',
      },
    })
  }

  // ===== ===== ===== ===== =====
  // PAYMENT METHOD
  // ===== ===== ===== ===== =====
  const paymentMethodActiveValue = filter.paymentMethod.activeValue
  const paymentMethodKeyword = filter.paymentMethod.keyword
  const paymentMethodList = filter.paymentMethod.list
  const paymentMethodListOrigin = filter.paymentMethod.originList
  const paymentMethodTab = filter.paymentMethod.tab
  const paymentMethodValue = filter.paymentMethod.value

  const handlePaymentMethodChange = data => {
    const find = paymentMethodValue.find(item => item.value === data.value)
    const paymentMethodListData =
      paymentMethodTab === 'checked'
        ? paymentMethodValue.filter(item => item.value !== data.value)
        : paymentMethodList
    const paymentMethodValueData = find
      ? paymentMethodValue.filter(item => item.value !== data.value)
      : [...paymentMethodValue, data]

    pageDispatch({
      type: actions.FILTER_PAYMENT_METHOD_UPDATE,
      payload: {
        list: paymentMethodListData,
        value: paymentMethodValueData,
      },
    })
  }

  const handlePaymentMethodKeywordChange = data => {
    const formatDataValue = data?.value.trim()
      ? removeAcent(data?.value.trim()?.toLowerCase())
      : ''

    const findList =
      paymentMethodTab === 'checked'
        ? paymentMethodValue
        : paymentMethodListOrigin

    const paymentMethodListData = findList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: actions.FILTER_PAYMENT_METHOD_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: paymentMethodListData,
      },
    })
  }

  const handlePaymentMethodResetInput = () => {
    pageDispatch({
      type: actions.FILTER_PAYMENT_METHOD_UPDATE,
      payload: {
        list: paymentMethodListOrigin,
        value: [],
      },
    })
  }

  const handlePaymentMethodTabChange = tab => {
    const formatDataValue = paymentMethodKeyword
      ? removeAcent(paymentMethodKeyword?.toLowerCase())
      : ''

    const paymentMethodListData = paymentMethodListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: actions.FILTER_PAYMENT_METHOD_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? paymentMethodValue : paymentMethodListData,
        tab,
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
      JSON.stringify(dateTimeActiveValue?.type) !== JSON.stringify(dateTimeType),
      JSON.stringify(receiptTypeActiveValue?.value?.value) !== JSON.stringify(receiptTypeValue?.value),
      JSON.stringify(receiptTypeActiveValue?.type?.value) !== JSON.stringify(receiptTypeCategoryValue?.value),
      JSON.stringify(paymentMethodActiveValue) !== JSON.stringify(paymentMethodValue),
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!receiptTypeActiveValue?.value || receiptTypeActiveValue?.type?.value !== '0',
    Array.isArray(paymentMethodActiveValue) &&
      paymentMethodActiveValue.length > 0,
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
    payment_method_id: Array.isArray(paymentMethodActiveValue)
      ? paymentMethodActiveValue.map(item => item?.value).join(',')
      : '',
    receipt_type: receiptTypeActiveValue?.type?.value || '',
    receipt_type_id: Array.isArray(receiptTypeActiveValue?.value)
    ? receiptTypeActiveValue.value.map(item => item?.value).join(',')
    : '',
    per_page: table.pagination.amount,
    start: 0,
  }

  const applyCashBooksOtherFilter = async (withPagination = false) => {
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
      payment_method_id: Array.isArray(paymentMethodValue)
        ? paymentMethodValue.map(item => item?.value).join(',')
        : '',
      receipt_type: receiptTypeCategoryValue?.value || '',
      receipt_type_id: receiptTypeValue?.value || '',
      start: withPagination ? table.pagination.active * table.pagination.amount : 0,
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchCashBooksByFilter(collection, {activePage: withPagination ? table.pagination.active : 0})
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

  const fetchCashBooksByFilter = async (qs, opt) => {
    setSearchParams('')

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'TABLE_DISPLAY_LOADING_UPDATE',
        payload: {table: {display: {loading: true}}},
      })
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/cashbook/list${convertQuery(qs)}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/cashbook/total-list${convertQuery(qs)}`,
      ),
    ])
    pageDispatch({type: 'SET_LOADING', payload: true})

    if (
      response[0]?.status === 200 &&
      response[1]?.status === 200
    ) {
      pageDispatch({
        type: actions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response[0]?.data?.data)
              ? response[0].data.data
              : [],
          },
          pagination: {
            active: opt?.activePage || 0,
            amount: table.pagination.amount,
            total: response[1]?.data?.data?.total
              ? Math.ceil(
                  response[1].data.data.total / table.pagination.amount,
                )
              : 0,
            totalItems: response[1]?.data?.data?.total || 0,
          },
          panels: {
            total_beginning: response[1]?.data?.data?.total_beginning || 0,
            total_payment: response[1]?.data?.data?.total_payment || 0,
            total_receipt: response[1]?.data?.data?.total_receipt || 0,
          },
        },
      })

      if (opt?.forcusInputOnSuccess) {
        pageDispatch({
          type: actions.FOCUS_INPUT,
          payload: true,
        })
      }
    }

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: actions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
      })

  }

  const filterTagDelete = t => {
    pageDispatch({type: actions.TAG_FILTER_DELETE, payload: {type: t}})
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
      case CASHBOOKS_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break

      case CASHBOOKS_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, receipt_type: '', receipt_type_id: ''}
        break

      case CASHBOOKS_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, payment_method_id: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchCashBooksByFilter(collection)
  }

  const filterTagDeleteAll = () => {
    CASHBOOKS_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: actions.TAG_FILTER_DELETE,
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
      payment_method_id: '',
      receipt_type: '',
      receipt_type_id: '',
      date_type: CASHBOOKS_FILTER_FORM_DATE_TIME_SORT_TYPES[0].value,
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchCashBooksByFilter(collection)
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
    paymentMethod: {
      activeValue: paymentMethodActiveValue,
      keyword: paymentMethodKeyword,
      list: paymentMethodList,
      tab: paymentMethodTab,
      value: paymentMethodValue,
      onChange: handlePaymentMethodChange,
      onInputReset: handlePaymentMethodResetInput,
      onKeywordChange: handlePaymentMethodKeywordChange,
      onTabChange: handlePaymentMethodTabChange,
    },
    receiptType: {
      activeValue: receiptTypeActiveValue,
      categoryList: receiptTypeCategoryList,
      categoryValue: receiptTypeCategoryValue,
      value: receiptTypeValue,
      list: receiptTypeList,
      keyword: receiptTypeKeyword,
      onChange: handleReceiptTypeChange,
      onKeywordChange: handleReceiptTypeKeywordChange,
      onInputReset: handleReceiptTypeResetInput,
    },
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    functions: {
      applyCashBooksOtherFilter,
      fetchOrderWithCurrentFilter: () => fetchCashBooksByFilter(queries),
      filterTagDelete,
      filterTagDeleteAll,
      fetchUpdateData: () =>
        fetchCashBooksByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active, notClearDetail: true},
        ),
    },
    canSubmitOtherFilter,
    loading: table.loading
  }
}

export default CashBooksFilterForm
