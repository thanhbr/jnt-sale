import styled from 'styled-components'
import { PRODUCT_REVENUE_ICONS } from '../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'
import { TopProductChart } from '../topProduct'
import React, { useContext } from 'react'
import { ProductRevenueContext } from '../../provider/_context'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Tooltip as TooltipV1 } from '../../../../../../../common/tooltip'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'

export const TopProductReport = () => {
  const {t} = useTranslation()
  const { pageState } = useContext(ProductRevenueContext)
  const { topProduct, loading } = pageState.table
  return (
    <StylePanel>
      <div style={{ paddingBottom: '16px' }}>
        <Text fontSize={18} fontWeight={600}>{t('report__top_3_product')}</Text>
      </div>
      <div className={'report-content'}>
        <div>
          <TopProductChart/>
        </div>
        <div className={'report-content__panel'}>
          {
            topProduct.length > 0 && loading ?
              topProduct.map((product, index) => (
                <div className={'report-content__panel-item'}>
                  <div className={'report-content__panel-icon'}>{PRODUCT_REVENUE_ICONS[`circle_${index + 1}`]}</div>
                  <div>
                    {product.product_model?.length < 15
                      ? <Text as={'p'} fontWeight={600} color={'#1A94FF'}>SKU: {product.product_model}</Text>
                      : <TooltipV1 title={`SKU: ${product.product_model}`}>
                        <Text as={'p'} fontWeight={600} color={'#1A94FF'}>SKU: {product.product_model?.substring(0, 15)+'...'}</Text>
                      </TooltipV1>
                    }
                    <Tooltip className={'report-content__tooltipV2'} baseOn={'height'} title={product.product_name}>
                      <Text as={'p'} color={'#7C88A6'} fontSize={13}>{product.product_name}</Text>
                    </Tooltip>
                  </div>
                </div>
              ))
              : loading ? <PanleEmpty/>
              : <PanlelLoading/>
          }
        </div>
      </div>
    </StylePanel>
  )
}

const PanleEmpty = () => (
  <>
    <div className={'report-content__panel-item'}>
      <div className={'report-content__panel-icon'}>{PRODUCT_REVENUE_ICONS.circle_1}</div>
      <div>
        <Text color={'#1A94FF'}>--</Text>
      </div>
    </div>
    <div className={'report-content__panel-item'}>
      <div className={'report-content__panel-icon'}>{PRODUCT_REVENUE_ICONS.circle_2}</div>
      <div>
        <Text color={'#1A94FF'}>--</Text>
      </div>
    </div>
    <div className={'report-content__panel-item'}>
      <div className={'report-content__panel-icon'}>{PRODUCT_REVENUE_ICONS.circle_3}</div>
      <div>
        <Text color={'#1A94FF'}>--</Text>
      </div>
    </div>
  </>
)

const PanlelLoading = () => (
  <>
    <div className={'report-content__panel-item'}>
      <div className={'report-content__panel-icon'}>{PRODUCT_REVENUE_ICONS.circle_1}</div>
      <div>
        <Text as={'p'} fontWeight={600} color={'#1A94FF'}>
          <Skeleton variant="text" height={23} width={120} />
        </Text>
        <Text as={'p'} color={'#7C88A6'} fontSize={13}>
          <Skeleton variant="text" height={23} width={120} />
        </Text>
      </div>
    </div>
    <div className={'report-content__panel-item'}>
      <div className={'report-content__panel-icon'}>{PRODUCT_REVENUE_ICONS.circle_2}</div>
      <div>
        <Text as={'p'} fontWeight={600} color={'#1A94FF'}>
          <Skeleton variant="text" height={23} width={120} />
        </Text>
        <Text as={'p'} color={'#7C88A6'} fontSize={13}>
          <Skeleton variant="text" height={23} width={120} />
        </Text>
      </div>
    </div>
    <div className={'report-content__panel-item'}>
      <div className={'report-content__panel-icon'}>{PRODUCT_REVENUE_ICONS.circle_3}</div>
      <div>
        <Text as={'p'} fontWeight={600} color={'#1A94FF'}>
          <Skeleton variant="text" height={23} width={120} />
        </Text>
        <Text as={'p'} color={'#7C88A6'} fontSize={13}>
          <Skeleton variant="text" height={23} width={120} />
        </Text>
      </div>
    </div>
  </>
)

const StylePanel = styled.div`

  width: calc(75% - 24px);
  .report-content{
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    height: 406px;
    &__panel{
      display: flex;
      align-items: center;
      background: #F8FAFD;
      border-radius: 0px 0px 8px 8px;
      padding: 22px 24px;
      &-icon{  
        margin-right: 16px;
      }
      &-item{
        width: 33.33%;
        display: flex;
        align-items: center;
      }
    }
    &__tooltipV2 {
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

`