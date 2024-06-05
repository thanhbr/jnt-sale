import React, {
  Suspense,
  useState,
  useLayoutEffect,
} from 'react'
import {useTranslation} from 'react-i18next'
import './LoginForm.css'

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

export default function LoginWrapper(props) {
  const {notify} = props

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
  return (
    <Suspense fallback={'loading'}>
      <div className={width < 1200 ? 'Mini-Login-Wrapper' : 'Login-Wrapper'}>
        <div className={width < 1200 ? 'intro mini-intro' : 'intro'}></div>
        {props.children}
        <div
          className={`login-header success-reset-pass hide ${
            notify?.active ? 'fadeInRight' : 'fadeInLeft'
          }`}
        >
          <img src={'/svg/CheckCircle.svg'} alt="" />
          <p>{notify?.message}</p>
        </div>
      </div>
    </Suspense>
  )
}
