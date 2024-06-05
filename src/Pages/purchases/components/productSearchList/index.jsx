import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import React, {useState} from 'react'
import {formatMoney} from 'util/functionUtil'
import {StyledProductSearchList} from './_styled'
import ReactImageFallback from 'react-image-fallback'

export const ProductSearchList = ({
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
    <StyledProductSearchList {...props}>
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
                onSelect(item?.data, {
                  type: 'increase',
                  price: item?.data?.supplier_price,
                })
                if (onClose) onClose()
              }}
            />
          ))}
          {/*{isLoadMore && (*/}
          {/*  <div className="order-single-product-search-list__load-more">*/}
          {/*    <Spinner size={48} thickness={4} />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      )}
    </StyledProductSearchList>
  )
}

const Item = ({data, inventory, whole, ...props}) => {
  const [imgSrc, setImgSrc] = useState(data?.data?.image_thumb)

  const handleImgError = () =>
    setImgSrc('/img/product/default-product-thumbnail.png')

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
          <Text>
            {formatMoney(
              data?.data?.supplier_price
            )}
          </Text>
        </div>
      </div>
    </div>
  )
}
