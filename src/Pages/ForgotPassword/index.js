import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react'
import {useTranslation} from 'react-i18next'
import ControlPanel from '../ControlPanel/controlPanel'
import {GlobalContext} from '../../App'
import LoginWrapper from 'Pages/LoginForm/LoginWrapper'
import './index.css'
import OtpInput from 'react-otp-input'
import {postData} from '../../api/api'
import {useDispatch} from 'react-redux'
import {
  getUrlCheckOTPPassword,
  getUrlResetPassword,
  getUrlSendOTPPassword,
} from '../../api/url'
import {useNavigate} from 'react-router-dom'

const FORGOT_STEP = {
  INPUT_MAIL: 'input mail',
  OTP: 'otp',
  NEW_PASSWORD: 'new password',
  CHANGE_SUCCESS: 'change success',
}

export default function ForgotPassword() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [code, setcode] = useState(new Array(6).fill(''))
  // action here
  const {t} = useTranslation()
  const [size, setSize] = useState([0, 0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [disableSendOTP, setDisableSendOTP] = useState(true)
  const [loading, changeLoading] = useState(false)
  const [isShowPass, setShowHidePass] = useState(false)
  const [isShowPassNew, setShowHidePassNew] = useState(false)
  const [messageCheckOTP, setMessageCheckOTP] = useState('')
  const [messageSendOTP, setMessageSendOTP] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isMatch, setIsMatch] = useState(true)
  const [isMatchMessage, setIsMatchMessage] = useState(false)
  const [notify, setNotify] = useState({active: false, message: ''})
  const [isSendOTP, setIsSendOTP] = useState(false)

  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const showHidePassword = () => {
    setShowHidePass(!isShowPass)
  }

  const showHidePasswordNew = () => {
    setShowHidePassNew(!isShowPassNew)
  }

  const [step, setStep] = useState(FORGOT_STEP.INPUT_MAIL)

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  const [width, height] = size

  /*OTP*/
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
      phone: phoneNumber,
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
      phone: phoneNumber,
      otp: otp,
    }
    postData(url, data)
      .then(res => {
        if (res.data && res.data.success) {
          setStep(FORGOT_STEP.NEW_PASSWORD)
        }
        if (res.data && res.data.errors) {
          setMessageCheckOTP(res.data.errors.message)
        }
      })
      .catch(() => {})
  }

  // 60s
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (isSendOTP) {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval)
            // console.log('Expired-Time!!!!')
            setIsSendOTP(false)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [isSendOTP, minutes, seconds])

  const handleResetPassword = e => {
    e.preventDefault()

    const url = getUrlResetPassword()
    const data = {
      phone: phoneNumber,
      otp: OTP,
      password: password,
      password_confirm: passwordConfirm,
    }
    postData(url, data)
      .then(res => {
        if (res.data && res.data.success) {
          setNotify({
            active: true,
            message: 'Lấy lại mật khẩu thành công, vui lòng đăng nhập lại',
          })
          setStep(FORGOT_STEP.NEW_PASSWORD)

          setTimeout(() => {
            setNotify(prev => ({...prev, active: false}))
            navigate('/login')
          }, 5000)
        }
        if (res.data && res.data.errors) {
          setMessageCheckOTP(res.data.errors.message)
        }
      })
      .catch(() => {})
  }

  //Error Message
  const [firstTime, setFirstTime] = useState(false)
  const [passwordNote, setPasswordNote] = useState(false)
  const [errorPass, setErrorPass] = useState()
  const [isEmpty, setIsEmpty] = useState(false)
  const [error, setError] = useState(false)
  const [isVN, setIsVN] = useState(false)
  const [errorMessageOTP, setErrorMessageOTP] = useState(false)
  const [errorMessageOTPtime, setErrorMessageOTPTime] = useState(false)
  const checkLength = value => {
    setErrorPass(value?.length < 6 && value.length > 0)
  }

  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    str = str.replace(/Đ/g, 'D')
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ')
    str = str.trim()
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    // str = str.replace(
    //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    //   ' ',
    // )
    return str
  }

  const handleChangePhone = e => {
    const inputValue = e.target.value
    if (
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
        inputValue,
      )
    )
      setDisableSendOTP(false)
    else setDisableSendOTP(true)

    setMessageSendOTP('')
    setPhoneNumber(inputValue)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSendOTP()

      const otpElement = document.querySelector('.otp-input')
      const input = otpElement.querySelector('input')
      input.focus()
    }
  }

  const renderNewPassword = () => {
    return (
      <div
        className={width < 1200 ? 'login-form mini-login-form' : 'login-form'}
      >
        <div className={'group-login-form'} id={'amination-form'}>
          <div className={'title-login-form'}>
            <p>Lấy lại mật khẩu</p>
            <span>Vui lòng nhập mật khẩu mới</span>
          </div>
          <div className="pass-new-field">
            <label for="password">Nhập mật khẩu mới</label>
            <div className="group-inpput-login-form">
              <input
                className={
                  (!password && firstTime) || errorPass || error || isEmpty
                    ? 'border-red-input upos-text'
                    : 'upos-text'
                }
                type={!isShowPass ? 'password' : 'text'}
                required={''}
                id={'password'}
                value={password}
                autoComplete={'on'}
                onChange={e => {
                  const value = removeVietnameseTones(e.target.value)

                  setIsEmpty(false)
                  setErrorPass(false)
                  checkLength(value)
                  if (value.length >= 6) setPasswordNote(false)
                  setPassword(value)

                  // is match
                  if (value && value === passwordConfirm) setIsMatch(false)
                  else setIsMatch(true)
                }}
                onBlur={e => {
                  setIsMatchMessage
                  const value = removeVietnameseTones(e.target.value)
                  setPasswordNote(false)
                  if (value && value === passwordConfirm)
                    setIsMatchMessage(false)
                  else setIsMatchMessage(true)
                  if (e.target.value.length <= 0) setIsEmpty(true)
                  else setIsEmpty(false)
                }}
                onFocus={e => {
                  if (e.target.value.length < 6) setPasswordNote(true)
                }}
              />
              <img
                className={!isShowPass ? 'icon-hide-pass' : 'icon-show-pass'}
                src={!isShowPass ? '/svg/close-eye.svg' : '/svg/open-eye.svg'}
                onClick={() => showHidePassword(isShowPass)}
                alt={'icon'}
              />
            </div>
            {isEmpty && !error && (
              <div className={'password-message'}>
                Mật khẩu không được để trống.
              </div>
            )}
            {passwordNote && !errorPass && !isEmpty && (
              <div className="password-note">
                Mật khẩu cần có ít nhất 6 ký tự.
              </div>
            )}
            {errorPass && (
              <div className={'password-message'}>
                Mật khẩu cần có ít nhất 6 ký tự.
              </div>
            )}
          </div>
          <div className={'acp-password-new-field'}>
            <div className={'password-forgot'}>
              <label for="password-new">Xác nhận mật khẩu mới</label>
            </div>
            <div className="group-inpput-login-form">
              <input
                className={
                  (!password && firstTime) || isMatchMessage
                    ? 'border-red-input upos-text'
                    : 'upos-text'
                }
                type={!isShowPassNew ? 'password' : 'text'}
                required={''}
                id={'password-new'}
                autoComplete={'on'}
                onChange={e => {
                  const value = e.target.value
                  setIsMatchMessage(false)

                  setPasswordConfirm(value)
                  if (value && value === password) setIsMatch(false)
                  else setIsMatch(true)
                }}
                onBlur={e => {
                  const value = removeVietnameseTones(e.target.value)
                  if (value && value === password) setIsMatchMessage(false)
                  else setIsMatchMessage(true)
                }}
              />
              <img
                className={!isShowPassNew ? 'icon-hide-pass' : 'icon-show-pass'}
                src={
                  !isShowPassNew ? '/svg/close-eye.svg' : '/svg/open-eye.svg'
                }
                onClick={() => showHidePasswordNew(isShowPassNew)}
                alt={'icon'}
              />
            </div>
            {isMatchMessage && passwordConfirm && (
                <div className="password-message">
                  Vui lòng nhập trùng khớp với mật khẩu trên.
                </div>
              )}
          </div>
          <button
            className={'button-confirm cursor-pointer'}
            type="submit"
            onClick={handleResetPassword}
            onChange={e => setIsMatch(false)}
            disabled={isMatch || errorPass}
          >
            {loading ? (
              <img src={'/svg/loading.svg'} alt={'loading'} />
            ) : (
              t('SuccessPassword')
            )}
          </button>
        </div>
      </div>
    )
  }

  const renderOTP = () => {
    return (
      <div
        className={width < 1200 ? 'login-form mini-login-form' : 'login-form'}
      >
        <div className={`group-login-form `} id={'amination-form'}>
          <div className={'title-login-form'}>
            <p>Lấy lại mật khẩu</p>
            <span>Vui lòng nhập số điện thoại để lấy lại mật khẩu</span>
          </div>
          <div className="user-name-field">
            <label for="phone-number">Số điện thoại</label>
            <div className="number-box">
              <input
                className={
                  (!phoneNumber && firstTime) || messageSendOTP || isEmpty
                    ? 'border-red-input upos-text'
                    : 'upos-text'
                }
                name={'myPhone'}
                type={'number'}
                required={''}
                id={'phone-number'}
                autoComplete={'off'}
                autoFocus={true}
                value={phoneNumber}
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
                onClick={() => {
                  handleSendOTP()

                  const otpElement = document.querySelector('.otp-input')
                  const input = otpElement.querySelector('input')
                  input.focus()
                }}
              >
                {isSendOTP ? `${seconds}s` : 'Gửi OTP'}
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
            <OtpInput
              className={'otp-input'}
              value={OTP}
              onChange={handleOTPChange}
              numInputs={6}
              isInputNum={true}
              name={'otp'}
              inputStyle={{
                width: '42px',
                height: '2.5rem',
                margin: '0 19px 0 0',
                fontFamily: 'SF Pro Display',
                fontSize: '20px',
                background: 'transparent',
                borderBottomColor: '#000000',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderLeft: 'unset',
                borderRight: 'unset',
                borderTop: 'unset',
                fontWeight: '400',
                color: '#000028',
              }}
              focusStyle={{
                background: 'transparent',
                borderBottomColor: '#000000',
                borderBottomStyle: 'solid',
                borderBottomWidth: '2px',
              }}
              disabledStyle={{borderBottomColor: 'gray'}}
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
          {/* <button onClick={handleCheckOTP}>Continue</button> */}
        </div>
      </div>
    )
  }

  return (
    <LoginWrapper notify={notify}>
      {step === FORGOT_STEP.INPUT_MAIL && renderOTP()}
      {step === FORGOT_STEP.NEW_PASSWORD && renderNewPassword()}
    </LoginWrapper>
  )
}
