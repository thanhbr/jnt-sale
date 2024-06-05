import { sendRequestAuth } from 'api/api'
import { removeAcent } from 'common/fieldText/_functions'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
  ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST,
} from '../interfaces/_constants'
import { ImportContext } from '../provider/_context'
import { formatDateTimeDefaultValue, importActions } from '../provider/_reducer'
import { getDateFromNow } from '../utils/date'
import { debounce } from '@mui/material'
import { importInitialState } from 'Pages/Report/Warehouse/Pages/Import/provider/_reducer'
import { useSearchParams } from 'react-router-dom'
import { actionTypes } from '../../../../../purchases/provider/_reducer'

const useImportFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pageState, pageDispatch } = useContext(ImportContext)
  const { filter, table } = pageState

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
  const dateTimeDefaultValue = [
    querySearch ? '' : getDateFromNow(-7, { type: 'start' }),
    querySearch ? '' : getDateFromNow(0, { type: 'end' }),
  ]
  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeValue = filter.dateTime.value
  const dateTimeTrigger = filter.dateTime.trigger

  const handleDateTimeChange = data =>
    pageDispatch({
      type: importActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[1],
        start: data.value[0],
        type: data.category,
        value: data.formatValue,
      },
    })

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
      type: importActions.FILTER_WAREHOUSE_UPDATE,
      payload: { value: data },
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
      type: importActions.FILTER_WAREHOUSE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: warehouseListData,
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
      payload: { value: data },
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
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue),
    JSON.stringify(supplierActiveValue) !== JSON.stringify(supplierValue),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!warehouseActiveValue?.value,
    !!supplierActiveValue?.value,
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
    warehouse_id: warehouseActiveValue?.value || '',
    supplier_id: filter.supplier.activeValue?.value || '',
    per_page: table.pagination.amount,
    start: 0,
  }

  const debounceImportByFilter = useCallback(debounce((keyword, queries) => {
    fetchImportByFilter(
      { ...queries, keyword: keyword.trim() },
      { forceLoading: true },
    )
  }, 500), [])

  const handleSearchChange = e => {
    if (e.target.value === ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: importActions.FILTER_SEARCH_UPDATE,
      payload: { value: keyword },
    })
    debounceImportByFilter(keyword, queries)
  }

  const applyImportOtherFilter = async () => {
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
      warehouse_id: warehouseValue?.value || '',
      supplier_id: supplierValue?.value || '',
    }

    fetchImportByFilter(collection, { forceLoading: true })
  }

  const fetchImportByFilter = async (qs, opt) => {
    setSearchParams('')
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: importActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: true } } },
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/report/warehouses/purchase${queryString}`),
      sendRequestAuth('get', `${config.API}/report/warehouses/purchase/total${queryString}`),
    ])

    if (response[0]?.status === 200 && response[1]?.status === 200) {
      if (!!opt?.delete)
        pageDispatch({
          type: importActions.DELETE_APPLY,
          payload: {
            display: {
              list: Array.isArray(response[0]?.data?.data)
                ? response[0].data.data
                : [],
            },
            panels: {
              totals: response[1]?.data?.data?.totals || 0,
              importTotal: response[1]?.data?.data?.total_quantity || 0,
              importValueTotal: response[1]?.data?.data?.total_purchase || 0,
              paymentTotal: response[1]?.data?.data?.total_payment || 0,
              debtsTotal: +response[1]?.data?.data?.total_purchase - +response[1]?.data?.data?.total_payment,
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
      else
        pageDispatch({
          type: importActions.OTHER_FILTER_APPLY,
          payload: {
            display: {
              list: Array.isArray(response[0]?.data?.data)
                ? response[0].data.data
                : [],
            },
            panels: {
              totals: response[1]?.data?.data?.totals || 0,
              importTotal: response[1]?.data?.data?.total_quantity || 0,
              importValueTotal: response[1]?.data?.data?.total_purchase || 0,
              paymentTotal: response[1]?.data?.data?.total_payment || 0,
              debtsTotal: +response[1]?.data?.data?.total_purchase - +response[1]?.data?.data?.total_payment,
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
        type: importActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: importActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })

    pageDispatch({
      type: importActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: { id: null },
    })
  }

  const filterTagDelete = t => {
    pageDispatch({
      type: importActions.TAG_FILTER_DELETE,
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
          type: importActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          payload: { trigger: null },
        })

        break

      case ORDER_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break

      case ORDER_FILTER_TAG_FIELDS[1]:
        tmpCollection = { ...tmpCollection, warehouse_id: '' }
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = { ...tmpCollection, supplier_id: '' }
        break

      default:
        break
    }

    const collection = { ...queries, ...tmpCollection }

    fetchImportByFilter(collection, { forceLoading: true, delete: true })
  }

  const filterTagDeleteAll = isSoft => {
    ORDER_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: importActions.TAG_FILTER_DELETE,
        payload: { type: item },
      }),
    )

    pageDispatch({
      type: importActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
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
      warehouse_id: '',
      supplier_id: '',
    }

    fetchImportByFilter(collection, { forceLoading: true })
  }

  const handlePrint = _ => {
    // in
    let content = document.getElementById('purchase-print').innerHTML

    pageDispatch({ type: 'UPDATE_LOADING', payload: true })
    let frame = document.createElement('iframe')
    frame.name = 'frame'
    frame.style.position = 'absolute'
    frame.style.top = '-1000000px'
    document.body.appendChild(frame)
    const frameDoc = frame.contentWindow
      ? frame.contentWindow
      : frame.contentDocument.document
        ? frame.contentDocument.document
        : frame.contentDocument
    frameDoc.document.open()
    frameDoc.document.write(content)
    frameDoc.document.close()
    window.frames.frame.focus()
    setTimeout(function () {
      pageDispatch({ type: 'UPDATE_LOADING', payload: false })
      window.frames.frame.print()
      document.body.removeChild(frame)
    }, 1500)
    return true
  }
  return {
    badge: {
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
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    warehouse: {
      activeValue: warehouseActiveValue,
      keyword: warehouseKeyword,
      list: warehouseList,
      value: warehouseValue,
      onChange: handleWarehouseChange,
      onKeywordChange: handleWarehouseKeywordChange,
    },
    supplier: {
      activeValue: supplierActiveValue,
      keyword: supplierKeyword,
      list: supplierList,
      value: supplierValue,
      onChange: handleSupplierChange,
      onKeywordChange: handleSupplierKeywordChange,
    },
    canSubmitOtherFilter,
    queries,
    functions: {
      print: handlePrint,
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue) !==
        JSON.stringify(importInitialState.filter.dateTime.activeValue),
        !!warehouseActiveValue?.name,
      ].includes(true),
      applyImportOtherFilter,
      refresh: () =>
        fetchImportByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, forceLoading: true },
        ),
      fetchUpdateData: () =>
        fetchImportByFilter(
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

export default useImportFilterForm
