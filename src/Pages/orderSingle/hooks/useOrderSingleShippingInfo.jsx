import {useCallback, useContext, useState} from 'react'
import { orderSingleAction } from '../provider/_actions'
import { OrderSingleContext } from '../provider/_context'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import { ORDER_SINGLE_CONSTANTS } from '../interface/_constants'
import { fNumber } from '../../../util/formatNumber'
import {transformMoneyToSendRequest, transformShippingConfigData} from '../utils/transform'
import { debounce } from '@mui/material'
import { replaceAllCustom } from '../../../util/functionUtil'
import {useParams} from "react-router-dom";

const useOrderSingleShippingInfo = () => {
  const { orderId } = useParams()
  const { state, dispatch } = useContext(OrderSingleContext)
  const { shippingInfo } = state.form
  const { productInfo } = state.form
  const { paymentMethod } = state.form
  const listPartner = state.form.shippingInfo.shippingPartner.list
  const addressInfo = state.form.customerInfo.address
  const totalDiscount = state?.form?.productInfo?.withInventoryConfig?.discount
  
  const getShippingPartner = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/shipping/partner-delivery`,
    )
    if (!!response?.data?.success) {
      const transformData = response?.data?.data.map(item =>
        transformShippingConfigData(
          item,
          ORDER_SINGLE_CONSTANTS.form.shippingInfo[`${item.id}`],
           item?.shipping_config
        ))
      let listPartner = transformData.filter(item => {
        if (item.is_default && !!!state?.shipping_status?.value) {
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

      if(response?.data?.data?.length === 1 || !!!response?.data?.data?.find(item => +item.is_default !== 0)) {
        listPartner = transformData.map(item => {
          dispatch({type: orderSingleAction.UPDATE_SHIPPING_PARTNER_INFO, payload: {id: '1'}})
          dispatch({type: orderSingleAction.SET_SHIPPING_PARTNER_DEFAULT, payload: '1'})
          dispatch({type: orderSingleAction.UPDATE_SHIPPING_PARTNER_SELECTED, payload: '1'})
          dispatch({type: orderSingleAction.SET_COLLAPSE_SHIPING, payload: ['1']})

          if(response?.data?.data?.length === 1 && response?.data?.data[0]?.shipping_config?.length !== undefined) {
            item.shipping_config = {
              bg_cod: 0,
              hidden_phone: 1,
              partsign: 0,
              payer: 3,
              request: 2,
              request_goods: 1,
            }
            item.config = {
              cargoInsurrance: {active: false, value: ''},
              packageQuantity: 1,
              partsign: false,
              payer: [
                {value: 1, label: 'Người nhận', checked: false},
                {value: 2, label: 'Người gửi', checked: false},
                {value: 3, label: 'Người gửi cuối tháng trả phí', checked: true}
              ],
              request: [
                {value: 1, label: 'Cho khách xem hàng', checked: false},
                {value: 2, label: 'Không cho khách xem hàng', checked: true}
              ],
              request_goods: [
                {value: 1, label: 'Đến lấy hàng tại nhà', checked: true},
                {value: 6, label: 'Gửi tại bưu cục', checked: false}
              ],
            }
          }
          return item
        })
      }
      dispatch({
        type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
        payload: {
          list: listPartner,
          listOrigin: listPartner,
        },
      })
    }
    dispatch({ type: 'UPDATE_LOADING', payload: false })
    dispatch({ type: 'UPDATE_SKELETON', payload: false })
  }

  const fetchSomeData = async (params, opt = {}) => {  // A Cường thêm logic
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
        prt.config = opt?.listPartner?.list?.length > 0 ? opt?.listPartner?.list[i]?.config : state.form.shippingInfo.shippingPartner.list[i]?.config  // A Cường thêm logic
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
    // ...
  }
  const getFeeShipping = (data, opt) => {
    // dispatch({ type: 'UPDATE_SKELETON', payload: true })
    if(state.form.shippingInfo.shippingPartner.listOrigin.length > 0 || !!state.shipping_status.value) {
      fetchSomeData({
        partner: state.form.shippingInfo.shippingPartner.listOrigin.map(item => item.id),
        idSender: state.form.extraInfo.shippingPoint.value?.value,
        wardId: data?.value || addressInfo.ward.value?.value,
        districtId: addressInfo.district?.value?.value,
        cityId: addressInfo.province.value?.value,
        weight: state.form.shippingInfo.weight,
        codAmount: 0,
        isInsurrance: state.form.shippingInfo.shippingPartner.cargoInsurrance?.value ? 1 : 0,
        insurranceValue: state.form.shippingInfo.shippingPartner.cargoInsurrance?.value || 0,
        ...opt?.queries,
      }, {listPartner : opt?.listPartner}) // A Cường thêm logic
    } else dispatch({ type: 'UPDATE_SKELETON', payload: false })

  }

  const getFeeShippingDetail = async (data, opt = {}) => {
    dispatch({ type: 'UPDATE_LOADING', payload: true })

    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/shipping/fee`,
      {
        partner_id: [data.id],
        id_sender: state.form.extraInfo.shippingPoint.value?.value,
        city_id: addressInfo.province.value?.value,
        district_id: addressInfo.district?.value?.value,
        ward_id: addressInfo.ward.value?.value,
        weight: state.form.shippingInfo.weight,
        cod_amount: 0,
        is_insurrance: state.form.shippingInfo.shippingPartner.cargoInsurrance?.value ? 1 : 0,
        insurrance_value: state.form.shippingInfo.shippingPartner.cargoInsurrance?.value || 0,
        service_id: data.serviceId
      },
    )

    if (!!response?.data?.success) {
      // update shippingPartner list
      let shippingPartner = state.form.shippingInfo.shippingPartner.list
      let resFee = response.data?.data[0] || []
      if (resFee?.services?.length > 0) {
        resFee.services.map((sv, i) => {
          if (sv.id == data.serviceId) {
            if (!!sv.fee) resFee.fee = sv.fee
            if (!!sv.time) resFee.time = sv.time
            else resFee.time = sv.name
          }
        })
      }

      shippingPartner.map((item, index) => {
        if (item.id == response.data?.data[0]?.id) shippingPartner[index] = {...shippingPartner[index],...resFee}
      })
      dispatch({
        type: orderSingleAction.UPDATE_SHIPPING_FEE,
        payload: {
          list: shippingPartner,
        },
      })
    }
    dispatch({ type: 'UPDATE_LOADING', payload: false })

  }
  const onResetShippingPartner = () => {
    if(state.form.shippingInfo.shippingPartner.list?.length < 1){
      dispatch({ type: 'UPDATE_LOADING', payload: true })
    }else{
      dispatch({ type: 'UPDATE_SKELETON', payload: true })
    }
    getShippingPartner()
    if(!!state.shipping_status.value) {
      getFeeShipping(addressInfo.ward.value, {
        queries: {
          cityId: +addressInfo.province.value?.id,
          districtId: +addressInfo.district.value?.id,
          wardId: +addressInfo.ward.value?.id,
          partner: state.form.shippingInfo.shippingPartner.list.map(item => item.id),
          insurranceValue: +(state?.form?.shippingInfo?.collectMoney.replace(',','')),
          isInsurrance: +(state?.form?.shippingInfo?.collectMoney.replace(',',''))  > 0 ? '1' : '0'
        },
      })
    } else if (addressInfo.ward.value?.id)
      getFeeShipping(addressInfo.ward.value, {
        queries: {
          districtId: addressInfo.district.value?.id,
          cityId: addressInfo.province.value?.value,
        },
      })
  }

  const getDeliveryNote = async (keyword = '') => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/setting/delivery-note/list?keyword=${keyword}&status=1&per_page=100&start=0`,
    )
    if (!!response?.data?.success) {
      dispatch({
        type: orderSingleAction.UPDATE_LIST_DELIVERY_NOTE,
        payload: response?.data?.data,
      })
      if(!!!state.form.shippingInfo.deliveryNote.content) {
        dispatch({
          type: orderSingleAction.UPDATE_SHIPPING_INFO,
          payload: {
            deliveryNote: {
              selected: 0,
              content: response?.data?.data.find(item => +item.is_default === 1)?.content,
            },
          },
        })
      }
    }
  }
  // ======================================================================================================
  // SHIPPING PARTNER MANUAL
  // ======================================================================================================

  const onChangeCollectMoney = money => {
    const value = money.length > 3 ? replaceAllCustom(money, ',','') : money
    if (!!productInfo.inventory) {
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
            transformMoneyToSendRequest((orderId ? selectedList[i]?.discount_value : selectedList[i]?.discount) || 0)) /
            100
        return p + itemDiscount
      }, 0)

      const tmpTotalDiscount = productInfo?.withInventoryConfig?.discount?.value?.length > 3 ? +replaceAllCustom(productInfo?.withInventoryConfig?.discount?.value, ',', '') : +productInfo?.withInventoryConfig?.discount?.value

      const orderDiscount = (productInfo?.withInventoryConfig?.discount?.type === '%' ?
        ((+tmpPrice - +tmpDiscount) * +tmpTotalDiscount / 100) :
        +tmpTotalDiscount) || 0

      const totalPayment = paymentMethod.money?.value?.length > 3 ? replaceAllCustom(paymentMethod.money?.value, ',', '') : Number(paymentMethod.money?.value || 0)

      const totalAmount = tmpPrice - tmpDiscount - orderDiscount - totalPayment
      dispatch({
        type: orderSingleAction.UPDATE_SHIPPING_INFO,
        payload: { collectMoney: +value > +totalAmount ? fNumber(totalAmount) : money },
      })
    } else{
      dispatch({
        type: orderSingleAction.UPDATE_SHIPPING_INFO,
        payload: {
          collectMoney: +value >= 1000000000 ? '99,999,999' : money,
        },
      })
    }

    dispatch({
      type: 'UPDATE_COLLECT_TRIGGER',
      payload: !state.triggerCollectDefault,
    })
  }


  const debounceFeeShipping = useCallback(debounce((weight, addressInfo, idSender, opt = {}) => { // A Cường thêm logic
      getFeeShipping(addressInfo.ward.value, {
        queries: {
          districtId: addressInfo.district.value?.id || addressInfo.district.value?.value,
          cityId: addressInfo.province.value?.id || addressInfo.province.value?.value,
          wardId: addressInfo.ward.value?.id || addressInfo.ward.value?.value,
          weight: weight,
          idSender: idSender
        },
        listPartner: opt?.listPartner || {} // A Cường thêm logic
      })
  }, 1000), [])

  const onChangeWeight = (weight, opt = {}) => { // A Cường thêm logic
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        weight: weight,
      },
    })
    handleWeightValidate(!weight)
    if(weight > 0) {
      const idSender = state?.form?.extraInfo?.shippingPoint?.value?.value
      debounceFeeShipping(weight, addressInfo, idSender, opt) // A Cường thêm logic
    }
  }

  const onChangeSizeHeight = height => {
    height = fNumber(height.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        size: {
          height: height,
        },
      },
    })

    if(state.form.shippingInfo.shippingPartner.id == 3){
      handleValidateHeight(height != 0)
    }
  }

  const onChangeSizeLongs = longs => {
    longs = fNumber(longs.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        size: {
          longs: longs,
        },
      },
    })
    if(state.form.shippingInfo.shippingPartner.id == 3){
      handleValidateLongs(longs != 0)
    }
  }

  const onChangeSizeWidth = width => {
    width = fNumber(width.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        size: {
          width: width,
        },
      },
    })

    if(state.form.shippingInfo.shippingPartner.id == 3){
      handleValidateWidth(width != 0)
    }
  }

  const handleValidateLongs = boo => {
    const longs = boo ? '' : (
      <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}
            >
              Kích thước không được để trống
            </span>
      </div>
    )

    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: longs,
          width: state.validate.size.width,
          height: state.validate.size.height,
        },
      },
    })
  }

  const handleValidateHeight = boo => {
    const height = boo ? '' : <>&nbsp;</>
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: state.validate.size.longs,
          width: state.validate.size.width,
          height: height,
        },
      },
    })
  }

  const handleValidateWidth = boo => {
    const width = boo ? '' : <>&nbsp;</>
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: state.validate.size.longs,
          width: width,
          height: state.validate.size.height,
        },
      },
    })
  }

  const onSetCollapseStatus = stt => {
    let collaps = []
    if (state.collapseStatus.includes(stt)) {
      collaps = state.collapseStatus.filter(item => item !== stt)
    } else collaps = [...state.collapseStatus, stt]
    dispatch({
      type: orderSingleAction.SET_COLLAPSE_SHIPING,
      payload: collaps,
    })
  }

  const debounceDeliveryNote = useCallback(debounce(async (search) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/setting/delivery-note/list?keyword=${search}&status=1&per_page=100&start=0`,
    )
    if (!!response?.data?.success) {
      dispatch({
        type: orderSingleAction.UPDATE_LIST_DELIVERY_NOTE,
        payload: response?.data?.data,
      })
    }
  }, 500), [])

  const [errorDeliveryNote, setErrorDeliveryNote] = useState(state?.form?.shippingInfo?.deliveryNote?.content?.length > 255)
  const onDeliveryNoteChange = async (e = '') => {
    const keyword = e
    const search = keyword.replace('/', '')
    debounceDeliveryNote(keyword.indexOf('/') === 0 ? search : '')
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        deliveryNote: {
          selected: 0,
          content: keyword,
        },
      },
    })

    e.length > 255 ? setErrorDeliveryNote(true) : setErrorDeliveryNote(false)
    dispatch({
      type: orderSingleAction.VALIDATE_EDIT_FORM_DELIVERY_NOTE,
      payload: {status: true, message: ''},
    })
  }

  const onShippingPartSelect = id => {
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_PARTNER_SELECTED,
      payload: id,
    })
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_PARTNER_INFO,
      payload: {
        id: id,
      },
    })
    dispatch({
      type: orderSingleAction.SET_COLLAPSE_SHIPING,
      payload: [id],
    })
    // check validate size  partner
    let longs,
      width,
      height = ''
    if (id == 3) {
      //3 is id Giao hang nhanh
      if (
        !state.form.shippingInfo.size.longs ||
        state.form.shippingInfo.size.longs == 0
      )
        longs = shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.lengh ? '' : (
          <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}
            >
              Kích thước không được để trống
            </span>
          </div>
        )
      if (
        !state.form.shippingInfo.size.width ||
        state.form.shippingInfo.size.width == 0
      )
        width = shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.width ? '' : (<>&nbsp;</>)
      if (
        !state.form.shippingInfo.size.height ||
        state.form.shippingInfo.size.height == 0
      )
        height = shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.height ? '' : (<>&nbsp;</>)
        dispatch({
          type: orderSingleAction.UPDATE_SHIPPING_INFO,
          payload: {
            size: {
              width: shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.width || 0,
              longs: shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.lengh || 0,
              height: shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.height || 0
            },
          },
        })
    }
    if (id == 2 && !!state?.form?.productInfo?.inventory) {

      //giao hàng tiết kiệm

      const selectedList = state?.form?.productInfo?.withInventoryConfig?.search?.selected
      const typePrice = state?.form?.productInfo?.withInventoryConfig?.priceType?.value

      selectedList?.map(item => {
        item.price = typePrice?.value === 2 ? item?.data?.wholesale_price : item?.data?.price
      })
      const tmpPrice = selectedList.reduce((p, n, i) => {
        const itemPrice =
          transformMoneyToSendRequest(selectedList[i]?.price || 0) *
          transformMoneyToSendRequest(selectedList[i]?.quantity || 0)
        const itemDiscount = itemPrice - (
          selectedList[i]?.discount_type === '%'
            ? !!state?.shipping_status?.value
              ? itemPrice * (+selectedList[i]?.discount_value / 100 || 0)
              : itemPrice * (+selectedList[i]?.discount / 100 || 0)
            : (selectedList[i]?.discount || 0)
        )
        return p + itemDiscount
      }, 0)

      listPartner[id-1].config.cargoInsurrance.value = fNumber(tmpPrice)
      listPartner[id-1].config.cargoInsurrance.active = true

      dispatch({
        type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
        payload: {
          list: listPartner,
        },
      })
      let validateShippingPartner = state.validate.shippingPartner || []
      validateShippingPartner[id-1].cargoInsurrance = ''
      dispatch({
        type: orderSingleAction.SET_VALIDATE_SHIPPING_PARTNER,
        payload: validateShippingPartner,
      })

    }
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: longs,
          width: width,
          height: height,
        },
      },
    })
    // handleCargoInsurranceValidate(+result === 0, listPartner?.findIndex(it => +it.id === +id) || 0)
  }

  const handleWeightValidate = (boo) => {
    const weight = (
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}>
          Trọng lượng không được để trống
        </span>
      </div>
    )
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        weight: !!boo ? weight : '',
      },
    })
  }

  const handleCargoInsurranceValidate = (boo,position) => {
     const cargoInsurrance =  boo ? (
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}>
            Giá trị bảo hiểm cần > 0
          </span>
        </div>
      ) : ''
    let validateShippingPartner = state.validate.shippingPartner || []
    if(!!!validateShippingPartner[position]) validateShippingPartner[position]={}
    validateShippingPartner[position].cargoInsurrance = cargoInsurrance
    dispatch({
      type: orderSingleAction.SET_VALIDATE_SHIPPING_PARTNER,
      payload: validateShippingPartner,
    })
  }

  const onPayerSelect = (id,position) => {
    
    listPartner[position]?.config?.payer.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }

  const onRequestDelivery = (id,position) => {
    
    listPartner[position]?.config?.request.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }
  const onDeliveryMethod = (id,position) => {
    
    listPartner[position]?.config?.transport.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }
  const onChangePickupShift = (data,position) => {
    listPartner[position]?.config?.pick_shift.map(rq => {rq.value == data ? rq.checked = true : rq.checked = false})
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }

  const onRequestPickUp = (id,position) => {
    
    listPartner[position]?.config?.request_goods.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }
  const onChangePartSign = (position) => {
    
    listPartner[position].config.partsign = !listPartner[position]?.config?.partsign
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }

  const onChangeCargoInsurrance = (value,position) => {
    const selectedList = state?.form?.productInfo?.withInventoryConfig?.search?.selected
    const typePrice = state?.form?.productInfo?.withInventoryConfig?.priceType?.value

    selectedList?.map(item => {
      item.price = typePrice?.value === 2 ? item?.data?.wholesale_price : item?.data?.price
    })

    const tmpPrice = selectedList.reduce((p, n, i) => {
      const itemPrice =
        transformMoneyToSendRequest(selectedList[i]?.price || 0) *
        transformMoneyToSendRequest(selectedList[i]?.quantity || 0)
      const itemDiscount = itemPrice - (
        selectedList[i]?.discountType === '%'
          ? !!state?.shipping_status?.value
            ? itemPrice * (+selectedList[i]?.discount_value / 100 || 0)
            : itemPrice * (+selectedList[i]?.discount / 100 || 0)
          : (selectedList[i]?.discount || 0)
      )
      return p + itemDiscount
    }, 0)

    const result = totalDiscount?.type === '%'
      ? Math.floor(+tmpPrice - (+tmpPrice * transformMoneyToSendRequest(totalDiscount?.value) / 100))
      : Math.floor(+tmpPrice - transformMoneyToSendRequest(totalDiscount?.value))

    listPartner[position].config.cargoInsurrance.active = value
    listPartner[position].config.cargoInsurrance.value = value ? fNumber(result) : '0'

    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }
  const setValueCargoInsurrance = (value,position) => {

    value = value?.length > 3 ? replaceAllCustom(value,',', '') : value
    if(value > 100000000) value = 99999999

    listPartner[position].config.cargoInsurrance.value = fNumber(value)
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
    handleCargoInsurranceValidate(value == 0 ? true : false , position)
  }
  const setValuePackageQuantity = (value,position) => {
    value = value = value?.length > 3 ? replaceAllCustom(value,',', '') : value
    if(value > 10000) value = 9999
    
    listPartner[position].config.packageQuantity = fNumber(value)
    dispatch({
      type: orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
    handleValidatePackageQuantity((value == '' || fNumber(value) == 0) ? true : false,position)
  }

  const handleValidatePackageQuantity = (boo,position) => {
    const PackageQuantity =  boo ? (
      <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}>
            Số kiện hàng cần > 0
          </span>
      </div>
    ) : ''
    let validateShippingPartner = state.validate.shippingPartner || []
    if(!!!validateShippingPartner[position]) validateShippingPartner[position]={}
    validateShippingPartner[position].PackageQuantity = PackageQuantity
    dispatch({
      type: orderSingleAction.SET_VALIDATE_SHIPPING_PARTNER,
      payload: validateShippingPartner,
    })
  }

  const handleDateTimeChange = data =>
    dispatch({
      type: orderSingleAction.FORM_SHIPPING_DATETIME_UPDATE,
      payload: { ...data },
    })
  const handleSetServices = (data, opt = {}) => {
    let services = state.form.shippingInfo.shippingPartner.service
    services.map((sv, i) => {
      if (sv.partnerId && sv.partnerId == opt?.partnerId) {
        services[i] = { serviceId: data.id, name: data.name, partnerId: opt?.partnerId }
      }
    })
    dispatch({
      type: orderSingleAction.SET_SHIPPING_SERVICE,
      payload: services,
    })
    getFeeShippingDetail({ id: opt?.partnerId, serviceId: data.id })
  }

  const handlePickUpStoreToggle = () => {
    // If received at the pants, the payment method auto check "Pay later"
    dispatch({
      type: orderSingleAction.FORM_PAYMENT_METHOD_TYPE_UPDATE,
      payload: {type: !state.form.shippingInfo.isStorePickUp ? 'after' : 'cod'},
    })

    dispatch({ type: orderSingleAction.UPDATE_SHIPPING_INFO_PICK_UP_STORE })
  }

  return {
    data: shippingInfo,
    methods: {
      //call api
      origin: getShippingPartner,
      getDeliveryNote: getDeliveryNote,
      getFeeShipping: getFeeShipping,
      // logic handle
      onShippingPartSelect: onShippingPartSelect,
      onPayerSelect: onPayerSelect,
      onRequestDelivery: onRequestDelivery,
      onDeliveryMethod: onDeliveryMethod,
      onChangePickupShift: onChangePickupShift,
      onRequestPickUp: onRequestPickUp,
      onChangePartSign: onChangePartSign,
      onChangeCargoInsurrance: onChangeCargoInsurrance,
      setValueCargoInsurrance: setValueCargoInsurrance,
      setValuePackageQuantity: setValuePackageQuantity,
      onDeliveryNoteChange: onDeliveryNoteChange,
      onChangeCollectMoney: onChangeCollectMoney,
      onChangeWeight: onChangeWeight,
      onChangeSizeHeight: onChangeSizeHeight,
      onChangeSizeLongs: onChangeSizeLongs,
      onChangeSizeWidth: onChangeSizeWidth,
      onSetCollapseStatus: onSetCollapseStatus,
      onResetShippingPartner: onResetShippingPartner,
      handleDateTimeChange: handleDateTimeChange,
      handleSetServices: handleSetServices,
      onPickUpStoreToggle: handlePickUpStoreToggle,
      onChangeServices: getFeeShippingDetail,
      //validate
      handleWeightValidate: handleWeightValidate,
      handleCargoInsurranceValidate,
      handleValidatePackageQuantity,
      errorDeliveryNote,
    },
  }
}

export default useOrderSingleShippingInfo
