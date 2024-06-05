import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import { PurchasesContext } from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformPaymentMethodData,
  transformQueryObjToString,
} from '../utils/transform'
import {debounce} from '@mui/material'
import { replaceAllCustom } from '../../../util/functionUtil'
import { fNumber } from '../../../util/formatNumber'

const useRefundPurchasePaymentVendor = () => {
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {paymentVendor} = pageState.refund
  const {productInfo} = pageState.refund
  const {validate} = pageState.refund

  const methodQueries = {
    keyword: '',
    status: 1,
    per_page: 10,
    start: 0,
  }

  // ======================================================================================================
  // METHOD
  // ======================================================================================================
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
        type: 'FORM_REFUND_PAYMENT_METHOD_UPDATE',
        payload: {
          list:
            page === 0
              ? methodListData
              : [...paymentVendor.paymentMethodlist, ...methodListData],
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
      type: 'FORM_REFUND_PAYMENT_METHOD_UPDATE',
      payload: {value: data},
    })
    pageDispatch({type: 'FORM_REFUND_PAYMENT_METHOD__VALIDATE', payload:  ''})
  }

  const debounceMethodKeywordChange = useCallback(
    debounce(data => {
      handleFetchMethod(data?.value)
    }, 500),
    [],
  )
  const handleMethodKeywordChange = data => {
    pageDispatch({
      type: 'FORM_REFUND_PAYMENT_METHOD_UPDATE',
      payload: {keyword: data?.value || ''},
    })
    debounceMethodKeywordChange(data)
  }

  const handleMethodLoadMore = () => {
    const currentTotal = paymentVendor.paymentMethodlist.length
    const total = paymentVendor.paymentMethodtotal

    if (currentTotal >= total) return null

    const response = handleFetchMethod(paymentVendor.paymentMethodkeyword, {
      page: paymentVendor.paymentMethod.page + 1,
    })

    return response
  }

  // ======================================================================================================
  // MONEY
  // ======================================================================================================
  const handleMoneyChange = val => {
    const maxMoneyRefund = +productInfo?.totalPayment - productInfo?.totalReturn
    if(val.length > 3) val = replaceAllCustom(val,',','')
    if(+val > maxMoneyRefund){
      pageDispatch({
        type: 'FORM_REFUND_PAYMENT_MONEY_UPDATE',
        payload: {value: maxMoneyRefund},
      })
      pageDispatch({
        type: 'FORM_REFUND_PAYMENT_METHOD__VALIDATE',
        payload: {
          price: `Số tiền nhận lại từ Nhà cung cấp ≤ Số tiền đã thanh toán cho NCC ${productInfo?.totalReturn > 0 ? '- Số tiền đã hoàn trả từ NCC' : '' } `,
          trigger: !validate?.trigger,
        }
      })
    }else{
      pageDispatch({
        type: 'FORM_REFUND_PAYMENT_MONEY_UPDATE',
        payload: {value: val},
      })
      pageDispatch({
        type: 'FORM_REFUND_PAYMENT_METHOD__VALIDATE',
        payload: {
          price: (!!paymentVendor.status && val == 0) ? 'Số tiền nhận lại từ NCC cần > 0. Nếu chưa nhận tiền hoàn lại từ NCC, hãy tắt trạng thái nhận hoàn tiền từ nhà cung cấp' : '',
          trigger: !validate?.trigger,
        }
      })
    }
  }

  const handleStatusChange = _ =>
    pageDispatch({
      type: 'FORM_REFUND_PAYMENT_STATUS_UPDATE',
      payload: !paymentVendor.status,
    })

  return {
    data: paymentVendor,
    productInfo,
    validate,
    properties: {isMethodLoading},
    methods: {
      // method
      onFetchPayment: handleFetchMethod,
      onMethodChange: handleMethodChange,
      onMethodKeywordChange: handleMethodKeywordChange,
      onMethodLoadMore: handleMethodLoadMore,
      // money
      onMoneyChange: handleMoneyChange,
      onStatusChange: handleStatusChange,
    },
  }
}

export default useRefundPurchasePaymentVendor
