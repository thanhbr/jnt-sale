import {useCallback, useContext, useState} from 'react'
import { facebookConversationActions } from '../provider/_actions'
import {FacebookConversationContext} from '../provider/_context'
import { FACEBOOK_CONSTANTS } from '../../../interfaces/_constants'
import { fNumber } from '../../../../../util/formatNumber'
import {transformMoneyToSendRequest, transformShippingConfigData} from '../../../../orderSingle/utils/transform'
import { debounce } from '@mui/material'
import {formatMoney, replaceAllCustom} from "../../../../../util/functionUtil";
import config from "../../../../../config";
import {sendRequestAuth} from "../../../../../api/api";

const useFacebookOrderShippingInfo = () => {
  const { state, dispatch } = useContext(FacebookConversationContext)
  const {customerInfor , shippingInfo, productInfo} = state.detail
  const customerInfo = customerInfor
  const listPartner = state.detail.shippingInfo.shippingPartner.list

  const getShippingPartner = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/shipping/partner-delivery`,
    )
    if (!!response?.data?.success) {
      const transformData =  response?.data?.data.map(item =>
        transformShippingConfigData(
          item,
          FACEBOOK_CONSTANTS.shippingInfo[`${item.id}`],
           item?.shipping_config
        ))

      const listPartner = transformData.filter(item => {
        if (item.is_default) {
          dispatch({
            type: facebookConversationActions.UPDATE_SHIPPING_PARTNER_INFO,
            payload: {
              id: item.id,
            },
          })
          dispatch({
            type: facebookConversationActions.SET_SHIPPING_PARTNER_DEFAULT,
            payload: item.id,
          })
          dispatch({
            type: facebookConversationActions.UPDATE_SHIPPING_PARTNER_SELECTED,
            payload: item.id,
          })
          dispatch({
            type: facebookConversationActions.SET_COLLAPSE_SHIPING,
            payload: [item.id],
          })
        }
        return !!item.connected
      })
      dispatch({
        type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
        payload: {
          list: listPartner,
          listOrigin: listPartner,
        },
      })
    }
    // dispatch({ type: 'UPDATE_LOADING', payload: false })
    dispatch({ type: 'UPDATE_LOADING_FEE', payload: false })
  }

  const fetchSomeData = async params => {
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
      let services = state.detail.shippingInfo.shippingPartner.service
      let partner = response?.data?.data
      partner.map((prt,i) => {
        services = [...services, {
          serviceId: prt?.services ? prt?.services[0]?.id : 0,
          name: prt?.services ? prt?.services[0]?.name : '',
          partnerId: prt?.id || 0
        }]
        prt.config = state.detail.shippingInfo.shippingPartner.list[i].config
      })
      dispatch({
        type: facebookConversationActions.UPDATE_LIST_SHIPPING_FEE,
        payload: {
          list: partner,
        },
      })
      dispatch({
        type: facebookConversationActions.SET_SHIPPING_SERVICE,
        payload: services,
      })
      dispatch({ type: 'UPDATE_LOADING_FEE', payload: false })
    }
    // ...
  }
  const getFeeShipping = (data, opt) => {
    dispatch({ type: 'UPDATE_LOADING_FEE', payload: true })
    if(shippingInfo.shippingPartner.listOrigin.length > 0 || !!state?.shipping_status?.value) {
      fetchSomeData({
        partner: shippingInfo.shippingPartner.list.map(item => item.id),
        idSender: shippingInfo.shippingPoint.value?.value,
        wardId: data?.value || customerInfo.list.ward_id,
        districtId: customerInfo.list.district_id,
        cityId: customerInfo.list.city_id,
        weight: shippingInfo?.weight,
        codAmount: shippingInfo?.cod,
        isInsurrance: shippingInfo.shippingPartner?.cargoInsurrance?.value ? 1 : 0,
        insurranceValue: shippingInfo.shippingPartner?.cargoInsurrance?.value || 0,
        ...opt?.queries,
      })
    } else dispatch({ type: 'UPDATE_LOADING_FEE', payload: false })

  }

  const getFeeShippingDetail = async (data, opt = {}) => {
    // dispatch({ type: 'UPDATE_LOADING', payload: true })
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/shipping/fee`,
      {
        partner_id: [data.id],
        id_sender: shippingInfo.shippingPoint.value?.value,
        city_id: customerInfo.list.city_id,
        district_id: customerInfo.list.district_id,
        ward_id: customerInfo.list.ward_id,
        weight: shippingInfo.weight,
        cod_amount: 0,
        is_insurrance: shippingInfo.shippingPartner.cargoInsurrance?.value ? 1 : 0,
        insurrance_value: shippingInfo.shippingPartner.cargoInsurrance?.value || 0,
        service_id: data.serviceId
      },
    )

    if (!!response?.data?.success) {
      // update shippingPartner list
      let shippingPartner = shippingInfo.shippingPartner.list
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
        type: facebookConversationActions.UPDATE_SHIPPING_FEE,
        payload: {
          list: shippingPartner,
        },
      })
    }
    // dispatch({ type: 'UPDATE_LOADING', payload: false })

  }
  const onResetShippingPartner = () => {
    if(shippingInfo.shippingPartner.list?.length < 1){
      dispatch({ type: 'UPDATE_LOADING', payload: true })
    }else{
      dispatch({ type: 'UPDATE_LOADING_FEE', payload: true })
    }
    getShippingPartner()
    if(!!state?.shipping_status?.value) {
      getFeeShipping(customerInfo.ward.value, {
        queries: {
          cityId: +customerInfo.list?.city_id,
          districtId: +customerInfo.list?.district_id,
          wardId: +customerInfo.list?.ward_id,
          partner: state.detail.shippingInfo.shippingPartner.list.map(item => item.id),
          insurranceValue: +(state?.detail?.shippingInfo?.cod.replace(',','')),
          isInsurrance: +(state?.detail?.shippingInfo?.cod.replace(',',''))  > 0 ? '1' : '0'
        },
      })
    } else if (customerInfo.list?.ward_id)
      getFeeShipping(customerInfo.list?.ward_id, {
        queries: {
          districtId: customerInfo.list?.district_id,
          cityId: customerInfo.list?.city_id,
        },
      })
  }

  // ======================================================================================================
  // SHIPPING PARTNER MANUAL
  // ======================================================================================================

  const onChangeCod = money => {
    money = fNumber(money.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_INFO,
      payload: {
        cod: money,
      },
    })
  }


  const debounceFeeShipping = useCallback(debounce((weight, addressInfo, idSender) => {
      getFeeShipping(addressInfo.ward.value, {
        queries: {
          districtId: addressInfo.district.value?.id || addressInfo.district.value?.value,
          cityId: addressInfo.province.value?.id || addressInfo.province.value?.value,
          wardId: addressInfo.ward.value?.id || addressInfo.ward.value?.value,
          weight: weight,
          idSender: idSender
        }}
      )
  }, 1000), [])

  const onChangeWeight = weight => {

    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_INFO,
      payload: {
        weight: weight,
      },
    })
    handleWeightValidate(!weight)
    if(weight > 0) {
      const idSender = shippingInfo.shippingPoint?.value?.value
      debounceFeeShipping(weight, customerInfo, idSender)
    }
  }

  const onChangeSizeHeight = height => {
    height = fNumber(height.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_INFO,
      payload: {
        size: {
          height: height,
        },
      },
    })

    if(shippingInfo.shippingPartner.id == 3){
      handleValidateHeight(height != 0)
    }
  }

  const onChangeSizeLongs = longs => {
    longs = fNumber(longs.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_INFO,
      payload: {
        size: {
          longs: longs,
        },
      },
    })
    if(shippingInfo.shippingPartner.id == 3){
      handleValidateLongs(longs != 0)
    }
  }

  const onChangeSizeWidth = width => {
    width = fNumber(width.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_INFO,
      payload: {
        size: {
          width: width,
        },
      },
    })

    if(shippingInfo.shippingPartner.id == 3){
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
      type: facebookConversationActions.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: longs,
          width: state.validate.width,
          height: state.validate.height,
        },
      },
    })
  }

  const handleValidateHeight = boo => {
    const height = boo ? '' : <>&nbsp;</>
    dispatch({
      type: facebookConversationActions.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: state.validate.longs,
          width: state.validate.width,
          height: height,
        },
      },
    })
  }

  const handleValidateWidth = boo => {
    const width = boo ? '' : <>&nbsp;</>
    dispatch({
      type: facebookConversationActions.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: state.validate.longs,
          width: width,
          height: state.validate.height,
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
      type: facebookConversationActions.SET_COLLAPSE_SHIPING,
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
        type: facebookConversationActions.UPDATE_LIST_DELIVERY_NOTE,
        payload: response?.data?.data,
      })
    }
  }, 500), [])

  const [errorDeliveryNote, setErrorDeliveryNote] = useState(state?.detail?.shippingInfo?.deliveryNote?.content?.length > 255)
  const onDeliveryNoteChange = async (e = '') => {
    const keyword = e
    const search = keyword.replace('/', '')
    debounceDeliveryNote(keyword.indexOf('/') === 0 ? search : '')
    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_INFO,
      payload: {
        deliveryNote: {
          selected: 0,
          content: keyword,
        },
      },
    })

    e.length > 255 ? setErrorDeliveryNote(true) : setErrorDeliveryNote(false)
    dispatch({
      type: facebookConversationActions.VALIDATE_EDIT_FORM_DELIVERY_NOTE,
      payload: {status: true, message: ''},
    })
  }

  const onShippingPartSelect = id => {
    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_PARTNER_SELECTED,
      payload: id,
    })
    dispatch({
      type: facebookConversationActions.UPDATE_SHIPPING_PARTNER_INFO,
      payload: {
        id: id,
      },
    })
    dispatch({
      type: facebookConversationActions.SET_COLLAPSE_SHIPING,
      payload: [id],
    })
    // check validate size  partner
    let longs,
      width,
      height = ''
    if (id == 3) {
      //3 is id Giao hang nhanh
      if (
        !shippingInfo.longs ||
        shippingInfo.longs == 0
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
        !shippingInfo.width ||
        state.detail.shippingInfo.width == 0
      )
        width = shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.width ? '' : (<>&nbsp;</>)
      if (
        !shippingInfo.height ||
        shippingInfo.height == 0
      )
        height = shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.height ? '' : (<>&nbsp;</>)
        dispatch({
          type: facebookConversationActions.UPDATE_SHIPPING_INFO,
          payload: {
            size: {
              width: shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.width || 0,
              longs: shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.lengh || 0,
              height: shippingInfo.shippingPartner.list.find(item => item.id == id)?.config?.height || 0
            },
          },
        })
    }
    dispatch({
      type: facebookConversationActions.SET_VALIDATE_FORM,
      payload: {
        size: {
          longs: longs,
          width: width,
          height: height,
        },
      },
    })
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
      type: facebookConversationActions.SET_VALIDATE_FORM,
      payload: {
        weight: !!boo ? weight : '',
      },
    })
  }

  const handleCargoInsurranceValidate = (boo) => {
     const cargoInsurrance =  boo ? (
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}>
            Giá trị bảo hiểm cần > 0
          </span>
        </div>
      ) : ''
    dispatch({
      type: facebookConversationActions.SET_VALIDATE_INSURRANCE,
      payload: cargoInsurrance,
    })
  }

  const onPayerSelect = (id,position) => {

    listPartner[position]?.config?.payer.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }

  const onRequestDelivery = (id,position) => {

    listPartner[position]?.config?.request.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }
  const onDeliveryMethod = (id,position) => {

    listPartner[position]?.config?.transport.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }
  const onChangePickupShift = (data,position) => {
    listPartner[position]?.config?.pick_shift.map(rq => {rq.value == data ? rq.checked = true : rq.checked = false})
    dispatch({
      type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }

  const onRequestPickUp = (id,position) => {

    listPartner[position]?.config?.request_goods.map(rq => {rq.value == id ? rq.checked = true : rq.checked = false})
    dispatch({
      type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }
  const onChangePartSign = (position) => {

    listPartner[position].config.partsign = !listPartner[position]?.config?.partsign
    dispatch({
      type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
      payload: {
        list: listPartner,
      },
    })
  }

  const onChangeCargoInsurrance = (value) => {
    const selectedList = productInfo?.withInventoryConfig?.search?.selected
    const tmpPrice = selectedList.reduce((p, n, i) => {
      const itemPrice =
        transformMoneyToSendRequest(selectedList[i]?.price || 0) *
        transformMoneyToSendRequest(selectedList[i]?.quantity || 0)
      const itemDiscount = itemPrice - (
        selectedList[i]?.discount_type === '%'
          ? itemPrice * (+selectedList[i]?.discount / 100 || 0)
          : (selectedList[i]?.discount || 0)
      )
      return p + itemDiscount
    }, 0)
    shippingInfo.cargoInsurrance.active = value
    shippingInfo.cargoInsurrance.value = value && tmpPrice != 0 ? formatMoney(tmpPrice) : ''
    dispatch({
      type: facebookConversationActions.SHIPPING_INSURRANCE_UPDATE,
      payload: {
        active: value,
        value: value && tmpPrice != 0 ? formatMoney(tmpPrice) : ''
      },
    })
  }
  const [triggerDefault, setTriggerDefault] = useState(false)
  const setValueCargoInsurrance = (value) => {

    let tValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
    tValue = replaceAllCustom(tValue, ',','') >= 100000000 ? '99,999,999' : value
    shippingInfo.cargoInsurrance.value = value
    dispatch({
      type: facebookConversationActions.SHIPPING_INSURRANCE_UPDATE,
      payload: {
        value: value == '' ? value : tValue
      },
    })
    setTriggerDefault(!triggerDefault)
    handleCargoInsurranceValidate(tValue == 0 ? true : false)
  }
  const setValuePackageQuantity = (value,position) => {
    value = fNumber(value.toString().replace(/[^0-9]/g, ''))
    value = replaceAllCustom(value, ',','') > 10 ? 10 : value
    listPartner[position].config.packageQuantity = value
    dispatch({
      type: facebookConversationActions.UPDATE_LIST_SHIPPING_PARTNER,
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
      type: facebookConversationActions.SET_VALIDATE_SHIPPING_PARTNER,
      payload: validateShippingPartner,
    })
  }

  const handleDateTimeChange = data =>
    dispatch({
      type: facebookConversationActions.FORM_SHIPPING_DATETIME_UPDATE,
      payload: { ...data },
    })
  const handleSetServices = (data, opt = {}) => {
    let services = shippingInfo.shippingPartner.service
    services.map((sv, i) => {
      if (sv.partnerId && sv.partnerId == opt?.partnerId) {
        services[i] = { serviceId: data.id, name: data.name, partnerId: opt?.partnerId }
      }
    })
    dispatch({
      type: facebookConversationActions.SET_SHIPPING_SERVICE,
      payload: services,
    })
    getFeeShippingDetail({ id: opt?.partnerId, serviceId: data.id })
  }

  const handlePickUpStoreToggle = () => {
    // If received at the pants, the payment method auto check "Pay later"
    dispatch({
      type: facebookConversationActions.FORM_PAYMENT_METHOD_TYPE_UPDATE,
      payload: {type: !shippingInfo.isStorePickUp ? 'after' : 'cod'},
    })

    dispatch({ type: facebookConversationActions.UPDATE_SHIPPING_INFO_PICK_UP_STORE })
  }

  return {
    scope: {
      triggerDefault
    },
    collapseStatus: state?.collapseStatus,
    data: state,
    loading: state?.loadingFee || false,
    shippingInfo,
    methods: {
      //call api
      origin: getShippingPartner,
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
      onChangeCod: onChangeCod,
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

export default useFacebookOrderShippingInfo
