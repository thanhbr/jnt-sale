// import dataAddress from "../../../Pages/addressSeparationTool/_data.json"
// import {useEffect, useReducer, useState} from "react";
// import addressData from "../../../Pages/addressSeparationTool/_data.json";
// import {transformAddressData} from "../../../Pages/orderSingle/utils/transform";
// import {sendRequestAuth} from "../../../api/api";
// import config from "../../../config";
// import {provinceData} from "../../../Pages/orderSingle/provider/_initialState";
// import ArrayUtils from "../../../Pages/orderSingle/utils/array";
// import StringUtils from "../../../Pages/orderSingle/utils/string";
// import {useAccountAction, useAccountReducer, useAccountState} from "../reducer/reducer";
//
// export const useSlitAddress = (info,isUpdate) => {
//     const data = dataAddress
//     const [state, dispatch] = useReducer(useAccountReducer, useAccountState)
//     const provinceData = data.map(transformAddressData)
//     const [canSplitAddress, setCanSplitAddress] = useState(false)
//     const {customerInfo} = state.form
//     const [infoAddress,setInfoAddress] =useState(info?.address ? `${info?.address},`: '' )
//     const [infoProvince,setInfoProvine] = useState(info?.city_name ? ` ${info?.city_name}`:'')
//     const [infoDistrict,setInfoDistrict] = useState(info?.district_name ? ` ${info?.district_name},` : ``)
//     const [infoWard,setInfoWard] = useState(info?.ward_name ? ` ${info?.ward_name},` : ``)
//     const [checkAddress,setCheckAddress] = useState(false)
//     const handleAddressChange = val => {
//         setInfoAddress(val )
//         isUpdate(true)
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_UPDATE,
//             payload: {value: val},
//         })
//     }
//     useEffect(()=>{
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_UPDATE,
//             payload: {value: infoAddress + infoWard + infoDistrict + infoProvince},
//         })
//     },[info,infoAddress,infoProvince,infoDistrict,infoWard])
//     const addressData = customerInfo.address
//     const handleAddressSplit = async () => {
//         if (!!!addressData.value.trim()) return
//
//         setCanSplitAddress(false)
//
//         const response = await sendRequestAuth(
//             'get',
//             `${config.API}/area/detect-address?address=${addressData.value.trim()}`,
//         )
//
//         if (!!response?.data?.success) {
//             const findProvince = provinceData.find(
//                 item => item?.value === `${response?.data?.data?.city_id}`,
//             )
//             if (findProvince) handleProvinceChange(findProvince)
//
//             const findDistrict = ArrayUtils.getQualifiedArray(findProvince?.list)
//                 .map(transformAddressData)
//                 .find(item => item?.value === `${response?.data?.data?.district_id}`)
//             if (findDistrict) handleDistrictChange(findDistrict)
//
//             const findWard = ArrayUtils.getQualifiedArray(findDistrict?.list)
//                 .map(transformAddressData)
//                 .find(item => item?.value === `${response?.data?.data?.ward_id}`)
//             if (findWard)
//                 handleWardChange(findWard, {
//                     cityId: findProvince?.value,
//                     districtId: findDistrict?.value,
//                 })
//         }
//
//         setCanSplitAddress(true)
//     }
//
//     const handleProvinceChange = data => {
//         setInfoProvine(data?.name && ` ${data?.name}`)
//         isUpdate(true)
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_PROVINCE_UPDATE,
//             payload: {
//                 province: {value: data},
//                 district: {
//                     list: ArrayUtils.getQualifiedArray(data?.list).map(
//                         transformAddressData,
//                     ),
//                 },
//             },
//         })
//     }
//     const handleProvinceKeywordChange = data => {
//         const formatDataValue = data?.value
//             ? StringUtils.removeAcent(data?.value?.toLowerCase())
//             : ''
//
//         const listData = provinceData.filter(item => {
//             const formatNameItem = item?.name
//                 ? StringUtils.removeAcent(item.name.toLowerCase())
//                 : ''
//             if (formatNameItem.includes(formatDataValue.trim())) return true
//             return false
//         })
//
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE,
//             payload: {list: listData, keyword: data?.value || ''},
//         })
//     }
//
//     const handleDistrictChange = data => {
//         isUpdate(true)
//         setInfoDistrict(data?.name && ` ${data?.name},`)
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_DISTRICT_UPDATE,
//             payload: {
//                 district: {value: {value: data.id, ...data}},
//                 ward: {
//                     list: ArrayUtils.getQualifiedArray(data?.list).map(
//                         transformAddressData,
//                     ),
//                 },
//             },
//         })
//     }
//
//     const handleDistrictKeywordChange = data => {
//         const formatDataValue = data?.value
//             ? StringUtils.removeAcent(data?.value?.toLowerCase())
//             : ''
//
//         const compareList =
//             addressData.province.value.list.map(transformAddressData)
//
//         const listData = compareList.filter(item => {
//             const formatNameItem = item?.name
//                 ? StringUtils.removeAcent(item.name.toLowerCase())
//                 : ''
//             if (formatNameItem.includes(formatDataValue.trim())) return true
//             return false
//         })
//
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE,
//             payload: {list: listData, keyword: data?.value || ''},
//         })
//     }
//
//     const handleWardChange = (data, opt) => {
//         isUpdate(true)
//         setInfoWard(data?.name && ` ${data?.name},`)
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_WARD_UPDATE,
//             payload: {ward: {value: data}},
//         })
//     }
//
//     const handleWardKeywordChange = data => {
//         const formatDataValue = data?.value
//             ? StringUtils.removeAcent(data?.value?.toLowerCase())
//             : ''
//
//         const compareList =
//             addressData.district.value.list.map(transformAddressData)
//
//         const listData = compareList.filter(item => {
//             const formatNameItem = item?.name
//                 ? StringUtils.removeAcent(item.name.toLowerCase())
//                 : ''
//             if (formatNameItem.includes(formatDataValue.trim())) return true
//             return false
//         })
//
//         dispatch({
//             type: useAccountAction.FORM_ADDRESS_WARD_KEYWORD_UPDATE,
//             payload: {list: listData, keyword: data?.value || ''},
//         })
//     }
//     return {
//         data: customerInfo,
//         properties: {canSplitAddress,},
//         methods: {
//             onAddressChange: handleAddressChange,
//             onAddressSplit: handleAddressSplit,
//             onProvinceChange: handleProvinceChange,
//             onProvinceKeywordChange: handleProvinceKeywordChange,
//             onDistrictChange: handleDistrictChange,
//             onDistrictKeywordChange: handleDistrictKeywordChange,
//             onWardChange: handleWardChange,
//             onWardKeywordChange: handleWardKeywordChange,
//         },
//         list_id:{
//             address:state.form.customerInfo?.address.value,
//             id_city:state.form.customerInfo?.address.province.value,
//             id_district:state.form.customerInfo?.address.district.value,
//             id_ward:state.form.customerInfo?.address.ward.value
//         },
//         checkAddress,
//     }
// }
