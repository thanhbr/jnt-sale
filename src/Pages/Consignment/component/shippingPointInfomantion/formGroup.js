import React, { useEffect, useReducer, useRef, useState } from 'react'
import SwichButton from 'Component/SwitchButton/switchButton'
import Reducer from 'Pages/Consignment/store/reducer'
import { InitialState } from 'Pages/Consignment/store/initState'
import { activeStatus, createNewAddress } from 'Pages/Consignment/store/getAddress'
import { Button } from 'common/button'
import { separtionAddress } from './addressSeparate'
import { ADDRESS_ICONS } from 'Pages/addressSeparationTool/_icons'
import { Autocomplete, TextField } from '@mui/material'
import { StyledOption } from 'Pages/addressSeparationTool/fileId/components/table/_styled'
import { SCRIPT } from 'Pages/customer/CreateCustomer/_script'
import { handleError } from '../../confirmOnchange'
import { Checkbox } from 'common/form/checkbox'
import { Tooltip } from 'common/tooltipv2'
import toast from 'Component/Toast'
import { ERROR_TITLE } from 'Pages/Consignment/ERROR_TITLE'
import CheckBoxConsignment from 'Component/CheckBoxConsignment/CheckBoxConsignment'
export default function FormGroup({ handleClosePopup, dataInfo, handleFlag, handleOpenConfirm, handleCheckConfirm }) {
  const [status, setStatus] = useState({ label: '', value: '1' })
  const [InitState, dispatch] = useReducer(Reducer, InitialState)
  const [address, setAddress] = useState()
  const [disable, setDisable] = useState(false)
  const [callDistrict, setCallDistrict] = useState()
  const [focusName, setFocusName] = useState(false)
  const [focusPhone, setFocusPhone] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focus, setFocus] = useState(false)
  const [disableDefault, setDisabeDefault] = useState(false)
  const [deleteTitle, setDeleteTitle] = useState(false)
 const [confirmForm,setConfirmForm] =useState(false)
  const [phoneForm, setPhoneForm] = useState('')
  const [empty1, setEmpty1] = useState(true)
  const [empty2, setEmpty2] = useState(true)
  const [empty6, setEmpty6] = useState(true)
  const [empty3, setEmpty3] = useState(true)
  const [empty4, setEmpty4] = useState(true)
  const [empty5, setEmpty5] = useState(true)
  const [emptyEmail, setEmptyEmail] = useState(true)
  const [checkEmptyAll, setCheckEmptyAll] = useState(false)
  const [searchCity,setSeachCity] = useState()

  const [inputCity, setInputCity] = useState('')
  const [inputDistrict, setInputDistrict] = useState('')
  const [inputWard, setInputWard] = useState('')
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setInputCity(inputCity.trim())
      setInputDistrict(inputDistrict.trim())
      setInputWard(inputWard.trim())
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [inputCity, inputDistrict, inputWard])

  const {
    districts,
    cityName,
    districtName,
    wardname,
    cities,
    wards,
    cityId,
    districtId,
    wardId,
    handleChangeCity,
    handleChangeDistrict,
    handleChangeWard,
    showAddress,
  } = separtionAddress(callDistrict)
  const { handleChangeName,
    handleChangePhone,
    handleChangeEmail,
    handleChangeAddress,
    confirm } = handleError(InitState, dispatch, handleCheckConfirm)
  useEffect(() => {
    const buttonTitle = document.getElementsByClassName('MuiAutocomplete-popupIndicator')
    for (let i = 0; i < buttonTitle.length; i++) {
      buttonTitle[i].removeAttribute('title')
    }
    window.addEventListener('click', function (e) {
      for (let i = 0; i < buttonTitle.length; i++) {
        buttonTitle[i].removeAttribute('title')
      }
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => { })
    }
  }, [])
  const onSubmit = async () => {
    setCheckEmptyAll(true)
    const newAddress = {
      name: document.getElementById('name_address').value.trim(),
      phone: document.getElementById('phone_number').value.trim(),
      email: document.getElementById('email_address').value.trim(),
      address: document.getElementById('address_number').value.trim(),
      city_id: cityId,
      district_id: districtId,
      ward_id: wardId,
      is_default: InitState.isDefaultAddress,
      is_hidden_phone: InitState.isHiddenAddress,
      is_hidden_address: InitState.isHiddenPhone,
      is_hidden_province: InitState.isHiddenProvinceDistrict,
    }
    
    // let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (newAddress.name == '') setEmpty1(false)
    if (newAddress.phone == '') setEmpty2(false)
    if (newAddress.address == '') setEmpty6(false)
    if (newAddress.city_id == undefined) setEmpty3(false)
    if (newAddress.district_id == undefined) setEmpty4(false)
    if (newAddress.ward_id == undefined) setEmpty5(false)
    // if (!regex.test(newAddress.email)) setEmpty5(false)
    createNewAddress(newAddress, dispatch, status, handleClosePopup, handleFlag)
  }

  useEffect(() => {
    if (empty1 == true && empty2 == true && empty3 == true && empty4 == true && empty5 == true && empty6 == true && emptyEmail == true) {
      setCheckEmptyAll(false)
    } else setCheckEmptyAll(true)
  }, [empty1, empty2, empty3, empty4, empty5, empty6,emptyEmail])
  const secondInputRef = useRef();
  const thirdInputRef = useRef();
  const handleOnKeyDown = event => {
    if (event.key === "Enter") secondInputRef.current.focus();
  };
  const handleOnKeyDownSecond = event => {
    if (event.key === "Enter") thirdInputRef.current.focus();
  };
  const changeDefault = (item) => {
    if (item == 0) dispatch({ type: 'IS_DEFAULT_ADDRESS', payload: 1 })
    else dispatch({ type: 'IS_DEFAULT_ADDRESS', payload: 0 })
  }
  const changeHiddenAdress = (item) => {
    if (item == 0) dispatch({ type: 'IS_HIDDEN_ADDRESS', payload: 1 })
    else dispatch({ type: 'IS_HIDDEN_ADDRESS', payload: 0 })
  }
  const changeHiddenPhone = (item) => {
    if (item == 0) dispatch({ type: 'IS_HIDDEN_PHONE', payload: 1 })
    else dispatch({ type: 'IS_HIDDEN_PHONE', payload: 0 })
  }
  const changeHiddenProvince = (item) => {
    if (item == 0) dispatch({ type: 'IS_HIDDEN_PROVINCE_ADDRESS', payload: 1 })
    else dispatch({ type: 'IS_HIDDEN_PROVINCE_ADDRESS', payload: 0 })
  }
  const showErrorMess = () => {
    let address = InitState.validAddress.valid
    let city = InitState.validCity.valid
    let district = InitState.validDistrict.valid
    let ward = InitState.validWard.valid

    if (address == true) {
      return <span className="error_message">
        {InitState.validAddress.error}
      </span>
    }
    if (city == true) {
      return <span className="error_message">
        {InitState.validCity.error}
      </span>
    }
    if (district == true) {
      return <span className="error_message">
        {InitState.validDistrict.error}
      </span>
    }
    if (ward == true) {
      return <span className="error_message">
        {InitState.validWard.error}
      </span>
    }

  }
  return (
    <div>
      <div>
        <form>
          <div className="p-consingment__table">
            <div>
              <div className="p-consingment__shipping-name">
                <label htmlFor="name_address">
                  Tên điểm gửi hàng <span>*</span>
                </label>
                <input
                  type="text"
                  id="name_address"
                  placeholder="Nhập tên điểm gửi hàng"
                  className={InitState.validName.valid == true ? "p-consingment__shipping-input error_border" : focusName ? "p-consingment__shipping-input focus" : 'p-consingment__shipping-input'}
                  onChange={e => {
                    let { value } = e.target
                    if (value == '') setEmpty1(false)
                    else if (value.length > 80) setEmpty1(false)
                    else setEmpty1(true)
                    handleCheckConfirm()
                  }}
                  onFocus={e => {
                    let { value } = e.target
                    setFocusName(true)
                    if (value == '') dispatch({ type: 'VALID_NAME', payload: { valid: false, error: '' } })
                    else handleChangeName(e)
                  }}
                  onBlur={e => {
                    let { value } = e.target
                    if (!value.trim()) {
                      dispatch({ type: 'VALID_NAME', payload: { valid: true, error: ERROR_TITLE.EMPTY_NAME } })
                    } else handleChangeName(e)

                    // dispatch({ type: 'VALID_NAME', payload: { valid: true, error: ERROR_TITLE.EMPTY_NAME } })
                    // !!!value ? setIsEmpty({...isEmpty, name: true}) : setIsEmpty({...isEmpty, name: false})
                    setFocusName(false)

                  }}
                />

                {InitState.validName.valid == true && (
                  <p className="error_message">{InitState.validName.error}</p>
                )}
              </div>

              <div className="p-consingment__shipping-name">
                <label htmlFor="phone_number">
                  Điện thoại <span>*</span>
                </label>
                <input
                  type="text"
                  id="phone_number"
                  value={phoneForm}
                  placeholder="Nhập số điện thoại"
                  className={InitState.validPhone.valid == true ? "p-consingment__shipping-input error_border" : focusPhone ? "p-consingment__shipping-input focus" : "p-consingment__shipping-input"}
                  onChange={e => {
                    let { value } = e.target
                    const re = /^[0-9\b]+$/;
                    if (value === '' || re.test(value)) {
                      setPhoneForm(value)
                    }
                    if (value == '') setEmpty2(false)
                    else if (value.length < 10) setEmpty2(false)
                    else if (value.length >= 12) setEmpty2(false)
                    else setEmpty2(true)
                    handleCheckConfirm()
                  }}
                  onFocus={e => {
                    let { value } = e.target
                    setFocusPhone(true)
                    if (value == '') dispatch({ type: 'VALID_PHONE', payload: { valid: false, error: '' } })
                    else handleChangePhone(e)
                  }}
                  onBlur={e => {
                    setFocusPhone(false)
                    handleChangePhone(e)
                  }}
                />
                {InitState.validPhone.valid == true && (
                  <p className="error_message">{InitState.validPhone.error}</p>
                )}
              </div>

              <div className="p-consingment__shipping-name">
                <label htmlFor="email_address">Email</label>
                <input
                  type="text"
                  id="email_address"
                  placeholder="Nhập email"
                  className={InitState.validEmail.valid == true ? "p-consingment__shipping-input error_border" : focusEmail ? "p-consingment__shipping-input focus" : "p-consingment__shipping-input"}
                  onChange={e => {
                    let { value } = e.target;
                    dispatch({ type: 'VALID_EMAIL', payload: { valid: false, error: '' } })
                    let regex =
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (value == '') setEmptyEmail(true)
                    else if (!value.trim()) setEmptyEmail(true)
                    else if (!regex.test(value.trim())) setEmptyEmail(false)
                    else setEmptyEmail(true)
                    handleCheckConfirm()
                  }}
                  onFocus={e => {
                    let { value } = e.target
                    setFocusEmail(true)
                    if (value == '') dispatch({ type: 'VALID_EMAIL', payload: { valid: false, error: '' } })
                    else handleChangeEmail(e)
                  }}
                  onBlur={e => {
                    const { value } = e.target
                    if (value === '') dispatch({ type: 'VALID_EMAIL', payload: { valid: false, error: '' } })
                    else handleChangeEmail(e)
                    setFocusEmail(false)

                  }}
                />
                {InitState.validEmail.valid == true && <p className='error_message'>{InitState.validEmail.error}</p>}
              </div>

              <div className="p-consingment__shipping-name address_field">
                <label>
                  Địa chỉ <span>*</span>
                </label>
                <div className="p-consingment__dropdown">
                  <div className='p-consingment__autocomplete'>
                    <Autocomplete
                      className={InitState.validCity.valid == true ? "autocomplete__address error_border" : "autocomplete__address autocomplete__address-hover"}
                      disableClearable={true}
                      noOptionsText="Không có kết quả"
                      options={cities}
                      popupIcon={ADDRESS_ICONS.arrowDown}
                      value={cityName}
                      // {...register("city_id")}
                      componentsProps={{ paper: { sx: { minWidth: 200 } } }}
                      getOptionLabel={option => option}
                      inputValue={inputCity}
                      onInputChange={(e, value) => {
                        setInputCity(value.replace('  ',''))
                      }}
                      onChange={(e, val) => {
                        let value = val.trim()
                        handleChangeCity(value)
                        dispatch({ type: 'VALID_CITY', payload: { valid: false, error: '' } })
                        if (val == '') setEmpty3(false)
                        else setEmpty3(true)
                        handleCheckConfirm()
                        setConfirmForm(true)
                      }}
                      onBlur={e => {
                        let { value } = e.target
                        if (!value.trim()) dispatch({ type: 'VALID_CITY', payload: { valid: true, error: ERROR_TITLE.EMPTY_ADDRESS } })
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          onKeyDown={handleOnKeyDown}
                          inputProps={{ ...params.inputProps }}
                          placeholder={SCRIPT.SE_CUS_CITY}
                          className="text_field"
                          autoComplete={'off'}
                          value={searchCity}
                          onChange={e => {
                            let { value } = e.target
                            // if(value.trim() !== ''){
                            //   setSeachCity(value.trim())
                            // } 
                            

                          }}
                        />

                      )}
                      renderOption={(props, option) => (
                        <StyledOption {...props}>{option}</StyledOption>
                        // <li className='autocomplete__address-selected' {...props}>{option}</li>
                      )}
                    />
                  </div>
                  <div className='p-consingment__autocomplete' >
                    <Autocomplete
                      className={InitState.validDistrict.valid == true ? "autocomplete__address error_border" : districts == undefined ? "autocomplete__address autocomplete__disable" : "autocomplete__address autocomplete__address-hover"}
                      disableClearable={true}
                      disabled={districts == undefined ? true : false}
                      noOptionsText="Không có kết quả"
                      options={
                        districts == undefined ? ['Không có kết quả'] : districts
                      }
                      popupIcon={ADDRESS_ICONS.arrowDown}
                      value={districtName}
                      // {...register("city_id")}
                      componentsProps={{ paper: { sx: { minWidth: 200 } } }}
                      getOptionLabel={option => option}
                      inputValue={inputDistrict}
                      onInputChange={(e, value) => {
                        setInputDistrict(value.replace('  ',''))
                      }}
                      onChange={(e, val) => {
                        handleChangeDistrict(val)
                        dispatch({ type: 'VALID_DISTRICT', payload: { valid: false, error: '' } })
                        if (val == '') setEmpty4(false)
                        else setEmpty4(true)
                        handleCheckConfirm()
                        setConfirmForm(true)
                      }}
                      onBlur={e => {
                        let { value } = e.target
                        if (value=='') dispatch({ type: 'VALID_DISTRICT', payload: { valid: true, error: ERROR_TITLE.EMPTY_ADDRESS } })
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          inputRef={secondInputRef}
                          onKeyDown={handleOnKeyDownSecond}
                          inputProps={{ ...params.inputProps }}
                          placeholder={SCRIPT.SE_CUS_DISTRICT}
                          className="text_field"
                          autoComplete={'off'}
                        />
                      )}
                      data-disabled={!!!cityName}
                      renderOption={(props, option) => (
                        <StyledOption {...props}>{option}</StyledOption>
                      )}
                    />

                  </div>
                  <div className='p-consingment__autocomplete'>
                    <Autocomplete
                      className={InitState.validWard.valid == true ? "autocomplete__address error_border" : wards == undefined ? "autocomplete__address  autocomplete__disable" : "autocomplete__address autocomplete__address-hover"}
                      disableClearable={true}
                      noOptionsText="Không có kết quả"
                      disabled={wards == undefined ? true : false}
                      options={wards == undefined ? ['Không có kết quả'] : wards}
                      popupIcon={ADDRESS_ICONS.arrowDown}
                      value={wardname}
                      // {...register("city_id")}
                      componentsProps={{ paper: { sx: { minWidth: 200 } } }}
                      getOptionLabel={option => option}
                      inputValue={inputWard}
                      onInputChange={(e, value) => {
                        setInputWard(value.replace('  ',''))
                      }}
                      onChange={(e, val) => {
                        handleChangeWard(val)
                        dispatch({ type: 'VALID_WARD', payload: { valid: false, error: '' } })
                        if (val == '') setEmpty5(false)
                        else setEmpty5(true)
                        handleCheckConfirm()
                        setConfirmForm(true)
                      }}
                      onBlur={e => {
                        let { value } = e.target
                        if (!value.trim()) dispatch({ type: 'VALID_WARD', payload: { valid: true, error: ERROR_TITLE.EMPTY_ADDRESS } })
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          inputRef={thirdInputRef}
                          inputProps={{ ...params.inputProps }}
                          placeholder={SCRIPT.SE_CUS_WARD}
                          className="text_field"
                          autoComplete={'off'}
                        />
                      )}
                      data-disabled={!!!districtName}
                      renderOption={(props, option) => (
                        <StyledOption {...props}>{option}</StyledOption>
                      )}
                    />

                  </div>
                </div>


              </div>
              <div className="p-consingment__shipping-address">
                <input
                  type="text"
                  id="address_number"
                  placeholder="Nhập số nhà, tên đường"
                  className={InitState.validAddress.valid == true ? "p-consingment__shipping-input error_border" : focus ? "p-consingment__shipping-input autocomplete__address-hover focus" : "p-consingment__shipping-input autocomplete__address-hover"}
                  onChange={e => {
                    let value = e.target.value
                    setAddress(value)
                    if (value == '') setEmpty6(false)
                    else if (value.length > 225) setEmpty6(false)
                    else setEmpty6(true)
                    handleCheckConfirm()
                  }}
                  onFocus={e => {
                    setFocus(true)
                    let value = e.target.value
                    // if (value == '') dispatch({ type: 'VALID_ADDRESS', payload: { valid: false, error: '' } })
                    // else handleChangeAddress(e)
                    dispatch({ type: 'VALID_ADDRESS', payload: { valid: false, error: '' } })
                  }}
                  onBlur={e => {
                    const { value } = e.target
                    if (!value.trim()) dispatch({ type: 'VALID_ADDRESS', payload: { valid: true, error: ERROR_TITLE.EMPTY_ADDRESS } })
                    else handleChangeAddress(e)
                    setFocus(false)

                  }}
                />
                {showErrorMess()}
              </div>
              {showAddress ? <div className="p-consingment__location">
                <img src="/svg/marker-pin.svg" alt="icon-location" />
                {/* <p>Số nhà/Tên đường, Phường/Xã, Quận/Huyện,Tỉnh/Thành</p> */}
                <p>
                  {address ? <span>{address + ', '} </span> : ''}
                  {wardname ? <span>{wardname + ', '} </span> : ''}
                  {districtName ? <span>{districtName + ', '} </span> : ''}
                  {cityName ? <span>{cityName} </span> : ''}
                </p>
              </div> : <div className="p-consingment__location">
                <img src="/svg/marker-pin.svg" alt="icon-location" />
                <p>Số nhà/Tên đường, Phường/Xã, Quận/Huyện,Tỉnh/Thành</p>
              </div>}
              <div className="p-consingment__checkbox">
                <ul>
                  <li>
                    <CheckBoxConsignment disable={disableDefault} isChecked={InitState.isDefaultAddress == 0 ? false : true} handleClick={() => changeDefault(InitState.isDefaultAddress)} />
                    <span htmlFor="checkbox1">Sử dụng địa chỉ này làm mặc định.</span>
                  </li>
                  <li>
                    <CheckBoxConsignment isChecked={InitState.isHiddenAddress == 0 ? false : true} handleClick={() => changeHiddenAdress(InitState.isHiddenAddress)} />
                    <span htmlFor="checkbox2">Ẩn địa chỉ khi in đơn giao hàng.</span>
                  </li>
                  <li>
                    <CheckBoxConsignment isChecked={InitState.isHiddenPhone == 0 ? false : true} handleClick={() => changeHiddenPhone(InitState.isHiddenPhone)} />
                    <span htmlFor="checkbox3">
                      Ẩn số điện thoại khi in đơn giao hàng.
                    </span>
                  </li>
                  <li>
                    <CheckBoxConsignment isChecked={InitState.isHiddenProvinceDistrict == 0 ? false : true} handleClick={() => changeHiddenProvince(InitState.isHiddenProvinceDistrict)} />
                    <span htmlFor="checkbox4">
                      Ẩn Tỉnh/Thành, Quận/Huyện, Phường/Xã khi in đơn giao hàng.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {InitState.isDefaultAddress == 0 ? <div className="p-consingment__activate">
              <div className={`product-management-status product-management-status-detail`} onClick={() => {
                if (status.value === '1') {
                  setStatus({ ...status, value: '-1' })
                  setDisabeDefault(true)
                  // activeStatus({ id: InitState.idAddress, status: -1 })
                } else {
                  setStatus({ ...status, value: '1' })
                  setDisabeDefault(false)
                  // activeStatus({ id: InitState.idAddress, status: 1 })
                }
                setDisable(false)
              }}>
                <SwichButton id="activate" status={status} />
              </div>
              <label htmlFor="activate" onClick={() => {
                if (status.value === '1') {
                  setStatus({ ...status, value: '-1' })
                  setDisabeDefault(true)
                  // activeStatus({ id: InitState.idAddress, status: -1 })
                } else {
                  setStatus({ ...status, value: '1' })
                  setDisabeDefault(false)
                  // activeStatus({ id: InitState.idAddress, status: 1 })
                }
                setDisable(false)
              }}>Kích hoạt/Ngưng sử dụng</label>
            </div> : ''}

          </div>
        </form>
        <div className="p-consingment__shipping-button">
          <Button
            appearance="ghost"
            className="p-consingment__cancel"
            onClick={() => {
              if (confirm || confirmForm) handleOpenConfirm()
              else handleClosePopup()

            }}
          >
            Hủy
          </Button>
          <Button
            appearance="primary_300"
            className="p-consingment__save"
            onClick={onSubmit}
            disabled={checkEmptyAll}
          >
            Lưu
          </Button>


        </div>
      </div>

    </div>
  )
}
