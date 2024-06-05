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

const usePurchasePaymentVendor = () => {
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {generalInfo} = pageState.purchase
  const {paymentVendor} = pageState.purchase
  const {validate} = pageState.purchase
  const {productInfo} = pageState.purchase
  const {statusInfo} = pageState.purchase
  const {detail} = pageState.purchase

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

  const handleFetchMethodOrigin = async () => {
    const q = transformQueryObjToString({
      start: 0,
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
        type: 'FORM_PAYMENT_METHOD_UPDATE',
        payload: {
          list: methodListData,
          page: 0,
          total: response?.data?.meta?.total || 0,
          value: methodListData.find(item => item.data.is_active)
        },
      })
    }
    return response
  }

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
        type: 'FORM_PAYMENT_METHOD_UPDATE',
        payload: {
          list:
            page === 0
              ? methodListData
              : [...paymentVendor.paymentMethod.list, ...methodListData],
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
      type: 'FORM_PAYMENT_METHOD_UPDATE',
      payload: {value: data},
    })
    pageDispatch({type: 'FORM_PAYMENT_METHOD__VALIDATE', payload:  ''})
  }

  const debounceMethodKeywordChange = useCallback(
    debounce(data => {
      handleFetchMethod(data?.value)
    }, 500),
    [],
  )
  const handleMethodKeywordChange = data => {
    pageDispatch({
      type: 'FORM_PAYMENT_METHOD_UPDATE',
      payload: {keyword: data?.value || ''},
    })
    debounceMethodKeywordChange(data)
  }

  const handleMethodLoadMore = () => {
    const currentTotal = paymentVendor?.paymentMethod?.list?.length
    const total = paymentVendor.paymentMethod.total

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

    const tmpPrice = productInfo?.selected.reduce((p, n, i) => {
      const itemPrice =
        Number(productInfo?.selected[i]?.price || 0) * Number(productInfo?.selected[i]?.quantity || 0)

      return p + itemPrice
    }, 0)
    const vat_price = productInfo.vat?.length > 3 ? replaceAllCustom(productInfo.vat, ',', '') : productInfo.vat
    const totalAmount = +tmpPrice + Number(vat_price)
    const maxMoneyRefund = +totalAmount + Number(productInfo?.totalReturn) - Number(productInfo?.totalPayment)
    if(val.length > 3) val = replaceAllCustom(val,',','')
    if(+val > maxMoneyRefund){
      pageDispatch({
        type: 'FORM_PAYMENT_MONEY_UPDATE',
        payload: {value: maxMoneyRefund},
      })
      pageDispatch({
        type: 'FORM_PAYMENT_METHOD__VALIDATE',
        payload: {
          price: 'Số tiền thanh toán ≤ Số tiền cần thành toán - Số tiền đã thanh toán từ NCC',
          trigger: !validate?.trigger,
          type: 'warning'
        }
      })
    }else{
      if (+val < 1000000000000){
        pageDispatch({
          type: 'FORM_PAYMENT_MONEY_UPDATE',
          payload: {value: val},
        })
        pageDispatch({
          type: 'FORM_PAYMENT_METHOD__VALIDATE',
          payload: {
            price: (!!paymentVendor.status && val == 0) ? 'Số tiền thanh toán cần > 0. Nếu chưa thanh toán cho nhà cung cấp, hãy tắt trạng thái thanh toán' : '',
            trigger: !validate?.trigger,
            type: 'danger'
          }
        })
      }else{
        pageDispatch({
          type: 'FORM_PAYMENT_METHOD__VALIDATE',
          payload: {
            trigger: !validate?.trigger,
          }
        })
      }

    }
  }

  const handleStatusChange = _ =>
  {
    if(paymentVendor.price.value == 0 && +detail.payment_status == 1){
      pageDispatch({
        type: 'FORM_PAYMENT_MONEY_UPDATE',
        payload: {value: +detail.total_amount},
      })
    }
    pageDispatch({
      type: 'FORM_PAYMENT_STATUS_UPDATE',
      payload: !paymentVendor.status,
    })

  }

  return {
    data: paymentVendor,
    generalInfo,
    validate,
    productInfo,
    statusInfo,
    properties: {isMethodLoading},
    methods: {
      // method
      onFetchPayment: handleFetchMethod,
      onFetchMethodOrigin: handleFetchMethodOrigin,
      onMethodChange: handleMethodChange,
      onMethodKeywordChange: handleMethodKeywordChange,
      onMethodLoadMore: handleMethodLoadMore,
      // money
      onMoneyChange: handleMoneyChange,
      onStatusChange: handleStatusChange,
    },
  }
}

export default usePurchasePaymentVendor
