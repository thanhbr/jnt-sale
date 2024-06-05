import ReactImageFallback from 'react-image-fallback'
import React, { useState } from 'react'
import { Card, Button, Popover } from '@mui/material'
import useGlobalContext from '../../containerContext/storeContext'
import './index.scss'
import { calculateDate } from '../../util/functionUtil'
import { ICONS } from './icon'
import { Text } from '../../common/text'

export const PackageRenewal = () => {
  const [state,] = useGlobalContext()
  const [anchorEl, setAnchorEl] = useState()
  const handleOpen = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <div>
      <div className={'package-content'} onClick={handleOpen}
           style={{
             background: !!state.user?.package?.package_color ? `${state.user?.package?.package_color}` : 'linear-gradient(95.44deg, #F83684 -1.45%, #FE7269 75.75%)'
           }}>
        <div className="package-crown">
          {ICONS.crown}
        </div>
        <div className="package-info">
          <Text fontWeight={600} as={'p'} fontSize={13} color={'#ffffff'}
                lineHeight={'16px'}>{state.user?.package?.license_name}</Text>
          <Text as={'p'} color={'#ffffff'} fontSize={12}
                lineHeight={'16px'}>{calculateDate(state.user?.package?.expiration_date)}</Text>
        </div>
        <div className="package-medal">
          {ICONS.medal}
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ top: '4px' }}
      >
        <Card className="card-content__package">
          <div className="growth-card">
            <div className="growth-card__left">
              <Text as={'p'} fontSize={16} lineHeight={'21px'} fontWeight={300} className={'package-fullname'}>Xin
                chào {state.user?.fullname}!</Text>
              <Text as={'p'} fontSize={14} lineHeight={'20px'} className={'package-license_name'}>Gói
                cước <b>{state.user?.package?.license_name}</b> của bạn còn lại</Text>
              <Text as={'p'} fontSize={26} lineHeight={'36px'} className={'package-expiration_date'}
                    color={'#1E9A98'}>{calculateDate(state.user?.package?.expiration_date)}</Text>
              <Text as={'p'} fontSize={13} lineHeight={'20px'} className={'package-label-support'} color={'#808089'}>Bạn
                muốn được hỗ trợ?</Text>
              <div className="growth-card__left__items">
                <div className="growth-card__left__items-btn">
                  <Button href="https://upos.vn/vn/lien-he.html" target="_blank"
                          className="growth-card__left__items-btn-upgrade">Nâng cấp</Button>
                  <Button href="https://upos.vn/vn/lien-he.html" target="_blank"
                          className="growth-card__left__items-btn-extend">Gia hạn</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-reward">
            <ReactImageFallback
              src="/img/controlpanel/right_layout/award.svg"
              fallbackImage={'/'}
              alt="img bottm img"
              className="growth-card__award"
            />
          </div>
        </Card>
      </Popover>
    </div>
  )
}