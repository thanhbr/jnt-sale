import { sendRequestAuth } from 'api/api'
import config from 'config'
import { useCallback, useState } from 'react'
import { useContext } from 'react'
import { orderSingleAction } from '../provider/_actions'
import { OrderSingleContext } from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformMoneyToSendRequest,
  transformPaymentMethodData,
  transformQueryObjToString,
} from '../utils/transform'
import { debounce } from '@mui/material'
import { replaceAllCustom } from '../../../util/functionUtil'
import { fNumber } from '../../../util/formatNumber'

const useOrderSinglePaymentMethod = () => {
  const { state, dispatch } = useContext(OrderSingleContext)
  const { paymentMethod } = state.form
  const { productInfo } = state.form

  const methodQueries = {
    keyword: '',
    status: '1',
    per_page: 10,
    start: 0,
  }

  // ======================================================================================================
  // TYPE
  // ======================================================================================================
  const handleTypeChange = val => {
    dispatch({
      type: orderSingleAction.FORM_PAYMENT_METHOD_TYPE_UPDATE,
      payload: { type: val },
    })
    if (val !== 'before') {
      dispatch({
        type: orderSingleAction.FORM_PAYMENT_MONEY_UPDATE,
        payload: { value: 0 },
      })
    }
  }

  // ======================================================================================================
  // METHOD
  // ======================================================================================================
  const [isMethodLoading, setIsMethodLoading] = useState(false)

  const handleFetchMethod = async (k, opt) => {
    if (isMethodLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsMethodLoading(true)

    const q = transformQueryObjToString({
      ...methodQueries,
      keyword: k.trim(),
      start: page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/payment/payment-method${q}`,
    )

    if (!!response?.data?.success) {
      const methodListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformPaymentMethodData)

      dispatch({
        type: orderSingleAction.FORM_PAYMENT_METHOD_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? methodListData
              : [...paymentMethod.method.list, ...methodListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsMethodLoading(false)

    return response
  }

  const handleMethodChange = data =>
    dispatch({
      type: orderSingleAction.FORM_PAYMENT_METHOD_UPDATE,
      payload: { value: data },
    })

  const debounceMethodKeywordChange = useCallback(
    debounce(data => {
      handleFetchMethod(data?.value)
    }, 500),
    [],
  )
  const handleMethodKeywordChange = data => {
    dispatch({
      type: orderSingleAction.FORM_PAYMENT_METHOD_KEYWORD_UPDATE,
      payload: { keyword: data?.value || '' },
    })
    debounceMethodKeywordChange(data)
  }

  const handleMethodLoadMore = () => {
    const currentTotal = paymentMethod.method.list.length
    const total = paymentMethod.method.total

    if (currentTotal >= total) return null

    const response = handleFetchMethod(paymentMethod.method.keyword, {
      page: paymentMethod.method.page + 1,
    })

    return response
  }

  // ======================================================================================================
  // MONEY
  // ======================================================================================================
  const handleMoneyChange = val => {
    const value = val.length > 3 ? replaceAllCustom(val, ',','') : val
    if (!!productInfo.inventory) {
      const selectedList = productInfo?.withInventoryConfig?.search?.selected
      const tmpPrice = selectedList.reduce((p, n, i) => {
        const itemPrice =
          transformMoneyToSendRequest(selectedList[i]?.price || 0) *
          transformMoneyToSendRequest(selectedList[i]?.quantity || 0)

        return p + itemPrice
      }, 0)

      const tmpDiscount = selectedList.reduce((p, n, i) => {
        const itemDiscount =
          selectedList[i]?.discountType === 'đ'
            ? transformMoneyToSendRequest(selectedList[i]?.discount || 0)
            : (transformMoneyToSendRequest(selectedList[i]?.price || 0) *
            transformMoneyToSendRequest(selectedList[i]?.quantity || 0) *
            transformMoneyToSendRequest(selectedList[i]?.discount || 0)) /
            100

        return p + itemDiscount
      }, 0)

      const tmpTotalDiscount = productInfo?.withInventoryConfig?.discount?.value?.length > 3 ? +replaceAllCustom(productInfo?.withInventoryConfig?.discount?.value, ',', '') : +productInfo?.withInventoryConfig?.discount?.value

      const orderDiscount = (productInfo?.withInventoryConfig?.discount?.type === '%' ?
        ((+tmpPrice - +tmpDiscount) * +tmpTotalDiscount / 100) :
        +tmpTotalDiscount) || 0

      const totalAmount = tmpPrice - tmpDiscount - orderDiscount
      dispatch({
        type: orderSingleAction.FORM_PAYMENT_MONEY_UPDATE,
        payload: { value: +value > +totalAmount ? fNumber(totalAmount) : val },
      })
    } else
      dispatch({
        type: orderSingleAction.FORM_PAYMENT_MONEY_UPDATE,
        payload: { value: +value >= 100000000 ? '99,999,999' : val },
      })
  }

  // ======================================================================================================
  // DATETIME
  // ======================================================================================================
  const handleDateTimeChange = data =>
    dispatch({
      type: orderSingleAction.FORM_PAYMENT_DATETIME_UPDATE,
      payload: { ...data },
    })
  return {
    data: paymentMethod,
    properties: { isMethodLoading },
    methods: {
      // type
      onTypeChange: handleTypeChange,
      // method
      onMethodChange: handleMethodChange,
      onMethodKeywordChange: handleMethodKeywordChange,
      onMethodLoadMore: handleMethodLoadMore,
      // money
      onMoneyChange: handleMoneyChange,
      // datetime
      onDateTimeChange: handleDateTimeChange,
    },
  }
}

export default useOrderSinglePaymentMethod
