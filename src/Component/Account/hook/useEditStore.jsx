import {useEffect, useReducer, useState} from "react";
import {ERROR_STORE} from "../interface/_script";
import {useAccountAction, useAccountReducer, useAccountState} from "../reducer/reducer";
import dataAddress from "../../../Pages/addressSeparationTool/_data.json";
import {transformAddressData} from "../../../Pages/orderSingle/utils/transform";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import ArrayUtils from "../../../Pages/orderSingle/utils/array";
import StringUtils from "../../../Pages/orderSingle/utils/string";

export const useEditStore = (info,isUpdate) =>{
    const [state,dispatch] = useReducer(useAccountReducer,useAccountState)
    const [checkEmty,setCheckEmty] = useState(false)
    const [infoName,setInfoname] = useState(info?.shopname)
    const [errorName,setErrorName] = useState({valid:false,message:''})
    const [infoPhone,setInfoPhone] = useState(info?.phone)
    const [errorPhone,setErrorPhone] = useState({valid:false,message:''})
    const [infoEmail,setInfoEmail] = useState(info?.email)
    const [errorEmail,setErrorEmail] = useState({valid:false,message:''})
    const checkDisable = [
        errorName?.valid,
        errorPhone?.valid,
        errorEmail?.valid
    ].includes(true)
    const data = dataAddress
    const provinceData = data.map(transformAddressData)
    const [canSplitAddress, setCanSplitAddress] = useState(false)
    const {customerInfo} = state.form

    const [checkAddress,setCheckAddress] = useState(false)
    const handleAddressChange = val => {
        isUpdate(true)
        dispatch({
            type: useAccountAction.FORM_ADDRESS_UPDATE,
            payload: {value: val},
        })
    }
    useEffect(()=>{
        if(info){
            dispatch({
                type: useAccountAction.FORM_ADDRESS_UPDATE,
                payload: {value: info?.address},
            })
            const findProvince = provinceData.find(
                item => item?.value === `${info?.city_id}`,
            )
            if (findProvince) handleProvinceChange_v2(findProvince)
            const findDistrict = ArrayUtils.getQualifiedArray(findProvince?.list)
                .map(transformAddressData)
                .find(item => item?.value === `${info?.district_id}`)
            if (findDistrict) handleDistrictChange_v2(findDistrict)

            const findWard = ArrayUtils.getQualifiedArray(findDistrict?.list)
                .map(transformAddressData)
                .find(item => item?.value === `${info?.ward_id}`)
            if (findWard)
                handleWardChange_v2(findWard, {
                    cityId: findProvince?.value,
                    districtId: findDistrict?.value,
                })

        }
    },[])
    const handleProvinceChange_v2 = data => {
        dispatch({
            type: useAccountAction.FORM_ADDRESS_PROVINCE_UPDATE,
            payload: {
                province: {value: data},
                district: {
                    list: ArrayUtils.getQualifiedArray(data?.list).map(
                        transformAddressData,
                    ),
                },
            },
        })
    }
    const handleDistrictChange_v2 = data => {
        dispatch({
            type: useAccountAction.FORM_ADDRESS_DISTRICT_UPDATE,
            payload: {
                district: {value: {value: data.id, ...data}},
                ward: {
                    list: ArrayUtils.getQualifiedArray(data?.list).map(
                        transformAddressData,
                    ),
                },
            },
        })
    }
    const handleWardChange_v2 = (data, opt) => {
        dispatch({
            type: useAccountAction.FORM_ADDRESS_WARD_UPDATE,
            payload: {ward: {value: data}},
        })
    }
    const addressData = customerInfo.address
    const handleAddressSplit = async () => {
        if (!!!addressData.value.trim()) return
        setCanSplitAddress(false)

        const response = await sendRequestAuth(
            'get',
            `${config.API}/area/detect-address?address=${addressData.value.trim()}`,
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
            if (findWard)
                handleWardChange(findWard, {
                    cityId: findProvince?.value,
                    districtId: findDistrict?.value,
                })
        }

        setCanSplitAddress(true)
    }

    const handleProvinceChange = data => {
        isUpdate(true)
        dispatch({
            type: useAccountAction.FORM_ADDRESS_PROVINCE_UPDATE,
            payload: {
                province: {value: data},
                district: {
                    list: ArrayUtils.getQualifiedArray(data?.list).map(
                        transformAddressData,
                    ),
                },
            },
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
            if (formatNameItem.includes(formatDataValue.trim())) return true
            return false
        })

        dispatch({
            type: useAccountAction.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE,
            payload: {list: listData, keyword: data?.value || ''},
        })
    }

    const handleDistrictChange = data => {
        isUpdate(true)
        dispatch({
            type: useAccountAction.FORM_ADDRESS_DISTRICT_UPDATE,
            payload: {
                district: {value: {value: data.id, ...data}},
                ward: {
                    list: ArrayUtils.getQualifiedArray(data?.list).map(
                        transformAddressData,
                    ),
                },
            },
        })
    }

    const handleDistrictKeywordChange = data => {
        const formatDataValue = data?.value
            ? StringUtils.removeAcent(data?.value?.toLowerCase())
            : ''

        const compareList =
            addressData.province.value.list.map(transformAddressData)

        const listData = compareList.filter(item => {
            const formatNameItem = item?.name
                ? StringUtils.removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue.trim())) return true
            return false
        })

        dispatch({
            type: useAccountAction.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE,
            payload: {list: listData, keyword: data?.value || ''},
        })
    }

    const handleWardChange = (data, opt) => {
        isUpdate(true)
        dispatch({
            type: useAccountAction.FORM_ADDRESS_WARD_UPDATE,
            payload: {ward: {value: data}},
        })
    }

    const handleWardKeywordChange = data => {
        const formatDataValue = data?.value
            ? StringUtils.removeAcent(data?.value?.toLowerCase())
            : ''

        const compareList =
            addressData.district.value.list.map(transformAddressData)

        const listData = compareList.filter(item => {
            const formatNameItem = item?.name
                ? StringUtils.removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue.trim())) return true
            return false
        })

        dispatch({
            type: useAccountAction.FORM_ADDRESS_WARD_KEYWORD_UPDATE,
            payload: {list: listData, keyword: data?.value || ''},
        })
    }
    const onChangeNameStore = (value) =>{
        isUpdate(true)
         setInfoname(value)
    }
    const onBlurNameStore = (value) =>{
        if(value == '') setErrorName({valid:true,message: ERROR_STORE.NAME.EMPTY_NAME})
        else if (value.length > 100) setErrorName({valid:true,message: ERROR_STORE.NAME.MAX_NAME})
        else {
            setErrorName({valid:false,message: ''})
        }
    }
    const onChangePhoneStore = (value) =>{
        isUpdate(true)
        setErrorPhone({valid:false,message: ''})
        const re = /^[0-9\b]+$/;
        if (value == '' || re.test(value)) {
            setInfoPhone(value)
        }
    }
    const onBlurPhoneStore = (value) =>{
        if(value == '' ) setErrorPhone({valid:true,message: ERROR_STORE.PHONE.EMPTY_PHONE})
        else if (value.length < 10) setErrorPhone({valid:true,message: ERROR_STORE.PHONE.MAX_PHONE})
        else if (value.length > 11) setErrorPhone({valid:true,message: ERROR_STORE.PHONE.MAX_PHONE})
        else {
            setErrorPhone({valid:false,message: ''})
        }
    }
    const onChangeEmailStore = (value) =>{
        isUpdate(true)
        setInfoEmail(value)

    }
    const onBlurEmailStore = (value) =>{
        let regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(value ===  '') setErrorEmail({valid:false,message: ''})
        else if(!regex.test(value )) setErrorEmail({valid:true,message: ERROR_STORE.EMAIL.REGEX_EMAIL})
        else if (value.length > 255) setErrorEmail({valid:true,message: ERROR_STORE.EMAIL.MAX_EMAIL})
        else {
            setErrorEmail({valid:false,message: ''})
        }
    }

    return {
        checkEmty,
        checkDisable,
        check_name:{
            onChangeNameStore,
            onBlurNameStore,
            errorName,
            infoName
        },
        check_phone:{
            onChangePhoneStore,
            onBlurPhoneStore,
            errorPhone,
            infoPhone
        },
        check_email:{
            onChangeEmailStore,
            onBlurEmailStore,
            infoEmail,
            errorEmail
        },
        data: customerInfo,
        properties: {canSplitAddress,},
        methods: {
            onAddressChange: handleAddressChange,
            onAddressSplit: handleAddressSplit,
            onProvinceChange: handleProvinceChange,
            onProvinceKeywordChange: handleProvinceKeywordChange,
            onDistrictChange: handleDistrictChange,
            onDistrictKeywordChange: handleDistrictKeywordChange,
            onWardChange: handleWardChange,
            onWardKeywordChange: handleWardKeywordChange,
        },
        list_id:{
            address:state.form.customerInfo?.address.value,
            id_city:state.form.customerInfo?.address.province.value,
            id_district:state.form.customerInfo?.address.district.value,
            id_ward:state.form.customerInfo?.address.ward.value
        },
        checkAddress,
    }
}