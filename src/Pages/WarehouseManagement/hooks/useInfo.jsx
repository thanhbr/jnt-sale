import { sendRequestAuth } from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { useState } from 'react'
import { useContext } from 'react'
import { ActionType } from '../store/action'
import StringUtils from '../utils/string'
import {
  transformAddressData,
  transformCustomerData,
  transformQueryObjToString,
} from '../utils/transform'
import addressData from 'Pages/addressSeparationTool/_data.json'

const provinceData = addressData.map(transformAddressData)

const getQualifiedArray = arr => {
  return Array.isArray(arr) ? arr : []
}

const useInfo = () => {
  const { showAlert } = useAlert()
  const { state, dispatch } = useContext(WarehouseManager)
  const { warehouseInfo } = state.form

  // ======================================================================================================
  // NAME
  // ======================================================================================================

  const handleChangeName = val =>
    dispatch({
      type: ActionType.FORM_NAME_UPDATE,
      payload: { value: val },
    })

  // ======================================================================================================
  // ISPURCHASE
  // ======================================================================================================

  const handleChangeIsPurchase = e => {
    dispatch({
      type: ActionType.FORM_ISPURCHASE_UPDATE,
      payload: { value: e.target.checked },
    })
  }

  // ======================================================================================================
  // ISMAIN
  // ======================================================================================================

  const handleChangeIsMain = e => {
    dispatch({
      type: ActionType.FORM_ISMAIN_UPDATE,
      payload: { value: e.target.checked },
    })
  }

  // ======================================================================================================
  // STATUS
  // ======================================================================================================

  const handleChangeStatus = e => {
    dispatch({
      type: ActionType.FORM_STATUS_UPDATE,
      payload: { value: e.target.checked },
    })
  }

  // ======================================================================================================
  // ADDRESS
  // ======================================================================================================
  const addressData = warehouseInfo.address

  const [canSplitAddress, setCanSplitAddress] = useState(true)
  const [errorSeparate, setErrorSeparate] = useState(false)
  const handleAddressChange = val =>{
    dispatch({
      type: ActionType.FORM_ADDRESS_UPDATE,
      payload: { value: val },
    })
    setErrorSeparate(false)
  }

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

      const findDistrict = getQualifiedArray(findProvince?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.district_id}`)
      if (findDistrict) handleDistrictChange(findDistrict)

      const findWard = getQualifiedArray(findDistrict?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.ward_id}`)
      if (findWard)
        handleWardChange(findWard, {
          cityId: findProvince?.value,
          districtId: findDistrict?.value,
        })

      if (
        response?.data?.data?.city_id === 0 &&
        response?.data?.data?.district_id === 0 &&
        response?.data?.data?.ward_id === 0 ||
        response?.data?.data?.length === 0
      ) {
        setErrorSeparate(true)
      } else {setErrorSeparate(false)}
    }

    setCanSplitAddress(true)
  }

  const handleProvinceChange = data => {
    dispatch({
      type: ActionType.FORM_ADDRESS_PROVINCE_UPDATE,
      payload: {
        province: { value: data },
        district: {
          list: getQualifiedArray(data?.list).map(transformAddressData),
        },
      },
    })
  }

  const handleProvinceKeywordChange = data => {
    const formatDataValue = data?.value
      ? data?.value?.toLowerCase()
      : ''

    const listData = provinceData.filter(item => {
      const formatNameItem = item?.name
        ? item.name.toLowerCase()
        : ''
      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })

    dispatch({
      type: ActionType.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE,
      payload: { list: listData, keyword: formatDataValue },
    })
  }

  const handleDistrictChange = data =>
    dispatch({
      type: ActionType.FORM_ADDRESS_DISTRICT_UPDATE,
      payload: {
        district: { value: { value: data.id, ...data } },
        ward: {
          list: getQualifiedArray(data?.list).map(transformAddressData),
        },
      },
    })

  const handleDistrictKeywordChange = data => {
    const formatDataValue = data?.value
      ? data?.value?.toLowerCase()
      : ''

    const compareList =
      addressData.province.value.list.map(transformAddressData)

    const listData = compareList.filter(item => {
      const formatNameItem = item?.name
        ? item.name.toLowerCase()
        : ''
      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })

    dispatch({
      type: ActionType.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE,
      payload: { list: listData, keyword: formatDataValue },
    })
  }

  const handleWardChange = (data, opt) => {
    dispatch({
      type: ActionType.FORM_ADDRESS_WARD_UPDATE,
      payload: { ward: { value: data } },
    })
  }

  const handleWardKeywordChange = data => {
    const formatDataValue = data?.value
      ? data?.value?.toLowerCase()
      : ''

    const compareList =
      addressData.district.value.list.map(transformAddressData)

    const listData = compareList.filter(item => {
      const formatNameItem = item?.name
        ? item.name.toLowerCase()
        : ''
      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })

    dispatch({
      type: ActionType.FORM_ADDRESS_WARD_KEYWORD_UPDATE,
      payload: { list: listData, keyword: formatDataValue },
    })
  }

  return {
    data: warehouseInfo,
    // validate: {phone: phoneValidate},
    properties: { canSplitAddress , errorSeparate },
    methods: {
      // name
      onNameChange: handleChangeName,
      // address
      onAddressChange: handleAddressChange,
      onAddressSplit: handleAddressSplit,
      onProvinceChange: handleProvinceChange,
      onProvinceKeywordChange: handleProvinceKeywordChange,
      onDistrictChange: handleDistrictChange,
      onDistrictKeywordChange: handleDistrictKeywordChange,
      onWardChange: handleWardChange,
      onWardKeywordChange: handleWardKeywordChange,
      handleWardChange,
      handleDistrictChange,
      handleProvinceChange,
      // isPurchase
      onIsPurchaseChange: handleChangeIsPurchase,
      // isMain
      onIsMainChange: handleChangeIsMain,
      // status
      onStatusChange: handleChangeStatus,

      getQualifiedArray
    },
  }
}

export default useInfo
