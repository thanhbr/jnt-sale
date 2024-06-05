import { sendRequestAuth } from 'api/api'
import config from 'config'
import { useCallback, useState } from 'react'
import { useContext } from 'react'
import { orderSingleAction } from '../provider/_actions'
import { OrderSingleContext } from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformMoneyToSendRequest,
  transformProductData,
  transformQueryObjToString,
  transformWarehouseData,
} from '../utils/transform'
import { debounce } from '@mui/material'
import { replaceAllCustom } from '../../../util/functionUtil'
import {fNumber} from "../../../util/formatNumber";

const useOrderSingleProductInfo = () => {
  const { state, dispatch } = useContext(OrderSingleContext)
  const { productInfo } = state.form
  const { paymentMethod } = state.form

  const warehouseQueries = { keyword: '', per_page: 10, start: 0 }

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
    dispatch({ type: orderSingleAction.FORM_INVENTORY_TOGGLE })

  // ======================================================================================================
  // NO INVENTORY
  // ======================================================================================================
  const handleInventoryTypeChange = type =>
    dispatch({
      type: orderSingleAction.FORM_INVENTORY_TYPE_UPDATE,
      payload: { type },
    })

  // ======================================================================================================
  // ========= NO INVENTORY MANUAL
  // ======================================================================================================
  const handleInventoryManualChange = val => {
    dispatch({
      type: orderSingleAction.FORM_INVENTORY_MANUAL_UPDATE,
      payload: { value: val },
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
          <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '250px' }}
            >
              Thông tin sản phẩm không được bỏ trống
            </span>
          </div>
        ),
      },
    })

  // ======================================================================================================
  // ========= NO INVENTORY AUTO
  // ======================================================================================================
  const inventoryAutoData = productInfo.inventoryConfig.auto

  const handleFetchProductList = async (k, page) => {
    if (inventoryAutoData.loading) return

    if (page === 0)
      dispatch({ type: orderSingleAction.FORM_INVENTORY_AUTO_LOADING_UPDATE })

    if (!!!k.trim() && page === 0) {
      dispatch({
        type: orderSingleAction.FORM_INVENTORY_AUTO_LIST_UPDATE,
        payload: { list: inventoryAutoData.listOrigin, loading: false, page: 0 },
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
      const formatCustomerList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformProductData)

      dispatch({
        type: orderSingleAction.FORM_INVENTORY_AUTO_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? formatCustomerList
              : [...inventoryAutoData.list, ...formatCustomerList],
          loading: false,
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    return response
  }

  let inventoryAutoTimeout
  const handleInventoryAutoChange = val => {
    const keyword = val ? `${val}` : ''

    dispatch({
      type: orderSingleAction.FORM_INVENTORY_AUTO_UPDATE,
      payload: { value: keyword },
    })

    clearTimeout(inventoryAutoTimeout)

    inventoryAutoTimeout = setTimeout(
      () => handleFetchProductList(keyword, 0),
      500,
    )
  }

  const handleInventoryAutoSelect = (data, opt) => {
    if (!['increase', 'decrease', 'amount'].includes(opt?.type) || !data) return

    let newSelectArr = inventoryAutoData.selected
    const findIndexData = newSelectArr.findIndex(
      item => item?.data?.id === data?.id,
    )
    switch (opt.type) {
      case 'amount':
        if (findIndexData !== -1) {
          if (opt?.amount === 0) {
            newSelectArr = newSelectArr = newSelectArr.filter(
              (item, i) => i !== findIndexData,
            )
          } else {
            newSelectArr[findIndexData].quantity =
              typeof opt?.amount === 'string' ? 0 : Math.ceil(opt.amount) > 9999 ? 9999 : Math.ceil(opt.amount)
          }
        } else newSelectArr = [...newSelectArr, { data, quantity: 1 }]
        break

      case 'decrease':
        if (findIndexData !== -1) {
          if (newSelectArr[findIndexData].quantity > 1)
            newSelectArr[findIndexData].quantity -= 1
        }
        break

      case 'increase':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].quantity += 1
        } else newSelectArr = [...newSelectArr, { data, quantity: 1 }]
        break

      default:
        break
    }

    dispatch({
      type: orderSingleAction.FORM_INVENTORY_AUTO_SELECTED_UPDATE,
      payload: { list: newSelectArr },
    })
  }

  const handleInventoryAutoListLoadMore = () => {
    const currentTotal = inventoryAutoData.list.length
    const total = inventoryAutoData.total

    if (currentTotal >= total) return

    const response = handleFetchProductList(
      inventoryAutoData.value,
      inventoryAutoData.page + 1,
    )

    return response
  }

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
      payload: { value: data },
    })
    handleFetchSearchProductList(withInventoryData.search.value, 0, {
      queries: { warehouse_id: data?.value || '' },
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
      payload: { keyword: data?.value },
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
  // INVENTORY PRICE TYPE
  // ======================================================================================================
  const handlePriceTypeChange = data => {
    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE,
      payload: { value: data },
    })

    let newSelectArr = withInventorySearchData.selected
    newSelectArr?.map(item => {
      item.price = (data?.value === 2 && !!item?.data?.wholesale_price)
                    ? item?.data?.wholesale_price : item?.data?.price
    })

    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE,
      payload: { list: newSelectArr },
    })

    if(+state?.form?.shippingInfo?.shippingPartner?.id === 2) {
      const tmpPrice = newSelectArr.reduce((p, n, i) => {
        const itemPrice =
          transformMoneyToSendRequest(newSelectArr[i]?.price || 0) *
          transformMoneyToSendRequest(newSelectArr[i]?.quantity || 0)
        const itemDiscount = itemPrice - (
          newSelectArr[i]?.discount_type === '%'
            ? itemPrice * (+newSelectArr[i]?.discount / 100 || 0)
            : (newSelectArr[i]?.discount || 0)
        )
        return p + itemDiscount
      }, 0)

      const value = fNumber(tmpPrice.toString().replace(/[^0-9]/g, ''))
      const listPartner = state.form.shippingInfo.shippingPartner.list
      listPartner['1'].config.cargoInsurrance.value = value
      dispatch({
        type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
        payload: {
          list: listPartner,
        },
      })
    }
  }

  // ======================================================================================================
  // INVENTORY SEARCH
  // ======================================================================================================
  const withInventorySearchData = productInfo.withInventoryConfig.search
  const withInventoryWarehouseData = productInfo.withInventoryConfig.warehouse

  const handleFetchSearchProductList = async (k, page, opt) => {
    if (withInventorySearchData.loading) return

    if (page === 0)
      dispatch({
        type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_LOADING_UPDATE,
      })

    const q = transformQueryObjToString({
      ...productQueries,
      keyword: k.trim(),
      warehouse_id: withInventoryWarehouseData.value?.value || '',
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
      payload: { value: keyword },
    })

    clearTimeout(withInventorySearchTimeout)

    withInventorySearchTimeout = setTimeout(
      () => handleFetchSearchProductList(keyword, 0),
      500,
    )
  }

  const handleWithInventorySearchSelect = (data, opt) => {
    if (
      ![
        'increase',
        'decrease',
        'amount',
        'price',
        'discount',
        'discountValue',
        'discountEdit',
        'discountType',
      ].includes(opt?.type) ||
      !data
    )
      return

    let newSelectArr = withInventorySearchData.selected
    const findIndexData = newSelectArr.findIndex(
      item => item?.data?.id === data?.id,
    )
    switch (opt.type) {
      case 'amount':
        if (findIndexData !== -1) {
          const amountFormat = Math.ceil(opt.amount)
          if (opt?.amount === -1) {
            newSelectArr = newSelectArr.filter((item, i) => i !== findIndexData)
          } else
            newSelectArr[findIndexData].quantity =
              typeof opt?.amount === 'string'
                ? opt?.amount
                ? 1
                : ''
                : +amountFormat > 9999 ? 9999 : +amountFormat
        } else
          newSelectArr = [
            ...newSelectArr,
            { data, quantity: opt?.amount ? 1 : '' },
          ]
        dispatch({
          type: orderSingleAction.UPDATE_PRODUCT_CHANGE_PRODUCT,
          payload: true
        })
        break

      case 'decrease':
        if (findIndexData !== -1) {
          if (newSelectArr[findIndexData].quantity > 1)
            newSelectArr[findIndexData].quantity -= 1
        }
        dispatch({
          type: orderSingleAction.UPDATE_PRODUCT_CHANGE_PRODUCT,
          payload: true
        })
        break

      case 'increase':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].quantity += 1
          if(newSelectArr[findIndexData].quantity > 9999) newSelectArr[findIndexData].quantity = 9999
        }
        else
          newSelectArr = [
            ...newSelectArr,
            {
              data,
              quantity: 1,
              discountType: '%',
              price:
                newSelectArr[findIndexData]?.price || Number(opt?.price || 0),
            },
          ]
        dispatch({
          type: orderSingleAction.UPDATE_PRODUCT_CHANGE_PRODUCT,
          payload: true
        })
        break

      case 'price':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].price = Number((opt?.value > 99999999 ? 99999999 : opt?.value) || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discount':
        if (findIndexData !== -1) {
          const total = (+newSelectArr[findIndexData].quantity * +newSelectArr[findIndexData].price) || 0
          if (total < Number(opt?.value || 0)) opt.value = total
          newSelectArr[findIndexData].discount = Number(opt?.value || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discountValue':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].discount_value = Number(opt?.value || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discountEdit':
        if (findIndexData !== -1) {
          const total = (+newSelectArr[findIndexData].quantity * +newSelectArr[findIndexData].price) || 0
          if (total < Number(opt?.value || 0)) opt.value = total
          newSelectArr[findIndexData].discount = Number(opt?.value || 0)
          newSelectArr[findIndexData].discount_value = Number(opt?.value || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discountType':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].discountType = opt?.value
          newSelectArr[findIndexData].discount = 0
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      default:
        break
    }

    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE,
      payload: { list: newSelectArr },
    })


    if(+state?.form?.shippingInfo?.shippingPartner?.id === 2) {
      const tmpPrice = newSelectArr.reduce((p, n, i) => {
        const itemPrice =
          transformMoneyToSendRequest(newSelectArr[i]?.price || 0) *
          transformMoneyToSendRequest(newSelectArr[i]?.quantity || 0)
        const itemDiscount = itemPrice - (
          newSelectArr[i]?.discount_type === '%'
            ? itemPrice * (+newSelectArr[i]?.discount / 100 || 0)
            : (newSelectArr[i]?.discount || 0)
        )
        return p + itemDiscount
      }, 0)

      const value = fNumber(tmpPrice.toString().replace(/[^0-9]/g, ''))
      const listPartner = state.form.shippingInfo.shippingPartner.list
      listPartner['1'].config.cargoInsurrance.value = value
      dispatch({
        type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
        payload: {
          list: listPartner,
        },
      })
    }
  }

  const handleWithInventorySearchListLoadMore = () => {
    const currentTotal = withInventorySearchData.list.length
    const total = withInventorySearchData.total

    if (currentTotal >= total) return

    const response = handleFetchSearchProductList(
      withInventorySearchData.value,
      withInventorySearchData.page + 1,
    )

    return response
  }

  // ======================================================================================================
  // INVENTORY TOTAL DISCOUNT
  // ======================================================================================================
  const handleTotalDiscountChange = (type, value, total) => {
    if (type == '%' && (value.length > 3 || (value.length <= 3 && +value > 100))) value = 100
    if (type !== '%' && ((value.length > 3 && +replaceAllCustom(value, ',', '') > total) || (value.length < 3 && +value > total))) value = total
    dispatch({
      type: orderSingleAction.FORM_WITH_INVENTORY_TOTAL_DISCOUNT_UPDATE,
      payload: { type, value, triggerDefault: !withInventoryData?.discount?.triggerDefault },
    })
  }

  return {
    data: productInfo,
    payment: paymentMethod,
    field_paid: state.field_paid,
    properties: { isWarehouseLoading },
    methods: {
      onInventoryToggle: handleInventoryToggle,
      // no inventory
      onInventoryTypeChange: handleInventoryTypeChange,
      // ========= no inventory manual
      onInventoryManualChange: handleInventoryManualChange,
      onInventoryManualValidare: handleInventoryManualValidate,
      // ========= no inventory auto
      onInventoryAutoChange: handleInventoryAutoChange,
      onInventoryAutoFetchMoreProductList: handleInventoryAutoListLoadMore,
      onInventoryAutoSelect: handleInventoryAutoSelect,
      // with inventory
      onWithInventorySearchChange: handleWithInventorySearchChange,
      onWithInventorySearchFetchMoreProductList:
      handleWithInventorySearchListLoadMore,
      onWithInventorySearchSelect: handleWithInventorySearchSelect,
      onPriceTypeChange: handlePriceTypeChange,
      onWarehouseChange: handleWarehouseChange,
      onWarehouseKeywordChange: handleWarehouseKeywordChange,
      onWarehouseLoadMore: handleWarehouseLoadMore,
      onTotalDiscountChange: handleTotalDiscountChange,
    },
  }
}

export default useOrderSingleProductInfo
