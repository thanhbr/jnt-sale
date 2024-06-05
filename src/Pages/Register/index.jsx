import {postData} from 'api/api'
import {getUrlLogin} from 'api/url'
import {Button} from 'common/button'
import useGlobalContext from 'containerContext/storeContext'
import LoginWrapper from 'Pages/LoginForm/LoginWrapper'
import React, {useLayoutEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import CONFIG from '../../config'
import './index.scss'
import {
  getUrlCheckOTPPassword,
  getUrlResetPassword,
  getUrlSendOTPPassword,
} from '../../api/url'
import {Link} from 'react-router-dom'

export default function Register({className, style, disabled, ...props}) {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  const [width, height] = size

  const [isShopnameEmpty, setIsShopnameEmpty] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)
  const [isOTPEmpty, setIsOTPEmpty] = useState(false)

  const [state, dispatch] = useGlobalContext()
  const [isVI, setIsVI] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const [shopName, setShopName] = useState('')
  const [email, setEmail] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [shopPassword, setShopPassword] = useState('')
  const [numberOTP, setNumberOTP] = useState('')

  const [messageCheckOTP, setMessageCheckOTP] = useState('')
  const [messageSendOTP, setMessageSendOTP] = useState('')
  const [errorMessageOTP, setErrorMessageOTP] = useState(false)
  const [errorMessageOTPtime, setErrorMessageOTPTime] = useState(false)

  const [isShowPassNew, setShowHidePassNew] = useState(false)
  const [firstTime, setFirstTime] = useState(false)
  const [isShowPass, setShowHidePass] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [errorPass, setErrorPass] = useState()
  const [loading, changeLoading] = useState(false)
  const [disableSendOTP, setDisableSendOTP] = useState(true)
  const [isSendOTP, setIsSendOTP] = useState(false)

  const checkPasswordVN = value => {
    const regex =
      /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/
    const checkVN = value.match(regex)
    setIsVI(checkVN)
  }

  const showHidePassword = () => {
    setShowHidePass(!isShowPass)
  }

  const showHidePasswordNew = () => {
    setShowHidePassNew(!isShowPassNew)
  }

  const onChangePassword = data => {
    setShopPassword(
      data && data.target && data.target.value ? data.target.value : null,
    )
  }

  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const handleChangePhone = e => {
    const inputValue = e.target.value
    if (
      /^(10?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
        inputValue,
      )
    )
      setDisableSendOTP(false)
    else setDisableSendOTP(true)

    setMessageSendOTP('')
    setNumberPhone(inputValue)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSendOTP()
  }

  const {t} = useTranslation()

  const onChangeUserName = data => {
    setShopName(
      data && data.target && data.target.value ? data.target.value : null,
    )
  }

  const [OTP, setOTP] = useState([])

  const handleOTPChange = otp => {
    setMessageCheckOTP('')
    setOTP(otp)
    if (otp.length >= 6) handleCheckOTP(otp)
  }

  const handleSendOTP = () => {
    setMessageSendOTP('')

    if (disableSendOTP) return

    const url = getUrlSendOTPPassword()
    const data = {
      phone: numberPhone,
    }
    postData(url, data)
      .then(res => {
        changeLoading(false)
        if (res.data && res.data.success) {
          setIsSendOTP(true)
          setSeconds(60)
        }
        if (res.data && res.data.errors) {
          setMessageSendOTP(res.data.errors.message)
        }
      })
      .catch(() => {
        setMessageSendOTP('error')
      })
  }

  const handleCheckOTP = otp => {
    const url = getUrlCheckOTPPassword()
    const data = {
      phone: numberPhone,
      otp: otp,
    }
  }

  const handleSubmit = () => {
    if (errorPass) return

    const shpname = shopName?.trim()
    const pass = shopPassword?.trim()
    const mail = email?.trim()

    if (!shpname && !pass && !mail) {
      setError(true)
      setIsShopnameEmpty(false)
      setIsEmpty(false)
      setIsPasswordEmpty(false)
      setEmail(false)
    } else {
      if (!shpname) setIsShopnameEmpty(true)
      if (!pass) setIsPasswordEmpty(true)
      if (!mail) setEmail(true)
      if (!shpname && !pass) {
        setError(false)
      }
    }

    setFirstTime(true)
    if (!shpname || !pass) return
    const url = getUrlLogin()
    const data = {
      username: shpname,
      password: pass,
    }

    changeLoading(true)
    postData(url, data)
      .then(res => {
        changeLoading(false)
        if (res.data && res.data.success) {
          // clear data
          setShopName('')
          setEmail('')
          setNumberPhone('')
          setShopPassword('')
          setError(false)
          setMessage('')
          setFirstTime(false)

          const {access_token} = res.data.data
          window.localStorage.setItem('token', access_token)
          dispatch({type: 'SET_USER', payload: res.data})
          // dispatch({type: 'SET_LOGIN'})
          window.location.reload()
        }
        if (res.data && res.data.errors) {
          setMessage(res.data.errors.code)
        }
      })
      .catch(() => {
        changeLoading(false)
        dispatch({type: 'SET_USER', payload: {}})
        dispatch({type: 'SET_LOGOUT'})
      })
  }

  return (
    <LoginWrapper>
      <div
        className={width < 1200 ? 'login-form mini-login-form' : 'login-form'}
      >
        <div className={`form-register ${className}`}>
          <div className="form-register__group-logo">
            <img id={'logo-loginform'} src={'/img/logo.png'} alt={'logo'} />
          </div>
          <div className={'form-register__title-login-form'}>
            <p>Đăng ký tài khoản</p>
          </div>

          <div className="form-register__input-field">
            <label for="username">Tên cửa hàng/người gửi</label>
            <input
              placeholder="Nhập tên cửa hàng"
              tabIndex="1"
              className={
                (!shopName && firstTime) || message || error || isShopnameEmpty
                  ? 'border-red-input upos-text'
                  : 'upos-text'
              }
              onChange={e => {
                //reset summary error
                setMessage('')
                setError(false)
                setFirstTime(false)

                const value = e.target.value
                onChangeUserName(e)
                if (value?.trim()) setIsShopnameEmpty(false)
                else setIsShopnameEmpty(true)
              }}
              type={'text'}
              // placeholder={t('Username')}
              required={''}
              id={'username'}
              autoComplete={'on'}
              onBlur={e => {
                const value = e.target.value
                //check empty
                if (!value?.trim()) setIsShopnameEmpty(true)
              }}
              onFocus={e => {
                setIsShopnameEmpty(false)
              }}
            />
            {isShopnameEmpty && !error && (
              <div className={'password-message'}>
                Tên cửa hàng/người gửi không được để trống.
              </div>
            )}
          </div>
          <div className="form-register__input-field">
            <label for="username">Email</label>
            <input
              placeholder="Nhập email"
              tabIndex="2"
              className={
                (!shopName && firstTime) || message || error || isEmailEmpty
                  ? 'border-red-input upos-text'
                  : 'upos-text'
              }
              onChange={e => {
                //reset summary error
                setMessage('')
                setError(false)
                setFirstTime(false)

                const value = e.target.value
                onChangeUserName(e)
                if (value?.trim()) setIsEmailEmpty(false)
                else setIsEmailEmpty(true)
              }}
              type={'text'}
              // placeholder={t('Username')}
              required={''}
              id={'username'}
              autoComplete={'on'}
              onBlur={e => {
                const value = e.target.value
                //check empty
                if (!value?.trim()) setIsEmailEmpty(true)
              }}
              onFocus={e => {
                setIsEmailEmpty(false)
              }}
            />
            {isEmailEmpty && !error && (
              <div className={'password-message'}>
                Email không được để trống.
              </div>
            )}
          </div>
          <div className="form-register__input-field">
            <label for="phone-number">Số điện thoại</label>
            <div className="number-box">
              <input
                placeholder="Nhập số điện thoại"
                tabIndex="3"
                className={
                  (!numberPhone && firstTime) || messageSendOTP || isEmpty
                    ? 'border-red-input upos-text'
                    : 'upos-text'
                }
                name={'myPhone'}
                type={'number'}
                required={''}
                id={'phone-number'}
                onInput={e => {
                  if (e.target.value.length > e.target.maxLength)
                    e.target.value = e.target.value.slice(0, e.target.maxLength)
                }}
                minLength={10}
                maxLength={11}
                // autoComplete={'off'}
                // autoFocus={true}
                value={numberPhone}
                onKeyDown={handleKeyDown}
                onChange={handleChangePhone}
                onBlur={e => {
                  const value = e.target.value
                  if (value) setMessageSendOTP('')
                  else setMessageSendOTP('Số điện thoại không được để trống.')
                }}
              />
              <span
                className={`otp ${isSendOTP ? 'otp-60s' : ''} ${
                  disableSendOTP ? 'send-otp-disabled' : ''
                } `}
                onClick={handleSendOTP}
              >
                {isSendOTP ? `${seconds}s` : 'Gửi mã OTP'}
              </span>
            </div>
            {messageSendOTP && (
              <div className={'password-message'}>{messageSendOTP}</div>
            )}
          </div>
          <div className={'password-field'}>
            <div className={'password-forgot'}>
              <label for="otp">Nhập mã OTP</label>
            </div>
            <input
              placeholder="Nhập mã OTP"
              tabIndex="3"
              className={
                (!numberPhone && firstTime) || messageSendOTP || isOTPEmpty
                  ? 'border-red-input upos-text'
                  : 'upos-text'
              }
              name={'myPhone'}
              type={'number'}
              required={''}
              id={'phone-number'}
              onInput={e => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength)
              }}
              maxLength={6}
              // autoComplete={'off'}
              // autoFocus={true}
              value={numberPhone}
              onKeyDown={handleKeyDown}
              onChange={handleOTPChange}
              onBlur={e => {
                const value = e.target.value
                if (value) setMessageSendOTP('')
                else setMessageSendOTP('Số điện thoại không được để trống.')
              }}
              isDisabled={disableSendOTP}
            />
            {messageCheckOTP && (
              <div className={'password-message'}>{messageCheckOTP}</div>
            )}
            {errorMessageOTP && (
              <div className={'password-message'}>
                Vui lòng nhập đúng mã OTP
              </div>
            )}
            {errorMessageOTPtime && (
              <div className={'password-message'}>
                Mã OTP đã hết hiệu lực, vui lòng chọn "Gửi OTP" để nhận mã mới.
              </div>
            )}
          </div>
          <div className="form-register__input-field">
            <label for="username">Mật khẩu cửa hàng</label>
            <input
              placeholder="Mật khẩu"
              tabIndex="4"
              className={
                (!shopPassword && firstTime) ||
                message ||
                error ||
                isPasswordEmpty
                  ? 'border-red-input upos-text'
                  : 'upos-text'
              }
              type={!isShowPass ? 'password' : 'text'}
              // placeholder={t('Password')}
              required={''}
              id={'password'}
              autoComplete={'on'}
              onChange={e => {
                //reset summary error
                setMessage('')
                setError(false)
                setFirstTime(false)

                const value = e.target.value
                if (value?.trim()) setIsPasswordEmpty(false)
                else setIsPasswordEmpty(true)
                checkPasswordVN(e.target.value)
                onChangePassword(e)
                // setErrorPass(false)
                // checkLength(e.target.value)
                // if (e.target.value.length >= 6) setPasswordNote(false)
              }}
              onBlur={e => {
                !e.target.value.trim() && setIsPasswordEmpty(true)
                // setPasswordNote(false)
              }}
              onFocus={e => {
                // if (e.target.value.length < 6) setPasswordNote(true)
                !e.target.value && setIsPasswordEmpty(false)
              }}
            />
            <img
              className={!isShowPass ? 'icon-hide-pass' : 'icon-show-pass'}
              src={!isShowPass ? '/svg/close-eye.svg' : '/svg/open-eye.svg'}
              onClick={() => showHidePassword(isShowPass)}
              alt={'icon'}
            />
            {isPasswordEmpty && !error && (
              <div className={'password-message'}>
                Mật khẩu không được để trống.
              </div>
            )}
          </div>

          <Button
            className={
              shopName && email && numberPhone && shopPassword
                ? // ? 'button-confirm button-confirm-active cursor-pointer'
                  'form-register__button-confirm cursor-pointer'
                : 'form-register__button-confirm cursor-pointer'
            }
            onClick={() => handleSubmit(setIsVI, setIsEmpty)} //login(username, password, isSavePass)}
            type="submit"
          >
            {loading ? (
              <img src={'/svg/loading.svg'} alt={'loading'} />
            ) : (
              t('Register')
            )}
          </Button>

          <div className={'form-register__contact-login-form'}>
            <div className={'form-register__register-link'}>
              <p>
                Bạn chưa có tài khoản? {''}
                <Link to={'/login'}>Đăng nhập</Link>
              </p>
            </div>
            <div className="form-register__phone-call">
              <a href="tel: 1900 1511">
                <img
                  className={'cell-phone'}
                  src={'/svg/PhoneCall.svg'}
                  alt="phoneCall"
                />
                {CONFIG.PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </LoginWrapper>
  )
}
