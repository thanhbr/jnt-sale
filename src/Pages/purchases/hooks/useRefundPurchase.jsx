import { useContext } from 'react'
import { PurchasesContext } from '../provider/_context'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import useAlert from '../../../hook/useAlert'
import { transformListProductData } from '../utils/transform'
import { replaceAllCustom } from '../../../util/functionUtil'
import { useNavigate, useParams } from 'react-router-dom'
import { fNumber } from '../../../util/formatNumber'
import { STATUS_PAYMENT, STATUS_WAREHOUSE } from '../interfaces/_constants'

const useRefundPurchase = () => {
  const { pageState, pageDispatch } = useContext(PurchasesContext)
  const { showAlert } = useAlert()
  const { purchaseId } = useParams()
  const nav = useNavigate()

  const { extraInfo } = pageState.refund
  const { paymentVendor } = pageState.refund
  const { productInfo } = pageState.refund
  const { statusInfo } = pageState.refund
  const { validate } = pageState.refund
  const { productInventory } = pageState.refund
  const { detail } = pageState.refund
  // get detail purchase

  const getPurchaseDetail = async _ => {
    const response = await sendRequestAuth('get',
      `${config.API}/purchase/detail/${purchaseId}`
    )
    if (response.data.success) {
      const data = response.data.data
      if (+data.warehouse_status == STATUS_WAREHOUSE.hoan_tra_toan_bo.status && +data.payment_status == STATUS_PAYMENT.hoan_tien_toan_bo.status)
        nav('/purchases')
      let totalReturn = 0
      const purchaseReturn = data?.purchase_return || []
      if (purchaseReturn.length > 0) {
        // set total payment refund

        totalReturn = purchaseReturn.reduce(
          (p, n) => p + Number(n?.return_total_amount || 0),
          0,
        )
      }
      pageDispatch({
        type: 'SET_REFUND_PURCHASE_DETAIL',
        payload: data,
      })
      pageDispatch({
        type: 'FORM_REFUND_GENERAL_INFO_WAREHOUSE_UPDATE',
        payload: {
          value: {
            'data': {
              'id': data?.warehouse_id,
              'warehouse_name': data?.warehouse_name,
              'status': '1',
              'is_main': '0',
            },
            'name': data?.warehouse_name,
            'value': data?.warehouse_id,
          }
        },
      })

      pageDispatch({
        type: 'FORM_REFUND_GENERAL_INFO_VENDOR_UPDATE',
        payload: {
          value: {
            'data': {
              'supplier_id': data?.supplier_id,
              'supplier_code': data?.supplier_code,
              'supplier_name': data?.supplier_name,
              'status': '1'
            },
            'name': data?.supplier_name,
            'value': data?.supplier_id,
          }
        },
      })
      //set Product Info

      let products = data?.purchase_details || []
      products = products.filter(item => +item?.quantity_remain != 0)
      const newProducts = products.map(product => {
        return {
          'data': product,
          'quantity': Number(product?.quantity_remain) || 0,
          'price': Number(product?.price) || 0
        }
      })

      pageDispatch({
        type: 'UPDATE_REFUND_PRODUCT_INFO',
        payload: {
          selected: newProducts,
          totalAmount: data?.total_amount || 0,
          totalPayment: data?.total_payment || 0,
          totalReturn: totalReturn
        },
      })

      //set Payment Info
      if (data?.purchase_payment?.length > 0) {
        const payment = data?.purchase_payment
        pageDispatch({
          type: 'FORM_REFUND_PAYMENT_METHOD_UPDATE',
          payload: {
            value: {
              'data': {
                'id': payment[0]?.payment_method_id,
                'name': payment[0]?.payment_method_name,
                'is_default': '0',
                'is_active': '0',
                'status': '1'
              },
              'name': payment[0]?.payment_method_name,
              'value': payment[0]?.payment_method_id,
            }
          },
        })
        pageDispatch({
          type: 'FORM_REFUND_PAYMENT_MONEY_UPDATE',
          payload: { value: +data?.total_payment - totalReturn },
        })

        pageDispatch({
          type: 'FORM_REFUND_PAYMENT_METHOD__VALIDATE',
          payload: {
            trigger: !validate?.trigger,
          }
        })
      } else {
        pageDispatch({
          type: 'FORM_REFUND_PAYMENT_STATUS_UPDATE',
          payload: false,
        })
      }

      //set extra Info

      pageDispatch({
        type: 'FORM_PAYMENT_NOTE_UPDATE',
        payload: data?.note || '',
      })
      pageDispatch({
        type: 'FORM_INVENTORY_UPDATE',
        payload: data.is_stock == 0 ? false : true,
      })
    } else {
      showAlert({
        type: 'danger',
        content: response.data?.message
      })
      nav('/purchases')
    }
  }

  const canSubmitForm = ![
    (!!paymentVendor.status && !!paymentVendor.paymentMethod.value && paymentVendor.price?.value > 0) || !paymentVendor.status,
  ].includes(false)

  const validateForm = () => {
    pageDispatch({
      type: 'FORM_REFUND_PAYMENT_METHOD__VALIDATE',
      payload: {
        method: (!!paymentVendor.status && !paymentVendor.paymentMethod.value) ? 'Phương thức thanh toán không được để trống' : '',
        price: (!!paymentVendor.status && paymentVendor.price?.value == 0) ? 'Số tiền nhận lại từ nhà cung cấp phải > 0' : ''
      }
    })
    pageDispatch({
      type: 'UPDATE_REFUND_PRODUCT_INFO',
      payload: { validate: productInfo.selected.length < 1 ? 'Vui lòng chọn ít nhất 1 sản phẩm' : '' }
    })
  }

  const handleSubmitRefundPurchase = async () => {
    //validate
    validateForm()
    if (!canSubmitForm || (!!validate.productAmount && !!productInfo.status)) return

    const tmpPrice = productInfo?.selected.reduce((p, n, i) => {
      const itemPrice =
        Number(productInfo?.selected[i]?.price || 0) * Number(productInfo?.selected[i]?.quantity || 0)

      return p + itemPrice
    }, 0)
    const vat_price = productInfo.vat?.length > 3 ? replaceAllCustom(productInfo.vat, ',', '') : productInfo.vat
    const totalAmount = +tmpPrice + Number(vat_price)
    // if (detail.is_stock == 1 && !!productInfo.status && ((!!productInfo.totalPayment && +productInfo.totalPayment > 0) && totalAmount > productInfo.totalPayment)) {
    //   showAlert({
    //     type: 'danger',
    //     content: 'Tổng giá trị trả hàng ≤ Giá trị Đã thanh toán cho NCC - Nhận tiền hoàn từ NCC'
    //   })
    //   return
    // }
    const data = {
      'vat': vat_price,
      'total_amount': detail?.is_stock == 1 ? totalAmount : 0,
      'arr_product': detail?.is_stock == 1 && !!productInfo.status ? transformListProductData(productInfo?.selected) : [],
      'payment_return_info': paymentVendor?.status ?
        {
          'payment_method_id': paymentVendor.paymentMethod.value?.value,
          'amount': paymentVendor?.price?.value?.length > 3 ? replaceAllCustom(paymentVendor?.price?.value, ',', '') : paymentVendor?.price?.value
        } : {},
      'reason': extraInfo?.refundReason || ''
    }
    //
    const url = `${config.API}/purchase/return/${purchaseId}`
    const response = await sendRequestAuth('post',
      url,
      data
    )
    if (response.data.success) {
      showAlert({
        type: 'success',
        content: 'Hoàn trả phiếu nhập hàng thành công'
      })
      nav('/purchases')
    } else {
      showAlert({
        type: 'danger',
        content: 'Hoàn trả phiếu nhập hàng thất bại'
      })
    }

  }

  return {
    data: extraInfo,
    detail,
    validate,
    productInventory,
    statusInfo,
    canSubmitForm,
    field_paid: pageState.field_paid,
    methods: {
      onSubmitRefundPurchase: handleSubmitRefundPurchase,
      getPurchaseDetail
    },
  }
}

export default useRefundPurchase
