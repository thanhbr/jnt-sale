import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {PurchasesContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformProductData,
  transformQueryObjToString,
} from '../utils/transform'
import {debounce} from '@mui/material'
import { formatMoney } from '../../../util/functionUtil'
import { fNumber } from '../../../util/formatNumber'

const useRefundPurchaseProductInfo = () => {
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {productInfo} = pageState.refund
  const {paymentVendor} = pageState.refund
  const {detail} = pageState.refund
  const {validate} = pageState.refund
  const {statusInfo} = pageState.refund

  const productQueries = {
    keyword: '',
    category_id: '',
    product_id_details: '',
    status: 1,
    warehouse_id: '',
    per_page: 10,
    start: 0,
  }

  // ======================================================================================================
  // ========= NO INVENTORY AUTO
  // ======================================================================================================

  const handleFetchProductList = async (k, page = 0) => {
    if (productInfo.loading) return

    if (page === 0)
      pageDispatch({
        type: 'UPDATE_REFUND_PRODUCT_INFO',
        payload: {
          loading: true
        }
      })

    if (!!!k.trim() && page === 0) {
      pageDispatch({
        type: 'UPDATE_REFUND_PRODUCT_INFO',
        payload: {list: productInfo.listOrigin, loading: false, page: 0},
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

      pageDispatch({
        type: 'UPDATE_REFUND_PRODUCT_INFO',
        payload: {
          list:
            page === 0
              ? formatCustomerList
              : [...productInfo.list, ...formatCustomerList],
          loading: false,
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    return response
  }

  const debounceSearchProduct = useCallback(debounce(keyword => {
    handleFetchProductList(keyword, 0)
  }, 500), [])

  const handleProductSearchChange = (val = '') => {
    const keyword = val ? `${val}` : ''

    pageDispatch({
      type: 'UPDATE_REFUND_PRODUCT_INFO',
      payload: {value: keyword},
    })
    debounceSearchProduct(keyword)
  }

  const handleChangeVAT = value => {
    let currentValue = value.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)
    pageDispatch({
      type: 'UPDATE_REFUND_PRODUCT_INFO',
      payload: {vat: fNumber(Number(currentValue))},
    })
  }

  const handleSelectAllProduct = boo => {
    let newSelectArr = productInfo.selected
    newSelectArr = newSelectArr.map(item => {
      item.quantity = !!boo ? 0 : item?.data?.quantity_remain
      item.data.quantity = !!boo ? 0 : item?.data?.quantity_remain
      return item
    })
    pageDispatch({
      type: 'FORM_REFUND_PAYMENT_METHOD__VALIDATE',
      payload: {
        productAmount: !!boo ? true : false,
      }
    })
    pageDispatch({
      type: 'UPDATE_REFUND_PRODUCT_INFO',
      payload: {
        refundAll: !boo,
        selected: newSelectArr,
      },
    })
  }

  const handleProductSelect = (data, opt) => {
    if (!['increase', 'decrease', 'amount', 'price'].includes(opt?.type) || !data) return

    let newSelectArr = productInfo.selected
    const findIndexData = newSelectArr.findIndex(
      item => item?.data?.id === data?.id,
    )

    switch (opt.type) {
      case 'amount':
        if (findIndexData !== -1) {
          if(typeof opt?.amount !== 'string' && Math.ceil(opt.amount) < newSelectArr[findIndexData].data.quantity_remain)
            newSelectArr[findIndexData].quantity = Math.ceil(opt.amount)
          else
            newSelectArr[findIndexData].quantity = typeof opt?.amount === 'string' ? 0 : newSelectArr[findIndexData].data.quantity_remain
        }
        break

      case 'decrease':
        if (findIndexData !== -1) {
          if (newSelectArr[findIndexData].quantity > 0)
            newSelectArr[findIndexData].quantity -= 1
        }
        break

      case 'increase':
        if (findIndexData !== -1) {
          if(newSelectArr[findIndexData].quantity < newSelectArr[findIndexData].data.quantity_remain)
            newSelectArr[findIndexData].quantity += 1
          opt?.price ? newSelectArr[findIndexData].price = Number(opt?.price) : ''
        } else {
          newSelectArr = [...newSelectArr, {data, quantity: 0, price : Number(opt?.price || 0)}]
        }
        break
      case 'price':
        if (findIndexData !== -1)
          newSelectArr[findIndexData].price = Number(opt?.value || 0)
        break
      default:
        break
    }

    const totalQuantity = newSelectArr.reduce(
      (p, n) => p + Number(n?.quantity || 0),
      0,
    )
    const totalQuantityRemain = newSelectArr.reduce(
      (p, n) => p + Number(n?.data?.quantity_remain || 0),
      0,
    )
    pageDispatch({
      type: 'FORM_REFUND_PAYMENT_METHOD__VALIDATE',
      payload: {
        productAmount: totalQuantity == 0,
      }
    })
    pageDispatch({
      type: 'UPDATE_REFUND_PRODUCT_INFO',
      payload: {
        selected: newSelectArr,
        refundAll: totalQuantity == totalQuantityRemain
      },
    })
    pageDispatch({type: 'UPDATE_REFUND_PRODUCT_INFO', payload: {validate: productInfo.selected.length < 1 ?  'Vui lòng chọn ít nhất 1 sản phẩm': ''}})
  }

  const handleProductListLoadMore = () => {
    const currentTotal = productInfo.list.length
    const total = productInfo.total

    if (currentTotal >= total) return

    const response = handleFetchProductList(
      productInfo.value,
      productInfo.page + 1,
    )

    return response
  }


  // ======================================================================================================
  const handlePriceTypeChange = data =>
    pageDispatch({
      type: 'FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE',
      payload: {value: data},
    })


  const handleChangeStatusProduct = boo =>
    pageDispatch({
      type: 'UPDATE_REFUND_PRODUCT_INFO',
      payload: {
        status: !boo
      },
    })


  return {
    data: productInfo,
    validate,
    paymentVendor,
    detail,
    statusInfo,
    field_paid: pageState.field_paid,
    methods: {
      // no inventory
      onProductSearchChange: handleProductSearchChange,
      onProductFetchMoreProductList: handleProductListLoadMore,
      onProductSelect: handleProductSelect,
      onChangeSelectAllProduct: handleSelectAllProduct,
      onChangeVAT: handleChangeVAT,
      onPriceTypeChange: handlePriceTypeChange,
      onChangeStatusProduct: handleChangeStatusProduct,
      onFetchProduct: handleProductSearchChange
    },
  }
}

export default useRefundPurchaseProductInfo
