import {sendRequest, sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {currentPageActions} from '../provider/_actions'
import {ConfirmInfoContext} from '../provider/_context'
import {provinceData} from '../provider/_initialState'
import ArrayUtils from '../utils/array'
import StringUtils from '../utils/string'
import {
  transformAddressData,
  transformCustomerData,
  transformQueryObjToString,
} from '../utils/transform'
import {debounce} from '@mui/material'

const useConfirmInfo = () => {
  const {pageState, pageDispatch} = useContext(ConfirmInfoContext)
  const {info} = pageState.form
  const [errorSeparate, setErrorSeparate] = useState(false)

  // ======================================================================================================
  // ADDRESS
  // ======================================================================================================
  const addressData = info.address

  const [canSplitAddress, setCanSplitAddress] = useState(true)

  const handleAddressValidate = address => {
    pageDispatch({
      type: currentPageActions.SET_VALIDATE_FORM,
      payload: {
        address: !!address ? (
          address.length > 255 ? (
            <div style={{position: 'relative'}}>
              <span
                style={{
                  position: 'absolute',
                  top: '34px',
                  left: 0,
                  width: '100%',
                }}
              >
                Địa chỉ đầy đủ chỉ được phép nhập tối đa 255 ký tự.
              </span>
            </div>
          ) : (
            ''
          )
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{color: '#FF424E',position: 'absolute', top: '0', left: 0, width: '100%'}}
            >
              Địa chỉ đầy đủ không được bỏ trống.
            </span>
          </div>
        ),
      },
    })
  }

  const handleProvinceValidate = boo => {
    pageDispatch({
      type: currentPageActions.SET_VALIDATE_FORM,
      payload: {
        province: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '100%'}}
            >
              Tỉnh / thành phố không được bỏ trống.
            </span>
          </div>
        ),
      },
    })
  }

  const handleDistrictValidate = boo => {
    pageDispatch({
      type: currentPageActions.SET_VALIDATE_FORM,
      payload: {
        district: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '100%'}}
            >
              Quận / huyện không được bỏ trống.
            </span>
          </div>
        ),
      },
    })
  }

  const handleWardValidate = boo => {
    pageDispatch({
      type: currentPageActions.SET_VALIDATE_FORM,
      payload: {
        ward: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '100%'}}
            >
              Phường / xã không được bỏ trống.
            </span>
          </div>
        ),
      },
    })
  }

  const handleAddressChange = val => {
    handleAddressValidate(val)
    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_UPDATE,
      payload: {value: val},
    })
    setErrorSeparate(false)
  }

  const handleSuggestAddressSplit = item => {
    const address =
      item?.suggest +
      ', ' +
      item?.ward_name +
      ', ' +
      item?.district_name +
      ', ' +
      item?.city_name
    pageDispatch({
      type: currentPageActions.SET_USER_SUGGEST_ADDRESS,
      payload: [],
    })
    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_UPDATE,
      payload: {value: address},
    })
    handleAddressSplit(address)
  }

  const handleAddressSplit = async address => {
    if (!!!address.trim()) return

    setCanSplitAddress(false)

    const response = await sendRequest(
      'get',
      `${config.API}/area/detect-address?address=${address.trim()}`,
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

      const isErrorSplit =
        (response?.data?.data?.city_id === 0 &&
          response?.data?.data?.district_id === 0 &&
          response?.data?.data?.ward_id === 0) ||
        response?.data?.data?.length === 0

      if (isErrorSplit) {
        setErrorSeparate(true)
      } else {
        setErrorSeparate(false)
      }

      // pageDispatch({
      //   type: currentPageActions.SET_VALIDATE_FORM,
      //   payload: {
      //     address: !isErrorSplit ? (
      //       ''
      //     ) : (
      //       <Tooltip placement="right" title={props?.titleProps}>
      //         <div style={{position: 'relative', width: '100%'}}>
      //           <div
      //             className={'filter-content__item-icon'}
      //             onClick={handleInputFocus}
      //           >
      //             {iconProps}
      //           </div>
      //           <span
      //             style={{position: 'absolute', top: 0, left: 0, width: '100%'}}
      //           >
      //             Hệ thống chưa nhận diện dc địa chỉ này, hãy kiểm tra lại hoặc
      //             tự chọn địa chỉ ở bên dưới bạn nhé
      //           </span>
      //         </div>
      //       </Tooltip>
      //     ),
      //   },
      // })
    }

    setCanSplitAddress(true)
  }

  const handleProvinceChange = data => {
    handleProvinceValidate(true)
    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_PROVINCE_UPDATE,
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

    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE,
      payload: {list: listData, keyword: data?.value || ''},
    })
  }

  const handleDistrictChange = data => {
    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_DISTRICT_UPDATE,
      payload: {
        district: {value: {value: data.id, ...data}},
        ward: {
          list: ArrayUtils.getQualifiedArray(data?.list).map(
            transformAddressData,
          ),
        },
      },
    })
    handleDistrictValidate(true)
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

    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE,
      payload: {list: listData, keyword: data?.value || ''},
    })
  }

  const handleWardChange = (data, opt) => {
    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_WARD_UPDATE,
      payload: {ward: {value: data}},
    })
    handleWardValidate(true)
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

    pageDispatch({
      type: currentPageActions.FORM_ADDRESS_WARD_KEYWORD_UPDATE,
      payload: {list: listData, keyword: data?.value || ''},
    })
  }

  return {
    data: info,
    properties: {canSplitAddress},
    errorSeparate,
    methods: {
      onAddressChange: handleAddressChange,
      onAddressSplit: handleAddressSplit,
      onProvinceChange: handleProvinceChange,
      onProvinceKeywordChange: handleProvinceKeywordChange,
      onDistrictChange: handleDistrictChange,
      onDistrictKeywordChange: handleDistrictKeywordChange,
      onWardChange: handleWardChange,
      onWardKeywordChange: handleWardKeywordChange,
      onAddressValidate: handleAddressValidate,
      onProvinceValidate: handleProvinceValidate,
      onDistrictValidate: handleDistrictValidate,
      onWardValidate: handleWardValidate,
      onSuggestAddressValidate: handleSuggestAddressSplit,
    },
  }
}

export default useConfirmInfo
