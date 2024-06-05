import {Radio} from 'common/form/radio'
import {Text} from 'common/text'
import {useEffect, useLayoutEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {postData} from '../../api/api'
import {getUrlLogin} from '../../api/url'
import {Button} from '../../common/button'
import CONFIG from '../../config.js'
import useGlobalContext from '../../containerContext/storeContext'
import ControlPanel from '../ControlPanel/controlPanel'
import './LoginForm.css'
import LoginWrapper from './LoginWrapper.js'
import {ICONS} from 'Pages/confirmInfo/interface/_icons'
import {Tooltip} from 'common/tooltip'
import { LanguageSelect } from '../../Component/Language'
import * as React from 'react'
// import {SnowLake} from "./snow";
// import ForgotPasswordForm from '../ForgotPassword/'

function loginFromKeyboard() {
  try {
    const buttonConfirm = document.getElementsByClassName('button-confirm')
    buttonConfirm[0].click()
  } catch (error) {
    console.error(
      `================ error at loginFromKeyboard==================${error}`,
    )
  }
}
const listener = event => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    loginFromKeyboard()
  }
}

export default function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const [state, dispatch] = useGlobalContext()
  // const [passwordNote, setPasswordNote] = useState(false)
  const [isVI, setIsVI] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false)
  const [errorPass, setErrorPass] = useState()

  const checkPasswordVN = value => {
    const regex =
      /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/
    const checkVN = value.match(regex)
    setIsVI(checkVN)
  }

  const isEmail = value => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(value)
  }

  //***************************
  const [username, setUserName] = useState(location.state?.username || '')
  const [password, setPassword] = useState(location.state?.password || '')
  const [firstTime, setFirstTime] = useState(false)
  const [isSavePass, setIsSavePass] = useState(false)
  const [isShowPass, setShowHidePass] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [loading, changeLoading] = useState(false)
  const [option, setOption] = useState(location.state?.option || 0)

  // action here
  const handleSubmit = () => {
    if (errorPass) return

    const usrname = username?.trim()
    const pass = password?.trim()

    if (!usrname && !pass) {
      setError(true)
      setIsUsernameEmpty(false)
      setIsEmpty(false)
    } else {
      if (!usrname) setIsUsernameEmpty(true)
      if (!pass) setIsEmpty(true)
      if (!usrname && !pass) {
        setError(false)
      }
    }

    setFirstTime(true)
    if (!usrname || !pass) return
    const url = getUrlLogin({option})
    const data = {
      client_id: 'evoshop',
      username: usrname,
      password: pass,
    }

    changeLoading(true)
    postData(url, data)
      .then(res => {
        changeLoading(false)
        if (res.data && res.data.success) {
          // clear data
          setUserName('')
          setPassword('')
          setError(false)
          setMessage('')
          setFirstTime(false)

          if (option === 0) {
            const {access_token} = res.data.data
            window.localStorage.setItem('token', access_token)
            dispatch({type: 'SET_USER', payload: res.data})
            window.location.reload()
          } else {
            if (res.data.is_new_account === 1) {
              const usernameType = isEmail(username) ? 'email' : 'phone'
              navigate('/confirminfo', {
                state: {
                  usernameType,
                  usernameValue: username,
                  password,
                  vip_code_jnt: res.data.data.vip_code_jnt,
                  fullName: res.data.data.name,
                },
              })
            } else {
              const {access_token} = res.data.data
              window.localStorage.setItem('token', access_token)
              dispatch({type: 'SET_USER', payload: res.data.data})
              window.location.reload()
            }
          }
        }
        if (option === 0 && res.data && res.data.errors) {
          setMessage(res.data.errors.message)
        } else if (option === 1 && !res.data.success) {
          setMessage(res.data.message)
        }
      })
      .catch(() => {
        changeLoading(false)
        dispatch({type: 'SET_USER', payload: {}})
        dispatch({type: 'SET_LOGOUT'})
      })
  }

  const onChangeUserName = data => {
    setUserName(
      data && data.target && data.target.value ? data.target.value : null,
    )
  }
  const onChangePassword = data => {
    setPassword(
      data && data.target && data.target.value ? data.target.value : null,
    )
  }
  const onChangeSavePassword = () => {
    setIsSavePass(!isSavePass)
  }

  const showHidePassword = () => {
    setShowHidePass(!isShowPass)
  }

  //************************

  const checkLength = value => {
    setErrorPass(value?.length < 6 && value.length > 0)
  }

  const {t} = useTranslation()
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

  useEffect(() => {
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])
  if (state && state.isLogin) {
    return <ControlPanel />
  }

  // const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false)
  // const [showLoginForm, setShowLoginForm] = useState(true)

  return (
    <LoginWrapper>
      <div
        className={width < 1200 ? 'login-form mini-login-form' : 'login-form'}
      >
        {/*<SnowLake/>*/}
        <div className={'group-login-form'}>
          <div className="group-logo">
            <img id={'logo-loginform'} src={'/img/logo.png'} alt={'logo'} />
          </div>
          <div className={'title-login-form'}>
            <p>Welcome to evoshop</p>
          </div>

          <div
            className="flex"
            style={{
              width: '100%',
              justifyContent: 'center',
              marginBottom: '25px',
            }}
          >
            <div className="flex">
              <Radio
                id="evoshop-radio"
                checked={option === 0}
                onClick={() => setOption(0)}
              />
              <Text
                as="label"
                htmlFor="evoshop-radio"
                style={{margin: '0 9px', cursor: 'pointer'}}
              >
                {t('account')} evoshop
              </Text>
            </div>
            <div className="flex">
              <Radio
                id="vippro-radio"
                checked={option === 1}
                onClick={() => setOption(1)}
              />{' '}
              <Text
                as="label"
                htmlFor="vippro-radio"
                style={{marginLeft: 9, cursor: 'pointer'}}
              >
                {t('customer')} VIP Pro
              </Text>
            </div>
          </div>

          {message ? (
            <div className={'error-all-form'}>
              <img
                id={'logo-error-all-form'}
                src={'/svg/error.svg'}
                alt={'icon-error'}
              />
              <p>{message}</p>
            </div>
          ) : null}

          {error ? (
            <div className={'error-all-form'}>
              <img
                id={'logo-error-all-form'}
                src={'/svg/error.svg'}
                alt={'icon-error'}
              />
              <p>{t('warning_form')}</p>
            </div>
          ) : null}

          <div className="user-name-field">
            <label for="username">{t('account')}</label>
            <input
              placeholder={t('placeholder_account')}
              tabIndex="1"
              className={
                (!username && firstTime) || message || error || isUsernameEmpty
                  ? 'border-red-input upos-text'
                  : 'upos-text'
              }
              value={username}
              onChange={e => {
                //reset summary error
                setMessage('')
                setError(false)
                setFirstTime(false)

                const value = e.target.value
                onChangeUserName(e)
                if (value?.trim()) setIsUsernameEmpty(false)
                else setIsUsernameEmpty(true)
              }}
              type={'text'}
              // placeholder={t('Username')}
              required={''}
              id={'username'}
              autoComplete={'on'}
              onBlur={e => {
                const value = e.target.value
                //check empty
                if (!value?.trim()) setIsUsernameEmpty(true)
              }}
              onFocus={e => {
                setIsUsernameEmpty(false)
              }}
            />
            {isUsernameEmpty && !error && (
              <div className={'password-message'}>
                {t('error_account_notify')}
              </div>
            )}
          </div>

          <div className={'password-field'}>
            <div className={'password-forgot'}>
              <label for={'password'}>{t('password')}</label>
            </div>
            <div className="group-inpput-login-form">
              <input
                placeholder={t('password')}
                tabIndex="2"
                className={
                  (!password && firstTime) || message || error || isEmpty
                    ? 'border-red-input upos-text'
                    : 'upos-text'
                }
                type={!isShowPass ? 'password' : 'text'}
                // placeholder={t('Password')}
                required={''}
                id={'password'}
                autoComplete={'on'}
                value={password}
                onChange={e => {
                  //reset summary error
                  setMessage('')
                  setError(false)
                  setFirstTime(false)

                  const value = e.target.value
                  if (value?.trim()) setIsEmpty(false)
                  else setIsEmpty(true)
                  checkPasswordVN(e.target.value)
                  onChangePassword(e)
                  // setErrorPass(false)
                  // checkLength(e.target.value)
                  // if (e.target.value.length >= 6) setPasswordNote(false)
                }}
                onBlur={e => {
                  !e.target.value.trim() && setIsEmpty(true)
                  // setPasswordNote(false)
                }}
                onFocus={e => {
                  // if (e.target.value.length < 6) setPasswordNote(true)
                  !e.target.value && setIsEmpty(false)
                }}
              />
              <img
                className={!isShowPass ? 'icon-hide-pass' : 'icon-show-pass'}
                src={!isShowPass ? '/svg/close-eye.svg' : '/svg/open-eye.svg'}
                onClick={() => showHidePassword(isShowPass)}
                alt={'icon'}
              />
            </div>
            <div className={'forgot-password-button cursor-pointer upos-text'}>
              <div className={'error-message-password'}>
                {isEmpty && !error && (
                  <div className={'password-message'}>
                    {t('error_password_notify')}
                  </div>
                )}
              </div>
              <div className={'link-forgot-password'}>
                <Link
                  to={'/forgot-password'}
                  tabIndex="3"
                  // onClick={() => {
                  //   setShowForgotPasswordForm(true)
                  //   setShowLoginForm(false)
                  // }}
                >
                  {t('forgot_password')}
                </Link>
                <Tooltip
                  title={
                    t('warning_forgot_password')
                  }
                  placement="bottom"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '5px',
                    }}
                  >
                    {ICONS.question}
                  </div>
                </Tooltip>
              </div>
            </div>
            {/* {errorPass && (
              <div className={'password-message'}>
                Mật khẩu cần có ít nhất 6 ký tự.
              </div>
            )} */}
            {/* {passwordNote && !errorPass && (
                  <div className="password-note">
                    Mật khẩu cần có ít nhất 6 ký tự.
                  </div>
                )} */}
            {/* {isVI && (
              <div className={'password-message'}>
                Mật khẩu đang chứa ký tự có dấu, vui lòng kiểm tra lại.
              </div>
            )} */}
          </div>
          {/* <div className={'save-password-field'}></div> */}
          <Button
            className={
              username && password
                ? // ? 'button-confirm button-confirm-active cursor-pointer'
                  'button-confirm cursor-pointer'
                : 'button-confirm cursor-pointer'
            }
            onClick={() => handleSubmit(setIsVI, setIsEmpty)} //login(username, password, isSavePass)}
            type="submit"
          >
            {loading ? (
              <img src={'/svg/loading.svg'} alt={'loading'} />
            ) : (
              t('Login')
            )}
          </Button>

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
            </div>
          </div>
        </div>
        <div className={'language-content'}>
          <LanguageSelect />
        </div>
        {/* <div className="info-address">
          <p>Công ty TNHH Evoshop Việt Nam</p>
          <p>Lầu 3A, 199 Điện Biên Phủ, phường 15, quận Bình Thạnh, Tp. HCM </p>
          <p>MST: 0316269247</p>
        </div> */}
      </div>
    </LoginWrapper>
  )
}
