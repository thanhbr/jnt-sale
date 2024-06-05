import styled from 'styled-components'
import { Text } from '../../../../../../../common/text'
import { PRODUCT_REVENUE_ICONS } from '../../interfaces/_icons'
import React, { useContext } from 'react'
import { ProductRevenueContext } from '../../provider/_context'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { Tooltip } from '../../../../../../../common/tooltip'
import { formatMoney } from '../../../../../../../util/functionUtil'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'

export const PanelProductReport = () => {
  const { pageState } = useContext(ProductRevenueContext)
  const { totals } = pageState.table.total
  const { loading } = pageState.table
  const {t} = useTranslation()

  return (
    <StylePanel>
      <div style={{ paddingBottom: '16px', background: '#ffffff' }}>
        <Text fontSize={18} fontWeight={600}>{t('overview')}</Text>
      </div>
      <div className={'panel-item'}>
        {!loading ?
          <PanelLoading/>
          : (
            <>
              <div>{PRODUCT_REVENUE_ICONS.sellAmount}</div>
              <Text as={'p'} class={'panel-item__middle'} color={'#7C88A6'}>
                <Text color={'#8D79F6'}
                      fontWeight={600}> {totals?.total_quantity || 0} </Text> {t('product')}</Text>
              <Text as={'p'} class={'panel-item__ended'} fontWeight={600}>{t('report__quantity_sold')}</Text>
            </>
          )
        }
      </div>
      <div className={'panel-item'}>
        {!loading ?
          <PanelLoading/>
          : (
            <>
              <div>{PRODUCT_REVENUE_ICONS.sellValue}</div>
              <Text as={'p'} class={'panel-item__middle'} color={'#FEBD38'} fontSize={18}
                    fontWeight={600}>{formatMoney(totals?.total_value || 0)}</Text>
              <Text as={'p'} class={'panel-item__ended'} fontWeight={600}>{t('report__sale_value')} <Tooltip
                title={t('report__sale_value_tooltip')}>{REPORT_SALE_ICONS.question}</Tooltip></Text>
            </>
          )
        }
      </div>
      <div className={'panel-item'}>
        {!loading ?
          <PanelLoading/>
          : (
            <>
              <div>{PRODUCT_REVENUE_ICONS.totalDiscount}</div>
              <Text as={'p'} class={'panel-item__middle'} color={'#4FBAF0'} fontSize={18}
                    fontWeight={600}>{formatMoney(totals?.total_discount || 0)}</Text>
              <Text as={'p'} class={'panel-item__ended'} fontWeight={600}>{t('report__total_discount_on_product')}</Text>
            </>)
        }
      </div>
    </StylePanel>
  )
}

const PanelLoading = () => (
  <>
    <Skeleton width={'24px'} height={31}/>
    <Skeleton variant="text" height={23} width={'120px'}/>
    <Skeleton variant="text" height={23} width={'120px'}/>
  </>
)

const StylePanel = styled.div`

  width: 25%;
  margin-right: 24px;
  .panel-item{
    padding: 23px 16px;
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    margin-bottom: 16px;
    &__middle{
      margin: 4px 0;
    }
    &__ended{
      display: flex;
      align-items: center;
      span{
        display: flex;
        align-items: center;
        margin-left: 4px;
      }
    }
    &:last-child{
      margin-bottom: 0px;
    }
  }

`