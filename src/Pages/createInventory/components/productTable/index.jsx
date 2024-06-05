import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Tooltip} from 'common/tooltip'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import React, {useContext, useEffect, useState} from 'react'
import {StyledOrderSingleProductTable} from './_styled'
import useOrderSingle from "../../hooks/useOrderSingle";
import ReactImageFallback from 'react-image-fallback'

export const OrderSingleProductTable = ({
  discount,
  inventory,
  list,
  whole,
  onQuantityChange,
  onTotalDiscountChange,
  ...props
}) => {
  const total_wareHouse = list?.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number( currentValue?.data?.warehouse_quantity),
      0
  );
  const total_quantity = list?.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number( currentValue?.quantity),
      0
  );
  const isDiff = Number( total_quantity) - Number(total_wareHouse)

  const finalDiff = isDiff === 0 ? Number(isDiff) : isDiff < 0 ? <>{Number(isDiff)}</> : <>+{Number(isDiff)}</>
  
  const checkoutFigure = inventory
    ? [
        {
          id: 1,
          name: `Trước kiểm` ,
          type: 'text',
          value: total_wareHouse,
        },
        {
          id: 2,
          name: 'Thực tế',
          type: 'text',
          value: total_quantity,
        },
        {
          id: 3,
          name: 'Chênh lệch',
          type: 'text',
          value: finalDiff,
            color:THEME_COLORS.green_500,
            fontWeight : 600,
        },
      ]
    : []



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
                  Tên sản phẩm/SKU
                </div>
                <div className="order-single-product-table__th">Tồn trước kiểm</div>
                    <div className="order-single-product-table__th">
                      SL thực tế
                    </div>
                    <div className="order-single-product-table__th">
                      Chênh lệch
                    </div>
                    <div className="order-single-product-table__th">
                      Lý do
                    </div>
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
                  quantity={ item.quantity}
                  whole={whole}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </div>
          </div>
          {!!inventory && (
            <div className="order-single-product-table__checkout">
                <div className={'order-single-product-table__checkout-group'} style={{display:'flex',justifyContent:'flex-end',fontWeight:'600',marginRight:"192px"}}>
                    Tổng tồn kho
                </div>
              {checkoutFigure.map(item => (
                <CheckoutFigure key={item?.id} data={item} />
              ))}
            </div>
          )}
        </>
      ) : (
        <Empty />
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
  const finalPrice = +quantity - Number(data.warehouse_quantity)
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
            <Tooltip></Tooltip>
          <Text as="h6" fontWeight={500}>
            {data?.product_name || '---'}
          </Text>
          {inventory && (
            <Text color="#7C88A6" style={{marginTop: 4}}>
              SKU: {data?.sku || '---'}
            </Text>
          )}
        </div>
      </div>
      <div className="order-single-product-table__td">
        <Text>{data.warehouse_quantity}</Text>
      </div>
          <div className="order-single-product-table__td">
              <Input
                  icon={
                      <div className="order-single-product-table__number-arrow">
                          <i
                              onClick={() =>
                                  !!onQuantityChange &&
                                  onQuantityChange(data, {type: 'increase'})
                              }
                          >
                              {ORDER_SINGLE_ICONS.caretUp}
                          </i>
                          <i
                              data-disabled={quantity <= 0}
                              onClick={() =>
                                  quantity > 0 &&
                                  !!onQuantityChange &&
                                  onQuantityChange(data, {type: 'decrease'})
                              }
                          >
                              {ORDER_SINGLE_ICONS.caretUp}
                          </i>
                      </div>
                  }
                  // min={0}
                  type="number"
                  value={value}
                  onChange={(e)=>handleInputChange(e)}
                  onIconClick={() => {}}
                  maxLength={9}
              />
          </div>
          <div className="order-single-product-table__td">
              {finalPrice === 0?
                  finalPrice
                  :
                  finalPrice < 0 ?
                     <>
                       {finalPrice}
                     </>
                      :
                      <>
                        +{finalPrice}
                      </>
              }
          </div>
          <div className="order-single-product-table__td">
            <Input
                className={"order-single-product-table__reason"}
                value={rawData.reason}
                onChange={e=>onQuantityChange(data, {type: 'reason',value:e.target.value})}
            />
          </div>
      <div className="order-single-product-table__td">
        <Tooltip placement="bottom" title="Xóa">
          <i
            style={{cursor: 'pointer'}}
            onClick={() =>onQuantityChange(data, {type: 'amount', amount: 0, delete: true})}
          >
            {ORDER_SINGLE_ICONS.trash}
          </i>
        </Tooltip>
      </div>
    </div>
  )
}



const CheckoutFigure = ({data, ...props}) => {
  return (
    <div
      {...props}
      className={`order-single-product-table__checkout-group ${
        props?.className || ''
      }`}
    >

      <div className="order-single-product-table__checkout-label">
        <Text {...data?.nameProps} color={data?.color } fontWeight={data?.fontWeight}>
          {data?.nameProps?.children || data?.name || '---'}
        </Text>
      </div>
      <div className="order-single-product-table__checkout-value">
        {data?.type === 'text' && (
          <Text  color={data?.color} fontWeight={data?.fontWeight}>
            { data?.value }
          </Text>
        )}
      </div>
    </div>
  )
}

const Empty = () => {
    const {validateTable} = useOrderSingle()
  return (
    <div className="order-single-product-table__empty">
      <img src="/img/product/empty.png" alt="empty" width={164} height={164} />
      <Text color={validateTable ? '#7C88A6' : '#FF424E' }>Chưa có sản phẩm nào được chọn</Text>
    </div>
  )
}
