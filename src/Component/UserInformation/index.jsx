import React, { memo, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { PATH } from '../../const/path'
import {Modal, Box}  from '@mui/material'
import Popover from '@mui/material/Popover'

import css from './index.module.scss'
import cls from 'clsx'
import Tab from './Tab'
import { general } from '../Account/account'
import { getUrlLogOut } from '../../api/url'
import { getData } from '../../api/api'
import useGlobalContext from '../../containerContext/storeContext'
import {CustomToolTip} from '../tooltip/CustomTooltip'
import {Button} from "../../common/button";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";


export default memo(function Index() {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [, setShowUser] = useState(false)
  const [avatar, ] = useState('')
  const [toggle, setToggle] = useState(false)
  const [bolUpdate, setBolUpdate] = useState(false)
  const [aniModalClose, setAniModalClose] = useState(false)
  const [state, dispatch] = useGlobalContext()
  const [tab, setTab] = useState('user')
  const data = state.user

  const handleClick = value => {
    setAnchorEl(null)
    switch (value) {
      case 'user_information': {
        setShowUser(true)
        setOpen(true)
        setAniModalClose(false)
        setTab('user')
        break
      }
      // case 'pack_information': {
      //   setShowUser(true)
      //   setOpen(true)
      //   setAniModalClose(false)
      //   setTab('user')
      //   break
      // }
      case 'change_password': {
        setShowUser(true)
        setOpen(true)
        setAniModalClose(false)
        setTab('password')
        break
      }
      case 'log_out': {
        const originOrderActive = JSON.parse(window.localStorage.getItem('origin_order_active'))
        window.localStorage.clear();
        if(!!originOrderActive && Array.isArray(originOrderActive)) window.localStorage.setItem('origin_order_active', JSON.stringify(originOrderActive))
        const url = getUrlLogOut()
        getData(url)
          .then(() => {
            dispatch({type: 'SET_LOGOUT'})
            dispatch({type: 'SET_USER', payload: {}})
            return <Navigate to={PATH.LOGIN} />
          })
          .catch(() => {
            console.log('error logout')
          })
        break
      }
      default:
        break
    }
  }
  const [anchorEl, setAnchorEl] = useState(null)
  const handleShowProfile = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const openProfile = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const isUpdate = bol => bol ? setBolUpdate(true) : setBolUpdate(false)
  // const url = getUrlUserInfo()
  // useEffect(() => {
  //   getData(url)
  //     .then(res => {
  //       if(res.status === 200){
  //         dispatch({ type: 'UPDATE_USER', payload: res.data })
  //       }
  //     })
  //     .catch(e => {
  //       UposLogFunc(`ERROR UPDATE PROFILE: ${e.message}`)
  //     })
  // }, [])

  useEffect(() => {
    window.addEventListener('click', function (e) {
      const isPopup = document.getElementById('btn_user_profile')?.contains(e.target)
      const isPopupBtn = document.getElementById('btn_duration')?.contains(e.target)
      if (!isPopup && !isPopupBtn){
        setToggle(false)
      }
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])

  return (
    <>
      <div className={cls(css.wrapper)} >
        <img aria-describedby={id}
             variant="contained"
             onClick={handleShowProfile}
             className={cls(css.icon_avatar)}
             src={(state.user && state.user.avatar) || '/img/iconMenu/defaultAvatar.png'}
             alt={'avatar'}
        />
        <Popover
          sx={{top: 14}}
          id={id}
          open={openProfile}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className={`${cls(css.account)}`}>
            <div className={cls(css.group)}>
              {avatar ? (<img src={avatar} alt={'avatar'}/>) : (<img src={'/img/iconMenu/defaultAccount.png'}  alt={'avatar'}/>)}
              <div className={cls(css.inner)}>
                <CustomToolTip title={
                  <p className={cls(css.name)}>{data.fullname}</p>
                } arrow >
                  <p className={cls(css.name)}>{data.fullname}</p>
                </CustomToolTip>
                <CustomToolTip title={
                  <p className={cls(css.email)}>{data.email}</p>
                } arrow >
                  <p className={cls(css.email)}>{data.email}</p>
                </CustomToolTip>
              </div>
            </div>
            <hr />
            <ul>
              {
                general.map((item) => {
                  return <li key={item.class}
                             className={cls(css[item.class])}
                             onClick={() => handleClick(item.value)}
                  >{t(item.label)}</li>
                })
              }
            </ul>
          </div>
        </Popover>
        <Modal
          open={open}
          onClose={() => {
            if(!bolUpdate) {
              setAniModalClose(true)
              setTimeout(() => {
                setOpen(false)
                setToggle(false)
              }, 300)
            } else {
              setConfirm(true)
            }
          }}
          id={'modal_user_profile'}
        >
          <Box className={`${cls(css.box_modal)} ${aniModalClose && cls(css.modal_custom)}`}>
            <div className={cls(css.dismiss)}
                 onClick={() => {
                   if(!bolUpdate) {
                     setAniModalClose(true)
                     setTimeout(() => {
                       setOpen(false)
                     }, 300)
                   } else {
                     setConfirm(true)
                   }
                 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="#F4F7FC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={cls(css.general)}>
              <img
                className={cls(css.bgp)}
                src={'/img/iconMenu/bgProfile.svg'}
                alt={'background'}
              />
              <div className={cls(css.grp_avatar)}>
                <img
                  className={cls(css.avatar)}
                  src={(state.user && state.user.avatar) || '/img/iconMenu/deAvatar.png'}
                  alt={'avatar'}
                />
              </div>
              <div className={cls(css.content)}>
                <div className={cls(css.info)}>
                  <CustomToolTip title={
                    <p className={cls(css.name)}>{data.fullname}</p>
                  } arrow >
                    <p className={cls(css.name)}>{data.fullname}</p>
                  </CustomToolTip>
                </div>
              </div>
              <Tab userProfile={data} tab={tab} isUpdate={isUpdate}/>
            </div>
          </Box>
        </Modal>

        <Modal
          open={confirm}
          onClose={() => {
            setConfirm(false)
          }}
          className={cls(css.modal_confirm)}
        >
          <Box className={cls(css.box_confirm)}>
            <div>
              <p>{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM_LEAVING_CONTENT)}</p>
              <div className={cls(css.grp_btn)}>
                <button className={cls(css.dismiss)}
                        onClick={() => {
                          setConfirm(false)
                        }}
                >
                  {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
                </button>
                <Button className={cls(css.save)}
                        onClick={() => {
                          setConfirm(false)
                          setAniModalClose(true)
                          setTimeout(() => {
                            setOpen(false)
                            setBolUpdate(false)
                          }, 300)
                        }}
                >{t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)}
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
})
