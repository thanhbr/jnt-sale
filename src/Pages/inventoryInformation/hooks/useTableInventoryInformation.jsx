import React, {useContext} from 'react';
import {InventoryInformationContext} from "../provider/~context";
import {inventoryInformationActions} from "../provider/~reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";

const useTableInventoryInformation = data => {
  const { pageState, pageDispatch } = useContext(InventoryInformationContext)
  const table = pageState?.table
  const shouldOpenDetail = data?.pid && table?.detail?.id === data?.pid
  const warehouseId = pageState?.filter?.groupWarehouse?.activeValue?.map(item => item?.id)?.join(',')

  const handleShowTableDetail = async _ => {
    if(!!table?.detail?.id && table?.detail?.id === data?.pid) {
      pageDispatch({type: inventoryInformationActions.SHOW_TABLE_DETAIL_PRODUCT, payload: {id: '', active: '', list: []}})
    } else {
      const response = await sendRequestAuth('get', `${config.API}/warehouse/inventory/product/detail/${data?.pid}?warehouse_id=${warehouseId}`)
      if(response?.data?.success) {
        pageDispatch({type: inventoryInformationActions.SHOW_TABLE_DETAIL_PRODUCT,
          payload: {
            id: data?.pid,
            active: data?.pid,
            list: response?.data?.data,
          }})
      }
    }
  }
  return {
    dataTable: {
      table,
    },
    functions: {
      onShowTableDetail: handleShowTableDetail,
    },
    shouldOpenDetail
  }
}

export default useTableInventoryInformation;