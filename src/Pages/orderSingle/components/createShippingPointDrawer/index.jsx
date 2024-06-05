import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Checkbox} from 'common/form/checkbox'
import {Input} from 'common/form/input'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import StringUtils from 'Component/surveyLogin/utils/string'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ORDER_SINGLE_CONSTANTS} from 'Pages/orderSingle/interface/_constants'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {provinceData} from 'Pages/orderSingle/provider/_initialState'
import ArrayUtils from 'Pages/orderSingle/utils/array'
import {Fragment, useContext, useEffect, useState} from 'react'
import {AutoCompleteSingleOption} from '../autocompleteSingleOption'
import {StyledCreateShippingPointDrawer} from './_styled'
import {Loading} from "../../../../common/loading";
import {OrderSingleContext} from "../../provider/_context";
import {orderSingleAction} from "../../provider/_actions";

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

const initQueries = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city_id: undefined,
  district_id: undefined,
  ward_id: undefined,
  is_default: 0,
  is_hidden_phone: 0,
  is_hidden_address: 0,
  is_hidden_province: 0,
}

export const CreateShippingPointDrawer = ({
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

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [provinceList, setProvinceList] = useState(formatProvinceData)
  const [provinceKeyword, setProvinceKeyword] = useState('')
  const [provinceValue, setProvinceValue] = useState(null)

  const [districtList, setDistrictList] = useState([])
  const [districtKeyword, setDistrictKeyword] = useState('')
  const [districtValue, setDistrictValue] = useState(null)

  const [wardList, setWardList] = useState([])
  const [wardKeyword, setWardKeyword] = useState('')
  const [wardValue, setWardValue] = useState(null)

  const [address, setAddress] = useState('')
  const [addressSelectedOptions, setAddressSelectedOptions] = useState([])
  const {state, dispatch} = useContext(OrderSingleContext)

  const [validate, setValidate] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  })

  const queries = {
    name,
    phone,
    email,
    address,
    city_id: provinceValue?.value,
    district_id: districtValue?.value,
    ward_id: wardValue?.value,
    is_default: addressSelectedOptions.includes('is_default') ? 1 : 0,
    is_hidden_phone: addressSelectedOptions.includes('is_hidden_phone') ? 1 : 0,
    is_hidden_address: addressSelectedOptions.includes('is_hidden_address')
      ? 1
      : 0,
    is_hidden_province: addressSelectedOptions.includes('is_hidden_province')
      ? 1
      : 0,
  }

  const handleSubmit = async () => {
    if (onLoadingToggle) onLoadingToggle(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/setting/address/create`,
      JSON.stringify(queries),
    )

    if (response?.data?.success) {
      if (onRefetch) onRefetch()
      showAlert({type: 'success', content: 'Thêm mới điểm gửi hàng thành công'})
      if (onLoadingToggle) onLoadingToggle(false)
      if (onClose) onClose()

      const shippingPoint = {
        data: queries,
        name: name,
        value: response?.data?.meta?.insert_id
      }
      dispatch({
        type: orderSingleAction.FORM_SHIPPING_POINT_UPDATE,
        payload: {value: shippingPoint},
      })
    } else {
      showAlert({type: 'danger', content: 'Thêm mới điểm gửi hàng thất bại'})
      if (onLoadingToggle) onLoadingToggle(false)
    }
  }

  const handleValidate = () => {
    let check = true
    let currentValidate = {...validate}

    if (!name || !name.trim()) {
      currentValidate = {
        ...currentValidate,
        name: 'Tên điểm gửi hàng không được để trống',
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

    if (
      [
        !!address,
        !!wardValue?.value,
        !!districtValue?.value,
        !!provinceValue?.value,
      ].includes(false)
    ) {
      currentValidate = {
        ...currentValidate,
        address: 'Thông tin địa chỉ chưa đầy đủ',
      }
      check = false
    }

    setValidate({...currentValidate})

    if (check) handleSubmit()
  }

  useEffect(() => {
    if (onModified)
      onModified(JSON.stringify(queries) !== JSON.stringify(initQueries))
  }, [queries])

  return (
    <StyledCreateShippingPointDrawer
      {...props}
      className={`common-scrollbar ${props?.className || ''}`}
    >
      <div className="create-shipping-point-drawer__header">
        <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 5}}>
          Thông tin điểm gửi hàng
        </Text>
        <Text as="p" fontSize={15} lineHeight={21}>
          Là địa điểm shipper/đơn vị vận chuyển đến lấy hàng hoá từ chủ shop.
        </Text>
      </div>
      <div className="create-shipping-point-drawer__body">
        <div className="create-shipping-point-drawer__input-group">
          <div
            className="create-shipping-point-drawer__input-item"
            data-size="lg"
          >
            <NameInput
              validateText={validate?.name}
              validateType="danger"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setValidate({...validate, name: ''})}
            />
          </div>
        </div>
        <div className="create-shipping-point-drawer__input-group">
          <div
            className="create-shipping-point-drawer__input-item"
            data-size="lg"
          >
            <PhoneInput
              validateText={validate?.phone}
              validateType="danger"
              value={phone}
              onBlur={() =>
                phone.length > 0 &&
                (phone.length < 10 || phone.length > 11) &&
                setValidate({
                  ...validate,
                  phone: 'Tối thiểu có 10 và tối đa 11 chữ số',
                })
              }
              onChange={e =>
                setPhone(
                  e.target.value
                    .toString()
                    .replace(/[^0-9]/g, '')
                    .substring(0, 11),
                )
              }
              onFocus={() => setValidate({...validate, phone: ''})}
            />
          </div>
        </div>
        <div className="create-shipping-point-drawer__input-group">
          <div
            className="create-shipping-point-drawer__input-item"
            data-size="lg"
          >
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
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setValidate({...validate, email: ''})}
            />
          </div>
        </div>
        <div
          className="create-shipping-point-drawer__input-group"
          style={{alignItems: 'flex-end'}}
        >
          <div
            className="create-shipping-point-drawer__input-item"
            data-size="sm"
          >
            <AddressAutoComplete
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
                setValidate({...validate, address: ''})
              }}
              inputProps={{
                categoryValue: {name: 'Tỉnh / Thành phố', value: ''},
                label: (
                  <>
                    Địa chỉ <Text color={THEME_SEMANTICS.failed}>*</Text>
                  </>
                ),
                placeholder: 'Tỉnh / thành phố',
                validateText:
                  validate?.address && !provinceValue?.value ? <></> : '',
                validateType: 'danger',
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
          <div
            className="create-shipping-point-drawer__input-item"
            data-size="sm"
          >
            <AddressAutoComplete
              data={districtList}
              value={districtValue}
              onSelect={data => {
                // update district
                setDistrictValue(data)
                // update ward
                setWardList(data.list)
                setWardValue(null)
                // validate
                setValidate({...validate, address: ''})
              }}
              inputProps={{
                categoryValue: {name: 'Quận / Huyện', value: ''},
                disabled: !provinceValue?.value,
                placeholder: 'Quận / Huyện',
                validateText:
                  validate?.address && !districtValue?.value ? <></> : '',
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
          <div
            className="create-shipping-point-drawer__input-item"
            data-size="sm"
          >
            <AddressAutoComplete
              data={wardList}
              value={wardValue}
              onSelect={data => {
                // update ward
                setWardValue(data)
                // validate
                setValidate({...validate, address: ''})
              }}
              inputProps={{
                categoryValue: {name: 'Phường / Xã', value: ''},
                disabled: !districtValue?.value,
                placeholder: 'Phường / Xã',
                validateText:
                  validate?.address && !wardValue?.value ? <></> : '',
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
          <div
            className="create-shipping-point-drawer__input-item"
            data-size="lg"
          >
            <AddressInput
              validateText={validate?.address}
              validateType="danger"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          {[
            !!address,
            !!wardValue?.value,
            !!districtValue?.value,
            !!provinceValue?.value,
          ].includes(true) && (
            <div
              className="create-shipping-point-drawer__input-item"
              data-size="lg"
              style={{marginBottom: 24}}
            >
              <i className="create-shipping-point-drawer__address-icon">
                {ORDER_SINGLE_ICONS.markerPin01}
              </i>
              <Text color="#7C88A6">
                {[
                  address,
                  wardValue?.name,
                  districtValue?.name,
                  provinceValue?.name,
                ]
                  .filter(item => !!item)
                  .map((item, i) => (
                    <Fragment key={i}>
                      {i > 0 && ', '}
                      {item}
                    </Fragment>
                  ))}
              </Text>
            </div>
          )}
        </div>
        <div className="create-shipping-point-drawer__option-list">
          {ORDER_SINGLE_CONSTANTS.create.shippingPoint.options.map(item => (
            <div
              key={item?.id}
              className="create-shipping-point-drawer__option-item"
            >
              <Checkbox
                checked={addressSelectedOptions.includes(item?.value)}
                style={{margin: '1px 10px 0 0'}}
                onClick={() =>
                  setAddressSelectedOptions(
                    addressSelectedOptions.includes(item?.value)
                      ? addressSelectedOptions.filter(
                          opt => opt !== item?.value,
                        )
                      : [...addressSelectedOptions, item?.value],
                  )
                }
              />
              <Text
                color="#191D32"
                style={{cursor: 'pointer'}}
                onClick={() =>
                  setAddressSelectedOptions(
                    addressSelectedOptions.includes(item?.value)
                      ? addressSelectedOptions.filter(
                          opt => opt !== item?.value,
                        )
                      : [...addressSelectedOptions, item?.value],
                  )
                }
              >
                {item?.name || '---'}
              </Text>
            </div>
          ))}
        </div>
        <div className="create-shipping-point-drawer__toggle-list">
          <div className="create-shipping-point-drawer__toggle-item">
            <Switch defaultChecked={true} disabled style={{marginRight: 8}} />
            <Text color="#191D32" style={{cursor: 'no-drop'}}>
              Kích hoạt/Ngưng sử dụng
            </Text>
          </div>
        </div>
      </div>
      <div className="create-shipping-point-drawer__footer">
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
      {loading &&
        <Loading />
        // (<LoadingModal className="create-shipping-point-drawer__loading-modal" />)
      }
    </StyledCreateShippingPointDrawer>
  )
}

const NameInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Tên điểm gửi hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập tên điểm gửi hàng'}
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

const AddressAutoComplete = ({data, value, onSelect, ...props}) => {
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
    </AlternativeAutoComplete>
  )
}

const AddressInput = ({...props}) => {
  return (
    <Input
      {...props}
      placeholder={props?.placeholder || 'Nhập số nhà, tên đường'}
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
      title={props?.title || 'Tạo mới điểm gửi hàng'}
      width={props?.width || 480}
    >
      <Spinner size={54} thickness={5} />
      <Text style={{marginTop: 24, textAlign: 'center'}}>Loading ...</Text>
    </Modal>
  )
}
