import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import CustomerReducer from "../store/reducer";
import {initCustomerState} from "../store/initState";
import { useParams } from "react-router-dom";
import locationJsonData from "../../addressSeparationTool/_data.json";
import toast from "../../../Component/Toast";
import {debounce} from "@mui/material";

const _UseEditCustomer = ({data}) => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(CustomerReducer, initCustomerState)
  const [separate, setSeparate] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequestAuth('get', `${config.API}/customer/detail/${id}`)
      if(response?.data && response?.data?.success) {
        dispatch({type: 'SET_INFO_USER', payload: response.data.data})
      }
      if(!!response?.data?.data?.customer_short_address) setSeparate(true)
      // collectOriginData(response)
    }
    fetchData()
  }, [])
  const infoUser = state.infoUser
  const currentProvince = locationJsonData.find(
    item => item?.name === data?.city_name,
  )
  const defaultDistrict = currentProvince
    ? Array.isArray(currentProvince?.list)
      ? currentProvince.list.map(item => item?.name)
      : []
    : []
  const currentDistrict = currentProvince?.list
    ? currentProvince.list.find(item => item?.name === data?.district_name)
    : []
  const defaultWard = currentDistrict
    ? Array.isArray(currentDistrict?.list)
      ? currentDistrict.list.map(item => item?.name)
      : []
    : []

  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [customerGroup, setCustomerGroup] = useState([])
  const [group, setGroup] = useState('')
  const [priceType, setPriceType] = useState([])
  const [errorSeparate, setErrorSeparate] = useState(false)

  const [tmpAddress] = useState(data?.address || '')
  const [address, setAddress] = useState(tmpAddress)
  const [tmpCity] = useState(data?.city_name || '')
  const [city, setCity] = useState(tmpCity)
  const [tmpDistrict] = useState(data?.district_name || '')
  const [district, setDistrict] = useState(tmpDistrict)
  const [tmpWard] = useState(data?.ward_name || '')
  const [ward, setWard] = useState(tmpWard)
  const [districtData, setDistrictData] = useState(defaultDistrict)
  const [wardData, setWardData] = useState(defaultWard)

  const handleFetchOrigin = async _ => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/customer/groups?keyword&per_page=100&start=0`)
    ])
    if(response[0]?.data?.success) {
      setCustomerGroup(response[0]?.data?.data?.filter(item => +item?.status === 1))
    }
  }

  useEffect(() => {
    const selectedCity = locationJsonData.find(item => item?.name === infoUser?.city_name)
    const formatListDistrict = Array.isArray(selectedCity?.list)
      ? selectedCity.list.map(item => item?.name)
      : []
    const selectedDistrict = selectedCity?.list.find(
      item => item?.name === infoUser?.district_name,
    )
    const formatTownList = Array.isArray(selectedDistrict?.list)
      ? selectedDistrict.list.map(item => item?.name)
      : []
    setPhone(infoUser?.customer_mobile)
    setCity(infoUser?.city_name)
    setDistrict(infoUser?.district_name)
    setWard(infoUser?.ward_name)
    setDistrictData(formatListDistrict)
    setWardData(formatTownList)
  }, [infoUser?.city_name])

  const onAddressInputChange = val => {
    val.length > 0 ? setSeparate(true) : setSeparate(false)
    setAddress(val.trim())
    setErrorSeparate(false)
  }
  const onPhoneInputChange = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setPhone(value)
    }
  }
  const onGenderInputChange = val => setGender(val)
  const handlePriceList = (id, name) =>
    setPriceType(() => {
      return [
        {
          id: id,
          name: name,
        },
      ]
    })
  const handleSeparateAddress = async (customAddress = '') => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/detect-address?address=${customAddress || address}`,
    )

    if (response?.status === 200) {
      const reponseProvince = locationJsonData.find(
        item => item?.name === response?.data?.data?.city_name,
      )
      const targetDistrict = reponseProvince
        ? Array.isArray(reponseProvince?.list)
          ? reponseProvince.list.map(item => item?.name)
          : []
        : []
      const responseDistrict = reponseProvince?.list
        ? reponseProvince.list.find(
          item => item?.name === response?.data?.data?.district_name,
        )
        : []
      const targetTown = responseDistrict
        ? Array.isArray(responseDistrict?.list)
          ? responseDistrict.list.map(item => item?.name)
          : []
        : []
      setCity(response?.data?.data?.city_name || '')
      setDistrict(response?.data?.data?.district_name || '')
      setWard(response?.data?.data?.ward_name || '')

      setDistrictData(targetDistrict)
      setWardData(targetTown)
      setSeparate(false)
      if (
        response?.data?.data?.city_id === 0 &&
        response?.data?.data?.district_id === 0 &&
        response?.data?.data?.ward_id === 0 ||
        response?.data?.data?.length === 0
      ) {
        setErrorSeparate(true)
      } else {setErrorSeparate(false)}
    } else {
      toast.error('Thêm mới thất bại!')
    }
  }

  const handleCityChange = val => {
    const selectedProvince = locationJsonData.find(item => item?.name === val)

    const formatDistrictList = Array.isArray(selectedProvince?.list)
      ? selectedProvince.list.map(item => item?.name)
      : []

    setCity(val)
    setDistrict('')
    setWard('')

    setDistrictData(formatDistrictList)
    setWardData([])
  }
  const handleInputCityChange = e => {
    if(e.keyCode === 13 && !!e.target.value) {
      const selectedCity = locationJsonData.find(item => {
        const name = e.target.value.toLowerCase().replace('đ', 'd')
        return item.name.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim())
      })
      const formatDistrictList = Array.isArray(selectedCity?.list)
        ? selectedCity.list.map(item => item?.name)
        : []

      setCity(selectedCity?.name)
      setDistrict('')
      setWard('')

      setDistrictData(formatDistrictList)
      setWardData([])
    }
  }
  const handleDistrictChange = val => {
    const selectedProvince = locationJsonData.find(item => item?.name === city)
    const selectedDistrict = selectedProvince?.list.find(
      item => item?.name === val,
    )

    const formatTownList = Array.isArray(selectedDistrict?.list)
      ? selectedDistrict.list.map(item => item?.name)
      : []

    setDistrict(val)
    setWard('')

    setWardData(formatTownList)
  }
  const handleInputDistrictChange = e => {
    if(e.keyCode === 13 && !!e.target.value) {
      const selectedCity = locationJsonData.find(item => item?.name === city)
      const selectedDistrict = selectedCity.list.find(item => {
        const name = e.target.value.toLowerCase().replace('đ', 'd')
        return item.name.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim())
      })
      const formatWardList = Array.isArray(selectedDistrict?.list)
        ? selectedDistrict?.list?.map(item => item?.name)
        : []
      setDistrict(selectedDistrict?.name)
      setWard('')
      setWardData(formatWardList)
    }
  }
  const handleWardChange = val => setWard(val)
  const handleInputWardChange = e => {
    if(e.keyCode === 13 && !!e.target.value) {
      const selectedWard = wardData.find(item => {
        const name = e.target.value.toLowerCase().replace('đ', 'd')
        return item.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim())
      })
      setWard(selectedWard)
    }
  }

  const fetchCustomerGroup = async keyword => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/groups?keyword=${keyword}&per_page=100&start=0`,
    )
    if (response.data && response.data.success) {
      setCustomerGroup(response?.data?.data?.filter(item => +item?.status === 1))
    } else toast.error('Lấy thông tin thấy bại!')
  }
  const debounceListResponse = useCallback(debounce((data) => {
    fetchCustomerGroup( data)
  }, 500), [])
  const handleSearchGroup = async (data) => {
    debounceListResponse(data?.value?.trim())
  }


  const handleSelectCustomerGroup = value => setGroup(value)

  return {
    phone,
    gender,
    address,
    city,
    district,
    districtData,
    ward,
    wardData,
    customerGroup,
    group,
    priceType,
    separate,
    errorSeparate,
    infoUser,
    onPhoneInputChange,
    onGenderInputChange,
    onAddressInputChange,
    handlePriceList,
    handleSeparateAddress,
    handleCityChange,
    handleDistrictChange,
    handleWardChange,
    handleSearchGroup,
    handleInputCityChange,
    handleInputDistrictChange,
    handleInputWardChange,

    handleFetchOrigin,
    handleSelectCustomerGroup,
  }
};

export default _UseEditCustomer;