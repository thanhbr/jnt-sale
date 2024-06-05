import styled from 'styled-components'
import React, { useContext } from 'react'
import AppCurrentVisits from './AppOrderRateByShipping'
import { ProductRevenueContext } from '../../provider/_context'
import { Text } from '../../../../../../../common/text'
import Skeleton from '@mui/material/Skeleton'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { useTranslation } from 'react-i18next'

export const TopProductChart = () => {

  const { pageState } = useContext(ProductRevenueContext)
  const {t} = useTranslation()
  const { sortBy } = pageState.filter
  const { topProduct, total, loading } = pageState.table
  const { totals_other } = total
  const totalTopQuantity = topProduct.length > 0 ? topProduct.reduce((total,product) => total + Number(product?.total_quantity), 0) : 0
  const totalQuantity = topProduct.length > 0 ? totalTopQuantity + Number(totals_other?.total_quantity) : 0
  const totalOtherQuantity = topProduct.length > 0 ? 100 - Math.ceil(totalTopQuantity*100/totalQuantity) : 0
  const Quantity = [...topProduct.map(product => +product?.total_quantity), totals_other?.total_quantity]
  const QuantityRate = [...topProduct.map(product => (+product?.total_quantity/+totalQuantity)*100), totalOtherQuantity]

  const totalTopPrice = topProduct.length > 0 ? topProduct.reduce((total,product) => total + +product[`${sortBy.value}`], 0)  : 0
  const totalPrice = topProduct.length > 0 ? totalTopPrice + Number(totals_other[`total_${sortBy.value}`]) : 0
  const totalOtherPrice = topProduct.length > 0 ? 100 - Math.ceil(totalTopPrice*100/totalPrice) : 0
  const revenueRate = [...topProduct.map(product => (+product[`${sortBy.value}`]/totalPrice)*100), totalOtherPrice]
  const revenue = [...topProduct.map(product => +product[`${sortBy.value}`]), totals_other[`total_${sortBy.value}`]]
  return (
    <StyledProduct>
      {topProduct.length > 0 && loading ?
        <>
          <AppCurrentVisits label={t('report__quantity_rate')} chartRate={QuantityRate} chartData={Quantity} quantity={true}/>
          <AppCurrentVisits
            label={<Text>{t('report__rate_by')} <Text style={{ textTransform: 'lowercase' }}>{sortBy?.name}</Text></Text>}
            quantity={false}
            chartRate={revenueRate}
            chartData={revenue}/>
        </>
        : loading ? <ContentEmpty sortBy={sortBy}/>
          : <ContentLoading/>
      }
    </StyledProduct>
  )
}

const ContentEmpty = ({sortBy,...props}) => {
  const {t} = useTranslation()

  return (
    <div className={'content-loading'}>
      <div className="content-loading__item" style={{marginBottom: '16px'}}>
        <div className={'content-chart__empty'}>
          <img src="/img/report/empty-chart-product.png" alt="loading"/>
          <div className={'content-chart__empty-text'}>
            <Text as={'p'} fontSize={20} fontWeight={600}>0</Text>
            <Text as={'p'} color={'#7C88A6'}>{t('product')}</Text>
          </div>
        </div>
        <div className={'content-chart__empty'}>
          <img src="/img/report/empty-chart-product.png" alt="loading"/>
          <div className={'content-chart__empty-text'}>
            <Text as={'p'} fontSize={20} fontWeight={600}>{formatMoney(0)}</Text>
          </div>
        </div>
      </div>
      <div className="content-loading__item" >
        <div className={'content-chart__loading'}>
          <Text>{t('report__quantity_rate')}</Text>
        </div>
        <div className={'content-chart__loading'}>
          <Text>{t('report__rate_by')} <Text style={{ textTransform: 'lowercase' }}>{t(sortBy?.name)}</Text></Text>
        </div>
      </div>
    </div>
  )
}

const ContentLoading = () => (
  <div className={'content-loading'}>
    <div className="content-loading__item">
      <div className={'content-chart__loading'}>
        <img src="/img/report/loading-chart-product.png" alt="loading"/>
      </div>
      <div className={'content-chart__loading'}>
        <img src="/img/report/loading-chart-product.png" alt="loading"/>
      </div>
    </div>
    <div className="content-loading__item">
      <div className={'content-chart__loading'}>
        <Skeleton variant="text" height={23} width={'15%'} />
      </div>
      <div className={'content-chart__loading'}>
        <Skeleton className={'content-chart__loading-title'} variant="text" height={23} width={'15%'} />
      </div>
    </div>
  </div>
)

const StyledProduct = styled.div`
  background: #FFFFFF;
  height: 272px;
  display: flex;
  align-items: center;
  margin: 24px 0;
  .content-chart{
    width: 50%;
  }
  .content-loading{
    width: 100%;
    &__item{
      display: flex;
      align-items: center;
    }
  }
  .content-chart__loading{
    width: 50%;
    display: flex;
    justify-content: center;
    &-title{
      margin-top: 24px;
    }
  }
  .content-chart__empty{
    width: 50%;
    display: flex;
    justify-content: center;
    position: revert;
    align-items: center;
    &-title{
      margin-top: 24px;
    }
    &-text{
      text-align: center;
      position: absolute;
      p{
        width: 100%!important;
      }
    }
  }
`