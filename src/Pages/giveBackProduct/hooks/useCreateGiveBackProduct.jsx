import React, {useCallback, useContext, useEffect, useState} from 'react';
import {GiveBackProductContext} from "../provider/context";
import {giveBackProductActions} from "../provider/~reducer";
import {convertDateTimeToApiFormat, convertDateTimeToApiFormatv2} from "../../../common/form/datePicker/_functions";
import {debounce} from "@mui/material";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useLocation, useNavigate} from "react-router-dom";
import toast from "../../../Component/Toast";
import {calculatedGivebackProduct} from "../interfaces/util";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useCreateGiveBackProduct = () => {
  const {t} = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const {pageState, pageDispatch} = useContext(GiveBackProductContext)
  const formData = pageState?.form
  const checkHasQuantity = formData?.orderReturnDetail?.products?.reduce((p, n) => {
    return p + +n.original_number
  }, 0)
  const totalValueOfGoods = formData?.orderReturnDetail?.products?.reduce((p, n) => {
    return +p + +n.return_value
  }, 0)
  const idDefault = location?.pathname?.split('/')[3]

  useEffect(() => {
    pageDispatch({
      type: giveBackProductActions.CHANGE_CREATE_UPDATE_PAYMENT_MONEY,
      payload: totalValueOfGoods
    })
  }, totalValueOfGoods)

  const handleChangeNote = value => {
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_NOTE, payload: value})
  }
  const paymentActive =
    !!formData?.orderReturnDetail?.payment_method?.id ?
      formData?.orderReturnDetail?.payment_method :
      (!!formData?.apiListPayment?.find(item => +item.is_active === 1) ?
        formData?.apiListPayment?.find(item => +item.is_active === 1) : formData?.apiListPayment[0])

  const handleCheckAllProduct = _ => {

    formData?.orderReturnDetail?.products?.map(item => {
      if(+formData?.orderReturnDetail?.checkAllProduct !== 1) {
        item.original_number = +item.quantity
        item.value_paid = (+item.price * +item.quantity).toString()
        item.return_value = parseInt(+item?.unit_price_paid * +item?.original_number, 10)
      } else {
        item.original_number = 0
        item.value_paid = 0
        item.return_value = 0
      }
    })
    pageDispatch({type: giveBackProductActions.UPDATE_ORDER_RETURN_DETAIL, payload: formData?.orderReturnDetail})
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_CHECK_ALL_PRODUCT,
      payload: +formData?.orderReturnDetail?.checkAllProduct === 1 ? 0 : 1})
  }

  const handleCheckRefundReceived = _ => {
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_CHECK_REFUND_RECEIVED,
      payload: +formData?.orderReturnDetail?.checkRefundReceived === 1 ? 0 : 1})
  }

  const handleInputChangeAmount = (value, data, {type}) => {
    let paymentMoney = 0
    if(formData?.orderReturnDetail?.products?.length > 0) {
      formData?.orderReturnDetail?.products?.map(item => {
        if(item.id === data?.id && type === 'quantity') {
          data.original_number = +value < 0 ? 0 : +value
          data.return_value = (+data.unit_price_paid * +value).toString()
          data.suggested_return_value = (+data.unit_price_paid * +value).toString()
        }
        else if(item.id === data?.id && type === 'value')
          data.return_value = +(value?.split(',')?.reduce((p, n) => p + n))
        else if(item.id === data?.id && type === 'increase') {
          data.original_number = +value + 1
          data.return_value = (+data.unit_price_paid * +(+value + 1)).toString()
          data.suggested_return_value = (+data.unit_price_paid * +(+value + 1)).toString()
        }
        else if(item.id === data?.id && type === 'decrease' && +value > 0) {
          data.original_number = +value - 1
          data.return_value = (+data.unit_price_paid * +(+value - 1)).toString()
          data.suggested_return_value = (+data.unit_price_paid * +(+value - 1)).toString()
        }
        paymentMoney += +item.return_value
        return item
      })
    } else {
      formData.orderReturnDetail.value_paid = +(value?.split(',')?.reduce((p, n) => p + n))
    }
    formData.orderReturnDetail.payment_money = paymentMoney

    pageDispatch({type: giveBackProductActions.UPDATE_ORDER_RETURN_DETAIL, payload: formData?.orderReturnDetail})

    const checkHasQuantity1 = formData?.orderReturnDetail?.products?.reduce((p, n) => {
      return p + +n.original_number
    }, 0)
    const totalQuantity = formData?.orderReturnDetail?.products?.reduce((p, n) => {
      return p + +n.quantity
    }, 0)
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_CHECK_ALL_PRODUCT, payload: (totalQuantity > checkHasQuantity1) ? 0 : 1})
    return formData?.orderReturnDetail?.products
  }

  const handleUpdatePaymentTime = value => {
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_UPDATE_PAYMENT_TIME, payload: value})
  }

  const handleMethodChange = value => {
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_UPDATE_PAYMENT_METHOD, payload: value})
  }

  const handleChangeStatusRefund = _ => {
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_UPDATE_STATUS_REFUND,
      payload: formData?.orderReturnDetail?.is_refund === 1 ? 0 : 1})
  }

  const handleChangeAmount = value => {
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_UPDATE_PAYMENT_MONEY, payload: +(value?.split(',')?.reduce((p, n) => p + n))})
  }

  const handleChangeProductName = value => {
    pageDispatch({type: giveBackProductActions.CHANGE_CREATE_UPDATE_PRODUCT_NAME, payload: value})
  }

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const submit = async _ => {
    if(debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)
      const totalPrice = formData?.orderReturnDetail?.products?.length > 0
        ? totalValueOfGoods : formData?.orderReturnDetail?.value_paid

      const data = {
        is_recieved_goods: +formData?.orderReturnDetail?.checkRefundReceived === 1 ? '1' : '0',
        total_price: totalPrice > 99999999 ? 99999999 : totalPrice,
        total_quantity: checkHasQuantity || 0,
        product_name: formData?.orderReturnDetail?.details || '',
        payment_method : +formData?.orderReturnDetail?.is_refund === 0 ? '' : paymentActive?.id,
        payment_name : +formData?.orderReturnDetail?.is_refund === 0 ? '' : paymentActive?.name,
        note : formData?.orderReturnDetail?.note || '',
        payment_money : +formData?.orderReturnDetail?.is_refund === 0 ? '' : formData?.orderReturnDetail?.payment_money || 0,
        payment_date : +formData?.orderReturnDetail?.is_refund === 0
          ? '' : (!!formData?.orderReturnDetail?.paymentTime?.formatValue ?
            convertDateTimeToApiFormat(formData?.orderReturnDetail?.paymentTime?.formatValue) :
            convertDateTimeToApiFormatv2(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0].replace('T',' '))),
        products : formData?.orderReturnDetail?.products?.map(item => {
          return {
            product_id_details: item.product_id_details,
            price: item.return_value,
            quantity: item.original_number
          }
        }) || []
      }
      const response = await sendRequestAuth(
        'post',
        `${config.API}/order/return/${idDefault}/create`,
        JSON.stringify(data)
      )
      if(response?.data?.success) {
        navigate(`/giveback-products`)
        toast.success(t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE_SUCCESS))
      } else {
        const responseFetch = await sendRequestAuth('get', `${config.API}/order/return/order-detail/${idDefault}`)
        const listOrderReturn = calculatedGivebackProduct(responseFetch?.data?.data)

        listOrderReturn.products = listOrderReturn?.products?.filter(item => {
          return (+item?.quantity - +item?.quantity_returned) !== 0
        })

        toast.error(`${listOrderReturn?.products?.length === 0 ? response?.data?.message : t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE_BY_OTHER_STAFF)}`)
        pageDispatch({type: giveBackProductActions.UPDATE_ORDER_RETURN_DETAIL, payload: listOrderReturn})
      }
    }
  }

  const searchPaymentMethod = async (keyword) => {
    const response = await sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=${keyword}&status=&per_page=100&start`)
    if(response?.data?.success) {
      pageDispatch({type: giveBackProductActions.UPDATE_LIST_PAYMENT_METHOD, payload: response?.data?.data?.filter(item => +item.status === 1 || +item.is_active === 1)})
    }
  }
  const debounceSearchChange = useCallback(debounce((keyword) => {
    searchPaymentMethod(keyword?.value || '')
  }, 500), [])
  const handleMethodKeywordChange = keyword => {
    debounceSearchChange(keyword)
  }

  const validate = [
    formData?.orderReturnDetail?.products?.length !== 0
      ? (+formData?.orderReturnDetail?.payment_money > +totalValueOfGoods) && formData?.orderReturnDetail?.is_refund === 1
      : +formData?.orderReturnDetail?.value_paid,
    !!formData?.orderReturnDetail?.products?.find(item => {
      return (+item?.original_number > +item?.quantity)
      // || (+item?.value_paid === 0) || (+item?.value_paid > (+item?.price * +item?.quantity))
    }),
    (+formData?.orderReturnDetail?.payment_money > totalValueOfGoods) && formData?.orderReturnDetail?.is_refund === 1,
    +formData?.orderReturnDetail?.payment_money === 0 && formData?.orderReturnDetail?.is_refund === 1,
    formData?.orderReturnDetail?.payment_money > 999999999999
  ].includes(true)

  return {
    formData,
    functions: {
      handleChangeNote,
      handleCheckAllProduct,
      handleInputChangeAmount,
      handleCheckRefundReceived,
      handleUpdatePaymentTime,
      handleMethodChange,
      handleChangeStatusRefund,
      handleChangeAmount,
      handleChangeProductName,
      handleMethodKeywordChange,
      submit
    },
    checkHasQuantity,
    totalValueOfGoods,
    validate,
    paymentActive
  }
}

export default useCreateGiveBackProduct;