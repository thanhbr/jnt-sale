import {Autocomplete, Skeleton, TextField, Tooltip} from '@mui/material'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {useContext, useEffect, useState} from 'react'
import {AddressSeparationSingleFileContext} from '../..'
import {StyledOption, StyledSingleAddressTable} from './_styled'
import locationJsonData from '../../../_data.json'
import {Button} from 'common/button'
import useRowFunction from './_useRowFunction'
import {EmptySection} from 'common/emptySection'

const provinces = locationJsonData.map(item => item?.name)

export const AddressSeparationFileTable = ({...props}) => {
  const {pageState} = useContext(AddressSeparationSingleFileContext)
  const {failedData, successData, isLoading, tab} = pageState

  const dataDisplay = {failed: failedData, success: successData}

  return (
    <StyledSingleAddressTable {...props}>
      <div className="single-address-table__container">
        <div className="single-address-table__thead">
          <ul className="single-address-table__tr">
            <li className="single-address-table__th">
              <Text as="b" style={{marginLeft: 8, textAlign: 'center'}}>
                Dòng
              </Text>
            </li>
            <li className="single-address-table__th">
              <Text as="b">Địa chỉ</Text>
            </li>
            <li className="single-address-table__th">
              <Text as="b">Tỉnh/Thành phố</Text>
            </li>
            <li className="single-address-table__th">
              <Text as="b">Quận/Huyện</Text>
            </li>
            <li className="single-address-table__th">
              <Text as="b">Phường/Xã</Text>
            </li>
            <li className="single-address-table__th">
              <Text as="b">Người nhận</Text>
            </li>
            <li className="single-address-table__th">
              <Text as="b">Mã đơn riêng</Text>
            </li>
            <li className="single-address-table__th"></li>
          </ul>
        </div>
        <div className="single-address-table__tbody">
          {isLoading ? (
            <>
              {Array.from(Array(10), (e, i) => (
                <EmptyRow key={i} />
              ))}
            </>
          ) : (
            <>
              {dataDisplay[tab?.active].length <= 0 ? (
                <EmptySection
                  banner={<img src="/img/address/empty.png" alt="Empty" />}
                >
                  {tab.active === 'success' && (
                    <>
                      {' '}
                      Chưa có địa chỉ nào được tách thành công, vui lòng kiểm
                      tra dữ liệu đã nhập và điều chỉnh tại tab{' '}
                      <span style={{color: THEME_SEMANTICS.failed}}>
                        Tách thất bại
                      </span>
                      .
                    </>
                  )}
                  {tab.active === 'failed' &&
                    'Không có địa chỉ nào tách thất bại.'}
                </EmptySection>
              ) : (
                <>
                  {dataDisplay[tab?.active].map(item => (
                    <Row key={item?.id} data={item} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </StyledSingleAddressTable>
  )
}

export const EmptyRow = () => {
  return (
    <ul className="single-address-table__tr">
      {Array.from(Array(8), (e, i) => (
        <li key={i} className="single-address-table__td">
          <Skeleton
            variant="text"
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export const Row = ({data}) => {
  const {
    tab,
    edit,
    address,
    province,
    district,
    districtData,
    town,
    townData,
    suggestData,
    triggerUpdate,
    canEdit,
    canSubmit,
    isReported,
    shouldFocusAddressInput,
    errorSeparate,
    handleEdit,
    handleEditReset,
    onAddressInputBlur,
    onAddressInputChange,
    onAddressInputFocus,
    onAddressInputTyping,
    handleEditSubmit,
    handleInputFocus,
    handleOptionClick,
    handleSeparateAddress,
    handleProvinceChange,
    handleDistrictChange,
    handleTownChange,
    handleReport,
  } = useRowFunction({
    data,
  })

  const [tmpAddress, setTmpAddress] = useState(address)
  const [tmpProvince, setTmpProvince] = useState(province || '--')
  const [tmpDistrict, setTmpDistrict] = useState(district || '--')
  const [tmpTown, setTmpTown] = useState(town || '--')

  useEffect(() => {
    setTmpAddress(address)
    setTmpProvince(province || '--')
    setTmpDistrict(district || '--')
    setTmpTown(town || '--')
  }, [triggerUpdate])

  return (
    <ul
      className="single-address-table__tr"
      data-edit={canEdit}
      style={tab?.active === 'failed' ? {cursor: 'pointer'} : undefined}
      onClick={() => tab?.active === 'failed' && handleEdit()}
    >
      <li className="single-address-table__td">
        <Text title={data?.file_name} style={{marginLeft: 8}}>
          {data?.file_row}
        </Text>
      </li>
      <li className="single-address-table__td">
        <Text>
          {tmpAddress}
          {isReported && (
            <Tooltip id="global-tooltip" title="Đã được báo lỗi" arrow>
              <span className="single-address-table__report-marker">
                {ADDRESS_ICONS.report}
              </span>
            </Tooltip>
          )}
        </Text>
      </li>
      <li className="single-address-table__td">
        <Text
          color={
            tmpProvince ? THEME_COLORS.secondary_100 : THEME_SEMANTICS.failed
          }
        >
          {tmpProvince}
        </Text>
      </li>
      <li className="single-address-table__td">
        <Text
          color={
            tmpDistrict ? THEME_COLORS.secondary_100 : THEME_SEMANTICS.failed
          }
        >
          {tmpDistrict}
        </Text>
      </li>
      <li className="single-address-table__td">
        <Text
          color={tmpTown ? THEME_COLORS.secondary_100 : THEME_SEMANTICS.failed}
        >
          {tmpTown || '--'}
        </Text>
      </li>
      <li
        className="single-address-table__td"
        data-hidden={canEdit}
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Text>{data?.name}</Text>
        <Text color="#7C88A6">{data?.phone}</Text>
      </li>
      <li className="single-address-table__td" data-hidden={canEdit}>
        <Text>{data?.order_code || '--'}</Text>
      </li>
      <li className="single-address-table__td">
        {!canEdit && (
          <>
            <button
              className="single-address-table__action"
              data-reverse="true"
            >
              {ADDRESS_ICONS.threeDots}
            </button>
            <Tooltip id="global-tooltip" title="Chỉnh sửa" arrow>
              <button
                className="single-address-table__action"
                onClick={handleEdit}
              >
                {ADDRESS_ICONS.edit}
              </button>
            </Tooltip>
            {tab?.active === 'success' && !isReported && (
              <Tooltip
                id="global-tooltip"
                placement="top"
                title="Báo lỗi"
                arrow
              >
                <button
                  className="single-address-table__action"
                  onClick={handleReport}
                >
                  {ADDRESS_ICONS.report}
                </button>
              </Tooltip>
            )}
          </>
        )}
      </li>
      {canEdit && (
        <div className="single-address-table__extra">
          <div className="single-address-table__extra-container">
            <div className="single-address-table__extra-upper">
              <div className="single-address-table__special-field-text">
                <Button
                  className="single-address-table__special-toggle"
                  icon={ADDRESS_ICONS.target}
                  onClick={() => handleSeparateAddress()}
                >
                  Tách
                </Button>
                <input
                  className={`single-address-table__special-input ${errorSeparate ? 'single-address-table__border-error-address' :''}`}
                  type="text"
                  value={address}
                  onBlur={onAddressInputBlur}
                  onChange={e => onAddressInputChange(e.target.value)}
                  onFocus={onAddressInputFocus}
                  onKeyUp={onAddressInputTyping}
                />
                {shouldFocusAddressInput &&
                  Array.isArray(suggestData) &&
                  suggestData.length > 0 && (
                    <ul className="single-address-table__special-select">
                      {suggestData.map(item => (
                        <li
                          key={item.id}
                          className="single-address-table__special-option"
                          onClick={() =>
                            handleOptionClick(
                              `${item?.suggest}, ${item?.ward_name}, ${item?.district_name}, ${item?.city_name}`,
                            )
                          }
                        >
                          {item?.suggest}, {item?.ward_name},{' '}
                          {item?.district_name}, {item?.city_name}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
            <div className="single-address-table__extra-under">
              <Autocomplete
                className="single-address-table__autocomplete"
                disableClearable={true}
                noOptionsText="Không có kết quả"
                options={provinces}
                popupIcon={ADDRESS_ICONS.arrowDown}
                value={province}
                componentsProps={{paper: {sx: {minWidth: 200}}}}
                getOptionLabel={option => option}
                onChange={(e, val) => handleProvinceChange(val)}
                renderInput={params => (
                  <TextField
                    {...params}
                    inputProps={{...params.inputProps}}
                    placeholder="--"
                    onFocus={handleInputFocus}
                    style={{height: 32}}
                  />
                )}
                renderOption={(props, option) => (
                  <StyledOption {...props}>{option}</StyledOption>
                )}
                data-warning={edit?.warning && !province ? true : false}
              />
              <Autocomplete
                className="single-address-table__autocomplete"
                disabled={!!!province}
                disableClearable={true}
                noOptionsText="Không có kết quả"
                options={districtData}
                popupIcon={ADDRESS_ICONS.arrowDown}
                value={district}
                componentsProps={{paper: {sx: {minWidth: 200}}}}
                getOptionLabel={option => option}
                onChange={(e, val) => handleDistrictChange(val)}
                renderInput={params => (
                  <TextField
                    {...params}
                    inputProps={{...params.inputProps}}
                    placeholder="--"
                    onFocus={handleInputFocus}
                  />
                )}
                renderOption={(props, option) => (
                  <StyledOption {...props}>{option}</StyledOption>
                )}
                data-disabled={!!!province}
                data-warning={edit?.warning && !district ? true : false}
              />
              <Autocomplete
                className="single-address-table__autocomplete"
                disabled={!!!district}
                disableClearable={true}
                noOptionsText="Không có kết quả"
                options={townData}
                popupIcon={ADDRESS_ICONS.arrowDown}
                value={town}
                componentsProps={{paper: {sx: {minWidth: 200}}}}
                getOptionLabel={option => option}
                onChange={(e, val) => handleTownChange(val)}
                renderInput={params => (
                  <TextField
                    {...params}
                    inputProps={{...params.inputProps}}
                    placeholder="--"
                    onFocus={handleInputFocus}
                  />
                )}
                renderOption={(props, option) => (
                  <StyledOption {...props}>{option}</StyledOption>
                )}
                data-disabled={!!!district}
                data-warning={edit?.warning && !town ? true : false}
              />
              {tab?.active === 'success' && (
                <Button
                  appearance="ghost"
                  size="md-"
                  style={{marginRight: 8}}
                  onClick={() => handleEditReset()}
                >
                  Hủy
                </Button>
              )}
              <Button
                disabled={!canSubmit}
                size="md-"
                style={{
                  minWidth: tab?.active === 'success' ? 90 : 156,
                  padding: '0 8px',
                }}
                onClick={() => canSubmit && handleEditSubmit()}
              >
                {tab?.active === 'success' ? 'Cập nhật' : 'Lưu kết quả tách'}
              </Button>
            </div>
            {errorSeparate && (
              <span className="single-address-table__error-address">
                evoshop chưa nhận diện được địa chỉ này, hãy kiểm tra lại hoặc tự chọn địa chỉ ở bên dưới bạn nhé!
              </span>
            )}
          </div>
        </div>
      )}
    </ul>
  )
}
