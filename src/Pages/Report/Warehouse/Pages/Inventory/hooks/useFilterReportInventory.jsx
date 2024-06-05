import React, {useCallback, useContext, useState} from 'react';
import { debounce } from '@mui/material'
import {ReportInventoryContext} from "../provider/context";
import {convertDateTimeToApiFormat} from "../../../../../../common/form/datePicker/_functions";
import {sendRequestAuth} from "../../../../../../api/api";
import config from "../../../../../../config";
import {
  reportInventoryActions,
} from "../provider/initState";
import {DateRangePicker} from "rsuite";
import {getDateFromNow, highlightGroupProduct} from "../interfaces/_util";
import {removeAcent} from "../../../../../../common/fieldText/_functions";
import useAlert from "../../../../../../hook/useAlert";


const useFilterReportInventory = () => {
  const {pageState, pageDispatch} = useContext(ReportInventoryContext)
  const {showAlert} = useAlert()
  const [groupParent, setGroupParent] = useState('')
  const filter = pageState?.filter
  const keyword = filter?.keyword || ''
  const panels = pageState?.panels
  const displayList = pageState?.table?.display
  const pagination = pageState?.table?.pagination
  const [debounceRefresh, setDebounceRefresh] = useState(true)

  // ============ SEARCH ================
  const handleChangeSearch = e => {
    pageDispatch({
      type: reportInventoryActions.FILTER_CHANGE_SEARCH_KEYWORD,
      payload: e.target.value
    })
    debounceChangeSearch({...queries, keyword: e.target.value?.trim()})
  }
  const debounceChangeSearch = useCallback(debounce((data) => {
    fetchReportInventory(data)
  }, 500), [])
  // ============ END SEARCH ================



  // ===== ===== ===== DATE TIME ===== ===== =====
  const {afterToday} = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeValue = filter?.dateTime?.value
  const dateTimeDefaultValue =
    !!dateTimeValue ? [
                      getDateFromNow(-30, {type: 'start'}),
                      getDateFromNow(0, {type: 'end'}),
                    ]
                  : ''
  const dateTimeTrigger = filter?.dateTime?.trigger

  const handleDateTimeChange = data => {
    pageDispatch({
      type: reportInventoryActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[1],
        start: data.value[0],
        type: data.category,
        value: data.formatValue,
      },
    })
  }
  // ===== ===== ===== END DATE TIME ===== ===== =====



  // ===== ===== ===== WAREHOUSE ===== ===== =====
  const warehouseActiveValue = filter?.warehouse?.activeValue
  const warehouseKeyword = filter?.warehouse?.keyword
  const warehouseList = filter?.warehouse?.list
  const warehouseListOrigin = filter?.warehouse?.listOrigin
  const warehouseValue = filter?.warehouse?.value

  const handleWarehouseChange = cate => {
    pageDispatch({
      type: reportInventoryActions.FILTER_WAREHOUSE_UPDATE_VALUE,
      payload: cate
    })
  }

  const handleWarehouseKeywordChange = cate => {
    pageDispatch({
      type: reportInventoryActions.FILTER_WAREHOUSE_CHANGE_KEYWORD,
      payload: cate?.value
    })
    const formatDataValue = cate?.value
      ? removeAcent(cate?.value?.trim()?.toLowerCase())
      : ''
    const warehouseListData = [...warehouseListOrigin.filter(item => {
      const formatNameItem = item?.warehouse_name
        ? removeAcent(item.warehouse_name.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: reportInventoryActions.FILTER_WAREHOUSE_UPDATE_LIST,
      payload: warehouseListData
    })
  }
  // ===== ===== ===== END WAREHOUSE ===== ===== =====



  // ===== ===== ===== GROUP PRODUCT ===== ===== =====
  const groupProductID = filter?.groupProduct?.id
  const groupProductActiveValue = filter?.groupProduct?.activeValue
  const groupProductSearch = filter?.groupProduct?.search
  const groupProductValue = filter?.groupProduct?.value
  const groupProductList = filter?.groupProduct?.list
  const groupProductListChildTwo = filter?.groupProduct?.listChildTwo

  const handleGroupProductKeywordChange = data => {
    debounceGroupProductKeywordChange(data?.value)
  }

  const debounceGroupProductKeywordChange = useCallback(
    debounce((keyword) => {
      handleGroupProductSearch(keyword?.trim())
    }, 500),
    [],
  )

  const handleGroupProductSearch = async keyword => {
    const response = await sendRequestAuth( 'get', `${config.API}/product/category/list?keyword=${keyword}&status&per_page=200&start=0`)
    if(response?.data?.success) {
      pageDispatch({
        type: reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_KEYWORD,
        payload: {
          keyword: keyword,
          list: highlightGroupProduct(keyword, response?.data?.data)
        }
      })
    }
  }

  const handleSelectParent = (target, value) => {
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_LIST_CHILDREN_TWO,
      payload: value?.category_childs
    })

    if(value?.category_childs?.length !== 0) {
      target.stopPropagation()
      setGroupParent(value?.category_name)
    } else {
      pageDispatch({
        type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_VALUE,
        payload: value?.category_name
      })
      pageDispatch({
        type: reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_ID,
        payload: value?.id
      })
    }
  }

  const handleSelectChild = value => {
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_ID,
      payload: !!value ? value?.id : ''
    })
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_VALUE,
      payload: !!value ? `${groupParent} - ${value?.category_name}` : ''
    })
  }

  const handleSelectSearchParent = value => {
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_ID,
      payload: value?.id
    })
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_VALUE,
      payload: value?.parent_code ? `${value?.parent_name} - ${value?.category_name}` : value?.category_name
    })
  }

  // ===== ===== ===== END GROUP PRODUCT ===== ===== =====

  // ===== ===== ===== QUERIES ===== ===== =====
  const queries = {
    keyword: filter?.keyword || '',
    start_date:
      filter?.dateTime?.start && filter?.dateTime.value
        ? convertDateTimeToApiFormat(filter?.dateTime?.value?.split(' - ')[0])
        : '',
    end_date:
      filter?.dateTime?.end && filter?.dateTime.value
        ? convertDateTimeToApiFormat(filter?.dateTime?.value?.split(' - ')[1])
        : '',
    warehouse_id: warehouseValue?.id || '',
    category_id: filter?.groupProduct?.id || '',
    per_page: filter?.per_page || 20,
    start: filter?.start || 0,
  }

  const fetchReportInventory = async (qs) => {
    pageDispatch({type: reportInventoryActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: [], loading: true}})

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth( 'get', `${config.API}/report/warehouses/stock${queryString}`,)
    if (response?.data?.success) {
      const receipts = response?.data?.data
      pageDispatch({
        type: reportInventoryActions.PANEL_UPDATE,
        payload: {
          totalQuantity: response?.data?.meta?.total_quantity,
          totalAmount: response?.data?.meta?.total_amount
        }
      })
      pageDispatch({
        type: reportInventoryActions?.TABLE_DISPLAY_DATA_UPDATE,
        payload: {
          list: receipts, loading: false
        }
      })
      pageDispatch({
        type: reportInventoryActions?.TABLE_PAGINATION_UPDATE,
        payload: {
          active: response?.data?.meta?.start,
          amount: response?.data?.meta?.per_page,
          total: Math.ceil(response?.data?.meta?.totals / response?.data?.meta?.per_page),
          totalItems: response?.data?.meta?.totals
        }
      })
    }
  }
  // ===== ===== ===== END QUERIES ===== ===== =====

  const countReportInventoryFilter = [
    // !!dateTimeActiveValue?.value,
    !!warehouseActiveValue?.id,
    !!groupProductActiveValue,
  ].filter(item => item === true).length

  const canSubmitOtherFilter = [
    // dateTimeActiveValue.value !== dateTimeValue,
    !!warehouseValue?.id && JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue),
    !!groupProductValue && JSON.stringify(groupProductActiveValue?.name) !== JSON.stringify(groupProductValue),
  ].includes(true)

  const shouldShowResetAll = [
    // JSON.stringify(dateTimeActiveValue) !==
    // JSON.stringify(reportInventoryState.filter.dateTime.activeValue) ||
    warehouseActiveValue?.id?.length > 0 ||
    groupProductActiveValue?.id?.length > 0
  ].includes(true)

  const applyOtherFilter = _ => {
    if(!!dateTimeValue) {
      pageDispatch({
        type: reportInventoryActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
        payload: {
          end: filter?.dateTime?.end,
          start: filter?.dateTime?.start,
          value: dateTimeValue,
        }
      })
    }
    if(!!warehouseValue?.id) {
      pageDispatch({
        type: reportInventoryActions.FILTER_ACTIVE_WAREHOUSE_UPDATE,
        payload: warehouseValue
      })
    }
    if(!!groupProductValue) {
      pageDispatch({
        type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_ACTIVE_VALUE,
        payload: {id: filter?.groupProduct?.id, name: groupProductValue}
      })
    }
    fetchReportInventory({...queries})
  }

  const filterTagDelete = type => {
    // const startDateActive = !!dateTimeActiveValue?.value ? convertDateTimeToApiFormat(dateTimeActiveValue?.value?.split(' - ')[0]) : ''
    // const endDateActive = !!dateTimeActiveValue?.value ? convertDateTimeToApiFormat(dateTimeActiveValue?.value?.split(' - ')[1]) : ''
    const startDateActive = ''
    const endDateActive = ''
    switch (type) {
      case 'dateTime':
        pageDispatch({
          type: reportInventoryActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
          payload: ''
        })
        pageDispatch({
          type: reportInventoryActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          payload: dateTimeTrigger
        })
        pageDispatch({
          type: reportInventoryActions.FILTER_DATE_TIME_UPDATE,
          payload: ''
        })
        fetchReportInventory({...queries, start_date: '', end_date: '', warehouse_id: warehouseActiveValue?.id || '', category_id: groupProductActiveValue?.id || ''})
        break
      case 'warehouse':
        pageDispatch({
          type: reportInventoryActions.FILTER_WAREHOUSE_UPDATE_VALUE,
          payload: ''
        })
        pageDispatch({
          type: reportInventoryActions.FILTER_ACTIVE_WAREHOUSE_UPDATE,
          payload: ''
        })
        fetchReportInventory({...queries, start_date: startDateActive, end_date: endDateActive, warehouse_id: '', category_id: groupProductActiveValue?.id || ''})
        break
      case 'groupProduct':
        pageDispatch({
          type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_VALUE,
          payload: ''
        })
        pageDispatch({
          type: reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_ID,
          payload: ''
        })
        pageDispatch({
          type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_ACTIVE_VALUE,
          payload: ''
        })
        fetchReportInventory({...queries, start_date: startDateActive, end_date: endDateActive, warehouse_id: warehouseActiveValue?.id || '', category_id: ''})
        break
      default: ''
    }
  }
  const filterDeleteAll = _ => {
    // pageDispatch({
    //   type: reportInventoryActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
    //   payload: dateTimeTrigger
    // })
    // pageDispatch({
    //   type: reportInventoryActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
    //   payload: {
    //     end: getDateFromNow(0, {type: 'end'}),
    //     start: getDateFromNow(-30, {type: 'start'}),
    //     value: formatDateTimeDefaultValue,
    //   }
    // })
    // pageDispatch({
    //   type: reportInventoryActions.FILTER_DATE_TIME_UPDATE,
    //   payload: {
    //     end: getDateFromNow(0, {type: 'end'}),
    //     start: getDateFromNow(-30, {type: 'start'}),
    //     value: formatDateTimeDefaultValue,
    //   }
    // })

    pageDispatch({
      type: reportInventoryActions.FILTER_WAREHOUSE_UPDATE_VALUE,
      payload: ''
    })
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_CHANGE_ID,
      payload: ''
    })
    pageDispatch({
      type: reportInventoryActions.FILTER_ACTIVE_WAREHOUSE_UPDATE,
      payload: ''
    })
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_VALUE,
      payload: ''
    })
    pageDispatch({
      type: reportInventoryActions.FILTER_GROUP_CUSTOMER_UPDATE_ACTIVE_VALUE,
      payload: ''
    })
    fetchReportInventory({
      ...queries,
      start_date: '',
      end_date: '',
      category_id: '',
      warehouse_id: ''
    })
  }


  // =============== PRINTER ==================
  const handlePrint = () => {
    if(displayList?.list?.length > 0) {
      // in
      let frame = document.createElement('iframe')
      frame.name = "frame"
      frame.style.position = "absolute"
      frame.style.top = "-1000000px"
      document.body.appendChild(frame)

      const frameDoc = (frame.contentWindow) ? frame.contentWindow : (frame.contentDocument.document) ? frame.contentDocument.document : frame.contentDocument
      frameDoc.document.open()
      frameDoc.document.write(document.getElementById('print-report-inventory').innerHTML)
      frameDoc.document.close()
      window.frames.frame.focus()

      window.frames.frame.print()
      document.body.removeChild(frame)
    } else {
      showAlert({type: 'info', content: 'Bạn cần có ít nhất 1 sản phẩm để thực hiện in báo cáo'})
    }
  }
  // ================= END PRINTER ===========


  const handleRefresh = _ => {
    if(debounceRefresh) {
      setDebounceRefresh(false)
      setTimeout(() => setDebounceRefresh(true), 2000)

      fetchReportInventory(queries)
    }
  }


  return {
    dateTime: {
      disabledDate: afterToday(),
      active: dateTimeActiveValue,
      defaultValue: dateTimeDefaultValue,
      value: dateTimeValue,
      triggerDefault: dateTimeTrigger,
      onChange: handleDateTimeChange
    },
    warehouse: {
      active: warehouseActiveValue,
      keyword: warehouseKeyword,
      value: warehouseValue,
      list: warehouseList,
      onChange: handleWarehouseChange,
      onKeywordChange: handleWarehouseKeywordChange,
    },
    groupProduct: {
      id: groupProductID,
      active: groupProductActiveValue,
      search: groupProductSearch,
      value: groupProductValue,
      list: groupProductList,
      listChildTwo: groupProductListChildTwo,
      onSelectParent: handleSelectParent,
      onSelectChild: handleSelectChild,
      onSelectSearchParent: handleSelectSearchParent,
      onGroupProductKeywordChange: handleGroupProductKeywordChange
    },
    search: {
      value: keyword,
      onChange: handleChangeSearch
    },
    filter: {
      countReportInventoryFilter,
      canSubmitOtherFilter,
      applyOtherFilter,
      shouldShowResetAll,
      filterTagDelete,
      filterDeleteAll
    },
    panels,
    methods: {
      onPrint: handlePrint,
      onRefresh: handleRefresh,
    },
    displayList,
    pagination,
    queries
  }
}

export default useFilterReportInventory;