import {debounce} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext} from 'react'
import {useSearchParams} from 'react-router-dom'
import {DateRangePicker} from 'rsuite'
import {fNumber} from '../../../util/formatNumber'
import {WAREHOUSE_TS_FILTER_TAG_FIELDS} from '../interfaces/_constants'
import {WareHouseTransferContext} from '../provider/_context'
import {warehouseTransferActions} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'

const useWareHouseTransferFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(WareHouseTransferContext)
  const {filter, table} = pageState
  const {warehouseExport, warehouseImport, createdUser} = filter
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value

  const debounceSearchChange = useCallback(
    debounce((keyword, queries) => {
      pageDispatch({type: 'SET_LOADING', payload: false})
      fetchWareHouseTransferByFilter(
        {...queries, keyword: keyword.trim()},
        [],
        {forcusInputOnSuccess: true},
      )
    }, 500),
    [],
  )
  const handleSearchChange = (e, queries) => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    pageDispatch({
      type: warehouseTransferActions.FILTER_SEARCH_UPDATE,
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
      type: warehouseTransferActions.FILTER_ADVANCED_SEARCH_UPDATE,
      payload: {
        customer: {keyword: val, value: val ? null : ''},
        itemDetails: id,
      },
    })
    fetchWareHouseTransferByFilter({
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
      type: warehouseTransferActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[0],
        start: data.value[1],
        type: data.category,
        value: data.formatValue,
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue.value !== dateTimeValue,
    warehouseExport.activeValue?.value !== warehouseExport.value?.value,
    warehouseImport.activeValue?.value !== warehouseImport.value?.value,
    createdUser.activeValue?.length !== createdUser.value?.length,
  ].includes(true)
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!warehouseExport.activeValue?.value,
    !!warehouseImport.activeValue?.value,
    !!createdUser.activeValue?.length,
  ].filter(item => item === true).length

  const queries = {
    keyword: searchValue || '',
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
        : '',
    warehouse_export: warehouseExport.value?.value || '',
    warehouse_import: warehouseImport.value?.value || '',
    user_id: createdUser.value.map(user => user.value) || [],
    per_page: table.pagination.amount,
    start: 0,
  }

  const applyWareHouseTransferOtherFilter = async (
    shippingStatus,
    withPagination = false,
  ) => {
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
      start: withPagination
        ? table.pagination.active * table.pagination.amount
        : 0,
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchWareHouseTransferByFilter(collection, status, {
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

  const fetchWareHouseTransferByFilter = async (qs, checkedStatus, opt) => {
    setSearchParams('')

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: warehouseTransferActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: true}}},
      })

    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/warehouse/transfer/list${convertQuery(qs)}`,
      ),
    ])

    pageDispatch({type: 'SET_LOADING', payload: true})

    if (response[0]?.status === 200) {
      pageDispatch({
        type: warehouseTransferActions.OTHER_FILTER_APPLY,
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
              ? Math.ceil(response[0].data.meta.total / table.pagination.amount)
              : 0,
            totalItems: response[0]?.data?.meta?.total || 0,
          },
        },
      })

      if (opt?.forcusInputOnSuccess) {
        pageDispatch({
          type: warehouseTransferActions.FOCUS_INPUT,
          payload: true,
        })
      }
    }
    if (!!!opt?.notClearDetail)
      pageDispatch({
        type: warehouseTransferActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: null},
      })

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: warehouseTransferActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
      })
  }
  const filterTagDelete = t => {
    pageDispatch({
      type: warehouseTransferActions.TAG_FILTER_DELETE,
      payload: {type: t},
    })
    pageDispatch({type: 'SET_LOADING', payload: false})
    let tmpCollection = {}
    switch (t) {
      case WAREHOUSE_TS_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
          start_date: '',
          end_date: '',
        }
        pageDispatch({
          type: 'FILTER_DATE_TIME_TRIGGER_UPDATE',
          payload: {trigger: null},
        })
        break
      case WAREHOUSE_TS_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, warehouse_export: ''}
        break

      case WAREHOUSE_TS_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, warehouse_import: ''}
        break

      case WAREHOUSE_TS_FILTER_TAG_FIELDS[3]:
        tmpCollection = {...tmpCollection, user_id: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}

    fetchWareHouseTransferByFilter(collection)
  }

  const filterTagDeleteAll = () => {
    WAREHOUSE_TS_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: warehouseTransferActions.TAG_FILTER_DELETE,
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
      user_id: '',
      warehouse_export: '',
      warehouse_import: '',
    }
    pageDispatch({type: 'SET_LOADING', payload: false})
    fetchWareHouseTransferByFilter(collection)
  }

  // ===== ===== ===== ===== =====
  // CREATED_USER
  // ===== ===== ===== ===== =====
  const createdUserActiveValue = filter.createdUser.activeValue
  const createdUserKeyword = filter.createdUser.keyword
  const createdUserList = filter.createdUser.list
  const createdUserLoading = filter.createdUser.loading
  const createdUserTab = filter.createdUser.tab
  const createdUserValue = filter.createdUser.value

  const fetchCreatedUser = async keyword => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/admin/users?keyword=${keyword}`,
    )

    return response
  }

  const handleCreatedUserChange = data => {
    const find = createdUserValue.find(item => item.value === data.value)
    const createdUserListData =
      createdUserTab === 'checked'
        ? createdUserValue.filter(item => item.value !== data.value)
        : createdUserList
    const createdUserValueData = find
      ? createdUserValue.filter(item => item.value !== data.value)
      : [...createdUserValue, data]

    pageDispatch({
      type: warehouseTransferActions.FILTER_CREATED_USER_UPDATE,
      payload: {
        list: createdUserListData,
        value: createdUserValueData,
      },
    })
  }

  let createdUserKeywordTimeout
  const handleCreatedUserKeywordChange = data => {
    if (createdUserTab === 'all') {
      clearTimeout(createdUserKeywordTimeout)

      createdUserKeywordTimeout = setTimeout(() => {
        pageDispatch({
          type: warehouseTransferActions.FILTER_CREATED_USER_ENABLE_LOADING,
        })

        const keyword = data?.value || ''
        const response = fetchCreatedUser(keyword)
        response.then(res => {
          if (res?.status === 200) {
            const createdUserListData = res?.data?.data || []

            pageDispatch({
              type: warehouseTransferActions.FILTER_CREATED_USER_KEYWORD_UPDATE,
              payload: {
                isFetchNew: true,
                keyword: keyword,
                list: createdUserListData.map(item => ({
                  data: item || null,
                  name: item?.fullname || '',
                  value: item?.user_id || '',
                })),
              },
            })
          }
        })
      }, 300)
    } else if (createdUserTab === 'checked') {
      const formatDataValue = data?.value
        ? removeAcent(data?.value?.toLowerCase())
        : ''

      const createdUserListData = createdUserValue.filter(item => {
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
        type: warehouseTransferActions.FILTER_CREATED_USER_KEYWORD_UPDATE,
        payload: {
          keyword: data?.value || '',
          list: createdUserListData,
        },
      })
    }
  }
  const handleCreatedUserResetInput = () => {
    pageDispatch({
      type: warehouseTransferActions.FILTER_CREATED_USER_UPDATE,
      payload: {
        list: createdUserList,
        value: [],
      },
    })
  }
  const handleCreatedUserTabChange = tab => {
    let createdUserListData = []
    if (tab === 'checked') {
      createdUserListData = createdUserValue

      pageDispatch({
        type: warehouseTransferActions.FILTER_CREATED_USER_TAB_UPDATE,
        payload: {list: createdUserListData, tab},
      })
    } else {
      const response = fetchCreatedUser(createdUserKeyword)
      response.then(res => {
        if (res?.status === 200) {
          const createdUserListData = res?.data?.data || []

          pageDispatch({
            type: warehouseTransferActions.FILTER_CREATED_USER_KEYWORD_UPDATE,
            payload: {
              keyword: createdUserKeyword,
              list: createdUserListData.map(item => ({
                data: item || null,
                name: item?.fullname || '',
                value: item?.user_id || '',
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
  // WAREHOUSE EXPORT
  // ===== ===== ===== ===== =====
  const warehouseExportActiveValue = filter.warehouseExport.activeValue
  const warehouseExportKeyword = filter.warehouseExport.keyword
  const warehouseExportList = filter.warehouseExport.list
  const warehouseExportListOrigin = filter.warehouseExport.originList
  const warehouseExportValue = filter.warehouseExport.value

  const handleWarehouseExportChange = data =>
    pageDispatch({
      type: warehouseTransferActions.FILTER_WAREHOUSE_EXPORT_UPDATE,
      payload: {value: data},
    })

  const handleWarehouseExportKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const warehouseExportListData = warehouseExportListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: warehouseTransferActions.FILTER_WAREHOUSE_EXPORT_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: warehouseExportListData,
      },
    })
  }

  // ===== ===== ===== ===== =====
  // WAREHOUSE IMPORT
  // ===== ===== ===== ===== =====
  const warehouseImportActiveValue = filter.warehouseImport.activeValue
  const warehouseImportKeyword = filter.warehouseImport.keyword
  const warehouseImportList = filter.warehouseImport.list
  const warehouseImportListOrigin = filter.warehouseImport.originList
  const warehouseImportValue = filter.warehouseImport.value

  const handleWarehouseImportChange = data =>
    pageDispatch({
      type: warehouseTransferActions.FILTER_WAREHOUSE_IMPORT_UPDATE,
      payload: {value: data},
    })

  const handleWarehouseImportKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const warehouseImportListData = warehouseImportListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: warehouseTransferActions.FILTER_WAREHOUSE_IMPORT_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: warehouseImportListData,
      },
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ==

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
    warehouseExport: {
      ...warehouseExport,
      onChange: handleWarehouseExportChange,
      onKeywordChange: handleWarehouseExportKeywordChange,
    },
    warehouseImport: {
      ...warehouseImport,
      onChange: handleWarehouseImportChange,
      onKeywordChange: handleWarehouseImportKeywordChange,
    },
    createdUser: {
      ...createdUser,
      loading: createdUserLoading,
      onKeywordChange: handleCreatedUserKeywordChange,
      onTabChange: handleCreatedUserTabChange,
      onChange: handleCreatedUserChange,
      onInputReset: handleCreatedUserResetInput,
    },
    functions: {
      applyWareHouseTransferOtherFilter,
      fetchOrderWithCurrentFilter: () =>
        fetchWareHouseTransferByFilter(queries),
      filterTagDelete,
      filterTagDeleteAll,
      fetchUpdateData: () =>
        fetchWareHouseTransferByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          [],
          {activePage: table.pagination.active, notClearDetail: true},
        ),
    },
    canSubmitOtherFilter,
    loading: table.loading,
  }
}

export default useWareHouseTransferFilterForm
