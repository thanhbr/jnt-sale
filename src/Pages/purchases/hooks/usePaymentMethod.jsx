import { debounce } from '@mui/material'
import { sendRequestAuth } from 'api/api'
import config from 'config'
import { useCallback, useEffect, useState } from 'react'
import ArrayUtils from '../utils/array'
import {
  transformPaymentMethodData,
  transformQueryObjToString
} from '../utils/transform'

const usePaymentMethod = () => {
  const [paymentMethod, setPaymentMentod] = useState({
    keyword: '',
    list: [],
    listOrigin: [],
    page: 0,
    total: 0,
    value: null,
  })

  const methodQueries = {
    keyword: '',
    per_page: 10,
    start: 0,
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

      if (opt?.setDefaultValue)
        setPaymentMentod(prev => ({
            ...prev,
            list:
              page === 0
                ? methodListData
                : [...paymentMethod.method.list, ...methodListData],
            listOrigin:
            page === 0
              ? methodListData
              : [...paymentMethod.method.list, ...methodListData],
            value: methodListData[0],
            page,
            total: response?.data?.meta?.total || 0,
        }))
      else 
        setPaymentMentod(prev => ({
          ...prev,
          list:
            page === 0
              ? methodListData
              : [...paymentMethod.method.list, ...methodListData],
          listOrigin:
            page === 0
              ? methodListData
              : [...paymentMethod.method.list, ...methodListData],
          page,
          total: response?.data?.meta?.total || 0,
      }))
    }

    if (page === 0) setIsMethodLoading(false)

    return response
  }

  const handleMethodChange = data =>
    setPaymentMentod(prev => ({
      ...prev,
      value: data,
    }))

  const debounceMethodKeywordChange = useCallback(
    debounce(data => {
      handleFetchMethod(data?.value)
    }, 500),
    [],
  )
  const handleMethodKeywordChange = data => {
    setPaymentMentod(prev => ({
      ...prev,
      keyword: data?.value || '',
    }))
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
  return {
    data: paymentMethod,
    properties: {isMethodLoading},
    methods: {
      onMethodChange: handleMethodChange,
      onMethodKeywordChange: handleMethodKeywordChange,
      onMethodLoadMore: handleMethodLoadMore,
      handleFetchMethod,
    },
  }
}

export default usePaymentMethod
