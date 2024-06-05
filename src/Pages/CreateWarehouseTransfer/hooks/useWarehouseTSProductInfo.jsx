import { debounce } from '@mui/material'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useContext} from 'react'
import {actionTypes} from '../provider/_actions'
import {WarehouseTransferContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformProductData,
  transformQueryObjToString,
} from '../utils/transform'

const useWarehouseTSProductInfo = () => {
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {loading, listOrigin, list, value, page, selected, total} =
    state.form.productInfo

    const productQueries = {
    keyword: '',
    category_id: '',
    product_id_details: '',
    status: '1',
    warehouse_id: state.form.generalInfo.warehouseExport?.value || '',
    per_page: 10,
    start: 0,
  }
  
  const handleFetchProductList = async (k, page) => {
    if (!state.form.generalInfo.warehouseExport?.value) return
    if (loading) return

    if (page === 0)
      dispatch({type: actionTypes.FORM_PRODUCT_LOADING_UPDATE})

    if (!!!k.trim() && page === 0) {
      dispatch({
        type: actionTypes.FORM_PRODUCT_LIST_UPDATE,
        payload: {list: listOrigin, loading: false, page: 0},
      })
    }

    const q = transformQueryObjToString({
      ...productQueries,
      keyword: k.trim(),
      start: page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list-all-product-details${q}`,
    )

    if (!!response?.data?.success) {
      const formatProductListOrigin = ArrayUtils.getQualifiedArray(
        response?.data?.data
      ).map(transformProductData)

      const displayList = ArrayUtils.getQualifiedArray(
        response?.data?.data?.filter(x => Number(x.warehouse_quantity) > 0),
      ).map(transformProductData)

      dispatch({
        type: actionTypes.FORM_PRODUCT_LIST_UPDATE,
        payload: {
          listOrigin: page === 0 ? formatProductListOrigin : [...listOrigin, ...formatProductListOrigin],
          list:
            page === 0 ? displayList : [...list, ...displayList],
          loading: false,
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    return response
  }

  const debounceWarehouseKeywordChange = useCallback(
    debounce(keyword => {
      handleFetchProductList(keyword, 0)
    }, 500),
    [state.form.generalInfo.warehouseExport?.value, loading],
  )
  
  const handleKeywordChange = val => {
    const keyword = val ? `${val}` : ''

    dispatch({
      type: actionTypes.FORM_PRODUCT_UPDATE,
      payload: {value: keyword},
    })

    debounceWarehouseKeywordChange(keyword)
  }

  const handleProductSelected = item => {
    const existItemIndex = selected.findIndex(x => x.info?.id === item.id)
    let newSelectedArr = [...selected]
    
    if (existItemIndex > -1){
      const existItem = newSelectedArr.at(existItemIndex)
      existItem.transferQuantity = Number(existItem.transferQuantity) + 1
    }
    else newSelectedArr.push({info: item, transferQuantity: 1})

    dispatch({
      type: actionTypes.FORM_PRODUCT_SELECTED_LIST_UPDATE,
      payload: {list: newSelectedArr},
    })

    dispatch({
      type: actionTypes.SET_VALIDATE_FORM,
      payload: {...state.form.validate, productList: false},
    })
  }

  const handleQuantityChange = (item, opt) => {
    const existItemIndex = selected.findIndex(x => x.info?.id === item.info?.id)
    if (existItemIndex <= -1) return

    const {type, value} = opt
    let newSelectedArr = [...selected]
    let quantity = 0

    switch (type) {
      case 'increase':
        quantity = +item.transferQuantity + 1
        break
      case 'decrease':
        quantity = +item.transferQuantity - 1
        break

      default:
        quantity = value
        break
    }
    newSelectedArr.at(existItemIndex).transferQuantity = quantity

    dispatch({
      type: actionTypes.FORM_PRODUCT_SELECTED_LIST_UPDATE,
      payload: {list: newSelectedArr},
    })
  }

  const handleQuantityIncrease = item => {
    handleQuantityChange(item, {type: 'increase'})
  }

  const handleQuantityDecrease = item => {
    handleQuantityChange(item, {type: 'decrease'})
  }

  const handleDeleteItem = item => {
    const existItemIndex = selected.findIndex(x => x.info?.id === item.info?.id)
    if (existItemIndex <= -1) return

    const newSelectedArr = [...selected].filter(x => x.info.id !== item.info.id)

    dispatch({
      type: actionTypes.FORM_PRODUCT_SELECTED_LIST_UPDATE,
      payload: {list: newSelectedArr},
    })
  }

  const handleListLoadMore = () => {
    const currentTotal = list.length
    if (currentTotal >= total) return
    const response = handleFetchProductList(value, page + 1)

    return response
  }

  return {
    data: state.form.productInfo,
    validate: state.form.validate,
    methods: {
      handleKeywordChange,
      handleListLoadMore,
      handleProductSelected,
      handleQuantityChange,
      handleQuantityIncrease,
      handleQuantityDecrease,
      handleDeleteItem,
    },
  }
}

export default useWarehouseTSProductInfo
