import {Button} from 'common/button'
import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {useState} from 'react'
import {StyledBulkOrderCreateTableTbodyEditModal} from './_styled'
import addressData from 'Pages/addressSeparationTool/_data.json'
import {removeAcent} from 'common/fieldText/_functions'
import {BulkOrderSingleOption} from 'Pages/bulkOrder/components/bulkOrderSingleOption'
import {getArrayFromValue} from 'Pages/bulkOrder/utils/array'
import {CurrencyInput} from 'common/form/input/_currencyInput'
import {CategoryInput} from 'common/form/input/_categoryInput'
import {Textarea} from 'common/form/textarea'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {SuggestNote} from './_suggestNote'
import { replaceAllCustom } from '../../../../../../../util/functionUtil'

export const BulkOrderCreateTableTbodyEditModal = ({data, ...props}) => {
  const {showAlert} = useAlert()

  const [name, setName] = useState(data?.data?.name || '')
  // ============================================================================
  const [phone, setPhone] = useState(data?.data?.phone || '')

  const checkPhone =
    phone.length < 10 || phone.startsWith('00') || !phone.startsWith('0')
  const [phoneValidate, setPhoneValidate] = useState(
    checkPhone ? 'Số điện thoại không đúng định dạng' : '',
  )
  // ============================================================================
  const [address, setAddress] = useState(data?.data?.address || '')
  // ============================================================================
  const [provinceKeyword, setProvinceKeyword] = useState('')
  const defaultProvinceList = addressData
  const [provinceList, setProvinceList] = useState(
    defaultProvinceList.map(item => ({
      data: item,
      name: item?.name || '---',
      value: item?.id || '',
    })),
  )
  const defaultProvince = addressData.find(
    item => item.id === data?.data?.city_id,
  )
  const [provinceValue, setProvinceValue] = useState(
    defaultProvince
      ? {
          data: defaultProvince,
          name: defaultProvince?.name || '---',
          value: defaultProvince?.id || '',
        }
      : null,
  )
  // ============================================================================
  const [districtKeyword, setDistrictKeyword] = useState('')
  const defaultDistrictList = !!provinceValue?.value
    ? getArrayFromValue(provinceValue?.data?.list)
    : []
  const [districtList, setDistrictList] = useState(
    defaultDistrictList.map(item => ({
      data: item,
      name: item?.name || '---',
      value: item?.id || '',
    })),
  )
  const defaultDistrict = !!provinceValue?.value
    ? getArrayFromValue(provinceValue?.data?.list).find(
        item => item.id === data?.data?.district_id,
      )
    : null
  const [districtValue, setDistrictValue] = useState(
    defaultDistrict
      ? {
          data: defaultDistrict,
          name: defaultDistrict?.name || '---',
          value: defaultDistrict?.id || '',
        }
      : null,
  )
  // ============================================================================
  const [wardKeyword, setWardKeyword] = useState('')
  const defaultWardList = !!districtValue?.value
    ? getArrayFromValue(districtValue?.data?.list)
    : []
  const [wardList, setWardList] = useState(
    defaultWardList.map(item => ({
      data: item,
      name: item?.name || '---',
      value: item?.id || '',
    })),
  )
  const defaultWard = !!districtValue?.value
    ? getArrayFromValue(districtValue?.data?.list).find(
        item => item.id === data?.data?.ward_id,
      )
    : null
  const [wardValue, setWardValue] = useState(
    defaultWard
      ? {
          data: defaultWard,
          name: defaultWard?.name || '---',
          value: defaultWard?.id || '',
        }
      : null,
  )
  // ============================================================================
  const [uniqueOrderNumber, setUniqueOrderNumber] = useState(
    data?.data?.order_code || '',
  )
  // ============================================================================
  const [cod, setCOD] = useState(data?.data?.cod || '')
  // ============================================================================
  const [insurrance, setInsurrance] = useState(data?.data?.insurrance || '')
  // ============================================================================
  // ============================================================================
  const [shippingFeeCustom, setShippingFeeCustom] = useState(data?.data?.ship_fee_custom || '')
  // ============================================================================
  const [numberPack, setNumberPack] = useState(data?.data?.number_pack || '')
  // ============================================================================
  const [weight, setWeight] = useState(data?.data?.weight || '')
  // ============================================================================
  const [length, setLength] = useState(data?.data?.lengh || '')
  // ============================================================================
  const [width, setWidth] = useState(data?.data?.width || '')
  // ============================================================================
  const [height, setHeight] = useState(data?.data?.height || '')
  // ============================================================================
  const [content, setContent] = useState(data?.data?.item_name || '')
  // ============================================================================
  const [note, setNote] = useState(data?.data?.note || '')
  // ============================================================================
  const handleCheckPhone = p => {
    return p.length < 10 || p.startsWith('00') || !p.startsWith('0')
  }

  const handleProvinceChange = val => {
    setProvinceValue(val)
    setDistrictKeyword('')
    setDistrictList(
      getArrayFromValue(val?.data?.list).map(item => ({
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      })),
    )
    setDistrictValue(null)
    setWardKeyword('')
    setWardList([])
    setWardValue(null)
  }
  const handleProvinceKeywordChange = val => {
    const formatDataValue = val?.value
      ? removeAcent(val?.value?.toLowerCase())
      : ''

    const listData = addressData
      .map(item => ({
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      }))
      .filter(item => {
        const formatNameItem = item?.name
          ? removeAcent(item.name.toLowerCase())
          : ''
        if (formatNameItem.includes(formatDataValue)) return true
        return false
      })

    setProvinceKeyword(val?.value || '')
    setProvinceList(listData)
  }

  const handleDistrictChange = val => {
    setDistrictValue(val)
    setWardKeyword('')
    setWardList(
      getArrayFromValue(val?.data?.list).map(item => ({
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      })),
    )
    setWardValue(null)
  }
  const handleDistrictKeywordChange = val => {
    const formatDataValue = val?.value
      ? removeAcent(val?.value?.toLowerCase())
      : ''

    const listData = getArrayFromValue(provinceValue?.data?.list)
      .map(item => ({
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      }))
      .filter(item => {
        const formatNameItem = item?.name
          ? removeAcent(item.name.toLowerCase())
          : ''
        if (formatNameItem.includes(formatDataValue)) return true
        return false
      })

    setDistrictKeyword(val?.value || '')
    setDistrictList(listData)
  }

  const handleWardChange = val => setWardValue(val)
  const handleWardKeywordChange = val => {
    const formatDataValue = val?.value
      ? removeAcent(val?.value?.toLowerCase())
      : ''

    const listData = getArrayFromValue(districtValue?.data?.list)
      .map(item => ({
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      }))
      .filter(item => {
        const formatNameItem = item?.name
          ? removeAcent(item.name.toLowerCase())
          : ''
        if (formatNameItem.includes(formatDataValue)) return true
        return false
      })

    setWardKeyword(val?.value || '')
    setWardList(listData)
  }
  // =========================================================================================
  const [canSeparateAddress, setCanSeparateAddress] = useState(true)

  const handleSeparateAddress = async () => {
    if (!!!address) return

    setCanSeparateAddress(false)

    const response = await sendRequestAuth(
      'get',
      `${config.API}/area/detect-address?address=${address}`,
    )

    if (!!response?.data?.success) {
      const findProvince = addressData.find(
        item => item.id === `${response?.data?.data?.city_id}`,
      )
      if (findProvince)
        handleProvinceChange({
          data: findProvince,
          name: findProvince?.name || '---',
          value: findProvince?.id || '',
        })

      const findDistrict = getArrayFromValue(findProvince?.list).find(
        item => item.id === `${response?.data?.data?.district_id}`,
      )
      if (findDistrict)
        handleDistrictChange({
          data: findDistrict,
          name: findDistrict?.name || '---',
          value: findDistrict?.id || '',
        })

      const findWard = getArrayFromValue(findDistrict?.list).find(
        item => item.id === `${response?.data?.data?.ward_id}`,
      )
      if (findWard)
        handleWardChange({
          data: findWard,
          name: findWard?.name || '---',
          value: findWard?.id || '',
        })

      showAlert({type: 'success', content: 'Tách địa chỉ thành công'})
    } else showAlert({type: 'danger', content: 'Tách địa chỉ thất bại'})

    setCanSeparateAddress(true)
  }

  const canSubmit = ![
    !!name,
    !!phone,
    [10, 11].includes(phone.length),
    !!address,
    ![
      !!provinceValue?.value,
      !!districtValue?.value,
      !!wardValue?.value,
    ].includes(false),
    !!numberPack,
    !!weight,
    !!content,
  ].includes(false)

  const handleSubmit = () => {
    const opt = {
      detail_id: data?.data?.id,
      file_id: data?.data?.file_id,
      name,
      phone,
      address,
      city_id: provinceValue?.value,
      city_name: provinceValue?.name,
      district_id: districtValue?.value,
      district_name: districtValue?.name,
      ward_id: wardValue?.value,
      ward_name: wardValue?.name,
      order_code: uniqueOrderNumber,
      insurrance: insurrance ? Number(insurrance || 0) : '',
      ship_fee_custom: shippingFeeCustom.length > 3 ? +replaceAllCustom(shippingFeeCustom, ',', '') : shippingFeeCustom,
      cod: cod ? Number(cod || 0) : '',
      number_pack: Number(numberPack || 0),
      weight: Number(weight || 0),
      lengh: Number(length || 0),
      width: Number(width || 0),
      height: Number(height || 0),
      item_name: content,
      note,
    }
    if (data?.onSubmit) data.onSubmit(opt)
  }

  return (
    <StyledBulkOrderCreateTableTbodyEditModal {...props}>
      <div className="bulk-order-create-table-tbody-edit-modal__container">
        <div className="bulk-order-create-table-tbody-edit-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            Chỉnh sửa đơn hàng
          </Text>
        </div>
        <div className="bulk-order-create-table-tbody-edit-modal__body">
          <div className="bulk-order-create-table-tbody-edit-modal__form-container">
            <Text
              as="h4"
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 16}}
            >
              Thông tin người nhận
            </Text>
            <div className="bulk-order-create-table-tbody-edit-modal__form-group">
              <div className="bulk-order-create-table-tbody-edit-modal__form-input">
                <Input
                  label={
                    <>
                      Người nhận <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  placeholder="Nhập người nhận"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="bulk-order-create-table-tbody-edit-modal__form-input">
                <Input
                  label={
                    <>
                      Điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  max={11}
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  validateText={phoneValidate}
                  validateType="danger"
                  onBlur={() =>
                    checkPhone &&
                    setPhoneValidate('Số điện thoại không đúng định dạng')
                  }
                  onChange={e => {
                    const newValue = e.target.value
                      .toString()
                      .replace(/[^0-9]/g, '')
                      .substring(0, 11)
                    if (!handleCheckPhone(newValue)) setPhoneValidate('')
                    setPhone(newValue)
                  }}
                />
              </div>
            </div>
            <div className="bulk-order-create-table-tbody-edit-modal__form-group">
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc(100% - 16px)', marginBottom: 8}}
              >
                <Input
                  className="bulk-order-create-table-tbody-edit-modal__input-btn"
                  button={
                    <Button
                      className="bulk-order-create-table-tbody-edit-modal__end-input-btn"
                      disabled={!canSeparateAddress}
                      icon={BULK_ORDER_ICONS.location}
                      onClick={() =>
                        canSeparateAddress && handleSeparateAddress()
                      }
                    >
                      Tách
                    </Button>
                  }
                  label={
                    <>
                      Địa chỉ <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  placeholder="Nhập địa chỉ"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div
              className="bulk-order-create-table-tbody-edit-modal__form-group"
              style={{alignItems: 'flex-end'}}
            >
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc((100% / 3) - 16px)'}}
              >
                <AlternativeAutoComplete
                  // main input
                  inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: {name: 'Tỉnh / Thành phố', value: ''}, // if not exist this value -> default category: categoryList[0]
                    categoryWidth: 140,
                    categoryHidden: true,
                    label: (
                      <>
                        Khu vực nhận{' '}
                        <Text color={THEME_SEMANTICS.failed}>*</Text>
                      </>
                    ),
                    placeholder: 'Chọn tỉnh / thành phố',
                    readOnly: true,
                    value: provinceValue?.name || '',
                    onIconClick: () => handleProvinceChange(null),
                  }}
                  // search menu dropdown
                  menuProps={{
                    empty:
                      provinceList.length <= 0
                        ? 'Không tìm thấy tỉnh / thành phố'
                        : '',
                  }}
                  // search input in dropdown menu
                  searchInputProps={{
                    placeholder: 'Tìm kiếm tỉnh / thành phố',
                    value: provinceKeyword || '',
                    onChange: handleProvinceKeywordChange,
                  }}
                >
                  {provinceList.length > 0 &&
                    provinceList.map(item => (
                      <BulkOrderSingleOption
                        key={item.value}
                        data-active={item.value === provinceValue?.value}
                        onClick={() => handleProvinceChange(item)}
                      >
                        {item.name}
                      </BulkOrderSingleOption>
                    ))}
                </AlternativeAutoComplete>
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc((100% / 3) - 16px)'}}
              >
                <AlternativeAutoComplete
                  // main input
                  inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: {name: 'Quận / Huyện', value: ''}, // if not exist this value -> default category: categoryList[0]
                    categoryWidth: 140,
                    categoryHidden: true,
                    disabled: !!!provinceValue,
                    placeholder: 'Chọn quận / huyện',
                    readOnly: true,
                    value: districtValue?.name || '',
                    onIconClick: () => handleDistrictChange(null),
                  }}
                  menuProps={{
                    empty:
                      districtList.length <= 0
                        ? 'Không tìm thấy quận / huyện'
                        : '',
                  }}
                  // search input in dropdown menu
                  searchInputProps={{
                    placeholder: 'Tìm kiếm quận / huyện',
                    value: districtKeyword || '',
                    onChange: handleDistrictKeywordChange,
                  }}
                >
                  {districtList.length > 0 &&
                    districtList.map(item => (
                      <BulkOrderSingleOption
                        key={item.value}
                        data-active={item.value === districtValue?.value}
                        onClick={() => handleDistrictChange(item)}
                      >
                        {item.name}
                      </BulkOrderSingleOption>
                    ))}
                </AlternativeAutoComplete>
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc((100% / 3) - 16px)'}}
              >
                <AlternativeAutoComplete
                  // main input
                  inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: {name: 'Phường / Xã', value: ''}, // if not exist this value -> default category: categoryList[0]
                    categoryWidth: 140,
                    categoryHidden: true,
                    disabled: !!!districtValue,
                    placeholder: 'Chọn phường / xã',
                    readOnly: true,
                    value: wardValue?.name || '',
                    onIconClick: () => handleWardChange(null),
                  }}
                  menuProps={{
                    empty:
                      wardList.length <= 0 ? 'Không tìm thấy quận / huyện' : '',
                  }}
                  // search input in dropdown menu
                  searchInputProps={{
                    placeholder: 'Tìm kiếm phường / xã',
                    value: wardKeyword || '',
                    onChange: handleWardKeywordChange,
                  }}
                >
                  {wardList.length > 0 &&
                    wardList.map(item => (
                      <BulkOrderSingleOption
                        key={item.value}
                        data-active={item.value === wardValue?.value}
                        onClick={() => handleWardChange(item)}
                      >
                        {item.name}
                      </BulkOrderSingleOption>
                    ))}
                </AlternativeAutoComplete>
              </div>
            </div>
            <Text
              as="h4"
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 16}}
            >
              Thông tin hàng hóa
            </Text>
            <div className="bulk-order-create-table-tbody-edit-modal__form-group">
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc(25% - 16px)', marginBottom: 8}}
              >
                <Input
                  label="Mã đơn hàng riêng"
                  placeholder="Nhập mã đơn hàng riêng"
                  value={uniqueOrderNumber}
                  onChange={e => setUniqueOrderNumber(e.target.value)}
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc(25% - 16px)', marginBottom: 8}}
              >
                <CurrencyInput
                  defaultValue={cod}
                  label="Tền thu hộ (COD)"
                  placeholder="Nhập tiền thu hộ"
                  onChange={val => setCOD(val)}
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc(25% - 16px)', marginBottom: 8}}
              >
                <CurrencyInput
                  defaultValue={shippingFeeCustom}
                  label="Phí giao hàng hộ"
                  labelTooltip={'Ghi nhận phí vận chuyển thu từ các shop gửi đơn nhờ giao hộ (dành riêng cho các Điểm thu hàng hộ)'}
                  placeholder="Nhập phí giao hàng hộ"
                  onChange={val => setShippingFeeCustom(val)}
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc(25% - 16px)', marginBottom: 8}}
              >
                <CurrencyInput
                  defaultValue={insurrance}
                  label="Giá trị hàng hóa (mua bảo hiểm)"
                  placeholder="Nhập giá trị hàng hóa"
                  onChange={val => setInsurrance(val)}
                />
              </div>
            </div>
            <div
              className="bulk-order-create-table-tbody-edit-modal__form-group"
              style={{alignItems: 'flex-end'}}
            >
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc(25% - 16px)', marginBottom: 8}}
              >
                <Input
                  label={
                    <>
                      Số kiện <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  placeholder="Nhập số kiện"
                  value={numberPack}
                  onChange={e =>
                    setNumberPack(
                      e.target.value.toString().replace(/[^0-9]/g, ''),
                    )
                  }
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc(25% - 16px)', marginBottom: 8}}
              >
                <Input
                  label={
                    <>
                      Trọng lượng (kg){' '}
                      <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  placeholder="Nhập trọng lượng"
                  value={weight}
                  onChange={e =>
                    setWeight(e.target.value.toString().replace(/[^\d.]/g, ''))
                  }
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc((50% / 3) - 16px)', marginBottom: 8}}
              >
                <CategoryInput
                  categoryList={[]}
                  categoryValue={{name: 'Dài', value: ''}}
                  categoryWidth={45}
                  label="Kích thước (cm)"
                  placeholder="..."
                  value={length}
                  onChange={val => {
                    setLength(val.toString().replace(/[^\d.]/g, ''))
                  }}
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc((50% / 3) - 16px)', marginBottom: 8}}
              >
                <CategoryInput
                  categoryList={[]}
                  categoryValue={{name: 'Rộng', value: ''}}
                  categoryWidth={55}
                  placeholder="..."
                  value={width}
                  onChange={val =>
                    setWidth(val.toString().replace(/[^\d.]/g, ''))
                  }
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{width: 'calc((50% / 3) - 16px)', marginBottom: 8}}
              >
                <CategoryInput
                  categoryList={[]}
                  categoryValue={{name: 'Cao', value: ''}}
                  categoryWidth={50}
                  placeholder="..."
                  value={height}
                  onChange={val =>
                    setHeight(val.toString().replace(/[^\d.]/g, ''))
                  }
                />
              </div>
            </div>
            <div className="bulk-order-create-table-tbody-edit-modal__form-group">
              <div className="bulk-order-create-table-tbody-edit-modal__form-input">
                <Textarea
                  label={
                    <>
                      Nội dung hàng hóa{' '}
                      <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  placeholder="Nhập nội dung"
                  value={content}
                  style={{resize: 'none'}}
                  onChange={e => setContent(e.target.value)}
                />
              </div>
              <div
                className="bulk-order-create-table-tbody-edit-modal__form-input"
                style={{position: 'relative'}}
              >
                <Textarea
                  label="Ghi chú giao hàng"
                  placeholder="Nhập ghi chú"
                  value={note}
                  style={{resize: 'none'}}
                  onChange={e => setNote(e.target.value)}
                />
                <SuggestNote
                  className="bulk-order-create-table-tbody-edit-modal__note-dropdown"
                  onChange={setNote}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bulk-order-create-table-tbody-edit-modal__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={data?.onClose}
          >
            Hủy
          </Button>
          <Button
            disabled={!canSubmit}
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={() => canSubmit && handleSubmit()}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </StyledBulkOrderCreateTableTbodyEditModal>
  )
}
