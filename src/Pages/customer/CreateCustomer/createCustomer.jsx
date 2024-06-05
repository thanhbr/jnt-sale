import React, {useState, useEffect, useRef} from 'react';
import {useForm} from "react-hook-form"
import {Autocomplete, TextField} from "@mui/material";

import {CREATE_CUSTOMER_BREADCRUMB} from "../_constants";
import cls from "clsx";
import {SCRIPT} from "./_script";
import {ICONS} from "../_icons";
import {Button} from "../../../common/button";
import css from "./style.module.scss";
import locationJsonData from "../../addressSeparationTool/_data.json";
import {ADDRESS_ICONS} from "../../addressSeparationTool/_icons";
import {StyledOption} from "./_styleOption";
import useCreateCustomer from "./_useCreateCustomer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {PATH} from "../../../const/path";
import { useNavigate  } from 'react-router-dom';
import {REGEX_CUSTOMER_CODE, REGEX_WHITESPACE_AT_START_AND_END, REGEX_EMAIL} from "../../../util/regex"
import {CustomToolTip} from "../../../Component/tooltip/CustomTooltip";
import {GridLayout} from "../../../layouts/gridLayout";
import {PageHeader} from "../../../layouts/pageHeader";
import {AutoCompleteSingleOption} from "../../orderSingle/components/autocompleteSingleOption";
import {AlternativeAutoComplete} from "../../../common/form/autoComplete/_alternativeAutoComplete";
import CreateGroup from "../components/modals/createGroup";
import {Text} from "../../../common/text";


const cities = locationJsonData.map(item => item?.name)

const CreateCustomer = ({data}) => {
  const [showModal, setShowModal] = useState(false)
  const [policyState, setPolicyState] = useState(false)
  const policyRef = useRef(null);
  const addressRef = useRef(null);
  const [isChange, setIsChange] = useState(false)
  useOutsideAlerter1(policyRef);
  const closeModal =  () => setShowModal(false);
  const navigate = useNavigate();
  const scrollGeneral = useRef(null)
  const scrollMinisterial = useRef(null)
  const [activeScroll, setActiveScroll] = useState('scrollGeneral')
  const inputDistrictRef = useRef(null)
  const inputWardRef = useRef(null)
  const [addressVali, setAddressVali] = useState('')

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
    valuePolicy,
    priceType,
    separate,
    errorSeparate,
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

    handleFetchOrigin,
    handleSelectCustomerGroup
  } = useCreateCustomer({data})

  const { register, handleSubmit, setError, getValues, clearErrors, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      address: address
    },
  });

  const [debounceSubmit, setDebounceSubmit] = useState(false)
  const onSubmit = async () => {
    if(!isChange || debounceSubmit) return
    setDebounceSubmit(true)
    setTimeout(() => setDebounceSubmit(false), 2000)

    const findingCity = locationJsonData.find(
      item => item?.name === city,
    )
    const findingDistrict = findingCity?.list
      ? findingCity.list.find(item => item?.name === district)
      : []
    const findingWard = findingDistrict?.list
      ? findingDistrict.list.find(item => item?.name === ward)
      : []

    const addressArr = [
      findingCity?.name,
      findingDistrict?.name,
      findingDistrict?.name,
    ].filter(item => !!item)
    const checkAddress = addressArr.join(', ')

    const response = await sendRequestAuth(
      'post',
      `${config.API}/customer/create`,
      {
        code: getValues("code") || '',
        name: getValues("name").trim() || '',
        mobile: getValues("mobile") || '',
        email: getValues("email") || '',
        gender: gender || '',
        address: address || checkAddress,
        city_id: findingCity?.id || '',
        district_id: findingDistrict?.id || '',
        ward_id: findingWard?.id || '',
        group: group?.id || '',
        price_list: priceType[0]?.id || '',
        status: getValues("status") ? 1 : -1,
        note: getValues('note')?.trim() || '',
      },
    )
    if (response.data && response.data.success) {
      toast.success({ title: 'Thêm mới thành công.' })
      navigate(PATH.CUSTOMER)
      setIsChange(false)
    } else {
      response?.data?.errors?.map(item => {
        setError(item?.field, { type: 'invalid', message: item?.message })
      })
      toast.error({ title: 'Thêm mới thất bại!' })
    }
  }
  function useOutsideAlerter1(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPolicyState(false)
        } else { setPolicyState(true)}
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {
        if(e.keyCode === 13) e.preventDefault()
      }}>
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
                    style: {position: 'relative', minHeight: '503px'},
                    children: (
                      <>
                        <div className={cls(css.general)} ref={scrollGeneral}>
                          <div className={cls(css.lb_group_id)}>
                            <div style={{display: 'flex', position: 'relative'}}>
                              <label htmlFor={'cr_cus_id'}>{SCRIPT.CUS_ID}</label>
                              <CustomToolTip title={SCRIPT.TT_CODE} placement="top-start">
                                <div style={{position: 'absolute', top: '-6px', left: '90px'}}>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls(css.lb_group_tooltip)}>
                                    <path
                                      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                                      stroke="#808089" strokeLinecap="round" strokeLinejoin="round"/>
                                    ' +
                                    <path
                                      d="M8 12.667C8.48325 12.667 8.875 12.2752 8.875 11.792C8.875 11.3087 8.48325 10.917 8 10.917C7.51675 10.917 7.125 11.3087 7.125 11.792C7.125 12.2752 7.51675 12.667 8 12.667Z"
                                      fill="#808089"/>
                                    <path
                                      d="M7.99967 9.16667V8.58333C8.40348 8.58333 8.79821 8.46359 9.13396 8.23925C9.46971 8.01491 9.7314 7.69605 9.88593 7.32298C10.0405 6.94991 10.0809 6.5394 10.0021 6.14336C9.92333 5.74731 9.72888 5.38352 9.44335 5.09799C9.15782 4.81246 8.79403 4.61801 8.39798 4.53923C8.00194 4.46045 7.59143 4.50088 7.21836 4.65541C6.8453 4.80994 6.52643 5.07163 6.30209 5.40738C6.07775 5.74313 5.95801 6.13786 5.95801 6.54167"
                                      stroke="#808089" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </CustomToolTip>
                            </div>
                            <div className={cls(css.lb_group)}>
                              <input id={'cr_cus_id'}
                                     placeholder={SCRIPT.PL_CUS_ID}
                                     maxLength={100}
                                     autoComplete={'off'}
                                     className={`${errors.code ? cls(css.input_error) : cls(css.input_success)} ${cls(css.input_large)}`}
                                     {...register("code", {
                                       pattern: {
                                         value: REGEX_CUSTOMER_CODE,
                                         message: SCRIPT.VALIDATE.INVALID_CODE,
                                       },
                                       onChange: () => setIsChange(true)
                                     })}
                              />
                              {errors.code && (
                                <>
                                  {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                                  <span className={cls(css.errors)}>{errors.code.message}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_name)}>
                            <label htmlFor={'cr_cus_name'}>{SCRIPT.CUS_NAME} <span>*</span></label>
                            <div className={cls(css.lb_group)}>
                              <input id={'cr_cus_name'}
                                     placeholder={SCRIPT.PL_CUS_NAME}
                                     maxLength={256}
                                     autoComplete={'off'}
                                     className={`${errors.name ? cls(css.input_error) : cls(css.input_success)}`}
                                     {...register("name", {
                                       required: SCRIPT.VALIDATE.EMPTY_NAME,
                                       // pattern: {
                                       //   value: WHITESPACE_AT_BEGINNING_AND_END,
                                       //   message: SCRIPT.VALIDATE.INVALID_WHITESPACE_AT_BEGINNING_AND_END,
                                       // },
                                       maxLength: 255,
                                       onChange: (e) => {
                                         if(e.target.value.length === 1)  e.target.value = e.target.value.replaceAll(REGEX_WHITESPACE_AT_START_AND_END, '')
                                       }
                                     })}
                              />
                              {errors.name && (
                                <>
                                  <span className={cls(css.errors)}>{errors.name.type === 'maxLength' ? 'Tên khách hàng không vượt quá 255 ký tự': errors.name.message}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_phone)}>
                            <label htmlFor={'cr_cus_phone'}>{SCRIPT.CUS_PHONE} <span>*</span></label>
                            <div className={cls(css.lb_group)}>
                              <input id={'cr_cus_phone'}
                                     placeholder={SCRIPT.PL_CUS_PHONE}
                                     autoComplete={'off'}
                                     type={'text'}
                                     maxLength={11}
                                     value={phone}
                                     className={`${errors.mobile ? cls(css.input_error) : cls(css.input_success)}`}
                                     {...register("mobile", {
                                       required: SCRIPT.VALIDATE.EMPTY_PHONE,
                                       minLength: {
                                         value: 10,
                                         message: SCRIPT.VALIDATE.MIN_PHONE
                                       },
                                       // pattern: {
                                       //   value: REGEX_VN_PHONE,
                                       //   message: SCRIPT.VALIDATE.INVALID_PHONE,
                                       // },
                                       onChange: (e) => {
                                         setIsChange(true)
                                         onPhoneInputChange(e.target.value)
                                       }
                                     })}
                              />
                              {errors.mobile && (
                                <>
                                  {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                                  <span className={cls(css.errors)}>{errors.mobile.message}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_email)}>
                            <label htmlFor={'cr_cus_email'}>{SCRIPT.CUS_EMAIL}</label>
                            <div className={cls(css.lb_group)}>
                              <input id={'cr_cus_email'}
                                     placeholder={SCRIPT.PL_CUS_EMAIL}
                                     maxLength={100}
                                     autoComplete={'off'}
                                     className={`${errors.email ? cls(css.input_error) : cls(css.input_success)}`}
                                     {...register("email",{
                                       // required: SCRIPT.VALIDATE.EMPTY_EMAIL,
                                       pattern: {
                                         value: REGEX_EMAIL,
                                         message: SCRIPT.VALIDATE.INVALID_EMAIL,
                                       },
                                       onChange: (e) =>  {
                                         e.target.value = e.target.value.trim()
                                         setIsChange(true)
                                       },
                                     })}
                              />
                              {errors.email && (
                                <>
                                  {/*<span className={cls(css.icon_error)}>{CUSTOMER.error}</span>*/}
                                  <span className={cls(css.errors)}>{errors.email.message}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_gender)}>
                            <div className={cls(css.gender)}>
                              <input id={'cr_cus_gender_male'}
                                     type={'radio'}
                                     checked={gender === '1'}
                                     value={'1'}
                                     {...register("gender")}
                                     onChange={() =>  onGenderInputChange('1') }
                              />
                              <label htmlFor={'cr_cus_gender_male'}>{SCRIPT.MALE}</label>
                            </div>
                            <div className={cls(css.gender)}>
                              <input id={'cr_cus_gender_female'}
                                     type={'radio'}
                                     checked={gender === '2'}
                                     value={'2'}
                                     {...register("gender")}
                                     onChange={() => onGenderInputChange('2')}
                              />
                              <label htmlFor={'cr_cus_gender_female'}>{SCRIPT.FEMALE}</label>
                            </div>
                          </div>
                          <div className={cls(css.lb_group_address)}>
                            <label htmlFor={'cr_cus_address'}>{SCRIPT.CUS_ADDRESS} <span>*</span></label>
                            <div className={cls(css.lb_group)}>
                              <input
                                id={'cr_cus_address'}
                                placeholder={SCRIPT.PL_CUS_ADDRESS}
                                onChange={(e) => onAddressInputChange(e.target.value)}
                                ref={addressRef}
                                autoComplete={'off'}
                                {...register("address", {
                                  validate: {
                                    'empty': v => !!!address || !!!v ? SCRIPT.VALIDATE.EMPTY_ADDRESS : clearErrors("address"),
                                  },
                                  maxLength: 255,
                                  onChange: (e) => {
                                    onAddressInputChange(e.target.value)
                                  }
                                })}
                                className={`${errors.address || (!!!addressVali && errorSeparate) ? cls(css.input_error) : cls(css.input_success)} ${cls(css.input_large)}`}
                                maxLength={256}
                              />
                              {(!!!addressVali && errorSeparate) && <span className={cls(css.errors)}>{SCRIPT.VALIDATE.INVALID_SEPARATE}</span>}
                            </div>
                            <div className={`${cls(css.separation)} ${separate ? cls(css.lb_has_address) : ''}`}
                                 onClick={() => {
                                   if(separate) {
                                     handleSeparateAddress()
                                     clearErrors("address")
                                     clearErrors("city_id")
                                     clearErrors("district_id")
                                     clearErrors("ward_id")
                                   }}}
                            >
                              {ICONS.locate}
                              <p>{SCRIPT.ADDRESS_SEPARATION}</p>
                            </div>
                          </div>
                          <div className={cls(css.lb_group_city)}>
                            <label>{SCRIPT.SE_CUS_CITY} <span>*</span></label>
                            <div className={cls(css.lb_group)}>
                              <Autocomplete
                                className={cls(css.lb_city)}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={cities}
                                freeSolo={false}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                value={city}
                                {...register("city_id", {
                                  validate: {
                                    'empty': _ => !!!city ? SCRIPT.VALIDATE.EMPTY_ADDRESS : clearErrors("city_id"),
                                  }
                                })}
                                componentsProps={{paper: {sx: {minWidth: 200}}}}
                                getOptionLabel={option => option}
                                inputValue={inputCity}
                                onInputChange={(e, value) => {
                                  setInputCity(value.replace('  ',''))
                                }}
                                onChange={(e, val) => {
                                  handleCityChange(val)
                                  clearErrors("city_id")
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    inputProps={{...params.inputProps}}
                                    placeholder={SCRIPT.SE_CUS_CITY}
                                    className={`${cls(css.text_field_city)} ${errors.city_id && cls(css.div_error)}`}
                                    autoComplete={'off'}
                                    onKeyDown={e => {
                                      if(e.key === 'Enter') {
                                        inputDistrictRef.current.focus();
                                        !!city &&clearErrors('city_id')
                                      }
                                      handleInputCityChange(e)
                                    }}
                                    onBlur={_ => !!!city && setError('city_id')}
                                  />
                                )}
                                renderOption={(props, option) => (
                                  <StyledOption {...props}>{option}</StyledOption>
                                )}
                              />
                              {(errors.address || errors.city_id || errors.district_id || errors.ward_id) && errors.address?.type !== 'maxLength'
                                ? <span className={cls(css.errors)}>{SCRIPT.VALIDATE.EMPTY_ADDRESS}</span>
                                : errors.address?.type === 'maxLength'
                                  ? <span className={cls(css.errors)}>Địa chỉ không vượt quá 255 ký tự</span>
                                  : ''
                              }
                            </div>
                          </div>
                          <div className={cls(css.lb_group_district)}>
                            <label htmlFor={'cr_cus_district'}>{SCRIPT.SE_CUS_DISTRICT} <span>*</span></label>
                            <div className={`${cls(css.lb_group)} ${cls(css.lb_grp_district)}`}>
                              <Autocomplete
                                className={cls(css.lb_district)}
                                disabled={!!!city}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={districtData}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                value={district}
                                {...register("district_id", {
                                  validate: {
                                    'empty': _ => !!!district ? SCRIPT.VALIDATE.EMPTY_ADDRESS : clearErrors("district_id"),
                                  }
                                })}
                                componentsProps={{paper: {sx: {minWidth: 200}}}}
                                getOptionLabel={option => option}
                                inputValue={inputDistrict}
                                onInputChange={(e, value) => {
                                  setInputDistrict(value.replace('  ',''))
                                }}
                                onChange={(e, val) => {
                                  handleDistrictChange(val)
                                  clearErrors("district_id")
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    inputRef={inputDistrictRef}
                                    autoComplete={'off'}
                                    inputProps={{...params.inputProps}}
                                    placeholder={SCRIPT.SE_CUS_DISTRICT}
                                    className={errors.district_id && cls(css.div_error)}
                                    onKeyDown={e => {
                                      if(e.key === 'Enter') {
                                        inputWardRef.current.focus();
                                        !!district && clearErrors('district_id')
                                      }
                                      handleInputDistrictChange(e)
                                    }}
                                    onBlur={_ => !!!district && setError('district_id')}
                                  />
                                )}
                                data-disabled={!!!city}
                                renderOption={(props, option) => (
                                  <StyledOption {...props}>{option}</StyledOption>
                                )}
                              />
                              {/*{errors.district_id && <span className={cls(css.errors)}>{errors.district_id.message}</span>}*/}
                            </div>
                          </div>
                          <div className={cls(css.lb_group_ward)}>
                            <label htmlFor={'cr_cus_ward'}>{SCRIPT.SE_CUS_WARD} <span>*</span></label>
                            <div className={`${cls(css.lb_group)}  ${cls(css.lb_grp_ward)}`}>
                              <Autocomplete
                                className={cls(css.lb_ward)}
                                disabled={!!!district}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={wardData}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                value={ward}
                                {...register("ward_id", {
                                  validate: {
                                    'empty': _ => !!!ward ? SCRIPT.VALIDATE.EMPTY_ADDRESS : clearErrors("ward_id"),
                                  }
                                })}
                                componentsProps={{paper: {sx: {minWidth: 200}}}}
                                getOptionLabel={option => option}
                                inputValue={inputWard}
                                onInputChange={(e, value) => {
                                  setInputWard(value.replace('  ',''))
                                }}
                                onChange={(e, val) => {
                                  handleWardChange(val)
                                  clearErrors("ward_id")
                                  setAddressVali(1)
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    inputRef={inputWardRef}
                                    inputProps={{...params.inputProps}}
                                    placeholder={SCRIPT.SE_CUS_WARD}
                                    className={errors.ward_id && cls(css.div_error)}
                                    onKeyDown={e => {
                                      if(e.key === 'Enter') {
                                        if(!!ward) clearErrors('address')
                                      }
                                      handleInputWardChange(e)
                                    }}
                                    onBlur={_ => {
                                      !!!ward && setError('ward_id')
                                    }}
                                  />
                                )}
                                data-disabled={!!!district}
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
                              {/*<label>{SCRIPT.GROUP_EMPLOYEE}</label>*/}
                              <div className={cls(css.lb_create_customer)}
                                   onClick={() => setShowModal(true)}
                              >
                                {ICONS.plus_circle}
                                <span>{SCRIPT.CREATE_GROUP_EMPLOYEE}</span>
                              </div>
                            </div>
                            <div className={cls(css.group_cus)} >
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
                                    value: group?.name || '',
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
                            <div className={cls(css.group_cus)}
                                 ref={policyRef}
                            >
                              <Autocomplete
                                className={cls(css.lb_grp_policy)}
                                disableClearable={true}
                                noOptionsText="Không có kết quả"
                                options={policyGroup.map(item => item?.name)}
                                popupIcon={ADDRESS_ICONS.arrowDown}
                                value={valuePolicy}
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
                            <input type={'checkbox'}
                                   defaultChecked={true}
                                   className={cls(css.active_toggle)}
                                   {...register("status")}
                            />
                            <div>
                              <span className={cls(css.acin)}>{SCRIPT.ACTIVE_INACTIVE}</span>
                            </div>
                          </div>
                        </div>
                        {showModal ? <CreateGroup
                          show={showModal}
                          closeModal={closeModal}
                          updateGroup={group => handleSelectCustomerGroup(group)}
                        /> : ''}
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
                    <>
                      <div className={cls(css.scroll)}>
                        <p onClick={() => {
                          setActiveScroll('scrollGeneral')
                          scrollGeneral.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                        }}
                           className={activeScroll === 'scrollGeneral' ? cls(css.activeScroll) : ''}
                        >Thông tin chung</p>
                        <p onClick={() => {
                          setActiveScroll('scrollMinisterial')
                          scrollMinisterial.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                        }}
                           className={activeScroll === 'scrollMinisterial' ? cls(css.activeScroll) : ''}
                        >{SCRIPT.CUS_MINISTERIAL}</p>
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
  );
};
export default CreateCustomer;