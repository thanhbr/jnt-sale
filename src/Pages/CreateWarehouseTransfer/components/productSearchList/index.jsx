import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import NumberUtils from 'Pages/CreateWarehouseTransfer/utils/number'
import React, {useState} from 'react'
import {formatMoney} from 'util/functionUtil'
import {StyledWarehouseTSProductSearchList} from './_styled'
import ReactImageFallback from 'react-image-fallback'

export const WarehouseTSProductSearchList = ({
  data,
  inventory,
  whole,
  isExistOriginData,
  isLoading,
  isLoadMore,
  onClose,
  onSelect,
  ...props
}) => {
  return (
    <StyledWarehouseTSProductSearchList {...props}>
      {isLoading ? (
        <div className="order-single-product-search-list__loading">
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </div>
      ) : (
        <div className="order-single-product-search-list__list">
          {data.map(item => (
            <Item
              key={item?.value}
              data={item}
              inventory={inventory}
              whole={whole}
              onClick={() => {
                if (inventory) {
                  onSelect(item?.data, {type: 'increase'})
                } else onSelect(item?.data, {type: 'increase'})
                if (onClose) onClose()
              }}
            />
          ))}
          {isLoadMore && (
            <div className="order-single-product-search-list__load-more">
              <Spinner size={48} thickness={4} />
            </div>
          )}
        </div>
      )}
    </StyledWarehouseTSProductSearchList>
  )
}

const Item = ({data, inventory, whole, ...props}) => {
  const [imgSrc, setImgSrc] = useState(data?.data?.image_thumb)

  const handleImgError = () =>
    setImgSrc('/img/product/default-product-thumbnail.png')

  const formatInventoryAmount = NumberUtils.format2DigitsNumber(
    data?.data?.warehouse_quantity,
  )

  const [sku, setSKU] = useState(data?.data?.sku)

  return (
    <div
      {...props}
      className={`order-single-product-search-list__item ${
        props?.className || ''
      }`}
    >
      <div className="order-single-product-search-list__banner">
        <ReactImageFallback
          src={imgSrc}
          fallbackImage='/img/product/default-product-thumbnail.png'
          alt={data?.name || 'thumbnail'}
        />
      </div>
      <div className="order-single-product-search-list__info">
        <div className="order-single-product-search-list__name">
          <Text style={{flex: 1}}>{data?.name || '---'}</Text>
        </div>
        <Text
          color={
            formatInventoryAmount !== '0' ? '#7C88A6' : THEME_SEMANTICS.failed
          }
        >
          <span style={{ textTransform: 'uppercase' }}>SKU: {sku}</span> | <span style={{ color: '#00081D' }}>Tồn kho: </span><span style={{ color: '#00081D', fontWeight: '600' }}>{formatInventoryAmount}</span>
        </Text>
      </div>
    </div>
  )
}
