import React, { useCallback, useContext, useState } from 'react'
import { PosOrderContext } from '../provider/_context'
import { posOrderActions as actions, posOrderActions } from '../provider/_actions'
import { debounce } from '@mui/material'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import { provinceData } from '../../orderSingle/provider/_initialState'
import ArrayUtils from '../../orderSingle/utils/array'
import { transformAddressData } from '../../orderSingle/utils/transform'
import StringUtils from '../../orderSingle/utils/string'
import { transformCustomerData } from '../until/transform'
import useAlert from '../../../hook/useAlert'
import { transformProductData } from '../../purchases/utils/transform'
import { orderSingleAction } from '../../orderSingle/provider/_actions'

export const usePosCustomer = () => {
  const { state, dispatch } = useContext(PosOrderContext)
  const [errorSeparate, setErrorSeparate] = useState(false)
  const [canSplitAddress, setCanSplitAddress] = useState(true)
  const { showAlert } = useAlert()
  // ==========  ========== Customer ========== ==========
  const customerList = state?.customerInfo?.list
  const { createCustomer } = state.rightContent.modal
  const customerInfo = createCustomer.form
  const addressData = customerInfo.address

  const orderCustomer = state.orders.customer
  const activeOrderId = state.orders.active

  const activeOrderCustomer = state.orders.customer?.length > 0 ? state.orders.customer.find(item => item.id == activeOrderId) : {}

  const handleSelectCustomer = (value, opt) => {
    let data = opt?.data || {}
    let newOrderCustomer = orderCustomer
    if (newOrderCustomer.length == 0)
      newOrderCustomer = [{ id: activeOrderId, data: data }]
    else
      newOrderCustomer.map((item, index) => {
        if (item.id == activeOrderId) newOrderCustomer[index] = { id: activeOrderId, data: data, tab: 'select' }
      })

    dispatch({
      type: posOrderActions.ORDER_CUSTOMER_VALUE_UPDATE,
      payload: newOrderCustomer
    })
  }
  const handleRemoveCustomer = _ => {
    let newOrderCustomer = orderCustomer
    newOrderCustomer.map((item, index) => {
      if (item.id == activeOrderId) newOrderCustomer[index] = { id: activeOrderId, data: {}, tab: 'select' }
    })

    dispatch({
      type: posOrderActions.ORDER_CUSTOMER_VALUE_UPDATE,
      payload: newOrderCustomer
    })
  }

// CREATE CUSTOMER

  const handleDisplayModalCreateCustomer = boo => {
    dispatch({
      type: posOrderActions.FORM_CREATE_CUSTOMER_DISPLAY,
      payload: boo
    })
  }
  const handleShowMoreModalCreateCustomer = _ =>
    dispatch({
      type: posOrderActions.FORM_CUSTOMER_SHOW_MORE,
      payload: !createCustomer.showMore,
    })

  const handleAddressChange = val => {
    dispatch({
      type: posOrderActions.FORM_ADDRESS_UPDATE,
      payload: { value: val },
    })
    setErrorSeparate(false)

    const city_id = customerInfo.address.province.value ? customerInfo.address.province.value.value : 0
    const district_id = customerInfo.address.district.value ? customerInfo.address.district.value.value : 0
    const ward_id = customerInfo.address.ward.value ? customerInfo.address.ward.value.value : 0
    const data = {
      'keyword': val.trim(),
      'city_id': city_id || 0,
      'district_id': district_id || city_id || 0,
      'ward_id': ward_id || 0
    }
    debouncePostKeywordChange(data)
  }

  const debouncePostKeywordChange = useCallback(debounce((data) => {
    handleAddressChangeDebounce(data)
  }, 500), [])

  const handleAddressChangeDebounce = async data => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/suggest-address?keyword=${data.keyword}&city_id=${data.city_id}&district_id=${data.district_id}&ward_id=${data.ward_id}`,
    )
    if (!!response?.data?.success) {
      dispatch({
        type: posOrderActions.SET_CUSTOMER_SUGGEST_ADDRESS,
        payload: response?.data?.data,
      })
    }
  }
  const handleSuggestAddressSplit = item => {
    const address = item?.suggest + ', ' + item?.ward_name + ', ' + item?.district_name + ', ' + item?.city_name
    dispatch({
      type: posOrderActions.SET_CUSTOMER_SUGGEST_ADDRESS,
      payload: []
    })
    dispatch({
      type: posOrderActions.FORM_ADDRESS_UPDATE,
      payload: { value: address },
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
    dispatch({
      type: posOrderActions.FORM_ADDRESS_PROVINCE_UPDATE,
      payload: {
        province: { value: data },
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
      type: posOrderActions.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE,
      payload: { list: listData, keyword: data?.value || '' },
    })
  }

  const handleDistrictChange = data => {
    dispatch({
      type: posOrderActions.FORM_ADDRESS_DISTRICT_UPDATE,
      payload: {
        district: { value: { value: data.id, ...data } },
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
      type: posOrderActions.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE,
      payload: { list: listData, keyword: data?.value || '' },
    })
  }

  const handleWardChange = (data, opt) => {
    dispatch({
      type: posOrderActions.FORM_ADDRESS_WARD_UPDATE,
      payload: { ward: { value: data } },
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
      type: posOrderActions.FORM_ADDRESS_WARD_KEYWORD_UPDATE,
      payload: { list: listData, keyword: data?.value || '' },
    })
  }

  // ==========  ========== GROUP Customer ========== ==========

  const listGroupCustomer = createCustomer.form?.groupCustomer?.list
  const listOriginGroupCustomer = createCustomer.form?.groupCustomer?.listOrigin
  const valueGroupCustomer = createCustomer.form?.groupCustomer?.value
  const keywordGroupCustomer = createCustomer.form?.groupCustomer?.keyword

  const handleGroupCustomerKeywordChange = data => {
    const formatDataValue = data?.value
      ? StringUtils.removeAcent(data?.value?.toLowerCase())
      : ''

    const listData = listOriginGroupCustomer.filter(item => {
      const formatNameItem = item?.name
        ? StringUtils.removeAcent(item.name.toLowerCase())
        : ''

      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })

    dispatch({
      type: posOrderActions.FORM_GROUP_CUSTOMER_UPDATE,
      payload: { list: listData, keyword: data?.value || '' },
    })
  }

  const handleGroupCustomerChange = data => {
    dispatch({
      type: posOrderActions.FORM_GROUP_CUSTOMER_UPDATE,
      payload: { value: data },
    })
  }

  // Gender

  const gender = createCustomer.form?.gender

  const handleGenderChange = data => {
    dispatch({
      type: posOrderActions.FORM_GENDER_CUSTOMER_UPDATE,
      payload: { value: data },
    })
  }

  // Phone

  const handleChangePhone = data => {
    if (data.length > 0)
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          phone: ''
        }
      })
    dispatch({
      type: posOrderActions.FORM_PHONE_CUSTOMER_UPDATE,
      payload: data,
    })
  }

  const handlePhoneValidate = boo => {
    dispatch({
      type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
      payload: {
        phone: !!boo ? (
          ''
        ) : (
          <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '200px' }}
            >
              Tối thiểu có 10 và tối đa 11 chữ số
            </span>
          </div>
        ),
      },
    })
  }
  // FULL NAME

  const handleChangeFullName = data => {
    if (data.length > 0)
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          fullName: ''
        }
      })
    dispatch({
      type: posOrderActions.FORM_NAME_CUSTOMER_UPDATE,
      payload: data,
    })
  }
  // CODE

  const handleChangeCode = data => {
    dispatch({
      type: posOrderActions.FORM_CODE_CUSTOMER_UPDATE,
      payload: data,
    })
  }

  // EMAIL

  const handleChangeEmail = data => {
    dispatch({
      type: posOrderActions.FORM_EMAIL_CUSTOMER_UPDATE,
      payload: data,
    })
    if (data?.length == 0 || data == '') {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          email: ''
        }
      })
    }
  }

  // NOTE

  const handleChangeNote = data => {
    if (data.length > 255) {
      dispatch({
        type: posOrderActions.FORM_NOTE_CUSTOMER_UPDATE,
        payload: data.substr(0,256),
      })
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          note: 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!'
        }
      })
    }else{
      dispatch({
        type: posOrderActions.FORM_NOTE_CUSTOMER_UPDATE,
        payload: data,
      })
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          note: ''
        }
      })
    }
  }

  const validateForm = () => {
    let statusValidate = true
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (createCustomer.form?.email.trim() && !regex.test(createCustomer.form?.email)) {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          email: 'Email không đúng định dạng'
        }
      })
      statusValidate = false
    } else {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          email: ''
        }
      })
    }
    if (createCustomer.form?.email.length > 255) {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          note: 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!'
        }
      })
      statusValidate = false
    } else {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          note: ''
        }
      })
    }
    if (createCustomer.form?.phone == '' || !createCustomer.form?.phone) {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          phone: 'Số điện thoại không được bỏ trống!'
        }
      })
      statusValidate = false
    } else {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          phone: ''
        }
      })
    }
    if (createCustomer.form?.fullName == '' || !createCustomer.form?.fullName) {
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          fullName: 'Tên khách hàng không được bỏ trống!'
        }
      })
      statusValidate = false
    } else
      dispatch({
        type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
        payload: {
          fullName: ''
        }
      })

    return statusValidate
  }

  const handleCreateCustomer = async _ => {
    let data = {
      code: createCustomer.form?.code || '',
      name: createCustomer.form?.fullName || '',
      mobile: createCustomer.form?.phone || '',
      email: createCustomer.form?.email || '',
      note: createCustomer.form?.note || '',
      gender: createCustomer.form?.gender?.value?.value || '',
      address: createCustomer.form?.address?.value || '',
      city_id: createCustomer.form?.address?.province?.value?.value || '',
      district_id: createCustomer.form?.address?.district?.value?.value || '',
      ward_id: createCustomer.form?.address?.ward?.value?.value || '',
      group: createCustomer.form?.groupCustomer?.value?.value || '',
      price_list: '',
      status: 1
    }
    if (!validateForm()) return
    const response = await sendRequestAuth(
      'post',
      `${config.API}/customer/quick-create`,
      data,
    )
    if (!!response?.data?.success) {
      handleDisplayModalCreateCustomer(false)
      getListCustomer()
      dispatch({
        type: posOrderActions.RESET_FORM_CREATE_CUSTOMER
      })
      data.id = response?.data?.meta?.insert_id || ''
      let newOrderCustomer = orderCustomer
      if (newOrderCustomer.length == 0)
        newOrderCustomer = [{ id: activeOrderId, data: data }]
      else
        newOrderCustomer.map((item, index) => {
          if (item.id == activeOrderId) newOrderCustomer[index] = { id: activeOrderId, data: data, tab: 'select' }
        })
      dispatch({
        type: posOrderActions.ORDER_CUSTOMER_VALUE_UPDATE,
        payload: newOrderCustomer
      })

      showAlert({
        type: 'success',
        content: 'Tạo khách hàng thành công.'
      })
    } else {
      if (response?.data?.errors[0]?.field == 'mobile') {
        dispatch({
          type: posOrderActions.VALIDATE_FORM_CUSTOMER_UPDATE,
          payload: {
            phone: response?.data?.errors[0]?.message
          }
        })
      } else
        showAlert({
          type: 'danger',
          content: response?.data?.errors[0]?.message
        })
    }
  }

  const debounceSearchCustomer = useCallback(debounce(keyword => getListCustomer({ keyword }), 500), [])

  const handleKeywordCustomerChange = data => {
    dispatch({
      type: posOrderActions.UPDATE_LIST_CUSTOMER,
      payload: {
        customerInfo: {
          keyword: data || '',
        },
      }
    })
    debounceSearchCustomer(data)
  }

  const getListCustomer = async (opt = {}) => {
    const response = await sendRequestAuth('get', `${config.API}/customer/customer-search?keyword=${opt?.keyword || ''}&group=&city_id=&district_id=&ward_id=&status=1&per_page=20&start=0`)
    if (!!response.data.success) {
      const formatCustomerList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformCustomerData)
      dispatch({
        type: posOrderActions.UPDATE_LIST_CUSTOMER,
        payload: {
          customerInfo: {
            list: formatCustomerList,
            total: response?.data?.meta?.total,
          },
        }
      })
    }
  }
  const [loadingMore, setLoadingMore] = useState(false)
  const onLoadMore = async () => {
    if (loadingMore) return
    const currentTotal = state.customerInfo.list.length
    const total = state.customerInfo.total
    if (currentTotal >= total) return
    setLoadingMore(true)
    const response = await sendRequestAuth('get', `${config.API}/customer/customer-search?keyword=${state.customerInfo?.keyword || ''}&group=&city_id=&district_id=&ward_id=&status=1&per_page=20&start=${state.customerInfo.list.length}`)
    if (!!response.data.success) {
      const formatCustomerList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformCustomerData)
      dispatch({
        type: posOrderActions.UPDATE_LIST_CUSTOMER,
        payload: {
          customerInfo: {
            list: [...state.customerInfo.list, ...formatCustomerList],
          },
        }
      })
      setLoadingMore(false)
    }
  }

  const pageActive = state?.orders?.active
  const orderHasSent = !!state?.rightContent?.modal?.responseSubmit?.sent?.find(item => +item === +pageActive)
  const customerActive = state?.orders?.customer?.find(item => +item.id === +pageActive && item.tab === 'select')

  return {

    customer: {
      keyword: state.customerInfo?.keyword,
      list: customerList,
      active: activeOrderCustomer,
      onSearch: handleKeywordCustomerChange,
      onItemChange: handleSelectCustomer,
      onRemove: handleRemoveCustomer,
      onLoadMore: onLoadMore,
      loadingMore: loadingMore
    },
    groupCustomer: {
      list: listGroupCustomer,
      value: valueGroupCustomer,
      keyword: keywordGroupCustomer,
      onGroupCustomerKeywordChange: handleGroupCustomerKeywordChange,
      onGroupCustomerChange: handleGroupCustomerChange
    },
    gender: {
      ...gender,
      onGenderChange: handleGenderChange
    },
    phone: {
      value: createCustomer.form?.phone,
      onchange: handleChangePhone,
      onValidate: handlePhoneValidate,
    },
    fullName: {
      value: createCustomer.form?.fullname,
      onchange: handleChangeFullName
    },
    code: {
      value: createCustomer.form?.code,
      onchange: handleChangeCode
    },
    email: {
      value: createCustomer.form?.email,
      onchange: handleChangeEmail
    },
    note: {
      value: createCustomer.form?.note,
      onchange: handleChangeNote
    },
    createCustomerModal: createCustomer,
    properties: { canSplitAddress },
    errorSeparate,
    methods: {
      // phone
      // full name
      // address
      onAddressChange: handleAddressChange,
      onAddressSplit: handleAddressSplit,
      onProvinceChange: handleProvinceChange,
      onProvinceKeywordChange: handleProvinceKeywordChange,
      onDistrictChange: handleDistrictChange,
      onDistrictKeywordChange: handleDistrictKeywordChange,
      onWardChange: handleWardChange,
      onWardKeywordChange: handleWardKeywordChange,
      onSuggestAddressValidate: handleSuggestAddressSplit,
      onDisplayCreate: handleDisplayModalCreateCustomer,
      onShowMore: handleShowMoreModalCreateCustomer,
      onSubmitForm: handleCreateCustomer
    },
    customerActive,
    orderHasSent
  }
}