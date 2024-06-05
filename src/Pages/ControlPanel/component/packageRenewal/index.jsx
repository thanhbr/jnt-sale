import React from 'react'
import { Card,Button } from '@mui/material'
import useGlobalContext from '../../../../containerContext/storeContext'
import './index.scss'
import { Text } from '../../../../common/text'
import WarningTracking from '../bannerBottomRight/index'
import { useTranslation } from 'react-i18next'

export default function ({startTime,endTime}) {
  const {t} = useTranslation()
  const [state,] = useGlobalContext()
  return (
    <Card className="card-content content-shipping-tracking">
      <div className="header-tracking">
        <div className="header-content-left">
          <Text color={'#ffffff'} fontSize={16} fontWeight={600} >{t('check_abnormal_order')}</Text>
        </div>
      </div>
      <div className="growth-card">
        <div className="growth-card__left">
          <div className="growth-card__left__items">
            <Text color={'#ffffff'} fontWeight={400} >{t('check_abnormal_order_notify')}</Text>
          </div>
        </div>
      </div>
      <div className="header-content-right">
        <Text as={'a'}
              href={'/delivery/management?datetype=created&downtime=3'} target={'_blank'}
              color={'#ffffff'} fontSize={'13px'} lineHeight={'150%'}
              style={{
                marginRight: '0.5rem', border: '1px solid #FFFFFF',
                borderRadius: '4px', padding: '4px 16px',
              }}
        >{t('view_detail')}</Text>
      </div>
      <WarningTracking
        startTime={startTime}
        endTime={endTime}
      />
    </Card>
  )
}