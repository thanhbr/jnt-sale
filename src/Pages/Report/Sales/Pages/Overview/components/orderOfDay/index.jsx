import { Text } from '../../../../../../../common/text'
import styled from 'styled-components'
import React from 'react'
import AppCurrentVisits from './AppOrderRateByShipping'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const OrderOfDay = () => {
  const {t} = useTranslation()
  return (
    <StyledProduct>
      <div className={'header-order'}>
        <Text as={'p'} color={'#151624'} fontWeight={600} fontSize={18} className={'header-content-left'}>{t('order_overview_today')}</Text>
        <Text as={'a'} href={'/delivery-overview'} color={'#0052FF'} className={'header-content-right'}>{t('view_detail')} {REPORT_SALE_ICONS.arrowRight}</Text>
      </div>
      <div className={'order-content'}>
        <AppCurrentVisits/>
      </div>
    </StyledProduct>
  )
}

const StyledProduct = styled.div`
  padding: 24px;
  background: #FFFFFF;
  border-radius: 8px;
  width: calc(52% - 48px);
  margin-right: 24px;
  
  @media screen and (max-width: 1919px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 24px;
  }
  .header-order {
    padding: 0 !important;
    margin-bottom: 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-content-left {
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
      color: #151624;
    }

    .header-content-right {
      display: flex;
      align-items: center;
      a {
        display: flex;
        align-items: center;

        svg {
          margin-left: 4px;
        }
      }
    }
  }
`