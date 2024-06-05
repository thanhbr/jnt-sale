import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import React, {useContext, useState} from 'react'
import {StyledOrderSingleProductSearchList} from './_styled'
import {Tooltip} from "../../../../common/tooltipv2";
import {InventorySingleContext} from "../../provider/_context";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
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
        <div className="order-single-product-search-list__list">
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
      )}
    </StyledOrderSingleProductSearchList>
  )
}

const Item = ({data, inventory, whole, ...props}) => {
  const [imgSrc, setImgSrc] = useState(data?.data?.image_thumb)
  const {state} = useContext(InventorySingleContext)
  const {productInfo} = state.form;
  const selectedList = productInfo?.withInventoryConfig?.search?.selected
  const check = selectedList?.find(item=> +data?.data?.id === +item?.data?.id)
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
          <Tooltip className={'tooltip'} title={data?.name} baseOn={'height'}>
            <Text color={check && THEME_COLORS.primary_300  } style={{flex: 1}}>{data?.name || '---'}</Text>
          </Tooltip>
        </div>
        {!!inventory && (
            <>
              <div style={{display:'flex'}}>
                <Tooltip  className={'tooltip_sku'} title={data?.data?.sku} baseOn={'height'}>
                  <Text color={'#7C88A6'}>SKU: {data?.data?.sku} </Text>
                </Tooltip>
                <Text>
                  Tồn kho: <Text fontWeight={600}  color={
                  data?.data?.warehouse_quantity !== '0' ? '#00081D' : THEME_SEMANTICS.failed
                }>{data?.data?.warehouse_quantity}</Text>
                </Text>
              </div>

            </>

        )}
      </div>
    </div>
  )
}
