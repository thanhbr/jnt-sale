import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import NumberUtils from 'Pages/orderSingle/utils/number'
import {useState} from 'react'
import styled from 'styled-components'
import {formatMoney} from 'util/functionUtil'

export const ProductSearchList = ({
  data,
  defaultValue,
  whole,
  isLoading,
  isLoadMore,
  onClose,
  onSubmit,
  ...props
}) => {
  const handleCheckboxItemToggle = obj => {
    if (onSubmit) onSubmit(obj, 'increase')
    if (onClose) onClose()
  }

  return (
    <StyledProductSearchList {...props}>
      {isLoading ? (
        <div className="product-search-list__loading">
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </div>
      ) : (
        <div className="product-search-list__list">
          {data.map(item => (
            <Item
              key={item?.value}
              data={item}
              whole={whole}
              onClick={() => handleCheckboxItemToggle(item)}
            />
          ))}
          {isLoadMore && (
            <div className="product-search-list__load-more">
              <Spinner size={48} thickness={4} />
            </div>
          )}
        </div>
      )}
    </StyledProductSearchList>
  )
}

const Item = ({data, whole, ...props}) => {
  const [imgSrc, setImgSrc] = useState(data?.data?.image_thumb)

  const handleImgError = () =>
    setImgSrc('/img/product/default-product-thumbnail.png')

  const formatInventoryAmount = NumberUtils.format2DigitsNumber(
    data?.data?.warehouse_quantity,
  )

  return (
    <div
      {...props}
      className={`product-search-list__item ${props?.className || ''}`}
    >
      <div className="product-search-list__banner">
        <img
          alt={data?.name || 'thumbnail'}
          src={imgSrc}
          onError={handleImgError}
        />
      </div>
      <div className="product-search-list__info">
        <div className="product-search-list__name">
          <Text style={{flex: 1}}>{data?.name || '---'}</Text>
          <Text>
            {formatMoney(
              whole ? data?.data?.wholesale_price : data?.data?.price,
            )}
          </Text>
        </div>
        <Text
          color={
            formatInventoryAmount !== '0' ? '#7C88A6' : THEME_SEMANTICS.failed
          }
        >
          Tồn kho: {formatInventoryAmount}
        </Text>
      </div>
    </div>
  )
}

const StyledProductSearchList = styled.div`
  .product-search-list {
    &__footer {
      position: sticky;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      background: #fff;

      transform: translateY(12px);
    }

    &__loading {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__load-more {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__item {
      margin-bottom: 16px;

      display: flex;
      align-items: center;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__banner {
      width: 48px;
      height: 48px;
      margin: 0 16px 0 0;

      overflow: hidden;

      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
      }
    }

    &__info {
      flex: 1;
    }

    &__name {
      display: flex;
      justify-content: space-between;
    }

    &__empty {
      min-height: 300px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`
