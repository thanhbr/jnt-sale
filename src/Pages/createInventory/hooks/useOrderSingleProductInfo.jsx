import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {orderSingleAction} from '../provider/_actions'
import {InventorySingleContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformProductData,
  transformQueryObjToString,
  transformWarehouseData,
} from '../utils/transform'
import {debounce} from '@mui/material'

const useOrderSingleProductInfo = () => {
  const {state, dispatch} = useContext(InventorySingleContext)
  const {productInfo} = state.form

  const warehouseQueries = {keyword: '', per_page: 10, start: 0,status:1,is_purchase:1}

  const productQueries = {
    keyword: '',
    category_id: '',
    product_id_details: '',
    status: 1,
    warehouse_id: '',
    per_page: 10,
    start: 0,
  }

  const handleInventoryToggle = () =>
    dispatch({type: orderSingleAction.FORM_INVENTORY_TOGGLE})

  // ======================================================================================================
  // NO INVENTORY
  // ======================================================================================================
  const handleInventoryTypeChange = type =>
    dispatch({
      type: orderSingleAction.FORM_INVENTORY_TYPE_UPDATE,
      payload: {type},
    })

  // ======================================================================================================
  // ========= NO INVENTORY MANUAL
  // ======================================================================================================
  const handleInventoryManualChange = val => {
    dispatch({
      type: orderSingleAction.FORM_INVENTORY_MANUAL_UPDATE,
      payload: {value: val},
    })
    handleInventoryManualValidate(val?.trim() == '' ? false : true)
  }
  const handleInventoryManualValidate = boo =>
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        productManual: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '250px'}}
            >
              Thông tin sản phẩm không được bỏ trống
            </span>
          </div>
        ),
      },
    })
  // ======================================================================================================
  // INVENTORY
  // ======================================================================================================
  const withInventoryData = productInfo.withInventoryConfig

  // ======================================================================================================
  // INVENTORY WAREHOUSE
  // ======================================================================================================
  const [isWarehouseLoading, setIsWarehouseLoading] = useState(false)

  const handleFetchWarehouseList = async (k, page) => {
    if (isWarehouseLoading) return

    if (page === 0) setIsWarehouseLoading(true)

    const q = transformQueryObjToString({
      ...warehouseQueries,
      keyword: k.trim(),
      start: isNaN(page * 10) ? 10 : page * 10,
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
        type: orderSingleAction.FORM_WITH_INVENTORY_WAREHOUSE_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? warehouseListData
              : [...withInventoryData.warehouse.list, ...warehouseListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsWarehouseLoading(false)

    return response
  }

  const handleWarehouseChange = data => {
    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_WAREHOUSE_UPDATE,
      payload: {value: data},
    })
    handleFetchSearchProductList(withInventoryData.search.value, 0, {
      queries: {warehouse_id: data?.value || ''},
    })
  }

  const debounceWarehouseKeywordChange = useCallback(
    debounce((data, page) => {
      handleFetchWarehouseList(data?.value, 0)
    }, 500),
    [],
  )

  const handleWarehouseKeywordChange = data => {
    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_WAREHOUSE_KEYWORD_UPDATE,
      payload: {keyword: data?.value},
    })
    debounceWarehouseKeywordChange(data, 0)
  }

  const handleWarehouseLoadMore = () => {
    const currentTotal = withInventoryData.warehouse.list.length
    const total = withInventoryData.warehouse.total

    if (currentTotal >= total) return null

    const response = handleFetchWarehouseList(
      withInventoryData.warehouse.keyword,
      withInventoryData.warehouse.page + 1,
    )

    return response
  }

  // ======================================================================================================
  // INVENTORY SEARCH
  // ======================================================================================================
  const withInventorySearchData = productInfo.withInventoryConfig.search
  const withInventoryWarehouseData = productInfo.withInventoryConfig.warehouse

  const handleFetchSearchProductList = async (k, page = 0, opt) => {
    if (withInventorySearchData.loading) return
    if (page === 0)
      dispatch({
        type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_LOADING_UPDATE,
      })
    if (!!!k.trim() && page === 0) {
      dispatch({
        type: 'UPDATE_PRODUCT_INFO',
        payload: {list: withInventorySearchData.listOrigin, loading: false, page: 0},
      })
    }
    const q = transformQueryObjToString({
      ...productQueries,
      keyword: k.trim(),
      warehouse_id: withInventoryWarehouseData.value?.value || opt?.queries?.warehouse_id,
      start: page * 10,
      ...opt?.queries,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list-all-product-details${q}`,
    )

    if (!!response?.data?.success) {
      const formatCustomerList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformProductData)
      dispatch({
        type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? formatCustomerList
              : [...withInventorySearchData.list, ...formatCustomerList],
          loading: false,
          page,
          total: response?.data?.meta?.total || 0,
          canLoadMore: [...withInventorySearchData.list, ...formatCustomerList].length >= response?.data?.meta?.total ? false : true
        },
      })
    }

    return response
  }

  let withInventorySearchTimeout
  const handleWithInventorySearchChange = val => {
    const keyword = val ? `${val}` : ''
    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_UPDATE,
      payload: {value: keyword},
    })

    clearTimeout(withInventorySearchTimeout)

    withInventorySearchTimeout = setTimeout(
      () => handleFetchSearchProductList(keyword, 0),
      500,
    )
  }

  const handleWithInventorySearchSelect = (data, opt) => {
    dispatch({type:'CHECK_VALIDATE_TABLE',payload:true})

    let amount = +opt?.amount
    if (
        ![
          'increase',
          'decrease',
          'amount',
          'reason'
        ].includes(opt?.type) ||
        !data
    )
      return
    amount = Math.ceil(amount)
    let newSelectArr = withInventorySearchData.selected

    const findIndexData = newSelectArr.findIndex(
        item => item?.data?.id === data?.id,
    )

    switch (opt.type) {
      case 'amount':
        if ((!!amount && amount <= 9999) || !amount ) {
          if (findIndexData !== -1) {
            if(!!opt?.delete){
              newSelectArr = newSelectArr.filter(
                  (item, i) => i !== findIndexData,
              )
            }else
              newSelectArr[findIndexData].quantity = amount || 0
          } else newSelectArr = [...newSelectArr, { data, quantity: 1 }]
        }
        break
      case 'decrease':
        if (findIndexData !== -1) {

          if (newSelectArr[findIndexData].quantity > 0)
            newSelectArr[findIndexData].quantity -= 1
        }

        break

      case 'increase':
        if (findIndexData !== -1) newSelectArr[findIndexData].quantity = +newSelectArr[findIndexData].quantity + 1
        else
          newSelectArr = [
            ...newSelectArr,
            {
              data,
              quantity: +data?.warehouse_quantity,
            },
          ]
        break
      case 'reason':
        if (findIndexData !== -1) newSelectArr[findIndexData].reason = opt.value || ''
        else
          newSelectArr = [
            ...newSelectArr,
            {
              data,
              reason: opt.value || '',
            },
          ]
        break
      default:
        break
    }
    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE,
      payload: {list: newSelectArr},
    })
  }

  const handleWithInventorySearchListLoadMore = () => {
    const currentTotal = withInventorySearchData.list.length
    const total = withInventorySearchData.total
    if (currentTotal >= total){
      dispatch({
        type: 'UPDATE_PRODUCT_INFO',
        payload: {canLoadMore: false},
      })
      return
    }

    const response = handleFetchSearchProductList(
      withInventorySearchData.value,
      withInventorySearchData.page + 1,
    )

    return response
  }

  // ======================================================================================================
  // INVENTORY TOTAL DISCOUNT
  // ======================================================================================================
  const handleTotalDiscountChange = (type, value) =>
    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_TOTAL_DISCOUNT_UPDATE,
      payload: {type, value},
    })

  return {
    data: productInfo,
    field_paid: state.field_paid,
    properties: {isWarehouseLoading},
    methods: {
      onInventoryToggle: handleInventoryToggle,
      // no inventory
      onInventoryTypeChange: handleInventoryTypeChange,
      // ========= no inventory manual
      onInventoryManualChange: handleInventoryManualChange,
      onInventoryManualValidare: handleInventoryManualValidate,
      // with inventory
      onWithInventorySearchChange: handleWithInventorySearchChange,
      onWithInventorySearchFetchMoreProductList:
        handleWithInventorySearchListLoadMore,
      onWithInventorySearchSelect: handleWithInventorySearchSelect,
      onWarehouseChange: handleWarehouseChange,
      onWarehouseKeywordChange: handleWarehouseKeywordChange,
      onWarehouseLoadMore: handleWarehouseLoadMore,
      onTotalDiscountChange: handleTotalDiscountChange,
    },
  }
}

export default useOrderSingleProductInfo
