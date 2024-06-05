import {Input} from 'common/form/input'
import {CurrencyInput} from 'common/form/input/_currencyInput'
import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import {PURCHASES_ICONS} from '../../interfaces/_icons'
import React, {useEffect} from 'react'
import {useState} from 'react'
import {formatMoney, replaceAllCustom} from 'util/functionUtil'
import {StyledPurchaseProductTable} from './_styled'
import {fNumber} from '../../../../util/formatNumber'
import usePurchaseProductInfo from '../../hooks/usePurchaseProductInfo'
import ReactImageFallback from 'react-image-fallback'

export const PurchaseProductTable = ({
                                       list,
                                       onQuantityChange,
                                       vat = 0,
                                       onChangeVAT,
                                       totalPayment,
                                       totalReturn = 0,
                                       canEdit = true,
                                       ...props
                                     }) => {

  const totalQuantity = list.reduce(
    (p, n, i) => p + Number(list[i]?.quantity || 0),
    0,
  )

  const tmpPrice = list.reduce((p, n, i) => {
    const itemPrice =
      Number(list[i]?.price || 0) * Number(list[i]?.quantity || 0)

    return p + itemPrice
  }, 0)
  const vat_price = vat.length > 3 ? replaceAllCustom(vat, ',', '') : vat
  const haveToPay = +tmpPrice + Number(vat_price)

  const checkoutFigure = [
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
      name: `VAT (VNĐ)`,
      type: 'input',
      value: vat,
      onChange: onChangeVAT,
    },
    {
      id: 3,
      name: 'Tổng cộng',
      type: 'text',
      nameProps: {
        color: '#000000',
        fontWeight: 600
      },
      tooltip: true,
      valueProps: {fontWeight: 600},
      value: formatMoney(Math.max(haveToPay, 0)),
    },
  ]

  return (
    <StyledPurchaseProductTable {...props}>
      {list.length > 0 ? (
        <>
          <div
            className="order-single-product-table__table"
          >
            <div className="order-single-product-table__thead">
              <div className="order-single-product-table__tr">
                <div className="order-single-product-table__th">
                  Tên sản phẩm
                </div>
                <div className="order-single-product-table__th">Số lượng</div>
                <div className="order-single-product-table__th">
                  Giá nhập
                </div>
                <div className="order-single-product-table__th">
                  Tổng tiền
                </div>
                <div className="order-single-product-table__th">
                </div>
              </div>
            </div>
            <div className="order-single-product-table__tbody">
              {list.map(item => (
                <Row
                  key={item?.data?.id}
                  data={item?.data}
                  rawData={item}
                  quantity={item?.quantity || 0}
                  onQuantityChange={onQuantityChange}
                />
              ))}
              {
                !canEdit && <div className="row-overlay"
                                 style={{
                                   position: 'absolute', top: 0, left: 0,
                                   height: '100%', width: '100%', background: 'rgba(0, 0, 0, 0.04)',
                                   cursor: 'not-allowed'
                                 }}>

                </div>
              }
            </div>
          </div>
          <div className="order-single-product-table__checkout">
            {checkoutFigure.map(item => (
              <CheckoutFigure key={item?.id} totalReturn={totalReturn} data={item} vat={vat} canEdit={canEdit}/>
            ))}
            {totalPayment > 0 &&
            <div
              className={`order-single-product-table__checkout-group`}
            >
              <div className="order-single-product-table__checkout-label">
                <Text color={'#00AB56'} fontWeight={600}>Đã thanh toán cho NCC</Text>
              </div>
              <div className="order-single-product-table__checkout-value">
                <Text color={'#00AB56'} fontWeight={600}>{formatMoney(totalPayment)}</Text>
              </div>
            </div>
            }
            {totalReturn !== 0 &&
            <div
              className={`order-single-product-table__checkout-group`}
            >
              <div className="order-single-product-table__checkout-label">
                <Text color={'#FF9F41'} fontWeight={600}>Nhận tiền hoàn từ NCC</Text>
              </div>
              <div className="order-single-product-table__checkout-value">
                <Text color={'#FF9F41'} fontWeight={600}>{formatMoney(totalReturn)}</Text>
              </div>
            </div>
            }
            <div
              className={`order-single-product-table__checkout-group`}
            >
              <div className="order-single-product-table__checkout-label">
                <Text fontWeight={600} style={{display: 'flex', alignItems: 'center'}}>Cần thanh toán &nbsp;
                  <Tooltip
                    title={'Giá trị Cần thanh toán = Tổng cộng - (Đã thanh toán cho NCC - Nhận tiền hoàn từ NCC)'}
                    placement={'bottom-start'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>{PURCHASES_ICONS.question}</div>
                  </Tooltip>
                  &nbsp;
                  {(haveToPay < (totalPayment - totalReturn)) && <Tooltip
                    title={'Số tiền thanh toán cần ≥ 0'}
                    className={'--danger'}
                    placement={'bottom-start'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>{PURCHASES_ICONS.error}</div>
                  </Tooltip>}
                </Text>
              </div>
              <div className="order-single-product-table__checkout-value">
                <Text fontWeight={600}>
                  {formatMoney(haveToPay - (totalPayment - totalReturn) )}
                </Text>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Empty/>
      )}
    </StyledPurchaseProductTable>
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
  const selectedPrice = rawData?.price ? rawData?.price : data?.price || 0
  const finalPrice = (selectedPrice * Number(rawData?.quantity || 0))

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
        <div style={{flex: 1}}>
          <Text as="h6" fontWeight={500}>
            {data?.product_name || '---'}
          </Text>
          <Text color="#7C88A6" style={{marginTop: 4}}>
            SKU: {data?.sku || '---'}
          </Text>
        </div>
      </div>
      <div className="order-single-product-table__td">
        <Tooltip title={+quantity == 0 ? 'Số lượng sản phẩm cần ≥ 1' : ''} className={`--danger`} placement={'bottom'}>
          <Input
            icon={
              <div className="order-single-product-table__number-arrow">
                <i
                  data-disabled={quantity > 9998}
                  onClick={() =>
                    quantity < 9999 &&
                    !!onQuantityChange &&
                    onQuantityChange(data, {type: 'increase'})
                  }
                >
                  {PURCHASES_ICONS.caretUp}
                </i>
                <i
                  data-disabled={quantity <= 1}
                  onClick={() =>
                    quantity > 1 &&
                    !!onQuantityChange &&
                    onQuantityChange(data, {type: 'decrease'})
                  }
                >
                  {PURCHASES_ICONS.caretUp}
                </i>
              </div>
            }
            // min={0}
            type="number"

            validateText={+quantity == 0 ? true : ''}
            validateType={'danger'}
            value={value}
            onChange={handleInputChange}
            onIconClick={() => {
            }}
          />
        </Tooltip>
      </div>
      <div className="order-single-product-table__td">
        <CurrencyInput
          defaultValue={
            rawData?.price ? rawData?.price : data?.price || 0
          }
          triggerDefault={rawData?.trigger}
          onChange={handlePriceChange}
          style={{textAlign: 'right', ...props?.style}}
        />
      </div>
      <div className="order-single-product-table__td">
        <Text as="b">{formatMoney(Math.max(finalPrice, 0))}</Text>
      </div>
      <div className="order-single-product-table__td">
        <Tooltip placement="bottom" title="Xóa">
          <i
            style={{cursor: 'pointer'}}
            onClick={() => onQuantityChange(data, {type: 'amount', amount: 0, delete: true})}
          >
            {PURCHASES_ICONS.trash}
          </i>
        </Tooltip>
      </div>
    </div>
  )
}

const PriceInput = ({...props}) => {
  return (
    <CurrencyInput
      {...props}
      defaultValue={props?.defaultValue || 0}
      style={{textAlign: 'right', ...props?.style}}
    />
  )
}

const CheckoutFigure = ({data, vat, totalReturn, canEdit, ...props}) => {
  return (
    <div
      {...props}
      className={`order-single-product-table__checkout-group ${
        props?.className || ''
      }`}
    >
      <div className="order-single-product-table__checkout-label">
        <Text {...data?.nameProps} color={data?.nameProps?.color || '#7C88A6'}
              fontWeight={data?.nameProps?.fontWeight || 400}
              style={{display: 'flex', alignItems: 'center'}}
        >
          {data?.nameProps?.children || data?.name || '---'} &nbsp;

          {!!data?.tooltip && <Tooltip
            title={'Tổng cộng = Giá trị Tạm tính + VAT'}
            placement={'bottom-start'}>
            <div style={{display: 'flex', alignItems: 'center'}}>{PURCHASES_ICONS.question}</div>
          </Tooltip>}
        </Text>
      </div>
      <div className="order-single-product-table__checkout-value">
        {data?.type === 'text' && (
          <Text {...data?.valueProps} fontWeight={data?.valueProps?.fontWeight || 400}>
            {data?.valueProps?.children || data?.value || '---'}
          </Text>
        )}
        {data?.type === 'input' && (
          <Input value={vat}
                 onChange={e => {
                   data?.onChange(e.target.value)
                 }}
                 className={'vat-input'}
                 disabled={!canEdit}
          />
        )}
      </div>
    </div>
  )
}
const Empty = () => {
  const {data} = usePurchaseProductInfo()
  return (
    <div className="order-single-product-table__empty">
      <img src="/img/product/empty.png" alt="empty" width={164} height={164}/>
      <Text color={!!data.validate ? 'red' : '#7C88A6'}>Chưa có sản phẩm nào được chọn</Text>
    </div>
  )
}
