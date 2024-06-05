import { Input } from 'common/form/input'
import { CurrencyInput } from 'common/form/input/_currencyInput'
import { Popper } from 'common/popper'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Tooltip } from 'common/tooltip'
import { ORDER_SINGLE_ICONS } from 'Pages/orderSingle/interface/_icons'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { formatMoney, replaceAllCustom } from 'util/functionUtil'
import { StyledOrderSingleProductTable } from './_styled'
import { fNumber } from '../../../../../util/formatNumber'
import { orderSingleAction } from '../../../provider/_actions'
import { OrderSingleContext } from '../../../provider/_context'
import useOrderSingleShippingInfo from '../../../hooks/useOrderSingleShippingInfo'
import ReactImageFallback from 'react-image-fallback'
import {transformMoneyToSendRequest} from "../../../utils/transform";

export const OrderEditSingleProductTable = ({
  discount,
  paid,
  inventory,
  list,
  whole,
  payment,
  onQuantityChange,
  onTotalDiscountChange,
  ...props
}) => {

  const {methods} = useOrderSingleShippingInfo()
  const totalQuantity = list.reduce(
    (p, n, i) => p + Number(list[i]?.quantity || 0),
    0,
  )
  const statusOrder = location.pathname.split('/')[2]

  const tmpPrice = list.reduce((p, n, i) => {
    const itemPrice =
      Number(
        whole && inventory
          ? list[i]?.wholesale_price || 0
          : list[i]?.price || 0,
      ) * Number(list[i]?.quantity || 0)

    return p + itemPrice
  }, 0)

  const tmpDiscount = list.reduce((p, n, i) => {
    const itemDiscount =
      list[i]?.discountType === 'đ'
        ? Number(list[i]?.discount || 0)
        : ((Number(
        whole && inventory
          ? list[i]?.data?.wholesale_price || 0
          : list[i]?.price || 0,
        ) *
        Number(list[i]?.discount_value || 0)) /
        100) *
        Number(list[i]?.quantity || 0)

    return p + itemDiscount
  }, 0)

  const haveToPay =
    discount?.type === 'đ'
      ? tmpPrice - tmpDiscount - Number(transformMoneyToSendRequest(discount?.value) || 0)
      : ((tmpPrice - tmpDiscount) * (100 - Number(transformMoneyToSendRequest(discount?.value) || 0))) / 100

  const checkoutFigure = inventory
    ? [
      {
        id: 1,
        name: `Tạm tính (${
          totalQuantity < 10 ? `0${totalQuantity}` : totalQuantity
        } sản phẩm)`,
        type: 'text',
        value: formatMoney(tmpPrice),
      },
      {
        id: 2,
        name: 'Giảm giá sản phẩm',
        type: 'text',
        value: formatMoney(tmpDiscount),
      },
      {
        id: 3,
        name: 'Giảm giá trên tổng đơn',
        type: 'input',
        data: { discount, onChange: onTotalDiscountChange },
        props: { warning: haveToPay < 0 },
      },
      {
        id: 4,
        name: 'Khách cần trả',
        type: 'text',
        value: formatMoney((+haveToPay < 0 || isNaN(haveToPay) || tmpDiscount > tmpPrice) ? 0 : haveToPay),
        nameProps: {
          fontWeight: 600,
          color: '#00081D'
        },
        priceProps: {
          fontWeight: 600,
          color: '#00081D'
        },
      },
      {
        id: 5,
        name: 'paid_short',
        type: 'text',
        value: formatMoney(paid),
        nameProps: {
          color: '#00AB56'
        },
        priceProps: {
          color: '#00AB56'
        },
      },
    ]
    : []

  const { state, dispatch } = useContext(OrderSingleContext)

  const paymentMoney = state?.form?.paymentMethod?.money?.value
  useEffect(() => {
    const moneyPM = replaceAllCustom(paymentMoney || '', ',', '')
    const paid = state.field_paid
    const money = (haveToPay - (+paid)) < 0 ? 0 : haveToPay - (+paid)
    // const money = (haveToPay - (+moneyPM) - (+paid)) < 0 ? 0 : haveToPay - (+moneyPM) - (+paid)
    const result = fNumber(money.toString().replace(/[^0-9]/g, ''))
    dispatch({
      type: orderSingleAction.UPDATE_SHIPPING_INFO,
      payload: {
        // collectMoney: result
        collectMoney: +state.priceOrder.init
          ? fNumber(state.priceOrder.cod_amount.toString().replace(/[^0-9]/g, ''))
          : result
      },
    })
    dispatch({ type: 'UPDATE_COLLECT_TRIGGER', payload: !state.triggerCollectDefault })
  }, [haveToPay, paymentMoney])

  useEffect(() => {
    if (payment?.type == 'before')
      dispatch({
        type: orderSingleAction.FORM_PAYMENT_MONEY_UPDATE,
        payload: { value: fNumber(haveToPay) },
      })

    // calculate weight
    const weightTotal = list.reduce((p, n) => {
      const itemDiscount = n?.data?.weight ? ((n?.data?.weight_unit === 'g' ? +n?.data?.weight : +n?.data?.weight * 1000) * +n?.quantity) : 0
      return p + itemDiscount
    }, 0)
    const listPartner = state?.form?.shippingInfo?.shippingPartner // A Cường thêm logic
    const hasChangeWeight = state?.form?.shippingInfo?.changeWeight
    if(hasChangeWeight) methods.onChangeWeight(weightTotal / 1000 || 1 , {listPartner : listPartner?.list?.length > 0 ? listPartner : {}})
    // end calculate weight

    if(!!listPartner?.selected) {
      const partnerActive = listPartner?.list?.find(item => item?.id === listPartner?.selected)
      if(!!partnerActive && partnerActive?.config?.cargoInsurrance?.active || +listPartner?.selected === 2) {
        methods?.setValueCargoInsurrance(haveToPay, +partnerActive?.id - 1)
      }
    }

  }, [haveToPay])
  return (
    <StyledOrderSingleProductTable {...props}>
      {list.length > 0 ? (
        <>
          <div
            className="order-single-product-table__table"
            data-inventory={inventory}
          >
            <div className="order-single-product-table__thead">
              <div className="order-single-product-table__tr">
                <div className="order-single-product-table__th">
                  Tên sản phẩm
                </div>
                <div className="order-single-product-table__th">Số lượng</div>
                {!!inventory && (
                  <>
                    <div className="order-single-product-table__th">
                      Giá bán
                    </div>
                    <div className="order-single-product-table__th">
                      Giảm giá
                    </div>
                    <div className="order-single-product-table__th">
                      Tổng tiền
                    </div>
                  </>
                )}
                <div className="order-single-product-table__th"></div>
              </div>
            </div>
            <div className="order-single-product-table__tbody">
              {list.map(item => (
                <Row
                  key={item?.data?.id}
                  data={item?.data}
                  rawData={item}
                  inventory={inventory}
                  quantity={item?.quantity || 0}
                  whole={whole}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </div>
          </div>
          {!!inventory && (
            <div className="order-single-product-table__checkout">
              {checkoutFigure.map(item =>
                (statusOrder === 'copy' && item.id === 5) ? <></> : <CheckoutFigure key={item?.id} data={item}/>)}
            </div>
          )}
        </>
      ) : (
        <Empty/>
      )}
    </StyledOrderSingleProductTable>
  )
}

const Row = ({
  data,
  rawData,
  inventory,
  quantity,
  whole,
  onQuantityChange,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(data?.image_thumb)
  const [value, setValue] = useState(quantity)
  const { state, dispatch } = useContext(OrderSingleContext)

  const selectedPrice = Number(
    whole && inventory
      ? rawData?.data?.wholesale_price || 0
      : rawData?.price || 0,
  )

  const finalPrice =
    rawData?.discountType === 'đ'
      ? selectedPrice * Number(rawData?.quantity || 0) - Number(+rawData?.discount || 0)
      : (selectedPrice * Number(rawData?.quantity || 0) * (100 - Number(+rawData?.discount_value || 0))) / 100

  const handleImgError = () =>
    setImgSrc('/img/product/default-product-thumbnail.png')

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
    dispatch({ type: orderSingleAction.EDIT_FORM_PRICE_INIT_ORDER, payload: { init: false } })
  }

  const handleDiscountChange = val => {
    let currentValue = val.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)

    if (onQuantityChange && rawData?.discountType === 'đ') {
      onQuantityChange(data, {
        type: 'discountEdit',
        value: currentValue ? Number(currentValue) : '',
      })
    } else if (onQuantityChange && rawData?.discountType === '%') {
      onQuantityChange(data, {
        type: 'discountValue',
        value: currentValue ? (+currentValue > 100 ? 100 : +currentValue) : '',
      })
    }
    dispatch({ type: orderSingleAction.EDIT_FORM_PRICE_INIT_ORDER, payload: { init: false } })
  }

  const calculateDiscountPrice =
    rawData?.discountType === 'đ'
      ? Number(rawData?.discount || 0)
      : (selectedPrice * Number(rawData?.quantity || 0) * Number(rawData?.discount_value || 0)) / 100

  const handleDiscountTypeChange = val => {
    !!onQuantityChange &&
    onQuantityChange(data, {
      type: 'discountType',
      value: val,
    })
    onQuantityChange(data, {
      type: 'discount',
      value: '0',
    })
    onQuantityChange(data, {
      type: 'discountValue',
      value: '0',
    })
  }
  useEffect(() => setValue(quantity), [quantity])

  return (
    <div
      {...props}
      className={`order-single-product-table__tr ${props?.className || ''}`}
    >
      <div className="order-single-product-table__td">
        <ReactImageFallback
          className="order-single-product-table__thumbnail"
          src={imgSrc}
          fallbackImage='/img/product/default-product-thumbnail.png'
          alt={data?.product_name || 'thumbnail'}
        />
        <div style={{ flex: 1 }}>
          {+rawData.status === 2 ? (
            <Tooltip placement='top-center' title={data?.product_name} baseOn="height" className='tooltipv2'>
              <Text as="h6" fontWeight={500} color={'red'}>
                {data?.product_name || '---'}
              </Text>
            </Tooltip>
          ) : (
            <Tooltip placement='top-center' title={data?.product_name} baseOn="height" className='tooltipv2'>
              <Text as="h6" fontWeight={500}>
                {data?.product_name || '---'}
              </Text>
            </Tooltip>
          )}
          {inventory && (
            <Text color="#7C88A6" style={{ marginTop: 4 }}>
              SKU: {data?.sku || '---'}
            </Text>
          )}
          {+rawData.status === 2 && (
            <div style={{
              fontWeight: 500,
              color: '#FF424E',
              background: 'rgba(255, 66, 78, 0.1)',
              width: '6.5625rem',
              padding: '0 10px',
              borderRadius: '4px'
            }}>Đã ngưng bán</div>
          )}
        </div>
      </div>
      <div className="order-single-product-table__td">
        <Input
          disabled={+rawData.status === 2}
          icon={
            <div className="order-single-product-table__number-arrow">
              <i
                data-disabled={+rawData.status === 2 || quantity >= 9999}
                onClick={() => {
                  if (+rawData.status !== 2) {
                    !!onQuantityChange &&
                    onQuantityChange(data, { type: 'increase' })
                  }
                  dispatch({ type: orderSingleAction.EDIT_FORM_PRICE_INIT_ORDER, payload: { init: false } })
                }}
              >
                {ORDER_SINGLE_ICONS.caretUp}
              </i>
              <i
                data-disabled={quantity <= 1}
                onClick={() => {
                  quantity > 1 &&
                  !!onQuantityChange &&
                  onQuantityChange(data, { type: 'decrease' })
                  dispatch({ type: orderSingleAction.EDIT_FORM_PRICE_INIT_ORDER, payload: { init: false } })
                }}
              >
                {ORDER_SINGLE_ICONS.caretUp}
              </i>
            </div>
          }
          min={1}
          type="number"
          validateText={
            (+value === 0 ? 'Số lượng > 0' : (
              inventory
                ? `Tồn kho: ${Number(data?.warehouse_quantity)}`
                : undefined))
          }
          validateType={
            +value === 0 || (inventory && value > Number(data?.warehouse_quantity))
              ? 'danger'
              : 'default'
          }
          value={value}
          onChange={handleInputChange}
          onIconClick={() => {}}
        />
      </div>
      {!!inventory && (
        <>
          <div className="order-single-product-table__td">
            <PriceInput
              defaultValue={
                whole && inventory
                  ? rawData?.data?.wholesale_price || 0
                  : rawData?.price || 0
              }
              triggerDefault={whole && inventory || rawData?.triggerDefault}
              disabled={+data?.warehouse_quantity < 0 || +rawData.status === 2}
              onChange={handlePriceChange}
            />
          </div>
          <div className="order-single-product-table__td">
            <DiscountInput
              defaultValue={rawData?.discount_value || 0}
              triggerDefault={rawData?.triggerDefault}
              discountPrice={calculateDiscountPrice}
              typeValue={rawData?.discountType || '%'}
              warning={
                rawData?.discountType === 'đ'
                  ? Number(rawData?.discount || 0) > selectedPrice * value
                  : +rawData?.discount_value > 100
              }
              disabled={+rawData.status === 2}
              onChange={handleDiscountChange}
              onTypeChange={+rawData.status !== 2 && handleDiscountTypeChange}
            />
          </div>
          <div className="order-single-product-table__td">
            {+rawData.status !== 2 ? (
              <Text as="b">{formatMoney(Math.max(finalPrice, 0))}</Text>
            ) : (
              <Text as="b" color={'rgba(124, 136, 166, 1)'}>{formatMoney(Math.max(finalPrice, 0))}</Text>
            )}
          </div>
        </>
      )}
      <div className="order-single-product-table__td">
        <Tooltip placement="bottom" title="Xóa">
          <i
            style={{ cursor: 'pointer' }}
            onClick={() => onQuantityChange(data, { type: 'amount', amount: -1 })}
          >
            {ORDER_SINGLE_ICONS.trash}
          </i>
        </Tooltip>
      </div>
    </div>
  )
}

const PriceInput = ({ ...props }) => {
  return (
    <CurrencyInput
      {...props}
      disabled={props?.disabled}
      defaultValue={props?.defaultValue || 0}
      style={{ textAlign: 'right', ...props?.style }}
    />
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
    if(props.disabled) return
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
              props.disabled ? '' : (
                <div className="order-single-product-table__discount-type-dropdown-menu">
                  {typeValue !== 'đ' && (
                    <div
                      className="order-single-product-table__discount-type-dropdown-menu-item"
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
                      className="order-single-product-table__discount-type-dropdown-menu-item"
                      style={{ color: THEME_COLORS.secondary_100 }}
                      onClick={() => handleTypeChange('%', { onClose })}
                    >
                      %
                    </div>
                  )}
                </div>
              )
            )}
            renderToggle={({ open }) => (
              <div className="order-single-product-table__discount-type-dropdown-toggle">
                <Text as="b" color={THEME_COLORS.primary_300}>
                  {typeValue}{' '}
                  {props.disabled ? '' : (<i data-active={open}>{ORDER_SINGLE_ICONS.caretUp}</i>)}
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

const CheckoutFigure = ({ data, ...props }) => {
  const { state, dispatch } = useContext(OrderSingleContext)
  return (
    <div
      {...props}
      className={`order-single-product-table__checkout-group ${
        props?.className || ''
      }`}
    >
      <div className="order-single-product-table__checkout-label">
        <Text {...data?.nameProps} color={data?.nameProps?.color || '#7C88A6'}>
          {data?.nameProps?.children || data?.name || '---'}
        </Text>
      </div>
      <div className="order-single-product-table__checkout-value">
        {data?.type === 'text' && (
          <Text {...data?.valueProps}>
            {data?.valueProps?.children || data?.value || '---'}
          </Text>
        )}
        {data?.type === 'input' && (
          <DiscountInput
            {...data?.props}
            defaultValue={data?.data?.discount?.value || 0}
            triggerDefault={data?.data?.discount?.triggerDefault || false}
            typeValue={data?.data?.discount?.type || '%'}
            onChange={val => {
              data?.data?.onChange &&
              data.data.onChange(data?.data?.discount?.type, val, data?.total)
              dispatch({ type: orderSingleAction.EDIT_FORM_PRICE_INIT_ORDER, payload: { init: false } })
            }}
            onTypeChange={val =>
              data?.data?.onChange && data.data.onChange(val, 0, data?.total)
            }
          />
        )}
      </div>
    </div>
  )
}

const Empty = () => {
  return (
    <div className="order-single-product-table__empty">
      <img src="/img/product/empty.png" alt="empty" width={164} height={164}/>
      <Text color={'red'}>Chưa có sản phẩm nào được chọn</Text>
    </div>
  )
}
