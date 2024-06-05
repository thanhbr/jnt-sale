import React, {useEffect, useRef, useState} from 'react'
import cls from 'clsx'
import css from '../CreateCustomer/style.module.scss'
import {CREATE_CUSTOMER_BREADCRUMB} from '../_constants'
import {SCRIPT} from '../CreateCustomer/_script'
import {CustomToolTip} from '../../../Component/tooltip/CustomTooltip'
import {
  REGEX_CUSTOMER_CODE,
  REGEX_EMAIL,
  REGEX_WHITESPACE_AT_START_AND_END,
} from '../../../util/regex'
import {ICONS} from '../_icons'
import {Autocomplete, TextField} from '@mui/material'
import {ADDRESS_ICONS} from '../../addressSeparationTool/_icons'
import {StyledOption} from '../CreateCustomer/_styleOption'
import {Button} from '../../../common/button'
import {PATH} from '../../../const/path'
import CreateGroupCustomer from '../components/modals/createGroupCustomer'
import {useNavigate} from 'react-router-dom'
import useEditCustomer from '../EditCustomer/_useEditCustomer'
import {useForm} from 'react-hook-form'
import locationJsonData from '../../addressSeparationTool/_data.json'
import {sendRequestAuth} from '../../../api/api'
import config from '../../../config'
import toast from '../../../Component/Toast'
import {GridLayout} from "../../../layouts/gridLayout";
import {PageHeader} from "../../../layouts/pageHeader";
import {AlternativeAutoComplete} from "../../../common/form/autoComplete/_alternativeAutoComplete";
import {AutoCompleteSingleOption} from "../../purchases/components/autocompleteSingleOption";
import {Text} from "../../../common/text";


const Index = ({data}) => {
  const {
    phone,
    address,
    gender,
    city,
    district,
    districtData,
    ward,
    wardData,
    customerGroup,
    group,
    priceType,
    separate,
    errorSeparate,
    infoUser,
    onPhoneInputChange,
    onAddressInputChange,
    onGenderInputChange,
    handleSeparateAddress,
    handlePriceList,
    handleCityChange,
    handleDistrictChange,
    handleWardChange,
    handleSearchGroup,
    handleInputCityChange,
    handleInputDistrictChange,
    handleInputWardChange,

    handleSelectCustomerGroup,
    handleFetchOrigin
  } = useEditCustomer({data})
  const [showModal, setShowModal] = useState(false)
  const [policyState, setPolicyState] = useState(false)
  const policyRef = useRef(null)
  const addressRef = useRef(null)
  const [, setIsChange] = useState(false)
  useOutsideAlerter1(policyRef)
  const closeModal = () => setShowModal(false)
  const navigate = useNavigate()
  const scrollGeneral = useRef(null)
  const scrollMinisterial = useRef(null)
  const [activeScroll, setActiveScroll] = useState('scrollGeneral')
  const [activeCheck, setActiveCheck] = useState(infoUser?.status === '1')
  const inputDistrictRef = useRef(null)
  const inputWardRef = useRef(null)

  const [cities, setCities] = useState('')
  const [inputDistrict, setInputDistrict] = useState('')
  const [inputWard, setInputWard] = useState('')
  const citiesOrigin = locationJsonData.map(item => item?.name)
  const policyGroup = [
    {
      id: '1',
      name: 'Giá bán sỉ'
    },
    {
      id: '2',
      name: 'Giá bán lẻ'
    },
  ]
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCities(cities.trim())
      setInputDistrict(inputDistrict.trim())
      setInputWard(inputWard.trim())
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [cities, inputDistrict, inputWard])

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: {errors},
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      address: address,
    },
  })
  const [debounceSubmit, setDebounceSubmit] = useState(false)
  const onSubmit = async () => {
    const outCity = !!!city
      ? !!!infoUser?.city_name
        ? city
        : infoUser?.city_name
      : city
    const outDistrict = !!!district
      ? !!!infoUser?.district_name
        ? district
        : infoUser?.district_name
      : district
    const outWard = !!!ward
      ? !!!infoUser?.ward_name
        ? ward
        : infoUser?.ward_name
      : ward
    if (!!!ward)
      setError(
        'ward_id',
        {type: 'invalid', message: SCRIPT.VALIDATE.INVALID_WARD},
        {shouldFocus: true},
      )
    if (!!!district)
      setError(
        'district_id',
        {type: 'invalid', message: SCRIPT.VALIDATE.INVALID_DISTRICT},
        {shouldFocus: true},
      )
    if (!!!city)
      setError(
        'city_id',
        {type: 'invalid', message: SCRIPT.VALIDATE.INVALID_CITY},
        {shouldFocus: true},
      )
    if (address === '' && infoUser?.customer_short_address === '')
      setError(
        'address',
        {type: 'invalid', message: SCRIPT.VALIDATE.EMPTY_ADDRESS},
        {shouldFocus: true},
      )
    if (
      addressRef?.current?.value === '' ||
      city === '' ||
      district === '' ||
      ward === ''
    )
      return

    const findingCity = locationJsonData.find(item => item?.name === outCity)
    const findingDistrict = findingCity?.list
      ? findingCity.list.find(item => item?.name === outDistrict)
      : []
    const findingWard = findingDistrict?.list
      ? findingDistrict.list.find(item => item?.name === outWard)
      : []

    const addressArr = [
      findingCity?.name,
      findingDistrict?.name,
      findingDistrict?.name,
    ].filter(item => !!item)
    // const checkAddress = addressArr.join(', ')

    if(debounceSubmit) return
    setDebounceSubmit(true)
    setTimeout(() => setDebounceSubmit(false), 2000)

    const cus_group = !!!group ? infoUser?.group_name : group
    const findingGroup = customerGroup.find(
      // item => item?.name === !!!group ? (!!!infoUser?.group_name ? group : infoUser?.group_name) : group,
      item => item?.name === cus_group,
    )
    const response = await sendRequestAuth(
      'post',
      `${config.API}/customer/update/${infoUser?.id}`,
      {
        code: getValues('code').trim() || '',
        name: getValues('name').trim() || infoUser?.customer_name,
        mobile: getValues('mobile') || infoUser?.customer_mobile,
        email: getValues('email') || '',
        gender: gender || infoUser?.customer_sex,
        address: getValues('address').trim(),
        city_id: findingCity?.id || infoUser?.city_id,
        district_id: findingDistrict?.id || infoUser?.district_id,
        ward_id: findingWard?.id || infoUser?.ward_id,
        group: group?.id || infoUser?.customer_group,
        price_list: priceType[0]?.id || infoUser?.price_list_id,
        status: getValues('status') ? 1 : -1,
        note: getValues('note')?.trim() || '',
      },
    )
    if (response.data && response.data.success) {
      toast.success({title: SCRIPT.UPDATE_SUCCESS})
      navigate(PATH.CUSTOMER)
      setIsChange(false)
    } else {
      response?.data?.errors?.map(item => {
        setError(item?.field, { type: 'invalid', message: item?.message })
      })
      toast.error({title: SCRIPT.UPDATE_FAIL})
    }
  }
  function useOutsideAlerter1(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPolicyState(false)
        } else {
          setPolicyState(true)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }


  // REMOVE TITLE AUTOCOMPLETE
  useEffect(() => {
    handleFetchOrigin()

    const buttonTitle = document.getElementsByClassName('MuiAutocomplete-popupIndicator')
    for (let i= 0; i < buttonTitle.length; i++) {
      buttonTitle[i].removeAttribute('title')
    }
    window.addEventListener('click', function () {
      for (let i= 0; i < buttonTitle.length; i++) {
        buttonTitle[i].removeAttribute('title')
      }

      const lists = document.getElementsByClassName("MuiAutocomplete-listbox")
      for(let i = 0; i < lists.length; i++) {
        lists[i].className += " scroll-custom";
      }
    })

    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  // ========== END REMOVE TITLE AUTOCOMPLETE ================

  useEffect(() => {
    setActiveCheck(infoUser?.status === '1')
    setValue('code', infoUser?.customer_code || '')
    setValue('name', infoUser?.customer_name || '')
    setValue('mobile', phone ?? infoUser?.customer_mobile)
    setValue('email', infoUser?.customer_email || '')
    setValue('address', infoUser?.customer_short_address || '')
    setValue('status', infoUser?.status === '1')
  }, [infoUser])
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={e => {
          if (e.keyCode === 13) e.preventDefault()
        }}
      >
        <GridLayout
          header={
            <PageHeader
              breadcrumbLinks={CREATE_CUSTOMER_BREADCRUMB}
              breadcrumbTitle={"Thông tin khách hàng"}
            />
          }
          grid={[
            {
              width: 70,
              sections: [
                {
                  title: (<>
                    <span>Thông tin chung</span>
                  </>),
                  props: {
                    style: {position: 'relative', minHeight: '31.4375rem'},
                    children: (
                      <>
                        <div className={cls(css.general)} ref={scrollGeneral}>
                          <div className={cls(css.lb_group_id)}>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                              <label htmlFor={'cr_cus_id'}>{SCRIPT.CUS_ID}</label>
                              <CustomToolTip title={SCRIPT.TT_CODE} placement="top-start">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={cls(css.lb_group_tooltip)}
                                >
                                  <path
                                    d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                                    stroke="#808089"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  ' +
                                  <path
                                    d="M8 12.667C8.48325 12.667 8.875 12.2752 8.875 11.792C8.875 11.3087 8.48325 10.917 8 10.917C7.51675 10.917 7.125 11.3087 7.125 11.792C7.125 12.2752 7.51675 12.667 8 12.667Z"
                                    fill="#808089"
                                  />
                                  <path
                                    d="M7.99967 9.16667V8.58333C8.40348 8.58333 8.79821 8.46359 9.13396 8.23925C9.46971 8.01491 9.7314 7.69605 9.88593 7.32298C10.0405 6.94991 10.0809 6.5394 10.0021 6.14336C9.92333 5.74731 9.72888 5.38352 9.44335 5.09799C9.15782 4.81246 8.79403 4.61801 8.39798 4.53923C8.00194 4.46045 7.59143 4.50088 7.21836 4.65541C6.8453 4.80994 6.52643 5.07163 6.30209 5.40738C6.07775 5.74313 5.95801 6.13786 5.95801 6.54167"
                                    stroke="#808089"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </CustomToolTip>
                            </div>
                            <div className={cls(css.lb_group)}>
                              <input
                                id={'cr_cus_id'}
                                placeholder={SCRIPT.PL_CUS_ID}
                                maxLength={100}
                                autoComplete={'off'}
                                className={`${
                                  errors.code
                                    ? cls(css.input_error)
                                    : cls(css.input_success)
                                } ${cls(css.input_large)}`}
                                {...register('code', {
                                  pattern: {
                                    value: REGEX_CUSTOMER_CODE,
                                    message: SCRIPT.VALIDATE.INVALID_CODE,
                                  },
                                  onChange: () => setIsChange(true),
                                })}
                              />
                              {errors.code && (
                                <>
                                  {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                                  <span className={cls(css.errors)}>
                        {errors.code.message}
                      </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_name)}>
                            <label htmlFor={'cr_cus_name'}>
                              {SCRIPT.CUS_NAME} <span>*</span>
                            </label>
                            <div className={cls(css.lb_group)}>
                              <input
                                id={'cr_cus_name'}
                                placeholder={SCRIPT.PL_CUS_NAME}
                                maxLength={200}
                                autoComplete={'off'}
                                className={`${
                                  errors.name
                                    ? cls(css.input_error)
                                    : cls(css.input_success)
                                }`}
                                {...register('name', {
                                  validate: {
                                    empty: v =>
                                      !!!infoUser?.customer_name || !!!v
                                        ? SCRIPT.VALIDATE.EMPTY_NAME
                                        : clearErrors('name'),
                                  },
                                  // pattern: {
                                  //   value: WHITESPACE_AT_BEGINNING_AND_END,
                                  //   message: SCRIPT.VALIDATE.INVALID_WHITESPACE_AT_BEGINNING_AND_END,
                                  // },
                                  onChange: e => {
                                    if (e.target.value.length === 1)
                                      e.target.value = e.target.value.replaceAll(
                                        REGEX_WHITESPACE_AT_START_AND_END,
                                        '',
                                      )
                                  },
                                })}
                              />
                              {errors.name && (
                                <>
                                  {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                                  <span className={cls(css.errors)}>
                        {errors.name.message}
                      </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_phone)}>
                            <label htmlFor={'cr_cus_phone'}>
                              {SCRIPT.CUS_PHONE} <span>*</span>
                            </label>
                            <div className={cls(css.lb_group)}>
                              <input
                                id={'cr_cus_phone'}
                                placeholder={SCRIPT.PL_CUS_PHONE}
                                autoComplete={'off'}
                                type={'text'}
                                maxLength={11}
                                value={phone}
                                className={`${
                                  errors.mobile
                                    ? cls(css.input_error)
                                    : cls(css.input_success)
                                }`}
                                {...register('mobile', {
                                  // required: SCRIPT.VALIDATE.EMPTY_PHONE,
                                  validate: {
                                    empty: v =>
                                      !!!infoUser?.customer_mobile || !!!v
                                        ? SCRIPT.VALIDATE.EMPTY_PHONE
                                        : clearErrors('mobile'),
                                  },
                                  minLength: {
                                    value: 10,
                                    message: SCRIPT.VALIDATE.MIN_PHONE,
                                  },
                                  // pattern: {
                                  //   value: REGEX_VN_PHONE,
                                  //   message: SCRIPT.VALIDATE.INVALID_PHONE,
                                  // },
                                  onChange: e => {
                                    setIsChange(true)
                                    onPhoneInputChange(e.target.value)
                                  },
                                })}
                              />
                              {errors.mobile && (
                                <>
                                  {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                                  <span className={cls(css.errors)}>
                        {errors.mobile.message}
                      </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_email)}>
                            <label htmlFor={'cr_cus_email'}>{SCRIPT.CUS_EMAIL}</label>
                            <div className={cls(css.lb_group)}>
                              <input
                                id={'cr_cus_email'}
                                placeholder={SCRIPT.PL_CUS_EMAIL}
                                maxLength={100}
                                autoComplete={'off'}
                                defaultValue={infoUser?.customer_email}
                                className={`${
                                  errors.email
                                    ? cls(css.input_error)
                                    : cls(css.input_success)
                                }`}
                                {...register('email', {
                                  // required: SCRIPT.VALIDATE.EMPTY_EMAIL,
                                  pattern: {
                                    value: REGEX_EMAIL,
                                    message: SCRIPT.VALIDATE.INVALID_EMAIL,
                                  },
                                  onChange: e => {
                                    e.target.value = e.target.value.trim()
                                    setIsChange(true)
                                  },
                                })}
                              />
                              {errors.email && (
                                <>
                                  {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                                  <span className={cls(css.errors)}>
                        {errors.email.message}
                      </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_gender)}>
                            <div className={cls(css.gender)}>
                              <input
                                id={'cr_cus_gender_male'}
                                type={'radio'}
                                checked={
                                  !!!gender
                                    ? infoUser?.customer_sex === '1'
                                    : gender === '1'
                                }
                                value={'1'}
                                {...register('gender')}
                                onChange={() => onGenderInputChange('1')}
                              />
                              <label htmlFor={'cr_cus_gender_male'}>{SCRIPT.MALE}</label>
                            </div>
                            <div className={cls(css.gender)}>
                              <input
                                id={'cr_cus_gender_female'}
                                type={'radio'}
                                checked={
                                  !!!gender
                                    ? infoUser?.customer_sex === '2'
                                    : gender === '2'
                                }
                                value={'2'}
                                {...register('gender')}
                                onChange={() => onGenderInputChange('2')}
                              />
                              <label htmlFor={'cr_cus_gender_female'}>
                                {SCRIPT.FEMALE}
                              </label>
                            </div>
                          </div>
                          <div className={cls(css.lb_group_address)}>
                            <label htmlFor={'cr_cus_address'}>
                              {SCRIPT.CUS_ADDRESS} <span>*</span>
                            </label>
                            <div className={cls(css.lb_group)}>
                              <input
                                id={'cr_cus_address'}
                                placeholder={SCRIPT.PL_CUS_ADDRESS}
                                ref={addressRef}
                                autoComplete={'off'}
                                {...register('address', {
                                  validate: {
                                    empty: v =>
                                      (!!!infoUser.customer_short_address && !!!address) || !!!v
                                        ? SCRIPT.VALIDATE.EMPTY_ADDRESS
                                        : clearErrors('address'),
                                  },
                                  onChange: e => onAddressInputChange(e.target.value),
                                })}
                                className={`${
                                  errors.address || errorSeparate
                                    ? cls(css.input_error)
                                    : cls(css.input_success)
                                } ${cls(css.input_large)}`}
                              />
                              {errorSeparate && (
                                <span className={cls(css.errors)}>
                      {SCRIPT.VALIDATE.INVALID_SEPARATE}
                    </span>
                              )}
                            </div>
                            <div
                              className={`${cls(css.separation)} ${
                                separate ? cls(css.lb_has_address) : ''
                              }`}
                              onClick={() => {
                                if (separate) {
                                  handleSeparateAddress(document.getElementById('cr_cus_address').value)
                                  clearErrors('address')
                                }
                              }}
                            >
                              {ICONS.locate}
                              <p>{SCRIPT.ADDRESS_SEPARATION}</p>
                            </div>
                          </div>
                          <div className={cls(css.lb_group_city)}>
                            <label>
                              {SCRIPT.SE_CUS_CITY} <span>*</span>
                            </label>
                            <div className={cls(css.lb_group)}>
                              <Autocomplete
                                className={cls(css.lb_city)}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={citiesOrigin}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                // value={
                                //   !!!city
                                //     ? !!!infoUser?.city_name
                                //     ? city ?? ''
                                //     : infoUser?.city_name
                                //     : city ?? ''
                                // }
                                value={city}
                                {...register('city_id')}
                                componentsProps={{paper: {sx: {minWidth: 200}}}}
                                getOptionLabel={option => option}
                                onChange={(e, val) => {
                                  handleCityChange(val)
                                  clearErrors('city_id')
                                }}
                                inputValue={cities}
                                onInputChange={(e, value) => {
                                  setCities(value.replace('  ',''))
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    inputProps={{...params.inputProps}}
                                    placeholder={SCRIPT.SE_CUS_CITY}
                                    autoComplete={'off'}
                                    className={`${cls(css.text_field_city)} ${
                                      errors.city_id && cls(css.div_error)
                                    }`}
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') {
                                        inputDistrictRef.current.focus()
                                        !!city && clearErrors('city_id')
                                      }
                                      handleInputCityChange(e)
                                    }}
                                  />
                                )}
                                renderOption={(props, option) => (
                                  <StyledOption {...props}>{option}</StyledOption>
                                )}
                              />
                              {(errors.address ||
                                errors.city_id ||
                                errors.district_id ||
                                errors.ward_id) && (
                                <span className={cls(css.errors)}>
                      {SCRIPT.VALIDATE.EMPTY_ADDRESS}
                    </span>
                              )}
                              {/*{errors.city_id && <span className={cls(css.errors)}>{errors.city_id.message}</span>}*/}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_district)}>
                            <label htmlFor={'cr_cus_district'}>
                              {SCRIPT.SE_CUS_DISTRICT} <span>*</span>
                            </label>
                            <div
                              className={`${cls(css.lb_group)} ${cls(css.lb_grp_district)}`}
                            >
                              {infoUser?.city_name !== undefined
                                ? () => handleDistrictChange(infoUser?.city_name)
                                : ''}
                              <Autocomplete
                                className={cls(css.lb_district)}
                                disabled={!!!city}
                                // disabled={!!!city && !!!infoUser?.city_name}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={districtData}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                // value={!!!district ? (!!!infoUser?.district_name ? city : infoUser?.district_name) : district}
                                value={district ?? ''}
                                {...register('district_id')}
                                componentsProps={{paper: {sx: {minWidth: 200}}}}
                                getOptionLabel={option => option}
                                inputValue={inputDistrict}
                                onInputChange={(e, value) => {
                                  setInputDistrict(value.replace('  ',''))
                                }}
                                onChange={(e, val) => {
                                  handleDistrictChange(val)
                                  clearErrors('district_id')
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    inputProps={{...params.inputProps}}
                                    inputRef={inputDistrictRef}
                                    placeholder={SCRIPT.SE_CUS_DISTRICT}
                                    className={errors.district_id && cls(css.div_error)}
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') {
                                        inputWardRef.current.focus()
                                        !!district && clearErrors('district_id')
                                      }
                                      handleInputDistrictChange(e)
                                    }}
                                  />
                                )}
                                data-disabled={!!!city}
                                // data-disabled={!!!city && !!!infoUser?.city_name}
                                renderOption={(props, option) => (
                                  <StyledOption {...props}>{option}</StyledOption>
                                )}
                              />
                              {/*{errors.district_id && <span className={cls(css.errors)}>{errors.district_id.message}</span>}*/}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_ward)}>
                            <label htmlFor={'cr_cus_ward'}>
                              {SCRIPT.SE_CUS_WARD} <span>*</span>
                            </label>
                            <div
                              className={`${cls(css.lb_group)}  ${cls(css.lb_grp_ward)}`}
                            >
                              <Autocomplete
                                className={cls(css.lb_ward)}
                                disabled={!!!district}
                                // disabled={!!!district && !!!infoUser?.district_name}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={wardData}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                // value={!!!ward ? (!!!infoUser?.ward_name ? city : infoUser?.ward_name) : ward}
                                value={ward ?? ''}
                                {...register('ward_id')}
                                componentsProps={{paper: {sx: {minWidth: 200}}}}
                                getOptionLabel={option => option}
                                inputValue={inputWard}
                                onInputChange={(e, value) => {
                                  setInputWard(value.replace('  ',''))
                                }}
                                onChange={(e, val) => {
                                  handleWardChange(val)
                                  clearErrors('ward_id')
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    inputProps={{...params.inputProps}}
                                    inputRef={inputWardRef}
                                    placeholder={SCRIPT.SE_CUS_WARD}
                                    className={errors.ward_id && cls(css.div_error)}
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') {
                                        !!ward && clearErrors('ward_id')
                                      }
                                      handleInputWardChange(e)
                                    }}
                                  />
                                )}
                                data-disabled={!!!district}
                                // data-disabled={!!!district && !!!infoUser?.district_name}
                                renderOption={(props, option) => (
                                  <StyledOption {...props}>{option}</StyledOption>
                                )}
                              />
                              {/*{errors.ward_id && <span className={cls(css.errors)}>{errors.ward_id.message}</span>}*/}
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                  },
                },
                {
                  title: (<>
                    <span>Thông tin bổ trợ</span>
                  </>),
                  props: {
                    style: {position: 'relative', minHeight: '18.0625rem'},
                    children: (
                      <>
                        <div className={cls(css.ministerial)} ref={scrollMinisterial}>
                          <div className={cls(css.lb_group_customer)}>
                            <div className={cls(css.lb_customers)}>
                              <div
                                className={cls(css.lb_create_customer)}
                                onClick={() => setShowModal(true)}
                              >
                                {ICONS.plus_circle}
                                <span>{SCRIPT.CREATE_GROUP_EMPLOYEE}</span>
                              </div>
                            </div>
                            <div className={cls(css.group_cus)}>
                              <div className={cls(css.lb_group)}>
                                <AlternativeAutoComplete
                                  // main input
                                  inputProps={{
                                    categoryList: [], // menu list in category dropdown
                                    categoryValue: {name: 'Nhóm khách hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
                                    categoryWidth: 140,
                                    categoryHidden: true,
                                    label: (
                                      <>
                                        <label>{SCRIPT.GROUP_EMPLOYEE}</label>
                                      </>
                                    ),
                                    placeholder: 'Chọn nhóm khách hàng',
                                    readOnly: true,
                                    value: !!group?.name ? group?.name : customerGroup.find(item => item?.id === infoUser?.customer_group)?.name|| '',
                                    // validateText: props.validate?.province,
                                    validateType: "danger"
                                  }}
                                  // search menu dropdown
                                  menuProps={{
                                    empty:
                                      customerGroup?.length <= 0 ? 'Không tìm thấy nhóm khách hàng' : '',
                                  }}
                                  // search input in dropdown menu
                                  searchInputProps={{
                                    placeholder: 'Tìm kiếm nhóm khách hàng',
                                    // value: province.keyword || '',
                                    onChange: data => handleSearchGroup(data),
                                  }}
                                >
                                  {customerGroup?.length > 0 &&
                                  customerGroup?.map(item => (
                                    <AutoCompleteSingleOption
                                      key={item?.id}
                                      data-active={+item?.id === +group?.id}
                                      onClick={() => handleSelectCustomerGroup(item)}
                                    >
                                      {item.name}
                                    </AutoCompleteSingleOption>
                                  ))}
                                </AlternativeAutoComplete>
                              </div>
                            </div>
                          </div>
                          <div className={cls(css.policy)}>
                            <label htmlFor={'cr_cus_ward'}>{SCRIPT.PRICE_POLICY}</label>
                            <div className={cls(css.group_cus)} ref={policyRef}>
                              <Autocomplete
                                className={cls(css.lb_grp_policy)}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={policyGroup.map(item => item?.name)}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                value={priceType.length > 0
                                  ? priceType[0].name
                                  : infoUser?.price_list_id === '0' ||
                                  !!!infoUser?.price_list_id
                                    ? SCRIPT.SE_PRICE_POLICY
                                    : infoUser?.price_list_id === '1'
                                      ? SCRIPT.RETAIL_PRICE
                                      : SCRIPT.WHOLESALE_PRICE}
                                componentsProps={{paper: {sx: {minWidth: 200}}}}
                                getOptionLabel={option => option}
                                filterSelectedOptions={false}
                                // onFocus={() => handleSearchGroup()}
                                onChange={(e, val) => {
                                  handlePriceList(val === 'Giá bán sỉ' ? '2' : '1', val)
                                  setPolicyState(false)
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    inputProps={{...params.inputProps}}
                                    placeholder={SCRIPT.SE_PRICE_POLICY}
                                  />
                                )}
                                renderOption={(props, option) => (
                                  <StyledOption {...props}>{option}</StyledOption>
                                )}
                              />
                            </div>
                          </div>
                          <div className={cls(css.lb_group_note)}>
                            <label htmlFor={'cr_cus_note'}>Ghi chú khách hàng</label>
                            <div className={cls(css.lb_group_note_wrapper)}>
                              <input id={'cr_cus_note'}
                                     placeholder={'Nhập ghi chú khách hàng'}
                                     maxLength={256}
                                     autoComplete={'off'}
                                     defaultValue={infoUser?.customer_notes || ''}
                                     className={`${errors.note ? cls(css.input_error) : cls(css.input_success)}`}
                                     {...register("note",{
                                       maxLength: {
                                         value: 255,
                                         message: 'Nội dung không vượt quá 255 ký tự!"',
                                       },
                                       onChange: () =>  {
                                         setIsChange(true)
                                       },
                                     })}
                              />
                            </div>
                            {errors.note && <Text fontSize={13} color={'red'}>Nội dung không vượt quá 255 ký tự!</Text>}
                          </div>
                          <div className={cls(css.grp_acin)}>
                            <input
                              type={'checkbox'}
                              // defaultChecked={activeCheck}
                              checked={activeCheck}
                              className={cls(css.active_toggle)}
                              {...register('status', {
                                onChange: () => setActiveCheck(!activeCheck),
                              })}
                            />
                            <div>
                  <span className={cls(css.acin)}>
                    {SCRIPT.ACTIVE_INACTIVE}
                  </span>
                            </div>
                          </div>
                        </div>
                        {showModal ? <CreateGroupCustomer show={showModal} closeModal={closeModal}/> : ''}
                      </>
                    ),
                  },
                },
                {
                  type: 'sticky-bottom-transparent',
                  props: {
                    style: {
                      position: 'sticky',
                      bottom: -44,
                      padding: '12px 24px 12px 12px',
                      marginTop: -20,
                      zIndex: 5,
                    },
                    children: (
                      <>
                        <div className={cls(css.group_button)} id={"scroll_group_button"}>
                          <Button type={'button'}
                                  appearance={'secondary'}
                                  className={cls(css.cancel)}
                                  onClick={() => navigate(PATH.CUSTOMER)}
                          >
                            {SCRIPT.T_CANCEL}
                          </Button>
                          <Button type={'submit'}
                                  className={cls(css.save)}>
                            {SCRIPT.T_SAVE}
                          </Button>
                        </div>
                      </>
                    ),
                  },
                },
              ],
              props: {style: {position: 'relative'}},
            },
            {
              width: 30,
              sections: [{
                title: '',
                props: {
                  style: {height: '8.75rem', paddingTop: '1.125rem'},
                  children: (
                    <><div className={cls(css.scroll)}>
                      <p
                        onClick={() => {
                          setActiveScroll('scrollGeneral')
                          scrollGeneral.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'start',
                          })
                        }}
                        className={
                          activeScroll === 'scrollGeneral' ? cls(css.activeScroll) : ''
                        }
                      >
                        Thông tin chung
                      </p>
                      <p
                        onClick={() => {
                          setActiveScroll('scrollMinisterial')
                          scrollMinisterial.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'start',
                          })
                        }}
                        className={
                          activeScroll === 'scrollMinisterial' ? cls(css.activeScroll) : ''
                        }
                      >
                        {SCRIPT.CUS_MINISTERIAL}
                      </p>
                    </div>
                    </>
                  ),
                },
              },],

              props: {
                style: {
                  position: 'sticky',
                  top: 39,
                },
              }
            },
          ]}
          data-model="container"
        />
      </form>
    </>
  )
}

export default Index
