import {debounce} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import moment from 'moment'
import {useCallback, useContext, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {DateRangePicker} from 'rsuite'
import {PURCHASES_FILTER_TAG_FIELDS} from '../interfaces/_constants'
import {PurchasesContext} from '../provider/_context'
import {actionTypes} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'

const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {filter, table} = pageState

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value

  const debounceSearchChange = useCallback(
    debounce((keyword, queries) => {
      pageDispatch({type: 'SET_LOADING', payload: false})
      fetchPurchasesByFilter(
        {...queries, keyword: keyword.trim()},
        {
          forcusInputOnSuccess: true,
        },
      )
    }, 500),
    [],
  )

  const handleSearchChange = (e, queries) => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: actionTypes.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    debounceSearchChange(keyword, queries)
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
    let value = ''
    if (data.formatValue !== 'NaN/NaN/NaN NaN:NaN - NaN/NaN/NaN NaN:NaN') value = data.formatValue
    if (!value) return

    pageDispatch({
      type: actionTypes.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[0],
        start: data.value[1],
        type: data.category,
        value: value,
        date_type: '',
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // SUPPLIER
  // ===== ===== ===== ===== =====
  const supplierActiveValue = filter.supplier.activeValue
  const supplierKeyword = filter.supplier.keyword
  const supplierList = filter.supplier.list
  const supplierListOrigin = filter.supplier.listOrigin
  const supplierValue = filter.supplier.value

  const handleSupplierChange = data =>
    pageDispatch({
      type: actionTypes.FILTER_SUPPLIER_UPDATE,
      payload: {value: data},
    })

  const handleSupplierKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const supplierListData = supplierListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: actionTypes.FILTER_SUPPLIER_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: supplierListData,
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
      type: actionTypes.FILTER_WAREHOUSE_UPDATE,
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
      type: actionTypes.FILTER_WAREHOUSE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: warehouseListData,
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
      JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(supplierActiveValue) !== JSON.stringify(supplierValue),
    JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue),
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!supplierActiveValue?.value,
    !!warehouseActiveValue?.value,
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
    supplier_id: supplierActiveValue?.value || '',
    warehouse_id: warehouseActiveValue?.value || '',
    start: table.pagination.active || 0,
    per_page: table.pagination.amount || 20,
    payment_status: filter.payment_status?.value?.join(',') || '',
    warehouse_status: filter.warehouse_status?.value?.join(',') || '',
  }

  const applyPurchasesOtherFilter = async (withPagination = false) => {
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
      supplier_id: supplierValue?.value || '',
      warehouse_id: warehouseValue?.value || '',
      start: withPagination
        ? table.pagination.active * table.pagination.amount
        : 0,
      per_page: table.pagination.amount || 20,
      payment_status: filter.payment_status?.value?.join(',') || '',
      warehouse_status: filter.warehouse_status?.value?.join(',') || '',
    }

    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchPurchasesByFilter(collection, {
      activePage: withPagination ? table.pagination.active : 0,
    })
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

  const fetchPurchasesByFilter = async (qs, opt) => {
    setSearchParams('')

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: 'TABLE_DISPLAY_LOADING_UPDATE',
        payload: {table: {display: {loading: true}}},
      })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/purchase/list${convertQuery(qs)}`,
    )

    pageDispatch({type: 'SET_LOADING', payload: true})

    if (response?.data?.success) {
      pageDispatch({
        type: actionTypes.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response?.data?.data)
              ? response.data.data
              : [],
          },
          pagination: {
            active: opt?.activePage || 0,
            amount: table.pagination.amount,
            total: Math.ceil(Number(response?.data?.meta.totals) /  Number(response?.data?.meta.per_page)),
            totalItems: Number(response?.data?.meta.totals),
          },
        },
      })

      if (opt?.forcusInputOnSuccess) {
        pageDispatch({
          type: actionTypes.FOCUS_INPUT,
          payload: true,
        })
      }
    }
    if (!!!opt?.notClearDetail)
      pageDispatch({
        type: actionTypes.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: null},
      })

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: actionTypes.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
      })
  }
  
  const filterTagDelete = t => {
    pageDispatch({type: actionTypes.TAG_FILTER_DELETE, payload: {type: t}})
    pageDispatch({type: 'SET_LOADING', payload: false})
    let tmpCollection = {}
    switch (t) {
      case PURCHASES_FILTER_TAG_FIELDS[0]:
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

      case PURCHASES_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, supplier_id: ''}
        break

      case PURCHASES_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, warehouse_id: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchPurchasesByFilter(collection)
  }

  const filterTagDeleteAll = () => {
    PURCHASES_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: actionTypes.TAG_FILTER_DELETE,
        payload: {type: item},
      }),
    )
    pageDispatch({
      type: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
      payload: {
        trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
      },
    })
    const collection = {
      ...queries,
      start_date: '',
      end_date: '',
      warehouse_id: '',
      supplier_id: '',
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchPurchasesByFilter(collection)
  }

  const handleOpenImportExcel = () => {
    pageDispatch({type: 'UPDATE_SHOW_EXPORT', payload: true})
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
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    supplier: {
      activeValue: supplierActiveValue,
      keyword: supplierKeyword,
      list: supplierList,
      value: supplierValue,
      onChange: handleSupplierChange,
      onKeywordChange: handleSupplierKeywordChange,
    },
    warehouse: {
      activeValue: warehouseActiveValue,
      keyword: warehouseKeyword,
      list: warehouseList,
      value: warehouseValue,
      onChange: handleWarehouseChange,
      onKeywordChange: handleWarehouseKeywordChange,
    },
    functions: {
      applyPurchasesOtherFilter,
      handleOpenImportExcel,
      fetchOrderWithCurrentFilter: () => fetchPurchasesByFilter(queries),
      filterTagDelete,
      filterTagDeleteAll,
      fetchUpdateData: () =>
        fetchPurchasesByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active, notClearDetail: true},
        ),
    },
    canSubmitOtherFilter,
    loading: table.loading,
  }
}

export default useFilter
