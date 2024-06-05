import React, { useEffect, useState } from 'react'
import ReactImageFallback from 'react-image-fallback'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'
import { Tooltip as TooltipV2 } from '../../../../../../../common/tooltipv2'
import { Input } from '../../../../../../../common/form/input'
import { POS_ICON } from '../../../../../constants/icons'
import { CurrencyInput } from '../../../../../../../common/form/input/_currencyInput'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { Popper } from '../../../../../../../common/popper'
import { THEME_COLORS } from '../../../../../../../common/theme/_colors'
import { ORDER_SINGLE_ICONS } from '../../../../../../orderSingle/interface/_icons'
import { usePosSearchBox } from '../../../../../hooks/usePosSearchBox'
import { fNumber } from '../../../../../../../util/formatNumber'

export const ProductContent = ({
  data,
  rawData,
  quantity,
  onQuantityChange,
  onRowClick,
  ...props
}) => {
  const useData = usePosSearchBox()
  const priceType = useData.data.priceType
  const [value, setValue] = useState(quantity)

  const selectedPrice = Number(priceType == 1 ? rawData?.price : rawData?.data?.wholesale_price || 0)
  const calculateDiscountPrice =
    rawData?.discountType === 'đ'
      ? Number(rawData?.discount || 0)
      : (selectedPrice *
      Number(rawData?.quantity || 0) *
      Number(rawData?.discount || 0)) /
      100

  const finalPrice =
    rawData?.discountType === 'đ'
      ? selectedPrice * Number(rawData?.quantity || 0) -
      Number(rawData?.discount || 0)
      : (selectedPrice *
      Number(rawData?.quantity || 0) *
      (100 - Number(rawData?.discount || 0))) /
      100

  const handleInputChange = e => {
    let currentValue = e.target.value.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)
    if (onQuantityChange)
      onQuantityChange(data, {
        type: 'amount',
        amount: currentValue ? Number(currentValue) : '',
      })
  }

  const handlePriceChange = val => {
    let currentValue = val.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)

    if (onQuantityChange)
      onQuantityChange(data, {
        type: 'price',
        value: currentValue ? Number(currentValue) : '',
      })
  }

  const handleDiscountChange = val => {
    let currentValue = val.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)
    if ((!rawData?.discountType || rawData?.discountType == '%') && currentValue > 100) {
      currentValue = 100
    }

    if (onQuantityChange)
      onQuantityChange(data, {
        type: 'discount',
        value: currentValue ? Number(currentValue) : '',
        finalPrice: finalPrice
      })
  }

  const handleDiscountTypeChange = val =>
    !!onQuantityChange &&
    onQuantityChange(data, {
      type: 'discountType',
      value: val,
    })

  useEffect(() => setValue(quantity), [quantity])

  return (
    <div className={'order-content__table-row'} key={props.key} onClick={onRowClick}>
      <div className={'order-content__table-cell'}>
        <ReactImageFallback
          className="order-content__table-thumbnail"
          src={data?.image_thumb}
          fallbackImage='/img/product/list-default.png'
          alt={data?.product_name || 'thumbnail'}
        />
        <div style={{ width: 'calc(100% - 68px)' }}>
          <div className={'order-content__table-cell-name'}>
            <TooltipV2
              className="content-quick-product__tooltipv2"
              title={data?.product_name || '---'}
              placement="bottom-center"
              baseOn="height"
              >
              <Text as={'h6'} fontWeight={500}>{data?.product_name || '---'}</Text>
            </TooltipV2>
          </div>
          <div className={'order-content__table-cell-sku'}>
            <Tooltip className={'pos-product-sku__tooltipV2'}  title={`SKU: ${data?.sku || '---'}`} baseOn={'height'}>
              {`SKU: ${data?.sku  || '---'}`}
            </Tooltip>
            <Text fontWeight={500} fontSize={12}
                  lineHeight={'16px'}
                  className={'pos-product-inventory'}
                  style={{
                    background: data?.warehouse_quantity > 0 ? '#EFF3FB' : '#FF424E',
                    borderRadius: '50px',
                    padding: '0 6px'
                  }} color={data?.warehouse_quantity > 0 ? '#00081D' : '#ffffff'}>
              {fNumber(data?.warehouse_quantity)}</Text>
          </div>
        </div>
      </div>
      <div className={'order-content__table-cell'}>
        <Tooltip
          title={+quantity == 0 ? 'Số lượng sản phẩm cần ≥ 1' : +data?.warehouse_quantity == 0 ? `Sản phẩm này hiện tại đã hết hàng` : value > +data?.warehouse_quantity ? 'Số lượng bán cần ≤ Số lượng tồn kho' : ''}
          className={`--danger`} placement={'bottom'}>
          <Input
            icon={
              <div className="order-content__table-number-arrow">
                <i
                  data-disabled={(quantity > 9998 || value > Number(data?.warehouse_quantity))}
                  onClick={() =>
                    quantity < 9999 && value <= Number(data?.warehouse_quantity) &&
                    !!onQuantityChange &&
                    onQuantityChange(data, { type: 'increase' })
                  }
                >
                  {POS_ICON.caretUp}
                </i>
                <i
                  data-disabled={quantity <= 1}
                  onClick={() =>
                    quantity > 1 &&
                    !!onQuantityChange &&
                    onQuantityChange(data, { type: 'decrease' })
                  }
                >
                  {POS_ICON.caretUp}
                </i>
              </div>
            }
            // min={0}
            type="number"
            validateText={
              (+value === 0 ? ' ' : `   `)
            }
            validateType={
              +value === 0 || value > Number(data?.warehouse_quantity) ? 'danger' : 'default'
            }
            value={value}
            onChange={handleInputChange}
            onIconClick={() => {
            }}
          />
        </Tooltip>
      </div>
      <div className={'order-content__table-cell'}>
        <CurrencyInput
          defaultValue={selectedPrice}
          triggerDefault={selectedPrice}
          onChange={handlePriceChange}
          style={{ textAlign: 'right', ...props?.style }}
        />
      </div>
      <div className={'order-content__table-cell'}>
        <DiscountInput
          defaultValue={rawData?.discount || 0}
          triggerDefault={rawData?.triggerDefault}
          discountPrice={calculateDiscountPrice}
          typeValue={rawData?.discountType || '%'}
          warning={
            rawData?.discountType === 'đ'
              ? Number(rawData?.discount || 0) > selectedPrice * value
              : Number(rawData?.discount || 0) > 100
          }
          onChange={handleDiscountChange}
          onTypeChange={handleDiscountTypeChange}
        />
      </div>
      <div className={'order-content__table-cell'}>
        <Text as="b">{formatMoney(Math.max(finalPrice, 0))}</Text>
      </div>
      <div className="order-content__table-cell">
        <Tooltip placement="bottom" title="Xóa">
          <i
            style={{ cursor: 'pointer' }}
            onClick={() => onQuantityChange(data, { type: 'amount', amount: -1, delete: true })}
          >
            {POS_ICON.clearProduct}
          </i>
        </Tooltip>
      </div>
    </div>
  )
}

const DiscountInput = ({
  typeValue,
  discountPrice,
  warning,
  onTypeChange,
  ...props
}) => {
  const [isOpenType, setIsOpenType] = useState(false)

  const handleTypeChange = (val, { onClose }) => {
    onTypeChange(val)
    onClose()
    setIsOpenType(false)
  }

  return (
    <Tooltip
      className="--danger"
      placement="bottom"
      title={warning && !isOpenType ? 'Mức giảm giá cần ≤ Tổng tiền' : ''}
    >
      <CurrencyInput
        {...props}
        icon={
          <Popper
            renderPopper={({ onClose }) => (
              <div className="order-content__table-discount-type-dropdown-menu">
                {typeValue !== 'đ' && (
                  <div
                    className="order-content__table-discount-type-dropdown-menu-item"
                    style={{
                      color: THEME_COLORS.secondary_100,
                      textDecoration: 'underline',
                    }}
                    onClick={() => handleTypeChange('đ', { onClose })}
                  >
                    đ
                  </div>
                )}
                {typeValue !== '%' && (
                  <div
                    className="order-content__table-discount-type-dropdown-menu-item"
                    style={{ color: THEME_COLORS.secondary_100 }}
                    onClick={() => handleTypeChange('%', { onClose })}
                  >
                    %
                  </div>
                )}
              </div>
            )}
            renderToggle={({ open }) => (
              <div className="order-content__table-discount-type-dropdown-toggle">
                <Text as="b" color={THEME_COLORS.primary_300}>
                  {typeValue}{' '}
                  <i data-active={open}>{ORDER_SINGLE_ICONS.caretUp}</i>
                </Text>
              </div>
            )}
            popperProps={{ style: { padding: '4px 0' } }}
          />
        }
        validateText={
          typeValue === '%' && discountPrice && !isNaN(discountPrice) ? (
            `Giảm ${formatMoney(Math.max(discountPrice, 0))}`
          ) : warning ? (
            <></>
          ) : (
            ''
          )
        }
        validateProps={{ style: { left: 'unset', right: 0 } }}
        validateType={warning ? 'danger' : 'default'}
        style={{ zIndex: 1, textAlign: 'right', ...props?.style }}
        onIconClick={() => setIsOpenType(true)}
      />
    </Tooltip>
  )
}