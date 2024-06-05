import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import { OrderContext } from '../provider/_context'
import {
  transformPaymentMethodData,
  transformQueryObjToString,
} from '../utils/transform'
import {debounce} from '@mui/material'
import ArrayUtils from '../utils/array'

const usePaymentType = () => {
  const {pageState, pageDispatch} = useContext(OrderContext)
  const {paymentMethod} = pageState
  const {validate} = paymentMethod

  const methodQueries = {
    keyword: '',
    status: 1,
    per_page: 10,
    start: 0,
  }

  const [isMethodLoading, setIsMethodLoading] = useState(false)

  const handleFetchMethod = async (k='', opt={}) => {
    if (isMethodLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsMethodLoading(true)

    const q = transformQueryObjToString({
      ...methodQueries,
      keyword: k.trim(),
      start: page * 10,
      status: 1,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/payment/payment-method${q}`,
    )

    if (!!response?.data?.success) {
      const methodListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformPaymentMethodData)

      pageDispatch({
        type: 'PAYMENT_METHOD_UPDATE',
        payload: {
          list:
            page === 0
              ? methodListData
              : [...paymentMethod.list, ...methodListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsMethodLoading(false)

    return response
  }

  const handleMethodChange = data => {
    pageDispatch({
      type: 'PAYMENT_METHOD_UPDATE',
      payload: {value: data},
    })
    pageDispatch({type: 'PAYMENT_METHOD_VALIDATE', payload: ''})
  }

  const debounceMethodKeywordChange = useCallback(
    debounce(data => {
      handleFetchMethod(data?.value)
    }, 500),
    [],
  )
  const handleMethodKeywordChange = data => {
    pageDispatch({
      type: 'PAYMENT_METHOD_UPDATE',
      payload: {keyword: data?.value || ''},
    })
    debounceMethodKeywordChange(data)
  }

  const handleMethodLoadMore = () => {
    const currentTotal = paymentMethod?.list?.length
    const total = paymentMethod.total

    if (currentTotal >= total) return

    const response = handleFetchMethod(paymentMethod.paymentMethodkeyword, {
      page: +paymentMethod?.page + 1,
    })

    return response
  }

  return {
    data: paymentMethod,
    validate,
    properties: {isMethodLoading},
    methods: {
      onFetchPayment: handleFetchMethod,
      onMethodChange: handleMethodChange,
      onMethodKeywordChange: handleMethodKeywordChange,
      onMethodLoadMore: handleMethodLoadMore,
    },
  }
}

export default usePaymentType
