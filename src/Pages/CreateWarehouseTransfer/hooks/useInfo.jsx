import {sendRequestAuth} from 'api/api'
import config from 'config'
import addressData from 'Pages/addressSeparationTool/_data.json'
import {useContext, useState} from 'react'
import {actionTypes} from '../provider/_actions'
import {WarehouseTransferContext} from '../provider/_context'
import {transformAddressData} from '../utils/transform'

const provinceData = addressData.map(transformAddressData)

const getQualifiedArray = arr => {
  return Array.isArray(arr) ? arr : []
}

const useInfo = () => {
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {form} = state.createModal

  // ======================================================================================================
  // NAME
  // ======================================================================================================

  const handleChangeName = val =>
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          name: {
            ...form.name,
            value: val,
          },
        },
      },
    })

  // ======================================================================================================
  // ISPURCHASE
  // ======================================================================================================

  const handleChangeIsPurchase = e => {
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          isPurchase: {
            ...form.isPurchase,
            value: e.target.checked,
          },
        },
      },
    })
  }

  // ======================================================================================================
  // ISMAIN
  // ======================================================================================================

  const handleChangeIsMain = e => {
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          isMain: {
            ...form.isMain,
            value: e.target.checked,
          },
        },
      },
    })
  }

  // ======================================================================================================
  // STATUS
  // ======================================================================================================

  const handleChangeStatus = e => {
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          status: {
            ...form.status,
            value: e.target.checked,
          },
        },
      },
    })
  }

  // ======================================================================================================
  // ADDRESS
  // ======================================================================================================
  const addressData = form.address

  const [canSplitAddress, setCanSplitAddress] = useState(true)

  const handleAddressChange = val =>
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          address: {
            ...form.address,
            value: val,
          },
        },
      },
    })

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

      const address = {
        form: {
          ...form,
          address: {
            ...form.address,
            province: {
              ...form.address.province,
            },
            district: {
              ...form.address.district,
            },
            ward: {
              ...form.address.ward,
            },
          },
        },
      }

      if (findProvince) {
        address.form.address.province.value = findProvince
        address.form.address.district.list = getQualifiedArray(findProvince?.list).map(transformAddressData)
      }

      const findDistrict = getQualifiedArray(findProvince?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.district_id}`)
      if (findDistrict) {
        address.form.address.district.value = findDistrict
        address.form.address.ward.list = getQualifiedArray(findDistrict?.list).map(transformAddressData)
      }

      const findWard = getQualifiedArray(findDistrict?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.ward_id}`)
      if (findWard) address.form.address.ward.value = findWard

      dispatch({type: actionTypes.SET_CREATE_MODAL, payload: address})
    }

    setCanSplitAddress(true)
  }

  const handleProvinceChange = data => {
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          address: {
            ...form.address,
            province: {
              ...form.address.province,
              value: data,
            },
            district: {
              ...form.address.district,
              list: getQualifiedArray(data?.list).map(transformAddressData),
            },
          },
        },
      },
    })
  }

  const handleProvinceKeywordChange = data => {
    const formatDataValue = data?.value ? data?.value?.toLowerCase() : ''

    const listData = provinceData.filter(item => {
      const formatNameItem = item?.name ? item.name.toLowerCase() : ''
      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })

    dispatch({
      type: actionTypes.SET_CREATE_MODAL_ADDRESS_PROVINCE_KEYWORD,
      payload: {
        list: listData,
        keyword: formatDataValue,
      },
    })
  }

  const handleDistrictChange = data =>
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          address: {
            ...form.address,
            district: {
              ...form.address.district,
              value: data,
            },
            ward: {
              ...form.address.ward,
              list: getQualifiedArray(data?.list).map(transformAddressData),
            },
          },
        },
      },
    })

  const handleDistrictKeywordChange = data => {
    const formatDataValue = data?.value ? data?.value?.toLowerCase() : ''

    const compareList =
      addressData.province.value.list.map(transformAddressData)

    const listData = compareList.filter(item => {
      const formatNameItem = item?.name ? item.name.toLowerCase() : ''
      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })

    dispatch({
      type: actionTypes.SET_CREATE_MODAL_ADDRESS_DISTRICT_KEYWORD,
      payload: {
        list: listData,
        keyword: formatDataValue,
      },
    })
  }

  const handleWardChange = data => {
    dispatch({
      type: actionTypes.SET_CREATE_MODAL,
      payload: {
        form: {
          ...form,
          address: {
            ...form.address,
            ward: {
              ...form.address.ward,
              value: data,
            },
          },
        },
      },
    })
  }

  const handleWardKeywordChange = data => {
    const formatDataValue = data?.value ? data?.value?.toLowerCase() : ''

    const compareList =
      addressData.district.value.list.map(transformAddressData)

    const listData = compareList.filter(item => {
      const formatNameItem = item?.name ? item.name.toLowerCase() : ''
      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })

    dispatch({
      type: actionTypes.SET_CREATE_MODAL_ADDRESS_WARD_KEYWORD,
      payload: {
        list: listData,
        keyword: formatDataValue,
      },
    })
  }

  return {
    data: form,
    // validate: {phone: phoneValidate},
    properties: {canSplitAddress},
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

      getQualifiedArray,
    },
  }
}

export default useInfo
