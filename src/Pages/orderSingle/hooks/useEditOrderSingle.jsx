import React, {useContext, useState} from 'react';
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {orderSingleAction} from "../provider/_actions";
import {OrderSingleContext} from "../provider/_context";
import ArrayUtils from "../utils/array";
import {
  transformAddressData,
  transformCustomerData, transformMoneyToSendRequest, transformPaymentMethodData,
  transformProductData, transformShippingConfigData,
  transformShippingPointData,
  transformSourceData, transformWarehouseData
} from "../utils/transform";
import {fNumber} from "../../../util/formatNumber";
import {useNavigate} from "react-router-dom";
import toast from "../../../Component/Toast";
import {isPositiveInteger} from "../utils/number";
import locationJsonData from "../../addressSeparationTool/_data.json";
import useOrderSingleShippingInfo from "./useOrderSingleShippingInfo";
import useOrderSingleCustomerInfo from "./useOrderSingleCustomerInfo";
import useOrderSingleProductInfo from "./useOrderSingleProductInfo";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {ORDER_SINGLE_CONSTANTS} from "../interface/_constants";
import {fDateTimeSuffix} from "../../../util/formatTime";
import {replaceAllCustom} from "../../../util/functionUtil";

const useEditOrderSingle = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(OrderSingleContext)
  const shippingHook = useOrderSingleShippingInfo()
  const customerHook = useOrderSingleCustomerInfo()
  const productHook = useOrderSingleProductInfo()
  const fullNameCreate = state.creator
  const {customerInfo, productInfo, shippingInfo, extraInfo, paymentMethod} = state.form
  const idOrder = location.pathname.split('/')[3]
  const [skeleton, setSkeleton] = useState(false)


  const selectedList = productInfo?.withInventoryConfig?.search?.selected
  const activeShippingPartner = shippingInfo.shippingPartner.list.find(item => +item.id === +shippingInfo.shippingPartner.id)
  const tmpPrice = state?.form?.productInfo?.inventory
    ? selectedList.reduce((p, n, i) => {
      const itemPrice =
        transformMoneyToSendRequest(selectedList[i]?.price || 0) *
        transformMoneyToSendRequest(selectedList[i]?.quantity || 0)

      return p + itemPrice
    }, 0)
    : transformMoneyToSendRequest(state?.form?.shippingInfo?.collectMoney || 0) + transformMoneyToSendRequest(state?.field_paid || 0)


  const tmpDiscount = selectedList.reduce((p, n, i) => {
    const itemDiscount =
      selectedList[i]?.discountType === 'đ'
        ? transformMoneyToSendRequest(selectedList[i]?.discount || 0)
        : (transformMoneyToSendRequest(selectedList[i]?.price || 0) *
        transformMoneyToSendRequest(selectedList[i]?.quantity || 0) *
        transformMoneyToSendRequest(selectedList[i]?.discount_value || 0)) /
        100

    return p + itemDiscount
  }, 0)

  const tmpTotalDiscount = state?.form?.productInfo?.withInventoryConfig?.discount?.value?.length > 3 ? +replaceAllCustom(state?.form?.productInfo?.withInventoryConfig?.discount?.value, ',','') : +state?.form?.productInfo?.withInventoryConfig?.discount?.value
  const orderDiscount = (state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%' ?
    ((+tmpPrice - +tmpDiscount) * +tmpTotalDiscount / 100) :
    +tmpTotalDiscount) || 0

  const listPriceSelect = state?.form?.productInfo?.withInventoryConfig?.search?.selected
  const isErrorPrice = listPriceSelect?.find(item => {
    return ((item.discountType === 'đ' && +item.discount > (+item.price * +item.quantity))
            || (item.discountType === '%' && +item.discount_value > 100))
  })

  const discountTotal = state?.form?.productInfo?.withInventoryConfig?.discount
  const checkDiscountTotal = (discountTotal?.type === 'đ' && +discountTotal?.value > tmpPrice) || (discountTotal?.type === '%' && +discountTotal?.value > 100)

  const handleFetchDetail = async _ => {
    if(!isPositiveInteger(idOrder)) {
      navigate('/orders')
      toast.error('Không tìm thấy đơn hàng! Vui lòng thử lại!')
      return
    }
    setSkeleton(true)

    const response = await Promise.all([
      sendRequestAuth('get',`${config.API}/customer/customers?keyword=&group=&city_id=&district_id=&ward_id=&per_page=20&start=0`,),
      // sendRequestAuth('get',`${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=&warehouse_id=&per_page=10&start=0`,),
      sendRequestAuth('get',`${config.API}/setting/addresses?keyword=&status=&per_page=100&start=0`),
      sendRequestAuth('get', `${config.API}/order/origins?keyword=&status&per_page=100&start=0`),
      sendRequestAuth('get', `${config.API}/payment/payment-method`),
      sendRequestAuth('get', `${config.API}/warehouse/warehouses?status=1&per_page=200&start=0`),
      sendRequestAuth('get', `${config.API}/order/detail/${idOrder}`),
    ])

    if(!response[5]?.data?.success) {
      navigate('/orders')
      toast.error('Không tìm thấy đơn hàng! Vui lòng thử lại!')
      return
    }
    setSkeleton(false)
    if (
      !!response[0]?.data?.success ||
      !!response[1]?.data?.success ||
      !!response[2]?.data?.success ||
      !!response[3]?.data?.success ||
      !!response[4]?.data?.success ||
      !!response[5]?.data?.success
      // || !!response[6]?.data?.success
    ) {
      const formatPhoneList = ArrayUtils.getQualifiedArray(
        response[0]?.data?.data,
      ).map(transformCustomerData)

      let shippingPointValueData = null
      const formatShippingPointList = ArrayUtils.getQualifiedArray(
        response[1]?.data?.data,
      ).map(item => {
        if (item?.is_default === '1' && !shippingPointValueData)
          shippingPointValueData = transformShippingPointData(item)
        return transformShippingPointData(item)
      })

      let sourceValueData = null
      const formatSourceList = ArrayUtils.getQualifiedArray(
        response[2]?.data?.data,
      )?.filter(item => (+item?.status === 1 || +item?.id === +response[5]?.data?.data?.order_origin_id))
        ?.map(item => {
          if (item?.is_default === '1' && !sourceValueData)
            sourceValueData = transformSourceData(item)
          return transformSourceData(item)
      })


      let paymentMethodValueData = null
      const formatPaymentMethodList = ArrayUtils.getQualifiedArray(
        response[3]?.data?.data,
      ).map(item => {
        if (item?.is_default === '1' && !paymentMethodValueData)
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


      let detailOrder
      detailOrder = response[5]?.data?.data
      if(+detailOrder?.partner_ship !== 1 && +detailOrder?.shipping_status_id === 1) {
        navigate('/orders')
        toast.error('Chỉnh sửa đơn hàng chỉ áp dụng cho đơn vị vận chuyển J&T Express!')
      } else {
        assembleInfo(detailOrder)

        dispatch({
          type: orderSingleAction.FORM_UPDATE_ADDRESS,
          payload: {
            ...state.form.customerInfo.updateAddress,
            open: !!detailOrder?.customer_mobile,
            check: false
          },
        })

        const shippingPointActive = formatShippingPointList.find(item => {
          return item.value === detailOrder.id_sender
        })
        const sourceOrderActive = formatSourceList.find(item => {
          return item.value === detailOrder.order_origin_id
        })
        const currentWarehouse = formatWarehouseList.find(item => item.value === detailOrder.warehouse_id)

        let formatProductList = []
        let listInventories
        const responseInventoryWare = await Promise.all([
          sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${detailOrder.warehouse_id}&per_page=20&start=0`),
        ])
        if(!!responseInventoryWare[0]?.data?.success) {
          formatProductList = ArrayUtils.getQualifiedArray(
            responseInventoryWare[0]?.data?.data,
          ).map(transformProductData)
        }
        if(!!detailOrder.order_details) {
          const listProductDetail = detailOrder.order_details.map(item => item.product_id_details).join(',')
          const responseInventory = await Promise.all([
            sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=${listProductDetail}&status=1&warehouse_id=${detailOrder.warehouse_id}&per_page=&start=`)
          ])
          if(!!responseInventory[0]?.data?.success) {
            listInventories = responseInventory[0]?.data?.data.map(item => item.warehouse_quantity)
          }
          const newSelectArr = detailOrder.order_details.map((item, index) => {
            return {
              'data': {
                'id': item.product_id_details,
                'product_id': item.product_id,
                'product_name': item.product_name,
                'image_thumb': item.image_thumb,
                'unit_name': item.unit_name || 0,
                'supplier_price': item.supplier_price,
                'sku': item.product_model,
                'warehouse_quantity': listInventories[index] || '',
                'price': item?.price || 0,
                'wholesale_price': item?.wholesale_price || 0,
                'weight': item?.weight || 0,
                'weight_unit': item?.weight_unit || 'g',
              },
              'discount': +item.discount || 0,
              'discountType': +item.discount_type === 2 ? '%': 'đ',
              'discount_value': +item.discount_type === 2 ? +item.discount_value : +item.discount,
              'price': +item.price,
              'quantity': +item.quantity,
              'status': +item.status,
            }
          })
          dispatch({
            type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE,
            payload: {list: newSelectArr},
          })
          // //Giảm giá sản phẩm
          dispatch({
            type: orderSingleAction.FORM_WITH_INVENTORY_TOTAL_DISCOUNT_UPDATE,
            payload: {type: +detailOrder?.order_discount_type === 1 ? 'đ' : '%', value: detailOrder?.order_discount_value},
          })
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
              },
            },
            productInfo: {
              inventoryConfig: {
                auto: {
                  list: formatProductList,
                  total: responseInventoryWare[0]?.data?.meta?.total || 0,
                },
              },
              withInventoryConfig: {
                warehouse: {
                  list: formatWarehouseList,
                  value: currentWarehouse || formatWarehouseList[0],
                },
              },
            },
            extraInfo: {
              shippingPoint: {
                list: formatShippingPointList,
                value: shippingPointActive || shippingPointValueData,
              },
              source: {
                list: formatSourceList,
                value: sourceOrderActive || sourceValueData,
              },
            },
            paymentMethod: {
              method: {
                list: formatPaymentMethodList,
                value: paymentMethodValueData || formatPaymentMethodList[0],
              },
            },
          },
        })
        dispatch({
          type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE,
          payload: {
            list: formatProductList,
            loading: false,
            page: 0,
            total: response?.data?.meta?.total || 0,
          },
        })


        dispatch({
          type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE,
          payload: {
            list: formatProductList,
            loading: false,
            page: 0,
            total: responseInventoryWare[0]?.data?.meta?.total || 0
          },
        })
        dispatch({
          type: orderSingleAction.FORM_PHONE_LIST_UPDATE,
          payload: {
            list: formatPhoneList,
            page: 0,
            total: response[0]?.data?.meta?.total || 0
          },
        })

        if(detailOrder?.order_payments.length > 0) {
          const paymentActive = formatPaymentMethodList.find(item => item.value === detailOrder?.order_payments[0]?.payment_method_id)
          dispatch({
            type: orderSingleAction.FORM_PAYMENT_METHOD_UPDATE,
            payload: {value: paymentActive},
          })
        }
      }
    }
  }

  const assembleInfo = data => {
    // Trạng thái đơn hàng
    dispatch({
      type: orderSingleAction.EDIT_FORM_SHIPPING_STATUS,
      payload: {value: data.shipping_status_id},
    })

    // Thông tin khách hàng
    dispatch({
      type: orderSingleAction.FORM_PHONE_UPDATE,
      payload: {value: data.customer_mobile},
    })
    !!data.customer_mobile && handleFetchCustomerReport(data.customer_mobile)
    handleFetchCustomerDetail(data.customer_id)
    handleFetchCustomerOrderFigure(data.customer_id)
    handleFetchCustomerOrder(data.customer_id)
    const checkCustomer = [
      !!data?.city_id,
      !!data?.district_id,
      !!data?.ward_id,
    ].includes(true)
    dispatch({
      type: orderSingleAction.FORM_FULL_NAME_UPDATE,
      payload: {value: data.customer_name},
    })

    if(checkCustomer){
      dispatch({
        type: orderSingleAction.FORM_ADDRESS_UPDATE,
        payload: {value: data.customer_address},
      })
      const currentProvince = locationJsonData.find(
        item => item?.id === data?.city_id,
      )
      const currentDistrict = currentProvince?.list?.find(
        item => item?.id === data?.district_id,
      )
      const currentWard = currentDistrict?.list?.find(
        item => item?.id === data?.ward_id,
      )
      dispatch({
        type: orderSingleAction.FORM_ADDRESS_PROVINCE_UPDATE,
        payload: {
          province: {value: currentProvince},
          district: {
            list: ArrayUtils.getQualifiedArray(currentProvince?.list).map(
              transformAddressData,
            ),
          },
        },
      })
      dispatch({
        type: orderSingleAction.FORM_ADDRESS_DISTRICT_UPDATE,
        payload: {
          district: {value: {value: currentDistrict.id, ...currentDistrict}},
          ward: {
            list: ArrayUtils.getQualifiedArray(currentDistrict?.list).map(
              transformAddressData,
            ),
          },
        },
      })
      dispatch({
        type: orderSingleAction.FORM_ADDRESS_WARD_UPDATE,
        payload: {ward: {value: currentWard}},
      })
    }
    // Thông tin bổ sung
    dispatch({
      type: orderSingleAction.EDIT_FORM_CREATOR,
      payload: data.creator,
    })
    dispatch({
      type: orderSingleAction.FORM_UNIQUE_ORDER_NUMBER_UPDATE,
      payload: {value: data.order_code_of_shop},
    })
    dispatch({
      type: orderSingleAction.FORM_NOTE_UPDATE,
      payload: {value: data.order_note},
    })
    dispatch({
      type: orderSingleAction.FORM_SHIPPING_FEE_CUSTOM_UPDATE,
      payload: {value: !!data?.ship_fee_custom ? +data?.ship_fee_custom : !!data?.draft_data?.ship_fee_custom && data?.draft_data?.ship_fee_custom !== 0 ? +data?.draft_data?.ship_fee_custom : ''},
    })
    //Thông tin sản phẩm
    dispatch({type: orderSingleAction.EDIT_FORM_INVENTORY_TOGGLE, payload: data.has_inventory === '1'})
    dispatch({ type: orderSingleAction.FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE, payload: {value: data.type_price === '1' ? {name: 'Giá bán lẻ', value: 1} : {name: 'Giá bán sỉ', value: 2} }, })
    dispatch({type: orderSingleAction.EDIT_FORM_TEXT_PAID, payload: data.total_payment})
    dispatch({ type: orderSingleAction.FORM_INVENTORY_MANUAL_UPDATE, payload: {value: data.details } })

    // Thông tin vận chuyển
    // const money = fNumber((+(data.total_amount || 0) - +(data.total_discount || 0) - +(data.order_discount || 0) - +(data.total_payment || 0)).toString().replace(/[^0-9]/g, ''))
    // dispatch({
    //   type: orderSingleAction.UPDATE_SHIPPING_INFO,
    //   payload: {
    //     collectMoney: money,
    //   },
    // })
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        collectMoney: data.cod_amount,
      },
    })
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        weight: data.weight,
      },
    })
    if(!!data.length) {
      dispatch({
        type: orderSingleAction.UPDATE_SHIPPING_INFO,
        payload: {
          size: {
            longs: fNumber(data.length.toString().replace(/[^0-9]/g, '')),
          },
        },
      })
    }
    if(!!data.width) {
      dispatch({
        type: orderSingleAction.UPDATE_SHIPPING_INFO,
        payload: {
          size: {
            width: fNumber(data.width.toString().replace(/[^0-9]/g, '')),
          },
        },
      })
    }
    if(!!data.height) {
      dispatch({
        type: orderSingleAction.UPDATE_SHIPPING_INFO,
        payload: {
          size: {
            height: fNumber(data.height.toString().replace(/[^0-9]/g, '')),
          },
        },
      })
    }
    const shippingNoteDefault = +data.shipping_status_id === 21 ? data?.draft_data?.note : data?.note
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        deliveryNote: {
          selected: 0,
          content: shippingNoteDefault?.length > 255 ? shippingNoteDefault?.substring(0, shippingNoteDefault?.length - 1) : shippingNoteDefault,
        },
      },
    })
    if(+data.shipping_status_id === 8) {
      dispatch({ type: orderSingleAction.EDIT_UPDATE_PICK_UP_STORE, payload: true })
    }

    // Hình thức thanh toán
    if(data?.order_payments.length > 0) {
      dispatch({
        type: orderSingleAction.FORM_PAYMENT_DATETIME_UPDATE,
        payload: {'formatValue': fDateTimeSuffix(data.order_payments[0].dt_created), 'value': new Date(data.order_payments[0].dt_created)},
      })
      dispatch({
        type: orderSingleAction.FORM_PAYMENT_METHOD_TYPE_UPDATE,
        payload: {type: (data.order_payments[0].status === '1' && !!!(data.total_payment)) ? 'before' : ((data.order_payments[0].status === '2') ? 'cod' : 'after')},
      })
      // dispatch({
      //   type: orderSingleAction.FORM_PAYMENT_MONEY_UPDATE,
      //   payload: {value: data.order_payments[0].total_amount},
      // })
    }


    let dataShippingFee = {
      // partner: state.form.shippingInfo.shippingPartner.listOrigin.map(item => item.id),
      idSender: data?.id_sender,
      cityId: data?.city_id,
      districtId: data?.district_id,
      wardId: data?.ward_id,
      weight: +data?.weight || 1,
      codAmount: +data?.cod_amount || 0,
      isInsurrance: +data?.insurrance || 0,
      insurranceValue: +data?.insurrance_value || 0,
    }

    let defaultListShippingPartner = []
    // set lại JNT cho đơn đang giao
    if(+data.shipping_status_id === 1) {
      defaultListShippingPartner = [{
        'config': {
          payer: [
            {value: 1, label: 'Người nhận', checked: data.payment_method === 'CC_CASH'},
            {value: 2, label: 'Người gửi', checked: data.payment_method === 'PP_CASH'},
            {value: 3, label: 'Người gửi cuối tháng trả phí', checked: data.payment_method === 'PP_PM'},
          ],
          request: [
            {value: 1, label: 'Cho khách xem hàng', checked: data.recipient_view === '1'},
            {value: 2, label: 'Không cho khách xem hàng', checked:  data.recipient_view === '2'},
          ],
          request_goods: [
            {value: 1, label: 'Đến lấy hàng tại nhà', checked: data.request_goods === '1'},
            {value: 6, label: 'Gửi tại bưu cục', checked: data.request_goods === '6'},
          ],
          partsign: data.partsign === '1',
          packageQuantity: +(data.number_pack) || 1,
          cargoInsurrance: {
            active: data.is_insurrance === '1',
            value: fNumber(data.insurrance) || '',
          }},
        'connected': true,
        'id': '1',
        'is_default': 1,
        'logo': "https://khachhang.upos.vn/my-assets/image/s_partner_1.png",
        'name': "J&T Express",
        'shipping_config': {
          'bg_cod': 0,
          'hidden_phone': 0,
          'partsign': 0,
          'payer': 0,
          'request': 0,
          'request_goods': 0,
        }
      }]
      dispatch({
        type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
        payload: {
          list: defaultListShippingPartner,
        },
      })

      dataShippingFee.partner = ['1']
      const fetchSomeDataFeeJNT = async _ => {
        // You can await here
        const response = await sendRequestAuth(
          'post',
          `${config.API}/order/shipping/fee`,
          {
            partner_id: dataShippingFee.partner,
            id_sender: dataShippingFee.idSender,
            city_id: dataShippingFee.cityId,
            district_id: dataShippingFee.districtId,
            ward_id: dataShippingFee.wardId,
            weight: dataShippingFee.weight,
            cod_amount: dataShippingFee.codAmount,
            is_insurrance: dataShippingFee.isInsurrance,
            insurrance_value: dataShippingFee.insurranceValue,
          },
        )
        if(response?.data?.success) {
          const partner = response?.data?.data
          defaultListShippingPartner[0].fee = partner[0]?.fee
          dispatch({
            type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
            payload: {
              list: defaultListShippingPartner,
            },
          })
        }
      }
      fetchSomeDataFeeJNT()
    }
    else {
      let listPartner = []
      const getShippingPartner = async _ => {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/order/shipping/partner-delivery`,
        )
        if (!!response?.data?.success) {
          const transformData =  response?.data?.data.map(item =>
            transformShippingConfigData(
              item,
              ORDER_SINGLE_CONSTANTS.form.shippingInfo[`${item.id}`],
              item?.shipping_config
            ))
          listPartner = transformData.filter(item => {
            if (item.id === data.partner_ship) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_PARTNER_INFO,
                payload: {
                  id: item.id,
                },
              })
              dispatch({
                type: orderSingleAction.SET_SHIPPING_PARTNER_DEFAULT,
                payload: item.id,
              })
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_PARTNER_SELECTED,
                payload: item.id,
              })
              dispatch({
                type: orderSingleAction.SET_COLLAPSE_SHIPING,
                payload: [item.id],
              })
            }
            return !!item.connected
          })

          // Map đơn vị vân chuyển
          listPartner.filter(item => {
            if(+data.partner_ship === +item.id) {
              if(!!data?.payment_method) item?.config?.payer?.map(pay => {
                pay.checked = pay.payment_method === data.payment_method
              })
              if(!!data?.draft_data?.recipient_view) item?.config?.request?.map(rw => {
                rw.checked = rw.value === +data.draft_data.recipient_view
              })
              if(!!data?.draft_data?.request_goods) item?.config?.request_goods?.map(rg => {
                rg.checked = rg.value === +data.draft_data.request_goods
              })
              if(!!data?.draft_data?.partsign) item.config.partsign = +data.draft_data.partsign === 1
              if(!!data.number_pack) item.config.packageQuantity = +(data.number_pack) || 1
              if(!!data.insurrance) {
                item.config.cargoInsurrance = {
                  'active': !!data.insurrance && +data.insurrance > 0,
                  'value': fNumber(data.insurrance.toString().replace(/[^0-9]/g, '')) || '',
                }
              }
              if(!!data?.draft_data?.pick_shift) item?.config?.pick_shift?.map(ps => {
                ps.checked = ps.value === +data?.draft_data?.pick_shift
              })
              if(!!data?.draft_data?.transport) item?.config?.transport?.map(tp => {
                tp.checked = tp.value === data?.draft_data?.transport
              })
              if(!!data?.draft_data?.pick_date) {
                const pickDate = `${data?.draft_data?.pick_date.split('/')[2]}-${data?.draft_data?.pick_date.split('/')[1]}-${data?.draft_data?.pick_date.split('/')[0]}`
                item.config.pick_date = {'formatValue': fDateTimeSuffix(pickDate), 'value': new Date(pickDate)}
                dispatch({
                  type: orderSingleAction.FORM_SHIPPING_DATETIME_UPDATE,
                  payload: {'formatValue': fDateTimeSuffix(pickDate), 'value': new Date(pickDate)},
                })
              }
            }

            if(!!data?.draft_data?.lengh) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_INFO,
                payload: {
                  size: {
                    longs: fNumber(data?.draft_data?.lengh.toString().replace(/[^0-9]/g, '')),
                  },
                },
              })
            }
            if(!!data?.draft_data?.width) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_INFO,
                payload: {
                  size: {
                    width: fNumber(data?.draft_data?.width.toString().replace(/[^0-9]/g, '')),
                  },
                },
              })
            }
            if(!!data?.draft_data?.height) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_INFO,
                payload: {
                  size: {
                    height: fNumber(data?.draft_data?.height.toString().replace(/[^0-9]/g, '')),
                  },
                },
              })
            }
          })
          dispatch({
            type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
            payload: {
              list: listPartner,
              listOrigin: listPartner,
            },
          })

          let listPartnerFee = []
          listPartner.map(item => {
            listPartnerFee.push(item.id)
          })
          dataShippingFee.partner = listPartnerFee
        }
        dispatch({ type: 'UPDATE_LOADING', payload: false })
        dispatch({ type: 'UPDATE_SKELETON', payload: false })
      }
      getShippingPartner()

      const fetchSomeDataFeeShipping = async _ => {
        // You can await here
        const response = await sendRequestAuth(
          'post',
          `${config.API}/order/shipping/fee`,
          {
            partner_id: dataShippingFee.partner,
            id_sender: dataShippingFee.idSender,
            city_id: dataShippingFee.cityId,
            district_id: dataShippingFee.districtId,
            ward_id: dataShippingFee.wardId,
            weight: dataShippingFee.weight,
            cod_amount: dataShippingFee.codAmount,
            is_insurrance: dataShippingFee.isInsurrance,
            insurrance_value: dataShippingFee.insurranceValue,
          },
        )
        if(response?.data?.success) {
          const partner = response?.data?.data
          partner.map((item, index) => {
            item.shipping_config = listPartner[index].shipping_config
          })

          const transformData = partner.map(item =>
            transformShippingConfigData(
              item,
              ORDER_SINGLE_CONSTANTS.form.shippingInfo[`${item.id}`],
              item?.shipping_config
            ))
          const listPartnerAfter = transformData.filter(item => {
            if (item.id === data.partner_ship) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_PARTNER_INFO,
                payload: {
                  id: item.id,
                },
              })
              dispatch({
                type: orderSingleAction.SET_SHIPPING_PARTNER_DEFAULT,
                payload: item.id,
              })
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_PARTNER_SELECTED,
                payload: item.id,
              })
              dispatch({
                type: orderSingleAction.SET_COLLAPSE_SHIPING,
                payload: [item.id],
              })
            }
            return !!item.connected
          })

          // Map đơn vị vân chuyển
          listPartnerAfter.filter(item => {
            if(+data.partner_ship === +item.id) {
              if(!!data?.payment_method) item?.config?.payer?.map(pay => {
                pay.checked = pay.payment_method === data.payment_method
              })
              if(!!data?.draft_data?.recipient_view) item?.config?.request?.map(rw => {
                rw.checked = rw.value === +data.draft_data.recipient_view
              })
              if(!!data?.draft_data?.request_goods) item?.config?.request_goods?.map(rg => {
                rg.checked = rg.value === +data.draft_data.request_goods
              })
              if(!!data?.draft_data?.partsign) item.config.partsign = +data.draft_data.partsign === 1
              if(!!data.number_pack) item.config.packageQuantity = +(data.number_pack) || 1
              if(!!data.insurrance) {
                item.config.cargoInsurrance = {
                  'active': !!data.insurrance && +data.insurrance > 0,
                  'value': fNumber(data.insurrance.toString().replace(/[^0-9]/g, '')) || '',
                }
              }
              if(!!data?.draft_data?.pick_shift) item?.config?.pick_shift?.map(ps => {
                ps.checked = ps.value === +data?.draft_data?.pick_shift
              })
              if(!!data?.draft_data?.transport) item?.config?.transport?.map(tp => {
                tp.checked = tp.value === data?.draft_data?.transport
              })
              if(!!data?.draft_data?.pick_date) {
                const pickDate = `${data?.draft_data?.pick_date.split('/')[2]}-${data?.draft_data?.pick_date.split('/')[1]}-${data?.draft_data?.pick_date.split('/')[0]}`
                item.config.pick_date = {'formatValue': fDateTimeSuffix(pickDate), 'value': new Date(pickDate)}
                dispatch({
                  type: orderSingleAction.FORM_SHIPPING_DATETIME_UPDATE,
                  payload: {'formatValue': fDateTimeSuffix(pickDate), 'value': new Date(pickDate)},
                })
              }
            }

            if(!!data?.draft_data?.lengh) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_INFO,
                payload: {
                  size: {
                    longs: fNumber(data?.draft_data?.lengh.toString().replace(/[^0-9]/g, '')),
                  },
                },
              })
            }
            if(!!data?.draft_data?.width) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_INFO,
                payload: {
                  size: {
                    width: fNumber(data?.draft_data?.width.toString().replace(/[^0-9]/g, '')),
                  },
                },
              })
            }
            if(!!data?.draft_data?.height) {
              dispatch({
                type: orderSingleAction.UPDATE_SHIPPING_INFO,
                payload: {
                  size: {
                    height: fNumber(data?.draft_data?.height.toString().replace(/[^0-9]/g, '')),
                  },
                },
              })
            }
          })
          dispatch({
            type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
            payload: {
              list: listPartnerAfter,
              listOrigin: listPartnerAfter,
            },
          })
        }
      }
      fetchSomeDataFeeShipping()
    }

    dispatch({
      type: orderSingleAction.EDIT_FORM_PRICE_ORDER,
      payload: {
        amount: data?.total_amount || '',
        discount: data?.total_discount || '',
        cod_amount: data?.cod_amount || '',
      },
    })
  }

  const fetchSomeDataFee = async params => {
    // You can await here
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/shipping/fee`,
      {
        partner_id: params.partner,
        id_sender: params.idSender,
        city_id: params.cityId,
        district_id: params.districtId,
        ward_id: params.wardId,
        weight: params.weight,
        cod_amount: params.codAmount,
        is_insurrance: params.isInsurrance,
        insurrance_value: params.insurranceValue,
      },
    )
    if (!!response?.data?.success) {
      // update shippingPartner list
      let services = state.form.shippingInfo.shippingPartner.service
      let partner = response?.data?.data
      partner.map((prt,i) => {
        services = [...services, {
          serviceId: prt?.services ? prt?.services[0]?.id : 0,
          name: prt?.services ? prt?.services[0]?.name : '',
          partnerId: prt?.id || 0
        }]
        prt.config = state.form.shippingInfo.shippingPartner.list[i].config
      })
      dispatch({
        type: orderSingleAction.UPDATE_LIST_SHIPPING_FEE,
        payload: {
          list: partner,
        },
      })
      dispatch({
        type: orderSingleAction.SET_SHIPPING_SERVICE,
        payload: services,
      })
      dispatch({ type: 'UPDATE_SKELETON', payload: false })
    }
  }

  const isEnoughCustomerInfo = ![
    !!customerInfo?.phone?.value?.trim(),
    !!customerInfo?.fullName?.value?.trim(),
    !!customerInfo?.address?.value?.trim(),
    !!!customerInfo?.address?.province?.value?.id ? !!customerInfo?.address?.province?.value?.value : !!customerInfo?.address?.province?.value?.id,
    !!!customerInfo?.address?.district?.value?.id ? !!customerInfo?.address?.district?.value?.value : !!customerInfo?.address?.district?.value?.id,
    !!!customerInfo?.address?.ward?.value?.id ? !!customerInfo?.address?.ward?.value?.value : !!customerInfo?.address?.ward?.value?.id,
  ].includes(false)
  const isEnoughProductInfo = productInfo?.inventory
    ? (productInfo?.withInventoryConfig?.search?.selected?.length > 0 && !!!productInfo?.withInventoryConfig?.search?.selected?.find(item => !!!item?.quantity))
    : [
      productInfo?.inventoryConfig?.type === 'manual' &&
      !!productInfo?.inventoryConfig?.manual?.value?.trim(),
      productInfo?.inventoryConfig?.type === 'auto' &&
      ArrayUtils.getQualifiedArray(
        productInfo?.inventoryConfig?.auto?.selected,
      )?.length > 0,
    ].includes(true)
  const isEnoughShippingInfo = ![
    !!shippingInfo.weight,
  ].includes(false)


  const validateVTP = +activeShippingPartner?.id === 4 && transformMoneyToSendRequest(state.form.shippingInfo.collectMoney) < 5000
  const canSaveDraft = ![
    !!customerInfo?.phone?.value?.trim(),
    !!customerInfo?.fullName?.value?.trim(),
    !!customerInfo?.address?.value?.trim(),
    !!!customerInfo?.address?.province?.value?.id ? !!customerInfo?.address?.province?.value?.value : !!customerInfo?.address?.province?.value?.id,
    !!!customerInfo?.address?.district?.value?.id ? !!customerInfo?.address?.district?.value?.value : !!customerInfo?.address?.district?.value?.id,
    !!!customerInfo?.address?.ward?.value?.id ? !!customerInfo?.address?.ward?.value?.value : !!customerInfo?.address?.ward?.value?.id,
    !validateVTP
  ].includes(false)

  const canSaveOrder = isEnoughCustomerInfo && isEnoughProductInfo
    && isEnoughShippingInfo && !!!isErrorPrice && !checkDiscountTotal
    && (state?.form?.shippingInfo?.deliveryNote?.content?.length <= 255 || !!!state?.form?.shippingInfo?.deliveryNote?.content)
    && (state?.form?.extraInfo?.note?.value?.length <= 255 || !!!state?.form?.extraInfo?.note?.value)
    && !validateVTP

  const validateForm = () => {
    let validateStatus = 0
    shippingHook.methods.handleWeightValidate()
    customerHook.methods.onPhoneValidate(!!customerInfo.phone.value.trim())
    customerHook.methods.onFullNameValidate(
      !!customerInfo.fullName.value.trim(),
    )
    customerHook.methods.onAddressValidate(!!customerInfo.address.value.trim())
    customerHook.methods.onProvinceValidate(
      !!!customerInfo.address.province.value?.id ? !!customerInfo.address.province.value?.value : !!customerInfo.address.province.value?.id
    )
    customerHook.methods.onDistrictValidate(
      !!!customerInfo.address.district.value?.id ? !!customerInfo.address.district.value?.value : !!customerInfo.address.district.value?.id
    )
    customerHook.methods.onWardValidate(
      !!!customerInfo.address.ward.value?.id ? !!customerInfo.address.ward.value?.value : !!customerInfo.address.ward.value?.id
    )
    productHook.methods.onInventoryManualValidare(
      [
        productInfo?.inventoryConfig?.type === 'manual' &&
        !!productInfo?.inventoryConfig?.manual?.value?.trim(),
      ].includes(true),
    )
    if (
      (productInfo.inventory && +shippingInfo.shippingPartner.id === 0) ||
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
        if(+item.id === +shippingInfo.shippingPartner.id) {
          shippingHook.methods.handleCargoInsurranceValidate(true, index)
        }
      })
      validateStatus = 1
    }

    if ((+activeShippingPartner?.config?.packageQuantity === 0 || !!!activeShippingPartner?.config?.packageQuantity)
      && !state?.form?.shippingInfo?.isStorePickUp && +state?.form?.shippingInfo?.shippingPartner?.id === 1) {
      shippingInfo.shippingPartner.list.map((item,index) => {
        if(+item.id === +shippingInfo.shippingPartner.id) {
          shippingHook.methods.handleValidatePackageQuantity(true, index)
        }
      })
      validateStatus = 1
    }

    if(+activeShippingPartner?.id === 4 && +(replaceAllCustom(activeShippingPartner?.config?.cargoInsurrance?.value, ',' ,'').replace('₫', '')) < 5000) {
      validateStatus = 1
    }

    return validateStatus
  }

  const [debounceSubmitEditOrder, setDebounceSubmitEditOrder] = useState(true)
  const handleSubmit = async opt => {
    if(debounceSubmitEditOrder) {
      setDebounceSubmitEditOrder(false)
      setTimeout(() => setDebounceSubmitEditOrder(true), 2000)

      if(+submitQueries.total_amount > 2000000000) {
        toast.error('Tổng giá trị đơn hàng chỉ được phép tối đa 2 tỷ!')
      } else {
        //--UV-837
        if((!productInfo?.inventory && productInfo?.inventoryConfig?.type === 'auto' && productInfo?.inventoryConfig?.auto?.selected?.length === 0)
          || (productInfo?.inventory && productInfo?.withInventoryConfig?.search?.selected?.length === 0)) {
          dispatch({type: orderSingleAction.VALIDATE_EMPTY_PRODUCT_FORM_WITH_INVENTORY_PRICE, payload: true})
        }
        //--
        validateForm()
        if(+opt?.is_draft === 1 && canSaveDraft
          && !((+activeShippingPartner?.config?.cargoInsurrance?.value === 0 || !!!activeShippingPartner?.config?.cargoInsurrance?.value) && +state?.form?.shippingInfo?.shippingPartner?.id === 2)) {
          const response = await sendRequestAuth(
            'post',
            `${config.API}/order/update-draft/${idOrder}`, JSON.stringify(submitQueries),
          ).catch(() => toast.error('Lưu nháp thất bại!'))
          if(response?.data?.code === 2080 || response?.data?.success) {
            navigate('/orders')
            toast.success(`Cập nhật thông tin đơn hàng thành công.`)
            dispatch({type: 'UPDATE_LOADING', payload: false})
          } else {
            dispatch({type: 'UPDATE_LOADING', payload: false})
            return response
          }
        }
        else if (+opt?.is_delivery === 1 && canSaveDraft && +state.shipping_status.value === 21 && +validateForm() === 0) {
          submitQueries.is_draft = 0
          submitQueries.is_delivery = 1
          dispatch({type: 'UPDATE_LOADING', payload: true})
          const response = await sendRequestAuth(
            'post',
            `${config.API}/order/update-draft/${idOrder}`,
            JSON.stringify({...submitQueries, ...opt}),
          ).catch(() => toast.error('Lưu nháp thất bại!'))

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
          if (!!response?.data) {
            dispatch({type: 'UPDATE_LOADING', payload: false})
            return response
          } else if (response?.errors?.code === 2096) {
            dispatch({type: 'UPDATE_LOADING', payload: false})
            toast.error(response?.errors?.message)
          }
        }
        else if (+opt?.is_delivery === 1 && canSaveOrder && +validateForm() === 0) {
          // Nếu là đơn giao hàng bỏ payment và is_draft
          if(+opt?.is_delivery === 1) {
            delete submitQueries.payment
            delete submitQueries.is_draft
            submitQueries.is_delivery = 1
          }

          dispatch({type: 'UPDATE_LOADING', payload: true})
          const response = await sendRequestAuth(
            'post',
            `${config.API}/order/update/${idOrder}`,
            JSON.stringify({...submitQueries, ...opt}),
          )
          if (!!response?.data) {
            dispatch({type: 'UPDATE_LOADING', payload: false})
            return response
          } else if (response?.errors?.code === 2096) {
            dispatch({type: 'UPDATE_LOADING', payload: false})
            toast.error(response?.errors?.message)
          } else {
            toast.error(response?.error_message)
          }
        }
        // else return false
      }
    }
  }

  const collectMoney = shippingInfo?.collectMoney
  const submitQueries = {
    // account login id
    id_sender: extraInfo?.shippingPoint?.value?.value || null,
    // customer info
    customers: {
      customer_id: customerInfo.phone.detail?.id || '',
      customer_mobile: customerInfo.phone.value || '',
      customer_name: customerInfo.fullName.value || '',
      customer_address: customerInfo.address.value || '',
      city_id: transformMoneyToSendRequest((!!!customerInfo.address.province.value?.id ? customerInfo.address.province.value?.value : customerInfo.address.province.value?.id)  || 0),
      district_id: transformMoneyToSendRequest((!!!customerInfo.address.district.value?.id ? customerInfo.address.district.value?.value : customerInfo.address.district.value?.id) || 0),
      ward_id: transformMoneyToSendRequest((!!!customerInfo.address.ward.value?.id ? customerInfo.address.ward.value?.value : customerInfo.address.ward.value?.id) || 0),
    },
    // product info
    details:
      !!productInfo?.inventory || productInfo?.inventoryConfig?.type === 'auto'
        ? ''
        : productInfo?.inventoryConfig?.manual?.value || '',
    type_price: !!productInfo?.inventory
      ? productInfo.withInventoryConfig.priceType.value?.value || ''
      : '', // inventory pending
    item_details: productInfo.inventory
      ? ArrayUtils.getQualifiedArray(
        productInfo?.withInventoryConfig?.search?.selected,
      ).map(item => ({
        product_id: transformMoneyToSendRequest(item?.data?.product_id || 0),
        product_id_details: transformMoneyToSendRequest(item?.data?.id || 0),
        product_name: ( item?.data?.product_name || ''),
        product_model: ( item?.data?.sku || ''),
        price: transformMoneyToSendRequest(item?.price || 0), // inventory pending
        total_price: !!item?.discountType && +item?.discount > 0 ?
          transformMoneyToSendRequest(item?.discountType === 'đ'
            ? Number(+item?.price * item?.quantity - +item?.discount || 0)
            : (Number(+item?.price * (1 - +item?.discount / 100) * +item?.quantity || 0)))
          : Number(+item?.price * item?.quantity)
        ,
        discount:
          item?.discountType === 'đ'
            ? Number(item?.discount || 0)
            : (Number(item?.discount_value || 0) * Number(item?.price || 0) * +item?.quantity) / 100,
        discount_type: transformMoneyToSendRequest((item?.discountType === '%' ? 2 : 1) || 1),
        discount_value: transformMoneyToSendRequest(item?.discount_value || 0),
        quantity: item?.quantity || 0,
      }))
      : productInfo?.inventoryConfig?.type === 'manual'
        ? []
        : ArrayUtils.getQualifiedArray(
          productInfo?.inventoryConfig?.auto?.selected,
        ).map(item => ({
          product_id: transformMoneyToSendRequest(item?.data?.product_id || 0),
          product_id_details: transformMoneyToSendRequest(item?.data?.id || 0),
          product_name: ( item?.data?.product_name || ''),
          product_model: ( item?.data?.sku || ''),
          price: transformMoneyToSendRequest(item?.data?.price || 0), // inventory pending
          total_price: transformMoneyToSendRequest(item?.data?.price || 0), // inventory pending
          discount: transformMoneyToSendRequest(item?.discount || 0),
          discount_type: transformMoneyToSendRequest((item?.discountType === '%' ? 2 : 1) || 1),
          discount_value: transformMoneyToSendRequest(item?.discount_value || 0),
          quantity: item?.quantity || 0,
        })),
    // shipping info
    shipping: !shippingInfo?.isStorePickUp
      ? {
        cod: collectMoney ? collectMoney?.replaceAll(',','') : 0,
        weight: transformMoneyToSendRequest(shippingInfo?.weight || 0),
        width: transformMoneyToSendRequest(shippingInfo?.size?.width || 0),
        height: transformMoneyToSendRequest(shippingInfo?.size?.height || 0),
        lengh: transformMoneyToSendRequest(shippingInfo?.size?.longs || 0),
        note: shippingInfo?.deliveryNote?.content || '',
      }
      : '',
    ship_fee_custom: extraInfo.shipFeeCustom.value,
    shipping_partner:
      !shippingInfo?.isStorePickUp && !!activeShippingPartner
        ? {
          partner_ship: shippingInfo?.shippingPartner?.id,
          serviceID:
            shippingInfo.shippingPartner?.service?.length > 0
              ? shippingInfo?.shippingPartner?.service?.find(
              item => +item.partnerId === +shippingInfo?.shippingPartner?.id,
            )?.serviceId || ''
              : '',
          sub_service: shippingInfo?.shippingPartner?.subService?.subServiceId,
          is_insurrance: activeShippingPartner?.config?.cargoInsurrance?.active
            ? 1
            : 0,
          insurrance_value: transformMoneyToSendRequest(replaceAllCustom(activeShippingPartner?.config?.cargoInsurrance?.value, ',' ,'').replace('₫', '') || 0),

          payer: !!activeShippingPartner?.config?.payer
            ? activeShippingPartner?.config?.payer?.find(
              item => item.checked === true,
            )?.value
            : '',
          recipient_view: !!activeShippingPartner?.config?.request
            ? activeShippingPartner?.config?.request?.find(
              item => item.checked === true,
            )?.value
            : '',
          request_goods: !!activeShippingPartner?.config?.request_goods
            ? activeShippingPartner?.config?.request_goods?.find(
              item => item.checked === true,
            )?.value
            : '',
          pick_date: activeShippingPartner?.config?.pick_date || '',
          pick_shift: !!activeShippingPartner?.config?.pick_shift
            ? activeShippingPartner?.config?.pick_shift?.find(
              item => item.checked === true,
            )?.value
            : '',
          transport: !!activeShippingPartner?.config?.transport
            ? activeShippingPartner?.config?.transport?.find(
              item => item.checked === true,
            )?.value
            : '',
          partsign: activeShippingPartner?.config?.partsign ? 1 : 0,
          number_pack: activeShippingPartner?.config?.packageQuantity || '',
        }
        : '',
    // extra info
    warehouse_id: productInfo.inventory
      ? productInfo.withInventoryConfig.warehouse.value?.value || ''
      : '',
    order_origin_id: extraInfo?.source?.value?.value || '',
    order_code_of_shop: extraInfo?.uniqueOrderNumber?.value || '',
    order_note: extraInfo?.note?.value || '',
    // payment method
    payment: {
      payment_method_id:
        ['before', 'after'].includes(paymentMethod.type) &&
        !!paymentMethod?.method?.value?.data
          ? paymentMethod?.method?.value?.data?.id : '',
      payment_type: ['before', 'cod', 'after'].findIndex(
        item => item === paymentMethod?.type,
      ),
      payment_money: ['before', 'after'].includes(paymentMethod.type) && !!paymentMethod?.method?.value?.data
                    ? transformMoneyToSendRequest(paymentMethod?.money?.value || 0) : '',
      payment_date: paymentMethod?.dateTime?.formatValue
        ? convertDateTimeToApiFormat(paymentMethod?.dateTime?.formatValue)
        : '',
    },
    total_amount: state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%'
      ? tmpPrice - tmpDiscount - orderDiscount
      : tmpPrice - tmpDiscount - orderDiscount - +transformMoneyToSendRequest(state?.form?.productInfo?.withInventoryConfig?.discount?.value),
    total_discount: tmpDiscount + orderDiscount,
    order_discount_type: state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%' ? 2: 1,
    order_discount_value: state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%'
      ? state?.form?.productInfo?.withInventoryConfig?.discount?.value || 0
      : transformMoneyToSendRequest(state?.form?.productInfo?.withInventoryConfig?.discount?.value),
    order_discount: state?.form?.productInfo?.withInventoryConfig?.discount?.type === '%'
                    ? tmpDiscount : transformMoneyToSendRequest(state?.form?.productInfo?.withInventoryConfig?.discount?.value),
    // submit
    is_delivery: state.shipping_status.value === '1' || state.shipping_status.value === '8' ? 1 : 0,
    is_draft: state.shipping_status.value === '21' ? 1 : 0,
  }

  const handleFetchCustomerReport = async phone => {
    if (phone !== null) {
      const response = await sendRequestAuth(
        'get',
        `${config.API}/order/customer/report/detail?phone=${phone}`,
      )
      if (response?.data?.success)
        dispatch({
          type: orderSingleAction.FORM_PHONE_REPORT_UPDATE,
          payload: {list: ArrayUtils.getQualifiedArray(response?.data?.data)},
        })
    } else
      dispatch({
        type: orderSingleAction.FORM_PHONE_REPORT_UPDATE,
        payload: {list: []},
      })
  }

  const handleFetchCustomerOrderFigure = async id => {
    if (!id) return

    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/order-total-list/${id}`,
    )
    if (response?.data?.success) {
      dispatch({
        type: orderSingleAction.FORM_PHONE_ORDER_FIGURE_UPDATE,
        payload: {
          figures: ArrayUtils.getQualifiedArray(response?.data?.data),
        },
      })
    }
    return response
  }

  const handleFetchCustomerDetail = async id => {
    if (!!!id) return

    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/detail/${id}`,
    )
    if (response?.data?.success) {
      dispatch({
        type: orderSingleAction.FORM_PHONE_DETAIL_UPDATE,
        payload: {detail: response?.data?.data},
      })
    }
  }

  const handleFetchCustomerOrder = async id => {
    if (!!!id) return
    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/order-list/${id}?keyword=&start_date=&end_date=&shipping_status_id=&per_page=50&start=0`,
    )
    if (response?.data?.success) {
      dispatch({
        type: orderSingleAction.FORM_PHONE_ORDER_RECENT_UPDATE,
        payload: {
          recentList: ArrayUtils.getQualifiedArray(response?.data?.data),
        },
      })
    }
  }

  return {
    form: state.form,
    loading: state.loading,
    productInfo,
    shippingInfo,
    functions: {
      onFetchDetail: handleFetchDetail,
      onSubmit: handleSubmit,
    },
    properties: {
      canSaveDraft,
      canSaveOrder,
      skeleton,
    },
    value: {
      fullNameCreate
    },
    shippingStatus: state.shipping_status
  }
};

export default useEditOrderSingle;