import React, {useCallback, useContext, useState} from 'react';
import {InventoryInformationContext} from "../provider/~context";
import {inventoryInformationActions} from "../provider/~reducer";
import {debounce} from "@mui/material";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {fNumber} from "../../../util/formatNumber";
import toast from "../../../Component/Toast";
import {SCRIPT} from "../../userManagement/interfaces/~script";
import {INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING, INVENTORY_INFORMATION_ROW_QUOTA} from "../interfaces/~contants";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useFilterInventoryInformation = () => {
  const {t} = useTranslation()
  const { pageState, pageDispatch } = useContext(InventoryInformationContext)
  const filter = pageState?.filter
  const modals = pageState?.modals
  const warehouses = pageState?.filter?.groupWarehouse
  const [shouldCollapse, setShouldCollapse] = useState(false)
  const [shouldShowMenuQuota, setShouldShowMenuQuota]  = useState(false)
  const table = pageState?.table

  const handleSelectedWareHouse = warehouse => {
    if(!!warehouse) {
      const dataWarehouse = warehouses?.value
      pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_VALUE_WAREHOUSE_UPDATE,
        payload: !!!dataWarehouse?.find(item => warehouse?.id === item.id)
          ? [...dataWarehouse, warehouse] : dataWarehouse?.filter(item => warehouse?.id !== item.id)})
    } else {
      pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_VALUE_WAREHOUSE_UPDATE, payload: []})
    }
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_TAB_WAREHOUSE_UPDATE, payload: 'all'})
  }

  const handleTabChange = _ => pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_TAB_WAREHOUSE_UPDATE, payload: warehouses?.tab === 'all' ? 'checked' : 'all'})

  const handleSearchKeywordWarehouse = async keyword => {
    const response = await sendRequestAuth('get', `${config.API}/warehouse/warehouses?keyword=${keyword}`)
    if(response?.data?.success) {
      pageDispatch({type: inventoryInformationActions.FILTER_SEARCH_LIST_WAREHOUSE_UPDATE, payload: response?.data?.data})
    }
  }

  const debounceSearchKeywordWarehouse = useCallback(debounce(async (keyword) => {
    handleSearchKeywordWarehouse(keyword?.trim())
  }, 500), [])

  const handleKeywordChange = data => {
    debounceSearchKeywordWarehouse(data?.value)
  }

  const handleChangeQuota = quota => {
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_QUOTA,
      payload: fNumber(quota.toString().replace(/[^0-9]/g, ''))})
  }

  const handleChangeTypeQuota = data => {
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_TYPE_QUOTA, payload: data})
    setShouldShowMenuQuota(false)
  }

  const handleChangeTypeQuantity = data => {
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_QUANTITY_WAITING, payload: data})
  }



  const handleKeywordSearchAuto = async keyword => {
    const response = await sendRequestAuth('get', `${config.API}/warehouse/inventory/product/list?keyword=${keyword}&warehouse_id=&norm_type&norm_value&is_low_inventory&per_page=20&start=0`)
    if(response?.data?.success) {
      pageDispatch({type: inventoryInformationActions.UPDATE_LIST_TABLE_PRODUCT, payload: response?.data?.data})
      pageDispatch({type: inventoryInformationActions.SET_PAGINATION, payload: {
          active: 0,
          amount: response?.data?.meta?.per_page,
          total: Math.ceil(response?.data?.meta?.total / response?.data?.meta?.per_page),
          totalItems: response?.data?.meta?.total,
        }})
    }
  }
  const debounceChangeKeywordSearch = useCallback(debounce(async (keyword) => {
    handleKeywordSearchAuto(keyword?.trim())
  }, 500), [])
  const handleChangeKeywordSearch = keyword => {
    pageDispatch({type: inventoryInformationActions.SET_SEARCH, payload: keyword})
    debounceChangeKeywordSearch(keyword)
  }

  const handleChangeShouldCollapse = _ => setShouldCollapse(!shouldCollapse)

  const queries = {
    keyword: pageState?.search || '',
    warehouse_id: warehouses?.value?.map(item => {
      return item.id
    }).join(',') || '',
    norm_type: pageState?.filter?.quota?.norm_type?.params || '',
    norm_value: pageState?.filter?.quota?.value?.split(',')?.reduce((p, n) => {
      return p + n
    }) || '0',
    is_low_inventory: pageState?.filter?.quantityWaiting?.value?.id || '0',
    per_page: pageState?.paginate?.amount || 20,
    start: pageState?.paginate?.active || 0
  }
  const applyProductOtherFilter = async _ => {
    // pageDispatch({type: inventoryInformationActions.TOGGLE_LOADING_TABLE_PRODUCT, payload: true})
    fetchProductByFilter(queries)
  }

  const [debounceInventoryInfo, setDebounceInventoryInfo] = useState(true)
  const fetchProductByFilter = async (qs, removeTag) => {
    if(debounceInventoryInfo) {
      pageDispatch({type: inventoryInformationActions.TOGGLE_LOADING_TABLE_PRODUCT, payload: true})
      setDebounceInventoryInfo(false)
      setTimeout(() => setDebounceInventoryInfo(true), 2000)

      let queryString = '?'
      let i = 0
      for (const [key, value] of Object.entries(qs)) {
        queryString += `${i > 0 ? '&' : ''}${key}=${value}`
        i++
      }
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/warehouse/inventory/product/list${queryString}`),
      ])
      if (response[0]?.data?.success && !!response[0]?.data?.data) {
        pageDispatch({type: inventoryInformationActions.UPDATE_LIST_TABLE_PRODUCT, payload: response[0]?.data?.data})
        pageDispatch({type: inventoryInformationActions.SET_PAGINATION, payload: {
            active: 0,
            amount: response[0]?.data?.meta?.per_page,
            total: Math.ceil(response[0]?.data?.meta?.total / response[0]?.data?.meta?.per_page),
            totalItems: response[0]?.data?.meta?.total,
          }})

        if(!!!removeTag) {
          // Set tag
          pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_WAREHOUSE, payload: pageState?.filter?.groupWarehouse?.value})
          pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_VALUE_QUOTA, payload: pageState?.filter?.quota?.value})
          pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_NORM_TYPE_QUOTA,
            payload: (pageState?.filter?.quota?.norm_type?.params === '>' && !!!pageState?.filter?.quota?.value) ? '' : pageState?.filter?.quota?.norm_type})
          pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_QUANTITY_WAITING,
            payload: pageState?.filter?.quantityWaiting?.value?.id === 0 ? '' : pageState?.filter?.quantityWaiting?.value})
        }

        pageDispatch({type: inventoryInformationActions.TOGGLE_LOADING_TABLE_PRODUCT, payload: false})
      } else {
        toast.error(SCRIPT.ERROR.SEARCH)
      }
    }
  }

  const handleRefresh = async _ => {
    const data = {
      keyword: pageState?.search || '',
      warehouse_id: warehouses?.value?.map(item => {
        return item.id
      }).join(',') || '',
      norm_type: (pageState?.filter?.quota?.norm_type?.params === '>' && !!!pageState?.filter?.quota?.value) ? '' : (pageState?.filter?.quota?.norm_type?.params || ''),
      norm_value: pageState?.filter?.quota?.value?.split(',')?.reduce((p, n) => {
        return p + +n
      }) || '',
      is_low_inventory: pageState?.filter?.quantityWaiting?.value?.id === 0 ? '' : pageState?.filter?.quantityWaiting?.value?.id,
      per_page: pageState?.paginate?.amount || 20,
      start: pageState?.paginate?.active || 0
    }
    fetchProductByFilter(data)

    if(!!table?.detail?.id) {
      const response = await sendRequestAuth('get', `${config.API}/warehouse/inventory/product/detail/${table?.detail?.id}`)
      if(response?.data?.success) {
        pageDispatch({type: inventoryInformationActions.SHOW_TABLE_DETAIL_PRODUCT,
          payload: {
            id: table?.detail?.id,
            active: table?.detail?.active,
            list: response?.data?.data,
          }})
      }
    }
  }

  const [debounceExport, setDebounceExport] = useState(true)
  const handleExportExcel = async _ => {
    setDebounceExport(false)
    setTimeout(() => setDebounceExport(true), 2000)
    if(debounceExport) {
      if(pageState?.table?.display?.list?.length > 0) {
        pageDispatch({type: inventoryInformationActions.UPDATE_EXPORT_MODAL_DATA,
          payload: {data: {
              query: queries,
              total: pageState?.paginate?.totalItems
            }}})
        pageDispatch({type: inventoryInformationActions.TOGGLE_MODAL_EXPORT_EXCEL, payload: true})
      } else {
        toast.error(t(DISPLAY_NAME_MENU.GENERAL.LEAST_1_DATA_EXPORT))
      }
    }
  }

  const handleCloseModalExport = _ => pageDispatch({type: inventoryInformationActions.TOGGLE_MODAL_EXPORT_EXCEL, payload: false})

  const handleFocusInputMenuQuota = _ => setShouldShowMenuQuota(!shouldShowMenuQuota)

  const canSubmitOtherFilter = [
    JSON.stringify(filter?.groupWarehouse?.activeValue) !== JSON.stringify(filter?.groupWarehouse?.value),
    JSON.stringify(filter?.quota?.activeValue) !== JSON.stringify(filter?.quota?.value),
    (filter?.quota?.norm_type?.id !== 1 && !!!filter?.quota?.activeNormType?.id)
    || ((filter?.quota?.activeValue !== filter?.quota?.value) && !!filter?.quota?.value)
    || ((filter?.quota?.norm_type?.id !== filter?.quota?.activeNormType?.id) && !!filter?.quota?.activeNormType?.id),
    (filter?.quantityWaiting?.value?.id !== 0 && !!!filter?.quantityWaiting?.activeValue?.id) || (filter?.quantityWaiting?.value?.id === 0 && !!filter?.quantityWaiting?.activeValue?.id),
  ].includes(true)

  const countTagFilter = [
    filter?.groupWarehouse?.activeValue?.length > 0,
    filter?.quota?.activeNormType?.id !== undefined && !!filter?.quota?.activeValue,
    filter?.quantityWaiting?.activeValue?.id !== undefined,
  ].filter(item => item === true).length

  const filterTagDelete = type => {
    let data = {
      keyword: pageState?.search || '',
      warehouse_id: warehouses?.value?.map(item => {
        return item.id
      }).join(',') || '',
      norm_type: pageState?.filter?.quota?.norm_type?.params || '',
      norm_value: pageState?.filter?.quota?.value?.split(',')?.reduce((p, n) => {
        return p + +n
      }) || '0',
      is_low_inventory: pageState?.filter?.quantityWaiting?.value?.id || '',
      per_page: pageState?.paginate?.amount || 20,
      start: pageState?.paginate?.active || 0
    }
    switch (type) {
      case 'warehouse':
        data.warehouse_id = []
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_WAREHOUSE, payload: []})
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_VALUE_WAREHOUSE_UPDATE, payload: []})
        break
      case 'quota':
        data.norm_type = []
        data.norm_value = ''
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_VALUE_QUOTA, payload: ''})
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_NORM_TYPE_QUOTA, payload: []})
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_TYPE_QUOTA,
          payload: INVENTORY_INFORMATION_ROW_QUOTA?.find(item => item.active)})
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_QUOTA, payload: ''})
        break
      case 'quantity':
        data.is_low_inventory = ''
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_QUANTITY_WAITING, payload: ''})
        pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_QUANTITY_WAITING,
          payload: INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING?.find(item => item.active)})
        break
      default: break
    }
    pageDispatch({type: inventoryInformationActions.TOGGLE_LOADING_TABLE_PRODUCT, payload: true})
    fetchProductByFilter(data, 'removeTag')
  }

  const handleDeleteTagAll = _ => {
    let data = {
      keyword: pageState?.search || '',
      warehouse_id: '',
      norm_type: '',
      norm_value: '',
      is_low_inventory: '',
      per_page: pageState?.paginate?.amount || 20,
      start: pageState?.paginate?.active || 0
    }
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_WAREHOUSE, payload: []})
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_VALUE_WAREHOUSE_UPDATE, payload: []})
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_VALUE_QUOTA, payload: ''})
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_NORM_TYPE_QUOTA, payload: []})
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_TYPE_QUOTA,
      payload: INVENTORY_INFORMATION_ROW_QUOTA?.find(item => item.active)})
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_QUOTA, payload: ''})
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_QUANTITY_WAITING, payload: ''})
    pageDispatch({type: inventoryInformationActions.FILTER_UPDATE_QUANTITY_WAITING,
      payload: INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING?.find(item => item.active)})

    pageDispatch({type: inventoryInformationActions.TOGGLE_LOADING_TABLE_PRODUCT, payload: true})
    fetchProductByFilter(data, 'removeTag')
  }

  return {
    data: {
      filter,
      warehouses,
      modals,
      table
    },
    functions: {
      onSelectedWareHouse: handleSelectedWareHouse,
      onTabChange: handleTabChange,
      onKeywordChange: handleKeywordChange,
      onChangeQuota: handleChangeQuota,
      onChangeTypeQuantity: handleChangeTypeQuantity,
      onChangeShouldCollapse: handleChangeShouldCollapse,

      applyProductOtherFilter,
      canSubmitOtherFilter,
      refresh: handleRefresh,
      exportExcel: handleExportExcel,
      filterTagDelete,
      handleDeleteTagAll,

      onCloseModalExport: handleCloseModalExport,
      onFocusInputMenuQuota: handleFocusInputMenuQuota,
      onChangeTypeQuota: handleChangeTypeQuota,
    },
    search: {
      onChangeKeywordSearch: handleChangeKeywordSearch,
      value: pageState?.search
    },
    shouldCollapse,
    shouldShowMenuQuota,
    countTagFilter,
    queries
  }
}

export default useFilterInventoryInformation;