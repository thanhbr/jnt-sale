import {Popper} from 'common/popper'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useEffect} from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import {formatMoney} from 'util/functionUtil'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {DiscountInput} from './__DiscountInput'
import {PriceInput} from './__PriceInput'
import {QuantityInput} from './__QuantityInput'

export const ProductTable = ({...props}) => {
  const {data, productMethods} = useFacebookConversationOrder()
  const {inventoryConfig} = data.productInfo
  const {pricePolicy, product} = inventoryConfig

  const tmpPrice = product.value.reduce((p, n, i) => {
    const itemPrice =
      Number(
        pricePolicy.value?.value === 2
          ? product.value[i]?.data?.wholesale_price || 0
          : product.value[i]?.price || 0,
      ) * Number(product.value[i]?.quantity || 0)

    return p + itemPrice
  }, 0)

  const tmpDiscount = product.value.reduce((p, n, i) => {
    const itemDiscount =
      product.value[i]?.discountType === 'đ'
        ? Number(product.value[i]?.discount || 0) *
          Number(product.value[i]?.quantity || 0)
        : ((Number(
            pricePolicy.value?.value === 2
              ? product.value[i]?.data?.wholesale_price || 0
              : product.value[i]?.price || 0,
          ) *
            Number(product.value[i]?.discount || 0)) /
            100) *
          Number(product.value[i]?.quantity || 0)

    return p + itemDiscount
  }, 0)

  const haveToPay =
    product.discountType === 'đ'
      ? tmpPrice - tmpDiscount - Number(product.discount_value || 0)
      : ((tmpPrice - tmpDiscount) *
          (100 - Number(product.discount_value || 0))) /
        100

  const onTotalDiscountChange = (type, val) => {
    productMethods.onProduct.onTotalDiscountChange(
      type,
      Number(val.replace(/,/g, '')),
    )
  }

  const checkoutFigure = [
    {
      id: 1,
      name: 'Giảm trên tổng đơn',
      type: 'input',
      data: {
        discount: product.discount_value,
        type: product.discountType,
        onChange: onTotalDiscountChange,
      },
      props: {warning: haveToPay < 0},
    },
    {
      id: 2,
      name: 'Tổng tiền',
      nameProps: {color: THEME_COLORS.secondary_100},
      type: 'text',
      value: formatMoney(Math.max(haveToPay, 0)),
    },
  ]

  return (
    <Table {...props}>
      <div
        className="product-table__table"
        style={{position: 'relative', zIndex: 2}}
      >
        <div className="product-table__thead">
          <div className="product-table__tr">
            <div className="product-table__th">Tên sản phẩm</div>
            <div className="product-table__th">Giá bán</div>
            <div className="product-table__th">SL</div>
            <div className="product-table__th">Tạm tính</div>
            <div className="product-table__th"></div>
          </div>
        </div>
        <div className="product-table__tbody">
          {product.value.map(item => (
            <Row
              key={item?.value}
              data={item}
              quantity={item?.quantity || 0}
              whole={pricePolicy.value?.value === 2}
              onQuantityChange={productMethods.onProduct.change}
            />
          ))}
        </div>
      </div>
      <div
        className="product-table__checkout"
        style={{position: 'relative', zIndex: 1}}
      >
        {checkoutFigure.map(item => (
          <div key={item?.value} className="product-table__checkout-group">
            <div className="product-table__checkout-label">
              <Text
                {...item?.nameProps}
                color={item?.nameProps?.color || '#7C88A6'}
              >
                {item?.nameProps?.children || item?.name || '---'}
              </Text>
            </div>
            <div className="product-table__checkout-value">
              {item?.type === 'text' && (
                <Text {...item?.valueProps}>
                  {item?.valueProps?.children || item?.value || '---'}
                </Text>
              )}
              {item?.type === 'input' && (
                <DiscountInput
                  {...item?.props}
                  defaultValue={item?.data?.discount || 0}
                  typeValue={item?.data?.type || '%'}
                  onChange={val =>
                    item?.data?.onChange &&
                    item.data.onChange(item?.data?.type, val)
                  }
                  onTypeChange={val =>
                    item?.data?.onChange && item.data.onChange(val, 0)
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </Table>
  )
}

const Row = ({data, quantity, whole, onQuantityChange, ...props}) => {
  const [value, setValue] = useState(quantity)

  const originPrice = Number(data?.price || 0) * Number(value || 1)
  const selectedPrice = Number(
    whole ? data?.data?.wholesale_price || 0 : data?.price || 0,
  )

  const calculateDiscountPrice =
    data?.discountType === 'đ'
      ? Number(data?.discount || 0)
      : (selectedPrice *
          Number(data?.quantity || 0) *
          Number(data?.discount || 0)) /
        100

  const finalPrice =
    data?.discountType === 'đ'
      ? Number(data?.discount || 0)
      : (selectedPrice *
          Number(data?.quantity || 0) *
          Number(data?.discount || 0)) /
        100

  const handlePriceChange = val => {
    let currentValue = val.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)
    if (onQuantityChange)
      onQuantityChange(data, 'price', {
        value: currentValue ? Number(currentValue) : '',
      })
  }

  const handleInputChange = e => {
    let currentValue = e.target.value.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)
    if (onQuantityChange)
      onQuantityChange(data, 'amount', {
        value: currentValue ? Number(currentValue) : '',
      })
  }

  const handleDiscountTypeChange = val =>
    !!onQuantityChange &&
    onQuantityChange(data, 'discountType', {
      value: val,
    })

  const handleDiscountChange = val => {
    let currentValue = val.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)

    if (onQuantityChange)
      onQuantityChange(data, 'discount', {
        value: currentValue ? Number(currentValue) : '',
      })
  }

  useEffect(() => setValue(quantity), [quantity])

  return (
    <div {...props} className="product-table__tr">
      <div className="product-table__td">
        <div>
          <div>
            <Text
              color={THEME_SEMANTICS.delivering}
              fontSize={13}
              lineHeight={18}
            >
              {data?.name || '---'}
            </Text>
          </div>
          <div style={{marginTop: -2}}>
            <Text color="#7C88A6" fontSize={10} lineHeight={17}>
              {data?.data?.sku || '---'}
            </Text>
            <Text
              color={
                Number(data?.data?.warehouse_quantity || 0) <= 0
                  ? '#fff'
                  : undefined
              }
              fontSize={10}
              lineHeight={17}
              style={{
                marginLeft: 4,
                padding: '0 6px',
                display: 'inline-block',
                background:
                  Number(data?.data?.warehouse_quantity || 0) <= 0
                    ? THEME_SEMANTICS.failed
                    : '#EFF3FB',
                borderRadius: 8,
              }}
            >
              {data?.data?.warehouse_quantity || '---'}
            </Text>
          </div>
        </div>
      </div>
      <div className="product-table__td">
        <PriceInput
          defaultValue={
            whole ? data?.data?.wholesale_price || 0 : data?.data?.price || 0
          }
          triggerDefault={whole}
          onChange={handlePriceChange}
        />
      </div>
      <div className="product-table__td">
        <QuantityInput
          data={data}
          quantity={quantity}
          value={value}
          onQuantityChange={onQuantityChange}
          handleInputChange={handleInputChange}
        />
      </div>
      <div
        className="product-table__td"
        style={{display: 'flex', alignItems: 'center'}}
      >
        <div>
          <Text as="p" style={{width: '100%', textAlign: 'right'}}>
            {formatMoney(originPrice)}
          </Text>
          {finalPrice > 0 && (
            <Text
              color={THEME_SEMANTICS.delivered}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{transform: 'translate(-3px, 3px)'}}
              >
                <path
                  d="M6 2.5V10.5M6 10.5L9 7.5M6 10.5L3 7.5"
                  stroke="#00AB56"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {formatMoney(finalPrice)}
            </Text>
          )}
        </div>
        <div style={{marginLeft: 6}}>
          <Popper
            placement="left-start"
            renderPopper={() => (
              <div
                style={{
                  width: 140,
                  paddingBottom:
                    (data?.discountType || '%') === '%' &&
                    calculateDiscountPrice &&
                    !isNaN(calculateDiscountPrice)
                      ? 17
                      : undefined,
                }}
              >
                <Text
                  as="h5"
                  fontSize={13}
                  lineHeight={20}
                  style={{marginBottom: 8}}
                >
                  Nhập giảm giá
                </Text>
                <DiscountInput
                  defaultValue={data?.discount || 0}
                  discountPrice={calculateDiscountPrice}
                  typeValue={data?.discountType || '%'}
                  warning={
                    data?.discountType === 'đ'
                      ? Number(data?.discount || 0) > selectedPrice
                      : Number(data?.discount || 0) > 100
                  }
                  onChange={handleDiscountChange}
                  onTypeChange={handleDiscountTypeChange}
                />
              </div>
            )}
          >
            <Tooltip placement="top" title="Nhập giảm giá">
              {finalPrice > 0 ? (
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{cursor: 'pointer'}}
                >
                  <path
                    d="M14.919 4.66575C15.0906 5.08077 15.4199 5.41066 15.8347 5.58289L17.289 6.18531C17.704 6.35723 18.0338 6.68699 18.2057 7.10204C18.3776 7.51709 18.3776 7.98344 18.2057 8.3985L17.6037 9.85183C17.4317 10.2671 17.4315 10.7339 17.6043 11.1489L18.2052 12.6018C18.2904 12.8074 18.3343 13.0277 18.3343 13.2503C18.3344 13.4728 18.2906 13.6932 18.2054 13.8988C18.1202 14.1044 17.9954 14.2912 17.838 14.4485C17.6807 14.6058 17.4938 14.7306 17.2882 14.8157L15.8349 15.4177C15.4199 15.5893 15.09 15.9187 14.9178 16.3335L14.3154 17.7878C14.1435 18.2029 13.8138 18.5327 13.3987 18.7046C12.9837 18.8765 12.5174 18.8765 12.1023 18.7046L10.649 18.1026C10.234 17.9311 9.76782 17.9314 9.35303 18.1036L7.89871 18.7051C7.4839 18.8766 7.01798 18.8765 6.60328 18.7047C6.18857 18.5329 5.85901 18.2036 5.68698 17.789L5.0844 16.3342C4.9128 15.9191 4.58342 15.5892 4.16867 15.417L2.71436 14.8146C2.2995 14.6427 1.96985 14.3132 1.79787 13.8984C1.62589 13.4836 1.62566 13.0174 1.79722 12.6024L2.39919 11.1491C2.57068 10.7341 2.57033 10.2679 2.39822 9.85306L1.79711 8.39765C1.71189 8.19207 1.668 7.97172 1.66797 7.74919C1.66793 7.52665 1.71175 7.30628 1.7969 7.10069C1.88206 6.89509 2.0069 6.70829 2.16428 6.55095C2.32165 6.39362 2.50849 6.26884 2.71411 6.18375L4.16738 5.58176C4.58203 5.4103 4.91171 5.08133 5.08405 4.66704L5.68645 3.21267C5.85837 2.79761 6.18812 2.46785 6.60315 2.29593C7.01819 2.12401 7.48453 2.12401 7.89956 2.29593L9.35284 2.89792C9.76789 3.06942 10.2341 3.06907 10.6488 2.89695L12.1038 2.29687C12.5188 2.12504 12.985 2.12508 13.4 2.29696C13.8149 2.46885 14.1446 2.79852 14.3166 3.21346L14.9191 4.66827L14.919 4.66575Z"
                    fill="#00AB56"
                  />
                  <path
                    d="M7.91797 8.00033C7.91797 8.23044 7.73142 8.41699 7.5013 8.41699C7.27118 8.41699 7.08464 8.23044 7.08464 8.00033C7.08464 7.77021 7.27118 7.58366 7.5013 7.58366C7.73142 7.58366 7.91797 7.77021 7.91797 8.00033Z"
                    fill="#00AB56"
                  />
                  <path
                    d="M12.918 13.0003C12.918 13.2304 12.7314 13.417 12.5013 13.417C12.2712 13.417 12.0846 13.2304 12.0846 13.0003C12.0846 12.7702 12.2712 12.5837 12.5013 12.5837C12.7314 12.5837 12.918 12.7702 12.918 13.0003Z"
                    fill="#00AB56"
                  />
                  <path
                    d="M7.5013 8.00033H7.50964M12.5013 13.0003H12.5096M13.3346 7.16699L6.66797 13.8337M14.919 4.66575C15.0906 5.08077 15.4199 5.41066 15.8347 5.58289L17.289 6.18531C17.704 6.35723 18.0338 6.68699 18.2057 7.10204C18.3776 7.51709 18.3776 7.98344 18.2057 8.3985L17.6037 9.85183C17.4317 10.2671 17.4315 10.7339 17.6043 11.1489L18.2052 12.6018C18.2904 12.8074 18.3343 13.0277 18.3343 13.2503C18.3344 13.4728 18.2906 13.6932 18.2054 13.8988C18.1202 14.1044 17.9954 14.2912 17.838 14.4485C17.6807 14.6058 17.4938 14.7306 17.2882 14.8157L15.8349 15.4177C15.4199 15.5893 15.09 15.9187 14.9178 16.3335L14.3154 17.7878C14.1435 18.2029 13.8138 18.5327 13.3987 18.7046C12.9837 18.8765 12.5174 18.8765 12.1023 18.7046L10.649 18.1026C10.234 17.9311 9.76782 17.9314 9.35303 18.1036L7.89871 18.7051C7.4839 18.8766 7.01798 18.8765 6.60328 18.7047C6.18857 18.5329 5.85901 18.2036 5.68698 17.789L5.0844 16.3342C4.9128 15.9191 4.58342 15.5892 4.16867 15.417L2.71436 14.8146C2.2995 14.6427 1.96985 14.3132 1.79787 13.8984C1.62589 13.4836 1.62566 13.0174 1.79722 12.6024L2.39919 11.1491C2.57068 10.7341 2.57033 10.2679 2.39822 9.85306L1.79711 8.39765C1.71189 8.19207 1.668 7.97172 1.66797 7.74919C1.66793 7.52665 1.71175 7.30628 1.7969 7.10069C1.88206 6.89509 2.0069 6.70829 2.16428 6.55095C2.32165 6.39362 2.50849 6.26884 2.71411 6.18375L4.16738 5.58176C4.58203 5.4103 4.91171 5.08133 5.08405 4.66704L5.68645 3.21267C5.85837 2.79761 6.18812 2.46785 6.60315 2.29593C7.01819 2.12401 7.48453 2.12401 7.89956 2.29593L9.35284 2.89792C9.76789 3.06942 10.2341 3.06907 10.6488 2.89695L12.1038 2.29687C12.5188 2.12504 12.985 2.12508 13.4 2.29696C13.8149 2.46885 14.1446 2.79852 14.3166 3.21346L14.9191 4.66827L14.919 4.66575ZM7.91797 8.00033C7.91797 8.23044 7.73142 8.41699 7.5013 8.41699C7.27118 8.41699 7.08464 8.23044 7.08464 8.00033C7.08464 7.77021 7.27118 7.58366 7.5013 7.58366C7.73142 7.58366 7.91797 7.77021 7.91797 8.00033ZM12.918 13.0003C12.918 13.2304 12.7314 13.417 12.5013 13.417C12.2712 13.417 12.0846 13.2304 12.0846 13.0003C12.0846 12.7702 12.2712 12.5837 12.5013 12.5837C12.7314 12.5837 12.918 12.7702 12.918 13.0003Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{cursor: 'pointer'}}
                >
                  <path
                    d="M14.919 4.66575C15.0906 5.08077 15.4199 5.41066 15.8347 5.58289L17.289 6.18531C17.704 6.35723 18.0338 6.68699 18.2057 7.10204C18.3776 7.5171 18.3776 7.98344 18.2057 8.3985L17.6037 9.85183C17.4317 10.2671 17.4315 10.7339 17.6043 11.1489L18.2052 12.6018C18.2904 12.8074 18.3343 13.0277 18.3343 13.2503C18.3344 13.4728 18.2906 13.6932 18.2054 13.8988C18.1202 14.1044 17.9954 14.2912 17.838 14.4485C17.6807 14.6058 17.4938 14.7306 17.2882 14.8157L15.8349 15.4177C15.4199 15.5893 15.09 15.9187 14.9178 16.3335L14.3154 17.7878C14.1435 18.2029 13.8138 18.5327 13.3987 18.7046C12.9837 18.8765 12.5174 18.8765 12.1023 18.7046L10.649 18.1026C10.234 17.9311 9.76782 17.9314 9.35303 18.1036L7.89871 18.7051C7.4839 18.8766 7.01798 18.8765 6.60328 18.7047C6.18857 18.5329 5.85901 18.2036 5.68698 17.789L5.0844 16.3342C4.9128 15.9191 4.58342 15.5892 4.16867 15.417L2.71436 14.8146C2.2995 14.6427 1.96985 14.3132 1.79787 13.8984C1.62589 13.4836 1.62566 13.0174 1.79722 12.6024L2.39919 11.1491C2.57068 10.7341 2.57033 10.2679 2.39822 9.85306L1.79711 8.39765C1.71189 8.19207 1.668 7.97172 1.66797 7.74919C1.66793 7.52665 1.71175 7.30628 1.7969 7.10069C1.88206 6.89509 2.0069 6.70829 2.16428 6.55095C2.32165 6.39362 2.50849 6.26884 2.71411 6.18374L4.16738 5.58176C4.58203 5.4103 4.91171 5.08133 5.08405 4.66704L5.68645 3.21267C5.85837 2.79761 6.18812 2.46785 6.60315 2.29593C7.01819 2.12401 7.48453 2.12401 7.89956 2.29593L9.35284 2.89792C9.76789 3.06942 10.2341 3.06907 10.6488 2.89695L12.1038 2.29687C12.5188 2.12504 12.985 2.12508 13.4 2.29696C13.8149 2.46885 14.1446 2.79852 14.3166 3.21346L14.9191 4.66827L14.919 4.66575Z"
                    fill="#DCD9D9"
                  />
                  <path
                    d="M7.91797 8.00033C7.91797 8.23044 7.73142 8.41699 7.5013 8.41699C7.27118 8.41699 7.08464 8.23044 7.08464 8.00033C7.08464 7.77021 7.27118 7.58366 7.5013 7.58366C7.73142 7.58366 7.91797 7.77021 7.91797 8.00033Z"
                    fill="#DCD9D9"
                  />
                  <path
                    d="M12.918 13.0003C12.918 13.2304 12.7314 13.417 12.5013 13.417C12.2712 13.417 12.0846 13.2304 12.0846 13.0003C12.0846 12.7702 12.2712 12.5837 12.5013 12.5837C12.7314 12.5837 12.918 12.7702 12.918 13.0003Z"
                    fill="#DCD9D9"
                  />
                  <path
                    d="M7.5013 8.00033H7.50964M12.5013 13.0003H12.5096M13.3346 7.16699L6.66797 13.8337M14.919 4.66575C15.0906 5.08077 15.4199 5.41066 15.8347 5.58289L17.289 6.18531C17.704 6.35723 18.0338 6.68699 18.2057 7.10204C18.3776 7.51709 18.3776 7.98344 18.2057 8.3985L17.6037 9.85183C17.4317 10.2671 17.4315 10.7339 17.6043 11.1489L18.2052 12.6018C18.2904 12.8074 18.3343 13.0277 18.3343 13.2503C18.3344 13.4728 18.2906 13.6932 18.2054 13.8988C18.1202 14.1044 17.9954 14.2912 17.838 14.4485C17.6807 14.6058 17.4938 14.7306 17.2882 14.8157L15.8349 15.4177C15.4199 15.5893 15.09 15.9187 14.9178 16.3335L14.3154 17.7878C14.1435 18.2029 13.8138 18.5327 13.3987 18.7046C12.9837 18.8765 12.5174 18.8765 12.1023 18.7046L10.649 18.1026C10.234 17.9311 9.76782 17.9314 9.35303 18.1036L7.89871 18.7051C7.4839 18.8766 7.01798 18.8765 6.60328 18.7047C6.18857 18.5329 5.85901 18.2036 5.68698 17.789L5.0844 16.3342C4.9128 15.9191 4.58342 15.5892 4.16867 15.417L2.71436 14.8146C2.2995 14.6427 1.96985 14.3132 1.79787 13.8984C1.62589 13.4836 1.62566 13.0174 1.79722 12.6024L2.39919 11.1491C2.57068 10.7341 2.57033 10.2679 2.39822 9.85306L1.79711 8.39765C1.71189 8.19207 1.668 7.97172 1.66797 7.74919C1.66793 7.52665 1.71175 7.30628 1.7969 7.10069C1.88206 6.89509 2.0069 6.70829 2.16428 6.55095C2.32165 6.39362 2.50849 6.26884 2.71411 6.18375L4.16738 5.58176C4.58203 5.4103 4.91171 5.08133 5.08405 4.66704L5.68645 3.21267C5.85837 2.79761 6.18812 2.46785 6.60315 2.29593C7.01819 2.12401 7.48453 2.12401 7.89956 2.29593L9.35284 2.89792C9.76789 3.06942 10.2341 3.06907 10.6488 2.89695L12.1038 2.29687C12.5188 2.12504 12.985 2.12508 13.4 2.29696C13.8149 2.46885 14.1446 2.79852 14.3166 3.21346L14.9191 4.66827L14.919 4.66575ZM7.91797 8.00033C7.91797 8.23044 7.73142 8.41699 7.5013 8.41699C7.27118 8.41699 7.08464 8.23044 7.08464 8.00033C7.08464 7.77021 7.27118 7.58366 7.5013 7.58366C7.73142 7.58366 7.91797 7.77021 7.91797 8.00033ZM12.918 13.0003C12.918 13.2304 12.7314 13.417 12.5013 13.417C12.2712 13.417 12.0846 13.2304 12.0846 13.0003C12.0846 12.7702 12.2712 12.5837 12.5013 12.5837C12.7314 12.5837 12.918 12.7702 12.918 13.0003Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Tooltip>
          </Popper>
        </div>
      </div>
      <div className="product-table__td">
        <Tooltip placement="top" title="Xóa">
          <i
            style={{cursor: 'pointer'}}
            onClick={() => onQuantityChange(data, 'amount', {value: 0})}
          >
            {ORDER_SINGLE_ICONS.trash}
          </i>
        </Tooltip>
      </div>
    </div>
  )
}

const Table = styled.div`
  user-select: none;

  .product-table {
    &__table {
      position: relative;
      z-index: 0;

      /* max-height: 400px; */

      /* overflow: auto; */

      border: 1px solid #e2eaf8;
      border-radius: 8px;
    }

    &__thead {
      position: sticky;
      top: 0;
      z-index: 1;

      background: #f7f9fd;
    }

    &__tbody {
      display: flex;
      flex-direction: column-reverse;
    }

    &__tr {
      display: flex;
    }

    &__th {
      min-height: 44px;
      padding: 12px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      font-weight: 600;
      line-height: 20px;
      text-align: right;

      &:nth-child(1) {
        flex: 1;

        text-align: left;
      }
      &:nth-child(2) {
        width: 114px;
      }
      &:nth-child(3) {
        width: 78px;
      }
      &:nth-child(4) {
        width: 117px;
      }
      &:nth-child(5) {
        width: 42px;
      }
    }

    &__td {
      min-height: 56px;
      padding: 18px 12px;

      display: flex;
      align-items: center;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      line-height: 20px;

      &:nth-child(1) {
        flex: 1;

        text-align: left;
      }
      &:nth-child(2) {
        width: 114px;
      }
      &:nth-child(3) {
        width: 78px;
      }
      &:nth-child(4) {
        width: 117px;
      }
      &:nth-child(5) {
        width: 42px;
      }
    }

    &__thumbnail {
      width: 48px;
      height: 48px;
      margin-right: 13px;

      object-fit: cover;
      object-position: center;
      overflow: hidden;

      border-radius: 4px;
    }

    &__number-arrow {
      position: relative;

      i {
        position: absolute;
        right: 0;

        &:nth-child(1) {
          top: calc(50% - 6px);
        }
        &:nth-child(2) {
          top: calc(50% + 6px);

          transform: rotate(180deg);
        }

        &[data-disabled='true'] {
          cursor: default;

          svg {
            color: #ebeef5;

            path {
              stroke: #ebeef5;
            }
          }
        }

        svg {
          width: 10px;
          height: 10px;
        }
      }
    }

    &__discount-type-dropdown-toggle {
      width: 32px;
      height: 20px;

      text-align: center;

      i {
        display: inline-block;

        transform: rotate(180deg);
        transform-origin: center;
        transition: transform 0.25s;

        &[data-active='true'] {
          transform: rotate(0);
        }
      }

      svg {
        width: 8px;
        height: 8px;

        path {
          stroke: ${THEME_COLORS.primary_300};
        }
      }
    }

    &__discount-type-dropdown-menu {
      width: 32px;
    }

    &__discount-type-dropdown-menu-item {
      margin-bottom: 8px;

      font-weight: 600;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__checkout {
      margin-top: 16px;
      margin-bottom: 24px;
    }

    &__checkout-group {
      margin-bottom: 8px;

      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__checkout-name {
      flex: 1;

      text-align: right;
    }

    &__checkout-value {
      width: 120px;
      margin-left: 73px;

      text-align: right;
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
