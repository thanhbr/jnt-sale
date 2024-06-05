import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import NumberUtils from 'Pages/orderSingle/utils/number'
import React, {useState} from 'react'
import {formatMoney} from 'util/functionUtil'
import {StyledFacebookLivestreamScriptSingle_ProductSearchList} from './_styled'
import ReactImageFallback from "react-image-fallback";

export const FacebookLivestreamScriptSingle_ProductSearchList = ({
  data,
  defaultValue,
  whole,
  isLoading,
  isLoadMore,
  onClose,
  onSubmit,
  ...props
}) => {
  const [checkedList, setCheckedList] = useState(defaultValue || [])

  const handleCheckboxItemToggle = obj => {
    const find = checkedList.find(item => item?.value === obj?.value)
    setCheckedList(
      !!find
        ? checkedList.filter(item => item?.value !== obj?.value)
        : [...checkedList, obj],
    )
  }

  return (
    <StyledFacebookLivestreamScriptSingle_ProductSearchList {...props}>
      {isLoading ? (
        <div className="facebook-livestream-script-single-product-search-list__loading">
          <Spinner size={54} thickness={5} />
          <Text style={{marginTop: 5}}>Loading...</Text>
        </div>
      ) : (
        <div className="facebook-livestream-script-single-product-search-list__list">
          {data.map(item => (
            <Item
              key={item?.value}
              data={item}
              checked={!!checkedList.find(find => find?.value === item?.value)}
              whole={whole}
              onClick={() => handleCheckboxItemToggle(item)}
            />
          ))}
          {isLoadMore && (
            <div className="facebook-livestream-script-single-product-search-list__load-more">
              <Spinner size={48} thickness={4} />
            </div>
          )}
        </div>
      )}
      <div className="facebook-livestream-script-single-product-search-list__footer">
        <Button
          appearance="ghost"
          size="sm"
          style={{minWidth: 74}}
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          size="sm"
          style={{minWidth: 110, marginLeft: 8}}
          onClick={() => {
            if (onSubmit) onSubmit(checkedList)
            if (onClose) onClose()
          }}
        >
          Chọn
        </Button>
      </div>
    </StyledFacebookLivestreamScriptSingle_ProductSearchList>
  )
}

const Item = ({data, checked, whole, ...props}) => {
  const [imgSrc, setImgSrc] = useState(data?.data?.image_thumb)

  const handleImgError = () =>
    setImgSrc('/img/product/default-product-thumbnail.png')

  const formatInventoryAmount = NumberUtils.format2DigitsNumber(
    data?.data?.warehouse_quantity,
  )

  return (
    <div
      {...props}
      className={`facebook-livestream-script-single-product-search-list__item ${
        props?.className || ''
      }`}
    >
      <Checkbox checked={checked} />
      <div className="facebook-livestream-script-single-product-search-list__banner">
        <ReactImageFallback
            src={data?.data?.image_thumb}
            fallbackImage={'/img/product/default-product-thumbnail.png'}
            alt={data?.name || 'thumbnail'}
        />
      </div>
      <div className="facebook-livestream-script-single-product-search-list__info">
        <div className="facebook-livestream-script-single-product-search-list__name">
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
