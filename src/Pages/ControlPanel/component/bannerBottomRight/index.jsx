import './index.scss'
import React, { useEffect, useState } from 'react'
import { Text } from '../../../../common/text'
import { getData, sendRequestAuth } from '../../../../api/api'
import config from '../../../../config'
import { ICON_DASH_BOARD } from '../../interface/icons'
import { Tooltip } from '../../../../common/tooltipv2'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export default function ({ startTime, endTime }) {

  const { t } = useTranslation()
  // const [warningPackage, setWarningPackage] = useState(() => window.localStorage.getItem('warning_package') ? JSON.parse(window.localStorage.getItem('warning_package')) : [])
  const [warningPackage, setWarningPackage] = useState([])
  const [statusWarning, setStatusWarning] = useState(0)

  const cellCodeOrderFormatDateTime = dateTimeParam => {
    const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
    const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
    const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
    const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
    const hm = `${hms[0]}:${hms[1]}`
    return `${dmy} ${hm}`.trim()
  }
  const getWarningDelivery = async (unresolved = 0) => {
    const response = await sendRequestAuth('get',
      `${config.API}/dashboard/warning?unresolved=${unresolved}`
    )
    if (response.data?.success) {
      setWarningPackage(response.data?.data)
      // window.localStorage.setItem('warning_package', JSON.stringify(response.data?.data))
    }
  }
  const handleTabWarningTracking = status => {
    setStatusWarning(status)
    getWarningDelivery(status)
  }
  useEffect(() => {
    getWarningDelivery()
  }, [startTime])
  return (
    <Styled>
      <div className='bannerBottom__main'>
        <div className="header-warning-tracking">
          <div className="header-content-left">
            <Text as={'a'} href={'/shipping-trackings'} target={'_blank'}
                  color={'#ffffff'} fontSize={16} fontWeight={700}
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
            >
              {t('shipping_tracking')} &nbsp;
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15.5L12.5 10.5L7.5 5.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Text>
          </div>
          <div className="header-warning-tracking__right">
            <Text as={'p'} color={'#ffffff'} fontSize={14}
                  className={'header-warning-tracking__tab'}
                  data-active={statusWarning == 0 ? true : false}
                  onClick={() => statusWarning == 0 ? '' : handleTabWarningTracking(0)}
            >{t('all')}</Text>
            <Text as={'p'} color={'#ffffff'} fontSize={14}
                  className={'header-warning-tracking__tab'}
                  data-active={statusWarning == 1 ? true : false}
                  onClick={() => statusWarning == 1 ? '' : handleTabWarningTracking(1)}
            >{t('pending')}</Text>
          </div>
        </div>
        {warningPackage?.length > 0
          ?
          <div className="content-warning-tracking common-scrollbar">
            {
              warningPackage.map((item, index) =>
                <div className="content-warning-tracking__item" key={index}>
                  <Text as={'a'}
                        href={`/shipping-trackings?keyword=${item.billcode}`}
                        className={'content-warning-tracking__item-a'}
                        target={'_blank'}>{item?.problem_solving_status == 1 ? ICON_DASH_BOARD.solving : ICON_DASH_BOARD.unSolving}</Text>
                  <div className="left-content">
                    <Text as={'p'} color={'#151624'} fontSize={12} fontWeight={600}>
                      {t('shipping_label')}<Text color={'#1A94FF'}
                                    fontSize={12}
                                    fontWeight={600}
                                    as={'a'} href={`/shipping-trackings?keyword=${item.billcode}`}
                                    target={'_blank'}
                    >{item.billcode}</Text></Text>
                    <Tooltip baseOn={'height'} title={item.problem_reason} className={'reason-order-tooltip'}>
                      <Text as={'p'} fontSize={14} color={'##040711'} style={{ marginBottom: '8px' }}>{t('reason')}: {item.problem_reason}</Text>
                    </Tooltip>
                    <Text as={'p'} color={'#7C88A6'} fontSize={'12px'} lineHeight={'17px'}
                          className={'update-time'}>
                      {t('updated_date')}: {cellCodeOrderFormatDateTime(item.ship_updated)} </Text>
                  </div>
                </div>
              )
            }
          </div>
          :
          <div className={'warning-empty'}>
            <div className={'warning-empty__item'}>
              <img src="/img/controlpanel/empty-warning.png" alt="empty warning"/>
              <Text as={'p'} fontSize={14} color={'#ffffff'}
                    style={{width: '100%!important'}}>{t('notify_emty_shipping_tracking')}</Text>
            </div>
          </div>
        }
      </div>
    </Styled>
  )
}

const Styled = styled.div`
  .warning-empty{
    &__item{
      text-align: center;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
  }
  .reason-order-tooltip{
      max-width: 100%;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .left-content{
    height: 63px;
  }
  .header-warning-tracking{
    &__right {
      display: flex;
      align-items: center;
    }
    &__tab{
      border-radius: 60px;
      padding: 2px 12px;
      cursor:pointer;
      &[data-active=true]{
          font-weight: 700!important;
          background: rgba(255, 255, 255, 0.2);
      }
      :hover{
       background: rgba(255, 255, 255, 0.2);
      }
    }
  }
  .content-warning-tracking__item-a{
    margin-right: 8px;
  }
`