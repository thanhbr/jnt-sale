import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {actionTypes} from '../provider/_actions'
import {WarehouseTransferContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformProductData,
  transformQueryObjToString,
  transformWarehouseData,
} from '../utils/transform'
import {debounce} from '@mui/material'

const useWarehouseGeneralInfo = () => {
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {generalInfo, productInfo, validate} = state.form
  const {loading, listOrigin, list, value, page, selected} = productInfo
  const {warehouseExport, warehouseImport} = generalInfo

  const warehouseQueries = {
    keyword: '',
    status: 1,
    per_page: 10,
    start: 0,
  }

  const [isWarehouseLoading, setIsWarehouseLoading] = useState(false)

  const handleFetchWarehouse = async (k, opt) => {
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
      const warehouseListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformWarehouseData)

      dispatch({
        type: actionTypes.FORM_WAREHOUSE_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? warehouseListData
              : [...generalInfo.warehouseList.list, ...warehouseListData],
          page,
          total: response?.data?.meta?.total || 0,
          store_limit: response?.data?.meta?.store_limit || 0,
        },
      })
    }

    if (page === 0) setIsWarehouseLoading(false)

    return response
  }

  const handleWarehouseChange = async (type, data) => {
    const actionType =
      type === 'import'
        ? actionTypes.FORM_WAREHOUSE_IMPORT_UPDATE
        : actionTypes.FORM_WAREHOUSE_EXPORT_UPDATE
    dispatch({
      type: actionType,
      payload: {value: data},
    })

    if (type === 'export') {
      const productResponse = await Promise.all([
        sendRequestAuth(
          'get',
          `${config.API}/product/list-all-product-details?keyword=&is_inventory=1&category_id=&product_id_details=&status=1&warehouse_id=${data.value || ''}&per_page=10&start=0`,
        ),
      ])
      const formatProductListOrigin = ArrayUtils.getQualifiedArray(
        productResponse[0]?.data?.data,
      ).map(transformProductData)

      const displayList = ArrayUtils.getQualifiedArray(
        productResponse[0]?.data?.data?.filter(x => Number(x.warehouse_quantity) > 0),
      ).map(transformProductData)

      dispatch({
        type: actionTypes.FORM_PRODUCT_LIST_UPDATE,
        payload: {
          listOrigin: page === 0 ? formatProductListOrigin : [...listOrigin, ...formatProductListOrigin],
          list:
            page === 0 ? displayList : [...list, ...displayList],
          loading: false,
          page,
          total: productResponse[0]?.data?.meta?.total || 0,
        },
      })
    }
  }

  const debounceWarehouseKeywordChange = useCallback(
    debounce(data => {
      handleFetchWarehouse(data?.value)
    }, 500),
    [],
  )

  const handleWarehouseKeywordChange = data => {
    dispatch({
      type: actionTypes.FORM_WAREHOUSE_KEYWORD_UPDATE,
      payload: {keyword: data?.value || ''},
    })
    debounceWarehouseKeywordChange(data)
  }

  const handleWarehouseLoadMore = () => {
    const currentTotal = generalInfo.warehouseList.list.length
    const total = generalInfo.warehouseList.total

    if (currentTotal >= total) return null

    const response = handleFetchWarehouse(generalInfo.warehouseKeyword, {
      page: generalInfo.warehouseList.page + 1,
    })

    return response
  }

  const validateWarehouse = (type, item) => {
    const otherWarehouse = type === 'warehouseImport' ? warehouseExport.value : type === 'warehouseExport' ? warehouseImport.value : ''
    if (otherWarehouse === item?.value) 
      dispatch({type: actionTypes.SET_VALIDATE_FORM, payload: {...validate, [type]: 'Kho nhập hàng và kho xuất hàng không được trùng nhau'}})
    else dispatch({type: actionTypes.SET_VALIDATE_FORM, payload: {...validate, warehouseExport: '', warehouseImport: ''}})
  }

  const setOpenCreateModal = (open) => {
    dispatch({type: actionTypes.SET_CREATE_MODAL, payload: {
      open: open
    }})
  }

  const clearProduct = () => {
    dispatch({
      type: actionTypes.FORM_PRODUCT_SELECTED_LIST_UPDATE,
      payload: {list: []},
    })
  }

  return {
    data: generalInfo,
    validate,
    properties: {isWarehouseLoading},
    methods: {
      handleWarehouseChange,
      onWarehouseKeywordChange: handleWarehouseKeywordChange,
      onWarehouseLoadMore: handleWarehouseLoadMore,
      validateWarehouse,
      setOpenCreateModal,
      clearProduct
    },
  }
}

export default useWarehouseGeneralInfo
