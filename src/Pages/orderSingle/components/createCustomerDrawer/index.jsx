import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Input} from 'common/form/input'
import {Radio} from 'common/form/radio'
import {Select} from 'common/form/select'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import StringUtils from 'Component/surveyLogin/utils/string'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ORDER_SINGLE_CONSTANTS} from 'Pages/orderSingle/interface/_constants'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {provinceData} from 'Pages/orderSingle/provider/_initialState'
import ArrayUtils from 'Pages/orderSingle/utils/array'
import {
  transformAddressData,
  transformQueryObjToString,
} from 'Pages/orderSingle/utils/transform'
import {useEffect} from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from '../autocompleteSingleOption'
import {SelectOption} from '../selectSingleOption'
import {StyledCreateCustomerDrawer} from './_styled'
import useOrderSingleCustomerInfo from "../../hooks/useOrderSingleCustomerInfo";

const formatProvinceData = provinceData.map(province => ({
  ...province,
  list: province.list.map(district => ({
    name: district.name,
    value: district.id,
    list: district.list.map(ward => ({
      name: ward.name,
      value: ward.id,
    })),
  })),
}))

const initSubmitQueries = {
  code: '',
  name: '',
  mobile: '',
  address: '',
  city_id: '',
  district_id: '',
  ward_id: '',
  email: '',
  gender: 1,
  group: '',
  price_list: '',
  status: 1,
}

export const CreateCustomerDrawer = ({
  exit,
  loading,
  onClose,
  onExitToggle,
  onLoadingToggle,
  onModified,
  onRefetch,
  ...props
}) => {
  const {showAlert} = useAlert()
  const {methods} = useOrderSingleCustomerInfo()

  const [canLoadOrigin, setCanLoadOrigin] = useState(true)

  const [customerId, setCustomerId] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('male')

  const [customerGroupKeyword, setCustomerGroupKeyword] = useState('')
  const [customerGroupList, setCustomerGroupList] = useState([])
  const [isCustomerGroupLoading, setIsCustomerGroupLoading] = useState(false)
  const [isCustomerGroupLoadMore, setIsCustomerGroupLoadMore] = useState(false)
  const [customerGroupPage, setCustomerGroupPage] = useState(0)
  const [customerGroupTotal, setCustomerGroupTotal] = useState(0)
  const [customerGroupValue, setCustomerGroupValue] = useState(null)

  const [priceType, setPriceType] = useState(null)

  const [provinceKeyword, setProvinceKeyword] = useState('')
  const [provinceList, setProvinceList] = useState(formatProvinceData)
  const [provinceValue, setProvinceValue] = useState(null)

  const [districtKeyword, setDistrictKeyword] = useState('')
  const [districtList, setDistrictList] = useState([])
  const [districtValue, setDistrictValue] = useState(null)

  const [wardKeyword, setWardKeyword] = useState('')
  const [wardList, setWardList] = useState([])
  const [wardValue, setWardValue] = useState(null)

  const [address, setAddress] = useState('')
  const [canSplitAddress, setCanSplitAddress] = useState(true)

  const [validate, setValidate] = useState({
    code: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    location: [],
  })

  const customerGroupQueries = {
    keyword: '',
    page: 0,
    total: 0,
  }

  const submitQueries = {
    code: customerId,
    name,
    mobile: phone,
    address,
    city_id: provinceValue?.value || '',
    district_id: districtValue?.value || '',
    ward_id: wardValue?.value || '',
    email,
    gender: gender === 'male' ? 1 : 2,
    group: customerGroupValue?.value || '',
    price_list: priceType?.value || '',
    status: 1,
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
      methods.onFullNameChange(resData?.customer_name || '')
      // update address
      methods.onAddressChange(resData?.customer_short_address || '')
      // update province
      const findProvince = provinceData.find(
        item => item?.value === resData?.city_id,
      )
      if (!!findProvince) {
        methods.onProvinceChange(findProvince)
        // update district
        const districtData = ArrayUtils.getQualifiedArray(findProvince?.list)
        const findDistrict = districtData.find(
          item => item?.id === resData?.district_id,
        )
        if (!!findDistrict) {
          methods.onDistrictChange(findDistrict)
          // update ward
          const wardData = ArrayUtils.getQualifiedArray(findDistrict?.list)
          const findWard = wardData.find(item => item?.id === resData?.ward_id)
          if (!!findWard) {
            findWard.value = findWard.id
            methods.onWardChange(findWard, {
              cityId: findProvince?.value,
              districtId: findDistrict?.id,
            })
          }
        }
      }
    }
    // update phone
    methods.onPhoneChange(
      response?.data?.data?.customer_mobile
        ? response.data.data.customer_mobile
        : opt?.currentValue || '',
      {isUpdateFromChosen: true},
    )
  }


  const handleCustomerGroupFetch = async (k, opt) => {
    if (isCustomerGroupLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsCustomerGroupLoading(true)

    const q = transformQueryObjToString({
      ...customerGroupQueries,
      keyword: k.trim(),
      start: page * 10,
    })

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/customer/groups${q}`),
    ])

    if (response[0]?.data?.success) {
      const transformData = {
        customerGroup: ArrayUtils.getQualifiedArray(
          response[0]?.data?.data,
        ).map(item => ({
          data: item,
          name: item?.name || '---',
          value: item?.id || '',
        })),
      }

      setCustomerGroupList(
        page === 0
          ? transformData.customerGroup
          : [...customerGroupList, ...transformData.customerGroup],
      )
      setCustomerGroupPage(page)
      setCustomerGroupTotal(response[0]?.data?.meta?.total)
    }

    if (page === 0) setIsCustomerGroupLoading(false)

    return response
  }

  let customerGroupTimeout
  const handleCustomerGroupKeywordChange = data => {
    setCustomerGroupKeyword(data?.value || '')

    clearTimeout(customerGroupTimeout)
    customerGroupTimeout = setTimeout(() => {
      handleCustomerGroupFetch(data?.value)
    }, 500)
  }

  const handleCustomerGroupLoadMore = () => {
    const currentTotal = customerGroupList.length
    const total = customerGroupTotal

    if (currentTotal >= total) return

    setIsCustomerGroupLoadMore(true)

    const response = handleCustomerGroupFetch(customerGroupKeyword, {
      page: customerGroupPage + 1,
    })

    if (response) response.then(() => setIsCustomerGroupLoadMore(false))
    else setIsCustomerGroupLoadMore(false)
  }

  const handleSplitAddress = async () => {
    if (!canSplitAddress || !address.trim()) return

    setCanSplitAddress(false)

    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/detect-address?address=${address.trim()}`,
    )

    if (!!response?.data?.success) {
      const findProvince = provinceData.find(
        item => item?.value === `${response?.data?.data?.city_id}`,
      )
      if (findProvince) {
        // update province
        setProvinceValue(findProvince)
        // update district
        setDistrictList(findProvince.list)
        setDistrictValue(null)
        // update ward
        setWardList([])
        setWardValue(null)
      }

      const findDistrict = ArrayUtils.getQualifiedArray(findProvince?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.district_id}`)
      if (findDistrict) {
        // update district
        setDistrictValue(findDistrict)
        // update ward
        setWardList(findDistrict.list)
        setWardValue(null)
      }

      const findWard = ArrayUtils.getQualifiedArray(findDistrict?.list)
        .map(transformAddressData)
        .find(item => item?.value === `${response?.data?.data?.ward_id}`)
      if (findWard) setWardValue(findWard)
    }

    setCanSplitAddress(true)
  }

  const handleSubmit = async () => {
    if (onLoadingToggle) onLoadingToggle(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/customer/create`,
      JSON.stringify({
        code: customerId,
        name,
        mobile: phone,
        address,
        city_id: provinceValue?.value,
        district_id: districtValue?.value,
        ward_id: wardValue?.value,
        email,
        gender: gender === 'male' ? 1 : 2,
        group: customerGroupValue?.value || '',
        price_list: priceType?.value || '',
        status: 1,
      }),
    )

    if (response?.data?.success) {
      if (onRefetch) onRefetch()
      showAlert({type: 'success', content: 'Thêm mới thành công'})
      if (onLoadingToggle) onLoadingToggle(false)
      if (onClose) onClose()
      handleFetchCustomerDetail(response?.data?.meta?.insert_id, {currentValue: phone})
    } else {
      showAlert({type: 'danger', content: 'Thêm mới thất bại'})
      validateResponse(response?.data?.errors)
      if (onLoadingToggle) onLoadingToggle(false)
    }
  }

  const validateResponse = errors => {
    setValidate({...validate,
                        code: errors?.find(item => item?.code === 6044) ? 'Mã khách hàng đã tồn tại' : '',
                        phone: errors?.find(item => item?.code === 6009) ? 'Số điện thoại đã tồn tại' : '',
    })
  }

  const handleValidate = () => {
    let check = true
    let currentValidate = {...validate}

    if (!name || !name.trim()) {
      currentValidate = {
        ...currentValidate,
        name: 'Tên khách hàng không được để trống',
      }
      check = false
    }

    if (!phone || !phone.trim()) {
      currentValidate = {
        ...currentValidate,
        phone: 'Số điện thoại không được để trống',
      }
      check = false
    } else if (phone.length > 0 && (phone.length < 10 || phone.length > 11)) {
      currentValidate = {
        ...currentValidate,
        phone: 'Tối thiểu có 10 và tối đa 11 chữ số',
      }
      check = false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.trim() && !regex.test(email)) {
      currentValidate = {
        ...currentValidate,
        email: 'Email không đúng định dạng',
      }
      check = false
    }

    if (!address || !address.trim()) {
      currentValidate = {
        ...currentValidate,
        address: 'Địa chỉ không được để trống',
      }
      check = false
    }

    let locationArr = []
    if (!provinceValue?.value) locationArr.push('city')
    if (!districtValue?.value) locationArr.push('district')
    if (!wardValue?.value) locationArr.push('ward')
    if (locationArr.length > 0) {
      currentValidate = {
        ...currentValidate,
        location: locationArr,
      }
      check = false
    }

    setValidate({...currentValidate})

    if (check) handleSubmit()
  }

  useEffect(() => {
    if (canLoadOrigin) {
      setCanLoadOrigin(false)
      handleCustomerGroupFetch('')
    }
  }, [])

  useEffect(() => {
    if (onModified)
      onModified(
        JSON.stringify(submitQueries) !== JSON.stringify(initSubmitQueries),
      )
  }, [submitQueries])

  return (
    <StyledCreateCustomerDrawer
      {...props}
      className={`common-scrollbar ${props?.className || ''}`}
    >
      <div className="create-customer-drawer__header">
        <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 5}}>
          Thông tin khách hàng
        </Text>
      </div>
      <div className="create-customer-drawer__body">
        <div className="create-customer-drawer__input-group">
          <div className="create-customer-drawer__input-item" data-size="lg">
            <CustomerIdInput
              validateText={validate?.code || ''}
              validateType={"danger"}
              value={customerId}
              onChange={e => {
                setCustomerId(e.target.value)
                !!customerId && setValidate({...validate, code: ''})
              }}
            />
          </div>
        </div>
        <div className="create-customer-drawer__input-group">
          <div className="create-customer-drawer__input-item" data-size="lg">
            <NameInput
              validateText={validate?.name || ''}
              validateType="danger"
              value={name}
              onChange={e => {
                setName(e.target.value)
                !!name && setValidate({...validate, name: ''})
              }}
              onBlur={() => setValidate({...validate, name: !!!name ? 'Tên khách hàng không được để trống' : ''})}
              onFocus={() => setValidate({...validate, name: ''})}
            />
          </div>
        </div>
        <div className="create-customer-drawer__input-group">
          <div className="create-customer-drawer__input-item">
            <PhoneInput
              validateText={validate?.phone}
              validateType="danger"
              value={phone}
              onBlur={() =>
                setValidate({
                  ...validate,
                  phone: phone?.length > 0 && (phone?.length < 10 || phone?.length > 11)
                          ? 'Tối thiểu có 10 và tối đa 11 chữ số'
                          : phone?.length === 0 ? 'Số điện thoại không được để trống' : '',
                })
              }
              onChange={e => {
                setPhone(
                  e.target.value
                    .toString()
                    .replace(/[^0-9]/g, '')
                    .substring(0, 11),
                )
                !!phone && setValidate({...validate, phone: ''})
              }}
              onFocus={() => setValidate({...validate, phone: ''})}
            />
          </div>
          <div className="create-customer-drawer__input-item">
            <EmailInput
              validateText={validate?.email}
              validateType="danger"
              value={email}
              onBlur={() => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (email.trim() && !regex.test(email))
                  setValidate({
                    ...validate,
                    email: 'Email không đúng định dạng',
                  })
              }}
              onChange={e => {
                setEmail(e.target.value)
                !!email && setValidate({...validate, email: ''})
              }}
              onFocus={() => setValidate({...validate, email: ''})}
            />
          </div>
        </div>
        <div className="create-customer-drawer__radio-list">
          <div className="create-customer-drawer__radio-item">
            <Text lineHeight={32}>Giới tính</Text>
          </div>
          <div className="create-customer-drawer__radio-item">
            <Radio
              checked={gender === 'male'}
              style={{margin: '7px 14px 0 0'}}
              onClick={() => setGender('male')}
            />
            <Text
              lineHeight={32}
              style={{cursor: 'pointer'}}
              onClick={() => setGender('male')}
            >
              Nam
            </Text>
          </div>
          <div className="create-customer-drawer__radio-item">
            <Radio
              checked={gender === 'female'}
              style={{margin: '7px 14px 0 0'}}
              onClick={() => setGender('female')}
            />
            <Text
              lineHeight={32}
              style={{cursor: 'pointer'}}
              onClick={() => setGender('female')}
            >
              Nữ
            </Text>
          </div>
        </div>
        <div className="create-customer-drawer__input-group">
          <div className="create-customer-drawer__input-item">
            <CustomAutoComplete
              data={customerGroupList}
              loading={isCustomerGroupLoading}
              loadMore={isCustomerGroupLoadMore}
              value={customerGroupValue}
              onSelect={setCustomerGroupValue}
              inputProps={{
                categoryValue: {name: 'Nhóm khách hàng', value: ''},
                label: 'Nhóm khách hàng',
                placeholder: 'Chọn nhóm khách hàng',
                value: customerGroupValue?.name || '',
              }}
              menuProps={{
                canLoadMore: !isCustomerGroupLoadMore,
                empty:
                  customerGroupList.length <= 0
                    ? 'Không tìm thấy nhóm khách hàng'
                    : '',
                onLoadMore: handleCustomerGroupLoadMore,
              }}
              searchInputProps={{
                placeholder: 'Tìm kiếm nhóm khách hàng',
                value: customerGroupKeyword || '',
                onChange: handleCustomerGroupKeywordChange,
              }}
            />
          </div>
          <div className="create-customer-drawer__input-item">
            <Select
              value={priceType?.name}
              inputProps={{
                label: 'Chính sách giá',
                placeholder: 'Chọn chính sách giá',
              }}
            >
              {ORDER_SINGLE_CONSTANTS.form.productInfo.withInventoryPriceType.map(
                item => (
                  <SelectOption
                    key={item.value}
                    data-active={item.value === priceType?.value}
                    onClick={() => setPriceType(item)}
                  >
                    {item.name}
                  </SelectOption>
                ),
              )}
            </Select>
          </div>
        </div>
        <div className="create-customer-drawer__input-group">
          <div className="create-customer-drawer__input-item" data-size="lg">
            <AddressInput
              validateText={validate?.address || ''}
              validateType="danger"
              value={address}
              onChange={e => setAddress(e.target.value)}
              onBlur={() => setValidate({...validate, address: !!!address ? 'Địa chỉ không được để trống' : ''})}
              onFocus={() => setValidate({...validate, address: ''})}
              buttonProps={{
                disabled: !canSplitAddress,
                onClick: handleSplitAddress,
              }}
            />
          </div>
        </div>
        <div
          className="create-customer-drawer__input-group"
          style={{alignItems: 'flex-end'}}
        >
          <div className="create-customer-drawer__input-item" data-size="sm">
            <CustomAutoComplete
              data={provinceList}
              value={provinceValue}
              onSelect={data => {
                // update province
                setProvinceValue(data)
                // update district
                setDistrictList(data.list)
                setDistrictValue(null)
                // update ward
                setWardList([])
                setWardValue(null)
                // validate
                setValidate({
                  ...validate,
                  location: validate.location.filter(item => item !== 'city'),
                })
              }}
              inputProps={{
                categoryValue: {name: 'Tỉnh / Thành phố', value: ''},
                label: (
                  <>
                    Khu vực nhận <Text color={THEME_SEMANTICS.failed}>*</Text>
                  </>
                ),
                placeholder: 'Tỉnh / thành phố',
                validateText:
                  validate?.location.length > 0
                    ? 'Thông tin khu vực nhận chưa đầy đủ'
                    : '',
                validateType: validate.location.includes('city')
                  ? 'danger'
                  : 'defaultDanger',
                validateProps: {style: {width: '200%'}},
                value: provinceValue?.name || '',
              }}
              menuProps={{
                empty:
                  provinceList.length <= 0
                    ? 'Không tìm thấy tỉnh / thành phố'
                    : '',
              }}
              searchInputProps={{
                placeholder: 'Tìm kiếm tỉnh / thành phố',
                value: provinceKeyword || '',
                onChange: ({value}) => {
                  setProvinceKeyword(value)
                  if (value.trim()) {
                    const filterList = formatProvinceData.filter(item =>
                      StringUtils.removeAcent(item?.name).includes(
                        StringUtils.removeAcent(value).trim(),
                      ),
                    )
                    setProvinceList(filterList)
                  }
                },
              }}
            />
          </div>
          <div className="create-customer-drawer__input-item" data-size="sm">
            <CustomAutoComplete
              data={districtList}
              value={districtValue}
              onSelect={data => {
                // update district
                setDistrictValue(data)
                // update ward
                setWardList(data.list)
                setWardValue(null)
                // validate
                setValidate({
                  ...validate,
                  location: validate.location.filter(
                    item => item !== 'district',
                  ),
                })
              }}
              inputProps={{
                categoryValue: {name: 'Quận / Huyện', value: ''},
                disabled: !provinceValue?.value,
                placeholder: 'Quận / Huyện',
                validateText: validate.location.includes('district') ? (
                  <></>
                ) : (
                  ''
                ),
                validateType: 'danger',
                value: districtValue?.name || '',
              }}
              menuProps={{
                empty:
                  districtList.length <= 0 ? 'Không tìm thấy quận / huyện' : '',
              }}
              searchInputProps={{
                placeholder: 'Tìm kiếm quận / huyện',
                value: districtKeyword || '',
                onChange: ({value}) => {
                  setDistrictKeyword(value)
                  if (value.trim()) {
                    const filterList = provinceValue.list.filter(item =>
                      StringUtils.removeAcent(item?.name).includes(
                        StringUtils.removeAcent(value).trim(),
                      ),
                    )
                    setDistrictList(filterList)
                  }
                },
              }}
            />
          </div>
          <div className="create-customer-drawer__input-item" data-size="sm">
            <CustomAutoComplete
              data={wardList}
              value={wardValue}
              onSelect={data => {
                // update ward
                setWardValue(data)
                // validate
                setValidate({
                  ...validate,
                  location: validate.location.filter(item => item !== 'ward'),
                })
              }}
              inputProps={{
                categoryValue: {name: 'Phường / Xã', value: ''},
                disabled: !districtValue?.value,
                placeholder: 'Phường / Xã',
                validateText: validate.location.includes('ward') ? <></> : '',
                validateType: 'danger',
                value: wardValue?.name || '',
              }}
              menuProps={{
                empty: wardList.length <= 0 ? 'Không tìm thấy phường / xã' : '',
                style: {right: 0, left: 'unset', width: 'calc(150% + 8px)'},
              }}
              searchInputProps={{
                placeholder: 'Tìm kiếm phường / xã',
                value: wardKeyword || '',
                onChange: ({value}) => {
                  setWardKeyword(value)
                  if (value.trim()) {
                    const filterList = districtValue.list.filter(item =>
                      StringUtils.removeAcent(item?.name).includes(
                        StringUtils.removeAcent(value).trim(),
                      ),
                    )
                    setWardList(filterList)
                  }
                },
              }}
            />
          </div>
        </div>
        <div className="create-customer-drawer__toggle-list">
          <div className="create-customer-drawer__toggle-item">
            <Switch defaultChecked={true} disabled style={{marginRight: 8}} />
            <Text color="#191D32" style={{cursor: 'no-drop'}}>
              Kích hoạt/Ngưng sử dụng
            </Text>
          </div>
        </div>
      </div>
      <div className="create-customer-drawer__footer">
        <Button
          appearance="ghost"
          style={{minWidth: 74}}
          onClick={() => onExitToggle(true)}
        >
          Hủy
        </Button>

        <Button
          style={{minWidth: 110, marginLeft: 12}}
          onClick={handleValidate}
        >
          Lưu
        </Button>
      </div>
      {exit && (
        <ConfirmModal
          onClose={() => onExitToggle && onExitToggle(false)}
          onSubmit={() => {
            if (onExitToggle) onExitToggle(false)
            if (onClose) onClose()
          }}
        />
      )}
      {loading && (
        <LoadingModal className="create-customer-drawer__loading-modal" />
      )}
    </StyledCreateCustomerDrawer>
  )
}

const CustomerIdInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Mã khách hàng{' '}
            <Tooltip
              placement="right-end"
              title="Trường hợp bạn không nhập mã khách hàng, evoshop sẽ tự động sinh theo mã hệ thống"
            >
              <Text as="i" color={THEME_SEMANTICS.failed}>
                {ORDER_SINGLE_ICONS.question}
              </Text>
            </Tooltip>
          </>
        )
      }
      placeholder={
        props?.placeholder || 'Nhập mã khách hàng (ví dụ: KH220815...)'
      }
    />
  )
}

const NameInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Tên khách hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập tên khách hàng'}
    />
  )
}

const PhoneInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập số điện thoại'}
    />
  )
}

const EmailInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={props?.label || 'Email'}
      placeholder={props?.placeholder || 'Nhập email'}
    />
  )
}

const CustomAutoComplete = ({
  data,
  loading,
  loadMore,
  value,
  onSelect,
  ...props
}) => {
  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryHidden: true,
        readOnly: true,
        ...props?.inputProps,
      }}
      // search input in dropdown menu
      menuProps={{
        style: {width: 'calc(150% + 8px)'},
        ...props?.menuProps,
      }}
    >
      {loading ? (
        <StyledLoading>
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </StyledLoading>
      ) : (
        <>
          {data.length > 0 &&
            data.map(item => (
              <AutoCompleteSingleOption
                key={item.value}
                data-active={item.value === value?.value}
                onClick={() => onSelect && onSelect(item)}
              >
                {item.name}
              </AutoCompleteSingleOption>
            ))}
          {loadMore && (
            <StyledLoadMore>
              <Spinner size={48} thickness={4} />
            </StyledLoadMore>
          )}
        </>
      )}
    </AlternativeAutoComplete>
  )
}

const StyledLoading = styled.div`
  min-height: 260px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLoadMore = styled.div`
  padding: 16px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

const AddressInput = ({buttonProps, ...props}) => {
  return (
    <Input
      {...props}
      button={
        <Button
          {...buttonProps}
          icon={buttonProps?.icon || ORDER_SINGLE_ICONS.target}
        >
          Tách
        </Button>
      }
      label={
        props?.label || (
          <>
            Địa chỉ <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={
        props?.placeholder ||
        'Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,..'
      }
    />
  )
}

const ConfirmModal = ({onClose, onSubmit, ...props}) => {
  return (
    <Modal
      {...props}
      actions={
        props?.actions || [
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            Hủy
          </Button>,
          <Button
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={onSubmit}
          >
            Xác nhận
          </Button>,
        ]
      }
      title={props?.title || 'Xác nhận rời khỏi trang'}
      width={props?.width || 480}
    >
      <Text>
        Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi
        thay đổi chưa được lưu?
      </Text>
    </Modal>
  )
}

const LoadingModal = ({...props}) => {
  return (
    <Modal
      {...props}
      title={props?.title || 'Tạo mới khách hàng'}
      width={props?.width || 480}
    >
      <Spinner size={54} thickness={5} />
      <Text style={{marginTop: 24, textAlign: 'center'}}>Loading ...</Text>
    </Modal>
  )
}
