import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {PurchasesContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformPaymentMethodData,
  transformQueryObjToString,
} from '../utils/transform'
import {debounce} from '@mui/material'
import { useParams } from 'react-router-dom'
import { actionTypes } from '../provider/_reducer'

const useCreatePurchaseImportExcel = () => {
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {generalInfo} = pageState.purchase
  const {supplier} = pageState
  const { purchaseId } = useParams()

  const methodQueries = {
    keyword: '',
    status: 1,
    per_page: 10,
    start: 0,
  }

  // ======================================================================================================
  // VENDOR
  // ======================================================================================================
  const [isVendorLoading, setIsVendorLoading] = useState(false)

  const handleFetchVendor = async (k = '', opt = {}) => {
    if (isVendorLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsVendorLoading(true)

    const q = transformQueryObjToString({
      ...methodQueries,
      keyword: k.trim(),
      status: 1,
      start: page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/supplier/suppliers${q}`,
    )

    if (!!response?.data?.success) {
      const methodListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformPaymentMethodData)

      pageDispatch({
        type: 'FORM_GENERAL_INFO_VENDOR_UPDATE',
        payload: {
          list:
            page === 0
              ? methodListData
              : [...generalInfo.vendor.list, ...methodListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsVendorLoading(false)

    return response
  }

  const handleVendorChange = data => {
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VENDOR_UPDATE',
      payload: {value: data},
    })
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VALIDATE',
      payload: {vendor: ''}
    })
  }

  const debounceVendorKeywordChange = useCallback(
    debounce(data => {
      handleFetchVendor(data?.value)
    }, 500),
    [],
  )
  const handleVendorKeywordChange = data => {
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VENDOR_UPDATE',
      payload: {keyword: data?.value || ''},
    })
    debounceVendorKeywordChange(data)
  }

  const handleVendorLoadMore = () => {
    const currentTotal = generalInfo.vendor.list.length
    const total = generalInfo.vendor.total

    if (currentTotal >= total) return null

    const response = handleFetchVendor(generalInfo.vendor.keyword, {
      page: generalInfo.vendor.page + 1,
    })

    return response
  }


  const warehouseQueries = {
    keyword: '',
    status: 1,
    is_purchase: 1,
    per_page: 10,
    start: 0,
  }

  // ======================================================================================================
  // WAREHOUSE
  // ======================================================================================================
  const [isWarehouseLoading, setIsWarehouseLoading] = useState(false)

  const handleFetchWarehouse = async (k = '', opt = {}) => {
    if (isWarehouseLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsWarehouseLoading(true)

    const q = transformQueryObjToString({
      ...warehouseQueries,
      keyword: k.trim(),
      start: page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/warehouse/warehouses${q}`,
    )

    if (!!response?.data?.success) {
      const methodListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformPaymentMethodData)

      pageDispatch({
        type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
        payload: {
          list:
            page === 0
              ? methodListData
              : [...generalInfo.warehouse.list, ...methodListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsWarehouseLoading(false)

    return response
  }

  const handleWarehouseChange = data => {
    pageDispatch({
      type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
      payload: {value: data},
    })
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VALIDATE',
      payload: {warehouse: ''}
    })
  }

  const debounceWarehouseKeywordChange = useCallback(
    debounce(data => {
      handleFetchWarehouse(data?.value)
    }, 500),
    [],
  )
  const handleWarehouseKeywordChange = data => {
    pageDispatch({
      type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
      payload: {keyword: data?.value || ''},
    })
    debounceWarehouseKeywordChange(data)
  }

  const handleWarehouseLoadMore = () => {
    const currentTotal = generalInfo.warehouse.list.length
    const total = generalInfo.warehouse.total

    if (currentTotal >= total) return null

    const response = handleFetchWarehouse(generalInfo.warehouse.keyword, {
      page: generalInfo.warehouse.page + 1,
    })

    return response
  }


  const handleUpdateNotification = (noti) => {
    pageDispatch({
      type: actionTypes.NOTIFICATIONS_LIST_UPDATE,
      payload: {
        notifications: {
          list: noti,
        },
      },
    })
  }
  const handleUpdateValidate = _ => {
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VALIDATE',
      payload: { vendor: !generalInfo.vendor.value ? 'Nhà cung cấp không được để trống' : '' }
    })
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VALIDATE',
      payload: { warehouse: !generalInfo.warehouse.value ? 'Kho nhập hàng không được để trống' : '' }
    })
  }

  return {
    data: generalInfo,
    purchaseId: purchaseId,
    supplier,
    properties: {isVendorLoading},
    methods: {
      // vendor
      onFetchVendor: handleFetchVendor,
      onUpdateNotification: handleUpdateNotification,
      onVendorChange: handleVendorChange,
      onVendorKeywordChange: handleVendorKeywordChange,
      onVendorLoadMore: handleVendorLoadMore,
      //warehouse
      onFetchWarehouse: handleFetchWarehouse,
      onWarehouseChange: handleWarehouseChange,
      onWarehouseKeywordChange: handleWarehouseKeywordChange,
      onWarehouseLoadMore: handleWarehouseLoadMore,
      onUpdateValidate: handleUpdateValidate,
    },
  }
}

export default useCreatePurchaseImportExcel