import { Text } from '../../../../../../../common/text'
import styled from 'styled-components'
import React, { useContext } from 'react'
import { SaleOverviewContext } from '../../provider/_context'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import BgImage from './bg-top-revenue.png'
import { RateTag } from './rateTag'
import { Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const TopEmployee = () => {
  const { pageState } = useContext(SaleOverviewContext)
  const {t} = useTranslation()
  const { employees, loading } = pageState
  const nav = useNavigate()

  return (
    <StyledEmployee>
      {employees.length > 0 && !loading ?
        <>
          <div className={'employee-item'}>
            <div className={'employee-item__title'} onClick={() => nav('/report/sales/employee')}>
              <Text as={'a'} color={'#ffffff'} href={'/report/sales/employee'}>{REPORT_SALE_ICONS.employee} {t('excellent_employee')} </Text>
              {REPORT_SALE_ICONS.arrowRight}
            </div>
            <Text as={'p'} fontWeight={600} fontSize={18}
                  color={'#ffffff'}>{employees.length > 2 ? employees[0]?.name : '--'}</Text>
            <Text as={'p'} color={'#ffffff'}>{t('revenue')}: {formatMoney(employees.length > 2 ? employees[0]?.total_cod : 0)}</Text>
          </div>
          <div className={'employee-item'}>
            <div className={'employee-item__title'} onClick={() => nav('/report/sales/order-origin')}>
              <Text as={'a'} color={'#ffffff'} href={'/report/sales/order-origin'}>{REPORT_SALE_ICONS.orderOrigin} {t('order_origin_of_week')}</Text>
              {REPORT_SALE_ICONS.arrowRight}
            </div>
            <Text as={'p'} fontWeight={600} fontSize={18}
                  color={'#ffffff'}>{employees.length > 2 ? employees[1]?.name : '--'}</Text>
            <Text as={'p'} color={'#ffffff'}>
              {t('revenue')}: {formatMoney(employees.length > 2 ? employees[1]?.total_cod : 0)}
              {employees.length > 2 && <RateTag data={employees[1]}/>}
            </Text>
          </div>
          <div className={'employee-item'}>
            <div className={'employee-item__title'} onClick={() => nav('/report/sales/location')}>
              <Text as={'a'} color={'#ffffff'} href={'/report/sales/location'}>
                {REPORT_SALE_ICONS.location} {t('area_of_week')}
              </Text>
              {REPORT_SALE_ICONS.arrowRight}
            </div>
            <Text as={'p'} fontWeight={600} fontSize={18}
                  color={'#ffffff'}>{employees.length > 2 ? employees[2]?.name : '--'}</Text>
            <Text as={'p'} color={'#ffffff'}>
              {t('revenue')}: {formatMoney(employees.length > 2 ? employees[2]?.total_cod : 0)}
              {employees.length > 2 && <RateTag data={employees[2]}/>}
            </Text>
          </div>
        </>
        : !loading ? <EmptyContent/> : <LoadingContent/>
      }
    </StyledEmployee>
  )
}

const EmptyContent = () => {
  const {t} = useTranslation()

  return (
    <>
      <div className={'employee-item'}>
        <div className={'employee-item__title'}>
          <Text as={'a'} color={'#ffffff'}>{REPORT_SALE_ICONS.employee} {t('excellent_employee')}  </Text>
          {REPORT_SALE_ICONS.arrowRight}
        </div>
        <Text as={'p'} fontWeight={600} fontSize={18} color={'#ffffff'}>--</Text>
        <Text as={'p'} color={'#ffffff'}>{t('revenue')}: 0</Text>
      </div>
      <div className={'employee-item'}>
        <div className={'employee-item__title'}>
          <Text as={'a'} color={'#ffffff'}>{REPORT_SALE_ICONS.orderOrigin} {t('order_origin_of_week')}</Text>
          {REPORT_SALE_ICONS.arrowRight}
        </div>
        <Text as={'p'} fontWeight={600} fontSize={18} color={'#ffffff'}>--</Text>
        <Text as={'p'} color={'#ffffff'}>
          {t('revenue')}: 0
        </Text>
      </div>
      <div className={'employee-item'}>
        <div className={'employee-item__title'}>
          <Text as={'a'} color={'#ffffff'}>
            {REPORT_SALE_ICONS.location} {t('area_of_week')}
          </Text>
          {REPORT_SALE_ICONS.arrowRight}
        </div>
        <Text as={'p'} fontWeight={600} fontSize={18} color={'#ffffff'}>--</Text>
        <Text as={'p'} color={'#ffffff'}>
          {t('revenue')}: 0
        </Text>
      </div>
    </>
  )
}

const LoadingContent = () => (
  <>
    <div className={'employee-item'}>
      <div className={'employee-item__title'}>
        <Skeleton variant="text" width={195} height={24}/>
        {REPORT_SALE_ICONS.arrowRight}
      </div>
      <Skeleton variant="text" width={195} height={24}/>
      <Skeleton variant="text" width={195} height={29}/>
    </div>
    <div className={'employee-item'}>
      <div className={'employee-item__title'}>
        <Skeleton variant="text" width={195} height={24}/>
        {REPORT_SALE_ICONS.arrowRight}
      </div>
      <Skeleton variant="text" width={195} height={24}/>
      <Skeleton variant="text" width={195} height={29}/>
    </div>
    <div className={'employee-item'}>
      <div className={'employee-item__title'}>
        <Skeleton variant="text" width={195} height={24}/>
        {REPORT_SALE_ICONS.arrowRight}
      </div>
      <Skeleton variant="text" width={195} height={24}/>
      <Skeleton variant="text" width={195} height={29}/>
    </div>
  </>
)

const StyledEmployee = styled.div`
  padding: 24px 24px 0 24px;
  background: #1A94FF;
  border-radius: 8px;
  margin-right: 0;
  width: 24%;
  
  background-image: url(${BgImage});
  background-position-x: right;
  background-position-y: bottom;
  background-repeat: no-repeat;
  
  .employee-item{
    margin-bottom: 12px;
    padding-bottom: 16px;
    &__title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      cursor: pointer;
      svg{
        path{
          stroke: #ffffff;
        }
      }
    }
    p{
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }
    a{
      width: 100%!important;
      display: flex;
      align-items: center;
      svg{
        margin-right: 4px;
      }
    }
  }
  
  
  @media screen and (max-width: 1919px) {
    width: calc(50% - 12px);
    .employee-item{
      margin-bottom: 0;
      }
  }
`