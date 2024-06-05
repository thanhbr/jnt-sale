import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useContext, useState} from 'react'
import {orderSingleAction} from '../provider/_actions'
import {OrderSingleContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformCustomerData,
  transformPaymentMethodData,
  transformProductData,
  transformShippingPointData,
  transformSourceData,
  transformWarehouseData,
  transformMoneyToSendRequest,
} from '../utils/transform'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import useOrderSingleShippingInfo from './useOrderSingleShippingInfo'
import useOrderSingleCustomerInfo from './useOrderSingleCustomerInfo'
import useOrderSingleProductInfo from './useOrderSingleProductInfo'
import toast from "../../../Component/Toast";
import useGlobalContext from "../../../containerContext/storeContext";
import {replaceAllCustom} from "../../../util/functionUtil";

const useOrderSingle = () => {
  const {state, dispatch} = useContext(OrderSingleContext)
  const [GlobalState, ] = useGlobalContext()
  const shippingHook = useOrderSingleShippingInfo()
  const customerHook = useOrderSingleCustomerInfo()
  const productHook = useOrderSingleProductInfo()
  const {customerInfo, productInfo, shippingInfo, extraInfo, paymentMethod} =
    state.form
  const activeShippingPartner = shippingInfo.shippingPartner.list.find(
    item => item.id == shippingInfo.shippingPartner.id,
  )
  const isEnoughCustomerInfo = ![
    !!customerInfo?.phone?.value?.trim(),
    !!customerInfo?.fullName?.value?.trim(),
    !!customerInfo?.address?.value?.trim(),
    !!customerInfo?.address?.province?.value?.value,
    !!customerInfo?.address?.district?.value?.value,
    !!customerInfo?.address?.ward?.value?.value,
  ].includes(false)
  const isEnoughProductInfo = productInfo.inventory
    ? (productInfo?.withInventoryConfig?.search?.selected?.length > 0 && !!!productInfo?.withInventoryConfig?.search?.selected?.find(item => !!!item?.quantity))
    : [
        productInfo.inventoryConfig.type === 'manual' &&
          !!productInfo.inventoryConfig.manual.value.trim(),
        productInfo.inventoryConfig.type === 'auto' &&
          ArrayUtils.getQualifiedArray(
            productInfo.inventoryConfig.auto.selected,
          ).length > 0 && !!!productInfo?.inventoryConfig?.auto?.selected?.find(item => +item.quantity === 0),
      ].includes(true)
  const isEnoughShippingInfo = ![
    !shippingInfo?.isStorePickUp ? +shippingInfo.weight <= 70 && +shippingInfo.weight >= 0.01 : true,
    // !!shippingInfo.weight,
    // !!shippingInfo.shippingPartner,
    state?.form?.shippingInfo?.deliveryNote?.content?.length <= 255 || (!!!state?.form?.shippingInfo?.deliveryNote?.content),
    state?.form?.extraInfo?.note?.value?.length <= 255 || (!!!state?.form?.extraInfo?.note?.value),
  ].includes(false)

  const validateVTP = +activeShippingPartner?.id === 4 && transformMoneyToSendRequest(state.form.shippingInfo.collectMoney) < 5000
  const canSaveDraft = isEnoughCustomerInfo && isEnoughProductInfo && !validateVTP
  const canSaveOrder = isEnoughCustomerInfo && isEnoughProductInfo && isEnoughShippingInfo && !validateVTP

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
  const collectMoney = shippingInfo?.collectMoney?.length > 3 ? replaceAllCustom(shippingInfo?.collectMoney, ',', '') : shippingInfo?.collectMoney

  const tmpTotalDiscount = state?.form?.productInfo?.withInventoryConfig?.discount?.value?.length > 3 ? +replaceAllCustom(state?.form?.productInfo?.withInventoryConfig?.discount?.value, ',','') : +state?.form?.productInfo?.withInventoryConfig?.discount?.value

  const orderDiscount = (state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%' ?
    ((+tmpPrice - +tmpDiscount) * +tmpTotalDiscount / 100) :
     +tmpTotalDiscount) || 0

  const paymentMoney = ['before', 'after'].includes(paymentMethod.type) && !!paymentMethod?.method?.value?.data ? transformMoneyToSendRequest(paymentMethod?.money?.value || 0) : ''

  const submitQueries = {
    // account login id
    id_sender: extraInfo?.shippingPoint?.value?.value || null,
    // customer info
    customers: {
      customer_id: customerInfo.phone.detail?.id || '',
      customer_mobile: customerInfo.phone.value || '',
      customer_name: customerInfo.fullName.value || '',
      customer_address: customerInfo.address.value || '',
      city_id: transformMoneyToSendRequest(
        customerInfo.address.province.value?.value || 0,
      ),
      district_id: transformMoneyToSendRequest(
        customerInfo.address.district.value?.value || 0,
      ),
      ward_id: transformMoneyToSendRequest(
        customerInfo.address.ward.value?.value || 0,
      ),
    },
    // product info
    details:
      !!productInfo?.inventory || productInfo?.inventoryConfig?.type === 'auto'
        ? ''
        : productInfo?.inventoryConfig?.manual?.value || '',
    type_price: !!productInfo?.inventory
      ? productInfo.withInventoryConfig.priceType.value?.value || ''
      : '',
    item_details: productInfo.inventory
      ? ArrayUtils.getQualifiedArray(
          productInfo?.withInventoryConfig?.search?.selected,
        ).map(item => ({
          product_id: transformMoneyToSendRequest(item?.data?.product_id || 0),
          product_id_details: transformMoneyToSendRequest(item?.data?.id || 0),
          product_model: item?.data?.sku,
          product_name: item?.data?.product_name,
          price: transformMoneyToSendRequest(item?.price || 0),
          total_price: +item?.discount > 0 ?
            transformMoneyToSendRequest(item?.discountType === 'đ'
              ? Number(+item?.price * item?.quantity - +item?.discount || 0)
              : (Number(+item?.price * +item?.quantity) - ((Number(item?.discount) * Number(item?.price) * +item?.quantity) / 100)))
            : Number(+item?.price * item?.quantity)
        ,
          discount:
            item?.discountType === 'đ'
              ? Number(item?.discount || 0)
              : (Number(item?.discount || 0) * Number(item?.price || 0) * +item?.quantity) / 100,
          discount_type: item?.discountType === 'đ' ? 1 : 2,
          discount_value: Number(item?.discount || 0),
          quantity: item?.quantity || 0,
        }))
      : productInfo?.inventoryConfig?.type === 'manual'
      ? []
      : ArrayUtils.getQualifiedArray(
          productInfo?.inventoryConfig?.auto?.selected,
        ).map(item => ({
          product_id: transformMoneyToSendRequest(item?.data?.product_id || 0),
          product_id_details: transformMoneyToSendRequest(item?.data?.id || 0),
          product_model: item?.data?.sku,
          product_name: item?.data?.product_name,
          price: transformMoneyToSendRequest(item?.data?.price || 0),
          total_price: transformMoneyToSendRequest(item?.data?.price || 0),
          discount: 0,
          quantity: item?.quantity || 0,
        })),
    // shipping info
    shipping: !shippingInfo.isStorePickUp
      ? {
          cod: collectMoney || 0,
          weight: transformMoneyToSendRequest(shippingInfo.weight || 0),
          width: transformMoneyToSendRequest(shippingInfo.size.width || 0),
          height: transformMoneyToSendRequest(shippingInfo.size.height || 0),
          lengh: transformMoneyToSendRequest(shippingInfo.size.longs || 0),
          note: shippingInfo.deliveryNote.content || '',
        }
      : '',
    ship_fee_custom: extraInfo?.shipFeeCustom?.value || '',
    shipping_partner:
      !shippingInfo.isStorePickUp && !!activeShippingPartner
        ? {
            partner_ship: shippingInfo.shippingPartner.id,
            serviceID:
              shippingInfo.shippingPartner?.service?.length > 0
                ? shippingInfo.shippingPartner.service.find(
                    item => item.partnerId == shippingInfo.shippingPartner.id,
                  )?.serviceId || ''
                : '',
            sub_service: shippingInfo.shippingPartner.subService?.subServiceId,
            is_insurrance: +shippingInfo.shippingPartner.id == 2 ? 1 : (activeShippingPartner.config.cargoInsurrance.active ? 1 : 0),
            insurrance_value: transformMoneyToSendRequest(
              activeShippingPartner.config.cargoInsurrance.value.replaceAll(
                ',',
                '',
              ) || 0,
            ),
            payer: !!activeShippingPartner.config.payer
              ? activeShippingPartner.config.payer.find(
                  item => item.checked == true,
                )?.value
              : '',
            recipient_view: !!activeShippingPartner.config.request
              ? activeShippingPartner.config.request.find(
                  item => item.checked == true,
                )?.value
              : '',
            request_goods: !!activeShippingPartner.config.request_goods
              ? activeShippingPartner.config.request_goods.find(
                  item => item.checked == true,
                )?.value
              : '',
            pick_date: activeShippingPartner.config.pick_date || '',
            pick_shift: !!activeShippingPartner.config.pick_shift
              ? activeShippingPartner.config.pick_shift.find(
                  item => item.checked == true,
                )?.value
              : '',
            transport: !!activeShippingPartner.config.transport
              ? activeShippingPartner.config.transport.find(
                  item => item.checked == true,
                )?.value
              : '',
            partsign: activeShippingPartner.config.partsign ? 1 : 0,
            number_pack: activeShippingPartner.config?.packageQuantity || '',
          }
        : '',
    // extra info
    warehouse_id: productInfo.inventory
      ? productInfo.withInventoryConfig.warehouse.value?.value || ''
      : '',
    order_origin_id: extraInfo.source.value?.value || '',
    order_code_of_shop: extraInfo.uniqueOrderNumber.value || '',
    order_note: extraInfo.note.value || '',
    // payment method
    payment: {
      payment_method_id:
        ['before', 'after'].includes(paymentMethod.type) &&
        !!paymentMethod?.method?.value?.data
          ? paymentMethod?.method?.value?.data?.id : '',
      payment_type: ['before', 'cod', 'after'].findIndex(
        item => item === paymentMethod?.type,
      ),
      payment_date: paymentMethod.dateTime.formatValue
        ? convertDateTimeToApiFormat(paymentMethod.dateTime.formatValue)
        : '',
      payment_money: paymentMoney
    },
    total_amount: productInfo.inventory ? tmpPrice - tmpDiscount - orderDiscount : +collectMoney + +paymentMoney,
    total_discount: tmpDiscount + orderDiscount,
    order_discount_type: state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%' ? 2: 1,
    order_discount_value: state?.form?.productInfo?.withInventoryConfig?.discount?.value || 0,
    order_discount: state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%'
                    ? orderDiscount : transformMoneyToSendRequest(state?.form?.productInfo?.withInventoryConfig?.discount?.value),
    // submit
    is_delivery: 0,
    is_draft: 0,
  }

  const handleFetchOrigin = async () => {
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/customer/customer-search?keyword=&group=&city_id=&district_id=&ward_id=&status=1&per_page=10&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/setting/addresses?keyword=&status=&per_page=100&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/order/origins?keyword=&status=1&per_page=10&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/payment/payment-method?status=1keyword=&per_page=50&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/warehouse/warehouses?keyword=&per_page=10&start=0`,
      ),
    ])

    if (
      !!response[0]?.data?.success &&
      !!response[1]?.data?.success &&
      !!response[2]?.data?.success &&
      !!response[3]?.data?.success &&
      !!response[4]?.data?.success
    ) {
      const formatPhoneList = ArrayUtils.getQualifiedArray(
        response[0]?.data?.data,
      ).map(transformCustomerData)

      let shippingPointValueData = null
      const formatShippingPointList = ArrayUtils.getQualifiedArray(
        response[1]?.data?.data?.filter(item => +item?.status === 1),
      ).map(item => {
        if (item?.is_default === '1' && !shippingPointValueData)
          shippingPointValueData = transformShippingPointData(item)
        return transformShippingPointData(item)
      })
      // if(!!window.localStorage.getItem('shipping_order_active')) {
      //   const shippingOrderArray = JSON.parse(window.localStorage.getItem('shipping_order_active'))
      //   if(Array.isArray(shippingOrderArray)) {
      //     shippingPointValueData = shippingOrderArray?.find(item => {
      //       if(item?.user_id === GlobalState?.user?.user_id) return item.data
      //     })?.data
      //   } else {
      //     window.localStorage.removeItem('shipping_order_active')
      //   }
      // }

      let sourceValueData = null
      const formatSourceList = ArrayUtils.getQualifiedArray(
        response[2]?.data?.data,
      ).map(item => {
        if (item?.is_default === '1' && !sourceValueData)
          sourceValueData = transformSourceData(item)
        return transformSourceData(item)
      })
      if(!!window.localStorage.getItem('origin_order_active')) {
        const originOrderArray = JSON.parse(window.localStorage.getItem('origin_order_active'))
        if(Array.isArray(originOrderArray)) {
          sourceValueData = originOrderArray?.find(item => {
            if(item?.user_id === GlobalState?.user?.user_id) return item.data
          })?.data
          sourceValueData = !!response[2]?.data?.data?.find(item => +item?.id === +sourceValueData?.data?.id) ? sourceValueData : ''
        } else {
          window.localStorage.removeItem('origin_order_active')
        }
      }
      if(!!state?.form?.extraInfo?.source?.value) sourceValueData = state?.form?.extraInfo?.source?.value
      let paymentMethodValueData = null
      const formatPaymentMethodList = ArrayUtils.getQualifiedArray(
        response[3]?.data?.data,
      ).map(item => {
        if (item?.is_active === '1' && !paymentMethodValueData)
          paymentMethodValueData = transformPaymentMethodData(item)
        return transformPaymentMethodData(item)
      })

      let WarehouseValueData = null
      const formatWarehouseList = ArrayUtils.getQualifiedArray(
        response[4]?.data?.data,
      ).map(item => {
        if (item?.is_main === '1' && !WarehouseValueData)
          WarehouseValueData = transformWarehouseData(item)
        return transformWarehouseData(item)
      })

      const productResponse = await Promise.all([
        sendRequestAuth(
          'get',
          `${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=&per_page=10&start=0`,
        ),
        sendRequestAuth(
          'get',
          `${
            config.API
          }/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${
            formatWarehouseList[0]?.value || ''
          }&per_page=10&start=0`,
        ),
      ])
      const formatProductList = {
        inventory: ArrayUtils.getQualifiedArray(
          productResponse[0]?.data?.data,
        ).map(transformProductData),
        withInventory: ArrayUtils.getQualifiedArray(
          productResponse[1]?.data?.data,
        ).map(transformProductData),
      }

      dispatch({
        type: orderSingleAction.ORIGIN,
        payload: {
          customerInfo: {
            fullName: {
              list: formatPhoneList,
              total: response[0]?.data?.meta?.total || 0,
            },
            phone: {
              list: formatPhoneList,
              total: response[0]?.data?.meta?.total || 0,
            },
          },
          productInfo: {
            inventoryConfig: {
              auto: {
                list: formatProductList.inventory,
                total: productResponse[0]?.data?.meta?.total || 0,
              },
            },
            withInventoryConfig: {
              search: {
                list: formatProductList.withInventory,
                total: productResponse[1]?.data?.meta?.total || 0,
              },
              warehouse: {
                list: formatWarehouseList,
                total: response[4]?.data?.meta?.total || 0,
                value: WarehouseValueData || formatWarehouseList[0],
              },
            },
          },
          extraInfo: {
            shippingPoint: {
              list: formatShippingPointList,
              total: response[1]?.data?.meta?.total || 0,
              value: shippingPointValueData || formatShippingPointList[0],
            },
            source: {
              list: formatSourceList,
              total: response[2]?.data?.meta?.total || 0,
              value: sourceValueData || formatSourceList[0],
            },
          },
          paymentMethod: {
            method: {
              list: formatPaymentMethodList,
              total: response[3]?.data?.meta?.total || 0,
              value: paymentMethodValueData || formatPaymentMethodList[0],
            },
          },
        },
      })
    }
  }

  const resetFormData = () => {
    dispatch({type: 'RESET_FORM_DEFAULT'})
    dispatch({type: 'RESET_VALIDATE_FORM'})
    dispatch({type: 'UPDATE_COLLECT_TRIGGER', payload: true})
    shippingHook.methods.onResetShippingPartner()
    //
    const listPartner = state.form.shippingInfo.shippingPartner.list.map(item => {
      item.config.cargoInsurrance.value = ''
      item.config.cargoInsurrance.active = false
      return item
    })
    dispatch({
      type: orderSingleAction.RESET_INSURRANCE,
      payload: listPartner
    })

    // UV-1587
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        deliveryNote: {
          selected: 0,
          content: state?.deliveryNote?.find(item => +item.is_default === 1)?.content || '',
        },
      },
    })
  }

  const resetCustomer = () => {
    dispatch({type: 'RESET_FORM_CUSTOMER_INFO'})
    dispatch({type: 'RESET_VALIDATE_FORM'})
    shippingHook.methods.onResetShippingPartner()
  }

  const validateForm = () => {
    shippingHook.methods.handleWeightValidate()
    customerHook.methods.onPhoneValidate(!!customerInfo.phone.value.trim())
    customerHook.methods.onFullNameValidate(
      !!customerInfo.fullName.value.trim(),
    )
    customerHook.methods.onAddressValidate(!!customerInfo.address.value.trim())
    customerHook.methods.onProvinceValidate(
      !!customerInfo.address.province.value?.value,
    )
    customerHook.methods.onDistrictValidate(
      !!customerInfo.address.district.value?.value,
    )
    customerHook.methods.onWardValidate(
      !!customerInfo.address.ward.value?.value,
    )
    productHook.methods.onInventoryManualValidare(
      [
        productInfo.inventoryConfig.type === 'manual' &&
          !!productInfo.inventoryConfig.manual.value.trim(),
      ].includes(true),
    )
    let validateStatus = 0
    if (
      (productInfo.inventory && shippingInfo.shippingPartner.id == 0) ||
      (!productInfo.inventory &&
        ![
          productInfo.inventoryConfig.type === 'manual' &&
            !!productInfo.inventoryConfig.manual.value.trim(),
          productInfo.inventoryConfig.type === 'auto' &&
            productInfo.inventoryConfig.auto.selected.length > 0,
        ].includes(true))
    ) {
      dispatch({
        type: orderSingleAction.SET_VALIDATE_FORM,
        payload: {
          shippingPartner: '#FF424E',
        },
      })
      validateStatus = 1
    }

    if((((+activeShippingPartner?.config?.cargoInsurrance?.value === 0 || !!!activeShippingPartner?.config?.cargoInsurrance?.value) && +state?.form?.shippingInfo?.shippingPartner?.id === 2) ||
      (+(replaceAllCustom(activeShippingPartner?.config?.cargoInsurrance?.value, ',' ,'').replace('₫', '')) === 0
        && activeShippingPartner?.config?.cargoInsurrance?.active)) && !state?.form?.shippingInfo?.isStorePickUp) {
      shippingInfo.shippingPartner.list.map((item, index) => {
        if (+item.id === +shippingInfo.shippingPartner.id) {
          shippingHook.methods.handleCargoInsurranceValidate(true, index)
        }
      })
      validateStatus = 1
    }

    if ((+activeShippingPartner?.config?.packageQuantity === 0 || !!!activeShippingPartner?.config?.packageQuantity)
        && !state?.form?.shippingInfo?.isStorePickUp && +state?.form?.shippingInfo?.shippingPartner?.id === 1) {
      shippingInfo?.shippingPartner?.list?.map((item, index) => {
        if (+item?.id === +shippingInfo?.shippingPartner?.id) {
          shippingHook?.methods?.handleValidatePackageQuantity(true, index)
        }
      })
      validateStatus = 1
    }
    return validateStatus
  }

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const handleSubmit = async opt => {
    if(debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)

      if(+submitQueries.total_amount > 2000000000) {
        toast.error('Tổng giá trị đơn hàng chỉ được phép tối đa 2 tỷ!')
      } else {
        //--UV-837
        if((!productInfo?.inventory && productInfo?.inventoryConfig?.type === 'auto' && productInfo?.inventoryConfig?.auto?.selected?.length === 0)
            || (productInfo?.inventory && productInfo?.withInventoryConfig?.search?.selected?.length === 0)) {
          dispatch({type: orderSingleAction.VALIDATE_EMPTY_PRODUCT_FORM_WITH_INVENTORY_PRICE, payload: true})
        }
        //--
        const validateStatus = validateForm()
        if (canSaveDraft && +validateStatus === 0) {

          +opt?.is_draft === 1 ? submitQueries.is_draft = 1 : submitQueries.is_delivery = 1
          dispatch({type: 'UPDATE_LOADING', payload: true})
          const response = await sendRequestAuth(
            'post',
            `${config.API}/order/create`,
            JSON.stringify({...submitQueries, ...opt}),
          )
          if (!!response?.data) {
            const detail = state?.form?.customerInfo?.phone?.detail
            if (response?.data?.success && !!detail?.id && state?.form?.customerInfo?.updateAddress?.check) {
              const dataCustomer = {
                address: state?.form?.customerInfo?.address?.value || '',
                city_id: state?.form?.customerInfo?.address?.province?.value?.value || detail?.city_id,
                district_id: state?.form?.customerInfo?.address?.district?.value?.value || detail?.district_id,
                ward_id: state?.form?.customerInfo?.address?.ward?.value?.value || detail?.ward_id,
              }
              const fetchUpdate = async _ => {
                const responseCustomer = await sendRequestAuth(
                  'post',
                  `${config.API}/customer/update-address/${detail?.id}`, dataCustomer,
                )
                if(!responseCustomer?.data?.success) {
                  toast.error('Cập nhật thất bại')
                }
              }
              fetchUpdate()
            }
            dispatch({type: 'UPDATE_LOADING', payload: false})
            return response
          }
        } else return false
      }
    }
  }

  const handleUpdateQuantity = data => {
    data?.map(item => {
      item.data.warehouse_quantity = +item.data.warehouse_quantity - item.quantity
      return item
    })
  }

  return {
    form: state.form,
    properties: {
      canSaveOrder,
    },
    methods: {
      onFetchOrigin: handleFetchOrigin,
      onSubmit: handleSubmit,
      onResetFormData: resetFormData,
      onResetCustomer: resetCustomer,
      onUpdateQuantity: handleUpdateQuantity,
    },
    loading: state.loading,
    productInfo,
    shippingInfo,
    modalWarningPhone: state.warningPhone,
    submitQueries
  }
}

export default useOrderSingle
