import { useContext } from 'react'
import { PurchasesContext } from '../provider/_context'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import useAlert from '../../../hook/useAlert'
import { transformListProductData } from '../utils/transform'
import { formatMoney, replaceAllCustom } from '../../../util/functionUtil'
import { useNavigate, useParams } from 'react-router-dom'
import { fNumber } from '../../../util/formatNumber'
import moment from 'moment'
import { convertDateTimeToApiFormat } from '../utils/date'

const useCreatePurchase = () => {
  const { pageState, pageDispatch } = useContext(PurchasesContext)
  const { showAlert } = useAlert()
  const { purchaseId } = useParams()
  const nav = useNavigate()

  const { extraInfo } = pageState.purchase
  const { detail } = pageState.purchase
  const { generalInfo } = pageState.purchase
  const { paymentVendor } = pageState.purchase
  const { productInfo } = pageState.purchase
  const { validate } = pageState.purchase
  const { statusInfo } = pageState.purchase
  const { productInventory } = pageState.purchase

  // get detail purchase

  const getPurchaseDetail = async _ => {
    const response = await sendRequestAuth('get',
      `${config.API}/purchase/detail/${purchaseId}`
    )
    if (response.data.success) {
      let totalReturn = 0
      const data = response.data.data

      const purchaseReturn = data?.purchase_return || []
      if(purchaseReturn.length > 0)
      {
        // set total payment refund

        totalReturn = purchaseReturn.reduce(
          (p, n) => p + Number(n?.return_total_amount || 0),
          0,
        )
      }
      //set General Info

      pageDispatch({
        type: 'SET_PURCHASE_DETAIL',
        payload: data,
      })
      pageDispatch({
        type: 'UPDATE_STATUS_INFO',
        payload: {
          canEdit: data?.is_stock == 1 ? false : true,
          paymentStatus: data?.payment_status,
          warehouseStatus: data?.warehouse_status,
        },
      })

      pageDispatch({
        type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
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
        type: 'FORM_GENERAL_INFO_VENDOR_UPDATE',
        payload: {
          value: {
            'data': {
              'supplier_id': data?.supplier_id,
              'supplier_name': data?.supplier_name,
              'status': '1'
            },
            'name': data?.supplier_name,
            'value': data?.supplier_id,
          }
        },
      })
      pageDispatch({
        type: 'FORM_GENERAL_INFO_CODE_UPDATE',
        payload: data?.code,
      })
      pageDispatch({
        type: 'FORM_GENERAL_INFO_DATE_TIME_UPDATE',
        payload: {
          'formatValue': data?.purchase_date,
          'value': new Date(data?.purchase_date),
          'trigger': true,
        },
      })
      //set Product Info

      const products = data?.purchase_details || []
      const newProducts = products.map(product => {
        return {
          'data': product,
          'quantity': Number(product?.quantity) || 1,
          'price': Number(product?.price) || 0
        }
      })

      const totalAmount = products.reduce(
        (p, n) => p + Number(n.total_amount || 0),
        0,
      )
      const totalPayment = Number(totalAmount) + Number(data?.price_vat || 0) + Number(totalReturn) - Number(data?.total_payment)

      pageDispatch({
        type: 'UPDATE_PRODUCT_INFO',
        payload: {
          selected: newProducts,
          totalAmount: data?.total_amount || 0,
          totalPayment: data?.total_payment || 0,
          vat: fNumber(data?.price_vat),
          totalReturn: totalReturn
        },
      })

      //set Payment Info
      if (data?.purchase_payment?.length > 0) {
        const payment = data?.purchase_payment
        pageDispatch({
          type: 'FORM_PAYMENT_METHOD_UPDATE',
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
          type: 'FORM_PAYMENT_MONEY_UPDATE',
          payload: {value: totalPayment || 0},
        })

        pageDispatch({
          type: 'FORM_PAYMENT_METHOD__VALIDATE',
          payload: {
            trigger: !validate?.trigger,
          }
        })
        if(+data?.payment_status == 3)
          pageDispatch({
            type: 'FORM_PAYMENT_STATUS_UPDATE',
            payload: false,
          })
      } else {
        pageDispatch({
          type: 'FORM_PAYMENT_STATUS_UPDATE',
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
    }
  }

  const checkProduct = productInfo?.selected.find(item => +item.quantity == 0)

  const canSubmitForm = ![
    !!generalInfo.vendor.value,
    !!generalInfo.warehouse.value,
    (!!paymentVendor.status && (!!paymentVendor.paymentMethod.value || +productInfo?.totalAmount === +(productInfo?.totalPayment - productInfo?.totalReturn))) || !paymentVendor.status,
    !checkProduct
  ].includes(false)

  const validateForm = () => {
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VALIDATE',
      payload: { vendor: !generalInfo.vendor.value ? 'Nhà cung cấp không được để trống' : '' }
    })
    pageDispatch({
      type: 'FORM_GENERAL_INFO_VALIDATE',
      payload: { warehouse: !generalInfo.warehouse.value ? 'Kho nhập hàng không được để trống' : '' }
    })
    pageDispatch({
      type: 'FORM_PAYMENT_METHOD__VALIDATE',
      payload: (!!paymentVendor.status && !paymentVendor.paymentMethod.value) ? 'Phương thức thanh toán không được để trống' : ''
    })
    pageDispatch({
      type: 'UPDATE_PRODUCT_INFO',
      payload: { validate: productInfo.selected.length < 1 ? 'Vui lòng chọn ít nhất 1 sản phẩm' : '' }
    })
  }

  const handleSubmitCreatePurchase = async () => {
    //validate
    validateForm()
    if (!canSubmitForm) return

    const tmpPrice = productInfo?.selected.reduce((p, n, i) => {
      const itemPrice =
        Number(productInfo?.selected[i]?.price || 0) * Number(productInfo?.selected[i]?.quantity || 0)

      return p + itemPrice
    }, 0)
    const vat_price = productInfo.vat?.length > 3 ? replaceAllCustom(productInfo.vat, ',', '') : productInfo.vat
    const totalAmount = +tmpPrice + Number(vat_price)
    const maxMoneyPayment = +totalAmount + Number(productInfo?.totalReturn || 0) - Number(productInfo?.totalPayment)
    const paymentAmount = paymentVendor?.price?.value?.length > 3 ? replaceAllCustom(paymentVendor?.price?.value, ',', '') : paymentVendor?.price?.value
    if(paymentVendor?.status && (paymentAmount > maxMoneyPayment || +paymentAmount == 0 || maxMoneyPayment <= 0) && +detail?.payment_status != 3) return
    const date = new Date()
    const dateLimit = moment(generalInfo.dateTime?.value, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    const now = moment()
    const data = !!purchaseId ?
      {
        'vat': vat_price,
        'total_amount': totalAmount,
        'arr_product': transformListProductData(productInfo?.selected),
        'is_stock': !!productInventory ? 1 : 0,
        'payment_info': paymentVendor?.status ?
          {
            'payment_method_id': paymentVendor.paymentMethod.value?.value,
            'amount': paymentAmount
          } : {},
        'note': extraInfo?.note || ''
      }
      : {
        'supplier_id': generalInfo?.vendor?.value?.data?.supplier_id || 0,
        'warehouse_id': generalInfo?.warehouse?.value?.data?.id || 0,
        'purchase_date': (!!productInventory && now.isBefore(dateLimit)) ? moment(date).format("DD-MM-YYYY HH:mm:ss")  : convertDateTimeToApiFormat(generalInfo.dateTime?.formatValue),
        'code': generalInfo?.code || '',
        'vat': vat_price,
        'total_amount': totalAmount,
        'arr_product': transformListProductData(productInfo?.selected),
        'is_stock': !!productInventory ? 1 : 0,
        'payment_info': paymentVendor?.status ?
          {
            'payment_method_id': paymentVendor.paymentMethod.value?.value,
            'amount': paymentAmount
          } : {},
        'note': extraInfo?.note || ''
      }
    //
    const url = !!purchaseId
      ?
      `${config.API}/purchase/update/${purchaseId}`
      :
      `${config.API}/purchase/create`
    const response = await sendRequestAuth('post',
      url,
      data
    )
    if (response.data.success) {
      showAlert({
        type: 'success',
        content: !!purchaseId ? 'Chỉnh sửa phiếu nhập hàng thành công.' : 'Tạo phiếu nhập hàng thành công.'
      })
      nav('/purchases')
    } else {
      showAlert({
        type: 'danger',
        content: response.data?.errors?.details[0]?.message ? response.data?.errors?.details[0]?.message : (!!response.data?.errors?.message ? response.data?.errors?.message : 'Tạo phiếu nhập thất bại!')
      })
    }

  }

  return {
    data: extraInfo,
    productInventory,
    statusInfo,
    canSubmitForm,
    field_paid: pageState.field_paid,
    methods: {
      onSubmitCreatePurchase: handleSubmitCreatePurchase,
      getPurchaseDetail
    },
  }
}

export default useCreatePurchase
