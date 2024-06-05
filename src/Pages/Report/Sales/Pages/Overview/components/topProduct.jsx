import { Text } from '../../../../../../common/text'
import styled from 'styled-components'
import ReactImageFallback from 'react-image-fallback'
import React, { useContext } from 'react'
import { REPORT_SALE_ICONS } from '../../../interfaces/_icons'
import { SaleOverviewContext } from '../provider/_context'
import { fNumber } from '../../../../../../util/formatNumber'
import { formatMoney } from '../../../../../../util/functionUtil'
import Skeleton from '@mui/material/Skeleton'
import { Tooltip } from '../../../../../../common/tooltipv2'
import { useTranslation } from 'react-i18next'

export const TopProduct = () => {
  const {t} = useTranslation()
  const { pageState } = useContext(SaleOverviewContext)
  const { products, loading } = pageState

  return (
    <StyledProduct>
      <div className={'header-product'}>
        <Text as={'p'} color={'#151624'} fontWeight={600} fontSize={18} className={'header-content-left'}>{t('top-5-product')}</Text>
        <Text as={'a'} color={'#0052FF'} href={'/report/sales/product-revenue'} className={'header-content-right'}>{t('profit-detail')} {REPORT_SALE_ICONS.arrowRight}</Text>
      </div>
      <div className={'product-content'}>
        {
          products.length > 0 && !loading ?
            products.map((product, index) => (
              <div className="item-product">
                <div className="left-item">
                  <div className="stt-product">
                    <p className={`stt-${index + 1}`}>#{index + 1}</p>
                  </div>
                  <div className="info-product">
                    <div className="info-product__left">
                      <div className="img-content">
                        <ReactImageFallback
                          src={product?.image_thumb}
                          fallbackImage="/img/iconMenu/defaultAccount.png"
                          alt={'acc'}
                          className="product-image"
                        />
                      </div>
                      <div className="description-product">
                        <Text as={'p'} fontWeight={600}>
                          <Tooltip baseOn={'height'} className={'top-product__tooltipV2'} title={product?.product_name}>
                            {product?.product_name}
                          </Tooltip>
                        </Text>
                        <Text as={'p'} color={'#7C88A6'}>
                          <Tooltip baseOn={'height'} className={'top-product__tooltipV2'} title={`SKU: ${product.sku}`}>
                            SKU: {product.sku}
                          </Tooltip>
                        </Text>
                      </div>
                    </div>
                    <div className="top_price-product">
                      <Text as={'p'} fontWeight={600}>{t('quantity')}: {fNumber(product.total_quantity)}</Text>
                      <Text as={'p'}
                            color={'#7C88A6'}>{REPORT_SALE_ICONS.dollar}{formatMoney(product.total_price)}</Text>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : !loading ? <ProductEmpty/>
            : <ProductLoading/>
        }
      </div>
    </StyledProduct>
  )
}

const ProductEmpty = () => {
  const {t} = useTranslation()
  return (
    <div className="content-empty-products">
      <div className="img-content">
        <img src="/img/controlpanel/empty-state.svg" alt="empty -product"/>
      </div>
      <div className="span-content">
        <Text color={'#7C88A6'}>{t('product-empty')}</Text>
      </div>
    </div>
  )
}

const ProductLoading = () => {
  const SkelentonRows = Array.from(Array(5).keys())
  return (
    <>
      {SkelentonRows.map(i => (
        <div className="item-product">
          <div className="left-item">
            <div className="stt-product">
              <p className={`stt-${i + 1}`}>#{i + 1}</p>
            </div>
            <div className="info-product">
              <div className="info-product__left">
                <div className="img-content">
                  <Skeleton width={'100%'} height={'100%'}/>
                </div>
                <div className="description-product">
                  <Skeleton variant="text" width={100} height={20}/>
                  <Skeleton variant="text" width={100} height={20}/>
                </div>
              </div>
              <div className="top_price-product">
                <p>
                  <Skeleton variant="text" width={66} height={20}/>
                </p>
                <p>
                  <Skeleton variant="text" width={30} height={20}/>
                </p>
              </div>
            </div>
          </div>
        </div>

      ))}
    </>
  )
}

const StyledProduct = styled.div`
  padding: 24px;
  background: #FFFFFF;
  border-radius: 8px;
  width: 24%;
  margin-right: 24px;
  
  @media screen and (max-width: 1919px) {
    width: calc(50% - 12px);
  }
  .content-empty-products{
    padding-top: 3.25rem;
    text-align: center;
    height: 298px;
  }
  .item-product {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5em;
      height: 46px;

      .left-item {
        width: -webkit-fill-available;
        display: flex;
        align-items: center;

        .stt-product {
          p {
            font-weight: 600;
            font-size: 18px;
            line-height: 150%;
            margin-right: 1em;

            &.stt-1 {
              color: #1A94FF;
            }

            &.stt-2 {
              color: #00AB56;
            }

            &.stt-3 {
              color: #FF424E;
            }

            &.stt-4 {
              color: #FC820A;
            }

            &.stt-5 {
              color: #FFB700;
            }
          }
        }

        .info-product {
          display: flex;
          align-items: center;
          overflow: hidden !important;
          text-overflow: ellipsis;
          width: inherit;
          justify-content: space-between;
          p{
            width: 100%!important;
          }
          &__left{
            display: flex;
            align-items: center;
            width: 60%;
          }

          .img-content {
            width: 2em;
            height: 2em;
            margin-right: 0.625em;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .description-product {
            flex: 1;
            overflow: hidden !important;
            text-overflow: ellipsis;

            .name-product {
              font-weight: 600;
              font-size: 15px;
              line-height: 1.5em;
              color: #151624;
              display: inline-block;
              width: 100%;
              white-space: nowrap;
              overflow: hidden !important;
              text-overflow: ellipsis;
              margin-top: -2px;
            }

            .branch-product {
              font-weight: 400;
              font-size: 13px;
              line-height: 20px;
              color: #808089;
              margin-top: -2px;
              display: inline-block;
              width: 100%;
              white-space: nowrap;
              overflow: hidden !important;
              text-overflow: ellipsis;
            }
          }

          .top_price-product {
            flex: 1;
            font-weight: 600;
            font-size: 15px;
            line-height: 150%;
            text-align: right;
            color: #151624;
            width: 40%;
            p{
              display: flex;
              align-items: center;
              justify-content: flex-end;
              svg{
                margin-right: 4px;
              }
            }
          }
        }
      }

    }

    .item-product:last-child {
      margin-bottom: 0;
    }
    
    .header-product {
      padding: 0 !important;
      margin-bottom: 1.5em;
      display: flex;
      justify-content: space-between;
      align-items: start;

      .header-content-left {
        width: 60%!important;
      }

      .header-content-right {
        display: flex;
        align-items: center;
        a {
          display: flex;
          align-items: center;

          svg {
            margin-left: 10px;
          }
        }
      }
    }
    
  .top-product__tooltipV2 {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`