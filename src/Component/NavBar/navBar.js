import React, { useContext, createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
import LoginForm from '../../Pages/LoginForm/login'
// import NotFound from "../../Pages/404/notFound";
import DefaultPage from '../../Pages/DefaultPage/defaultPage'

import ListMenu from '../ListMenu/listMenu'
import Header from '../HeaderBar/header'
import { PATH } from '../../const/path'
// import * as AUTH_ACTION from "./login-func";
import PrivateRoute from '../PrivateRouter/privateRouter'
import * as href from '../../api/url'
import { getData, sendRequest } from '../../api/api'
import { UposLogFunc } from '../../util/functionUtil'
// import {SaleByTime} from 'Pages/Report/Sales/components/SaleByTime/SaleByTime'
import SimpleBackdrop from 'Component/BackDrop/BackDrop'
import { privateRoutes, publicRoutes } from "../../routes";
import { Sidebar } from 'Component/sidebar'
import { Wrapper } from 'Component/wrapper'
import { FixedActionBtnGroup } from 'Component/fixedActionBtnGroup'
import useGlobalContext from '../../containerContext/storeContext'
import { Loading } from '../../common/loading'
import LoadDisconnectImage from 'Component/LoadDisconnectImage'
import NoConnection from 'Pages/noConnection'
import NotFound from 'Pages/404/index.'
import { SurveyLogin } from 'Component/surveyLogin'
import { Satellite } from '@material-ui/icons'
/**
 * -----------------------
 * handle auth here
 * create context and func
 * provide to all component
 * -----------------------
 */

/**
 * -----------------------
 * handle language here
 * create context and func
 * provide to all component
 * -----------------------
 */

const configContext = createContext()
// use this for provider childer if need
function ProvideConfig({ children }) {
  const config = useConfigProvide()
  return (
    <configContext.Provider value={config}>{children}</configContext.Provider>
  )
}

export function useConfigContext() {
  return useContext(configContext)
}

function useConfigProvide() {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState('vi')
  const [openMenu, setOpenMenu] = useState(true)
  const onChangeLanguage = param => {
    const activeLang = param || 'vi'
    if (lang === activeLang || !activeLang) return
    setLang(activeLang)
    i18n.changeLanguage(activeLang)
  }
  return {
    lang,
    openMenu,
    setOpenMenu,
    onChangeLanguage,
  }
}

/**
 * export default router
 * export UI Menu
 * export UI Header
 */

export default function AuthenticationRouter() {
  const [state, dispatch] = useGlobalContext()
  const { t } = useTranslation()
  const fakeDataUser = () => {
    dispatch({ type: 'SET_USER', payload: {} })
    dispatch({ type: 'SET_LOGIN' })
    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    window.addEventListener('offline', () => setIsOnline(false));
    window.addEventListener('online', () => setIsOnline(true));

    return () => {
      window.removeEventListener('offline', () => setIsOnline(true))
      window.removeEventListener('online', () => setIsOnline(true))
    }
  }, [])

  useEffect(() => {
    // fakeDataUser()
    const url = href.getUrlUserInfo()
    sendRequest('get', url)
      .then(res => {
        if (res && res.data && res.data.user_id) {
          dispatch({ type: 'SET_USER', payload: res.data })
          dispatch({ type: 'SET_LOGIN' })
          // UposLogFunc("Login Success" + JSON.stringify(res.data));
        }
        dispatch({ type: 'SET_LOADING', payload: false })
        // cns;
      })
      .catch(err => {
        UposLogFunc(
          `${'LOGIN ERROR: check AuthenticationRouter in NavBar, error: '}${err.message
          }`,
        )
        dispatch({ type: 'SET_USER', payload: {} })
        dispatch({ type: 'SET_LOGOUT' })
        dispatch({ type: 'SET_LOADING', payload: false })
      })
  }, [state.isLoading])
  const { isLogin } = state
  const renderNotification = () => {
    const { noti } = state
    const arrNoti = Object.keys(noti)
    if (arrNoti.length) {
      return (
        <div className="upos-noti-wrapper">
          {arrNoti.map((value, index) => {
            let path = null
            let closePath = null
            let content = t(value)
            switch (noti[value].icon) {
              case 'success':
                path = '/svg/success.svg'
                closePath = '/svg/x-blue.svg'
                break
              case 'fail':
                path = '/svg/caution.svg'
                closePath = '/svg/x-red.svg'
                break
              default:
                break
            }
            if (noti[value].prefix)
              content = `"${noti[value].prefix}" ${content}`
            if (noti[value].type) content = `${t(noti[value].type)} ${content}`
            if (noti[value].autoHide) {
              setTimeout(() => {
                dispatch({ type: 'DELETE_MESSAGE', payload: value })
              }, 4000)
            }
            return (
              <div
                key={uuidv4()}
                className={`upos-noti  ${noti[value].status}`}
              >
                <div className="upos-noti-main">
                  {path ? <img src={path} /> : null}
                  <div className="upos-text">{content}</div>
                  {closePath ? (
                    <img
                      className="notification-close"
                      onClick={() =>
                        dispatch({ type: 'DELETE_MESSAGE', payload: value })
                      }
                      src={closePath}
                    />
                  ) : null}
                </div>
                {noti[value].details ? (
                  <div className="notification-detail">
                    {noti[value].details.map((v, i) => (
                      <div key={uuidv4()} className="notification-row-details">
                        {v.sub ? (
                          <div className="notification-sub upos-text">
                            {`${v.sub || ''} : `}
                          </div>
                        ) : null}
                        <div className="notification-message upos-text">
                          {t(v.code)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )
    }
  }
  if (state.isLoading) {
    return <Loading/>
  }
  // if (state.isShowBackDrops) {
  //   return <SimpleBackdrop customeClassName="upos-simple-back-drops" status={true}/>
  // }
  const is_update_address = state.user.package ? state.user.package.is_update_address : '';
  return (
    <ProvideConfig>
      <Router>
          <LoadDisconnectImage />
          <Header />
          {state.isShowBackDrops ? (
            <SimpleBackdrop
              customeClassName="upos-simple-back-drops"
              status={true}
            />
          ) : null}
          <div className="main-content">
            <div
              className={
                state.inprogress
                  ? 'upos-loading-screen upos-overlay upos-text text-tur-dark upos-text-h1'
                  : 'upos-hide-item hidden-object'
              }
            >
              <div>Loading...</div>
              <img src="/svg/loading.svg" />
            </div>
            
            {(isLogin && is_update_address != "0") && <Sidebar />}
            {renderNotification()}
            {is_update_address != "0" && <FixedActionBtnGroup />}
            <Wrapper>
              {isOnline ? is_update_address != "0" ?
              <Routes>
                {/* public route here */}
                {publicRoutes.map((route, index) => {
                  const Page = route.component
                  return (
                    <Route path={route.path} key={index} element={<Page />}></Route>
                  )
                })}
                {/* default router */}
                {/* private router here */}
                <Route exact path='/' element={<PrivateRoute />}>
                  {privateRoutes.map((route, index) => {
                    const Page = route.component
                    return (
                      <Route exact key={index} path={route.path} element={<Page />} />
                    )
                  })}
                </Route>
                <Route element={<DefaultPage />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
                
                : <SurveyLogin dataForm={state.user} />
                : <NoConnection/>
              }
            </Wrapper>
          </div>
      </Router>
    </ProvideConfig>
  )
}
