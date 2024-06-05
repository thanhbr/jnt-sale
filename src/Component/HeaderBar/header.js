import {useEffect, useState} from 'react'
import ButtonSetting from '../BtnSetting/buttonSetting'
import Notification from '../Noti-comp/notification'
import Account from '../Account'
import UserInformation from '../UserInformation'
import cls from 'clsx'
import css from './index.module.scss'
import * as React from 'react'
import Popover from '@mui/material/Popover'
import useGlobalContext from '../../containerContext/storeContext'
import {QuickAccesses} from './_components'
import FeedBack from '../FeedBack'
import styled from 'styled-components'
import { LanguageSelect } from '../Language'

export default function Header() {
  const [state] = useGlobalContext()
  const [anchorEl, setAnchorEl] = useState()
  const handleThunder = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return state.isLogin ? (
    <div className={cls(css.wrapper)}>
      <div className={cls(css.left)}>
        {/*<StyleHeader>*/}
        {/*  <img className={'logo-tet'} src="/img/noel/hoamai.png" alt="logo"/>*/}
        {/*</StyleHeader>*/}
      </div>
      { state.user.package.is_update_address != "0" &&
      <div className={cls(css.right)}>
        <div className={cls(css.thunder)} data-active={open}>
          <svg
            aria-describedby={id}
            variant="contained"
            onClick={handleThunder}
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 4.5L19.5 4.5M16.5 10L21 10M14 15.5L19 15.5M6 19L12.5964 9.76499C12.8884 9.35624 13.0344 9.15187 13.0281 8.98147C13.0226 8.83312 12.9514 8.69489 12.8339 8.60418C12.6989 8.5 12.4478 8.5 11.9454 8.5L7 8.5L8 0.999999L1.40357 10.235C1.1116 10.6438 0.965619 10.8481 0.971938 11.0185C0.977439 11.1669 1.04858 11.3051 1.1661 11.3958C1.30108 11.5 1.55224 11.5 2.05455 11.5L7 11.5L6 19Z"
              stroke="#56697C"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{top: 18}}
          >
            <QuickAccesses />
          </Popover>
        </div>
        <ButtonSetting />
        <Notification />
        <LanguageSelect />
        <Account />
        <UserInformation />
        <FeedBack />
      </div>
    }
    </div>
  ) : null
}
const StyleHeader = styled.div`
  .logo-tet{
    height: 100%;
    position: absolute;
    left: 220px;
    top: 0px;
  }

`