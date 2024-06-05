import LoginWrapper from 'Pages/LoginForm/LoginWrapper'
import {postData} from 'api/api'
import {getUrlJmsRegister} from 'api/url'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useGlobalContext from 'containerContext/storeContext'
import {useEffect, useLayoutEffect, useReducer, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useLocation, useNavigate} from 'react-router-dom'
import CONFIG from '../../config'
import './index.scss'

import ControlPanel from 'Pages/ControlPanel/controlPanel'
import {Checkbox} from 'common/form/checkbox'
import useAlert from 'hook/useAlert'
import {Address} from './components/_address'
import {District} from './components/_district'
import {Province} from './components/_province'
import {Ward} from './components/_ward'
import {OrderSingleProvider} from './provider'
import {initialState} from './provider/_initialState'
import {reducer} from './provider/_reducer'

export default function ConfirmInfo({className, style, disabled, ...props}) {
  const location = useLocation()
  const navigate = useNavigate()
  const [state, dispatch] = useGlobalContext()

  // if (!location.state?.usernameValue && !state.isLogin) navigate('/login')

  const {showAlert} = useAlert()

  const [size, setSize] = useState([0, 0])

  const [pageState, pageDispatch] = useReducer(reducer, initialState)

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  const [width, height] = size

  const [isShopnameEmpty, setIsShopNameEmpty] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [isRegionEmpty, setIsRegionEmpty] = useState(false)
  const [isEmail, setIsEmail] = useState(true)

  const [shopName, setShopName] = useState('')
  const [clientVersion, setClientVersion] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState(
    location.state?.usernameType === 'email'
      ? location.state?.usernameValue
      : '',
  )
  const [phoneNumber, setNumberPhone] = useState(
    location.state?.usernameType === 'phone'
      ? location.state?.usernameValue
      : '',
  )

  const [isPhoneEmpty, setIsPhoneEmpty] = useState(false)

  const [firstTime, setFirstTime] = useState(false)
  const [isPhoneNumber, setIsPhoneNumber] = useState(true)
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const [loading, changeLoading] = useState(false)

  const [isTouchShopName, setIsTouchShopName] = useState(false)
  const [isTouchEmail, setIsTouchEmail] = useState(false)
  const [isTouchhone, setIsTouchPhone] = useState(false)
  const [isTouchAddress, setIsTouchAddress] = useState(false)
  const [isTouchProvince, setIsTouchProvince] = useState(false)
  const [isTouchDistrict, setIsTouchDistrict] = useState(false)
  const [isTouchWard, setIsTouchWard] = useState(false)

  useEffect(() => {
    setIsRegionEmpty(
      [
        isTouchProvince && !pageState.form.info.address.province.value,
        isTouchDistrict && !pageState.form.info.address.district.value,
        isTouchWard && !pageState.form.info.address.ward.value,
      ].includes(true),
    )
  }, [
    isTouchProvince,
    isTouchDistrict,
    isTouchWard,
    pageState.form.info.address.province.value,
    pageState.form.info.address.district.value,
    pageState.form.info.address.ward.value,
    setIsRegionEmpty,
  ])

  const handleChangePhone = e => {
    const inputValue = e.target.value

    setFirstTime(false)
    setNumberPhone(inputValue)
  }

  const {t} = useTranslation()

  const onChangeEmail = data => {
    setEmail(
      data && data.target && data.target.value ? data.target.value : null,
    )
  }

  const handleSubmit = () => {
    const shpname = shopName?.trim()
    const mail = email?.trim()
    const phone = phoneNumber?.trim()

    if (!shpname && !mail && !phone) {
      setError(true)
      setIsShopNameEmpty(false)
      isPhoneEmpty(false)
      isEmailEmpty(false)
    } else {
      if (!shpname) setIsShopNameEmpty(true)
      if (!mail) setIsEmailEmpty(true)
      if (!phone) setIsPhoneEmpty(true)
    }

    setFirstTime(true)
    if (!shpname) return

    const data = {
      client_id: 'evoshop',
      client_version: clientVersion,
      vip_code_jnt: location.state?.vip_code_jnt,
      username: location.state?.usernameValue,
      password: location.state?.password,
      shopname: shopName,
      fullname: location.state?.fullName,
      phone: phoneNumber,
      email: email,
      address: pageState.form.info.address.value,
      city_id: pageState.form.info.address.province.value?.value,
      district_id: pageState.form.info.address.district.value?.value,
      ward_id: pageState.form.info.address.ward.value?.value,
    }

    changeLoading(true)
    postData(getUrlJmsRegister(), data)
      .then(res => {
        changeLoading(false)

        if (res.data && res.data.success) {
          setShopName('')
          setEmail('')
          setNumberPhone('')
          setError(false)
          setMessage(undefined)
          setFirstTime(false)

          const {access_token} = res.data.data
          window.localStorage.setItem('token', access_token)
          dispatch({type: 'SET_USER', payload: res.data.data})
          navigate('/admin')
          window.location.reload()
        }
        if (res.data && res.data.errors) {
          // setMessage(res.data.errors)
          if (Array.isArray(res.data.errors))
            res.data.errors.map(err =>
              showAlert({type: 'danger', content: err.message}),
            )
        }
      })
      .catch(() => {
        changeLoading(false)
      })
  }

  const isDisabled = [
    isShopnameEmpty || !isTouchShopName,
    (isEmailEmpty || !isTouchEmail || !isEmail) &&
      !(location.state?.usernameType === 'email'),
    !(location.state?.usernameType === 'phone') &&
      (!isTouchhone || isPhoneEmpty || !isPhoneNumber),
    !!pageState.validate?.address || !isTouchAddress,
    (!!pageState.validate?.ward &&
      !!pageState.validate?.district &&
      !!pageState.validate?.province) ||
      (!isTouchProvince && !isTouchDistrict && !isTouchWard),
  ].includes(true)

  useEffect(() => {
    if (pageState.form.info.address.province) {
      setIsTouchProvince(true)
    }
  }, [pageState.form.info.address.province])

  return (
    <OrderSingleProvider value={{pageState, pageDispatch}}>
      <LoginWrapper>
        <div
          className={width < 1200 ? 'login-form mini-login-form' : 'login-form'}
        >
          <div className={`comfirm-info ${className}`}>
            <div className="comfirm-info__group-logo">
              <img id={'logo-loginform'} src={'/img/logo.png'} alt={'logo'} />
            </div>
            <div className={'comfirm-info__title-login-form'}>
              <p>Hoàn thiện thông tin tài khoản</p>
            </div>

            <div>
              {message ? (
                <div
                  className={'error-all-form'}
                  style={{
                    display: 'block',
                    maxHeight: 'unset',
                    minHeight: 'unset',
                    textAlign: 'center',
                  }}
                >
                  {Array.isArray(message) ? (
                    <ul>
                      {message.map((mess, index) => (
                        <li key={`mess-${index}`}>
                          <img
                            // id={'logo-error-all-form'}
                            style={{
                              marginRight: '2px',
                              position: 'relative',
                              top: '2px',
                            }}
                            src={'/svg/error.svg'}
                            alt={'icon-error'}
                          />
                          {mess.message}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{message}</p>
                  )}
                </div>
              ) : null}

              <div className="comfirm-info__input-field">
                <label htmlFor="username">Tên cửa hàng</label>&nbsp;
                <Text color={THEME_SEMANTICS.failed}>*</Text>
                <input
                  placeholder="Nhập tên cửa hàng"
                  tabIndex="1"
                  className={
                    (!shopName && firstTime) || error || isShopnameEmpty
                      ? 'border-red-input upos-text'
                      : 'upos-text'
                  }
                  onChange={e => {
                    //reset summary error
                    setMessage(undefined)
                    setError(false)
                    setFirstTime(false)

                    const value = e.target.value
                    setShopName(value)
                    if (value?.trim()) setIsShopNameEmpty(false)
                    else setIsShopNameEmpty(true)
                  }}
                  type={'text'}
                  // placeholder={t('Username')}
                  required={''}
                  maxLength={81}
                  id={'shopname'}
                  name="shopname"
                  autoComplete={'on'}
                  onBlur={e => {
                    const value = e.target.value
                    //check empty
                    if (!value?.trim()) setIsShopNameEmpty(true)
                    setIsTouchShopName(true)
                  }}
                  onFocus={e => {
                    setIsShopNameEmpty(false)
                  }}
                />
                {isShopnameEmpty && !error && (
                  <div className={'password-message'}>
                    Tên cửa hàng không được để trống.
                  </div>
                )}
                {shopName.length > 80 && (
                  <div className={'password-message'}>
                    Tên cửa hàng chỉ được phép nhập tối đa 80 ký tự.
                  </div>
                )}
              </div>
              <div className="comfirm-info__input-field">
                <label htmlFor="phone-number">Số điện thoại</label>&nbsp;
                <Text color={THEME_SEMANTICS.failed}>*</Text>
                <div className="number-box">
                  <input
                    placeholder="Nhập số điện thoại"
                    tabIndex="3"
                    className={
                      !isPhoneNumber || isPhoneEmpty
                        ? 'border-red-input upos-text'
                        : 'upos-text'
                    }
                    name={'myPhone'}
                    type={'number'}
                    required={''}
                    id={'phone-number'}
                    onFocus={e => {
                      setIsPhoneEmpty(false)
                    }}
                    onInput={e => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength,
                        )
                    }}
                    maxLength={11}
                    autoComplete={'off'}
                    value={phoneNumber}
                    onChange={handleChangePhone}
                    onBlur={e => {
                      const value = e.target.value
                      if (value) {
                        setIsPhoneEmpty(false)

                        if (
                          /(02|03|05|07|08|09)+([0-9]{8})\b/.test(value) ||
                          /(02)+([0-9]{9})\b/.test(value)
                        ) {
                          setIsPhoneNumber(true)
                        } else setIsPhoneNumber(false)
                      } else {
                        setIsPhoneEmpty(true)
                        setIsPhoneNumber(true)
                      }

                      setIsTouchPhone(true)
                    }}
                    disabled={location.state?.usernameType === 'phone'}
                  />
                </div>
                {isPhoneEmpty && (
                  <div className={'password-message'}>
                    Số điện thoại không được để trống.
                  </div>
                )}
                {!isPhoneNumber && (
                  <div className={'password-message'}>
                    Số điện thoại không hợp lệ.
                  </div>
                )}
              </div>
              <div className="comfirm-info__input-field">
                <label htmlFor="username">Email</label>{' '}
                <Text color={THEME_SEMANTICS.failed}>*</Text>
                <input
                  placeholder="Nhập email cửa hàng"
                  tabIndex="2"
                  className={
                    !isEmail || isEmailEmpty
                      ? 'border-red-input upos-text'
                      : 'upos-text'
                  }
                  value={email}
                  onChange={e => {
                    //reset summary error
                    setMessage(undefined)
                    setError(false)
                    setFirstTime(false)

                    const value = e.target.value
                    onChangeEmail(e)
                  }}
                  maxLength={256}
                  type={'text'}
                  // placeholder={t('Username')}
                  required={''}
                  id={'username'}
                  autoComplete={'on'}
                  onBlur={e => {
                    const value = e.target.value
                    //check empty
                    if (!value?.trim()) {
                      setIsEmailEmpty(true)
                      setIsEmail(true)
                    } else {
                      setIsEmailEmpty(false)
                      const vietnamesePattern = /[À-ỹ]+/g
                      const emailPattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      setIsEmail(
                        emailPattern.test(value) &&
                          !vietnamesePattern.test(value),
                      )
                    }
                    setIsTouchEmail(true)
                  }}
                  onFocus={e => {
                    setIsEmailEmpty(false)
                  }}
                  disabled={location.state?.usernameType === 'email'}
                />
                {isEmailEmpty && (
                  <div className={'password-message'}>
                    Email không được để trống.
                  </div>
                )}
                {!isEmail && (
                  <div className={'password-message'}>Email không hợp lệ.</div>
                )}
                {email?.length > 255 && (
                  <div className={'password-message'}>
                    Email chỉ được phép nhập tối đa 255 ký tự.
                  </div>
                )}
              </div>
              <Address
                id={'address'}
                validate={pageState.validate}
                setIsTouch={setIsTouchAddress}
              />
              <div className="confirm-info__group-region">
                <label className="confirm-info__region-label">
                  Khu vực nhận <Text color={THEME_SEMANTICS.failed}>*</Text>
                </label>

                <div className="confirm-info__region">
                  <Province
                    validate={pageState.validate}
                    onClose={() => setIsTouchProvince(true)}
                  />
                  <District
                    validate={pageState.validate}
                    onClose={() => setIsTouchDistrict(true)}
                  />
                  <Ward
                    validate={pageState.validate}
                    onClose={() => setIsTouchWard(true)}
                  />
                </div>
              </div>
              <div style={{display: 'flex', marginTop: '32px'}}>
                <Checkbox
                  checked={true}
                  className={'checkbox'}
                  disabled={true}
                />
                <Text>
                  Evoshop sẽ lấy địa chỉ trên làm điểm gửi hàng cho đơn hàng của
                  bạn
                </Text>
              </div>

              <div
                style={{width: '100%', display: 'flex', alignItems: 'center'}}
              >
                <div
                  className="chevron-left-double-svg"
                  onClick={() => {
                    navigate('/login', {
                      state: {
                        username: location.state?.usernameValue,
                        password: location.state?.password,
                        option: 1,
                      },
                    })
                  }}
                  style={{
                    width: '59.7px',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF',
                    border: '1px solid #EBEEF5',
                    borderRadius: '4px',
                    marginRight: '8px',
                    marginTop: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="32"
                      height="32"
                      transform="translate(0 0.370117)"
                      fill="white"
                    />
                    <path
                      d="M24 23.0369L17.3333 16.3703L24 9.70361M14.6667 23.0369L8 16.3703L14.6667 9.70361"
                      stroke="#FF424E"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div style={{width: '100%'}}>
                  <Button
                    style={{width: '100%'}}
                    className={
                      shopName && email && phoneNumber
                        ? // ? 'button-confirm button-confirm-active cursor-pointer'
                          'comfirm-info__button-confirm cursor-pointer'
                        : 'comfirm-info__button-confirm cursor-pointer'
                    }
                    onClick={() => handleSubmit()}
                    disabled={isDisabled}
                    type="submit"
                  >
                    {loading ? (
                      <img
                        src={'/svg/loading.svg'}
                        alt={'loading'}
                        style={{height: '100%'}}
                      />
                    ) : (
                      t('Register')
                    )}
                  </Button>
                </div>
              </div>

              <div className={'comfirm-info__contact-login-form'}>
                <div className="comfirm-info__phone-call">
                  <a href="tel: 1900 1511">
                    <img
                      className={'cell-phone'}
                      src={'/svg/PhoneCall.svg'}
                      alt="phoneCall"
                    />
                    {CONFIG.PHONE}
                  </a>
                  &nbsp;(Nhánh 2)
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoginWrapper>
    </OrderSingleProvider>
  )
}
