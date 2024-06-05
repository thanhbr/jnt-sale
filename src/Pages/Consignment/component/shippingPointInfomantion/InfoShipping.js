import { getData, postData } from 'api/api'
import { getInfoConsignment, postUpdateConsignment } from 'api/url'
import { Checkbox } from 'common/form/checkbox'
import toast from 'Component/Toast'
import { ADDRESS_ICONS } from 'Pages/addressSeparationTool/_icons'
import { InitialState } from 'Pages/Consignment/store/initState'
import Reducer from 'Pages/Consignment/store/reducer'
import { Autocomplete, TextField } from '@mui/material'
import { StyledOption } from 'Pages/addressSeparationTool/fileId/components/table/_styled'
import { SCRIPT } from 'Pages/customer/CreateCustomer/_script'
import React, { useEffect, useReducer, useState } from 'react'
import { separtionAddress } from './addressSeparate'
import { handleError } from '../../confirmOnchange'
import { Button } from 'common/button'
import SwichButton from 'Component/SwitchButton/switchButton'
import { activeStatus, createActiveStatus } from 'Pages/Consignment/store/getAddress'
import CheckBoxConsignment from 'Component/CheckBoxConsignment/CheckBoxConsignment'
import { ERROR_TITLE } from 'Pages/Consignment/ERROR_TITLE'

export default function InfoShipping({ ...props }) {
    const { dataInfo, handleFlag, handleClosePopup, handleOpenConfirm, handleCheckConfirm, handleDefault } = props
    const [status, setStatus] = useState({ label: '', value: 1 })
    const [isDefault, setIsDefault] = useState()
    const [isHiddenAddress, setIsHiddenAddress] = useState()
    const [isHiddenPhone, setIsHiddenPhone] = useState()
    const [isHiddenProvince, setIsHiddenProvince] = useState()
    const [InitState, dispatch] = useReducer(Reducer, InitialState)
    const [address, setAddress] = useState()
    const [disable, setDisable] = useState(false)
    const [focusName, setFocusName] = useState(false)
    const [focusPhone, setFocusPhone] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)
    const [focus, setFocus] = useState(false)
    const [empty1, setEmpty1] = useState(true)
    const [empty2, setEmpty2] = useState(true)
    const [empty6, setEmpty6] = useState(true)
    const [empty3, setEmpty3] = useState(true)
    const [empty4, setEmpty4] = useState(true)
    const [empty5, setEmpty5] = useState(true)
    const [confirmForm, setConfirmForm] = useState(false)
    const [emptyEmail, setEmptyEmail] = useState(true)
    const [phoneForm, setPhoneForm] = useState(dataInfo[0].phone)

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
        showAddress
    } = separtionAddress(dataInfo ? dataInfo[0] : '')
    const { handleChangeName,
        handleChangePhone,
        handleChangeEmail, handleChangeAddress, confirm } = handleError(InitState, dispatch, handleCheckConfirm)
    useEffect(() => {
        if (dataInfo) {
            setStatus({ label: '', value: dataInfo[0].status })
            setIsDefault(dataInfo[0].is_default)
            setIsHiddenAddress(dataInfo[0].is_hidden_address)
            setIsHiddenPhone(dataInfo[0].is_hidden_phone)
            setIsHiddenProvince(dataInfo[0].is_hidden_province)
            // handleChangeCity(dataInfo[0].city_name)
            if (dataInfo[0].city_name) {
                handleChangeDistrict(dataInfo[0].district_name)
                handleChangeWard(dataInfo[0].ward_name)
            }


        }
    }, [dataInfo])
    useEffect(() => {
        if (empty1 == true && empty2 == true && empty3 == true && empty4 == true && empty5 == true && empty6 == true && emptyEmail === true) {
            setDisable(false)
        } else setDisable(true)
    }, [empty1, empty2, empty3, empty4, empty5, empty6, emptyEmail])
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

    const handleUpdate = async () => {
        setDisable(true)
        const newAddress = {
            name: document.getElementById('name_address').value.trim(),
            phone: document.getElementById('phone_number').value.trim(),
            email: document.getElementById('email_address').value.trim(),
            address: document.getElementById('address_number').value.trim(),
            city_id: cityId,
            district_id: districtId,
            ward_id: wardId,
            is_default: isDefault,
            is_hidden_phone: isHiddenPhone,
            is_hidden_address: isHiddenAddress,
            is_hidden_province: isHiddenProvince,
        }
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (newAddress.name == '') setEmpty1(false)
        if (newAddress.phone == '') setEmpty2(false)
        if (newAddress.address == '') setEmpty6(false)
        if (cityName == '') setEmpty3(false)
        if (districtName == '') setEmpty4(false)
        if (wardname == '') setEmpty5(false)
        if (!regex.test(newAddress.email)) setEmpty5(false)
        if (newAddress.is_default == 1) {
            try {
                const res = await postData(postUpdateConsignment(dataInfo.map(item => item.id)), newAddress)
                if (res.data.success) {
                    handleDefault()
                    handleClosePopup()
                    toast.success({ title: 'Cập nhật điểm gửi hàng thành công!' })
                    createActiveStatus({ id: dataInfo.map(item => item.id), status: status.value }, handleFlag)

                } else {
                    res.data.errors.map(item => {
                        switch (item.field) {
                            case 'name':
                                dispatch({ type: 'VALID_NAME', payload: { valid: true, error: item.field == 'name' ? ERROR_TITLE.EMPTY_NAME : '' } })
                                break;

                            case 'phone':
                                dispatch({ type: 'VALID_PHONE', payload: { valid: true, error: item.field == 'phone' ? ERROR_TITLE.EMPTY_PHONE : '' } })
                                break;

                            case 'city_id':
                                dispatch({ type: 'VALID_CITY', payload: { valid: true, error: item.field == 'city_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            case 'district_id':
                                dispatch({ type: 'VALID_DISTRICT', payload: { valid: true, error: item.field == 'district_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            case 'ward_id':
                                dispatch({ type: 'VALID_WARD', payload: { valid: true, error: item.field == 'ward_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            case 'address':
                                dispatch({ type: 'VALID_ADDRESS', payload: { valid: true, error: item.field == 'address' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            default:
                                break;
                        }

                    })
                }
            } catch (er) {
                console.log(er);
            }
        }
        else {
            try {
                const res = await postData(postUpdateConsignment(dataInfo.map(item => item.id)), newAddress)
                if (res.data.success) {
                    handleClosePopup()
                    toast.success({ title: 'Cập nhật điểm gửi hàng thành công!' })
                    createActiveStatus({ id: dataInfo.map(item => item.id), status: status.value }, handleFlag)

                } else {
                    res.data.errors.map(item => {
                        switch (item.field) {
                            case 'name':
                                dispatch({ type: 'VALID_NAME', payload: { valid: true, error: item.field == 'name' ? ERROR_TITLE.EMPTY_NAME : '' } })
                                break;

                            case 'phone':
                                dispatch({ type: 'VALID_PHONE', payload: { valid: true, error: item.field == 'phone' ? ERROR_TITLE.EMPTY_PHONE : '' } })
                                break;

                            case 'city_id':
                                dispatch({ type: 'VALID_CITY', payload: { valid: true, error: item.field == 'city_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            case 'district_id':
                                dispatch({ type: 'VALID_DISTRICT', payload: { valid: true, error: item.field == 'district_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            case 'ward_id':
                                dispatch({ type: 'VALID_WARD', payload: { valid: true, error: item.field == 'ward_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            case 'address':
                                dispatch({ type: 'VALID_ADDRESS', payload: { valid: true, error: item.field == 'address' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                                break;

                            default:
                                break;
                        }

                    })
                }
            } catch (er) {
                console.log(er);
            }
        }
    }
    const changeDefault = () => {
        if (isDefault == 1) {
            if (dataInfo[0].is_default == 1) {
                setIsDefault(0)
                toast.warning("Bạn cần chọn điểm gửi hàng khác làm mặc định!")
                dispatch({ type: 'IS_DEFAULT_ADDRESS', payload: 0 })
            } else {
                setIsDefault(0)
                dispatch({ type: 'IS_DEFAULT_ADDRESS', payload: 0 })
            }

        } else {
            dispatch({ type: 'IS_DEFAULT_ADDRESS', payload: 1 })
            setIsDefault(1)
        }

    }

    const changeHiddenAdress = () => {
        if (isHiddenAddress == 0) {
            setIsHiddenAddress(1)
            dispatch({ type: 'IS_HIDDEN_ADDRESS', payload: 1 })
        }
        else {
            setIsHiddenAddress(0)
            dispatch({ type: 'IS_HIDDEN_ADDRESS', payload: 0 })
        }
    }
    const changeHiddenPhone = () => {
        if (isHiddenPhone == 0) {
            setIsHiddenPhone(1)
            dispatch({ type: 'IS_HIDDEN_PHONE', payload: 1 })
        }
        else {
            setIsHiddenPhone(0)
            dispatch({ type: 'IS_HIDDEN_PHONE', payload: 0 })
        }

    }
    const changeHiddenProvince = () => {
        if (isHiddenProvince == 0) {
            setIsHiddenProvince(1)
            dispatch({ type: 'IS_HIDDEN_PROVINCE_ADDRESS', payload: 1 })
        }
        else {
            setIsHiddenProvince(0)
            dispatch({ type: 'IS_HIDDEN_PROVINCE_ADDRESS', payload: 0 })
        }

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
    const showInfo = () => {
        return dataInfo?.map((item, index) => {
            return (
                <div key={index} >
                    <div className="p-consingment__shipping-name">
                        <label htmlFor="name_address">
                            Tên điểm gửi hàng <span>*</span>
                        </label>
                        <input
                            type="text"
                            id="name_address"
                            placeholder="Nhập tên điểm gửi hàng"
                            className={focusName ? "p-consingment__shipping-input focus" : "p-consingment__shipping-input"}
                            defaultValue={item.fullname}
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
                                setFocusName(false)
                                handleChangeName(e)
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
                            placeholder="Nhập số điện thoại"
                            className={focusPhone ? "p-consingment__shipping-input focus" : "p-consingment__shipping-input"}
                            defaultValue={phoneForm}
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
                            defaultValue={item.email}
                            className={focusEmail ? "p-consingment__shipping-input focus" : "p-consingment__shipping-input"}
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
                                let { value } = e.target
                                setFocusEmail(false)
                                if (value === '') dispatch({ type: 'VALID_EMAIL', payload: { valid: false, error: '' } })
                                else handleChangeEmail(e)
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
                                    options={cities} popupIcon={ADDRESS_ICONS.arrowDown}
                                    value={cityName ? cityName : item.city_name}
                                    // {...register("city_id")}
                                    componentsProps={{ paper: { sx: { minWidth: 200 } } }}
                                    getOptionLabel={option => option}
                                    inputValue={inputCity}
                                    onInputChange={(e, value) => {
                                      setInputCity(value.replace('  ',''))
                                    }}
                                    onChange={(e, val) => {
                                        // if(val.trim()){
                                        handleCheckConfirm()
                                        dispatch({ type: 'VALID_CITY', payload: { valid: false, error: '' } })
                                        handleChangeCity(val)
                                        if (val === '') setEmpty3(false)
                                        else setEmpty3(true)
                                        setConfirmForm(true)

                                        // }

                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            inputProps={{ ...params.inputProps }}
                                            placeholder={SCRIPT.SE_CUS_CITY}
                                            className="text_field"
                                            autoComplete={'off'}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <StyledOption {...props}>{option}</StyledOption>
                                    )}
                                />
                                {InitState.validCity.valid == true && (
                                    <span className="error_message">
                                        {InitState.validCity.error}
                                    </span>
                                )}
                            </div>
                            <div className='p-consingment__autocomplete'>
                                <Autocomplete

                                    className={districts == undefined ? "autocomplete__address autocomplete__disable" : InitState.validDistrict.valid == true ? "autocomplete__address error_border" : "autocomplete__address autocomplete__address-hover"}
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
                                        handleCheckConfirm()
                                        handleChangeDistrict(val)
                                        dispatch({ type: 'VALID_DISTRICT', payload: { valid: false, error: '' } })
                                        if (val === '') setEmpty4(false)
                                        else setEmpty4(true)
                                        setConfirmForm(true)
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
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
                                    className={InitState.validWard.valid == true ? "autocomplete__address error_border" : wards == undefined ? "autocomplete__address autocomplete__disable" : "autocomplete__address autocomplete__address-hover"}
                                    disableClearable={true}
                                    disabled={wards == undefined ? true : false}
                                    noOptionsText="Không có kết quả"
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
                                        handleCheckConfirm()
                                        dispatch({ type: 'VALID_WARD', payload: { valid: false, error: '' } })
                                        handleChangeWard(val)
                                        if (val === '') setEmpty5(false)
                                        else setEmpty5(true)
                                        setConfirmForm(true)
                                    }}

                                    renderInput={params => (
                                        <TextField
                                            {...params}
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
                            className={InitState.validAddress.valid == true ? "p-consingment__shipping-input error_border" : focus ? "p-consingment__shipping-input focus" : "p-consingment__shipping-input"}
                            defaultValue={item.address}
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
                                if (value == '') dispatch({ type: 'VALID_ADDRESS', payload: { valid: false, error: '' } })
                                else handleChangeAddress(e)
                            }}
                            onBlur={e => {
                                setFocus(false)
                                handleChangeAddress(e)
                            }}
                        />
                        {showErrorMess()}
                    </div>
                    {item.address ? <div className="p-consingment__location">
                        <img src="/svg/marker-pin.svg" alt="icon-location" />
                        {/* <p>Số nhà/Tên đường, Phường/Xã, Quận/Huyện,Tỉnh/Thành</p> */}
                        <p>
                            {address ? <span>{address},{" "} </span> : <span>{item.address},{" "}</span>}
                            {wardname ? <span>{wardname},{" "} </span> : <span>{item.ward_name},{" "}</span>}{' '}
                            {districtName ? <span>{districtName},{" "} </span> : <span>{item.district_name},{" "}</span>}{' '}
                            {cityName ? <span>{cityName}</span> : <span>{item.city_name},{" "}</span>}
                        </p>
                    </div> : <div className="p-consingment__location">
                        <img src="/svg/marker-pin.svg" alt="icon-location" />
                        <p>Số nhà/Tên đường, Phường/Xã, Quận/Huyện,Tỉnh/Thành</p>
                    </div>}
                    <div className="p-consingment__checkbox">
                        <ul >
                            <li>
                                <CheckBoxConsignment disable={status.value == 1 ? false : true} isChecked={isDefault == 1 ? true : false} handleClick={changeDefault} />
                                {/* <Checkbox checked={isDefault == 1 ? true : false} disabled={status.value == '-1' ? true : false} onChange={changeDefault} /> */}
                                <span htmlFor="checkbox1">Sử dụng địa chỉ này làm mặc định.</span>
                            </li>
                            <li>
                                <CheckBoxConsignment isChecked={isHiddenAddress == 1 ? true : false} handleClick={changeHiddenAdress} />
                                <span htmlFor="checkbox2">Ẩn địa chỉ khi in đơn giao hàng.</span>
                            </li>
                            <li>
                                <CheckBoxConsignment isChecked={isHiddenPhone == 1 ? true : false} handleClick={changeHiddenPhone} />
                                <span htmlFor="checkbox3">
                                    Ẩn số điện thoại khi in đơn giao hàng.
                                </span>
                            </li>
                            <li>
                                <CheckBoxConsignment isChecked={isHiddenProvince == 1 ? true : false} handleClick={changeHiddenProvince} />
                                <span htmlFor="checkbox4">
                                    Ẩn Tỉnh/Thành, Quận/Huyện, Phường/Xã khi in đơn giao hàng.
                                </span>
                            </li>

                        </ul>
                    </div>
                    {isDefault == 1 ? '' :
                        <div
                            className="p-consingment__activate"
                            onClick={() => {
                                if (status.value === '1') {
                                    setStatus({ label: '', value: '-1' })
                                    // activeStatus({ id: [item.id], status: -1 })
                                } else {
                                    setStatus({ label: '', value: '1' })
                                    // activeStatus({ id: [item.id], status: 1 })
                                }
                            }}
                        >
                            <div className={`product-management-status product-management-status-detail`}>
                                <SwichButton id="activate" status={status} />
                            </div>
                            <label htmlFor="activate">Kích hoạt/Ngưng sử dụng</label>
                        </div>
                    }

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
                        <Button appearance='primary_300'
                            className="p-consingment__save"
                            disabled={disable}
                            onClick={handleUpdate}>
                            Lưu
                        </Button>

                    </div>
                </div>

            )
        })

    }
    return (
        <>
            {showInfo()}
        </>
    )
}
