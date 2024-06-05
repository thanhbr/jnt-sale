
import {getData,sendRequestAuth} from '../../../api/api'
import useAlert from 'hook/useAlert'
import {useState} from 'react'
import useSurveyLoginContext from './_context'
import {provinceData} from '../provider/initState' 
import config from "../../../config";
import ArrayUtils from '../utils/array'
import StringUtils from '../utils/string'
import {
  transformAddressData,
  transformCustomerData,
  transformQueryObjToString,
} from '../utils/transform'

const UseSurveyLogin = () => {

    const [state, dispatch]= useSurveyLoginContext();

    const [canSplitAddress, setCanSplitAddress] = useState(true)

    const {showAlert} = useAlert()

    const getListBusiness =  () => { 
        let data = [
            {
                "id": "2",
                "name": "Mỹ phẩm"
            },
            {
                "id": "1",
                "name": "Thời trang"
            },
            {
                "id": "3",
                "name": "Điện thoại & Điện máy"
            },
            {
                "id": "5",
                "name": "Nhà thuốc"
            },
            {
                "id": "6",
                "name": "Siêu thị mini"
            },
            {
                "id": "7",
                "name": "Tạp hóa"
            },
            {
                "id": "8",
                "name": "Mẹ & bé"
            },
            {
                "id": "10",
                "name": "Sách & văn phòng phẩm"
            },
            {
                "id": "11",
                "name": "Nông sản & Thực phẩm"
            },
            {
                "id": "9",
                "name": "Hoa & Quà tặng"
            },
            {
                "id": "4",
                "name": "Nội thất & Gia dụng"
            },
            {
                "id": "12",
                "name": "Ngành hàng khác"
            }
        ]
        dispatch({type: 'GET_LIST_BUSINESS', payload: data})
    }

    const defineData =data=>{
        dispatch({type: 'SET_SHOPNAME_UPDATE', payload: data.fullname})
        dispatch({type: 'SET_EMAIL_UPDATE', payload: data.email})
        dispatch({type: 'SET_ADDRESS_UPDATE', payload: data.address})
        dispatch({type: 'SET_CITY_UPDATE', payload: state.dataUpdate.city_id})
        dispatch({type: 'SET_DISTRICT_UPDATE', payload: state.dataUpdate.district_id})
        dispatch({type: 'SET_WARD_UPDATE', payload: state.dataUpdate.ward_id})
        dispatch({type: 'SET_BUSINESS_MAJORS_UPDATE', payload: state.typeMajors})
    }


    
    const handleAddressChange = val =>
    dispatch({
      type: 'FORM_ADDRESS_UPDATE',
      payload: {value: val},
    })

  const handleAddressSplit = async () => {
    setCanSplitAddress(false)

    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/detect-address?address=${state.dataAddress.address.value.trim()}`,
    )

    if (!!response?.data?.success) {
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
        showAlert({type: 'success', content: 'Tách địa chỉ thành công'})
      }
    } else showAlert({type: 'danger', content: 'Tách địa chỉ thất bại'})

    setCanSplitAddress(true)
  }

    const handleProvinceChange = data => {
      dispatch({
        type: 'FORM_ADDRESS_PROVINCE_UPDATE',
        payload: {
          province: {value: data},
          district: {
            list: ArrayUtils.getQualifiedArray(data?.list).map(
              transformAddressData,
            ),
          },
        },
      })
      dispatch({
        type: 'SET_CITY_UPDATE',
        payload: data.value,
      })
      dispatch({
        type: 'SET_DISTRICT_UPDATE',
        payload: "",
      })
      dispatch({
        type: 'SET_WARD_UPDATE',
        payload: "",
      })
    }
    

    const handleDistrictChange = data =>{
      dispatch({
        type: 'FORM_ADDRESS_DISTRICT_UPDATE',
        payload: {
          district: {value: data},
          ward: {
            list: ArrayUtils.getQualifiedArray(data?.list).map(
              transformAddressData,
            ),
          },
        },
      })
      dispatch({
        type: 'SET_DISTRICT_UPDATE',
        payload: data.value,
      })
      dispatch({
        type: 'SET_WARD_UPDATE',
        payload: "",
      })
    }

    const handleWardChange = data =>{
      dispatch({
        type: 'FORM_ADDRESS_WARD_UPDATE',
        payload: {ward: {value: data}},
      })
      dispatch({
        type: 'SET_WARD_UPDATE',
        payload: data.value,
      })
    }

    const handleProvinceKeywordChange = data => {
        const formatDataValue = data?.value
          ? StringUtils.removeAcent(data?.value?.toLowerCase())
          : ''
    
        const listData = provinceData.filter(item => {
          const formatNameItem = item?.name
            ? StringUtils.removeAcent(item.name.toLowerCase())
            : ''
          if (formatNameItem.includes(formatDataValue)) return true
          return false
        })
    
        dispatch({
          type: 'FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE',
          payload: {list: listData, keyword: formatDataValue},
        })
    }

    const handleDistrictKeywordChange = data => {
        const formatDataValue = data?.value
          ? StringUtils.removeAcent(data?.value?.toLowerCase())
          : ''
    
        const compareList =
          state.dataAddress.address.province.value.list.map(transformAddressData)
    
        const listData = compareList.filter(item => {
          const formatNameItem = item?.name
            ? StringUtils.removeAcent(item.name.toLowerCase())
            : ''
          if (formatNameItem.includes(formatDataValue)) return true
          return false
        })
    
        dispatch({
          type: 'FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE',
          payload: {list: listData, keyword: formatDataValue},
        })
    }

    const handleWardKeywordChange = data => {
        const formatDataValue = data?.value
          ? StringUtils.removeAcent(data?.value?.toLowerCase())
          : ''
    
        const compareList =
            state.dataAddress.address.district.value.list.map(transformAddressData)
    
        const listData = compareList.filter(item => {
          const formatNameItem = item?.name
            ? StringUtils.removeAcent(item.name.toLowerCase())
            : ''
          if (formatNameItem.includes(formatDataValue)) return true
          return false
        })
    
        dispatch({
          type: 'FORM_ADDRESS_WARD_KEYWORD_UPDATE',
          payload: {list: listData, keyword: formatDataValue},
        })
    }
    const handleEnterSubmit = e => { 
      if(e.key === 'Enter'){
        e.preventDefault()
      }
    }
    return {
        properties: {canSplitAddress},
        address: state.dataAddress.address,
        province: state.dataAddress.address.province,
        district: state.dataAddress.address.district,
        ward: state.dataAddress.address.ward,
        functions: {
            getListBusiness
        },
        methods: {
            defineData: defineData,
            onProvinceChange: handleProvinceChange,
            onDistrictChange: handleDistrictChange,
            onWardChange: handleWardChange,
            onProvinceKeywordChange: handleProvinceKeywordChange,
            onDistrictKeywordChange: handleDistrictKeywordChange,
            onWardKeywordChange: handleWardKeywordChange,
            onAddressChange: handleAddressChange,
            onAddressSplit: handleAddressSplit,
            onEnterSubmit: handleEnterSubmit
        }
    }
}

export default UseSurveyLogin;


