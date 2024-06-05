import React, {useContext, useState} from 'react';
import {PosOrderContext} from "../provider/_context";
import {posOrderActions as actions, posOrderActions} from "../provider/_actions";
import {transformMoneyToSendRequest} from "../../orderSingle/utils/transform";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import useGlobalContext from "../../../containerContext/storeContext";
import toast from "../../../Component/Toast";
import ArrayUtils from "../../purchases/utils/array";
import {transformProductData} from "../../purchases/utils/transform";

const usePosPayment = () => {
  const { state, dispatch } = useContext(PosOrderContext)
  const [stateGolbal, ] = useGlobalContext()
  const [validateTitlePayment, setValidateTitlePayment] = useState(false)
  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const modalPaymentMethod = state?.rightContent?.modal?.selectPayment
  const modalResponseSubmit = state?.rightContent?.modal?.responseSubmit
  const modalConfirmOrder = state?.rightContent?.modal?.confirmOrder
  const pageActive = state?.orders?.active
  const notes = state?.orders?.list?.find(item => +item.id === +pageActive)?.note
  const categoryId = state.products.filter?.groupProduct?.id || ''

  // ==========  ========== Payment ========== ==========
  const paymentMethod = state?.payment
  const paymentMethodOrigin = paymentMethod?.method
  const paymentMethodOriginList = paymentMethodOrigin?.list
  const paymentMethodOriginValue = paymentMethodOrigin?.value
  const paymentMethodActive = paymentMethodOrigin?.listActive
  const paymentMethodSelect = state?.payment?.method?.listActive?.find(item => +item.id === +pageActive)?.data || []
  const paymentActive = paymentMethodActive?.find(item => +item.id === +state?.orders?.active)?.data || []

  const orderCustomer = state.orders.customer
  const activeOrderId = state.orders.active
  const activeOrderCustomer = state.orders.customer?.length > 0 ? state.orders.customer.find(item => item.id == activeOrderId) : {}
  const handleTabChange = type => {
    let newOrderCustomer = orderCustomer
    newOrderCustomer.map((item, index) => {
      if (+item.id === +activeOrderId) {
        newOrderCustomer[index] = { id: activeOrderId, data: {}, tab: 'select' }
        newOrderCustomer[index].tab = type
      }
    })

    dispatch({
      type: posOrderActions.ORDER_CUSTOMER_VALUE_UPDATE,
      payload: newOrderCustomer
    })
  }

  const handleToggleModalPayment = _ => {
    if(!modalPaymentMethod?.open) {
      paymentMethodActive?.map(item => {
        if(+item.id === +pageActive) {
          item.data = paymentActive?.map(it => {
            it.price_0 = it.price
            return it
          })
        }
        return item
      })
      dispatch({
        type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
        payload: paymentMethodActive
      })
    }
    dispatch({
      type: posOrderActions.RIGHT_CONTENT_MODAL_SELECT_PAYMENT,
      payload: !modalPaymentMethod?.open
    })
  }

  const handleSelectPayment = payment => {
    payment.price = 0
    const result = !!paymentActive?.find(item => +item?.value === +payment?.data?.id)
                      ? paymentActive?.length > 1
                          ? paymentActive.filter(item => {
                              if(+item?.value === +payment?.data?.id) item.price = 0
                              return +item?.value !== +payment?.data?.id
                            })
                          : paymentActive
                      : paymentActive?.length < 4
                          ? [...paymentActive, payment]
                          : paymentActive
    if((result?.length === 1 && (result[0].price === 0|| !!!result[0]?.price))
      || result?.length > 1 && result?.filter(item => +item.price === 0 || !!!item.price).length === result?.length )
      result[0].price = guestMustPay

    // if(result?.length > 1) {
    //   result.map(item => {
    //     item.price = 0
    //     return item
    //   })
    // }
    paymentMethodActive?.map(item => {
      if(+item.id === +state?.orders?.active) item.data = result
    })
    dispatch({
      type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
      payload: paymentMethodActive
    })

    setValidateTitlePayment(result?.length === 4)
  }

  const handleFetchPayment = _ => {
    if(paymentMethodActive?.length > 0) {
      paymentMethodActive?.map(item => {
        if(+item.id === +pageActive) {
          item.data[0].price = guestMustPay
        }
      })
      dispatch({
        type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
        payload: paymentMethodActive
      })
    }
  }

  const handleRemovePayment = payment => {
    const result = !!paymentActive?.find(item => {
      if(+item?.value === +payment?.data?.id) {
        item.price = 0
        return item
      }
    }) && paymentActive?.filter(item => +item?.value !== +payment?.data?.id)

    if((result?.length === 1 && (result[0].price === 0|| !!!result[0]?.price))
      || result?.length > 1 && result?.filter(item => +item.price === 0 || !!!item.price).length === result?.length )
      result[0].price = guestMustPay

    paymentMethodActive?.map(item => {
      if(+item.id === +state?.orders?.active) item.data = result
    })
    dispatch({
      type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
      payload: paymentMethodActive
    })
  }

  const handleChangePrice = (row, value) => {
    paymentActive[0].price = !!!paymentActive[0]?.price ? guestMustPay : paymentActive[0]?.price
    const payment = paymentActive?.find(item => +item?.value === +row?.value)
    payment.price = !!payment ? transformMoneyToSendRequest(value) : 0
    dispatch({
      type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
      payload: paymentMethodActive
    })
  }

  const handleApprovePayment = list => {
    dispatch({
      type: posOrderActions.RIGHT_CONTENT_MODAL_SELECT_PAYMENT,
      payload: !modalPaymentMethod?.open
    })

    paymentMethodActive?.map(item => {
      if(+item.id === +pageActive) {
        item.data = list?.map(it => {
          it.price = !!!it.price_0 ? it.price : it.price_0
          return it
        })
      }
      return item
    })
    dispatch({
      type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
      payload: paymentMethodActive
    })
  }

  const handleDiscountChange = discount => {
    const discountValue = transformMoneyToSendRequest(discount)
    let newListOrder = state?.orders?.list
    let discountPrice = 0

    newListOrder.map((order, index) => {
      if (+order?.id === +pageActive) {
        const provisional = newListOrder[index].product?.reduce((p, n, i) => {
          const itemPrice =
            Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) - (
              products[i]?.discountType === '%'
                ?  Math.floor(Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) *  Number(products[i]?.discount || 0) / 100)
                :  Number(products[i]?.discount || 0)
            )
          return p + itemPrice
        }, 0)
        newListOrder[index].discount.value =
          newListOrder[index].discount.type === '%'
            ? discountValue > 100
              ? 100 : discountValue
            : discountValue > provisional
                ? provisional
                : discountValue
        newListOrder[index].discount.trigger = !newListOrder[index].discount.trigger
        const discountTer = state?.orders?.list?.find(item => +item.id === +pageActive)?.discount
        const discountInOrder = Math.floor(discountTer?.type === '%' ? provisional * discountTer?.value / 100  : discountTer?.value || 0)
        discountPrice = provisional - discountInOrder
      }
      return order
    })
    dispatch({
      type: posOrderActions.ORDER_PRODUCT_UPDATE,
      payload: newListOrder
    })
    if(paymentMethodActive?.length > 0) {
      paymentMethodActive?.map(item => {
        if(+item.id === +pageActive) item.data[0].price = discountPrice
      })
      dispatch({
        type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
        payload: paymentMethodActive
      })
    }
  }

  const handleChangeNote = value => {
    let newListOrder = state?.orders?.list
    newListOrder.map((order, index) => {
      if (+order?.id === +pageActive)
        // newListOrder[index].discount.value = discountValue
        newListOrder[index].note = value
    })
    dispatch({
      type: posOrderActions.ORDER_PRODUCT_UPDATE,
      payload: newListOrder
    })
  }

  const handleDiscountTypeChange = type => {
    let newListOrder = state?.orders?.list
    newListOrder.map((order, index) => {
      if (+order?.id === +pageActive)
        newListOrder[index].discount.value = 0
        newListOrder[index].discount.type = type
        newListOrder[index].discount.trigger = !newListOrder[index].discount.trigger
    })
    dispatch({
      type: posOrderActions.ORDER_PRODUCT_UPDATE,
      payload: newListOrder
    })
  }
  // ==========  ========== End Payment ========== ==========


  // ==========  ========== Customer ========== ==========
  const customerList = state?.customerInfo?.list
  const customerActive = state?.orders?.customer?.find(item => +item.id === +pageActive && item.tab === 'select')

  // ==========  ========== End Customer ========== ==========


  // ========= ========= Calculate ========= =========
  const products = state?.orders?.list?.find(item => +item.id === +pageActive)?.product || []

  const provisional = products?.reduce((p, n, i) => {
    const itemPrice =
      Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) - (
        products[i]?.discountType === '%'
          ?  Math.floor(Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) *  Number(products[i]?.discount || 0) / 100)
          :  Number(products[i]?.discount || 0)
      )
    return p + itemPrice
  }, 0)

  const discountInProduct = products?.reduce((p, n, i) => {
    const itemPrice = products[i]?.discountType === '%'
                        ?  Math.floor(Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) *  Number(products[i]?.discount || 0) / 100)
                        :  Number(products[i]?.discount || 0)
    return p + itemPrice
  }, 0)

  const mnCus = paymentActive?.reduce((p, n, i) => {
    const itemPrice = Number( paymentActive[i]?.price || 0,)
    return p + itemPrice
  }, 0)


  const discount = state?.orders?.list?.find(item => +item.id === +pageActive)?.discount
  const discountInOrder = Math.floor(discount?.type === '%'
                                      ? provisional * discount?.value / 100
                                      : discount?.value || 0)
  const guestMustPay = provisional - discountInOrder
  const moneyCustomer = (mnCus === 0 && !!!paymentActive?.find(item => !!item.price || item.price === 0)) ? guestMustPay : mnCus
  // ========= ========= End Calculate ========= =========

  const formCreate = {
    id_sender: state?.orders?.addressOrder?.value || '',
    customer_id: customerActive?.data?.id || '',
    warehouse_id: state?.orders?.warehouse?.find(item => +item.id === +pageActive)?.value || '',
    item_details: products?.map(item => {
      return {
        product_id: item?.data?.product_id || '',
        product_id_details: item?.data?.id || '',
        product_model: item?.data?.sku || "",
        product_name: item?.data?.product_name || '',
        price: +item?.price,
        total_price: item?.discountType === 'đ'
          ? ((+item?.price || 0) - item?.discount || 0) * (item?.quantity || 1)
          : ((+item?.price || 0) - ((+item?.price || 0) * (+item?.discount || 0) / 100)) * (item?.quantity || 1),
        discount: item?.discountType === 'đ'
          ? item?.discount || 0 * (item?.quantity || 1)
          : ((+item?.price || 0) * (+item?.discount || 0) / 100) * (item?.quantity || 1),
        discount_type: item?.discountType === 'đ' ? 2 : 1,
        discount_value: item?.discount || 0,
        quantity: item?.quantity || 1,
      }
    }),
    type_price: '1',
    order_discount_type: discount?.type === 'đ' ? 2 : 1,
    order_discount_value: discountInOrder || 0,
    order_discount: discount?.value || 0,
    total_discount: discountInProduct + discountInOrder || 0,
    total_amount:  guestMustPay || 0,
    customer_pay: moneyCustomer || 0,
    payments: paymentActive?.map(item => {
      return {
        payment_method_id: item?.value || '',
        payment_money:  item?.price || 0
        // payment_money: (paymentActive?.length === 1 && !!!item?.price)
        //   ? guestMustPay
        //   : item?.price || 0
      }
    }),
    order_note: notes || ''
  }

  const orderHasSent = modalResponseSubmit?.sent
  const validateForm = formCreate => {
    // VALIDATE
    if(formCreate?.item_details?.length === 0) {
      dispatch({
        type: posOrderActions.SET_CREATED_ERROR_SUBMIT,
        payload: true
      })
      return true
    }
    if((formCreate?.customer_pay < formCreate?.total_amount) && (+formCreate?.total_amount !== 0)) {
      toast.error('Số tiền thanh toán của khách hàng chưa đủ')
      return true
    }

    if(!!customerActive?.data && !!!customerActive?.data?.id) {
      dispatch({
        type: posOrderActions.RIGHT_CONTENT_MODAL_RESPONSE_HAS_SUBMIT,
        payload: !!orderHasSent?.find(item => +item === +pageActive)
          ? orderHasSent?.filter(item => +item !== +pageActive)
          : [...orderHasSent, pageActive]
      })
      toast.error('Vui lòng chọn khách hàng trước khi hoàn tất thanh toán')
      return true
    }
    if(notes?.length > 255) return true
    if(guestMustPay < 0) return true
    // END VALIDATE
    return false
  }

  const submit = async formCreate => {
    dispatch({
      type: posOrderActions.SET_LOADING,
      payload: true
    })
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/create-pos`, formCreate
    )
    if(response?.data?.success) {
      dispatch({
        type: posOrderActions.RIGHT_CONTENT_MODAL_RESPONSE_SUBMIT,
        payload: true
      })
      dispatch({
        type: posOrderActions.SET_CREATED_ORDER_ID,
        payload: response?.data?.meta?.insert_id || ''
      })
    } else {
      toast.error(response?.data?.errors?.details[0]?.message)
      response?.data?.errors?.details?.map(item => {
        if(+item.code === 3027) fetchLoadPage(categoryId)
      })
    }
    if(formCreate?.item_details?.length === 0) {
      toast.error('Vui lòng thêm sản phẩm vào đơn hàng trước khi hoàn tất thanh toán')
    }
    dispatch({
      type: posOrderActions.SET_LOADING,
      payload: false
    })
  }

  const handleSubmit =  formCreate => {
    if(debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)
      if((guestMustPay === 0 && formCreate?.item_details?.length > 0)
          && !(!!customerActive?.data && !!!customerActive?.data?.id)) {
        dispatch({
          type: posOrderActions.RIGHT_CONTENT_MODAL_OPEN_CONFIRM_ORDER,
          payload: true
        })
      } else {
        if(!validateForm(formCreate)) {
          submit(formCreate)
        }
      }
    }
  }

  const handleToggleModalResponsePayment = type => {
    dispatch({type: posOrderActions.RIGHT_CONTENT_MODAL_RESPONSE_SUBMIT, payload: !modalResponseSubmit})
    if(type === 'close') {
      const orderList = state?.orders?.list
      if(orderList?.length > 1) {
        // Hiện tại API trả về tối đa 100 records
        handleFetchProduct(categoryId, { perPage: 100, start: 0 })
      } else {
        orderList.map(item => {
          orderList[0].changed = false
          orderList[0].product = []
          orderList[0].discount = {type: '%', value: 0, trigger: !orderList[0].discount.trigger}
        })
        dispatch({
          type: posOrderActions.ORDER_PRODUCT_UPDATE,
          payload: orderList
        })

        dispatch({
          type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
          payload: paymentMethodActive?.map(item => {
            item.price = 0
            item.data?.map(it => {
              it.price = 0
              it.price_0 = 0
              return it
            })
            return item
          })
        })
      }
      const newListCustomer = state?.orders?.customer?.map(item => {
        if(+item.id === +pageActive) {
          item.data = {}
          item.tab = 'guest'
        }
        return item
      })
      dispatch({
        type: posOrderActions.ORDER_CUSTOMER_VALUE_UPDATE,
        payload: newListCustomer
      })
    }
  }

  const fetchLoadPage = async (categoryId = '', opt = { perPage: 100, start: 0 }) => {
    const warehouseActive = state.orders?.warehouse?.length > 0 ? state.orders?.warehouse.find(item => +item.id === pageActive) : {}
    dispatch({
      type: actions.SET_LOADING,
      payload: true
    })
    const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${categoryId || ''}&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=${opt.perPage}&start=${opt.start}`,
    )
    const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)
    const quickProductResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${categoryId || ''}&is_inventory=1&product_id_details=&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=20&start=0`,
    )
    const formatQuickProductList = ArrayUtils.getQualifiedArray(quickProductResponse.data?.data).map(transformProductData)

    const orderList = state?.orders?.list
    dispatch({
      type: posOrderActions.ORDER_PRODUCT_UPDATE,
      payload: orderList.map(item => {
        if(+item.id === +pageActive) {
          item?.product?.map(it => {
            const fmPro = formatProductList.find(pr => +pr?.data?.id === +it?.data?.id)
            if(!!fmPro) {
              it.data.warehouse_quantity = fmPro.data.warehouse_quantity
            }
            return it
          })
        }
        return item
      })
    })
    dispatch({
      type: actions.QUICK_PRODUCT_UPDATE,
      payload: {
        list: formatQuickProductList,
        meta: quickProductResponse.data?.meta
      }
    })

    dispatch({
      type: actions.SET_LOADING,
      payload: false
    })

    dispatch({
      type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
      payload: {
        list: formatProductList,
        loading: false,
        page: 0,
        keyword: ''
      },
    })
  }

  const handleFetchProduct = async (categoryId = '', opt = { perPage: 100, start: 0 }) => {
    const warehouseActive = state.orders?.warehouse?.length > 0 ? state.orders?.warehouse.find(item => +item.id === pageActive) : {}
    dispatch({
      type: actions.SET_LOADING,
      payload: true
    })
    const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${categoryId || ''}&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=${opt.perPage}&start=${opt.start}`,
    )
    const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)

    const quickProductResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${categoryId || ''}&is_inventory=1&product_id_details=&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=20&start=0`,
    )
    const formatQuickProductList = ArrayUtils.getQualifiedArray(quickProductResponse.data?.data).map(transformProductData)

    const orderList = state?.orders?.list
    let pageNew = 2
    let newList = orderList.map((item, index) => {
      if(+item.id === +pageActive) {
        item.product = []
        pageNew = index === orderList?.length - 1
          ? orderList[index - 1].id
          : orderList[index + 1].id
      }
      return item
    }).filter(item => +item.id !== +pageActive)
    dispatch({
      type: posOrderActions.UPDATE_TAB_ORDERS,
      payload: pageNew
    })
    dispatch({
      type: posOrderActions.ORDER_PRODUCT_UPDATE,
      payload: newList.map(item => {
        if(+item.id === +pageNew) {
          item?.product?.map(it => {
            const fmPro = formatProductList.find(pr => +pr?.data?.id === +it?.data?.id)
            if(!!fmPro) {
              it.data.warehouse_quantity = fmPro.data.warehouse_quantity
            }
            return it
          })
        }
        return item
      })
    })

    dispatch({
      type: actions.QUICK_PRODUCT_UPDATE,
      payload: {
        list: formatQuickProductList,
        meta: quickProductResponse.data?.meta
      }
    })

    dispatch({
      type: actions.SET_LOADING,
      payload: false
    })

    dispatch({
      type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
      payload: {
        list: formatProductList,
        loading: false,
        page: 0,
        keyword: ''
      },
    })
  }

  const getTemplatePrint = content => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>${content}</body>
    </html>
  `

  const handlePrintOrder = async type => {
    // dispatch({type: posOrderActions.RIGHT_CONTENT_MODAL_RESPONSE_SUBMIT, payload: !modalResponseSubmit})
    dispatch({ type: posOrderActions.SET_LOADING, payload: true})

    if(type === 'a4') {
      const content = document.getElementById('pos-order-detail-print').innerHTML

      const frame = document.createElement('iframe')
      frame.name = 'frame'
      frame.style.position = 'absolute'
      frame.style.top = '-1000000px'

      document.body.appendChild(frame)

      const frameDoc = frame.contentWindow
        ? frame.contentWindow
        : frame.contentDocument.document
          ? frame.contentDocument.document
          : frame.contentDocument
      frameDoc.document.open()
      frameDoc.document.write(content)
      frameDoc.document.close()

      window.frames.frame.focus()
      setTimeout(function () {
        window.frames.frame.print()
        document.body.removeChild(frame)

      }, 100)
      dispatch({ type: posOrderActions.SET_LOADING, payload: false})
    } else {
      const response = await sendRequestAuth(
        'post',
        `${config.API}/order/print-upos`,
        JSON.stringify({
          order_id: [state?.orders?.createdOrderID.toString()],
          print_size: type,
          print_type: 'order_bill',
        }),
      )
      if (response?.data?.success) {
        const content = getTemplatePrint(response?.data?.data[0] || '')

        const frame = document.createElement('iframe')
        frame.name = 'frame'
        frame.style.position = 'absolute'
        frame.style.top = '-1000000px'

        document.body.appendChild(frame)

        const frameDoc = frame.contentWindow
          ? frame.contentWindow
          : frame.contentDocument.document
            ? frame.contentDocument.document
            : frame.contentDocument
        frameDoc.document.open()
        frameDoc.document.write(content)
        frameDoc.document.close()

        window.frames.frame.focus()
        setTimeout(function () {
          window.frames.frame.print()
          document.body.removeChild(frame)

        }, 100)
        dispatch({ type: posOrderActions.SET_LOADING, payload: false})
        return true
      } else {
        toast.error('Không tìm thấy thông tin đơn hàng!')
        dispatch({ type: posOrderActions.SET_LOADING, payload: false})
      }
    }
  }

  // ============ ============ PRICE TYPE ============ ============
  const priceType = state?.orders?.list?.find(item => +item.id === +pageActive)?.priceType
  const handleChangePriceType = type => {
    const orderList =  state?.orders?.list?.map(item => {
                        if(+item.id === +pageActive) {
                          products?.map(product => {
                            product.price = type === 1 ? product?.data?.price : product?.data?.wholesale_price
                            product.triggerDefault = !product.triggerDefault
                          })
                          item.priceType = type

                        }
                        return item
                      })
    dispatch({ type: posOrderActions.ORDER_PRODUCT_UPDATE, payload: orderList })
  }
  // ============ ============ END PRICE TYPE ============ ============

  const handleCloseConfirmOrder = _ => dispatch({
                                          type: posOrderActions.RIGHT_CONTENT_MODAL_OPEN_CONFIRM_ORDER,
                                          payload: false
                                        })
  const handleApproveConfirmOrder = _ => {
    dispatch({
      type: posOrderActions.RIGHT_CONTENT_MODAL_OPEN_CONFIRM_ORDER,
      payload: false
    })
    submit(formCreate)
  }

  return {
    products,
    activeOrderCustomer,
    formCreate,
    priceType,
    pageActive,
    notes,
    modals: {
      paymentMethod: modalPaymentMethod,
      responseSubmit: modalResponseSubmit,
      confirmOrder: modalConfirmOrder
    },
    paymentMethodOrigin: {
      list: paymentMethodOriginList,
      value: paymentMethodOriginValue,
      select: paymentMethodSelect,
      active: paymentActive,
      validateTitlePayment
    },
    customer: {
      list: customerList
    },
    calc: {
      provisional,
      moneyCustomer,
      discount,
      guestMustPay
    },
    methods: {
      handleTabChange,
      handleToggleModalPayment,
      handleSelectPayment,
      handleFetchPayment,
      handleRemovePayment,
      handleDiscountChange,
      handleDiscountTypeChange,
      handleChangePrice,
      handleApprovePayment,
      handleChangeNote,
      handleToggleModalResponsePayment,
      handlePrintOrder,
      handleChangePriceType,
      handleCloseConfirmOrder,
      handleApproveConfirmOrder,

      submit: handleSubmit
    },
    printOrder: {
      shopInfo: stateGolbal?.shopInfo,
      customer: customerActive,
      createdOrderID: state?.orders?.createdOrderID
    }
  }
}

export default usePosPayment