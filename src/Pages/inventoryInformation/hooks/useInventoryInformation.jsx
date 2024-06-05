import React, {useReducer} from 'react';
import {
  inventoryInformationActions,
  inventoryInformationInitialState,
  inventoryInformationReducer
} from "../provider/~reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {SCRIPT} from "../../userManagement/interfaces/~script";

const useInventoryInformation = () => {
  const [state, dispatch] = useReducer(inventoryInformationReducer, inventoryInformationInitialState)

  const handleInventoryInformation = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/warehouse/warehouses?keyword=`),
      sendRequestAuth('get', `${config.API}/warehouse/inventory/product/list?keyword=&warehouse_id=&norm_type&norm_value&is_low_inventory&per_page=20&start=0`),
    ])
    if (response[0]?.data?.success && !!response[0]?.data?.data) {
      dispatch({type: inventoryInformationActions.FILTER_LIST_WAREHOUSE_UPDATE_LIST, payload: {
          keyword: [],
          value: [],
          activeValue: [],
          list: response[0]?.data?.data,
          listOrigin: response[0]?.data?.data,
        }})
    }
    if (response[1]?.data?.success && !!response[1]?.data?.data) {
      dispatch({type: inventoryInformationActions.TOGGLE_LOADING_TABLE_PRODUCT, payload: false})

      dispatch({type: inventoryInformationActions.UPDATE_LIST_TABLE_PRODUCT, payload: response[1]?.data?.data})
      dispatch({type: inventoryInformationActions.SET_PAGINATION, payload: {
          active: 0,
          amount: response[1]?.data?.meta?.per_page,
          total: Math.ceil(response[1]?.data?.meta?.total / response[1]?.data?.meta?.per_page),
          totalItems: response[1]?.data?.meta?.total,
        }})
    }
  }
  const fetchProductChange = async ({per_page, start}) => {
    const normType = state?.filter?.quota?.norm_type?.params || ''
    const normValue = state?.filter?.quota?.value?.split(',')?.reduce((p, n) => {
      return p + +n
    }) || ''
    const data = {
      keyword: state?.search || '',
      warehouse_id: state?.filter?.groupWarehouse?.value?.map(item => {
        return item.id
      }).join(',') || '',
      norm_type: (normType === '>' && normValue === '') ? '' : normType,
      norm_value: normValue,
      is_low_inventory: state?.filter?.quantityWaiting?.value?.id || '',
      per_page: per_page || 20,
      start: start || 0
    }
    fetchProductByFilter(data)
  }
  const fetchProductByFilter = async (qs) => {
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
      dispatch({type: inventoryInformationActions.UPDATE_LIST_TABLE_PRODUCT, payload: response[0]?.data?.data})
      dispatch({type: inventoryInformationActions.SET_PAGINATION, payload: {
          active: Math.floor(qs?.start / qs?.per_page),
          amount: response[0]?.data?.meta?.per_page,
          total: Math.ceil(response[0]?.data?.meta?.total / response[0]?.data?.meta?.per_page),
          totalItems: response[0]?.data?.meta?.total,
        }})

      // Set tag
      dispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_WAREHOUSE, payload: state?.filter?.groupWarehouse?.value})
      dispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_VALUE_QUOTA, payload: state?.filter?.quota?.value})
      dispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_NORM_TYPE_QUOTA,
        payload: (state?.filter?.quota?.norm_type?.params === '>' && !!!state?.filter?.quota?.value) ? '' : state?.filter?.quota?.norm_type})
      dispatch({type: inventoryInformationActions.FILTER_UPDATE_ACTIVE_QUANTITY_WAITING,
        payload: state?.filter?.quantityWaiting?.value?.id === 0 ? '' : state?.filter?.quantityWaiting?.value})
    } else {
      toast.error(SCRIPT.ERROR.SEARCH)
    }
  }

  const handlePaginationAmountChange = amount => {
    fetchProductChange({per_page: amount, start: 0})
  }

  const handlePaginationPageChange = per => {
    fetchProductChange({
      per_page: state?.paginate?.amount,
      start: state?.paginate?.amount * per
    })
  }

  return {
    provider: { state, dispatch },
    fetch: {
      originData: handleInventoryInformation
    },
    handlePaginationAmountChange,
    handlePaginationPageChange
  }
}

export default useInventoryInformation;