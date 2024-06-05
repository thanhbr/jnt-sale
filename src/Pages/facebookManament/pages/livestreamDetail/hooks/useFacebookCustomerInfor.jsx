
import {getData,sendRequestAuth} from '../../../../../api/api'
import useAlert from 'hook/useAlert'
import {useState, useCallback} from 'react'
import { FacebookLivestreamContext } from '../provider/_context'
import {provinceData} from '../provider/_initstate' 
import config from "../../../../../config";
import ArrayUtils from '../utils/array'
import StringUtils from '../utils/string'
import {
  transformAddressData,
} from '../utils/transform'
import { useContext, useEffect, useReducer } from 'react'
import {ORDER_SHIPPING_CODE} from '../interface/_constants'
import useFacebookOrderShippingInfo from './useFacebookOrderShippingInfo'
import { debounce } from '@mui/material'

const useFacebookCustomerInfor = () => {

    const {state, dispatch}= useContext(FacebookLivestreamContext)
    const {methods} = useFacebookOrderShippingInfo()
    const [canSplitAddress, setCanSplitAddress] = useState(true)
    const {showAlert} = useAlert()
    const customerInfo = state.detail.customerInfor

    const isEnoughCustomerInfo = ![
      !!customerInfo.list?.city_id,
      !!customerInfo.list?.district_id,
      !!customerInfo.list?.ward_id,
      !!customerInfo.list?.customer_address,
      !!customerInfo.list?.customer_mobile,
      !!customerInfo.list?.customer_name,
    ].includes(false)

    const handleDefaultAddress =() =>{

      const findProvince = state.detail.customerInfor.list.city_id ? state.detail.customerInfor.address.province.list.find(
        item => item?.value === state.detail.customerInfor.list.city_id,
      ): [];
      if (findProvince) handleProvinceChange(findProvince)
      const findDistrict = ArrayUtils.getQualifiedArray(findProvince?.list)
        .map(transformAddressData)
        .find(item => item?.value === state.detail.customerInfor.list.district_id)
      if (findDistrict) handleDistrictChange(findDistrict)

      const findWard = ArrayUtils.getQualifiedArray(findDistrict?.list)
        .map(transformAddressData)
        .find(item => item?.value === state.detail.customerInfor.list.ward_id)
      if (findWard) handleWardChange(findWard)
    }


    
  const handleAddressChange = async val => {
    dispatch({
      type: 'SET_ADDRESS_UPDATE',
      payload: {value: val},
    })
    dispatch({
      type: 'SET_ERROR_SEPARATE',
      payload: false,
    })
    const city_id = state.detail.customerInfor.list.city_id ? state.detail.customerInfor.list.city_id : 0;
    const district_id = state.detail.customerInfor.list.district_id ? state.detail.customerInfor.list.district_id : 0;
    const ward_id = state.detail.customerInfor.list.ward_id ? state.detail.customerInfor.list.ward_id : 0;
    const data = {
      'keyword' : val.trim(),
      'city_id' : city_id,
      'district_id': district_id,
      'ward_id' : ward_id
    }
    debouncePostKeywordChange(data)
    dispatch({
      type: 'SET_CUSTOMER_VALID',
      payload:  isEnoughCustomerInfo == true && false
    })
    
  }
  const handleAddressChangeDebounce = async data => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/suggest-address?keyword=${data.keyword}&city_id=${data.city_id}&district_id=${data.district_id}&ward_id=${data.ward_id}`,
    )
    if (!!response?.data?.success) {
      dispatch({
        type: 'SET_CUSTOMER_SUGGEST_ADDRESS',
        payload:response?.data?.data,
      })
    }
  }
  const debouncePostKeywordChange = useCallback(debounce((data) => {
    handleAddressChangeDebounce(data)
  },500), [])

  const handleAddressSplit = async (address) => {

    setCanSplitAddress(false)

    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/detect-address?address=${address.trim()}`,
    )

    if (!!response?.data?.success) {
      dispatch({
        type: 'SET_ADDRESS_UPDATE',
        payload: {value: address},
      })

      const findProvince = provinceData.find(
        item => item?.value === `${response?.data?.data?.city_id}`,
      )
      if (findProvince) handleProvinceChange(findProvince)

      const findDistrict = ArrayUtils.getQualifiedArray(findProvince?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.district_id}`)
      if (findDistrict) handleDistrictChange(findDistrict)

      const findWard = ArrayUtils.getQualifiedArray(findDistrict?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.ward_id}`)
      if (findWard) handleWardChange(findWard)
      if (response?.data?.data.length <= 0){
        showAlert({type: 'danger', content: 'Vui lòng nhập thông tin địa chỉ'})
      } else {
        if (
          response?.data?.data?.city_id == 0 &&
          response?.data?.data?.district_id == 0 &&
          response?.data?.data?.ward_id == 0 ||
          response?.data?.data?.length == 0
        ) {
          dispatch({
            type: 'SET_ERROR_SEPARATE',
            payload: true,
          })
        } else {
          dispatch({
            type: 'SET_ERROR_SEPARATE',
            payload: false,
          })
          showAlert({type: 'success', content: 'Tách địa chỉ thành công'})
        }
      }
    } else showAlert({type: 'danger', content: 'Tách địa chỉ thất bại'})

    setCanSplitAddress(true)
  }

    const handleProvinceChange = data => {
      dispatch({
        type: 'SET_ADDRESS_PROVINCE_UPDATE',
        payload: {
          city_id: data.value,
          province: {value: data},
          district: {
            list: ArrayUtils.getQualifiedArray(data?.list).map(
              transformAddressData,
            ),
          },
        },
      })
    }
    

    const handleDistrictChange = data =>{
      dispatch({
        type: 'SET_ADDRESS_DISTRICT_UPDATE',
        payload: {
          district_id: data.value,
          district: {value: data},
          ward: {
            list: ArrayUtils.getQualifiedArray(data?.list).map(
              transformAddressData,
            ),
          },
        },
      })
    }

    const handleWardChange = data =>{
      dispatch({
        type: 'SET_ADDRESS_WARD_UPDATE',
        payload: {ward_id: data.value, ward: {value: data}},
      })
      methods.getFeeShipping({value:data.value})
    }

    const handleProvinceKeywordChange = data => {
        const formatDataValue = data?.value
          ? StringUtils.removeAcent(data?.value?.toLowerCase())
          : ''
    
        const listData = provinceData.filter(item => {
          const formatNameItem = item?.name
            ? StringUtils.removeAcent(item.name.toLowerCase())
            : ''
          
          if (formatNameItem.includes(formatDataValue.trim())) return true
          return false
        })
        dispatch({
          type: 'SET_ADDRESS_PROVINCE_KEYWORD_UPDATE',
          payload: {list: listData, keyword: data.value},
        })
    }

    const handleDistrictKeywordChange = data => {
        const formatDataValue = data?.value
          ? StringUtils.removeAcent(data?.value?.toLowerCase())
          : ''
    
        const compareList =
          state.detail.customerInfor.address.province.value.list.map(transformAddressData)
    
        const listData = compareList.filter(item => {
          const formatNameItem = item?.name
            ? StringUtils.removeAcent(item.name.toLowerCase())
            : ''
          if (formatNameItem.includes(formatDataValue.trim())) return true
          return false
        })
    
        dispatch({
          type: 'SET_ADDRESS_DISTRICT_KEYWORD_UPDATE',
          payload: {list: listData, keyword: data.value},
        })
    }

    const handleWardKeywordChange = data => {
        const formatDataValue = data?.value
          ? StringUtils.removeAcent(data?.value?.toLowerCase())
          : ''
    
        const compareList =
            state.detail.customerInfor.address.district.value.list.map(transformAddressData)
    
        const listData = compareList.filter(item => {
          const formatNameItem = item?.name
            ? StringUtils.removeAcent(item.name.toLowerCase())
            : ''
          if (formatNameItem.includes(formatDataValue.trim())) return true
          return false
        })
    
        dispatch({
          type: 'SET_ADDRESS_WARD_KEYWORD_UPDATE',
          payload: {list: listData, keyword: data.value},
        })
    }
    const handleScriptNameChange = data => {
      if (data.trim() == '') data = ''
      dispatch({
        type: 'SET_CUSTOMER_NAME_UPDATE',
        payload: data,
      })
    }
    const handleScriptPhoneChange = data => {
      if (data.trim() == '') data = ''
      dispatch({
        type: 'SET_CUSTOMER_MOBILE_UPDATE',
        payload: data,
      })
      dispatch({
        type: 'SET_CUSTOMER_VALID',
        payload:  isEnoughCustomerInfo == true && false
      })
    }
    const handleScriptNoteChange = data => {
      if (data.trim() == '') data = ''
      dispatch({
        type: 'SET_CUSTOMER_NOTES_UPDATE',
        payload: data,
      })
      dispatch({
        type: 'SET_CUSTOMER_VALID',
        payload:  isEnoughCustomerInfo == true && false
      })
    }
    
    const handleChangePhoneCustomer = async phone => {
      dispatch({
        type: 'SET_CUSTOMER_MOBILE_UPDATE',
        payload: phone,
      })
      const response = await sendRequestAuth(
        'get',
        `${config.API}/fb/customer/check-address?phone=${phone}`
      )
      if (!!response.data.success) {
        dispatch({
          type: 'SET_CUSTOMER_ADDRESS_LIST',
          payload: response.data.data
        })
        dispatch({
          type: 'SET_CUSTOMER_TOTAL_REPORTS',
          payload:state.detail.customerInfor.list_report.find((item,ind) => item.phone == phone) ? state.detail.customerInfor.list_report.find((item,ind) => item.phone == phone)?.totals : 0
        })
        
      }
    }
    const handleChangeAddressCustomer = async data => {
      dispatch({
        type: 'SET_ADDRESS_UPDATE',
        payload: {value: data.customer_address},
      })
      const defaultProvince = data.city_id  ? (state.detail.customerInfor.address.province.list.find(
          item => item.value === data.city_id
      )) : state.detail.customerInfor.address.province.list;
      const defaultDistrict = data.district_id  && (defaultProvince.list.find(
        item => item.id === data.district_id
      ))
      const defaultWard = data.ward_id && (defaultDistrict.list.find(
        item => item.id === data.ward_id
      ))
      dispatch({
        type: 'SET_ADDRESS_PROVINCE_UPDATE',
        payload: {
          city_id: data.city_id,
          province: {value: defaultProvince},
          district: {
            list: ArrayUtils.getQualifiedArray(defaultProvince.list).map(
              transformAddressData,
            ),
            value: defaultDistrict
          }
        },
      })
      dispatch({
        type: 'SET_ADDRESS_DISTRICT_UPDATE',
        payload: {
          district_id: data.district_id,
          district: {value: defaultDistrict},
          ward: {
            list: ArrayUtils.getQualifiedArray(defaultDistrict?.list).map(
              transformAddressData,
            ),
            value: defaultWard
          },
        },
      })
      dispatch({
        type: 'SET_ADDRESS_WARD_UPDATE',
        payload: {ward_id: data.ward_id, ward: {value: defaultWard}},
      })
    }

    const handleSuggestAddressSplit = item => {
      item.customer_address = item.suggest
      handleChangeAddressCustomer(item)
    }

    const handleValidateCustomerName = () =>{
      if(!state.detail.customerInfor.list.customer_name || state.detail.customerInfor.list.customer_name.length > 80) {
        dispatch({type: 'SET_FORM_VALIDATE_CUSTOMER_NAME',payload: true})
      } else {
        dispatch({type: 'SET_FORM_VALIDATE_CUSTOMER_NAME',payload: false})
      }
    }

    const handleValidateCustomerMobile = () =>{
      if(!state.detail.customerInfor.list.customer_mobile){
        dispatch({type: 'SET_FORM_VALIDATE_CUSTOMER_MOBILE', payload: {status: true, message: "Số điện thoại không được bỏ trống!"}})
      } else if(state.detail.customerInfor.list.customer_mobile.length< 10 || state.detail.customerInfor.list.customer_mobile.length > 11){
        dispatch({type: 'SET_FORM_VALIDATE_CUSTOMER_MOBILE',payload: {status: true, message: 'Tối thiểu có 10 và tối đa 11 chữ số'}})
      } else {
        dispatch({type: 'SET_FORM_VALIDATE_CUSTOMER_MOBILE',payload: {status: false, message: ''}})
      }
    }

    const handleValidateCustomerNotes = () => {
      state.detail.customerInfor.list.customer_notes && (state.detail.customerInfor.list.customer_notes.length > 255 ?  dispatch({type: 'SET_FORM_VALIDATE_CUSTOMER_NOTES',payload: true}) : dispatch({type: 'SET_FORM_VALIDATE_CUSTOMER_NOTES',payload: false}))
    }

    const saveCustomerInfor = async () => {
      if(state.detail.customerInfor.validate.customer_name == true || state.detail.customerInfor.list.customer_name =='' || (state.detail.customerInfor.list.customer_mobile =='' || state.detail.customerInfor.list.customer_mobile == null) || state.detail.customerInfor.validate.customer_notes == true){
        handleValidateCustomerName();
        handleValidateCustomerMobile();
      } else {
        state.detail.customerInfor.list.social_id = state.detail.liveStream.customer.sender_id;
        delete state.detail.customerInfor.list.customer_id;
        const response = await sendRequestAuth(
          'post',
          `${config.API}/fb/customer/update`,
          state.detail.customerInfor.list,
        )
        if (!!response.data.success) {
          dispatch({
            type: 'SET_CUSTOMER_PHONE_LIST',
            payload: [...state.detail.customerInfor.listPhone, state.detail.customerInfor.list.customer_mobile]
          })
          handleCustomerAddress(state.detail.customerInfor.list.customer_mobile)
          showAlert({
            content: 'Lưu thông tin khách hàng thành công',
            duration: 2000,
            type: 'success'
          })
        } else {
          showAlert({
            content: response.data.errors.message,
            duration: 2000,
            type: 'danger'
          })
        }
      }
    }

    const handleCustomerAddress = async (phone) => {
      const response = await sendRequestAuth(
        'get',
        `${config.API}/fb/customer/check-address?phone=${phone}`
      )
      if (!!response.data.success) {
        dispatch({
          type: 'SET_CUSTOMER_ADDRESS_LIST',
          payload: response.data.data
        })
      }
    }
    const handleCustomerPhones = async (id) => {
      const response = await sendRequestAuth(
        'get',
        `${config.API}/fb/customer/check-phone?facebook_id=${id}`
      )
      if (!!response.data.success) {
        dispatch({
          type: 'SET_CUSTOMER_PHONE_LIST',
          payload: response.data.data
        })
      }
    }

    const getArrayFromValue = arr => (Array.isArray(arr) ? arr : [])

    const handlePrint = async (type, orderid, ship_name) => {
    type= ORDER_SHIPPING_CODE[ship_name] ? type : 'a5';
    const response = await sendRequestAuth(
      'post',
      type === 'others'
        ? `${config.API}/order/print-partner`
        : `${config.API}/order/print-upos`,
      JSON.stringify(
        type === 'others'
          ? {
            order_id: [orderid],
            print_type: ORDER_SHIPPING_CODE[ship_name].code,
          }
          : {
            order_id:  [orderid],
            print_type: 'shipment',
            print_size: type,
          },
      ),
    )

    if (response?.data?.success) {
      if (type === 'others') {
        window.open(response?.data?.data?.url)
      } else {
        const content = getTemplatePrint(
          getArrayFromValue(response?.data?.data).join('') || '',
        )

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
          dispatch({ type: 'SET_LOADING', payload: false })
        }, 1500)
      }
    }
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

    return {
        properties: {canSplitAddress},
        address: state.detail.customerInfor.address,
        province: state.detail.customerInfor.address.province,
        district: state.detail.customerInfor.address.district,
        ward: state.detail.customerInfor.address.ward,
        functions: {
            saveCustomerInfor,
            handlePrint,
            handleAddressSplit,
            handleCustomerAddress,
            handleCustomerPhones
        },
        validates : {
          handleValidateCustomerName,
          handleValidateCustomerMobile,
          handleValidateCustomerNotes
        },
        methods: {
            onScriptNameChange: handleScriptNameChange,
            onScriptPhoneChange:handleScriptPhoneChange,
            onScriptNoteChange: handleScriptNoteChange,

            onDefaultAddress: handleDefaultAddress,

            onProvinceChange: handleProvinceChange,
            onDistrictChange: handleDistrictChange,
            onWardChange: handleWardChange,
            onProvinceKeywordChange: handleProvinceKeywordChange,
            onDistrictKeywordChange: handleDistrictKeywordChange,
            onWardKeywordChange: handleWardKeywordChange,
            onAddressChange: handleAddressChange,
            onAddressSplit: handleAddressSplit,
            onSuggestAddressSplit: handleSuggestAddressSplit,

            onChangePhoneCustomer: handleChangePhoneCustomer,
            onChangeAddressCustomer: handleChangeAddressCustomer
        }
    }
}

export default useFacebookCustomerInfor;


