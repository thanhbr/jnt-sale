import { sendRequestAuth } from 'api/api'
import config from 'config'
import { useCallback } from 'react'
import { useContext } from 'react'
import { PurchasesContext } from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformProductData,
  transformQueryObjToString,
} from '../utils/transform'
import { debounce } from '@mui/material'
import { fNumber } from '../../../util/formatNumber'
import { CalculatePayment } from '../utils/func'
import { replaceAllCustom } from '../../../util/functionUtil'

const usePurchaseProductInfo = () => {
  const { pageState, pageDispatch } = useContext(PurchasesContext)
  const { productInfo } = pageState.purchase
  const { detail } = pageState.purchase
  const { statusInfo } = pageState.purchase
  const { validate } = pageState.purchase

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
        type: 'UPDATE_PRODUCT_INFO',
        payload: {
          loading: true
        }
      })

    if (!!!k.trim() && page === 0) {
      pageDispatch({
        type: 'UPDATE_PRODUCT_INFO',
        payload: { list: productInfo.listOrigin, loading: false, page: 0 },
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
        type: 'UPDATE_PRODUCT_INFO',
        payload: {
          list:
            page === 0
              ? formatCustomerList
              : [...productInfo.list, ...formatCustomerList],
          loading: false,
          page,
          total: response?.data?.meta?.total || 0,
          canLoadMore: [...productInfo.list, ...formatCustomerList].length >= response?.data?.meta?.total ? false : true
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
      type: 'UPDATE_PRODUCT_INFO',
      payload: { value: keyword },
    })
    debounceSearchProduct(keyword)
  }

  const handleChangeVAT = value => {
    let currentValue = value.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)
    if(Number(currentValue) < 100000000){
      pageDispatch({
        type: 'UPDATE_PRODUCT_INFO',
        payload: { vat: fNumber(Number(currentValue)) },
      })

      const totalPayment = CalculatePayment(productInfo.selected, productInfo, currentValue)

      if(totalPayment <= 0)
        pageDispatch({
          type: 'FORM_PAYMENT_STATUS_UPDATE',
          payload: false,
        })

      pageDispatch({
        type: 'FORM_PAYMENT_METHOD__VALIDATE',
        payload: {
          trigger: !validate?.trigger,
        }
      })
      pageDispatch({
        type: 'FORM_PAYMENT_MONEY_UPDATE',
        payload: { value: totalPayment > 0 ? totalPayment : 0 },
      })
    }
  }

  const handleProductSelect = (data, opt) => {
    let amount = +opt?.amount
    if (!['increase', 'decrease', 'amount', 'price'].includes(opt?.type) || !data) return
    amount = Math.ceil(amount)
    let newSelectArr = productInfo.selected
    const findIndexData = newSelectArr.findIndex(
      item => item?.data?.id === data?.id,
    )
    switch (opt.type) {
      case 'amount':
        if ((!!amount && amount <= 9999) || !amount) {
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
          if (newSelectArr[findIndexData].quantity > 1)
            newSelectArr[findIndexData].quantity -= 1
        }
        break

      case 'increase':
        if ((!!amount && amount <= 9999) || !amount) {
          if (findIndexData !== -1) {
            newSelectArr[findIndexData].quantity += 1
            opt?.price ? newSelectArr[findIndexData].price = Number(opt?.price) : ''
          } else {
            newSelectArr = [...newSelectArr, { data, quantity: 1, price: Number(opt?.price || 0) }]
          }
        }
        break
      case 'price':
        if (findIndexData !== -1){
          const price = Number(opt?.value  || newSelectArr[findIndexData].data.price )
          if(price <= 99999999){
            newSelectArr[findIndexData].price = price
          }
            newSelectArr[findIndexData].trigger = !newSelectArr[findIndexData]?.trigger
        }
        break
      default:
        break
    }

    const totalPayment = CalculatePayment(newSelectArr, productInfo, productInfo?.vat?.length > 3 ? replaceAllCustom(productInfo?.vat, ',', '') : productInfo?.vat)

    if(totalPayment <= 0)
      pageDispatch({
        type: 'FORM_PAYMENT_STATUS_UPDATE',
        payload: false,
      })

    pageDispatch({
      type: 'FORM_PAYMENT_MONEY_UPDATE',
      payload: { value: totalPayment > 0 ? totalPayment : 0 },
    })
    pageDispatch({
      type: 'UPDATE_PRODUCT_INFO',
      payload: { selected: newSelectArr },
    })
    pageDispatch({
      type: 'FORM_PAYMENT_METHOD__VALIDATE',
      payload: {
        trigger: !validate?.trigger,
      }
    })
    pageDispatch({
      type: 'UPDATE_PRODUCT_INFO',
      payload: { validate: productInfo.selected.length < 1 ? 'Vui lòng chọn ít nhất 1 sản phẩm' : '' }
    })
  }

  const handleProductListLoadMore = () => {
    const currentTotal = productInfo.list.length
    const total = productInfo.total

    if (currentTotal >= total) {
      pageDispatch({
        type: 'UPDATE_PRODUCT_INFO',
        payload: { canLoadMore: false },
      })
      return
    }

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
      payload: { value: data },
    })

  return {
    data: productInfo,
    detail,
    statusInfo,
    field_paid: pageState.field_paid,
    methods: {
      // no inventory
      onProductSearchChange: handleProductSearchChange,
      onProductFetchMoreProductList: handleProductListLoadMore,
      onProductSelect: handleProductSelect,
      onChangeVAT: handleChangeVAT,
      onPriceTypeChange: handlePriceTypeChange,
      onFetchProduct: handleProductSearchChange
    },
  }
}

export default usePurchaseProductInfo
