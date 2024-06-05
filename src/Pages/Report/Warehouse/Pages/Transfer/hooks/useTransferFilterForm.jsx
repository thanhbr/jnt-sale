import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import {TransferContext} from '../provider/_context'
import {formatDateTimeDefaultValue, transferActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import { debounce } from '@mui/material'
import {importInitialState} from 'Pages/Report/Warehouse/Pages/Transfer/provider/_reducer'
import { useSearchParams } from 'react-router-dom'

const useTransferFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(TransferContext)
  const {filter, table} = pageState

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

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
      type: transferActions.FILTER_DATE_TIME_UPDATE,
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
      type: transferActions.FILTER_WAREHOUSE_UPDATE,
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
      type: transferActions.FILTER_WAREHOUSE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: warehouseListData,
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // RECEIVE WAREHOUSE
  // ===== ===== ===== ===== =====
  const receiveWarehouseActiveValue = filter.receiveWarehouse.activeValue
  const receiveWarehouseKeyword = filter.receiveWarehouse.keyword
  const receiveWarehouseList = filter.receiveWarehouse.list
  const receiveWarehouseListOrigin = filter.receiveWarehouse.listOrigin
  const receiveWarehouseValue = filter.receiveWarehouse.value

  const handleReceiveWarehouseChange = data =>
    pageDispatch({
      type: transferActions.FILTER_RECEIVE_WAREHOUSE_UPDATE,
      payload: {value: data},
    })

  const handleReceiveWarehouseKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const receiveWarehouseListData = receiveWarehouseListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: transferActions.FILTER_RECEIVE_WAREHOUSE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: receiveWarehouseListData,
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue ||
      JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
    JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue),
    JSON.stringify(receiveWarehouseActiveValue) !== JSON.stringify(receiveWarehouseValue),
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!warehouseActiveValue?.value,
    !!receiveWarehouseActiveValue?.value,
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
    warehouse_transfer: warehouseActiveValue?.value || '',
    warehouse_receive: receiveWarehouseActiveValue?.value || '',
    per_page: table.pagination.amount,
    start: 0,
  }


  const debounceTransferByFilter = useCallback(debounce((keyword, queries) => {
    fetchTransferByFilter(
      {...queries, keyword: keyword.trim()},
      {forceLoading: true},
    )
  }, 500), [])

  const handleSearchChange = e => {
    if (e.target.value === ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ' ') || ''
    pageDispatch({
      type: transferActions.FILTER_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    debounceTransferByFilter(keyword, queries)
  }


  const applyTransferOtherFilter = async () => {
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
      warehouse_transfer: warehouseValue?.value || '',
      warehouse_receive: receiveWarehouseValue?.value || '',
    }

    fetchTransferByFilter(collection, {forceLoading: true})
  }


  const fetchTransferByFilter = async (qs, opt) => {
    setSearchParams('')
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: transferActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: true}}},
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth('get', `${config.API}/report/warehouses/transfer${queryString}`)

    if (!!response?.data?.success) {
      if(opt?.delete){

        pageDispatch({
          type: transferActions.DELETE_APPLY,
          payload: {
            display: {
              list: Array.isArray(response?.data?.data)
                ? response.data.data
                : [],
            },
            panels: response?.data?.meta,
            pagination: {
              active: opt?.activePage || 0,
              amount: table.pagination.amount,
              total: response?.data?.meta?.totals
                ? Math.ceil(
                  response?.data?.meta?.totals / table.pagination.amount,
                )
                : 0,
              totalItems: response?.data?.meta?.totals || 0,
            },
          },
        })
      }else{

        pageDispatch({
          type: transferActions.OTHER_FILTER_APPLY,
          payload: {
            display: {
              list: Array.isArray(response?.data?.data)
                ? response.data.data
                : [],
            },
            panels: response?.data?.meta,
            pagination: {
              active: opt?.activePage || 0,
              amount: table.pagination.amount,
              total: response?.data?.meta?.totals
                ? Math.ceil(
                  response?.data?.meta?.totals / table.pagination.amount,
                )
                : 0,
              totalItems: response?.data?.meta?.totals || 0,
            },
          },
        })
      }
    }

    if (!!!opt?.notClearDetail)
      pageDispatch({
        type: transferActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: null},
      })

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: transferActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
      })

    pageDispatch({
      type: transferActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: {id: null},
    })
  }

  const filterTagDelete = t => {
    pageDispatch({
      type: transferActions.TAG_FILTER_DELETE,
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
          type: transferActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          payload: {trigger: null},
        })

        break

      case ORDER_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break

      case ORDER_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, warehouse_transfer: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, warehouse_receive: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchTransferByFilter(collection, {forceLoading: true, delete: true})
  }

  const filterTagDeleteAll = isSoft => {
    ORDER_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: transferActions.TAG_FILTER_DELETE,
        payload: {type: item},
      }),
    )

    pageDispatch({
      type: transferActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
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
      warehouse_transfer: '',
      warehouse_receive: '',
    }

    fetchTransferByFilter(collection, {forceLoading: true})
  }


  const handlePrint = _ => {
    // in
    let content = document.getElementById('transfer-print')
    content = content.innerHTML
    pageDispatch({type: 'UPDATE_LOADING', payload: true})
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
      pageDispatch({type: 'UPDATE_LOADING', payload: false})
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
    receiveWarehouse: {
      activeValue: receiveWarehouseActiveValue,
      keyword: receiveWarehouseKeyword,
      list: receiveWarehouseList,
      value: receiveWarehouseValue,
      onChange: handleReceiveWarehouseChange,
      onKeywordChange: handleReceiveWarehouseKeywordChange,
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
      applyTransferOtherFilter,
      refresh: () =>
        fetchTransferByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          {activePage: table.pagination.active, forceLoading: true},
        ),
      fetchUpdateData: () =>
        fetchTransferByFilter(
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

export default useTransferFilterForm
