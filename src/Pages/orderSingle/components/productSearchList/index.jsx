import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import NumberUtils from 'Pages/orderSingle/utils/number'
import React from 'react'
import {formatMoney} from 'util/functionUtil'
import {StyledOrderSingleProductSearchList} from './_styled'
import ReactImageFallback from 'react-image-fallback'

export const OrderSingleProductSearchList = ({
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
    <StyledOrderSingleProductSearchList {...props}>
      {isLoading ? (
        <div className="order-single-product-search-list__loading">
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </div>
      ) : (
        <>
          <div className="order-single-product-search-list__list" >
            {data.map(item => (
              <Item
                key={item?.value}
                data={item}
                inventory={inventory}
                whole={whole}
                onClick={() => {
                  if (inventory) {
                    onSelect(item?.data, {
                      type: 'increase',
                      price: item?.data?.price,
                    })
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
        </>
      )}
    </StyledOrderSingleProductSearchList>
  )
}

const Item = ({data, inventory, whole, ...props}) => {

  const formatInventoryAmount = NumberUtils.format2DigitsNumber(
    data?.data?.warehouse_quantity,
  )

  return (
    <div
      {...props}
      className={`order-single-product-search-list__item auto-complete__option ${
        props?.className || ''
      }`}
    >
      <div className="order-single-product-search-list__banner">
        <ReactImageFallback
          src={data?.data?.image_thumb}
          fallbackImage='/img/product/default-product-thumbnail.png'
          alt={data?.name || 'thumbnail'}
        />
      </div>
      <div className="order-single-product-search-list__info">
        <div className="order-single-product-search-list__name">
          <Text style={{flex: 1}}>{data?.name || '---'}</Text>
          {!!inventory && (
            <Text>
              {formatMoney(
                whole ? data?.data?.wholesale_price : data?.data?.price,
              )}
            </Text>
          )}
        </div>
        {!!inventory && (
          <Text
            color={
              formatInventoryAmount !== '0' ? '#7C88A6' : THEME_SEMANTICS.failed
            }
          >
            Tồn kho: {formatInventoryAmount}
          </Text>
        )}
      </div>
    </div>
  )
}
