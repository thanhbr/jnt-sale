import ReactImageFallback from 'react-image-fallback'
import { Text } from '../../../../../common/text'
import { formatMoney } from '../../../../../util/functionUtil'
import { Tooltip } from '../../../../../common/tooltipv2'
import React from 'react'
import { usePosSearchBox } from '../../../hooks/usePosSearchBox'

export const QuickProductItem = ({ product, typeView, ...props }) => {

  const { data } = usePosSearchBox()
  const { productSearch } = data

  return (
    typeView == 1 ?
      <div className={'product-content'} onClick={e => {
        // e.stopPropagation()
        productSearch?.onChange(product?.data, {
          type: 'increase',
          price: data.priceType == 1 ? product?.data?.price : product?.data?.wholesale_price,
        })
      }}>
        <ReactImageFallback
          className="product-content__thumbnail"
          src={product.data?.image_thumb}
          fallbackImage='/img/product/grid-default.png'
          alt={product.data?.product_name || 'thumbnail'}
        />
        <div className={'product-content__background-bottom'}></div>
        <div className={'product-content__info'}>
          <Text fontWeight={600} fontSize={13} as={'p'} lineHeight={14}>{formatMoney(data.priceType == 1 ? product?.data?.price : product?.data?.wholesale_price || 0)}</Text>
          <Tooltip
            title={product.data?.product_name}
            placement="bottom-center"
            baseOn="height"
            className="content-quick-product__tooltipv2"
          >
            <Text lineHeight={11} fontSize={12} as={'p'}
                  style={{ width: '100%!important' }}>{product.data?.product_name}</Text>
          </Tooltip>
        </div>
        <div className={'product-content__inventory'}>
          <Text fontWeight={500} fontSize={12} style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50px',
            padding: '4px 6px'
          }}
                color={product?.data?.warehouse_quantity > 0 ? '#00081D' : 'red'}>{product?.data?.warehouse_quantity}</Text>
        </div>

      </div>
      :
      <div className={'product-content-list'} onClick={e => {
        // e.stopPropagation()
        productSearch?.onChange(product?.data, {
          type: 'increase',
          price: data.priceType == 1 ? product?.data?.price : product?.data?.wholesale_price,
        })
      }}>
        <div className={'product-content-list__thumbnail'}>
          <ReactImageFallback
            className="product-content-list__thumbnail-img"
            src={product.data?.image_thumb}
            fallbackImage='/img/product/list-default.png'
            alt={product.data?.product_name || 'thumbnail'}
          />
          <div className={'product-content-list__thumbnail-inventory'}>
            <Text fontWeight={500} fontSize={12} style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50px',
              padding: '4px 6px'
            }}
                  color={product?.data?.warehouse_quantity > 0 ? '#00081D' : 'red'}>{product?.data?.warehouse_quantity}</Text>
          </div>
        </div>
        <div className={'product-content-list__info'}>
          <Text fontWeight={600} fontSize={13} as={'p'} lineHeight={14}>{formatMoney(data.priceType == 1 ? product?.data?.price : product?.data?.wholesale_price || 0)}</Text>
          <Tooltip
            title={product.data?.product_name}
            placement="bottom-center"
            baseOn="height"
            className="content-quick-product__tooltipv2"
            style={{ marginBottom: '12px' }}
          >
            <Text lineHeight={11} fontSize={12} as={'p'}
                  style={{ width: '100%!important' }}>{product.data?.product_name}</Text>
          </Tooltip>
          <Tooltip
            title={product.data?.sku}
            placement="bottom-center"
            baseOn="height"
            className="content-quick-product__tooltipv2"
          >
            <Text lineHeight={11} fontSize={12} as={'p'}
                  style={{ width: '100%!important' }}>{product.data?.sku}</Text>
          </Tooltip>
        </div>

      </div>
  )
}
