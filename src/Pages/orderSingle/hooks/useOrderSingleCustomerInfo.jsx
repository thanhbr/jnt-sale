import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {orderSingleAction} from '../provider/_actions'
import {OrderSingleContext} from '../provider/_context'
import {provinceData} from '../provider/_initialState'
import ArrayUtils from '../utils/array'
import StringUtils from '../utils/string'
import {
  transformAddressData,
  transformCustomerData,
  transformQueryObjToString,
} from '../utils/transform'
import useOrderSingleShippingInfo from './useOrderSingleShippingInfo'
import {debounce} from "@mui/material";

const useOrderSingleCustomerInfo = () => {
  const {state, dispatch} = useContext(OrderSingleContext)
  const {customerInfo} = state.form
  const {methods} = useOrderSingleShippingInfo()
  const [errorSeparate, setErrorSeparate] = useState(false)
  const updateAddress = state.form.customerInfo.updateAddress

  const customerOrderQueries = {
    keyword: '',
    start_date: '',
    end_date: '',
    shipping_status_id: '',
    per_page: '',
    start: 0,
  }

  const customerQueries = {
    keyword: '',
    group: '',
    city_id: '',
    district_id: '',
    ward_id: '',
    status: 1,
    per_page: 20,
    start: 0,
  }

  const handleFetchCustomerDetail = async (id, opt) => {
    if (!!!id) return

    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/detail/${id}`,
    )

    if (!!response?.data?.success) {
      const resData = response?.data?.data
      // update full name
      handleFullNameChange(resData?.customer_name || '')
      // update address
      handleAddressChange(resData?.customer_short_address || '')
      // update province
      const findProvince = provinceData.find(
        item => item?.value === resData?.city_id,
      )
      if (!!findProvince) {
        handleProvinceChange(findProvince)
        // update district
        const districtData = ArrayUtils.getQualifiedArray(findProvince?.list)
        const findDistrict = districtData.find(
          item => item?.id === resData?.district_id,
        )
        if (!!findDistrict) {
          handleDistrictChange(findDistrict)
          // update ward
          const wardData = ArrayUtils.getQualifiedArray(findDistrict?.list)
          const findWard = wardData.find(item => item?.id === resData?.ward_id)
          if (!!findWard) {
            findWard.value = findWard.id
            handleWardChange(findWard, {
              cityId: findProvince?.value,
              districtId: findDistrict?.id,
            })
          }
        }
      }
    }
    // update phone
    handlePhoneChange(
      response?.data?.data?.customer_mobile
        ? response.data.data.customer_mobile
        : opt?.currentValue || '',
      {isUpdateFromChosen: true},
    )
  }

  const handleFetchCustomerOrder = async (id, opt) => {
    if (!id) return

    const q = transformQueryObjToString({
      ...customerOrderQueries,
      ...opt?.queries,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/order-list/${id}${q}`,
    )

    return response
  }

  const handleFetchCustomerOrderFigure = async id => {
    if (!id) return

    const response = sendRequestAuth(
      'get',
      `${config.API}/customer/order-total-list/${id}`,
    )

    return response
  }

  const handleFetchCustomerReport = async phone => {
    if (phone !== null) {
      const response = await sendRequestAuth(
        'get',
        `${config.API}/order/customer/report/detail?phone=${phone.trim()}`,
      )
      if (response?.data?.success)
        dispatch({
          type: orderSingleAction.FORM_PHONE_REPORT_UPDATE,
          payload: {list: ArrayUtils.getQualifiedArray(response?.data?.data)},
        })
        dispatch({
          type: orderSingleAction.FORM_UPDATE_ADDRESS,
          payload: {
            ...state.form.customerInfo.updateAddress,
            open: response?.data?.data?.length === 1,
            check: false
          },
        })
    } else
      dispatch({
        type: orderSingleAction.FORM_PHONE_REPORT_UPDATE,
        payload: {list: []},
      })
  }
  const handleCheckUpdateAddress = _ => {
    dispatch({
      type: orderSingleAction.FORM_UPDATE_ADDRESS,
      payload: {
        ...state.form.customerInfo.updateAddress,
        check: !state.form.customerInfo.updateAddress.check
      },
    })
  }

  // ======================================================================================================
  // PHONE
  // ======================================================================================================
  const phoneData = customerInfo.phone

  const [phoneValidate, setPhoneValidate] = useState('')
  const [isPhoneListLoading, setIsPhoneListLoading] = useState(false)

  const handleFetchPhoneList = async (k, opt) => {
    if (isPhoneListLoading) return

    const page = Number(opt?.page || 0)

    if (page === 0) setIsPhoneListLoading(true)

    const q = transformQueryObjToString({
      ...customerQueries,
      keyword: opt?.isRefresh ? '' : k.trim(),
      start: page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/customer-search${q}`,
    )

    if (!!response?.data?.success) {
      const formatPhoneList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformCustomerData)
      dispatch({
        type: orderSingleAction.FORM_PHONE_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? formatPhoneList
              : [...phoneData.list, ...formatPhoneList],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
      if(!!response?.data?.data?.find(item => item.mobile === k)) {
        setTimeout(() => {
          dispatch({
            type: orderSingleAction.FORM_UPDATE_ADDRESS,
            payload: {
              ...state.form.customerInfo.updateAddress,
              open: true,
              check: false
            },
          })
        }, 500)
      }
    }

    setTimeout(() => page === 0 && setIsPhoneListLoading(false), 500)

    return response
  }

  let phoneTimeout
  const handlePhoneChange = async (val, opt) => {
    const keyword = val ? `${val}` : ''

    if (!!opt?.isChosen) {
      dispatch({type: orderSingleAction.FORM_PHONE_DETAIL_DELETE})
      dispatch({type: orderSingleAction.FORM_PHONE_ORDER_FIGURE_LOADING_UPDATE})
      dispatch({
        type: orderSingleAction.FORM_PHONE_DETAIL_UPDATE,
        payload: {detail: opt.data},
      })
      dispatch({
        type: orderSingleAction.FORM_PHONE_LIST_UPDATE,
        payload: {list: []},
      })
      if (opt?.data?.id) {
        // customer detail
        handleFetchCustomerDetail(opt.data.id, {
          currentValue: opt?.data?.mobile,
        })
        // customer order
        const cusomterOrderResponse = handleFetchCustomerOrder(opt.data.id, {
          queries: {per_page: 10},
        })
        cusomterOrderResponse.then(res => {
          if (res?.data?.success) {
            dispatch({
              type: orderSingleAction.FORM_PHONE_ORDER_RECENT_UPDATE,
              payload: {
                recentList: ArrayUtils.getQualifiedArray(res?.data?.data),
              },
            })
          }
        })

        // customer order figure
        const cusomterOrderFigureResponse = handleFetchCustomerOrderFigure(
          opt.data.id,
        )
        cusomterOrderFigureResponse.then(res => {
          if (res?.data?.success) {
            dispatch({
              type: orderSingleAction.FORM_PHONE_ORDER_FIGURE_UPDATE,
              payload: {
                figures: ArrayUtils.getQualifiedArray(res?.data?.data),
              },
            })
          }

          dispatch({
            type: orderSingleAction.FORM_PHONE_ORDER_FIGURE_LOADING_UPDATE,
          })
        })
      }

      handleFullNameValidate(true)
      handlePhoneValidate(true)
      handleAddressValidate(true)
      handleProvinceValidate(true)
      handleDistrictValidate(true)
      handleWardValidate(true)
    } else {
      dispatch({
        type: orderSingleAction.FORM_PHONE_UPDATE,
        payload: {value: keyword},
      })
      if (keyword !== phoneData.detail?.mobile && !opt?.isUpdateFromChosen)
        dispatch({type: orderSingleAction.FORM_PHONE_DETAIL_DELETE})

      clearTimeout(phoneTimeout)
      phoneTimeout = setTimeout(() => {
        // fetch suggest list
        handleFetchPhoneList(keyword, {isRefresh: opt?.isRefresh})
        // fetch report
        handleFetchCustomerReport(keyword)
      }, 1000)
    }
  }

  const handlePhoneLoadMore = () => {
    const currentTotal = phoneData.list.length
    const total = phoneData.total

    if (currentTotal >= total) return

    const response = handleFetchPhoneList(phoneData.value, {
      page: phoneData.page + 1,
    })

    return response
  }

  const handlePhoneValidate = boo => {
    setPhoneValidate(!!boo ? '' : 'Tối thiểu có 10 và tối đa 11 chữ số')
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        phone: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '210px'}}
            >
              Tối thiểu có 10 và tối đa 11 chữ số
            </span>
          </div>
        ),
      },
    })
  }

  // ======================================================================================================
  // FULL NAME
  // ======================================================================================================
  const fullNameData = customerInfo.fullName

  const handleFullNameValidate = boo => {
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        fullName: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '210px'}}
            >
              Tên khách hàng không được bỏ trống
            </span>
          </div>
        ),
      },
    })
  }

  const handleFetchCustomerList = async (k, page) => {
    if (fullNameData.loading) return

    dispatch({
      type: orderSingleAction.FORM_FULL_NAME_LOADING_UPDATE,
      payload: {loading: true},
    })

    if (page === 0) setIsPhoneListLoading(true)

    const q = transformQueryObjToString({
      ...customerQueries,
      keyword: k.trim(),
      start: page * 20,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/customer/customers${q}`,
    )

    if (!!response?.data?.success) {
      const formatCustomerList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformCustomerData)

      dispatch({
        type: orderSingleAction.FORM_FULL_NAME_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? formatCustomerList
              : [...fullNameData.list, ...formatCustomerList],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })

      dispatch({ type: orderSingleAction.FORM_FULL_NAME_LOADING_UPDATE, payload: {loading: false} })
    }

    if (page === 0) setIsPhoneListLoading(false)

    return response
  }

  const handleFullNameChange = val => {
    dispatch({
      type: orderSingleAction.FORM_FULL_NAME_UPDATE,
      payload: {value: val},
    })
    handleFullNameValidate(true)
  }


  const debounceFullNameKeywordChange = useCallback(debounce((keyword, page = 0) => {
    handleFetchCustomerList(keyword, 0)
  }, 500), [])
  const handleFullNameKeywordChange = val => {
    const keyword = val ? `${val}` : ''

    dispatch({
      type: orderSingleAction.FORM_FULL_NAME_KEYWORD_UPDATE,
      payload: {keyword},
    })
    debounceFullNameKeywordChange(keyword, 0)
  }

  const handleFullNameListLoadMore = () => {
    const currentTotal = fullNameData.list.length
    const total = fullNameData.total

    if (currentTotal >= total) return

    const response = handleFetchCustomerList(
      fullNameData.keyword,
      fullNameData.page + 1,
    )
    return response
  }

  const handleFullNameListReset = () => {
    dispatch({
      type: orderSingleAction.FORM_FULL_NAME_KEYWORD_UPDATE,
      payload: {keyword: ''},
    })

    dispatch({
      type: orderSingleAction.FORM_FULL_NAME_LIST_UPDATE,
      payload: {
        list: fullNameData.listOrigin,
        loading: false,
        page: 0,
        total: fullNameData.totalOrigin,
      },
    })
  }

  // ======================================================================================================
  // ADDRESS
  // ======================================================================================================
  const addressData = customerInfo.address

  const [canSplitAddress, setCanSplitAddress] = useState(true)

  const handleAddressValidate = boo => {
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        address: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '210px'}}
            >
              Địa chỉ đầy đủ không được bỏ trống
            </span>
          </div>
        ),
      },
    })
  }

  const handleProvinceValidate = boo => {
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        province: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '210px'}}
            >
              Tỉnh / thành phố không được bỏ trống
            </span>
          </div>
        ),
      },
    })
  }

  const handleDistrictValidate = boo => {
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        district: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '210px'}}
            >
              Quận / huyện không được bỏ trống
            </span>
          </div>
        ),
      },
    })
  }

  const handleWardValidate = boo => {
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        ward: !!boo ? (
          ''
        ) : (
          <div style={{position: 'relative'}}>
            <span
              style={{position: 'absolute', top: 0, left: 0, width: '210px'}}
            >
              Phường / xã không được bỏ trống
            </span>
          </div>
        ),
      },
    })
  }

  const handleAddressChange = val => {
    handleAddressValidate(val.trim() !== '' ? true : false)
    dispatch({
      type: orderSingleAction.FORM_ADDRESS_UPDATE,
      payload: {value: val},
    })
    setErrorSeparate(false)

    const city_id = customerInfo.address.province.value ? customerInfo.address.province.value.value : 0;
    const district_id = customerInfo.address.district.value  ? customerInfo.address.district.value.value  : 0;
    const ward_id = customerInfo.address.ward.value  ? customerInfo.address.ward.value.value  : 0;
    const data = {
      'keyword' : val.trim(),
      'city_id' : city_id || 0,
      'district_id': district_id || city_id || 0,
      'ward_id' : ward_id || 0
    }
    debouncePostKeywordChange(data)
  }

  const debouncePostKeywordChange = useCallback(debounce((data) => {
    handleAddressChangeDebounce(data)
  },500), [])

  const handleAddressChangeDebounce = async data => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/suggest-address?keyword=${data.keyword}&city_id=${data.city_id}&district_id=${data.district_id}&ward_id=${data.ward_id}`,
    )
    if (!!response?.data?.success) {
      dispatch({
        type: orderSingleAction.SET_CUSTOMER_SUGGEST_ADDRESS,
        payload:response?.data?.data,
      })
    }
  }
  const handleSuggestAddressSplit = item => {
    const address = item?.suggest+', '+item?.ward_name+', '+item?.district_name+', '+item?.city_name
    dispatch({
      type: orderSingleAction.SET_CUSTOMER_SUGGEST_ADDRESS,
      payload:[]
    })
    dispatch({
      type: orderSingleAction.FORM_ADDRESS_UPDATE,
      payload: {value: address},
    })
    handleAddressSplit(address)
  }
  

  const handleAddressSplit = async (address) => { 

    if (!!!address.trim()) return
    
    setCanSplitAddress(false)

    const response = await sendRequestAuth(
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
    handleProvinceValidate(true)
    dispatch({
      type: orderSingleAction.FORM_ADDRESS_PROVINCE_UPDATE,
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
      type: orderSingleAction.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE,
      payload: {list: listData, keyword: data?.value || ''},
    })
  }

  const handleDistrictChange = data => {
    dispatch({
      type: orderSingleAction.FORM_ADDRESS_DISTRICT_UPDATE,
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

    dispatch({
      type: orderSingleAction.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE,
      payload: {list: listData, keyword: data?.value || ''},
    })
  }

  const handleWardChange = (data, opt) => {
    dispatch({
      type: orderSingleAction.FORM_ADDRESS_WARD_UPDATE,
      payload: {ward: {value: data}},
    })
    methods.getFeeShipping(data, {queries: {...opt}})
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

    dispatch({
      type: orderSingleAction.FORM_ADDRESS_WARD_KEYWORD_UPDATE,
      payload: {list: listData, keyword: data?.value || ''},
    })
  }

  return {
    data: customerInfo,
    validate: {phone: phoneValidate},
    properties: {canSplitAddress, isPhoneListLoading},
    errorSeparate,
    updateAddress,
    methods: {
      // phone
      onPhoneChange: handlePhoneChange,
      onPhoneLoadmore: handlePhoneLoadMore,
      onPhoneValidate: handlePhoneValidate,
      onPhoneCheckExistData: () => phoneData.listOrigin.length > 0,
      // full name
      onFullNameChange: handleFullNameChange,
      onFullNameFetchCustomerList: handleFetchCustomerList,
      onFullNameFetchMoreCustomerList: handleFullNameListLoadMore,
      onFullNameKeywordChange: handleFullNameKeywordChange,
      onFullNameListReset: handleFullNameListReset,
      onFullNameValidate: handleFullNameValidate,
      // address
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
      onCheckUpdateAddress: handleCheckUpdateAddress
    },
  }
}

export default useOrderSingleCustomerInfo
